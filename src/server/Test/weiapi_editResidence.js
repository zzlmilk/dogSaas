var should = require('should');
var request = require('supertest');
var app = require('../mainTest');
var helper = require('./helper');
var Const = require('../lib/consts');


describe('WEB API', function () {

	 it('should be Edit Residence', function (done) {
	 		 signin(function(token){
	 		 		var body = {                                            
                            dogLicenseId:"5a26475493f3485bc4d470cd",                                           
                            residence:{
                                houseNo:global.getRandomStr(),
                                houseProperty:"ziyou",
                                address:global.getRandomStr(),
                                isSterilization:"0"
                            }
                                              	
                        };  

                        request(app)
                        .post('/dogsystem/v1/residence/edit')
                        .set('Access-Token', token)    
                        .send(body)
                        .end(function (err, res) {

                        if (err) {
                            throw err;
                        }
                        
                        console.log(res.body)
                        res.body.should.have.property('code');
                        res.body.code.should.equal(Const.responsecodeSucceed);
                        
                        done();
                    
                    });   



	 		 })


	 });


})