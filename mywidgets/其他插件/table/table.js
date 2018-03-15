/*
 *作    者: 高娜 
 *版    本: 1.0 
 *完成时间: 2012-02-07 
 *描    述: tablelist
 *关联文件: jQuery.js  
 */
 
 /*
 *	#example:
 *	$('.table').tablelist({
	 	table_sort : true
 *	});
 *
 */
(function($){
	/** 
	* @class tablelist监听器
    * @name tablelist
    * @description 列表
	* @version 1.0 
	* @author 高娜 
	* @requires jQuery-1.5.2+
    */
	$.fn.tablelist = function(options){
		var defaults = {
			/**  
			* @name tablelist#table_sort
			* @param {Boolean}  布尔类型
			* @description 列表是否可排序
			* @default {Boolean} true
			* @example
			* $('.table').tablelist({
			*		table_sort : true
			*  });
			*/
			table_sort : true,			
			/**  
			* @name tablelist#table_changecolor
			* @param {Boolean}  布尔类型
			* @description 列表是否隔行变色
			* @default {Boolean} true
			* @example
			* $('.table').tablelist({
			*		table_changecolor : true
			*  });
			*/
			table_changecolor : true,
			/**  
			* @name tablelist#table_highlight
			* @param {Boolean}  布尔类型
			* @description 鼠标滑过列表是否高亮显示该行
			* @default {Boolean} true
			* @example
			* $('.table').tablelist({
			*		table_highlight : true
			*  });
			*/
			table_highlight : true,
			/**  
			* @name tablelist#table_headfrozen
			* @param {Boolean}  布尔类型
			* @description 列表是否冻结表头
			* @default {Boolean} true
			* @example
			* $('.table').tablelist({
			*		table_headfrozen : true
			*  });
			*/
			table_headfrozen : true,
			/**  
			* @name tablelist#table_scroll
			* @param {Boolean}  布尔类型
			* @description 列表是否滚动表体
			* @default {Boolean} true
			* @example
			* $('.table').tablelist({
			*		table_scroll : true
			*  });
			*/
			table_scroll : true,
			/**  
			* @name dragable#dragableTouch  
			* @param {Fn} 函数 
			* @description 碰触到测试区域操作
			* @default {Fn} function(){}
			* @example
			* $('.dragableDiv').dragableTouch({
			*		dragableTouch: function(){alert("touch")}
			*    });
			*/
 			dragableTouch : function(){},
		} ;
		var opts = $.extend(defaults,options) ;
		this.each(function(){
			
		}) ;
		return this;
	} ;
	 $.extend($.fn.dragable,{
		version: '1.0',
		author:'高娜'
	});
})(jQuery);