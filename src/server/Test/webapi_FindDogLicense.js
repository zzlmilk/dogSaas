var should = require('should');
var request = require('supertest');
var app = require('../mainTest');
var helper = require('./helper');
var Const = require('../lib/consts');


describe('WEB API', function () {
		it(' should find DogLicense by owner', function (done) {

				signin(function(token){

							//参数
							var body = {
                                  // name:"test_kEiAr",
                                  // phone:"15901794453",
                                // certificateType:"1",
                                // certificateCode:"31010222222222"
                                   page:"1"
                            	
                        	}; 

                        request(app)
                        .post('/dogsystem/v1/dogLicense/find_by_owner')
                        .set('Access-Token', token)    
                        .send(body)
                        .end(function (err, res) {

                        if (err) {
                            throw err;
                        }

                        console.log(res.body.data.dogLicenses)

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
                // cardNo:"3QYuxjeBis",
                page :"1"

            };

            request(app)
                .post('/dogsystem/v1/dogLicense/find_by_dog')
                .set('Access-Token', token)
                .send(body)
                .end(function (err, res) {

                    if (err) {
                        throw err;
                    }

                    console.log(res.body.data.dogLicenses)

                    res.body.should.have.property('code');
                    res.body.code.should.equal(1);
                    done();

                });


        })
    })
})