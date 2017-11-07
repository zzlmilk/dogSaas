var Backbone = require('backbone');
var Utils = require('./lib/utils');



var Routing = function(){


		 var AppRouter = Backbone.Router.extend({
            routes: {
                "start": "startRoute",
                "main": "mainRoute",
                "signin":"signinRoute",
                "test":"testRoute",
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
            var view = new MainView();
            //Utils.goPage('start');            
        });
        

     // appRouter.on('route:androidDownloadRoute', function(actions) {
     //         var AndroidDownloadView = require('./Views/AndroidDownload/AndroidDownloadView.js');   
     //         var view = new AndroidDownloadView();  
     //        //Utils.goPage('start');            
     //    });


}

// Exports ----------------------------------------------
    module["exports"] = new Routing();
