var CONST = require('./consts');
var _ = require('lodash');
var U = require('./utils.js');

var UserModel = require('../Models/user');



var loginUserManager = {

	user : null,
    token : null,

    setUser : function(user){
        
        this.user = UserModel.modelByResult(user);

    },

     getUser : function(){
        
        return this.user;
        
    },

    setLoginUserID : function(id){
        
        localStorage.setItem("LoginUserID",id)
       
    },

    getLoginUserID : function(){
     
        var id =  localStorage.getItem("LoginUserID");
        return id;
    },
    

    setToken : function(token){
        
        localStorage.setItem("token",token)
        this.token = token;
    },

    getToken : function(){
     
        var token =  localStorage.getItem("token")

        return token;

        
    },
    


}

	module["exports"] = loginUserManager;