var Backbone = require('backbone');

var _ = require('lodash');
//var sha1 = require('sha1');

var Utils = require('../../../lib/utils');
var Const = require('../../../lib/consts');
var Config = require('../../../lib/init');



var BaseView = require('../BaseView');

var SignInClient = require('../../../lib/APIClients/SignInClient');

var loginUserManager = require('../../../lib/loginUserManager')

var UserModel = require('../../../Models/user');

var template = require('./SignIn.hbs');

var SignInView = BaseView.extend({

	el:null,


    initialize: function(options) {
        
    	


        this.container = options.container;
        this.render();
    },

    home:function(){
    		alert("ok")
    },


    render: function() {
        
        $(this.container).html(template);

        this.onLoad();

        return this;

    },

    onLoad: function(){

        var self = this;




        $('#form-signin input').bind().on('keyup',function(e){

            if (e.keyCode == 13) {
                
                $('#form-signin #btn-signin').click();
                
            }

        });
        
		$('#login_form #loginBtn').unbind().on('click',function(){
					
         		var username = $('input[name="username"]').val();
         		var password = $('input[name="password"]').val();

         		
				
				if (username =="" ||password =="") {
		 			// $(".help-block").show();
		 			// $(".help-block").text("密码为空");


				}
				else{

				SignInClient.send({                    
                    email:username,
                    password:password
                                        
                },function(data){

                	loginUserManager.setToken(data.token);  
				     //存入本地缓存 
				     var user = UserModel.modelByResult(data.user) 		
				     loginUserManager.setLoginUserID(user.get("id"))
				   	 user.save();




				    Utils.goPage("organization"); 

				    
                    
                    
                    $('#form-signin #btn-signin').removeAttr('disabled');				
                    
                },function(errorCode){
                	 console.log(errorCode)                	 
                	 if(Const.ErrorCodes[errorCode])
                	 var message = Const.ErrorCodes[errorCode]

                    alert(message)


                    $('#form-signin #btn-signin').removeAttr('disabled');	
                })

					//Utils.goPage("main");
				}


		});

		
    },

	resetValidationAlert : function(){
		
		$('#form-signin .username').removeClass('has-error');
		$('#form-signin .username .help-block').text('');

		$('#form-signin .password').removeClass('has-error');
		$('#form-signin .password .help-block').text('');

	},
	
    validate: function(callBack){

		var name = $('#form-signin input[name="username"]').val();
		var password = $('#form-signin input[name="password"]').val();
		
		var err = {
		    general : '',
			name : ''
		}
		
		if(_.isEmpty(name))
			err.name = "Please input user name.";
		
		if(_.isEmpty(password))
			err.password = "Please input password.";
		
		callBack(err);
		
    }

});

module.exports = SignInView;
