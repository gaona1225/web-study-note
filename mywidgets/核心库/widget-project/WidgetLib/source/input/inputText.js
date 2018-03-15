
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
		destroy:function(){
		}
	});
	
$.extend($.ui.inputText, {
	version: "1.2"
});

})(jQuery);
//initialize
$(function(){
	$("input:text,input:password").inputText();   
});