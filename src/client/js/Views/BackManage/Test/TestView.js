var Backbone = require('backbone');
var _ = require('lodash');

var Utils = require('../../../lib/utils');
var Const = require('../../../lib/consts');
var Config = require('../../../lib/init');

// load template
var template = require('./Test.hbs');


var SignInClient = require('../../../lib/APIClients/SignInClient');

var loginUserManager = require('../../../lib/loginUserManager');
var userModel = require('../../../Models/user');

var UploadView = require("../Modals/Upload/UploadView");
var SelectPluginView = require("../Modals/selectPlugin/SelectPluginView");


var TestView = Backbone.View.extend({


    tagName: "li",
    initialize: function (options) {
        this.render();
    },

    render: function () {

        $(Config.defaultContaier).html(template({
            a: 1
        }));


        this.onLoad();


        return this;

    },

    onLoad: function () {

        var self = this;


        var selectPluginView = new SelectPluginView({
            el: "#selectPlugin"
        })


        var username = $("#inputaaa").val();
        var password = "rex123";


        Backbone.on(Const.NotificationUploadImageDone, function (obj) {
            console.log(obj)
        });


        $("#iddd").bind("click", function () {
            SignInClient.send({
                email: username,
                password: password

            }, function (data) {


                // loginUserManager.setUser(data.user);
                // loginUserManager.setToken(data.token);

                var user = userModel.modelByResult(data.user)
                console.log("====", user)


                //Utils.goPage("main");


            }, function (errorCode) {
                console.log(errorCode)
                alert(errorCode)


            })

        })

        // $("#uploadTest").html("acbsdli")

        // var UploadView1 = new UploadView({
        //         el:"#uploadTest"
        // })


    }

})

module.exports = TestView;
