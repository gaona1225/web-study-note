$(function(){
	/*metro运用-自动滑动开始*/
	var autoLen = $('div.sidebar-div').children('div.sidebar-elem').length ;
	var autoElemWid = $('div.sidebar-div').children('div.sidebar-elem').width() ;
	var autoParWid = autoElemWid * autoLen ;
	var direcRig = true ;
	var count = 0 ;
	$('div.sidebar-div').width(autoParWid) ;
	setInterval(autoSlide,4000) ;
	function autoSlide(){
		var autoParLeft = parseInt($('div.sidebar-div').css('margin-left')) ;
		if(direcRig){
			if(count < autoLen-1){
				$('div.sidebar-div').stop().animate({
					'margin-left' : autoParLeft - autoElemWid
				},300) ;
				count ++ ;
			}
		}else{
			if(count>0){
				$('div.sidebar-div').stop().animate({
					'margin-left' : autoParLeft + autoElemWid
				},300) ;
				count -- ;
			}
		}
		if(count == 0){
			direcRig = true ;
		}else if(count == autoLen-1){
			direcRig = false ;
		}
	}	
	/*metro运用-自动滑动结束*/
	
	/*metro运用-翻转开始*/
	$.support.css3d = supportsCSS3D();	
	if($.support.css3d){
		$('.flip-elem').click(function(e){
			$(this).parents('div.flip-wrap').toggleClass('flipped')
		}) ;
	}else{
		//非3d-x方向翻转
		$('.flip-wrap .flip-left-black').css('opacity','1');
		$('.flip-wrap').quickFlip();
		var classAry = [] ;
		for ( var i = 0; i < $.quickFlip.wrappers.length; i++ ) {
			var thisOne = $.quickFlip.wrappers[i];		
			$( thisOne.wrapper ).click(function(ev) {
				var $target = $(ev.target);
				if($target.parents('div.flip-wrap').length>0){
					$target = $target.parents('div.flip-wrap');
				}
				$target.quickFlipper();					
			});
		}
	}
	
	function supportsCSS3D() {
		var props = ['perspectiveProperty', 'WebkitPerspective', 'MozPerspective'] ;
		var testDom = document.createElement('a');
		  
		for(var i=0; i<props.length; i++){
			if(props[i] in testDom.style){
				return true;
			}
		}
		
		return false;
	}
	/*metro运用-翻转结束*/
	
	/*metro运用-滑动开始*/
	var len = $('.slide-x-wrap').children('div.slide-elem').length ;
	/*x方向*/
	var elemWid = $('.slide-x-wrap').children('div.slide-elem').width() + 15 ;
	var parWid = elemWid * len;
	$('.slide-x-wrap').width(parWid) ;
	var parLeft = parseInt($('.slide-x-wrap').css('margin-left')) ;
	$('.slide-x-wrap a.desktop-main-title').click(function(){
		var gotoTar = parseInt($(this).attr('data-goto')) ;
		if(gotoTar !=0){
			$(this).parents('div.slide-x-wrap').stop().animate({
				'margin-left' : parLeft - elemWid *(gotoTar - 1)
			},300) ;
		}
	}) ;
	/*metro运用-滑动结束*/
	
	
}) ;