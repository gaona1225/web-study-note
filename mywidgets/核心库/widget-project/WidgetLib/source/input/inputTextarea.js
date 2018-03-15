
/*
 *作    者: 张勇辉 
 *版    本: 1.2 
 *完成时间: 2011-08-25 
 *描    述: inputText 
 *关联文件: jQuery.js|jquery-ui.js 
 */	
(function($,undefined){
	/** 
	* @class 状态提示插件 
    * @name stateBox
    * @description 状态提示插件 
	* @requires jQuery.js|jquery-ui.js 
	* @version 1.2 
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
		destroy:function(){
		}
	});
	
$.extend($.ui.inputTextarea, {
	version: "1.2"
});

})(jQuery);
//initialize
$(function(){
	$("textarea").inputTextarea();   
});