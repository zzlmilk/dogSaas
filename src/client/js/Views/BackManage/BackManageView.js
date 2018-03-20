var Backbone = require('backbone');
var _ = require('lodash');

var Utils = require('../../lib/utils');
var Const = require('../../lib/consts');
var Config = require('../../lib/init');

// load template
var template = require('./BackManage.hbs');

var WindowSizeManager = require('../../lib/windowSizeManager');

var AlertDialog = require('./Modals/AlertDialog/AlertDialog');

var loginUserManager = require('../../lib/loginUserManager')




var MainView = Backbone.View.extend({

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


        var HeaderView = require('./Main/Header/HeaderView.js');
        var view = new HeaderView({
            'el': "#header-content"
        });


        var SidebarView = require('./Main/Sidebar/SidebarView.js');
        var view = new SidebarView({
            'el': "#sidebar-content"
        });


        // 监听事件
        _.debounce(function(){
            Backbone.trigger(Const.NotificationUpdateWindowSize,null);
        },100)();

    
    }

});

module.exports = MainView;
