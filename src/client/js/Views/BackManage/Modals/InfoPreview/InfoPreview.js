/**
 * Created by json on 2017/11/27.
 * 狗证信息弹窗
 */
var $ = require('jquery');
var _ = require('lodash');
// var validator = require('validator');
var Backbone = require('backbone');
var request = require('supertest');
var DogLicenseClient = require('../../../../lib/APIClients/DogLicenseClient');
var StringBuffer = require('../../Modals/selectPlugin/StringBuffer.js');
var CityJson = require('../../Modals/selectPlugin/CityJson.js');//地区数据 回填

var Const = require('../../../../lib/consts.js');

var Utils = require('../../../../lib/utils.js');
var template = require('./InfoPreview.hbs');
// var UpdateProfileClient = require('../../../../lib/APIClients/UpdateProfileClient');
// var loginUserManager = require('../../../../lib/loginUserManager');


var InfoPreview = {

    DogLicenseModel: null,
    dog: null,
    owner: null,
    residence: null,

    show: function (dogLicenseModel) {
        var self = this;
        $('body').append(template({}));
        self.DogLicenseModel = dogLicenseModel;
        setValue();

        function setValue() {
            $("#husbandryNo").html(self.DogLicenseModel.husbandryNo);
            $("#ownerName").html(self.DogLicenseModel.owner.name);
            $("#ownerPhone").html(self.DogLicenseModel.owner.phone);
            $("#ownerPhone2").html(self.DogLicenseModel.owner.phone2);

            console.log(self.DogLicenseModel.owner.email)
            $("#ownerEmail").html(self.DogLicenseModel.owner.email);
            $("#ownerTel").html(self.DogLicenseModel.owner.tel);
            $("#ownerSex").html(self.DogLicenseModel.owner.sex == 1 ? "男" : "女");
            $("#ownerCertificateType").html(self.DogLicenseModel.owner.certificateType == 1 ? "身份证" : "护照");
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
            $("#dogBornDate").html(self.DogLicenseModel.dog.bornDate.substring(0, 10));
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
                    "<td class='right_td'>" + val.created.substring(0, 10) + "</td>" +
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

        $('#modal-profile').modal({backdrop: 'static', keyboard: false});
        $('#modal-profile').on('hidden.bs.modal', function (e) {
            $('#modal-profile').remove();
            var type = self.DogLicenseModel.infoPreviewType
            if (type == Const.infoPreviewType.AddVaccine) {
                //如果有新的条形码就是新增免疫
                Backbone.trigger(Const.infoPreviewAddVaccineCanel, null);
            }
            console.log("页面关闭了-*-----");
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
            var type = self.DogLicenseModel.infoPreviewType
            if (type == Const.infoPreviewType.AddVaccine) {
                //如果有新的条形码就是新增免疫
                addVaccine();
            } else if (type == Const.infoPreviewType.ToCardInfo) {
                //信息查询 直接跳转到制卡页
                self.hide();
                toCardInfo();
            } else if (type == Const.infoPreviewType.PerfectResidence) {
                //完善房产信息
                perfectResidence();
            } else if (type == Const.infoPreviewType.AddDogLicense) {
                //添加狗证
                addDogLicense();
            }
        });


        //新增免疫
        function addVaccine() {
            console.log("新增免疫");
            var vac = self.DogLicenseModel.dog.vaccine;
            var size = vac.length;
            //免疫信息
            var vaccines = {
                husbandryNo: self.DogLicenseModel.husbandryNo,
                dogLicenseId: self.DogLicenseModel._id,
                vaccine: vac[size - 1],
            };
            console.log(vaccines);

            DogLicenseClient.addVaccine(
                //狗证信息
                vaccines,
                //成功回调
                function (data) {
                    console.log(data.dogLicense[0]);
                    self.hide();
                    var CardInfoView = require('../../Main/Manage/CardInfo/CardInfoView.js');
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

        //信息查询 跳转到制卡页
        function toCardInfo() {
            console.log("跳转到制卡页");
            var CardInfoView = require('../../Main/Manage/DogCardInfo/CardInfoView.js');
            var view = new CardInfoView({
                'el': "#main-content",
                "dogLicense": self.DogLicenseModel
            });
        }

        //完善房产信息
        function perfectResidence() {
            console.log("完善房产信息");
            var residence = {
                houseNo: self.DogLicenseModel.residence.houseNo,
                houseProperty: self.DogLicenseModel.residence.houseProperty,
                address: self.DogLicenseModel.residence.address,
                isSterilization: self.DogLicenseModel.residence.isSterilization,
            };
            var houseInfo = {
                dogLicenseId: self.DogLicenseModel._id,
                residence: residence
            }
            console.log(houseInfo);

            DogLicenseClient.editResidence(
                //房产信息
                houseInfo,
                //成功回调
                function (data) {
                    console.log("完善房产信息成功");
                    console.log(data);
                    self.hide();
                    var CardInfoView = require('../../Main/Manage/CardInfo/CardInfoView.js');
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
                        alert(message);
                    }

                });
        }

        //办理狗证
        function addDogLicense() {
            console.log("办理狗证");
            console.log(self.DogLicenseModel);
            DogLicenseClient.add(
                //狗证信息
                self.DogLicenseModel,
                //成功回调
                function (data) {
                    // console.log("添加成功------- ------")
                    // console.log(data)
                    // console.log(data.dogLicense[0]);
                    self.hide();
                    var CardInfoView = require('../../Main/Manage/DogCardInfo/CardInfoView');
                    var view = new CardInfoView({
                        'el': "#main-content",
                        "dogLicense": data.dogLicense,
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