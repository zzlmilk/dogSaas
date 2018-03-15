var express = require("express");
var router = express.Router();
var RequestHandlerBase = require('../RequestHandlerBase');
const Utils = require("../../lib/Utils");
var _ = require('lodash');
var Const = require("../../lib/consts");
var authenticator = require("../middleware/auth");

var DogLicenseLogic = require("../../Logics/DogLicenseLogic");
var DogLicenseMiddleware = require("../middleware/dogLicenseMiddleware");






var EditDogCardHandler = function(){


}


/**
 * @api {post} /dogCard/annual 狗证年检
 * @apiName editDogCard
 * @apiGroup Annual
 * @apiDescription 狗证年检api接口
 * @apiHeader  {Sting} access-token token
 * @apiParam {String} dogLicenseId 狗证ID
 * @apiParamExample {json} Request Example
 {
    dogLicenseId:"5aa7a9493c25cc49fcf20512"
 };
 * @apiSuccessExample Success-Response:
 * { dogLicense:
   { _id: '5aa7a9493c25cc49fcf20512',
     owner: '5aa7a9493c25cc49fcf20516',
     dog: '5aa7a9493c25cc49fcf20515',
     residence: '5aa7a9493c25cc49fcf20513',
     husbandryNo: 'iGQAP',
     __v: 2,
     DogCard:
      { isCreate: 1,
        message: '可以办理狗证',
        create: '2018-03-13T10:34:49.281Z',
        info: [Object],
        annual: [Object] },
     vaccineCard:
      { isCreate: 1,
        create: '2018-03-13T10:34:49.263Z',
        annual: [Object],
        info: [Object] } } }



 */



_.extend(EditDogCardHandler.prototype,RequestHandlerBase.prototype);


EditDogCardHandler.prototype.attach = function(route){
    var self = this;

    route.post('/',authenticator,DogLicenseMiddleware,function(request,response){


        request.body.dogLicense  = request.dogLicense;

        DogLicenseLogic.editDogCard(request.body,function(result){
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


new EditDogCardHandler().attach(router);
module["exports"] = router;