const mongoose = require('mongoose');

const TaskSchema =new mongoose.Schema({
    task:String,
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Task = mongoose.model('Task', TaskSchema)

module.exports = Task