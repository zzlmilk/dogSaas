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



        var PersonalCardView = require('./PersonalCard/PersonalCardView.js');
        var view = new PersonalCardView({
            'el': ".manage_content"
        });

        //个人办证
        $('#btn_person').unbind().on('click', function () {
            var PersonalCardView = require('./PersonalCard/PersonalCardView.js');
            var view = new PersonalCardView({
                'el': ".manage_content"
            });

        });
        //企业办证
        $('#btn_business').unbind().on('click', function () {
            var BusinessCardView = require('./BusinessCard/BusinessCardView.js');
            var view = new BusinessCardView({
                'el': ".manage_content"
            });

        });



    }
    ,
    createCard:function () {
        var CardInfoView = require('./CardInfo/CardInfoView.js');
        var view = new CardInfoView({
            'el': ".manage_content"
        });
    }
});

module.exports = DogCardView;

