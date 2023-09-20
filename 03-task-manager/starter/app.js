const express = require('express')
const server = express()
const tasks = require('./routes/tasks')
const connect = require('./db/connect')
require('dotenv').config()
server.use(express.json())

server.use('/api/v1/tasks' , tasks)





const startServers = async ()=>{
    try{
        await connect()
        server.listen(process.env.PORT , ()=>{
            console.log(`Server starteda at ${process.env.PORT}`)
        })
        
    }catch(error){
        console.log("server starting errors " , error)
    }
}

startServers()