const TaskSchema = require('../model/Task')
const asyncWrapper = require('../middleware/async-wrapper')
const getAllTasks = asyncWrapper(async(req,res) =>{
    const {name,pass} = req.body
    const data = await TaskSchema.find({name:name,pass:pass})
       res.status(200).json({nbhits:data.length,data})
})
const createTask = asyncWrapper(async(req,res)=>{
        const data = await TaskSchema.create(req.body);
        res.status(201).json({data})
    
})
const getTask = asyncWrapper(async(req,res)=>{
    const taskID = req.params.id
    const data = await TaskSchema.findById({_id:taskID})
    res.json({data})
})
const updateTask = (req,res)=>{
    res.send('create Task')
}
const deleteTask = (req,res)=>{
    res.send('create Task')
}
module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}