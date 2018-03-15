/*
 *作    者: 高娜 
 *版    本: 1.2 
 *完成时间: 2012-03-15 
 *描    述: scrollBar
 *关联文件: jQuery.js  
 */
 
/*
 *	#example:
 *	$('.ui-scrollBar').scrollBar({
	});	
 *
*/
(function($){
	/** 
	* @class scrollBar监听器
    * @name scrollBar
    * @description 仿移动设备滚动条
	* @version 1.2 
	* @author 高娜 
	* @requires jQuery-1.5.2+
    */
	$.fn.scrollBar = function(options){
		var defaults = {
			/**  
			* @name scrollBar#scroll_width
			* @param {Number}  数字类型
			* @description 滚动条宽度
			* @default {Number} 7
			* @example
			* $('.ui-scrollBar').scrollBar({
			*		scroll_width : 7
			*  });
			*/
			scroll_width : 7,
			/**  
			* @name scrollBar#scroll_speed
			* @param {Number}  数字类型
			* @description 滑块滑动的速度
			* @default {Number} 1000
			* @example
			* $('.ui-scrollBar').scrollBar({
			*		scroll_speed : 1000
			*  });
			*/
			scroll_speed : 400,
			/**  
			* @name scrollBar#scroll_times
			* @param {Number}  数字类型
			* @description 目标完成滚动的次数
			* @default {Number} 10
			* @example
			* $('.ui-scrollBar').scrollBar({
			*		scroll_times : 10
			*  });
			*/
			scroll_times : 5
		} ;
		if(options != 'destory'){
			$(document).bind("selectstart",function(){return false;}); //清除火狐以外浏览器选中文本效果 
			//实现滚动条插件
			var opts = $.extend(defaults,options) ;
			this.each(function(){
				var $this = $(this) ;
				var $availHei = window.screen.availHeight - 180 ;
				var $scrollDiv = $('<div class="ui-scrollBarDiv"></div>') ;
				var $scrollSlide = $('<div class="ui-scroll"><div class="ui-scrollSlide" id="aaa"></div></div>') ;
				if($this.attr('data-dom')!='true'){
					$this.wrap($scrollDiv).after($scrollSlide) ;
					$this.attr('data-dom',true) ;
				}else{
				}
				
				var $scrTop = 0 ; /*模拟滚动条的top值*/
				var $thisTop = 0 ;/*目标区域的top值*/
				var $thisPar = $this.parents('div') ; /*目标区域外层div*/
				var $thisElemHei = $this.height() ; /*目标区域高度*/
				$thisPar.height($availHei) ;
				var $browerFirefox = navigator.userAgent.indexOf('Firefox') ; //火狐触发滚轮效果需要添加DOMMouseScroll事件
				var $thisParHei = $thisPar.height() ;
				//滚动scroll_times次完成，需要每次滚动的高度
				var $scrollHei = Math.ceil(($thisElemHei - $thisParHei)/(opts.scroll_times+1)) ; 
				//模拟滚动条的高度
				var $scrollSliHei = Math.ceil($thisParHei/(1.2*(opts.scroll_times+1))) ;
				$('.ui-scrollBarDiv .ui-scroll .ui-scrollSlide').height($scrollSliHei) ;				
				$thisSlide = $thisPar.find('.ui-scrollSlide') ;		
				if($thisElemHei>$thisParHei){
					//滚轮方法调用
					if($browerFirefox < 0){
						$thisPar[0].onmousewheel = function(e){
							if($.browser.msie&&$.browser.version<=8){
							}else{
								e.preventDefault();
							}
							scrollBarWheel(e) ;
					   }
					}else{
						$thisPar[0].addEventListener('DOMMouseScroll',function(e){
							e.preventDefault();
							scrollBarWheel(e) ;
						},false) ;
					}
					
					//mouse事件触发调用
					$this.mousedown(function(e){
						e.preventDefault();
						scrollBarMouse(e) ;
					}) ;
					
					//touch事件触发调用 		
					if('ontouchstart' in document.documentElement){ //判断是否支持touchstart
						$this[0].addEventListener('touchstart',scrollBarTouch,false) ;
					}else{
					}
				}else{
					$thisSlide.css('display','none') ;
				}	
				
			    //滚轮触发滑动
				var wheelInt ;
				var wheelBea ; //设置无论滚动幅度大小只相当于滚动一次
				var availBot = $thisElemHei - $thisParHei ;
			    function scrollBarWheel(e){
					//临界值判断
					var marTop = parseInt($this.css('marginTop')) ;
					var botTop = (Math.abs(marTop) <= Math.abs(availBot)) ;	
					
					if((marTop<=0)&&botTop){		
						if(!wheelBea){
							//判断滚轮的方向
							if($browerFirefox < 0){
							  $scrTop -= $scrollSliHei*(event.wheelDelta/120) ;
							  $thisTop += $scrollHei*(event.wheelDelta/120) ;
							}else{
							  //火狐不支持wheelDelta
							  $scrTop += $scrollSliHei*(e.detail/3) ;
							  $thisTop -= $scrollHei*(e.detail/3) ;
							}	
							wheelBea = true;
							clearInterval(wheelInt);
							wheelInt = setTimeout(function () {
								wheelBea = false;
							},150);	
						}else{
						}	
					}else if(marTop>0){
						$scrTop = 0; //目标区域到达到上临界值。
						$thisTop = 0;
					}else if(!botTop){
						$scrTop = $thisParHei - 1.4*$scrollHei ;
						$thisTop = 0 - availBot ;
					}
				    $thisPar.find('.ui-scrollSlide').animate({
					  top:$scrTop
				    },opts.scroll_speed) ;
				    $this.animate({
					  marginTop:$thisTop
				    },opts.scroll_speed) ;
			    }
				
				//mouse方式触发滚动
				function scrollBarMouse(e){
					var sign = 1 ;
					var beginY = e.clientY ;
					//临界值判断
					var marTop = parseInt($this.css('marginTop')) ;
					var botTop = (Math.abs(marTop) <= Math.abs(availBot)) ;
					$this.mousemove(function(e){
						if(sign){
							var y =(e.clientY - beginY);
							var yabs = Math.abs(y) ;
							if((marTop<=0)&&botTop){		
								$scrTop -= $scrollSliHei*(y/yabs) ;
								$thisTop += $scrollHei*(y/yabs) ;
							}else if(marTop>0){
								$scrTop = 0; //目标区域到达到上临界值。
								$thisTop = 0;
							}else if(!botTop){
								$scrTop = $thisParHei - 1.4*$scrollHei ;
								$thisTop = 0 - availBot ;
							}
							sign = 0 ;
							
							$thisPar.find('.ui-scrollSlide').animate({
							  top:$scrTop
							},opts.scroll_speed) ;
							$this.animate({
							  marginTop:$thisTop
							},opts.scroll_speed) ;
						}
					}) ;
					$this.mouseup(function(e){
						sign = 0 ;
					}) ;
				}
				
				//touch方式触发滚动
				function scrollBarTouch(e){
					e.preventDefault();
					signTouch = 1 ;
					touchBeginY = parseInt(e.targetTouches[0].pageY) ;
					//临界值判断
					marTouchTop = parseInt($this.css('marginTop')) ;
					botTouchTop = (Math.abs(marTouchTop) <= Math.abs(availBot)) ;
					
					$this[0].addEventListener('touchmove',scrollBarTouchMove,false) ;
					$this[0].addEventListener('touchend',scrollBarTouchEnd,false) ;
				}
				
				function scrollBarTouchMove(e){
					if(signTouch){
						var touchNewY = e.targetTouches[0].pageY ;
						var y = touchNewY - touchBeginY ;
						var yabs = Math.abs(y) ;
						if((marTouchTop<=0)&&botTouchTop){		
							$scrTop -= $scrollSliHei*(y/yabs) ;
							$thisTop += $scrollHei*(y/yabs) ;
						}else if(marTouchTop>0){
							$scrTop = 0; //目标区域到达到上临界值。
							$thisTop = 0;
						}else if(!botTouchTop){
							$scrTop = $thisParHei - 1.4*$scrollHei ;
							$thisTop = 0 - availBot ;
						}
						signTouch = 0 ;
						$thisPar.find('.ui-scrollSlide').animate({
						  top:$scrTop
						},opts.scroll_speed) ;
						$this.animate({
						  marginTop:$thisTop
						},opts.scroll_speed) ;
					}
				}
				
				function scrollBarTouchEnd(e){
					signTouch = 0 ;
				}
			 	
				//改变窗口方法
				$(window).resize(function(){
					$this.scrollBar() ;
				});
			}) ;
			return this ;
		}else{
			//销毁滚动条插件 begin
			if($(this).attr('data-dom') == 'true'){
				$(this).parents('.ui-scrollBarDiv').find('.ui-scroll').remove() ;
				$(this).unwrap('.ui-scrollBarDiv') ;
				$(this).unbind('mousedown') ;
			}
			$(this).attr('data-dom','false') ;
			//销毁滚动条插件 end
		}
	} ;
	$.extend($.fn.scrollBar,{
		version: '1.2',
		author:'高娜'
	});
})(jQuery) ;