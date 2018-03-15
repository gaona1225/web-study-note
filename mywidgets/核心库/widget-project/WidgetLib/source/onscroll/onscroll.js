/*
 *作    者: 高娜
 *版    本: 1.3
 *完成时间: 2012-10-11
 *描    述: onscroll
 *关联文件: jQuery.js|jquery-ui.js
 */
(function($,undefined){
    /**
	* @class 滚动控制
    * @name onscroll
    * @description 滚动控制目标元素插件
	* @version 1.3
    */
	$.widget('ui.onscroll',
	/** @lends onscroll.prototype */
	{		
		options:{
			/**  
			* @name onscroll#scrollDir
			* @param {String}  字符串类型
			* @description 判断目标区域是否可如何滚动条滚动条可进入可视区域内，当值为y时表示只需要滚动y轴方向滚动条，当值为x时表示值需要滚动x轴方向滚动条，当值为xy时表示需要同时滚动x、y两个方向滚动条。
			* @default {String} 'x','y','xy'
			* @example
			* $('#scroll1').onscroll({
			*		scrollDir : 'y'
			*  });
			*/
			scrollDir : 'y' ,
			/**  
			* @name onscroll#inTar 
			* @param {Fn} 函数 
			* @description 进入目标区域内自定义方法
			* @default {Fn} function(){}
			* @example
			* $('#scroll1').onscroll({
			*		inTar: function(){alert("inTar")}
			*    });
			*/
 			 inTar : function(){} ,
			 /**  
			* @name onscroll#outTar 
			* @param {Fn} 函数 
			* @description 出目标区域内自定义方法
			* @default {Fn} function(){}
			* @example
			* $('#scroll1').onscroll({
			*		outTar: function(){alert("outTar")}
			*    });
			*/
 			 outTar : function(){} 
		},
		_create:function(){},
		_init:function(){
			var _self = this.element ;
			var o = this.options ;
			var innerTar = false ;
			var outerTar = false ;
			if(o.scrollDir == 'y'){
				var tarTop = parseInt(_self.offset().top) ;
				var tarBtm = parseInt(tarTop + _self.height()) ;
				$(document).scroll(function(){
					var bodyTop = parseInt($(document).scrollTop()) ;
					if((bodyTop >= tarTop)&&(bodyTop<=tarBtm)&&(!outerTar)){
						o.inTar() ;
						innerTar = true ;
						outerTar = true ;
					}else if(((bodyTop < tarTop)||(bodyTop > tarBtm))&&innerTar){
						o.outTar() ;
						innerTar = false ;
						outerTar = false ;
					}
				}) ;
			}else if(o.scrollDir == 'x'){
				var tarLeft = parseInt(_self.offset().left) ;
				var tarRight = parseInt(tarLeft + _self.width()) ;
				$(document).scroll(function(){
					var bodyLeft = parseInt($(document).scrollLeft()) ;
					if((bodyLeft >= tarLeft)&&(bodyLeft<=tarRight)&&(!outerTar)){
						o.inTar() ;
						innerTar = true ;
						outerTar = true ;
					}else if(((bodyLeft < tarLeft)||(bodyLeft > tarRight))&&innerTar){
						o.outTar() ;
						innerTar = false ;
						outerTar = false ;
					}
				}) ;
			}else if(o.scrollDir == 'xy'){
				var tarTop = parseInt(_self.offset().top) ;
				var tarBtm = parseInt(tarTop + _self.height()) ;
				var tarLeft = parseInt(_self.offset().left) ;
				var tarRight = parseInt(tarLeft + _self.width()) ;
				$(document).scroll(function(){
					var bodyTop = parseInt($(document).scrollTop()) ;
					var bodyLeft = parseInt($(document).scrollLeft()) ;
					if((bodyLeft >= tarLeft)&&(bodyLeft<=tarRight)&&(bodyTop >= tarTop)&&(bodyTop<=tarBtm)&&(!outerTar)){
						o.inTar() ;
						innerTar = true ;
						outerTar = true ;
					}else if(((bodyLeft < tarLeft)||(bodyLeft > tarRight)||(bodyTop < tarTop)||(bodyTop > tarBtm))&&innerTar){
						o.outTar() ;
						innerTar = false ;
						outerTar = false ;
					}
				}) ;
			}
		}
	});

	$.extend($.fn.onscroll, {
		version: "1.3"
	});

})(jQuery);