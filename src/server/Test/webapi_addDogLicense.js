var should = require('should');
var request = require('supertest');
var app = require('../mainTest');
var helper = require('./helper');
var Const = require('../lib/consts');


describe('WEB API', function () {

	 it('should be add dog sucessful', function (done) {
	 		 signin(function(token){
	 		 		var body = {
                            husbandryNo:global.getRandomStr(),
                            dog:{
                                nickname: "test_" + global.getRandomStr(),
                                sex:"2",
                                breed:"breed",
                                usage:"警卫",
                                hairColor:"白色",
                                bornDate:"2016-08-10",
                                irisID:"g123",
                                photoUrl:"123",
                                 vaccine:[{
                                      name:"",
                                      batchNo:"123",
                                      manufacturer:"manufacturer",
                                      veterinarianName:"veterinarianName",
                                      organizationName:"organizationName",
                                 }]

                            },                            
                            owner:{
                                name: "test_"+global.getRandomStr(),
                                sex:"1",
                                tel:"345033",
                                phone:"15901794453",
                                certificateType:"1",
                                certificateCode:"31010222222222",
                            location: {
                                  province: "province",
                                  district: "district",
                                  city: "city",
                                  address: "address",
                                  code: "code"
                            }

                            },                        
                            residence:{
                                houseNo:global.getRandomStr(),
                                houseProperty:"ziyou",
                                address:global.getRandomStr(),
                                isSterilization:"0"
                            },



                                              	
                        };  

                        request(app)
                        .post('/dogsystem/v1/dogLicense/add')
                        .set('Access-Token', token)    
                        .send(body)
                        .end(function (err, res) {

                        if (err) {
                            throw err;
                        }

                        console.log(res.body.data)
                        // console.log(JSON.parse(res.body.data))
                        res.body.should.have.property('code');
                        res.body.code.should.equal(Const.responsecodeSucceed);
                        
                        done();
                    
                    });   



	 		 })


	 });


})