/**
 * Created by json on 2017/11/24.
 */
/**
 * Created by json on 2017/11/23.
 */
var Backbone = require('backbone');
var _ = require('lodash');


var Utils = require('../../../../lib/utils');
var Const = require('../../../../lib/consts');
var Config = require('../../../../lib/init');
var RegisterClinet = require('../../../../lib/APIClients/RegisterClinet');

//var VaildCodeClient = require('../../lib/APIClients/VaildCodeClient');
//var RegisterClinet = require('../../lib/APIClients/RegisterClinet');
//var UserModel = require('../../Models/user')
//var loginUserManager = require('../../lib/loginUserManager')


var template = require('./ChangePassword.hbs');

var ChangePasswordView = Backbone.View.extend({

    initialize: function (options) {


        this.render();
    },


    render: function () {

        $(Config.defaultContaier).html(template({}));


        var SignHeaderView = require('../Header/HeaderView.js');
        var view = new SignHeaderView({
            'el': "#signheader-content"
        });

        var SignFooterView = require('../Footer/FooterView.js');
        var view = new SignFooterView({
            'el': "#signfooter-content"
        });

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
            flag = true;

            var currentPwd = $('#currentPwd').val().trim();
            if (currentPwd == "") {
                $("#currentPwd_null_tip").show();
                flag = false
            } else {
                $("#currentPwd_null_tip").hide();
            }

            var newPwd = $('#newPwd').val().trim();
            if (newPwd == "") {
                $("#newPwd_null_tip").show();
                $("#newPwd_length_tip").hide();
                flag = false
            } else {
                $("#newPwd_null_tip").hide();
                if (newPwd.length < 6) {
                    $("#newPwd_length_tip").show();
                    flag = false
                } else {
                    $("#newPwd_length_tip").hide();
                }
            }

            var rePwd = $('#rePwd').val().trim();
            if (rePwd == "") {
                $("#rePwd_null_tip").show();
                $("#rePwd_length_tip").hide();
                $("#rePwd_diff_tip").hide();
                flag = false
            } else {
                $("#rePwd_null_tip").hide();
                if (rePwd.length < 6) {
                    $("#rePwd_length_tip").show();
                    $("#rePwd_diff_tip").hide();
                    flag = false
                } else {
                    $("#rePwd_length_tip").hide();
                    if (rePwd != newPwd) {
                        $("#rePwd_diff_tip").show();
                        flag = false
                    } else {
                        $("#rePwd_diff_tip").hide();
                    }
                }
            }
            // console.log(flag)
            return flag;
        };

        $('#btn-changepassword').unbind().on('click', function () {

            //验证非空
            if (!emptyValid()) {
                return;
            }
            var oldPassword = $('#currentPwd').val().trim();
            var newPassword = $('#newPwd').val().trim();
            self.changePassword(oldPassword, newPassword);

        });
    },
    //初始化事件
    initEvent: function () {
        // 失去焦点监听
        $("#currentPwd").blur(function () {
            var currentPwd = $('#currentPwd').val().trim();
            if (currentPwd == "") {
                $("#currentPwd_null_tip").show();
            } else {
                $("#currentPwd_null_tip").hide();
            }
        });

        // 失去焦点监听
        $("#newPwd").blur(function () {
            var newPwd = $('#newPwd').val().trim();
            if (newPwd == "") {
                $("#newPwd_null_tip").show();
                $("#newPwd_length_tip").hide();
                flag = false
            } else {
                $("#newPwd_null_tip").hide();
                if (newPwd.length < 6) {
                    $("#newPwd_length_tip").show();
                    flag = false
                } else {
                    $("#newPwd_length_tip").hide();
                }
            }
        });

        // 失去焦点监听
        $("#rePwd").blur(function () {
            var newPwd = $('#newPwd').val().trim();
            var rePwd = $('#rePwd').val().trim();
            if (rePwd == "") {
                $("#rePwd_null_tip").show();
                $("#rePwd_length_tip").hide();
                $("#rePwd_diff_tip").hide();
                flag = false
            } else {
                $("#rePwd_null_tip").hide();
                if (rePwd.length < 6) {
                    $("#rePwd_length_tip").show();
                    $("#rePwd_diff_tip").hide();
                    flag = false
                } else {
                    $("#rePwd_length_tip").hide();
                    if (rePwd != newPwd) {
                        $("#rePwd_diff_tip").show();
                        flag = false
                    } else {
                        $("#rePwd_diff_tip").hide();
                    }
                }
            }
        });

    },

    //修改密码
    changePassword: function (oldPassword, newPassword) {
        var self = this;

        RegisterClinet.changePassword({
            newPassword: newPassword,
            oldPassword: oldPassword,

        }, function (data) {
            console.log("修改密码成功");
            console.log(data);
            Utils.goPage("start");
            // loginUserManager.setToken(data.token);
            // var user = UserModel.modelByResult(data.user);
            // loginUserManager.setLoginUserID(user.get("id"))
            // user.save();
            // var logionProcess = user.get("logionProcess");
            // if (logionProcess == 0) {
            //     Utils.goPage("organization");
            // } else {
            //     Utils.goPage("signup");
            // }
        }, function (errorCode) {
            console.log(errorCode)
            if (Const.ErrorCodes[errorCode]) {
                message = Const.ErrorCodes[errorCode]
                alert(message)
            }


        })

    }
})

module.exports = ChangePasswordView;
