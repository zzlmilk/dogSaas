var express = require("express");
var router = express.Router();
var RequestHandlerBase = require('../RequestHandlerBase');
const Utils = require("../../lib/Utils");
var _ = require('lodash');
var Const = require("../../lib/consts");






var EditOrganizationHandler = function(){
       	

}
/**
 * @api {post} /organization/edit 编辑机构信息
 * @apiName editOrganization
 * @apiGroup Organization
 * @apiDescription 编辑机构信息api接口
 * @apiHeader  {Sting} access-key token
 * @apiParam {String} name 机构名字
 * @apiParam {String} province 省
 * @apiParam {String} district 区
 * @apiParam {String} city 城市
 * @apiParam {String} address 地址
 * @apiParam {String} code 邮编
 * @apiParam {String} tel 座机
 * @apiParam {String} businessLicense 营业执照图片url地址
 * @apiParam {String} animalMedicalLicense 动物诊疗许可证图片url地址
 * @apiParam  serviceScope 服务范围
 * @apiParam {String} contacts_name 联系人姓名
 * @apiParam {String} contacts_phone 联系人电话
 * @apiSuccessExample Success-Response:
 { organization:
   { __v: 0,
     name: 'test_Esv3Q',
     tel: '15838365455',
     businessLicense: '123',
     animalMedicalLicense: '123',
     adminUser: '5a0bec3f3bea6821641c8c18',
     created: '2017-11-28T07:45:57.005Z',
     _id: '5a1d1435185d925c9c3c14c8',
     veterinarians: [],
     checkStatus: { status: 0, time: '2017-11-28T07:45:57.004Z' },
     contacts: { name: 'admin', phone: '15838365455' },
     serviceScope: [],
     location:
      { province: '上海',
        district: '浦东新区',
        city: '航头镇',
        address: '杭南公路',
        code: '123456' } } }



 */

_.extend(EditOrganizationHandler.prototype,RequestHandlerBase.prototype);


EditOrganizationHandler.prototype.attach = function(route){
	 var self = this;

	 route.post('/',function(request,response){

			
	 	
	 })
}


new EditOrganizationHandler().attach(router);
module["exports"] = router;