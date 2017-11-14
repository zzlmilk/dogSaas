var nodemailer = require('nodemailer');  



var Mail = {
		sendOne:function(code,toMail,subject,callBack){

				var transporter = nodemailer.createTransport({  
				  host: "smtp.exmail.qq.com",
				  secureConnection: true,
				  port:465,
				  auth: {  
				  	user:"zhouzl@pet-more.cn",
				  	pass:"L5SrFbjVF6J9PXg9"
				    //user: '413124766@qq.com',  
				   // pass: 'onqdbkohprwqbhba' //授权码,通过QQ获取  
				   	}  
				  });  

				var mailOptions = {  
			    from: 'zhouzl@pet-more.cn', // 发送者  
			    to: toMail, // 接受者,可以同时发送多个,以逗号隔开  
			    subject: subject, // 标题  
			    text: "The verification code of HaloKit is:"+ code, // 文本 
			    //html: "aa"
			  };  

			    transporter.sendMail(mailOptions, function (err, info) {  
			    if (err) {  
			      console.log(err);  
			      return;  
			    } 
			    else{
			    	  callBack()
			    	  //console.log('发送成功',toMail,code,subject);
			    } 
			  	
			       
			  });  




		}


}





module["exports"] = Mail;

