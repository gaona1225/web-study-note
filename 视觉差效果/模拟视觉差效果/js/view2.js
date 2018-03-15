//滚轮交互
$(function(){
	/*$('body').niceScroll({
		touchbehavior:false,
		cursorcolor:"#0000FF",
		cursoropacitymax:0.6,
		cursorwidth:8
	});*/
	
	var $contentElem = $('.content-bg') ;
	var len = $contentElem.length ;
	var dev ;
	var wheelBea ; //设置无论滚动幅度大小只相当于滚动一次	
	
	var $browerFirefox = navigator.userAgent.indexOf('Firefox') ; //火狐触发滚轮效果需要添加DOMMouseScroll事件
	if($browerFirefox < 0){
		$(window)[0].onmousewheel = function(e){
			if($.browser.msie&&$.browser.version<=8){
			}else{
				e.preventDefault();
			}
			scrollBarWheel(e) ;
	   }
	}else{
		$(window)[0].addEventListener('DOMMouseScroll',function(e){
			e.preventDefault();
			scrollBarWheel(e) ;
		},false) ;
	}
	
	function scrollBarWheel(e){
		var dir ;
		//判断滚轮的方向
		if($browerFirefox < 0){
		  dir = (event.wheelDelta/120) ;
		}else{
		  //火狐不支持wheelDelta
		  dir = (e.detail/3) ;
		}
		$contentElem.each(function(i){
			var _top = parseInt($contentElem.eq(i).css('top')) ;
			if(i<2){
				dev = 18 ;
			}else{
				dev = 20 ;
			}
			$contentElem.eq(i).stop().animate({
				'top':(_top + dir*dev + 'px')
			},200) ;
		}) ;
	}
}) ;