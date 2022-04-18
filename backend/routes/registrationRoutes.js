const express = require('express')
const router = express.Router()
const { registerTicket, getMyRegistrations } = require('../controllers/registrationController')
const protect = require('../middleware/authMiddleware')

router.post('/', protect, registerTicket)
router.get('/me', protect, getMyRegistrations)

module.exports = router
