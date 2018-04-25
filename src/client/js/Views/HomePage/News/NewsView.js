var Backbone = require('backbone');
var _ = require('lodash');

var Utils = require('../../../lib/utils');
var Const = require('../../../lib/consts');
var Config = require('../../../lib/init');

// load template
var template = require('./News.hbs');

var NewsView = Backbone.View.extend({
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


        //点击查看全文--第一篇
        $(".NewsFirst").unbind().on("click",function (event) {
            event.stopPropagation();
                var NewsFirst = require('./NewsFirst/NewsFirst.js');
                var view = new NewsFirst({
                    'el': "#news_content"
                })
        });

        //点击查看全文--第二篇
        $(".NewsSecond").unbind().on("click",function (event) {
            event.stopPropagation();
            var NewsSecond = require('./NewsSecond/NewsSecond.js');
            var view = new NewsSecond({
                'el': "#news_content"
            })
        });


    }

});

module.exports = NewsView;
