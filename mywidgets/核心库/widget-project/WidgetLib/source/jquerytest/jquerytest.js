/*
 *作    者: 高娜
 *版    本: 1.3
 *完成时间: 2012-07-18
 *描    述: jquerytest
 *关联文件: jQuery.js|jquery-ui.js
 */
(function($,undefined){
    /**
	* @class 输入块控件
    * @name jquerytest
    * @description 输入块插件
	* @version 1.3
    */
	$.widget('ui.jquerytest',
	/** @lends jquerytest.prototype */
	{		
		options:{
			/**  
			* @name jquerytest#value
			* @param {Number}  数字类型
			* @description 默认值
			* @default {Number} 0
			* @example
			* $('.exampleObj').jquerytest({
			*		value : 0
			*  });
			*/
			value : 0 
		},
		_create:function(){
			this._update() ;
		},
		_setOption : function(key,value){
			this.options[key] = value ;
			this._update() ;	
		} ,
		_update : function(){
			var progress = this.options.value + '%' ;
			this.element.width(progress) ;
			if(this.options.value == 100){
				this._trigger('complete',null,{value : 100}) ;
			}
		} ,
		/**
		* @description 设置值
		* @return {jquerytest} jquerytest对象
		* @example
		* $("#testExpObj").jquerytest('value');
		*/
		value : function(value){
			if(value === undefined){
				return this.options.value ;
			}else{
				this.options.value = this._constrain(value) ;
				var progress = this.options.value + '%' ;
				this.element.width(progress) ;
			}
		},
		_constrain : function(value){
			if(value > 100){
				value = 100 ;
			} ;
			if(value < 0){
				value = 0 ;
			}
			return value ;
		}
	});

	$.extend($.ui.jquerytest, {
		version: "1.3"
	});

})(jQuery);