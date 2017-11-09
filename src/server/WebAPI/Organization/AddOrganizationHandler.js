var express = require("express");
var router = express.Router();
var RequestHandlerBase = require('../RequestHandlerBase');
const Utils = require("../../lib/Utils");
var _ = require('lodash');
var Const = require("../../lib/consts");


var authenticator = require("../middleware/auth");
var OrganizationLogics = require("../../Logics/OrganizationLogics");

var AddOrganizationHandler = function(){
       	

}

_.extend(AddOrganizationHandler.prototype,RequestHandlerBase.prototype);


AddOrganizationHandler.prototype.attach = function(route){
	 var self = this;

	 route.post('/',authenticator,function(request,response){
	 					
	 		OrganizationLogics.add(request.body,function(result){				
					 self.successResponse(response,Const.responsecodeSucceed,{
		                token: result,		                
		            });

				},function(err,code){
						if (err) {
							self.errorResponse(response,Const.httpCodeServerError);
						}else{
							self.successResponse(response,code);	
						}

						 
						
				})
	 })
}


new AddOrganizationHandler().attach(router);
module["exports"] = router;