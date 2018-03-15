// JavaScript Document
$(function(){
	//截取字符串
	intercept(('.subMenu .subMsg'),12) ;
	function intercept(obj,len){
		var strArry = new Array() ;
		for(var i = 0; i<$(obj).length; i++){
			strArry[i] = $(obj).eq(i).html() ;
			if(strArry[i].length > len){
				strArry[i] = strArry[i].substr(0,len) + '...' ;
			}
			$(obj).eq(i).html(strArry[i]) ;
		}
	}
	
	//左侧菜单显示隐藏
	$('.sideToggle .sidebar-fold').click(function(){
		var $this = $(this) ;
		var $iscloseSearch = $('i.icon-remove') ;
		if($iscloseSearch.length>0){
			$iscloseSearch.click() ;
		}
		$this.parents('div.navSide').find('ul.subMenu').css('display','none') ;
		$this.parents('div.navSide').find('li.currentLi').removeClass('currentLi') ;
		$this.parents('div.navSide').toggleClass('navSideClose') ;
		$this.parents('div.main').find('div.mainCon').toggleClass('mainConOpen') ;
	}) ;
	
	//左侧二级菜单
	$('ul.navMenu li:not("firstLi")').live('click',function(){
		var $this = $(this) ;
		$this.addClass('currentLi').siblings('li').removeClass('currentLi') ;
		var childUlLen = $this.find('ul.subMenu').length ;
		var $liSib = $this.siblings('li') ;
		if(childUlLen>0){
			$this.find('ul').slideToggle() ;
			$liSib.find('ul').slideUp() ;
			$this.find('span.icon_arrow').toggleClass('icon_arrow_down') ;
			$liSib.find('span.icon_arrow').removeClass('icon_arrow_down') ;
		}
	}) ;
	
	//隐藏菜单，点击搜索图标
	$('.icon-search').live('click',function(){
		var $this = $(this) ;
		var isClose = $this.parents('div.navSide').hasClass('navSideClose') ;
		var isOnlyClick = $this.attr('data-clicked') ;
		console.log(isOnlyClick) ;
		if(isClose && isOnlyClick != 'true'){
			$this.attr('data-clicked','true').parents('div.sideSearch').addClass('closeSearch').find('form').prepend('<i class="icon-remove"></i>') ;
		}else{
			console.log('搜索内容') ;
		}
	}) ;
	
	//隐藏菜单，点击搜索关闭图标
	$('.sideSearch .icon-remove').live('click',function(){
		var $this = $(this) ;
		$this.parents('div.sideSearch').removeClass('closeSearch') ;
		$this.nextAll('.icon-search').removeAttr('data-clicked') ;
		$this.remove() ;
	}) ;
	
	//portlet相关功能
	//portletTools操作
	$('.portletTools label').live('click',function(){
		$(this).addClass('activeLabel').siblings('label').removeClass('activeLabel') ;
	}) ;
	//dropMenu
	$('.portletDropMsg').click(function(e){
		$(this).toggleClass('portalCur') ;
		$(this).next('.dropMenu').slideToggle() ;
	}) ;
	$('.portletTabDrop').hover(function(){
		var $this = $(this) ;
		var $dropMenu = $this.children('.dropMenu') ;
		if($dropMenu.css('display') == 'none'){
			$this.children('.portletDropMsg').addClass('portalCur') ;
			$dropMenu.slideDown() ;
		}
	},function(){
		var $this = $(this) ;
		var $dropMenu = $this.children('.dropMenu') ;
		if($dropMenu.css('display') == 'block'){
			$this.children('.portletDropMsg').removeClass('portalCur') ;
			$dropMenu.slideUp() ;
		}
	}) ;
	$('.dropMenu li').live('click',function(){
		var $this = $(this) ;
		$this.toggleClass('dropCheckCurrent') ;
	}) ;
	
	//portletDrop
	$('.portletToolTit').click(function(e){
		$(this).toggleClass('portalCur') ;
		$(this).next('.portletDrop').slideToggle() ;
	}) ;
	$('.portletTool').hover(function(){
		var $this = $(this) ;
		var $dropMenu = $this.children('.portletDrop') ;
		if($dropMenu.css('display') == 'none'){
			$this.children('.portletToolTit').addClass('portalCur') ;
			$dropMenu.slideDown() ;
		}
	},function(){
		var $this = $(this) ;
		var $dropMenu = $this.children('.portletDrop') ;
		if($dropMenu.css('display') == 'block'){
			$this.children('.portletToolTit').removeClass('portalCur') ;
			$dropMenu.slideUp() ;
		}
	}) ;
	
}) ;