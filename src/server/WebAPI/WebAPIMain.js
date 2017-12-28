var express = require('express');
var router = express.Router();

var bodyParser = require("body-parser");
var _ = require('lodash');
var init = require('../lib/init.js');


var WebAPIMain = {
			init:function(app){
					var self = this;
					app.use(bodyParser.json());
					app.use('/',express.static(__dirname + '/../../../public'));


					//测试
					router.use("/test", require('./TestHandler'));

					//Verification Email
					router.use("/send/email",  require('./Email/SendEmailHandler'));
					router.use("/vaild/email", require('./Email/VaildEmailHandler'));


					//User
					router.use("/user/register", require('./User/RegisterHandler'));
					router.use("/user/login", require('./User/LoginHandler'));

										
					//set password
					router.use("/user/set_password",require('./User/SetPasswordHandler'));

					
					//AOrganizationHandler
					router.use("/organization/add", require('./Organization/AddOrganizationHandler'));
					router.use("/organization/edit", require('./Organization/EditOrganizationHandler'));
					router.use("/organization/show", require('./Organization/ShowOrganizationHandler'));
					//veterinarian
                    router.use("/organization/editVeterinarian", require('./Veterinarian/EditVeterinarianHandler'));



					//dogLicense
					router.use("/dogLicense/add", require('./DogLicense/AddDogLicenseHandler'));
				    router.use("/dogLicense/find_by_owner", require('./DogLicense/FindDogLicenseByOwnerHandler'));
                    router.use("/dogLicense/find_by_dog", require('./DogLicense/FindDogLicenseByDogHandler'));
                    router.use("/dogLicense/add_takeWay", require('./DogLicense/EditDogLicenseHandler'));


				      //owner
                    router.use("/owner/find", require('./Owner/FindOwnerHandler'));
                    



                    //ResidenceModel
                    router.use("/residence/edit", require('./Residence/EditResidenceHandler'));

                    //Vaccine
                    router.use("/vaccine/add", require('./Vaccine/AddVaccineHandler'));

                    //wx
                    router.use("/wx/add_user", require('./wx/AddWxUserHandler'));
                    router.use("/wx/token" ,require('./wx/getTokenHandler'));




                //Qiniu
					router.use("/Qiniu/token" ,require('./QiNiuHandler'));

					


					//api版本控制
					app.use(init.urlPrefix + "/v1", router);



			}


}


module["exports"] = WebAPIMain;