var express = require("express");
var router = express.Router();
var RequestHandlerBase = require('../RequestHandlerBase');
const Utils = require("../../lib/Utils");
var _ = require('lodash');
var Const = require("../../lib/consts");
var authenticator = require("../middleware/auth");

var dogLicenseMiddleware = require("../middleware/dogLicenseMiddleware");

var ResidenceModel = require('../../Models/Residence');
var DogLicenseLogic = require("../../Logics/DogLicenseLogic");
var OrganizationMiddleware = require("../middleware/organizationMiddleware");


var EditResidenceHandler = function(){


}



_.extend(EditResidenceHandler.prototype,RequestHandlerBase.prototype);




EditResidenceHandler.prototype.attach = function(route){
    var self = this;

    route.post('/',authenticator,OrganizationMiddleware,dogLicenseMiddleware,function(request,response){

       		var dogLicense = request.dogLicense
       		var residenceId = dogLicense.residence
       		request.body.organization = request.organization
       		request.body.dogLicense = dogLicense;

       		if (residenceId) {
       				//已存就更新,目前不能支持更新
       				self.successResponse(response,Const.resCodeResidenceCanNotUpdate);	

       		}else{       			       		
       			//不存在residenceId 就是没有户籍必须创建，并且更新dogcard信息
       			 DogLicenseLogic.createResidence(request.body,function(result){
                     self.successResponse(response,Const.responsecodeSucceed,{
                         dogLicense: result
                    });

                },function(err,code){
                        if (err) {
                            self.errorResponse(response,Const.httpCodeServerError);
                        }else{
                            self.successResponse(response,code);    
                        }

                    });


       		}



    })

}



new EditResidenceHandler().attach(router);
module["exports"] = router;