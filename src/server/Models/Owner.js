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


OwnerModel.prototype.init = function(mongoose){
	this.schema = new mongoose.Schema({			
			name: String, //主人名字		
			sex:String, //性别
			phone:String,
			tel:String,
			//证件
			certificate:{
				Type:Number,//证件类型  1身份证
				code:String,//证件号
			},
			location:{
			 		province:String,
			 		district:String,
			 		city:String,
			 		address:String,		 
			 		code:String //邮编
			 },
			 
			dogs:[{ type: mongoose.Schema.Types.ObjectId, ref: Config.dbCollectionPrefix + "dogs" }],   //
			created:Date, //注册时间																			
			
			

			

		    
	});

	this.model = mongoose.model(Config.dbCollectionPrefix + "owners", this.schema);
}



OwnerModel.get = function(){
    return DatabaseManager.getModel('Dog').model;    
}


module["exports"] = OwnerModel;


