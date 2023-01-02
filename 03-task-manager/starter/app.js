const express = require('express')
const app = express()
const port = 3000;
const task = require('./routes/task')



app.use(express.json())

app.get('/hello', (req, res)=>{
    res.send('Hello')
})


app.use('/api/v1/tasks', task)



// app.all('*', (req, res)=>{

//     res.send('Error page')
// })



app.listen({port}, ()=>{

    console.log(`Server is listening on port ${port}`)
})
