var Backbone = require('backbone');
var _ = require('lodash');

var Utils = require('../../../../lib/utils');
var Const = require('../../../../lib/consts');
var Config = require('../../../../lib/init');

// load template
var template = require('./Footer.hbs');

var FooterView = Backbone.View.extend({

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
        // if(window.scrollTop>0){
        //     console.log("navbar-fixed-bottom  滚动条")
        // }
        // $(window).scrollTop(1)
        // if($(window).scrollTop()>0 ){
        //     console.log("有滚动条")
        //     $("#bottom").removeClass("navbar-fixed-bottom")
        // }else{
        //     console.log("mei有滚动条")
        //
        //     $("#bottom").addClass("navbar-fixed-bottom")
        // }
        // $(window).scrollTop(0);//滚动条返回顶部
        // console.log($(window).scrollTop())
    }

});
module.exports = FooterView;
