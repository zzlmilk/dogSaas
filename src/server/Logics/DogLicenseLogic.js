const Utils = require("../lib/Utils");
var validator = require('validator');
var Const = require("../lib/consts");
var async = require('async');
var _ = require('lodash');

var ResidenceModel = require('../Models/Residence');

var DogLicenseModel = require('../Models/DogLicense');
var DogModel = require('../Models/Dog');
var VaccineModel = require('../Models/Vaccine');

var OwnerModel = require('../Models/Owner');






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

									  onError(null,Consts.resCodeHaveResidenceParam)
										
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
											  		addressres:res.owner.address,
											  		district:res.owner.district,
											  		irisID:res.dog.irisID,
											  		breed:res.dog.breed,
											  		hairColor:res.dog.hairColor,
											  		loopLineType:1, //默认写死
											  		annualDate:Utils.annualDate([]),
											  		signOrganization:res.organization.name +"公安",
											  		signCretate:Utils.now(),
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

				
				

				


			  async.waterfall([
			  	function(done){
			  		//验证条形码没有被使用
			  		dogLicenseModel.findOne({"husbandryNo":param.husbandryNo},function(err,dogLicenseResult){
			  				if (dogLicenseResult) {
			  						console.log("wrong husbandryNo")
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
								  	 		  dogLicense.residence = residenceResult;
								  	 		 done(null,res)

								  	 })


			  					}

			  						

			  				});

			  		}

			  	},
			  	function(result,done){
			  		//录入免疫信息
			  		var vaccineModel = VaccineModel.get();
			  		var vaccine = new vaccineModel({
			  				name:vaccineParam.name,
			  				batchNo:vaccineParam.batchNo,
			  				manufacturer:vaccineParam.manufacturer,
			  				veterinarianName:vaccineParam.veterinarianName,
			  				organizationName:vaccineParam.organizationName,
			  				created:Utils.now()
			  		})
			  		vaccine.save(function(err,vaccineResult){
			  				res.vaccine = vaccineResult;
			  				done(null,res)			  				
			  		})


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
			  				  vaccine:res.vaccine
			  			})

			  			dog.save(function(err,dogResult){
			  				if (err) {
			  					throw err
			  				}
			  				res.dog = dogResult;
		  					dogLicense.dog = dogResult;

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
			  						dogLicense.owner = ownerResult;
			  						var dogs = ownerResult.dogs;
			  						dogs.push(res.dog)
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
							  						province:ownerParam.province,
							  						district:ownerParam.district,
							  						city:ownerParam.city,
							  						address:ownerParam.address,
							  						code:ownerParam.code,
							  					},
							  			//	 dogs:[result.dog],

							  		});

							  		owner.save(function(err,ownerResult){							  			
							  			if (err) { throw err; return;}
							  				dogLicense.owner = ownerResult;
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


						

						dogLicense.save(function(err,dogLicenseReslut){
								if (err) { throw err; return}

								if (dogLicenseReslut) {
									onSuccess(dogLicenseReslut)
								}
							
						})
			  			//dogLicense.save(function(err,r){})

			  	}

			  	],function(err,result){
			  			
			  })



			  		


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
			if(Utils.isEmpty(vaccine.name)){
                callback(Const.resCodeDogVaccineNoname)
			 		 return;
			 }
			 if(Utils.isEmpty(vaccine.batchNo)){
                callback(Const.resCodeDogVaccineNobatchNo)
			 		 return;
			 }
			 if(Utils.isEmpty(vaccine.manufacturer)){
                callback(Const.resCodeDogVaccineNomanufacturer)
			 		 return;
			 }
			 if(Utils.isEmpty(vaccine.veterinarianName)){
                callback(Const.resCodeDogVaccineNoveterinarianName)
			 		 return;
			 }
			 if(Utils.isEmpty(vaccine.organizationName)){
                callback(Const.resCodeDogVaccineNoorganizationName)
			 		 return;
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
		 if(Utils.isEmpty(owner.province)){
	                callback(Const.resCodeDogOwnerNoLocationProvince)
				 		 return;
				 }
		 if(Utils.isEmpty(owner.district)){
	                callback(Const.resCodeDogOwnerNoLocationdistrict)
				 		 return;
				 }		
		 if(Utils.isEmpty(owner.city)){
	                callback(Const.resCodeDogOwnerNoLocationcity)
				 		 return;
				 }						 		 
		 if(Utils.isEmpty(owner.address)){
	                callback(Const.resCodeDogOwnerNoLocationaddress)
				 		 return;
				 }		

		 if(Utils.isEmpty(owner.code)){
	                callback(Const.resCodeDogOwnerNoLocationdcode)
				 		 return;
				 }								 
					

			//验证通过		 
			callback(null)

		}




		
}


module["exports"] = DogLicenseLogic;