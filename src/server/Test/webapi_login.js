var should = require('should');
var request = require('supertest');
var app = require('../mainTest');


describe('WEB', function () {

    var req, res;
        it('should be login in  Sucessful', function (done) {
            var body = {                            
                            email: "4134766q.com",
                            password:"rex123"                         
                        };  

            request(app)
                .post('/dogsystem/v1/user/login')
                .send(body)
                .end(function (err, res) {

    			if (err) {
    				throw err;
    			}
			
                console.log(res.body)
                
                done();
            
            });   
            
        });
        
  });
