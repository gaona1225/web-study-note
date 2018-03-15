
/*
 *作    者: 张勇辉 
 *版    本: 2.0 
 *完成时间: 2011-11-30 
 *描    述: touchwipe 
 *关联文件: jQuery.js  
 */
 	
/*
 *	#example:
 *	$("#test").touchwipe({
 *			min_move_x: 40, //横向灵敏度
 *			min_move_y: 40, //纵向灵敏度
 *			wipeLeft: function() {$("#val").append("左，");}, //左侧滑动事件
 *			wipeRight: function() { $("#val").append("右，");}, //右侧滑动事件
 *			wipeUp: function() { $("#val").append("上，");}, //向上滑动事件
 *			wipeDown: function() { $("#val").append("下，");}, //向下滑动事件
 *			wipe:function(){$("#val").append("点击，");}, //触摸事件
 *			wipehold:function(){$("#val").append("保持，");}, //触摸保持事件
 *			preventDefaultEvents: true //阻止默认事件
 *		});
 *
 */
 
(function($) { 
    /** 
	* @class touchWipe监听器
    * @name touchwipe
    * @description 监听touchmove的方向
	* @version 2.0 
	* @author 张勇辉 
	* @requires jQuery-1.5.2+
    */

   $.fn.touchwipe = function(settings) {
	   /** @lends touchwipe.prototype */	
     var config = {
			/**  
			* @name touchwipe#min_move_x  
			* @param {Num}  数字类型
			* @description 横向响应精度
			* @default {Num} 20
			* @example
			* $("#handle").touchwipe({
			*		min_move_x: 50
			*    });
			*/
    		min_move_x: 20,
			/**  
			* @name touchwipe#min_move_y  
			* @param {Num} 数字类型 
			* @description 纵向响应精度
			* @default {Num} 20
			* @example
			* $("#handle").touchwipe({
			*		min_move_y: 50
			*    });
			*/
    		min_move_y: 20,
			/**  
			* @name touchwipe#wipeLeft  
			* @param {Fn} 函数 
			* @description 向左滑动触发的动作 
			* @default {Fn} function(){}
			* @example
			* $("#handle").touchwipe({
			*		wipeLeft: function() {alert("向左滑动")}
			*    });
			*/
 			wipeLeft: function() { },
			/**  
			* @name touchwipe#wipeRight  
			* @param {Fn} 函数 
			* @description 向右滑动触发的动作 
			* @default {Fn} function(){}
			* @example
			* $("#handle").touchwipe({
			*		wipeRight: function() {alert("向右滑动")}
			*    });
			*/
 			wipeRight: function() { },
			/**  
			* @name touchwipe#wipeUp  
			* @param {Fn} 函数 
			* @description 向上滑动触发的动作 
			* @default {Fn} function(){}
			* @example
			* $("#handle").touchwipe({
			*		wipeUp: function() {alert("向上滑动")}
			*    });
			*/
 			wipeUp: function() { },
			/**  
			* @name touchwipe#wipeDown  
			* @param {Fn} 函数 
			* @description 向下滑动触发的动作 
			* @default {Fn} function(){}
			* @example
			* $("#handle").touchwipe({
			*		wipeDown: function() {alert("向下滑动")}
			*    });
			*/
 			wipeDown: function() { },
			/**  
			* @name touchwipe#wipe  
			* @param {Fn} 函数 
			* @description 点击事件（一次完整的点击操作） 
			* @default {Fn} function(){}
			* @example
			* $("#handle").touchwipe({
			*		wipe: function() {alert("点击")}
			*    });
			*/
			wipe:function(){},
			/**  
			* @name touchwipe#wipehold  
			* @param {Fn} 函数 
			* @description 按下并且保持将近一秒的时间触发(750毫秒) 
			* @default {Fn} function(){}
			* @example
			* $("#handle").touchwipe({
			*		wipehold: function() {alert("保持")}
			*    });
			*/
			wipehold:function(){},
			/**  
			* @name touchwipe#preventDefaultEvents  
			* @param {Boolean } 布尔 
			* @description 是否阻止当前元素的默认事件 
			* @default {Boolean} true
			* @example
			* $("#handle").touchwipe({
			*		preventDefaultEvents: true
			*    });
			*/
			preventDefaultEvents: true
	 };
     
     if (settings) $.extend(config, settings);
 
     this.each(function() {
    	 var startX;
    	 var startY;
		 var isMoving = false;
		 var isHold = false;
		 var timer;

    	 function cancelTouch() {
    		 this.removeEventListener('touchmove', onTouchMove);
    		 startX = null;
    		 isMoving = false;
			 clearTimeout(timer);
    	 }	
    	 
    	 function onTouchMove(e) {
    		 if(config.preventDefaultEvents) {
    			 e.preventDefault();
    		 }
    		 if(isMoving) {
	    		 var x = e.touches[0].pageX;
	    		 var y = e.touches[0].pageY;
	    		 var dx = startX - x;
	    		 var dy = startY - y;
	    		 if(Math.abs(dx) >= config.min_move_x) {
	    			cancelTouch();
	    			if(dx > 0) {
	    				config.wipeLeft();
	    			}
	    			else {
	    				config.wipeRight();
	    			}
	    		 }
	    		 else if(Math.abs(dy) >= config.min_move_y) {
		    			cancelTouch();
		    			if(dy > 0) {
		    				config.wipeUp();
		    			}
		    			else {
		    				config.wipeDown();
		    			}
		    		 }
    		 }
    	 }
		 		 
		 function onTouchEnd(){
			clearTimeout(timer);
			 if(!isHold && isMoving){
				 config.wipe();
			 }
			isHold = false;  
		  }
		 
		 function onTouchHold(){
			 isHold = true;
			 config.wipehold();
		 }
		 
    	 function onTouchStart(e)
    	 {
    		 if (e.touches.length == 1) {
    			 startX = e.touches[0].pageX;
    			 startY = e.touches[0].pageY;
    			 isMoving = true;
    			 this.addEventListener('touchmove', onTouchMove, false);
				 timer = setTimeout(onTouchHold,750);
    		 }
    	 }    	 
    	 if ('ontouchstart' in document.documentElement) {
    		 this.addEventListener('touchstart', onTouchStart, false);
			 this.addEventListener('touchend', onTouchEnd, false);
    	 }
     });
 
     return this;
   };
   $.extend($.fn.touchwipe, {
			version: "2.0",
			author:"张勇辉"
			});
 
 })(jQuery);
