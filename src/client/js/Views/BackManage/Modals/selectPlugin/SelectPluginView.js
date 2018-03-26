var Backbone = require('backbone');
var _ = require('lodash');

var Utils = require('../../../../lib/utils');
var Const = require('../../../../lib/consts');
var Config = require('../../../../lib/init');

// load template
var template = require('./SelectPlugin.hbs');

var CityJson = require('./CityJson.js');
var StringBuffer = require('./StringBuffer.js');


var SelectPluginView = Backbone.View.extend({


    el: null,
    cityJson: null,
    initialize: function (options) {
        this.el = options.el;

        this.cityJson = CityJson;
        this.render();

    },

    render: function () {

        $(this.el).html(template({}));


        this.onLoad();


        return this;

    },

    onLoad: function () {
        var self = this;

        var sb = new StringBuffer();
        $.each(self.cityJson,
            function (i, val) {
                if (val.item_code.substr(2, 4) == '0000') {

                    sb.append("<option value='" + val.item_code + "'>" + val.item_name + "</option>");
                }
            });


        $("#choosePro").after(sb.toString());

        $("#province").bind("change", function (e) {
            self.doProvAndCityRelation();
        })

        $("#citys").bind("change", function (e) {

            self.doCityAndCountyRelation()
        })

        $("#county").bind("change", function (e) {

        })


    },
    // 省值变化时 处理市
    doProvAndCityRelation: function () {
        var self = this;
        var city = $("#citys");
        var county = $("#county");
        if (city.children().length > 1) {
            city.empty();
        }
        if (county.children().length > 1) {
            county.empty();
        }
        if ($("#chooseCity").length === 0) {
            city.append("<option id='chooseCity' value='-1'>请选择城市</option>");
        }
        if ($("#chooseCounty").length === 0) {
            county.append("<option id='chooseCounty' value='-1'>请选择区/县</option>");
        }


        var sb = new StringBuffer();

        $.each(self.cityJson,
            function (i, val) {
                if (val.item_code.substr(0, 2) == $("#province").val().substr(0, 2) && val.item_code.substr(2, 4) != '0000' && val.item_code.substr(4, 2) == '00') {
                    sb.append("<option value='" + val.item_code + "'>" + val.item_name + "</option>");
                }
            });
        $("#chooseCity").after(sb.toString());
    },
    doCityAndCountyRelation: function () {
        var self = this;
        var cityVal = $("#citys").val();
        var county = $("#county");
        if (county.children().length > 1) {
            county.empty();
        }
        if ($("#chooseCounty").length === 0) {
            county.append("<option id='chooseCounty' value='-1'>请选择区/县</option>");
        }
        var sb = new StringBuffer();

        $.each(self.cityJson,
            function (i, val) {

                if (cityVal == '110100' || cityVal == "120100" || cityVal == "310100" || cityVal == "500100") {
                    if (val.item_code.substr(0, 3) == cityVal.substr(0, 3) && val.item_code.substr(4, 2) != '00') {
                        sb.append("<option value='" + val.item_code + "'>" + val.item_name + "</option>");
                    }
                } else {
                    if (val.item_code.substr(0, 4) == cityVal.substr(0, 4) && val.item_code.substr(4, 2) != '00') {
                        sb.append("<option value='" + val.item_code + "'>" + val.item_name + "</option>");
                    }
                }
            });
        $("#chooseCounty").after(sb.toString());

    }


});

module.exports = SelectPluginView;



