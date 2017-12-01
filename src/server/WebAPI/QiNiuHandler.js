var qiniu = require("qiniu");
var express = require('express');
var router = express.Router();
var RequestHandlerBase = require('./RequestHandlerBase');
var Const = require("../lib/consts");
var authenticator = require("./middleware/auth");

var Conf = require("../lib/init");

const Utils = require("../lib/Utils");



var _ = require('lodash');




var QiNiuHandler = function(){
    
}

	
_.extend(QiNiuHandler.prototype,RequestHandlerBase.prototype);


 /**
     * @api {GET} /Qiniu/token 获取qiniu tokern
	 * @apiName qiuniu
	 * @apiGroup qiuniu
	 * @apiDescription  获取qiniu
	 * @apiHeader  {Sting} access-key token  
	 * @apiSuccess {String} token
     *     
     * @apiSuccessExample Success-Response:
	{ code: 1,
	  data: 
	  { token: 'k-ZxbCCBV3eLH5k2nUnSZo6OG_2zWfohupr_DZa2:0Zt0mMjvEWaRySAPFGLMFbvv3pU=:eyJzY29wZSI6ImhhbG9raXQiLCJkZWFkbGluZSI6MTQ5OTkzNTM3OX0=' } }

    */

  
QiNiuHandler.prototype.attach = function(route){

	var self = this;

	route.get('/',authenticator,function(request,response){

			//要上传的空间
			var mac = new qiniu.auth.digest.Mac(Conf.Qiniu.accessKey, Conf.Qiniu.secretKey);

			var options = {
			  scope: Conf.Qiniu.bucket,
			};
			var putPolicy = new qiniu.rs.PutPolicy(options);

			var uploadToken=putPolicy.uploadToken(mac);

			if (uploadToken) {

				 self.successResponse(response,Const.responsecodeSucceed,{
                        token: uploadToken
                    });
			}
			else
			self.errorResponse(
		                    response,
		                    Const.httpCodeSeverError
		                );
				



	});

}




new QiNiuHandler().attach(router);
module["exports"] = router;






