var express = require("express");
var router = express.Router();
var RequestHandlerBase = require('../RequestHandlerBase');
const Utils = require("../../lib/Utils");
var _ = require('lodash');
var Const = require("../../lib/consts");
var ReserveUserModel=require('../../Models/ReserveUser');

var authenticator = require("../middleware/auth");
var ReserveAddDogLicenseHandler = function(){


};
/*
/**
	* @api {POST} /reserve/addDogLicense 预约办理
	* @apiName reserveAddDogLicense
	* @apiGroup Reserve
	* @apiDescription 查询办理，改变type
	* @apiParam {String} code  6位的凭证
	* @apiHeader  {Sting} access-token token
    * @apiSuccessExample Success-Response:
{ reserveUser:
      { _id: '5a97a7733d051a5ad490ecc5',
        code: '942992',
        type: '-1',
        created: '2018-03-01T07:10:43.929Z',
        __v: 0,
        dog: [Object],
        owner: [Object] } }


 */



_.extend(ReserveAddDogLicenseHandler.prototype,RequestHandlerBase.prototype);


ReserveAddDogLicenseHandler.prototype.attach = function(route){
    var self = this;

    route.post('/',authenticator,function(request,response){
        var code=request.body.code;
        if(Utils.isEmpty(code)){
            self.successResponse(response, Const.resCodeWxReserveNoCode);
        }
        var reserveUserModel=ReserveUserModel.get();
        reserveUserModel.findOne({code:code},function (err,result) {
            result.type=-1;
            result.save(function (err,result) {
                if(err){
                    self.errorResponse(response,Const.httpCodeServerError);
                }else{

                    self.successResponse(response,Const.responsecodeSucceed,
                        {reserveUser:result});
                }
            })

        })
    })
};


new ReserveAddDogLicenseHandler().attach(router);
module["exports"] = router;