var Backbone = require('backbone');
var _ = require('lodash');

 // Class ------------------------------------------------
    var UserModel = Backbone.Model.extend({

    	 defaults: {
            id: "",            
            email: "",            
            token: "",        
            logionProcess:""   
        
        },

        initialize: function(){
    
        }


   });

 	var UserCollection = Backbone.Collection.extend({
        model: UserModel
    });

   var user = {
        Model:UserModel,
        Collection:UserCollection,
    }
    


    user.modelByResult = function(obj){

    		var model = new UserModel({
    			id:obj._id,
    			email:obj.email,    			
    			logionProcess:obj.logionProcess,

    		});

          

    		return model;

    }


      user.collectionByResult = function(obj){
        
        if(!_.isArray(obj))
            return null;
        
        var aryForCollection = [];
        
        _.each(obj,function(row){

            aryForCollection.push(user.modelByResult(row));
             
        });
        
        return new UserCollection(aryForCollection);
                
    }


 	module["exports"] = user;

