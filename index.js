require('dotenv').config()
const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const rateLimit = require('express-rate-limit')
const client = require('prom-client')
// const LimitRule = require('./db/models')
// require('./db/db')
const PORT = process.env.PORT

const app = express()

const collectDefaultMetrics = client.collectDefaultMetrics
const register = new client.Registry()

register.setDefaultLabels({
	app: 'meli-proxy'
})
collectDefaultMetrics({
	labels: {
		app: "meli-proxy"
	},
})
collectDefaultMetrics({ register })

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

app.get('/metrics', async (req, resp) => {
    resp.setHeader('Content-type', register.contentType)
    resp.end(await register.metrics())
})
// Routes
app.use('/', routes)


app.listen(PORT, () => console.log(`Server running on port ${PORT}`))