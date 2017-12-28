var express = require('express');
var request=require('request')
var router = express.Router();
var RequestHandlerBase = require('../RequestHandlerBase');
var Const = require("../../lib/consts");
var authenticator = require("../middleware/auth");
var WxUserModel=require('../Models/WxUser')

var Conf = require("../../lib/init");

const Utils = require("../../lib/Utils");



var _ = require('lodash');




var getTokenHandler = function(){

}


_.extend(getTokenHandler.prototype,RequestHandlerBase.prototype);


/**
 * @api {GET} /wx/token 获取wx token
 * @apiName getToken
 * @apiGroup Wx
 * @apiDescription  获取access_token
 * @apiHeader  {Sting} access-token token
 * @apiSuccessExample Success-Response:
 { code: 1,
  data:
   { access_token: '5_nt0uS4JtW-AYliuKA8ODO4VoTyQvhzcm0B4aP3H_-xnRH7Rue0q-d1srZ8re0t_VAY83myjh7Kld_yeaYtVHNLjyLVrWvAuStr0nvHkvzBnn
5X8qnad1tDKgHSzV5P9BqsyOS58kO5qmYqA_JDQfAFAPJW' } }


 */


getTokenHandler.prototype.attach = function(route){


    var self = this;

    route.get('/',authenticator,function(req,res){
        request.get('https://api.weixin.qq.com/cgi-bin/token?grant_type='+Conf.Wx.grant_type+'&appid='+Conf.Wx.appid+'&secret='+Conf.Wx.secret+'',
            function(err,info) {
                if(err){
                self.errorResponse(
                    res,
                    Const.httpCodeServerError
                );
            }
            else{
                self.successResponse(res,Const.responsecodeSucceed,{
                    access_token:JSON.parse(info.body).access_token,


                });
            }

        })






    });

}




new getTokenHandler().attach(router);
module["exports"] = router;






