var Backbone = require('backbone');
var _ = require('lodash');

var Utils = require('../../../lib/utils');
var Const = require('../../../lib/consts');
var Config = require('../../../lib/init');

// load template
var template = require('./Employ.hbs');

var EmployView = Backbone.View.extend({
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


        $(document).ready(function(){
            $(".col-md-12").hide();
            $(".job").each(function(){
                $(this).click(function(){
                    $(this).parent(".row").children(".col-md-12").slideToggle();
                    $(this).parent(".row").siblings(".row").children(".col-md-12").slideUp();
                    $(this).children("i").toggleClass("u-arrow-up");
                    $(this).parent(".row").siblings(".row").children(".job").children("i").removeClass("u-arrow-up");
                    return false;
                });
            })

        });






    }

});

module.exports = EmployView;
