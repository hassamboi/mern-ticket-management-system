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
  getEventById,
} = require('../controllers/eventController')

const protect = require('../middleware/authMiddleware')

router.route('/').get(getEvents).post(protect, setEvent)
router.route('/:id').put(protect, updateEvent).delete(protect, deleteEvent).get(getEventById)
router.route('/categories').get(getEventCategories).post(protect, setEventCategory)
router.route('/categories/:id').delete(protect, deleteEventCategory)

module.exports = router
