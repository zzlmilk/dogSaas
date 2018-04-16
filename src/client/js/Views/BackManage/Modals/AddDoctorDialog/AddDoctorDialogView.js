/**
 * Created by json on 2017/11/24.
 */
var $ = require('jquery');
var _ = require('lodash');
var Backbone = require('backbone');
// var validator = require('validator');

var Const = require('../../../../lib/consts.js');

var Utils = require('../../../../lib/utils.js');
var template = require('./AddDoctorDialog.hbs');
// var UpdateProfileClient = require('../../../../lib/APIClients/UpdateProfileClient');
// var loginUserManager = require('../../../../lib/loginUserManager');

var AddDoctorDialog = {

    show: function () {
        var self = this;
        $('body').append(template({}));

        $('#modal-profile').modal({backdrop: 'static', keyboard: false});
        $('#modal-profile').on('hidden.bs.modal', function (e) {
            $('#modal-profile').remove();
        })

        $('#modal-profile').on('show.bs.modal', function (e) {
        })

        $('#modal-profile').modal('show');

        $('#modal-btn-close').unbind().on('click', function () {
            self.hide();
        });

        $('#modal-btn-save').unbind().on('click', function () {
            var dname1 = $("#dname1").val().trim();
            if (dname1 == "") {
                $("#dname1_null_tip").show();
                return;
            } else {
                $("#dname1_null_tip").hide();
            }
            var dname2 = $("#dname2").val().trim();
            if (dname2 == "") {
                $("#dname2_null_tip").show();
                return;
            } else {
                $("#dname2_null_tip").hide();
            }
            var dcode = $("#dcode").val().trim();
            if (dcode == "") {
                $("#dcode_null_tip").show();
                return;
            } else {
                $("#dcode_null_tip").hide();
            }
            //传值给打开的页面
            var obj = {
                name: dname1 +" "+dname2,
                code: dcode
            }

            console.log(obj)
            Backbone.trigger(Const.NotificationAddDoctorDone, obj);
            self.hide();
        });
    },


    hide: function (onFinish) {
        $('#modal-profile').on('hidden.bs.modal', function (e) {
            $('#modal-profile').remove();
            if (!_.isUndefined(onFinish)) {

                onFinish();
            }
            console.log("弹窗关闭")
            Backbone.trigger(Const.NotificationAddDoctorDone, null);
        })

        $('#modal-profile').modal('hide');
    },

}
module.exports = AddDoctorDialog;