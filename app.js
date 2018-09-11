const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const mapRoutes = require('express-routes-mapper')
const routes = require('./config/routes')
const app = express()

const searchRouter = mapRoutes(
  routes.searchRoutes,
  '/controllers/'
)

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
})

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
app.use(cookieParser())
app.use(limiter)

app.use('/', searchRouter)

module.exports = app
