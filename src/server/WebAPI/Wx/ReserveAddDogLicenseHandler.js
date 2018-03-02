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



_.extend(ReserveAddDogLicenseHandler.prototype,RequestHandlerBase.prototype);


ReserveAddDogLicenseHandler.prototype.attach = function(route){
    var self = this;

    route.get('/',authenticator,function(request,response){
        var code=request.query.code;
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