var express = require('express');
var router = express.Router();
var RequestHandlerBase = require('./RequestHandlerBase');
var _ = require('lodash');

var TestHandler = function(){
    
}

_.extend(TestHandler.prototype,RequestHandlerBase.prototype);

   /**
     * @api {get} /test Test
     * @apiName Tes111t
     * @apiGroup WebAPI
     * @apiDescription Just test[]
     *     we434
     * @apiSuccessExample Success-Response:
            test1111
   */

TestHandler.prototype.attach = function(route){
			var self = this;

		route.get('/',function(request,response){

		response.send("test")
		
	})
}



new TestHandler().attach(router);
module["exports"] = router;