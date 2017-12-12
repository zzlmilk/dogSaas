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
        takeWay:Number,//1自取 2邮寄
		dog:{ type: mongoose.Schema.Types.ObjectId, ref: Config.dbCollectionPrefix + "dogs" },   //狗
		owner:{ type: mongoose.Schema.Types.ObjectId, ref: Config.dbCollectionPrefix + "owners" },   //主人
		vaccine:{ type: mongoose.Schema.Types.ObjectId, ref: Config.dbCollectionPrefix + "vaccines" },   //免疫卡
		residence:{ type: mongoose.Schema.Types.ObjectId, ref: Config.dbCollectionPrefix + "residences" },   //户籍
		organization: { type: mongoose.Schema.Types.ObjectId, ref: Config.dbCollectionPrefix + "organizations" },  //所属机构办理		
		//是否制卡
		vaccineCard:{
				isCreate:Number,  //0不能制卡 1能制卡
				info:{
						cardNo:String, //免疫证号
						name:String, //犬主姓名
						addresses:String,
						district:String,//区县
						breed:String,
						hairColor:String,
						vaccineCreate:Date,
						irisID:String,
						annualDate:[], //1306 1806
						signOrganization:String, //签发机构
						signCreate:Date, //初始发证日期

				}, //制卡信息		

				annual:{
				  canAnnual:Number,  //是否能年审（需要免疫卡一直可以年审）
				  updateDate:Date,
			},

				create:Date,//创建时间
		},
		DogCard:{
			isCreate:Number,  //0不能制卡 1能制卡
			message:String, //
			annual:{
				  canAnnual:Number,  //是否能年审（需要免疫卡先年审，狗证才能年审）
				  updateDate:Date,

			},
			info:{
				cardNo:String, //登记证号
				name:String,
				addresses:String,
				district:String,//区县
				irisID:String,
				breed:String,
				hairColor:String,
				annualDate:[], //1206 1806
				loopLineType:Number,
				signOrganization:String, //签发机构
				signCreate:Date, //初始发证日期
			},
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







