var express = require("express");
var router = express.Router();
var RequestHandlerBase = require('../RequestHandlerBase');
const Utils = require("../../lib/Utils");
var _ = require('lodash');
var Const = require("../../lib/consts");
var authenticator = require("../middleware/auth");
var OrganizationMiddleware = require("../middleware/organizationMiddleware");


var DogLicenseLogic = require("../../Logics/DogLicenseLogic");

var AddDogLicenseHandler = function(){
       	

}
/**
 * @apiDefine Dog
 * @apiParam (dog) {String} nickname 宠物昵称
 * @apiParam (dog) {String} sex 性别
 * @apiParam (dog) {String} breed 品种
 * @apiParam (dog) {String} usage 用途
 * @apiParam (dog) {String} hairColor 毛色
 * @apiParam (dog) {Date} bornDate 出生日期
 * @apiParam (dog) {Number} irisID 虹膜id
 * @apiParam (dog) photoUrl 宠物照片
 *
 */
/**
 * @apiDefine Vaccine
 * @apiParam (dog_vaccine) {String} name 疫苗名称
 * @apiParam (dog_vaccine) {String} batchNo 批号
 * @apiParam (dog_vaccine) {String} manufacturer 厂商
 * @apiParam (dog_vaccine) {String} veterinarianName 打疫苗的兽医
 * @apiParam (dog_vaccine) {String} organizationName 免疫点名称
 */
/**
 * @apiDefine Owner
 * @apiParam (owner) {String} name 主人名字
 * @apiParam (owner) {String} sex 性别   1男 2女
 * @apiParam (owner) {String} tel 座机
 * @apiParam (owner) {String} phone 手机号码
 * @apiParam (owner) {String} certificateType 证件类型  1身份证 2护照
 * @apiParam (owner) {String} certificateCode 证件号
 * @apiParam (owner) {String} province 省
 * @apiParam (owner) {String} district 区
 * @apiParam (owner) {String} city 城市
 * @apiParam (owner) {String} address 地址
 * @apiParam (owner) {String} code 邮编
 */
/**
 * @apiDefine Residence
 * @apiParam (residence) {String} houseNo (沪)房地（长）字（2006）第(000386)号
 * @apiParam (residence) {String} houseProperty 自由和租凭
 * @apiParam (residence) {String} address xxx路xxx弄xxx号 ，用户判断唯一性
 * @apiParam (residence) {Number} isSterilization  是否绝育  0:未绝育 1:绝育
 */
/**
 * @api {post} /dogLicense/add 办理狗证
 * @apiName addDogLicense
 * @apiGroup DogLicense
 * @apiDescription 办理狗证信息api接口,获取狗，疫苗，用户，房产信息
 * @apiHeader  {Sting} access-key token
 * @apiParam {String} husbandryNo 畜牧业提供的条形码
 * @apiUse Dog
 * @apiUse Vaccine
 * @apiUse Owner
 * @apiUse Residence
 * @apiParamExample {json} Request Example

{  husbandryNo:global.getRandomStr(),
        dog:{
            nickname: "test_" + global.getRandomStr(),
            sex:"1",
            breed:"breed",
            usage:"警卫",
            hairColor:"白色",
            bornDate:"2016-08-10",
            irisID:"a12345678",
            photoUrl:"123",
            vaccine:{
                name:"av",
                batchNo:"123",
                manufacturer:"manufacturer",
                veterinarianName:"veterinarianName",
                organizationName:"organizationName",
            }

        },
        owner:{
            name: "test_" + global.getRandomStr(),
            sex:"1",
            tel:"345033",
            phone:"15901794453",
            certificateType:"1",
            certificateCode:"31010211111111",
            province:"province",
            district:"district",
            city:"city",
            address:"address",
            code:"code",

        },
        residence:{
            houseNo:"1234",
            houseProperty:"ziyou",
            address:"1234",
            isSterilization:"0"
        }
 }
 * @apiSuccessExample Success-Response:
  { dogLicense:
   { __v: 0,
     owner: '5a1f603923027209fcffa110',
     dog: '5a1f6217fd9fd21fb4f2d8aa',
     residence: '5a1f6217fd9fd21fb4f2d8a8',
     husbandryNo: 'jzOM0',
     _id: '5a1f6217fd9fd21fb4f2d8a7',
     DogCard: { isCreate: 1, message: '可以办理狗证' },
     vaccineCard: { isCreate: 1, create: '2017-11-30T01:42:47.637Z' } } }

 *
 */

_.extend(AddDogLicenseHandler.prototype,RequestHandlerBase.prototype);


AddDogLicenseHandler.prototype.attach = function(route){
	 var self = this;

	 route.post('/',authenticator,OrganizationMiddleware,function(request,response){
            request.body.user = request.user
            request.body.organization = request.organization
            DogLicenseLogic.add(request.body,function(result){
                     self.successResponse(response,Const.responsecodeSucceed,{
                         dogLicense:   result
                    });

                },function(err,code){
                        if (err) {
                            self.errorResponse(response,Const.httpCodeServerError);
                        }else{
                            self.successResponse(response,code);    
                        }

                    });
            
	 })
}



new AddDogLicenseHandler().attach(router);
module["exports"] = router;