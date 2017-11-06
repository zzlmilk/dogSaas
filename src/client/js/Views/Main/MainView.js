var Backbone = require('backbone');
var _ = require('lodash');

var Utils = require('../../lib/utils');
var Const = require('../../lib/consts');
var Config = require('../../lib/init');

// load template
var template = require('./Main.hbs');

var WindowSizeManager = require('../../lib/windowSizeManager');

var AlertDialog = require('../Modals/AlertDialog/AlertDialog');


// var HeaderView = require('../Header/Header');
// var SideView = require('../Side/SideView')


var MainView = Backbone.View.extend({

    headerView : null,
    SideView:null,


    initialize: function(options) {
        this.render();
    },

    render: function() {

        $(Config.defaultContaier).html(template({
          Config:Config
        }));
        
        WindowSizeManager.init();

        this.onLoad();
        
        return this;

    },

    onLoad: function(){

        var self = this;

         AlertDialog.show("Api Error","message");



        // 监听事件
        _.debounce(function(){
            Backbone.trigger(Const.NotificationUpdateWindowSize,null);
        },100)();




    
    }

});

module.exports = MainView;
