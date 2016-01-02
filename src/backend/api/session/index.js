import express from 'express'
import bodyParser from 'body-parser'

import cookieParser from 'cookie-parser'
import expressSession from 'express-session'
import passport from 'passport'
const localStrategy = require('passport-local').Strategy

// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
const router = express.Router({mergeParams: true})

router.use(bodyParser.json())

router.use(bodyParser.urlencoded({ extended: false }))
router.use(cookieParser())
router.use(expressSession({
  secret: 'ccmind sessions',
  resave: false,
  saveUninitialized: false
}))
router.use(passport.initialize())
router.use(passport.session())

passport.use(new localStrategy(function (username, password, done) {
	if (username === 'brucegrover.lee@gmail.com' && password === '123') {
		return done(null, {name: 'bruce grover', lastname: 'lee', key: '666'})
	}

	done(null, false, { message: 'Unknow user'})
	console.log('Post login request: Unknow user')
}))

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))

router.post('/join', function (request, response) {
  let name = request.body.name
  let email = request.body.email
  let password = request.body.password

  console.log('Post join request: '+name+', '+email+', '+password+';')
  response.json({ 
  	error: 'none',
  	message: 'join ok ;)',
  	key: '666'
  })
  //response.end()
})

router.post('/login', passport.authenticate('local'), function (request, response) {
	console.log('Post login request: '+request.user.name+', '+request.user.key+';')
  response.json({ 
  	error: 'none',
  	message: 'login ok ;)',
  	key: '666'
  })
})

/*router.post('/login', function (request, response) {
  let email = request.body.email
  let password = request.body.password

  console.log('Post request: '+email+', '+password+';')
  response.json({ 
  	error: 'none',
  	message: 'login ok ;)',
  	key: '666'
  })
})*/

router.get('/logout', function (request, response) {
	request.logout()
	response.redirect('/');
})

export default router