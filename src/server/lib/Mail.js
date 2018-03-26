var nodemailer = require('nodemailer');  
//var _jade = require('jade');
var fs = require('fs');

var EJS = require('ejs')



var Mail = {
		sendOne:function(code,toMail,useType,subject,callBack){

				var transporter = nodemailer.createTransport({  
				  host: "smtp.exmail.qq.com",
				  secureConnection: true,
				  port:465,
				  auth: {  
				  	user:"zhouzl@pet-more.cn",
				  	pass:"bZsxrhtFABn4Q5jV"
				    //user: '413124766@qq.com',  
				   // pass: 'onqdbkohprwqbhba' //授权码,通过QQ获取  
				   	}  
				  });  

				var template = './Html/test_en.ejs';



				fs.readFile(template, 'utf8', function(err, file){
					    if(err){
					      //handle errors
					      console.log(err)
					      console.log('ERROR!');
					      
					    }	
					    else{
					    	if(useType==1) {

                                var url = "http://www.halokit.cn:7171/#veriftemail?key=" + code;
                            }if(useType==2){

					    		var url ="http://www.halokit.cn:7171/#resetpassword?key="+code;
							}


					    	var data = {title: '可点',
					    					code:code,
					    					url:url
					    				 }

					    	var html = EJS.render(file,data)


					    	//var compiledTmpl = _jade.compile(file, {filename: template});

					    	
					    	
					    				 
					    	// var html = compiledTmpl(context);

					    	//console.log(html)

					    		var mailOptions = {  
							    from: 'zhouzl@pet-more.cn', // 发送者  
							    to: toMail, // 接受者,可以同时发送多个,以逗号隔开  
							    subject: subject, // 标题  
							    //text: "The verification code of HaloKit is:"+ code, // 文本 
							    html: html
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
					})

				




		}


}


// Mail.sendOne("1234","413124766@qq.com","1","111",function(){

// })


module["exports"] = Mail;

