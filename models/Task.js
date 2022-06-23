const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({

    titulo: {
        type: String,
        required: true
    },
    status: {
        type: Boolean
    },
    duration: { 
        type: String
    },
    userId:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
         required: true
        }]
    },  
{
    timestamps: true
}
);
const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;