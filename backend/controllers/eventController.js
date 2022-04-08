const asyncHandler = require('express-async-handler')

// @desc    Get events
// @route   GET /api/events
// @access  Public
const getEvents = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Get events' })
})

// @desc    Set event
// @route   POST /api/events
// @access  Private
const setEvent = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field')
  }
  res.status(200).json({ message: 'Set event' })
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
