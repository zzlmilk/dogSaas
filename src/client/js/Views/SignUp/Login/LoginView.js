var Backbone = require('backbone');
var _ = require('lodash');

var Utils = require('../../../lib/utils');
var Const = require('../../../lib/consts');
var Config = require('../../../lib/init');

// load template
var template = require('./Login.hbs');

var LoginView = Backbone.View.extend({ 
	
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
       

    }

});

module.exports = LoginView;
