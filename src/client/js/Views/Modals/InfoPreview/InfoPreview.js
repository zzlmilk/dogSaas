/**
 * Created by json on 2017/11/27.
 * 狗证信息弹窗
 */
var $ = require('jquery');
var _ = require('lodash');
// var validator = require('validator');

var request = require('supertest');
var DogLicenseClient = require('../../../lib/APIClients/DogLicenseClient');
var StringBuffer = require('../../Parts/selectPlugin/StringBuffer.js');
var CityJson = require('../../Parts/selectPlugin/CityJson.js');//地区数据 回填

var Const = require('../../../lib/consts.js');

var Utils = require('../../../lib/utils.js');
var template = require('./InfoPreview.hbs');
// var UpdateProfileClient = require('../../../lib/APIClients/UpdateProfileClient');
// var loginUserManager = require('../../../lib/loginUserManager');


var InfoPreview = {

    DogLicenseModel: null,
    dog: null,
    owner: null,
    residence: null,

    show: function (dogLicenseModel) {
        var self = this;
        $('body').append(template({
            // DogLicenseModel: self.DogLicenseModel
        }));
        self.DogLicenseModel = dogLicenseModel;
        console.log("弹窗预览");
        console.log(self.DogLicenseModel);
        setValue();

        function setValue() {
            $("#husbandryNo").html(self.DogLicenseModel.husbandryNo);
            $("#ownerName").html(self.DogLicenseModel.owner.name);
            $("#ownerPhone").html(self.DogLicenseModel.owner.phone);
            $("#ownerTel").html(self.DogLicenseModel.owner.tel);
            $("#ownerSex").html(self.DogLicenseModel.owner.sex == 1 ? "男" : "女");
            $("#ownerCertificateType").html(self.DogLicenseModel.owner.certificateType) == 1 ? "身份证" : "护照";
            $("#ownerCertificateCode").html(self.DogLicenseModel.owner.certificateCode);
            $.each(CityJson,
                function (i, val) {
                    if (val.item_code == self.DogLicenseModel.owner.location.city) {
                        $("#ownerArea").html(val.item_name);
                    }
                });

            $("#ownerAddr").html(self.DogLicenseModel.owner.location.address);
            $("#ownerCode").html(self.DogLicenseModel.owner.location.code);

            $("#dogName").html(self.DogLicenseModel.dog.nickname);
            $("#dogSex").html(self.DogLicenseModel.dog.sex == 1 ? "雄" : "雌");
            $("#dogIrisId").html(self.DogLicenseModel.dog.irisID);
            $("#dogHairColor").html(self.DogLicenseModel.dog.hairColor);
            $("#dogUsage").html(self.DogLicenseModel.dog.usage);
            $("#dogBreed").html(self.DogLicenseModel.dog.breed);
            $("#dogBornDate").html(self.DogLicenseModel.dog.bornDate.substring(0,10));
            $("#dogPhotoUrl").attr("src", self.DogLicenseModel.dog.photoUrl);
            //免疫（循环打印）
            var sb = new StringBuffer();
            $.each(dogLicenseModel.dog.vaccine, function (i, val) {
                sb.append("<tr class='immune_tr' align='center'>" +
                    "<td class='left_td'>" + val.name + "</td>" +
                    "<td class='left_td'>" + val.batchNo + "</td>" +
                    "<td class='middle_td'>" + val.manufacturer + "</td>" +
                    "<td class='middle_td'>" + val.organizationName + "</td>" +
                    "<td class='right_td'>" + val.veterinarianName + "</td>" +
                    "<td class='right_td'>" + val.created.substring(0,10) + "</td>" +
                    "</tr>");
            });
            $("#vaccineTitle").after(sb.toString());

            var residence = self.DogLicenseModel.residence;
            if (residence != undefined) {
                var isSterilization = self.DogLicenseModel.residence.isSterilization;
                var isSterilizationText = "";
                if (isSterilization == undefined) {
                } else if (isSterilization == 1) {
                    isSterilizationText = "绝育"
                } else {
                    isSterilizationText = "未绝育"
                }
                $("#residenceIsSterilization").html(isSterilizationText);
                $("#residenceHouseProperty").html(self.DogLicenseModel.residence.houseProperty);
                $("#residenceHouseNo").html(self.DogLicenseModel.residence.houseNo);
                $("#residenceAddress").html(self.DogLicenseModel.residence.address);
            }
        }


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
            console.log(self.DogLicenseModel);
            if(self.DogLicenseModel.DogCard){
                //信息查询 直接跳转到制卡页
                self.hide();
                var CardInfoView = require('../../Main/Dog/DogCard/CardInfo/CardInfoView.js');
                var view = new CardInfoView({
                    'el': "#main-content",
                    "dogLicense": self.DogLicenseModel
                });
            }else if (self.DogLicenseModel.id) {
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
                        console.log("办理狗证信息失败");
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