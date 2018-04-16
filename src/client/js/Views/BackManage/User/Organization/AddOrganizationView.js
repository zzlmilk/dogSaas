var Backbone = require('backbone');
var _ = require('lodash');

var Utils = require('../../../../lib/utils');
var Const = require('../../../../lib/consts');
var Config = require('../../../../lib/init');
var StringBuffer = require('../../Modals/selectPlugin/StringBuffer.js');

// load template
var templateAdd = require('./AddOrganization.hbs');

//var templateStatus = require('./organzationStatus.hbs');


var OrganizationClient = require('../../../../lib/APIClients/OrganizationClient');

var OrganizationModel = require('../../../../Models/organization');
var User = require('../../../../Models/user');

var LocalStorage = require('backbone.localstorage').LocalStorage;

var UploadView = require("../../Modals/Upload/UploadView");


var AddOrganizationView = Backbone.View.extend({
    veterinarys: [],
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
                console.log("add-----------")
                $(Config.defaultContaier).html(templateAdd({}));
            }else if (action == "edit") {
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
                    $("#WaitReview_button").unbind().on('click', function (e) {

                        Utils.goPage("main")
                    })

                }
                else if (status == -1) {

                    var templateStatus = require('./ReviewFailed.hbs');


                    $(Config.defaultContaier).html(templateStatus({
                        //organization:organization.attributes
                    }));

                    //WaitReview_button
                    $("#WaitReview_button").unbind().on('click', function (e) {

                        Utils.goPage("main")
                    })

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





        var SignHeaderView = require('../Header/HeaderView.js');
        new SignHeaderView({
            'el': "#signheader-content"
        });

        var SignFooterView = require('../Footer/FooterView.js');
        new SignFooterView({
            'el': "#signfooter-content"
        });



        if(window.scrollTop>0){
            console.log("navbar-fixed-bottom  滚动条")
        }
        $(window).scrollTop(1)
        if($(window).scrollTop()>0 ){
            console.log("有滚动条")
            $("#bottom").removeClass("navbar-fixed-bottom")
        }else{
            console.log("mei有滚动条")

            $("#bottom").addClass("navbar-fixed-bottom")
        }
        $(window).scrollTop(0);//滚动条返回顶部

        /**
         * 为各个元素添加监听事件
         */
        function initEvent() {
            //Quarantine Station 失去焦点监听
            $("#name").blur(function () {
                var name = $('#name').val().trim();
                if (name == "") {
                    $("#name_null_tip").show();
                } else {
                    $("#name_null_tip").hide();
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

            $('input[name="server"]').change(function () {
                var server_value = []
                $('input[name="server"]:checked').each(function () {
                    server_value.push($(this).val());
                });
                if (server_value.length == 0) {
                    falg = false;
                    $("#server_null_tip").show();
                } else {
                    $("#server_null_tip").hide();
                }

            });

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
            $("#contacts1").blur(function () {
                var contacts1 = $('#contacts1').val().trim();
                if (contacts1 == "") {
                    $("#contacts1_null_tip").show();
                } else {
                    $("#contacts1_null_tip").hide();
                }
            });//联系人: 失去焦点监听
            $("#contacts2").blur(function () {
                var contacts2 = $('#contacts2').val().trim();
                if (contacts2 == "") {
                    $("#contacts2_null_tip").show();
                } else {
                    $("#contacts2_null_tip").hide();
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
            //Quarantine Station
            var name = $('#name').val();
            if (name == "") {
                falg = false;
                $("#name_null_tip").show();
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
            //Business license
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
            //服务范围
            var server_value = []
            $('input[name="server"]:checked').each(function () {
                server_value.push($(this).val());
            });
            if (server_value.length == 0) {
                falg = false;
                $("#server_null_tip").show();
            } else {
                $("#server_null_tip").hide();
            }

            //兽医姓名

            if (self.veterinarys.length == 0) {
                falg = false;
                $("#doctor_null_tip").show();
            }
            //联系人
            var contacts1 = $('#contacts1').val();
            if (contacts1 == "") {
                falg = false;
                $("#contacts1_null_tip").show();
            }
            var contacts2 = $('#contacts2').val();
            if (contacts2 == "") {
                falg = false;
                $("#contacts2_null_tip").show();
            }
            //联系人电话
            var contacts_phone = $('#contacts_phone').val();
            if (contacts_phone == "") {
                falg = false;
                $("#contacts_phone_null_tip").show();
            }
            return falg;
        }

        $('#doctor').unbind().on('click', function () {
            self.docListen()
            var AddDoctorDialogModal = require('../../Modals/AddDoctorDialog/AddDoctorDialogView');
            AddDoctorDialogModal.show();

        });

        $("#addOrganizationBtn").unbind().on('click', function (e) {
            //非空验证
            if (!emptyValid()) {
                return;
            }
            self.addOrganization(self.veterinarys)
        })


        //WaitReview_button
        $("#WaitReview_button").unbind().on('click', function (e) {

            //回到官网首页
            Utils.goPage("home")
        })


        var UploadView1 = new UploadView({
            el: "#businessLicense"
        })


        var UploadView2 = new UploadView({
            el: "#animalMedicalLicense"
        })


        //图片上传成功后的通知
        Backbone.once(Const.NotificationUploadImageDone, function (obj) {
            // console.log(obj)
            if (obj.name == "#animalMedicalLicense") {
                $("#animalMedicalLicense_null_tip").hide();
            } else if (obj.name == "#businessLicense") {
                $("#businessLicense_null_tip").hide();
            }

        });


    },
    docListen:function(){
       var self=this
        //添加医生完成的通知
        Backbone.once(Const.NotificationAddDoctorDone, function (obj) {

            console.log("页面获取到的值" + obj)
            if(obj==null){
                return
            }
            var veter = {
                name: obj.name,
                code: obj.code
            };

            console.log(veter);
            self.veterinarys.push(veter);
            var sb = new StringBuffer();
            console.log(sb);
            sb.append("<tr><td class=\"name\">" + veter.name + "</td> <td class=\"number\">" + veter.code + "</td></tr>");
            console.log(sb);
            $("#doctor_table").show();
            $("#doctor_null_tip").hide();
            $("#doctor_table").after(sb.toString());


        });
    },


    //添加组织
    addOrganization: function (veterinarians) {
        var server_value = []
        $('input[name="server"]:checked').each(function () {
            server_value.push($(this).val());
        });
        var organization = {
            name: $('#name').val().trim(),
            province: "310000",
            city: "310100",
            district: "310101",
            address: $('#address').val().trim(),
            code: "xxxxxx",
            tel: $('#tel').val().trim(),
            businessLicense: $("#businessLicense img").attr("src"),
            animalMedicalLicense: $("#animalMedicalLicense img").attr("src"),
            serviceScope: server_value,
            veterinarians: veterinarians,
            contacts_name: $('#contacts1').val().trim()  +" "+ $('#contacts2').val().trim(),
            contacts_phone: $('#contacts_phone').val().trim()
        };

        console.log(organization)
        OrganizationClient.add(
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
                $("#WaitReview_button").unbind().on('click', function (e) {

                    //回到官网首页
                    Utils.goPage("home");
                })
                // Utils.goPage("organization");
            },
            function (errorCode) {
                //错误回调
                if (Const.ErrorCodes[errorCode]) {
                    var message = Const.ErrorCodes[errorCode];
                    alert(message);
                }
            })
    }
});


module.exports = AddOrganizationView;



