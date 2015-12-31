import express from 'express'
import bodyParser from 'body-parser'

// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
const router = express.Router({mergeParams: true})

router.use(bodyParser.json())

router.post('/join', function (request, response) {
  let name = request.body.name
  let email = request.body.email
  let password = request.body.password

  console.log('Post request: '+name+', '+email+', '+password+';')
  response.json({ 
  	error: 'none',
  	key: '666'
  })
  //response.end()
})

export default router