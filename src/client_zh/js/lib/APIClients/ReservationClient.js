/**
 * @author Tanner
 * @date 2017/12/1
 * 预约接口类
 */
var CONST = require('../consts');
var APIClientBase = require('./APIClientBase');
var _ = require('lodash');


(function (global) {
    "use strict;"

    var ReservationClient = function () {
    };

    _.extend(ReservationClient.prototype, APIClientBase.prototype);



    /**
     * 预约查询
     * @param data
     * @param success
     * @param err
     */
    ReservationClient.prototype.find = function (data, success, err) {
        this.postRequst("/reserve/find", data, success, err);
    };


    // returns instance
    module["exports"] = new ReservationClient();

})((this || 0).self || global);

