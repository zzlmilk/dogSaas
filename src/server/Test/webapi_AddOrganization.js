var should = require('should');
var request = require('supertest');
var app = require('../mainTest');
var helper = require('./helper');
var Const = require('../lib/consts');

describe('WEB', function () {

    var req, res;

        it('should be add organizantion fault', function (done) {
            signin(function(token){
                 var body = {                            
                            name: "test_" + global.getRandomStr(),
                            province:"上海",
                            district:"",
                            city:"",
                            address:"",
                            code:"",
                            tel:"",
                            businessLicense:"",
                            animalMedicalLicense:"",
                            serviceScope:"",
                            contacts_name:"",
                            contacts_phone:""
                        };  
                     request(app)
                        .post('/dogsystem/v1/organization/add')
                        .set('Access-Token', token)    
                        .send(body)
                        .end(function (err, res) {

                        if (err) {
                            throw err;
                        }
                        
                        res.body.should.have.property('code');
                        res.body.code.should.equal(Const.resCodeOrganizationParamIsEmpty);
                        
                        done();
                    
                    });   


            })
            
            
        });

        it('should be add organizantion sucessful', function (done) {
            signin(function(token){
                 var body = {                            
                            name: "test_" + global.getRandomStr(),
                            province:"上海",
                            district:"浦东新区",
                            city:"航头镇",
                            address:"杭南公路",
                            code:"123456",
                            tel:"15838365455",
                            businessLicense:"123",
                            animalMedicalLicense:"123",
                            serviceScope:"123",
                            contacts_name:"admin",
                            contacts_phone:"15838365455"
                        };  
                     request(app)
                        .post('/dogsystem/v1/organization/add')
                        .set('Access-Token', token)    
                        .send(body)
                        .end(function (err, res) {

                        if (err) {
                            throw err;
                        }
                        
                        res.body.should.have.property('code');
                        res.body.code.should.equal(Const.responsecodeSucceed);
                        
                        done();
                    
                    });   


            })
            
            
        });
        
  });
    