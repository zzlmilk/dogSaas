const Utils = require("../lib/Utils");
var validator = require('validator');
var Const = require("../lib/consts");
var async = require('async');
var _ = require('lodash');


var OrganizationModel = require('../Models/Organization');
var UserModel = require('../Models/User');


var OrganizationLogics ={

		add:function(param,onSuccess,onError){
				var self= this;



				var user = param.user
				self.validatorParam(param.body,function(){
						var organizationParam  = param.body
						 var res = {}
						 async.waterfall([		
						 	function(done){
						 	   //用户是否能添加机构
					 			if(user.organization) {
					 				   onError(null,Const.resCodeAddOrganizationExisting);
										return;
					 			}

					 			done(null,res)
						 	},
						 	function(result,done){
						 			//添加机构信息
						 			var organizationModel = OrganizationModel.get();
						 			var organization = new organizationModel({
						 					name:organizationParam.name,
						 					location:{
						 						province:organizationParam.province,
						 						district:organizationParam.district,
						 						city:organizationParam.city,
						 						address:organizationParam.address,
						 						code:organizationParam.code
						 					},
						 					tel:organizationParam.tel,
						 					businessLicense:organizationParam.businessLicense,
						 					animalMedicalLicense:organizationParam.animalMedicalLicense,
						 					contacts:{
						 						name:organizationParam.contacts_name,
						 						phone:organizationParam.contacts_phone,
						 					},
						 					adminUser:user._id,
						 					checkStatus:{
						 						status:0,
						 						time:Utils.now()
						 					},
						 					created:Utils.now()


						 			});

						 			


								organization.save(function(err,organizationResult){

									if(err){
										done(err,null)
										return;
									}


									res.organization = organizationResult;
									done(null,res)
							
								})

						 	},
						 	function(result,done){
						 			//添加机构成功后 更新改账户为VIP 超级管理员和关联用户于机构信息						 			
						 			 user.update({
						                organization: res.organization._id,
						                logionProcess:1, //机构添加后，等待机构审核
						              },{},function(err,userResult){
						              		if (err) {
						              			  onError(err,null);
						              			  return;
						              		}

						              		if (userResult) {
						              			 onSuccess(res)
						              		}
						              		
						              });	
						 	}


						 	],function(err,result){
						 			if (err) {
						 				onError(err,null); 
						 				return;
						 			}
						 	})


				})
		},		

		edit:function(param,onSuccess,onError){

		},
		validatorParam:function(param,callback){

				callback()
		},


}


module["exports"] = OrganizationLogics;