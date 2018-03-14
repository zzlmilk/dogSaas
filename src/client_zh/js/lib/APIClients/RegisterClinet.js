var CONST = require('../consts');
var APIClientBase = require('./APIClientBase');
var _ = require('lodash');


(function(global) {
    "use strict;"

    var RegisterClinet = function(){};
    
    _.extend(RegisterClinet.prototype,APIClientBase.prototype);
    
    RegisterClinet.prototype.send = function(data,success,err){

    	
        
        this.postRequst("/user/register",data,success,err);
     	
    }
        
    // returns instance
    module["exports"] = new RegisterClinet();

})((this || 0).self || global);

