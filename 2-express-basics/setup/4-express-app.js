const express = require('express')
const path = require('path')
const app = express()
// get all files

// setup static and middleware
app.use(express.static('./static'))
//
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './navbar-app/index.html'))
})
app.get('/about', (req, res) => {
  res.send('About Page')
})
app.listen(5000, () => {
  console.log('server listening on port 5000...')
})
