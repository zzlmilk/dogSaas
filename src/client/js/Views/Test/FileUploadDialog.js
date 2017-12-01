var Backbone = require('backbone');
var _ = require('lodash');

var Utils = require('../../lib/utils');
var Const = require('../../lib/consts');
var Config = require('../../lib/init');

// load template
var template = require('./FileUploadDialog.hbs');



var QiNiuClient = require('../../lib/APIClients/QiNiuClient');




var FileUploadDialogView = Backbone.View.extend({

    qn_token:"123",
    initialize: function(options) {
        this.render();
    },

    render: function() {

        $(Config.defaultContaier).html(template({

        }));


    	this.onLoad();


        return this;

    },

    onLoad: function(){

        var self = this;

        self.getqntoken()
        

    
        

         $("#businessLicensePic").on("click",function(){
         		 
         })

         $("#businessLicenseP").off("click").on("click",function(){
         	
         		$("#businessLicensePic").trigger("click")
         })



         // $("#businessLicensePic").on("change",function(event){
                
         //        var con = $(this).val();
         //        var file = this.files[0]
         //     //   console.log(file)

         // })


         //"k-ZxbCCBV3eLH5k2nUnSZo6OG_2zWfohupr_DZa2:oSb_PHMsamMbuRDlRrJQevZD93E=:eyJzY29wZSI6ImhhbG9raXQiLCJkZWFkbGluZSI6MTUxMjAyODg1NH0="
       

        

     },

     getqntoken:function(){
        var self  = this
         QiNiuClient.send({                                    
                },function(data){                                  
                    
                    self.uploadfile(data.token)
                },function(errorCode){
                     alert("aaa")
                     console.log(errorCode)                  

                })
       
       
            
     },

 uploadfile:function(qiniuToken){

    
       var uploader = Qiniu.uploader({
    disable_statistics_report: false,
    runtimes: 'html5,flash,html4',
    browse_button: 'businessLicensePic',
    //container: 'container',
    max_file_size: '1000mb',
    flash_swf_url: 'bower_components/plupload/js/Moxie.swf',
    dragdrop: true,
    chunk_size: '4mb',
    multi_selection: !(moxie.core.utils.Env.OS.toLowerCase() === "ios"),
    uptoken: qiniuToken,

    // uptoken_func: function(){

    // },
    domain: "p080e0wd7.bkt.clouddn.com",
    get_new_uptoken: false,


    auto_start: true,
    log_level: 5,
    init: {
      'BeforeChunkUpload': function(up, file) {
        console.log("before chunk upload:", file.name);


      },
      'FilesAdded': function(up, files) {
        // $('table').show();
        // $('#success').hide();
        // plupload.each(files, function(file) {
        //   var progress = new FileProgress(file,
        //     'fsUploadProgress');
        //   progress.setStatus("等待...");
        //   progress.bindUploadCancel(up);
        // });
      },
      'BeforeUpload': function(up, file) {
        console.log("this is a beforeupload function from init");
        // var progress = new FileProgress(file, 'fsUploadProgress');
        // var chunk_size = plupload.parseSize(this.getOption(
        //   'chunk_size'));
        // if (up.runtime === 'html5' && chunk_size) {
        //   progress.setChunkProgess(chunk_size);
        // }
      },
      'UploadProgress': function(up, file) {
        // var progress = new FileProgress(file, 'fsUploadProgress');
        // var chunk_size = plupload.parseSize(this.getOption(
        //   'chunk_size'));
        // progress.setProgress(file.percent + "%", file.speed,
        //   chunk_size);
      },
      'UploadComplete': function() {
        // $('#success').show();
      },
      'FileUploaded': function(up, file, info) {
    

        // var progress = new FileProgress(file, 'fsUploadProgress');
            console.log(info.response)
            var res  = info.response

                
                var res = JSON.parse(info.response); 
       
                var domain = up.getOption('domain');
                                    

               var src = "http://"+domain +"/" +res.key;

               $("#businessLicense p").after("<img src =" + src +'> </img>' )
        // progress.setComplete(up, info.response);
      },
      'Error': function(up, err, errTip) {
          //$('table').show();
          // var progress = new FileProgress(err.file, 'fsUploadProgress');
          // progress.setError();
          // progress.setStatus(errTip);
        }
        // ,
        // 'Key': function(up, file) {
        //     var key = "";
        //     // do something with key
        //     return key
        // }
    }
  });
     }

})

module.exports = FileUploadDialogView;
