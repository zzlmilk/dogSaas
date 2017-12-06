var express = require("express");
var router = express.Router();
var RequestHandlerBase = require('../RequestHandlerBase');
const Utils = require("../../lib/Utils");
var _ = require('lodash');
var Const = require("../../lib/consts");
var authenticator = require("../middleware/auth");

var OwnerModel = require('../../Models/Owner');
var FindOwnerLogic = require("../../Logics/FindOwnerLogic");




var FindOwnerHandler = function(){


}
/*
/**
	* @api {get} owner/find 查询犬主
	* @apiName findOwner
	* @apiGroup Owner
	* @apiDescription 查询api接口，获取犬主信息
	* @apiParam   {String} certificateType 证件类型
	* @apiParam    {String} certificateCode 证件号
	* @apiHeader {String} token Access-Token
    * @apiSuccessExample Success-Response:
{ owner:
   { _id: '5a24f583bf77595ff08bf876',
     name: 'test_kEiAr',
     sex: '1',
     phone: '15901794453',
     tel: '345033',
     certificateType: '1',
     certificateCode: '31010222222222',
     __v: 1,
     dogs: [ '5a24f5c6a8b1f54b60bfbd1a' ],
     location:
      { province: 'province',
        district: 'district',
        city: 'city',
        address: 'address',
        code: 'code' } } }

 */


_.extend(FindOwnerHandler.prototype,RequestHandlerBase.prototype);




FindOwnerHandler.prototype.attach = function(route){
    var self = this;

    route.get('/',authenticator,function(request,response){

        FindOwnerLogic.findOwner(request.body,function(result){
            self.successResponse(response,Const.responsecodeSucceed,{
                owner:result
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



new FindOwnerHandler().attach(router);
module["exports"] = router;