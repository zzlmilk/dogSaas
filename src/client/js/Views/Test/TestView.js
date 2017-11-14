var Backbone = require('backbone');
var _ = require('lodash');

var Utils = require('../../lib/utils');
var Const = require('../../lib/consts');
var Config = require('../../lib/init');

// load template
var template = require('./Test.hbs');


var SignInClient = require('../../lib/APIClients/SignInClient');

var loginUserManager = require('../../lib/loginUserManager')



var TestView = Backbone.View.extend({

   

    initialize: function(options) {
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
        var  username = "rex@qq.com"
        var password ="123";



        SignInClient.send({                    
                    email:username,
                    password:password
                                        
                },function(data){
                    
                    
                    // loginUserManager.setUser(data.user);
                    // loginUserManager.setToken(data.token);
                    alert(data)
             
                    //Utils.goPage("main");
                    

                    
                    
                             
                    
                },function(errorCode){
                    console.log(errorCode)
                    alert(errorCode)
                   
                   
                })

    
            

	}

})

module.exports = TestView;
