/*
 *作    者: 高娜 
 *版    本: 1.0 
 *完成时间: 2011-12-16 
 *描    述: drag 
 *关联文件: jQuery.js  
 */
 
 /*
 *	#example:
 *	$('.dragDiv').drag({
 *		div_drag_y:'false' ,
		div_background:'red'
 *	});
 *
 */
(function($){
	/** 
	* @class drag监听器
    * @name drag
    * @description 拖拽
	* @version 1.0 
	* @author 高娜 
	* @requires jQuery-1.5.2+
    */
	$.fn.drag = function(options){
		var defaults = {
			/**  
			* @name drag#div_drag_x  
			* @param {Boolean}  布尔类型
			* @description 是否可在x轴方向上拖拽
			* @default {Boolean} true
			* @example
			* $('.dragDiv').drag({
			*		div_drag_x : true
			*  });
			*/
			div_drag_x : true,
			/**  
			* @name drag#div_drag_y  
			* @param {Boolean}  布尔类型
			* @description 是否可在y轴方向上拖拽
			* @default {Boolean} true
			* @example
			* $('.dragDiv').drag({
			*		div_drag_y : true
			*  });
			*/
			div_drag_y : true,
			/**  
			* @name drag#div_width  
			* @param {Num}  数字类型
			* @description 块元素的宽
			* @default {Num} 100
			* @example
			* $('.dragDiv').drag({
			*		div_width : 100
			*  });
			*/
			div_width : 100,
			/**  
			* @name drag#div_height  
			* @param {Num}  数字类型
			* @description 块元素的高
			* @default {Num} 100
			* @example
			* $('.dragDiv').drag({
			*		div_height : 100
			*  });
			*/
			div_height : 100,
			/**  
			* @name drag#div_background  
			* @param {String}  字符串类型
			* @description 块元素的背景色
			* @default {String} #DBDBDB
			* @example
			* $('.dragDiv').drag({
			*		div_background : '#DBDBDB'
			*  });
			*/
			div_background : '#DBDBDB',
			/**  
			* @name drag#div_cursor  
			* @param {String}  字符串类型
			* @description 鼠标拖拽块元素鼠标形式
			* @default {String} move
			* @example
			* $('.dragDiv').drag({
			*		div_cursor : 'move'
			*  });
			*/
			div_cursor : 'move',
			/**  
			* @name drag#div_delay  
			* @param {Num}  数字类型
			* @description 拖拽延时
			* @default {Num} 0
			* @example
			* $('.dragDiv').drag({
			*		div_delay : 0
			*  });
			*/
			div_delay : 0,
			/**  
			* @name drag#dragDown  
			* @param {Fn} 函数 
			* @description 鼠标摁下时触发
			* @default {Fn} function(){}
			* @example
			* $('.dragDiv').drag({
			*		dragDown: function(){alert("摁下鼠标")}
			*    });
			*/
 			dragDown : function(){},
			/**  
			* @name drag#dragMove  
			* @param {Fn} 函数 
			* @description 鼠标移动时触发
			* @default {Fn} function(){}
			* @example
			* $('.dragDiv').drag({
			*		dragMove: function(){alert("移动鼠标")}
			*    });
			*/
 			dragMove : function(){},
			/**  
			* @name drag#dragUp  
			* @param {Fn} 函数 
			* @description 鼠标移动时触发
			* @default {Fn} function(){}
			* @example
			* $('.dragDiv').drag({
			*		dragUp: function(){alert("鼠标up")}
			*    });
			*/
 			dragUp : function(){},
			/**  
			* @name drag#dragOut  
			* @param {Fn} 函数 
			* @description 鼠标移动时触发
			* @default {Fn} function(){}
			* @example
			* $('.dragDiv').drag({
			*		dragOut: function(){alert("鼠标out")}
			*    });
			*/
 			dragOut : function(){},
		} ;
		var opts = $.extend(defaults,options) ;
		this.each(function(){
			var $this = $(this) ;
			var beginX ;
			var beginY ;
			var moving = 'false' ;
			$(document).bind("selectstart",function(){return false;}); 
			$this.css({
				background:opts.div_background,
				cursor:opts.div_cursor,
				height:opts.div_height,
				width:opts.div_width
			}) ;
			
			function onmousedown(e){
				beginX = e.clientX ;
				beginY = e.clientY ;
				moving = 'true' ;
				setInt = setTimeout(addFun,opts.div_delay) ;
				opts.dragDown() ;
			}
			
			function addFun(){
				this.addEventListener('mousemove', onmousemove, false);
				this.addEventListener('mouseup', onmouseup, false);
				this.addEventListener('mouseout', onmouseout, false);
			}
			
			function onmousemove(e){
				if(moving){
					$this.css('position','absolute') ;
					var tagX = e.clientX - opts.div_width/2 ;
					$('.test').text(tagX) ;
					var tagY = e.clientY - opts.div_height/2 ;
					if((opts.div_drag_x == true)&&(opts.div_drag_y == true)){
						$this.css({
							position:'absolute',
							left:tagX,
							top:tagY
						}) ;
					}else if((opts.div_drag_x == true)&&(opts.div_drag_y == false)){
						$this.css({
							position:'absolute',
							left:tagX
						}) ;
					}else if((opts.div_drag_x == false)&&(opts.div_drag_y == true)){
						$this.css({
							position:'absolute',
							top:tagY
						}) ;
					}else{
						return false ;
					}
				}
				opts.dragMove() ;
			}
			
			function onmouseup(){
				moving = 'false' ;
				this.removeEventListener('mousemove', onmousemove, false);
				clearTimeout(setInt) ;
				opts.dragUp() ;
			}
			
			function onmouseout(){
				moving = 'false' ;
				this.removeEventListener('mousemove', onmousemove, false);
				clearTimeout(setInt) ;
				opts.dragOut() ;
			}
			this.addEventListener('mousedown', onmousedown, false);
		}) ;
		return this;
	} ;
	 $.extend($.fn.drag,{
		version: '1.0',
		author:'高娜'
	});
})(jQuery);