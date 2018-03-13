var Backbone = require('backbone');
var _ = require('lodash');

var Utils = require('../../../lib/utils');
var Const = require('../../../lib/consts');
var Config = require('../../../lib/init');

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

        $('#news').unbind().on('click', function () {

            var NewsCenterView = require('../NewsCenter/NewsCenterView');

            var view = new NewsCenterView({
                'el': "#main-content"
            });

        });

        $('#personal_center').unbind().on('click', function () {

            var PersonalCenterView = require('../PersonalCenter/PersonalCenterView');

            var view = new PersonalCenterView({
                'el': "#main-content"
            });

        });


        $('#user_icon').mouseover(function () {
            $('#quit').slideDown();

        });
        $('#quit').mouseout(function () {
            $(this).slideUp(2000);

        });




    }

});

module.exports = HeaderView;
