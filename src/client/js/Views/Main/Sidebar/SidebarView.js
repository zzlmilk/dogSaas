var Backbone = require('backbone');
var _ = require('lodash');

var Utils = require('../../../lib/utils');
var Const = require('../../../lib/consts');
var Config = require('../../../lib/init');

// load template
var template = require('./Sidebar.hbs');

var SidebarView;
SidebarView = Backbone.View.extend({

    el: null,
    initialize: function (options) {
        this.el = options.el;
        this.render();
    },

    render: function () {
        $(this.el).html(template({}));

        this.onLoad();

        return this;

    },


    onLoad: function () {

        var self = this;

        var DogView = require('../Dog/DogView.js');
        var view = new DogView({
            'el': "#main-content"
        });

        //左侧导航二级菜单展开

        $(".nav>li>a").each(function(){
            $(this).click(function(){
                $(this).next("ul").toggle().closest("li").siblings("li").children("ul").hide();
                $(this).children("span").toggleClass("current");
                $(this).parent("li").siblings("li").children("a").children("span").removeClass("current");
                $(this).next("ul").children("li").eq(0).children("a").removeClass("unactived");
                $(this).next("ul").children("li").eq(0).children("a").addClass("active");
                    $(this).next("ul").children("li").children("a").click(function(){
                        $(this).removeClass("unactived");
                        $(this).addClass("active");
                        $(this).parent("li").siblings("li").children("a").removeClass("active");
                        $(this).parent("li").siblings("li").children("a").addClass("unactived");
                    })
            })
        }).next("ul").hide();







        //办理狗证
        $('#btn_dogCard').unbind().on('click', function () {


            var PersonalCardView = require('../Dog/DogCard/PersonalCard/PersonalCardView');
            var view = new PersonalCardView({
                'el': "#main-content"
            });

        });
        //办理狗证-->个人办证
        $('#btn_persons').unbind().on('click', function (event) {
            event.stopPropagation();
            var PersonalCardView = require('../Dog/DogCard/PersonalCard/PersonalCardView');
            var view = new PersonalCardView({
                'el': "#main-content"
            });

        });

        //办理狗证-->企业办证
        $('#btn_businesss').unbind().on('click', function (event) {
            event.stopPropagation();
            //alert("进入企业办证");
            var BusinessCardView = require('../Dog/DogCard/BusinessCard/BusinessCardView');
            var view = new BusinessCardView({
                'el': "#main-content"
            });

        });

        //信息查询
        $('#btn_infoSearch').unbind().on('click', function () {


            var DogOwnerView = require('../InfoSearch/DogOwner/DogOwnerView.js');
            var view = new DogOwnerView({
                'el': "#main-content"
            });


        });
        //信息查询-->犬主查询
        $('#btn_dogowners').unbind().on('click', function (event) {
            event.stopPropagation();
            var DogOwnerView = require('../InfoSearch/DogOwner/DogOwnerView.js');
            var view = new DogOwnerView({
                'el': "#main-content"
            });

        });
        //信息查询-->犬只查询
        $('#btn_dogs').unbind().on('click', function (event) {
            event.stopPropagation();
            var DogView = require('../InfoSearch/Dog/DogView.js');
            var view = new DogView({
                'el': "#main-content"
            });

        });



        //免疫年检
        $('#btn_immune').unbind().on('click', function () {

            var ImmuneView = require('../Immune/ImmuneView');

            var view = new ImmuneView({
                'el': "#main-content"
            });

        });

        //制卡信息
        $('#btn_cardInfo').unbind().on('click', function () {

            var CardInfoView = require('../CardInfo/CardInfoView');

            var view = new CardInfoView({
                'el': "#main-content"
            });

        });




    }

});

module.exports = SidebarView;
