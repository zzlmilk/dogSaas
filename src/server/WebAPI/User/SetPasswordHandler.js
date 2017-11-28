var express = require("express");
var router = express.Router();
var RequestHandlerBase = require('../RequestHandlerBase');
const Utils = require("../../lib/Utils");
var _ = require('lodash');
var Const = require("../../lib/consts");

var RegisterLogic = require("../../Logics/RegisterLogic");




var SetPasswordHandler = function(){
       	

}
/**
 * @api {post} /user/set_password 忘记密码
 * @apiName setassword
 * @apiGroup User
 * @apiDescription 忘记密码api接口
 * @apiParam   {String} email 邮箱
 * @apiParam    {String} password 密码
 * @apiSuccess {String} token
 * @apiSuccessExample Success-Response:
 { token: 'q6QKHgEK7fk2981KPhRps8rT',
user:
 { _id: '5a1cf5857651f434a8eeb4ba',
   email: '2420933732@qq.com',
   logionProcess: 0 } }


 */
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