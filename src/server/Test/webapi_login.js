var should = require('should');
var request = require('supertest');
var app = require('../mainTest');
var Const = require('../lib/consts');

describe('WEB', function () {

    var req, res;
    it('should be login in  Sucessful', function (done) {
        var body = {
            email: "test@testCIyfp2.com",
            password: "88888888"
        };

        request(app)
            .post('/dogsystem/v1/user/login')
            .send(body)
            .end(function (err, res) {

                if (err) {
                    throw err;
                }

                res.body.code.should.be.equal(Const.responsecodeSucceed);
                
                done();

            });

    });

    it('login if email is null or empty', function (done) {
        var body = {
            email: "",
            password: "rex123"
        };

        request(app)
            .post('/dogsystem/v1/user/login')
            .send(body)
            .end(function (err, res) {

                if (err) {
                    throw err;
                }

                //console.log(res.body)
                res.body.code.should.be.equal(Const.resCodeLoginNoEmail);
                done();

            });

    });

    it('login if password is null or empty', function (done) {
        var body = {
            email: "test@testCIyfp2.com",
            password: ""
        };

        request(app)
            .post('/dogsystem/v1/user/login')
            .send(body)
            .end(function (err, res) {

                if (err) {
                    throw err;
                }

                //console.log(res.body)
                res.body.code.should.be.equal(Const.resCodeLoginNoPassword);
                done();

            });

    });

    //resCodeLoginNoUser
    it('login if user is not exist', function (done) {
        var body = {
            email: "admin@126.com",
            password: "rex123456"
        };

        request(app)
            .post('/dogsystem/v1/user/login')
            .send(body)
            .end(function (err, res) {

                if (err) {
                    throw err;
                }

                //console.log(res.body)
                res.body.code.should.be.equal(Const.resCodeLoginNoUser);
                done();

            });

    });

    //resCodeLoginPasswordError
    it('login if password is not correct', function (done) {
        var body = {
            email: "test@testCIyfp2.com",
            password: "rex12345678"
        };

        request(app)
            .post('/dogsystem/v1/user/login')
            .send(body)
            .end(function (err, res) {

                if (err) {
                    throw err;
                }

                //console.log(res.body)
                res.body.code.should.be.equal(Const.resCodeLoginPasswordError);
                done();

            });

    });
});
