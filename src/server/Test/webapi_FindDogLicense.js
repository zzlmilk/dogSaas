var should = require('should');
var request = require('supertest');
var app = require('../mainTest');
var helper = require('./helper');


describe('WEB API', function () {
		it('should be add dog sucessful', function (done) {

				signin(function(token){

							//参数
							var body = {                            
                            	 husbandryNo:"1234",
                            	
                        	}; 

                        request(app)
                        .get('/dogsystem/v1/dogLicense/find')
                        .set('Access-Token', token)    
                        .send(body)
                        .end(function (err, res) {

                        if (err) {
                            throw err;
                        }

                        console.log(res.body)
                        
                        // res.body.should.have.property('code');
                        // res.body.code.should.equal(1);
                        
                        done();
                    
                    });    


				})

		})



})