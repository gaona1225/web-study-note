/**
 * 作    者: 张勇辉 
 * 版    本: 1.2
 * 完成时间: 2011-07-12 
 * 描    述: userInfo
 * 关联文件: jQuery.js|jquery-ui|button.js
 */ 
;(function($){
	$.fn.userInfo = function(options){
	var defaults = {
			x:0,
			y:0,
			name:"张勇辉",
			photo:"../JHsoft.UI.Lib/skin/default/images/userinfo/user.png",
			org:"金和软件",
			duty:"前端架构",
			mobi:"1368368946x",
			phone:"不告诉你",
			btnFn:function(){alert("Http://www.uedcool.com/")},
			hand:"lb",
			status:"../JHsoft.UI.Lib/skin/default/images/userinfo/evection.png",
			statusTxt:"出差"
	}
	options = $.extend(defaults,options);
	this.each(function(){
		$(document).find(".c6ui-userInfo").remove();
	    var x = options.x,
			 y = options.y, 
	eddyCommon = options.hand,
			mH = document.documentElement.clientHeight,
			mW = $(document).width();
			
			var a = function(){
				var a;
				if(mW-x<290){
					a = "r";
				}else{
					a = "l";
				}
				return a;
				},
				b = function(){
				var b;
				if(y-$(document).scrollTop()<160){
					b = "t";
				}else if(mH+$(document).scrollTop()-y<160){
					b = "b";	
				}else{
					b = "b";
					}
				return b;
				};
			var eddyCommon = a()+b(),
				_x,
				_y;
			switch(eddyCommon){//lb rb lt rt
			case "lb":
			_x = x - 4,
			_y = y - 150;
			break;
			case "rb":
			_x = x - 250,
			_y = y - 150;
			break;
			case "lt":
			_x = x - 4,
			_y = y + 25;
			break;
			case "rt":
			_x = x - 250,
			_y = y + 25;
			break;
			}
		var infoBox =$("<div class='c6ui-userInfo' style='top:"+ _y +"px;left:" + _x +"px;'><div class='photoBox'><img src='"+ options.photo +"' style='width:80px;height:80px;' /><img class='status' src='"+ options.status +"' title='"+ options.statusTxt +"' /></div><div class='InfoTxt'><h6 class='name'>"+ options.name +"</h6>"+ options.org +"<br/>"+ options.duty +"<br/>手机:"+ options.mobi +"<br/>电话:"+ options.phone +"</div><div class='bottom'><input data-width='standard' type='button' class='c6ui-button' value='发寻呼' id ='eddy'/></div><div class='tria "+ eddyCommon +"'></div></div>");
		$("body").append(infoBox);
		infoBox.find("input.c6ui-button").buttonround();
		function remove(){
			infoBox.remove();
		}
		var _close = setTimeout(remove,1500);
		infoBox.hover(function(){
			clearTimeout(_close);
		},function(){
			setTimeout(remove,300);
		});
		infoBox.find("input")
		.click(function(){
			options.btnFn();
			remove();
		});
		});
	}
})(jQuery);
