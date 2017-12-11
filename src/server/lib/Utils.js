var _ = require('lodash');
var crypto = require('crypto');
var moment = require('moment');
var Const = require("../lib/consts");
    // Class ------------------------------------------------
    function Utils() {
    };


     Utils.prototype.now = now;
     Utils.prototype.isEmpty = isEmpty;
     Utils.prototype.randomString = randomString;
     Utils.prototype.randomCode = randomCode;
     Utils.prototype.generateSalt = generateSalt;
     Utils.prototype.saltAndHash  =saltAndHash;
     Utils.prototype.md5 = md5;
     Utils.prototype.vaild = vaild;

     Utils.prototype.vaccineCardNo = vaccineCardNo;

     Utils.prototype.dogCardNo = dogCardNo;
     Utils.prototype.annualDate = annualDate;


     Utils.prototype.pickUser = pickUser;

     Utils.prototype.skip = skip;
    function skip(page) {

        var skip=(page-1)*(Const.dogLicensesListLimit);
        return skip;
    }


    function annualDate(annualDate){
        if(!_.isArray(annualDate)){

            return;
        }else{
          
          var m = moment().month() //Accepts numbers from 0 to 11
          var y =moment().year().toString()


          var string = y.substring(2) + (m+1)
          annualDate.push(string)

          

        return annualDate
          
        }

    }

    function dogCardNo(){
        return randomString(10)
    }

     function vaccineCardNo(){
           return randomString(10)

     }

	function pickUser (user){
			 return    _.pick(user, [
			 					 "_id",
			 					 "email",
			 					 "logionProcess",
			 					 "organization",
			 	])
	}



 	 function now(){
      
		var time =moment(new Date()).local();;
    
		return time;

    }


       function isEmpty(variable){
            if(_.isUndefined(variable))
                return true;
                
            if(_.isNull(variable))
                return true;
                
            if(_.isString(variable) && _.isEmpty(variable))
                return true;
                
            return false;
     }

      function  randomString(len, charSet) {
        charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var randomString = '';
        
        for (var i = 0; i < len; i++) {
            var randomPoz = Math.floor(Math.random() * charSet.length);
            randomString += charSet.substring(randomPoz,randomPoz+1);
        }
                
        return randomString;
    }

     function  randomCode(len) {
        var charSet = '0123456789';
        var randomString = '';
        
        for (var i = 0; i < len; i++) {
            var randomPoz = Math.floor(Math.random() * charSet.length);
            randomString += charSet.substring(randomPoz,randomPoz+1);
        }
                
        return randomString;
    }




   function hexStringToByte(str) {
    var a = [];
    for(var i = 0, len = str.length; i < len; i+=2) {
      a.push(parseInt(str.substr(i,2),16));
    }
    return (a);
  }




function vaild(pass,dbPass){
        var pwIndb = hexStringToByte(dbPass)        
        var salt = pwIndb.slice(0,12);
        var salt_HexString = byteToHexString(salt)
        var hexString = salt_HexString.replace(/(\w{2,2})/g, '0x$1 ').trim();
        var arr = hexString.split(' ');
        var buff = Buffer.from(arr);
        var md =crypto.createHash('md5');

        md.update(buff)
        md.update(pass)
        var new_digest = md.digest('hex').toUpperCase();
        var crypto_pass = salt_HexString+new_digest;
        if (crypto_pass == dbPass) {
            return true;
        }
        else{
             return false;
        }   

}

function saltAndHash(pass){
        var salt = generateSalt();
        hexString = stringToHexWide(salt)
        var tmp = hexString.replace(/(\w{2,2})/g, '0x$1 ').trim();
        var arr = tmp.split(' ');
        var buff = Buffer.from(arr);

        var md =crypto.createHash('md5');
        md.update(buff)
        md.update(pass)

        var new_digest = md.digest('hex').toUpperCase();
        hexString = hexString.toUpperCase();

        
        return hexString+new_digest; 
         

}

    function md5(str){
         return crypto.createHash('md5').update(str,"utf-8").digest();
    }

    function generateSalt() {
        var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
        var salt = '';
        for (var i = 0; i < 6; i++) {
            var p = Math.floor(Math.random() * set.length);
            salt += set[p];
        }
        return salt;
    };


function stringToHexWide(s) {  
    var result = '';  
    for (var i=0; i<s.length; i++) {  
        var b = s.charCodeAt(i);  
        if(0<=b && b<16){  
            result += '000'+b.toString(16)  
        }  
        if(16<=b && b<255){  
            result += '00'+b.toString(16)  
        }  
        if(255<=b && b<4095){  
            result += '0'+b.toString(16)  
        }  
        if(4095<=b && b<65535){  
            result += b.toString(16)  
        }  
    }  
    return result;  
};  

function byteToHexString(uint8arr) {
    if (!uint8arr) {
      return '';
    }

    var hexStr = '';
    for (var i = 0; i < uint8arr.length; i++) {
      var hex = (uint8arr[i] & 0xff).toString(16);
      hex = (hex.length === 1) ? '0' + hex : hex;
      hexStr += hex;
    }
    return hexStr.toUpperCase();
  }



   function hexStringToByte(str) {
    var a = [];
    for(var i = 0, len = str.length; i < len; i+=2) {
      a.push(parseInt(str.substr(i,2),16));
    }
    return (a);
  }




    function now(){
      
		var time =moment(new Date()).local();;
    
		return time;

    }


   module["exports"] = new Utils();
