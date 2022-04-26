const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const mysql = require('mysql2/promise')
const dbOptions = require('../config/db')

// @desc    Register user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { email, firstName, lastName, password, phone, avatar } = req.body

  if (!email || !firstName || !lastName || !password || !phone) {
    res.status(400)
    throw new Error('Please fill in all the fields')
  }

  const connection = await mysql.createConnection(dbOptions)
  let sql = 'SELECT user_id FROM user WHERE email = ?'
  const [user] = await connection.execute(sql, [`${email}`])

  if (user.length !== 0) {
    res.status(409)
    throw new Error('User is already registered')
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  sql = 'INSERT INTO user(email, first_name, last_name, password, phone, avatar) VALUES(?,?,?,?,?,?)'

  const [rows, fields] = await connection.execute(sql, [
    `${email}`,
    `${firstName}`,
    `${lastName}`,
    `${hashedPassword}`,
    `${phone}`,
    avatar ? `${avatar}` : null,
  ])

  if (rows.affectedRows === 0) {
    res.status(400)
    throw new Error('Invalid user data')
  }

  sql = 'SELECT role_name FROM user WHERE email = ?'
  const [users] = await connection.execute(sql, [`${email}`])
  const userData = users[0]
  userData.token = generateToken(userData.user_id)

  res.status(201).json(userData)
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const connection = await mysql.createConnection(dbOptions)
  const sql = 'SELECT role_name FROM user WHERE email = ?'
  const [rows] = await connection.execute(sql, [`${email}`])

  if (rows.length === 0) {
    res.status(400)
    throw new Error('No registered user with this email')
  }

  if (!(await bcrypt.compare(password, rows[0].password))) {
    res.status(400)
    throw new Error('Incorrect password')
  }

  const user = rows[0]
  user.token = generateToken(user.user_id)

  res.status(200).json(user)
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const connection = await mysql.createConnection(dbOptions)
  const sql = 'SELECT * FROM user WHERE user_id = ?'
  const [rows] = await connection.execute(sql, [req.user.user_id])

  const user = rows[0]
  delete user.password
  delete user.role_name

  res.status(200).json(user)
})

// helper ftn to generate JWT
const generateToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
}
