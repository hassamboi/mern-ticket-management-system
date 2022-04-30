const mysql = require('mysql2/promise')
const dbOptions = require('../config/db')
const asyncHandler = require('express-async-handler')

// @desc    Register event ticket
// @route   POST /api/registrations
// @access  Private
const registerTicket = asyncHandler(async (req, res) => {
  const { paymentOption, date, eventId } = req.body

  const connection = await mysql.createConnection(dbOptions)
  let sql = 'INSERT INTO registration(payment_option, user_id, event_id, date) VALUES(?, ?, ?, ?)'
  const [rows] = await connection.execute(sql, [`${paymentOption}`, req.user.user_id, eventId, `${date}`])

  sql = 'SELECT * FROM registration WHERE user_id = ? ORDER BY date DESC LIMIT 1'
  const [latest] = await connection.execute(sql, [req.user.user_id])

  res.status(201).json(latest[0])
  connection.end()
})

// @desc    Get user event tickets/registrations
// @route   GET /api/registrations/me
// @access  Private
const getMyRegistrations = asyncHandler(async (req, res) => {
  const connection = await mysql.createConnection(dbOptions)
  const sql = 'SELECT * FROM registration WHERE user_id = ? ORDER BY date DESC'
  const [rows] = await connection.execute(sql, [req.user.user_id])
  res.status(200).json(rows)
})

// @desc    Get user event ticket/registration for a specific event
// @route   GET /api/registrations/me/event/:id
// @access  Private
const getMyRegistrationOnAnEvent = asyncHandler(async (req, res) => {
  const connection = await mysql.createConnection(dbOptions)
  const sql = 'SELECT * FROM registration WHERE user_id = ? AND event_id = ? ORDER BY date DESC'
  const [rows] = await connection.execute(sql, [req.user.user_id, req.params.id])
  res.status(200).json(rows)
})

module.exports = {
  registerTicket,
  getMyRegistrations,
  getMyRegistrationOnAnEvent,
}
