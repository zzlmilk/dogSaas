var Backbone = require('backbone');
var _ = require('lodash');

var Utils = require('../../../lib/utils');
var Const = require('../../../lib/consts');
var Config = require('../../../lib/init');

// load template
var template = require('./Tech.hbs');

var TechView = Backbone.View.extend({
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

        //核心技术
        $(function(){
            $('.demo1').Tabs();
            $('.tab_menu>li:eq(0)').children("div").addClass("arrow");
            $('.tab_menu>li').mouseover(function(){
                $(this).children("div").addClass("arrow").parent("li").siblings("li").children("div").removeClass("arrow");
            })
        });

        //鼠标悬浮图片蒙层放大
        $(".boost_layer").hide();
        // $("#boost").unbind().on('click', function (event) {
        //     event.stopPropagation();
        //     $(".boost_layer").show();
        // });

        $("#boost").mouseover(function () {
            $(".boost_layer").show();
        })

        $("#close").unbind().on('click', function (event) {
            event.stopPropagation();
            $(".boost_layer").hide();
        });






    }

});

module.exports = TechView;
