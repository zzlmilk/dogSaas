var Backbone = require('backbone');
var _ = require('lodash');

var Utils = require('../../lib/utils');
var Const = require('../../lib/consts');
var Config = require('../../lib/init');

// load template
var template = require('./Footer.hbs');

var FooterView = Backbone.View.extend({

    initialize: function(options) {
        this.render();
    },

    render: function() {

        $(Config.defaultContaier).html(template({

        }));

        this.onLoad();

        return this;

    },

    onLoad: function(){

        $(".lang").click(function(){
            $(".lang_en").show();
        });
        $(".lang_en").mouseover(function(){
            $(".lang_en").show();
        });
        $(".lang_en").mouseout(function(){
            $(".lang_en").hide();
        });



    }

});

module.exports = FooterView;