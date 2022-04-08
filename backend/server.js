const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const dbOptions = require('./config/db')
const mysql = require('mysql')
const { errorHandler } = require('./middleware/errorMiddleware')

const port = process.env.PORT || 5000

const app = express()

app.listen(port, () => console.log(`Server listening on port ${port}`))

// connect the database
const connection = mysql.createConnection(dbOptions)
connection.connect(err => {
  if (err) {
    console.log(`Error connecting to the database`.red.underline)
    console.log(`${err.stack}`.grey)
    return
  }
  console.log(`Database connected ${connection.config.host}`.cyan.underline)
})

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// routes
app.use('/api/events', require('./routes/eventRoutes'))

// handle errors after the api hit
app.use(errorHandler)
