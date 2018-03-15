/**
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
	/*快捷菜单*/
	//console.log('快捷菜单区域重置');
	//var _timeSignal = null;//TODO:消除还没执行的延时执行
	//_timeSignal = setTimeout(function(){
	//	console.log('定位快捷菜单哦');
	//},600);
	//clearTimeout(_timeSignal);
	hideMorePop();//同响应点击关闭
	resize4PopMenu();
	copy_loc();
 };
 function copy_loc(){
 	/*版权信息*/
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
	/*1.清空*/
	$popUL.empty();$morePopUL.empty();
	/*填充数据*/
	//console.log('填充数据');
	//console.log('liNum:'+liNum);
	if(liNum <= useNumber){
		$popUL.html($liContent);
	}else{
		//console.log('菜单预置位置不够+$liContent'+$liContent.html());
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
//jquery 对象字符串