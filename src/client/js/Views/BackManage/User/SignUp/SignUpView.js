var Backbone = require('backbone');
var _ = require('lodash');

var Utils = require('../../../../lib/utils');
var Const = require('../../../../lib/consts');
var Config = require('../../../../lib/init');

// load template
var template = require('./SignUp.hbs');

var WindowSizeManager = require('../../../../lib/windowSizeManager');

var AlertDialog = require('../../Modals/AlertDialog/AlertDialog');




var SignUpView = Backbone.View.extend({
    


    initialize: function(options) {        
        this.render();
    },

    render: function() {

        $(Config.defaultContaier).html(template());


                
        var SendEmailView = require('../SendEmail/SendEmailView.js');
        var view = new SendEmailView({
            'el': "#signup-content"
        });

        var SignHeaderView = require('../Header/HeaderView.js');
        var view = new SignHeaderView({
            'el': "#signheader-content"
        });

        var SignFooterView = require('../Footer/FooterView.js');
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

module.exports = SignUpView;
