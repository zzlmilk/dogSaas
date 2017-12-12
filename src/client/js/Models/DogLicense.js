var Backbone = require('backbone');
var _ = require('lodash');
var LocalStorage = require('backbone.localstorage').LocalStorage;
var LoginUserManager = require('../lib/LoginUserManager');

var Organization = require('./organization');


// Class ------------------------------------------------
var DogLicenseModel = Backbone.Model.extend({
    
    localStorage: new LocalStorage("DogLicenseModel"),

    defaults: {
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
    },


    initialize: function () {

    },


});

module["exports"] = DogLicenseModel;

