const express = require('express')
const app = express()
// get all files

// setup static and middleware
app.use(express.static('./static'))
// multiple options
app.all('*', (req, res) => {
  res.status(404).send('<h1>page not found</h1>')
})
app.listen(5000, () => {
  console.log('server listening on port 5000...')
})
