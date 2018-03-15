
/*
 *作    者: 张勇辉 
 *版    本: 1.3 
 *完成时间: 2011-08-25 
 *描    述: inputText 
 *关联文件: jQuery.js|jquery-ui.js 
 *修改记录：huanghui 2012-10-10 v1.3版本，加入css3样式圆角和边框阴影、修改禁用启用方法
 */	
(function($,undefined){
	/** 
	* @class 表单单行文本框
    * @name stateBox
    * @description 单行文本框插件 
	* @requires jQuery.js|jquery-ui.js 
	* @version 1.3 
    */
	$.widget("ui.inputText",
	 /** @lends stateBox.prototype */	 
	{
		options:{
		},
		_create:function(){
			var _self = this.element,
			 	currentFocus = false;
			if(_self.is(".minSearch")){
				/*预留的控制域*/
			}else{
				_self.addClass("ui-inputText");
				_self.mouseover(function(){
					_self.addClass("ui-inputText-active");
				})
				.focus(function(){
					currentFocus = true;
					_self.addClass("ui-inputText-active");
				})
				.blur(function(){
					currentFocus = false;
					_self.removeClass("ui-inputText-active");
				})
				.mouseout(function(){
					if(!currentFocus){
					_self.removeClass("ui-inputText-active");
					}
				});
			}
		},
		_init:function(){
		},
		/**
		* @description 显示单行文本框
		* @return {inputText} inputText对象
		* @example
		* $("#logo").inputText('show');
		*/
		show:function(){
			var _self = this.element;
			_self.show();
			return _self;
		},
		/**
		* @description 隐藏单行文本框
		* @return {inputText} inputText对象
		* @example
		* $("#logo").inputText('hide');
		*/
		hide:function(){
			var _self = this.element;
			_self.hide();
			return _self;
		},
		/**
		* @description 禁用单行文本框
		* @return {inputText} inputText对象
		* @example
		* $("#logo").inputText('disable');
		*/
		disable:function(){
			var _self = this.element;
			_self.attr("disabled",true).css("borderColor","#ddd");
			return _self;
		},
		/**
		* @description 启用单行文本框
		* @return {inputText} inputText对象
		* @example
		* $("#logo").inputText('enable');
		*/
		enable:function(){
			var _self = this.element;
			_self.attr("disabled",false).css("borderColor","");
			return _self;
		},
		/**
		* @description 销毁单行文本框
		* @return {inputText} inputText对象
		* @example
		* $("#logo").inputText('destroy');
		*/
		destroy:function(){}
	});
	
$.extend($.ui.inputText, {
	version: "1.3"
});

})(jQuery);
//initialize
$(function(){
	$("input:text,input:password").inputText();   
});