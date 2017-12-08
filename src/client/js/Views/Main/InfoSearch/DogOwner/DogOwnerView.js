var Backbone = require('backbone');
var _ = require('lodash');

var Utils = require('../../../../lib/utils');
var Const = require('../../../../lib/consts');
var Config = require('../../../../lib/init');
var DogLicenseModel = require('../../../../Models/DogLicense.js');
var DogLicenseClient = require('../../../../lib/APIClients/DogLicenseClient');

// load template
var template = require('./DogOwner.hbs');

var DogOwnerView = Backbone.View.extend({


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

        function initEvent() {
            //手机号 失去焦点监听
            $("#phone").blur(function () {
                var phone = $('#phone').val().trim();
                if (phone != "") {
                    if (!phone.match(/^1[3,5,7,8]\d{9}$/)) {
                        $("#phone_format_tip").show();
                    } else {
                        $("#phone_format_tip").hide();
                    }
                } else {
                    $("#phone_format_tip").hide();
                }

            });
            //证件号 失去焦点监听
            $("#id_number").blur(function () {
                var id_number = $('#id_number').val().trim();
                if (id_number != "") {
                    if (!id_number.match(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/)) {
                        $("#id_number_format_tip").show();
                    } else {
                        $("#id_number_format_tip").hide();
                    }
                } else {
                    $("#id_number_format_tip").hide();
                }
            });
        }

        initEvent();

        var emptyValid = function () {
            var flag = true;
            //身份证格式验证
            var id_number = $("#id_number").val().trim();
            if (id_number != "") {
                if (!id_number.match(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/)) {
                    falg = false;
                    $("#id_number_format_tip").show();
                } else {
                    $("#id_number_format_tip").hide();
                }
            } else {
                $("#id_number_format_tip").hide();
            }
            //手机号格式验证
            var phone = $("#phone").val().trim();
            if (phone != "") {
                if (!phone.match(/^1[3,5,7,8]\d{9}$/)) {
                    falg = false;
                    $("#phone_format_tip").show();
                } else {
                    $("#phone_format_tip").hide();
                }
            } else {
                $("#phone_format_tip").hide();
            }
            //三个参数不能都为空
            var dogowner_name = $("#dogowner_name").val().trim();
            if (dogowner_name == "" && id_number == "" && phone == "") {
                flag = false;
                alert("请输入搜索条件！")
            }
            return flag;
        }

        //搜索
        $("#search").unbind().on('click', function () {
            //验证非空
            if (!emptyValid()) {
                return;
            }
            var owner = {
                name: $("#dogowner_name").val().trim()
            }
            // var owner = {
            //     name: $("#dogowner_name").val().trim(),
            //     phone: $("#phone").val().trim(),
            //     certificateType: $("#certificateType").val().trim(),
            //     certificateCode: $("#id_number").val().trim()
            // }
            console.log(owner);
            DogLicenseClient.findByOwner(owner,
                //成功回调
                function (data) {
                    console.log(data);
                },
                //失败回调
                function (errorCode) {
                    console.log(errorCode);
                    if (Const.ErrorCodes[errorCode]) {
                        var message = Const.ErrorCodes[errorCode]
                        alert(message)
                    }

                });


        });

        $(".td-a").unbind().on("click", function () {
            //赋值
            var dogLicenseModeldefaults = new DogLicenseModel({
                husbandryNo: "",
                dog: {
                    nickname: "",
                    sex: "",
                    breed: "",
                    usage: "",
                    hairColor: "",
                    bornDate: "",
                    irisID: "",
                    photoUrl: "",
                    vaccine: {
                        name: "",
                        batchNo: "",
                        manufacturer: "",
                        veterinarianName: "",
                        organizationName: "",
                    }

                },
                owner: {
                    name: "",
                    sex: "",
                    tel: "",
                    phone: "",
                    certificateType: "",
                    certificateCode: "",
                    province: "",
                    district: "",
                    city: "",
                    address: "",
                    code: "",

                },
                residence: {
                    houseNo: "",
                    houseProperty: "",
                    address: "",
                    isSterilization: ""
                }
            });
            var InfoPreviewModal = require('../../../Modals/InfoPreview/InfoPreview');
            InfoPreviewModal.show(dogLicenseModeldefaults);

        });

    }

});

module.exports = DogOwnerView;
