const express = require('express')
const app = express()
const port = 3000;
const task = require('./routes/task')
const connectDB = require('./DB/connection')
require('dotenv').config()


app.use(express.json())

app.get('/hello', (req, res)=>{
    res.send('Hello')
})


app.use('/api/v1/tasks', task)



// app.all('*', (req, res)=>{

//     res.send('Error page')
// })

const DB = async()=>{

    try{

        await connectDB(process.env.Mongo_secret_key)

        app.listen({port}, ()=>{
        
            console.log(`Server is listening on port ${port}`)
        })

    }

    catch(error){

        console.log(error)

    }
}

DB()



