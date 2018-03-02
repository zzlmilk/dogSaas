var bodyParser = require("body-parser");
var _ = require('lodash');

var Const = require("../../lib/consts");
var UserModel = require('../../Models/User');

function AuthMiddleware (request, response, next) {
        
    var token = request.headers['access-token'];


    console.log("ssssssss");
    if(_.isEmpty(token)){
        response.status(Const.httpCodeForbidden);
        response.send("");

    } else {
        
        var userModel = UserModel.get();
        
        userModel.findOne({ 
    	    "token": token
        },function (err, user) {
            
            if(!_.isNull(user)){
                
                request.user = user;
                
                next()
                
                return;
                
            } else {
                
                response.status(Const.httpCodeForbidden);
                response.send("");
                
            }
        
        });

           
    }
   
}

module["exports"] = AuthMiddleware;

