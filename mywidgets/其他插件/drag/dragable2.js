/*
 *作    者: 高娜 
 *版    本: 1.0 
 *完成时间: 2011-12-19 
 *描    述: dragable
 *关联文件: jQuery.js  
 */
 
 /*
 *	#example:
 *	$('.dragableDiv').dragable({
 *		div_dragable_y:'false' ,
		div_background:'red'
 *	});
 *
 */
(function($){
	/** 
	* @class dragable监听器
    * @name dragable
    * @description 拖放
	* @version 1.0 
	* @author 高娜 
	* @requires jQuery-1.5.2+
    */
	$.fn.dragable = function(options){
		var defaults = {
			/**  
			* @name dragable#div_dragable_x  
			* @param {Boolean}  布尔类型
			* @description 是否可在x轴方向上拖拽
			* @default {Boolean} true
			* @example
			* $('.dragableDiv').dragable({
			*		div_dragable_x : true
			*  });
			*/
			div_dragable_x : true,
			/**  
			* @name dragable#div_dragable_y  
			* @param {Boolean}  布尔类型
			* @description 是否可在y轴方向上拖拽
			* @default {Boolean} true
			* @example
			* $('.dragableDiv').dragable({
			*		div_dragable_y : true
			*  });
			*/
			div_dragable_y : true,
			/**  
			* @name dragable#div_width  
			* @param {Num}  数字类型
			* @description 块元素的宽
			* @default {Num} 100
			* @example
			* $('.dragableDiv').dragable({
			*		div_width : 100
			*  });
			*/
			div_width : 100,
			/**  
			* @name dragable#div_height  
			* @param {Num}  数字类型
			* @description 块元素的高
			* @default {Num} 100
			* @example
			* $('.dragableDiv').dragable({
			*		div_height : 100
			*  });
			*/
			div_height : 100,
			/**  
			* @name dragable#div_background  
			* @param {String}  字符串类型
			* @description 块元素的背景色
			* @default {String} #DBDBDB
			* @example
			* $('.dragableDiv').dragable({
			*		div_background : '#DBDBDB'
			*  });
			*/
			div_background : '#DBDBDB',
			/**  
			* @name dragable#div_cursor  
			* @param {String}  字符串类型
			* @description 鼠标拖拽块元素鼠标形式
			* @default {String} move
			* @example
			* $('.dragableDiv').dragable({
			*		div_cursor : 'move'
			*  });
			*/
			div_cursor : 'move',
			/**  
			* @name dragable#div_delay  
			* @param {Num}  数字类型
			* @description 拖拽延时
			* @default {Num} 0
			* @example
			* $('.dragableDiv').dragable({
			*		div_delay : 0
			*  });
			*/
			div_delay : 0,
			/**  
			* @name dragable#dragableDown  
			* @param {Fn} 函数 
			* @description 鼠标摁下时触发
			* @default {Fn} function(){}
			* @example
			* $('.dragableDiv').dragable({
			*		dragableDown: function(){alert("摁下鼠标")}
			*    });
			*/
 			dragableDown : function(){},
			/**  
			* @name dragable#dragableMove  
			* @param {Fn} 函数 
			* @description 鼠标移动时触发
			* @default {Fn} function(){}
			* @example
			* $('.dragableDiv').dragable({
			*		dragableMove: function(){alert("移动鼠标")}
			*    });
			*/
 			dragableMove : function(){},
			/**  
			* @name dragable#dragableUp  
			* @param {Fn} 函数 
			* @description 鼠标移动时触发
			* @default {Fn} function(){}
			* @example
			* $('.dragableDiv').dragable({
			*		dragableUp: function(){alert("鼠标up")}
			*    });
			*/
 			dragableUp : function(){},
			/**  
			* @name dragable#dragableOut  
			* @param {Fn} 函数 
			* @description 鼠标移动时触发
			* @default {Fn} function(){}
			* @example
			* $('.dragableDiv').dragable({
			*		dragableOut: function(){alert("鼠标out")}
			*    });
			*/
 			dragableOut : function(){},
			/**  
			* @name dragable#div_rangle_height  
			* @param {Num}  数字类型
			* @description 碰撞区域块元素的高
			* @default {Num} 300
			* @example
			* $('.dragableDiv').dragable({
			*		div_rangle_height : 300
			*  });
			*/
			div_rangle_height : 300,
			/**  
			* @name dragable#div_rangle_width  
			* @param {Num}  数字类型
			* @description 碰撞区域块元素的宽
			* @default {Num} 300
			* @example
			* $('.dragableDiv').dragable({
			*		div_rangle_width : 300
			*  });
			*/
			div_rangle_width : 300,
			/**  
			* @name dragable#div_rangle_top  
			* @param {Num}  数字类型
			* @description 碰撞区域块元素的top坐标
			* @default {Num} 200
			* @example
			* $('.dragableDiv').dragable({
			*		div_rangle_top : 200
			*  });
			*/
			div_rangle_top : 200,
			/**  
			* @name dragable#div_rangle_left  
			* @param {Num}  数字类型
			* @description 碰撞区域块元素的left坐标
			* @default {Num} 200
			* @example
			* $('.dragableDiv').dragable({
			*		div_rangle_left : 200
			*  });
			*/
			div_rangle_left : 200,
			/**  
			* @name dragable#div_rangle_show  
			* @param {String}  字符串类型
			* @description 碰撞区域块元素显示隐藏
			* @default {String} block,可选block/none
			* @example
			* $('.dragableDiv').dragable({
			*		div_rangle_show:'none'
			*  });
			*/
			div_rangle_show : 'block',
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
			var $this = $(this) ;
			var moving = 'false' ;
			$(document).bind("selectstart",function(){return false;}); 
			$this.css({
				background:opts.div_background,
				cursor:opts.div_cursor,
				height:opts.div_height,
				width:opts.div_width
			}) ;
			$('.dragableRangle').css('line-height',opts.div_rangle_height+'px') ;
			$('.dragableRangle').css({
				display:opts.div_rangle_show,
				height:opts.div_rangle_height ,
				left:opts.div_rangle_left,
				top:opts.div_rangle_top,
				width:opts.div_rangle_width
			}) ;
			
			function onmousedown(e){
				moving = 'true' ;
				//addFun() ;
				setInt = setTimeout(addFun,opts.div_delay) ;
				opts.dragableDown() ;
			}
			
			function addFun(){
				this.addEventListener('mousemove', onmousemove, false);
				this.addEventListener('mouseup', onmouseup, false);
				this.addEventListener('mouseout', onmouseout, false);
			}
			
			function onmousemove(e){
				if(moving){
					tagX = e.clientX - opts.div_width/2 ;
					tagY = e.clientY - opts.div_height/2 ;
					
					tag_min_x = parseInt(e.clientX) - parseInt(opts.div_width/2) ;
					tag_max_x = parseInt(e.clientX) + parseInt(opts.div_width/2) ;
					tag_min_y = parseInt(e.clientY) - parseInt(opts.div_height/2) ;
					tag_max_y = parseInt(e.clientY) + parseInt(opts.div_height/2) ;
					
					if((opts.div_dragable_x == true)&&(opts.div_dragable_y == true)){
						$this.css({
							position:'absolute',
							left:tagX,
							top:tagY
						}) ;
					}else if((opts.div_dragable_x == true)&&(opts.div_dragable_y == false)){
						$this.css({
							position:'absolute',
							left:tagX
						}) ;
					}else if((opts.div_dragable_x == false)&&(opts.div_dragable_y == true)){
						$this.css({
							position:'absolute',
							top:tagY
						}) ;
					}else{
						return false ;
					}
					touchTest() ;
				}
				opts.dragableMove() ;
			}
			
			function onmouseup(){
				moving = 'false' ;
				this.removeEventListener('mousemove', onmousemove, false);
				clearTimeout(setInt) ;
				opts.dragableUp() ;
			}
			
			function onmouseout(){
				moving = 'false' ;
				this.removeEventListener('mousemove', onmousemove, false);
				clearTimeout(setInt) ;
				opts.dragableOut() ;
			}
			
			function touchTest(){
				//测试区域坐标
				minX = parseInt($('.dragableRangle').css('left')) ;
				maxX = parseInt($('.dragableRangle').css('left')) + parseInt($('.dragableRangle').width()) ;
				minY = parseInt($('.dragableRangle').css('top')) ;
				maxY = parseInt($('.dragableRangle').css('top')) + parseInt($('.dragableRangle').height()) ;
				diffx = 10 ; //x轴方向上偏差数
				diffy = 10 ; //y轴方向上偏差数
								
				touchX = ((tag_min_x>=minX)&&(tag_min_x + diffx<=maxX))||
						 ((tag_max_x + diffx>=minX)&&(tag_max_x<=maxX))||
						 ((tag_min_x<minX)&&(tag_max_x>maxX)) ; //碰触到x轴方向
						 
				touchY = ((tag_min_y>=minY)&&(tag_min_y<=maxY))||
						 ((tag_max_y>=minY)&&(tag_max_y<=maxY))||
						 ((tag_min_y<minY)&&(tag_max_y>maxY)) ; //碰触到y轴方向
				
				$('.test').text('tag_min_x:'+tag_min_x+' tag_max_x:'+tag_max_x+' minX:'+minX+' maxX:'+maxX) ;
				$('.testTop').text('tag_min_y:'+tag_min_y+' tag_max_y:'+tag_max_y+' minY:'+minY+' maxY:'+maxY) ;
				if((touchX && touchY) == true){
					$('.dragableRangle').css('background','#98C999') ;
					$('.dragableRangle').text('进入碰撞区域') ;
					opts.dragableTouch() ;
				}else{
					$('.dragableRangle').css('background','#C4FBF8') ;
					$('.dragableRangle').text('未进入碰撞区域') ;
				}
			}
			
			this.addEventListener('mousedown', onmousedown, false);
		}) ;
		return this;
	} ;
	 $.extend($.fn.dragable,{
		version: '1.0',
		author:'高娜'
	});
})(jQuery);