/**
* src/backend/index.js
*/

import express from 'express'
import api from './api'

const app = express()

app.use(express.static('public'))

app.use('/api', api)

app.listen(3000, function () {
  console.log('Start engine. Listening on port 3000')
})
