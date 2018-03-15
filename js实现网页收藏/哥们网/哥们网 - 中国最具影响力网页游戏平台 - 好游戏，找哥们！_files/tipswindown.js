var Notice =
{
    pop_state : false,
    notice_state : false,
    notice_reload : false,
    showLoad : false,
    myAjax : $,
    loadUidPop : function(url,obj)
    {
        Notice.myAjax.get(url,function(data)
        {
            Notice.showalpha();
            $("#"+obj).show();
            $("#"+obj).html(data);
            Notice.pop_state = true;
            var o=$("#"+obj);
    		var itop=Math.max(160,(document.body.scrollTop+document.documentElement.scrollTop+($(window).height()-o.height())/2));
    		var ileft=(document.documentElement.clientWidth-o.width())/2+document.documentElement.scrollLeft;
    		o.css({position:"absolute",top:itop+"px",left:ileft+"px"});
    		o.fadeIn();
        });
    },
    closeUidPop: function(obj,reload)
    {
        $("#"+obj).hide();
        Notice.closealpha();
        Notice.pop_state = false;
        if(reload)
        {
            window.location.replace(window.location.href);
        }
    },
    closeNotice : function()
    {
        $("#pop_notice").hide();
        if(Notice.notice_reload)window.location.replace(window.location.href);
        else if(Notice.showLoad) 
        {
            var obj = CloseShowId || $("#pop_notice")
            obj.show();
        }
        else
        {
             Notice.closealpha();
        }
        Notice.notice_state = false;
        Notice.showLoad = false;
    },
    showNotice : function(notice,state,showload,reload,obj)
    {
        if(obj)obj.hide();
		Notice.showalpha();
		var o=$("#pop_notice");
		var itop=Math.max(160,(document.body.scrollTop+document.documentElement.scrollTop+($(window).height()-o.height())/2));
		var ileft=(document.documentElement.clientWidth-o.width())/2+document.documentElement.scrollLeft;
		o.css({position:"absolute",top:itop+"px",left:ileft+"px"});
		o.fadeIn();	
        if (state == -2) {  // 雅虎邮箱绑定
    		$("#notice_type").html(notice);
            $("#pop_notice .popBtn").html($("#bind_other_btn").text());
        } else {
            $("#notice_type").html(notice);
            $("#pop_notice .popBtn").html('<a href="javascript:void(0);" onclick="Notice.closeNotice();return false;">确定</a>');
        }
        Notice.notice_state = true;
        Notice.showLoad = !!showload;
        if(obj) CloseShowId = obj
        Notice.notice_reload = (reload === true);
    },
    
    showUidPop : function()
    {
		Notice.showalpha();
		var o=$("#Pop_Choose_Num");
		var itop=Math.max(160,(document.body.scrollTop+document.documentElement.scrollTop+($(window).height()-o.height())/2));
		var ileft=(document.documentElement.clientWidth-o.width())/2+document.documentElement.scrollLeft;
		o.css({position:"absolute",top:itop+"px",left:ileft+"px"});
		o.fadeIn();	
        $("#notice_type").html(notice);
        Notice.notice_state = true;
        Notice.showLoad = !!showload;
        if(obj) CloseShowId = obj
        Notice.notice_reload = (reload === true);
    },
    
    showalpha: function()
    {
        var al=$("#alpha");
		al.height((document.documentElement.clientHeight || document.body.clientHeight) + (document.documentElement.scrollTop || document.body.scrollTop) + 50 + 'px');
		$("html").css("overflow","hidden");
		al.fadeIn();
    },
    
    closealpha: function()
    {
        $("#alpha").fadeOut("fast");
		$("html").css({"overflow-y":"auto","overflow-x":"hidden"});
    },

	closeObjNotice : function(_Obj)
    {
        _Obj.hide();
        Notice.closealpha();
    },
    showObjNotice : function(_Obj,notice)
    {
		Notice.showalpha();
		var o=_Obj;
		var itop=Math.max(160,(document.body.scrollTop+document.documentElement.scrollTop+($(window).height()-o.height())/2));
		var ileft=(document.documentElement.clientWidth-o.width())/2+document.documentElement.scrollLeft;
		o.css({position:"absolute",top:itop+"px",left:ileft+"px"});
		o.fadeIn();	
    }
};