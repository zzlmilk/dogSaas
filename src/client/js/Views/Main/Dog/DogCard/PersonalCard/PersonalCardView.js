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
var DogBreed = require('./DogBreed.js');//宠物品种
var StringBuffer = require('../../../../Parts/selectPlugin/StringBuffer.js');
var OrganizationClient = require('../../../../../lib/APIClients/OrganizationClient');

var PersonalCardView = Backbone.View.extend({
        el: null,
        self: null,
        dogLicense: null,
        initialize: function (options) {
            self = this;
            self.el = options.el;
            self.dogLicense = options.dogLicense;
            this.render();
        },
        render: function () {
            $(self.el).html(template({}));
            //区域选择
            new SelectPluginView({
                el: "#orga_area"
            });
            //上传图片控件
            new UploadView({
                el: "#imgs"
            });
            //初始化狗的品种
            var sb = new StringBuffer();
            $.each(DogBreed,
                function (i, val) {
                    sb.append("<option value='" + val.breed_name + "'>" + val.breed_name + "</option>");
                });
            $("#breed_null").after(sb.toString());

            $('.form_date').datetimepicker({
                language: "zh-CN",
                weekStart: 1,
                todayBtn: 1,
                autoclose: 1,
                todayHighlight: 1,
                startView: 2,
                minView: 2,
                forceParse: 0,
                pickerPosition: "bottom-right"
            });
            this.onLoad();
            return this;
        },

        onLoad: function () {

            //如果狗证信息不为空 完善房产信息
            if (self.dogLicense != null) {
                //数据回填
                this.setValue();
                //禁用输入 选择
                var d1 = $('#dogLicense_barcode_div *');
                for (i = 0; i < d1.length; i++) {
                    d1[i].disabled = true;
                }
                var d1 = $('#dogLicense_owner_div *');
                for (i = 0; i < d1.length; i++) {
                    d1[i].disabled = true;
                }
                var d1 = $('#dogLicense_dog_div *');
                for (i = 0; i < d1.length; i++) {
                    d1[i].disabled = true;
                }
                var d1 = $('#dogLicense_vaccine_div *');
                for (i = 0; i < d1.length; i++) {
                    d1[i].disabled = true;
                }


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
                } else {
                    $("#birth_date_null_tip").hide();
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
            };
            /**
             * 非空房产信息验证
             * @returns {boolean}
             */
            var emptyHouseValid = function () {
                falg = true;

                //产权性质
                var houseProperty = $("input[name='houseProperty']:checked").val();
                if (houseProperty == undefined) {
                    falg = false;
                    $("#houseProperty_null_tip").show();
                }

                //房产证号
                var house_area = $("#house_area").val();
                if (house_area == "") {
                    falg = false;
                    $("#houseid_null_tip").show();
                }
                var house_year = $("#house_year").val();
                if (house_year == "") {
                    falg = false;
                    $("#houseid_null_tip").show();
                }
                var house_number = $("#house_number").val();
                if (house_number == "") {
                    falg = false;
                    $("#houseid_null_tip").show();
                }

                //是否绝育
                var isSterilization = $("input[name='isSterilization']:checked").val();
                if (isSterilization == undefined) {
                    falg = false;
                    $("#isSterilization_null_tip").show();
                }
                //登记地址
                var reg_address = $("#reg_address").val();
                if (reg_address == "") {
                    falg = false;
                    $("#reg_address_null_tip").show();
                }
                return falg;
            };

            $('#post_info').unbind().on('click', function () {
                //完善房产信息
                if (self.dogLicense != null) {
                    //验证房产信息
                    if (!emptyHouseValid()) {
                        return;
                    }
                } else {
                    //验证非空
                    if (!emptyValid()) {
                        return;
                    }
                }

                //是否绝育
                var sterilization = $("input[name='isSterilization']:checked").val();
                //房产证号
                var house_area = $('#house_area').val().trim();
                var house_year = $('#house_year').val().trim();
                var house_number = $('#house_number').val().trim();
                var houseId = "";
                if (house_area != "" && house_year != "" && house_number != "") {
                    houseId = house_area + house_year + "年第" + house_number + "号"
                }

                //赋值
                var dogLicenseModeldefaults = new DogLicenseModel();

                if (self.dogLicense != null) {
                    console.log("完善房产");
                    var dogLicenses = {
                        id: self.dogLicense._id,
                        husbandryNo: $('#barcode').val(),
                        dog: {
                            nickname: $('#dogname').val(),
                            sex: $("input[name='dog_gender']:checked").val(),
                            breed: $('#breed').find("option:selected").text(),
                            usage: $("input[name='usage']:checked").val(),
                            hairColor: $('#dog_color').find("option:selected").text(),
                            bornDate: $('#birth_date').val(),
                            irisID: $('#iris').val(),
                            photoUrl: $("#imgs img").attr("src"),
                            vaccine: [{
                                name: $('#vaccine_name').find("option:selected").text(),
                                batchNo: $('#vaccine_batch').val(),
                                manufacturer: $('#manuf').val(),
                                veterinarianName: $('#doctor_name').find("option:selected").text(),
                                organizationName: $('#organizationName').val(),
                                created: new Date().toLocaleDateString()
                            }]
                        },
                        owner: {
                            name: $('#dogowner_name').val(),
                            sex: $("input[name='gender']:checked").val(),
                            tel: $('#tel').val(),
                            phone: $('#phone').val(),
                            certificateType: $('#cardtype').val(),
                            certificateCode: $('#id_number').val(),
                            location: {
                                province: $('#province').val(),
                                district: $('#citys').val(),
                                city: $('#county').val(),
                                address: $('#address').val(),
                                code: $('#postcode').val(),
                            }
                        },
                        residence: {
                            houseNo: houseId,
                            houseProperty: $("input[name='houseProperty']:checked").val(),
                            address: $('#reg_address').val(),
                            isSterilization: sterilization,
                        },
                    };
                    dogLicenseModeldefaults = $.parseJSON(JSON.stringify(dogLicenses));
                } else {
                    console.log("办理狗证");
                    var dogLicenses = {
                        husbandryNo: $('#barcode').val(),
                        dog: {
                            nickname: $('#dogname').val(),
                            sex: $("input[name='dog_gender']:checked").val(),
                            breed: $('#breed').val(),
                            usage: $("input[name='usage']:checked").val(),
                            hairColor: $('#dog_color').val(),
                            bornDate: $('#birth_date').val(),
                            irisID: $('#iris').val(),
                            photoUrl: $("#imgs img").attr("src"),
                            vaccine: [{
                                name: $('#vaccine_name').val(),
                                batchNo: $('#vaccine_batch').val(),
                                manufacturer: $('#manuf').val(),
                                veterinarianName: $('#doctor_name').val(),
                                organizationName: $('#organizationName').val(),
                                created: new Date().toLocaleDateString()
                            }]
                        },
                        owner: {
                            name: $('#dogowner_name').val(),
                            sex: $("input[name='gender']:checked").val(),
                            tel: $('#tel').val(),
                            phone: $('#phone').val(),
                            certificateType: $('#cardtype').val(),
                            certificateCode: $('#id_number').val(),
                            location: {
                                province: $('#province').val(),
                                district: $('#citys').val(),
                                city: $('#county').val(),
                                address: $('#address').val(),
                                code: $('#postcode').val(),
                            }
                        },
                        residence: {
                            houseNo: houseId,
                            houseProperty: $("input[name='houseProperty']:checked").val(),
                            address: $('#reg_address').val(),
                            isSterilization: sterilization,
                        },
                    };
                    dogLicenseModeldefaults = $.parseJSON(JSON.stringify(dogLicenses));
                }
                console.log(dogLicenseModeldefaults);
                var InfoPreviewModal = require('../../../../Modals/InfoPreview/InfoPreview');
                InfoPreviewModal.show(dogLicenseModeldefaults);
            });


            //图片上传成功后的通知
            Backbone.on(Const.NotificationUploadImageDone, function (obj) {
                // console.log(obj)
                if (obj.name == "#imgs") {
                    $("#imgs_null_tip").hide();
                }
            });


            OrganizationClient.show(
                //获取成功
                function (data) {
                    console.log("------------------");
                    console.log(data);

                },
                //获取失败
                function (errorCode) {
                    //错误回调
                    console.log("cw-------------");
                    var sb = new StringBuffer();
                    var doctor = errorCode.organization.veterinarians;
                    $.each(doctor, function (i, val) {
                        sb.append("<option value='" + val.name + "'>" + val.name + "</option>");
                    });

                    $("#doctor_null").after(sb.toString());

                    $("#organizationName").val(errorCode.organization.name)
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
            //品种 内容变化监听
            $("#cardtype").change(function () {
                //查询数据 (已选择类型并且证件号格式正确)
                var id_number = $('#id_number').val().trim();
                if (id_number.match(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/)) {
                    info();
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
                    info();
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
                    $("#reg_address_null_tip").hide();
                } else {
                    //可修改
                    $("#reg_address").attr("disabled", false)
                }
            });

            /******************房产信息******************/
            //产权性质 焦点监听
            $("input[name='houseProperty']").click(function () {
                var houseProperty = $("input[name='houseProperty']:checked").val();
                if (houseProperty == undefined) {
                    $("#houseProperty_null_tip").show();
                } else {
                    $("#houseProperty_null_tip").hide();
                }
            });

            //房产证号
            $("#house_area").change(function () {
                var house_area = $('#house_area').val().trim();
                var house_year = $('#house_year').val().trim();
                var house_number = $('#house_number').val().trim();
                if (house_area == "" || house_year == "" || house_number == "") {
                    $("#houseid_null_tip").show();
                } else {
                    $("#houseid_null_tip").hide();
                }
            });
            $("#house_year").blur(function () {
                var house_area = $('#house_area').val().trim();
                var house_year = $('#house_year').val().trim();
                var house_number = $('#house_number').val().trim();
                if (house_area == "" || house_year == "" || house_number == "") {
                    $("#houseid_null_tip").show();
                } else {
                    $("#houseid_null_tip").hide();
                }
            });
            $("#house_number").blur(function () {
                var house_area = $('#house_area').val().trim();
                var house_year = $('#house_year').val().trim();
                var house_number = $('#house_number').val().trim();
                if (house_area == "" || house_year == "" || house_number == "") {
                    $("#houseid_null_tip").show();
                } else {
                    $("#houseid_null_tip").hide();
                }
            });

            //是否绝育
            $("input[name='isSterilization']").click(function () {
                var isSterilization = $("input[name='isSterilization']:checked").val();
                if (isSterilization == undefined) {
                    $("#isSterilization_null_tip").show();
                } else {
                    $("#isSterilization_null_tip").hide();
                }
            });

            $("#reg_address").blur(function () {
                var reg_address = $('#reg_address').val().trim();
                if (reg_address == "") {
                    $("#reg_address_null_tip").show();
                } else {
                    $("#reg_address_null_tip").hide();
                }
            });

            //证件号信息查询
            var info = function () {
                //证件信息
                var card = {
                    certificateType: $("#cardtype").val(),
                    certificateCode: $('#id_number').val()
                };
                UserClient.find(card,
                    //成功回调
                    function (data) {
                        console.log(data)
                        var owner = data.owner;
                        if (null != owner) {
                            if (confirm('是否加载犬主信息！ ') == true) {
                                console.log("数据回填")
                                $("#dogowner_name").val(owner.name)
                                console.log(owner.sex)
                                if (owner.sex == 1) {
                                    $("#gender_woman").removeAttr('checked');
                                    $("#gender_man").attr("checked", true);
                                    $("#gender_man").prop('checked', true);
                                } else if (owner.sex == 2) {
                                    $("#gender_man").removeAttr('checked');
                                    $("#gender_woman").attr("checked", true);
                                    $("#gender_woman").prop('checked', true);
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
            };
        },


        //设置默认值
        setValue: function () {
            //条形码
            $('#barcode').val(self.dogLicense.husbandryNo);
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
            var vaccine = self.dogLicense.dog.vaccine[0];
            //疫苗名称
            $('#vaccine_name').val(vaccine.name);

            //疫苗批号
            $('#vaccine_batch').val(vaccine.batchNo);

            //生产厂商
            $('#manuf').val(vaccine.manufacturer);

            //兽医
            $('#doctor_name').val(vaccine.veterinarianName);
        },


    })
;

module.exports = PersonalCardView;

