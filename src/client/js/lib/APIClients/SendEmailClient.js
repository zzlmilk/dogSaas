var CONST = require('../consts');
var APIClientBase = require('./APIClientBase');
var _ = require('lodash');


(function(global) {
    "use strict;"

    var SendEmailClient = function(){};
    
    _.extend(SendEmailClient.prototype,APIClientBase.prototype);
    
    SendEmailClient.prototype.send = function(data,success,err){
        
        this.postRequst("/send/email",data,success,err);
     	
    }
        
    // returns instance
    module["exports"] = new SendEmailClient();

})((this || 0).self || global);

