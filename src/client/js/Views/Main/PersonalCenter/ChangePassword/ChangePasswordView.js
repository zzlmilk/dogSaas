/**
 * Created by json on 2017/11/24.
 */
/**
 * Created by json on 2017/11/23.
 */
var Backbone = require('backbone');
var _ = require('lodash');


var Utils = require('../../../../lib/utils');
var Const = require('../../../../lib/consts');
var Config = require('../../../../lib/init');

//var VaildCodeClient = require('../../lib/APIClients/VaildCodeClient');
//var RegisterClinet = require('../../lib/APIClients/RegisterClinet');
//var UserModel = require('../../Models/user')
//var loginUserManager = require('../../lib/loginUserManager')


var template = require('./ChangePassword.hbs');

var ChangePasswordView = BaseView.extend({

    initialize: function(options) {


        this.render();
    },


    render: function() {

        $(Config.defaultContaier).html(template({

        }));


        var SignHeaderView = require('../../../SignUp/SignHeader/SignHeaderView.js');
        var view = new SignHeaderView({
            'el': "#signheader-content"
        });

        var SignFooterView = require('../../../SignUp//SignFooter/SignFooterView.js');
        var view = new SignFooterView({
            'el': "#signfooter-content"
        });

        this.onLoad();

        return this;




    },

    onLoad: function(){
        var self = this;



    }



})

module.exports = ChangePasswordView;
