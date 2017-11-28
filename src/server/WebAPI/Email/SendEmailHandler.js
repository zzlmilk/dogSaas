var express = require("express");
var router = express.Router();
var RequestHandlerBase = require('../RequestHandlerBase');
const Utils = require("../../lib/Utils");
var _ = require('lodash');
var Const = require("../../lib/consts");

var SendEmailLogic = require("../../Logics/SendEmailLogic");

/**
     * @api {post} Send/Email 获取验证码
     * @apiName sendmail
     * @apiGroup Email
     * @apiHeader {String} Access-Token Users unique access-token.
     * @apiDescription 获取验证码api接口
     * @apiParam {string} email  邮箱
     * @apiParam {string} useType   1:注册使用；2:忘记密码
     * @apiSuccessExample Success-Response:
     { code: 1}


	
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