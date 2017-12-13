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
        this.getRequst("/organization/show", success, err);
    }

    /**
     * 添加兽医
     * @param data 兽医对象{name:"",code:""}
     * @param success
     * @param err
     */
    OrganizationClient.prototype.addVeterinarian = function (data, success, err) {

        this.postRequst("/organization/editVeterinarian", data, success, err);

    }

    // returns instance
    module["exports"] = new OrganizationClient();

})((this || 0).self || global);

