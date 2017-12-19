const Utils = require("../lib/Utils");
var validator = require('validator');
var Const = require("../lib/consts");
var async = require('async');
var _ = require('lodash');


var OrganizationModel = require('../Models/Organization');
var UserModel = require('../Models/User');
var VeterinarianModel=require('../Models/Veterinarian');


var OrganizationLogics = {


	

	add: function (param, onSuccess, onError) {
		var self = this;

		var user = param.user
		


		self.validatorParam(param.body, function (err) {
			if (err) {
				onError(null,
                    err
				)
				return;
			}
			var organizationParam = param.body



			var res = {}
			async.waterfall([
				function (done) {

					//用户是否能添加机构
					if (user.organization) {

						if (user.email == "413124766@qq.com") {

								done(null, res)
								return;
						}

						onError(null, Const.resCodeAddOrganizationExisting);
						return;
					}


					done(null, res)
				},
                //添加兽医逻辑
                function (result, done) {
 						var veterinarianModel =  VeterinarianModel.get();
                		var veterinarians = param.body.veterinarians;
                		var veterinarianList = [];
                		_.each(veterinarians,function(item){


                    		 var veterinarian = new veterinarianModel({
                    		     name: item.name,
                    		     code: item.code
                    		 });


                    		

                    		 veterinarianList.push(veterinarian._id)

                    		 veterinarian.save(function(err,veterinarianResult){
                    		 		
                    		 })


                		});

                		res.veterinarianList = veterinarianList

                		done(null,res)
                },
				function (result, done) {
					//添加机构信息
					var organizationModel = OrganizationModel.get();
					var organization = new organizationModel({

                                name: organizationParam.name,
                            location: {
                                province: organizationParam.province,
                                district: organizationParam.district,
                                city: organizationParam.city,
                                address: organizationParam.address,
                                code: organizationParam.code
                            },
                            tel: organizationParam.tel,
                            businessLicense: organizationParam.businessLicense,
                            animalMedicalLicense: organizationParam.animalMedicalLicense,
                            contacts: {
                                name: organizationParam.contacts_name,
                                phone: organizationParam.contacts_phone,
                            },

                            adminUser: user._id,
                            checkStatus: {
                                status: 0,
                                time: Utils.now()
                            },

                        veterinarians:res.veterinarianList,
                        serviceScope:organizationParam.serviceScope,
						created: Utils.now()


					});


					





					organization.save(function (err, organizationResult) {

						if (err) {
							done(err, null)
							return;
						}


						res.organization = organizationResult;
						done(null, res)

					})

				},

				function (result, done) {
					//添加机构成功后 更新改账户为VIP 超级管理员和关联用户于机构信息
					user.update({
						organization: res.organization._id,
						logionProcess: 1, //机构添加后，等待机构审核
					}, function (err, userResult) {
						if (err) {
							onError(err, null);
							return;
						}

						if (userResult) {
							onSuccess(res)
						}

					});
				}


			], function (err, result) {
				if (err) {
					onError(err, null);
					return;
				}
			})


		})
	},

	editVeterinarian: function (param, onSuccess, onError) {

		var organization=param.organization


        var name = param.name;
		var code = param.code;

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

                veterinarian.save(function (err, veterinarian) {
                    if (err) {
                        throw err;
                    }else{

                        done(null,veterinarian);


                    }

                })


            },function (result, done) {

                var veterinarians = organization.veterinarians;
                veterinarians.push(result)
				organization.veterinarians = veterinarians;

                organization.save(function (err, res) {

                    if (err) {
                        throw err
                    }

					done(null, res)
					onSuccess(res)

                })

            }

        ], function (err, result) { })




    },
	show: function (param, onSuccess, onError) {
        var veterinarianModel =  VeterinarianModel.get();

		var res = {};
		async.waterfall([
			function (done) {
				OrganizationModel.get().findOne().populate({path:'adminUser',token:param.user.token}).populate("veterinarians").exec(function(err,organization){
					if (err) {
						throw  err;
					}
					if (organization) {
						res.organization = organization;
						done(null,res);
						onSuccess(res);

					}
				});

			}
		], function (err, result) {
			if (err) {
				onError(err, null);
				return;

			}
		})
	},
	validatorParam: function (param, callback) {



		    var name = param.name,
			province = param.province,
			district = param.district,
			city = param.city,
			address = param.address,
			code = param.code,
			tel = param.tel,
			businessLicense = param.businessLicense,
			animalMedicalLicense = param.animalMedicalLicense,
			serviceScope = param.serviceScope,
			contacts_name = param.contacts_name,
			contacts_phone = param.contacts_phone;

			var veterinarians = param.veterinarians;

			




		if (Utils.isEmpty(name) || Utils.isEmpty(province)
                || Utils.isEmpty(district) || Utils.isEmpty(city)
                || Utils.isEmpty(address) || Utils.isEmpty(code)
                || Utils.isEmpty(tel) || Utils.isEmpty(businessLicense)
                || Utils.isEmpty(animalMedicalLicense) || Utils.isEmpty(serviceScope)
                || Utils.isEmpty(contacts_name) || Utils.isEmpty(contacts_phone)) {


                callback(Const.resCodeOrganizationParamIsEmpty);
		}

		if(!_.isArray(veterinarians) ||  veterinarians[0] == null){

            callback(Const.resCodeVerterinarianNotArray);



		}




        
			callback();

	},


}


module["exports"] = OrganizationLogics;