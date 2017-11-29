var express = require("express");
var router = express.Router();
var RequestHandlerBase = require('../RequestHandlerBase');
const Utils = require("../../lib/Utils");
var _ = require('lodash');
var Const = require("../../lib/consts");


var authenticator = require("../middleware/auth");
var DogLicenseLogic = require("../../Logics/DogLicenseLogic");

var AddDogLicenseHandler = function(){
       	

}


_.extend(AddDogLicenseHandler.prototype,RequestHandlerBase.prototype);


AddDogLicenseHandler.prototype.attach = function(route){
	 var self = this;

	 route.post('/',authenticator,function(request,response){

            DogLicenseLogic.add(request.body,function(result){                
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
            
	 })
}



new AddDogLicenseHandler().attach(router);
module["exports"] = router;