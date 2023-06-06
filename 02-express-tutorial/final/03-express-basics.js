const express = require('express')
const app = express()
const PORT = 5000

app.get('/', (req, res) => {
  console.log('user hit the resource')
  res.status(200).send('Home Page')
})

app.get('/about', (req, res) => {
  res.status(200).send('About Page')
})

app.all('*', (req, res) => {
  res.status(404).send('<h1>resource not found</h1>')
})

app.listen(PORT, () => {
  console.log(`SERVER IS UP AND RUNNING ON PORT ${PORT}`)
})

// app.get
// app.post
// app.put
// app.delete
// app.all
// app.use
// app.listen
