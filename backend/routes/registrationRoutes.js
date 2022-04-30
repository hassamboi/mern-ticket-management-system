const express = require('express')
const router = express.Router()
const { registerTicket, getMyRegistrations, getMyRegistrationOnAnEvent } = require('../controllers/registrationController')
const protect = require('../middleware/authMiddleware')

router.post('/', protect, registerTicket)
router.get('/me', protect, getMyRegistrations)
router.get('/me/event/:id', protect, getMyRegistrationOnAnEvent)

module.exports = router
