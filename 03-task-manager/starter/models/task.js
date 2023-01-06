const mongoose = require('mongoose')


const TaskSchema = new mongoose.Schema({

    // Basic structure of the database
    // key value pairs where the name and completed are the keys
    // after setting up the structure now come up with a model which is a representation of a collection

    name:String, completed:Boolean

})

module.exports = mongoose.model('Task', TaskSchema) 