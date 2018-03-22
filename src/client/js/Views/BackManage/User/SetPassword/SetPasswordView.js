var Backbone = require('backbone');
var _ = require('lodash');

var Utils = require('../../../../lib/utils');
var Const = require('../../../../lib/consts');
var Config = require('../../../../lib/init');

// load template
var template = require('./SetPassword.hbs');

var VaildCodeClient = require('../../../../lib/APIClients/VaildCodeClient');
var RegisterClinet = require('../../../../lib/APIClients/RegisterClinet');
var UserModel = require('../../../../Models/user')
var loginUserManager = require('../../../../lib/loginUserManager')


var VeriftEmailView = Backbone.View.extend({

    params: {},
    initialize: function (options) {
        var self = this;

        if (options.actions == null) {
            return;
        } else {
            self.params = Utils.getActionsParams(options.actions)
        }

        self.vaildCode(function (data) {

            self.render();
        })


    },

    render: function () {


        $(Config.defaultContaier).html(template({}));

        this.onLoad();


        return this;

    },

    onLoad: function () {

        var self = this;
        //失去焦点监听
        $("input[name =password]").blur(function () {
            var password = $("input[name =password]").val();
            if (password == "") {
                $("#password_null_tip").show();
                $("#password_length_tip").hide();
            } else {
                $("#password_null_tip").hide();
                if (password.length < 6) {
                    $("#password_length_tip").show();
                } else {
                    $("#password_length_tip").hide();
                }
            }
        });
        $("input[name =repassword]").blur(function () {
            var password = $("input[name =password]").val();
            var repassword = $("input[name =repassword]").val();
            if (repassword == "") {
                $("#repassword_null_tip").show();
                $("#repassword_length_tip").hide();
                $("#repassword_diff_tip").hide();
            } else {
                $("#repassword_null_tip").hide();

                if (repassword.length < 6) {
                    $("#repassword_length_tip").show();
                    $("#repassword_diff_tip").hide();
                } else {
                    $("#repassword_length_tip").hide();
                    if (password != repassword) {
                        $("#repassword_diff_tip").show();
                    } else {
                        $("#repassword_diff_tip").hide();
                    }
                }
            }
        });
        /**
         * 非空验证
         * @returns {boolean}
         */
        var emptyValid = function () {
            falg = true;

            var password = $("input[name =password]").val();
            if (password == "") {
                falg = false;
                $("#password_null_tip").show();
            } else {
                $("#password_null_tip").hide();
                if (password.length < 6) {
                    falg = false;
                    $("#password_length_tip").show();
                } else {
                    $("#password_length_tip").hide();
                }
            }

            var repassword = $("input[name =repassword]").val();
            if (repassword == "") {
                falg = false;
                $("#repassword_null_tip").show();
            } else {
                $("#repassword_null_tip").hide();
                if (repassword.length < 6) {
                    falg = false;
                    $("#repassword_length_tip").show();
                } else {
                    $("#repassword_length_tip").hide();
                }
            }

            if (repassword != "" && repassword.length >= 6 && password != repassword) {
                falg = false;
                $("#repassword_diff_tip").show();
            } else {
                $("#repassword_diff_tip").hide();

            }

            return falg;
        };

        $("#veriftEmailBtn").unbind().on('click', function (e) {

            //非空验证
            //验证非空
            if (!emptyValid()) {
                return;
            }
            var password = $("input[name =password]").val();
            self.submitPassword(password);

        });

    },
    vaildCode: function (callback) {

        var self = this;
        VaildCodeClient.send({
            code: self.params.key,
        }, function (data) {
            self.params.email = data.email;
            self.params.useType = data.useType;


            callback()


        }, function (errorCode) {

            if (Const.ErrorCodes[errorCode])
                var message = Const.ErrorCodes[errorCode];

            alert(message)


        })

    },
    submitPassword: function (password) {
        var self = this;

        RegisterClinet.send({
            email: self.params.email,
            password: password,
            code: self.params.key,

        }, function (data) {
            console.log("设置密码成功");
            console.log(data);
            loginUserManager.setToken(data.token);
            var user = UserModel.modelByResult(data.user);
            loginUserManager.setLoginUserID(user.get("id"))
            user.save();
            var logionProcess = user.get("logionProcess");
            if (logionProcess == 0) {
                Utils.goPage("organization");
            } else {
            }
        }, function (errorCode) {
            if (Const.ErrorCodes[errorCode])
                message = Const.ErrorCodes[errorCode]

            alert(message)
        })

    }


})

module.exports = VeriftEmailView;



