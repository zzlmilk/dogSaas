//微信用户
var _ = require('lodash');
var mongoose = require('mongoose');
var Config = require("../lib/init");
var DatabaseManager = require('../lib/DatabaseManager');
const Utils = require("../lib/Utils");
var async = require('async');
const Const = require("../lib/consts");

var WxUserModel = function(){

};


WxUserModel.prototype.init = function(mongoose){
    this.schema = new mongoose.Schema({
        openId:String ,//用户标识
        nickname:String,
        photo:String,
        sex:String,
        dogLicenses:[{type: mongoose.Schema.Types.ObjectId, ref: Config.dbCollectionPrefix + "dogLicenses" }], //dogLicenseID
        created:Date,
        access_token:String


    });

    this.model = mongoose.model(Config.dbCollectionPrefix + "wxUsers", this.schema);
}



WxUserModel.get = function(){
    return DatabaseManager.getModel('WxUser').model;
}


module["exports"] = WxUserModel;


