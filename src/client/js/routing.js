var Backbone = require('backbone');
var Utils = require('./lib/utils');
var Config = require('./lib/init');

var LoginUserManager = require('./lib/loginUserManager');


var Routing = function(){

		 var AppRouter = Backbone.Router.extend({
            routes: {
                "start": "startRoute",
                "main": "mainRoute",
                "signin":"signinRoute",  
                "veriftemail":"veriftemailRoute",          
                "test":"testRoute",
                "reset":"resetRoute",              
                "signup":"signupRoute",//登陆路由
                "button":"buttonRoute",
                "androidDownload":"androidDownloadRoute",
                "organization":"organizationRoute",
                "*actions": "defaultRoute"

            }

        });
        
		// Initiate the router
        var appRouter = new AppRouter;

        //初识页
        appRouter.on('route:defaultRoute', function(actions) {

            Utils.goPage('start');            
        });

        //测试
        appRouter.on('route:testRoute', function(actions) {
            

            var TestView = require('./Views/Test/TestView.js');   
            var view = new TestView();
                    
        });

        //按钮
        appRouter.on('route:buttonRoute', function(actions) {

            var ButtonView = require('./Views/Button/ButtonView.js');
            var view = new ButtonView();

        });

        //开始
        appRouter.on('route:startRoute', function(actions) {
        
            var StartView = require('./Views/Start/StartView.js');              
            var view = new StartView({action:actions});

                                
        });
        
        //注册
        appRouter.on('route:signupRoute', function(actions) {
            
            var SignUpView = require('./Views/SignUp/SignUpView.js');   
            var view = new SignUpView();
                        
        });

        
        //验证邮箱
        appRouter.on('route:veriftemailRoute', function(actions) {            
            var VeriftEmailView = require('./Views/VeriftEmail/VeriftEmailView.js');   
            var view = new VeriftEmailView({actions:actions});

        });


        //机构
         appRouter.on('route:organizationRoute', function(actions) {  
             var action = Utils.getActionsParams(actions).action

            
             if (action == "add") {
                       var AddOrganizationView = require('./Views/SignUp/Organization/AddOrganizationView.js');   
                       var view = new AddOrganizationView({
                            action:action
                       });
             }

             else if(action =="checkStatus"){
                       var AddOrganizationView = require('./Views/SignUp/Organization/AddOrganizationView.js');   
                       var view = new AddOrganizationView({
                            actions:actions
                       });
             }

             else{
                Utils.goPage('start')
             }
          

        });




        appRouter.on('route:mainRoute', function(actions) {

        	if(LoginUserManager.getToken() == null){               
                Utils.goPage('start');
                return;
            }


            var MainView = require('./Views/Main/MainView.js');   
            var view = new MainView({
                'el': Config.defaultContaier
            });
                 
        });

        appRouter.on('route:resetRoute', function(actions) {
             var ResetView = require('./Views/Start/Reset/ResetView.js');   
             var view = new ResetView();  
        });

}

// Exports ----------------------------------------------
    module["exports"] = new Routing();
