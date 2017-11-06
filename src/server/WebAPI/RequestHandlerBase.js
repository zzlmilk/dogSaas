var Const = require("../lib/consts");




var RequestHandlerBase = function(){
    
}


RequestHandlerBase.prototype.errorResponse = function(response,httpCode){
    response.status(httpCode);
    response.send("");

}


RequestHandlerBase.prototype.testResponse = function(response,code,data){
   // response.status(code);
   
    response.json(data);

}




RequestHandlerBase.prototype.successResponse = function(response,code,data){

	
	response.status(Const.httpCodeSucceed);

	if(code != Const.responsecodeSucceed){

			response.json({
               code : code
        	});
	}

	else{
			response.json({
            code : Const.responsecodeSucceed,
            data : data
        });
	}
}



module["exports"] = RequestHandlerBase;

