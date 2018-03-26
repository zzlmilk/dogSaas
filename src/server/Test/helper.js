var should = require('should');
var request = require('supertest');
var async = require('async');



var app = require('../mainTest');


global.email = "2420933732@qq.com"
global.password1 = "123456"
//wanli test user and password
//global.email = "test@testCIyfp2.com"
//global.password1 = "88888888"
global.getRandomStr = function(){

    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;

}

global.signin = function(cb,params){

	if(!params){
        params = {
            email : global.email,
            password : global.password1,
        };
    }


    request(app)
            .post('/dogsystem/v1/user/login')
            .send(params)		        	
    		.expect(200) 
            .end(function (err, res) {        	                          
            		 if(err){
            				throw Error
            			}
                      if (res.body.code !=1) {
                        	
                            throw new Error('invalid code');
                      }  

            		if (!res.body.data.token) {
            			
            					 throw new Error('invalid login');
            			}

                        
            			cb(res.body.data.token,res.body.data);
            });



}


