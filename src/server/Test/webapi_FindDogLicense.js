var should = require('should');
var request = require('supertest');
var app = require('../mainTest');
var helper = require('./helper');
var Const = require('../lib/consts');


describe('WEB API', function () {
		it(' find DogLicense by owner', function (done) {

				signin(function(token){

							//参数
							var body = {
							    name:" ",
                                phone:" ",
                                certificateType:"1",
                                certificateCode:"31010211111111"
                            	
                        	}; 

                        request(app)
                        .get('/dogsystem/v1/dogLicense/find_by_owner')
                        .set('Access-Token', token)    
                        .send(body)
                        .end(function (err, res) {

                        if (err) {
                            throw err;
                        }

                        console.log(res.body.data)
                        
                      //   res.body.should.have.property('code');
                         res.body.code.should.equal(Const.responsecodeSucceed);
                        done();
                    
                    });    


				})
        })
    it(' find DogLicense by dog ', function (done) {

        signin(function(token){

            //参数
            var body = {
                irisID:"b123456789",
                cardNo:"6VTUvrMRnT"

            };

            request(app)
                .get('/dogsystem/v1/dogLicense/find_by_dog')
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