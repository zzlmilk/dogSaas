const Utils = require("../lib/Utils");
var validator = require('validator');
var Const = require("../lib/consts");
var async = require('async');
var _ = require('lodash');

var UserModel = require('../Models/User');
var DayuModel = require('../Models/Dayu')
var Mail = require('../lib/Mail')




var SendEmailLogic = {

			sendEmail:function(param, onSuccess, onError){
					var self = this;
					var useType = param.useType
					
					if (useType == 1) {
						self.sendRegisterEmail(param, onSuccess, onError)
					}
					else if(useType == 2){
						self.sendForgetPasswordEmail(param, onSuccess, onError)
					}
			},
			//获取注册邮件。use 1
			sendRegisterEmail:function(param, onSuccess, onError){
						// var useType = param.
						
						var useType = param.useType
						var email = param.email
						var res = {}
						async.waterfall([
								function (done) {
									//验证邮件是否存在
								var userModel = UserModel.get();
								userModel.findOne({ email: param.email }, function (err, user) {
									if (!_.isNull(user)) {
										//该账户已经被注册了
										onError(null, Const.resCodeSendEmailWrongEmail);
										return;
									}

									done(null, res)

								})
								},
								function(result,done){
									var code = Utils.randomCode(6);
									 Mail.sendOne(code,email,useType,"获取可点验证码",function(){
					    				DayuModel.insertCode(email,code,useType,function(err,result){	
								    						if (err) {
								    							 console.log("email err",err)
								    							 return;
								    						}								    						
													       if(onSuccess){							       							  
													       		onSuccess(result.code)
											         		}
											          });
					        		   })


								}
							],function(err,result){

							})


			},
			//忘记密码邮件。use 2
			sendForgetPasswordEmail:function(param, onSuccess, onError){
					
					    var useType = param.useType
						var email = param.email
						var res = {}
						async.waterfall([
								function (done) {
									//验证邮件是否存在
								var userModel = UserModel.get();
								userModel.findOne({ email: param.email }, function (err, user) {
									if (_.isNull(user)) {
										//不存在账户
										onError(null, Const.resCodeSendEmailNullEmailUser);
										return;
									}

									done(null, res)

									})
								},
								function(result,done){
									var code = Utils.randomCode(6);
									 Mail.sendOne(code,email,useType,"获取可点验证码",function(){
					    				DayuModel.insertCode(email,code,useType,function(err,result){	
								    						if (err) {
								    							 console.log("email err",err)
								    							 return;
								    						}								    						
													       if(onSuccess){							       							  
													       		onSuccess(result.code)
											         		}
											          });
					        		   })


								}
							],function(err,result){

							})



			},

			VaildEmail:function(param, onSuccess, onError){
					
				 if(Utils.isEmpty(param.email)){
				 		 if(onError)
				 		 	 onError(null,Const.resCodeDayuNoEmail);

				 		 	return;
				 }


				 if(Utils.isEmpty(param.code)){
				 		 if(onError)
				 		 	 onError(null,Const.resCodeDayuNoCode);
				 		 	return;
				 }

				 if(Utils.isEmpty(param.useType)){
				 		 if(onError)
				 		 	 onError(null,Const.resCodeLoginNoUseType);
				 		 	return;
				 }

				 var dayuModel = DayuModel.get();
				  dayuModel.findOne({email:param.email,code:param.code,type:1,useType:param.useType},function(err,model){ 				  	
			                if (model) {
			                	model.type = -1;
			                	model.save(function(err,dayuResult){
			                			if(!err){
			                				onSuccess({
			                					code:Const.resCodeDayuVaildeCodeSuccess
			                				})
			                			}
			                	});
			                }
			                else{
			                		if (onError) {
			                				onError(null,Const.resCodeDayuVaildeCodeError)
			                		}
			                }
			               
			    })	



			}



}

module["exports"] = SendEmailLogic;