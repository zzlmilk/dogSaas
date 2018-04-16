var Backbone = require('backbone');
var _ = require('lodash');

var Utils = require('../../lib/utils');
var Const = require('../../lib/consts');
var Config = require('../../lib/init');

// load template
var template = require('./HomePage.hbs');

var HomePageView = Backbone.View.extend({

    initialize: function (options) {
        this.render();
    },

    render: function () {

        $(Config.defaultContaier).html(template({}));

        this.onLoad();

        return this;

    },

    onLoad: function () {

        var self = this;

        //默认加载首页
        var HomeMainView = require('./HomeMain/HomeMainView.js');
        var view = new HomeMainView({
            'el': "#home-main"
        });

        //头部导航条
        var NavView = require('./Nav/NavView.js');
        new NavView({
            'el': "#header-content"
        });


        //底部栏
        var FooterView = require('./Footer/FooterView.js');
        new FooterView({
            'el': "#footer-content"
        });

        //隐私政策
        $('#privacy').unbind().on('click', function (event) {
            event.stopPropagation();
            var PrivacyView = require('./Privacy/PrivacyView.js');
            new PrivacyView({
                'el': "#home-main"
            });
        });

        //服务协议
        $('#service').unbind().on('click', function (event) {
            event.stopPropagation();
            var ServiceView = require('./Service/ServiceView.js');
            new ServiceView({
                'el': "#home-main"
            });
        });
    }

});

module.exports = HomePageView;
