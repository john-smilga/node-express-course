const express = require('express')

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Welcome to app')
})

app.listen(port, () => {
  console.log('Listening for 5000 port')
})
