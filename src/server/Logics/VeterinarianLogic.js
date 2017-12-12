const Utils = require("../lib/Utils");
var validator = require('validator');
var Const = require("../lib/consts");
var async = require('async');
var _ = require('lodash');
var VeterinarianModel = require('../Models/Veterinarian');
var VeterinarianLogic = {
    add: function (param, onSuccess, onError) {


        var name = param.name;

        var code = param.code;//兽医执照号code：是唯一的

        if (Utils.isEmpty(name)) {
            onError(null,
                Const.resCodeVerterinarianNoName
            );
            return;
        }

        if (Utils.isEmpty(code)) {
            onError(null,
                Const.resCodeVerterinarianNoCode
            );
            return;
        }
        var res = {};
        async.waterfall([
            function (done) {
                //验证该兽医是否之前添加过
                var veterinarianModel = VeterinarianModel.get();
                veterinarianModel.findOne({ code: code }, function (err,veterinarian ) {
                    if (!_.isNull(veterinarian)) {
                        //该兽医已添加过

                        onError(null, Const.resCodeVerterinarianExisted);
                        return;
                    }

                    done(null, res)

                })

            },

            function (result, done) {
                //添加兽医

                var veterinarianModel = VeterinarianModel.get();
                var veterinarian = new veterinarianModel({
                    name: name,
                    code: code,
                    created: Utils.now(),

                })

                veterinarian.save(function (err, veterinarianResult) {
                    if (err) {
                        onError(err, null);
                        return;
                    }
                  //  res.veterinarian = veterinarianResult
                    done(null,veterinarianResult);
                    onSuccess(veterinarianResult)
                })


            }

        ], function (err, result) { })

    }



}
module["exports"] =VeterinarianLogic