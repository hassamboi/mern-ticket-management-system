const express = require('express')
const router = express.Router()
const eventController = require('../controllers/eventController')

router.route('/').get(eventController.getEvents).post(eventController.setEvent)
router.route('/:id').put(eventController.updateEvent).delete(eventController.deleteEvent)

module.exports = router
