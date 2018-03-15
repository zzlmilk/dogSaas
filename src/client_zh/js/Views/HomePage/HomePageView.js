var Backbone = require('backbone');
var _ = require('lodash');

var Utils = require('../../lib/utils');
var Const = require('../../lib/consts');
var Config = require('../../lib/init');

// load template
var template = require('./HomePage.hbs');

var HomePageView = Backbone.View.extend({

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

        var NavView = require('../Nav/NavView.js');
        var NavView = new NavView({
            'el': "#header-content"
        });

        var HomeMainView = require('../HomeMain/HomeMainView.js');
        var HomeMainView = new HomeMainView({
            'el': "#main-content"
        });

        var FooterView = require('../Footer/FooterView.js');
        var FooterView = new FooterView({
            'el': "#footer-content"
        });
    }

});

module.exports = HomePageView;
