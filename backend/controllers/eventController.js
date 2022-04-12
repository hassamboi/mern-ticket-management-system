const asyncHandler = require('express-async-handler')
const dbOptions = require('../config/db')
const mysql = require('mysql2/promise')

// @desc    Get events
// @route   GET /api/events
// @access  Public
const getEvents = asyncHandler(async (req, res) => {
  const connection = await mysql.createConnection(dbOptions)
  const sql = 'SELECT * FROM event'
  const [rows, fields] = await connection.execute(sql)
  res.status(200).json(rows)
  connection.end()
})

// @desc    Set event
// @route   POST /api/events
// @access  Private
const setEvent = asyncHandler(async (req, res) => {
  const { name, venue, date, status, price, metaDesc, categoryName, eventImg } = req.body

  if (!name || !venue || !date || !status || !price || !metaDesc || !categoryName) {
    res.status(400)
    throw new Error('Please fill in all the fields')
  }

  const connection = await mysql.createConnection(dbOptions)

  const sql =
    'INSERT INTO event (name, venue, date, status, price, meta_desc, category_name, event_img) VALUES(?, ?, ?, ?, ?, ?, ?, ?)'

  const [rows, fields] = await connection.execute(sql, [
    `${name}`,
    `${venue}`,
    `${date}`,
    `${status}`,
    `${price}`,
    `${metaDesc}`,
    `${categoryName}`,
    `${eventImg ? `${eventImg}` : null}`,
  ])
  res.status(200).json(rows)
  connection.end()
})

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private
const updateEvent = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.status(400)
    throw new Error('Please enter fields to update')
  }

  const connection = await mysql.createConnection(dbOptions)
  const column = Object.keys(req.body)[0]
  const value = Object.values(req.body)[0]
  const sql = `UPDATE event SET ${column} = ? WHERE event_id = ?`
  const [rows, fields] = await connection.execute(sql, [`${value}`, `${req.params.id}`])

  if (rows.affectedRows === 0) {
    res.status(404)
    throw new Error('Resource not found')
  }

  res.status(200).json(rows)
  connection.end()
})

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private
const deleteEvent = asyncHandler(async (req, res) => {
  const connection = await mysql.createConnection(dbOptions)
  const sql = 'DELETE FROM event WHERE event_id = ?'
  const [rows, fields] = await connection.execute(sql, [`${req.params.id}`])

  if (rows.affectedRows === 0) {
    res.status(404)
    throw new Error('Resource not found')
  }

  res.status(200).json(rows)
  connection.end()
})

// @desc    Get event categories
// @route   GET /api/events/categories
// @access  Private
const getEventCategories = asyncHandler(async (req, res) => {
  const connection = await mysql.createConnection(dbOptions)
  const sql = 'SELECT * FROM event_category'
  const [rows, fields] = await connection.execute(sql)
  res.status(200).json(rows)
  connection.end()
})

// @desc    Set event category
// @route   POST /api/events/categories
// @access  Private
const setEventCategory = asyncHandler(async (req, res) => {
  const { categoryName } = req.body

  if (!categoryName) {
    res.status(400)
    throw new Error('Please enter the category name to insert')
  }

  const connection = await mysql.createConnection(dbOptions)
  const sql = 'INSERT INTO event_category(category_name) VALUES(?)'
  const [rows, fields] = await connection.execute(sql, [`${categoryName}`])
  res.status(200).json(rows)
  connection.end()
})

// @desc    Delete an event category
// @route   DELETE /api/events/categories/:id
// @access  Private
const deleteEventCategory = asyncHandler(async (req, res) => {
  const connection = await mysql.createConnection(dbOptions)
  const sql = 'DELETE FROM event_category WHERE category_name=?'
  const [rows, fields] = await connection.execute(sql, [`${req.params.id}`])

  if (rows.affectedRows === 0) {
    res.status(404)
    throw new Error('Resource not found')
  }

  res.status(200).json(rows)
  connection.end()
})

module.exports = {
  getEvents,
  setEvent,
  updateEvent,
  deleteEvent,
  getEventCategories,
  setEventCategory,
  deleteEventCategory,
}
