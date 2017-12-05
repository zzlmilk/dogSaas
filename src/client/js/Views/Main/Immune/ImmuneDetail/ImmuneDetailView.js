var Backbone = require('backbone');
var _ = require('lodash');

var Utils = require('../../../../lib/utils');
var Const = require('../../../../lib/consts');
var Config = require('../../../../lib/init');

// load template
var template = require('./ImmuneDetail.hbs');

var ImmuneDetailView = Backbone.View.extend({


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

        $('#post').unbind().on('click',function(){
            alert("Aa");
            var CardInfoView = require('../../Dog/DogCard/CardInfo/CardInfoView.js');
            var view = new CardInfoView({
                'el': "#immune_content"
            });

        });

    }

});

module.exports = ImmuneDetailView;
