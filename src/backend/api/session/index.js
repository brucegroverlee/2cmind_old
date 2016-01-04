import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import expressSession from 'express-session'
import passport from 'passport'

const LocalStrategy = require('passport-local').Strategy
// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
const router = express.Router({mergeParams: true})

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))
router.use(cookieParser())
router.use(expressSession({ secret: 'ccmind sessions' }))
router.use(passport.initialize())
router.use(passport.session())

passport.use('join', new LocalStrategy({
    usernameField: 'email',
    passReqToCallback : true
  }, 
  function (request, username, password, done) {
    let email = username
    console.log('Join LocalStrategy: email: '+email+', password: '+password)
    if (true) {
      return done(null, {name: 'bruce grover', lastname: 'lee', key: '666'})
    }

    done(null, false, { message: 'Unknow user'})
    console.log('Join LocalStrategy failed')
  }
))

passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  function (username, password, done) {
    let email = username
  	if (email === 'brucegrover.lee@gmail.com' && password === '123') {
  		return done(null, {name: 'bruce grover', lastname: 'lee', key: '666'})
  	}

  	done(null, false, { message: 'Unknow user'})
  	console.log('Post login request: Unknow user')
  }
))

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))

router.post('/join', passport.authenticate('join'), function (request, response) {
  let name = request.body.name
  let email = request.body.email
  let password = request.body.password

  console.log('Post join request: '+name+', '+email+', '+password+';')
  response.json({ 
  	error: 'none',
  	message: 'join ok ;)',
  	key: '666'
  })
})

router.post('/login', passport.authenticate('local'), function (request, response) {
	console.log('Post login request: '+request.user.name+', '+request.user.key+';')
  response.json({ 
  	error: 'none',
  	message: 'login ok ;)',
  	key: '666'
  })
})

router.get('/logout', function (request, response) {
	request.logout()
	response.redirect('/');
})

router.post('/user', function (request, response) {
  response.json({
    error: 'none',
    id: '1',
    key: '666',
    name: 'bruce'
  });
})

export default router