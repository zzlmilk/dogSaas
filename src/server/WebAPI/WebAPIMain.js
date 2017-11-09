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




					//api版本控制
					app.use(init.urlPrefix + "/v1", router);



			}


}


module["exports"] = WebAPIMain;