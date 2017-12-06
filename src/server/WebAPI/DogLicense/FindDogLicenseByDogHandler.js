var express = require("express");
var router = express.Router();
var RequestHandlerBase = require('../RequestHandlerBase');
const Utils = require("../../lib/Utils");
var _ = require('lodash');
var Const = require("../../lib/consts");
var authenticator = require("../middleware/auth");


var FindDogLicenseLogic = require("../../Logics/FindDogLicenseLogic");



var FindDogLicenseByDogHandler = function(){


}
/*
/**
	* @api {get} /dogLicense/find_by_dog 查询狗证（犬只）
	* @apiName findDogLicenseByDog
	* @apiGroup DogLicense
	* @apiDescription 查询api接口，获取狗证信息
	* @apiParam {String} irisID 虹膜ID
	* @apiHeader {String} token Access-Token
    * @apiSuccessExample Success-Response:
{ dogLicenses:
   { _id: '5a26561758875261c0a5da71',
     owner: '5a1f603923027209fcffa110',
     dog: '5a26561758875261c0a5da73',
     husbandryNo: 'jK3qR',
     __v: 0,
     DogCard: { isCreate: 0, message: '该房产已经被注册' },
     vaccineCard: { isCreate: 1, create: '2017-12-05T08:17:27.078Z' } } }
 */



_.extend(FindDogLicenseByDogHandler.prototype,RequestHandlerBase.prototype);




FindDogLicenseByDogHandler.prototype.attach = function(route){
    var self = this;

    route.get('/',authenticator,function(request,response){

        FindDogLicenseLogic.find_by_dog(request.body,function(result){
            self.successResponse(response,Const.responsecodeSucceed,{
                dogLicenses:result
            });

        },function(err,code){
            if (err) {
                self.errorResponse(response,Const.httpCodeServerError);
            }else{
                self.successResponse(response,code);
            }

        });




    })
}



new FindDogLicenseByDogHandler().attach(router);
module["exports"] = router;