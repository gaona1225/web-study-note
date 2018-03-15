/**
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

