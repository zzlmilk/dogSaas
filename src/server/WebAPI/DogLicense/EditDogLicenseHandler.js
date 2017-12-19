var express = require("express");
var router = express.Router();
var RequestHandlerBase = require('../RequestHandlerBase');
const Utils = require("../../lib/Utils");
var _ = require('lodash');
var Const = require("../../lib/consts");
var authenticator = require("../middleware/auth");

var DogLicenseLogic = require("../../Logics/DogLicenseLogic");
var dogLicenseMiddleware = require("../middleware/dogLicenseMiddleware");






var EditDogLicenseHandler = function(){


}
/**
 * @api {post} /dogLicense/add_takeWay 添加取证方式
 * @apiName addTakeWay
 * @apiGroup DogLicense
 * @apiDescription 添加取证方式api接口
 * @apiHeader  {Sting} access-key token
 * @apiParam {String} dogLicenseId 狗证ID
 * @apiParam {Number}  takeWay  1自取 2邮寄
 * @apiSuccessExample Success-Response:
 *{ dogLicense:
   { _id: '5a30a165f6bd632ab063b5e0',
     owner: '5a24f583bf77595ff08bf876',
     dog: '5a30a165f6bd632ab063b5e3',
     residence: '5a30a165f6bd632ab063b5e1',
     husbandryNo: 'LCPeu',
     __v: 0,
     DogCard:
      { isCreate: 1,
        message: '可以办理狗证',
        create: '2017-12-13T03:41:25.346Z',
        info: [Object],
        annual: [Object] },
     vaccineCard:
      { isCreate: 1,
        create: '2017-12-13T03:41:25.345Z',
        annual: [Object],
        info: [Object] } } }


 */

_.extend(EditDogLicenseHandler.prototype,RequestHandlerBase.prototype);


EditDogLicenseHandler.prototype.attach = function(route){
    var self = this;

    route.post('/',authenticator, dogLicenseMiddleware,function(request,response){

        var dogLicense = request.dogLicense
        request.body.dogLicense  = dogLicense;



        DogLicenseLogic.add_takeWay(request.body,function(result){
            self.successResponse(response,Const.responsecodeSucceed,{
                dogLicense:result
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


new EditDogLicenseHandler().attach(router);
module["exports"] = router;