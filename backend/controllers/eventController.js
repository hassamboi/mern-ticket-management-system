const asyncHandler = require('express-async-handler')
const dbOptions = require('../config/db')
const mysql = require('mysql')
const res = require('express/lib/response')

// helper function to query the db
const query_the_db = async (connection, sql, res) => {
  await connection.query(sql, (err, results) => {
    if (err) res.status(500).json({ message: 'Something went wrong' })
    res.status(200).json(results)
  })
}

// @desc    Get events
// @route   GET /api/events
// @access  Public
const getEvents = asyncHandler(async (req, res) => {
  const connection = mysql.createConnection(dbOptions)
  const sql = 'SELECT * FROM events'
  await query_the_db(connection, sql, res)
  connection.end()
})

// @desc    Set event
// @route   POST /api/events
// @access  Private
const setEvent = asyncHandler(async (req, res) => {
  const { name, venue, date, status, price, metaDesc, categoryName, eventImg } = req.body

  if (!name || !venue || !date || !status || !price || !metaDesc || !categoryName) {
    res.status(400)
    throw new Error('Please enter all fields')
  }

  const connection = mysql.createConnection(dbOptions)

  const sql = `INSERT INTO events (name, venue, date, status, price, meta_desc, category_name, event_img) 
  VALUES('${name}', '${venue}', '${date}', '${status}', '${price}', '${metaDesc}', '${categoryName}', ${
    eventImg ? `'${eventImg}'` : null
  })`

  await query_the_db(connection, sql, res)
  connection.end()
})

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private
const updateEvent = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update event ${req.params.id}` })
})

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private
const deleteEvent = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `delete event ${req.params.id}` })
})

// @desc    Get event categories
// @route   GET /api/events/category
// @access  Private
const getEventCategories = asyncHandler(async (req, res) => {
  const connection = mysql.createConnection(dbOptions)
  const sql = 'SELECT * FROM event_categories'
  await query_the_db(connection, sql, res)
  connection.end()
})

// @desc    Set event category
// @route   POST /api/events/category
// @access  Private
const setEventCategory = asyncHandler(async (req, res) => {
  if (!req.body.categoryName) {
    res.status(400)
    throw new Error('Please enter the category name to insert')
  }

  const connection = mysql.createConnection(dbOptions)
  const sql = `INSERT INTO event_categories VALUES('${req.body.categoryName}')`
  await query_the_db(connection, sql, res)
  connection.end()
})

// @desc    Delete an event category
// @route   DELETE /api/events/category
// @access  Private
const deleteEventCategory = asyncHandler(async (req, res) => {
  if (!req.body.categoryName) {
    res.status(400)
    throw new Error('Please enter the category name to delete')
  }

  const connection = mysql.createConnection(dbOptions)
  const sql = `DELETE FROM event_categories WHERE category_name = '${req.body.categoryName}'`
  await query_the_db(connection, sql, res)
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
