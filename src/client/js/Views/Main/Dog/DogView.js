var Backbone = require('backbone');
var _ = require('lodash');

var Utils = require('../../../lib/utils');
var Const = require('../../../lib/consts');
var Config = require('../../../lib/init');

// load template
var template = require('./DogList.hbs');

var DogView = Backbone.View.extend({

    el: null,
    initialize: function (options) {
        this.el = options.el;
        this.render();
    },

    render: function () {
        $(this.el).html(template({}));

        this.onLoad();

        return this;

    },

    onLoad: function () {

        var self = this;

        $('#btn-dogEdit').unbind().on('click', function () {

            var DogEditView = require('./DogEdit/DogEditView.js');
            var view = new DogEditView({
                'el': "#main-content"
            });


        });
        $('#btn_account').unbind().on('click', function () {

            var AddDoctorDialogModal = require('../../Modals/AddDoctorDialog/AddDoctorDialogView');
            AddDoctorDialogModal.show(function () {

            });

        });
        $('.delete').unbind().on('click', function () {

            var DeleteDoctorModal = require('../../Modals/DeleteDoctor/DeleteDoctorView');
            DeleteDoctorModal.show(function () {

            });

        });


    }

});

module.exports = DogView;
