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
	* @api {POST} /reserve/find 预约查询
	* @apiName findReserveUser
	* @apiGroup Reserve
	* @apiDescription 查询预约用户
	* @apiParam {String} code  6位的凭证
    * @apiParam {String} page  页数
	* @apiHeader  {Sting} access-token token
    * @apiSuccessExample Success-Response:
{ reserveUser:
      [ [Object],
        [Object],
        [Object] ]
        count:7
       }


 */



_.extend(FindReserveUserHandler.prototype,RequestHandlerBase.prototype);


FindReserveUserHandler.prototype.attach = function(route){
    var self = this;

    route.post('/',authenticator,function(request,response){
        var code=request.body.code;
        var page=request.body.page;
        var res={};
        var reserveUserModel=ReserveUserModel.get();
                if (Utils.isEmpty(code)) {
                    reserveUserModel.count().exec(function(err,count){
                        if(err){
                            throw err
                        }else{
                           res.count=count;
                        }
                    });
                    reserveUserModel.find().skip(Utils.skip(page)).limit(Const.reserveUserListLimit).exec(function (err, reserveUserResult) {
                        if (err) {
                            throw err;
                        }
                        else {
                            self.successResponse(response,Const.responsecodeSucceed, {
                                   reserveUser:reserveUserResult,
                                   count:res.count
                                });
                            }
                        })
                } else {
                    reserveUserModel.find({code: code}).count().exec(function(err,count){
                        if(err){
                            throw err
                        }else{
                            res.count=count;
                        }
                    });
                    reserveUserModel.find({code:code},function (err, reserveUserResult) {
                        if (err) {
                            throw err;
                        }
                        else {
                            self.successResponse(response,Const.responsecodeSucceed,
                                {reserveUser:reserveUserResult,
                                count:res.count});
                            }
                    })
                }
        })
};


new FindReserveUserHandler().attach(router);
module["exports"] = router;