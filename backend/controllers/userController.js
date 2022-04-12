const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const mysql = require('mysql2')
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

  const connection = mysql.createConnection(dbOptions)
  let sql = 'SELECT user_id FROM user WHERE email = ?'
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {})

module.exports = {
  registerUser,
  loginUser,
  getMe,
}
