/*
 *作    者: 高娜
 *版    本: 1.3
 *完成时间: 2012-12-04
 *描    述: txttruncate
 *关联文件: jQuery.js|jquery-ui.js
 */
(function($,undefined){
    /**
	* @class 文本截断
    * @name txttruncate
    * @description 文本截断
	* @version 1.3
    */
	$.widget('ui.txttruncate',
	/** @lends txttruncate.prototype */
	{		
		options:{
			/**  
			* @name txttruncate#dataPrompt
			* @param {Boolean}  布尔类型
			* @description 是否以提示信息的方式显示完整的未截取的字符串。
			* @default {Boolean} true
			* @example
			* $('.exampleObj').txttruncate({
			*		dataPrompt : true
			*  });
			*/
			dataPrompt : true ,
			/**  
			* @name txttruncate#dataFormat
			* @param {String}  字符串类型
			* @description 显示多余内容的替代后缀，可以是html片段,注意定义html片段时需要考虑标签的正确嵌套关系
			* @default {String} '...'
			* @example
			* $('.exampleObj').txttruncate({
			*		dataFormat : '...'
			*  });
			*/
			dataFormat : '...' ,
			/**  
			* @name txttruncate#customFn
			* @param {Fn}  函数类型
			* @description 自定义函数
			* @default {Fn} function(){}
			* @example
			* $('.exampleObj').txttruncate({
			*		customFn : function(){alert("customFn")}
			*  });
			*/
			customFn : function(){}
		},
		_create:function(){},
		_init:function(){		
			var _self = this.element ;
			var o = this.options ;
			var txtWid = _self.attr('data-width') ;
			var txtLen = _self.attr('data-length') ;
			var txtHtml = _self.html() ;
			var txtSize = parseInt(_self.css('font-size')) ;
			var format = o.dataFormat ;
			var isWid = (txtWid != undefined) ;
			var isLen = (txtLen != undefined) ;
			if(isLen){ //设置了显示文本的长度没有设置显示区域的宽度或是同时设置了显示文本的长度和显示区域的宽度。
			}else if(!isLen && isWid){//设置了显示区域宽度
				txtLen = Math.floor(txtWid/txtSize) ;
			}else{//没有设置显示文本的长度和显示区域宽度、显示区域宽度根据上下文自适应
				txtWid = _self.width() ;
				txtLen = Math.floor(txtWid/txtSize) ;
				$(window).resize(function(){
					txtWid = _self.width() ;
					txtLen = Math.floor(txtWid/txtSize) ;
				}) ;
			}
			if(truncateByte(txtHtml,txtLen) != txtHtml){
				var newTxt = truncateByte(txtHtml,txtLen) + format ;
			}else{
				var newTxt = truncateByte(txtHtml,txtLen) ;
			}
			_self.html(newTxt).attr('data-source',txtHtml) ;	
			$(window).resize(function(){
				if(truncateByte(txtHtml,txtLen) != txtHtml){
					var newTxt = truncateByte(txtHtml,txtLen) + format ;
				}else{
					var newTxt = truncateByte(txtHtml,txtLen) ;
				}
				_self.html(newTxt).attr('data-source',txtHtml) ;		
			}) ;
			if(o.dataPrompt){
				_self.attr('title',txtHtml) ;
			}
			o.customFn() ;
			//截取方法-按设置文本长度截取
			function truncateByte(str,n){//str待截取的字符串，n设定的截取长度，相当于2n个字节
				var char_length = 0 ;
				for(var i=0; i<str.length;i++){
					var son_str = str.charAt(i) ;
					encodeURI(son_str).length > 2 ? char_length += 1 : char_length += 0.5 ;
					if(char_length > n){
						var sub_len = char_length == n ? i+1 : i ;
						return str.substr(0,sub_len) ;
					}
				}
				return str ;
			}
		},
		/**
		* @description 设置修改替代后缀
		* @return {txttruncate} txttruncate对象
		* @example
		* $("#testExpObj").txttruncate('setformat');
		*/
		setformat : function(forms){
			var _self = this.element ;
			var o = this.options ;
			if(_self.attr('data-source')){
				_self.html(_self.attr('data-source')) ;
			}
			_self.txttruncate({
				dataFormat:forms
			}) ;
		},
		/**
		* @description 设置修改data-length的值
		* @return {txttruncate} txttruncate对象
		* @example
		* $("#testExpObj").txttruncate('setlength');
		*/
		setlength : function(len){
			var _self = this.element ;
			var o = this.options ;
			if(_self.attr('data-source')){
				_self.html(_self.attr('data-source')) ;
			}
			_self.attr('data-length',len) ;
			_self.txttruncate() ;
		},
		/**
		* @description 设置修改data-width的值
		* @return {txttruncate} txttruncate对象
		* @example
		* $("#testExpObj").txttruncate('setwidth');
		*/
		setwidth : function(wid){
			var _self = this.element ;
			var o = this.options ;
			if(_self.attr('data-source')){
				_self.html(_self.attr('data-source')) ;
			}
			_self.attr('data-width',wid) ;
			_self.txttruncate() ;
		},
		/**
		* @description 设置修改区域样式宽度
		* @return {txttruncate} txttruncate对象
		* @examplesetauto
		* $("#testExpObj").txttruncate('setcsswid');
		*/
		setcsswid : function(str){
			var _self = this.element ;
			var o = this.options ;
			if(_self.attr('data-source')){
				_self.html(_self.attr('data-source')) ;
			}
			_self.removeAttr('data-length').removeAttr('data-width') ;
			_self.css('width',str).txttruncate() ;
		},
		/**
		* @description 清除文本截断控件
		* @return {txttruncate} txttruncate对象
		* @example
		* $("#testExpObj").txttruncate('destroy');
		*/
		destroy : function(){
			var _self = this.element ;
			var o = this.options ;
			if(_self.attr('data-source')){
				_self.html(_self.attr('data-source')) ;
			}
		}
	});

	$.extend($.fn.txttruncate, {
		version: "1.3"
	});
	
})(jQuery);