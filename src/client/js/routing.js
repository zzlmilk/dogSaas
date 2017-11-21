var Backbone = require('backbone');
var Utils = require('./lib/utils');
var Config = require('./lib/init');



var Routing = function(){

		 var AppRouter = Backbone.Router.extend({
            routes: {
                "start": "startRoute",
                "main": "mainRoute",
                "signin":"signinRoute",
                "nav":"navRoute",
                "veriftemail":"veriftemailRoute",          
                "test":"testRoute",
                "reset":"resetRoute",              
                "signup":"signupRoute",//登陆路由
                "androidDownload":"androidDownloadRoute",
                "*actions": "defaultRoute"
            }
        });
        
		// Initiate the router
        var appRouter = new AppRouter;

        appRouter.on('route:defaultRoute', function(actions) {
            Utils.goPage('start');            
        });

        appRouter.on('route:testRoute', function(actions) {

            var TestView = require('./Views/Test/TestView.js');   
            var view = new TestView();
                    
        });

        
        appRouter.on('route:startRoute', function(actions) {
        
            var StartView = require('./Views/Start/StartView.js');              
            var view = new StartView({action:actions});

                                
        });
        //注册
        appRouter.on('route:signupRoute', function(actions) {
            
            var SignUpView = require('./Views/SignUp/SignUpView.js');   
            var view = new SignUpView();
                        
        });
        //nav导航
        appRouter.on('route:navRoute', function(actions) {

            var NavView = require('./Views/Nav/NavView.js');
            var view = new NavView();

        });
        //验证邮箱
        appRouter.on('route:veriftemailRoute', function(actions) {            
            var VeriftEmailView = require('./Views/VeriftEmail/VeriftEmailView.js');   
            var view = new VeriftEmailView({actions:actions});

        });

        appRouter.on('route:mainRoute', function(actions) {

        	 // if(LoginUserManager.getUser() == null){
          //       Utils.goPage('start');
          //       return;
          //   }

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
