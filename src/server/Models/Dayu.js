var _ = require('lodash');
var mongoose = require('mongoose');
var Config = require("../lib/init");
var DatabaseManager = require('../lib/DatabaseManager');
const Utils = require("../lib/Utils");
var async = require('async');


var DayuModel  = function(){};


DayuModel.prototype.init = function(mongoose){
	 this.schema = new mongoose.Schema({
	           email:{type:String,index:true},
               code:String,
               type:Number,   //1有效 0无效。-1使用过
               useType:{type:String,default:"1"} ,//.  1注册短信验证   2/／忘记密码使用
               created: Date,
               update:Date,

	 })

	 this.model = mongoose.model(Config.dbCollectionPrefix + "dayus", this.schema);

}


DayuModel.get = function(){
    return DatabaseManager.getModel('Dayu').model;    
}


DayuModel.insertCode = function(email,code,useType,callBack){	
    var self = this;

    var result = {};
    var dayuModel = DatabaseManager.getModel('Dayu').model;
    async.waterfall([
    		function(done){
                dayuModel.findOne({email:email,type:1},function(err,row){
                        result.model = row;
                        done(err,result);
                })
        },
        function(result,done){
        		if(result.model){
                      
                    result.model.code = code;                    
                    result.model.created =Utils.now();
                    result.model.useType = useType;
                    result.model.save(function(err,saveModel){
                            result.model = saveModel;
                            done(err,result);  
                    })
                    
                }else{
                	var model = new dayuModel({
                            email:email,
                            code:code,
                            type:1,
                            useType : useType,
                            created: Utils.now()
                    });
                     model.save(function(err,saveModel){
                            result.model = saveModel;
                            done(err,result);  
                     })


                }

        },




    	],function(err,result){
    			if (!err) {
                    callBack(null,result.model)
                }
                else{
                    conselo.log(err)
                }
    	});


}


module["exports"] = DayuModel;





