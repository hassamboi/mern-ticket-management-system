const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const mysql = require('mysql2/promise')
const dbOptions = require('../config/db')

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Get user from the token
      const connection = await mysql.createConnection(dbOptions)
      const sql = 'SELECT * FROM user WHERE user_id = ?'
      const [rows] = await connection.execute(sql, [decoded.id])

      // Add the user to the req object
      const user = rows[0]
      delete user.password
      req.user = user

      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

module.exports = protect
