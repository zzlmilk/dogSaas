var Backbone = require('backbone');
var Const = require('../../../../lib/consts');
var DogLicenseClient = require('../../../../lib/APIClients/DogLicenseClient');
var StringBuffer = require('../../../Parts/selectPlugin/StringBuffer.js');
// load template
var template = require('./DogLicense.hbs');


var DogLicenseView = Backbone.View.extend({


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
        var select = $("#where").val();
        var requestData;
        if (select == 1) {
            requestData = {
                irisID: $("#whereValue").val().trim(),
                page: currentPage
            };
        } else {
            requestData = {
                cardNo: $("#whereValue").val().trim(),
                page: currentPage
            };
        }

        var emptyValid = function () {
            var flag = true;
            var whereValue = $("#whereValue").val().trim();
            if (whereValue == "") {
                flag = false;
                $("#where_null_tip").show();
            } else {
                $("#where_null_tip").hide();
            }
            return flag;
        }

        //搜索
        $("#search").unbind().on('click', function () {
            //验证非空
            if (!emptyValid()) {
                return;
            }
            var select = $("#where").val();
            var requestData;
            if (select == 1) {
                requestData = {
                    irisID: $("#whereValue").val().trim(),
                    page: 1
                };
            } else {
                requestData = {
                    dogCardNo: $("#whereValue").val().trim(),
                    page: 1
                };
            }
            seach(requestData);
        });
        $("#pageBegin").unbind().on("click", function () {
            if (1 == currentPage) {
                return;
            }
            var select = $("#where").val();
            var requestData;
            if (select == 1) {
                requestData = {
                    irisID: $("#whereValue").val().trim(),
                    page: 1
                };
            } else {
                requestData = {
                    dogCardNo: $("#whereValue").val().trim(),
                    page: 1
                };
            }
            seach(requestData);
        });
        $("#pageEnd").unbind().on("click", function () {
            if (totalPage == currentPage) {
                return;
            }
            var select = $("#where").val();
            var requestData;
            if (select == 1) {
                requestData = {
                    irisID: $("#whereValue").val().trim(),
                    page: totalPage
                };
            } else {
                requestData = {
                    dogCardNo: $("#whereValue").val().trim(),
                    page: totalPage
                };
            }
            seach(requestData);
        });
        $("#pageUp").unbind().on("click", function () {
            if (currentPage == 1) {
                return
            }

            var select = $("#where").val();
            var requestData;
            if (select == 1) {
                requestData = {
                    irisID: $("#whereValue").val().trim(),
                    page: currentPage - 1
                };
            } else {
                requestData = {
                    dogCardNo: $("#whereValue").val().trim(),
                    page: currentPage - 1
                };
            }
            seach(requestData);
        });
        $("#pageDown").unbind().on("click", function () {
            if (currentPage == totalPage) {
                return
            }
            var select = $("#where").val();
            var requestData;
            if (select == 1) {
                requestData = {
                    irisID: $("#whereValue").val().trim(),
                    page: currentPage + 1
                };
            } else {
                requestData = {
                    dogCardNo: $("#whereValue").val().trim(),
                    page: currentPage + 1
                };
            }
            seach(requestData);
        });

        seach(requestData);

        function seach(requestData) {
            currentPage = parseInt(requestData.page);
            console.log(requestData);
            DogLicenseClient.findByDog(requestData,
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

                    if (dogLicenses.length > 0) {

                        //有数据
                        $("#dogowner_nav").show();
                        $("#nodata").hide();
                        var sb = new StringBuffer();
                        $.each(dogLicenses, function (i, val) {
                            var carNo = val.DogCard.info.cardNo == undefined ? "" : val.DogCard.info.cardNo;
                            sb.append("<tr class='dogtr'>" +
                                "<td align='center' valign='middle'>" + val.vaccineCard.info.irisID + "</td>" +
                                "<td align='center' valign='middle'>" + carNo + "</td>" +
                                "<td align='center' valign='middle'>" + val.owner.certificateCode + "</td>" +
                                "<td align='center' valign='middle'>" + val.dog.nickname + "</td>" +
                                "<td align='center' valign='middle'>" + val.dog.breed + "</td>" +
                                "<td align='center' valign='middle'><a class='td-a' href='javascript:void(0)' value=" + i + ">年审</a></td>" +
                                "</tr>");
                        });
                        $("#tbody").after(sb.toString());

                        $(".td-a").unbind().on("click", function () {
                            // var d = dogLicenses[$(this).attr("value")];
                            // console.log(d);
                            // var InfoPreviewModal = require('../../../Modals/InfoPreview/InfoPreview');
                            // InfoPreviewModal.show(d);
                            //年检
                            // var ImmuneDetailView = require('../ImmuneDetail/ImmuneDetailView.js');
                            // var dogLicense = dogLicenses[$(this).attr("value")];
                            // var view = new ImmuneDetailView({
                            //     'el': "#main-content",
                            //     'dogLicense': dogLicense
                            // });
                            var dogLicense = dogLicenses[$(this).attr("value")];
                            var id=dogLicense._id
                            DogLicenseClient.annual({
                                    dogLicenseId:id
                                },
                                //成功回调
                                function (data) {
                                    console.log("年审成功");
                                    console.log(data);
                                    //跳转到制卡
                                    var CardInfoView = require('../../Dog/DogCard/CardInfo/CardInfoView.js');
                                    var view = new CardInfoView({
                                        'el': "#main-content",
                                        "dogLicense": data.dogLicense
                                    });

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

                            var select = $("#where").val();
                            var requestData;
                            if (select == 1) {
                                requestData = {
                                    irisID: $("#whereValue").val().trim(),
                                    page: i
                                };
                            } else {
                                requestData = {
                                    dogCardNo: $("#whereValue").val().trim(),
                                    page: i
                                };
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

module.exports = DogLicenseView;
