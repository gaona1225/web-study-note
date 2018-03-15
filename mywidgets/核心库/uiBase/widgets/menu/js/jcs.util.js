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
if('ontouchstart' in window){
	addEventHandler(document,'touchstart',floatHandle);   
}else{
	addEventHandler(document,'click',floatHandle);
}