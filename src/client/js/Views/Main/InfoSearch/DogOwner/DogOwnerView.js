var Backbone = require('backbone');
var _ = require('lodash');

var Utils = require('../../../../lib/utils');
var Const = require('../../../../lib/consts');
var Config = require('../../../../lib/init');

// load template
var template = require('./DogOwner.hbs');

var DogOwnerView = Backbone.View.extend({


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

        // var DogOwnerListView = require('./DogOwnerList/DogOwnerListView.js');
        // var view = new DogOwnerListView({
        //     'el': "#dogonwer_info"
        // });



    }

});

module.exports = DogOwnerView;
