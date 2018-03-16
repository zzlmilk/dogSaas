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
    }

});

module.exports = HomePageView;
