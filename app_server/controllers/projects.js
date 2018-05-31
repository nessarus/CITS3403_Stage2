var mongoose = require("mongoose");
require("../models/db")
require("../models/Project");

var Project = mongoose.model('Project');



//Project List
module.exports.prjList = index;
function index(req, res, next){
    // if user is not logged-in redirect back to login page //
    if (req.user == null){
        res.redirect('/login');
    }
    Project.find().exec(
        function(err, data){
            if(err){
                res.render('error', {
                    message:err.message,
                    error:err
                })
            }else{
                console.log('Find complete');

                res.render('projects', {
                    title: 'My Projects', projects:data, user:req.user});
                    
            }
        }
    )
}

//My Projects page
module.exports.myProject = myProject;
function myProject(req, res){
    res.render('index', { user : req.user, title : 'gameDev' });
}



//New Project page
module.exports.prjCreate = pCreate;
function pCreate(req, res, next){
    if (req.user == null){
        res.redirect('/login');
    }
    Project.find().exec(
        function(err, data){
            if(err){
                res.render('error', {
                    message:err.message,
                    error:err
                })
            }else{
                console.log('Find complete');

                res.render('new_project', {
                    title: 'Create New Project', projects:data, user:req.user});
                    
            }
        }
    )
}
module.exports.prjCre = function(req, res, next){
    var newProject = new Project({
        title: req.body.title,
        description: req.body.description, 
        leader: req.user.username,
        members: [req.user.username]
    });
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
            res.redirect('/projects');
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
            res.redirect('/projects');
        }
    });   
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
