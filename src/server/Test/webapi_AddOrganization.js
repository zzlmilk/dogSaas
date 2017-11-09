var should = require('should');
var request = require('supertest');
var app = require('../mainTest');
var helper = require('./helper');

describe('WEB', function () {

    var req, res;

        it('should be add organizantion sucessful', function (done) {
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
                        res.body.code.should.equal(1);
                    
                        
                        done();
                    
                    });   


            })
            
            
        });
        
  });
    