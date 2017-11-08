var express = require('express');
var router = express.Router();
var RequestHandlerBase = require('../RequestHandlerBase');
var _ = require('lodash');
var Const = require("../../lib/consts");

var UserModel = require('../../Models/User');

var UserCreateHandler = function(){};
_.extend(UserCreateHandler.prototype,RequestHandlerBase.prototype);


/**
     * @api {post} /user/cerate 新增用户
     * @apiGroup User
     * @apiDescription 新增用户
     * @apiParam {String} email 用户邮箱
     * @apiParam {String} password 用户密码
     * @apiParam {String} phone 用户手机号
     * @apiError 1000001 用户邮箱是必填项
     * @apiError 1000002 用户昵称是必填项
     * @apiError 1000003 用户密码是必填项
     * @apiError 1000004 用户手机号是必填项
     * @apiError 1000005 用户已经存在
     * @apiError 1000006 邮箱格式不合法
     * @apiError 1000007 手机号格式不合法
     * @apiError 1000008 密码长度不能小于6位
     * @apiSuccessExample Success-Response:
    { code: 1,
  	  data: 
   		{ 
   			nickname:'paimu' 
        }
     }
    */

UserCreateHandler.prototype.attach = function(router){
	var self = this;
	router.post('/',function(request,response){
		self.validate(request.body,function(err,user){
			if(!err){
				self.successResponse(response,Const.responsecodeSucceed,{nickname:user.nickname}); 
			}else{
				self.successResponse(response,err);  
			}
		});
	});
};

UserCreateHandler.prototype.validate = function(params,callback){
	var emailRegx = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
	var phoneRegx = /^(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/;
	if(_.isEmpty(params.email)){
		console.log("err","no email");
		callback(Const.resCodeUserCreateNoEmail);
		return;
	}else if(_.isEmpty(params.nickname)){
		console.log("err","no nickname");
		callback(Const.resCodeUserCreateNoNickName);
		return;
	}else if(_.isEmpty(params.password)){
		console.log("err","no password");
		callback(Const.resCodeUserCreateNoPassword);
		return;
	}else if(_.isEmpty(params.phone)){
		console.log("err","no phone");
		callback(Const.resCodeUserCreateNoPhone);
		return;
	}else if(!emailRegx.test(params.email)){
		console.log("err","email is valid");
		callback(Const.resCodeUserCreateEmailIsValid);
		return;
	}else if(!phoneRegx.test(params.phone)){
		console.log("err","phone is valid");
		callback(Const.resCodeUserCreatePhoneIsValid);
		return;
	}else if(params.password.length<6){
		console.log("err","password's length is less than 6");
		callback(Const.resCodeUserCreatePasswordLengthIsValid);
		return;
	}

	var userModel = UserModel.get();
	userModel.findOne({email:requestBody.email},function(err,user){
		if(_.isNull(user)){
			user.isAccountEnabled = 0;
			user.save(function(err){
				callback(null,user);
			})
		}else{
			callback(Const.resCodeUserCreateExistUser);
		}
	});
};

new UserCreateHandler().attach(router);
module["exports"] = router;