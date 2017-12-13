
var Backbone = require('backbone');
var _ = require('lodash');

var Utils = require('../../../../../lib/utils');
var Const = require('../../../../../lib/consts');
var Config = require('../../../../../lib/init');

// load template
var template = require('./DogOwnerList.hbs');

var DogOwnerListView = Backbone.View.extend({

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

        //点击查看详情进入详情页面
        $(".td-a").unbind().on("click", function () {
            var InfoPreviewModal = require('../../../../Modals/InfoPreview/InfoPreview.js');
            InfoPreviewModal.show(function(){

            });

        })





    }
});

module.exports = DogOwnerListView;

