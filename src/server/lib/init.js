

	var Config = {};

	Config.host = "127.0.0.1";
    Config.port = 7171;
    Config.urlPrefix = '/dogSystem';
    Config.databaseUrl = "mongodb://localhost/dogsaas";
    // Config.hostName="www.halokit.cn"
    Config.hostName="http://localhost"

    Config.dbCollectionPrefix = "";


     //定义Qiniu Access Key 和 Secret Key
    Config.Qiniu = {
       accessKey :'k-ZxbCCBV3eLH5k2nUnSZo6OG_2zWfohupr_DZa2',
       secretKey : 'Hfc55Fa0yZnBdIeXa-KJL413ySfYnl-Oe8YlXii3',
       bucket : 'test',
    }
    Config.Wx={
        grant_type:'client_credential',
        appid:'wx40d38f59e601216f',
        secret:'10efb790e0ecca9f117dc7c130c34ec0'
    }
  

    // Exports ----------------------------------------------
    module["exports"] = Config;

    



     