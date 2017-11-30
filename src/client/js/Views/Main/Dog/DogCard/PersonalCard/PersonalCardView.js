/**
 * Created by json on 2017/11/28.
 */

var Backbone = require('backbone');
var _ = require('lodash');

var Utils = require('../../../../../lib/utils');
var Const = require('../../../../../lib/consts');
var Config = require('../../../../../lib/init');
var DogLicenseModel = require('../../../../../Models/DogLicense.js');
// load template
var template = require('./PersonalCard.hbs');

var PersonalCardView = Backbone.View.extend({


    el: null,
    initialize: function (options) {
        this.el = options.el;
        // this.render();
        $(this.el).html(template({}));
        this.onLoad();
    },

    onLoad: function () {
        var self = this;

        $('#post_info').unbind().on('click', function () {
            //验证非空
            if (!emptyValid()) {
                // return;
            }

            //赋值
            var dogLicenseModeldefaults = new DogLicenseModel({
                husbandryNo: $('#barcode').val(),
                dog: {
                    nickname: $('#dogname').val(),
                    sex: $("input[name='dog_gender']:checked").val(),
                    breed: $('#breed').val(),
                    usage: $("input[name='usage']:checked").val(),
                    hairColor: $('#dog_color').val(),
                    bornDate: $('#birth_date').val(),
                    irisID: $('#iris').val(),
                    photoUrl: $('#dog_img').val(),
                    vaccine: {
                        name: $('#vaccine_name').val(),
                        batchNo: $('#vaccine_batch').val(),
                        manufacturer: $('#manuf').val(),
                        veterinarianName: $('#doctor_name').val(),
                        organizationName: $('#organizationName').val()
                    }

                },
                owner: {
                    name: $('#dogowner_name').val(),
                    sex: $("input[name='gender']:checked").val(),
                    tel: $('#tel').val(),
                    phone: $('#phone').val(),
                    certificateType: $("input[name='cardtype']:checked").val(),
                    certificateCode: $('#id_number').val(),
                    province: $('#area_province').val(),
                    district: $('#area_city').val(),
                    city: $('#area_county').val(),
                    address: $('#address').val(),
                    code: $('#postcode').val(),

                },
                residence: {
                    houseNo: $('#barcode').val(),
                    houseProperty: $("input[name='houseProperty']:checked").val(),
                    address: $('#reg_address').val(),
                    isSterilization: $("input[name='isSterilization']:checked").val(),
                }
            });

            var InfoPreviewModal = require('../../../../Modals/InfoPreview/InfoPreview');
            InfoPreviewModal.show(dogLicenseModeldefaults);


        });

        //条形码 失去焦点监听
        $("#barcode").blur(function () {
            var barcode = $('#barcode').val().trim();
            if (barcode == "") {
                $("#barcode_null_tip").show();
            } else {
                $("#barcode_null_tip").hide();
            }
        });

        /**************************犬主登记****************************/
        //犬主姓名 失去焦点监听
        $("#dogowner_name").blur(function () {
            var dogowner_name = $('#dogowner_name').val().trim();
            if (dogowner_name == "") {
                $("#dogowner_name_null_tip").show();
            } else {
                $("#dogowner_name_null_tip").hide();
            }
        });

        //手机号 失去焦点监听
        $("#phone").blur(function () {
            var phone = $('#phone').val().trim();
            if (phone == "") {
                $("#phone_null_tip").show();
            } else {
                $("#phone_null_tip").hide();
            }
        });

        //证件类型 焦点监听
        $("input[name='cardtype']").click(function () {
            var cardtype = $("input[name='cardtype']:checked").val();
            if (cardtype == undefined) {
                $("#cardtype_null_tip").show();
            } else {
                $("#cardtype_null_tip").hide();
            }
        });

        //证件号 失去焦点监听
        $("#id_number").blur(function () {
            var id_number = $('#id_number').val().trim();
            if (id_number == "") {
                $("#id_number_null_tip").show();
            } else {
                $("#id_number_null_tip").hide();
            }
        });

        //所属区县 内容变化监听
        $("#area_county").change(function () {
            var area_county = $('#area_county').val().trim();
            if (area_county == "") {
                $("#area_null_tip").show();
            } else {
                $("#area_null_tip").hide();
            }
        });

        //详细地址 失去焦点监听
        $("#address").blur(function () {
            var address = $('#address').val().trim();
            if (address == "") {
                $("#address_null_tip").show();
            } else {
                $("#address_null_tip").hide();
            }
        });

        /***********************犬只登记**************************/
        //犬只性别 失去焦点监听
        $("input[name='dog_gender']").change(function () {
            var dog_gender = $("input[name='dog_gender']:checked").val();
            if (dog_gender == undefined) {
                $("#dog_gender_null_tip").show();
            } else {
                $("#dog_gender_null_tip").hide();

            }
        });

        //毛色 内容变化监听
        $("#dog_color").change(function () {
            var dog_color = $('#dog_color').val().trim();
            if (dog_color == "") {
                $("#dog_color_null_tip").show();
            } else {
                $("#dog_color_null_tip").hide();
            }
        });

        //品种 内容变化监听
        $("#breed").change(function () {
            var breed = $('#breed').val().trim();
            if (breed == "") {
                $("#breed_null_tip").show();
            } else {
                $("#breed_null_tip").hide();
            }
        });

        //虹膜id 失去焦点监听
        $("#iris").blur(function () {
            var iris = $('#iris').val().trim();
            if (iris == "") {
                $("#iris_null_tip").show();
            } else {
                $("#iris_null_tip").hide();
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


        var emptyValid = function () {
            falg = true;
            //条形码
            var barcode = $('#barcode').val();
            if (barcode == "") {
                falg = false;
                $("#barcode_null_tip").show();
            }
            //犬主姓名
            var dogowner_name = $('#dogowner_name').val();
            if (dogowner_name == "") {
                falg = false;
                $("#dogowner_name_null_tip").show();
            }
            //犬主手机号码
            var phone = $("#phone").val();
            if (phone == "") {
                falg = false;
                $("#phone_null_tip").show();
            }
            //证件类型
            var cardtype = $("input[name='cardtype']:checked").val();
            if (cardtype == undefined) {
                falg = false;
                $("#cardtype_null_tip").show();
            }
            //证件号
            var id_number = $('#id_number').val();
            if (id_number == "") {
                falg = false;
                $("#id_number_null_tip").show();
            }
            //所属区县
            var area_county = $('#area_county').val();
            if (area_county == "") {
                falg = false;
                $("#area_null_tip").show();
            }
            //详细地址
            var address = $('#address').val();
            if (address == "") {
                falg = false;
                $("#address_null_tip").show();
            }

            /******************犬只信息*********************/
                //犬只性别
            var dog_gender = $("input[name='dog_gender']:checked").val();
            if (dog_gender == undefined) {
                falg = false;
                $("#dog_gender_null_tip").show();
            }
            //毛色
            var dog_color = $('#dog_color').val();
            if (dog_color == "") {
                falg = false;
                $("#dog_color_null_tip").show();
            }
            //品种
            var breed = $('#breed').val();
            if (breed == "") {
                falg = false;
                $("#breed_null_tip").show();
            }
            //虹膜id
            var iris = $('#iris').val();
            if (iris == "") {
                falg = false;
                $("#iris_null_tip").show();
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
        }


    }

});

module.exports = PersonalCardView;

