require('dotenv').config()
const connectionDB = require('./db/connect')
const express = require('express')
const taskRouter = require('./routes/tasks')

const app = express()
const port = 3000

// !Middleware
app.use(express.json())

//! Routes
app.use('/api/v1/tasks', taskRouter)

app.get('/', (req, res) => {
  res.send('Welcome to app')
})

//! Listen PORT
app.listen(port, () => {
  console.log('Listening for 3000 port')
})

const start = async function () {
  try {
    await connectionDB(process.env.MONGO_URL)
  } catch (error) {
    console.log(error)
  }
}
start()
