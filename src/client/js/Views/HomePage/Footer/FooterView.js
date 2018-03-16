var Backbone = require('backbone');
var _ = require('lodash');

var Utils = require('../../../lib/utils');
var Const = require('../../../lib/consts');
var Config = require('../../../lib/init');

// load template
var template = require('./Footer.hbs');

var FooterView = Backbone.View.extend({
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


        //微信二维码
        $("#weixin").mouseover(function(){
            $("#qrcode").show();
        });
        $("#weixin").mouseout(function(){
            $("#qrcode").hide();
        });

        //语言切换
        $(".lang").click(function(){
            $(".lang_en").show();
        });
        $(".lang_en").mouseover(function(){
            $(".lang_en").show();
        });
        $(".lang_en").mouseout(function(){
            $(".lang_en").hide();
        });



    }

});

module.exports = FooterView;
