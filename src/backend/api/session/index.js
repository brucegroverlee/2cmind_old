import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import expressSession from 'express-session'
import passport from 'passport'
import mongoose from 'mongoose'

const LocalStrategy = require('passport-local').Strategy
// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
const router = express.Router({mergeParams: true})

mongoose.connect('mongodb://localhost/2cmind');

var User = mongoose.model('User',{
  name: String,
  email: String,
  password: String,
  key: String
})

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))
router.use(cookieParser())
router.use(expressSession({ secret: '2cmind sessions', resave: false, saveUninitialized: true }))
router.use(passport.initialize())
router.use(passport.session())

passport.use('join', new LocalStrategy({
    usernameField: 'email',
    passReqToCallback : true
  }, 
  function (request, username, password, done) {
    let email = username
    console.log('Join LocalStrategy: email')
    
    //findOrCreateUser = function () {
      // find a user in Mongo with provided username
      User.findOne({'email':email}, function(err, user) {
        // In case of any error return
        if (err){
          console.log('Error in SignUp: '+err)
          return done(err)
        }
        // already exists
        if (user) {
          console.log('User already exists')
          return done(null, false, 
             request.flash('message','User Already Exists'))
        } else {
          // if there is no user with that email
          // create the user
          var newUser = new User()
          // set the user's local credentials
          newUser.name = request.body.name
          newUser.email = email
          newUser.password = password
          newUser.key = '666'
 
          // save the user
          newUser.save(function(err) {
            if (err){
              console.log('Error in Saving user: '+err)
              throw err
            }
            console.log('User Registration succesful')
            return done(null, newUser)
          })
        }
      })
    //}
     
    // Delay the execution of findOrCreateUser and execute 
    // the method in the next tick of the event loop
    //process.nextTick(findOrCreateUser)

    /*if (true) {
      return done(null, {name: 'bruce grover', lastname: 'lee', key: '666'})
    }

    done(null, false, { message: 'Unknow user'})
    console.log('Join LocalStrategy failed')*/
  }
))

passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  function (username, password, done) {
    let email = username
    console.log('Login LocalStrategy: email')
    // check in mongo if a user with username exists or not
    User.findOne({ 'email' :  email }, 
      function(err, user) {
        // In case of any error, return using the done method
        if (err)
          return done(err)
        // Username does not exist, log error & redirect back
        if (!user){
          console.log('User Not Found with email: '+email)
          return done(null, false, { message: 'User Not found.'})              
        }
        // User exists but wrong password, log the error 
        //if (!isValidPassword(user, password)){
        if ( 0 !== password.localeCompare(user.password) ){
          console.log('Invalid Password')
          return done(null, false, { message: 'Invalid Password' })
        }
        // User and password both match, return user from 
        // done method which will be treated like success
        console.log('User Login succesful')
        return done(null, user)
      }
    )
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
  	message: 'join ok ;)'
  })
})

router.post('/login', passport.authenticate('local'), function (request, response) {
	console.log('Post login request: '+request.user.name+', '+request.user.key+';')
  response.json({ 
  	error: 'none',
  	message: 'login ok ;)'
  })
})

router.get('/logout', function (request, response) {
	request.logout()
	response.redirect('/');
})

router.post('/user', function (request, response) {
  response.json({
    error: 'none',
    message: 'user ok ;)',
    user: request.user
  });
})

export default router