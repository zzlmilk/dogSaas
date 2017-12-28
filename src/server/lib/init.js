

	var Config = {};

	Config.host = "127.0.0.1";
    Config.port = 7171;
    Config.urlPrefix = '/dogSystem';
    Config.databaseUrl = "mongodb://localhost/dogsaas";

    Config.dbCollectionPrefix = "";


     //定义Qiniu Access Key 和 Secret Key
    Config.Qiniu = {
       accessKey :'k-ZxbCCBV3eLH5k2nUnSZo6OG_2zWfohupr_DZa2',
       secretKey : 'Hfc55Fa0yZnBdIeXa-KJL413ySfYnl-Oe8YlXii3',
       bucket : 'test',
    }
    Config.Wx={
        grant_type:'client_credential',
        appid:'wxeb1f9b8b9c147e83',
        secret:'7fa185f001fc0c286f8da3dce48b8d63'
    }
  

    // Exports ----------------------------------------------
    module["exports"] = Config;

    



     