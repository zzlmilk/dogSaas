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

        $('#change_password').unbind().on('click',function(){
            alert("进入修改页面");
            var ChangePasswordView = require('./ChangePassword/ChangePasswordView.js');
            var view = new ChangePasswordView({
                'el': "#change_password_view"
            });


        });

    }

});

module.exports = PersonalCenterView;
