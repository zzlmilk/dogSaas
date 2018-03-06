//犬主

//账户对象
var _ = require('lodash');
var mongoose = require('mongoose');
var Config = require("../lib/init");
var DatabaseManager = require('../lib/DatabaseManager');
const Utils = require("../lib/Utils");
var async = require('async');
const Const = require("../lib/consts");

var OwnerModel  = function(){};



//选在owner里面找手机号的对象
//找到对象的_id ，去dogLicense 去匹配owner对象

OwnerModel.prototype.init = function(mongoose){
	this.schema = new mongoose.Schema({			
			name: String, //主人名字		
			sex:String, //性别   1男 2女
			phone:String,
			tel:String,
			//证件
			certificateType:String,//证件类型  1身份证 2护照:{			
			certificateCode:String,//证件号
			
			location:{
			 		province:String,
			 		district:String,
			 		city:String,
			 		address:String,		 
			 		code:String //邮编
			 },
			 
			dogs:[{type: mongoose.Schema.Types.ObjectId, ref: Config.dbCollectionPrefix + "dogs"}],   //
			created:Date, //注册时间																			
			
			

		
		    
	});

	this.model = mongoose.model(Config.dbCollectionPrefix + "owners", this.schema);
}



OwnerModel.get = function(){
    return DatabaseManager.getModel('Owner').model;    
}


module["exports"] = OwnerModel;


