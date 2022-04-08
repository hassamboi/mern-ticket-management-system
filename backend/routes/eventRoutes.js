const express = require('express')
const router = express.Router()
const {
  getEvents,
  setEvent,
  updateEvent,
  deleteEvent,
  getEventCategories,
  setEventCategory,
  deleteEventCategory,
} = require('../controllers/eventController')

router.route('/').get(getEvents).post(setEvent)
router.route('/:id').put(updateEvent).delete(deleteEvent)
router.route('/category').get(getEventCategories).post(setEventCategory).delete(deleteEventCategory)

module.exports = router
