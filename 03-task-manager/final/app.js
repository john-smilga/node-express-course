const express = require('express')
const app = express()
require('dotenv').config()
const connectDB = require('./db/connect')
const tasks = require('./routes/tasks')
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// middleware
// static assets
app.use(express.static('./public'))
app.use(express.json())

// routes
app.get('/', (req, res) => {
  res.send('Task Manager app')
})
// tasks routes
app.use('/api/tasks', tasks)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`server is listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

start()
