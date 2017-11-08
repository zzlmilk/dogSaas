var Backbone = require('backbone');

var _ = require('lodash');
//var sha1 = require('sha1');

var Utils = require('../../../lib/utils');
var Const = require('../../../lib/consts');
var Config = require('../../../lib/init');



var BaseView = require('../BaseView');

//var SignInClient = require('../../../lib/APIClients/SignInClient');

var template = require('./SignIn.hbs');

var SignInView = BaseView.extend({

    initialize: function(options) {
        
        this.container = options.container;
        this.render();
    },


    render: function() {
        
        $(this.container).html(template);

        this.onLoad();

        return this;

    },

    onLoad: function(){

        var self = this;


        $('#form-signin input').unbind().on('keyup',function(e){

            if (e.keyCode == 13) {
                
                $('#form-signin #btn-signin').click();
                
            }

        });
        
		$('#form-signin #btn-signin').unbind().on('click',function(){

         		var username = $('#form-signin input[name="username"]').val();
         		var password = $('#form-signin input[name="password"]').val();
				
				if (username!="rex" ||password !="123") {
		 			$('#form-signin .username').addClass('has-error');
					$('#form-signin .username .help-block').text("用户名或密码无效");
				}
				else{

					Utils.goPage("main");
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
			err.name = Utils.l10n("Please input user name.");
		
		if(_.isEmpty(password))
			err.password = Utils.l10n("Please input password.");
		
		callBack(err);
		
    }

});

module.exports = SignInView;
