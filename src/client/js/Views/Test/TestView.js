var Backbone = require('backbone');
var _ = require('lodash');

var Utils = require('../../lib/utils');
var Const = require('../../lib/consts');
var Config = require('../../lib/init');

// load template
var template = require('./Test.hbs');


var SignInClient = require('../../lib/APIClients/SignInClient');

var loginUserManager = require('../../lib/loginUserManager')


var userModel = require('../../Models/user')



var TestView = Backbone.View.extend({

   
    tagName: "li",
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


        var  username = "413124766@qq.com"
        var password ="rex123";



        SignInClient.send({                    
                    email:username,
                    password:password
                                        
                },function(data){
                    
                    
                    // loginUserManager.setUser(data.user);
                    // loginUserManager.setToken(data.token);
                        
                    var user = userModel.modelByResult(data.user)
                    console.log("====",user)
                    
             
                    //Utils.goPage("main");
                    
                            
                },function(errorCode){
                    console.log(errorCode)
                    alert(errorCode)
                   
                   
                })

    
            

	}

})

module.exports = TestView;
