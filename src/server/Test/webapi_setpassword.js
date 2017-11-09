var should = require('should');
var request = require('supertest');
var app = require('../mainTest');
var helper = require('./helper');
var Const = require('../lib/consts');
describe('WEB', function () {

    var req, res;

    it('if email is null or empty', function (done) {
        var body = {
            email: "",
            password: "rex123"
        };

        request(app)
            .post('/dogsystem/v1/user/set_password')
            .send(body)
            .end(function (err, res) {

                if (err) {
                    throw err;
                }
                res.body.code.should.be.equal(Const.resCodeRegisterNoEmail);
                done();

            });

    });

    it('if password is null or empty', function (done) {
        var body = {
            email: "test@test" + global.getRandomStr() + "2.com",
            password: ""
        };

        request(app)
            .post('/dogsystem/v1/user/set_password')
            .send(body)
            .end(function (err, res) {

                if (err) {
                    throw err;
                }
                res.body.code.should.be.equal(Const.resCodeRegisterNoPassword);
                done();

            });

    });

    it('if email is not exist', function (done) {
        var body = {
            email: "admin1@126.com",
            password: "rex1"
        };

        request(app)
            .post('/dogsystem/v1/user/set_password')
            .send(body)
            .end(function (err, res) {

                if (err) {
                    throw err;
                }
                res.body.code.should.be.equal(Const.resCodeRegisterWrongEmail);
                done();

            });

    });
    
});
