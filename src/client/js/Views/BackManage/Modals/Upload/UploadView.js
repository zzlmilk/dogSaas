var Backbone = require('backbone');
var _ = require('lodash');

var Utils = require('../../../../lib/utils');
var Const = require('../../../../lib/consts');
var Config = require('../../../../lib/init');

// load template
var template = require('./Upload.hbs');

var QiNiuClient = require('../../../../lib/APIClients/QiNiuClient');

var UploadView = Backbone.View.extend({
    el:null,
    pID:null,
    inputID:null,
    divID:null,
    imgID:null,
    fileURL:null, //返回的地址
    

    initialize: function(options) {
        this.el = options.el;

        this.pID = Utils.randomString(6);
        this.inputID = Utils.randomString(6);
        this.divID =Utils.randomString(6);
        this.imgID =Utils.randomString(6);
      

        this.render();
    },

    render: function() {

        $(this.el).html(template({

        }));


        this.onLoad();


        return this;

    },

    onLoad: function(){

        var self = this;

         var div_id = "_div";



         $(this.el).find("p").attr("id",self.pID)
         $(this.el).find("input").attr("id",self.inputID)





        // $("#"+self.inputID).on("click",function(){
                
        //  })

         $("#"+self.pID).off("click").on("click",function(){
                
                $("#"+self.inputID).trigger("click")
         })


         self.ininUploadfile()

    },
    ininUploadfile:function(){
        var self = this;
        //获取qiniu token
            QiNiuClient.send({                                    
                },function(data){                                                      
                    self.uploadfile(data.token)
                },function(errorCode){                     
                     console.log(errorCode)                  

                })
    },
    uploadfile:function(token){
     var self = this;
    var Q = new QiniuJsSDK();
    console.log(Q.logger)
    var uploader = Q.uploader({
    disable_statistics_report: false,
    runtimes: 'html5,flash,html4',
    browse_button: self.inputID,
    //container: 'container',
    max_file_size: '1000mb',
    flash_swf_url: 'bower_components/plupload/js/Moxie.swf',
    dragdrop: true,
    chunk_size: Config.QN.chunk_size,
    multi_selection: !(moxie.core.utils.Env.OS.toLowerCase() === "ios"),
    uptoken: token,
    domain: Config.QN.domain,
    get_new_uptoken: false,
    auto_start: true,
    log_level: 5,
    init: {
      'BeforeChunkUpload': function(up, file) {
       // console.log("before chunk upload:", file.name)
      },
      'FilesAdded': function(up, files) {

      },
      'BeforeUpload': function(up, file) {
        console.log("this is a beforeupload function from init");
      },
      'UploadProgress': function(up, file) {

      },
      'UploadComplete': function() {

      },
      'FileUploaded': function(up, file, info) {
                var res  = info.response                
                var res = JSON.parse(info.response); 
       
                var domain = up.getOption('domain');                                    
                var src = "http://"+domain +"/" +res.key;
                self.fileURL = src


                var obj = {
                     name:self.el,
                     fileURL:self.fileURL
                }

                Backbone.trigger(Const.NotificationUploadImageDone,obj); 
                console.log($(this))
                 
                $("#"+self.imgID).remove()
                $("#"+self.pID).after("<img id="+ self.imgID +" src =" + src +'> </img>' )
                $("#"+self.imgID).bind("click",function(){                                    
                $("#"+self.inputID).trigger("click")

                //alert(self.fileURL)
         })
        // progress.setComplete(up, info.response);
      },
      'Error': function(up, err, errTip) {
                alert("图片上传出错",err)
        }
        ,
        'Key': function(up, file) {
            var key = Utils.randomString(32)
            return key
        }
            }
        });
    }


})

module.exports = UploadView;
