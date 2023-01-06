const Task = require('../models/task')

const getTasks = (req, res)=>{


    res.send('fetch all tasks')

    
}


const postTasks = async (req, res)=>{

    const task = await Task.create(req.body)

    // res.send('create a task')

    res.status(201).json({task})

}

const getSingleTask = (req, res)=>{

    // res.send('Get a single task by id')

    res.json({id:req.params.id})
}

const updateTask = (req, res)=>{

    res.send('Update a task using patch')
}

const deleteTask = (req, res)=>{

    res.send('delete a task using id')
}




module.exports ={

    getTasks,
    postTasks,
    getSingleTask,
    updateTask,
    deleteTask
}