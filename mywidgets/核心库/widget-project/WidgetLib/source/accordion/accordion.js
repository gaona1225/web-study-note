/*
 *作    者: 高娜
 *版    本: 1.3
 *完成时间: 2012-07-19
 *描    述: accordion
 *关联文件: jQuery.js|jquery-ui.js
 */
(function($,undefined){
    /**
	* @class 手风琴控件
    * @name accordion
    * @description 手风琴控件
	* @version 1.3
    */
	$.widget('ui.accordion',
	/** @lends accordion.prototype */
	{		
		options : {
			/**  
			* @name accordion#wrapWidth
			* @param {Number}  数字类型
			* @description 包裹展示区域的宽度-针对x方向手风琴设置,建议根据显示图片个数设置,这个值与显示图片宽度的差值大于显示图片数量的十倍
			* @default {Number} 480
			* @example
			* $('.exampleObj').accordion({
			*		wrapWidth : 480
			*  });
			*/
			wrapWidth : 480 ,
			/**  
			* @name accordion#wrapHeight
			* @param {Number}  数字类型
			* @description 包裹展示区域的高度-针对y方向手风琴设置,建议根据显示图片个数设置,这个值与显示图片高度的差值大于显示图片数量的十倍
			* @default {Number} 480
			* @example
			* $('.exampleObj').accordion({
			*		wrapHeight : 480
			*  });
			*/
			wrapHeight : 480 ,
			/**  
			* @name accordion#imgWidth
			* @param {Number}  数字类型
			* @description 图片的宽度
			* @default {Number} 400
			* @example
			* $('.exampleObj').accordion({
			*		imgWidth : 400
			*  });
			*/
			imgWidth : 400 ,
			/**  
			* @name accordion#imgHeight
			* @param {Number}  数字类型
			* @description 图片的高度
			* @default {Number} 300
			* @example
			* $('.exampleObj').accordion({
			*		imgHeight : 300
			*  });
			*/
			imgHeight : 300 ,
			/**  
			* @name accordion#direction
			* @param {String}  字符串类型
			* @description 手风琴效果方向，可选值有x/y
			* @default {String} 'x'
			* @example
			* $('.exampleObj').accordion({
			*		direction : 'x'
			*  });
			*/
			direction : 'x' ,
			/**  
			* @name accordion#autoplay
			* @param {Boolean}  布尔值类型
			* @description 是否自动播放
			* @default {Boolean} true
			* @example
			* $('.exampleObj').accordion({
			*		autoplay : true
			*  });
			*/
			autoplay : true ,
			/**  
			* @name accordion#delay
			* @param {Number}  数字类型
			* @description 自动切换动画的时间间隔
			* @default {Number} 3000
			* @example
			* $('.exampleObj').accordion({
			*		delay : 3000
			*  });
			*/
			delay : 3000 ,
			/**  
			* @name accordion#radius
			* @param {Number}  数字类型
			* @description 圆角值-该样式需要浏览器支持css3，如果不支持默认为没有圆角效果。
			* @default {Number} 8
			* @example
			* $('.exampleObj').accordion({
			*		radius : 8
			*  });
			*/
			radius : 8 ,
			/**  
			* @name accordion#fn
			* @param {Function}  函数类型
			* @description 预留自定义函数
			* @default {Function} fn
			* @example
			* $('.exampleObj').accordion({
			*		fn : function(){}
			*  });
			*/
			fn : function(){}
		},
		_create : function(){
		},
		_init : function(){
			var _self = this.element ;
			var o = this.options ;
			var liElem = _self.find('li') ;
			var len = liElem.length ;
			_self.addClass('accor-wrap').css('border-radius',o.radius + 'px').find('li').addClass('accor-elem').css('border-radius',o.radius + 'px').find('img').css('border-radius',o.radius + 'px').width(o.imgWidth).height(o.imgHeight) ;
			if(o.direction == 'x'){
				accrX() ;
			}else if(o.direction == 'y'){
				accrY() ;
			}
			o.fn() ;
			
			function accrX(){
				var minWid = parseInt((o.wrapWidth - o.imgWidth + 1)/(len - 1));
				var inter = null ;
				var nextIndex = 0 ;
				_self.width(o.wrapWidth).height(o.imgHeight) ;	
				liElem.addClass('accor-border-left') ;
				liElem.eq(len-1).addClass('accor-current') ;
				liElem.each(function(i){
					var _left = parseInt(minWid) * i;
					$(this).css({
						left : _left 
					});
					$(this).hover(function(){
						liElem.each(function(j){
							liElem.eq(i).addClass('accor-current').siblings('li').removeClass('accor-current') ;
							if(j<=i){
							 	$(this).stop().animate({left:j*parseInt(minWid)},500);
							}else{
							 	$(this).stop().animate({left:parseInt(o.wrapWidth - minWid*(len - j))},500) ;
							}
						}) ;
						if(inter != null || inter != 'undefined'){
							clearInterval(inter);
						}
					},function(){
						nextIndex = i ;
						if(o.autoplay){
							inter = setInterval(autoScroll,o.delay);
							if(++nextIndex >= len){
								nextIndex = 0 ;
							}
						}
					}) ;
				}) ;
				if(o.autoplay){
					inter = setInterval(autoScroll,o.delay);
				}
				function autoScroll(){
					liElem.each(function(j){
						liElem.eq(nextIndex).addClass('accor-current').siblings('li').removeClass('accor-current') ;
						if(j<=nextIndex){ 
						 	$(this).stop().animate({left:j*parseInt(minWid)},500);
						}else{
						 	$(this).stop().animate({left:parseInt(o.wrapWidth - minWid*(len - j))},500) ;
						}  
					});
					if(++nextIndex >= len){
						nextIndex = 0 ;
					}
				}
			}			
			
			function accrY(){
				var minHei = parseInt((o.wrapHeight - o.imgHeight + 1)/(len - 1));
				var inter = null ;
				var nextIndex = 0 ;
				_self.width(o.imgWidth).height(o.wrapHeight) ;	
				liElem.addClass('accor-border-top') ;
				liElem.eq(len-1).addClass('accor-current') ;
				liElem.each(function(i){
					var _top = parseInt(minHei) * i;
					$(this).css({
						top : _top 
					});
					$(this).hover(function(){
						liElem.each(function(j){
							liElem.eq(i).addClass('accor-current').siblings('li').removeClass('accor-current') ;
							if(j<=i){
							 	$(this).stop().animate({top:j*parseInt(minHei)},500);
							}else{
							 	$(this).stop().animate({top:parseInt(o.wrapHeight - minHei*(len - j))},500) ;
							}
						}) ;
						if(inter != null || inter != 'undefined'){
							clearInterval(inter);
						}
					},function(){
						nextIndex = i ;
						if(o.autoplay){
							inter = setInterval(autoScroll,o.delay);
							if(++nextIndex >= len){
								nextIndex = 0 ;
							}
						}
					}) ;
				}) ;
				if(o.autoplay){
					inter = setInterval(autoScroll,o.delay);
				}
				function autoScroll(){
					liElem.each(function(j){
						liElem.eq(nextIndex).addClass('accor-current').siblings('li').removeClass('accor-current') ;
						if(j<=nextIndex){ 
						 	$(this).stop().animate({top:j*parseInt(minHei)},500);
						}else{
						 	$(this).stop().animate({top:parseInt(o.wrapHeight - minHei*(len - j))},500) ;
						}  
					});
					if(++nextIndex >= len){
						nextIndex = 0 ;
					}
				}
			}
		} ,
		/**
		* @description 清除手风琴控件
		* @return {accordion} accordion对象
		* @example
		* $("#testExpObj").accordion('destroy');
		*/
		destroy : function(){
			
		}
	});

	$.extend($.fn.accordion, {
		version: "1.3"
	});

})(jQuery);