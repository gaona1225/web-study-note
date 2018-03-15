
/*
 *作    者: 张勇辉 
 *版    本: 1.2 
 *创建时间: 2011-08-30  
 *描    述: Desktop Layout 
 *关联文件: jQuery.js|jquery-ui.js 
 */	
 
$(function(){
	var speed	 = 	200,	//动画速度(200) 
		minLeft	 =	true;	//左侧默认最小化 
		
	if(minLeft){
		$(".ui-desktop-left").addClass("ui-desktop-left-min");
	}
	
	//配置初始化参数 
	function setDesktop(){
		var $setDesktop = $(window).height() - 107;
		if ($setDesktop >= 200){
			$(".ui-desktop-center").height($setDesktop);
			$(".ui-desktop-main-workplan,.ui-desktop-tabPlanFrame").height($setDesktop - 77);
		}else{
			$(".ui-desktop-center").height(200);	
		}
	}
	
	//初始化左侧菜单高度数据 
	function setLeft(){  
		var $leftHeight = $(".ui-desktop-left").height() - 78;
		$(".ui-desktop-left-body").height($leftHeight);
	}
	//顶级标签操作 
	$(".ui-desktop-tab li").eq(0).addClass("active");
	$(".ui-desktop-tab li").live({
		mouseover:function(){
			$(this).addClass("hover");
		},
		mouseout:function(){
			$(this).removeClass("hover");
		},
		click:function(){
			$(".ui-desktop-tab li").removeClass("active");
			$(this).addClass("active");
		}
	});
	
	//添加标签 
	function addTab(app){
		var $tab = $("<li><a class='ui-desktop-tabClose' href='javascript:void(0);'></a><span>"+ app +"</span></li>");
		$(".ui-desktop-main").fadeIn(speed);
		$tab.appendTo(".ui-desktop-tab ul").hide();
		$(".ui-desktop-tab li").removeClass("active");
		$tab.addClass("active").fadeIn(speed);
		var tabAreaWidth = $(".ui-desktop-tab").width();
		var tabLength = $(".ui-desktop-tab li").length * 142
		if(tabAreaWidth < tabLength){
			var setEnd = tabAreaWidth - tabLength;
			$(".ui-desktop-tab ul").animate({marginLeft:setEnd+"px"},speed);
		}
	}
	
	//移除标签 
	function removeTab(tab){
		if(tab.is(".active")){
			var next = tab.prev("li").is(":first")?tab.prev("li"):tab.next("li");
				next.addClass("active");
		}
		
		if(tab.siblings("li").length == 0){
			$(".ui-desktop-main").fadeOut(speed);
		}
		tab.fadeOut(speed,function(){
			tab.remove();
			var tabAreaWidth = $(".ui-desktop-tab").width();
			var tabLength = $(".ui-desktop-tab li").length * 142;
			var setNew =tabAreaWidth - tabLength ;
			var offset = parseInt($(".ui-desktop-tab ul").css("marginLeft"));
			//alert(setNew);
			if(setNew <= 0 && setNew > offset){
				$(".ui-desktop-tab ul").animate({marginLeft:setNew+"px"},speed);
			}else if(setNew > 0){
				$(".ui-desktop-tab ul").animate({marginLeft:"0px"},speed);
			}
		});
	} 
	
	//顶级标签滚动制控
	$(".ui-desktop-tab-control span").click(function(){
		var tabCtrl = $(this).index();
		var tabAreaWidth = $(".ui-desktop-tab").width();
		var tabWidth = 142;
		var tabLength =  $(".ui-desktop-tab li").length * tabWidth;
		var setEnd = tabAreaWidth - tabLength;
		switch (tabCtrl)
		{
			case 2:
				var offset = parseInt($(".ui-desktop-tab ul").css("marginLeft")) - tabWidth;
				if(offset > setEnd && setEnd < tabWidth ){
					$(".ui-desktop-tab ul").animate({marginLeft:offset+"px"},speed);
				}else if(setEnd < 0){
					$(".ui-desktop-tab ul").animate({marginLeft:setEnd+"px"},speed);
				}
				break;
			case 0:
				var offset = parseInt($(".ui-desktop-tab ul").css("marginLeft")) + tabWidth;
				if(setEnd < 0 && offset < -tabWidth){
					$(".ui-desktop-tab ul").animate({marginLeft:offset+"px"},speed);
			 	}else{
					$(".ui-desktop-tab ul").animate({marginLeft:"0px"},speed);
				}
				break;
			case 3:
				confirm("要显示菜单吗！");
		}
	});
	//关闭标签
	$(".ui-desktop-tab .ui-desktop-tabClose").live("click",function(){
		//在这里添加关闭操作方法 
		//注意dom之间的逻辑关系 
		//以dom索引序列操作为主
		var tab = $(this).parent("li"); 
		 removeTab(tab);
		//阻止事件冒泡 
		return false;
	});
	$(".ui-desktop-left-body li").live("click",function(){
		//这里添加创建标签事件 
		var appName = $(this).text();
		addTab(appName);
	});
	
	//左侧操作 
	$(".ui-desktop-leftCtrl").click(function(){
		$(".ui-desktop-left").toggleClass("ui-desktop-left-min");
	});
	$(".ui-desktop-left-body li,.ui-desktop-left-bottom li").hover(function(){
		$(this).addClass("active");
	},function(){
		$(this).removeClass("active");
	});
	
	//二级菜单操作 
	$(".ui-desktop-secondTab li").hover(function(){
		$(this).addClass("hover");
	},function(){
		$(this).removeClass("hover");
	});
	$(".ui-desktop-secondTab li").eq(0).addClass("active");//默认激活第一项 
	$(".ui-desktop-secondTab li").live("click",function(){
		$(".ui-desktop-secondTab li").removeClass("active");
		$(this).addClass("active");
	});
	
	//系统按钮交互 
	$(".ui-desktop-sysBtn").hover(function(){
		$(this).addClass("ui-desktop-sysBtn-hover");
	},function(){
		$(this).removeClass("ui-desktop-sysBtn-hover ui-desktop-sysBtn-active");
	}).mousedown(function(){
		$(this).addClass("ui-desktop-sysBtn-active");
	}).mouseup(function(){
		$(this).removeClass("ui-desktop-sysBtn-active");
	});
	
	//搜索
	$(".minSearch").minSearch({
		width:"200px",
		btnClick:function(){
			var val = $("#mainSearch").val();
			alert("开始搜索和‘"+val+"’有关的数据.")
			},
		onFocus:function(){},
		onBlur:function(){}
	});
	
	//执行初始化 
	setDesktop();
	setLeft();
	$(window).resize(function(){
		setDesktop();
		setLeft();
	});
	
	//加载控制 
	function loadComplete(){
		$(".ui-desktop-loading").fadeOut(speed);
	}
	setTimeout(loadComplete,3000);
	
	//在平板以及手机浏览器中隐藏地址栏 
	window.scrollTo(0,1); // 待测试 
	
});
