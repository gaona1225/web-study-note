// JavaScript Document
$(function(){
	//截取字符串
	intercept(('.subMenu .subMsg'),12) ;
	function intercept(obj,len){
		var strArry = new Array() ;
		for(var i = 0; i<$(obj).length; i++){
			strArry[i] = $(obj).eq(i).html() ;
			console.log(strArry[i]) ;
			if(strArry[i].length > len){
				strArry[i] = strArry[i].substr(0,len) + '...' ;
			}
			$(obj).eq(i).html(strArry[i]) ;
		}
	}
	
	//左侧菜单显示隐藏
	$('.sideToggle i').click(function(){
		var $this = $(this) ;
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
	$('.icon_search').live('click',function(){
		var $this = $(this) ;
		var isClose = $this.parents('div.navSide').hasClass('navSideClose') ;
		var isOnlyClick = $this.attr('data-clicked') ;
		console.log(isOnlyClick) ;
		if(isClose && isOnlyClick != 'true'){
			$this.attr('data-clicked','true').parents('div.sideSearch').addClass('closeSearch').find('form').prepend('<i class="icon icon_remove"></i>') ;
		}else{
			console.log('搜索内容') ;
		}
	}) ;
	
	//隐藏菜单，点击搜索关闭图标
	$('.sideSearch .icon_remove').live('click',function(){
		var $this = $(this) ;
		$this.parents('div.sideSearch').removeClass('closeSearch') ;
		$this.nextAll('.icon_search').removeAttr('data-clicked') ;
		$this.remove() ;
	}) ;
	
}) ;