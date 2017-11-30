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
        //$(".form_datetime").datetimepicker({
        //    format: "dd MM yyyy - hh:ii",
        //    autoclose: true,
        //    todayBtn: true,
        //    pickerPosition: "bottom-left"
        //});


        var PersonalCardView = require('./PersonalCard/PersonalCardView.js');
        var view = new PersonalCardView({
            'el': ".manage_content"
        });

    }
});

module.exports = DogCardView;

