const { Schema, mongoose } = require("mongoose")
const TaskSchema = new Schema({
    name:{
        type:String,
        required:[true,"Please Provide a Name"],
        maxlength:[20,"Please Provide Smaller name"]
    },
    pass:Boolean
})

module.exports = mongoose.model('Tasks',TaskSchema);