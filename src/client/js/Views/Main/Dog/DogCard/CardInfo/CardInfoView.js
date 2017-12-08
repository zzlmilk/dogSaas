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
    self:null,
    el: null,
    dogLicense: null,
    districtText:null,
    initialize: function (options) {
        self=this;
        this.el = options.el;

        $.each(CityJson,
            function (i, val) {
                if (val.item_code == options.dogLicense.vaccineCard.info.district) {
                    options.dogLicense.vaccineCard.info.district = val.item_name;
                }
            });
        this.dogLicense = options.dogLicense;
        this.render();
    },

    render: function () {

        $(this.el).html(template({
            dogLicense: this.dogLicense,
            districtText: this.districtText
        }));

        this.onLoad();

        return this;

    },

    onLoad: function () {

        var self = this;


    }
});

module.exports = CardInfoView;

