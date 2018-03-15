/**
 * 框架浮动层控制 在portal_indexv3.jsp页面中引用
 */
 
/**
 * @param jcs 框架JCS开始
 * @param popMore 更多快捷菜单
 * @param popcmenu 快捷菜单右键
 * @param portal 门户
 * @param app 应用
 * @param advs 高级检索
 * @param mtmenu 多任务扩展操作下拉
 */
var pfloat = {
	jcs:-1,
	popMore:-1,
	popcmenu:-1,
	portal:-1,
	app:-1,
	advs:-1,
	mtmenu:-1
};

/*门户*/
/***********limj 2011-09-07 展示门户**********/
function menhudivh(){
	var $mhLi = $("#m_h");
	var $jcsd = $("#jcs_door");
	if($jcsd.css('display') == 'block'){
		var mhLiOffset = $mhLi.offset();
		var left = mhLiOffset.left + $mhLi.outerWidth() - 150;
		var top = mhLiOffset.top + $mhLi.outerHeight();	
		var tempNumber = $jcsd.find("ul>li").length;
		/**
			1.tempNumber 所有门户的个数
			2.oneLiHeight = 28
			3.可以放置的去区域的高度h1:
			4.门户信息需要的高度h2
		*/
		var oneLiHeight = 28;
		var h1 = $(window).height() - top-6;
		var h2 = tempNumber * oneLiHeight;
		var divh = 0;
	
		if(tempNumber<=7){
			divh = h2;
		}else if(tempNumber<=14){
			divh = 196;
		}else{
			divh = (h1 > h2)?h2:h1;
			divh = divh/2;
		}
		$jcsd.css({"position":"absolute",
			"display":"block",
			"left":left,
			"top":top,
			"z-index":"1987",
			"height":divh
		});
	}
};
function showPortal(){
	/*1定位*/
	var $door = $('#jcs_door');
	var door_display = $door.css('display');
	if(door_display == 'none'){
	var $mhLi = $("#m_h");
	var mhLiOffset = $mhLi.offset();
	var left = mhLiOffset.left + $mhLi.outerWidth() - 150;
	var top = mhLiOffset.top + $mhLi.outerHeight();
	var mhtml = '';
	/***动态生成结构示例**/
	var tempNumber = 0;
	/*
	<s:iterator value="#request.portList" var="statu">
		mhtml += '<li id=${portalId}>${portName}</li>';
		tempNumber++;
	</s:iterator>*/
	if(tempNumber==0){
		mhtml += '<li id=none>您所在机构没有门户</li>';
	}
	var oneLiHeight = 28;
	var h1 = $(window).height() - top-6;
	var h2 = tempNumber * oneLiHeight;
	/** modify by limj 2011-10-08 
		当门户数量小于7,高度根据实际情况自适应;小于14,高度为196px;大于14,根据页面情况折半。 */
	var divh = 0;
	if(tempNumber<=7){
		divh = h2;
	}else if(tempNumber<=14){
		divh = 196;
	}else{
		divh = (h1 > h2)?h2:h1;
		divh = divh/2;
	}
	$(mhtml).appendTo($door.find('>ul'));
	$door.css({
		"position":"absolute",
		"display":"block",
		"left":left,
		"top":top,
		"z-index":"1987",
		"height":divh
	});
	$mhLi.attr("class","jc6m_d_li");
	$mhLi.find("a").css("class","jc6m_d_a");
	/*门户的浮动层和应用的浮动层不同时出现*/
	$("#all_app_new").css("display","none");
	$("#s_y_a").attr("class","jc6m_fd_li").find(">a#a_apps").attr("class","");
pfloat.app = -1;
	/******************************************/
	$door.find('>ul>li').die().live("click",function(){
		$mhLi.attr("class","jc6m_fd_li");
		$mhLi.find("a").css("class","");
		var _id = $(this).attr("id");
		if(_id=="none"){
			$door.css('display','none');
pfloat.app = -1;			
			return false;
		}
		var _name = $(this).text();
		var sheight = screen.height-70;
		var swidth = screen.width-10;
		var winoption    ="left=0,top=0,height="+sheight+",width="+swidth+",toolbar=yes,menubar=yes,location=yes,status=yes,scrollbars=yes,resizable=yes";
		var url = "${ctx}/portlet/port!preview.action?portalId="+_id;
		window.open(url,"",winoption);
		$door.css('display','none');
pfloat.app = -1;return false;		
	});
pfloat.portal = 0;return false;
	}
	else{
	/*再次点击、关闭门户*/
		$("#jcs_door").css('display','none');
		$("#m_h").attr("class","jc6m_fd_li").find(">a#menhu").attr("class","");
pfloat.portal = -1;return false;
	}
};