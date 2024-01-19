const TaskSchema = require('../model/Task')
const getAllTasks = async(req,res) =>{
    const {name,pass} = req.body
    const data = await TaskSchema.find({name:name,pass:pass})
    res.status(200).json({data,nbhits:data.length})
}
const createTask = async(req,res)=>{
    try {
        const data = await TaskSchema.create(req.body);
        res.status(201).json({data})
    } catch (error) {
        res.status(500).json("Please Fill Required Value correctly")
    }
}
const getTask = async(req,res)=>{
    const taskID = req.params.id
    const data = await TaskSchema.findById({_id:taskID})
    console.log(req.params.id)
    res.json({data})
}
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