//户籍对象
var _ = require('lodash');
var mongoose = require('mongoose');
var Config = require("../lib/init");
var DatabaseManager = require('../lib/DatabaseManager');
const Utils = require("../lib/Utils");
var async = require('async');
const Const = require("../lib/consts");

var ResidenceModel  = function(){};



ResidenceModel.prototype.init = function (mongoose) {
	this.schema = new mongoose.Schema({			
			houseProperty: String,     //自由和租凭
			houseNo: String,	  //(沪)房地（长）字（2006）第(000386)号			
			address:String,       //xxx路xxx弄xxx号 ，用户判断唯一性
			isSterilization:Number,    //是否绝育  0:未绝育 1:绝育:String, 		
			created:Date, //创建时间		

			
	});

	this.model = mongoose.model(Config.dbCollectionPrefix + "residences", this.schema);
}



ResidenceModel.get = function () {
	return DatabaseManager.getModel('Residence').model;
}

module["exports"] = ResidenceModel;
