var express = require("express");
var router = express.Router();
var RequestHandlerBase = require('../RequestHandlerBase');
const Utils = require("../../lib/Utils");
var _ = require('lodash');
var Const = require("../../lib/consts");


var authenticator = require("../middleware/auth");
var OwnerLogic = require("../../Logics/OwnerLogic");

var AddWxUserHandler = function(){


}

/**
 * @api {post} /wx/add_user 添加微信用户
 * @apiName addWxUser
 * @apiGroup Wx
 * @apiDescription 添加微信用户，获取狗证api接口
 * @apiHeader  {Sting} access-token token
 * @apiParam {String}  openId 用户标识
 * @apiParam {String} nickname 昵称
 * @apiParam {String} photo 头像
 * @apiParam {String} sex 性别
 * @apiParam  dogLicenses dogLicenseId ,数组
 * @apiParamExample {json} Request Example
 {
     var body = {
        openId:"3PY4C",
        nickname:"haha",
        photo:"photo",
        sex: "1",
        dogLicenses: ["5a3b820cd2e31d6cd89ef0e1",
                      "5a41b487f1ca611808e8517b"]
    };
 }
 * @apiSuccessExample Success-Response:
 { wxUser:
   { _id: '5a436fd9ae59a06160bce70d',
     openId: '3PY4C',
     nickname: 'haha',
     photo: 'photo',
     sex: '1',
     created: '2017-12-27T10:03:05.589Z',
     __v: 3,
     dogLicenses: [ [Object], [Object], [Object] ] } }




 */


_.extend(AddWxUserHandler.prototype,RequestHandlerBase.prototype);


AddWxUserHandler.prototype.attach = function(route){
    var self = this;

    route.post('/',authenticator,function(request,response){


        OwnerLogic.add_wxUser(request.body,function(result){
            self.successResponse(response,Const.responsecodeSucceed,{
               wxUser:result
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


new AddWxUserHandler().attach(router);
module["exports"] = router;