var Backbone = require('backbone');

var _ = require('lodash');
//var sha1 = require('sha1');

var Utils = require('../../../../lib/utils');
var Const = require('../../../../lib/consts');
var Config = require('../../../../lib/init');


var BaseView = require('../BaseView');

var SignInClient = require('../../../../lib/APIClients/SignInClient');

var loginUserManager = require('../../../../lib/loginUserManager');

var UserModel = require('../../../../Models/user');

var template = require('./SignIn.hbs');

var SignInView = BaseView.extend({

    el: null,
    container: null,
    initialize: function (options) {


        this.container = options.container;
        this.render();
    },

    home: function () {
        alert("ok")
    },


    render: function () {

        $(this.container).html(template);

        this.onLoad();

        return this;

    },

    onLoad: function () {

        var self = this;
        //添加监听事件
        this.initEvent();
        /**
         * 非空验证
         * @returns {boolean}
         */
        var emptyValid = function () {
            falg = true;
            var email = $('input[name="email"]').val();
            if (email == "") {
                falg = false;
                $("#email_null_tip").show();
            }else{
                $("#email_null_tip").hide();
            }
            var password = $('input[name="password"]').val();

            if (password == "") {
                falg = false;
                $("#password_null_tip").show();
            }else{
                $("#password_null_tip").hide();
            }
            return falg;
        };

        $('#form-signin input').bind().on('keyup', function (e) {

            if (e.keyCode == 13) {

                $('#form-signin #btn-signin').click();

            }

        });

        $('#login_form #loginBtn').unbind().on('click', function () {
            //验证非空
            if (!emptyValid()) {
                return;
            }
            var email = $('input[name="email"]').val();
            var password = $('input[name="password"]').val();


            SignInClient.send({
                email: email,
                password: password

            }, function (data) {

                loginUserManager.setToken(data.token);
                //存入本地缓存
                var user = UserModel.modelByResult(data.user)
                loginUserManager.setLoginUserID(user.get("id"))
                user.save();
                //默认跳转官网首页
                Utils.goPage("home");

            }, function (errorCode) {
                console.log(errorCode)
                if (Const.ErrorCodes[errorCode])
                    var message = Const.ErrorCodes[errorCode]

                alert(message)
            })
        });

        $('#forgetPwd').unbind().on('click', function () {
            var ResetView = require('../ForgotPwd/ForgotPwdView.js');
            new ResetView({
                container: '#start-view-content'
            });
        });

       //注册账户
        $('#registerInfo').unbind().on('click', function () {
            console.log("注册");
            Utils.goPage("signup");
        });
    },

    //初始化事件
    initEvent: function () {
        /**************************犬主登记****************************/
        //犬主姓名 失去焦点监听
        $("#email").blur(function () {
            var email = $('#email').val().trim();
            if (email == "") {
                $("#email_null_tip").show();
            } else {
                $("#email_null_tip").hide();
            }
        });
        $("#password").blur(function () {
            var password = $('#password').val().trim();
            if (password == "") {
                $("#password_null_tip").show();
            } else {
                $("#password_null_tip").hide();
            }
        });

    },

});

module.exports = SignInView;
