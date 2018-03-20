/**
 * Created by json on 2017/11/13.
 */
var Backbone = require('backbone');
var _ = require('lodash');


var Utils = require('../../../../lib/utils');
var Const = require('../../../../lib/consts');
var Config = require('../../../../lib/init');


var template = require('./SetPassword.hbs');

var SetPasswordView = Backbone.View.extend({


    initialize: function(options) {


        this.render();
    },


    render: function() {

        $(Config.defaultContaier).html(template({

        }));


        var SignHeaderView = require('../Header/HeaderView.js');
        var view = new SignHeaderView({
            'el': "#signheader-content"
        });

        var SignFooterView = require('../Footer/FooterView.js');
        var view = new SignFooterView({
            'el': "#signfooter-content"
        });

        this.onLoad();

        return this;

    },


    onLoad: function(){


        var self = this;



    }

})



module.exports =SetPasswordView;



