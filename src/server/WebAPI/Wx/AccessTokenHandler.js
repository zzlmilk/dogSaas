var express = require('express');
var request=require('request')
var router = express.Router();
var RequestHandlerBase = require('../RequestHandlerBase');
var Const = require("../../lib/consts");
var authenticator = require("../middleware/auth");



var Conf = require("../../lib/init");

const Utils = require("../../lib/Utils");



var _ = require('lodash');




var AccessTokenHandler = function(){

}


_.extend(AccessTokenHandler.prototype,RequestHandlerBase.prototype);

AccessTokenHandler.prototype.attach = function(route){


    var self = this;

    route.get('/',authenticator,function(req,res){

        var get_accessToken_url='https://api.weixin.qq.com/cgi-bin/token?grant_type='+Conf.Wx.grant_type+'&appid='+Conf.Wx.appid+'&secret='+Conf.Wx.secret
        request({
                method:"GET",
                url:get_accessToken_url
            }, function(err,result,body) {
            var data=JSON.parse(body);
            var access_token=data.access_token;
            var expires_in=data.expires_in;
            var now=(new Date().getTime());
            if(now<expires_in){
                return true;
            }else{
                request({
                    method:"GET",
                    url:get_accessToken_url
                },function (err,result,body) {
                    var now=(new Date().getTime());
                    var data=JSON.parse(body);
                    var expires_in=now+(data.expires_in-20)*1000;
                    data.expires_in=expires_in;
                    })
            }
            if(err){
                    self.errorResponse(res,
                        Const.httpCodeServerError
                    );
                }
                else{
                      self.successResponse(res,Const.responsecodeSucceed,{
                        access_token:access_token
                      });
                }

            })






    });

}




new AccessTokenHandler().attach(router);
module["exports"] = router;


