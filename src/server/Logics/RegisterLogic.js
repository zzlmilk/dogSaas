const Utils = require("../lib/Utils");
var validator = require('validator');
var Const = require("../lib/consts");
var async = require('async');
var _ = require('lodash');


var UserModel = require('../Models/User');




var RegisterLogic = {

	execute: function (param, onSuccess, onError) {


		var email = param.email;
		var password = param.password;

		if (Utils.isEmpty(email)) {
			onError(null,
				Const.resCodeRegisterNoEmail
			)
			return;
		}

		else {
			if (!validator.isEmail(email)) {
				onError(null,
					Const.resCodeRegistererrEmail
				)
				return;
			}
		}
		if (Utils.isEmpty(password)) {
			onError(null,
				Const.resCodeRegisterNoPassword
			)
			return;
		}
		else {
			if (!validator.isLength(password, Const.credentialsMinLength)) {
				onError(null,
					Const.resCodeSetPassWordLengthError
				)
				return;
			}
		}



		var res = {};
		async.waterfall([
			function (done) {
				//验证邮箱是否能注册一性
				var userModel = UserModel.get();
				userModel.findOne({ email: email }, function (err, user) {
					if (!_.isNull(user)) {
						//该账户已经被注册了
						onError(null, Const.resCodeRegisterWrongEmail);
						return;
					}


					done(null, res)

				})

			},
			function (result, done) {
				//创建账号
				var db_pass = Utils.saltAndHash(password)
				var token = Utils.randomString(24);
				var userModel = UserModel.get();
				var user = new userModel({
					email: email,
					password: db_pass,
					created: Utils.now(),
					token: token,
					isAccountEnabled: 1, //该账号注册成功，激活此账户
					logionProcess: 0,
				})

				res.token = token

				user.save(function (err, userResult) {
					if (err) {
						onError(err, null);
						return;
					}
					res.user = userResult
					onSuccess(res)
				})


			}

		], function (err, result) { })
	},
	editPassword: function (param, onSuccess, onError) {
		var email = param.email;
		var password = param.password;

		if (Utils.isEmpty(email)) {
			onError(null,
				Const.resCodeRegisterNoEmail
			)
			return;
		}

		else {
			if (!validator.isEmail(email)) {
				onError(null,
					Const.resCodeRegistererrEmail
				)
				return;
			}
		}
		if (Utils.isEmpty(password)) {
			onError(null,
				Const.resCodeRegisterNoPassword
			)
			return;
		}
		else {
			if (!validator.isLength(password, Const.credentialsMinLength)) {
				onError(null,
					Const.resCodeSetPassWordLengthError
				)
				return;
			}
		}

		var res = {}
		async.waterfall([
			function (done) {
				//验证邮箱是否存在
				var userModel = UserModel.get();
				userModel.findOne({ email: email }, function (err, user) {
					if (_.isNull(user)) {
						//该账户不存在
						onError(null, Const.resCodeRegisterWrongEmail);
						return;
					}


					done(null, res)

				})

			},
			function (result, done) {
				//修改密码
				var userModel = UserModel.get();
				userModel.findOne({ email: email }, function (err, user) {
					user.password = Utils.saltAndHash(password);
					var token = Utils.randomString(24);
					user.token = token;
					res.token = token;
					user.save(function (err, userResult) {
						if (err) {
							onError(err, null);
							return;
						}
						res.user = userResult
						onSuccess(res)
					})

				})
			}

		], function (err, result) { });
	}


}





module["exports"] = RegisterLogic;