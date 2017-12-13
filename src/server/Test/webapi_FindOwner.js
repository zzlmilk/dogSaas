var should = require('should');
var request = require('supertest');
var app = require('../mainTest');
var helper = require('./helper');
var Const = require('../lib/consts');


describe('WEB API', function () {
    it(' find  owner sucessful', function (done) {

        signin(function(token){

            //参数
            var body = {
                certificateType:"1",
                certificateCode:"31010222222222"

            };

            request(app)
                .get('/dogsystem/v1/owner/find')
                .set('Access-Token', token)
                .query(body)

                .end(function (err, res) {

                    if (err) {
                        throw err;
                    }

                    console.log(res.body)

                    res.body.should.have.property('code');
                    res.body.code.should.equal( Const.responsecodeSucceed);
                    done();

                });


        })
    })
})