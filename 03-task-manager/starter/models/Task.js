const mongoose = require ('mongoose');

//Mangoose Schema/model
const TaskSchema = new mongoose.Schema({
    name: {
        type: String, 
        required:[true, 'must provide a name'], 
        trim: true, 
        maxlength: [20, 'name can not be more than 20 characters']
        }, 
    complited: {
        type: Boolean,
        default: false, 
    }
})

//Mongoose exporting module, mongoose model TaskSchema
module.exports = mongoose.model('Task', TaskSchema)