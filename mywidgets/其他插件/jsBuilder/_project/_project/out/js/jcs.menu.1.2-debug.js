/*!
 * Jinher JS Libary1.2
 * Copyright(2)2012
 */

/**
 *根据id或者name属性值获取节点
 *公文模块太多的document.all
 *使用: $all( "idOrName")
 */
function $all( idName ) {
    return document.getElementById( idName ) || document.getElementsByName( idName )[0];
}
/**
 * 获取窗口需要的高度 
 * @param document window.document对象
 * @return {数字}
 ******************
 $iframe.bind("load",function(){
      var _iframeDoc = this.contentWindow.document;
      var _h = _maxDocHeight( _iframeDoc );
      _iframeDoc.body.style.height = _h + "px";
  });
 */
function _maxDocHeight( document ) {
    var _d = parseFloat( document.documentElement.scrollHeight );
    var _b = parseFloat( document.body.scrollHeight );
    return Math.max( _b, _d );
}
/**
 * 字符长度截取
 */
function charLenLimit( str, len ) {
    if ( !!str ) {
        var l = len || 13;
        return str.length>l?str.substring(0,l)+'...':str;
    }
} 
/**
 * 字节长度截取
 */
/**
 * @author zhangwq
 * @version 1.0
 * @(基础功能封装)
 */
// 去掉指定字符
String.prototype.TextFilter = function(){
	var pattern = new RegExp("[<《》>`~%!@#^=''?~！@#￥……&——‘”“'？*()（），,。.、]"); //[]内输入要过滤的字符
	var rs = "";
	for(var i = 0; i < this.length; i++){
		rs += this.substr(i,1).replace(pattern,' ');
	}
	return rs;
};
/**
 * 打开新的全屏窗口
 * @param 资源完整链接-例:http://jinher.com
 */
function openFullWin(url){
	var sheight = screen.height-70;
	var swidth = screen.width-10;
	var winoption    ="left=0,top=0,height="+sheight+",width="+swidth+",toolbar=yes,menubar=yes,location=yes,status=yes,scrollbars=yes,resizable=yes";
 	window.open(url,"",winoption);	
};
/**
 * 事件属性兼容IE8及以下、IE9、W3C 浏览器
 */
function fixEvent(e) {
	var ret = e || window.event;
	ret.pageX = ret.pageX || ret.clientX + document.documentElement.scrollLeft;
	ret.pageY = ret.pageY || ret.clientY + document.documentElement.scrollTop;
	ret.target = ret.target || ret.srcElement;
	return ret;
}
/*获取事件*/
function getEvent(){
	//console.log('获取事件');
    if(window.event)
      return window.event;
    //arguments 该对象代表正在执行的函数和调用它的函数的参数
    //callee 属性 返回正被执行的 Function 对象
    //caller 返回一个对函数的引用，该函数调用了当前函数
    var f = arguments.callee;
    while(caller= f.caller)
    {
      f=f.caller;
    }
    return f.arguments[0];
};
/**
 * @事件只作用在目标对象-不向父级元素传递
 * @param me 事件对象
 */
function stopBubble(me){
    if(window.event){
        me.cancelBubble = true;//事件句柄停止将事件传播到包容对象
    }else{//w3c if(e && e.preventDefaut && e.stopPropagation)
        //me.preventDefault();//阻止默认行为
        me.stopPropagation();//停止传播
    }
    return false;//对live方式绑定的事件 阻止冒泡
};
/**
 * 阻止事件默认行为
 * @param e 事件对象
 */
function stopDefault(e){
    if(window.event){//ie
        window.event.returnValue = false;
    }else if(e && e.preventDefault){
        e.preventDefault();
    }
    return false;
};
/**
 * WdatePicker.js
 * 浏览器窗口属性
 */
function winWH() {
	var ret = { w:0, h:0 },
		win = window,
		doc = win.document,
		docEl = doc.documentElement;
	if( 'innerWidth' in win ) {
		ret.w = win.innerWidth;
		ret.h = win.innerHeight;
	} else {
		if( docEl && 'clientWidth' in docEl ) {
			ret.w = docEl.clientWidth;
			ret.h = docEl.clientHeight;
		}else {
			ret.w = doc.offsetWidth;
			ret.h = doc.offsetHeight;
		}
	}
	/*
	ret.w = ( 'innerWidth' in win )?win.innerWidth:( docEl && 'clientWidth' in docEl)?docEl.clientWidth:doc.offsetWidth;
	ret.h = ( 'innerHeight' in win )?win.innerHeight:( docEl && 'clientHeight' in docEl)?docEl.clientHeight:doc.offsetHeight;
	*/
	return ret;

};
/**
 * @param target 事件触发对象
 * @param type   事件
 * @param func   事件处理函数
 * @version 1.0
 */
function addEventHandler(target, type, func) {
    if (target.addEventListener)
        target.addEventListener(type, func, false);
    else if (target.attachEvent)
        target.attachEvent("on" + type, func);
    else target["on" + type] = func;
};
/**
 * 框架浮动层关闭事件
 */
var floatHandle = function(e){
	/*
	console.log('绑定到document上的事件'+e.type);//console.dir(top.pfloat);
	console.log(top.pfloat.mtmenu);
	console.log(e.target);*/
    //alert('ff');
    if(typeof art == 'function' && art.dialog && art.dialog.parent && art.dialog.parent !== window){
    	//此时是artDialog弹出窗口 不处理首界面浮动元素显示隐藏
    	//console.log('此时是artDialog弹出窗口 不处理首界面浮动元素显示隐藏');	
    }else{
	    var win = null;
	    /*
	    if(art.dialog.parent != undefined){
	    	win = art.dialog.parent.top;
	    }else{
	    	win = window.top;
	    }*/
	    win = window.top;
	    if(win.pfloat != undefined){
	    	var domEvent = window.event || e;
		    var eventTarget = domEvent.srcElement || domEvent.target;
		    while(eventTarget.nodeType === 3) eventTarget = eventTarget.parentNode;
		    var eventTargetId = eventTarget.getAttribute('id');
		    /*1.JCS*/
		    if(eventTargetId && (eventTargetId === 'li_set' || eventTargetId === 'li_help') && 'portalIndex' === document.body.id){
		    	//console.log('此时点击的是设置-帮助'+document.body.id);
		    }else{
			    if(win.pfloat.jcs == 0){
			        win.pfloat.jcs = -1;
			        win.$('#jcs_m_pop').css('display','none');
			        win.$('#li_set,#li_help').attr('class','');
			        win.$('#m_set,#m_help').css('display','none');
			        win.$('#d_jcs').attr('class','jc6_jcs');
			    }else if(win.pfloat.jcs == 2){//ie
			        win.pfloat.jcs = 3;
			    }else if(win.pfloat.jcs == 3){//ie
			        win.pfloat.jcs = 0;
			    }
		    }
		    /*2.门户*/
		    if(win.pfloat.portal == 0){
		    	win.pfloat.portal = -1;
		    	win.$('#jcs_door').css('display','none');
		    	win.$("#m_h").attr("class","jc6m_fd_li").find(">a#menhu").attr("class","");
		    }else if(win.pfloat.portal == 2){//ie
		        win.pfloat.portal = 3;
		    }else if(win.pfloat.portal == 3){//ie
		        win.pfloat.portal = 0;
		    }
		    /*3.应用*/
		    //console.log('jcs.util-应用');
		    //var event = getEvent();
		    //console.log(event.srcElement);
		    //console.log(event.target);
		    if(win.pfloat.app == 0){
		    	//console.log('jcs.util-应用-此时进入隐藏分支');
		    	win.pfloat.app = -1;
		    	win.$('#all_app_new').css('display','none');
			    win.$("#s_y_a").attr("class","jc6m_fd_li").find(">a#a_apps").attr("class","");
		    }else if(win.pfloat.app == 2){
		    	//console.log('jcs.util-应用-此时进入初始设置分支-1');
		    	win.pfloat.app = 3;//0;	
		    }else if(win.pfloat.app == 3){
		    	//console.log('jcs.util-应用-此时进入初始设置分支-finall');
		    	win.pfloat.app = 0;
		    }
		    /*4.高级检索*/
		    if(win.pfloat.advs == 0){
		    	win.pfloat.advs = -1;
		    	win.$("#searchAdvanceCon").css("display","none");
		    }else if(win.pfloat.advs == 2){
		    	win.pfloat.advs = 3;
		    }else if(win.pfloat.advs == 3){
		    	win.pfloat.advs = 0;
		    }
		    /*5.更多快捷菜单*/
		    //console.log('portal_index:更多快捷菜单-初始化设置-:2-jcs.util.js改变之前');
		    if(win.pfloat.popMore == 0){
		    	win.pfloat.popMore = -1;
		    	win.$("#morePopMenu").css("display","none");
		    }else if(win.pfloat.popMore == 2){
		    	win.pfloat.popMore = 3;
		    }else if(win.pfloat.popMore == 3){
		    	win.pfloat.popMore = 0;
		    }
		    //console.log('portal_index:更多快捷菜单-初始化设置-:2-jcs.util.js改变之后pfloat.popMore___'+win.pfloat.popMore);
		    /*6.快捷菜单右键*/
		    if(win.pfloat.popcmenu == 0){
		    	win.$('#ctxUL').css('display','none');
		    	win.pfloat.popcmenu = -1;
		    }else if(win.pfloat.popcmenu == 2){
		    	win.pfloat.popcmenu = 3;
		    }else if(win.pfloat.popcmenu == 3){
		    	win.pfloat.popcmenu = 0;
		    }
		    /*
		    else if(win.pfloat.popcmenu == 2){
		    	win.pfloat.popcmenu = 0;
		    }*/
		    /*7.多任务标签扩展操作
		     * @jquery方式绑定到多任务下拉的滑动标识,此时点击该标识时先行执行绑定到document上的click事件造成将下拉浮动关闭了
		     * */
		   
		    if(eventTargetId && (eventTargetId === 'scrll_d' || eventTargetId === 'scrll_u') && 'portalIndex' === document.body.id){
		    	//console.log('此时进行滑动_不对该下拉浮动层进行是否关闭处理'+document.body.id);	
		    }else{
		    	if(win.pfloat.mtmenu == 0){
			    	win.$("#menuHz").css('display','none');
			    	win.pfloat.mtmenu = -1;
			    }else if(win.pfloat.mtmenu == 2){
			    	win.pfloat.mtmenu = 3;
			    }else if(win.pfloat.mtmenu == 3){
			    	win.pfloat.mtmenu = 0;
			    }	
		    }
    	}	 
    }
    //阻止冒泡
    //stopBubble(getEvent());
    //console.log('執行document上綁定事件的最後一步--\n\r');
    //console.dir(win.pfloat);
};
//处理键盘事件 禁止后退键（Backspace）密码或单行、多行文本框除外
//http://xdwangiflytek.iteye.com/blog/1386408
function forbidBackSpace(e) {
    var ev = e || window.event; //获取event对象 
    var obj = ev.target || ev.srcElement; //获取事件源 
    var t = obj.type || obj.getAttribute('type'); //获取事件源类型 
    //获取作为判断条件的事件类型 
    var vReadOnly = obj.readOnly;
    var vDisabled = obj.disabled;
    //处理undefined值情况 
    vReadOnly = (vReadOnly == undefined) ? false : vReadOnly;
    vDisabled = (vDisabled == undefined) ? true : vDisabled;
    //当敲Backspace键时，事件源类型为密码或单行、多行文本的， 
    //并且readOnly属性为true或disabled属性为true的，则退格键失效 
    var flag1 = ev.keyCode == 8 && (t == "password" || t == "text" || t == "textarea") && (vReadOnly == true || vDisabled == true);
    //当敲Backspace键时，事件源类型非密码或单行、多行文本的，则退格键失效 
    var flag2 = ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea";
    //判断 
    if (flag2 || flag1) return false;
}
//禁止后退键 作用于Firefox、Opera
document.onkeypress = forbidBackSpace;
//禁止后退键  作用于IE、Chrome
document.onkeydown = forbidBackSpace;
/*
//禁用后退键(页面嵌套太复杂，后退会引发很多的问题，所以禁掉会好一些)@3.1bug#384
addEventHandler(document,'keypress',forbidBackSpace);
addEventHandler(document,'keydown',forbidBackSpace);
*/
if('ontouchstart' in window){
	addEventHandler(document,'touchstart',floatHandle);   
}else{
	addEventHandler(document,'click',floatHandle);
}/*!
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
*//**
 * modified zhangwq 2011-10-12
 * 应用-添加应用及时搜索高亮锚
 */
$(function(){
/**
 * (1)锚:span/a;a/a
 * (2)scrollTo
 * (3)scrollTop
 * (4)#重复搜索的问题 如果两次搜索的内容一致就不响应@添加自定义属性存储历史选择data-oldText
 * (5)#如果搜索关键字为空 则初始化
 */
/***********应用 菜单搜索注册开始***************************************/
var $sInput = $('#jcsUISearch');
var hash_href = '';/*已搜索标识*/
var scrollDomObj = document.getElementById('allApp');
function hsTop(hash_id){
	if(hash_id){
		scrollDomObj.scrollTop = 0;//需要重置-否则在已滚动到下方定位到上方隐藏菜单时出现问题
		var fx_top = parseInt(($('#'+hash_id).offset().top - $(scrollDomObj).offset().top),10)-10;
		fx_top = fx_top>0?fx_top:0;
		scrollDomObj.scrollTop = fx_top;
	}else {
		scrollDomObj.scrollTop = 0;
	} 	
}
function jcsHighLight(){
	var keyword = $.trim($sInput.val());
	var oldText = $sInput.attr('data-oldText');
	if(oldText != 'jh' && oldText === ('jh'+keyword) ){
		return;
	}
    var regexp = new RegExp("("+keyword+")");
    var firstFlag = 0;
    if(hash_href != ''){
    	var $matchCon = $("div#allApp").find(">div.all_menu_item");
	    var $matchObj = $matchCon.find(">div.jcs_all_menu_h1>h1,>div.jcs_all_menu_var>h2,>div.jcs_all_menu_var>ul>li>label");
    	$matchObj.find('>font').each(function(){
    		var $this = $(this);
    		$this.parent().html($this.parent().text());
    	});
    	hash_href = '';
    	//hsTop();//#重复搜索时不将滚动条重置-否则会执行两次-造成显示闪烁效果
    }
    if(keyword != ""){
    	$sInput.attr('data-oldText','jh'+keyword);
        $("div#allApp").find(">div.all_menu_item").each(function(){//#缓存
			var $this = $(this);
			if(!$this.is(":hidden")){
				$this.find(">div.jcs_all_menu_h1>h1,>div.jcs_all_menu_var>h2,>div.jcs_all_menu_var>ul>li>label").each(function(index){
					var $match = $(this);
					var _text = $match.text();
					if(regexp.test(_text)){
		                if(firstFlag == 0){
							hash_href = $match.siblings("a").attr("id");
		                	firstFlag = 1;
		                	$match.html(_text.replace(regexp,'<font class="one_menu_s">$1</font>'));
		                }else if(firstFlag == 1){
							$match.html(_text.replace(regexp,'<font class="rest_menu_s">$1</font>'));													                	
		                }
					}	
				});	
			}
		});
	}
	if(hash_href != ''){ 
		//window.location.hash = hash_href;
		hsTop(hash_href);
	}else{
		//#初始化
		$sInput.attr('data-oldText','jh');
		hsTop();
	} 
};
$sInput.minSearch({
    btnClick:function() {
    	jcsHighLight();    
    }
});
$sInput.bind('keydown',function(e){
	if(e.keyCode == 13){
		jcsHighLight();
	}
});
/***********应用 菜单搜索注册结束***************************************/
});/**
 *@ 窗口重置时 更新浮动元素的位置(窗口的最小尺寸 min-width min-height)
 *@ 张文钦
 *@ 2011-10-29
 *@依赖文件 jquery-1.5.2.js
 */
 //console.log('窗口重置时 更新浮动元素的位置');
 function winResize(){
	//console.log('窗口重置');
	menhudivh();//门户
	(function(){
		//console.log('应用菜单');
		var $hAllApps = $('#a_apps');
	    var $allMenu = $('#all_app_new');
	    var disFlag = $allMenu.css('display');
	    if(disFlag == 'block'){
	    	//console.log('应用菜单已显示-');
		    var baseOffset = $hAllApps.offset();
		    var myOffset = {"left":baseOffset.left+$hAllApps.outerWidth()-$allMenu.outerWidth(),
		                          "top":baseOffset.top+$hAllApps.outerHeight()};
		    $allMenu.css({
		        "display":"block",
		        "position":"absolute",
		        "left":myOffset.left,
		        "top":myOffset.top,
		        "z-index":"9108"
		    });
	    }    
	})();//应用
	(function(){
		//console.log('高级检索');
		var $jc_s = $("#jcsearchDiv");
	    var _jcs_offset = $jc_s.offset();
	    var $adv_s = $("#searchAdvanceCon");
	    if($adv_s.css('display') == 'block'){
	    	//console.log('高级检索已显示-重新定位');
		    $adv_s.css({
		    	"display":"block",
		        "position":"absolute",
		        "top":_jcs_offset.top+$jc_s.outerHeight(),
		        "left":_jcs_offset.left+8,
		        "z-index":"1987"
		    });
	    }
	})();//高级检索
	(function(){
 		//console.log('多任务下拉');
 		$("#menuHz").css('display','none');
 		/*
		var $menuHz = $("#menuHz");
		if($menuHz.css("display") === 'block'){
			//console.log('此时显示了多任务下拉-重新定位'); 				
 			//var location = mtExtendLocation();
 			//$menuHz.css({"display":"block","position":"absolute","left":location.myleft,"top":location.mytop,"z-index":"1987"});
		}*/
	})();//多任务下拉
	(function(){
		//console.log('jcs');
		var $base = $('#d_jcs');
	    var baseOffset = $base.offset();
	    var firstHeight = 264;
	    var $jcsFirst = $('#jcs_m_pop');
	    var display = $jcsFirst.css('display');
	    if(display == 'block'){
	    	//console.log('此时jcs已显示出来 重新定位');
	        $jcsFirst.css({
	            'display':'block',
	            'position':'absolute',
	            'z-index':'1987',
	            'left':baseOffset.left,
	            'top':baseOffset.top - firstHeight
	        });
	        $base.css('z-index','1988').attr('class','jc6_jcs_active');
		}
	})();//JCS
	//快捷菜单
	//TODO:消除还没执行的延时执行
	hideMorePop();//同响应点击关闭
	resize4PopMenu();
	copy_loc();
 };
 function copy_loc(){
 	//版权信息
 	var $copy = $('#copy_div');
 	var win_w = $(window).width();
 	$copy.css('padding-left',win_w/4);
 };
 $(function(){
 	copy_loc()
 	$(window).resize(winResize);
 });
 /**
  * @快捷菜单部分重新排版:应用在窗口重置;快捷菜单拖拽事件中
  * @param filterModuleId 右键隐藏时传入的模块ID
  */
 function resize4PopMenu(filterModuleId){
	var $popNav = $('#popNav');
	var $popUL = $popNav.find('>ul');
	var $morePopUL = $("div#morePopContainer ul#menuPopTreeUL");
	var useNumber = popAllowNum();
	var moreLi = '<li moduleid="morePoint" onclick="showMorePop();"><a href="#"><img src="../uiBase/widgets/menu/images/pop_m.png" title="更多"/><label style="padding-left:6px;">更多...</label></a></li>';
	var $liContent = $.merge($popUL.find('>li[moduleid!="morePoint"]'),$morePopUL.find('>li[moduleid!="morePoint"]'));//除更多外的快接菜单
	if(filterModuleId && typeof filterModuleId === 'string'){
		$liContent = $.merge($popUL.find('>li[moduleid!="morePoint"][moduleid!="'+filterModuleId+'"]'),
			$morePopUL.find('>li[moduleid!="morePoint"][moduleid!="'+filterModuleId+'"]'));//除更多外的快接菜单
	}
	var liNum = $liContent.length; //含有的实际快捷菜单数目
	//1.清空
	$popUL.empty();$morePopUL.empty();
	//填充数据
	if(liNum <= useNumber){
		$popUL.html($liContent);
	}else{
		/**
		 * 1.属性
		 * 2.内容
		 * 3.事件
		 */
		var firstHtml = '';
		var secondHtml = '';
		$.each($liContent,function(i,data){
			var $this = $(this);
			var li = '<li title="'
			              +$this.attr('title')
			              +'" moduleid="'
			              +$this.attr('moduleid')
			              +'" moduleurl="'
			              +$this.attr('moduleurl')
			              +'" oncontextmenu="popContextMenu(event);">'
			              +$this.html()
			              +'</li>';
			if(i < useNumber-1){
				firstHtml += li;
			}else{
				secondHtml += li;
			}
		});
		//简单处理;优化->如果是平板电脑则不添加更多部分;
		if('ontouchstart' in document.documentElement){//isMobile;
			firstHtml += secondHtml;
			$popUL.html(firstHtml);
		}else{
			firstHtml += moreLi;
			$popUL.html(firstHtml);
			$morePopUL.html(secondHtml);
		}
	}
 };
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
    		"top":outerConHeight+((menuFlag == 0)?1:41)
    	});		
	}else{
		$("#fw_d").css("display","none");
	}
	if( upNum > 0){
		$("#fw_u").css({
    		"display":"block",
    		"position":"absolute",
    		"left":left,
    		"top":(menuFlag == 0)?'11px':'52px'
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
//#为应用列表一级菜单添加wipe事件
function topMenuWipe(){
	if(navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPad/i)){
		$('#ulOuterCon').touchwipe({
			min_move_y: 20,
			wipeDown: function() {
				if(appScrollListener().upNum > 0){
					var $ul = $("#allOneMenuUL");
					var _mT = parseInt($ul.css("marginTop"));
		   			if(_mT < 0){
		              	$ul.css({"marginTop":_mT+26+"px"});
		             }
		             appScrollListener();	
				}
				return false;},
			wipeUp: function() {
				if(appScrollListener().downNum > 0){
					var $ul = $("#allOneMenuUL");
					$ul.css("marginTop",parseInt($ul.css("marginTop"))-26+"px");
	            	appScrollListener();		
				}
				return false;},
			preventDefaultEvents: true
		});
	}
};/**
 * @依赖文件jquery.1.5.2.js;js/eddyScroll.js
 * @应用在应用列表中(portal_indexv3.jsp;portal_addMenu.jsp)
 */
if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPad/i)) {
	//var myScroll;
	function loaded() {
		//#1将应用中间区域存放应用的部分的高度构建成eddyScroll区域滚动组件的环境
		document.getElementById('allApp').style.height = 'auto';
		var target = 'jcsScrollWraper';//应用
		var myScroll = new eddyScroll(target, { checkDOMChanges: true,zoom:false,
	                    hScroll: false,          //x 水平 滚动
	                    vScroll: true,          //y 竖直 滚动
	                    // 滚动条
	                    hScrollbar: false,
	                    vScrollbar: true		
	    });
		var  flag = 0, t;
		var eTarget = document.getElementById(target);
		eTarget.addEventListener("touchstart",touchStart,false);
		eTarget.addEventListener("touchend",touchEnd,false);
		//event on touch
		function touchStart(){
				flag = 1;
				t = setTimeout(function(){
					flag = 0;
				},120);
			}
		//event on touch
		function touchEnd(){
				clearTimeout(t);
				if(flag){
					//alert('touch事件');//@调试信息
				}
				flag = 0;
			}
	};
	function selected() {
		//#1将应用中间区域存放应用的部分的高度构建成eddyScroll区域滚动组件的环境
		document.getElementById('selectedMenu').getElementsByTagName('ul')[0].style.height = 'auto';
		var target = 'selectedMenu';//已选择应用
		var myScroll = new eddyScroll(target, { checkDOMChanges: true,zoom:false,
	                    hScroll: false,          //x 水平 滚动
	                    vScroll: true,          //y 竖直 滚动
	                    // 滚动条
	                    hScrollbar: false,
	                    vScrollbar: true		
	    });
		var  flag = 0, t;
		var eTarget = document.getElementById(target);
		eTarget.addEventListener("touchstart",touchStart,false);
		eTarget.addEventListener("touchend",touchEnd,false);
		//event on touch
		function touchStart(){
				flag = 1;
				t = setTimeout(function(){
					flag = 0;
				},120);
			}
		//event on touch
		function touchEnd(){
				clearTimeout(t);
				if(flag){
					//alert('touch事件');//@调试信息
				}
				flag = 0;
			}
	};
	function popScroll(){//#在ie下过滤平板操作去除时;显示异常;快捷菜单内容部分的定位会顶着页面出现
		//#快捷菜单优化
		//console.log(document.getElementById('tabOuterCon').innerHTML);
		//return;
		document.getElementById('popNav').getElementsByTagName('ul')[0].style.height = 'auto';
		var target = 'popNav';//快捷菜单
		var myScroll = new eddyScroll(target, { checkDOMChanges: true,zoom:false,
	                    hScroll: false,          //x 水平 滚动
	                    vScroll: true,          //y 竖直 滚动
	                    // 滚动条
	                    hScrollbar: false,
	                    vScrollbar: false		
	    });
		
	};
	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
	//window.onload = function(){};
	$(function(){
		loaded();//#绑定菜单内容区域的模拟滚动条
		//#更新应用浮动区域(all_app_new)浮动参数
		var floatZone = document.getElementById('all_app_new');
		if(floatZone){
			floatZone.addEventListener('touchend',function(){
				pfloat.app = 1;
			},false);
			floatZone.addEventListener('touchcancel',function(){
				pfloat.app = 0;
			},false);			
		}
		//#已选应用
		if(document.getElementById('selectedMenu')){
			selected();		
		}
		/*#快捷菜单*/
		if(document.getElementById('popNav')){
			popScroll();		
		}
	});
};

