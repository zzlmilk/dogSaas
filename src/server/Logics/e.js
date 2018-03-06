//https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token='+result.access_token



const Utils = require("../lib/Utils");
var validator = require('validator');
var Const = require("../lib/consts");
var async = require('async');
var _ = require('lodash');
var request=require('request')
var ResidenceModel = require('../Models/Residence');
var DogLicenseModel = require('../Models/DogLicense');
var DogModel = require('../Models/Dog');
var VaccineModel = require('../Models/Vaccine');
var OwnerModel = require('../Models/Owner');
var Conf = require("../lib/init");
var fs=require("fs")

  var wx_getToken_url='https://api.weixin.qq.com/cgi-bin/token?grant_type='+Conf.Wx.grant_type+'&appid='+Conf.Wx.appid+'&secret='+Conf.Wx.secret;

request({
                          method:'GET',
                          url:wx_getToken_url
					  },function (err,res,body) {
                      	if(err){
                              throw err;
                          }else{
                              var data=JSON.parse(body);
                          	 // console.log(data)
                        request({
                          method:"POST",
                          url:'https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token='+data.access_token,
                          body: JSON.stringify({
                              scene: "123",
                              path: "pages/index/index",
                              width: 430
                          })
                      },function(err,res,body){
                      	console.log(body)
                      })
                      	}
                     })


