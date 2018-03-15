//portal js

$(function(){
	/*portal-main-nav js start*/
	var subWid = $('.portal-menu').width() ;
	var menuHei = $('.portal-menu').height() ;
	var subLeft = $('.portal-main-nav').offset().left ;
	var subTop = $('.portal-menu').offset().top ;
	$('ul.portal-sub-menu').width(subWid).css({'left':subLeft,'top':subTop+menuHei}) ;
	$('ul.portal-main-nav li a').hover(function(){
		if($(this).siblings('ul.portal-sub-menu').length > 0){
			$(this).addClass('navhover') ;
			$(this).siblings('ul.portal-sub-menu').css('visibility','visible') ;
		}
	},function(e){
		var subTop = $('ul.portal-sub-menu').offset().top ;
		var subHei = $('ul.portal-sub-menu').height() ;
		var x = e.clientX ;
		var y = e.clientY ;
		var inX = (subLeft<=x)&&(x<=subLeft+subWid) ;
		var inY = (subTop<=y+5)&&(y<=subTop+subHei) ;
		var isinSub = inX && inY ;
		if(!isinSub){
			$(this).removeClass('navhover') ;
			$(this).siblings('ul.portal-sub-menu').css('visibility','hidden') ;
		}
		$('ul.portal-sub-menu').hover(function(){
			$(this).siblings('a').addClass('navhover') ;
			$(this).css('visibility','visible') ;
		},function(){
			$(this).siblings('a').removeClass('navhover') ;
			$(this).css('visibility','hidden') ;
		}) ;
	}) ;
	/*portal-main-nav js end*/	
	
	/*portal-search js start*/	
	var placeholder = '搜索关键字' ;//placeholder 占位 
	var defaultSearWid = $('.portal-search-main').width() ;
	var focusSearWid = 160 ;
	$('.portal-search-main input').focus(function(){
		if($(this).val() == placeholder){
			$(this).val('') ;
		}
		$(this).parents('div.portal-search-main').width(focusSearWid) ;
		$(this).keydown(function(e){
			if(e.which == 13){
				console.log('开始搜索') ;
			}
		}) ;
	}) ;
	$('.portal-search-main input').blur(function(){
		if($(this).val() == ''){
			$(this).val(placeholder) ;
		}
		$(this).parents('div.portal-search-main').width(defaultSearWid) ;
	}) ;
	$('div.portal-search-right').click(function(){
		console.log('开始搜索') ;
	}) ;
	/*portal-search js end*/
	
	/*portal-banner-main js start*/
	$('.portal-banner-mainnav li').click(function(){
		var index = $(this).index() ;
		$(this).addClass('bannercurrect').siblings('li').removeClass('bannercurrect') ;
		var parBan = $(this).parents('div.portal-banner-main') ;
		var sibBan = parBan.find('div.portal-banner-contain') ;
		var sibLen = sibBan.length ;
		for(var i=0; i<sibLen; i++){
			if(i == index){
				sibBan.eq(i).fadeIn('slow');
			}else{
				sibBan.eq(i).fadeOut('slow');
			}
		}
	}) ;
	/*portal-banner-main js end*/
	
	/*portal-banner-msg js start*/
	var newsLi = $('marquee.portal-banner-msg-news ul li') ;
	var liLen = newsLi.length ;
	var wid = 0 ;
	for(var i=0; i<liLen; i++){
		wid += parseInt(newsLi.eq(i).width()) ;
	}
	$('marquee.portal-banner-msg-news ul').width(wid) ;
	/*portal-banner-msg js end*/
	
	/*portal-main2-elem js start*/
	var imgElem = $('div.portal-main2-img') ;
	var imgLen = imgElem.length ;
	var imgWrapWid = imgElem.width()*imgLen ;
	var inter = null ;
	var parLeft = parseInt($('div.portal-main2-wrap').css('margin-left')) ;
	var count = 0 ;
	$('div.portal-main2-wrap').width(imgWrapWid) ;
	$('ul.portal-main2-btn li').click(function(){
		var index = $(this).index() ;
		$(this).addClass('currentBtn').siblings('li').removeClass('currentBtn') ;
		$(this).parents('ul.portal-main2-btn').prevAll('div.portal-main2-elem').children('div.portal-main2-wrap').stop().animate({
			'margin-left' : parLeft - imgElem.width()*(index)
		},300) ; 
	}) ;
	inter = setInterval(scrollImg,3000) ;
	$('ul.portal-main2-btn li,div.portal-main2-img a').hover(function(){
		if(inter != null || inter != 'undefined'){
			clearInterval(inter);
		}
	},function(){
		inter = setInterval(scrollImg,3000); 
	}) ;
	function scrollImg(){
		if(count<imgLen-1){
			count ++ ;
		}else{
			count = 0 ;
		}
		$('ul.portal-main2-btn li').eq(count).addClass('currentBtn').siblings('li').removeClass('currentBtn') ;
		$('div.portal-main2-wrap').stop().animate({
			'margin-left' : parLeft - imgElem.width()*(count)
		},300) ;
	}
	/*portal-main2-elem js end*/
	
	/*portal-main-tab js start*/
	$('div.portal-main3 ul.portal-main-tab li').last().css('border-right','none') ;
	$('ul.portal-main-tab li').click(function(){
		var index = $(this).index() ;
		var sibDiv = $(this).parents('div.portal-main3').children('div.portal-tab-msg') ;
		var sibLen = sibDiv.length ;
		$(this).addClass('tabcurr').siblings('li').removeClass('tabcurr') ;
		for(var i=0; i<sibLen; i++){
			if(i == index){
				sibDiv.eq(i).show() ;
			}else{
				sibDiv.eq(i).hide() ;
			}
		}
	}) ;	
	/*portal-main-tab js end*/
	
	/*portal-main4 dl js start*/
	$('dl.portal-main4-elem dt').click(function(){
		$(this).children('span').addClass('spanopen') ;
		$(this).siblings('dd').slideDown() ;
		$(this).parents('dl.portal-main4-elem').siblings('dl.portal-main4-elem').children('dd').slideUp() ;
		$(this).parents('dl.portal-main4-elem').siblings('dl.portal-main4-elem').children('dt').find('span').removeClass('spanopen') ;
	}) ;
}) ;