var Backbone = require('backbone');
var _ = require('lodash');

var Utils = require('../../../lib/utils');
var Const = require('../../../lib/consts');
var Config = require('../../../lib/init');

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

        //关于我们
        $('#about_us').unbind().on('click', function (event) {
            event.stopPropagation();
            var AboutView = require('../About/AboutView.js');
            var view = new AboutView({
                'el': "#home-main"
            });
        });

        //招聘
        $('#employ').unbind().on('click', function (event) {
            event.stopPropagation();
            var EmployView = require('../Employ/EmployView.js');
            var view = new EmployView({
                'el': "#home-main"
            });
        });

    }

});

module.exports = NavView;
