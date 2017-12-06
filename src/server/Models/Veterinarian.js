//兽医对象
var _ = require('lodash');
var mongoose = require('mongoose');
var Config = require("../lib/init");
var DatabaseManager = require('../lib/DatabaseManager');
const Utils = require("../lib/Utils");
var async = require('async');
const Const = require("../lib/consts");

var VeterinarianModel  = function(){};



VeterinarianModel.prototype.init = function (mongoose) {
    this.schema = new mongoose.Schema({
        name: String,        //疫苗名称
        code:String,
        created:Date, //创建时间

    });

    this.model = mongoose.model(Config.dbCollectionPrefix + "veterinarians", this.schema);
}



VeterinarianModel.get = function () {
    return DatabaseManager.getModel('Veterinarian').model;
}

module["exports"] = VeterinarianModel;
