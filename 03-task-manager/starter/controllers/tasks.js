const getAllTask = (req ,res)=>{
    res.send('all item cont')
}

const createTask = (req , res)=>{
    res.send("create tasks")
}

const getTask =(req , res)=>{
    res.send("get task")
}

const updateTask =(req , res)=>{
    res.send("update task")
}

const deleteTask =(req , res)=>{
    res.send("delete task")
}

module.exports={
    getAllTask,
    deleteTask,
    updateTask,
    getTask,
    createTask

}