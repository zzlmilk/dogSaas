var Backbone = require('backbone');
var Utils = require('./lib/utils');
var Config = require('./lib/init');

var LoginUserManager = require('./lib/loginUserManager');


var Routing = function(){

		 var AppRouter = Backbone.Router.extend({
            routes: {
                "start": "startRoute",
                "main": "mainRoute",
                "signin":"signinRoute", //注册路由
                "veriftemail":"veriftemailRoute",          
                "test":"testRoute",
                "reset":"resetRoute",              
                "signup":"signupRoute",//登陆路由
                "nav":"navRoute",//首页导航路由
                "setpassword":"setpasswordRoute",//设置密码
                "resetpassword":"resetpasswordRoute",//重置密码
                "changepassword":"changepasswordRoute",//修改密码
                "organization":"organizationRoute",//添加机构
                "button":"buttonRoute",
                "androidDownload":"androidDownloadRoute",
                "*actions": "defaultRoute"

            }

        });
        
		// Initiate the router
        var appRouter = new AppRouter;

        //初识页
        appRouter.on('route:defaultRoute', function(actions) {

            Utils.goPage('changepassword');
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

        appRouter.on('route:navRoute', function(actions) {

            var NavView = require('./Views/Nav/NavView.js');
            var view = new NavView();

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

        //重置密码
        appRouter.on('route:resetpasswordRoute', function(actions) {
            var ResetPasswordView = require('./Views/Start/ResetPassword/ResetPasswordView.js');
            var view = new  ResetPasswordView({actions:actions});

        });
       //设置密码
        appRouter.on('route:setpasswordRoute', function(actions) {
            var SetPasswordView = require('./Views/SignUp/SetPassword/SetPasswordView.js');
            var view = new  SetPasswordView({actions:actions});

        });

        //个人中心修改密码

        appRouter.on('route:changepasswordRoute', function() {
            var ChangePasswordView = require('./Views/Main/PersonalCenter/ChangePassword/ChangePasswordView.js');
            var view = new  ChangePasswordView();

        });

        //机构
         appRouter.on('route:organizationRoute', function(actions) {
             //var AddOrganizationView = require('./Views/SignUp/Organization/AddOrganizationView.js');
             //var view = new AddOrganizationView();

             var action = Utils.getActionsParams(actions).action
             if (action == "add") {
                      var AddOrganizationView = require('./Views/SignUp/Organization/AddOrganizationView.js');
                       var view = new AddOrganizationView();
             }

             else{
                Utils.goPage('start')
             }
          

        });

        //控制台页面
        appRouter.on('route:mainRoute', function(actions) {

            //if(LoginUserManager.getToken() == null){
            //    Utils.goPage('start');
            //    return;
            //}

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
