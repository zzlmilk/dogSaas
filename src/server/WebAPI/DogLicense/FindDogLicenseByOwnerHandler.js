var express = require("express");
var router = express.Router();
var RequestHandlerBase = require('../RequestHandlerBase');
const Utils = require("../../lib/Utils");
var _ = require('lodash');
var Const = require("../../lib/consts");
var authenticator = require("../middleware/auth");


var FindDogLicenseLogic = require("../../Logics/FindDogLicenseLogic");



var FindDogLicenseByOwnerHandler = function(){
       	

}
/*
/**
	* @api {post} /dogLicense/find_by_owner 查询狗证（犬主）
	* @apiName findDogLicenseByOwner
	* @apiGroup DogLicense
	* @apiDescription 查询api接口，获取狗证信息
	* @apiParam {String} name 犬主名
	* @apiParam {String} phone 手机号
	* @apiParam   {String} certificateType 证件类型
	* @apiParam    {String} certificateCode 证件号
	* @apiHeader {String} token Access-Token
    * @apiSuccessExample Success-Response:
{ dogLicenses:
   [ { _id: '5a1f603923027209fcffa10d',
       owner: '5a1f603923027209fcffa110',
       dog: '5a1f603923027209fcffa10f',
       husbandryNo: 'Jykjx',
       __v: 0,
       DogCard: [Object],
       vaccineCard: [Object] },
     { _id: '5a24f583bf77595ff08bf873',
       owner: '5a24f583bf77595ff08bf876',
       dog: '5a24f583bf77595ff08bf875',
       husbandryNo: '33RNR',
       __v: 0,
       DogCard: [Object],
       vaccineCard: [Object] } ] }



 */



_.extend(FindDogLicenseByOwnerHandler.prototype,RequestHandlerBase.prototype);




FindDogLicenseByOwnerHandler.prototype.attach = function(route){
	 var self = this;

	 route.post('/',authenticator,function(request,response){

        FindDogLicenseLogic.find_by_owner(request.body,function(result){
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



new FindDogLicenseByOwnerHandler().attach(router);
module["exports"] = router;