	var Const = {};

 
  	 Const.responsecodeSucceed = 1;


  	 Const.httpCodeSucceed = 200;
     Const.httpCodeServerError =500;
     Const.httpCodeForbidden = 403;

     Const.httpCodeNodogLicenseId = 4000001;


     Const.resCodeRegisterNoEmail = 1000001
     Const.resCodeRegisterNoPassword  = 1000002
    

     
     Const.resCodeLoginNoEmail  = 1000003
     Const.resCodeLoginNoPassword  = 1000004

     //组织参数不全
      Const.resCodeOrganizationParamIsEmpty = 1000005;


      Const.resCodeDayuNoEmail = 1000006;
      Const.resCodeDayuNoCode = 1000007;
      
      Const.resCodeLoginNoUseType = 1000008;


      Const.resCodeRegisterNoCode  = 1000009;

      Const.resCodeSetPassWordLengthError = 2000001

      Const.resCodeLoginNoUser = 2000002

      Const.resCodeLoginPasswordError = 2000003

      Const.resCodeRegisterWrongEmail = 2000004
      Const.resCodeRegistererrEmail = 2000005


      Const.resCodeAddOrganizationExisting = 2000006


      Const.resCodeSendEmailWrongEmail = 2000007 //此邮箱已经被注册
      Const.resCodeSendEmailNullEmailUser = 2000008; //不存在改账户

      Const.resCodeDayuVaildeCodeSuccess = 1; //验证码 验证成功
      Const.resCodeDayuVaildeCodeError = 2000009 // 无效的验证码
      Const.resCodeLoginerrEmail=2200001;


      //dog
      Const.resCodeDogNoNickname =  2000010; //缺少宠物昵称
      Const.resCodeDogNoSex = 2000011 
      Const.resCodeDogNobreed = 2000012
      Const.resCodeDogNousage  = 2000013
      Const.resCodeDogNohairColor =2000014
      Const.resCodeDogNobornDate = 2000015;
      Const.resCodeDogNoIrisID =  2000016
      Const.resCodeDogNoPhotoUrl  = 2000017

      //owner
      Const.resCodeDogOwnerNoname = 2000018
      Const.resCodeDogOwnerNosex = 2000019
      Const.resCodeDogOwnerNoPhone = 2000020
      Const.resCodeDogOwnerNoCertificateType = 2000021
      Const.resCodeDogOwnerNocertificateCode =2000022
      Const.resCodeDogOwnerNoLocationProvince = 2000023
      Const.resCodeDogOwnerNoLocationdistrict = 2000024
      Const.resCodeDogOwnerNoLocationcity = 2000025
      Const.resCodeDogOwnerNoLocationaddress =2000026
      Const.resCodeDogOwnerNoLocationdcode = 2000027
      Const.resCodeDogOwnerNotel = 2000028


      //vaccine
      Const.resCodeDogVaccineNoname = 2000029
      Const.resCodeDogVaccineNobatchNo = 2000030
      Const.resCodeDogVaccineNomanufacturer = 2000031
      Const.resCodeDogVaccineNoveterinarianName = 2000032
      Const.resCodeDogVaccineNoorganizationName =2000033


     Const.resCodeDogNoHusbandryNo = 2000034
     Const.resCodeDogWorngHusbandryNo = 2000035 //已经被使用过的条形码
    Const.resCodeFindOwnerParamIsEmpty=2000036
    Const.resCodeFindDogParamIsEmpty=2100035
    Const.resCodeVaccineCardNocardNo=2100036
    Const.resCodeVerterinarianNoName=2100037
    Const.resCodeVerterinarianNoCode=2100038
    Const.resCodeVerterinarianNotArray=2100039
    Const.resCodeDogIrisIDExisted=2100040



    Const.resCodeResidenceCanNotUpdate=2000038

    Const.resCodeMissResidenceParam = 2000039
    Const.resCodeHaveResidenceParam = 2000040







     
      




     

      Const.credentialsMinLength = 6;

     // Exports ----------------------------------------------
    module["exports"] = Const;


