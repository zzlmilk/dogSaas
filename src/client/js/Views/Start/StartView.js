var Backbone = require('backbone');
var _ = require('lodash');

var Utils = require('../../lib/utils');
var Const = require('../../lib/consts');
var Config = require('../../lib/init');

// load template
var template = require('./Start.hbs');

var StartView = Backbone.View.extend({

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
       
        var SignInView = require('./SignIn/SignInView.js');
        var singInView = new SignInView({container: '#signin'});   

    }

});

module.exports = StartView;
