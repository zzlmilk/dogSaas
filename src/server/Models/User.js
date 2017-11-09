//账户对象
var _ = require('lodash');
var mongoose = require('mongoose');
var Config = require("../lib/init");
var DatabaseManager = require('../lib/DatabaseManager');
const Utils = require("../lib/Utils");
var async = require('async');
const Const = require("../lib/consts");

var UserModel = function () { };


UserModel.prototype.init = function (mongoose) {
	this.schema = new mongoose.Schema({
		email: { type: String, index: true, unique: true },
		nickname: String,
		password: String,
		phone: { type: String, index: true },  //可以为空
		isAccountEnabled: Number, //账号状态： 0：未激活  1.激活。  -1：冻结
		created: Date, //注册时间
		activated: Date, //激活时间
		token: { type: String, index: true, unique: true },
		// tokenDate:Number,//token有效期
		organization: { type: mongoose.Schema.Types.ObjectId, ref: Config.dbCollectionPrefix + "organizations" },  //账号所属机构
		//安全信息
		safetyInformation: {
			ip: String,
			browserType: String, //游览器类型
			deviceType: String, //设备信息
		}
	});

	this.model = mongoose.model(Config.dbCollectionPrefix + "users", this.schema);
}



UserModel.get = function () {
	return DatabaseManager.getModel('User').model;
}


module["exports"] = UserModel;


