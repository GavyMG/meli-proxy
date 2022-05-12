require('dotenv').config()
const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const rateLimit = require('express-rate-limit')
// const LimitRule = require('./db/models')
// require('./db/db')
const PORT = process.env.PORT

const app = express()

// // Middleware
// Rate Limiting
const limiter = rateLimit({
    windowMs: process.env.ROOT_WINDOW_MS,
	max: process.env.ROOT_MAX_REQ,
	standardHeaders: true, 
	legacyHeaders: false,
})
app.use(limiter)

const creation_limiter = rateLimit({
    windowMs: process.env.REGISTRATION_MS,
	max: process.env.REGISTRATION_MAX_REQ,
	standardHeaders: true, 
	legacyHeaders: false,
})
app.use('/sites', creation_limiter)

app.set('trust proxy', 1)

// Enable cors
app.use(cors())

// Routes
app.use('/', routes)


app.listen(PORT, () => console.log(`Server running on port ${PORT}`))