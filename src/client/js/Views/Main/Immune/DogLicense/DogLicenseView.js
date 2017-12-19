var Backbone = require('backbone');
var _ = require('lodash');

var Utils = require('../../../../lib/utils');
var Const = require('../../../../lib/consts');
var Config = require('../../../../lib/init');

// load template
var template = require('./DogLicense.hbs');




var DogLicenseView = Backbone.View.extend({


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

        $('.td-a').unbind().on('click',function(){
            var ImmuneDetailView = require('../ImmuneDetail/ImmuneDetailView.js');
            var view = new ImmuneDetailView({
                'el': "#main-content"
            });

        });



    }

});

module.exports = DogLicenseView;
