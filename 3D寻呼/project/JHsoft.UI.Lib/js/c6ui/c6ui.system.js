/*
 *文 件 名: c6ui.system.js
 *创 建 者: 张勇辉 
 *版    本: 0.1β
 *完成时间: 
 *描    述: 
 *关联文件: jquery-1.5.2.min.js | jquery-ui-1.8.11.custom.min.js
 */
 
  
  /*
 *作    者: 张勇辉 
 *版    本: 
 *完成时间: 
 *描    述: widget userInfo
 *关联文件: 
 */ 
 (function($){
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
				//alert(eddyCommon+"/"+mH+"/"+mW+"/"+x+"/"+y);
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
		var infoBox =$("<div class='c6ui-userInfo' style='top:"+ _y +"px;left:" + _x +"px;'><div class='photoBox'><img src='"+ options.photo +"' style='width:80px;height:80px;' /><img class='status' src='"+ options.status +"' title='"+ options.statusTxt +"' /></div><div class='InfoTxt'><h6 class='name'>"+ options.name +"</h6>"+ options.org +"<br/>"+ options.duty +"<br/>手机:"+ options.mobi +"<br/>电话:"+ options.phone +"</div><div class='bottom'><input type='button' class='c6ui-button' value='工作分析' id ='btn-gzfx'/><input data-img='../JHsoft.UI.Lib/images/icon.system/16px/balloon-ellipsis.png' type='button' class='c6ui-button' value='寻呼' id ='eddy'/></div><div class='tria "+ eddyCommon +"'></div></div>");
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
			if($(this).attr('id') == 'eddy'){
				options.btnFnxh();
			}else if($(this).attr('id') == 'btn-gzfx'){
				options.btnFngz();
			}
			remove();
		});
		});
	}
})(jQuery);
  /*
 *作    者: 张勇辉 
 *版    本: 
 *完成时间: 
 *描    述: widget accordion
 *关联文件: 
 */ 
(function($){
	$.fn.accordion = function(options){
	var defaults = {}
	var options = $.extend(defaults,options);
	this.each(function(){
		var $this = $(this);
		$this.find(".con").hide().eq(0).show();
		$this.find(".item").eq(0).addClass("open");
		function getH(){
		var $h = $this.height() - 33;
		$this.find(".accordionCon").height($h);
		}
		getH();
		$(window).resize(getH);
		$this.click(function(event){
			var $target = $(event.target);
			if($target.is("h2.item span") && $target.is("h2.open span") ){
				$target.parent().removeClass("open").next().hide("blind",100);
			}else if($target.is("h2.item span")){
				$target.parent().addClass("open").next().show("blind",100);
			}
		});
	
		});
	};
})(jQuery);
 /*
 *作    者: 张勇辉 
 *版    本: 
 *完成时间: 
 *描    述: widget minSearch
 *关联文件: 
 */ 
 (function($){ 
	$.fn.minSearch = function(options){ 
			//各种属性、参数 
			var defaults = {
				btnClick:function(){},
				onFocus:function(){},
				onBlur:function(){},
				width:"100%"
			}
			var options = $.extend(defaults, options); 
			this.each(function(){ 
			//插件实现代码 
			var $this = $(this);
			var $widgetBox = $("<div class='c6ui-widget-minSearch' style='width:"+options.width+";'></div>");
			var $btn = $("<a href='javascript:void(0)' class='minSearchBtn'></a>");
			var $minSearchInput = $("<div class='minSearchInput'></div>");
			var $onClick = options.btnClick;
			var $onFocus = options.onFocus;
			var $onBlur = options.onBlur;
			$this.wrap($widgetBox).after($btn).wrap($minSearchInput).focus($onFocus).blur($onBlur).removeAttr("class");
			$btn.click($onClick);
			}); 
		}; 
})(jQuery); 
  /*
 *作    者: 杜文亚 
 *版    本: 
 *完成时间: 
 *描    述: widget public Search
 *关联文件: 
 */ 
  (function($){ 
	$.fn.publicSearch = function(options){ 
			//各种属性、参数 
			var defaults = {
				width:"100%",
				btnClick:function(){},
				onFocus:function(){},
				onBlur:function(){},
				searchIt:function(){}
			}
			var options = $.extend(defaults, options); 
			this.each(function(){ 
			//插件实现代码 
			var $this = $(this);			
			var $onClick = options.btnClick;
			var $onFocus = options.onFocus;
			var $onBlur = options.onBlur;
			var $searchIt = options.searchIt;
			$this.removeAttr("style");
			var $leftSelect = $('<a href="javascript:void(0)" class="leftSelect"></a>');
			var $rightSearch = $('<a href="javascript:void(0)" class="rightSearch" >搜索</a>');
			$this.wrap('<div class="c6ui_public_search"></div>')
			.after($rightSearch)
			.before($leftSelect);
			$this.focus($onFocus).blur($onBlur);
			$leftSelect.click($onClick);
			$rightSearch.click($searchIt);
			lastWidth();
			$(window).resize(function(){lastWidth()});
			function lastWidth(){
				var percent = "%";
				var px = "px";
				var ispercent = options.width.indexOf(percent);
				var ispx = options.width.indexOf(px);
				if(ispercent!=-1){
					$(".c6ui_public_search").css("width",options.width);
					$this.width($(".c6ui_public_search").width()-70);
				}else if(ispx!=-1){
					$(".c6ui_public_search").css("width",parseInt(options.width));
					$this.width(parseInt(options.width)-69);
				}else{
					return false;
				}
			};
			})
		}; 
})(jQuery); 
 /*
 *作    者: 张勇辉 
 *版    本: 
 *完成时间: 
 *描    述: widget Bubble
 *关联文件: 
 */
 (function($){ 
	$.fn.bubble = function(id,show,options){ 
			//各种属性、参数 
			var defaults = {
					x:100,
					y:100,
					corner:"leftTop",
					con:"<img src='../JHsoft.UI.Lib/images/eddy.png' />Eddy Zhang 友情提示:<br/>你没有定义con的参数，请检查你的参数设置。",
					onClick:function(){
						$(this).detach();
						}
			}
			var options = $.extend(defaults, options); 
			this.each(function(){ 
			//插件实现代码
			if(show==true){ 
			var $bubbleBody = $("<div class='c6ui-bubble' id='"+id+"' style='left:"+ options.x +"px;top:"+ options.y +"px;'></div>");
			var $bubbleCon = $("<table border='0' cellspacing='0' cellpadding='0' class='c6ui-bubble-layout'><tr><td class='lt'></td><td class='t'></td><td class='rt'></td></tr><tr><td class='l'></td><td class='con'>"+ options.con +"</td><td class='r'></td></tr><tr><td class='lb'></td><td class='b'></td><td class='rb'></td></tr></table>");
			var $corner = $("<div class='corner "+ options.corner +"'></div>");
			var $body = $("body");
				$bubbleBody.append($bubbleCon).append($corner).appendTo($body).show();
				$bubbleBody.click(options.onClick);

				}else{
					$("#"+id).detach();
				}
			}); 
		}; 
})(jQuery); 

/*
 *作    者: 张勇辉 
 *版    本: 
 *完成时间: 
 *描    述: widget progressBar
 *关联文件: 
 */
(function($){ 
	$.fn.progressBar = function(options){ 
			//各种属性、参数 
			var defaults = {}
			var options = $.extend(defaults, options); 
			this.each(function(){ 
			//插件实现代码 
			var $this = $(this);
			var $plan = $("<b></b>");
			var $progressBar=("<div class='c6ui-widget-progressBar'><span></span></div>");
			var $val = $this.val()+"%";
			//显示百分比文字

			//$this.after("<span style='font-size:11px; line-height:15px; vertical-align:top; _margin:-15px 3px 0 3px;; position:relative;float:right;'>"+$val+"</span>");
			$this.wrap($progressBar);
			$this.wrap($plan);
			function setPlan(){
				$this.hide().parent().animate({width:$val},"fast");
			}
			setPlan();
			}); 
		}; 
})(jQuery); 
/*
 *作    者: 李丁辉 
 *版    本: 
 *完成时间: 
 *描    述: Filter
 *关联文件: 
 */	
(function($,undefined){
	$.widget("ui.filter",{
		options:{},
		_create:function(){
			var o=this.opitons,
			filter=this.element,
			divs=filter.find("div.c6ui-filter-bottom").find("div"),
			spans=divs.find("span.c6ui-filter-close");
			divs.hover(
			function(){
				$(this).addClass("c6ui-filter-active");
			},
			function(){
				$(this).removeClass("c6ui-filter-active");
			}
			);
			spans.each(function(i,item){
				$(item).click(function(){
					$(this).parent().remove();
				})
			});
		}
	})
})(jQuery);

/*
 *作    者: 张勇辉
 *版    本: 
 *完成时间: 
 *描    述: Buttonround 
 *关联文件: 
 */	
(function($,undefined){
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
			menu=$("<span class='triangle'></span>"),
			corner=btn.attr("data-corner"),
			btnId=btn.attr("id")?"id='"+btn.attr("id")+ "_btn'":"" ,
			cornerleft=(corner==="left"||corner==="all")?"cl":"",
			cornerright=(corner==="right"||corner==="all")?"cr":"", 
			cml=(corner==="left"||corner==="all")?" btnl ":"",
			cmr=(corner==="right"||corner==="all")?" btnr ":"",
			btnBody = $("<span "+ btnId +" class='e_btn "+ cml + cmr + cornerleft +"' style='"+ style +"'><span class='e_con "+ cornerright +"'>"+img+"</span></span>").insertBefore(btn);//构建结构 
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
			btnBody = btn.parent().parent();
			function h(){
				if(btn.is(":disabled")){
					btnBody.addClass("d");
					}else if(type=="normal"||type=="active"||type=="menu"){
						btnBody.addClass("h");
					}else if(type=="light"){
						btnBody.addClass("lh");
						btnBody.removeClass("l");
					}
				}
			function h2(){
				if(btn.is(":disabled")){
					btnBody.addClass("d");
					}else if(type=="normal"||type=="active"||type=="menu"){
						btnBody.removeClass("h");
					}else if(type=="light"){
						btnBody.addClass("l");
						btnBody.removeClass("lh");
					}
				}
			function md(){
				if(btn.is(":disabled")){
					btnBody.addClass("d");
					}else if(type=="normal"||type=="active"||type=="menu"){
						btnBody.addClass("c");
					}else if(type=="light"){
						btnBody.addClass("c");
						btnBody.removeClass("lh");
					}
				}
			function mu(){
				if(btn.is(":disabled")){
					btnBody.addClass("d");
					}else if(type=="normal"||type=="active"||type=="menu"){
						btnBody.removeClass("c");
					}else if(type=="light"){
						btnBody.removeClass("c");
						btnBody.addClass("lh");
					}
				}
			function mo(){
				if(btn.is(":disabled")){
					btnBody.addClass("d");
					}else if(type=="normal"||type=="active"||type=="menu"){
						btnBody.removeClass("c");
					}else if(type=="light"){
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
				}else if(type=="light"){ 
					btnBody.addClass("l");
				}else if(type=="menu"){
					btnBody.find(".e_con").append(menu);
				}
				if(o.show === false){
					btnBody.hide();
					}else{
					btnBody.show();
					}
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
/*
 *作    者: 李丁辉
 *版    本: 
 *完成时间: 
 *描    述: poplist
 *关联文件: 
 */
(function($,undefined){
	$.widget("ui.poplist",{
		options:{},
		_create:function(){
			var o=this.options,
			poolist=this.element;
			poolist.find("ul.c6ui-menu-pop-list li,ul.c6ui-menu-pop-second-list li").hover(function(){
				$(this).addClass("c6ui-menu-pop-active");
			},function(){
				$(this).removeClass("c6ui-menu-pop-active");
			});
			poolist.find("ul.c6ui-menu-pop-list li").hover(function(){
				$("#menu-pop-second").position({my: "left top",at: "right",of: this,offset: "0 -12"}).show();
			})
		}
	});
})(jQuery);

/*
 *作    者: 李丁辉
 *版    本: 
 *完成时间: 
 *描    述: check
 *关联文件: 
 */
(function($,undefined){
	$.widget("ui.check",{
		options:{		
		},
		_init:function(){
			var o=this.options,//查询配置项
			input=this.element,//获取该元素
			checked=input.attr("checked"),
			disabled=input.attr("disabled"),
			key=input.attr("type"),
			$onclick = $(input).attr("onclick")||function(){},
			div=$("<div></div>",{"class":"c6ui-"+key}),
			className=["c6ui-"+key,disabled?"-disabled":"-normal",checked&&(input.attr("data-type")?"-"+input.attr("data-type"):"-checked")||""];
			input.hide().after(div);
			//input.after(div);
			//div.attr("onclick",$onclick );
			div.addClass(className.join(""));
			if(!disabled){
				div.hover(
				function(){
					div.addClass(["c6ui-",key,"-active",input.attr("checked")&&(input.attr("data-type")?"-"+input.attr("data-type"):"-checked")||""].join(""));
				},
				function(){
					div.removeClass(["c6ui-",key,"-active",input.attr("checked")&&(input.attr("data-type")?"-"+input.attr("data-type"):"-checked")||""].join(""));
				});
				div.click(function(){
					if(input.is(":radio")){
						//input.attr("checked",true);
						input.click();
						if(input.attr("name")){
							$(":radio[name='"+input.attr("name")+"']").each(function(i,item){
								var div=$(item).next(),
								input=$(item),
								newclassName=["c6ui-"+key,input.attr("disabled")?"-disabled":"-normal",input.attr("checked")&&"-checked"||""];
								div.removeClass().addClass("c6ui-radio").addClass(newclassName.join(""));
							})
							//input.click();
						}
					}else{
						var checked=!input.attr("checked"),newclassName;
							//input.attr("checked",checked);
							newclassName=["c6ui-"+key,input.attr("disabled")?"-disabled":"-normal",checked&&(input.attr("data-type")?"-"+input.attr("data-type"):"-checked")||""];
							div.removeClass().addClass("c6ui-checkbox").addClass(newclassName.join(""));
							input.attr("checked",checked);
							input.click();
							input.attr("checked",checked);
					}
				})
				
			}
			//div.click(function(){
				//setTimeout($onclick,50);
				//$(input).click();
				//});
		},
		/*add by duwy 销毁构造的widget*/
		destroy:function(){ 
			$(this.element).next("div[class*='c6ui-']").remove();
		}
	})
})(jQuery);

/*
 *作    者: 李丁辉 
 *版    本: 
 *完成时间: 
 *描    述: Textinput
 *关联文件: 
 */	
(function($, undefined ) {
$.widget( "ui.textinput",{
	options: {
	},
	_create:function(){
		var self=this,
		o=this.options,
		text=this.element,
		span,
		focus=false,
		isable=!!text.attr("disabled");
	    if(!text.parent().is(".c6ui-form")){
				text.wrap($('<span></span>')).wrap($('<div></div>',{"class":"c6ui-margin"})).wrap($('<div></div>',{"class":"c6ui-border"})).wrap($('<div></div>',{"class":"c6ui-padding"}));
		}
		span=text.parent().parent().parent().parent();
		if(isable){
			span.addClass("c6ui-textinput-disabled");
		}
		else{
			span.addClass("c6ui-textinput-normal");
			text.bind("mouseover focus focusin click",function(){
				if(span.is(".c6ui-textinput-normal")){
					span.removeClass("c6ui-textinput-normal").addClass("c6ui-textinput-active");
				}
			})
			.bind("focus",function(){
				focus=true;
			})
			.bind("blur focusout",function(){
				focus=false;
				if(span.is(".c6ui-textinput-active")){
					span.removeClass("c6ui-textinput-active").addClass("c6ui-textinput-normal");
				}
			}).bind("mouseout",function(){
				if(focus==false&&span.is(".c6ui-textinput-active")){
					span.removeClass("c6ui-textinput-active").addClass("c6ui-textinput-normal");
				}
			})
		}
		
	}
});
})( jQuery );
/*
 *作    者: 李丁辉 
 *版    本: 
 *完成时间: 
 *描    述: Formtable 
 *关联文件: 
 */	
(function($, undefined) {
    $.widget("ui.formtable", {
        options: {
    },
    _create: function() {
        var self = this,
		o = this.options,
		table = this.element,
		fontsize = parseInt(table.css("font-size"));
        table.children(":first").children().each(function(i, item) {
            $(item)
			.children("td:even")
			.each(function(i, tde) {
			    var texalign = tde.style.textAlign || "right", width = tde.style.width || fontsize * 8.5 + "px";
			    $(tde).css({ "overflow": "hidden", "text-align": texalign, "width": width })
			})
			.end()
			.children("td:odd")
			.each(function(i, tdo) {
			    var texalign = tdo.style.textAlign || "left", w = $(tdo).width(),input=$(":text,textarea", tdo);
			    $(tdo).css({ "text-align": texalign });
			    input.width(input[0]&&input[0].style&&input[0].style.width||(w - 6));
			})
        });
    }
});
})(jQuery);
/*
 *作    者: 杜文雅 
 *版    本: 
 *完成时间: 
 *描    述: Select
 *关联文件: 
 */	
//(function($){
//	$.fn.c6uiSelect = function(options){
//	var defaults = {
//		/*position:"none"*/
//	}
//	var options = $.extend(defaults,options);
//	return this.each(function(){
//		$c6uiSelect = $('<div class="c6ui_select"></div>');
//		$(this)
//			.hide()
//			.wrap($c6uiSelect)
//			.before('<div class="border1"><div class="border2"><div class="c6ui_select_main"><div class="c6ui_selected">fdsfdsfd</div><span></span></div></div></div><div class="border12"><div class="border22"><ul ></ul></div></div>');
//		/*define vars*/
//		var isNative = $(this).attr("nativeStatus");		/*whether to keep the native state, 'true' is keep*/
//		var objSize = $(this).css('width');				/*get a deault width of the drop-down-list*/
//		var isDisabled = $(this).attr("disabled");
//		//alert(isDisablee);
//		var clickIndex = -1;
//		var nativeSelect = $(this);
//		var $Select = $(this).parent('div');	
//		var $border12 = $Select.find(".border12");
//		var $border22 = $border12.find(".border22");
//		var $ul = $border22.find("ul");	
//		var $selectMainTop = $Select.find(".border1").find(".border2").find(".c6ui_select_main");
//		var $c6uiSelected =  $selectMainTop.find(".c6ui_selected");
//		var optionItems = $(this).children('option');
//		var optionLength = optionItems.length;				/*The number of drop-down list data section*/
//		var allHeight = optionLength*21+5;				/*$li.width()==21,temp*/
//		var tempLi = "";
//		var tag = 0;
//		if(isDisabled){
//			$Select.removeAttr("class").addClass("c6ui_select_unable");
//		}
//		/*=====read select nativeStatus data=====*/
//		var readData = function(){
//			for(var i = 0; i<optionLength;i++){
//				var temp = "<li><a href='javascript:void(0)'>" + $(optionItems[i]).html() + "</a></li>";	
//				tempLi = tempLi + temp;
//				if($(optionItems[i]).attr('selected') === true){
//					tag = i;
//				};
//			};	
//			$ul.height(allHeight+"px").width((parseInt(objSize)-6)+"px").empty().append(tempLi);
//			$border22.height(allHeight+"px").width((parseInt(objSize)-4)+"px");
//			$border12.height((allHeight+1)+"px").width((parseInt(objSize)-2)+"px");
//			var $li = $ul.find('li');
//			$c6uiSelected.html($li.eq(tag).html());
//			$li.eq(tag).addClass("li_hover");
//		};
//		/*write in the real select*/
//		var passData = function(index){
//			nativeSelect.children("option")
//						.attr("selected","false")
//						.eq(index)
//						.attr("SELECTED","SELECTED");
//		}
//		/*initial drowpDownList*/
//		var initialSelect = function(){
//			$Select.width(objSize);
//			readData();
//		};
//		initialSelect();
//		$ul.find("li").click(function(event){
//			clickIndex = $(this).index();
//			var newCurrent = $(this).text();
//			$ul.find("li").removeClass().eq(clickIndex).addClass("li_hover");
//			$c6uiSelected.html(newCurrent);
//			passData(clickIndex);
//			$Select.removeAttr("class").addClass("c6ui_select");			
//			event.stopPropagation();
//		})
//		$c6uiSelected.click(function(event){
//			if($Select.hasClass("select_hover")){				
//				$Select.removeAttr("class").addClass("c6ui_select_active");
//			}else if($Select.hasClass("c6ui_select")){
//				$Select.removeAttr("class").addClass("c6ui_select_active");
//			}else if($Select.hasClass("c6ui_select_active")){
//				$Select.removeAttr("class").addClass("c6ui_select");
//			}else if($Select.hasClass("c6ui_select_unable")){
//				$Select.addClass("c6ui_select_unable");
//			}
//			event.stopPropagation();
//		});
//		$selectMainTop.hover(function(){
//			if($Select.attr("class") == "c6ui_select_unable"){
//			}else{
//				$Select.addClass("select_hover");
//			}
//		},function(){
//			$Select.removeClass("select_hover");
//		}
//		);
//		$(document).click(function(){
//			if($Select.attr("class") == "c6ui_select_unable"){
//				$Select.addClass("c6ui_select_unable");
//			}else{
//				$Select.removeAttr("class").addClass("c6ui_select");
//			}
//		})
//	});
//	};  
//})(jQuery);


//view zoom fix
//$("head").append("<meta http-equiv='pragma' content='no-cache'>");
$("head").append("<meta name='viewport' content='width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1.4, user-scalable=yes'>");
	
	
$(function(){
/*---------------------------Document Ready Begin-------------------------------------*/
/*
 *作    者: 张勇辉 
 *版    本: 
 *完成时间: 
 *描    述: set main height function
 *关联文件: 
 */
function setLayout(){
	var winHeight = $(window).height();
	var headerHeight = $("#c6ui-header").height();
	var subMenuHeight = $("#c6ui-header-subpage").height();
	var H = headerHeight + subMenuHeight;
	var mainHeight;
	if(winHeight>H){
			var regexiPad = new RegExp(/iPad/);//创建iPad标识
			//判断是否是iPad
			if( regexiPad.exec(navigator.userAgent) || navigator.userAgent.match(/Android/i)) {
			 mainHeight=null;
			 $("#c6ui-bottomSide").css("position","relative");
			 $("#close-footer").hide();
			 }else{
				 mainHeight = winHeight - H;
				 }		
		}else{
			mainHeight = 300;
			}
	$("#c6ui-main").height(mainHeight-20);
	}
	
	//window set run
	setLayout();
	$(window).resize(setLayout);
	
	
/*
 *作    者: 张勇辉 
 *版    本: 
 *完成时间: 
 *描    述: set header height function
 *关联文件: 
*/
$("#c6ui-header-handle").toggle(function(){
			$("#c6ui-header-extend").slideUp(200,setLayout);
			$(this).find("img").hide().eq(1).show();
		},function(){
			$("#c6ui-header-extend").slideDown(200,setLayout);
			$(this).find("img").hide().eq(0).show();
		});
/*
 *作    者: 张勇辉 
 *版    本: 
 *完成时间: 
 *描    述: set tab width function
 *关联文件: 
*/
function setTab(){
	var headerMin = $("#c6ui-header-min").width();
	var headerTabHeight = headerMin - 350;
	$("#c6ui-header-min-tab").width(headerTabHeight);
	}

$("#c6ui-tabs-list li").live("click",function(){
	$("#c6ui-tabs-list li.tab_hover").removeAttr("class");
	$(this).addClass("tab_hover");
});
//set tab run
setTab();
$(window).resize(setTab);



	

/*
 *作    者: 杜文雅 
 *版    本: 
 *完成时间: 
 *描    述: 快捷菜单
 *关联文件: 
 */	

	$("#turn_off").live('click',function(){
		$(".change_style").fadeOut("fast");
		$(this).hide();
		$("#turn_on").show();
	});
	$("#turn_on").live('click',function(){
		$(".change_style").fadeIn("fast");	
		$(this).hide();
		$("#turn_off").show();
	});	
	var imgPath = "../JHsoft.UI.Lib/images/";
	//滚动按钮的状态



	var scrollBtnStatus = function(){	
		var status;		
		var animated = $(".quick_menu_list ul").is(":animated");
		var currentLeft = $(".quick_menu_list ul").css("margin-left");
		var liNum = $(".quick_menu_list ul li").length;
		var liWidth = $(".quick_menu_list ul li:first").outerWidth();
		var otherWidth = liWidth*(liNum-6) + parseInt(currentLeft);
		if(parseInt(currentLeft) == 0 && otherWidth > 0){
			status = "leftUnable";		//左侧按钮不可用，右侧按钮可以点击
		}else if(parseInt(currentLeft) == 0 && otherWidth <= 0){
			status = "allNo";			//左右两侧按钮都不可以使用
		}else if(parseInt(currentLeft) != 0 && otherWidth <= 0){
			status = "rightUnable";		//左侧按钮可以点击，右侧按钮不可用
		}else{
			status = "allCan";			//左右两侧按钮都可以使用



		};
		switch(status)
		{
			case "leftUnable":
				$(".change_style .left_btn a img").attr("src",""+imgPath+"footer_arrow_left_no.png");
				$(".change_style .right_btn a img").attr("src",""+imgPath+"footer_arrow_right.png");
				break;
			case "allNo":
				$(".change_style .left_btn a img").attr("src",""+imgPath+"footer_arrow_left_no.png");
				$(".change_style .right_btn a img").attr("src",""+imgPath+"footer_arrow_right_no.png");
				break;
			case "rightUnable": 
				$(".change_style .left_btn a img").attr("src",""+imgPath+"footer_arrow_left.png");
				$(".change_style .right_btn a img").attr("src",""+imgPath+"footer_arrow_right_no.png");
				break;
			case "allCan": 
				$(".change_style .left_btn a img").attr("src",""+imgPath+"footer_arrow_left.png");
				$(".change_style .right_btn a img").attr("src",""+imgPath+"footer_arrow_right.png");		
				break;	
		}
	}
	/*快捷菜单的滚动操作*/
	$(".change_style .left_btn a img").live('click',function(){
		var animated = $(".quick_menu_list ul").is(":animated");
		var currentLeft = $(".quick_menu_list ul").css("margin-left");
		var liNum = $(".quick_menu_list ul li").length;
		var liWidth = $(".quick_menu_list ul li:first").outerWidth();
		var otherWidth = liWidth*(liNum-6) + parseInt(currentLeft);	
		if(parseInt(currentLeft) != 0 && !animated ){
			$(".quick_menu_list ul").animate({ marginLeft: "+="+liWidth*6+"px" }, 1000, scrollBtnStatus);
		}else{
			$(this).fadeOut("fast").fadeIn("fast");
		};
	});	
	$(".change_style .right_btn a img").live('click',function(){																  
		var animated = $(".quick_menu_list ul").is(":animated");
		var currentLeft = $(".quick_menu_list ul").css("margin-left");
		var liNum = $(".quick_menu_list ul li").length;
		var liWidth = $(".quick_menu_list ul li:first").outerWidth();
		var otherWidth = liWidth*(liNum-6) + parseInt(currentLeft);
		if(otherWidth > 0 && !animated){
			$(".quick_menu_list ul").animate({ marginLeft: "-="+liWidth*6+"px" }, 1000, scrollBtnStatus);
			scrollBtnStatus();
		}else{
			$(this).fadeOut("fast").fadeIn("fast");
		};		
	});
	//最外层背景色

	//阻止内层滑动层的背景变色
	$(".quick_menu_list").bind({
		mouseenter: function() {
			$("#c6ui-quick-menu").removeClass('change_style1');
			return false;
		}, 
		mouseleave: function(event) {
			$("#c6ui-quick-menu").addClass('change_style1');
			return false;
		},
		click:function(){
			return false;
		}
	});
	/*当窗口改变时重新设置快捷方式的整体宽度*/
	function reloadWidth(){
		var currentWidth = document.body.clientWidth;
			if(currentWidth < 1024){
				$(".change_style").removeAttr("id").attr("id","c6ui-quick-menu-short");
			}else{
				$(".change_style").removeAttr("id").attr("id","c6ui-quick-menu");
			}
	};
	reloadWidth();
	$(".quick_menu_list ul").animate({ marginLeft: "-=0"+"px" }, 1000, scrollBtnStatus);
	$(window).resize(function(){
		reloadWidth();
	});
	
/*
 *作    者: 张勇辉 
 *版    本: 
 *完成时间: 
 *描    述: Tab active
 *关联文件: 
 */		

	$(".c6ui-base-minTab,.c6ui-base-minTab-portrait,.c6ui-base-Tab-portrait-left,.c6ui-base-Tab-portrait-right,.c6ui-base-Tab-top,.c6ui-base-Tab-bottom").live("click",function(event){
		var $target = $(event.target);
		var $this = $(this);
		if($target.is("li")){
			$this.find("li").removeClass("active");
			$target.addClass("active");
		}else if($target.is("li span")){
			 $this.find("li").removeClass("active");
			 $target.parent("li").addClass("active");
		}
	});


/*
 * widget progressBar config
 */
 $(".widget-progressBar").progressBar();

/*
 * widget button config
 */
$("input.c6ui-button,button.c6ui-button").buttonround();
 
/*
 * widget formtable config
 */
$("table.widget-formtable").formtable();
/*
 * widget check config
 */
$(":checkbox.c6ui-check,:radio.c6ui-check,span.c6ui-check :checkbox,span.c6ui-check :radio").check();



/*
 * widget textinput config
 */
 $(":text.widget-textinput,textarea.widget-textinput,:password.widget-textinput").textinput();
 /*
 * widget poplist config
 */
 $("div.c6ui-menu-pop").poplist();
 /*
 * widget filter config
 */
$(".c6ui-filter").filter();
 /*
 * widget select config
 */
// $("select").c6uiSelect();
  /*
 * widget accordion config
 */
 $(".c6ui-widget-accordion").accordion();
  /*
 * widget tab config
 */
 // initalTab();
  /*
 * widget accordion config
 */
 initalTab();

 /*------------------------------------------预览-----------------------------------------------------*/
 	$(".c6ui-widget-slider table").width($(".c6ui-widget-slider div").width()+2);
	$(".c6ui-widget-slider b.handle").draggable({
	containment:"parent",
	axis:"x",
	drag: function() {
	var offset = $(this).position();
	var getAll = $(".c6ui-widget-slider").width();
	var intOffset = parseInt(offset.left);
	var intAll = parseInt(getAll)-16;
	var setVal = parseInt(intOffset / intAll * 100);
	$("#th").val(setVal);
	$(".c6ui-widget-slider div span").width(offset.left);
				}
			}).hover(function(){
				$(this).addClass("handleHover");
			}, function(){
				$(this).removeClass("handleHover");
			});
 /*------------------------------------------预览-----------------------------------------------------*/	
 //plus btn
	$(".c6ui-widget-btn").each(function(){
	 
		$(this).hover(function(){
			$(this).find(".widget-btn-left").addClass("widget-btn-left-h");
			$(this).find(".widget-btn-plus").addClass("widget-btn-plus-h");
		},function(){
			$(this).find(".widget-btn-left").removeClass("widget-btn-left-h").removeClass("widget-btn-left-c");
			$(this).find(".widget-btn-plus").removeClass("widget-btn-plus-h").removeClass("widget-btn-plus-c");
		}).mousedown(function(e){
			if($(e.target).is(".widget-btn-plus")||$(e.target).is(".widget-btn-plus > img")){
				$(this).find(".widget-btn-plus").addClass("widget-btn-plus-c");
			}else{
				$(this).find(".widget-btn-left").addClass("widget-btn-left-c");
			}
			//alert(e.target.);
		}).mouseup(function(e){
			if($(e.target).is(".widget-btn-plus")||$(e.target).is(".widget-btn-plus > img")){
				$(this).find(".widget-btn-plus").removeClass("widget-btn-plus-c");
			}else{
				$(this).find(".widget-btn-left").removeClass("widget-btn-left-c");
			}		});
	});
	//widget btn
		$(".c6ui-widget-btn-single").each(function(){
		$(this).hover(function(){
			$(this).addClass("c6ui-widget-btn-single-h");
		},function(){
			$(this).removeClass("c6ui-widget-btn-single-h");
		}).mousedown(function(){
				$(this).addClass("c6ui-widget-btn-single-c");
		}).mouseup(function(){
			$(this).removeClass("c6ui-widget-btn-single-c");
		});
	});
	$(".c6ui-header-handle").hover(function(){
		$(this).addClass("c6ui-header-handle-h");
	},function(){
		$(this).removeClass("c6ui-header-handle-h");
	}).mousedown(function(){
				$(this).removeClass("c6ui-header-handle-h").addClass("c6ui-header-handle-c");
		}).mouseup(function(){
			$(this).removeClass("c6ui-header-handle-c").addClass("c6ui-header-handle-h");
		});
	
		function isipad(){
			var regexiPad = new RegExp(/iPad/);//创建iPad标识
			//判断是否是iPad
			return regexiPad.exec(navigator.userAgent) ;
		}
		
		if (!isipad())	$("#c6ui-quick-menu").bind({
		mouseenter: function() {
			$(this).addClass('change_style1');
		}, 
		mouseleave: function() {
			$(this).removeClass('change_style1');
		},
		click:function(e){
			if($(e.target).is("DIV")){
			   $(this).hide();
				$(".change_style").fadeOut("fast");
				$("#turn_off").hide();
				$("#turn_on").show();
			}else{
				return;
			};
		}
	});
/*---------------------------Document Ready End-------------------------------------*/
});


/*
 *作    者: 张勇辉 
 *版    本: 
 *完成时间: 
 *描    述: set iframe height
 *关联文件: 
 */	
//$(window).load(function(){
//		$(".c6ui-iframe-main").height($(".c6ui-iframe-main").contents().find("body").attr('scrollHeight')); 
//				});
	function initalTab(){
	$(".c6ui-base-Tab-top").hide().show();
	$(".c6ui-base-Tab-top").each(function(i){
		var outerDivWidth = parseInt($(this).width());     //最外层div的宽度
		var $ul = $(this).children("ul");
		var allLiWidth = liWidth($ul);
		(outerDivWidth-allLiWidth) > 11 ? removeArrow($(this)) : addArrow($(this));	
		var $leftArrow = $ul.children("li.left_arrow");
		var $rightArrow = $ul.children("li.right_arrow");
		var marginLength = parseInt($ul.css("marginLeft"));
		var distance = allLiWidth + marginLength;   //ul的margin-left的值
		arrowBtnStyle($leftArrow,$rightArrow,marginLength,$(this).width(),distance);
	});
	};
	/*temp code*/
	$("ul li.left_arrow").live("click",function(){
		var moveLength = 100;
		if(parseInt($(this).parent().css("marginLeft"))>-100){
			moveLength = parseInt($(this).parent().css("marginLeft"));
		};
		if(isAnimate($(this).parent())){
			if($(this).children("img").hasClass("left_able")){			
				$(this).parent("ul").animate({marginLeft:"+="+moveLength+"px"},{duration:500},setTimeout(initalTab,501));
		}
		};
	});
	$("ul li.right_arrow").live("click",function(){
		if(isAnimate($(this).parent()) && $(this).children("img").hasClass("right_able")){
			$(this).parent("ul").animate({marginLeft:"-="+100+"px"},{duration:500},setTimeout(initalTab,501));
		};							
	});
	/*make sure is animate obj,'true' is not in animating*/
	function isAnimate(obj){
		return obj.is(":animated") ? false : true;
	}
	function arrowBtnStyle(leftArrow,rightArrow,marginLeftWidth,thisWidth,distance){
		if(marginLeftWidth < 0){
			leftArrow.children("img").removeAttr("class").addClass("left_able");
		}else{
			leftArrow.children("img").removeAttr("class").addClass("left_unable");
		};	
		if(distance+11 > thisWidth){			
			rightArrow.children("img").removeAttr("class").addClass("right_able");
		}else{
			rightArrow.children("img").removeAttr("class").addClass("right_unable");
		};
	};
	/*add left and right arrows code for current 'ul' */
	function addArrow(obj){
	if(obj.hasClass('add_arrow')){
		return false;
	}else{
		obj.addClass('add_arrow').children('ul').prepend('<li class="left_arrow"><img src="../JHSoft.UI.Lib/images/blank.gif"/></li><li class="right_arrow"><img src="../JHSoft.UI.Lib/images/blank.gif"/></li>')
	}
	};	
	function removeArrow(obj){
		if(obj.hasClass('add_arrow')){
			obj.removeClass('add_arrow');
			obj.children('ul').children("li[class*='_arrow']").remove();
		}else{
			return false;
		}
	};
	/*argument(obj) is the 'ul' which you want to calculate the content(li) width*/
	function liWidth(obj){
		var liVisible = obj.children("li:visible");
		var temp = 0;
		for(i = 0;i<liVisible.length;i++){
			temp += parseInt(liVisible.eq(i).outerWidth(true));
		}
		return temp;
	}
	$(window).resize(function(){
		setTimeout(initalTab,100);
		$(".c6ui-base-Tab-top").hide().show();
	});
	function checkListener(){
			function aa(){
		$(":checkbox.c6ui-check,:radio.c6ui-check,span.c6ui-check :checkbox,span.c6ui-check :radio").check("destroy").check();
		}
		setInterval(aa,1000);
	}