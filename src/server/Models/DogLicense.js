//狗证
var _ = require('lodash');
var mongoose = require('mongoose');
var Config = require("../lib/init");
var DatabaseManager = require('../lib/DatabaseManager');
const Utils = require("../lib/Utils");
var async = require('async');
const Const = require("../lib/consts");



var DogLicenseModel  = function(){};


DogLicenseModel.prototype.init = function(mongoose){
	this.schema = new mongoose.Schema({			

		husbandryNo:String, //畜牧业提供的条形码
		dog:{ type: mongoose.Schema.Types.ObjectId, ref: Config.dbCollectionPrefix + "dogs" },   //狗
		owner:{ type: mongoose.Schema.Types.ObjectId, ref: Config.dbCollectionPrefix + "owners" },   //主人
		vaccine:{ type: mongoose.Schema.Types.ObjectId, ref: Config.dbCollectionPrefix + "vaccines" },   //免疫卡
		residence:{ type: mongoose.Schema.Types.ObjectId, ref: Config.dbCollectionPrefix + "residences" },   //户籍
		organization: { type: mongoose.Schema.Types.ObjectId, ref: Config.dbCollectionPrefix + "organizations" },  //所属机构办理		
		//是否制卡
		vaccineCard:{
				isCreate:Number,  //0不能制卡 1能制卡
				info:String, //制卡信息				 
				create:Date,//创建时间
		},
		DogCard:{
			isCreate:Number,  //0不能制卡 1能制卡
			message:String, //
			info:String, //制卡信息	
			create:Date,//创建时间
		},

						
		create:Date, //创建时间
		update:Date,//更新时间




	});

	this.model = mongoose.model(Config.dbCollectionPrefix + "dogLicenses", this.schema);
}



DogLicenseModel.get = function(){
    return DatabaseManager.getModel('DogLicense').model;    
}


module["exports"] = DogLicenseModel;







