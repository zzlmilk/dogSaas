/**
 * Created by json on 2017/11/24.
 */
var $ = require('jquery');
var _ = require('lodash');
var Backbone = require('backbone');
// var validator = require('validator');


var DogLicenseClient = require('../../../../../lib/APIClients/DogLicenseClient');
var Const = require('../../../../../lib/consts.js');

var Utils = require('../../../../../lib/utils.js');
var template = require('./ImmuneDialog.hbs');

var ImmuneDialog = {

    show: function (dogLicense) {
        var self = this;

        var annualDate = dogLicense.DogCard.info.annualDate
        date = annualDate[annualDate.length - 1]
        console.log(date)
        var dates = date.split("-")
        console.log(dates)
        dates[0] = parseInt(dates[0]) + 1
        var newDate = dates.join("-")
        dogLicense.newDate = newDate

        $('body').append(template({
            dogLicense: dogLicense
        }));

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
            // var dogLicense = dogLicenses[$(this).attr("value")];
            var id = dogLicense._id
            DogLicenseClient.annual({
                    dogLicenseId: id
                },
                //成功回调
                function (data) {
                    console.log("年审成功");
                    console.log(data);
                    //跳转到制卡
                    var CardInfoView = require('../DogCardInfo/CardInfoView.js');
                    var view = new CardInfoView({
                        'el': "#main-content",
                        "dogLicense": data.dogLicense
                    });

                },
                //失败回调
                function (errorCode) {
                    console.log(errorCode);
                    if (Const.ErrorCodes[errorCode]) {
                        var message = Const.ErrorCodes[errorCode]
                        alert(message)
                    }

                });

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

        })

        $('#modal-profile').modal('hide');
    },

}
module.exports = ImmuneDialog;