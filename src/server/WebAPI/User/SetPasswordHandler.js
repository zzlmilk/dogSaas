var express = require("express");
var router = express.Router();
var RequestHandlerBase = require('../RequestHandlerBase');
const Utils = require("../../lib/Utils");
var _ = require('lodash');
var Const = require("../../lib/consts");

var RegisterLogic = require("../../Logics/RegisterLogic");




var SetPasswordHandler = function(){
       	

}

_.extend(SetPasswordHandler.prototype,RequestHandlerBase.prototype);


SetPasswordHandler.prototype.attach = function(route){
	 var self = this;

	 route.post('/',function(request,response){

			RegisterLogic.editPassword(request.body,function(result){				
					 self.successResponse(response,Const.responsecodeSucceed,{
		                token: result.token,
		                user:  Utils.pickUser(result.user),		                
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


new SetPasswordHandler().attach(router);
module["exports"] = router;