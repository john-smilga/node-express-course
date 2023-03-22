 const express = require('express')
 const app = express();
 const tasks = require('./routes/tasks')
 const connectDB = require('./db/connect');
const conecteDB = require('./db/connect');


//Middleware
 app.use(express.json()) //if we dont have this, we cant access the data in req.body. 

//Routes
app.get('/hello', (req, res) => { 
    res.send('task manager app')
})

//Root route for task router
app.use('/api/v1/tasks', tasks)


 const port = 3000

 const start = async () => {
    try {
        await conecteDB()
        app.listen(port, console.log(`server is listnening on port ${port}...`))
    }catch (error) {
        console.log(error);
    }
 } 

start()