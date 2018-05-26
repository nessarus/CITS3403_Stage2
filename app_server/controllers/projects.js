
var mongoose = require("mongoose");
require("../models/db")
require("../models/Project");

var Project = mongoose.model('Project');



//Retrieve
module.exports.prjList = index;

function index(req, res, next){
    Project.find().exec(
        function(err, data){
            if(err){
                res.render('error', {
                    message:err.message,
                    error:err
                })
            }else{
                console.log('Find complete');

                res.render('prjList', {
                    title: 'List of projects', projects:data, user:req.user});
                    
            }
        }
    )
}


/*
module.exports.prjList = function(req, res, next) {
    res.render('prjList', { title: 'List of projects', projects: [
        {title: 'one', description: 'project one', tasks:[{title:"prj 1 task 1"}]},
        {title: 'two', description: 'project two', tasks:[{title:"prj 2 task 1"}]}
    ] });
}
*/

module.exports.newPrj = function(req, res, next){
    var newProject = new Project({
        title: req.body.title, 
        description: req.body.description});
    newProject.save(function(err,data){
        if(err){
            console.log(err);
            res.status(500);
            res.render('error',{
                message:err.message,
                error:err
            });
        }else{
            console.log(data, ' saved');
            index(req,res,next);
        }
    });   
}

module.exports.newTask = function(req, res, next){
    var newTask = {
        title: req.body.title, 
        deadline: req.body.deadline};
    Project.update({_id:req.params.id}, {$push: {tasks:newTask}}, function(err,data){
        if(err){
            console.log(err);
            res.status(500);
            res.render('error',{
                message:err.message,
                error:err
            });
        }else{
            console.log(data, ' saved');
            index(req,res,next);
        }
    });   
}
module.exports.delPrj = function(req, res, next){
    
    Project.remove({_id:req.params.id}, function(err,data){
        if(err){
            console.log(err);
            res.status(500);
            res.render('error',{
                message:err.message,
                error:err
            });
        }else{
            console.log(req.params.id, ' removed');
            index(req,res,next);
        }
    });   
}

module.exports.delTask = function(req, res, next){


    Project.findOne({_id: req.params.pid}, function(err, data){
        
        if(err){
            console.log(err);
            res.status(500);
            res.render('error',{
                message:err.message,
                error:err
            });
        }else{
            //console.log(data.tasks);
            data.tasks.id(req.params.tid).remove();
            data.save( function(err,data){
                if(err){
                    console.log(err);
                    res.status(500);
                    res.render('error',{
                        message:err.message,
                        error:err
                    });
                }else{
                    //data.tasks.id(req.params.tid).remove();
                    
                    console.log(req.params.tid, 'of', req.params.pid, ' removed');
                    index(req,res,next);
                }
            });   

        }
    });
        
}
//module.exports = prjList;