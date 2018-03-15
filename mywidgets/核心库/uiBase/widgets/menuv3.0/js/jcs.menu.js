/**
 * @作者 张文钦
 * @时间
 * @描述
 * @关联文件 jquery-1.5.2.js
 */
/*命名空间*/
var jmenu = {
    version:'1.0',
    leftNavFlag:0,
    scrollSpeed:600,
    scrollStep:100,
    oneTabWidth:145,
    loadingTagName:'正在加载...',
    visibleZoneWidth:0,
    tabIndex:-1,/*当前选中任务标签的下标*/
    iframe_h:'100%',
    iframe_w:'100%',
    scrollWidth:function(){
        /***内容区iframe的宽***/
        var $pages = $('#pages');
        jmenu.iframe_w = $pages.width() - 2;//-1
        $pages.find('>iframe').width(jmenu.iframe_w);
    },
    scrollHeight:function(){
        /**************************************/
        var win_h = $(window).height();
        var head_h = $('#head').height();
        var foot_h = $('#foot').height();
        var middle_h = win_h -(head_h+foot_h);
        $('#middle').height(middle_h);/*测试 477 478*/
        var $popMenu = $('#popMenu');
        var popMenu_h = middle_h -75;
        $popMenu.height(popMenu_h);
        /******快捷菜单内层容器的高*************/
        var extra_h = 40 + 2;
        var popNav_h = popMenu_h - extra_h;
        $('#popNav').height(popNav_h);
    /*-------------------------------------*/
        var jcsDiv = $('#jcsDiv');
        var mtTabs_h = $('#mtTabsOuterCon').height();//34
        var $pages = $('#pages');
        var page_h = middle_h - mtTabs_h;
        jmenu.iframe_h = page_h -10;//-1
        $('#pages').height(page_h-9).find('>iframe').height(jmenu.iframe_h);//-1
    /***************************************/
    },
    init:function(){
        jmenu.visibleZoneWidth = $('#tabOuterCon').width();
        jmenu.scrollWidth();
        jmenu.scrollHeight();
        if(jmenu.leftNavFlag == 0){
            $('#popMenu').attr('class','ui-desktop-left-nav-min');
            jmenu.leftNavFlag == 1;
        }else if(jmenu.leftNavFlag == 1){
            $('#popMenu').attr('class','ui-desktop-left-nav');
            jmenu.leftNavFlag == 0;
        }
    },
    /**
     * shrink时滑动多任务标签区
     */
    shrinkTabs:function(){
/****************************************************************/
        jmenu.visibleZoneWidth = $('#tabOuterCon').width();
        jmenu.scrollWidth();
        jmenu.scrollHeight();
        /**
         * 多任务标签区域存在标签时，滑动(存在标识的修改)
         */
        var $mtTab = $('#mtTab');
        if($mtTab.find('>li').length > 0){
            var $curTab = $mtTab.find('>li.tab_f');
            var tabName = $curTab.find('>a').text();
            var moduleId = $curTab.attr('moduleid');
            jmenu.scrollTab($mtTab,jmenu.isVisible($mtTab,tabName,moduleId));
        }
        /*关闭更多快捷菜单*/
		pfloat.popMore = -1;
    	$("#morePopMenu").css("display","none");
/****************************************************************/
    },
    leftNavShrink:function(){
         /*快捷菜单收起和弹出状态切换*/
        var $left_nav = $('#popMenu');
        if(jmenu.leftNavFlag == 0){
            jmenu.leftNavFlag == 1;
            $('#nav_sh').toggle(function(){
                $left_nav.attr('class','ui-desktop-left-nav');
                jmenu.shrinkTabs();
            },function(){
                $left_nav.attr('class','ui-desktop-left-nav-min');
                jmenu.shrinkTabs();
            });
        }else if(jmenu.leftNavFlag == 1){
            jmenu.leftNavFlag == 0;
            $('#nav_sh').toggle(function(){
                $left_nav.attr('class','ui-desktop-left-nav-min');
                jmenu.shrinkTabs();
            },function(){
                $left_nav.attr('class','ui-desktop-left-nav');
                jmenu.shrinkTabs();
            });
        }
        $('#subMenu>ul>li').live('click',function(e){
            $('#subMenu>ul>li').removeClass();
            $(this).attr('class','active');
        });
    },
    /**
     * 新添加的任务标签是否存在
     * @param ulCon 任务标签内层容器ul
     * @param tabName 待添加的任务标签模块 名称
     * @param moduleId 待添加的任务标签 模块id
     * @TODO:测试在得到相等值后不进行后续的循环
     */
    isExist:function(ulCon,tabName,moduleId){
        var _index = -1;
        /*
        ulCon.find('>li').each(function(){
            //var _tabName = $.trim($(this).find('>a').text());
            var _moduleId = $(this).attr('moduleid');//正在加载中...需要将标签名称存储
            if( moduleId == _moduleId){//_tabName == tabName
//                _index = $(this).index();
//                jmenu.tabIndex = function(i){
//                    return function(i){return i;}
//                }($(this).index());
                _index = jmenu.tabIndex = $(this).index();
//                alert('标签名称:'+tabName+'\n\rmyIndex:'+_index+'\n\r第个:'+(_index+1));
				//return false;
            }
        });*/
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
      var needScrollNum = 0/*-1*/;
      var myIndex = jmenu.isExist(ulCon,tabName,moduleId);
      var marginLeft = parseInt(ulCon.css('marginLeft').replace('px',''));
      var scrolledNum = 0,scrolledNum = marginLeft/jmenu.scrollStep;
      //var tabNum = ulCon.find('>li').length;
//      if(myIndex <= 1-scrolledNum){/*1.在左侧隐藏区域*/
//          needScrollNum = scrolledNum - myIndex;
//      }else{
      if(scrolledNum < 0){

        if((needScrollNum = -(myIndex + scrolledNum)) > 0){/*1.在左侧隐藏区域*/
//            alert(myIndex+'\n\r'+scrolledNum);
            return needScrollNum;
        }else{
            needScrollNum = 0;/*如果不还原,在后续判断中返回needScrollNum时，本意是0,得到的却不定是合意的值了*/
        }
      }
      //var needWidth = (myIndex+scrolledNum+1) * jmenu.oneTabWidth + 2;
      var needWidth = (myIndex+1) * jmenu.oneTabWidth+2+scrolledNum*jmenu.scrollStep;
      needScrollNum = (needWidth < jmenu.visibleZoneWidth)?needScrollNum:(-1)*Math.ceil((needWidth-jmenu.visibleZoneWidth)/jmenu.scrollStep);
//      if(needScrollNum != 0){
//          alert('myIndex:'+myIndex
//          +'\n\rscrolledNum:'+scrolledNum
//          +'\n\rneedWidth:'+needWidth
//          +'\n\rvw:'+jmenu.visibleZoneWidth
//          +'\n\rneedScrollNum:'+needScrollNum);
//      }
//      }
      return needScrollNum;
    },
    /**
     *
     * @param ulCon
     * @param scrollNum 有符号整数:正负表示滑动的方向,数值表示滑动的步子,这里表示滑动的时间数？
     */
    scrollTab:function(ulCon,scrollNum){
        //alert('needScrollNum:'+scrollNum);
        var marginLeft = parseInt(ulCon.css('marginLeft').replace('px',''))
                                +scrollNum*jmenu.scrollStep;
		marginLeft = (marginLeft > 0)?0:marginLeft;                                
        /*ulCon.animate({'marginLeft':marginLeft},jmenu.scrollSpeed);*/
        ulCon.css('marginLeft',marginLeft);
        /*测试*/jmenu.scrollListener();
    },
    /**
     * 处理方式待细化
     * @param $mtTab 多任务标签ul容器的jquery对象
     */
    resize4Tabs:function($mtTab){
        jmenu.init();
        var $curTab = $mtTab.find('>li.tab_f');
        var tabName = $curTab.find('>a').text();
        var moduleId = $curTab.attr('tabmoduleid');
        jmenu.scrollTab($mtTab,jmenu.isVisible($mtTab,tabName,moduleId));
    },
    mtTabActive:function(ulCon,tabIndex){
        ulCon.find('>li').attr('class','tab_d').eq(tabIndex).attr('class','tab_f');
        /*测试*/jmenu.scrollListener();
    },
    addTab:function(ulCon,moduleUrl,tabName,moduleId){
        ulCon.find('li.tab_f').attr('class','tab_u');
        //(tabName.length>7)?tabName.substring(0,6)+'...':tabName
        //var $tabLi = '<li class="tab_f" moduleid="'+moduleId+'" moduleurl="'+moduleUrl+'"><a>'+tabName+'<span class=""></span></a></li>';
        //var $tabLi = '<li class="tab_f" moduleid="'+moduleId+'" moduleurl="'+moduleUrl+'"><label class="tab_loading"></label><a>'+jmenu.loadingTagName+'<span class=""></span></a></li>';
        //兼容ie7 将背景图片标签包裹在a下使加载图片拥有li的背景
        var $tabLi = '<li class="tab_f" moduleid="'+moduleId+'" moduleurl="'+moduleUrl+'"><a><label class="tab_loading"></label>'+jmenu.loadingTagName+'<span class=""></span></a></li>';
        ulCon.append($tabLi);
        jmenu.tabPageBorder(ulCon.find('>li').size());
    },
    addIframe:function($iframeCon,moduleId,moduleUrl){
        jmenu.hideIframe($iframeCon);
        var iframe = '<iframe moduleid="'+moduleId+'" src="'+moduleUrl+'" class="ui-desktop-pages-iframe" scrolling="auto" frameborder="0" style="display:block;"></iframe>';
        $(iframe).appendTo($iframeCon).css({
            'height':jmenu.iframe_h+'px',
            'width':jmenu.iframe_w+'px'
        }); /*需要测试*/
    },
    hideIframe:function($iframeCon){
        $iframeCon.find('>iframe').css('display','none');
    },
    showIframe:function($iframeCon,moduleId){
        jmenu.hideIframe($iframeCon);
        $iframeCon.find('>iframe[moduleid="'+moduleId+'"]').css('display','block');
    },
    removeIframe:function($iframeCon,moduleId){
        $iframeCon.find('>iframe[moduleid="'+moduleId+'"]').remove();
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
            //var $nextTab = $removeTab.is(':last')?$removeTab.prev('li'):$removeTab.next('li');
            var $nextTab = (ulCon.find('>li:last').index()==myIndex)?$removeTab.prev('li'):$removeTab.next('li')
            var nextmoduleid = $nextTab.attr('moduleid');
    //        $removeTab.remove(jmenu.scrollSpeed,function(){
    //
    //        });
            $removeTab.remove();
            var tabName = $.trim($nextTab.find('>a').text());
            jmenu.scrollTab(ulCon,jmenu.isVisible(ulCon,tabName,''));
            jmenu.showIframe($('#pages'),nextmoduleid);
            jmenu.mtTabActive(ulCon,$nextTab.index());
//            if($removeTab.is('.tab_f')){
//                jmenu.mtTabActive(ulCon,$nextTab.index());
//            }
        }else{
            $removeTab.remove();
        }
/************任务标签滑动*******************************/
        if(parseInt(ulCon.css('marginLeft').replace('px',''))<0){
            jmenu.scrollTab(ulCon,1);
        }
        jmenu.scrollListener();
        jmenu.tabPageBorder(ulCon.find('>li').size());
    },
    removeAll:function($mtTab,$iframeCon){
    	$mtTab.html('');
    	$iframeCon.html('');
    	/*更新多任务区扩展操作区图片按钮样式*/
    	jmenu.tabPageBorder(0);
    },
    removeOthers:function($mtTab,$iframeCon,moduleid){
    	$iframeCon.find('>iframe[moduleid!="'+moduleid+'"]').remove();
    	$mtTab.find('>li[moduleid!="'+moduleid+'"]').remove();
    	/*jmenu.mtTabActive($mtTab,0);*/
    	var $onlyOne = $mtTab.find('>li').attr('class','tab_f');
    	var tabName = $onlyOne.find('')
    	var myIndex = $onlyOne.index();
    	var moduleId = $onlyOne.attr('moduleid');
    	jmenu.scrollTab($mtTab,jmenu.isVisible($mtTab,tabName,moduleId));
        jmenu.mtTabActive($mtTab,myIndex);
        jmenu.showIframe($iframeCon,moduleId);
    },
    refreshMe:function($mtTab,$iframeCon,moduleid,tabName,moduleurl){
    	//$iframeCon.find('>iframe[moduleid=="'+moduleid+'"]').get(0).contentWindow.location.reload();
    	//moduleurl += (moduleurl.indexOf('?') > 0)?'&_nocache='+Math.random():'?_nocache='+Math.random();
    	//alert('→←'+moduleurl);
    	//$iframeCon.find('>iframe[moduleid=="'+moduleid+'"]').attr('src',moduleurl);
    	//var $iframeMe = $iframeCon.find('>iframe[moduleid=="'+moduleid+'"]');
    	/**
    	 * 更新多任务标签区加载中形态
    	 * <label class="tab_loading"></label><a>工作台<span class=""></span></a> 
    	 */
    	//$mtTab.find('>li[moduleid="'+moduleid+'"]').html('<label class="tab_loading"></label><a>'+jmenu.loadingTagName+'<span class=""></span></a>');
    	var $tabA = $mtTab.find('>li[moduleid="'+moduleid+'"]>a'); 
    	$tabA.html($tabA.html().replace(tabName,jmenu.loadingTagName))
    	    .siblings('label').attr('class','tab_loading'); 
    	jmenu.removeIframe($iframeCon,moduleid);
    	jmenu.addIframe($iframeCon,moduleid,moduleurl);
    	jmenu.iframeLoading($mtTab,$iframeCon,moduleid,tabName);//多任务标签加载中...
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
        /**测试*/
        if(scrollFlag.lFlag == 0){
        	//alert('左侧有隐藏-内容可向右滑动');
//        	$mtScrollLeft.click(function(){
//				jmenu.scrollTab($mtTab,1);        		
//        	});
			$mtScrollLeft.attr('class','tab_scrll_left_able');
        }else if(scrollFlag.lFlag == 1){
        	$mtScrollLeft.attr('class','tab_scrll_left');
        }
        if(scrollFlag.rFlag == 0){
        	//alert('右侧有隐藏-内容可向左滑动');
//        	jmenu.scrollTab($mtTab,-1);
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
		$iframeCon.find('>iframe[moduleid='+moduleid+']').bind("load",function(){
			var $tab = $mtTab.find('>li[moduleid='+moduleid+']').find('>a');
			$tab.html($tab.html().replace(jmenu.loadingTagName,tabName));
			//$tab.siblings('label').attr('class','');
			$tab.find('>label').attr('class','');
			//将内容body高度设置为iframe的高度
			this.contentWindow.document.body.height = $(this).height();
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
    }
};
/**对外调用的接口 开始*/
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
 */
function openTargetByUrl(url,tabName,moduleId){
    var $mtTab = $('#mtTab');
    var $iframeCon = $('#pages');
    var myIndex = jmenu.isExist($mtTab,tabName,moduleId);
    if( myIndex == -1){
        jmenu.addTab($mtTab,url,tabName,moduleId);
        jmenu.addIframe($iframeCon,moduleId,url);
        jmenu.scrollTab($mtTab,jmenu.isVisible($mtTab,tabName,moduleId));
        jmenu.iframeLoading($mtTab,$iframeCon,moduleId,tabName);//多任务标签加载中...
    }else{
        jmenu.scrollTab($mtTab,jmenu.isVisible($mtTab,tabName,''));
        jmenu.mtTabActive($mtTab,myIndex);
        jmenu.showIframe($iframeCon,moduleId);
    }
};
/**
 * @通过标签id关闭标签、删除对应的内容页
 * @调用:获取手界面顶级窗口的window对象 win 调用win.removeById(moduleid);
 * @TODO:添加监听
 */
function removeById(moduleid){
	var $mtTab = $('#mtTab');
    var $iframeCon = $('#pages');	
	var $curTab = $mtTab.find('>li[moduleid="'+moduleid+'"]');
	if($curTab.size() === 1){
		var tabName = $curTab.find('>a').text();
		jmenu.removeTab($mtTab,tabName,moduleid);
		jmenu.removeIframe($iframeCon,moduleId);
	}
};
/**对外调用的接口 结束*/

$(function(){
	var moduleId_morePoint = 'morePoint';
    var $mtTab = $('#mtTab');
    var $iframeCon = $('#pages');
    var $morePopCon = $('#morePopMenu');
    jmenu.init();
    //openTargetByUrl('../portlet/user-work!workShow.action','工作台','workBench');
    //静态页面测试开始
    //openTargetByUrl('../my-study-list.html','个人学习情况','zhng-my-study');
    //静态页面测试结束
    jmenu.leftNavShrink();
    $(window).resize(function(){
        jmenu.resize4Tabs($mtTab);
    });
    /*快捷菜单点击事件*/
    $('#popNav>ul>li,#menuPopTreeUL>li').live({
        click:function(e){
            var $li = $(this);
            //var tabName = $li.text();
            var moduleId = $li.attr('moduleid');
            if(moduleId_morePoint != moduleId){
	            var tabName = $li.find('>a>label').text();
	            var moduleUrl = $li.attr('moduleurl');
	            openTargetByUrl(moduleUrl,tabName,moduleId);
	            $morePopCon.css('display','none');
            }
        }
    });
    /*多任务标签区响应事件*/
    $('#mtTab>li').live({
        mouseover:function(e){
            var $tab = $(this);
            var tabClass = $tab.attr('class');
            if(tabClass != 'tab_f'){
                $tab.attr('class','tab_d');
            }
            $tab.find('>a>span').attr('class','tab_close_d');

        },
        mouseout:function(e){
            var $tab = $(this);
            var tabClass = $tab.attr('class');
            if(tabClass != 'tab_f'){
                $tab.attr('class','tab_u');
            }
            $tab.find('>a>span').attr('class','');
        },
        click:function(e){
//            alert('将事件绑定在容器上');
            var $tab = $(this);
            var tabName = $tab.find('>a').text();
            var moduleId = $tab.attr('moduleid');
            var myIndex = $tab.index();
            var $target = $(e.target);
            if(!$target.is('span')){
/******可以进一步封装*****************************/
                /*选中标签*/
                jmenu.scrollTab($mtTab,jmenu.isVisible($mtTab,tabName,moduleId));
                jmenu.mtTabActive($mtTab,myIndex);
                jmenu.showIframe($iframeCon,moduleId);
            }else{
                /*删除标签*/
                jmenu.removeIframe($iframeCon,moduleId);
                jmenu.removeTab($mtTab,tabName,moduleId);
            }
/******可以进一步封装*****************************/
        }
    });
/******为多任务标签区绑定事件 开始**********************/
	$('#scrllLeft').click(function(){
		//alert('→left←');
		if($(this).attr('class') == 'tab_scrll_left_able'){
			jmenu.scrollTab($mtTab,1);
			jmenu.scrollListener();		
		}
	});
	$('#scrllRight').click(function(){
		//alert('→right←');
		if($(this).attr('class') == 'tab_scrll_right_able'){
			jmenu.scrollTab($mtTab,-1);
			jmenu.scrollListener();		
		}
	});
/******为多任务标签区绑定事件 结束**********************/	
});