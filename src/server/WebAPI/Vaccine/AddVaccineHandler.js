var express = require("express");
var router = express.Router();
var RequestHandlerBase = require('../RequestHandlerBase');
const Utils = require("../../lib/Utils");
var _ = require('lodash');
var Const = require("../../lib/consts");
var authenticator = require("../middleware/auth");

var DogLicenseLogic = require("../../Logics/DogLicenseLogic");
var DogLicenseMiddleware = require("../middleware/dogLicenseMiddleware");






var AddVaccineHandler = function(){


}
/**
 * @apiDefine Vaccine
 * @apiParam (vaccine) {String} name 疫苗名称
 * @apiParam (vaccine) {String} batchNo 批号
 * @apiParam (vaccine) {String} manufacturer 厂商
 * @apiParam (vaccine) {String} veterinarianName 打疫苗的兽医
 * @apiParam (vaccine) {String} organizationName 免疫点名称
 */

/**
 * @api {post} /vaccine/add 免疫年检
 * @apiName addVaccine
 * @apiGroup Annual
 * @apiDescription 免疫年检api接口
 * @apiHeader  {Sting} access-token token
 * @apiParam {String} husbandryNo 畜牧业提供的条形码
 * @apiParam {String} dogLicenseId 狗证ID
 * @apiUse Vaccine
 * @apiParamExample {json} Request Example
 {
                husbandryNo:global.getRandomStr(),
                dogLicenseId:"5a334661aaa8832f4476ff6b",
                vaccine:{
                    name:"av",
                    batchNo:"1234",
                    manufacturer:"manufacturer",
                    veterinarianName:"veterinarianName",
                    organizationName:"organizationName",
                }

 };
 * @apiSuccessExample Success-Response:
 *  [ { _id: '5a334661aaa8832f4476ff6b',
    owner:
     { _id: '5a334661aaa8832f4476ff6f',
       name: 'test_tsY8Q',
       sex: '1',
       phone: '15901794453',
       tel: '345033',
       certificateType: '1',
       certificateCode: '31010222222222',
       __v: 12,
       dogs: [Array],
       location: [Object] },
    dog:
     { _id: '5a334661aaa8832f4476ff6e',
       nickname: 'test_FJnXS',
       sex: '2',
       breed: 'breed',
       usage: '警卫',
       hairColor: '白色',
       bornDate: '2016-08-10T00:00:00.000Z',
       photoUrl: '123',
       irisID: 'c123456789',
       __v: 22,
       vaccine: [Array],
       photos: [] },
    husbandryNo: 'SIBfz',
    __v: 1,
    residence:
     { _id: '5a334926e2ec023460e09f39',
       houseProperty: 'ziyou',
       houseNo: 'zWhZv',
       address: 'K1T5M',
       isSterilization: 0,
       created: '2017-12-15T04:01:42.291Z',
       __v: 0 },
    DogCard:
     { create: '2017-12-15T04:01:42.313Z',
       message: '成功办理狗证',
       isCreate: 1,
       info: [Object],
       annual: [Object] },
    vaccineCard:
     { isCreate: 1,
       create: '2017-12-15T03:49:53.758Z',
       annual: [Object],
       info: [Object] } } ]




 */



_.extend(AddVaccineHandler.prototype,RequestHandlerBase.prototype);


AddVaccineHandler.prototype.attach = function(route){
    var self = this;

    route.post('/',authenticator,DogLicenseMiddleware,function(request,response){


        request.body.dogLicense  = request.dogLicense;

        DogLicenseLogic.editVaccine(request.body,function(result){
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


new AddVaccineHandler().attach(router);
module["exports"] = router;