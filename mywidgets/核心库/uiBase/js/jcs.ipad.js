/**
 * @作者 黄卉 万莎 李金梅 张文钦
 * @时间 2011-12
 * @描述 JCS在ipad下的处理：body/div添加模拟滚动条
 * @关联文件 eddyScroll.js 
 */
//平板电脑的判断 
if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPad/i)) {
	 //  定义全局变量
	 var myScroll;
	 var vScrollbar = true;  
	 var useTransform = true;
	 $(function(){
	 	//测试页面所在的位置-是否以弹出窗口的形式显示-art弹出窗不加入滚动条
	 	var iframe_inner_parent = window.parent;
	 	if(iframe_inner_parent.document.body.nodeName !== 'FRAMESET'){
		 	if('$' in window && 'jQuery' in window){//支持jquery
		 		var $artIframe = iframe_inner_parent.$('iframe.artPlusOpen');
		 		if($artIframe.size() >= 1){
					//弹出框页面中树结构页面
		 			if('jQuery' in window && $('div.ui-custom-artTree-border').size() === 1){
	 					var extraNum = 0;
						extraNum = $('input.minSearch').size();
						var topx = extraNum * 30 + 10 + "px"; //上偏移值
						var artTdCssText = $(window.parent.document).find('td.aui_td_content').eq($artIframe.size()-1).attr("style");//如：width:220px;height:400px
						var td_w = artTdCssText.substring(artTdCssText.indexOf(':')+1,artTdCssText.indexOf('p'));
						var _w = parseInt(td_w,10) - 20 + "px";
						var _h = $('div.ui-custom-artTree-border').height(); 
				 		$('#odt_artTree_ul').css({
				 			'position':'absolute',
				 			'top':topx+'px',
				 			'overflow':'hidden',
				 			'width':_w
				 		}).find('>ul').css({
			            	'padding-left': "0",
			            	'padding-right': "0",
			            	'min-width':'100%' 
			            });
						$('div.ui-custom-artTree-border').height(_h);
						myScroll = new eddyScroll('odt_artTree_ul',{
				     		checkDOMChanges:true,
				     		useTransform:false,
				     		vScrollbar:false,
				     		hScrollbar:false
				    	});
		 			}else if(('jQuery' in window) && ($('div.cus-box').size() === 2)){//有两个树结构的弹出框，如：人员单选art弹出框
		 				var topx = $('#left input.minSearch').size()*22 + $('#left div.cus-box-title').size()*30 + $('#left div.cus-toolbar').size()*24 + 30 + "px";
				 		var topx1 = $('#right input.minSearch').size()*22 + $('#right div.cus-box-title').size()*30 + $('#right div.cus-toolbar').size()*24 + 30 + "px";
				 		var _h = $('div.cus-box').height();
				 		$('#person-list-left').css ({
				 			'position':'absolute',
				 			'top':topx,
				 			'width':'45%'
				 		}).find('>ul').css({
			            	'padding-left': "0",
			            	'padding-right': "0",
			            	'min-width':'100%' 
			            });
				        $('#person-list-right').css({
				        	'position':'absolute',
				        	'top':topx1,
				        	'width':'46%'
				        }).find('>ul').css({
			            	'padding-left': "0",
			            	'padding-right': "0",
			            	'min-width':'100%' 
			            });
						$('div.cus-box').height(_h);
				     	var innerDataScroll = new eddyScroll('person-list-left',{
				     		checkDOMChanges:true,
				     		useTransform:false,
				     		vScrollbar:false,
				     		hScrollbar:false
				     	});	
				     	//右侧树可能会有操作，如：单选按钮
				     	innerDataScrol = new eddyScroll('person-list-right',{
				     		checkDOMChanges:true,
				     		useTransform:false,
				     		vScrollbar:false,
				     		hScrollbar:false,
				     		onBeforeScrollStart: function (e) {
			                    var target = e.target;
			                    while (target.nodeType != 1) target = target.parentNode;
			                    if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA')
			                        e.preventDefault();
			                }
				     	});
		 			}
		 			/*art弹出框表单及list列表需要添加滚动条*/
		 			if($('#artListOrForm').size()===1){
			 			var artTdCssText = $(window.parent.document).find('td.aui_td_content').eq($artIframe.size()-1).attr("style");//如：width:220px;height:400px
						var td_w = artTdCssText.substring(artTdCssText.indexOf(':')+1,artTdCssText.indexOf('p'));
						var _w = parseInt(td_w,10) - 20 + "px";
						$('#artListOrForm').css({'position':'absolute','overflow':'hidden','width':_w});
						myScroll = new eddyScroll('artListOrForm',{
							checkDOMChanges:true,
				     		vScrollbar:false,
				     		hScrollbar:false,
				     		onBeforeScrollStart: function (e) {
			                    var target = e.target;
			                    while (target.nodeType != 1) target = target.parentNode;
			                    if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA')
			                        e.preventDefault();
			                }
						});
		 			}
		 			return;
		 		}			
		 	}
	 	}
	 	//在页面加入滚动条，首页不加入portal_indexv3.jsp进行单独处理（jcs.div.ipad.js）
	 	if(document.body.nodeName === 'BODY' && document.body.id !== 'portalIndex'){
			/**
			 * frameset 页面，给左边的树添加滚动条
			 * checkDOMChanges:true节点发生变化时，页面的滚动条的变化
			 * useTransform:false 页面树的定位
			 * hScrollbar/vScrollbar：false横竖滚动条的隐藏
			 * if(){左边的树}else{右边的list页表}
			 */
			if(window.parent.document.body.nodeName === 'FRAMESET'){
			    var p = window.parent;
			    if(p.frames.length === 2 && p.document.body.cols != ""){
			        if('jQuery' in window && $('div.ui-custom-od_tree').size() === 1){
						/**
						 *  1、先得到树自适应高度（eddyScroll.js,在ipad下不对树的高度进行处理 ）
						 *		a、根据树上面的div的个数，得到repair高度补偿值，（这个补偿值可能各个页面的不一样，只能先选择一个折中的高度）
						 *		b、执行自适应高度方法
						 *		c、得到整个树的高度，存到一个变量_h中
						 *		d、给树体里面的ul添加style（height：auto）
						 *		e、最后将_h赋给树的高度，解决了页面上树可以滚动但边框没有显示，弹出框树不能滚动的问题
						 *	2、再加入模拟滚动条
						 *		a、定义eddyScroll对象的时候，加入了延迟，为了解决页面加载时高度不稳定的问题。
						 
						 * modify huanghui@2012-3-27 日记管理页面左边树 特殊页面
						 *     流程定义 搜索框  div.odt_search里面的搜索框不是$('input.minSearch').size()，故改成$('div.odt_search').size()
						 *     流程定义树的class=‘process_tree_ipad’
						 * */					 
			        	var extraNum = 0;
				        var repairNum = 1;
			        	extraNum = $('div.odt_search').size()+$('div.odt_btn_bar').size() + $('div.cus-box-title').size()+$('div.ui-custom-diary-infobg').size();
			        	switch(extraNum){
			        		case 0://版主管理
			        			repairNum = 20;
			        			break;
			        		case 1: //版块管理
			        			repairNum = 50;
			        			break;
			        		case 2: //网络硬盘
			        			repairNum = 78;
			        			break;
			        		case 3: //三行，指标库页面
			        			repairNum = 110;
			        			break;
			        	}
			        	$('html,body').attr("style" ,"height:100%; padding:0px; margin:0px; overflow:hidden" );
			        	var target = "";
			            var $odTreeCon = "";
			            if($('#odt_tree_ul').size()!=0){
			            	 $odTreeCon = $('#odt_tree_ul');
			            	 target ="odt_tree_ul";
			        	}else if($('#process_tree_ipad').size()!=0){
			            	 $odTreeCon = $('#process_tree_ipad');
			            	 target = "process_tree_ipad";
			            }
			        	var h = $("body").height()-repairNum;
				        $odTreeCon.css({
							'overflow':'hidden',
							'height':h+'px'
						})
						var _h = $('div.ui-custom-od_tree').height();
						//console.log("pageH3:"+$('div.ui-custom-od_tree').height());
			        	var topx = extraNum * 27;
			        	//console.log('__上偏移值:'+topx);
						$odTreeCon.css({
			            	position:'absolute',
			            	top:topx+'px',
			            	width:'100%'
			            }).find('>ul').css({
			            	height:'auto',
			            	'min-width':'190px'
			            });
			            $('div.ui-custom-od_tree').height(_h);
			            //console.log("pageH1:"+$('div.ui-custom-od_tree').height());
			            window.setTimeout(function(){
				            myScroll = new eddyScroll(target,{
				            	checkDOMChanges:true,
				                useTransform:false,
				                hScrollbar:false,
				                vScrollbar:false
				            });
			            },500);
			            //console.log("pageH2:"+$('div.ui-custom-od_tree').height()); 
			        }else{
			        	vScrollbar = false;	
		 				useTransform = false;
		 				//给frameset页面的右侧加左右边距
		 				var _frames = $(window.parent.document).find("frame");
		 				if(_frames.size() == 2){
		 					_frames.eq(1).attr("style","padding-left:10px;padding-right:10px;");
		 				}
		 				if(_frames.size() == 3){//按钮权限-分配权限页面有三个frame
		 					_frames.eq(2).attr("style","padding-left:10px;padding-right:10px;");
		 				}
		 				//页签+frameset页面，需要减去页签的高度27px和一个10px的补差
		 				if($(window.parent.parent.document).find("div.ui-tab").size() == 1){
		 					document.body.style.height = window.top.$('#pages').height() - 37 +'px';
		 				}else {
		 					setPageHeight();
		 				}
			        	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
			        	loaded();
			        }
			    }
			}else if(window.parent.parent.document.body.nodeName === 'FRAMESET'){
				/**
				 * frameset 页面
				 * 左侧树，右侧页签和iframe页面结构
				 * 如：目标计划中的计划编制页面
				 */
				//console.log("frameset");
				vScrollbar = false;	
 				useTransform = false;
 				if(window.parent.document.getElementById("uiTab")){
 					window.parent.$("#uiTab").attr("style","");//去掉页签里的margin外边距
 					window.parent.$("#ibox").attr("style","margin-top:6px");
 				}
 				setPageHeight();
	        	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
	        	loaded();
			}else{
		 		/**
				 * 非frameset 页面
				 * checkDOMChanges:true节点发生变化时，页面的滚动条的变化
				 * useTransform:false 页面树的定位
				 * hScrollbar/vScrollbar：false横竖滚动条的隐藏
				 */
				//console.log("非frameset");
		 		if(document.body.getAttribute('name') !== 'noScrollWin'){//noScrollWin:不需要滚动条的页面的标识
			 		setPageHeight();
			 		/**
				 	 * 特殊页面，有iframe且有滚动条的页面
				 	 * 需要把useTransform设为false，以免iframe页面有定位问题而导致页面不能操作
					 * 如：任务详情页面
					 */
			 		if(document.body.getAttribute('name') == 'taskDetail'){
			 			vScrollbar = false;	
		 				useTransform = false;
		 				var p_div = $(window.parent.document).find("iframe").parent()
		 				p_div.attr("style","margin-left:10px;margin-right:10px;");
			 			window.onunload = function(){
			 				p_div.attr("style","");
			 			}
			 		}
			        document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
			        loaded();	
			 	}
		 	}
	 	}
	 });
	 
	 function loaded() {
            var target = document.body.id;
            target = target && target != ''?target:"_bodyId";
            document.body.id = target;
            myScroll = new eddyScroll(target, {
            				checkDOMChanges:true, 
            				zoom:false,
                            vScrollbar: vScrollbar,
                            hScroll: false, //add by huanghui@2012-3-27 禁止横向滚动 
                            useTransform: useTransform,
			                onBeforeScrollStart: function (e) {
			                    var target = e.target;
			                    while (target.nodeType != 1) target = target.parentNode;
			                    if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA')
			                        e.preventDefault();
			                },
			                onScrollStart:function(){//开始滑动时执行的方法
			                	//console.log('开始滑动时执行的方法');
			                	$(document).click();	
			                }
                         
            });
            var  flag = 0, t;
            var eTarget = document.getElementById(target);
            eTarget.addEventListener("touchstart",touchStart,false);
            eTarget.addEventListener("touchend",touchEnd,false);
            function touchStart(){
                    flag = 1;
                    t = setTimeout(function(){
                        flag = 0;
                    },200);
                }
            function touchEnd(e){
                    clearTimeout(t);
                    flag = 0;
                }
        }
         /*  @wansha  2011-12-14  
          *	 1,处理有div隐藏显示的页面,只需要在显示隐藏的slideToggle()方法中加下面的回调函数就可以了
          *  	如：$("#id").slideToggle(function(){
          *				divRefresh();
          *			});
          *  2,处理页面局部刷新后，页面高度变化问题：调用该方法。
          */
        function divRefresh(){
			if ('ontouchstart' in window){
				setPageHeight();
				ipadUploadFile();
				myScroll.refresh();
			}
		}
		
		/**
		 * 根据不同的页面情况，给页面高度添加不同的高度值
		 * 1、div.ui-tab的页签页面
		 * 2、div.ui-tabPro的页签页面，例如信息管理等。
		 * 3、任务确认、计划编辑等页面，上面还有一个其他页签的页面
		 * 4、一般页面，加入一个10px的高度补偿
		 */
		function setPageHeight(){
			//console.log($(window.parent.document).find("div.ui-tabPro").size());
			if($(window.parent.document).find("div.ui-tab").size() == 1){
	 			document.body.style.height = window.top.$('#pages').height() - 37 +'px';
	 		}else if ($(window.parent.document).find("div.ui-tabPro").size() == 1){//div.ui-tabPro页签，例如信息管理页面。
	 			document.body.style.height = window.top.$('#pages').height() - 37 +'px';
	 		}else if(window.parent.document.getElementById("taskIndex")){//这个是判断任务确认页面的，该页面比较特殊所以特殊处理
	 			document.body.style.height = window.top.$('#pages').height() - 72 +'px';
	 		}else {
	 			document.body.style.height = window.top.$('#pages').height()+'px';
	 		}
		}
		
		/**
		 * @huanghui 2011-12-26
		 * 处理ipad上不能上传附件的问题，对其进行友好提示。
		 **/
		function ipadUploadFile(id){
			if ('ontouchstart' in window){
				var _addbegin;
				var _addon;
				if(id != null && id != ""){   //  计划编制中单独调用
					_addbegin = document.getElementById('addbegin'+id);
					_addon = document.getElementById('addon'+id);
				}else{
					_addbegin = document.getElementById('addbegin');
					_addon = document.getElementById('addon');
				}
	            if(_addbegin || _addon){
	               var _f ;
	               if(_addbegin){
	                  _f = _addbegin.parentNode;
		              $(_addbegin).find('input.buttonPro').buttonPro('disable');
	               }
	               if(_addon){
	                  _f = _addon.parentNode;
		              $(_addon).find('input.buttonPro').buttonPro('disable');
	               }
				   var _ipadUploadFile = $(_f).find('#ipadUploadFile');
	               if(_ipadUploadFile.size() == 0){   //解决附件添加在div隐藏显示里面，提示信息出现多次的问题（计划编制）
	               		var _fileDiv = document.getElementById('fileDiv'); 
	               		if(_fileDiv){     //解决附件添加在toolbar上面的问题（网络寻呼）
		               		$(_fileDiv.parentNode).append('<div style="color:red;" id="ipadUploadFile">请在PC机上进行附件上传操作！</div>');
	               		}else{
	               			$(_f).append('<div style="color:red;" id="ipadUploadFile">请在PC机上进行附件上传操作！</div>');
	               		}
		           }
				}
			}
		} 
		/***
		 * @huanghui 2011-12-21
		 * 解决ipad下有验证信息的select选择框,当其选择了某个属性的后，验证信息提示任然存在的问题
		 * 给select绑定事件，让其选中某个属性的时候获得焦点
		 */
		function selectValidate(){
			var selectTag = document.getElementsByTagName('select');
			for(var i=0; i<selectTag.length;i++){
				var _st = selectTag[i];
				if($(_st).hasClass("easyui-validatebox")){
					addEventHandler(_st,'change',function(){$(this).focus();});
				}
			}
		} 
		/**
		 * @zhangwq2011-12-29文本域高度增长;ipad不支持contenteditable;
		 */
		function textereaH() {
			//console.log('document.body-'+document.body.nodeName);
			if( document.body.nodeName === 'BODY' ){
				var ts = document.getElementsByTagName('textarea');
				//console.log('文本域的长度：'+ts.length);
				for(var i = 0; i < ts.length; i++ ) {
					//(function(){
						var t = ts[i],s;
						t.onfocus = function() {
							s = window.setInterval(function(){
								var h = parseInt(window.getComputedStyle(t,null)['height'],10);
								var sh = parseInt(t.scrollHeight,10);
								//console.log('h-'+h);
								//console.log('sh-0'+sh);
								if(h < sh - 2){
									t.style.height = sh + 'px';
									myScroll && myScroll.refresh();
								}
								//刷新滚动条
							},200);
						}; 
						t.onblur = function(){
							window.clearInterval(s);
						};
					//})();
				}
			}
		}
		$(function(){
			selectValidate();
			ipadUploadFile();
			textereaH();
		});
		
		
		
}