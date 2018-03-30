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
            //scrollbar: '.swiper-scrollbar',
        });

        $(".swiper-button-next,.swiper-button-prev").hide();

        $(".swiper-wrapper").mouseover(function(){
            $(".swiper-button-next,.swiper-button-prev").show();
        });
        $(".swiper-button-next,.swiper-button-prev").mouseover(function(){
            $(".swiper-button-next,.swiper-button-prev").show();
        });

        $("#swiper").mouseout(function(){
            $(".swiper-button-next,.swiper-button-prev").hide();
        });

        //首页核心技术
        $(function(){
            $('.demo1').Tabs();
            $('.tab_menu>li:eq(0)').children("div").addClass("arrow");
            $('.tab_menu>li').mouseover(function(){
                $(this).children("div").addClass("arrow").parent("li").siblings("li").children("div").removeClass("arrow");
            })
        });
        //首页产品优势--PC端
        $(".tips").each(function(){
            $(this).mouseover(function () {
                $(this).stop().animate({top:"0px"},"fast","linear");
            });
            $(this).mouseout(function () {
                $(this).stop().animate({top:"350px"},"fast","linear");
            });
        });
        //首页产品优势--移动端
        function urlredirect() {
            var sUserAgent = navigator.userAgent.toLowerCase();
            //首先判断浏览器类型是否为移动端
            if ((sUserAgent.match(/(ipod|iphone os|midp|ucweb|android|windows ce|windows mobile)/i))) {
                //是移动端浏览器的话遍历蒙层元素
                $(".tips").each(function(){
                    //设置蒙层点击事件
                    $(this).on('touchend', function (event) {
                        //判断蒙层是否处于最高处
                        if($(this).position().top==0){
                            //处于最高处的话让蒙层回到原处
                            $(this).stop().animate({top:"160px"});
                        }else{
                            //否则判断是否处于动画状态
                            if($(this).not(":animated")){
                                //没有处于动画状态时候，让蒙层执行动画到顶部并且让兄弟蒙层回到原处
                                  $(this).stop().animate({top:"0px"}).parent(".col-md-4").siblings(".col-md-4").children(".tips").stop().animate({top:"160px"});
                            }else{
                                //处于动画状态的话即蒙层处于最高处，此时让蒙层执行动画回到原处
                                  $(this).stop().animate({top:"160px"});
                            }
                        }
                        //组织默认行为
                        event.preventDefault();
                    })
                });
            }
        }
        urlredirect();




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
