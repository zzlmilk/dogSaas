var express = require("express");
var router = express.Router();
var RequestHandlerBase = require('../RequestHandlerBase');
const Utils = require("../../lib/Utils");
var _ = require('lodash');
var Const = require("../../lib/consts");
var authenticator = require("../middleware/auth");

var OrganizationLogics = require("../../Logics/OrganizationLogics");
var OrganizationMiddleware = require("../middleware/organizationMiddleware");

var VeterinarianModel = require('../../Models/Veterinarian');




var EditVeterinarianHandler = function(){


}
/**
 * @api {post} /Organization/editVeterinarian 添加兽医
 * @apiName editVeterinarian
 * @apiGroup Organization
 * @apiDescription 添加兽医api接口
 * @apiParam {String} name 兽医名字
 * @apiParam {String} code 兽医执照号
 * @apiHeader {String} token
 * @apiSuccessExample Success-Response:
 *{ organization:
   { _id: '5a2f96c2519dea21549ac69e',
     name: 'test_u9tAB',
     tel: '15838365455',
     businessLicense: '123',
     animalMedicalLicense: '123',
     adminUser: '5a0bec3f3bea6821641c8c18',
     created: '2017-12-12T08:43:46.586Z',
     __v: 4,
     veterinarians:
      [ '5a2f96c2519dea21549ac69c',
        '5a2f96c2519dea21549ac69d',
        '5a2f96deaa7920265c341b2b',
        '5a2f97e6fb50ff1a1409b6bc',
        '5a2f985be71a801ee0ac2cc2',
        '5a2f99d0e3b20c25741b6d27' ],
     checkStatus: { status: 0, time: '2017-12-12T08:43:46.585Z' },
     contacts: { name: 'admin', phone: '15838365455' },
     serviceScope: [ '美容' ],
     location:
      { province: '上海',
        district: '浦东新区',
        city: '航头镇',
        address: '杭南公路',
        code: '123456' } } }

 */

_.extend(EditVeterinarianHandler.prototype,RequestHandlerBase.prototype);


EditVeterinarianHandler.prototype.attach = function(route){
    var self = this;

    route.post('/',authenticator,OrganizationMiddleware,function(request,response){



        request.body.organization  = request.organization;

    OrganizationLogics.editVeterinarian(request.body,function(result){
            self.successResponse(response,Const.responsecodeSucceed,{
              organization:result
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


new EditVeterinarianHandler().attach(router);
module["exports"] = router;