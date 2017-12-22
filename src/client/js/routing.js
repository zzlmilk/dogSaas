var Backbone = require('backbone');
var Utils = require('./lib/utils');
var Config = require('./lib/init');


var LoginUserManager = require('./lib/loginUserManager');


var User = require('./Models/user');
var Organization = require('./Models/organization');


var Routing = function(){

    var AppRouter = Backbone.Router.extend({
        routes: {
            "start": "startRoute",
            "main": "mainRoute",
            "signin": "signinRoute", //注册路由
            "veriftemail": "veriftemailRoute",
            "test": "testRoute",
            "file": "FileRoute",
            "reset": "resetRoute",
            "signup": "signupRoute",//登陆路由
            "nav": "navRoute",//首页导航路由
            "setpassword": "setpasswordRoute",//设置密码
            "resetpassword": "resetpasswordRoute",//重置密码
            "changepassword": "changepasswordRoute",//个人中心修改密码
            "organization": "organizationRoute",//添加机构
            "printcard": "printcardRoute",//控制台打印磁卡
            "button": "buttonRoute",
            "androidDownload": "androidDownloadRoute",
            "*actions": "defaultRoute"

        }

    });

    // Initiate the router
    var appRouter = new AppRouter;

    //初识页
    appRouter.on('route:defaultRoute', function (actions) {


        Utils.goPage('start');
    });

    //测试
    appRouter.on('route:testRoute', function (actions) {

        var TestView = require('./Views/Test/TestView.js');
        var view = new TestView();

    });

    //测试上传文件
    appRouter.on('route:FileRoute', function (actions) {

        var FileUploadDialogView = require('./Views/Test/FileUploadDialog.js');
        var view = new FileUploadDialogView();

    });


    //按钮
    appRouter.on('route:buttonRoute', function (actions) {

        var ButtonView = require('./Views/Button/ButtonView.js');
        var view = new ButtonView();

    });

    appRouter.on('route:navRoute', function (actions) {

        var NavView = require('./Views/Nav/NavView.js');
        var view = new NavView();

    });


    //开始
    appRouter.on('route:startRoute', function (actions) {

        var StartView = require('./Views/Start/StartView.js');
        var view = new StartView({action: actions});


    });

    //注册
    appRouter.on('route:signupRoute', function (actions) {

        var SignUpView = require('./Views/SignUp/SignUpView.js');
        var view = new SignUpView();

    });


    //验证邮箱
    appRouter.on('route:veriftemailRoute', function (actions) {
        var VeriftEmailView = require('./Views/VeriftEmail/VeriftEmailView.js');
        var view = new VeriftEmailView({actions: actions});

    });


    //重置密码
    appRouter.on('route:resetpasswordRoute', function (actions) {
        var ResetPasswordView = require('./Views/Start/ResetPassword/ResetPasswordView.js');
        var view = new ResetPasswordView({actions: actions});

    });
    //设置密码
    appRouter.on('route:setpasswordRoute', function (actions) {
        var SetPasswordView = require('./Views/SignUp/SetPassword/SetPasswordView.js');
        var view = new SetPasswordView({actions: actions});

    });

    //个人中心修改密码

    appRouter.on('route:changepasswordRoute', function () {
        var ChangePasswordView = require('./Views/Main/PersonalCenter/ChangePassword/ChangePasswordView.js');
        var view = new ChangePasswordView();

    });

    //控制台打印磁卡

    appRouter.on('route:printcardRoute', function () {
        var CardInfoView = require('./Views/Main/Dog/DogCard/CardInfo/CardInfoView.js');
        var view = new CardInfoView();

    });

    //机构
    appRouter.on('route:organizationRoute', function (actions) {
        console.log("机构页面");

        var user = User.getLoginUser();

        console.log(user);
        // user.organization.checkStatus.status = 1
        // console.log(user.organization.checkStatus)
        if (user) {

            var organization = user.organization

            //不存在organizationq 去添加组织
            if (organization == null) {
                var AddOrganizationView = require('./Views/SignUp/Organization/AddOrganizationView.js');
                var view = new AddOrganizationView({
                    action: "add",
                    user: user,
                });

            } else {
                var status = organization.checkStatus.status

                // status = 1
                if (status == 1) {
                    //   var AddOrganizationView = require('./Views/SignUp/Organization/AddOrganizationView.js');
                    //   var view = new AddOrganizationView({
                    //      action:"edit",
                    //      user:user,
                    // });
                    Utils.goPage("main")

                } else if (status == 0 || status == -1) {
                    //等待审核
                    var AddOrganizationView = require('./Views/SignUp/Organization/AddOrganizationView.js');
                    var view = new AddOrganizationView({
                        action: "checkStatus",
                        user: user,
                    });

                }
            }
        }
        else {
            console.log("no user")
            Utils.goPage('start')
        }
    });


    appRouter.on('route:mainRoute', function (actions) {

        //if(LoginUserManager.getToken() == null){
        //    Utils.goPage('start');
        //    return;
        //}

        var MainView = require('./Views/Main/MainView.js');
        var view = new MainView({
            'el': Config.defaultContaier
        });

    });

    appRouter.on('route:resetRoute', function (actions) {
        var ResetView = require('./Views/Start/Reset/ResetView.js');
        var view = new ResetView();
    });

}

// Exports ----------------------------------------------
module["exports"] = new Routing();
