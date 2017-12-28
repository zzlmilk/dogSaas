var express = require("express");
var router = express.Router();
var RequestHandlerBase = require('../RequestHandlerBase');
const Utils = require("../../lib/Utils");
var _ = require('lodash');
var Const = require("../../lib/consts");


var authenticator = require("../middleware/auth");
var OrganizationLogics = require("../../Logics/OrganizationLogics");

var AddOrganizationHandler = function(){
       	

}
/**
 * @apiDefine Veterinarians 兽医名字
 * @apiParam (veterinarians[{name,code}]) {String}  name  兽医名字
 * @apiParam (veterinarians[{name,code}]) {String} code 兽医执照号
 */
/**
 * @api {post} /organization/add 添加机构
 * @apiName addOrganization
 * @apiGroup Organization
 * @apiDescription 添加机构信息api接口
 * @apiHeader  {Sting} access-token token
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
 * @apiUse Veterinarians
 * @apiParamExample {json} Request Example
{
		 name: "test_" + global.getRandomStr(),
		 province: "上海",
		 district: "浦东新区",
		 city: "航头镇",
		 address: "杭南公路",
		 code: "123456",
		 tel: "15838365455",
		 businessLicense: "123",
		 animalMedicalLicense: "123",
		 serviceScope: "美容",
		 contacts_name: "admin",
		 contacts_phone: "15838365455",
		 veterinarians:[
		 {
		 name: "张三",
		 code: "110"
		 },
		 {
		 name: "张三2",
		 code: "111"
		},

    ]
}
 * @apiSuccessExample Success-Response:
 { organization:
   { __v: 0,
     name: 'test_Z6OMZ',
     tel: '15838365455',
     businessLicense: '123',
     animalMedicalLicense: '123',
     adminUser: '5a0bec3f3bea6821641c8c18',
     created: '2017-12-06T10:36:37.436Z',
     _id: '5a27c8353a919b7d484cfed4',
     veterinarians: [ '5a27c8353a919b7d484cfed2', '5a27c8353a919b7d484cfed3' ],
     checkStatus: { status: 0, time: '2017-12-06T10:36:37.435Z' },
     contacts: { name: 'admin', phone: '15838365455' },
     serviceScope: [ '美容' ],
     location:
      { province: '上海',
        district: '浦东新区',
        city: '航头镇',
        address: '杭南公路',
        code: '123456' } } }






 */

_.extend(AddOrganizationHandler.prototype,RequestHandlerBase.prototype);


AddOrganizationHandler.prototype.attach = function(route){
	 var self = this;

	 route.post('/',authenticator,function(request,response){

	 		OrganizationLogics.add(request,function(result){				
					 self.successResponse(response,Const.responsecodeSucceed,{
		               	 organization:	result.organization                
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


new AddOrganizationHandler().attach(router);
module["exports"] = router;