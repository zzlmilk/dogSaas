var Backbone = require('backbone');
var _ = require('lodash');
var LocalStorage = require('backbone.localstorage').LocalStorage;
var LoginUserManager = require('../lib/LoginUserManager');


var Organization = require('./organization');


// Class ------------------------------------------------
var UserModel = Backbone.Model.extend({

    localStorage: new LocalStorage("UserModel"),

    defaults: {
        id: "",
        email: "",
        token: "",
        logionProcess: "",
        organization: null,


    },

    initialize: function () {
    },
});

var UserCollection = Backbone.Collection.extend({
    model: UserModel,
});

var user = {
    Model: UserModel,
    Collection: UserCollection,
}

user.getLoginUser = function () {
    var model = new UserModel();
    var userID = LoginUserManager.getLoginUserID()
    var user = model.localStorage.find({id: userID})
    return user;
},

    user.modelByResult = function (obj) {
        var model = new UserModel({
            id: obj._id || obj.id,
            email: obj.email,
            logionProcess: obj.logionProcess,
            // organization : OrganizationModel.modelByResult(obj.organization),
        });

        if (!_.isUndefined(obj.organization)) {
            var organization = Organization.modelByResult(obj.organization);
            model.set('organization', organization);
        }
        return model;

    }

user.collectionByResult = function (obj) {

    if (!_.isArray(obj))
        return null;

    var aryForCollection = [];
    _.each(obj, function (row) {
        aryForCollection.push(user.modelByResult(row));
    });
    return new UserCollection(aryForCollection);
}


module["exports"] = user;

