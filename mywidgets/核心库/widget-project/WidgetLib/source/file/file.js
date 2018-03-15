/*
 *作    者: 高娜
 *版    本:1.3
 *完成时间: 2012-07-18
 *描    述: file
 *关联文件: jQuery.js|jquery-ui.js
 */
(function($,undefined){
    /**
	* @class 文件上传控件
    * @name file
    * @description 文件上传控件
	* @version   1.3
    */
	$.widget('ui.file',
	/** @lends file.prototype */
	{		
		options:{
			/**  
			* @name file#width
			* @param {Number}  数字类型
			* @description 文件上传控件的宽度
			* @default {Number} 200
			* @example
			* $('.exampleObj').file({
			*		width : 200
			*  });
			*/
			width : 200 ,
			/**  
			* @name file#height
			* @param {Number}  数字类型
			* @description 文件上传控件的高度
			* @default {Number} 200
			* @example
			* $('.exampleObj').file({
			*		height : 30
			*  });
			*/
			height : 30 
		},
		_create:function(){
			var _self = this.element ;
			var o=this.options ;
			var _span = '<span class="file-wrap"></span>' ;
			var _textInput = '<input class="file-text" type="text" readonly /><input class="file-button" type="button" value="浏览" />' ;           
			_self.wrap(_span).after(_textInput) ;
			_self.addClass("file-ifile").width(o.width).height(o.height) ;
			var _parent = _self.parents('.file-wrap') ;
			var text_width=o.width - _parent.find('.file-button').width() -3 ;
			var _left = _parent.offset().left;
			var _top = _parent.offset().top;
			_parent.find('.file-text').width(text_width).height(o.height - 2).css('line-height',o.height - 2+'px') ;
			_self.css({'top':_top,'left':_left}) ;
		},
		
		_init:function(){
			 var _self = this.element ;
			 _self.change(function(){
			 	var _value = _self.val().substring(_self.val().lastIndexOf('\\')+1,_self.val().length) ; 
			 	_self.parents('.file-wrap').find('.file-text').val(_value) ;
			 }) ;
		} ,
		/**
		* @description 获得文件路径控件
		* @return {inputblock} inputblock对象
		* @example
		* $("#testExpObj").file('getVal');
		*/
       getVal : function(){
		   getVal = this.element.parents(".file-wrap").find('.file-text').val();
		   return getVal ;
       },
		/**
		* @description 清除文件上传控件
		* @return {inputblock} inputblock对象
		* @example
		* $("#testExpObj").file('destroy');
		*/
		destroy : function(){
			if(this.element.parents('.file-wrap').length >0){
				this.element.parents('.file-wrap').find('.file-text').remove() ;
			 	this.element.parents('.file-wrap').find('.file-button').remove() ;
			 	this.element.removeClass().unwrap('.file-wrap');
			}
		}
	});

	$.extend($.ui.file, {
		version: "1.3"
	});

})(jQuery);

