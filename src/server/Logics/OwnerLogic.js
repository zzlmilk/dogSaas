const Utils = require("../lib/Utils");
var validator = require('validator');
var Const = require("../lib/consts");
var async = require('async');
var _ = require('lodash');
var OwnerModel = require('../Models/Owner');
var WxUserModel=require('../Models/WxUser')
var DogLicenseModel = require('../Models/DogLicense');


var OwnerLogic = {

    findOwner: function (param, onSuccess, onError) {

         var certificateType =param.certificateType;
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
    },

add_wxUser:function (param,onSuccess,onError) {
        var openId=param.openId;
        var nickname=param.nickname;
        var photo=param.photo;
        var sex=param.sex;
        var dogLicenses = param.dogLicenses;
        var res={};
        if(Utils.isEmpty(openId)){
            onError(null,Const.resCodeAddWxUserNoOpenId);
                return;
         }
        if(Utils.isEmpty(nickname)){
            onError(null,Const.resCodeAddWxUserNoNickname);
                return;
        }
         if(Utils.isEmpty(photo)){
            onError(null,Const.resCodeAddWxUserNoPhoto);
              return;
        }
        if(Utils.isEmpty(sex)){
            onError(null,Const.resCodeAddWxUserNoSex);
            return;
        }
       if(!_.isArray(dogLicenses) ||  dogLicenses[0] == null){

           onError(Const.resCodeAddWxUserDogLicenseNotArry);
       }
      async.waterfall([
           function (done) {
                dogLicenseList=[];
                _.each(dogLicenses,function(item) {
                    dogLicenseList.push(item);
                });
                 res.dogLicenseList=dogLicenseList;
                 done(null, res)
           },
           function (result,done) {
               var wxUserModel = WxUserModel.get();
               wxUserModel.findOne({openId:openId},function (err,wxUser) {
                   if(err) {
                       throw  err;
                   }
                   if(wxUser){
                      wxUser.dogLicenses= wxUser.dogLicenses.concat(res.dogLicenseList);
                       var dogLicense=wxUser.dogLicenses;
                       var ret = [];
                       dogLicense.forEach(function(e, i, dogLicense) {
                           if (dogLicense.indexOf(e) === i) {
                               ret.push(e);
                           }
                           return ret;
                       });
                       wxUser.dogLicenses=ret;
                       wxUser.save(function (err, wxUserResult) {
                           if (err) {
                               throw err;
                           }
                           else {
                               done(null,wxUserResult);
                           }
                       })
                   }else{
                       var wxUserModel = WxUserModel.get();
                       var wxUser = new wxUserModel({
                           openId:openId,
                           nickname: nickname,
                           photo:photo,
                           sex:sex,
                           dogLicenses:res.dogLicenseList,
                           created: Utils.now()
                       });
                       wxUser.save(function (err, wxUserResult) {

                           if (err) {
                               throw err;
                           }
                           else {
                              done(null,wxUserResult);
                           }
                       })
                   }
               })
           },function (result,done) {
               var dogLicenseModel=DogLicenseModel.get();
               var wxUserModel = WxUserModel.get();
               wxUserModel.findOne({_id:result}).populate("dogLicenses").exec(function (err,wxUserResult) {
                   if(err){
                       throw  err;
                   }else{
                       onSuccess(wxUserResult)
                   }
               })
          }
       ],function (err,result) {
        })
    }
};


module["exports"] =OwnerLogic;