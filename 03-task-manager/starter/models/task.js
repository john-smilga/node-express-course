const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    completed: {
        type:Boolean,
        required:true,
    }
})

const TaskModel = mongoose.model('Task' , TaskSchema)