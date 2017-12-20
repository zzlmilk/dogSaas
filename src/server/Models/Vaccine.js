//疫苗对象
var _ = require('lodash');
var mongoose = require('mongoose');
var Config = require("../lib/init");
var DatabaseManager = require('../lib/DatabaseManager');
const Utils = require("../lib/Utils");
var async = require('async');
const Const = require("../lib/consts");

var VaccineModel  = function(){};



VaccineModel.prototype.init = function (mongoose) {
	this.schema = new mongoose.Schema({			
			name: String,        //疫苗名称
			batchNo: String,	 //批号		
			manufacturer:String, //厂商			
			veterinarianName:String,//打疫苗的兽医
			organizationName:String, //免疫点名称
			created:Date, //创建时间
            husbandryNo:String, //年检时畜牧业提供的条形码
			
	});

	this.model = mongoose.model(Config.dbCollectionPrefix + "vaccines", this.schema);
}



VaccineModel.get = function () {
	return DatabaseManager.getModel('Vaccine').model;
}

module["exports"] = VaccineModel;
