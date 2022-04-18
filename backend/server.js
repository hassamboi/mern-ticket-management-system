const express = require('express')
require('dotenv').config()
const morgan = require('morgan')
const { errorHandler } = require('./middleware/errorMiddleware')

const port = process.env.PORT || 5000

const app = express()

app.listen(port, () => console.log(`Server listening on port ${port}`))

// middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// routes
app.use('/api/events', require('./routes/eventRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/registrations', require('./routes/registrationRoutes'))
app.use('/api/admin', require('./routes/adminRoutes'))

// handle errors after the api hit
app.use(errorHandler)
