var assert = require('assert');
var mongoose = require('mongoose');
var db;
var AccountCtrl = require('./../app_server/controllers/account.js');
require('./../app_server/models/account.js');
var Account = mongoose.model('Account');


describe('Account',function(){
  describe('Account-Basic', function(){//group test cases together
  
    after(function(){//afert all tests are completed
      mongoose.connection.close();
    });
  
    beforeEach(function(){//run before each test
      //nothing to setup
    });
  
    //run tests

    afterEach(function(){//run after each test
      //nothing to cleanup
    });
  });

  describe('Account-Data', function(){
    before(function(done){
      db = mongoose.connect('mongodb://localhost/test');
      done();
    });

    after(function(done){
      mongoose.connection.close();
      done();
    });

    beforeEach(function(done){
      var Account = new Account({name:'Tim', email:'tim@mail',});
      Account.save(function(error){
        if (error) console.log('error');
	else console.log('data created');
	done();
      });
    });

    it('should return a Account', function(done){
      Account.findOne({name:'Tim'}, function(err, data){
        assert.deepEqual([data.name,data.email,], ['Tim','tim@mail'], 'returns Tim, tim@mail');
	done();
      });
    });

   afterEach(function(done) {
     Account.remove({},function(){
       done();
     });
   });
 });
}); 
