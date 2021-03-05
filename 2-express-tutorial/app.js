const express = require('express')
const app = express()

// req => middleware => res

const logger = (req, res, next) => {
  console.log(req)
  const method = req.method
  const url = req.url
  const time = new Date()
  console.log(method, url, time)
  next()
}
const authorize = (req, res, next) => {
  const { user } = req.query
  if (user) {
    req.user = user
    next()
  } else {
    res.status(401).send('Unauthorized')
  }
}
app.use([logger, authorize])

app.get('/', (req, res) => {
  res.send(`Hello there ${req.user}`)
})
app.get('/about', (req, res) => {
  res.send('About')
})

app.listen(5000, () => {
  console.log('server listening on port 5000...')
})
