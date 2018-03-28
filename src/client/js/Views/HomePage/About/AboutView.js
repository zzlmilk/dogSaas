var Backbone = require('backbone');
var _ = require('lodash');

var Utils = require('../../../lib/utils');
var Const = require('../../../lib/consts');
var Config = require('../../../lib/init');

// load template
var template = require('./About.hbs');

var AboutView = Backbone.View.extend({
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

      $(".aboutDetail>.row>.col-md-3").mouseover(function(){
          $(this).css("background","#000");
          $(this).children("h3").css("color","#fff");
          $(this).children("p").css("color","#fff");
      });
        $(".aboutDetail>.row>.col-md-3").mouseout(function(){
            $(this).css("background","#fff");
            $(this).children("h3").css("color","#3399FF");
            $(this).children("p").css("color","#000");
        })




    }

});

module.exports = AboutView;
