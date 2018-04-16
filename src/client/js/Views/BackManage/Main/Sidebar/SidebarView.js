var Backbone = require('backbone');
var _ = require('lodash');

var Utils = require('../../../../lib/utils');
var Const = require('../../../../lib/consts');
var Config = require('../../../../lib/init');

// load template
var template = require('./Sidebar.hbs');

var SidebarView = Backbone.View.extend({

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

        var DogView = require('../Manage/Default/DogView.js');
        var view = new DogView({
            'el': "#main-content"
        });

        //左侧导航二级菜单展开

        $(".nav>li>a").each(function () {
            $(this).click(function () {
                $(this).siblings("ul").slideToggle().parents("li").siblings("li").children("ul").slideUp();
                $(this).children("span").toggleClass("current");
                $(this).parent("li").siblings("li").children("a").children("span").removeClass("current");

                //默认二级菜单第一个选项被选中
                $(this).next("ul").children("li").eq(0).children("a").removeClass("unactived").addClass("active").parent("li").siblings("li").children("a").removeClass("active").addClass("unactived");

                $(".second_nav>li>a").each(function () {
                    $(this).click(function () {
                        console.log(this);
                        $(this).removeClass("unactived").addClass("active").parent("li").siblings("li").children("a").removeClass("active").addClass("unactived");

                    })
                })
            })
        }).next("ul").hide();


        //办理狗证-->个人办证
        $('#btn_persons').unbind().on('click', function (event) {
            event.stopPropagation();
            var PersonalCardView = require('../Manage/PersonalCard/PersonalCardView');
            var view = new PersonalCardView({
                'el': "#main-content"
            });

        });


        //信息查询
        $('#btn_infoSearch').unbind().on('click', function (event) {
            event.stopPropagation();
            var DogOwnerView = require('../Manage/InfoSearch/DogOwner/DogOwnerView.js');
            var view = new DogOwnerView({
                'el': "#main-content"
            });
        });
        //信息查询-->犬主查询
        $('#btn_dogowners').unbind().on('click', function (event) {
            event.stopPropagation();
            var DogOwnerView = require('../Manage/InfoSearch/DogOwner/DogOwnerView.js');
            var view = new DogOwnerView({
                'el': "#main-content"
            });
        });
        //信息查询-->犬只查询
        $('#btn_dogs').unbind().on('click', function (event) {
            event.stopPropagation();
            var DogView = require('../Manage/InfoSearch/Dog/DogView.js');
            var view = new DogView({
                'el': "#main-content"
            });
        });

        //年检
        $('#btn_immune').unbind().on('click', function (event) {
            event.stopPropagation();
            var ImmuneView = require('../Manage/Immune/ImmuneView');
            var view = new ImmuneView({
                'el': "#main-content"
            });
        });
        // //年检-->免疫年检
        // $('#btn_check').unbind().on('click', function (event) {
        //     event.stopPropagation();
        //     var ImmuneListView = require('../Immune/ImmuneList/ImmuneListView');
        //     var view = new ImmuneListView({
        //         'el': "#main-content"
        //     });
        // });
        // //年检-->狗证年检
        // $('#btn_dogcard').unbind().on('click', function (event) {
        //     console.log("狗证年检");
        //     event.stopPropagation();
        //     var DogLicenseView = require('../Immune/DogLicense/DogLicenseView');
        //     var view = new DogLicenseView({
        //         'el': "#main-content"
        //     });
        //
        // });

        //制卡信息
        $('#btn_cardInfo').unbind().on('click', function (event) {
            event.stopPropagation();
            var CardInfoView = require('../Manage/CardInfo/CardInfoView');
            var view = new CardInfoView({
                'el': "#main-content"
            });

        });

        //预约查询
        $('#btn_reservation').unbind().on('click', function (event) {
            event.stopPropagation();
            var ReservationView = require('../Manage/Reservation/ReservationView');
            var view = new ReservationView({
                'el': "#main-content"
            });

        });


    }

});

module.exports = SidebarView;