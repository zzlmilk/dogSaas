/**
 * Created by json on 2017/11/24.
 */
var Backbone = require('backbone');
var _ = require('lodash');

var Utils = require('../../../../lib/utils');
var Const = require('../../../../lib/consts');
var Config = require('../../../../lib/init');
var User = require('../../../../Models/user');
var OrganizationClient = require('../../../../lib/APIClients/OrganizationClient');
var VeterinarianClient = require('../../../../lib/APIClients/VeterinarianClient.js');

// load template
var template = require('./PersonalCenter.hbs');


var PersonalCenterView = Backbone.View.extend({

    el: null,
    self: null,
    initialize: function (options) {
        self = this;
        this.el = options.el;
        this.render();
    },

    render: function () {

        self.showInfo();
        self.onLoad();

        return this;

    },


    onLoad: function () {



    },


    showInfo: function () {
        var self=this
        OrganizationClient.show(
            //获取成功
            function (data) {
                console.log("------------------");
                console.log(data);

            },
            //获取失败
            function (errorCode) {
                //错误回调

                console.log(errorCode.organization);
                var status = errorCode.organization.checkStatus.status;
                var statusText = "";
                if (status == 0) {
                    statusText = "Verifying";
                } else if (status == -1) {
                    statusText = "Unverified";
                } else {
                    statusText = "Verified";
                }
                errorCode.organization.checkStatus.status = statusText;

                errorCode.organization.adminUser.created = errorCode.organization.adminUser.created.substring(0, 10);

                $(self.el).html(template({
                    organization: errorCode.organization
                }));

                $('#btn_account').unbind().on('click', function () {
                    self.docListen()
                    var AddDoctorDialogModal = require('../../Modals/AddDoctorDialog/AddDoctorDialogView');
                    AddDoctorDialogModal.show();

                });

                $('.delete').unbind().on('click', function () {
                    // alert($(this).attr("value"));
                    var DeleteDoctorModal = require('../../Modals/DeleteDoctor/DeleteDoctorView');
                    DeleteDoctorModal.show($(this).attr("value"));

                });
            });
    },
    //添加兽医监听
    docListen:function () {
        //添加医生完成的通知
        Backbone.once(Const.NotificationAddDoctorDone, function (obj) {
            if(obj==null){
                return
            }
            var veter = {
                name: obj.name,
                code: obj.code
            };
            OrganizationClient.addVeterinarian(veter,

                //成功回调
                function (data) {

                    console.log("成功1");
                    // console.log(data);
                    // console.log("成功2");
                    self.showInfo();
                    // var PersonalCenterView = require('PersonalCenterView');
                    //
                    // var view = new PersonalCenterView({
                    //     'el': "#main-content"
                    // });

                    // self.reload
                }
                ,
                //失败回调
                function (errorCode) {
                    if (Const.ErrorCodes[errorCode]) {
                        var message = Const.ErrorCodes[errorCode];
                        alert(message);
                    }

                }
            );

        });
    }
});

module.exports = PersonalCenterView;