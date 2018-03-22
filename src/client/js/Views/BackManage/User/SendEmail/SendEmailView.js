var Backbone = require('backbone');
var _ = require('lodash');

var Utils = require('../../../../lib/utils');
var Const = require('../../../../lib/consts');
var Config = require('../../../../lib/init');

// load template
var template = require('./SendEmail.hbs');

var SendEmailClient = require('../../../../lib/APIClients/SendEmailClient');

var SendEmailView = Backbone.View.extend({

    el: null,
    initialize: function (options) {
        this.el = options.el;
        this.render();
    },

    render: function () {
        $(this.el).html(template({}));
        this.onLoad();
        return this;
    },

    onLoad: function () {
        var self = this;
        // var emailReg = /^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/i;
        //失去焦点监听
        $("#email").blur(function () {
            var email = $("#email").val().trim();
            if (email == "") {
                $("#email_null_tip").show();
                $("#email_format_tip").hide();
            } else {
                $("#email_null_tip").hide();
                var emailReg = /^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/;
                // var emailReg=/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/
                if (emailReg.test(email)) {
                    $("#email_format_tip").hide();
                } else {
                    $("#email_format_tip").show()
                }
            }
        });

        // $('#email').unbind().on('keyup', function (e) {
        //     var n = $("#email").val().trim();
        //     if (emailReg.test(n)) {
        //         $("#registerBtn").removeAttr("disabled")
        //     }
        //
        // });


        $("#registerBtn").unbind().on('click', function (e) {
            var email = $("#email").val().trim();
            if (email == "") {
                $("#email_null_tip").show();
                return
            } else {
                $("#email_null_tip").hide();
                var emailReg = /^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/;
                if (emailReg.test(email)) {
                    $("#email_format_tip").hide();
                } else {
                    $("#email_format_tip").show()
                    return
                }
            }
            self.registerClick(email)


        })


    },
    registerClick: function (email) {
        var self = this;
        SendEmailClient.send({
            email: email,
            useType: 1

        }, function (data) {
            //获取验证码成功
            $("#default_tip").hide()
            $("#success_tip").show()
            $("#email_0").html(email)
            self.reSendMail()


        }, function (errorCode) {


            if (Const.ErrorCodes[errorCode])
                message = Const.ErrorCodes[errorCode]

            alert(message)


        })

    },
    reSendMail: function () {
        var i = 5;
        $("#registerBtn").attr("disabled", "disabled")
        var s = setInterval(function () {
            i--;
            if (i == 0) {
                $("#registerBtn").html("发送")
                $("#registerBtn").removeAttr("disabled")
                clearInterval(s)
            }
            else {
                $("#registerBtn").html(i + "秒")
            }


        }, 1000)
    }


});

module.exports = SendEmailView;
