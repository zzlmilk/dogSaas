var bodyParser = require("body-parser");
var _ = require('lodash');

var Const = require("../../lib/consts");
var UserModel = require('../../Models/User');
var DogLicenseModel = require('../../Models/DogLicense');

function dogLicenseMiddleware (request, response, next) {
        
   var dogLicenseId  = request.body.dogLicenseId;

    if(_.isEmpty(dogLicenseId)){
        console.log("dogLicenseMiddleware error no dogLicenseId" );
          response.status(Const.httpCodeNodogLicenseId);
           response.send("");
          return 

    } else {
        
        var dogLicenseModel = DogLicenseModel.get();
        
        dogLicenseModel.findOne({ 
    	    "_id": dogLicenseId
        },function (err, dogLicense) {
            
            if(!_.isNull(dogLicense)){
                
                request.dogLicense = dogLicense;
                
                next()
                
                return;
                
            } else {         
                 response.status(Const.httpCodeForbidden);
                 response.send("");
                
            }
        
        });

           
    }
   
}

module["exports"] = dogLicenseMiddleware;

