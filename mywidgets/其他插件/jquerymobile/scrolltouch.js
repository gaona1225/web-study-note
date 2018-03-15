/*
 *作    者: 高娜 
 *版    本: 1.0 
 *完成时间: 2011-12-23 
 *描    述: scrolltouch
 *关联文件: jQuery.js  
*/
/*
 *	#example:
 *	$('.contMsg').scrolltouch({
	 	scrolltouch_x : false,
		scrolltouch_y : true,
		scrolltouch_delay : 0
 *	});
 *
 */
(function($){
	/** 
	* @class scrolltouch监听器
    * @name scrolltouch
    * @description touch滚动
	* @version 1.0 
	* @author 高娜 
	* @requires jQuery-1.6.4+
    */
	$.fn.scrolltouch = function(options){
		var defaults = {
			/**  
			* @name scrolltouch#scrolltouch_x  
			* @param {Boolean}  布尔类型
			* @description 是否可在x轴方向滚动
			* @default {Boolean} false
			* @example
			* $('.contMsg').scrolltouch({
			*		scrolltouch_x : false
			*  });
			*/
			scrolltouch_x : false,
			/**  
			* @name scrolltouch#scrolltouch_y  
			* @param {Boolean}  布尔类型
			* @description 是否可在y轴方向滚动
			* @default {Boolean} true
			* @example
			* $('.contMsg').scrolltouch({
			*		scrolltouch_y : true
			*  });
			*/
			scrolltouch_y : true,
			/**  
			* @name scrolltouch#scrolltouch_delay  
			* @param {Num}  数字类型
			* @description 持续摁住不动的时间
			* @default {Num} 0
			* @example
			* $('.contMsg').scrolltouch({
			*		scrolltouch_delay : 300
			*  });
			*/
			scrolltouch_delay : 300,
			/**  
			* @name scrolltouch#scrolltouch_way  
			* @param {Num}  数字类型
			* @description 滚动的方式,可选值为0,1,2
			* @default {Num} 0
			* @example
			* $('.contMsg').scrolltouch({
			*		scrolltouch_way : 0
			*  });
			*/
			scrolltouch_way : 0,
			/**  
			* @name scrolltouch#scrTouchX  
			* @param {Fn} 函数 
			* @description x轴方向上拖拽操作
			* @default {Fn} function(){}
			* @example
			* $('.contMsg').scrolltouch({
			*		scrTouchX: function(){alert("scrTouchX")}
			*    });
			*/
 			scrTouchX : function(){},
			/**  
			* @name scrolltouch#scrTouchY 
			* @param {Fn} 函数 
			* @description y轴方向上拖拽操作
			* @default {Fn} function(){}
			* @example
			* $('.contMsg').scrolltouch({
			*		scrTouchY: function(){alert("scrTouchY")}
			*    });
			*/
 			scrTouchY : function(){},
			/**  
			* @name scrolltouch#scrTouchstart 
			* @param {Fn} 函数 
			* @description touchstart操作
			* @default {Fn} function(){}
			* @example
			* $('.contMsg').scrolltouch({
			*		scrTouchstart: function(){alert("scrTouchstart")}
			*    });
			*/
 			scrTouchstart : function(){},
			/**  
			* @name scrolltouch#scrTouchmove 
			* @param {Fn} 函数 
			* @description touchmove操作
			* @default {Fn} function(){}
			* @example
			* $('.contMsg').scrolltouch({
			*		scrTouchmove: function(){alert("scrTouchmove")}
			*    });
			*/
 			scrTouchmove : function(){},
			/**  
			* @name scrolltouch#scrTouchend 
			* @param {Fn} 函数 
			* @description touchend操作
			* @default {Fn} function(){}
			* @example
			* $('.contMsg').scrolltouch({
			*		scrTouchend: function(){alert("scrTouchend")}
			*    });
			*/
 			scrTouchend : function(){}
		} ;
		var opts = $.extend(defaults,options) ;
		this.each(function(){
			var $this = $(this) ;
			var scale = 0.2 ;
			var delay = 'false' ;
			var setInt ;
			var offsetYInit = $(this).offset().top ;
			var offsetXInit = $(this).offset().left ;
			if ('ontouchstart' in document.documentElement) {
				 this.addEventListener('touchstart', touchstartScroll, false);
			}
						
			function onTouchHoldScroll(){
				 delay = 'true';
			}
			
			function touchstartScroll(e){
				//滚动方法一，纵向滚动参数设置,改变margin-top
				ulMarTop = parseInt($this.css('margin-top')) ;
				divHei = parseInt($(this).height());
				divParHei = parseInt($this.parent().height()) ;
				ulHei = divHei - divParHei ;
				//滚动方法一，横向滚动参数设置,改变margin-left
				ulMarLeft = parseInt($this.css('margin-left')) ;
				divWid = parseInt($(this).width()) ;
				divParWid = parseInt($this.parent().width()) ;
				ulWid = divWid - divParWid ;
				//滚动方法二，纵向滚动参数设置,改变top
				offsetY = $(this).offset().top ;
				//滚动方法二，横向滚动参数设置,改变left
				offsetX = $(this).offset().left ;
				translateX = $(this).offset().left ;
				beginX = e.targetTouches[0].pageX ;
				beginY = e.targetTouches[0].pageY ;
				setInt = setTimeout(onTouchHoldScroll,opts.scrolltouch_delay) ;
				this.addEventListener('touchmove', touchmoveScroll, false);
				this.addEventListener('touchend', touchendScroll, false);
				opts.scrTouchstart() ;
			}
			function touchmoveScroll(e){
				tagX = e.targetTouches[0].pageX ;
				tagY = e.targetTouches[0].pageY ;
				e.preventDefault() ;
				if(delay){
					switch(opts.scrolltouch_way){
						case 0 : $this.css('position','static'); touch0X() ; touch0Y() ;break ;
						case 1 : $this.css('position','relative'); touch1X() ; touch1Y() ;break ;
						case 2 : touch2X() ; touch2Y() ;break ;
					}
				}
				opts.scrTouchmove() ;
			}
			
			function touchendScroll(){
				clearTimeout(setInt) ;
				delay = 'false' ;
				opts.scrTouchend() ;
			}
			
			function touch0X(){
				if(opts.scrolltouch_x){
					avaiWid = Math.abs(ulMarLeft) ;
					if((ulMarLeft <= 0)&&(avaiWid <= ulWid)){
						ulMarLeft += (tagX - beginX)*scale ;
						$this.css('marginLeft',ulMarLeft) ;	
					}else if(ulMarLeft > 0){
						ulMarLeft = 0 ;
					}else if(avaiWid > ulWid){
						ulMarLeft = 0 - ulWid ;
					}
				}
				opts.scrTouchX() ;
			}
			
			function touch0Y(){
				if(opts.scrolltouch_y){
					avaiHei = Math.abs(ulMarTop) ;
					if((ulMarTop <= 0)&&(avaiHei <= ulHei)){
						ulMarTop += (tagY - beginY)*scale ;
						$this.css('marginTop',ulMarTop) ;	
					}else if(ulMarTop > 0){
						ulMarTop = 0 ;
					}else if(avaiHei > ulHei){
						ulMarTop = 0 - ulHei ;
					}
				}
				opts.scrTouchY() ;
			}
			
			function touch1X(){
				if(opts.scrolltouch_x){
					$this.css('top',(offsetYInit-2*$this.height())) ;	
					avaiWid = Math.abs(offsetX) ;
					if((offsetX <= offsetXInit)&&(avaiWid <= ulWid)){
						offsetX += (tagX - beginX)*scale ;
						$this.css('left',offsetX) ;	
					}else if(offsetX > offsetXInit){
						offsetX = offsetXInit ;
					}else if(avaiWid > ulWid){
						offsetX = offsetXInit - ulWid ;
					}
				}
				opts.scrTouchX() ;
			}
			
			function touch1Y(){
				if(opts.scrolltouch_y){
					avaiHei = Math.abs(offsetY) ;
					if((offsetY <= offsetYInit)&&(avaiHei <= ulHei)){
						offsetY += (tagY - beginY)*scale ;
						$this.css('top',offsetY) ;	
					}else if(offsetY > offsetYInit){
						offsetY = offsetYInit - 50 ;
					}else if(avaiHei > ulHei){
						offsetY = offsetYInit - ulHei ;
					}
				}
				opts.scrTouchY() ;
			}
			
			function touch2X(){
				if(opts.scrolltouch_x){
				}
				opts.scrTouchX() ;
			}
			
			function touch2Y(){
				if(opts.scrolltouch_y){
				}
				opts.scrTouchY() ;
			}
		}) ;
		return this ;
		
	}
	$.extend($.fn.scrolltouch,{
		version: '1.0',
		author:'高娜'
	});
})(jQuery) ;