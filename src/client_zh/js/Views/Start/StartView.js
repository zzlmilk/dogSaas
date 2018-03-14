var Backbone = require('backbone');
var _ = require('lodash');

var Utils = require('../../lib/utils');
var Const = require('../../lib/consts');
var Config = require('../../lib/init');

// load template
var template = require('./Start.hbs');

var StartView = Backbone.View.extend({

    action:null,

    initialize: function(options) {

        var self = this;

        self.render();
    },
    
    render: function() {	

        $(Config.defaultContaier).html(template({
        	   
        }));



        var SignInView = require('./SignIn/SignInView.js');
        var view = new SignInView({
            container: '#start-view-content'
        });



        var SignHeaderView = require('../SignUp/SignHeader/SignHeaderView.js');
        var view = new SignHeaderView({
            'el': "#signheader-content"
        });

        var SignFooterView = require('../SignUp//SignFooter/SignFooterView.js');
        var view = new SignFooterView({
            'el': "#signfooter-content"
        });

        this.onLoad();

        return this;

    },

    onLoad: function(){

        var self = this;  


    }

});

module.exports = StartView;
