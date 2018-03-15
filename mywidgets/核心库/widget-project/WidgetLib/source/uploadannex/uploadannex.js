/*
 *作    者: 高娜
 *版    本: 1.3
 *完成时间: 2012-07-09
 *描    述: uploadannex
 *关联文件: jQuery.js|jquery-ui.js
 */
(function($,undefined){
    /**
	* @class 上传附件
    * @name uploadannex
    * @description 上传附件插件
	* @version 1.3
    */
	$.widget('ui.uploadannex',
	/** @lends uploadannex.prototype */
	{		
		options:{
			/**  
			* @name uploadannex#height
			* @param {Number}  数字类型
			* @description 上传文件列表区域高度
			* @default {Number} 180
			* @example
			* $('.exampleObj').uploadannex({
			*		height : 180
			*  });
			*/
			height : 180 ,
			/**  
			* @name uploadannex#able
			* @param {Array}  数组类型
			* @description 可上传文件格式(如果设置有值表示除设置的几种文件格式其他在备选数组中的文件格式均不可上传)
			* @default {Array} []
			* @example
			* $('.exampleObj').uploadannex({
			*		able : []
			*  });
			*/
			able : ['jpg','gif','png','jpeg','doc','docx','xls','xlsx','txt','html','rar','zip','asp','ppt','pptx','avi','exe','swf','fla','js','xml','htm','jsp','mp3','mp4','css'],
			/**  
			* @name uploadannex#disable
			* @param {Array}  数组类型
			* @description 不可上传文件格式(如果设置有值表示除设置的几种文件格式其他在备选数组中的文件格式均可上传)
			* @default {Array} []
			* @example
			* $('.exampleObj').uploadannex({
			*		disable : []
			*  });
			*/
			disable : [],
			/**  
			* @name uploadannex#contain
			* @param {Array}  数组类型
			* @description 备选的文件格式
			* @default {Array} [jpg,gif,png,doc,docx,xlsx,xls,txt,html,rar,zip,asp,ppt,pptx,avi]
			* @example
			* $('.exampleObj').uploadannex({
			*		contain :['jpg','gif','png','jpeg','doc','docx','xls','xlsx','txt','html','rar','zip','asp']
			*  });
			*/
			contain : [] ,
			 /**  
			* @name uploadannex#fnFile 
			* @param {Fn} 函数 
			* @description 通过浏览按钮上传自定义方法
			* @default {Fn} function(){}
			* @example
			* $('.exampleObj').uploadannex({
			*		fnFile: function(){alert("fnFile")}
			*    });
			*/
 			 fnFile : function(){} ,
			 /**  
			* @name uploadannex#fn  
			* @param {Fn} 函数 
			* @description 自定义方法
			* @default {Fn} function(){}
			* @example
			* $('.exampleObj').uploadannex({
			*		fn: function(){alert("fn")}
			*    });
			*/
 			 fn : function(){} ,
			 /**  
			* @name uploadannex#fnDel
			* @param {Fn} 函数 
			* @description 删除附件自定义方法
			* @default {Fn} function(){}
			* @example
			* $('.exampleObj').uploadannex({
			*		fnDel: function(){alert("fn")}
			*    });
			*/
 			 fnDel : function(){} ,
			 /**  
			* @name uploadannex#dragEnterDiv  
			* @param {Fn} 函数 
			* @description dragenter时操作
			* @default {Fn} function(){}
			* @example
			* $('.exampleObj').uploadannex({
			*		dragEnterDiv: function(){alert("dragenter")}
			*    });
			*/
 			 dragEnterDiv : function(){},
			/**  
			* @name uploadannex#dragOverDiv  
			* @param {Fn} 函数 
			* @description dragover时操作
			* @default {Fn} function(){}
			* @example
			* $('.exampleObj').uploadannex({
			*		dragOverDiv: function(){alert("dragover")}
			*    });
			*/
 			 dragOverDiv : function(){},
			/**  
			* @name uploadannex#dragDropDiv  
			* @param {Fn} 函数 
			* @description drop时操作
			* @default {Fn} function(){}
			* @example
			* $('.exampleObj').uploadannex({
			*		dragDropDiv: function(){alert("dragdrop")}
			*    });
			*/
 			 dragDropDiv : function(){},
			/**  
			* @name uploadannex#dragLeaveDiv  
			* @param {Fn} 函数 
			* @description dragleave时操作
			* @default {Fn} function(){}
			* @example
			* $('.exampleObj').uploadannex({
			*		dragLeaveDiv: function(){alert("dragleave")}
			*    });
			*/
 			dragLeaveDiv : function(){}
		},
		_create:function(){
			var _self = this.element ;
			var o = this.options ;
			var uploadContent = '' ;
			if(window.FileReader && !$.browser.opera){
				uploadContent = '浏览并选择文件，或者将文件拖放到该区域来上传文件。' ;
			}else{
				uploadContent = '浏览并选择文件。' ;
			}
			_self.prevAll('.upload-content').html(uploadContent) ;
			_self.height(o.height) ;
		},
		_init:function(){
			var _self = this.element ;
			var o = this.options ;
			var errorContent = '<p class="upload-files-errorCon"><p>' ;
			_self.after(errorContent) ;
			//通过浏览方式上传
			$('.upload-input input').change(function(){
				var fAllname = $(this).val() ;
				showFiles(fAllname) ;
				o.fn() ;
				o.fnFile() ;
			}) ;
			
			//通过拖拽方式上传
			if(window.FileReader){
				_self[0].addEventListener('dragenter', handleDragEnter, false);
				_self[0].addEventListener('dragover', handleDragOver, false);
				_self[0].addEventListener('drop', handleFileSelect, false);
				_self[0].addEventListener('dragleave', handleDragLeave, false);	
			}
			
			//处理拖放文件列表
			function handleFileSelect(evt) {
				evt.stopPropagation(); //阻止默认的打开事件
				evt.preventDefault();
				displayList(evt) ;
				o.fn() ;
				o.dragDropDiv() ;
			}
			
			// 处理插入拖出效果
			function handleDragEnter(evt){ 
				evt.stopPropagation();
				evt.preventDefault();
				o.dragEnterDiv() ;
			}
			function handleDragLeave(evt){
				o.dragLeaveDiv() ;
			}
	
			// 处理文件拖入事件，防止浏览器默认事件带来的重定向
			function handleDragOver(evt){
				evt.stopPropagation();
				evt.preventDefault();
				o.dragOverDiv() ;
			}
			
			//拖拽形式展示
			function displayList(evt){
				var files = evt.dataTransfer.files;//一个file类型的数组，就是你拖拽进来的文件
				for(var i=0,f; f=files[i]; i++){
					var pos = f.name.lastIndexOf('.') ;
					var fileFormat = f.name.substring(pos+1,f.name.length) ;
					var i = $('.upload-files-list').length ;
					var uid = 'uploadID' + i ;
					if(isuploadfileType(fileFormat)&&(!ishasupload(f.name))){
						reader = new FileReader() ;
						var uploadfiles = '<div class="upload-files-list" id="'+uid+'"><p class="upload-files-name"><a href="#">'+f.name+'</a></p><p class="upload-files-msg"><span class="upload-files-progress-num">5%</span><a href="#" class="upload-files-del"></a></p><p class="upload-files-progress"></p></div>' ;
						reader.readAsDataURL(f);//直接将图片的内容以FileReader的readAsDataURL方法读取入并显示
						_self.append(uploadfiles) ;
					}else if(ishasupload(f.name)){
						var errormsg = f.name +'已上传，请重新选择' ;
						_self.nextAll('.upload-files-errorCon').html(errormsg) ;
					}else{
						var errormsg = '您上传的'+fileFormat+'不是合法的格式，请重新选择' ;
						_self.nextAll('.upload-files-errorCon').html(errormsg) ;
					}
				}
			}
			
			//显示上传文件
			function showFiles(fAllname){
				var pos = fAllname.lastIndexOf('.') ;
				fformat = fAllname.substring(pos+1,fAllname.length) ;
				var posName = fAllname.lastIndexOf('\\') ;
				fname = fAllname.substring(posName+1,fAllname.length) ;
				var i = $('.upload-files-list').length ;
				if(isuploadfileType(fformat)&&(!ishasupload(fname))){
					var uploadfiles = '<div class="upload-files-list"><p class="upload-files-name"><a href="#">'+fname+'</a></p><p class="upload-files-msg"><span class="upload-files-progress-num">5%</span><a href="#" class="upload-files-del"></a></p><p class="upload-files-progress"></p></div>' ;
					_self.append(uploadfiles) ;
				}else if(ishasupload(fAllname)){
					var errormsg = f.name +'已上传，请重新选择' ;
					_self.nextAll('.upload-files-errorCon').html(errormsg) ;
				}else{
					var errormsg = '您上传的'+fformat+'不是合法的格式，请重新选择' ;
					_self.nextAll('.upload-files-errorCon').html(errormsg) ;
				}
			}
			
			//删除附件
			$('.upload-files-del').live('click',function(){
				$(this).parents('.upload-files').attr('data-id',$(this).parents('.upload-files-list').attr('id')) ;
				$(this).parents('.upload-files-list').remove() ;
				o.fnDel() ;
			}) ;
			
			//判断是否已上传文件
			function ishasupload(name){
				var isuploadfile = _self.find('.upload-files-name').find('a') ;
				var len = isuploadfile.length ;
				for(var i = 0; i<len ; i++){
					if(name == isuploadfile.eq(i).html()){
						return true ;
					}
				}
			}
			
			//判断是否可上传的文件格式
			function isuploadfileType(uploadType){
				var ableLen = o.able.length ;
				    disableLen = o.disable.length
				if((ableLen == 0)&&(disableLen == 0)){
					return isInArr(uploadType,o.contain) ;
				}else if((ableLen>0)&&(disableLen==0)){
					return isInArr(uploadType,o.able) ;
				}else if((ableLen==0)&&(disableLen>0)){
					return !(isInArr(uploadType,o.disable)) ;
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
		},
		/**
		* @description 清除上传附件
		* @return {ratystar} uploadannex对象
		* @example
		* $("#testExpObj").uploadannex('destroy');
		*/
		destroy : function(){
		}
	});

	$.extend($.fn.uploadannex, {
		version: "1.3"
	});

})(jQuery);
//设置进度值
function setProgress(id,value,isError){ //isError是一个布尔值，上传是否出错。
	var id = '#' + id ;
	var progress = $(id).find('.upload-files-progress') ;
	var progressNum = $(id).find('.upload-files-progress-num') ;
	var valueStr = value + '%' ;
	var hasdoing = progress.hasClass('upload-files-progress-doing') ;
	var hassuccess = progress.hasClass('upload-files-progress-success') ;
	var haserror = progress.hasClass('upload-files-progress-error') ;
	if(isError){
		if(!haserror){
			progressNum.addClass('.upload-files-num-error').html('续传') ;
			progress.addClass('upload-files-progress-error').width(valueStr) ;
		}
		if(hasdoing){
			progress.removeClass('upload-files-progress-doing') ;
		}
		if(hassuccess){
			progressNum.removeClass('upload-files-num-success') ;
			progress.removeClass('upload-files-progress-success') ;
		}
	}else if(parseInt(value) == 100){
		if(!hassuccess){
			progressNum.addClass('.upload-files-num-success').html('完成') ;
			progress.addClass('upload-files-progress-success').width(valueStr) ;
		}
		if(hasdoing){
			progress.removeClass('upload-files-progress-doing') ;
		}
		if(haserror){
			progressNum.removeClass('upload-files-num-error') ;
			progress.removeClass('upload-files-progress-error') ;
		}
	}else{
		if(!hasdoing){
			progressNum.html(valueStr) ;
			progress.addClass('upload-files-progress-doing').width(valueStr) ;
		}
		if(hassuccess){
			progressNum.removeClass('upload-files-num-success') ;
			progress.removeClass('upload-files-progress-success') ;
		}
		if(haserror){
			progressNum.removeClass('upload-files-num-error') ;
			progress.removeClass('upload-files-progress-error') ;
		}
	}
}