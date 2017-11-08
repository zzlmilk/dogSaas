var should = require('should');
var request = require('supertest');
var app = require('../../mainTest');


describe('test user create api', function () {
        it('if email is empty', function (done) {
            request(app)
                .post('/dogsystem/v1/user/create')
                .send({
                    email:'',
                    password:'123456',
                    phone:'15838365455',
                    nickname:'paimu'
                })
                .end(function (err, res) {

    			if (err) {
    				throw err;
    			}
			
                res.text.should.be.exactly(1000001);
                
                done();
            
            });   
            
        });
        it('if password is empty', function (done) {
            request(app)
                .post('/dogsystem/v1/user/create')
                .send({
                    email:'admin@paimu.com',
                    password:'',
                    phone:'15838365455',
                    nickname:'paimu'
                })
                .end(function (err, res) {

                if (err) {
                    throw err;
                }
            
                res.text.should.be.exactly(1000003);
                
                done();
            
            });   
            
        });
        it('if phone is empty', function (done) {
            request(app)
                .post('/dogsystem/v1/user/create')
                .send({
                    email:'admin@paimu.com',
                    password:'123456',
                    phone:'',
                    nickname:'paimu'
                })
                .end(function (err, res) {

                if (err) {
                    throw err;
                }
            
                res.text.should.be.exactly(1000004);
                
                done();
            
            });   
            
        });
        it('if nickname is empty', function (done) {
            request(app)
                .post('/dogsystem/v1/user/create')
                .send({
                    email:'admin@paimu.com',
                    password:'123456',
                    phone:'15838365455',
                    nickname:''
                })
                .end(function (err, res) {

                if (err) {
                    throw err;
                }
            
                res.text.should.be.exactly(1000002);
                
                done();
            
            });   
            
        });
        it('if email is valid', function (done) {
            request(app)
                .post('/dogsystem/v1/user/create')
                .send({
                    email:'admin',
                    password:'123456',
                    phone:'15838365455',
                    nickname:'paimu'
                })
                .end(function (err, res) {

                if (err) {
                    throw err;
                }
            
                res.text.should.be.exactly(1000006);
                
                done();
            
            });   
            
        });
        it('if phone is valid', function (done) {
            request(app)
                .post('/dogsystem/v1/user/create')
                .send({
                    email:'admin',
                    password:'123456',
                    phone:'1583',
                    nickname:'paimu'
                })
                .end(function (err, res) {

                if (err) {
                    throw err;
                }
            
                res.text.should.be.exactly(1000007);
                
                done();
            
            });   
            
        });
        it('if password length less than 6', function (done) {
            request(app)
                .post('/dogsystem/v1/user/create')
                .send({
                    email:'admin',
                    password:'123',
                    phone:'15838365455',
                    nickname:'paimu'
                })
                .end(function (err, res) {

                if (err) {
                    throw err;
                }
            
                res.text.should.be.exactly(1000008);
                
                done();
            
            });   
            
        });
  });
    