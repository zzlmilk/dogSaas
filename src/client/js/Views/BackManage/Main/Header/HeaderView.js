var Backbone = require('backbone');
var _ = require('lodash');

var Utils = require('../../../../lib/utils');
var Const = require('../../../../lib/consts');
var Config = require('../../../../lib/init');

// load template
var template = require('./Header.hbs');
// var SelectUserBox = require('../Parts/SelectUserBox/SelectUserBox');
//var AlertDialog = require('../Modals/AlertDialog/AlertDialog');


var HeaderView;
HeaderView = Backbone.View.extend({

    el: null,

    initialize: function (options) {
        this.el = options.el;
        this.render();
    },

    render: function () {

        $(this.el).html(template());

        this.onLoad();

        return this;

    },

    onLoad: function () {

        var self = this;



        $('#personal_center').unbind().on('click', function () {

            var PersonalCenterView = require('../../User/PersonalCenter/PersonalCenterView');

            var view = new PersonalCenterView({
                'el': "#main-content"
            });

        });

        //点击logo及标题回到官网首页
        $('#gohome').unbind().on('click', function (event) {
            event.stopPropagation();
            Utils.goPage("home");

        });


        $('#user_info').mouseover(function () {
            $(this).children("ul").show();

        });
        $('#user_info').mouseout(function () {
            $(this).children("ul").hide();

        });

        //退出登录清除用户信息
        $('#logout').unbind().on('click', function (event) {
            event.stopPropagation();
            localStorage.removeItem("LoginUserID");
            console.log( localStorage.removeItem("LoginUserID"));
            Utils.goPage("home");

        });





    }

});

module.exports = HeaderView;
