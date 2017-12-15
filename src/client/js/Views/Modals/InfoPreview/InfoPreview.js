/**
 * Created by json on 2017/11/27.
 * 狗证信息弹窗
 */
var $ = require('jquery');
var _ = require('lodash');
// var validator = require('validator');

var request = require('supertest');
var DogLicenseClient = require('../../../lib/APIClients/DogLicenseClient');

var Const = require('../../../lib/consts.js');

var Utils = require('../../../lib/utils.js');
var template = require('./InfoPreview.hbs');
// var UpdateProfileClient = require('../../../lib/APIClients/UpdateProfileClient');
// var loginUserManager = require('../../../lib/loginUserManager');


var InfoPreview = {

    DogLicenseModel: null,
    dog: null,
    dog_vaccine: null,
    owner: null,
    residence: null,

    show: function (dogLicenseModel) {
        var self = this;
        self.DogLicenseModel = dogLicenseModel;
        console.log("弹窗预览");
        console.log(self.DogLicenseModel);

        $('body').append(template({
            DogLicenseModel: self.DogLicenseModel
        }));
        $('#modal-profile').on('hidden.bs.modal', function (e) {
            $('#modal-profile').remove();
        });

        $('#modal-profile').on('show.bs.modal', function (e) {
        });

        $('#modal-profile').modal('show');
        $('#modal-btn-close').unbind().on('click', function () {
            self.hide();
        });

        //制卡
        $('#save_and_ccard').unbind().on('click', function () {

            if (self.DogLicenseModel.id) {
                //完善房产信息
                var residence = {
                    houseNo: self.DogLicenseModel.residence.houseNo,
                    houseProperty: self.DogLicenseModel.residence.houseProperty,
                    address: self.DogLicenseModel.residence.address,
                    isSterilization: self.DogLicenseModel.residence.isSterilization,
                };
                var houseInfo = {
                    dogLicenseId: self.DogLicenseModel.id,
                    residence: residence
                }
                console.log("完善房产信息");
                console.log(houseInfo);

                DogLicenseClient.editResidence(
                    //房产信息
                    houseInfo,
                    //成功回调
                    function (data) {
                        console.log("完善房产信息成功");
                        console.log(data);
                        self.hide();
                        var CardInfoView = require('../../Main/Dog/DogCard/CardInfo/CardInfoView.js');
                        var view = new CardInfoView({
                            'el': "#main-content",
                            "dogLicense": data.dogLicense
                        });

                    },
                    //失败回调
                    function (errorCode) {
                        console.log("办理狗证信息成功");
                        console.log(errorCode);
                        if (Const.ErrorCodes[errorCode]) {
                            var message = Const.ErrorCodes[errorCode];
                            alert(message)
                        }

                    });
            } else {
                DogLicenseClient.add(
                    //狗证信息
                    self.DogLicenseModel,
                    //成功回调
                    function (data) {
                        console.log(data.dogLicense[0]);
                        self.hide();
                        var CardInfoView = require('../../Main/Dog/DogCard/CardInfo/CardInfoView.js');
                        var view = new CardInfoView({
                            'el': "#main-content",
                            "dogLicense": data.dogLicense[0]
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
            }

        });

    },


    /**
     * 重新编辑
     * @param onFinish
     */
    hide: function (onFinish) {
        $('#modal-profile').on('hidden.bs.modal', function (e) {
            $('#modal-profile').remove();
            if (!_.isUndefined(onFinish)) {
                onFinish();
            }
        })

        $('#modal-profile').modal('hide');
    },


};
module.exports = InfoPreview;