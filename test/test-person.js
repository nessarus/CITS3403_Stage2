var assert = require('assert');
var mongoose = require('mongoose');
var db;
var AccountCtrl = require('./../app_server/controllers/account.js');
require('./../app_server/models/account.js');
var Account = mongoose.model('Account');

var DOB1, DOB2;

describe('Account',function(){
  describe('Account-Basic', function(){//group test cases together
  
    before(function(){//before the tests begin
      DOB1 = new Date(2001, 12, 24);
      DOB2 = new Date(2001, 1, 24);
    });
  
    after(function(){//afert all tests are completed
      mongoose.connection.close();
    });
  
    beforeEach(function(){//run before each test
      //nothing to setup
    });
  
    //run tests
    it('tests age for late birthday', function(){
      assert.equal(AccountCtrl.age(DOB1), 14, 'Age should be 14');
      });
  
    it('tests age for early birthday', function(){
      assert.equal(AccountCtrl.age(DOB2), 15, 'Age should be 15');
      });
    
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
      var Account = new Account({name:'Tim', email:'tim@mail', age:37});
      Account.save(function(error){
        if (error) console.log('error');
	else console.log('data created');
	done();
      });
    });

    it('should return a Account', function(done){
      Account.findOne({name:'Tim'}, function(err, data){
        assert.deepEqual([data.name,data.email,data.age], ['Tim','tim@mail',37], 'returns Tim, tim@mail, 37');
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
