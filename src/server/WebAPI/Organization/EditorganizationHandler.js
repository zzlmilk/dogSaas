var express = require("express");
var router = express.Router();
var RequestHandlerBase = require('../RequestHandlerBase');
const Utils = require("../../lib/Utils");
var _ = require('lodash');
var Const = require("../../lib/consts");






var EditOrganizationHandler = function(){
       	

}

_.extend(EditOrganizationHandler.prototype,RequestHandlerBase.prototype);


EditOrganizationHandler.prototype.attach = function(route){
	 var self = this;

	 route.post('/',function(request,response){

			
	 	
	 })
}


new EditOrganizationHandler().attach(router);
module["exports"] = router;