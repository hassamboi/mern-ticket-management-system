const asyncHandler = require('express-async-handler')
const mysql = require('mysql2/promise')
const dbOptions = require('../config/db')

// @desc    Update a user
// @route   PUT /api/admin/users/:id
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
  if (!(req.user.role_name === 'super admin')) {
    res.status(401)
    throw new Error('User not authorized')
  }

  if (!req.body) {
    res.status(400)
    throw new Error('Please enter the field to update')
  }

  const connection = await mysql.createConnection(dbOptions)
  const column = Object.keys(req.body)[0]
  const value = Object.values(req.body)[0]
  const sql = `UPDATE user SET ${column} = ? WHERE user_id = ?`
  const [rows] = await connection.execute(sql, [`${value}`, req.params.id])

  if (rows.affectedRows === 0) {
    res.status(404)
    throw new Error('Resource not found')
  }

  res.status(200).json(rows)
  connection.end()
})

// @desc    Delete a user
// @route   DELETE /api/admin/users/:id
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
  if (!(req.user.role_name === 'super admin')) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const connection = await mysql.createConnection(dbOptions)
  const sql = 'DELETE FROM user WHERE user_id = ?'
  const [rows] = connection.execute(sql, [req.params.id])

  if (rows.affectedRows === 0) {
    res.status(404)
    throw new Error('Resource not found')
  }

  res.status(200).json(rows)

  connection.end()
})

// @desc    Get all registrations
// @route   GET /api/admin/registrations
// @access  Private
const getRegistrations = asyncHandler(async (req, res) => {
  if (req.user.role_name === 'user') {
    res.status(401)
    throw new Error('User not authorized')
  }

  const connection = await mysql.createConnection(dbOptions)
  const sql = 'SELECT * FROM registration ORDER BY date DESC'
  const [rows] = connection.execute(sql)
  res.status(200).json(rows)
  connection.end()
})

// @desc    Update a registration
// @route   PUT /api/admin/registrations/:id
// @access  Private
const updateRegistration = asyncHandler(async (req, res) => {
  if (req.user.role_name === 'user') {
    res.status(401)
    throw new Error('User not authorized')
  }
  if (!req.body) {
    res.status(400)
    throw new Error('Please enter the field to update')
  }

  const connection = mysql.createConnection(dbOptions)
  const column = Object.keys(req.body)[0]
  const value = Object.values(req.body)[0]
  const sql = `UPDATE registration SET ${column} = ? WHERE registration_id = ?`
  const [rows] = await connection.execute(sql, [`${value}`, req.params.id])

  if (rows.affectedRows === 0) {
    res.status(404)
    throw new Error('Resource not found')
  }

  res.status(200).json(rows)
  connection.end()
})

// @desc    Delete a registration
// @route   POST /api/admin/registrations/:id
// @access  Private
const deleteRegistration = asyncHandler(async (req, res) => {
  if (req.user.role_name === 'user') {
    res.status(401)
    throw new Error('User not authorized')
  }

  const connection = await mysql.createConnection(dbOptions)
  const sql = 'DELETE FROM registration WHERE registration_id = ?'
  const [rows] = connection.execute(sql, [req.params.id])

  if (rows.affectedRows === 0) {
    res.status(404)
    throw new Error('Resource not found')
  }

  res.status(200).json(rows)
  connection.end()
})

module.exports = {
  updateUser,
  deleteUser,
  getRegistrations,
  updateRegistration,
  deleteRegistration,
}
