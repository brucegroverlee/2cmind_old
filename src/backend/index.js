/**
* src/backend/index.js
*/

import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import expressSession from 'express-session'
import passport from 'passport'
import path from 'path'
import api from './api'

const port = process.env.PORT || 3000
const app = express()

//app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({ extended: false }))
//app.use(cookieParser())
app.use(expressSession({ secret: 'ccmind sessions' }))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static('public'))
app.use('/api', api)

app.get('/d', ensureAuth, function (request, response) {
	response.sendFile(path.join(__dirname, '../../public', 'dashboard.html'))
	//response.send('hola')
})

function ensureAuth (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/')
}

app.listen(port, function () {
  console.log('Start engine. Listening on port: ' + port)
})
