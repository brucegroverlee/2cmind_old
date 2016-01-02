/**
* src/backend/index.js
*/

import express from 'express'
import api from './api'
const path = require('path')

import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import expressSession from 'express-session'
import passport from 'passport'

const port = process.env.PORT || 3000
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(expressSession({
  secret: 'ccmind sessions',
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(express.static('public'))

app.use('/api', api)

app.get('/d', ensureAuth, function (request, response) {
	response.sendFile(path.join(__dirname, '../../public', 'dashboard.html'))
	//response.send('hola')
})

function ensureAuth (req, res, next) {
	//console.log('Exist user: ' + req.user.name)
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/')
}

app.listen(port, function () {
  console.log('Start engine. Listening on port: ' + port)
})
