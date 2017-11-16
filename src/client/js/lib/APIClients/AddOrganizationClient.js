var CONST = require('../consts');
var APIClientBase = require('./APIClientBase');
var _ = require('lodash');


(function(global) {
    "use strict;"

    var AddOrganizationClient = function(){};
    
    _.extend(AddOrganizationClient.prototype,APIClientBase.prototype);
    
    AddOrganizationClient.prototype.send = function(data,success,err){
    	        
        this.postRequst("/organization/add",data,success,err);
     	
    }
        
    // returns instance
    module["exports"] = new AddOrganizationClient();

})((this || 0).self || global);

