var CONST = require('../consts');
var APIClientBase = require('./APIClientBase');
var _ = require('lodash');


(function (global) {
    "use strict;"

    var OrganizationClient = function () {
    };

    _.extend(OrganizationClient.prototype, APIClientBase.prototype);

    /**
     * 第一次注册新增组织
     * @param data
     * @param success
     * @param err
     */
    OrganizationClient.prototype.add = function (data, success, err) {

        this.postRequst("/organization/add", data, success, err);

    }

    /**
     * 个人中心显示组织信息
     * @param success
     * @param err
     */
    OrganizationClient.prototype.show = function (success, err) {
        console.log("get-------- - ssss");
        this.getRequst("/organization/show", success, err);

    }

    // returns instance
    module["exports"] = new OrganizationClient();

})((this || 0).self || global);

