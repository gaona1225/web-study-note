/*!
 * JCS jmenu 1.1
 * 
 * (c) jinher, zhng 2011-2012 maybe under MIT licenses
 */
/**
 * 基于jQuery-1.5.2.js,JCS 框架页菜单具体实现JS部分
 * UD：崔倩,王礼
 * Author：张文钦(zhngwing@163.com)
 * Contributors 张勇辉,贾臻
 */
//菜单构建操作工具对象
var jmenu = {
    version:'1.1',
    dblClose: false,//双击关闭任务标签
    isMobile:'ontouchstart' in window,//hasTouch
    ipadLockSignal:false,//ipad单任务锁
    leftNavFlag:1,
    scrollSpeed:600,
    scrollStep:100,//147,
    tabLen:6,
    oneTabWidth:145,
    loadingTagName:'\u6b63\u5728\u52a0\u8f7d...',//正在加载...
    visibleZoneWidth:0,
    tabIndex:-1,//当前选中任务标签的下标-选中标签的moduleid
    openFresh:0,//再次点击时默认重新载入该标签内容 0 是 非0 否;默认 是
    tabRefreshMap:{"stylePageSet":"workBench","replyCall":"unReadCall","manage":"unReadCall"},
/**
 * 开启该开关后,关闭某个标签时，如果该标签是:1.当前选中;2.在某个内容页中调用添加的，同时该来源标签还存在时，则选中该标签
 * 可代替tabRefreshMap的作用
 * 相关配置:
 * 1.jmenu.removeChain 0 真 
 * 2.openTargetByUrl 参数 _pid为真实id(通常为获取当前选中标签中的模块id值)
 */    
    removeChain:0,
    iframe_h:'100%',
    iframe_w:'100%',
    scrollWidth:function(){
        //内容区iframe的宽
        var win_w = $(window).width();
        var extra_w = $('#popMenu').outerWidth() + 5;
        var $pages = $('#pages');
        jmenu.iframe_w = win_w - extra_w + 2;//2边框
        $pages.width(jmenu.iframe_w+2);
        $pages.find('>iframe').width(jmenu.iframe_w);
        jmenu.visibleZoneWidth = $('#tabOuterCon').width();
    },
    scrollHeight:function(){
        var $popMenu = $('#popMenu');//快捷菜单容器div
        var $pages = $('#pages');//内容iframe区域内层容器
        var win_h = $(window).height();
        var head_h = $('#head').height();
        var foot_h = $('#foot').height();
        var middle_h = win_h -(head_h+foot_h);
        var popMenu_h = middle_h -75;
        //快捷菜单内层容器的高
        var extra_h = 40 + 2;
        var popNav_h = popMenu_h - extra_h;
        var mtTabs_h = $('#mtTabsOuterCon').height();//34
        var page_h = middle_h - mtTabs_h;
	    
        jmenu.iframe_h = page_h -8;//10-->8边框
        $('#middle').height(middle_h);
        $popMenu.height(popMenu_h);
        $('#popNav').height(popNav_h);
        $('#pages').height(page_h-9).find('>iframe').height(jmenu.iframe_h);//-1
    },
    init:function(){
        if(jmenu.leftNavFlag == 0){
            //$('#popMenu').attr('class','ui-desktop-left-nav-min');
            jmenu.leftNavFlag = 1;
        }else if(jmenu.leftNavFlag == 1){
            $('#popMenu').attr('class','ui-desktop-left-nav');
            //jmenu.leftNavFlag = 0;
        }
        jmenu.scrollWidth();
        jmenu.scrollHeight();
    },
    /**
     * shrink时滑动多任务标签区
     */
    shrinkTabs:function(){
        jmenu.visibleZoneWidth = $('#tabOuterCon').width();
        jmenu.scrollWidth();
        jmenu.scrollHeight();
        /**
         * 多任务标签区域存在标签时，滑动(存在标识的修改)
         */
        var $mtTab = $('#mtTab');
        if($mtTab.find('>li').length > 0){
            var $curTab = $mtTab.find('>li.tab_f');
            var tabName = $curTab.attr('tabname');
            var moduleId = $curTab.attr('moduleid');
            jmenu.scrollTab($mtTab,jmenu.isVisible($mtTab,tabName,moduleId));
        }
        //关闭更多快捷菜单
		pfloat.popMore = -1;
    	$("#morePopMenu").css("display","none");
    },
    leftNavShrink:function(){
         //快捷菜单收起和弹出状态切换
        var $left_nav = $('#popMenu');
        $('#nav_sh').click( function() {//只使用leftNavFlag来做开关控制
            if ( jmenu.leftNavFlag == 0 ) {
                jmenu.leftNavFlag = 1;
                $left_nav.attr('class','ui-desktop-left-nav');
            } else if ( jmenu.leftNavFlag == 1 ) {
                jmenu.leftNavFlag = 0;
                $left_nav.attr('class','ui-desktop-left-nav-min');
            }
            jmenu.shrinkTabs();
        } );
        /*
        if(jmenu.leftNavFlag == 0){
            jmenu.leftNavFlag = 1;
            $('#nav_sh').toggle(function(){
                $left_nav.attr('class','ui-desktop-left-nav');
                jmenu.shrinkTabs();
            },function(){
                $left_nav.attr('class','ui-desktop-left-nav-min');
                jmenu.shrinkTabs();
            });
        }else if(jmenu.leftNavFlag == 1){
            jmenu.leftNavFlag = 0;
            $('#nav_sh').toggle(function(){
                $left_nav.attr('class','ui-desktop-left-nav-min');
                jmenu.shrinkTabs();
            },function(){
                $left_nav.attr('class','ui-desktop-left-nav');
                jmenu.shrinkTabs();
            });
        }
    */
        //在ipad下可以使用手势来展开和收起快捷菜单
		$("div.left-nav-body").touchwipe({
				min_move_x: 20,
				wipeLeft: function() {
					$('#popMenu').attr('class','ui-desktop-left-nav-min'); 
					jmenu.shrinkTabs();
					return false;},
				wipeRight: function() {
					$('#popMenu').attr('class','ui-desktop-left-nav');
					jmenu.shrinkTabs();
					return false;},
				preventDefaultEvents: true
		});
    },
    /**
     * 新添加的任务标签是否存在@可重构
     * @param ulCon 任务标签内层容器ul
     * @param tabName 待添加的任务标签模块 名称
     * @param moduleId 待添加的任务标签 模块id
     */
    isExist:function(ulCon,tabName,moduleId){
        var _index = -1;
        $.each(ulCon.find('>li'),function(index,li){
        	var $li = $(li);
        	var _moduleId = $li.attr('moduleid');
        	if(_moduleId != undefined && _moduleId === moduleId){
        		_index = jmenu.tabIndex = $li.index();
        		return false;
        	}
        });
        return _index;
    },
    /**
     * 1.已添加新的任务标签；2.选择已添加的任务标签
     * @param ulCon
     * @param tabName
     * @param moduleId
     */
    isVisible:function(ulCon,tabName,moduleId){
      var needScrollNum = 0;
      var myIndex = jmenu.isExist(ulCon,tabName,moduleId);
      var marginLeft = parseInt(ulCon.css('marginLeft').replace('px',''));
      var scrolledNum = 0,scrolledNum = marginLeft/jmenu.scrollStep;
      if(scrolledNum < 0){

        if((needScrollNum = -(myIndex + scrolledNum)) > 0){//1.在左侧隐藏区域
            return needScrollNum;
        }else{
        	//如果不还原,在后续判断中返回needScrollNum时，本意是0,得到的却不定是合意的值了
            needScrollNum = 0;
        }
      }
      var needWidth = (myIndex+1) * jmenu.oneTabWidth+2+scrolledNum*jmenu.scrollStep;
      needScrollNum = (needWidth < jmenu.visibleZoneWidth)?needScrollNum:(-1)*Math.ceil((needWidth-jmenu.visibleZoneWidth)/jmenu.scrollStep);
      return needScrollNum;
    },
    /**
     *
     * @param ulCon
     * @param scrollNum 有符号整数:正负表示滑动的方向,数值表示滑动的步子,这里表示滑动的时间数？
     */
    scrollTab:function(ulCon,scrollNum){
        var marginLeft = parseInt(ulCon.css('marginLeft').replace('px',''))
                                +scrollNum*jmenu.scrollStep;
		marginLeft = (marginLeft > 0)?0:marginLeft;                                
        ulCon.animate({'marginLeft':marginLeft},jmenu.scrollSpeed);
    },
    /**
     * 处理方式待细化
     * @param $mtTab 多任务标签ul容器的jquery对象
     */
    resize4Tabs:function($mtTab){
        jmenu.init();
        var $curTab = $mtTab.find('>li.tab_f');
        var tabName = $curTab.attr('tabname');
        var moduleId = $curTab.attr('moduleid');
        jmenu.scrollTab($mtTab,jmenu.isVisible($mtTab,tabName,moduleId));
        jmenu.scrollListener();
    },
    mtTabActive:function(ulCon,tabIndex){
        var $curTab = ulCon.find('>li').attr('class','tab_d').eq(tabIndex);
        $curTab.attr('class','tab_f');//.find('>a').text()
        jmenu.scrollTab(ulCon,jmenu.isVisible(ulCon,$curTab.attr('tabname'),$curTab.attr('moduleid')));
        jmenu.scrollListener();
    },
    /**
     * @param _pid 标签来源
     */
    addTab:function(ulCon,moduleUrl,tabName,moduleId,pid){
    	var _pid = pid || '';
    	if(jmenu.isMobile){
    		ulCon.find('li.tab_f').attr('class','tab_u').find('>a>span').attr('class','tab_close_d')//ipad x-1
	        //兼容ie7 将背景图片标签包裹在a下使加载图片拥有li的背景//ipad x-2
	        var $tabLi = '<li class="tab_f" moduleid="'+moduleId+'" tabname="'+tabName+'" moduleurl="'+moduleUrl+'" _pid="'+_pid+'"><a><label class="tab_loading"></label>'+jmenu.loadingTagName+'<span class="tab_close_f"></span></a></li>';/*class="tab_close_f"*/	
    	}else{
	        ulCon.find('li.tab_f').attr('class','tab_u')/*.find('>a>span').attr('class','tab_close_d')*///ipad x-1
	        //兼容ie7 将背景图片标签包裹在a下使加载图片拥有li的背景//ipad x-2
	        var $tabLi = '<li class="tab_f" moduleid="'+moduleId+'" tabname="'+tabName+'" moduleurl="'+moduleUrl+'" _pid="'+_pid+'"><a><label class="tab_loading"></label>'+jmenu.loadingTagName+'<span></span></a></li>';/*class="tab_close_f"*/
    	}
        ulCon.append($tabLi);
        jmenu.tabPageBorder(ulCon.find('>li').size());
    },
    addIframe:function($iframeCon,moduleId,moduleUrl){
        var iframe = '<iframe moduleid="'+moduleId+'" src="'+moduleUrl+'" class="ui-desktop-pages-iframe" scrolling="auto" frameborder="0" style="display:block;border:none;" name="pageIframe"></iframe>';
        $(iframe).appendTo($iframeCon).css({
            'height':jmenu.iframe_h+'px',
            'width':jmenu.iframe_w+'px',
            'display':'none'
        });
        /**
		 * @fix刷新+关闭->造成选中标签和内容页不匹配的问题修改
		 */
		 var $curTab = $('#mtTab>li.tab_f');
		 var $curIframe = $iframeCon.find('>iframe:visible');
		 if($curTab.size() != 0){
		 	var curId = $curTab.attr('moduleid');
		 	//modify huanghui@2012-4-20 当“更多”为外面连接时，moduleid = “”，需要将其定位到新开的页签中
		 	//if(curId && curId !== $curIframe.attr('moduleid')){
		 		jmenu.showIframe($iframeCon,curId);
		 	//}
		 }
    },
    hideIframe:function($iframeCon){
        $iframeCon.find('>iframe').css({'display':'none','height':'0'});
    },
    showIframe:function($iframeCon,moduleId){
        jmenu.hideIframe($iframeCon);
        $iframeCon.find('>iframe[moduleid="'+moduleId+'"]').css({'display':'block','height':jmenu.iframe_h});
    },
    removeIframe:function($iframeCon,moduleId){
        $iframeCon.find('>iframe[moduleid="'+moduleId+'"]').attr('src','').remove();
    },
    /**
     * 删除多任务标签
     * @param ulCon
     * @param tabName
     * @param moduleId
     */
    removeTab:function(ulCon,tabName,moduleId){
    
        var myIndex = jmenu.isExist(ulCon,tabName,moduleId);
        var $removeTab = ulCon.find('>li').eq(myIndex);
        if($removeTab.attr('class') == 'tab_f'){
        	/**
        	 * 如果来源标签不为空,则:1.刷新该标签;2.选中该标签;==>1
        	 */
        	var _pid = $removeTab.attr('_pid');
        	var $pTab = ulCon.find('>li[moduleid="'+_pid+'"]');
        	var $nextTab = null;
        	if(jmenu.removeChain === 0 && $pTab.size() === 1){
                $removeTab.remove();
        		$nextTab = $pTab;
                var moduleId = $pTab.attr('moduleid');
                var moduleurl = $pTab.attr('moduleurl');
                var tabName = $pTab.attr('tabname');
                $pTab.attr('class','tab_f');
                jmenu.refreshMe(ulCon,$("#pages"),moduleId,tabName,moduleurl);
        	}else{
	            var $nextTab = (ulCon.find('>li:last').index()==myIndex)?$removeTab.prev('li'):$removeTab.next('li');
                var nextmoduleid = $nextTab.attr('moduleid');
                $removeTab.remove();
                jmenu.showIframe($('#pages'),nextmoduleid);
                jmenu.mtTabActive(ulCon,$nextTab.index());
        	}
        }else{
            $removeTab.remove();
	        if(parseInt(ulCon.css('marginLeft').replace('px',''),10)<0){
	            jmenu.scrollTab(ulCon,1);
	        }
        }
        jmenu.scrollListener();
        jmenu.tabPageBorder(ulCon.find('>li').size());
        //删除时刷新
        var moduleid = jmenu.tabRefreshMap[moduleId];
        if(moduleid != undefined){
    		var $refreshTab = ulCon.find('>li[moduleid="'+moduleid+'"]'); 
    		if($refreshTab.length === 1){
    			var $iframeCon = $('#pages');
    			var tabName = $refreshTab.attr('tabname'); 
    			var moduleurl = $refreshTab.attr('moduleurl');
    			jmenu.refreshMe(ulCon,$iframeCon,moduleid,tabName,moduleurl); 
    		}	
        }
    },
    removeAll:function($mtTab,$iframeCon){
    	$mtTab.html('');
    	$iframeCon.html('');
    	jmenu.tabPageBorder(0);
    },
    removeOthers:function($mtTab,$iframeCon,moduleid){
    	$iframeCon.find('>iframe[moduleid!="'+moduleid+'"]').remove();
    	$mtTab.find('>li[moduleid!="'+moduleid+'"]').remove();
    	var $onlyOne = $mtTab.find('>li').attr('class','tab_f');
    	var tabName = $onlyOne.attr('tabname');
    	var myIndex = $onlyOne.index();
    	var moduleId = $onlyOne.attr('moduleid');
        jmenu.mtTabActive($mtTab,myIndex);
        jmenu.showIframe($iframeCon,moduleId);
    },
    /**
     * @param loadFlag 如果设定了值 则为静默刷新(换肤) 不执行iframeLoading方法
     */
    refreshMe:function($mtTab,$iframeCon,moduleid,tabName,moduleurl,loadingFlag){
    	jmenu.removeIframe($iframeCon,moduleid);
    	jmenu.addIframe($iframeCon,moduleid,moduleurl);
    	if(loadingFlag === undefined){
	    	var $tab = $mtTab.find('>li[moduleid="'+moduleid+'"]');
            var $tabA = $tab.find(">a"); 
	    	$tabA.html($tabA.html().replace(jmenu.lenUtil($tab.attr("tabname")),jmenu.loadingTagName))
	    	    .find('>label').attr('class','tab_loading'); 
    	}
    	jmenu.iframeLoading($mtTab,$iframeCon,moduleid,tabName);
    },
    /**
     * 滑动能力检测-内部调用
     * 添加、删除、激活选中
     * 1.scrollTab
     * 2.mtTabActive
     * 3.为可滑动的左右滑动图标添加滑动事件
     */
    scrollListener:function(){
        var $mtTab = $('#mtTab');
        var $mtScrollLeft = $('#scrllLeft');
        var $mtScrollRight = $('#scrllRight');
        var $mtScrollLine = $('#scrllLine');
        var marginLeft = parseInt($mtTab.css('marginLeft').replace('px',''));
        var tabNum = $mtTab.find('>li').length;
        var scrollFlag = {'lFlag':0,'rFlag':0};
        scrollFlag.lFlag = (marginLeft <0)?0:1;
        scrollFlag.rFlag = (tabNum * jmenu.oneTabWidth + 2)+marginLeft > jmenu.visibleZoneWidth ?0:1;
        if(scrollFlag.lFlag == 0){
			$mtScrollLeft.attr('class','tab_scrll_left_able');
        }else if(scrollFlag.lFlag == 1){
        	$mtScrollLeft.attr('class','tab_scrll_left');
        }
        if(scrollFlag.rFlag == 0){
			$mtScrollRight.attr('class','tab_scrll_right_able');
        }else if(scrollFlag.rFlag == 1){
        	$mtScrollRight.attr('class','tab_scrll_right');
        } 
        if(scrollFlag.lFlag == 1 && scrollFlag.rFlag == 1){
        	$mtScrollLeft.attr('class','tab_scrll_left');
        	$mtScrollRight.attr('class','tab_scrll_right');
        }
    },
    /**
     * @2011-10-24
     * @标签正在加载中
     * @param $mtTab 多任务标签容器 jquery obj
     * @param $iframeCon 内容区iframe容器
     * @param moduleid 正在加载中标签的模块ID
     */
    iframeLoading:function($mtTab,$iframeCon,moduleid,tabName){
		$iframeCon.find('>iframe[moduleid="'+moduleid+'"]').bind("load",function(){
			//开锁
			if(jmenu.isMobile && jmenu.ipadLockSignal) jmenu.ipadLockSignal = false;
            var tabHtml = '';
            if ( jmenu.isMobile ) {
                if ( jmenu.ipadLockSignal ) {
                    jmenu.ipadLockSignal = false;
                }  
                //触屏设备下默认显示关闭任务标签的X
                tabHtml = '<label class=""></label>'+jmenu.lenUtil(tabName)+'<span class="tab_close_f"></span>';
            } else {
                tabHtml = '<label class=""></label>'+jmenu.lenUtil(tabName)+'<span></span>';    
            }
			var $tab = $mtTab.find('>li[moduleid="'+moduleid+'"]');
            $tab.attr("title",tabName).attr("tabname", tabName).find(">a").html(tabHtml);
            //modify huanghui@2012-4-18 加入高度计算，导致所有页面一直都有多余滚动条。将其去掉
			//var height = jmenu.isMobile?'100%': parseInt($(this).height(),10) + "px";
			//this.contentWindow.document.body.style.height = height;
		});    	
    },
    /**
     *@是否隐藏显示多任务标签区标签
     *@调用:在添加、删除时调用 
     *@flag 
     */
    tabPageBorder:function(flag){
    	if(flag != undefined && flag === 0){
	    	$('#tabOuterCon>ul').css('visibility','hidden');
	    	$('#mtTabsOuterCon>div.tab_scrll').css('visibility','hidden');
    	}else{
	    	$('#tabOuterCon>ul').css('visibility','visible');
	    	$('#mtTabsOuterCon>div.tab_scrll').css('visibility','visible');
    	}		
    },
    lenUtil:function(str,len) {
    	if(!!str){
	    	var l = len || jmenu.tabLen;
            if ( /^[a-zA-z0-9-_\s]+$/.test(str) ) {
                l = 2*l -1;
            }
	    	return str.length>l?str.substring(0,l)+'...':str;
    	}else{
    		 return "_lenUtil_"+new Date().getTime();
    	}
    },
    /**
     * 点击X关闭标签后滑动回调方法
     * 逻辑:如果允许的标签数>=已有的标签数,则左偏移值为0;
     * 		否则
     * 			1,如果当前选中标签的序数>=允许的标签数,则将选中标签放置在可视区最后一个（滑动步数=新隐藏数-旧隐藏数）;
     * 			2,如果选中标签序数<允许的标签数,则左偏移值为0>
     */
    closeTabShrink:function($mtTab){
    	//在ipad下页面关闭时报错$mtTab没有定义undefined， huanghui@2012-3-16
    	if($mtTab==null ||$mtTab=="" ||$mtTab=='undefined'){  
    	}else{
    		var marginLeft = parseInt($mtTab.css("marginLeft"),10);
	    	if(marginLeft >= 0) return;
	    	var	leftHiddenNum = Math.abs(marginLeft/jmenu.scrollStep),
	    		allTabNum = $mtTab.find(">li").length,
	    		allowNum = Math.round(jmenu.visibleZoneWidth/jmenu.oneTabWidth),
	    		currentTabOrdinalNum = $mtTab.find(">li.tab_f").index()+1,//序数
	    		scrollNum = 0;
			 if(allowNum >= allTabNum){
			 	scrollNum = leftHiddenNum;
			 }else {
			 	if(currentTabOrdinalNum <= allowNum){
			 		scrollNum = leftHiddenNum;
			 	}else{	
	  				scrollNum = leftHiddenNum - Math.ceil((currentTabOrdinalNum * jmenu.oneTabWidth+2-jmenu.visibleZoneWidth)/jmenu.scrollStep);
			 	}
			 }
	    	jmenu.scrollTab($mtTab,scrollNum);
    	}
    }
    
};
//对外调用的接口 开始
//====>操作多任务标签
/**
 * 在多任务标签区打开新的标签-通过模块ID发送到后台，获取连接?
 * (1)应用中-开始时，可考虑将moduleurl页存储
 * (2)工作台-全文检索等
 * @param moduleid 菜单模块ID
 */
function openTarget(moduleId){};
/**
 * 在多任务标签区打开新的标签
 * @param url 资源连接
 * @param tabName 标签名称
 * @param moduleId 菜单模块ID
 * @param _pid 调用该方法时对应的标签的id(在需要定制关闭标签时选中特定标签时使用;普通的使用可不传入该参数)
 */
function openTargetByUrl(url0,tabName,moduleId,_pid){
	//modify huanghui@2012-4-13 浏览器
	if(tabName=='undefined' || tabName == '' || tabName==null){
		tabName = "办理事项";
	}
	if(jmenu.isMobile){
		if(jmenu.ipadLockSignal){
			return;
		}else{
			jmenu.ipadLockSignal = true;//加锁
		}
	}
    var $mtTab = $('#mtTab');
    var $iframeCon = $('#pages');
    var url = url0;
    if(url != '' && url != null){
    	url += (url0.indexOf('?') != -1)?'&moduId='+moduleId+'&licenseId='+moduleId:'?moduId='+moduleId;
    }
    url += '&licenceId='+moduleId;
    var myIndex = jmenu.isExist($mtTab,tabName,moduleId);
    if( myIndex == -1){
        jmenu.addTab($mtTab,url,tabName,moduleId,_pid);
        jmenu.addIframe($iframeCon,moduleId,url);
        myIndex = $mtTab.find('>li:last').index();
        jmenu.mtTabActive($mtTab,myIndex);
        jmenu.iframeLoading($mtTab,$iframeCon,moduleId,tabName);
    }else{
        jmenu.mtTabActive($mtTab,myIndex);
    	if(jmenu.openFresh === 0){
    		jmenu.refreshMe($mtTab,$iframeCon,moduleId,tabName,url);	
    	}else{
	        jmenu.showIframe($iframeCon,moduleId);
    	}
    }
};
/**
 * @通过标签id关闭标签、删除对应的内容页
 * @调用:获取手界面顶级窗口的window对象 win 调用win.removeById(moduleid);
 */
function removeById(moduleid){
	var $mtTab = $('#mtTab');
    var $iframeCon = $('#pages');	
	var $curTab = $mtTab.find('>li[moduleid="'+moduleid+'"]');
	if($curTab.size() === 1){
		var tabName = $curTab.attr('tabname');
		jmenu.removeTab($mtTab,tabName,moduleid);
		jmenu.removeIframe($iframeCon,moduleid);
	}
};
/**
 * @销毁当前选择标签-一般在标签页面中操作标签时使用
 */
function destoryMe(){
	var $mtTab = $('#mtTab');
    var $iframeCon = $('#pages');	
	var $curTab = $mtTab.find('>li.tab_f');
	if($curTab.size() === 1){
		var moduleid = $curTab.attr('moduleid');
		var tabName = $curTab.attr('tabname');
		jmenu.removeTab($mtTab,tabName,moduleid);
		jmenu.removeIframe($iframeCon,moduleid);
	}
};
/**
 * @param moduleid 关闭是需要刷新的标签 模块ID
 * @是否在标签中关联需要刷新的标签对象
 */
function closeRefresh(moduleid){
	var $mtTab = $('#mtTab');
    var $iframeCon = $('#pages');
    var $targetTab = $mtTab.find('>li[moduleid="'+moduleid+'"]');
    if($targetTab.size()){//#存在时刷新
    	var moduleurl = $targetTab.attr('moduleurl');
    	var tabName = $targetTab.attr('tabname');
    	jmenu.refreshMe($mtTab,$iframeCon,moduleid,tabName,moduleurl);	
    }			
};
/**
 * @给工作台打开操作再做一层封装 避免链接修改时到处更改
 * @param flag 不传入参数表示新开;传入参数 表示应用在以业务办理类型方式调用 此时存在时刷新;不存在则不进行刷新动作
 */
function workBenchTab(flag){
	var $mtTab = $('#mtTab');
	var moduleId = 'workBench';
	var tabName = $.trim($("#workspace").text());//'工作台';//兼容国际化处理使用session中的值
	var url0 = '../portalwb/portalwb-wb!workShow.action';
	if(flag){
		//#在业务办理类型中调用
		var myIndex = jmenu.isExist($mtTab,tabName,moduleId);
		if( myIndex !== -1){
			openTargetByUrl(url0,tabName,moduleId);	
		}
	}else{
		//#新开
		openTargetByUrl(url0,tabName,moduleId);
	}
};
//对外调用的接口 结束
/**
 * 职责:
 * (1)菜单初始化
 * (2)绑定快捷菜单的响应事件
 * (3)绑定多任务标签的响应事件+ipad
 */
$(function(){
	$(document).bind("selectstart",function(){return false;});//不能选中
	'ontouchstart' in window && document.addEventListener('touchmove',function(e){e.preventDefault();e.stopPropagation();},false);
	var moduleId_morePoint = 'morePoint';
    var $mtTab = $('#mtTab');
    var $iframeCon = $('#pages');
    var $morePopCon = $('#morePopMenu');
    jmenu.init();
    workBenchTab();
    jmenu.leftNavShrink();
    $(window).resize(function(){
        jmenu.resize4Tabs($mtTab);
    });
    //快捷菜单点击事件
    $('#popNav>ul>li,#menuPopTreeUL>li').live({
        'click':function(e){
            var $li = $(this);
            var moduleId = $li.attr('moduleid');
            if(moduleId_morePoint != moduleId){
            	//借用快捷菜单中的title取菜单的全名
	            //var tabName = $li.find('>a>label').text();
	            var tabName = $li.attr('title');
	            var moduleUrl = $li.attr('moduleurl');
	            openTargetByUrl(moduleUrl,tabName,moduleId);
	            $morePopCon.css('display','none');
            }
            /*desc by gaona 点击主框架左侧菜单影藏展开的时间控件 at 2012-04-12 begin*/
            if('ontouchstart' in document.documentElement){
       			//由于在日历控件中进行了配置==>日历组件都附加在主框架所在的window之下,可以采用下面的方式来关掉日历组件
               	window.top.$dp && window.top.$dp.dd && (window.top.$dp.dd.style.display = 'none'); 
            }
            /*desc by gaona 点击主框架左侧菜单影藏展开的时间控件 at 2012-04-12 end*/
        }
    });
    //多任务标签区响应事件
    $('#mtTab>li').live({
        click:function(e){
            var $tab = $(this);
            var tabName = $tab.attr('tabname');
            var moduleId = $tab.attr('moduleid');
            var myIndex = $tab.index();
            var $target = $(e.target);
            if(!$target.is('span')){
                //选中标签
                jmenu.mtTabActive($mtTab,myIndex);
                jmenu.showIframe($iframeCon,moduleId);
            }else{
                //删除标签
                jmenu.removeIframe($iframeCon,moduleId);
                jmenu.removeTab($mtTab,tabName,moduleId);
                jmenu.closeTabShrink($mtTab);
            }
        },
        dblclick: function() {//#双击关闭标签
        	if( ! jmenu.dblClose ) return;
           	var $tab = $(this);
            var tabName = $tab.attr('tabname');
            var moduleId = $tab.attr('moduleid');
            jmenu.removeIframe($iframeCon,moduleId);
            jmenu.removeTab($mtTab,tabName,moduleId);
            jmenu.closeTabShrink($mtTab);
        },
        mouseover:function(e){
            var $tab = $(this);
            var tabClass = $tab.attr('class');
            if(tabClass != 'tab_f'){
                $tab.attr('class','tab_d');
            	$tab.find('>a>span').attr('class','tab_close_d');
            }else{
            	$tab.find('>a>span').attr('class','tab_close_f');
            }

        },
        mouseout:function(e){
            var $tab = $(this);
            var tabClass = $tab.attr('class');
            if(tabClass != 'tab_f'){
                $tab.attr('class','tab_u');
                /*长期显示X时的样式切换
                $tab.find('>a>span').attr('class','tab_close_d');
            }else{
            	$tab.find('>a>span').attr('class','tab_close_f');		
            }*/
            /** */
            }
            $tab.find('>a>span').attr('class','');
        }
    });
	//为多任务标签区绑定事件 开始
	$('#scrllLeft').click(function(){
		if($(this).attr('class') == 'tab_scrll_left_able'){
			jmenu.scrollTab($mtTab,1);
			jmenu.scrollListener();		
		}
	});
	$('#scrllRight').click(function(){
		if($(this).attr('class') == 'tab_scrll_right_able'){
			jmenu.scrollTab($mtTab,-1);
			jmenu.scrollListener();		
		}
	});
	//为多任务标签区绑定事件 结束	
	/**
	 * @触屏设备-多任务标签的操作
	 * @封装
	 * @2011-12-12
	 * 该种实现方式太灵敏了
	 */
	if('ontouchstart' in document.documentElement){
	    var deltaX = null;
	    var touchScale = 20;
	    var tapTimeout = 750;
	    var holdSignal = false;
	    var timeSignal = null;
	    var ulConDom = document.getElementById('mtTab');
	    /**
	     * 处理单指触屏事件（tap点击、滑动）
	     * 记录触点
	     */
	    function touchStart(e){
	        if(jmenu.ipadLockSignal || e.touches.length !== 1){//锁定时不响应
	            return false;
	        }else{
		        deltaX = e.touches[0].pageX;//触点X坐标
		        touchFlag = 1 ;
		        ulConDom.addEventListener('touchmove',touchMove,false);
		        timeSignal = setTimeout(function(){
		            holdSignal = true;
		        },tapTimeout);
	        }
	    };
	    /**
	     * 滑动过程处理
	     * 1.获取滑动意图
	     * 2.触发滑动点击动作
	     * @param e 事件对象
	     */
	    function touchMove(e){
	    	e.preventDefault();//阻止默认行为
	        if(e.touches.length !== 1){
	            return;
	        }
	        deltaX = e.touches[0].pageX - deltaX;
	        deltaX = parseInt(deltaX,10);
	        /*if(Math.abs(deltaX)>=touchScale){
	            if(deltaX > 0){
	                $('#scrllLeft').trigger('click');
	            }else if(deltaX < 0){
	                $('#scrllRight').trigger('click');
	            }
	        }*/
	        /*desc by gaona at 2012-03-22 begin*/
	        if(touchFlag){
	            if(deltaX > 0){
	                $('#scrllLeft').trigger('click');
	            }else if(deltaX < 0){
	                $('#scrllRight').trigger('click');
	            }
	            touchFlag = 0 ;
	        }
	        /*desc by gaona at 2012-03-22 end*/
	    };
	    function touchTap(e){
	    	if(jmenu.ipadLockSignal) return false;
	        timeSignal = deltaX = null;
	        holdSignal = false;
	        //执行选中-点击事件
	        var target = e.target;    
	        if(target != null){
	        	while(target.nodeType === 3) target = target.parentNode;
	        	var nodeName = target.nodeName;
	        	var li = null;
	        	if(nodeName === 'SPAN'){
	        		//关闭标签 删除标签
	        		li = target.parentNode.parentNode;
	        		var moduleId = li.getAttribute('moduleid');
	        		var tabName = li.getAttribute('tabname');
                	jmenu.removeIframe($('#pages'),moduleId);
                	jmenu.removeTab($('#mtTab'),tabName,moduleId);
                	jmenu.closeTabShrink($mtTab);//
                	return false;
	        	}else if(nodeName === 'LABEL' || nodeName === 'A'){
	        		li = target.parentNode;
	        	}else if(nodeName === 'LI'){
	        		li = target;	
	        	}
	        	if(li != null){
	        		//选中标签
	        		var $mtTab = $('#mtTab');
	        		var $iframeCon = $('#pages');
	        		/*desc by gaona 点击主框架左侧菜单影藏展开的时间控件 at 2012-04-12 begin*/
	        		if('ontouchstart' in document.documentElement){
	        		/*desc by gaona 点击主框架左侧菜单影藏展开的时间控件 at 2012-04-12 end*/
	        			//由于在日历控件中进行了配置==>日历组件都附加在主框架所在的window之下,可以采用下面的方式来关掉日历组件
	                	window.top.$dp && window.top.$dp.dd && (window.top.$dp.dd.style.display = 'none'); 
	                }
	        		var moduleId = li.getAttribute('moduleid');
	        		var tabName = li.getAttribute('tabname');
	        		var myIndex = $(li).index();
	                jmenu.mtTabActive($mtTab,myIndex);
	                jmenu.showIframe($iframeCon,moduleId);
	        	}
	        	
	        }
	    };
	    ulConDom.addEventListener('touchstart',touchStart,false);
	    ulConDom.addEventListener('touchend',touchTap,false);
	    ulConDom.addEventListener('touchcancel',function(){
	    	ulConDom.removeEventListener('touchmove', touchMove);	
	    },false);
	}
    $(document).click(function(){
        /*desc by gaona 点击主框架左侧菜单影藏展开的时间控件 at 2012-04-12 begin*/
        if('ontouchstart' in document.documentElement){
        /*desc by gaona 点击主框架左侧菜单影藏展开的时间控件 at 2012-04-12 end*/
          //由于在日历控件中进行了配置==>日历组件都附加在主框架所在的window之下,可以采用下面的方式来关掉日历组件
              window.top.$dp && window.top.$dp.dd && (window.top.$dp.dd.style.display = 'none'); 
        }
    });
});
/*
	_changeLog_
	2012-01-13:整理滑动调用函数、添加动画效果
	2012-02-03:删除任务标签时-标签的滑动效果需要跟踪调整(closeTabShrink;IPAD下未测)
	2012-02-20:双击关闭多任务标签,添加开关dblClose控制是否执行
	2012-02-27:给任务标签添加title(addTab)
	2012-03-02:规范注释+中文转unicode 
    2012-04-25:同id不同名称url的菜单问题处理(在线人数、网络寻呼)
    2012-06-04:处理快捷菜单在部分浏览器(ff,safari)下窗口重置时收缩的问题、收缩事件需要触发后才正常的问题
    2012-06-28:处理jQuery属性选择器属性值存在空格的问题(在国际化中)
    2012-06-28:字节长度、字符长度(国际化时长度计算的优化)<由于汉字在utf-8编码中由3、4字节表示,此时,只是简单的将纯字母数字的,长度=2原长度-1>
*/