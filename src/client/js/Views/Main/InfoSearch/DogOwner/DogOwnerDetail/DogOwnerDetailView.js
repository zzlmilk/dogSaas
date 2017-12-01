/**
 * Created by json on 2017/11/28.
 */

var Backbone = require('backbone');
var _ = require('lodash');

var Utils = require('../../../../../lib/utils');
var Const = require('../../../../../lib/consts');
var Config = require('../../../../../lib/init');

// load template
var template = require('./DogOwnerDetail.hbs');

var DogOwnerDetailView = Backbone.View.extend({

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

        $(".td-a").unbind().on("click", function () {
            alert('进入弹窗页面');
            // var InfoPreviewModal = require('../../../Modals/InfoPreview/InfoPreview');
            // InfoPreviewModal.show();
        })



    }
});

module.exports = DogOwnerDetailView;


