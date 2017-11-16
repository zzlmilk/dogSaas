var CONST = require('../consts');
var APIClientBase = require('./APIClientBase');
var _ = require('lodash');


(function(global) {
    "use strict;"

    var VaildCodeClient = function(){};
    
    _.extend(VaildCodeClient.prototype,APIClientBase.prototype);
    
    VaildCodeClient.prototype.send = function(data,success,err){
        
        this.postRequst("/vaild/email",data,success,err);
     	
    }
        
    // returns instance
    module["exports"] = new VaildCodeClient();

})((this || 0).self || global);

