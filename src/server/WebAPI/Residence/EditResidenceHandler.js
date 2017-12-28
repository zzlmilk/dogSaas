var express = require("express");
var router = express.Router();
var RequestHandlerBase = require('../RequestHandlerBase');
const Utils = require("../../lib/Utils");
var _ = require('lodash');
var Const = require("../../lib/consts");
var authenticator = require("../middleware/auth");

var dogLicenseMiddleware = require("../middleware/dogLicenseMiddleware");

var ResidenceModel = require('../../Models/Residence');
var DogLicenseLogic = require("../../Logics/DogLicenseLogic");
var OrganizationMiddleware = require("../middleware/organizationMiddleware");


var EditResidenceHandler = function(){


}
/**
 * @apiDefine Residence
 * @apiParam (residence) {String} houseNo (沪)房地（长）字（2006）第(000386)号
 * @apiParam (residence) {String} houseProperty 自由和租凭
 * @apiParam (residence) {String} address xxx路xxx弄xxx号 ，用户判断唯一性
 * @apiParam (residence) {Number} isSterilization  是否绝育  0:未绝育 1:绝育
 */

/**
 * @api {post} /residence/edit 编辑房产信息
 * @apiName editResidence
 * @apiGroup Residence
 * @apiDescription 编辑房产信息api接口
 * @apiHeader  {Sting} access-token token
 * @apiParam {String} dogLicenseId 狗证ID
 * @apiUse Residence
 * @apiParamExample {json} Request Example
 {
     dogLicenseId:"5a26475493f3485bc4d470cd",
        residence:{
            houseNo:global.getRandomStr(),
            houseProperty:"ziyou",
            address:global.getRandomStr(),
            isSterilization:"0"
        }
 }
 * @apiSuccessExample Success-Response:
 *  { dogLicense:
      { residence: '5a2f425ba2003a1e3815d6f0',
        _id: '5a2e570792f3982724eea239',
        owner: '5a24f583bf77595ff08bf876',
        dog: '5a2e570792f3982724eea23c',
        husbandryNo: 'wlvFf',
        __v: 0,
        DogCard: [Object],
        vaccineCard: [Object] } }







 */




_.extend(EditResidenceHandler.prototype,RequestHandlerBase.prototype);




EditResidenceHandler.prototype.attach = function(route){
    var self = this;

    route.post('/',authenticator,OrganizationMiddleware,dogLicenseMiddleware,function(request,response){

       		var dogLicense = request.dogLicense
       		var residenceId = dogLicense.residence
       		request.body.organization = request.organization
       		request.body.dogLicense = dogLicense;

       		if (residenceId) {
       				//已存就更新,目前不能支持更新
       				self.successResponse(response,Const.resCodeResidenceCanNotUpdate);	

       		}else{       			       		
       			//不存在residenceId 就是没有户籍必须创建，并且更新dogcard信息
       			 DogLicenseLogic.createResidence(request.body,function(result){
                     self.successResponse(response,Const.responsecodeSucceed,{
                         dogLicense: result
                    });

                },function(err,code){
                        if (err) {
                            self.errorResponse(response,Const.httpCodeServerError);
                        }else{
                            self.successResponse(response,code);    
                        }

                    });


       		}



    })

}



new EditResidenceHandler().attach(router);
module["exports"] = router;