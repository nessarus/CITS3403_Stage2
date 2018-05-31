var mongoose = require('mongoose');

var taskSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        Importance: String,
        deadline: Date
    }
);

var projectSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        leader: String,
        members: [String],
        tasks: [taskSchema]
    }
);


mongoose.model('Project', projectSchema, 'projects');
