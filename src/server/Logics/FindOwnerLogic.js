const Utils = require("../lib/Utils");
var validator = require('validator');
var Const = require("../lib/consts");
var async = require('async');
var _ = require('lodash');
var OwnerModel = require('../Models/Owner');


var FindOwnerLogic = {

    findOwner: function (param, onSuccess, onError) {
        var certificateType = param.certificateType;
        var certificateCode=param.certificateCode
        if (Utils.isEmpty(certificateType)) {
            onError(null,
                Const.resCodeDogOwnerNoCertificateType
            )

            return;
        }
        if (Utils.isEmpty(certificateCode)) {
            onError(null,
                Const.resCodeDogOwnerNocertificateCode
            )

            return;
        }

        async.waterfall([
            function (done) {

                var ownerModel = OwnerModel.get();

                ownerModel.findOne({"certificateType": certificateType,"certificateCode":certificateCode}, function (err, res) {

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


module["exports"] =FindOwnerLogic