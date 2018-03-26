var express = require("express");
var router = express.Router();
var RequestHandlerBase = require('../RequestHandlerBase');
const Utils = require("../../lib/Utils");
var _ = require('lodash');
var Const = require("../../lib/consts");

var SendEmailLogic = require("../../Logics/SendEmailLogic");

   /**
     * @api {post} vaild/Email 验证验证码
     * @apiName vaildmail
     * @apiGroup Email
     * @apiHeader {String} Access-Token Users unique access-token.
     * @apiDescription 验证验证码api接口
     * @apiParam {String} email 邮箱
	 * @apiParam {String} code 验证码
     * @apiParam {String} useType   1:注册使用；2:忘记密码
     * @apiSuccessExample Success-Response:
	 {
	 email: '2420933732@qq.com',
	 useType: '1' }

	
*/

var VaildEmailHandler = function(){
       	
}

_.extend(VaildEmailHandler.prototype,RequestHandlerBase.prototype);


VaildEmailHandler.prototype.attach = function(route){
	 var self = this;

	 route.post('/',function(request,response){			
			 //验证参数：暂时省
			SendEmailLogic.VaildEmail(request.body,function(result){							
					 self.successResponse(response,Const.responsecodeSucceed,
		                  result
		            );

				},function(err,code){
						if (err) {
							self.errorResponse(response,Const.httpCodeServerError);
						}else{
							self.successResponse(response,code);	
						}

				})


	 })
}


new VaildEmailHandler().attach(router);
module["exports"] = router;