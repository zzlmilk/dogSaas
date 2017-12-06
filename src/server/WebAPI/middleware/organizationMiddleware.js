var bodyParser = require("body-parser");
var _ = require('lodash');

var Const = require("../../lib/consts");
var UserModel = require('../../Models/User');
var OrganizationModel = require('../../Models/Organization');

function OrganizationMiddleware (request, response, next) {
        
   var user  = request.user;

    if(_.isEmpty(user)){
        console.log("AuthMiddleware error no user" );
       return 

    } else {
        
        var organizationModel = OrganizationModel.get();
        
        organizationModel.findOne({ 
    	    "_id": user.organization
        },function (err, organization) {
            
            if(!_.isNull(organization)){
                
                request.organization = organization;
                
                next()
                
                return;
                
            } else {                
                console.log("AuthMiddleware error  organization is null" );
                
            }
        
        });

           
    }
   
}

module["exports"] = OrganizationMiddleware;

