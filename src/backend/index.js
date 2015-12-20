/**
* src/backend/index.js
*/

import express from 'express'

const app = express()

app.use(express.static('public'))

app.listen(3000, function () {
  console.log('Start engine. Listening on port 3000')
})
