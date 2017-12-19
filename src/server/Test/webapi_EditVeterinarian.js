var should = require('should');
var request = require('supertest');
var app = require('../mainTest');
var helper = require('./helper');
var Const = require('../lib/consts');

describe('WEB API', function () {


    it('should be add successful', function (done) {
        signin(function (token) {
            var body = {
                name: "李四",
<<<<<<< HEAD
                code: "11901211122"
=======
                code: "219012111111111"
>>>>>>> e943f77c7ca54bf87f357905230b309d2fd4d2bf
            };

            request(app)
                .post('/dogsystem/v1/Organization/editVeterinarian')
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
