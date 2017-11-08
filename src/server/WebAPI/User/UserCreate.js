var express = require('express');
var router = express.Router();
var RequestHandlerBase = require('../RequestHandlerBase');
var _ = require('lodash');
var Const = require("../../lib/consts");

var UserModel = require('../../Models/User');

var UserCreateHandler = function(){};
_.extend(UserCreateHandler.prototype,RequestHandlerBase.prototype);




UserCreateHandler.prototype.attach = function(router){
	var self = this;
	router.post('/',function(request,response){
		self.validate(request.body,function(err,user){
			if(!err){
				self.successResponse(response,Const.responsecodeSucceed,{user:user});  
			}else{
				self.successResponse(response,err);  
			}
		});
	});
};

UserCreateHandler.prototype.validate = function(requestBody,callback){
	if(_.isEmpty(requestBody.email)){
		callback(Const.resCodeUserCreateNoEmail);
	}else if(_.isEmpty(requestBody.nickname)){
		callback(Const.resCodeUserCreateNoNickName);
	}else if(_.isEmpty(requestBody.password)){
		callback(Const.resCodeUserCreateNoPassword);
	}else if(_.isEmpty(requestBody.phone)){
		callback(Const.resCodeUserCreateNoPhone);
	}

	var userModel = UserModel.get();
	userModel.findOne({email:requestBody.email},function(err,user){
		if(!_.isNull(user)){
			callback(null,user);
		}else{
			callback(Const.resCodeNullUser,null);
		}
	});
};

new TestHandler().attach(router);
module["exports"] = router;