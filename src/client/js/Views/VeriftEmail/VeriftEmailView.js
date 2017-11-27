var Backbone = require('backbone');
var _ = require('lodash');

var Utils = require('../../lib/utils');
var Const = require('../../lib/consts');
var Config = require('../../lib/init');

// load template
var template = require('./VeriftEmail.hbs');

var VaildCodeClient = require('../../lib/APIClients/VaildCodeClient');
var RegisterClinet = require('../../lib/APIClients/RegisterClinet');
var UserModel = require('../../Models/user')
var loginUserManager = require('../../lib/loginUserManager')


var VeriftEmailView = Backbone.View.extend({

    params:{},
    initialize: function(options) {
    	var self = this;

    	if (options.actions == null) {
    		return;
    	}else{
    		self.params = Utils.getActionsParams(options.actions)
    	}
 
    	self.vaildCode(function(data){
    		
    			self.render();
    	})

    	
   	
    },

    render: function() {

       
       $(Config.defaultContaier).html(template({
        	   		

        }));

    	this.onLoad();

    	

        return this;

    },

    onLoad: function(){

        var self = this;

       $("#veriftEmailBtn").unbind().on('click',function(e){
 			 	var password = $("input[name =password]").val();
 			 	var repassword =  $("input[name =repassword]").val();

 			 	if (password == "" || password !=repassword ||password.length <6 ) {
 			 		 alert("密码格式错误")
 			 	}else{
 			 			self.submitPassword(password);
 			 	}	


		});
  		

     
	},
	vaildCode:function(callback){

		var self = this;
		  VaildCodeClient.send({                    
            code:self.params.key,                                        
        },function(data){           	          	                                                    
        	self.params.email = data.email;
        	self.params.useType =data.useType;
            callback()

                    
        },function(errorCode){

            if(Const.ErrorCodes[errorCode])
              var  message = Const.ErrorCodes[errorCode];

         	 alert(message)

                                     
         })

	},
	submitPassword:function(password){
		var self = this;

		RegisterClinet.send({                    
                    email:self.params.email,
                    password:password,
                    code:self.params.key,
                                        
                },function(data){
                     					
                     
                    loginUserManager.setToken(data.token);
                    var  user =  UserModel.modelByResult(data.user);
                    
                    var logionProcess = user.get("logionProcess");
                    if (logionProcess == 0) {
                    	  Utils.goPage("organization?action=add");
                    }else{
                    	
                    		
                    }
                                                                                         
                    //Utils.goPage("main");
                    
                            
                },function(errorCode){
                    alert(errorCode)

                                      
                })

	}



	 

})

module.exports = VeriftEmailView;



