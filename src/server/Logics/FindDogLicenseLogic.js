const Utils = require("../lib/Utils");
var validator = require('validator');
var Const = require("../lib/consts");
var async = require('async');
var _ = require('lodash');
var DogLicenseModel = require('../Models/DogLicense');
var OwnerModel = require('../Models/Owner');
var DogModel = require('../Models/Dog');


var FindDogLicenseLogic = {

    find_by_owner: function (param, onSuccess, onError) {
        var name = param.name;
        var phone=param.phone;
        var certificateType=param.certificateType
        var certificateCode=param.certificateCode

        if (Utils.isEmpty(name) || Utils.isEmpty(phone) ||(Utils.isEmpty(certificateType)
            &&Utils.isEmpty(certificateCode))){
            onError(null,
                Const.resCodeFindDogLinceseParamIsEmpty
            )

            return;

        }

        async.waterfall([
            function (done) {

                var ownerModel = OwnerModel.get();
                ownerModel.find ({$or:[{name:name},{phone:phone},{certificateType:certificateType,
                    certificateCode:certificateCode}]}, function (err, res) {

                    if (err) {
                        throw (err)
                    }
                    else {
                        done(null, res)


                    }
                })
            },
            function (result, done) {
                var dogLicenseModel = DogLicenseModel.get();
                dogLicenseModel.find({"owner": result}, function (err, rows) {
                    if (err) {
                        throw (err)
                    }
                    else {
                        done(null, rows)
                      //  console.log(rows)

                        onSuccess(rows)




                    }

                })
            }

        ], function (err,result) {

        })
    },

    find_by_dog: function (param, onSuccess, onError) {
        var irisID = param.irisID;
        if (Utils.isEmpty(irisID) ){
            onError(null,
                Const.resCodeDogNoIrisID
            )

            return;

        }

        async.waterfall([
            function (done) {

                var dogModel = DogModel.get();
                dogModel.findOne({"irisID":irisID}, function (err, res) {

                    if (err) {
                        throw (err)
                    }
                    else {
                        done(null, res)
                    }
                })
            },
            function (result, done) {
                var dogLicenseModel = DogLicenseModel.get();
                dogLicenseModel.findOne({"dog": result}, function (err,res ) {
                    if (err) {
                        throw (err)
                    }
                    else {
                        done(null, res)
                        onSuccess(res)
                    }

                })
            }

        ], function (err,result) {

        })
    }


}

module["exports"] =FindDogLicenseLogic;