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
var SelectPluginView = require("../../../../Parts/selectPlugin/SelectPluginView");
var UploadView = require("../../../../Parts/Upload/UploadView");
var UserClient = require("../../../../../lib/APIClients/UserClient.js");
var CityJson = require('../../../../Parts/selectPlugin/CityJson.js');//地区数据 回填

var PersonalCardView = Backbone.View.extend({


    el: null,
    initialize: function (options) {
        this.el = options.el;
        // this.render();
        $(this.el).html(template({}));
        var area = new SelectPluginView({
            el: "#orga_area"
        })
        this.onLoad();
    },

    onLoad: function () {
        var self = this;

        new SelectPluginView({
            el: "#orga_area"
        });
        function initEvent() {
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

            //犬主性别 焦点监听
            $("input[name='gender']").click(function () {
                var gender = $("input[name='gender']:checked").val();
                if (gender == undefined) {
                    $("#gender_null_tip").show();
                } else {
                    $("#gender_null_tip").hide();
                }
            });

            //手机号 失去焦点监听
            $("#phone").blur(function () {
                var phone = $('#phone').val().trim();
                if (phone == "") {
                    $("#phone_null_tip").show();
                    $("#phone_format_tip").hide();
                    return;
                } else {
                    $("#phone_null_tip").hide();
                }

                if (!phone.match(/^1[3,5,7,8]\d{9}$/)) {
                    $("#phone_format_tip").show();
                } else {
                    $("#phone_format_tip").hide();
                }

            });

            //座机 失去焦点监听
            $("#tel").blur(function () {
                var tel = $('#tel').val().trim();
                if (tel == "") {
                    $("#tel_null_tip").show();
                } else {
                    $("#tel_null_tip").hide();
                }
            });

            //证件类型 焦点监听
            $("input[name='cardtype']").click(function () {
                var cardtype = $("input[name='cardtype']:checked").val();
                if (cardtype == undefined) {
                    $("#cardtype_null_tip").show();
                } else {
                    $("#cardtype_null_tip").hide();
                    //查询数据 (已选择类型并且证件号格式正确)
                    var id_number = $('#id_number').val().trim();
                    if (id_number.match(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/)) {
                        info();
                    }
                }
            });

            //证件号 失去焦点监听
            $("#id_number").blur(function () {

                var id_number = $('#id_number').val().trim();
                if (id_number == "") {
                    $("#id_number_null_tip").show();
                    $("#id_number_format_tip").hide();
                    return;
                } else {
                    $("#id_number_null_tip").hide();
                }

                if (!id_number.match(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/)) {
                    $("#id_number_format_tip").show();
                } else {
                    $("#id_number_format_tip").hide();
                    //查询数据 (已选择类型并且证件号格式正确)
                    var cardtype = $("input[name='cardtype']:checked").val();
                    if (cardtype != undefined) {
                        //查询数据
                        info();
                    }

                }
            });

            //省 内容变化监听
            $("#province").change(function () {
                var province = $('#province').val().trim();
                if (province == -1) {
                    $("#province_null_tip").show();
                } else {
                    $("#province_null_tip").hide();
                }
            });
            //所属区县 内容变化监听
            $("#citys").change(function () {
                var citys = $('#citys').val().trim();
                if (citys == -1) {
                    $("#citys_null_tip").show();
                } else {
                    $("#citys_null_tip").hide();
                }
            });
            //城市 内容变化监听
            $("#county").change(function () {
                var county = $('#county').val().trim();
                if (county == -1) {
                    $("#county_null_tip").show();
                } else {
                    $("#county_null_tip").hide();
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

                //房产证 地址信息同步
                if ($('#reg_addr_ck').is(':checked')) {
                    $("#reg_address").val(address);
                }
            });

            //邮编 失去焦点监听
            $("#postcode").blur(function () {
                var postcode = $('#postcode').val().trim();
                if (postcode == "") {
                    $("#postcode_null_tip").show();
                } else {
                    $("#postcode_null_tip").hide();
                }
            });


            /***********************犬只登记**************************/
            //犬名 失去焦点监听
            $("#dogname").blur(function () {
                var dogname = $('#dogname').val().trim();
                if (dogname == "") {
                    $("#dogname_null_tip").show();
                } else {
                    $("#dogname_null_tip").hide();
                }
            });
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

            //犬只用途 失去焦点监听
            $("input[name='usage']").change(function () {
                var usage = $("input[name='usage']:checked").val();
                if (usage == undefined) {
                    $("#usage_null_tip").show();
                } else {
                    $("#usage_null_tip").hide();
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

            //出生日期 内容变化监听
            $("#birth_date").change(function () {
                var birth_date = $('#birth_date').val().trim();
                if (birth_date == "") {
                    $("#birth_date_null_tip").show();
                } else {
                    $("#birth_date_null_tip").hide();
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

            //地址相同监听事件
            $("#reg_addr_ck").change(function () {
                if ($('#reg_addr_ck').is(':checked')) {
                    //赋值  不可修改
                    $("#reg_address").attr("disabled", true)
                    $("#reg_address").val($('#address').val().trim());
                } else {
                    //可修改
                    $("#reg_address").attr("disabled", false)
                }


            });
        }

        //添加监听事件
        initEvent();


        $('#post_info').unbind().on('click', function () {
            //验证非空
            if (!emptyValid()) {
                return;
            }

            //是否绝育
            var sterilization = $("input[name='isSterilization']:checked").val();
            var sterilizationText = function () {
                if (sterilization == undefined) {
                    return ""
                } else if (sterilization == 1) {
                    return "绝育"
                } else {
                    return "绝育"
                }
            }
            //赋值
            var dogLicenseModeldefaults = new DogLicenseModel({
                husbandryNo: $('#barcode').val(),
                dog: {
                    nickname: $('#dogname').val(),
                    sex: $("input[name='dog_gender']:checked").val(),
                    sexText: $("input[name='dog_gender']:checked").val() == 1 ? "雄" : "雌",
                    breed: $('#breed').val(),
                    usage: $("input[name='usage']:checked").val(),
                    hairColor: $('#dog_color').val(),
                    bornDate: $('#birth_date').val(),
                    irisID: $('#iris').val(),
                    photoUrl: $("#imgs img").attr("src"),
                    vaccine: {
                        name: $('#vaccine_name').val(),
                        batchNo: $('#vaccine_batch').val(),
                        manufacturer: $('#manuf').val(),
                        veterinarianName: $('#doctor_name').val(),
                        organizationName: $('#organizationName').val(),
                        date: new Date().toLocaleDateString()
                    }
                },
                owner: {
                    name: $('#dogowner_name').val(),
                    sex: $("input[name='gender']:checked").val(),
                    sexText: $("input[name='gender']:checked").val() == 1 ? "男" : "女",
                    tel: $('#tel').val(),
                    phone: $('#phone').val(),
                    certificateType: $("input[name='cardtype']:checked").val(),
                    certificateTypeText: $("input[name='cardtype']:checked").val() == 1 ? "身份证" : "护照",
                    certificateCode: $('#id_number').val(),
                    province: $('#province').val(),
                    provinceText: $("#province").find("option:selected").text(),
                    district: $('#citys').val(),
                    districtText: $("#citys").find("option:selected").text(),
                    city: $('#county').val(),
                    cityText: $("#county").find("option:selected").text(),
                    address: $('#address').val(),
                    code: $('#postcode').val(),

                },
                residence: {
                    houseNo: $('#house_area').val() + $('#house_year').val() + "年第" + $('#house_number').val() + "号",
                    houseProperty: $("input[name='houseProperty']:checked").val(),
                    address: $('#reg_address').val(),
                    isSterilization: sterilization,
                    isSterilizationText: sterilizationText,
                },
            });

            var InfoPreviewModal = require('../../../../Modals/InfoPreview/InfoPreview');
            InfoPreviewModal.show(dogLicenseModeldefaults);


        });


        /**
         * 非空验证
         * @returns {boolean}
         */
        function emptyValid() {
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
            //性别
            var gender = $("input[name='gender']:checked").val();
            if (gender == undefined) {
                falg = false;
                $("#gender_null_tip").show();
            }
            //犬主手机号码
            var phone = $("#phone").val();
            if (phone == "") {
                falg = false;
                $("#phone_null_tip").show();
            } else {
                if (!phone.match(/^1[3,5,7,8]\d{9}$/)) {
                    falg = false;
                    $("#phone_format_tip").show();
                }
            }
            //犬主座机
            var tel = $("#tel").val();
            if (tel == "") {
                falg = false;
                $("#tel_null_tip").show();
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
            } else {
                if (!id_number.match(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/)) {
                    falg = false;
                    $("#id_number_format_tip").show();
                }
            }
            //所属省份
            var province = $('#province').val().trim();
            if (province == -1) {
                falg = false;
                $("#province_null_tip").show();
            }
            //所属城市
            var citys = $('#citys').val().trim();
            if (citys == -1) {
                falg = false;
                $("#citys_null_tip").show();
            }
            //所属区/县
            var county = $('#county').val().trim();
            if (county == -1) {
                falg = false;
                $("#county_null_tip").show();
            }
            //详细地址
            var address = $('#address').val();
            if (address == "") {
                falg = false;
                $("#address_null_tip").show();
            }
            //邮编
            var postcode = $('#postcode').val();
            if (postcode == "") {
                falg = false;
                $("#postcode_null_tip").show();
            }

            /******************犬只信息*********************/
                //犬名
            var dogname = $('#dogname').val();
            if (dogname == "") {
                falg = false;
                $("#dogname_null_tip").show();
            }
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
            //犬只用途
            var usage = $("input[name='usage']:checked").val();
            if (usage == undefined) {
                falg = false;
                $("#usage_null_tip").show();
            }
            //品种
            var breed = $('#breed').val();
            if (breed == "") {
                falg = false;
                $("#breed_null_tip").show();
            }
            //许可证
            var imgs = $("#imgs img").attr("src");
            if (imgs == undefined) {
                falg = false;
                $("#imgs_null_tip").show();
            }

            //生日
            var birth_date = $('#birth_date').val();
            if (birth_date == "") {
                falg = false;
                $("#birth_date_null_tip").show();
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

        //上传图片控件
        new UploadView({
            el: "#collectimg"
        })

        //图片上传成功后的通知
        Backbone.on(Const.NotificationUploadImageDone, function (obj) {
            // console.log(obj)
            if (obj.name == "#imgs") {
                $("#imgs_null_tip").hide();
            }
        });

        //证件号信息查询
        function info() {
            UserClient.find(
                //狗证信息
                {
                    certificateType: $("input[name='cardtype']:checked").val(),
                    certificateCode: $('#id_number').val(),
                },
                //成功回调
                function (data) {
                    console.log(data)
                    var owner = data.Owner;
                    if (null != owner) {
                        if (confirm('是否加载犬主信息！ ') == true) {
                            console.log("数据回填")
                            $("#dogowner_name").val(owner.name)
                            if (owner.sex == 1) {
                                $("#gender_man").attr("checked", "checked");
                            } else {
                                $("#gender_woman").attr("checked", "checked");
                            }
                            $("#phone").val(owner.phone)
                            $("#tel").val(owner.tel)

                            $.each(CityJson,
                                function (i, val) {
                                    if (val.item_code == owner.location.province) {
                                        $("#province").val(val.item_code)
                                        $("#province").change()
                                    }

                                    if (val.item_code == owner.location.district) {
                                        $("#citys").val(val.item_code)
                                        $("#citys").change()
                                    }

                                    if (val.item_code == owner.location.city) {
                                        $("#county").val(val.item_code)
                                    }

                                });

                            $("#address").val(owner.location.address)
                            $("#postcode").val(owner.location.code)

                        } else {
                            console.log("数据不回填")

                        }
                    }
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

    }

});

module.exports = PersonalCardView;

