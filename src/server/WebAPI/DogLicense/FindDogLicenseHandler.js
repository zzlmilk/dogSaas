var express = require("express");
var router = express.Router();
var RequestHandlerBase = require('../RequestHandlerBase');
const Utils = require("../../lib/Utils");
var _ = require('lodash');
var Const = require("../../lib/consts");
var authenticator = require("../middleware/auth");

var DogLicenseModel = require('../../Models/DogLicense');



var FindDogLicenseHandler = function(){
       	

}



_.extend(FindDogLicenseHandler.prototype,RequestHandlerBase.prototype);




FindDogLicenseHandler.prototype.attach = function(route){
	 var self = this;

	 route.get('/',authenticator,function(request,response){

	 		var husbandryNo = request.body.husbandryNo

	 			if(Utils.isEmpty(husbandryNo)){
				 			
				 self.successResponse(response,Const.resCodeDogNoHusbandryNo);

				 		 return;
				 }

	 		var dogLicenseModel = DogLicenseModel.get();
	 		dogLicenseModel.find({"husbandryNo":husbandryNo},function(err,rows){
	 					// console.log(err)
	 					//console.log(result)
	 				self.successResponse(response,Const.responsecodeSucceed,{
                          dogLicenses:rows
                    });




	 		})
	 		//验证 husbandryNo 有没有
 		return;

	 			






            
	 })
}



new FindDogLicenseHandler().attach(router);
module["exports"] = router;