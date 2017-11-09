const Utils = require("../lib/Utils");
var validator = require('validator');
var Const = require("../lib/consts");
var async = require('async');
var _ = require('lodash');


var UserModel = require('../Models/User');




var RegisterLogic ={

	execute:function(param,onSuccess,onError){


			var email = param.email;
	 		var password = param.password;

	 		if(Utils.isEmpty(email)){
				 	onError(null,
	                    Const.resCodeRegisterNoEmail
	                )
				 		 return;
				 } 
				 if(Utils.isEmpty(password)){
				 	onError(null,
	                    Const.resCodeRegisterNoPassword
	                )
				 		 return;
				 }
				 else{
				 	if(!validator.isLength(password,Const.credentialsMinLength)){
						 		onError(null,
			                    Const.resCodeSetPassWordLengthError
			                )
						 		 return;
				 	}
				 }



				 var res  ={}
				 async.waterfall([				 		
				 		function(done){
				 			//验证邮箱是否能注册一性
				 				var userModel  = UserModel.get();
								userModel.findOne({email:email},function(err,user){
									if(!_.isNull(user))
										 {
											 	//该账户已经被注册了
											 	onError(null,Const.resCodeSetPasswordWrongPhone);
											 	return;
						 					}


						 					done(null,res)

									})

				 		},
				 		function(result,done){
				 				//创建账号
				 			 var db_pass = Utils.saltAndHash(password)
						 	 var token = Utils.randomString(24);
							 var userModel  = UserModel.get();
						 	 var user = new userModel({
						 	 		email :email,
						 	 		password:db_pass,						 	 								 	 		
						 	 		created:Utils.now(),						 	 		
						 	 		token: token,
						 	 })

						 	 res.token = token

						 	 user.save(function(err,userResult){
						 	 	 	if(err){
						 	 			onError(err,null);  
                    					return;
						 	 		}
						 	 		res.user = userResult
						 	 		onSuccess(res)
						 	 })



						 	


				 		}

				 	],function(err,result){})


			








	}


}





module["exports"] = RegisterLogic;