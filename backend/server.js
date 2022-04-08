const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const dbOptions = require('./config/db')
const mysql = require('mysql')
const { errorHandler } = require('./middleware/errorMiddleware')

const port = process.env.PORT || 5000

const app = express()

app.listen(port, () => console.log(`Server listening on port ${port}`))

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// routes
app.use('/api/events', require('./routes/eventRoutes'))

// handle errors after the api hit
app.use(errorHandler)
