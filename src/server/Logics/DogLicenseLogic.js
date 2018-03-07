const Utils = require("../lib/Utils");
var validator = require('validator');
var Const = require("../lib/consts");
var async = require('async');
var _ = require('lodash');
var request=require('request')
var ResidenceModel = require('../Models/Residence');
var DogLicenseModel = require('../Models/DogLicense');
var DogModel = require('../Models/Dog');
var VaccineModel = require('../Models/Vaccine');
var OwnerModel = require('../Models/Owner');
var ReserveUserModel=require('../Models/ReserveUser');
var Conf = require("../lib/init");
var fs=require("fs")







var DogLicenseLogic = {


		//有了狗证之后创建Residence信息
		createResidence:function(param, onSuccess, onError){
					var residenceParam = param.residence;
					var dogLicense = param.dogLicense



			//根据户籍房产信息验证能不能办理狗证 DogCard
			  		if (Utils.isEmpty(residenceParam.houseProperty) || Utils.isEmpty(residenceParam.houseNo)
							|| Utils.isEmpty(residenceParam.address) || Utils.isEmpty(residenceParam.isSterilization)){
			  			

			  			onError(null,Consts.resCodeMissResidenceParam)


			  		}else{

			  				var res = {}
			  				res.dogLicense = dogLicense
			  				res.organization = param.organization

			  			async.waterfall([
						  	function(done){
						  			ResidenceModel.get().findOne({"address":residenceParam.address},function(err,residenceModel){
			  						//改房产已经办理过
			  						if(residenceModel){

									  onError(null,Const.resCodeHaveResidenceParam)
										
			  						}else{


								  	 //创建户籍对象
								  	 var residenceModel	= ResidenceModel.get();
								  	 var residence = new residenceModel({
								  	 		 houseProperty:residenceParam.houseProperty,
								  	 		 houseNo:residenceParam.houseNo,
								  	 		 address:residenceParam.address,
								  	 		 isSterilization:residenceParam.isSterilization,
								  	 		 created:Utils.now(),
								  	 })



								  	 residence.save(function(err,residenceResult){								  	 		 
								  	 		 //更新 
								  	 		done(null,residenceResult)


								  	 })


			  					}

			  						

			  				  });
						  	}
						  	,function(result,done){
						  		//更新户籍信息						  		
						  		dogLicense.residence = result._id;
						  		done(null,result);
						  			
						  		// dogLicense.save(function(err,r){
						  		// 	console.log(r)
						  		// })

						  	},
						  	function(result,done){
						  			//寻找主人信息
						  			 OwnerModel.get().findOne({"_id":dogLicense.owner},function(err,ownerResult){
						  			 		if (ownerResult) {
						  			 			res.owner = ownerResult
						  			 			done(null,result)
						  			 		}else{
						  			 			done("no ownerResult",null)						  			 			
						  			 		}
						  			 })
						  	},
						  	function(result,done){
						  		//寻找狗信息
						  		DogModel.get().findOne({"_id":dogLicense.dog},function(err,dogResult){
						  			 		if (dogResult) {
						  			 			res.dog = dogResult
						  			 			done(null,result)
						  			 		}else{
						  			 			done("no dogResult",null)						  			 			
						  			 		}
						  			 })

						  	},


						  	function(result,done){
						  			//更新dogcard信息
						  			dogLicense.DogCard = {
									isCreate:1,
									message:"成功办理狗证",
									create:Utils.now(),		
									annual:{
										  		canAnnual:0,  
										  		updateDate:Utils.now(),
										 },
										 info:{
											  		cardNo:Utils.dogCardNo(),	
											  		name:res.owner.name,
											  		addresses:res.owner.location.address,
											  		district:res.owner.location.district,
											  		irisID:res.dog.irisID,
											  		breed:res.dog.breed,
											  		hairColor:res.dog.hairColor,
											  		loopLineType:1, //默认写死
											        annualDate:Utils.annualDate([]),
											  		signOrganization:res.organization.name +"公安",
											  		signCreate:Utils.now(),
											  		vaccineCreate:Utils.now(),

												 }

								}

								dogLicense.save(function(err,dogLicenseResult){
									if (err) {
										throw err
									}
										if (dogLicenseResult) {
												onSuccess(dogLicenseResult)
										}
								})

						  	}
						  	],function(err,result){

						  	})

			  		

			  		}



		},

		//添加狗证
		add:function(param, onSuccess, onError){			
			//验证参数
			var self = this;

			self.validatorParam(param,function(err){
					if (err) {
						onError(null,err)
						return;
					}
				

				var res = {};
				res.user = param.user
				res.organization = param.organization

				var dogParam = param.dog
				var vaccineParam = param.dog.vaccine




				var ownerParam = param.owner
				var residenceParam = param.residence

				var dogLicenseModel = DogLicenseModel.get();
				var dogLicense = new dogLicenseModel({})
				var code=param.code;

				
				

				


			  async.waterfall([
			  	function (done) {
			  		if(Utils.isEmpty(code)){
			  			done(null,res);
                    }else{
                        var reserveUserModel=ReserveUserModel.get();
                        reserveUserModel.findOne({code:code},function (err,result) {
                            result.type=-1;
                            result.save(function (err,result) {
                            	if(err){
                            		throw err;
								}
								done(null,result)

							})
                        })
                    }
				},
			  	function(result,done){
			  		//验证条形码没有被使用
			  		dogLicenseModel.findOne({"husbandryNo":param.husbandryNo},function(err,dogLicenseResult){
			  				if (dogLicenseResult) {
			  						//console.log("wrong husbandryNo")
			  					onError(null, Const.resCodeDogWorngHusbandryNo);
			  				}else{
			  					dogLicense.husbandryNo = param.husbandryNo;
			  					done(null,res)
			  				}
			  		})

			  	},

			  	function(result,done){
			  		//根据户籍房产信息验证能不能办理狗证 DogCard
			  		if (Utils.isEmpty(residenceParam.houseProperty) || Utils.isEmpty(residenceParam.houseNo)
							|| Utils.isEmpty(residenceParam.address) || Utils.isEmpty(residenceParam.isSterilization)){
			  			dogLicense.DogCard = {
			  					isCreate:0,
							  	message:"miss residence param",
			  			}

			  			done(null,dogLicense)

			  		}else{
			  			ResidenceModel.get().findOne({"address":residenceParam.address},function(err,residenceModel){
			  						//该房产已经办理过
			  						if(residenceModel){
									  		dogLicense.DogCard = {
									  					isCreate:0,
													  	message:"该房产已经被注册",
									  			}

									  	done(null,dogLicense)
										
			  						}else{
			  							//可以办理
		  							dogLicense.DogCard = {
								  					isCreate:1,
												  	message:"可以办理狗证",
								  			}

								  	 //创建户籍对象
								  	 var residenceModel	= ResidenceModel.get();
								  	 var residence = new residenceModel({
								  	 		 houseProperty:residenceParam.houseProperty,
								  	 		 houseNo:residenceParam.houseNo,
								  	 		 address:residenceParam.address,
								  	 		 isSterilization:residenceParam.isSterilization,
								  	 		 created:Utils.now(),
								  	 })

								  	 residence.save(function(err,residenceResult){
								  	 		 res.residence = residenceResult;					  	 									  	 		
								  	 		  dogLicense.residence = residenceResult._id;
								  	 		 done(null,res)

								  	 })


			  					}

			  						

			  				});

			  		}

			  	},
			  	function(result,done){
			  		//录入免疫信息
			  			var vaccineModel = VaccineModel.get();
					    var vaccineList = [];
			  		_.forEach(vaccineParam,function(_vaccine){
						    var vaccine = new vaccineModel({
			  				name:_vaccine.name,
			  				batchNo:_vaccine.batchNo,
			  				manufacturer:_vaccine.manufacturer,
			  				veterinarianName:_vaccine.veterinarianName,
			  				organizationName:_vaccine.organizationName,
			  				created:Utils.now(),
			  				husbandryNo:param.husbandryNo

			  			});
						vaccine.save(function(err,vaccineResult){
			  				
			  			})
						vaccineList.push(vaccine)

			  		})
					     res.vaccines = vaccineList;
                         done(null,res)
				},function (result,done) {
			  		//验证irisID唯一性
			  		 var dogModel=DogModel.get();
			  		 var irisID=dogParam.irisID;
			  		 dogModel.findOne({irisID:irisID},function (err,irisIDResult) {
			  			if(irisIDResult){
			  		 		onError(null, Const.resCodeDogIrisIDExisted);
						 	return;
						 }
						done(null,res);
                     })

                  },function(result,done){
			  			//录入宠物dog 信息
			  			var dogModel =  DogModel.get();
			  			var dog = new dogModel({
			  				  nickname:dogParam.nickname,
			  				  sex:dogParam.sex,
			  				  breed:dogParam.breed,
			  				  usage:dogParam.usage,
			  				  hairColor:dogParam.hairColor,
			  				  bornDate:dogParam.bornDate,
			  				  photoUrl:dogParam.photoUrl,
			  				  irisID:dogParam.irisID,
			  				  vaccine:res.vaccines
			  			})

			  			dog.save(function(err,dogResult){
			  				if (err) {
			  					throw err
			  				}
			  				res.dog = dogResult;
		  					dogLicense.dog = dogResult.id;

							done(null,res)
			  			})

			  		
			  	},

			  	function(res,done){		
			  		//录入主人信息
			  		//console.log("ownerParam",ownerParam)
			  		//先查找主人信息是否存在
			  		var ownerModel = OwnerModel.get();
			  		ownerModel.findOne({"certificateType":ownerParam.certificateType,"certificateCode":ownerParam.certificateCode},function(err,ownerResult){

			  				if (err) { throw err}
			  				if (ownerResult) {
			  						//已经有主人信息
			  						dogLicense.owner = ownerResult._id;
			  						var dogs = ownerResult.dogs;
			  						dogs.push(res.dog._id)
			  						ownerResult.dogs = dogs
			  						res.owner = ownerResult
			  						ownerResult.save(function(err,oResult){
			  							if (err) { throw err; return}			  							
			  								done(null,dogLicense)
			  						})
			  				}else{
			  					//没有主人信息，创建
							  		var owner = new ownerModel({
							  					name:ownerParam.name,
							  					sex:ownerParam.sex,
							  					phone:ownerParam.phone,
							  					tel:ownerParam.tel,							  					
							  					certificateType:ownerParam.certificateType,
							  					certificateCode:ownerParam.certificateCode,							  					
							  					location:{
							  						province:ownerParam.location.province,
							  						district:ownerParam.location.district,
							  						city:ownerParam.location.city,
							  						address:ownerParam.location.address,
							  						code:ownerParam.location.code,
							  					},
							  			//	 dogs:[result.dog],

							  		});

							  		owner.save(function(err,ownerResult){							  			
							  			if (err) { throw err; return;}
							  				dogLicense.owner = ownerResult._id;
							  				res.owner = ownerResult
							  				done(null,dogLicense)
							  		})


			  				}

			  		})
			  	},
			  	function(result,done){		
			  	//判断是不是能治疫苗卡 vaccineCard 	  				  						  		
			  	//因为参数之前都验证过所以到这里总能办理疫苗卡

			  			
			  			dogLicense.vaccineCard = {
								  					isCreate:1,
												  	message:"可以疫苗卡狗证",													  	
												  	create:Utils.now(),		
												  	annual:{
												  		canAnnual:1,
												  		updateDate:Utils.now(),
												  	},
												  	info:{
												  		cardNo:Utils.vaccineCardNo(),	
												  		name:res.owner.name,
												  		addresses:res.owner.location.address,
												  		district:res.owner.location.district,
												  		irisID:res.dog.irisID,
												  		breed:res.dog.breed,
												  		hairColor:res.dog.hairColor,
												  		annualDate:Utils.annualDate([]),
												  		signOrganization:res.organization.name,
												  		signCreate:Utils.now(),
												  		vaccineCreate:Utils.now(),

												  	}

								  			}
						
						//有户籍信息就可以直接办理狗证
						if (dogLicense.DogCard.isCreate == 1) {
								dogLicense.DogCard = {
									isCreate:dogLicense.DogCard.isCreate,
									message:dogLicense.DogCard.message,
									create:Utils.now(),		
									annual:{
										  		canAnnual:0,  
										  		updateDate:Utils.now(),
										 },
										 info:{
											  		cardNo:Utils.dogCardNo(),	
											  		name:res.owner.name,
											  		addresses:res.owner.location.address,
											  		district:res.owner.location.district,
											  		irisID:res.dog.irisID,
											  		breed:res.dog.breed,
											  		hairColor:res.dog.hairColor,
											  		loopLineType:1, //默认写死
											  		annualDate:Utils.annualDate([]),
											  		signOrganization:res.organization.name +"公安",
											  		signCreate:Utils.now(),
											  		vaccineCreate:Utils.now(),

												 }

								}
						}	  			


						

						dogLicense.save(function(err,dogLicenseResult){
								if (err) { throw err; return}

								if (dogLicenseResult) {
									done(null,dogLicenseResult)

								}
							
						})
			  			//dogLicense.save(function(err,r){})

			  	},function (result,done) {
                      var dogLicenseModel = DogLicenseModel.get();
                      dogLicenseModel.findOne({"_id":result}).populate("owner")
                          .populate({path:"dog",populate:{path: "vaccine"}}).exec(function (err,dogLicenseResult) {
                          if (err) {
                              throw(err);

                          } else {
                              res.dogLicense=dogLicenseResult;
                              done(null,res);
                              }
                      })
                  },function (result,done) {
                      var wx_getToken_url='https://api.weixin.qq.com/cgi-bin/token?grant_type='+Conf.Wx.grant_type+'&appid='+Conf.Wx.appid+'&secret='+Conf.Wx.secret;
                      request({
                          method:'GET',
                          url:wx_getToken_url
					  },function (err,res,body) {
                      	if(err){
                              throw err;
                          }else{
                              var data=JSON.parse(body);
                              done(null,data);
                      	}
                      })
                  },function (result,done) {
			  	       request({
                          method:"POST",
                          url:'https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token='+result.access_token,
                          body: JSON.stringify({
                              scene: res.dogLicense._id,
                              path: "pages/my/my",
                              width: 280
                          })
                      }).pipe(fs.createWriteStream('../../image/'+res.dogLicense._id+'.png'));
                           onSuccess(res);
                       }
			  	],function(err,result){
			  })
			})
		},


	   //通过主人姓名，手机号和身份证号查询狗证信息
	    find_by_owner: function (param, onSuccess, onError) {
        var name = param.name;
        var phone=param.phone;
        var certificateType=param.certificateType;
        var certificateCode=param.certificateCode;
        var page=param.page||1
		var res={};
        var dogLicenseModel = DogLicenseModel.get();
        var dogModel = DogModel.get();
        var ownerModel = OwnerModel.get();
        var vaccineModel=VaccineModel.get();
        var residenceModel=ResidenceModel.get();


        async.waterfall([
            function (done) {
                ownerModel.find ({$or:[{name:name},{phone:phone},{certificateType:certificateType,
                    certificateCode:certificateCode}]}, function (err, ownerResult) {

                    if (err) {
                        throw err;
                    }
                    else {
                        done(null, ownerResult)


                    }
                })
            },


            function (result, done) {
                if(Utils.isEmpty(name)&&Utils.isEmpty(phone)&&Utils.isEmpty(certificateCode)){
                    dogLicenseModel.count().exec(function(err,count){
                        if(err){
                            throw err
                        }else{
							res.count=count;
						}
                    })
                dogLicenseModel.find().populate("owner residence")
                    .populate({path:"dog",populate:{path: "vaccine"}}).sort({"vaccineCreate":1}).skip(Utils.skip(page)).limit(Const.dogLicensesListLimit).exec(function (err,dogLicenseResult) {
                    if (err) {
                        throw err;
					} else {
                        res.dogLicenses = dogLicenseResult;
                        onSuccess(res);
					}
                })
                }else{
                    dogLicenseModel.find({owner: result}).count().exec(function(err,count){
                        if(err){
                            throw err
                        }else{
                            res.count=count;
                        }
                    });

					dogLicenseModel.find({owner: result}).populate("owner residence")
                        .populate({path:"dog",populate:{path: "vaccine"}}).sort({"vaccineCreate": 1}).skip(Utils.skip(page)).limit(Const.dogLicensesListLimit).exec(function (err, dogLicenseResult) {
                        if (err) {
                            throw err;
						} else {
                            res.dogLicenses = dogLicenseResult;

							onSuccess(res);
						}
					})
                }
			}
		], function (err,result) {
		})
    },
     //通过虹膜id 和免疫卡号查询狗证信息
    find_by_dog: function (param, onSuccess, onError) {
        var irisID = param.irisID;
		var vaccineCardNo=param.vaccineCardNo;
		var page=param.page||1;
		var res={};
        var dogLicenseModel = DogLicenseModel.get();
        var dogModel = DogModel.get();
        var ownerModel = OwnerModel.get();
        var vaccineModel=VaccineModel.get();
        var residenceModel=ResidenceModel.get();

		async.waterfall([
			function (done) {
                if (Utils.isEmpty(irisID) && Utils.isEmpty(vaccineCardNo)) {
                    dogLicenseModel.count().exec(function(err,count){
                        if(err){
                            throw err
                        }else{
							res.count=count;
						}
                    });
                    dogLicenseModel.find().populate("owner residence").populate({path:"dog",populate:{path: "vaccine"}}).sort({"vaccineCreate": 1}).skip(Utils.skip(page)).limit(Const.dogLicensesListLimit).exec(function (err, dogLicenseResult) {
                        if (err) {
                            throw err;
                        }
                        else {
                            res.dogLicenses = dogLicenseResult //符合条件的集合
							onSuccess(res)
                        }

                    })

                } else {
                    dogLicenseModel.find({$or: [{"vaccineCard.info.irisID": irisID}, {"vaccineCard.info.cardNo": vaccineCardNo}]}).count().exec(function(err,count){
                        if(err){
                            throw err
                        }else{
                            res.count=count;
						}
                    });
                    dogLicenseModel.find({$or: [{"vaccineCard.info.irisID": irisID}, {"vaccineCard.info.cardNo": vaccineCardNo}]})
                        .populate("owner residence").populate({path:"dog",populate:{path: "vaccine"}}).sort({"vaccineCreate": 1}).skip(Utils.skip(page)).limit(Const.dogLicensesListLimit).exec(function (err, dogLicenseResult) {
                        if (err) {
                            throw err;
                        }
                        else {
							res.dogLicenses = dogLicenseResult //符合条件的集合
                            onSuccess(res);

                        }

                    })
                }
            }

        ], function (err,result) {

        })
    },
    add_takeWay:function(param, onSuccess, onError) {//添加取证方式

        var dogLicense=param.dogLicense
		var takeWay=param.takeWay
		if(Utils.isEmpty(takeWay)){
				onError(null,Const.resCodeDogLicenseNoTakeway);
           return;
		}
		dogLicense.DogCard.info.takeWay=takeWay;

		dogLicense.save(function (err,dogLicense) {
			if(err){
				throw  err;
			}else{

				onSuccess(dogLicense);
			}
		})
	},
	editVaccine:function (param,onSuccess,onError) {//免疫年检，更新免疫信息
        var vaccineParam = param.vaccine;
        var dogLicense = param.dogLicense;
        var husbandryNo=param.husbandryNo;
		var dogLicenseModel=DogLicenseModel.get();
        var ownerModel=OwnerModel.get();
        var dogModel=DogModel.get();
        var residence=ResidenceModel.get();
        var res={};
        if(Utils.isEmpty(husbandryNo)){
        	onError(null,Const.resCodeDogNoHusbandryNo);
        	return;
		}
        async.waterfall([
            function (done) {//验证条形码有没有被使用过
                dogLicenseModel.findOne({"husbandryNo":husbandryNo},function(err,dogLicenseResult){
                    if (dogLicenseResult) {
						   onError(null, Const.resCodeDogWorngHusbandryNo);
					}else{
                    	done(null,res);
					}
                })
            },function (result,done) {
        	var vaccineModel=VaccineModel.get();
                var vaccine = new vaccineModel({
                    name:vaccineParam.name,
                    batchNo:vaccineParam.batchNo,
                    manufacturer:vaccineParam.manufacturer,
                    veterinarianName:vaccineParam.veterinarianName,
                    organizationName:vaccineParam.organizationName,
                    created:Utils.now(),
                    husbandryNo:husbandryNo
                });
                vaccine.save(function (err, vaccine) {
                    if (err) {
                        throw err;
                    }else{
						done(null,vaccine);
					}
				})
			},function (result,done) {
                dogModel.findOne({"_id": dogLicense.dog}, function (err, dogResult) {
                    if (err) {
                        throw err;
                    } else {
                        var vaccines = dogResult.vaccine;
                        vaccines.push(result);
                        dogResult.vaccine = vaccines;
                        done(null, dogResult)
                    }
                })

            }, function (result, done) {
                result.save(function (err, dog) {
                    if (err) {
                        throw err
                    }else {
                        done(null, dog);
                    }
                })

            }, function (result, done) {
        	  res.dog=result;
              dogLicense.vaccineCard.annual.updateDate=Utils.now();
              var annualDate=dogLicense.vaccineCard.info.annualDate;
              dogLicense.vaccineCard.info.annualDate=Utils.annualDate(annualDate);
              dogLicense.save(function (err, res) {
                    if (err) {
                        throw err
                    } else {
                        done(null, res);

                    }
                })

            },function (result,done) {
                var dogLicenseModel = DogLicenseModel.get();
                dogLicenseModel.find({"_id":result}).populate("owner residence")
                    .populate({path:"dog",populate:{path: "vaccine"}}).exec(function (err,res) {
                    if (err) {
                        throw err;

                    } else {
						onSuccess(res)

                    }
                })
            }
        ],function (err,result) {
            
        })
	},
	validatorParam:function(param,callback){
			//条形码
			if(Utils.isEmpty(param.husbandryNo)){
	                callback(Const.resCodeDogNoHusbandryNo)
				 		 return;
				 }


			var dog = param.dog
			//验证狗对象
			if(Utils.isEmpty(dog.nickname)){
	                callback(Const.resCodeDogNoNickname)
				 		 return;
				 }
			 if(Utils.isEmpty(dog.sex)){
			 	callback(Const.resCodeDogNoSex)
			 		 return;
			 }
			 if(Utils.isEmpty(dog.breed)){
			 	callback(Const.resCodeDogNobreed)
			 		 return;
			 }
			 if(Utils.isEmpty(dog.usage)){
			 	callback(Const.resCodeDogNousage)
			 		 return;
			 }
			 if(Utils.isEmpty(dog.hairColor)){
			 	callback(Const.resCodeDogNohairColor)
			 		 return;
			 }
			 if(Utils.isEmpty(dog.bornDate)){
			 	callback(Const.resCodeDogNobornDate)
			 		 return;
			 }
			 if(Utils.isEmpty(dog.irisID)){
			 	callback(Const.resCodeDogNoIrisID)
			 		 return;
			 }
			 if(Utils.isEmpty(dog.photoUrl)){
			 	callback(Const.resCodeDogNoPhotoUrl)
			 		 return;
			 }

			 //免疫信息
			 var vaccine = param.dog.vaccine;

        if(!_.isArray(vaccine) ||  vaccine[0] == null){

            callback(Const.resCodeVaccineNotArray);



        }
		 var owner = param.owner;
		 if(Utils.isEmpty(owner.name)){
                callback(Const.resCodeDogOwnerNoname)
			 		 return;
			 }

		 if(Utils.isEmpty(owner.sex)){
                callback(Const.resCodeDogOwnerNosex)
			 		 return;
			 }
		 if(Utils.isEmpty(owner.tel)){
                callback(Const.resCodeDogOwnerNotel)
			 		 return;
			 }				 
		if(Utils.isEmpty(owner.phone)){
                callback(Const.resCodeDogOwnerNoPhone)
			 		 return;
			 }
		 if(Utils.isEmpty(owner.certificateType)){
                callback(Const.resCodeDogOwnerNoCertificateType)
			 		 return;
			 }
		if(Utils.isEmpty(owner.certificateCode)){
                callback(Const.resCodeDogOwnerNocertificateCode)
			 		 return;
			 }
		 if(Utils.isEmpty(owner.location.province)){
	                callback(Const.resCodeDogOwnerNoLocationProvince)
				 		 return;
				 }
		 if(Utils.isEmpty(owner.location.district)){
	                callback(Const.resCodeDogOwnerNoLocationdistrict)
				 		 return;
				 }		
		 if(Utils.isEmpty(owner.location.city)){
	                callback(Const.resCodeDogOwnerNoLocationcity)
				 		 return;
				 }						 		 
		 if(Utils.isEmpty(owner.location.address)){
	                callback(Const.resCodeDogOwnerNoLocationaddress)
				 		 return;
				 }		

		 if(Utils.isEmpty(owner.location.code)){
	                callback(Const.resCodeDogOwnerNoLocationdcode)
				 		 return;
				 }								 
					

			//验证通过		 
			callback(null)

		}




		
}


module["exports"] = DogLicenseLogic;