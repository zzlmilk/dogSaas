/**
 * Created by json on 2017/11/24.
 */
var Backbone = require('backbone');
var _ = require('lodash');

var Utils = require('../../../../lib/utils');
var Const = require('../../../../lib/consts');
var Config = require('../../../../lib/init');
var DogLicenseModel = require('../../../../Models/DogLicense.js');

// load template
var template = require('./Dog.hbs');

var DogView = Backbone.View.extend({


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

        //点击查看详情进入弹窗页面
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

        })





    }

});

module.exports = DogView;
