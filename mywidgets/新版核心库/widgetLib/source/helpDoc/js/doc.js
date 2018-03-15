// JavaScript Document
$(function(){
	//计算左侧导航的高度，右侧doc展示区域宽度
	setHW() ;
	$(window).resize(function(){
		setHW() ;
	}) ;
	function setHW(){
		var scrWid = $(window).width() ; //屏幕可用宽度
		var scrHei = $(window).height() ; //屏幕可用高度
		
		var colorHei = $('.doc-warp').css('padding-top') ;
		var navWid = $('.doc-nav-list').width() ;
		var newHei = parseInt(scrHei) - parseInt(colorHei) ;
		
		var newWid = parseInt(scrWid) - parseInt(navWid) - (parseInt($('.doc-main').eq(0).css('padding-left'))*2) ; 
		$('.doc-nav-list').eq(0).height(newHei) ;
		$('.doc-main').eq(0).width(newWid) ;
	}
	
	//清除左侧导航中最后一个li的下边框
	$('.doc-nav-list li').last().css('border-bottom','none') ;
	
	//获取文档内容页高度并配置高度
	var _iframe = $('.doc-main iframe[name="doc-iframe"]') ;
	$(_iframe).load(function(){
		var contHei = $(this).contents().find('body>div.help-wrap').height() ;
		$(this).height(contHei) ;
	}) ;
}) ;