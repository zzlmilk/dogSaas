/**
 * Created by json on 2017/11/28.
 */


var Backbone = require('backbone');
var _ = require('lodash');

var Utils = require('../../../../../lib/utils');
var Const = require('../../../../../lib/consts');
var Config = require('../../../../../lib/init');
var CityJson = require('../../../../Parts/selectPlugin/CityJson.js');
var DogLicenseClient = require('../../../../../lib/APIClients/DogLicenseClient');

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
                if (val.item_code == options.dogLicense.DogCard.info.district) {
                    options.dogLicense.DogCard.info.district = val.item_name;
                }
            });
        self.dogLicense = options.dogLicense;
        self.render();
    },

    render: function () {

        $(self.el).html(template({}));

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
            self.setDogCardValue();
        }

        self.setImmuneValue();

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
        //狗证取件方式
        $('#dogcard_save').unbind().on('click', function () {
            //取件方式
            var way = $("input[name='way']:checked").val();
            if (way == undefined) {
                $("#way_null_tip").show();
                return;
            } else {
                $("#way_null_tip").hide();
            }
            var wayIndex = 1;
            if (way == "") {

            }

            var takeWay = {
                dogLicenseId: self.dogLicense._id,
                takeWay: way
            }
            DogLicenseClient.takeWay(
                takeWay,
                //成功回调
                function (data) {
                    $('#dogcard_save').attr("disabled", true);
                    $('#dogcard_save').prop("disabled", true);
                    $("input[name='way']").attr("disabled", true);
                    $("input[name='way']").prop("disabled", true);
                    alert("提交成功");
                },
                //失败回调
                function (errorCode) {
                    console.log(errorCode);
                    if (Const.ErrorCodes[errorCode]) {
                        var message = Const.ErrorCodes[errorCode]
                        alert(message)
                    }

                });
        });

        //狗证年审
        $('#dogcard_check').unbind().on('click', function () {
            alert("狗证年审");
        });

        /******************无房产信息*********************/
        //完善房产信息
        $('#dogcard_to_house').unbind().on('click', function () {
            //查询数据 并回填 不可编辑状态  房产信息必填
            var PersonalCardView = require('../PersonalCard/PersonalCardView');
            new PersonalCardView({
                'el': "#main-content",
                "dogLicense": self.dogLicense
            });
        });

    },

    //设置免疫卡数据
    setImmuneValue: function () {
        console.log("设置免疫卡数据");
        $("#vaccineCardName").html(self.dogLicense.vaccineCard.info.name);
        $("#vaccineCardNo").html(self.dogLicense.vaccineCard.info.cardNo);

        $("#vaccineCardAddr").html(self.dogLicense.vaccineCard.info.addresses);
        $("#vaccineCardDistrict").html(self.dogLicense.vaccineCard.info.district);

        $("#vaccineCardBreed").html(self.dogLicense.vaccineCard.info.breed);
        $("#vaccineCardHairColor").html(self.dogLicense.vaccineCard.info.hairColor);
        //免疫时间 （循环）
        $.each(self.dogLicense.vaccineCard.info.annualDate, function (i, val) {
            $("#vaccineCardAnnualDate").append("<span>" + val + "&nbsp; </span>");
        });
        $("#vaccineCardIrisID").html(self.dogLicense.vaccineCard.info.irisID);

        $("#vaccineCardSignOrganization").html(self.dogLicense.vaccineCard.info.signOrganization);
        $("#vaccineCardCreateDate").html(self.dogLicense.vaccineCard.info.vaccineCreate.substring(0, 10));
    },
    //设置狗证数据
    setDogCardValue: function () {
        console.log("设置狗证数据------");
        $("#dogCardName").html(self.dogLicense.DogCard.info.name);
        $("#dogCardNo").html(self.dogLicense.DogCard.info.cardNo);

        $("#dogCardAddr").html(self.dogLicense.DogCard.info.addresses);
        $("#dogCardDistrict").html(self.dogLicense.DogCard.info.district);

        $("#dogCardBreed").html(self.dogLicense.DogCard.info.breed);
        $("#dogCardHairColor").html(self.dogLicense.DogCard.info.hairColor);

        $("#dogCardSignDate").html(self.dogLicense.DogCard.info.signCreate.substring(0, 10));
        $("#dogCardIrisID").html(self.dogLicense.DogCard.info.irisID);

        $("#dogCardSignOrganization").html(self.dogLicense.DogCard.info.signOrganization);
        $("#dogCardCreate").html(self.dogLicense.DogCard.create.substring(0, 10));

        //取证发送
        var takeWay = self.dogLicense.DogCard.info.takeWay;
        if (takeWay != undefined) {
            //回填 并禁用
            if (takeWay == 1) {
                $("#wayTake").attr("checked", true);
                $("#wayTake").prop('checked', true);
            } else {
                $("#wayMailing").attr("checked", true);
                $("#wayMailing").prop('checked', true);
            }
            $('#dogcard_save').attr("disabled", true);
            $('#dogcard_save').prop("disabled", true);
            $("input[name='way']").attr("disabled", true);
            $("input[name='way']").prop("disabled", true);
        }
    }
});

module.exports = CardInfoView;

