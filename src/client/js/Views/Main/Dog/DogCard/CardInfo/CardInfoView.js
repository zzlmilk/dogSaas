/**
 * Created by json on 2017/11/28.
 */


var Backbone = require('backbone');
var _ = require('lodash');

var Utils = require('../../../../../lib/utils');
var Const = require('../../../../../lib/consts');
var Config = require('../../../../../lib/init');

// load template
var template = require('./CardInfo.hbs');

var CardInfoView = Backbone.View.extend({

    el: null,
    dogLicense: null,
    initialize: function (options) {
        this.el = options.el;
        this.dogLicense = options.dogLicense;
        this.render();
    },

    render: function () {
        $(this.el).html(template({
            dogLicense:this.dogLicense
        }));

        this.onLoad();

        return this;

    },

    onLoad: function () {

        var self = this;


    }
});

module.exports = CardInfoView;

