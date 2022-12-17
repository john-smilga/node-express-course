const express = require('express')
const { people } = require('./data')
const app = express()
app.use(express.json())

app.use(express.static('./methods-public'))

app.get('/', (req, res) => {
  res.send('Hi')
})

app.use(express.urlencoded({ extended: false }))
app.post('/login', (req, res) => {
  console.log(req.body)
  res.send(`Welcome ${req.body.name}`).status(200)
})

app.get('/api/people', (req, res) => {
  res.status(200).json({ success: true, data: people })
})

app.post('/api/people', (req, res) => {
  res.status(201).json({ success: true, data: people })
})

app.get('/api/postman/name', (req, res) => {
  const { name } = req.body
  res.send(name)
})

app.post('/api/postman/people', (req, res) => {
  const { name } = req.body
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: 'please provide name value' })
  }
  res.status(201).json({ success: true, data: [...people, name] })
})

app.put('/api/postman/people/:id', (req, res) => {
  const { id } = req.params
  const { name } = req.body
  const findPerson = people.find((person) => person.name === name)

  if (!findPerson) {
    return res.status(404).send({
      success: false,
      data: people,
      msg: 'Could not find that person',
    })
  } else {
    const newPeople = people.map((pers) => {
      if (pers.id === Number(id)) pers.name = name
      return pers
    })

    return res
      .send({ success: true, data: newPeople, msg: 'Here u go' })
      .status(200)
  }
})

app.listen(5000, () => {
  console.log('Litening to 5000 port')
})
