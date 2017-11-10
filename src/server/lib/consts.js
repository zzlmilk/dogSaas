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

      Const.resCodeSetPassWordLengthError = 2000001

      Const.resCodeLoginNoUser = 2000002

      Const.resCodeLoginPasswordError = 2000003

      Const.resCodeRegisterWrongEmail = 2000004
      Const.resCodeRegistererrEmail = 2000005


      Const.resCodeAddOrganizationExisting = 2000006

     

      Const.credentialsMinLength = 6;

     // Exports ----------------------------------------------
    module["exports"] = Const;


