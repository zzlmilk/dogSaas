var should = require('should');
var request = require('supertest');
var app = require('../mainTest');
var helper = require('./helper');
var Const = require('../lib/consts');


describe('WEB API', function () {

    it('should be successful', function (done) {
        signin(function (token) {
            var body = {
                openId:"3PY4C",
                nickname:"haha",
                photo:"photo",
                sex: "1",
                dogLicenses: ["5a3b820cd2e31d6cd89ef0e1",
                              "5a41b487f1ca611808e8517b"]
            };
            request(app)
                .post('/dogsystem/v1/wx/add_user')
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


