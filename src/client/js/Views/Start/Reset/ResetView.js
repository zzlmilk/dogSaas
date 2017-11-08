var Backbone = require('backbone');
var template = require('./Reset.hbs');
var _ = require('lodash');
//var validator = require('validator');

var Utils = require('../../../lib/utils');
var Const = require('../../../lib/consts');
var Config = require('../../../lib/init');

var BaseView = require('../BaseView');



var ResetView = BaseView.extend({

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



module.exports = ResetView;
