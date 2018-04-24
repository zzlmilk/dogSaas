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

var UploadView = require("../../../Modals/Upload/UploadView");
var UserClient = require("../../../../../lib/APIClients/UserClient.js");
var CityJson = require('../../../Modals/selectPlugin/CityJson.js');//地区数据 回填
var DogBreed = require('./DogBreed.js');//宠物品种
var DogColor = require('../util/DogColor.js');//宠物颜色
var StringBuffer = require('../../../Modals/selectPlugin/StringBuffer.js');
var OrganizationClient = require('../../../../../lib/APIClients/OrganizationClient');

var PersonalCardView = Backbone.View.extend({
    el: null,
    self: null,
    dogLicense: null,
    initialize: function (options) {
        console.log("personal--------------------------------------------------------------init")

        self = this;
        self.el = options.el;
        self.dogLicense = options.dogLicense;



       

        this.render();
    },
    render: function () {
        $(self.el).html(template({}));



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

        //初始化狗的颜色
        var sbColor = new StringBuffer();
        $.each(DogColor,
            function (i, val) {
                sbColor.append("<option value='" + val.name + "'>" + val.name + "</option>");
            });
        $("#color_null").after(sbColor.toString());

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

        //如果狗证信息不为空
        if (self.dogLicense != null) {
            //数据回填
            this.setValue();
        }

        //添加监听事件
        this.initEvent();

        /**
         * 非空验证
         * @returns {boolean}
         */
        var emptyValid = function () {
            falg = true;

            //犬主姓名
            var dogowner_name1 = $('#dogowner_name1').val();
            if (dogowner_name1 == "") {
                falg = false;
                $("#dogowner_name1_null_tip").show();
            }
            var dogowner_name2 = $('#dogowner_name2').val();
            if (dogowner_name2 == "") {
                falg = false;
                $("#dogowner_name2_null_tip").show();
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
            //是否绝育
            var isSterilization = $("input[name='isSterilization']:checked").val();
            if (isSterilization == undefined) {
                falg = false;
                $("#isSterilization_null_tip").show();
            }

            return falg;
        };


        $('#post_info').unbind().on('click', function () {

            //验证非空
            if (!emptyValid()) {
                return;
            }

            //是否绝育
            var sterilization = $("input[name='isSterilization']:checked").val();

            var code = ""
            if (self.dogLicense && self.dogLicense.code) {
                code = self.dogLicense.code
            }
            var dogL = {
                code: code,
                husbandryNo: Math.floor((Math.random() * 999999) + 100000),//6位随机数
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
                        name: "1",//疫苗名称
                        batchNo: "1",//疫苗批号
                        manufacturer: "1",
                        veterinarianName: "1",
                        organizationName: "1",
                        created: new Date().toLocaleDateString().split("/").join("-")
                    }]
                },
                owner: {
                    name: $('#dogowner_name1').val()  +" "+ $('#dogowner_name2').val(),
                    sex: $("input[name='gender']:checked").val(),
                    tel: $('#tel').val(),
                    phone: $('#phone').val(),
                    phone2: $('#phone2').val(),
                    email: $('#email').val(),
                    certificateType: $('#cardtype').val(),
                    certificateCode: $('#id_number').val(),
                    location: {
                        province: "310000",//默认上海
                        district: "310100",
                        city: "310104",
                        address: $('#address').val(),
                        code: $('#postcode').val(),
                    }
                },
                residence: {
                    houseNo: "1",
                    houseProperty: "1",
                    address: new Date().getTime(),
                    isSterilization: sterilization,
                },
            };

            dogLicense = $.parseJSON(JSON.stringify(dogL));
            dogLicense.infoPreviewType = Const.infoPreviewType.AddDogLicense;

            console.log(dogLicense);
            var InfoPreviewModal = require('../../../Modals/InfoPreview/InfoPreview');
            InfoPreviewModal.show(dogLicense);
        });

        //图片上传成功后的通知
        Backbone.once(Const.NotificationUploadImageDone, function (obj) {
            // console.log(obj)
            if (obj.name == "#imgs") {
                $("#imgs_null_tip").hide();
            }
        });


        OrganizationClient.show(
            //获取成功
            function (data) {
                console.log(data);
                console.log("------------------组织成功");
            },
            //获取失败
            function (errorCode) {
                //错误回调
                console.log(errorCode)
                console.log("cw-------------组织失败");
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
        /**************************犬主登记****************************/
        //犬主姓名 失去焦点监听
        $("#dogowner_name1").blur(function () {
            var dogowner_name1 = $('#dogowner_name1').val().trim();
            if (dogowner_name1 == "") {
                $("#dogowner_name1_null_tip").show();
            } else {
                $("#dogowner_name1_null_tip").hide();
            }
        });
        $("#dogowner_name2").blur(function () {
            var dogowner_name2 = $('#dogowner_name2').val().trim();
            if (dogowner_name2 == "") {
                $("#dogowner_name2_null_tip").show();
            } else {
                $("#dogowner_name2_null_tip").hide();
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
        //是否绝育
        $("input[name='isSterilization']").click(function () {
            var isSterilization = $("input[name='isSterilization']:checked").val();
            if (isSterilization == undefined) {
                $("#isSterilization_null_tip").show();
            } else {
                $("#isSterilization_null_tip").hide();
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
        console.log("设置默认值------------")

        //犬主姓名
        $('#dogowner_name').val(self.dogLicense.owner.name);
        $('#dogowner_name1').val(self.dogLicense.owner.firstName);
        $('#dogowner_name2').val(self.dogLicense.owner.lastName);
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
        $("#phone2").val(self.dogLicense.owner.phone2);
        //犬主座机
        $("#tel").val(self.dogLicense.owner.tel);
        //证件号
        $('#cardtype').val(self.dogLicense.owner.certificateType);
        $('#id_number').val(self.dogLicense.owner.certificateCode);


        //详细地址
        $('#address').val(self.dogLicense.owner.location.address);

        //邮编
        $('#postcode').val(self.dogLicense.owner.location.code);

        $('#email').val(self.dogLicense.owner.email);

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
        // //犬只绝育
        // if (self.dogLicense.residence.isSterilization == 1) {
        //     $("#isSterilization1").attr("checked", true);
        //     $("#isSterilization1").prop('checked', true);
        // } else {
        //     $("#isSterilization0").attr("checked", true);
        //     $("#isSterilization0").prop('checked', true);
        // }
        //毛色
        $('#dog_color').val(self.dogLicense.dog.hairColor);
        //犬只用途
        if (self.dogLicense.dog.usage == "Watching dog") {
            $("#police").attr("checked", true);
            $("#police").prop('checked', true);
        } else {
            $("#watch").attr("checked", true);
            $("#watch").prop('checked', true);
        }
        //品种
        $('#breed').val(self.dogLicense.dog.breed);

        //狗的图片  如果是预约数据回填 不必隐藏上传控件
        if (!self.dogLicense.code) {
            $(".uploadWrap").hide();
            $("#imgs").append(" <img src=" + self.dogLicense.dog.photoUrl + " >");
        }


        //生日
        $('#birth_date').val(self.dogLicense.dog.bornDate.substring(0, 10));

        //虹膜id
        if (self.dogLicense.vaccineCard) {
            $('#iris').val(self.dogLicense.vaccineCard.info.irisID);
        }


    },


});

module.exports = PersonalCardView;

