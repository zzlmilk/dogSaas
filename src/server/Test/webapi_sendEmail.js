var should = require('should');
var request = require('supertest');
var app = require('../mainTest');
var helper = require('./helper');
var Const = require('../lib/consts');

describe('WEB', function () {

    var req, res;

    //it('should be register send email  get  Email Code ', function (done) {
    
    //         var body = {
    //                    email: "413124767@qq.com",
    //                    useType:1,  //注册获取邮箱
    //             };

    //         request(app)
    //             .post('/dogsystem/v1/send/email/')
    //             .send(body)
    //             .end(function (err, res) {
    //                 if (err) {
    //                     throw err;
    //                 }
    //                 console.log(res.body.data)
    //                 res.body.should.have.property('code');
    //                 res.body.code.should.equal(Const.responsecodeSucceed);

    //                 done();

    //             });

    // });

    it('should be valid email Code  by usetype 1', function (done) {
            var body = {                      
                       code:"449570"  //注册获取邮箱                      
                };

            request(app)
                .post('/dogsystem/v1/vaild/email/')
                .send(body)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    console.log(res.body)
                    res.body.should.have.property('code');
                    res.body.code.should.equal(Const.responsecodeSucceed);

                    done();

                });

    });




    // it('should be Forget send email  get  Forget Email Code ', function (done) {
    
    //         var body = {
    //                    email: "413124766@qq.com",
    //                    useType:"2",  //注册获取邮箱
    //             };
    //         request(app)
    //             .post('/dogsystem/v1/send/email/')
    //             .send(body)
    //             .end(function (err, res) {
    //                 if (err) {
    //                     throw err;
    //                 }
    //                 console.log(res.body.data)
    //                 res.body.should.have.property('code');
    //                 res.body.code.should.equal(Const.responsecodeSucceed);

    //                 done();

    //             });

    // });


});
