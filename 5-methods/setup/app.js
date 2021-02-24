const express = require('express')
const app = express()
// people
let people = require('./data')

// static assets
app.use(express.static('./public'))
// parse form data
app.use(express.urlencoded({ extended: false }))
// parse json
app.use(express.json())

app.post('/login', (req, res) => {
  const { name } = req.body
  if (name) {
    return res.status(200).send(`Welcome ${name}`)
  }
  res.status(401).send('Please Provide Credentials')
})

app.get('/api/people', (req, res) => {
  res.status(200).json({ sucess: true, people })
})
app.post('/api/people', (req, res) => {
  const { name } = req.body

  if (!name) {
    return res
      .status(400)
      .json({ sucess: false, msg: 'please provide name value' })
  }
  res.status(201).json({ sucess: true, person: name })
})

app.listen(5000, () => {
  console.log('server listening on port 5000...')
})
