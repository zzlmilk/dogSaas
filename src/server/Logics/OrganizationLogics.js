const Utils = require("../lib/Utils");
var validator = require('validator');
var Const = require("../lib/consts");
var async = require('async');
var _ = require('lodash');



var OrganizationLogics ={

		add:function(param,onSuccess,onError){
				var self= this;
				self.validatorParam(param,function(){
						console.log("aa")
				})
		},		

		validatorParam:function(param,callback){

				callback()
		},


}


module["exports"] = OrganizationLogics;