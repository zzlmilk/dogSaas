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