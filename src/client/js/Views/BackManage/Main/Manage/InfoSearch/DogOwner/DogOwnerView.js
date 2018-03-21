var Backbone = require('backbone');
var _ = require('lodash');

var Utils = require('../../../../../../lib/utils');
var Const = require('../../../../../../lib/consts');
var Config = require('../../../../../../lib/init');
var StringBuffer = require('../../../../Modals/selectPlugin/StringBuffer.js');
var DogLicenseModel = require('../../../../../../Models/DogLicense.js');
var DogLicenseClient = require('../../../../../../lib/APIClients/DogLicenseClient');

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
        var currentPage = 1;//当前页
        var totalCount;//总条数
        var totalPage;//总页数
        var requestData = {
            certificateType: "",
            certificateCode: "",
            page: currentPage,
        };


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

            if (id_number == "") {
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
            currentPage=1;
            var requestData = {
                certificateType: $("#certificateType").val().trim(),
                certificateCode: $("#id_number").val().trim(),
                page: currentPage,
            };
            seach(requestData);
        });
        $("#pageBegin").unbind().on("click", function () {
            if (1 == currentPage) {
                return;
            }
            var requestData = {
                certificateType: $("#certificateType").val().trim(),
                certificateCode: $("#id_number").val().trim(),
                page: 1,
            }
            seach(requestData);
        });
        $("#pageEnd").unbind().on("click", function () {
            if (totalPage == currentPage) {
                return;
            }
            var requestData = {
                certificateType: $("#certificateType").val().trim(),
                certificateCode: $("#id_number").val().trim(),
                page: totalPage,
            }
            seach(requestData);
        });
        $("#pageUp").unbind().on("click", function () {
            if (currentPage == 1) {
                return
            }
            var requestData = {
                certificateType: $("#certificateType").val().trim(),
                certificateCode: $("#id_number").val().trim(),
                page: currentPage - 1,
            }
            seach(requestData);
        });
        $("#pageDown").unbind().on("click", function () {
            if (currentPage == totalPage) {
                return
            }
            var requestData = {
                certificateType: $("#certificateType").val().trim(),
                certificateCode: $("#id_number").val().trim(),
                page: currentPage + 1,
            }
            seach(requestData);
        });

        seach(requestData);

        function seach(requestData) {
            currentPage = parseInt(requestData.page);
            console.log(requestData);
            DogLicenseClient.findByOwner(requestData,
                //成功回调
                function (data) {
                    console.log(data);

                    //总条数
                    var count = data.count;
                    totalCount = count;
                    totalPage = Math.ceil(totalCount / 10);
                    console.log(totalCount + "条数据;" + totalPage + "页,当前页码" + currentPage);
                    //添加数据前删除已添加的数据
                    $(".dogtr").remove();
                    //先删除已有的
                    $(".toPage").remove();
                    var dogLicenses = data.dogLicenses;
                    var size = dogLicenses.length;
                    if (size > 0) {
                        //有数据
                        $("#dogowner_nav").show();
                        $("#nodata").hide();
                        var sb = new StringBuffer();

                        var whwere = $("#id_number").val().trim();
                        if(whwere==""){
                            //无条件不需要合并信息
                            $.each(dogLicenses, function (i, val) {
                                sb.append("<tr class='dogtr' rowspan='"+size+"'>" +
                                    "<td align='center' valign='middle'>" + val.owner.name + "</td>" +
                                    "<td align='center' valign='middle'>" + val.owner.certificateCode + "</td>" +
                                    "<td align='center' valign='middle'>" + val.owner.phone + "</td>" +
                                    "<td align='center' valign='middle'>" + val.dog.nickname + "</td>" +
                                    "<td align='center' valign='middle'>" + val.dog.breed + "</td>" +
                                    "<td align='center' valign='middle'>" + val.dog.hairColor + "</td>" +
                                    "<td align='center' valign='middle'>" + val.DogCard.info.cardNo + "</td>" +
                                    "<td align='center' valign='middle'><a class='td-a' href='javascript:void(0)' value=" + i + ">详情</a></td>" +
                                    "</tr>");
                            });
                        }else{
                            //有条件搜索 需要合并
                            var d1 = dogLicenses[0];
                            sb.append("<tr class='dogtr' >" +
                                "<td align='center' valign='middle' rowspan='" + size + "'>" + d1.owner.name + "</td>" +
                                "<td align='center' valign='middle' rowspan='" + size + "'>" + d1.owner.certificateCode + "</td>" +
                                "<td align='center' valign='middle' rowspan='" + size + "'>" + d1.owner.phone + "</td>" +
                                "<td align='center' valign='middle'>" + d1.dog.nickname + "</td>" +
                                "<td align='center' valign='middle'>" + d1.dog.breed + "</td>" +
                                "<td align='center' valign='middle'>" + d1.dog.hairColor + "</td>" +
                                "<td align='center' valign='middle'>" + d1.vaccineCard.info.cardNo + "</td>" +
                                "<td align='center' valign='middle'><a class='td-a' href='javascript:void(0)' value=" + 0 + ">详情</a></td>" +
                                "</tr>");
                            for (var i = 1; i < size; i++) {
                                var d = dogLicenses[i];
                                sb.append("<tr class='dogtr'>" +
                                    "<td align='center' valign='middle'>" + d.dog.nickname + "</td>" +
                                    "<td align='center' valign='middle'>" + d.dog.breed + "</td>" +
                                    "<td align='center' valign='middle'>" + d.dog.hairColor + "</td>" +
                                    "<td align='center' valign='middle'>" + d.vaccineCard.info.cardNo + "</td>" +
                                    "<td align='center' valign='middle'>" + d.vaccineCard.info.signCreate.substring(0, 10) + "</td>" +
                                    "<td align='center' valign='middle'><a class='td-a' href='javascript:void(0)' value=" + i + ">详情</a></td>" +
                                    "</tr>");
                            }
                        }
                        $("#tbody").after(sb.toString());
                        $(".td-a").unbind().on("click", function () {
                            var dogLicense = dogLicenses[$(this).attr("value")];
                            dogLicense.infoPreviewType = Const.infoPreviewType.ToCardInfo;
                            var InfoPreviewModal = require('../../../../Modals/InfoPreview/InfoPreview');
                            InfoPreviewModal.show(dogLicense);
                        });

                        //循环遍历
                        var sb = new StringBuffer();
                        for (var index = 1; index <= totalPage; index++) {
                            //+(index==currentPage)?'a':''
                            sb.append("<li><a href='javascript:void(0)' class='toPage' value=" + index + ">" + index + "</a></li>");
                        }
                        $("#page").after(sb.toString());

                        $(".toPage").unbind().on("click", function () {
                            var i = parseInt($(this).attr("value"));
                            if (i == currentPage) {
                                return;
                            }
                            var requestData = {
                                certificateType: $("#certificateType").val().trim(),
                                certificateCode: $("#id_number").val().trim(),
                                page: i,
                            }
                            seach(requestData);
                        });
                    } else {
                        //无数据
                        $("#dogowner_nav").hide();
                        $("#nodata").show();
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

module.exports = DogOwnerView;
