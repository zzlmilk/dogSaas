var should = require('should');
var request = require('supertest');
var app = require('../mainTest');
var helper = require('./helper');
var Const = require('../lib/consts');


describe('WEB API', function () {

    it('should be Edit Residence', function (done) {
        signin(function(token){
            var body = {
                husbandryNo:global.getRandomStr(),
                dogLicenseId:"5a334661aaa8832f4476ff6b",
                vaccine:{
                    name:"av",
                    batchNo:"1234",
                    manufacturer:"manufacturer",
                    veterinarianName:"veterinarianName",
                    organizationName:"organizationName",
                }

            };

            request(app)
                .post('/dogsystem/v1/vaccine/add')
                .set('Access-Token', token)
                .send(body)
                .end(function (err, res) {

                    if (err) {
                        throw err;
                    }

                    console.log(res.body.data.dogLicense)
                    res.body.should.have.property('code');
                    res.body.code.should.equal(Const.responsecodeSucceed);

                    done();

                });



        })


    });


});