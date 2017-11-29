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

		//添加狗
		add:function(param, onSuccess, onError){			
			//验证参数
			var self = this;

			self.validatorParam(param,function(err){
					if (err) {
						onError(null,err)
						return;
					}
				
				var res = {};
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
			  						//改房产已经办理过
			  						if(residenceModel){
									  		dogLicense.DogCard = {
									  					isCreate:0,
													  	message:"改房产已经被注册",
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
								  	 		 dogLicense.residence = residenceResult._id
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


			  	},
			  	function(result,done){
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
			  				  vaccine:res.vaccine._id
			  			})

			  			dog.save(function(err,dogResult){
			  				if (err) {
			  					throw err
			  				}
			  				res.dog = dogResult;
		  					dogLicense.dog = dogResult._id;

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
							  				 dogs:[result.dog],

							  		});

							  		owner.save(function(err,ownerResult){							  			
							  			if (err) { throw err; return;}
							  				dogLicense.owner = ownerResult._id;
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