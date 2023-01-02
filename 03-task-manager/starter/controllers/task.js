

const getTasks = (req, res)=>{
    res.send('fetch all tasks')
}


const postTasks = (req, res)=>{

    res.send('create a task')

}

const getSingleTask = (req, res)=>{

    res.send('Get a single task by id')
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