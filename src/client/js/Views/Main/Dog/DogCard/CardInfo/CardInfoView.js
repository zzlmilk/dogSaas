/**
 * Created by json on 2017/11/28.
 */


var Backbone = require('backbone');
var _ = require('lodash');

var Utils = require('../../../../../lib/utils');
var Const = require('../../../../../lib/consts');
var Config = require('../../../../../lib/init');
var CityJson = require('../../../../Parts/selectPlugin/CityJson.js');

// load template
var template = require('./CardInfo.hbs');

var CardInfoView = Backbone.View.extend({
    self: null,
    el: null,
    dogLicense: null,
    initialize: function (options) {
        self = this;
        self.el = options.el;

        $.each(CityJson,
            function (i, val) {
                if (val.item_code == options.dogLicense.vaccineCard.info.district) {
                    options.dogLicense.vaccineCard.info.district = val.item_name;
                }
            });
        options.dogLicense.vaccineCard.info.vaccineCreate = options.dogLicense.vaccineCard.info.vaccineCreate.substring(0, 10);
        self.dogLicense = options.dogLicense;
        self.render();
    },

    render: function () {

        $(self.el).html(template({
            dogLicense: self.dogLicense
        }));

        self.onLoad();

        return this;

    },

    onLoad: function () {

        var createCode = self.dogLicense.DogCard.isCreate;
        var dogCardInfo = $("#dogcard_info");
        var dogCardNo = $("#dogcard_no");
        //判断是否可以制狗证
        if (createCode == 0) {
            //不可以办理狗证
            dogCardInfo.hide();
            dogCardNo.show();
        } else if (createCode == 1) {
            //可以办理狗证
            dogCardInfo.show();
            dogCardNo.hide();
        }

        /****************免疫卡**********************/
        //打印免疫卡
        $('#immune_print').unbind().on('click', function () {
            alert("打印免疫卡");
        });

        //免疫卡年审
        $('#immune_check').unbind().on('click', function () {
            alert("免疫卡年审");
        });

        /****************狗证**********************/
        //打印狗证
        $('#dogcard_save').unbind().on('click', function () {
            alert("打印狗证");
        });

        //狗证年审
        $('#dogcard_check').unbind().on('click', function () {
            alert("狗证年审");
        });

        /******************无房产信息*********************/
        //完善房产信息
        $('#dogcard_to_house').unbind().on('click', function () {
            alert("完善房产信息");
            //查询数据 并回填 不可编辑状态  房产信息必填
            var PersonalCardView = require('../PersonalCard/PersonalCardView');
            new PersonalCardView({
                'el': "#main-content",
                "dogLicense":self.dogLicense
            });
        });

    }
});

module.exports = CardInfoView;

