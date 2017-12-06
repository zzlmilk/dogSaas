/**
 * Created by json on 2017/11/24.
 */
var Backbone = require('backbone');
var _ = require('lodash');

var Utils = require('../../../lib/utils');
var Const = require('../../../lib/consts');
var Config = require('../../../lib/init');

// load template
var template = require('./PersonalCenter.hbs');

var PersonalCenterView = Backbone.View.extend({

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

        $('#btn_account').unbind().on('click',function(){

            var AddDoctorDialogModal = require('../../Modals/AddDoctorDialog/AddDoctorDialogView');
            AddDoctorDialogModal.show(function(){

            });

        });

        $('.delete').unbind().on('click',function(){

            var DeleteDoctorModal = require('../../Modals/DeleteDoctor/DeleteDoctorView');
            DeleteDoctorModal.show(function(){

            });

        });


    }

});

module.exports = PersonalCenterView;
