const express = require('express')
const app = express()
const jobs = require('./routes/jobs')

// set jobs router
app.use('/api/jobs', jobs)

app.listen(5000, () => {
  console.log('server listening on port 5000...')
})
