var express = require("express");
var router = express.Router();
var RequestHandlerBase = require('../RequestHandlerBase');
const Utils = require("../../lib/Utils");
var _ = require('lodash');
var Const = require("../../lib/consts");

var SendEmailLogic = require("../../Logics/SendEmailLogic");

   /**
     * @api {post} Send/Email Verification Email
     * @apiName Post VerificationEmailHandler
     * @apiGroup WebAPI
     * @apiHeader {String} Access-Token Users unique access-token.
     * @apiDescription get conversation list of the user
     * @apiParam {string} email Email of target user
     * @apiParam {string} useType   用途1:注册使用。2:忘记密码
     *
	
*/

var SendEmailHandler = function(){
       	

}

_.extend(SendEmailHandler.prototype,RequestHandlerBase.prototype);


SendEmailHandler.prototype.attach = function(route){
	 var self = this;

	 route.post('/',function(request,response){			 
			 //验证参数：暂时省
			SendEmailLogic.sendEmail(request.body,function(result){		
					
					 self.successResponse(response,Const.responsecodeSucceed,{
		                 code: result,
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


new SendEmailHandler().attach(router);
module["exports"] = router;