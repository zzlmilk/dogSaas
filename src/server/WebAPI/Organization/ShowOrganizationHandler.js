var express = require("express");
var router = express.Router();
var RequestHandlerBase = require('../RequestHandlerBase');
const Utils = require("../../lib/Utils");
var _ = require('lodash');
var Const = require("../../lib/consts");

//var RegisterLogic = require("../../Logics/RegisterLogic");




var ShowOrganizationHandler = function(){
       	

}

_.extend(ShowOrganizationHandler.prototype,RequestHandlerBase.prototype);


ShowOrganizationHandler.prototype.attach = function(route){
	 var self = this;

	 route.get('/',function(request,response){

			

	 })
}


new ShowOrganizationHandler().attach(router);
module["exports"] = router;