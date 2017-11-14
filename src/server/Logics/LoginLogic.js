const Utils = require("../lib/Utils");
var validator = require('validator');
var Const = require("../lib/consts");
var async = require('async');
var _ = require('lodash');


var UserModel = require('../Models/User');
var OrganizationModel = require('../Models/Organization');




var LoginLogic ={

	execute:function(param,onSuccess,onError){


			var email = param.email;
	 		var password = param.password;

	 		if(Utils.isEmpty(email)){
				 	onError(null,
	                    Const.resCodeLoginNoEmail
	                )
				 		 return;
				 } 
			if(Utils.isEmpty(password)){
				 	onError(null,
	                    Const.resCodeLoginNoPassword
	                )
				 		 return;
				}	
						
				 var res  ={}
				 async.waterfall([				 		
				 		function(done){
						           UserModel.getUserByLoginParam(email,password,function(err,user){
						              if (err) {
						                 if(onError)
						                 onError(null,err);
						            }else{
						              // create token
						               var token = Utils.randomString(24);
						                user.update({
						                token: token  
						              },{},function(err,userResult){

						                  if(userResult){
						                        res.user = user;
						                        res.token = token; 

						                        done(null,res)                 

						                  }

						              });
						            }


						           });				 			

				 		},
				 		// function(result,done){
				 		// 	//寻找机构信息的情况
				 		// 	var organization = res.user.organization;
				 		// 	if (organization) {
				 		// 	    OrganizationModel.get().findOne({"_id":organization},function(err,organizationResult){
				 		// 		  			if (err) {
				 		// 		  				console.log(err)
				 		// 		  				return
				 		// 		  			}				 				  			
				 		// 		  			res.user.organization = organizationResult;
				 		// 		  			done(null,res) 
				 		// 		});				 
				 		// 	}else{
				 		// 		done(null,res) 
				 		// 	}
				 			
				 			
				 		// },
				 		// function(result,done){
				 		//  		//登录日志 

				 		//  },


				 	],function(err,result){
				 			 if (!err) {
         						  onSuccess(res)
						        }
						        else{

						          console.log("===login===",err)
						        }      
				 	})


			


	}


}





module["exports"] = LoginLogic;