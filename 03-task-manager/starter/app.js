const express = require('express')
const app = express();
const tasks = require("./routes/tasks")
const port = 3000
app.use(express.json())
app.get('/',(req,res)=>{
    res.send("Hello")
})

app.use('/api/v1/tasks',tasks)
app.listen(3000,console.log(`Server Is Listening on port ${port}...`))