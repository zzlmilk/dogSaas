(function(global) {
    "use strict;"

    var Config = {
         APIEndpoint : '/dogsystem/v1',
         SpikaBaseURL : '/dogsystem',
         defaultContaier : 'body', // write JQuery style selector
         hostName:'http://localhost:7171',
        

        port:7070,

        //七牛相关配置
        QN:{
        	max_file_size:"2000mb",
        	chunk_size:"4M",
        	domain:"p080e0wd7.bkt.clouddn.com",
        	

        }


    };

    // Exports ----------------------------------------------
    module["exports"] = Config;

})((this || 0).self || global);
