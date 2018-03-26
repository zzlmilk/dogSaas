var CONST = require('../consts');
var APIClientBase = require('./APIClientBase');
var _ = require('lodash');


(function(global) {
    "use strict;"

    var QiNiuClient = function(){};
    
    _.extend(QiNiuClient.prototype,APIClientBase.prototype);
    
    QiNiuClient.prototype.send = function(data,success,err){
    	        
        
        this.getRequst("/Qiniu/token",data,success,err);
     	
    }
        
    // returns instance
    module["exports"] = new QiNiuClient();

})((this || 0).self || global);

