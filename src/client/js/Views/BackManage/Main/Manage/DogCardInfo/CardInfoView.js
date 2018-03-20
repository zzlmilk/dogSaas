/**
 * Created by json on 2017/11/28.
 */


var Backbone = require('backbone');
var _ = require('lodash');

var Utils = require('../../../../../lib/utils');
var Const = require('../../../../../lib/consts');
var Config = require('../../../../../lib/init');
var CityJson = require('../../../Modals/selectPlugin/CityJson.js');
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
        console.log(options.dogLicense)
        console.log("------------------")

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

       self.setDogCardValue();

        /****************狗证**********************/
        //狗证取件方式
        $('#dogcard_print').unbind().on('click', function () {
            alert("打印狗证磁卡");
        });



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

        var date=""
        var annualDate=self.dogLicense.DogCard.info.annualDate
        for(var i in annualDate){
            date +=annualDate[i]+" "
        }
        $("#dogCardSignDate").html(date);
        $("#dogCardIrisID").html(self.dogLicense.DogCard.info.irisID);

        $("#dogCardSignOrganization").html(self.dogLicense.DogCard.info.signOrganization);
        if(self.dogLicense.DogCard&&self.dogLicense.DogCard.create){
            $("#dogCardCreate").html(self.dogLicense.DogCard.create.substring(0, 10));
        }


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

