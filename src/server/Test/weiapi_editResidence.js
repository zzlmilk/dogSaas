var should = require('should');
var request = require('supertest');
var app = require('../mainTest');
var helper = require('./helper');
var Const = require('../lib/consts');


describe('WEB API', function () {

	 it('should be Edit Residence', function (done) {
	 		 signin(function(token){
	 		 		var body = {                                            
                            dogLicenseId:"5a2e570792f3982724eea239",
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