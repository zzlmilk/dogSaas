var mongoose = require('mongoose');
var _ = require('lodash');

var Conf = require('./init.js');


var DatabaseManager = {

    isDatabaseReady : false,
    loadedModels : {},
    init: function(config,callBack){

        
		var self = this;
        
        // Connection to chat database
        console.log("Connecting mongoDB " + config.databaseUrl);


        try{
            mongoose.Promise = global.Promise;    
            //createConnection          
	        mongoose.connect(config.databaseUrl,{ useMongoClient: true}, function(err){
 
	          if (err) {

                console.log(err);

	          } else {

		        self.isDatabaseReady = true;

	          }

              if(callBack)
                callBack(self.isDatabaseReady);

	        });

        } catch(ex){
          

	        console.log("Failed to connect MongoDB!");

	        throw ex;

        }

    },

    getModel : function(modelName){

        if(!this.isDatabaseReady)
            return null;

        if(!_.isEmpty(this.loadedModels[modelName]))
            return this.loadedModels[modelName];


        var model = require('../Models/' + modelName);

        if(model){

            var model = new model();

            model.init(mongoose);

            this.loadedModels[modelName] = model;

            return model;

        }
        else
            return null;

    }

}

module["exports"] = DatabaseManager;
