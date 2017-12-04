var Backbone = require('backbone');
var _ = require('lodash');

var Utils = require('../../../lib/utils');
var Const = require('../../../lib/consts');
var Config = require('../../../lib/init');

// load template
var templateAdd = require('./AddOrganization.hbs');

//var templateStatus = require('./organzationStatus.hbs');


var AddOrganizationClient = require('../../../lib/APIClients/AddOrganizationClient');

var OrganizationModel = require('../../../Models/organization');
var User = require('../../../Models/user');

var LocalStorage = require('backbone.localstorage').LocalStorage;

var UploadView = require("../../Parts/Upload/UploadView");


var AddOrganizationView = Backbone.View.extend({
    organization: null,
    el: null,
    businessLicenseUrl: null,
    animalMedicalLicenseUrl: null,

    initialize: function (options) {


        var self = this

        if (options.action == null) {
            return;
        } else {

            var action = options.action
            self.organization = options.user.organization

            //未添加组织 去添加
            if (action == "add") {
                $(Config.defaultContaier).html(templateAdd({}));
            }
            else if (action == "edit") {
                //编辑组织 信息
                $(Config.defaultContaier).html(templateAdd({
                    organization: self.organization
                }));
            }
            else if (action == "checkStatus") {
                //等待审核
                var status = self.organization.checkStatus.status;
                if (status == 0) {
                    var templateStatus = require('./WaitReview.hbs');


                    $(Config.defaultContaier).html(templateStatus({
                        organization: self.organization
                    }));

                }
                else if (status == -1) {

                    var templateStatus = require('./ReviewFailed.hbs');


                    $(Config.defaultContaier).html(templateStatus({
                        //organization:organization.attributes
                    }));

                } else if (status == 1) {
                    // var templateStatus = require('./ReviewFailed.hbs');
                    Utils.goPage("main")


                }
            }
            else {
                console.log("action wrong")
            }
        }
        this.render();
    },

    render: function () {


        this.onLoad();

        return this;


    },

    onLoad: function () {

        var self = this;
        var SignHeaderView = require('../SignHeader/SignHeaderView.js');
        new SignHeaderView({
            'el': "#signheader-content"
        });

        var SignFooterView = require('../SignFooter/SignFooterView.js');
        new SignFooterView({
            'el': "#signfooter-content"
        });

        /**
         * 为各个元素添加监听事件
         */
        function initEvent() {
            //免疫点名称 失去焦点监听
            $("#name").blur(function () {
                var name = $('#name').val().trim();
                if (name == "") {
                    $("#name_null_tip").show();
                } else {
                    $("#name_null_tip").hide();
                }
            });

            //省份 内容变化监听
            $("#province").change(function () {
                var province = $('#province').val().trim();
                if (province == "") {
                    $("#province_null_tip").show();
                } else {
                    $("#province_null_tip").hide();
                }
            });
            //所属区县 内容变化监听
            $("#district").change(function () {
                var district = $('#district').val().trim();
                if (district == "") {
                    $("#district_null_tip").show();
                } else {
                    $("#district_null_tip").hide();
                }
            });
            //所属城市 内容变化监听
            $("#city").change(function () {
                var city = $('#city').val().trim();
                if (city == "") {
                    $("#city_null_tip").show();
                } else {
                    $("#city_null_tip").hide();
                }
            });

            //联系地址 失去焦点监听
            $("#address").blur(function () {
                var address = $('#address').val().trim();
                if (address == "") {
                    $("#address_null_tip").show();
                } else {
                    $("#address_null_tip").hide();
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
            //营业执照 失去焦点监听
            // $("#businessLicense img").attr("src").change(function () {
            //     var businessLicense = $("#businessLicense img").attr("src");
            //     if (businessLicense == undefined) {
            //         $("#businessLicense_null_tip").show();
            //     } else {
            //         $("#businessLicense_null_tip").hide();
            //     }
            // });
            //许可证
            // $("#animalMedicalLicense img").attr("src").change(function () {
            //     var animalMedicalLicense = $("#animalMedicalLicense img").attr("src");
            //     if (animalMedicalLicense == undefined) {
            //         $("#animalMedicalLicense_null_tip").show();
            //     } else {
            //         $("#animalMedicalLicense_null_tip").hide();
            //     }
            // });
            //兽医姓名: 失去焦点监听
            $("#doctor").blur(function () {
                var doctor = $('#doctor').val().trim();
                if (doctor == "") {
                    $("#doctor_null_tip").show();
                } else {
                    $("#doctor_null_tip").hide();
                }
            });
            //联系人: 失去焦点监听
            $("#contacts").blur(function () {
                var contacts = $('#contacts').val().trim();
                if (contacts == "") {
                    $("#contacts_null_tip").show();
                } else {
                    $("#contacts_null_tip").hide();
                }
            });
            //联系人电话: 失去焦点监听
            $("#contacts_phone").blur(function () {
                var contacts_phone = $('#contacts_phone').val().trim();
                if (contacts_phone == "") {
                    $("#contacts_phone_null_tip").show();
                    $("#contacts_phone_format_tip").hide();
                    return;
                } else {
                    $("#contacts_phone_null_tip").hide();
                }

                if (!contacts_phone.match(/^1[3,5,7,8]\d{9}$/)) {
                    $("#contacts_phone_format_tip").show();
                } else {
                    $("#contacts_phone_format_tip").hide();
                }
            });
        }

        //添加监听事件
        initEvent();

        /**
         * 非空验证
         * @returns {boolean}
         */
        var emptyValid = function () {
            falg = true;
            //免疫点名称
            var name = $('#name').val();
            if (name == "") {
                falg = false;
                $("#name_null_tip").show();
            }
            //省
            var province = $('#province').val();
            if (province == "") {
                falg = false;
                $("#province_null_tip").show();
            }
            //区
            var district = $('#district').val();
            if (district == "") {
                falg = false;
                $("#district_null_tip").show();
            }
            //城市
            var city = $('#city').val();
            if (city == "") {
                falg = false;
                $("#city_null_tip").show();
            }

            //联系地址
            var address = $('#address').val();
            if (address == "") {
                falg = false;
                $("#address_null_tip").show();
            }//联系地址
            var address = $('#address').val();
            if (address == "") {
                falg = false;
                $("#address_null_tip").show();
            }
            //联系地址
            var address = $('#address').val();
            if (address == "") {
                falg = false;
                $("#address_null_tip").show();
            }
            //座机
            var tel = $('#tel').val();
            if (tel == "") {
                falg = false;
                $("#tel_null_tip").show();
            }
            //营业执照
            var businessLicense = $("#businessLicense img").attr("src");
            if (businessLicense == undefined) {
                falg = false;
                $("#businessLicense_null_tip").show();
            }
            //许可证
            var animalMedicalLicense = $("#animalMedicalLicense img").attr("src");
            if (animalMedicalLicense == undefined) {
                falg = false;
                $("#animalMedicalLicense_null_tip").show();
            }
            //兽医姓名
            var doctor = $('#doctor').val();
            if (doctor == "") {
                falg = false;
                $("#doctor_null_tip").show();
            }
            //联系人
            var contacts = $('#contacts').val();
            if (contacts == "") {
                falg = false;
                $("#contacts_null_tip").show();
            }
            //联系人电话
            var contacts_phone = $('#contacts_phone').val();
            if (contacts_phone == "") {
                falg = false;
                $("#contacts_phone_null_tip").show();
            } else {
                if (!contacts_phone.match(/^1[3,5,7,8]\d{9}$/)) {
                    falg = false;
                    $("#contacts_phone_format_tip").show();
                }
            }
            return falg;
        }

        $("#addOrganizationBtn").unbind().on('click', function (e) {
            //非空验证
            if (!emptyValid()) {
                return;
            }

            self.addOrganization()
        })


        //WaitReview_button
        $("#WaitReview_button").unbind().on('click', function (e) {

            Utils.goPage("main")
        })


        var UploadView1 = new UploadView({
            el: "#businessLicense"
        })


        var UploadView2 = new UploadView({
            el: "#animalMedicalLicense"
        })

        console.log(UploadView1)
        console.log(UploadView2)


        //图片上传成功后的通知
        Backbone.on(Const.NotificationUploadImageDone, function (obj) {
            // console.log(obj)
            if (obj.name == "#animalMedicalLicense") {
                $("#animalMedicalLicense_null_tip").hide();
            } else if (obj.name == "#businessLicense") {
                $("#businessLicense_null_tip").hide();
            }

        });


    },


    addOrganization: function () {
        var organization = {
            name: $('#name').val().trim(),
            province: $('#province').val().trim(),
            city: $('#city').val().trim(),
            district: $('#district').val().trim(),
            address: $('#address').val().trim(),
            code: "1",
            tel: $('#tel').val().trim(),
            businessLicense: $("#businessLicense img").attr("src"),
            animalMedicalLicense: $("#animalMedicalLicense img").attr("src"),
            serviceScope: "1",
            contacts_name: $('#contacts').val().trim(),
            contacts_phone: $('#contacts_phone').val().trim()
        };

        console.log(organization)
        AddOrganizationClient.send(
            organization,
            function (data) {
                //成功回调
                //更新user的organization
                var user = User.getLoginUser();
                var organization = data.organization;
                user.organization = organization
                var model = User.modelByResult(user)
                model.save();

                var templateStatus = require('./WaitReview.hbs');
                $(Config.defaultContaier).html(templateStatus({
                    //organization:organization.attributes
                }));
                // Utils.goPage("organization");
            },
            function (errorCode) {
                //错误回调
                alert(errorCode)
            })
    }

});


module.exports = AddOrganizationView;




