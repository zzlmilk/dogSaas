var express = require("express");
var router = express.Router();
var RequestHandlerBase = require('../RequestHandlerBase');
const Utils = require("../../lib/Utils");
var _ = require('lodash');
var Const = require("../../lib/consts");
var authenticator = require("../middleware/auth");
var OrganizationLogics = require("../../Logics/OrganizationLogics");



var ShowOrganizationHandler = function () {
	


}
/**
 * @api {get} /organization/show 获取机构信息
 * @apiName showOrganization
 * @apiGroup Organization
 * @apiHeader token Access-Token
 * @apiSuccessExample Success_Response:
  { organization:
   { _id: '5a1d138dfac88f58a0a4330b',
     name: 'test_ke7Ht',
     tel: '15838365455',
     businessLicense: '123',
     animalMedicalLicense: '123',
     adminUser:
      { _id: '5a0bec3f3bea6821641c8c18',
        email: '413124766@qq.com',
        password: '0062003400520061004900667F6289DE275B2896C34A86CD3BD8852A',
        created: '2017-11-15T07:26:55.376Z',
        token: '9Q05UVlIwaXAf28B919Uc64k',
        isAccountEnabled: 1,
        logionProcess: 1,
        __v: 0,
        organization: '5a1d1435185d925c9c3c14c8' },
     created: '2017-11-28T07:43:09.274Z',
     __v: 0,
     veterinarians: [],
     checkStatus: { status: 0, time: '2017-11-28T07:43:09.273Z' },
     contacts: { name: 'admin', phone: '15838365455' },
     serviceScope: [],
     location:
      { province: '上海',
        district: '浦东新区',
        city: '航头镇',
        address: '杭南公路',
        code: '123456' } } }

 */
_.extend(ShowOrganizationHandler.prototype, RequestHandlerBase.prototype);


ShowOrganizationHandler.prototype.attach = function (route) {
	var self = this;

	route.get('/', authenticator, function (request, response) {
		OrganizationLogics.show(request, function (result) {
			self.successResponse(response, Const.responsecodeSucceed, {
				organization: result.organization
			});
		}, function (err,code) {
			if (err) {
				self.errorResponse(response, Const.httpCodeServerError);
			} else {
				self.successResponse(response, code);
			}
		});

	})
}


new ShowOrganizationHandler().attach(router);
module["exports"] = router;