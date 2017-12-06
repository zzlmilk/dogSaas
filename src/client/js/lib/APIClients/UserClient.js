/**
 * @author Tanner
 * @date 2017/12/5
 * 犬主信息接口
 */
var CONST = require('../consts');
var APIClientBase = require('./APIClientBase');
var _ = require('lodash');


(function(global) {
    "use strict;"

    var UserClient = function(){};
    
    _.extend(UserClient.prototype,APIClientBase.prototype);

    UserClient.prototype.find = function(data,success,err){
    	        
        this.postRequst("/owner/find",data,success,err);
     	
    }
        
    // returns instance
    module["exports"] = new UserClient();

})((this || 0).self || global);

