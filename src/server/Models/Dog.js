//狗对象
var _ = require('lodash');
var mongoose = require('mongoose');
var Config = require("../lib/init");
var DatabaseManager = require('../lib/DatabaseManager');
const Utils = require("../lib/Utils");
var async = require('async');
const Const = require("../lib/consts");

var DogModel  = function(){};


DogModel.prototype.init = function(mongoose){
	this.schema = new mongoose.Schema({			
			nickname: String, //宠物昵称		
			sex:String, //性别
			breed:String, //品种
			created:Date, //注册时间
			usage:String,//用途
			hairColor:String, //毛色
			bornDate:Date, //出生日期
			isSterilization:Number,//是否绝育  0:未绝育 1:绝育
			photoUrl:String, //宠物照片
			photos:[], //多张宠物照片数组存储
			irisID:String, //虹膜id ，目前先存储为一个string，未来和硬件挂勾可以映射一个对象
			vaccine:[{type: mongoose.Schema.Types.ObjectId, ref: Config.dbCollectionPrefix + "vaccines" }], //兽医(填写人名)
					    
	});

	this.model = mongoose.model(Config.dbCollectionPrefix + "dogs", this.schema);
}



DogModel.get = function(){
    return DatabaseManager.getModel('Dog').model;    
}


module["exports"] = DogModel;


