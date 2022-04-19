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

router.route('/users/:id').put(protect, updateUser).delete(protect, deleteUser)
router.route('/registrations').get(protect, getRegistrations)
router.route('/registration/:id').put(protect, updateRegistration).delete(protect, deleteRegistration)

module.exports = router
