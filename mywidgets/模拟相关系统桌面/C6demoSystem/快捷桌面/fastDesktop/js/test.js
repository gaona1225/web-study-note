// JavaScript Document fastDesktop
$(function(){
	$(document).bind("selectstart",function(){return false;}); 
	/*----自动生成导航菜单及图标列表开始------*/
	//读取json文件
	var navList = '' ;
	var desktopList = '' ;
	var liList = [] ;
	$.getJSON('../js/list.json',function(data){
		$.each(data,function(n,dataAry){
			var screenId = dataAry['screenId'] ;
			var dataLen = screenId.length ;
			for(var i=0; i<dataLen; i++){
				navList +='<li><a href="###">' + screenId[i] + '</a></li>' ;
				desktopList += '<ul class="desktopList"></ul>' ;
			}
			//判断是否有添加屏项,如果小于6屏可添加屏幕所以后面多出一个标点号的项			
			if(dataLen<6){
				navList += '<li class="pointLi"><a href="###">...</a></li>' ;
			}
			$('.desktopNav').append(navList).find('li').first().addClass('navCurrent') ;
			$('.ulList').append(desktopList) ;
			for(var i=0; i<dataLen;i++){
				liList[i] = '' ;
				var icons = dataAry['icons'] ;
				var iconList = icons[i]['iconList'] ;
				var iconListLen = iconList.length ;
				for(var j=0; j<iconListLen; j++){
					if(iconList[j]['iconNum'] ==''){
						liList[i] += '<li><a href="###" title="'+iconList[j]['iconAlt']+'"><img src="'+iconList[j]['iconSrc']+'" /><span>'+iconList[j]['iconAlt']+'</span></a></li>'
					}else{
						liList[i] += '<li><a href="###" title="'+iconList[j]['iconAlt']+'"><img src="'+iconList[j]['iconSrc']+'" /><span>'+iconList[j]['iconAlt']+'</span><p class="numCount">'+iconList[j]['iconNum']+'</p></a></li>'
					}
				}
				$('.desktopList').eq(i).append(liList[i]) ;
			}
		}) ;
		var len = $('.desktopNav li:not(".pointLi")').length ;
		elemWid = $(window).width() ;
		if(elemWid>=1024){
			$('ul.desktopList').width(elemWid*0.86).css('padding-left',elemWid*0.07).css('padding-right',elemWid*0.07) ;
		}else{
			$('ul.desktopList').width(elemWid*0.9).css('padding-left',elemWid*0.05).css('padding-right',elemWid*0.05) ;
		}
		$('.mainList').width(elemWid) ;
		$('.ulList').width(elemWid*len) ;
		$('.desktopNavL').css('margin-left',elemWid*0.4) ;
		$('.trashbin').css('margin-left',elemWid*0.4) ;
		$(window).resize(function(){
			var elemWid = $(window).width() ;
			if(elemWid>=1024){
				$('ul.desktopList').width(elemWid*0.86).css('padding-left',elemWid*0.07).css('padding-right',elemWid*0.07) ;
			}else{
				$('ul.desktopList').width(elemWid*0.9).css('padding-left',elemWid*0.05).css('padding-right',elemWid*0.05) ;
			}
			$('.mainList').width(elemWid) ;
			$('.ulList').width(elemWid*len) ;
			$('.desktopNavL').css('margin-left',elemWid*0.4) ;
			$('.trashbin').css('margin-left',(elemWid-82)/2) ;
		}) ;
		
		/*------图标拖拽排序功能开始------*/
		var dragend = true,inRegion = true ;
		var isChrome = navigator.userAgent.toLowerCase().match(/chrome/) != null;
		var isSafari = $.browser.safari ;
		var region = 'html' ;
		if(isChrome || isSafari){
			region = 'body' ;
		}else{
			region = 'html' ;
		}
		$('.desktopList').sortable({
			containment:region,
			scroll:false,
			cursorAt:{top:25,left:25} ,
			distance:5,
			revert:true ,
			over:function(event,ui){
				ui.item.addClass('hoverMid') ;
				$('.trashbin').css('visibility','visible') ;
			},
			stop:function(event,ui){
				ui.item.removeClass('hoverMid') ;
				$('.trashbin').css('visibility','hidden') ;
				dragend = true ; //判断拖拽是否结束
				sortIcon() ; //排序结束触发方法
			},
			remove:function(event,ui){
				inRegion = false ; //判断拖拽目的地是否脱离当前元素所在的ul区域
			}
		});
		function sortIcon(){ //排序结束触发方法
			if(dragend&&inRegion){
				//TODO
			}else{
				inRegion = true ;
			}
		}
		$('.desktopNav li:not(".pointLi")').draggable({
			containment:region ,
			distance:5,
			revert:true ,
			drag:function(event,ui){
				$('.trashbin').css('visibility','visible') ;
			},
			stop:function(event,ui){
				$('.trashbin').css('visibility','hidden') ;
			},
		});
		/*------图标拖拽排序功能结束------*/
		
		/*------图标跨桌面移动功能开始------*/
		$('.desktopNav li').droppable({
			over:function(event,ui){
				var notNavLi = (ui.draggable.parents('ul.desktopNav').length == 0) ;
				if(notNavLi){
					$(this).addClass('iconHover') ;
				}
			},
			out:function(event,ui){
				$(this).removeClass('iconHover') ;
			},
			drop:function(event,ui){
				var notNavLi = (ui.draggable.parents('ul.desktopNav').length == 0) ;
				if(notNavLi){
					ui.draggable.remove() ;
					var newClone = ui.draggable.clone().attr({'style':'','class':''})
					$(this).removeClass('iconHover') ;
					var thisScreen = $(this).find('a').html() ;
					var changeSpan = ui.draggable.find('span').html() ;
					var prevSpan = parseInt($(this).parents('li').prevAll('li').find('a').html())+1 ;
					var newIndex = parseInt(thisScreen) - 1 ;
					if(thisScreen == '...'){
						//alert('您已经将'+changeSpan+'移动到新添的第'+prevSpan+'屏了') ;
					}else{
						//$('ul.desktopList').eq(parseInt(thisScreen) - 1).append(newClone) ;
					}				
					changeIconScreen(newIndex,newClone) ;//调用图标跨桌面移动的操作方法
				}
			}
		}) ;
		/*------图标跨桌面移动功能结束------*/
		
		/*------删除图标功能开始------*/
		$('.trashbin').droppable({
			over:function(event,ui){
				$(this).find('a').addClass('trashhover') ;
			},
			out:function(event,ui){
				$(this).find('a').removeClass('trashhover') ;
			},
			drop:function(event,ui){
				var dragIcon = ui.draggable.parents('ul').hasClass('desktopList') ;
				var dragDesk = ui.draggable.parents('ul').hasClass('desktopNav') ;				
				if(dragIcon){ //删除图标
					ui.draggable.remove() ;
					var delSpan = ui.draggable.find('span').html() ;
					//alert('您删除了'+delSpan) ;
					delIcon() ;//调用删除图标对数据的操作方法
				}else if(dragDesk){ //删除桌面
					var delHtml = ui.draggable.find('a').html() ;
					if(delHtml != '...'){
						ui.draggable.remove() ;
						//alert('您删除了第'+delHtml+'屏') ;
						delScreen() ;//调用删除桌面对数据的操作方法
					}
				}
				$('.trashbin a').removeClass('trashhover') ;
				$('.trashbin').css('visibility','hidden') ;
			}
		}) ;
		/*------删除图标功能结束------*/
	}) ;
	$('.desktopList li').live('click',function(){
		clickIcon() ; //点击图标操作方法
	}) ;
	function delIcon(){//删除图标对数据的操作方法
		//TODO
	}
	function delScreen(){//删除桌面对数据的操作方法
		//TODO
	}
	function changeIconScreen(index,cloneObj){//图标跨桌面移动的操作方法
		//在此方法中需要判断被拖动的屏幕是否少于21个图标。
		//TODO
		$('ul.desktopList').eq(index).append(cloneObj) ;
	}
	function clickIcon(){ //点击图标触发方法
		//TODO
	}
	/*----自动生成导航菜单及图标列表结束------*/
	
	/*----导航菜单切屏功能开始-----*/	
	$('.desktopNav li:not(".pointLi")').live('click',function(){
		var index = $(this).index() ;
		var elemWid = $(window).width() ;
		$(this).addClass('navCurrent').siblings('li').removeClass('navCurrent') ;
		$('.ulList').stop().animate({
			'margin-left':'-' + elemWid*index + 'px'
		},500) ;
		$(window).resize(function(){
			var elemWid = $(window).width() ;
			$('.ulList').stop().animate({
				'margin-left':'-' + elemWid*index + 'px'
			},500) ;
		}) ;
	}) ;
	/*----导航菜单切屏功能结束-----*/
	
	/*----pc机滑动屏幕切屏功能开始-----*/
	$('.desktopMain').live('mousedown',function(e){
		var target = e.target ;
		var isTarget = ['desktopMain','desktopList','mainList'] ;
		for(var i=0;i<isTarget.length;i++){
			if( $(target).hasClass(isTarget[i])){
				var inTar = true ;
			}
		}
		e.preventDefault();
		if(inTar){
			changeScreen(e,target) ;
		}
	}) ;
	//切换屏幕方法
	function changeScreen(e,target){
		var flag = 1 ;
		var beginX = e.clientX ;//开始移动鼠标的x轴方向上坐标--原始坐标
		var maxScreen = $('.desktopList').length ;
		$(target).mousemove(function(e){
			var thisNum = $('.navCurrent').index() ;//确定当前所在屏数。
			if(flag){
				var diffX = (e.clientX - beginX) ; //判断移动后的x轴方向上与原始坐标大小。大于零向右滑，小于零向左滑。
				if(diffX>0){
					thisNum -= 1 ; 
				}else if(diffX<0){
					thisNum += 1 ;
				}else{
					return false ;
				}
				flag = 0 ;
				if((thisNum>=0)&&(thisNum<maxScreen)){
					$('.desktopNav li:not(".pointLi")').eq(thisNum).addClass('navCurrent').siblings('li').removeClass('navCurrent') ;
					var elemWid = $(window).width() ;
					$('.ulList').stop().animate({
						'margin-left':'-' + elemWid*thisNum + 'px'
					},500) ;
					$(window).resize(function(){
						var elemWid = $(window).width() ;
						$('.ulList').stop().animate({
							'margin-left':'-' + elemWid*thisNum + 'px'
						},500) ;
					}) ;
				}else{
					//alert('已经是第一屏或是最后一屏了') ;
				}
			}
		}) ;
		$(target).mouseup(function(e){
			flag = 0 ;
		}) ;
	}
	/*----pc机滑动屏幕切屏功能结束-----*/
	
	/*----pad滑动屏幕切屏功能开始-----*/
	if('ontouchstart' in document.documentElement){ //判断是否支持touchstart
		$('.desktopMain')[0].addEventListener('touchstart',screenTouchStart,false) ;
	}
	function screenTouchStart(e){
		var target = e.target ;
		var isTarget = ['desktopMain','desktopList','mainList'] ;
		for(var i=0;i<isTarget.length;i++){
			if( $(target).hasClass(isTarget[i])){
				var inTar = true ;
			}
		}
		if(inTar){
			changeTouchScreen(e,target) ;
		}
	}
	function changeTouchScreen(e,target){
		e.preventDefault();
		flagTouch = 1 ;
		beginTouchX = e.targetTouches[0].pageX ;//开始移动鼠标的x轴方向上坐标--原始坐标
		maxScreen = $('.desktopList').length ;
		$(target)[0].addEventListener('touchmove',screenTouchMove,false) ;
		$(target)[0].addEventListener('touchend',screenTouchEnd,false) ;
	}
	function screenTouchMove(e){
		var thisNum = $('.navCurrent').index() ;//确定当前所在屏数。
		if(flagTouch){
			var diffX = (e.targetTouches[0].pageX - beginTouchX) ; //判断移动后的x轴方向上与原始坐标大小。大于零向右滑，小于零向左滑。
			if(diffX>0){
				thisNum -= 1 ; 
			}else if(diffX<0){
				thisNum += 1 ;
			}else{
				return false ;
			}
			flagTouch = 0 ;
			if((thisNum>=0)&&(thisNum<maxScreen)){
				$('.desktopNav li:not(".pointLi")').eq(thisNum).addClass('navCurrent').siblings('li').removeClass('navCurrent') ;
				$('.ulList').animate({
					'margin-left':'-' + elemWid*thisNum + 'px'
				},500) ;
			}else{
				//alert('已经是第一屏或是最后一屏了') ;
			}
		}
	}
	function screenTouchEnd(e){
		flagTouch = 1 ;
	}
	/*----pad滑动屏幕切屏功能结束-----*/
	
	/*-----添加图标页面功能开始------*/
	$('.iconElem li:odd').css('margin-right','0px') ;
	$('.iconNavUl li').live('click',function(){
		$(this).addClass('iconCurrent').siblings('li').removeClass('iconCurrent') ;
	}) ;
	/*-----添加图标页面功能结束------*/
}) ;