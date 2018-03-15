/**
 * @作者 张文钦
 * @时间 2011-10-12
 * @描述 应用、添加应用、多任务扩展操作 滑动
 * @关联文件 jquery-1.5.2.js
 */
/**
 * @
 * 获取一级菜单ul的自定义属性data-appLocationFlag
 * 判断该函数是应用于应用、还是添加应用
 * 0 应用(默认)
 * 1 添加应用
 * 其他 置为默认值 0
 * @version 
 */
function appScrollListener(){
	var liHeight = 26;
	var maxNum = 13;
	var $topMenuCon = $('#allOneMenuUL');
	/*判断应用场所 开始*/
	var menuFlag = $topMenuCon.attr('data-appLocationFlag');
	menuFlag = (menuFlag == undefined || (menuFlag != 0 && menuFlag != 1))?0:menuFlag;
	/*判断应用场所 结束*/
	var topMenuNum = $topMenuCon.find('>li').length;
	var marginTop = parseInt($topMenuCon.css('marginTop').replace('px',''));
	var outerConHeight = $('#ulOuterCon').outerHeight(); 
	var upNum = -(marginTop/liHeight); //上方隐藏的li的个数
	var downNum = topMenuNum - maxNum - upNum;//下方隐藏的li的个数
	var left = (menuFlag == 0)?'4px':'7px';
	if(downNum > 0){
		$("#fw_d").css({
    		"display":"block",
    		"position":"absolute",
    		"left":left,
    		"top":outerConHeight+((menuFlag == 0)?1:21)
    	});		
	}else{
		$("#fw_d").css("display","none");
	}
	if( upNum > 0){
		$("#fw_u").css({
    		"display":"block",
    		"position":"absolute",
    		"left":left,
    		"top":(menuFlag == 0)?'11px':'33px'
    	});
	}else{
		$("#fw_u").css("display","none");
	}
	return {'upNum':upNum,'downNum':downNum};//滑轮事件使用
};
function doScroll(){
	 appScrollListener();/*初始化*/
	/*竖直滑动*/
	var $ulCon = $("#ulOuterCon");
	var $ul = $ulCon.find("ul");
	var liHeight = 26;
	var scrllSpeed = 500;
	$("#fw_u").live({
		mouseover:function(){
			$(this).attr("class","jcs_u_active");
		},
		mouseout:function(){
			$(this).attr("class","jcs_fw_up");
		},
		click:function(){
			var _mT = parseInt($ul.css("marginTop"));
			if(_mT < 0){
            	/*$ul.animate({"marginTop":_mT+liHeight+"px"},scrllSpeed);*/
            	$ul.css({"marginTop":_mT+liHeight+"px"});
            }else{
            	$(this).css("display","none");
            }
            appScrollListener();
		}
	});
	$("#fw_d").live({
		mouseover:function(){
			$(this).attr("class","jcs_d_active");
		},
		mouseout:function(){
			$(this).attr("class","jcs_fw_down");
		},
		click:function(){
            $ul.css({"marginTop":parseInt($ul.css("marginTop"))-liHeight+"px"});
            appScrollListener();
		}	
	});
};
function ui5ScrollMe(e){
    var me = e || window.event;
    /*ie,滑轮上滑动 120 下滑动 -120*/
    /*ff 滑轮上滑动 -3 下滑动 3*/
    //var delta = me.detail?me.detail:me.wheelDelta;
    //alert(delta);
    var delta = 0;
    if(me.detail){
    	delta = -me.detail/3;
    }else if(me.wheelDelta){//ie
    	delta = me.wheelDelta/120;
    }
    /**
    *@delta : 1 上滑动 内容下滑动;-1 下滑动 内容上滑动
    */
    var $ul = $("#allOneMenuUL");
    var scrllFlag = appScrollListener();/*初始化*/
    var liHeight = 26;
    if(scrllFlag.upNum >0){
    	/*上有隐藏*/
    	if(delta == 1){
    		/*上滑动*/
   			var _mT = parseInt($ul.css("marginTop"));
   			if(_mT < 0){
              	$ul.css({"marginTop":_mT+liHeight+"px"});
             }else{
              	$(this).css("display","none");
             }
             appScrollListener();
    	}
    }
    if(scrllFlag.downNum > 0){
    	/*下有隐藏*/
    	if(delta == -1){
    		/*下滑动*/
  			$ul.css("marginTop",parseInt($ul.css("marginTop"))-liHeight+"px");
            appScrollListener();
    	}
    }	
};
function mouseSlide(){
	var ulOuterCon = document.getElementById("ulOuterCon");
	//FF doesn't recognize mousewheel as of FF3.x
	var mousewheelevt = (/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel";
	//var mousewheel = document.all?"mousewheel":"DOMMouseScroll";
	addEventHandler(ulOuterCon,mousewheelevt,ui5ScrollMe);
};