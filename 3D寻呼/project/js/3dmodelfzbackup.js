//全景办公dom元素生成
$(function(){
	//取消选中文本
	$(document).bind("contextmenu",function(){return false;});  
	$(document).bind("selectstart",function(){return false;});  
	
	//读取xml
	nameList = new Array() ;
	idList = new Array() ;
	$.get('../js/personMsg.xml',function(data){
		xmluserID = $(data).find('userid') ;
		xmldeskID = $(data).find('deskid') ;
		xmlName = $(data).find('name') ;
		xmlphoto = $(data).find('photo') ;
		xmlduty = $(data).find('duty') ;
		xmlmobi = $(data).find('mobi') ;
		xmlphone = $(data).find('phone') ;
		for(var i=0; i<xmlName.length;i++){
			$('.desk').eq(i).attr({'id':xmldeskID.eq(i).text(),'userphoto':xmlphoto.eq(i).text(),'userduty':xmlduty.eq(i).text(),'usermobi':xmlmobi.eq(i).text(),'userphone':xmlphone.eq(i).text(),}) ;
			$('.desk-per').eq(i).append('<input type="checkbox" id=' + xmluserID.eq(i).text()+ ' />'+xmlName.eq(i).text()) ;
			if(i%13==0){
				$('.desk-per').eq(i).addClass('desk-per-girl') ;
			}
		}
	}) ;
		
	/*-----dom元素创建开始-----*/
	//正面办公桌模型搭建
	var deskInit = '<div class="desk"><div class="desk-top"></div><div class="d-drawer-left"></div><div class="d-drawer-front"></div><div class="d-drawer-right"></div><div class="desk-right"></div><div class="desk-back"></div><div class="desk-mask"></div><div class="desk-per"></div></div>' ;
	//对面办公桌模型搭建
	var deskInitBack = '<div class="desk deskgrounpback"><div class="desk-top"></div><div class="d-drawer-left"></div><div class="d-drawer-front"></div><div class="d-drawer-right"></div><div class="desk-right"></div><div class="desk-back"></div><div class="desk-mask"></div><div class="desk-per"></div></div>' ;
	
	//初始化地板
	var groundInit = '<div class="ground"></div>' ;
	//初始化柱子
	var pillarInit= '<div class="pil-front"></div><div class="pil-left"></div><div class="pil-right"></div><div class="pll-back"></div><div class="pll-top"></div>' ;
	var translateXNum ; //定义x轴定位变量
	var translateYNum = '20px' ;//定义y轴定位变量
	var translateZNum ;//定义z轴定位变量
	var pillarXNum ; //定义柱子x轴定位变量
	var pillarYNum = '-1060px' ;//定义柱子y轴定位变量
	var pillarZNum ;//定义柱子z轴定位变量
	
	deskCreate(110,620,3,7) ;
	deskCreate(600,620,4,7) ;
	//循环创建办公桌组模型
	//x:初始状态x轴定位坐标，z:初始状态z轴定位坐标，num:捆绑组数，办公桌正面+对面合为一组，现例子中设置两种，一种是3组，一种是4组,deskgroundLen:初始化三、四个办公桌捆绑一组摆放的排数，例子中为7排。
	function deskCreate(x,z,num,deskgroundLen){
		translateXNum = x ;
		translateZNum = z ;
		//<div class="deskgroup" style="-webkit-transform:translate3d(110px,20px,650px) ;">		
		for(var i=0;i<deskgroundLen;i++){
			for(var j=0; j<num;j++){
				var deskgroupInit = '<div class="deskgroup" style="-webkit-transform:translate3d(' + translateXNum +'px,'+ translateYNum + ','+ translateZNum +'px);">'+deskInit + deskInitBack +'</div>' ;
				$('.content').append(deskgroupInit) ;
				translateXNum += 110 ;
			}
			translateXNum = x ;
			translateZNum -= 150 ;
		}
	}
	$('.content').append(groundInit) ;
	
	//循环创建柱子模型
	//x:初始状态x轴定位坐标，z:初始状态z轴定位坐标，pillarNum:柱子个数实例为3个。
	//<div class="pillar" style="-webkit-transform:translate3d(520px,-1060px,600px) ;">
	pillarCreate(520,600,3) ;
	function pillarCreate(x,z,pillarNum){
		pillarXNum = x ;
		pillarZNum = z ;
	    for(var i=0; i<pillarNum; i++){
			var pillarground = '<div class="pillar" style="-webkit-transform:translate3d(' + pillarXNum +'px,'+ pillarYNum + ','+ pillarZNum +'px);">'+ pillarInit +'</div>' ;
			$('.content').append(pillarground) ;
			pillarZNum -= 300 ;
		}
	}
	/*-----dom元素创建结束-----*/
	
	//人员事件
	$('.desk').click(function(){
		var offset = $(this).offset();		
		$(document).userInfo({
				x:offset.left,//横向 
				y:offset.top,//纵向 
				name:$(this).text(),//姓名
				photo:$(this).attr('userphoto'),//照片 
				org:"金和软件",//机构 
				duty:$(this).attr('userduty'),//职位 
				mobi:$(this).attr('usermobi'),//手机 
				phone:$(this).attr('userphone'),//电话 
				btnFnxh:function(){
					top.location="http://www.google.com/";
				},//寻呼事件 
				btnFngz:function(){
					top.location="http://www.baidu.com/";
					top.location.target = '_blank' ;
				},//工作分析 
				hand:"lb",//箭头方向，可选参数:lb rb lt rt l r
				status:"../JHsoft.UI.Lib/skin/default/images/userinfo/evection.png",//状态图标 
				statusTxt:"出差"//状态文字 
		});
	});
}) ;
//rotate control
$(function(){
	//initialize view
	$(".content").css("-webkit-transform",'rotateY(0deg)');
	//
	var sign = 0,
		beginX,
		intX,
		scale=6;
	$(document).mousedown(function(e){
		/*$('.desk').unbind('click') ;*/
		sign = 1;
		beginX = e.clientX;
		var tag = $(".content")[0].style.webkitTransform,
			tagX = tag.substring(8, tag.length);
			intX = parseInt(tagX,10);
	});
	$(document).mousemove(function(e){
		if(sign){
			var _x = intX + ((e.clientX - beginX)/scale);
			_rotate(_x);
		}
	});
	$(document).mouseup(function(){
		$('.desk').one('click',function(){
			var offset = $(this).offset();
			$(document).userInfo({
					x:offset.left,//横向 
					y:offset.top,//纵向 
					name:$(this).text(),//姓名
					photo:$(this).attr('userphoto'),//照片 
					org:"金和软件",//机构 
					duty:$(this).attr('userduty'),//职位 
					mobi:$(this).attr('usermobi'),//手机 
					phone:$(this).attr('userphone'),//电话  
					btnFnxh:function(){
						top.location="http://www.google.com/";
					},//寻呼事件 
					btnFngz:function(){
						top.location="http://www.baidu.com/";
						top.location.target = '_blank' ;
					},//工作分析 
					hand:"lb",//箭头方向，可选参数:lb rb lt rt l r
					status:"../JHsoft.UI.Lib/skin/default/images/userinfo/evection.png",//状态图标 
					statusTxt:"出差"//状态文字 
			});
		}) ;
		sign = 0;
	});
	
	function _rotate(x){
		$(".content").css("-webkit-transform",'rotateY(' + x + 'deg)');
	}
});