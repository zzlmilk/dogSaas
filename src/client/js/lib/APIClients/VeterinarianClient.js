/**
 * @author Tanner
 * @date 2017/12/12
 * 兽医
 */
var CONST = require('../consts');
var APIClientBase = require('./APIClientBase');
var _ = require('lodash');


(function (global) {
    "use strict;"

    var VeterinarianClient = function () {
    };

    _.extend(VeterinarianClient.prototype, APIClientBase.prototype);

    /**
     * 添加兽医
     * @param data 兽医对象{name:"",code:""}
     * @param success
     * @param err
     */
    VeterinarianClient.prototype.add = function (data, success, err) {

        this.postRequst("/veterinarian/add", data, success, err);

    }


    // returns instance
    module["exports"] = new VeterinarianClient();

})((this || 0).self || global);

