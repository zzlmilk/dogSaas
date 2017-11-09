var moment = require('moment');

// Class ------------------------------------------------
function Utils() {
};


Utils.prototype.now = now;






function now() {

  var time = moment(new Date()).local();;

  return time;

}


module["exports"] = new Utils();
