/**
 * 框架浮动层关闭事件
 */
addEventHandler(document,'click',function(){
    //alert('ff');
    var win = window.top;
    /*1.JCS*/
    if(win.pfloat.jcs == 0){
        win.pfloat.jcs = -1;
        win.$('#jcs_m_pop').css('display','none');
        win.$('#li_set,#li_help').attr('class','');
        win.$('#m_set,#m_help').css('display','none');
        win.$('#d_jcs').attr('class','jc6_jcs');
    }else if(win.pfloat.jcs == 2){//ie
        win.pfloat.jcs = 0;
    }
    /*2.门户*/
    if(win.pfloat.portal == 0){
    	win.pfloat.portal = -1;
    	win.$('#jcs_door').css('display','none');
    	win.$("#m_h").attr("class","jc6m_fd_li").find(">a#menhu").attr("class","");
    }else if(win.pfloat.portal == 2){//ie
        win.pfloat.portal = 0;
    }
    /*3.应用*/
    if(win.pfloat.app == 0){
    	win.pfloat.app = -1;
    	win.$('#all_app_new').css('display','none');
	    win.$("#s_y_a").attr("class","jc6m_fd_li").find(">a#a_apps").attr("class","");
    }else if(win.pfloat.app == 2){
    	win.pfloat.app = 0;	
    }
    /*4.高级检索*/
    if(win.pfloat.advs == 0){
    	win.pfloat.advs = -1;
    	win.$("#searchAdvanceCon").css("display","none");
    }else if(win.pfloat.advs == 2){
    	win.pfloat.advs = 0;
    }
    /*5.更多快捷菜单*/
    if(win.pfloat.popMore == 0){
    	win.pfloat.popMore = -1;
    	$("#morePopMenu").css("display","none");
    }else if(win.pfloat.popMore == 2){
    	win.pfloat.popMore = 0;
    }
    /*6.快捷菜单右键*/
    if(win.pfloat.popcmenu == 0){
    	win.$('#ctxUL').css('display','none');
    	win.pfloat.popcmenu = -1;
    }else if(win.pfloat.popcmenu == 2){
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
    	win.pfloat.mtmenu = 0;
    }
});   