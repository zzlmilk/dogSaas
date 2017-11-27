//机构对象
var _ = require('lodash');
var mongoose = require('mongoose');
var Config = require("../lib/init");
var DatabaseManager = require('../lib/DatabaseManager');
const Utils = require("../lib/Utils");
var async = require('async');
const Const = require("../lib/consts");

var Organization  = function(){};


Organization.prototype.init = function(mongoose){
	this.schema = new mongoose.Schema({
			 name:{type:String, index:true},//机构名字	
			 location:{
			 		province:String,
			 		district:String,
			 		city:String,
			 		address:String,		 
			 		code:String //邮编
			 },

			 tel:String, //座机
			 businessLicense:String,  //图片 url地址  用七牛服务存储
			 animalMedicalLicense:String, //图片 url地址  用七牛服务存储
			 serviceScope:[], //服务范围 eg: [美容，医疗]
			 //联系人信息
			 contacts:{
			 		name:String,
			 		phone:String,
			 },
			adminUser:{type: mongoose.Schema.Types.ObjectId, ref: Config.dbCollectionPrefix + "users" },  //该机构超级账户，第一次注册信息的用户
			checkStatus:{
				status:Number, //状态：  0等待审核   1审核通过   -1审核未通过
				comment:String,
				time:Date, //时间
			},
			veterinarians:[{type: mongoose.Schema.Types.ObjectId, ref: Config.dbCollectionPrefix + "veterinarians" }], //兽医(填写人名)
			created:Date

				
	});

	this.model = mongoose.model(Config.dbCollectionPrefix + "organizations", this.schema);
}



Organization.get = function(){
    return DatabaseManager.getModel('Organization').model;    
}


module["exports"] = Organization;


