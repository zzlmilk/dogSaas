var should = require('should');
var request = require('supertest');
var app = require('../mainTest');


describe('WEB', function () {

    var req, res;

    
        it('should be Test', function (done) {

            request(app)
                .get('/dogsystem/v1/test')
                .end(function (err, res) {

    			if (err) {
    				throw err;
    			}
			
                res.text.should.be.exactly("test");
                
                done();
            
            });   
            
        });
  });
    