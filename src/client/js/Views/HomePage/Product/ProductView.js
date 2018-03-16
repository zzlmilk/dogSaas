var Backbone = require('backbone');
var _ = require('lodash');

var Utils = require('../../../lib/utils');
var Const = require('../../../lib/consts');
var Config = require('../../../lib/init');

// load template
var template = require('./Product.hbs');

var ProductView = Backbone.View.extend({
    el: null,
    initialize: function (options) {
        this.el = options.el;
        this.render();
    },

    render: function () {

        $(this.el).html(template());

        this.onLoad();

        return this;

    },

    onLoad: function(){

        //产品优势
        $(".tips").each(function(){
            $(this).mouseover(function () {
                $(this).stop().animate({top:"0px"},"slow");
            });
            $(this).mouseout(function () {
                $(this).stop().animate({top:"300px"});
            });
        });




    }

});

module.exports = ProductView;
