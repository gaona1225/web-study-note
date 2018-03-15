
/*
 *作    者: 张勇辉 
 *版    本: 1.3 
 *完成时间: 2011-08-25 
 *描    述: inputSelect 
 *关联文件: jQuery.js|jquery-ui.js 
 *修改记录：huanghui 2012-10-10 v1.3版本，加入css3样式圆角和边框阴影、修改禁用启用方法 
 */	
(function($,undefined){
	/** 
	* @class 下拉菜单 
    * @name inputSelect
    * @description 下拉菜单 
	* @requires jQuery.js|jquery-ui.js 
	* @version 1.3
    */
	$.widget("ui.inputSelect",
	 /** @lends inputSelect.prototype */	 
	{
		options:{
		},
		_create:function(){
			var _self = this.element,
			 	currentFocus = false;
			_self.addClass("ui-inputSelect");
			_self.mouseover(function(){
				_self.addClass("ui-inputSelect-active");
			})
			.focus(function(){
				currentFocus = true;
				_self.addClass("ui-inputSelect-active");
			})
			.blur(function(){
				currentFocus = false;
				_self.removeClass("ui-inputSelect-active");
			})
			.mouseout(function(){
				if(!currentFocus){
				_self.removeClass("ui-inputSelect-active");
				}
			});
		},
		_init:function(){
		},
		/**
		* @description 显示下拉选择框
		* @return {inputSelect} inputSelect对象
		* @example
		* $("#logo").inputSelect('show');
		*/
		show:function(){
			var _self = this.element;
			_self.show();
			return _self;
		},
		/**
		* @description 隐藏下拉选择框
		* @return {inputSelect} inputSelect对象
		* @example
		* $("#logo").inputSelect('hide');
		*/
		hide:function(){
			var _self = this.element;
			_self.hide();
			return _self;
		},
		/**
		* @description 禁用下拉选择框
		* @return {inputSelect} inputSelect对象
		* @example
		* $("#logo").inputSelect('disable');
		*/
		disable:function(){
			var _self = this.element;
			_self.attr("disabled",true).css("borderColor","#ddd");
			return _self;
		},
		/**
		* @description 启用下拉选择框
		* @return {inputSelect} inputSelect对象
		* @example
		* $("#logo").inputSelect('enable');
		*/
		enable:function(){
			var _self = this.element;
			_self.attr("disabled",false).css("borderColor","");
			return _self;
		},
		/**
		* @description 销毁下拉选择框
		* @return {inputSelect} inputSelect对象
		* @example
		* $("#logo").inputSelect('destroy');
		*/
		destroy:function(){}
	});
	
$.extend($.ui.inputSelect, {
	version: "1.3"
});

})(jQuery);
//initialize
$(function(){
	$("select").inputSelect();   
});