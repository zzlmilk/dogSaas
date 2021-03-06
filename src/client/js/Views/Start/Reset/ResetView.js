var Backbone = require('backbone');
var template = require('./Reset.hbs');
var _ = require('lodash');
//var validator = require('validator');

var Utils = require('../../../lib/utils');
var Const = require('../../../lib/consts');
var Config = require('../../../lib/init');

var BaseView = require('../BaseView');

var template = require('./Reset.hbs');

var ResetView = BaseView.extend({

	 initialize: function(options) {
        
        
        this.render();
    },


    render: function() {
        
         $(Config.defaultContaier).html(template({
            
        }));


        var SignHeaderView = require('../../SignUp/SignHeader/SignHeaderView.js');
        var view = new SignHeaderView({
            'el': "#signheader-content"
        });

        var SignFooterView = require('../../SignUp//SignFooter/SignFooterView.js');
        var view = new SignFooterView({
            'el': "#signfooter-content"
        });

        this.onLoad();

        return this;




    },

     onLoad: function(){
     	var self = this;



     }



})



module.exports = ResetView;
