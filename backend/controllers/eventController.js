const asyncHandler = require('express-async-handler')
const dbOptions = require('../config/db')
const mysql = require('mysql')

// @desc    Get events
// @route   GET /api/events
// @access  Public
const getEvents = asyncHandler(async (req, res) => {
  const connection = mysql.createConnection(dbOptions)
  const sql = 'SELECT * FROM events'

  connection.query(sql, (err, results, fields) => {
    if (err) {
      res.status(503).json({ message: 'Error fetching events' })
      return
    }
    res.status(200).json(results)
  })

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

  connection.query(sql, (err, results, fields) => {
    if (err) {
      console.log(err)
      res.status(500).json({ message: 'Something went wrong' })
      return
    }
    res.status(200).json(results)
  })

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

module.exports = {
  getEvents,
  setEvent,
  updateEvent,
  deleteEvent,
}
