//预约用户
var _ = require('lodash');
var mongoose = require('mongoose');
var Config = require("../lib/init");
var DatabaseManager = require('../lib/DatabaseManager');
const Utils = require("../lib/Utils");
var async = require('async');
const Const = require("../lib/consts");

var ReserveUserModel = function(){

};


ReserveUserModel.prototype.init = function(mongoose){
    this.schema = new mongoose.Schema({
        code:String,
        type:String,  //预约状态 1,未办理 -1，已办理
        owner:{
           name: String, //主人名字
           sex:String, //性别   1男 2女
           phone:String,
           tel:String,
           certificateType:String,//证件类型  1身份证 2护照
           certificateCode:String,//证件号
           location:{
               province:String,
               district:String,
               city:String,
               address:String,
               code:String //邮编
           }
       },
        dog:{
           nickname: String, //宠物昵称
           sex:String, //性别
           breed:String, //品种
           usage:String,//用途
           hairColor:String, //毛色
           bornDate:Date, //出生日期
           photoUrl:String, //宠物照片
        },
        created:Date
    });

    this.model = mongoose.model(Config.dbCollectionPrefix + "reserveUsers", this.schema);
}



ReserveUserModel.get = function(){
    return DatabaseManager.getModel('ReserveUser').model;
}


module["exports"] = ReserveUserModel;


