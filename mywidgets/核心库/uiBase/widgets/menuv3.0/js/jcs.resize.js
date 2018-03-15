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
		var $menuHz = $("#menuHz");
		if($menuHz.css("display") === 'block'){
			//console.log('此时显示了多任务下拉-重新定位'); 				
 			var location = mtExtendLocation();
 			$menuHz.css({"display":"block","position":"absolute","left":location.myleft,"top":location.mytop,"z-index":"1987"});
		}
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
	(function(){
		hideMorePop();//同响应点击关闭
		var $popNav = $('#popNav');
		var $popUL = $popNav.find('>ul');
		var $morePopUL = $("div#morePopContainer ul#menuPopTreeUL");
		var useNumber = popAllowNum();
		//获取所有的li//获取特定li//填充即可
		//console.log('//获取所有的li//获取特定li//填充即可');
		//console.log('useNumber:'+useNumber);
		var moreLi = '<li moduleid="morePoint" onclick="showMorePop();"><a href="#"><img src="../uiBase/widgets/menuv3.0/images/pop_m.png" title="更多"/><label style="padding-left:6px;">更多...</label></a></li>';
		var $liContent = $.merge($popUL.find('>li[moduleid!="morePoint"]'),$morePopUL.find('>li'));//除更多外的快接菜单
		var liNum = $liContent.length; //含有的实际快捷菜单数目
		/*1.清空*/
		$popUL.empty();$morePopUL.empty();
		/*填充数据*/
		//console.log('填充数据');
		//console.log('liNum:'+liNum);
		if(liNum <= useNumber){
			//console.log('菜单刚好能填上');
			//console.log('填充数据——typeof liNum'+typeof liNum);
			//console.log('填充数据——typeof useNumber'+typeof useNumber);
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
				//var liHtml = $this.html();
				//var title = $this.attr('title');
				//var moduleid = $this.attr('moduleid');
				//var moduleurl = $this.attr('moduleurl');
				//var oncontextmenu = $this.attr('oncontextmenu');//undefined
				//console.log('liHtml-'+liHtml);
				//console.log('title:'+title);
				//console.log('moduleid-'+moduleid);
				//console.log('moduleurl-'+moduleurl);
				//console.log('oncontextmenu-'+oncontextmenu);
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
			firstHtml += moreLi;
			$popUL.html(firstHtml);
			$morePopUL.html(secondHtml);
		}
	})();
 };
 $(function(){
 	$(window).resize(winResize);
 });
//jquery 对象字符串