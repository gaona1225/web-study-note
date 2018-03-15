/*
 metro
*/
$(function(){
	/*metro运用-翻转开始*/
	$.support.css3d = supportsCSS3D();	
	if($.support.css3d){
		$('.flip-elem').click(function(e){
			var direc = ($(this).parents('div.flip-left-wrap').length > 0) ? 1 : direc ; //3d-向左翻转
			var direc = ($(this).parents('div.flip-right-wrap').length > 0) ? 2 : direc ; //3d-向右翻转
			var direc = ($(this).parents('div.flip-top-wrap').length > 0) ? 3 : direc ; //3d-向上翻转
			var direc = ($(this).parents('div.flip-bottom-wrap').length > 0) ? 4 : direc ; //3d-向下翻转
			switch(direc){
				case 1 : $(this).parents('div.flip-left-wrap').toggleClass('flipped') ; break ;
				case 2 : $(this).parents('div.flip-right-wrap').toggleClass('flipped') ; break ;
				case 3 : $(this).parents('div.flip-top-wrap').toggleClass('flipped') ; break ;
				case 4 : $(this).parents('div.flip-bottom-wrap').toggleClass('flipped') ; break ;
			}
		}) ;
	}else{
		//非3d-x方向翻转
		$('.flip-left-wrap .flip-left-black').css('opacity','1');
		$('.flip-left-wrap').quickFlip();
		$('.flip-right-wrap .flip-right-black').css('opacity','1');
		$('.flip-right-wrap').quickFlip();
		//非3d-y方向翻转
		$('.flip-top-wrap .flip-top-black').css('opacity','1');
		$('.flip-top-wrap div a').css({
			'margin-top' : ($('.flip-top-wrap').height() - $('.flip-top-wrap div a').height() + 20) /2
		}) ;
		$('.flip-top-wrap').quickFlip({
			vertical : true
		});
		$('.flip-bottom-wrap .flip-bottom-black').css('opacity','1');
		$('.flip-bottom-wrap div a').css({
			'margin-top' : ($('.flip-top-wrap').height() - $('.flip-top-wrap div a').height() + 20) /2
		}) ;
		$('.flip-bottom-wrap').quickFlip({
			vertical : true
		});
		for ( var i = 0; i < $.quickFlip.wrappers.length; i++ ) {
			var thisOne = $.quickFlip.wrappers[i];		
			$( thisOne.wrapper ).click(function(ev) {
				var $target = $(ev.target);
				if($target.hasClass('flip-a')){
					 $target = $target.parents('div.flip-wrap');		
				}else if(!$target.hasClass('quickFlip')){
					 $target = $target.parent('div');		
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
	var elemWid = $('.slide-x-wrap').children('div.slide-elem').width() ;
	var parWid = elemWid * len;
	$('.slide-x-wrap').width(parWid) ;
	var parLeft = parseInt($('.slide-x-wrap').css('margin-left')) ;
	$('.slide-x-wrap a.goto-a').click(function(){
		var gotoTar = parseInt($(this).attr('data-goto')) ;
		if(gotoTar !=0){
			$(this).parents('div.slide-x-wrap').stop().animate({
				'margin-left' : parLeft - elemWid *(gotoTar - 1)
			},300) ;
		}
	}) ;
	/*y方向*/
	var elemHei = $('.slide-y-wrap').children('div.slide-elem').height() ;
	var parHei = elemHei * len ;
	$('.slide-y-wrap').height(elemHei) ;
	var parTop = parseInt($('.slide-y-wrap').css('margin-top')) ;
	$('.slide-y-wrap a.goto-a').click(function(){
		var gotoTar = parseInt($(this).attr('data-goto')) ;
		if(gotoTar !=0){
			$(this).parents('div.slide-y-wrap').stop().animate({
				'margin-top' : parTop - elemHei *(gotoTar - 1)
			},300) ;
		}
	}) ;
	/*metro运用-滑动结束*/
	
	/*metro运用-自动滑动开始*/
	//x方向
	var autoXLen = $('div.slideAuto-x-wrap').children('div.slideAuto-elem').length ;
	var autoXElemWid = $('div.slideAuto-x-wrap').children('div.slideAuto-elem').width() ;
	var autoXParWid = autoXElemWid * autoXLen ;
	var direcLeft = true ;
	var countX = 0 ;
	$('div.slideAuto-x-wrap').width(autoXParWid) ;
	setInterval(autoXSlide,3000) ;
	function autoXSlide(){
		var autoXParLeft = parseInt($('div.slideAuto-x-wrap').css('margin-left')) ;
		if(direcLeft){
			if(countX < autoXLen-1){
				$('div.slideAuto-x-wrap').stop().animate({
					'margin-left' : autoXParLeft - autoXElemWid
				},300) ;
				countX ++ ;
			}
		}else{
			if(countX>0){
				$('div.slideAuto-x-wrap').stop().animate({
					'margin-left' : autoXParLeft + autoXElemWid
				},300) ;
				countX -- ;
			}
		}
		if(countX == 0){
			direcLeft = true ;
		}else if(countX == autoXLen-1){
			direcLeft = false ;
		}
	}	
	//y方向
	var autoYLen = $('div.slideAuto-y-wrap').children('div.slideAuto-elem').length ;
	var autoYElemHei = $('div.slideAuto-y-wrap').children('div.slideAuto-elem').height() ;
	var autoYParHei = autoYElemHei * autoYLen ;
	var direcTop = true ;
	var countY = 0 ;
	$('div.slideAuto-y-wrap').height(autoYParHei) ;
	setInterval(autoYSlide,3000) ;
	function autoYSlide(){
		var autoYParTop = parseInt($('div.slideAuto-y-wrap').css('margin-top')) ;
		if(direcTop){
			if(countY < autoYLen-1){
				$('div.slideAuto-y-wrap').stop().animate({
					'margin-top' : autoYParTop - autoYElemHei
				},300) ;
				countY ++ ;
			}
		}else{
			if(countY>0){
				$('div.slideAuto-y-wrap').stop().animate({
					'margin-top' : autoYParTop + autoYElemHei
				},300) ;
				countY -- ;
			}
		}
		if(countY == 0){
			direcTop = true ;
		}else if(countY == autoYLen-1){
			direcTop = false ;
		}
	}	
	/*metro运用-自动滑动结束*/
	setInterval(autoEffect,4000) ;
	function autoEffect(){
		var effectAry = $('.jquery-effect') ;
		var effectLen = effectAry.length ;
		var idAry = [] ;
		for(var i=0; i<effectLen; i++){
			idAry[i] = effectAry.eq(i).attr('id') ;
			runEffect(idAry[i]) ;
		}
	}
	/*jquery effect效果开始*/
	function runEffect(id){
		var selectedEffect = $('#'+id).children('h2').html() ;
		var options = {} ;
		if(selectedEffect === 'scale'){
			options = {percent : 0} ;
		}else if(selectedEffect === 'transfer'){
			options = {
				to : '#button' ,
				className : 'ui-effects-transfer'
			} ;
		}else if(selectedEffect === 'size'){
			options = {
				to : {width : 200 , height : 60}
			} ;
		}
		$('#'+id).effect(selectedEffect,options,500,callback(id)) ;
	};
	function callback(id){
		setTimeout(function(){
			$('#'+id).removeAttr('style').hide().fadeIn();
		},1000);
	};
	/*jquery effect效果结束*/			
}) ;