 // 去掉指定字符
String.prototype.TextFilter = function(){
	var pattern = new RegExp("[<《》>`~%!@#^=''?~！@#￥……&——‘”“'？*()（），,。.、]"); //[]内输入要过滤的字符
	var rs = "";
	for(var i = 0; i < this.length; i++){
		rs += this.substr(i,1).replace(pattern,' ');
	}
	return rs;
};
/*框架工具函数 by zhangwq 2011-10-11*/
/*打开新的全屏窗口*/
/**
 * @param 资源完整链接-例:http://jinher.com
 */
 
function openFullWin(url){
	var sheight = screen.height-70;
	var swidth = screen.width-10;
	var winoption    ="left=0,top=0,height="+sheight+",width="+swidth+",toolbar=yes,menubar=yes,location=yes,status=yes,scrollbars=yes,resizable=yes";
 	window.open(url,"",winoption);	
};
/*获取事件*/
function getEvent(){
	console.log('获取事件');
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
	console.log('事件只作用在目标对象-不向父级元素传递');console.dir(top.pfloat);
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
	console.log('阻止事件默认行为');console.dir(top.pfloat);
    if(window.event){//ie
        window.event.returnValue = false;
    }else if(e && e.preventDefault){
        e.preventDefault();
    }
    return false;
};
/*框架工具函数 by zhangwq 2011-10-11*/
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
addEventHandler(document,'click',function(){
	console.log('绑定到document上的事件');console.dir(top.pfloat);
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
    /*1.JCS*/
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
    console.log('portal_index:更多快捷菜单-初始化设置-:2-jcs.util.js改变之前');
    if(win.pfloat.popMore == 0){
    	win.pfloat.popMore = -1;
    	win.$("#morePopMenu").css("display","none");
    }else if(win.pfloat.popMore == 2){
    	win.pfloat.popMore = 3;
    }else if(win.pfloat.popMore == 3){
    	win.pfloat.popMore = 0;
    }
    console.log('portal_index:更多快捷菜单-初始化设置-:2-jcs.util.js改变之后pfloat.popMore___'+pfloat.popMore);
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
    /*7.多任务标签扩展操作*/
    if(win.pfloat.mtmenu == 0){
    	win.$("#menuHz").css('display','none');
    	win.pfloat.mtmenu = -1;
    }else if(win.pfloat.mtmenu == 2){
    	win.pfloat.mtmenu = 3;
    }else if(win.pfloat.mtmenu == 3){
    	win.pfloat.mtmenu = 0;
    }
    }
    //阻止冒泡
    //stopBubble(getEvent());
    console.log('執行document上綁定事件的最後一步--\n\r');
    console.dir(pfloat);
});   