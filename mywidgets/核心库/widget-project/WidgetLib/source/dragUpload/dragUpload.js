/*
 *作    者: 高娜 
 *版    本: 1.2 
 *完成时间: 2012-02-13 
 *描    述: dragUpload
 *关联文件: jQuery.js  
 */
 
/*
 *	#example:
 *	$('.draguploadDiv').dragUpload({
 *		upload_disable : ['exe','avi'] ,
		display_form : 1
 *	});
 *
*/
(function($){
	/** 
	* @class dragUpload监听器
    * @name dragUpload
    * @description 基于html5的拖拽上传
	* @version 1.2 
	* @author 高娜 
	* @requires jQuery-1.5.2+
    */
	$.fn.dragUpload = function(options){
		/** @lends dragUpload.prototype */
		var defaults = {
			/**  
			* @name dragUpload#display_width
			* @param {Number}  数字类型
			* @description 拖拽目的地宽度
			* @default {Number} 360
			* @example
			* $('.draguploadDiv').dragUpload({
			*		display_width : 360
			*  });
			*/
			display_width : 380,
			/**  
			* @name dragUpload#display_height
			* @param {Number}  数字类型
			* @description 拖拽目的地高度
			* @default {Number} 300
			* @example
			* $('.draguploadDiv').dragUpload({
			*		display_height : 300
			*  });
			*/
			display_height : 300,
			/**  
			* @name dragUpload#display_form
			* @param {Number}  数字类型
			* @description 上传文件展示形式 默认有0,1
			* @default {Number} 1
			* @example
			* $('.draguploadDiv').dragUpload({
			*		display_form : 1
			*  });
			*/
			display_form : 1,
			/**  
			* @name dragUpload#upload_able
			* @param {Array}  数组类型
			* @description 可上传文件格式(如果设置有值表示除设置的几种文件格式其他在备选数组中的文件格式均不可上传)
			* @default {Array} []
			* @example
			* $('.draguploadDiv').dragUpload({
			*		upload_able : []
			*  });
			*/
			upload_able : [],
			/**  
			* @name dragUpload#upload_disable
			* @param {Array}  数组类型
			* @description 不可上传文件格式(如果设置有值表示除设置的几种文件格式其他在备选数组中的文件格式均可上传)
			* @default {Array} []
			* @example
			* $('.draguploadDiv').dragUpload({
			*		upload_disable : []
			*  });
			*/
			upload_disable : [],
			/**  
			* @name dragUpload#filescontain
			* @param {Array}  数组类型
			* @description 备选的文件格式
			* @default {Array} [jpg,gif,png,doc,docx,xlsx,xls,txt,html,rar,zip,asp,ppt,pptx,avi]
			* @example
			* $('.draguploadDiv').dragUpload({
			*		filescontain :['jpg','gif','png','jpeg','doc','docx','xls','xlsx','txt','html','rar','zip','asp']
			*  });
			*/
			filescontain : ['jpg','gif','png','jpeg','doc','docx','xls','xlsx','txt','html','rar','zip','asp','ppt','pptx','avi','exe'],
			/**  
			* @name dragUpload#files_size
			* @param {Number}  数字类型
			* @description 上传文件大小，单位字节
			* @default {Number} 1024000
			* @example
			* $('.draguploadDiv').dragUpload({
			*		files_size : 1024000
			*  });
			*/
			files_size : 1024000,
			/**  
			* @name dragUpload#dragEnterDiv  
			* @param {Fn} 函数 
			* @description dragenter时操作
			* @default {Fn} function(){}
			* @example
			* $('.draguploadDiv').dragUpload({
			*		dragEnterDiv: function(){alert("dragenter")}
			*    });
			*/
 			 dragEnterDiv : function(){},
			/**  
			* @name dragUpload#dragOverDiv  
			* @param {Fn} 函数 
			* @description dragover时操作
			* @default {Fn} function(){}
			* @example
			* $('.draguploadDiv').dragUpload({
			*		dragOverDiv: function(){alert("dragover")}
			*    });
			*/
 			 dragOverDiv : function(){},
			/**  
			* @name dragUpload#dragDropDiv  
			* @param {Fn} 函数 
			* @description drop时操作
			* @default {Fn} function(){}
			* @example
			* $('.draguploadDiv').dragUpload({
			*		dragDropDiv: function(){alert("dragdrop")}
			*    });
			*/
 			 dragDropDiv : function(){},
			/**  
			* @name dragUpload#dragLeaveDiv  
			* @param {Fn} 函数 
			* @description dragleave时操作
			* @default {Fn} function(){}
			* @example
			* $('.draguploadDiv').dragUpload({
			*		dragLeaveDiv: function(){alert("dragleave")}
			*    });
			*/
 			dragLeaveDiv : function(){}
		} ;
		var opts = $.extend(defaults,options) ;
		this.each(function(){
			var $this = $(this) ;
			var	formNum = opts.display_form ;
			var	index = 0 ;
			var	thisElem = $this[0] ;
			var	dragMsg = $('.draguploadMsg').html() ;
				$this.css({
					'width':opts.display_width ,
					'height':opts.display_height
				}) ;
			//判断浏览器是否支持
			if(window.FileReader){
				thisElem.addEventListener('dragenter', handleDragEnter, false);
				thisElem.addEventListener('dragover', handleDragOver, false);
				thisElem.addEventListener('drop', handleFileSelect, false);
				thisElem.addEventListener('dragleave', handleDragLeave, false);	
			}else{
				$this.html('很抱歉！您的浏览器不支持此次拖拽上传，请使用chrome,firefox等支持的浏览器') ;
			}
			
			//处理拖放文件列表
			function handleFileSelect(evt) {
				evt.stopPropagation(); //阻止默认的打开事件
				evt.preventDefault();
				showFiles(evt) ;
				opts.dragDropDiv() ;
			}
			
			// 处理插入拖出效果
			function handleDragEnter(evt){ 
				evt.stopPropagation();
				evt.preventDefault();
				//this.setAttribute('style', 'border-style:dashed;'); 
				opts.dragEnterDiv() ;
			}
			function handleDragLeave(evt){ 
				//this.setAttribute('style', ''); 
				opts.dragLeaveDiv() ;
			}
	
			// 处理文件拖入事件，防止浏览器默认事件带来的重定向
			function handleDragOver(evt){
				evt.stopPropagation();
				evt.preventDefault();
				opts.dragOverDiv() ;
			}
			
			//创建上传文件展示方式
			function showFiles(evt){
				switch(formNum){
					case 0 : displayList(evt) ; break ;
					case 1 : displayPicNav(evt) ; break ;
				}
			}
			
			//列表形式展示--display_form:0
			function displayList(evt){
				var files = evt.dataTransfer.files;//一个file类型的数组，就是你拖拽进来的文件
				var newHTML = '' ;
				for(var i=0,f; f=files[i]; i++){
					if(f.size<opts.files_size){
						var pos = f.name.lastIndexOf('.') ;
						fileFormat = f.name.substring(pos+1,f.name.length) ;
						//判断是否可上传
						if(isuploadfileType(fileFormat)){
							reader = new FileReader() ;
							newHTML = '<li><img src="images/dragUpload/page.png" class="picIco"/><span>'+f.name+'</span><img src="images/dragUpload/page_cross.gif" class="delBtn"/></li>' ;
							reader.readAsDataURL(f);//直接将图片的内容以FileReader的readAsDataURL方法读取入并显示
						}else{
							dragMsg += '<br/>'+fileFormat+'上传文件格式不正确，请重新选择' ;
							$this.html(dragMsg).css('color','#f60c32') ;
						}						
						newHTML = '<ul>' + newHTML + '</ul>' ;
						$this.append(newHTML) ;
					}else{
						dragMsg += '<br/>'+f.name+'文件大小超过了上传最大值，请重新选择' ;
						$this.html(dragMsg).css('color','#f60c32') ;
					}											
				}
			}
			//缩略图形式展示--display_form:1
			function displayPicNav(evt){
				var files = evt.dataTransfer.files;//一个file类型的数组，就是你拖拽进来的文件
				var newHTML = '' ;
				var defaultImg = 'images/dragUpload/defaultBig.jpg' ;
				for(var i=0,f; f=files[i]; i++){
					if(f.size<opts.files_size){
						var pos = f.name.lastIndexOf('.') ;
						fileFormat = f.name.substring(pos+1,f.name.length) ;
						//判断是否可上传
						if(isuploadfileType(fileFormat)){
							reader = new FileReader() ;
							isImg = isImage(fileFormat) ;
							if(isImg){
								reader.onload = (function (theFile) {
									return function (e) {
										//location.href = e.target.result ;
										newHTML = '<dl><dt><div class="imgDiv"><img src="'+ e.target.result +'"/></div><img src="images/dragUpload/closePop.png" class="delBtn"/></dt><dd>'+theFile.name+'</dd></dl>' ;
										$this.append(newHTML) ;
									};
								})(f) ;
							}else{
								newHTML = '<dl><dt><div class="imgDiv"><img src="images/dragUpload/defaultBig.jpg"/></div><img src="images/dragUpload/closePop.png" class="delBtn"/></dt><dd>'+f.name+'</dd></dl>' ;
								$this.append(newHTML) ;
							}
							reader.readAsDataURL(f);//直接将图片的内容以FileReader的readAsDataURL方法读取入并显示
						}else{
							dragMsg += '<br/>'+fileFormat+'上传文件格式不正确，请重新选择' ;
							$this.html(dragMsg).css('color','#f60c32') ;
						}
					}else{
						dragMsg += '<br/>'+f.name+'文件大小超过了上传最大值，请重新选择' ;
						$this.html(dragMsg).css('color','#f60c32') ;
					}					
				}
			}
			//判断是否是图片
			function isImage(type){
				switch(type){
					case 'jpeg':
					case 'png':
					case 'gif':
					case 'bmp':
					case 'jpg':
						return true;
					default:
						return false;
				}
			}
			//判断是否可上传的文件格式
			function isuploadfileType(uploadType){
				var ableLen = opts.upload_able.length ;
				    disableLen = opts.upload_disable.length
				if((ableLen == 0)&&(disableLen == 0)){
					return isInArr(uploadType,opts.filescontain) ;
				}else if((ableLen>0)&&(disableLen==0)){
					return isInArr(uploadType,opts.upload_able) ;
				}else if((ableLen==0)&&(disableLen>0)){
					return !(isInArr(uploadType,opts.upload_disable)) ;
				}else{
					console.log('仅需要设置只允许上传的或不允许上传的文件格式');
				}
			}
			//判断是否在数组中
			function isInArr(uploadfile,filesArr){
				for(var i=0; i<filesArr.length;i++){
					if(uploadfile == filesArr[i]){
						return true ;
					}
				}
			}
			//清空按钮
			$('.clearBtn').live('click',function(){
				$('.draguploadDiv').empty() ;
			}) ;
			//删除按钮
			$('.delBtn').live('click',function(){			
				switch(formNum){
					case 0 : $(this).parent('li').remove() ; break ;
					case 1 : $(this).parent().parent().remove() ; break ;
				}
			}) ;
		}) ;
		return this ;
	} ;
	$.extend($.fn.dragupload,{
		version: '1.2',
		author:'高娜'
	});
})(jQuery) ;