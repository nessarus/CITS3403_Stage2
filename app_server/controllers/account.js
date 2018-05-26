var mongoose = require("mongoose");
require("../models/db")
var Account = require("../models/account");

var passport = require('passport');

//welcome page
module.exports.welcome = index;
function index(req, res){
    res.render('index', { user : req.user, title : 'gameDev' });
}


//var Account = mongoose.model('Account');

module.exports.regForm = function(req, res) {
    res.render('register', { });
};


module.exports.regist = function(req, res) {
    Account.register(new Account({ username : req.body.username }), 
           req.body.password, 
       function(err, account) {
                 if (err) {
                   return res.render('register', { msg : 'rego failed'});
                 }
                 passport.authenticate('local')(req, res, function () {
                   res.redirect('/');

                   });
               });
};

module.exports.loginForm = function(req, res) {
    res.render('login', { user : req.user });
};

module.exports.login =  function(req, res) {
   passport.authenticate('local')(req, res, function () {
        res.redirect('/');
    });
    
// passport.authenticate('local', { successRedirect: '/',
//         failureRedirect: '/login'
//         failureFlash: true 
//});
    
};

module.exports.logout = function(req, res) {
    req.logout();
    res.redirect('/');
};