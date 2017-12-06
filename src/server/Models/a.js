

var async = require('async');





var b = "abc";


var a = function(callBack){
	 //复杂运输

	 for (var i = 1000; i >= 0; i--) {
	 			if (i == 1) {
	 				console.log("aa")
	 			}
	 }

	 callBack()

}


a(function(){

})

console.log(b)



