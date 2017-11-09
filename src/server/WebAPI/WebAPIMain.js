var express = require('express');
var router = express.Router();

var bodyParser = require("body-parser");
var _ = require('lodash');
var init = require('../lib/init.js');


var WebAPIMain = {
			init:function(app){
					var self = this;
					app.use(bodyParser.json());
					app.use('/',express.static(__dirname + '/../../../public'));


					//测试
					router.use("/test", require('./TestHandler'));
					//User
					router.use("/user/register", require('./User/RegisterHandler'));
					router.use("/user/login", require('./User/LoginHandler'));

					//新增用户
					router.use("/user/create",require('./User/UserCreate'));
					//set password
					router.use("/user/set_password",require('./User/SetPasswordHandler'));

					//AOrganizationHandler
					router.use("/organization/add", require('./Organization/AddOrganizationHandler'));
					router.use("/organization/edit", require('./Organization/EditOrganizationHandler'));
					router.use("/organization/show", require('./Organization/ShowOrganizationHandler'));



					//api版本控制
					app.use(init.urlPrefix + "/v1", router);



			}


}


module["exports"] = WebAPIMain;