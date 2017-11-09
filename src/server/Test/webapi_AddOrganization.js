var should = require('should');
var request = require('supertest');
var app = require('../mainTest');
var helper = require('./helper');

describe('WEB', function () {

    var req, res;

        it('should be add organizantion sucessful', function (done) {

            var body = {                            
                            email: "test@test" + global.getRandomStr() + "2.com",
                            password:"rex123"                         
                        };  
            request(app)
                .post('/dogsystem/v1/organization/add')
                .send(body)
                .end(function (err, res) {

    			if (err) {
    				throw err;
    			}
                

                console.log(res.statusCode)
                res.body.should.have.property('code');
                res.body.code.should.equal(1);
			
                
                done();
            
            });   
            
        });
        
  });
    