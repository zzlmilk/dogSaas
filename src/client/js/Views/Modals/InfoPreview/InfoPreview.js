/**
 * Created by json on 2017/11/27.
 */
var $ = require('jquery');
var _ = require('lodash');
// var validator = require('validator');

var Const = require('../../../lib/consts.js');

var Utils = require('../../../lib/utils.js');
var template = require('./InfoPreview.hbs');
// var UpdateProfileClient = require('../../../lib/APIClients/UpdateProfileClient');
// var loginUserManager = require('../../../lib/loginUserManager');

var InfoPreview = {
    show: function(title, text, onRetry) {

        var self = this;

        $('body').append(template({
            title: title,
            text: text
        }));
        $('#modal-profile').on('hidden.bs.modal', function(e) {
            $('#modal-profile').remove();

        })

        $('#modal-profile').on('show.bs.modal', function (e) {


        })

        $('#modal-profile').modal('show');
        $('#modal-btn-close').unbind().on('click', function() {
            self.hide();
        });
        $('#modal-btn-save').unbind().on('click',function(){

            alert("进入Main/Dog/DogCard/CardInfo页面")

        });
    },
    hide: function(onFinish) {
        $('#modal-profile').on('hidden.bs.modal', function(e) {
            $('#modal-profile').remove();
            if (!_.isUndefined(onFinish)) {
                onFinish();
            }
        })

        $('#modal-profile').modal('hide');
    },





}
module.exports = InfoPreview;