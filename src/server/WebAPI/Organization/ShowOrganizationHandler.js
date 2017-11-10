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