var Backbone = require('backbone');
var Utils = require('./lib/utils');
var Config = require('./lib/init');



var Routing = function(){


		 var AppRouter = Backbone.Router.extend({
            routes: {
                "start": "startRoute",
                "main": "mainRoute",
                "signin":"signinRoute",
                "test":"testRoute",
                "reset":"resetRoute",
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
            var view = new StartView();
                    
        });

     //      appRouter.on('route:signinRoute', function(actions) {            
     //        var SignInView = require('./Views/Start/SignIn/SignInView.js');   
     //        var view = new SignInView();                    
     //    });



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
