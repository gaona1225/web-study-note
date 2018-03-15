/*
 *作    者: 高娜
 *版    本: 1.2
 *完成时间: 2012-06-11
 *描    述: ajaxload
 *关联文件: jQuery.js|jquery-ui.js
 */
(function($,undefined){
    /**
	* @class 加载等待提示功能
    * @name ajaxload
    * @description 加载等待提示插件
	* @version 1.2
    */
	$.widget('ui.ajaxload',
	/** @lends ajaxload.prototype */
	{		
		options:{
			/**  
			* @name ajaxload#content
			* @param {String}  字符串类型
			* @description 提示信息文字描述
			* @default {String} ''
			* @example
			* $('.exampleObj').ajaxload({
			*		content : '加载中,请稍后......'
			*  });
			*/
			content : '加载中,请稍后......' ,
			/**  
			* @name ajaxload#gifSize
			* @param {String}  字符串类型
			* @description 加载图片类型，可选参数有大中小三种bigSize(48*48),midSize(24*24),smallSize(16*16)
			* @default {String} ''
			* @example
			* $('.exampleObj').ajaxload({
			*		gifSize : 'midSize'
			*  });
			*/
			gifSize : 'midSize' 
		},
		_create:function(){
			var o = this.options ;
			var self = this.element ;
			var ajaxMask = '<div class="ajaxMask"><div class="ajaxContent"><p class="ajaxPic '+o.gifSize+'"></p><p class="ajaxMsg">'+o.content+'</p></div></div>' ;
			var ajaxMain = '<div class="ajaxMain"></div>' ;
			var ajaxCon = '<div class="ajaxCon"></div>' ;
			var maskWid = self.width() ;
			var maskHei = self.height() ;
			var maskL = self.offset().left ;
			var maskT = self.offset().top ;
			if(self.attr('data-dom')!='true'){
				self.wrap(ajaxMain).after(ajaxMask).wrap(ajaxCon) ;
				self.attr('data-dom',true) ;
			}
			var selfPar = self.parents('.ajaxMain') ;
			var ajaxContentL = (maskWid - (selfPar.find('.ajaxMsg').width() + selfPar.find('.ajaxPic').width()))/2 ;
			var ajaxContentT = (maskHei - selfPar.find('.ajaxPic').height())/2 ;
			//设置提示信息行高
			selfPar.find('.ajaxMsg').css('line-height',selfPar.find('.ajaxPic').height() + 'px') ;
			//设置遮罩层宽高定位
			selfPar.find('.ajaxMask').css({
				height : maskHei,
				width : maskWid ,
				top : maskT ,
				left : maskL
			}) ;
			//设置加载gif图和提示信息定位
			selfPar.find('.ajaxContent').css({
				top : ajaxContentT ,
				left : ajaxContentL
			}) ;
		},
		_init:function(){
		},
		/**
		* @description 显示加载提示
		* @return {ajaxload} ajaxload对象
		* @example
		* $("#testExpObj").ajaxload('show');
		*/
		show : function(){
			this.element.parents('.ajaxMain').find('.ajaxMask').css('display','block') ;
			return this.element ;
		},
		/**
		* @description 影藏加载提示
		* @return {ajaxload} ajaxload对象
		* @example
		* $("#testExpObj").ajaxload('hide');
		*/
		hide : function(){
			this.element.parents('.ajaxMain').find('.ajaxMask').css('display','none') ;			
			return this.element ;
		},
		/**
		* @description 销毁加载提示
		* @return {ajaxload} ajaxload对象
		* @example
		* $("#testExpObj").ajaxload('destroy');
		*/
		destroy : function(){
			if(this.element.attr('data-dom') == 'true'){
				this.element.parents('.ajaxMain').find('.ajaxMask').remove() ;
				this.element.unwrap().unwrap() ;
			}
			this.element.attr('data-dom','false') ;
			return this.element ;
		}
	});

	$.extend($.fn.ajaxload, {
		version: "1.2"
	});

})(jQuery);