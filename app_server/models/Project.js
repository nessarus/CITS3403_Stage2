var mongoose = require('mongoose');

var taskSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        Importance: String,
        deadline: Date
    }
);

var memberSchema = new mongoose.Schema(
    {
        user: String,
    }
);

var projectSchema = new mongoose.Schema(
    {
        title:String,
        description: String,
        leader: String,
        members: [memberSchema],
        tasks: [taskSchema]
    }
);


mongoose.model('Project', projectSchema, 'projects');
