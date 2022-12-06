require('dotenv').config()
//async errors
require('express-async-errors')

const express = require('express')

const app = express()
const connectDB = require('./db/connect')
const productRouter=require('./routes/products')
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

//middleware
app.use(express.json())

//routes

app.get('/', (req, res) => {
  res.send('<h1>Store api</h1><a href="/api/v1/products">products</a>')
})
app.use('/api/v1/products',productRouter)
//products route

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)
const port = process.env.PORT || 3000
const start = async () => {
  try {
    //connectDb return a promise
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`server is running in ${port}`))
  } catch (error) {
    console.log(error)
  }
}
start()
