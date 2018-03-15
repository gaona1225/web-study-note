
/*
 *作    者: 张勇辉 
 *版    本: 1.2 
 *完成时间: 2011-07-12 
 *描    述: Buttonround 
 *关联文件: jQuery.js|jquery-ui 
 */	
;(function($,undefined){
	$.widget("ui.buttonround",{
		options:{show:true},
		_create:function(){
			var self=this,
			o=this.options,
			btn=this.element,//元素自身 
			style=btn.attr("style")||"",
			width=btn.attr("data-width")||"",
			img=btn.attr("data-img")?"<div class='ico' style='background-image:url("+ btn.attr("data-img") +");'></div>":"<div class='s'></div>",//图片的路径 
			type=btn.attr("data-type")||"normal",//按钮类型
			corner=btn.attr("data-corner"),
			btnId=btn.attr("id")?"id='"+btn.attr("id")+ "_btn'":"" ,
			cornerleft=(corner==="left"||corner==="all")?"cl":"",
			cornerright=(corner==="right"||corner==="all")?"cr":"", 
			cml=(corner==="left"||corner==="all")?" btnl ":"",
			cmr=(corner==="right"||corner==="all")?" btnr ":"",
			btnBody = $("<span "+ btnId +" class='e_btn "+ cml + cmr + cornerleft +"'><span class='e_con "+ cornerright +"'>"+img+"</span></span>").insertBefore(btn);//构建结构 
			btn.addClass("btn").removeAttr("style").css("margin-bottom","-2px");//生成形态 
			btnBody.find("span.e_con").append(btn);//元素就绪 
			if(btn.is("[data-img]") && btn.is("[data-width]") && btn.attr("data-width")!="standard"){
				btn.width(width-30);
				}else if(btn.is("[data-width]") && btn.attr("data-width")!="standard"){
				btn.width(width-10);
				}else if(btn.is("[data-img]")&&btn.attr("data-width")=="standard"){
					btn.width(45);
				}else if(btn.attr("data-width")=="standard"){
					btn.width(66);
				}
		},
	_init:function(){
		var self=this,
			o=this.options,
			btn=this.element,//元素自身
			type=btn.attr("data-type")||"normal",//按钮类型
			disabled=btn.is(":disabled"),//是否禁用
			menu=$("<span class='triangle'></span>"),
			btnBody = btn.parent().parent();
			function h(){
				if(btn.is(":disabled")){
					btnBody.addClass("d");
					}else if(type=="normal"||type=="active"||type=="menu"){
						btnBody.addClass("h");
					}else if(type=="light"||type=="light menu"){
						btnBody.addClass("lh");
						btnBody.removeClass("l");
					}
				}
			function h2(){
				if(btn.is(":disabled")){
					btnBody.addClass("d");
					}else if(type=="normal"||type=="active"||type=="menu"){
						btnBody.removeClass("h");
					}else if(type=="light"||type=="light menu"){
						btnBody.addClass("l");
						btnBody.removeClass("lh");
					}
				}
			function md(){
				if(btn.is(":disabled")){
					btnBody.addClass("d");
					}else if(type=="normal"||type=="active"||type=="menu"){
						btnBody.addClass("c");
					}else if(type=="light"||type=="light menu"){
						btnBody.addClass("c");
						btnBody.removeClass("lh");
					}
				}
			function mu(){
				if(btn.is(":disabled")){
					btnBody.addClass("d");
					}else if(type=="normal"||type=="active"||type=="menu"){
						btnBody.removeClass("c");
					}else if(type=="light"||type=="light menu"){
						btnBody.removeClass("c");
						btnBody.addClass("lh");
					}
				}
			function mo(){
				if(btn.is(":disabled")){
					btnBody.addClass("d");
					}else if(type=="normal"||type=="active"||type=="menu"){
						btnBody.removeClass("c");
					}else if(type=="light"||type=="light menu"){
						btnBody.removeClass("c");
						btnBody.addClass("lh");
					}
				}	
				if(btn.is(":disabled")){
					btnBody.addClass("d");
				}else if(type=="normal"||type=="active"||type=="menu"){
						btnBody.removeClass("d");
						if(type=="active"){
							btnBody.addClass("a");
						}
				}else if(type=="light"||type=="light menu"){ 
					btnBody.addClass("l");
				}
				if(type=="menu"||type=="light menu"){
					btnBody.find(".e_con").append(menu);
				}
				if(o.show==false){
					btnBody.hide();
					}else{
						btnBody.show();
						}
				/*if(btn.is(":hidden")){
					btnBody.hide();
				}else if(btn.is(":visible")){
					btnBody.show();
				}*/
			btnBody.hover(function(){
							h();
						 },function(){
							h2();
						}).mousedown(function(){
							md();
						}).mouseup(function(){
							mu();
						}).mouseout(function(){
							mo();
						}).unbind("click").bind("click",function(e){
							if(btn.is(":disabled")){
								}else if(e.target.tagName!="INPUT" && e.target.tagName!="BUTTON"){
										btn[0].click();
							}
						});
		
		}
	})
})(jQuery);
//initialize
$(function(){
		 $("input.c6ui-button,button.c6ui-button").buttonround();  
});