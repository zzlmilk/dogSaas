var Backbone = require('backbone');
var _ = require('lodash');


var Utils = require('../../../lib/utils');
var Const = require('../../../lib/consts');
var Config = require('../../../lib/init');
var loginUserManager = require('../../../lib/loginUserManager');

// load template
var template = require('./Nav.hbs');

var NavView = Backbone.View.extend({
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

    onLoad: function(){

        var self = this;

        //默认加载首页
        var HomeMainView = require('../HomeMain/HomeMainView.js');
        var view = new HomeMainView({
            'el': "#home-main"
        });

        //点击logo回到首页
        $('#home_page').unbind().on('click', function (event) {
            event.stopPropagation();
            var HomeMainView = require('../HomeMain/HomeMainView.js');
            var view =  new HomeMainView({
                'el': "#home-main"
            });
        });


        //核心技术
        $('#core_tech').unbind().on('click', function (event) {
            event.stopPropagation();
            var TechView = require('../Tech/TechView.js');
            var view = new TechView({
                'el': "#home-main"
            });
        });

        //产品及服务
        $('#product_service').unbind().on('click', function (event) {
            event.stopPropagation();
            var ProductView = require('../Product/ProductView.js');
            var view = new ProductView({
                'el': "#home-main"
            });
        });

        //客户案例
        // $('#client_case').unbind().on('click', function (event) {
        //     event.stopPropagation();
        //     var ClientCaseView = require('../ClientCase/ClientCaseView.js');
        //     var view = new ClientCaseView({
        //         'el': "#home-main"
        //     });
        // });

        //新闻中心
        $('#news_center').unbind().on('click', function (event) {
            event.stopPropagation();
            var NewsView = require('../News/NewsView.js');
            var view = new NewsView({
                'el': "#home-main"
            });
        });

        //联系我们
        $('#contact_us').unbind().on('click', function (event) {
            event.stopPropagation();
            var ContactView = require('../Contact/ContactView.js');
            var view = new ContactView({
                'el': "#home-main"
            });
        });

        //关于我们PC端
        $('#about_us').unbind().on('click', function (event) {
            event.stopPropagation();
            var AboutView = require('../About/AboutView.js');
            var view = new AboutView({
                'el': "#home-main"
            });
        });

        //关于我们移动端
        $('#about_us_mobile').unbind().on('click', function (event) {
            event.stopPropagation();
            var AboutView = require('../About/AboutView.js');
            var view = new AboutView({
                'el': "#home-main"
            });
        });

        //招聘PC端
        $('#employ').unbind().on('click', function (event) {
            event.stopPropagation();
            var EmployView = require('../Employ/EmployView.js');
            var view = new EmployView({
                'el': "#home-main"
            });
        });

        //招聘移动端
        $('#employ_mobile').unbind().on('click', function (event) {
            event.stopPropagation();
            var EmployView = require('../Employ/EmployView.js');
            var view = new EmployView({
                'el': "#home-main"
            });
        });

        //PC端导航条鼠标悬浮显示下拉菜单
        $(".dropdown").mouseover(function(){
            $(this).children("ul").show();
        });
        $(".dropdown").mouseout(function(){
            $(this).children("ul").hide();
        });


        //移动端侧边导航条
        jQuery(document).ready(function($) {

            function whichTransitionEvent() {
                var el = document.createElement('event'),
                    transitionEvents = {
                        'WebkitTransition' : 'webkitTransitionEnd',// Saf 6, Android Browser
                        'MozTransition'    : 'transitionend',      // only for FF < 15
                        'transition'       : 'transitionend'       // IE10, Opera, Chrome, FF 15+, Saf 7+
                    };
                for(var t in transitionEvents){
                    if( el.style[t] !== undefined ){
                        return transitionEvents[t];
                    }
                }
            }
            var transitionEvent = whichTransitionEvent();

            $('[data-toggle="offcanvas"], .overlay').click(function () {
                $('.overlay').toggleClass('active');
                $('body').toggleClass('active');
                $('.row-offcanvas').toggleClass('active');
                $('.sidebar-offcanvas').toggleClass('active');
                $('.navbar-toggle').toggleClass('collapsed');
                $('.navbar-collapse').addClass('transition');
                $('.transition').one(transitionEvent,
                    function(e) {
                        $('.navbar-collapse').removeClass('transition');
                    });
            });

            $('.navbar .nav a').click(function () {
                $('.overlay').removeClass('active');
                $('body').removeClass('active');
                $('#navbar').removeClass('in');
                $('.row-offcanvas').removeClass('active');
                $('.sidebar-offcanvas').removeClass('active');
                $('.navbar-toggle').addClass('collapsed');
                $('.transition').one(transitionEvent,
                    function(e) {
                        $('.navbar-collapse').removeClass('transition');
                    });
            });

        });


        //默认隐藏控制台、退出登录按钮
        $('#nav_console').hide();
        $('#nav_user').hide();
        //判断有无用户信息
        if(localStorage.getItem("LoginUserID")!=null){
            //有用户信息，登陆、注册按钮隐藏
            $('#nav_login').hide();
            $('#nav_register').hide();
            //同时，控制台、退出登录按钮显示
            $('#nav_console').show();
            $('#nav_user').show();
            //点击控制台跳转到后台管理系统
            $('#nav_console').unbind().on('click', function (event) {
                event.stopPropagation();
                Utils.goPage("main");
            });
            //鼠标悬浮用户头像显示下拉退出菜单
            $("#last").mouseover(function(){
                $(this).children("ul").show();
            });
            //鼠标离开退出菜单隐藏
            $('#last').mouseout(function(){
                $(this).children("ul").hide();
            });


            //点击退出登录
            $('#nav_logout').unbind().on('click', function (event) {
                event.stopPropagation();
                localStorage.removeItem("LoginUserID");
                //隐藏控制台、退出登录按钮
                $('#nav_console').hide();
                $('#nav_user').hide();
                //同时，控制台、退出登录按钮显示
                $('#nav_login').show();
                $('#nav_register').show();
            });

        }else{
            //没有用户信息，登陆、注册按钮显示
            $('#nav_login').show();
            $('#nav_register').show();
            //同时，控制台、退出登录按钮隐藏
            $('#nav_console').hide();
            $('#nav_user').hide();
            //点击控制台跳转到开始登录
            $('#nav_console').unbind().on('click', function (event) {
                event.stopPropagation();
                Utils.goPage("start");
            });

        }

        //防止控制台退出后页面后退到控制台
        // history.pushState(null, null, document.URL);
        // window.addEventListener('popstate', function () {
        //     history.pushState(null, null, document.URL);
        // });



        //登录
        $('#nav_login').unbind().on('click', function (event) {
            event.stopPropagation();

        });

        //注册
        $('#nav_register').unbind().on('click', function (event) {
            event.stopPropagation();

        });


    }

});

module.exports = NavView;
