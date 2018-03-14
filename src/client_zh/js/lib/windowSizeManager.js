var Backbone = require('backbone');
var Const = require('./consts');

var windowSizeHandler = {

	 init: function(){

        var self = this;
        Backbone.on(Const.NotificationUpdateWindowSize,function(obj){

            self.adjustSize();

        });

        $(window).resize(function() {

            self.adjustSize();

        });
    },

     adjustSize: function(){
 
     	  var height = $(window).height();
          var width = $(window).width();


         

     }

}


module["exports"] = windowSizeHandler;