var Backbone = require('backbone');
var _ = require('lodash');

var Utils = require('../../../../../lib/utils');
var Const = require('../../../../../lib/consts');
var Config = require('../../../../../lib/init');
var StringBuffer = require('../../../Modals/selectPlugin/StringBuffer.js');
var DogLicenseModel = require('../../../../../Models/DogLicense.js');
// load template
var template = require('./Reservation.hbs');
var ReservationClient = require('../../../../../lib/APIClients/ReservationClient');

var ReservationView = Backbone.View.extend({


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
        console.log("-------tcsss--------")
        var self = this;
        var currentPage = 1;//当前页
        var totalCount;//总条数
        var totalPage;//总页数
        var requestData = {
            code: "",
            page: currentPage
        };
        seach(requestData);

        //搜索
        $("#search").unbind().on('click', function () {
            //验证非空
            if (!emptyValid()) {
                return;
            }
            currentPage = 1;
            var requestData = {
                code: $("#immune_number").val().trim(),
                page: currentPage
            };
            seach(requestData);
        });
        $("#pageBegin").unbind().on("click", function () {
            if (1 == currentPage) {
                return;
            }
            var requestData = {
                code: $("#immune_number").val().trim(),
                page: 1,
            }
            seach(requestData);
        });
        $("#pageEnd").unbind().on("click", function () {
            if (totalPage == currentPage) {
                return;
            }
            var requestData = {
                code: $("#immune_number").val().trim(),
                page: totalPage,
            }
            seach(requestData);
        });
        $("#pageUp").unbind().on("click", function () {
            if (currentPage == 1) {
                return
            }
            var requestData = {
                code: $("#immune_number").val().trim(),
                page: currentPage - 1,
            }
            seach(requestData);
        });
        $("#pageDown").unbind().on("click", function () {
            if (currentPage == totalPage) {
                return
            }
            var requestData = {
                code: $("#immune_number").val().trim(),
                page: currentPage + 1,
            }
            seach(requestData);
        });

        function seach(requestData) {
            currentPage = parseInt(requestData.page);
            console.log(requestData);
            ReservationClient.find(requestData,
                //成功回调
                function (data) {
                    console.log(data);
                    //总条数
                    var count = data.count;
                    console.log(count)
                    totalCount = count;
                    totalPage = Math.ceil(totalCount / 10);
                    console.log(totalCount + "条数据;" + totalPage + "页,当前页码" + currentPage);
                    //添加数据前删除已添加的数据
                    $(".dogtr").remove();
                    //先删除已有的
                    $(".toPage").remove();
                    var reserveUser = data.reserveUser;
                    var size = reserveUser.length;
                    if (size > 0) {
                        //有数据
                        $("#dogowner_nav").show();
                        $("#nodata").hide();
                        var sb = new StringBuffer();

                        $.each(reserveUser, function (i, val) {
                            sb.append("<tr class='dogtr' rowspan='" + size + "'>" +
                                "<td align='center' valign='middle'>" + val.code + "</td>" +
                                "<td align='center' valign='middle'>" + val.owner.name + "</td>" +
                                "<td align='center' valign='middle'>" + val.owner.phone + "</td>" +
                                "<td align='center' valign='middle'>" + val.dog.nickname + "</td>" +
                                "<td align='center' valign='middle'>" + val.dog.breed + "</td>" +
                                "<td align='center' valign='middle'>" + val.dog.hairColor + "</td>" +
                                // "<td align='center' valign='middle'>" + val.vaccineCard.info.cardNo + "</td>" +
                                // "<td align='center' valign='middle'>" + val.vaccineCard.info.signCreate.substring(0, 10) + "</td>" +
                                "<td align='center' valign='middle'><a class='td-a' href='javascript:void(0)' value=" + i + ">Issue</a></td>" +
                                "</tr>");
                        });

                        $("#tbody").after(sb.toString());
                        $(".td-a").unbind().on("click", function () {
                            // var dogLicense = reserveUser[$(this).attr("value")];
                            // dogLicense.infoPreviewType = Const.infoPreviewType.ToCardInfo;
                            // var InfoPreviewModal = require('../../Modals/InfoPreview/InfoPreview');
                            // InfoPreviewModal.show(dogLicense);

                            var dogLicense = reserveUser[$(this).attr("value")];
                            var PersonalCardView = require('../PersonalCard/PersonalCardView');
                            new PersonalCardView({
                                'el': "#main-content",
                                "dogLicense": dogLicense
                            });
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
                                code: $("#immune_number").val().trim(),
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

        var emptyValid = function () {
            var flag = true;
            var immune_number = $("#immune_number").val().trim();

            if (immune_number == "") {
                flag = false;
                $("#where_null_tip").show();
            } else {
                $("#where_null_tip").hide();
            }
            return flag;
        }


    }

});

module.exports = ReservationView;