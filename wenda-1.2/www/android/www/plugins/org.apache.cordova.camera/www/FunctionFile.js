cordova.define("org.apache.cordova.upload.test", function(require, exports, module) { 


var argscheck = require('cordova/argscheck'),
    channel = require('cordova/channel'),
    utils = require('cordova/utils'),
    exec = require('cordova/exec'),
    cordova = require('cordova');

var TestFunction = {};

   //-----------------------------------
//upload 
			
	function uploadPhoto(imageURI) { 
				var options = new FileUploadOptions(); 
				options.fileKey="pic"; 
				options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1); 
				options.mimeType="image/jpeg"; 
		
				var params = new Object(); 
				params.value1 = "test"; 
				params.value2 = "param";  
		
				options.params = params;  
		
				var ft = new FileTransfer(); 
				ft.upload(imageURI, "http://10.6.210.229:8080/wiki/upload", win, fail, options);
			} ;
		
	function win(r) { 
				console.log("Code = " + r.responseCode);
				console.log("Response = " + r.response); 
				console.log("Sent = " + r.bytesSent); 
				callback((eval('(' + r.response+ ')'))['pic']);
			} ;
		
    function fail(error) { 
				//alert("An error has occurred: Code = " = error.code);
			} ;
			
	function getAccessToken() {
			  spApi.getAccessToken(success,onFail);
			};
			
	function onFail(message) {
			  alert('Failed because: ' + message);
			};
			
	function success(result) {
			  //todo 
			  alert('get result: ' + result);
			};
			
	function selectorDialogCallback(result) {
			  if(result == 1){//照相
				//从照相机拍照			
				navigator.camera.getPicture(uploadPhoto, 
											function(message) { alert('get picture failed'); },
											{ quality: 50,
											destinationType: navigator.camera.DestinationType.DATA_URL,
											sourceType: navigator.camera.PictureSourceType.CAMERA,
											isNeedCrop: true }
											);
			  }else if(result == 2){//图库
				 // 从指定来源检索图像文件位置
				navigator.camera.getPicture(uploadPhoto, 
											function(message) { alert('get picture failed'); }, 
											{ quality: 50,  
											destinationType: navigator.camera.DestinationType.FILE_URI, 
											sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
											isNeedCrop: true}
											);	
			  }
			};
			
			var callback;
			
			TestFunction.uploadImage = function(onSuccessCallBack) {
				callback = onSuccessCallBack;
				window.FileTransfer.photoSelector(selectorDialogCallback,onFail);
			};
//-----------------------------------

module.exports = TestFunction;

});
