var Backbone = require('backbone');
var _ = require('lodash');

var Utils = require('../../../lib/utils');
var Const = require('../../../lib/consts');
var Config = require('../../../lib/init');

// load template
var template = require('./InfoSearch.hbs');

var InfoSearchView = Backbone.View.extend({

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


        var DogOwnerView = require('./DogOwner/DogOwnerView.js');
        var view = new DogOwnerView({
            'el': ".infosearch_content"
        });

        //犬主查询
        $('#btn_dogowner').unbind().on('click', function () {
            var DogOwnerView = require('./DogOwner/DogOwnerView.js');
            var view = new DogOwnerView({
                'el': ".infosearch_content"
            });

        });
        //犬只查询
        $('#btn_dog').unbind().on('click', function () {
            var DogView = require('./Dog/DogView.js');
            var view = new DogView({
                'el': ".infosearch_content"
            });

        });


    }

});

module.exports = InfoSearchView;
