var should = require('should');
var request = require('supertest');
var app = require('../mainTest');
var helper = require('./helper');
var Const = require('../lib/consts');

describe('WEB API', function () {


    it('should be add successful', function (done) {
        signin(function (token) {
            var body = {
                dogLicenseId:"5a30beb43b78e04c742cb422",
                takeWay:1
            };

            request(app)
                .post('/dogsystem/v1/dogLicense/add_takeWay')
                .set('Access-Token', token)
                .send(body)
                .end(function (err, res) {

                    if (err) {
                        throw err;
                    }

                    console.log(res.body.data)
                    res.body.should.have.property('code');
                    res.body.code.should.be.equal(Const.responsecodeSucceed);
                    done();

                });

        });


    });
});
