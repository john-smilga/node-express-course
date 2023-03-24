 const express = require('express')
 const app = express();
 const tasks = require('./routes/tasks')
 const connectDB = require('./db/connect');
const conecteDB = require('./db/connect');
require('dotenv').config()
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')


//Middleware
app.use(express.static('./public'))
 app.use(express.json()) //if we dont have this, we cant access the data in req.body. 

//Routes
app.use('/api/v1/tasks', tasks) //root route for task router
app.use(notFound)
app.use(errorHandlerMiddleware)

//Start
const port =process.env.PORT || 3047

const start = async () => {
    try {
        await conecteDB(process.env.MONGO_URI)
        app.listen(port, console.log(`server is listnening on port ${port}...`))
    }catch (error) {
        console.log(error);
    }
} 

start()