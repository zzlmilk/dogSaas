var Backbone = require('backbone');
var _ = require('lodash');

var Utils = require('../../lib/utils');
var Const = require('../../lib/consts');
var Config = require('../../lib/init');

// load template
var template = require('./VeriftEmail.hbs');
var VaildCodeClient = require('../../lib/APIClients/VaildCodeClient');

var VeriftEmailView = Backbone.View.extend({

    params:{},
    initialize: function(options) {
    	var self = this;
    	self.params = Utils.getActionsParams(options.actions)

    	






    
        this.render();
    },

    render: function() {

        $(Config.defaultContaier).html(template({
        	   
        }));




    	this.onLoad();

    	

        return this;

    },

    onLoad: function(){

        var self = this;


        VaildCodeClient.send({                    
            code:self.params.key,
            usetype:self.params.usetype,
            email:self.params.email
                                
        },function(data){
           	            
            // loginUserManager.setUser(data.user);
            // loginUserManager.setToken(data.token);
                
           
            console.log("====",data)

            
     
            //Utils.goPage("main");
            
                    
        },function(errorCode){
            console.log(errorCode)

             Utils.goPage("main");
            
           
           
         })
     
	},


	 

})

module.exports = VeriftEmailView;



