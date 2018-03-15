//全景办公dom元素生成
$(function(){
	//取消选中文本
	$(document).bind("contextmenu",function(){return false;});  
	$(document).bind("selectstart",function(){return false;}); 
	
	//方法调用区域
	/*deskCreate(110,20,600,0,3,8) ;
	deskCreate(600,20,600,0,4,8) ;
	deskCreate(-360,0,-1200,-90,2,6) ;
	deskCreate(-110,0,-1200,-90,3,6) ;
	pillarCreate(520,140,620,3) ;
	pillarCreate(1100,140,-200,1) ;
	pillarCreate(1100,140,-100,1) ;*/
	/*$('.desk').click(function(){
		createPerMsg(this) ;
	}) ;	*/
	
	
}) ;
/*-----dom元素创建开始-----*/
//正面办公桌模型搭建
var deskInit = '<div class="desk"><div class="desk-top"></div><div class="d-drawer-left"></div><div class="d-drawer-front"></div><div class="d-drawer-right"></div><div class="desk-right"></div><div class="desk-back"></div><div class="desk-mask"></div><div class="desk-per"></div></div>' ;
//对面办公桌模型搭建
var deskInitBack = '<div class="desk deskgrounpback"><div class="desk-top"></div><div class="d-drawer-left"></div><div class="d-drawer-front"></div><div class="d-drawer-right"></div><div class="desk-right"></div><div class="desk-back"></div><div class="desk-mask"></div><div class="desk-per"></div></div>' ;

//初始化地板
var groundInit = '<div class="ground"><div class="Lground1"></div><div class="Lground2"></div></div>' ;
//初始化柱子
var pillarInit= '<div class="pil-front"></div><div class="pil-left"></div><div class="pil-right"></div><div class="pll-back"></div><div class="pll-top"></div>' ;
var translateXNum ; //定义桌子x轴定位变量
var translateYNum ;//定义桌子y轴定位变量
var translateZNum ;//定义桌子z轴定位变量
var rotateYNum ; //桌子重定位选转的角度（例如L区域）
var pillarXNum ; //定义柱子x轴定位变量
var pillarYNum ;//定义柱子y轴定位变量
var pillarZNum ;//定义柱子z轴定位变量	

//循环创建办公桌组模型
//x:初始状态x轴定位坐标，y:初始状态y轴定位坐标，z:初始状态z轴定位坐标，roty:桌子整体绕y旋转的角度，num:捆绑组数，办公桌正面+对面合为一组，现例子中设置两种，一种是3组，一种是4组,deskgroundLen:初始化三、四个办公桌捆绑一组摆放的排数，例子中为7排。
function deskCreate(x,y,z,roty,num,deskgroundLen){
	translateXNum = x ;
	translateYNum = y ;
	translateZNum = z ;
	rotateYNum = roty ;
	//<div class="deskgroup" style="-webkit-transform:translate3d(110px,20px,650px) ;">		
	for(var i=0;i<deskgroundLen;i++){
		for(var j=0; j<num;j++){
			var deskgroupInit = '<div class="deskgroup" style="-webkit-transform:rotateY('+roty+'deg) translate3d(' + translateXNum +'px,'+ translateYNum + 'px,'+ translateZNum +'px);">'+deskInit + deskInitBack +'</div>' ;
			$('.content').append(deskgroupInit) ;
			$('.deskgroup').insertBefore('.ground') ;
			translateXNum += 110 ;
		}
		translateXNum = x ;
		translateZNum -= 150 ;
	}		
	/*if(rotateYNum == -90){
		$('.desk').css({'-webkit-transform-origin':'50% 50% 0px'}) ;
		$('.deskgrounpback').css({'-webkit-transform':'rotateY(180deg) translateY(-54px) translateZ(-128px)'}) ;
	}*/
}
//循环创建柱子模型
//x:初始状态x轴定位坐标，y:初始状态y轴定位坐标，z:初始状态z轴定位坐标，roty:桌子整体绕y旋转的角度，pillarNum:柱子个数实例为3个。
//<div class="pillar" style="-webkit-transform:translate3d(520px,-1060px,600px) ;">	
function pillarCreate(x,y,z,pillarNum){
	pillarXNum = x ;
	pillarYNum = y ;
	pillarZNum = z ;
	for(var i=0; i<pillarNum; i++){
		var pillarground = '<div class="pillar" style="-webkit-transform:translate3d(' + pillarXNum +'px,'+ pillarYNum + 'px,'+ pillarZNum +'px);">'+ pillarInit +'</div>' ;
		$('.content').append(pillarground) ;
		$('.pillar').insertBefore('.ground') ;
		pillarZNum -= 300 ;
	}
}
/*-----dom元素创建结束-----*/

//读取xml
/*$.get('../js/personMsg.xml',function(data){
	//读取xml文件中各属性值
	var xmluserID = $(data).find('userid') ;
	var xmldeskID = $(data).find('deskid') ;
	var xmlName = $(data).find('name') ;
	var xmlphoto = $(data).find('photo') ;
	var xmlduty = $(data).find('duty') ;
	var xmlmobi = $(data).find('mobi') ;
	var xmlphone = $(data).find('phone') ;
	for(var i=0; i<xmldeskID.length;i++){
		//给桌子添加相关属性
		$('.desk').eq(i).attr({'id':xmldeskID.eq(i).text(),'userphoto':xmlphoto.eq(i).text(),'userduty':xmlduty.eq(i).text(),'usermobi':xmlmobi.eq(i).text(),'userphone':xmlphone.eq(i).text()}) ;
		$('.desk-per').eq(i).append('<input type="checkbox" id=' + xmluserID.eq(i).text()+ ' />'+xmlName.eq(i).text()) ;
		if(i%13==0){
			$('.desk-per').eq(i).addClass('desk-per-girl') ;
		}
	}
}) ;

//人员事件	
function createPerMsg(obj){
	var offset = $(obj).offset();
	$(document).userInfo({
			x:offset.left,//横向 
			y:offset.top,//纵向 
			name:$(obj).text(),//姓名
			photo:$(obj).attr('userphoto'),//照片 
			org:"金和软件",//机构 
			duty:$(obj).attr('userduty'),//职位 
			mobi:$(obj).attr('usermobi'),//手机 
			phone:$(obj).attr('userphone'),//电话 
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
}*/



//人员事件	
function createPerMsg(obj){
	var offset = $(obj).offset();
	$(document).userInfo({
			x:offset.left,//横向 
			y:offset.top,//纵向 
			name:$(obj).text(),//姓名
			photo:'../JHsoft.UI.Lib/skin/default/images/userinfo/user.png',//照片 
			org:"金和软件",//机构 
			duty:'前端工程师',//职位 
			mobi:'1368368946x',//手机 
			phone:'0105869856',//电话 
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
}
	
//rotate control
/*$(function(){
	//initialize view
	$(".content").css("-webkit-transform",'rotateY(0deg)');
	//
	var sign = 0,
		beginX,
		intX,
		scale=6;
	$(document).mousedown(function(e){
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
		sign = 0;
	});
	
	function _rotate(x){
		$(".content").css("-webkit-transform",'rotateY(' + x + 'deg)');
	}
});*/