const express = require('express')
const router = express.Router()

const {
  updateUser,
  deleteUser,
  getRegistrations,
  updateRegistration,
  deleteRegistration,
} = require('../controllers/adminController')

const protect = require('../middleware/authMiddleware')

router.route('/users').put(protect, updateUser).delete(protect, deleteUser)
router.route('/registrations').put(protect, updateRegistration).delete(protect, deleteRegistration).get(protect, getRegistrations)

module.exports = router
