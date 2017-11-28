var express = require("express");
var router = express.Router();
var RequestHandlerBase = require('../RequestHandlerBase');
const Utils = require("../../lib/Utils");
var _ = require('lodash');
var Const = require("../../lib/consts");



var LoginLogic = require("../../Logics/LoginLogic");

var LoginHandler = function(){
       	

}

/**
	* @api {post} /user/login 用户登录
	* @apiName login
	* @apiGroup User
	* @apiDescription 登录api接口，获取用户token 和用户信息
	* @apiParam   {String} email 邮箱
	* @apiParam    {String} password 密码
	* @apiSuccess {String} token
	* @apiSuccess {Model} user Model of loginned user
	* @apiSuccessExample Success-Response:
	{ 	  token: '3JQKTIhfV7gdk7E2UZqKteQ3',
		  user: 
		   { _id: '5a1bc7c8fa5f0a59734923e2',
		     email: '413124766@qq.com',
		     logionProcess: 1,
		     organization: 
		      { _id: '5a1cde7ff9e55785d860fd83',
		        name: 'test_d7OpY',
		        tel: '15838365455',
		        businessLicense: '123',
		        animalMedicalLicense: '123',
		        adminUser: '5a1bc7c8fa5f0a59734923e2',
		        created: '2017-11-28T03:56:47.154Z',
		        __v: 0,
		        veterinarians: [],
		        checkStatus: [Object],
		        contacts: [Object],
		        serviceScope: [],
		        location: [Object] } } }



*/


_.extend(LoginHandler.prototype,RequestHandlerBase.prototype);

LoginHandler.prototype.attach = function(route){
	 var self = this;

	 route.post('/',function(request,response){

			LoginLogic.execute(request.body,function(result){				
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


new LoginHandler().attach(router);
module["exports"] = router;