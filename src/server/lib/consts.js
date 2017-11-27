	var Const = {};

 
  	 Const.responsecodeSucceed = 1;


  	 Const.httpCodeSucceed = 200;
     Const.httpCodeServerError =500;
     Const.httpCodeForbidden = 403;


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



     

      Const.credentialsMinLength = 6;

     // Exports ----------------------------------------------
    module["exports"] = Const;


