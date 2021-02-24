const express = require('express')
const app = express()

// req =>  res

app.get('/', (req, res) => {
  res.send('Middleware???')
})

app.listen(5000, () => {
  console.log('server listening on port 5000...')
})
