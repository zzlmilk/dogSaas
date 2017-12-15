/**
 * @author Tanner
 * @date 2017/12/1
 * 狗证接口类
 */
var CONST = require('../consts');
var APIClientBase = require('./APIClientBase');
var _ = require('lodash');


(function (global) {
    "use strict;"

    var DogLicenseClient = function () {
    };

    _.extend(DogLicenseClient.prototype, APIClientBase.prototype);

    /**
     * 添加狗证
     * @param data 狗证信息
     * @param success
     * @param err
     */
    DogLicenseClient.prototype.add = function (data, success, err) {
        this.postRequst("/dogLicense/add", data, success, err);
    };

    /**
     * 添加取证方式
     * @param data
     *          dogLicenseId    String  狗证ID
     *          takeWay    Number 1自取 2邮寄
     * @param success
     * @param err
     */
    DogLicenseClient.prototype.takeWay = function (data, success, err) {
        this.postRequst("/dogLicense/add_takeWay", data, success, err);
    };

    DogLicenseClient.prototype.findByOwner = function (data, success, err) {
        this.postRequst("/dogLicense/find_by_owner", data, success, err);
    };

    /**
     *

     * @param data
     *      houseNo    String (沪)房地（长）字（2006）第(000386)号
     *      houseProperty    String 自由和租凭
     *      address    String  xxx路xxx弄xxx号 ，用户判断唯一性
     *      isSterilization    Number 是否绝育 0:未绝育 1:绝育
     * @param success
     * @param err
     */

    DogLicenseClient.prototype.editResidence = function (data, success, err) {
        this.postRequst("/residence/edit", data, success, err);
    };

    // returns instance
    module["exports"] = new DogLicenseClient();

})((this || 0).self || global);

