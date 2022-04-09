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
router.route('/categories').get(getEventCategories).post(setEventCategory)
router.route('/categories/:id').delete(deleteEventCategory)

module.exports = router
