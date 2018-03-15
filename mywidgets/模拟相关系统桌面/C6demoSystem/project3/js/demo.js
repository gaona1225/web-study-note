$(function(){
	/*---手动切屏开始---*/
	var mainElem = $('.main .mainElem') ;
	var mainLen = mainElem.length ;
	$('.main .mainWrap').width(mainElem.width()*mainLen) ;
	var parLeft = parseInt($('.main .mainWrap').css('margin-left')) ;
	var scrIndex = 0 ;
	$('div.leftBtn a').click(function(){
		console.log(scrIndex) ;
		if(scrIndex>0){
			scrIndex -- ;
		}
		scrollScreen(scrIndex) ;
	}) ;
	$('div.rightBtn a').click(function(){
		if(scrIndex<mainLen-1){
			scrIndex ++ ;
		}
		scrollScreen(scrIndex) ;
	}) ;
	$('.buttomBtn li').click(function(){
		scrIndex = $(this).index() ;
		$(this).addClass('btnCurrent').siblings('li').removeClass('btnCurrent') ;
		scrollScreen(scrIndex) ;
	}) ;
	function scrollScreen(scrIndex){	
		$('.main .mainWrap').stop().animate({
			'margin-left' : parLeft - mainElem.width()*(scrIndex)
		},300) ;
		$('.buttomBtn li').eq(scrIndex).addClass('btnCurrent').siblings('li').removeClass('btnCurrent') ;
		if(scrIndex == mainLen-1){
			$('div.rightBtn a').addClass('disable') ;
			$('div.leftBtn a').removeClass('disable') ;
		}else if(scrIndex == 0){
			$('div.leftBtn a').addClass('disable') ;
			$('div.rightBtn a').removeClass('disable') ;
		}else{
			$('div.rightBtn a').removeClass('disable') ;
			$('div.leftBtn a').removeClass('disable') ;
		}
	}
	/*---手动切屏结束---*/
	
	/*---自动滑动开始---*/
	$('.autoSlide').autoslide() ;
	/*---自动滑动结束---*/
	
	/*---点击翻转开始---*/
	$.support.css3d = supportsCSS3D();	
	if($.support.css3d){
		$('.mainMetro .metroElem').click(function(e){
			var index = parseInt($('.metroElem').index(this)/2) ;
			var metro = $('div.mainMetro') ;
			var metroLen = metro.length ;
			for(var i=0; i<metroLen; i++){
				if(i == index){
					metro.eq(i).toggleClass('flipped') ;
				}else{
					if(metro.eq(i).hasClass('flipped')){
						metro.eq(i).removeClass('flipped') ;
					}
				}
			}			
		}) ;
	}else{
		//非3d-x方向翻转
		$('.mainMetro .metroBack').css('opacity','1');
		$('.metroElem').click(function(){
			var index = $('.metroElem').index(this) ;
			var metro = $('.metroElem') ;
			var metroLen = metro.length ;
			for(var i=0; i<metroLen; i++){
				if(i == index){
					metro.eq(i).fadeOut('slow') ;
					metro.eq(i).siblings('.metroElem').fadeIn('slow') ;
				}else{
					$('.metroFront').eq(i).fadeIn('slow') ;
					$('.metroBack').eq(i).fadeOut('slow') ;
				}
			}
		}) ;
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
	/*---点击翻转结束---*/
	
}) ;