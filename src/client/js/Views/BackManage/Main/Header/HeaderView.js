var Backbone = require('backbone');
var _ = require('lodash');

var Utils = require('../../../../lib/utils');
var Const = require('../../../../lib/consts');
var Config = require('../../../../lib/init');

// load template
var template = require('./Header.hbs');
// var SelectUserBox = require('../Parts/SelectUserBox/SelectUserBox');
//var AlertDialog = require('../Modals/AlertDialog/AlertDialog');


var HeaderView;
HeaderView = Backbone.View.extend({

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

    onLoad: function () {

        var self = this;



        $('#personal_center').unbind().on('click', function () {

            var PersonalCenterView = require('../../User/PersonalCenter/PersonalCenterView');

            var view = new PersonalCenterView({
                'el': "#main-content"
            });

        });


        $('#user_icon').mouseover(function () {
            $('#quit').stop().slideDown();

        });
        $('#quit').mouseout(function () {
            $(this).stop().slideUp(2000);

        });




    }

});

module.exports = HeaderView;
