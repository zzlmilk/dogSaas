var Backbone = require('backbone');
var template = require('./Reset.hbs');
var _ = require('lodash');
//var validator = require('validator');

var Utils = require('../../../../lib/utils');
var Const = require('../../../../lib/consts');
var Config = require('../../../../lib/init');

var BaseView = require('../BaseView');
var SendEmailClient = require('../../../../lib/APIClients/SendEmailClient');


var ResetView = Backbone.View.extend({

    initialize: function(options) {
        // this.el = options.el;
        this.render();
    },

    render: function() {
        $(Config.defaultContaier).html(template({

        }));


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

    onLoad: function(){

        var self = this;
        var emailReg = /^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/i;

        $('#email').unbind().on('keyup',function(e){
            var n = $("#email").val().trim();
            if (emailReg.test(n)) {
                $("#btn-reset").removeAttr("disabled")
            }

        });

        $("#btn-reset").unbind().on('click',function(e){
            var email = $("#email").val().trim();
            self.resetClick(email)
        })

    },
    resetClick:function(email){
        var self = this;
        SendEmailClient.send({
            email:email,
            useType:2 //1 注册  2 找回密码

        },function(data){
            //获取验证码成功
            $("#default_tip").hide()
            $("#success_tip").show()
            $("#email_0").html(email)
            self.reSendMail()

        },function(errorCode){
            if(Const.ErrorCodes[errorCode])
                message = Const.ErrorCodes[errorCode]

            alert(message)
        })

    },
    reSendMail:function(){
        var i = 60;
        $("#btn-reset").attr("disabled","disabled")
        var s =  setInterval(function(){
            i --;
            if (i==0) {
                $("#btn-reset").html("发送")
                $("#btn-reset").removeAttr("disabled")
                clearInterval(s)
            }
            else{
                $("#btn-reset").html(i +"秒")
            }
        },1000)
    }

})

module.exports = ResetView;