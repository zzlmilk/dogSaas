var Backbone = require('backbone');
var _ = require('lodash');

var Utils = require('../../../lib/utils');
var Const = require('../../../lib/consts');
var Config = require('../../../lib/init');

// load template
var template = require('./HomeMain.hbs');

var HomeMainView = Backbone.View.extend({
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

        //首页轮播图
        var mySwiper = new Swiper($('.swiper-container')[0], {
            direction: 'horizontal',
            loop: true,
            speed: 1000,
            autoplay: 2000,
            // 如果需要分页器
            pagination: '.swiper-pagination',
            // 如果需要前进后退按钮
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            autoplayDisableOnInteraction: false,
            // 如果需要滚动条
            // scrollbar: '.swiper-scrollbar',
        });
        //首页核心技术
        $(function(){
            $('.demo1').Tabs();
            $('.tab_menu>li:eq(0)').children("div").addClass("arrow");
            $('.tab_menu>li').mouseover(function(){
                $(this).children("div").addClass("arrow").parent("li").siblings("li").children("div").removeClass("arrow");
            })
        });
        //首页产品优势
        $(".tips").each(function(){
            $(this).mouseover(function () {
                $(this).stop().animate({top:"0px"},"slow");
            });
            $(this).mouseout(function () {
                $(this).stop().animate({top:"300px"});
            });
        });
        //首页小轮播图
        var mySwiperSecond = new Swiper($('.swiper-container')[1], {
            direction: 'horizontal',
            loop: true,
            speed: 1000,
            // autoplay: 2000,
            // 如果需要分页器
            pagination: '.swiper-pagination',
            // 如果需要前进后退按钮
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            autoplayDisableOnInteraction: false,
            slidesPerView: 3,//显示3个图片
            spaceBetween: 60
            // 如果需要滚动条
            // scrollbar: '.swiper-scrollbar',
        });

    }

});

module.exports = HomeMainView;
