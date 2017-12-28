var should = require('should');
var request = require('supertest');
var app = require('../mainTest');
var helper = require('./helper');
var Const = require('../lib/consts');

describe('WEB', function () {

    var req, res;

    it('should be show organization sucessful', function (done) {
        signin(function (token) {
            request(app)
                .get('/dogsystem/v1//wx/token')
                .set('Access-Token', token)
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

});
