var Backbone = require('backbone');
var _ = require('lodash');

var Utils = require('../js/lib/Utils');
var Const = require('../js/lib/consts');
var Config = require('../js/lib/init');

// load template
var template = require('./Admin.hbs');

var AdminView = Backbone.View.extend({

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

        var self = this;



    }

})

module.exports = AdminView;
