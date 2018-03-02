var express = require("express");
var router = express.Router();
var RequestHandlerBase = require('../RequestHandlerBase');
const Utils = require("../../lib/Utils");
var _ = require('lodash');
var Const = require("../../lib/consts");
var ReserveUserModel=require('../../Models/ReserveUser');

var authenticator = require("../middleware/auth");
var FindReserveUserHandler = function(){


};
/*
/**
	* @api {GET} /reserve/find 预约查询
	* @apiName findReserveUser
	* @apiGroup Reserve
	* @apiDescription 查询预约用户
	* @apiParam {String} code  6位的凭证
	* @apiHeader  {Sting} access-token token
    * @apiSuccessExample Success-Response:
{ reserveUser:
      [ [Object],
        [Object],
        [Object] ] } }


 */



_.extend(FindReserveUserHandler.prototype,RequestHandlerBase.prototype);


FindReserveUserHandler.prototype.attach = function(route){
    var self = this;

    route.get('/',authenticator,function(request,response){
        var code=request.query.code;
        var reserveUserModel=ReserveUserModel.get();
        if(Utils.isEmpty(code)){
            reserveUserModel.find({},function (err,result) {
                if(err){
                    self.errorResponse(response,Const.httpCodeServerError);
                }else{
                    self.successResponse(response,Const.responsecodeSucceed,
                        {reserveUser:result});
                }
            })
        }else {
            reserveUserModel.findOne({code: code}, function (err, result) {
                if (err) {
                    self.errorResponse(response, Const.httpCodeServerError);
                } else {
                    self.successResponse(response, Const.responsecodeSucceed,
                        {reserveUser: result});
                }
            })
        }
    })
};


new FindReserveUserHandler().attach(router);
module["exports"] = router;