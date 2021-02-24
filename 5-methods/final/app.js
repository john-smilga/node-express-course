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
app.put('/api/people/:id', (req, res) => {
  const { id } = req.params

  const person = people.find((person) => person.id === Number(id))
  if (!person) {
    return res
      .status(404)
      .json({ sucess: false, msg: `no person with id :${id}` })
  }
  const newPeople = people.map((person) => {
    if (person.id === Number(id)) {
      person.name = req.body.name
    }
    return person
  })
  return res.status(200).json({ sucess: true, data: newPeople })
})
app.delete('/api/people/:id', (req, res) => {
  const person = people.find((person) => person.id === Number(req.params.id))
  if (!person) {
    return res
      .status(404)
      .json({ sucess: false, msg: `no person with id :${req.params.id}` })
  }
  const newPeople = people.filter(
    (person) => person.id !== Number(req.params.id)
  )

  return res.status(200).json({ sucess: true, data: newPeople })
})
app.listen(5000, () => {
  console.log('server listening on port 5000...')
})
