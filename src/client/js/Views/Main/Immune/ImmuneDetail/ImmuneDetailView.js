var Backbone = require('backbone');
var _ = require('lodash');

var Const = require('../../../../lib/consts');
var DogLicenseModel = require('../../../../Models/DogLicense.js');
var SelectPluginView = require("../../../Parts/selectPlugin/SelectPluginView");
var UploadView = require("../../../Parts/Upload/UploadView");
var UserClient = require("../../../../lib/APIClients/UserClient.js");
var CityJson = require('../../../Parts/selectPlugin/CityJson.js');//地区数据 回填
var StringBuffer = require('../../../Parts/selectPlugin/StringBuffer.js');
var OrganizationClient = require('../../../../lib/APIClients/OrganizationClient');
// load template
var template = require('./ImmuneDetail.hbs');

var ImmuneDetailView = Backbone.View.extend({

    el: null,
    self: null,
    dogLicense: null,
    initialize: function (options) {
        self = this;
        self.el = options.el;
        self.dogLicense = options.dogLicense;
        console.log("年审");
        console.log(self.dogLicense);

        this.render();
    },
    render: function () {
        $(self.el).html(template({}));
        //区域选择
        new SelectPluginView({
            el: "#orga_area"
        });

        OrganizationClient.show(
            //获取成功
            function (data) {
                console.log("------------------i");
                console.log(data);

            },
            //获取失败
            function (errorCode) {
                //错误回调
                console.log("cw-------------i");
                var sb = new StringBuffer();
                var doctor = errorCode.organization.veterinarians;
                $.each(doctor, function (i, val) {
                    sb.append("<option value='" + val.name + "'>" + val.name + "</option>");
                });

                $("#doctor_null").after(sb.toString());

                $("#organizationName").val(errorCode.organization.name)
            });
        this.onLoad();
        return this;
    },

    onLoad: function () {
        //数据回填
        this.setValue();
        //禁用输入 选择

        var d1 = $('#dogLicense_owner_div *');
        for (i = 0; i < d1.length; i++) {
            d1[i].disabled = true;
        }
        var d1 = $('#dogLicense_dog_div *');
        for (i = 0; i < d1.length; i++) {
            d1[i].disabled = true;
        }
        var d1 = $('#dogLicense_house_div *');
        for (i = 0; i < d1.length; i++) {
            d1[i].disabled = true;
        }

        //添加监听事件
        this.initEvent();

        /**
         * 非空验证
         * @returns {boolean}
         */
        var emptyValid = function () {
            falg = true;
            //条形码
            var barcode = $('#barcode').val();
            if (barcode == "") {
                falg = false;
                $("#barcode_null_tip").show();
            }
            /********************疫苗登记******************/
                //疫苗名称
            var vaccine_name = $('#vaccine_name').val();
            if (vaccine_name == "") {
                falg = false;
                $("#vaccine_name_null_tip").show();
            }
            //疫苗批号
            var vaccine_batch = $('#vaccine_batch').val();
            if (vaccine_batch == "") {
                falg = false;
                $("#vaccine_batch_null_tip").show();
            }
            //生产厂商
            var manuf = $('#manuf').val();
            if (manuf == "") {
                falg = false;
                $("#manuf_null_tip").show();
            }
            //兽医
            var doctor_name = $('#doctor_name').val();
            if (doctor_name == "") {
                falg = false;
                $("#doctor_name_null_tip").show();
            }

            return falg;
        };


        $('#post_info').unbind().on('click', function () {
            if (!emptyValid()) {
                return;
            }
            //免疫信息
            //赋值
            var vaccine = {
                name: $('#vaccine_name').val(),
                batchNo: $('#vaccine_batch').val(),
                manufacturer: $('#manuf').val(),
                veterinarianName: $('#doctor_name').val(),
                organizationName: $('#organizationName').val(),
                created: new Date().toLocaleDateString().split("/").join("-")
            };
            var dogLicenses = self.dogLicense;
            dogLicenses.dog.vaccine.push(vaccine);
            dogLicenses.husbandryNo = $('#barcode').val();
            dogLicenses.infoPreviewType = Const.infoPreviewType.AddVaccine;
            var InfoPreviewModal = require('../../../Modals/InfoPreview/InfoPreview');
            InfoPreviewModal.show(dogLicenses);
            //
            console.log("已弹窗");
            // console.log(dogLicenses.dog.vaccine);
            // dogLicenses.dog.vaccine.pop();
            // console.log(dogLicenses.dog.vaccine);
        });

        //取消添加免疫卡的通知
        Backbone.on(Const.infoPreviewAddVaccineCanel, function (obj) {
            self.dogLicense.dog.vaccine.pop();
        });
    },

    //初始化事件
    initEvent: function () {

        //条形码 失去焦点监听
        $("#barcode").blur(function () {
            var barcode = $('#barcode').val().trim();
            if (barcode == "") {
                $("#barcode_null_tip").show();
            } else {
                $("#barcode_null_tip").hide();
            }
        });

        /***********************疫苗登记***********************/
        //疫苗名称 失去焦点监听
        $("#vaccine_name").change(function () {
            var vaccine_name = $('#vaccine_name').val().trim();
            if (vaccine_name == "") {
                $("#vaccine_name_null_tip").show();
            } else {
                $("#vaccine_name_null_tip").hide();
            }
        });

        //疫苗批号 失去焦点监听
        $("#vaccine_batch").blur(function () {
            var vaccine_batch = $('#vaccine_batch').val().trim();
            if (vaccine_batch == "") {
                $("#vaccine_batch_null_tip").show();
            } else {
                $("#vaccine_batch_null_tip").hide();
            }
        });

        //生产厂商 失去焦点监听
        $("#manuf").blur(function () {
            var manuf = $('#manuf').val().trim();
            if (manuf == "") {
                $("#manuf_null_tip").show();
            } else {
                $("#manuf_null_tip").hide();
            }
        });

        //兽医 内容变化监听
        $("#doctor_name").change(function () {
            var doctor_name = $('#doctor_name').val().trim();
            if (doctor_name == "") {
                $("#doctor_name_null_tip").show();
            } else {
                $("#doctor_name_null_tip").hide();
            }
        });

    },


    //设置默认值
    setValue: function () {
        //条形码
        // $('#barcode').val(self.dogLicense.husbandryNo);
        //犬主姓名
        $('#dogowner_name').val(self.dogLicense.owner.name);
        //性别
        if (self.dogLicense.owner.sex == 1) {
            $("#gender_man").attr("checked", true);
            $("#gender_man").prop('checked', true);
        } else {
            $("#gender_woman").attr("checked", true);
            $("#gender_woman").prop('checked', true);
        }
        //犬主手机号码
        $("#phone").val(self.dogLicense.owner.phone);
        //犬主座机
        $("#tel").val(self.dogLicense.owner.tel);
        //证件号
        $('#cardtype').val(self.dogLicense.owner.certificateType);
        $('#id_number').val(self.dogLicense.owner.certificateCode);
        //所属省份

        $.each(CityJson,
            function (i, val) {
                if (val.item_code == self.dogLicense.owner.location.province) {
                    $("#province").val(val.item_code);
                    $("#province").change();
                }

                if (val.item_code == self.dogLicense.owner.location.district) {
                    $("#citys").val(val.item_code);
                    $("#citys").change();
                }

                if (val.item_code == self.dogLicense.owner.location.city) {
                    $("#county").val(val.item_code);
                }
            });
        //详细地址
        $('#address').val(self.dogLicense.owner.location.address);

        //邮编
        $('#postcode').val(self.dogLicense.owner.location.code);

        /******************犬只信息*********************/
        //犬名
        $('#dogname').val(self.dogLicense.dog.nickname);
        //犬只性别
        if (self.dogLicense.dog.sex == 1) {
            $("#doggender_male").attr("checked", true);
            $("#doggender_male").prop('checked', true);
        } else {
            $("#doggender_female").attr("checked", true);
            $("#doggender_female").prop('checked', true);
        }
        //毛色
        $('#dog_color').val(self.dogLicense.dog.hairColor);
        //犬只用途
        if (self.dogLicense.dog.usage == "警卫") {
            $("#police").attr("checked", true);
            $("#police").prop('checked', true);
        } else {
            $("#watch").attr("checked", true);
            $("#watch").prop('checked', true);
        }
        //品种
        $('#breed').val(self.dogLicense.dog.breed);

        //狗的图片
        $(".uploadWrap").hide();
        $("#imgs").append(" <img src=" + self.dogLicense.dog.photoUrl + " >");

        //生日
        $('#birth_date').val(self.dogLicense.dog.bornDate.substring(0, 10));

        //虹膜id
        $('#iris').val(self.dogLicense.vaccineCard.info.irisID);

        /********************疫苗登记******************/
        // var vaccine = self.dogLicense.dog.vaccine[0];
        //疫苗名称
        // $('#vaccine_name').val(vaccine.name);
        //
        // //疫苗批号
        // $('#vaccine_batch').val(vaccine.batchNo);
        //
        // //生产厂商
        // $('#manuf').val(vaccine.manufacturer);

        //兽医
        // $('#doctor_name').val(vaccine.veterinarianName);

        /******************房产信息********************/
        var residence = self.dogLicense.residence;
        if (residence == undefined) {
            return;
        }
        if (residence.houseProperty == "自由") {
            $("#owner").attr("checked", true);
            $("#owner").prop('checked', true);
        } else {
            $("#rent").attr("checked", true);
            $("#rent").prop('checked', true);
        }
        $("#houseNo").html(residence.houseNo);


        if (residence.isSterilization == 1) {
            $("#isSterilizationYes").attr("checked", true);
            $("#isSterilizationYes").prop('checked', true);
        } else {
            $("#isSterilizationNo").attr("checked", true);
            $("#isSterilizationNo").prop('checked', true);
        }
        $("#houseAddress").val(residence.address);
    },


});

module.exports = ImmuneDetailView;