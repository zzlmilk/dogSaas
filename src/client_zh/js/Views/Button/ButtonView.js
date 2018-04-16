var Backbone = require('backbone');
var _ = require('lodash');

var Utils = require('../../lib/utils');
var Const = require('../../lib/consts');
var Config = require('../../lib/init');

// load template
var template = require('./Button.hbs');

var ButtonView = Backbone.View.extend({

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



    }

});

module.exports = ButtonView;