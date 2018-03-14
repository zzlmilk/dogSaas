var should = require('should');
var request = require('supertest');
var app = require('../mainTest');
var helper = require('./helper');
var Const = require('../lib/consts');


describe('WEB API', function () {

    it('should be add successful', function (done) {
        signin(function(token){
            var body = {
                    husbandryNo:global.getRandomStr(),
                    dogLicenseId:"5aa8d8c751a59f633c1d048a",
                    vaccine:{
                        name:"haha",
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

                    console.log(res.body.data);
                    res.body.should.have.property('code');
                    res.body.code.should.equal(Const.responsecodeSucceed);

                    done();

                });



        })


    });
    it('should be annual dogCard successful', function (done) {
        signin(function (token) {
            var body = {
                dogLicenseId: "5aa8d8c751a59f633c1d048a"
            };

            request(app)
                .post('/dogsystem/v1/dogCard/annual')
                .set('Access-Token', token)
                .send(body)
                .end(function (err, res) {

                    if (err) {
                        throw err;
                    }

                    console.log(res.body.data);
                    res.body.should.have.property('code');
                    res.body.code.should.equal(Const.responsecodeSucceed);

                    done();

                });


        })
    })


    });