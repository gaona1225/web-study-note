$(function(){
	/*---手动切屏开始 到第一张和最后一张不可点---*/
	/*var mainElem = $('.main .mainElem') ;
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
	}*/
	/*---手动切屏结束 到第一张和最后一张不可点---*/
	
	/*---手动切屏结束 到第一张和最后一张可点，添加自动滑动---*/
	var mainElem = $('.main .mainElem') ;
	var mainLen = mainElem.length ;
	$('.main .mainWrap').width(mainElem.width()*mainLen) ;
	var parLeft = parseInt($('.main .mainWrap').css('margin-left')) ;
	var scrIndex = 0 ;
	$('div.leftBtn a').click(function(){
		clearInterval(setInt); //清除自动滑屏
		console.log(scrIndex) ;
		if(scrIndex>0){
			scrIndex -- ;
		}
		/*添加else效果，触发第一屏临界点操作*/
		else{
			scrIndex = mainLen-1 ;
		}
		scrollScreen(scrIndex) ;
	}) ;
	$('div.rightBtn a').click(function(){
		clearInterval(setInt); //清除自动滑屏
		if(scrIndex<mainLen-1){
			scrIndex ++ ;
		}
		/*添加else效果，触发最后一屏临界点操作*/
		else{
			scrIndex = 0 ;
		}
		scrollScreen(scrIndex) ;
	}) ;
	$('.buttomBtn li').click(function(){
		clearInterval(setInt); //清除自动滑屏
		scrIndex = $(this).index() ;
		$(this).addClass('btnCurrent').siblings('li').removeClass('btnCurrent') ;
		scrollScreen(scrIndex) ;
	}) ;
	
	function scrollScreen(scrIndex){	
		$('.main .mainWrap').stop().animate({
			'margin-left' : parLeft - mainElem.width()*(scrIndex)
		},300) ;
		$('.buttomBtn li').eq(scrIndex).addClass('btnCurrent').siblings('li').removeClass('btnCurrent') ;
		/*去除不可点击按钮样式*/
		/*if(scrIndex == mainLen-1){
			$('div.rightBtn a').addClass('disable') ;
			$('div.leftBtn a').removeClass('disable') ;
		}else if(scrIndex == 0){
			$('div.leftBtn a').addClass('disable') ;
			$('div.rightBtn a').removeClass('disable') ;
		}else{
			$('div.rightBtn a').removeClass('disable') ;
			$('div.leftBtn a').removeClass('disable') ;
		}*/
	}
	
	//自动滑屏
	var setInt ;
	autoPlayLoop() ;
	function autoPlayLoop(){ 
		setInt= setInterval(autoPlay,3000) ;
	}
	function autoPlay(){
		console.log('dd') ;
		scrollScreen(scrIndex) ;
		scrIndex ++ ;
		if(scrIndex == mainLen){
			scrIndex = 0 ;
		}
	}
	//清除自动滑屏
	$('div.leftBtn a,div.rightBtn a,.buttomBtn li,mainElem p').hover(function(){
		clearInterval(setInt); //清除自动滑屏	
	},function(){
		setInt = setInterval(autoPlay,3000) ;
	}) ;
	/*---手动切屏结束 到第一张和最后一张可点添加自动滑动---*/
}) ;