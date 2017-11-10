var Backbone = require('backbone');
var _ = require('lodash');

var Utils = require('../../lib/utils');
var Const = require('../../lib/consts');
var Config = require('../../lib/init');

// load template
var template = require('./SignUp.hbs');

var WindowSizeManager = require('../../lib/windowSizeManager');

var AlertDialog = require('../Modals/AlertDialog/AlertDialog');




var SignUpView = Backbone.View.extend({

    el : null,


    initialize: function(options) {
        this.el = options.el;
        this.render();
    },

    render: function() {

        $(this.el).html(template());
        
        this.onLoad();
        
        return this; 

    },

    onLoad: function(){

        var self = this;
        
        var SignHeaderView = require('./SignHeader/SignHeaderView.js'); 
        var view = new SignHeaderView({
            'el': "#signheader-content"
        });

        

        var LoginView = require('./Login/LoginView.js'); 
        var view = new LoginView({
            'el': "#login-content"
        });
        
        var SignFooterView = require('./SignFooter/SignFooterView.js'); 
        var view = new SignFooterView({
            'el': "#signfooter-content"
        });

        // 监听事件
        _.debounce(function(){
            Backbone.trigger(Const.NotificationUpdateWindowSize,null);
        },100)();

    
    }

});

module.exports = SignUpView;
