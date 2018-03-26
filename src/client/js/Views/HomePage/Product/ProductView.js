var Backbone = require('backbone');
var _ = require('lodash');

var Utils = require('../../../lib/utils');
var Const = require('../../../lib/consts');
var Config = require('../../../lib/init');

// load template
var template = require('./Product.hbs');

var ProductView = Backbone.View.extend({
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

        //产品优势
        $(".tips").each(function(){
            $(this).mouseover(function () {
                $(this).stop().animate({top:"0px"},"slow");
            });
            $(this).mouseout(function () {
                $(this).stop().animate({top:"300px"});
            });
        });

        //产品优势--移动端
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





    }

});

module.exports = ProductView;
