var mongoose = require("mongoose");
require("../models/db")
var Account = require("../models/account");

var passport = require('passport');

//welcome page
module.exports.welcome = index;
function index(req, res){
    res.render('index', { user : req.user, title : 'gameDev' });
}

//profile page
module.exports.profile = function(req, res){
    if (req.user == null){
        res.redirect('/login');
    }
    console.log(req.user);
    res.render('profile', {
        title : 'Profile', 
        user:req.user 
    });
};

module.exports.prof = function(req, res){
    Account.update({_id: req.user}, { $set: {
        first: req.body.first,
        last: req.body.last,
        mobile: req.body.mobile,
        email: req.body.email,
        expertise: req.body.expertise,
        interests: req.body.interests,
        genres: req.body.genres
    }}, function (err, data) {
        if(err) {
            console.log(err);
            res.status(500);
            res.render('error', {
                message:err.message,
                error:err
            });
        } else {
            console.log(data, ' saved');
            res.redirect('/profile');
        }
    });
}

//chat page
module.exports.chat = function(req, res){
    res.render('chat', { user : req.user, title : 'Chat' });
}

//about page
module.exports.about = function(req, res){
    res.render('about', { user : req.user, title : 'About' });
}

//register page
module.exports.register = function(req, res) {
    res.render('registeruser', { user : req.user, title : 'Register' });
};


module.exports.regist = function(req, res) {
    Account.register( 
        new Account({ 
            username : req.body.username,
            first: req.body.first,
            last: req.body.last,
            mobile: req.body.mobile,
            email: req.body.email,
            expertise: req.body.expertise,
            interests: req.body.interests,
            genres: req.body.genres
        }), 
        req.body.password, 
        function(err, account) {
            if (err) {
                return res.render('registeruser', { msg : 'rego failed'});
            }
            passport.authenticate('local')(req, res, function () {
                res.redirect('/');
            });
        }
    );
};

//login page
module.exports.loginForm = function(req, res) {
    res.render('loginpage', { user : req.user, title: "Login"});
};

module.exports.login =  function(req, res) {
    passport.authenticate('local')(req, res, function () {
        res.redirect('/');
    });
};

module.exports.logout = function(req, res) {
    req.logout();
    res.redirect('/');
};
