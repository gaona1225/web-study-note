
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
	* @class 表单多行输入框插件 
    * @name stateBox
    * @description 表单多行输入框插件 
	* @requires jQuery.js|jquery-ui.js 
	* @version 1.3
    */
	$.widget("ui.inputTextarea",
	 /** @lends stateBox.prototype */	 
	{
		options:{
		},
		_create:function(){
			var _self = this.element,
			 	currentFocus = false;
			_self.addClass("ui-inputTextarea");
			_self.mouseover(function(){
				_self.addClass("ui-inputTextarea-active");
			})
			.focus(function(){
				currentFocus = true;
				_self.addClass("ui-inputTextarea-active");
			})
			.blur(function(){
				currentFocus = false;
				_self.removeClass("ui-inputTextarea-active");
			})
			.mouseout(function(){
				if(!currentFocus){
				_self.removeClass("ui-inputTextarea-active");
				}
			});
		},
		_init:function(){
		},
		/**
		* @description 显示单行文本框
		* @return {inputTextarea} inputTextarea对象
		* @example
		* $("#logo").inputTextarea('show');
		*/
		show:function(){
			var _self = this.element;
			_self.show();
			return _self;
		},
		/**
		* @description 隐藏多行文本框
		* @return {inputTextarea} inputTextarea对象
		* @example
		* $("#logo").inputTextarea('hide');
		*/
		hide:function(){
			var _self = this.element;
			_self.hide();
			return _self;
		},
		/**
		* @description 禁用多行文本框
		* @return {inputTextarea} inputTextarea对象
		* @example
		* $("#logo").inputTextarea('disable');
		*/
		disable:function(){
			var _self = this.element;
			_self.attr("disabled",true).css("borderColor","#ddd");
			return _self;
		},
		/**
		* @description 启用多行文本框
		* @return {inputTextarea} inputTextarea对象
		* @example
		* $("#logo").inputTextarea('enable');
		*/
		enable:function(){
			var _self = this.element;
			_self.attr("disabled",false).css("borderColor","");
			return _self;
		},
		/**
		* @description 销毁多行文本框
		* @return {inputTextarea} inputTextarea对象
		* @example
		* $("#logo").inputTextarea('destroy');
		*/
		destroy:function(){}
	});
	
$.extend($.ui.inputTextarea, {
	version: "1.3"
});

})(jQuery);
//initialize
$(function(){
	$("textarea").inputTextarea();   
});