require("dotenv").config()
const express = require('express')
const app = express();
const tasks = require("./routes/tasks")
const port = 5000
const {connectDB} = require("./db/connect")
const notFound = require("./middleware/not-found")
const start = async() =>{
    try {
        await connectDB(process.env.MONGO_URI)
        console.log("DB connected")
    } catch (error) {
        console.log(error)
    }
}
app.use(express.json())
app.get('/',(req,res)=>{
    res.send("Hello")
})

app.use('/api/v1/tasks',tasks)
app.use(notFound)

app.listen(port,console.log(`Server Is Listening on port ${port}...`))
start()