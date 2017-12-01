/**
 * @author Tanner
 * @date 2017/12/1
 * 狗证接口类
 */
var CONST = require('../consts');
var APIClientBase = require('./APIClientBase');
var _ = require('lodash');


(function(global) {
    "use strict;"

    var DogLicenseClient= function(){};
    
    _.extend(DogLicenseClient.prototype,APIClientBase.prototype);

    /**
     * 添加狗证
     * @param data 狗证信息
     * @param success
     * @param err
     */
    DogLicenseClient.prototype.add = function(data,success,err){
        this.postRequst("/dogLicense/add",data,success,err);
    }
        
    // returns instance
    module["exports"] = new DogLicenseClient();

})((this || 0).self || global);

