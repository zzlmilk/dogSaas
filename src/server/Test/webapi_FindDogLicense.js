var should = require('should');
var request = require('supertest');
var app = require('../mainTest');
var helper = require('./helper');


describe('WEB API', function () {
		it(' find DogLicense by phone ', function (done) {

				signin(function(token){

							//参数
							var body = {
							    name:" ",
                                phone:"15901794453",
                                certificateType:"1",
                                certificateCode:"31010222222222"
                            	
                        	}; 

                        request(app)
                        .post('/dogsystem/v1/dogLicense/find')
                        .set('Access-Token', token)    
                        .send(body)
                        .end(function (err, res) {

                        if (err) {
                            throw err;
                        }

                        console.log(res.body.data)
                        
                         res.body.should.have.property('code');
                         res.body.code.should.equal(1);
                        done();
                    
                    });    


				})
        })
})