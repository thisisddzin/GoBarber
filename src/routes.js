const express = require('express')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)

const routes = express.Router()

const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
const DashboardController = require('./app/controllers/DashboardController')
const FileController = require('./app/controllers/FileController')
const AppointmentController = require('./app/controllers/AppointmentController')
const AvailableController = require('./app/controllers/AvailableController')
const DashProvider = require('./app/controllers/DashProvider')

const RefreshController = require('./app/controllers/RefreshController')

const authMiddleware = require('./app/middlewares/auth')
const guestMiddleware = require('./app/middlewares/guest')

routes.use((req, res, next) => {
  res.locals.flashError = req.flash('error')
  res.locals.flashSuccess = req.flash('Success')

  return next()
})

routes.use('/app', authMiddleware)

routes.get('/files/:file', FileController.show)

routes.get('/signup', guestMiddleware, UserController.create)
routes.post('/signup', upload.single('avatar'), UserController.store)

routes.get('/', guestMiddleware, SessionController.create)
routes.post('/signin', SessionController.store)

routes.get('/app/logout', SessionController.destroy)

routes.get('/app/dashboard', DashboardController.index)
routes.get('/app/provider', DashProvider.index)
routes.get('/app/provider/cancel', DashProvider.cancel)

routes.get('/app/appointment/new/:provider', AppointmentController.create)
routes.post('/app/appointment/new/:provider', AppointmentController.store)

routes.get('/app/available/:provider', AvailableController.index)

// REFRESHS

routes.get('/provider/refresh', RefreshController.refresh)

// FIM REFRESHS

module.exports = routes
