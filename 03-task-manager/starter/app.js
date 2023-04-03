require('./db/connect')
const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
const port = 8080
const connectDB = require('./db/connect')
require('dotenv').config()
//middleware
app.use(express.json())

//routes
app.get('/', (req, res) => {
  res.send('app is running')
})
app.use('/api/v1/tasks', tasks)

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`app is running on http://localhost:${port}`))
  } catch (error) {
    console.log(error)
  }
}
start()
