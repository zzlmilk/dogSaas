var express = require("express");
var router = express.Router();
var RequestHandlerBase = require('../RequestHandlerBase');
const Utils = require("../../lib/Utils");
var _ = require('lodash');
var Const = require("../../lib/consts");

var RegisterLogic = require("../../Logics/RegisterLogic");




var RegisterHandler = function(){
       	

}
/**
 * @api {post} /user/register 用户注册
 * @apiName register
 * @apiGroup User
 * @apiDescription 注册api接口，获取token
 * @apiParam {String} email 邮箱
 * @apiParam {String} password 密码
 * @apiParam {String} code 验证码
 * @apiSuccess {String} token
 * @apiSuccessExample Success-Response:
 *{ token: 'PGXNvuC1W7q3BRfOSD1lSFc1',
     user:
      { _id: '5a1cf5857651f434a8eeb4ba',
        email: '2420933732@qq.com',
        logionProcess: 0 } } }

 */

_.extend(RegisterHandler.prototype,RequestHandlerBase.prototype);


RegisterHandler.prototype.attach = function(route){
	 var self = this;

	 route.post('/',function(request,response){

			RegisterLogic.execute(request.body,function(result){				
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


new RegisterHandler().attach(router);
module["exports"] = router;