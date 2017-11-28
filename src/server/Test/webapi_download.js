var should = require('should');
var request = require('supertest');
var app = require('../mainTest');
var helper = require('./helper');
var Const = require('../lib/consts');

describe('WEB', function () {

    var req, res;

    it('should be app downLoad ', function (done) {
       
            request(app)
                .get('/dogsystem/v1/organization/show')
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    console.log(res.body)
                    done();

                });


        })



});
