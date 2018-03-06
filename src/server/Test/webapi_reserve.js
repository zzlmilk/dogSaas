var should = require('should');
var request = require('supertest');
var app = require('../mainTest');
var helper = require('./helper');
var Const = require('../lib/consts');

describe('WEB', function () {


    it('should be add dogLicense successful', function (done) {   //预约办理狗证
        var body={
            code:"942992"
        }
        signin(function (token) {
            request(app)
                .post('/dogsystem/v1/reserve/addDogLicense')
                .send(body)
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
    it('should be show reserveUser', function (done) {   //显示所有预约用户
        var body={
            code:"",
            page:"1"
        }

        signin(function (token) {
            request(app)
                .post('/dogsystem/v1/reserve/find')
                .send(body)
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
    it('should be find reserveUser', function (done) {     //查询预约用户
        var body={
            code:"942992",
            page:"1"
        }
        signin(function (token) {
            request(app)
                .post('/dogsystem/v1/reserve/find')
                .send(body)
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
