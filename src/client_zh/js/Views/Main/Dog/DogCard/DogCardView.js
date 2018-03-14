/**
 * Created by json on 2017/11/22.
 */

var Backbone = require('backbone');
var _ = require('lodash');

var Utils = require('../../../../lib/utils');
var Const = require('../../../../lib/consts');
var Config = require('../../../../lib/init');

// load template
var template = require('./DogCard.hbs');

var DogCardView = Backbone.View.extend({

    el : null,
    initialize: function(options) {
        if(options== null){
            return;
        }
        this.el = options.el;
        this.render();
    },

    render: function() {
        $(this.el).html(template({

        }));

        this.onLoad();

        return this;

    },

    onLoad: function(){

        var self = this;

    },

    createCard:function (dogLicense) {
        console.log("--")
        console.log(dogLicense)
        console.log("--")
        var CardInfoView = require('./CardInfo/CardInfoView.js');
        var view = new CardInfoView({
            'el': ".manage_content",
            "dogLicense":dogLicense
        });
    }
});

module.exports = DogCardView;

