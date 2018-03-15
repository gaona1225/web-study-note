/**
 * 声明JHSoft包 
 * @author: 张勇辉 
 */
/**
 * @fileOverview 金和软件插件集
 * @version 1.0
 * @author 张勇辉 
 * @author 杜文雅  
 */
var eddy,
    ui = eddy = ui || {version: "1.0"}; 

﻿
/*
 *作    者: 张勇辉 
 *版    本: 1.0 
 *完成时间: 2011-07-12 
 *描    述: buttonPro 
 *关联文件: jQuery.js|jquery-ui.js 
 */	
(function($,undefined){
    /** 
	* @class 标准按钮插件
    * @name buttonPro
    * @description 标准按钮插件
	* @version 1.0 
    */
	$.widget("ui.buttonPro",
	/** @lends buttonPro.prototype */		 
	{
		options:{},
		_create:function(){
			var _self = this.element,//元素自身 
				o = this.options,
				_img = _self.attr("data-img") || "s",//图片的路径 
				_width = _self.attr("data-width") || "",
				_btnBody = $("<span />").addClass("ui-buttonPro").append("<span class='buttonPro-con'/>")	;
				_self.wrap(_btnBody)
				.before(function(){
						var _ico = $("<div />")	;
						if(_img!=="s"){
							_ico.addClass("ico").attr("style","background-image:url("+_img+")");
						}else{
							_ico.addClass("s");
						}
						return _ico;
				});//生成形态 
				if(_self.is("[data-img]") && _self.is("[data-width]") && _self.attr("data-width")!="standard"){
						_self.width(_width-30);
					}else if(_self.is("[data-width]") && _self.attr("data-width")!="standard"){
						_self.width(_width-10);
					}else if(_self.is("[data-img]")&&_self.attr("data-width")=="standard"){
						_self.width(46);
					}else if(_self.attr("data-width")=="standard"){
						_self.width(66);
					}
				if(_self.is("[data-img]")){
					var ie7 = navigator.userAgent.toLowerCase().match(/msie ([\d.]+)/);
					if(ie7 != undefined && ie7[1] === '7.0'){
						_self.get(0).style.padding = '0';
					}	
				}
			
		},
		_init:function(){
			var o=this.options,
				_self = this.element,//元素自身 
				_type=_self.attr("data-type")||"normal",//按钮类型
				_menu=$("<span class='triangle'/>"),
				_btnBody = _self.parent().parent();
			function h(){
				if(_self.is(":disabled")){
					_btnBody.addClass("ui-buttonPro-d");
					}else{
						_btnBody.addClass("ui-buttonPro-h");
					}
				}
			function h2(){
				if(_self.is(":disabled")){
						_btnBody.addClass("ui-buttonPro-d");
					}else{
						_btnBody.removeClass("ui-buttonPro-h");
					}
				}
			function md(){
				if(_self.is(":disabled")){
					_btnBody.addClass("ui-buttonPro-d");
					}else{
						_btnBody.addClass("ui-buttonPro-c");
					}
				}
			function mu(){
				if(_self.is(":disabled")){
						_btnBody.addClass("ui-buttonPro-d");
					}else{
						_btnBody.removeClass("ui-buttonPro-c");
					}
				}
			function mo(){
				if(_self.is(":disabled")){
					_btnBody.addClass("ui-buttonPro-d");
					}else{
						_btnBody.removeClass("ui-buttonPro-c");
					}
				}	
				if(_self.is(":disabled")){
					_btnBody.addClass("ui-buttonPro-d");
				}else{
					_btnBody.removeClass("ui-buttonPro-d");
				}
				if(_type=="menu"){
					_btnBody.find("span.buttonPro-con").append(_menu);
				}
				if(_self.css("display") == "none"){
					_btnBody.hide();
				}else {
					_btnBody.show();
				}
			_btnBody.hover(function(){
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
							if(_self.is(":disabled")){
								}else if(e.target.tagName!="INPUT" && e.target.tagName!="BUTTON"){
										_self[0].click();
							}
						});
			return _btnBody;
		},
		/**
		* @description 显示按钮
		* @return {buttonPro} buttonPro对象
		* @example
		* $("#logo").buttonPro('show');
		*/
		show:function(){
			this.element.show().parent().parent().show();
			return this.element;
		},
		/**
		* @description 隐藏按钮
		* @return {buttonPro} buttonPro对象
		* @example
		* $("#logo").buttonPro('hide');
		*/
		hide:function(){
			this.element.parent().parent().hide();
			return this.element;
		},
		/**
		* @description 禁用按钮
		* @return {buttonPro} buttonPro对象
		* @example
		* $("#logo").buttonPro('disable');
		*/
		disable:function(){
			this.element.attr("disabled",true).parent().parent().addClass("ui-buttonPro-d");
			return this.element;
		},
		/**
		* @description 启用按钮
		* @return {buttonPro} buttonPro对象
		* @example
		* $("#logo").buttonPro('enable');
		*/
		enable:function(){
			this.element.attr("disabled",false).parent().parent().removeClass("ui-buttonPro-d");
			return this.element;
		},
		/**
		* @description 销毁按钮
		* @return {buttonPro} buttonPro对象
		* @example
		* $("#logo").buttonPro('destroy');
		*/
		destroy:function(){
			this.element.parent().parent().before(this.element);
			this.element.next(".ui-buttonPro").remove();
			return this;
		}
	});
	
$.extend($.ui.buttonPro, {
	version: "1.0"
});

})(jQuery);
//initialize
$(function(){
		 $(".buttonPro").buttonPro();  
});﻿

/*
 *作    者: 张勇辉 
 *版    本: 1.0 
 *完成时间: 2011-07-12 
 *描    述: buttonActive 
 *关联文件: jQuery.js|jquery-ui.js 
 */	
(function($,undefined){
    /** 
	* @class 推荐按钮插件
    * @name buttonActive 
    * @description 推荐按钮插件
	* @version 1.0 
    */
	$.widget("ui.buttonActive",
	/** @lends buttonActive.prototype */
	{
		 options:{},
		 _create:function(){
				var o = this.options,
					_self = this.element,
					_btnBody = $("<span class='ui-buttonActive'><span></span></span>"),
					_width = _self.attr("data-width")||"";
					if(_width == "standard"){
						_self.addClass("standard");
					}else if(_width != ""){
						_self.width(_width)
					}
					_self.wrap(_btnBody);
					_self.focus(function(){
						this.blur();
					});
				
		},
		_init:function(){
			var _self = this.element,
				_btnBody = _self.parent().parent();
				//_self.css("color","#ffffff");
				_btnBody.hover(function(){
							$(this).addClass("ui-buttonActive-h");
						 },function(){
							$(this).removeClass("ui-buttonActive-h");
						}).mousedown(function(){
							$(this).addClass("ui-buttonActive-a");
						}).mouseup(function(){
							$(this).removeClass("ui-buttonActive-a");
						}).mouseout(function(){
							$(this).removeClass("ui-buttonActive-a");
						}).unbind("click").bind("click",function(e){
							if(e.target.tagName!="INPUT" && e.target.tagName!="BUTTON"){
									_self[0].click();
							}
						});
				return _btnBody;
		},
		/**
         * @description  加入show()按钮显示、hide()按钮隐藏、disable()按钮禁用、enable()按钮启用方法
         * @author： huanghui @2010-3-7
         * */
		
		/**
		* @description 显示按钮
		* @return {buttonActive} buttonActive对象
		* @example
		* $("#logo").buttonActive('show');
		*/
		show:function(){
			this.element.show().parent().parent().show();
		},
		/**
		* @description 隐藏按钮
		* @return {buttonActive} buttonActive对象
		* @example
		* $("#logo").buttonActive('hide');
		*/
		hide:function(){
			this.element.parent().parent().hide();
		},
        /**
		* @description 禁用按钮
		* @return {buttonActive} buttonActive对象
		* @example
		* $("#logo").buttonActive('disable');
		*/
        disable:function(){
            this.element.attr("disabled",true).parent().parent().addClass("ui-buttonActive-d");
        },
        /**
		* @description 启用按钮
		* @return {buttonActive} buttonActive对象
		* @example
		* $("#logo").buttonActive('enable');
		*/
		enable:function(){
			this.element.attr("disabled",false).parent().parent().removeClass("ui-buttonActive-d");
		},
		
		
		/**
		* @description 销毁按钮
		* @return {buttonActive} buttonActive对象
		* @example
		* $("#logo").buttonActive('destroy');
		*/

		destroy:function(){
			this.element.css("color","");/*加入这句话，销毁按钮样式的时候color属性没有去掉  huanghui@2010-3-12  */ 
			this.element.removeClass("standard").unwrap().unwrap();
			return this.element;
		}
	});
	
$.extend($.ui.buttonActive, {
	version: "1.0"
});

})(jQuery);

$(function(){
	$(".buttonActive").buttonActive();
});﻿
/*
 *作    者: 张勇辉 
 *版    本: 1.0 
 *完成时间: 2011-07-26 
 *描    述: buttonLight
 *关联文件: jQuery.js|jquery-ui.js 
 */	
(function($,undefined){
    /** 
	* @class 轻量按钮插件
    * @name buttonLight
    * @description 轻量按钮插件
	* @version 1.0 
    */
	$.widget("ui.buttonLight",
	/** @lends buttonLight.prototype */		 
	{
		options:{},
		_create:function(){
			var _self = this.element,//元素自身 
				o = this.options,
				_img = _self.attr("data-img") || "s",//图片的路径 
				_width = _self.attr("data-width") || "",
				_btnBody = $("<span />").addClass("ui-buttonLight").append("<span class='buttonLight-con'/>"),
				_type=_self.attr("data-type")||"normal",//按钮类型
				_menu = $("<span class='triangle'/>");
				_self.wrap(_btnBody)
				.before(function(){
						var _ico = $("<div />")	;
						if(_img!=="s"){
							_ico.addClass("ico").attr("style","background-image:url("+_img+")");
						}else{
							_ico.addClass("s");
						}
						return _ico;
				});//生成形态 
				if(_self.is("[data-img]") && _self.is("[data-width]") && _self.attr("data-width")!="standard"){
						_self.width(_width-30);
					}else if(_self.is("[data-width]") && _self.attr("data-width")!="standard"){
						_self.width(_width-10);
					}else if(_self.is("[data-img]")&&_self.attr("data-width")=="standard"){
						_self.width(46);
					}else if(_self.attr("data-width")=="standard"){
						_self.width(66);
					}
				if(_type=="menu"){
					_self.parent().append(_menu);
					}
			
		},
		_init:function(){
			var o=this.options,
				_self = this.element,//元素自身 
				_type=_self.attr("data-type")||"normal",//按钮类型
				_menu=$("<span class='triangle'/>"),
				_btnBody = _self.parent().parent();
			function h(){
				if(_self.is(":disabled")){
					_btnBody.addClass("ui-buttonLight-d");
					}else{
						_btnBody.addClass("ui-buttonLight-h");
					}
				}
			function h2(){
				if(_self.is(":disabled")){
						_btnBody.addClass("ui-buttonLight-d");
					}else{
						_btnBody.removeClass("ui-buttonLight-h");
					}
				}
			function md(){
				if(_self.is(":disabled")){
					_btnBody.addClass("ui-buttonLight-d");
					}else{
						_btnBody.addClass("ui-buttonLight-c");
					}
				}
			function mu(){
				if(_self.is(":disabled")){
						_btnBody.addClass("ui-buttonLight-d");
					}else{
						_btnBody.removeClass("ui-buttonLight-c");
					}
				}
			function mo(){
				if(_self.is(":disabled")){
					_btnBody.addClass("ui-buttonLight-d");
					}else{
						_btnBody.removeClass("ui-buttonLight-c");
					}
				}	
				if(_self.is(":disabled")){
					_btnBody.addClass("ui-buttonLight-d");
				}else{
					_btnBody.removeClass("ui-buttonLight-d");
				}
//				if(_type=="menu"){
//					alert(1);
//					_btnBody.find("span.buttonLight-con").append(_menu);
//				}
				if(_self.is(":hidden")){
					_btnBody.hide();
				}else if(_self.is(":visible")){
					_btnBody.show();
				}
			_btnBody.hover(function(){
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
							if(_self.is(":disabled")){
								}else if(e.target.tagName!="INPUT" && e.target.tagName!="BUTTON"){
										_self[0].click();
							}
						});
		},
		/**
		* @description 显示按钮
		* @return {buttonLight} buttonLight对象
		* @example
		* $("#logo").buttonLight('show');
		*/
		show:function(){
			this.element.show().parent().parent().show();
		},
		/**
		* @description 隐藏按钮
		* @return {buttonLight} buttonLight对象
		* @example
		* $("#logo").buttonLight('hide');
		*/
		hide:function(){
			this.element.parent().parent().hide();
		},
		/**
		* @description 禁用按钮
		* @return {buttonLight} buttonLight对象
		* @example
		* $("#logo").buttonLight('disable');
		*/
		disable:function(){
			this.element.attr("disabled",true).parent().parent().addClass("ui-buttonLight-d");
		},
		/**
		* @description 启用按钮
		* @return {buttonLight} buttonLight对象
		* @example
		* $("#logo").buttonLight('enable');
		*/
		enable:function(){
			this.element.attr("disabled",false).parent().parent().removeClass("ui-buttonLight-d");
		},
		/**
		* @description 销毁按钮
		* @return {buttonLight} buttonLight对象
		* @example
		* $("#logo").buttonLight('destroy');
		*/
		destroy:function(){
			this.element.parent().parent().before(this.element);
			this.element.next(".ui-buttonLight").remove();
		}
	});
	
$.extend($.ui.buttonLight, {
	version: "1.0"
});

})(jQuery);
//initialize
$(function(){
		 $(".buttonLight").buttonLight();  
});﻿
/*
 *作    者: 张勇辉 
 *版    本: 1.0 
 *完成时间: 2011-07-14 
 *描    述: minSearch
 *关联文件: jQuery.js|jquery-ui.js 
 */ 
 (function($){ 
	/** 
	* @class 简洁搜索框插件 
    * @name minSearch
    * @description 简洁搜索框插件 
	* @requires jQuery.js|jquery-ui.js 
	* @version 1.0 
    */
	$.fn.minSearch = function(options){ 
			//各种属性、参数 
			var defaults = {
				/**  
				* @name minSearch#btnClick  
				* @param {fn} minSearch minSearch对象 
				* @description 按钮点击时执行的函数
				* @default {fn} function(){}
				* @example
				* $("#search").minSearch({
				*	btnClick : function(){
				*		alert("点击了搜索按钮");
				*		}
				*    });
				*/
				btnClick:function(){},
				/**  
				* @name minSearch#onFocus  
				* @param {fn} minSearch minSearch对象 
				* @description 输入框获取焦点后执行的函数 
				* @default {fn} function(){}
				* @example
				* $("#search").minSearch({
				*	onFocus : function(){
				*		alert("获取焦点");
				*		}
				*    });
				*/
				onFocus:function(){},
				/**  
				* @name minSearch#onBlur  
				* @param {fn} minSearch minSearch对象 
				* @description 输入框获取焦点后执行的函数 
				* @default {fn} function(){}
				* @example
				* $("#search").minSearch({
				*	onBlur : function(){
				*		alert("焦点离开");
				*		}
				*    });
				*/
				onBlur:function(){},
				/**  
				* @name minSearch#width  
				* @param {fn} minSearch minSearch对象 
				* @description 宽度  
				* @default {string} "100%"
				* @example
				* $("#search").minSearch({
				*	width : '50px'
				*    });
				*/
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
			var _focus = false;
			$this.wrap($widgetBox)
			.after($btn)
			.wrap($minSearchInput)
			.focus(function(){
				$onFocus();
				_focus = true;
					//By Eddy 2011-08-26 add 注册回车键代理点击事件 begin
					document.onkeydown = function(e){  
						var ev = document.all ? window.event : e;
						if(ev.keyCode==13) {
							   $onClick();
						 }
					}
					//By Eddy 2011-08-26 add 注册回车键代理点击事件 end
				})
			.blur(function(){
				$onBlur();
				document.onkeydown = function(e){}//By Eddy 2011-08-26 add 清空回车键代理点击事件 
				});/*.removeAttr("class")*//*保留选择器*/
			
			$btn.click($onClick);
			}); 
		}; 
})(jQuery); 
 ﻿



/*
 *作    者: 张勇辉 
 *版    本: 1.1 
 *完成时间: 2011-07-26 
 *描    述: stateBox 
 *关联文件: jQuery.js|jquery-ui.js 
 */	
 /*
 *更新时间：2011-11-23
 *修复跨框架访问的问题
 */
 
(function($,undefined){
	/** 
	* @class 状态提示插件 
    * @name stateBox
    * @description 状态提示插件 
	* @requires jQuery.js|jquery-ui.js 
	* @version 1.0 
    */
	$.widget("ui.stateBox",
	 /** @lends stateBox.prototype */	 
	{
		options:{
        /**  
        * @name stateBox#state  
        * @param {string} stateBox stateBox对象 
        * @description 可选值"succeed""alert""error"
		* @default {string} "succeed"
		* @example
		* $(document).stateBox({state:"alert"});
        */
		state:"succeed",
		/**  
        * @name stateBox#content  
        * @param {string} stateBox stateBox对象 
        * @description 状态提示框中显示的信息
		* @default {string} "提交成功!"
		* @example
		* $(document).stateBox({content:"提交失败!"});
        */
		content:"提交成功！",
		/**  
        * @name stateBox#corner  
        * @param {string} stateBox stateBox对象 
        * @description 圆角模式（只对支持CSS3标准的浏览器有效）
		* @default {boolean} false
		* @example
		* $(document).stateBox({corner:true});
        */
		corner: false
		},
		_create:function(){
		},
		_init:function(){
			var o = this.options,
				_self = this.element,
				_stateBox = $("<div />").addClass("ui-stateBox").html(o.content);
				_self.append(_stateBox);
				_self.append("<sc"+"ript>_stateBoxRemoveBox();</scr"+"ipt>");
				if(o.corner){
					_stateBox.addClass("ui-corner-all");
					window.top._stateBoxRemoveBox();
				}
				if(o.state === "succeed"){
					_stateBox.addClass("ui-stateBox-succeed");
					window.top._stateBoxRemoveBox();
				}else if(o.state === "alert"){
					_stateBox.addClass("ui-stateBox-alert");
					window.top._stateBoxRemoveBox();
				}else if(o.state === "error"){
					_stateBox.addClass("ui-stateBox-error");
					window.top._stateBoxRemoveBox();
				}
				_stateBox.fadeIn("fast");
				
		},
		destroy:function(){
			
		}
	});
	
$.extend($.ui.stateBox, {
	version: "1.1"
});

})(jQuery);
//*initialize
//$(function(){
//	$(document).stateBox();  
//});


function _stateBoxRemoveBox(){
	setTimeout(function(){
		$(document).find(".ui-stateBox").fadeOut("fast").remove();
	},2800);
}


/*
 *作    者: 张勇辉
 *版    本: 1.0
 *完成时间: 2011-07-12
 *描    述: menuList
 *关联文件: jQuery.js|jquery-ui.js
 */
(function($,undefined){
    /**
	* @class 下拉菜单插件
    * @name menuList
    * @description 下拉菜单插件
	* @version 1.0
    */
	$.widget("ui.menuList",
	/** @lends menuList.prototype */
	{
		options:{
        /**
        * @name menuList#json
        * @param {menuList} menuList menuList对象
        * @description JSON数据源
		* @default {menuList} ""
		* @example
		* $("#link").menuList({json:"json.js"});
        */
		json : "",
		 /**
        * @name menuList#json
        * @param {menuList} menuList menuList对象
        * @description 数据回显标志，true显示数据回显
		* @default {menuList} ""
		* @example
		* $("#link").menuList({dateShow:true});
        */
        dateShow :false,
        /**
        * @name menuList#fn
        * @param {menuList} menuList menuList对象
        * @description 执行函数
		* @default {menuList} function(){}
		* @example
		* $("#link").menuList({
		* 	fn:function(){
		*		$("#aa").live("click",function(event){
		*			if($(event.target).is("li")){
		*				alert($(event.target).attr("id"));
		* 			}
		*		}
		* });
        */
		fn : function(){},
        /**
        * @name menuList#listId
        * @param {menuList} menuList menuList对象
        * @description 下拉列表的ID，用于对下拉列表操作
		* @default {menuList} ""
		* @example
		* $("#link").menuList({listId:"listBox_1"});
        */
		listId :""
		},
		_create:function(){

		},
		_init:function(){
			var o = this.options,
				_self = this.element,
				_menuList = $("<div />").addClass("ui-menuList").append("<ul />").attr("id",o.listId);
				_menuList.find("ul").append("<li>菜单列表</li><li>菜单列表</li><li>菜单列表</li><li>菜单列表</li>"),
				fn = o.fn;
				//Get JSON
				$.getJSON(o.json,function(data){
					_menuList.find("ul").empty();
					$.each(data,function(entryIndex,entry){
						var menuListText = "";
						if(entry['menuList'].length>5){
							menuListText = entry['menuList'].substring(0,5)+"...";
						}else{
							menuListText = entry['menuList'];
						}
						var html = "";
						if(entry['menuList']=="管理角色组"){
							html = "<li id='" + entry['id'] + "' title='"+entry['menuList']+"' style='color:blue' >" + menuListText +"</li>";
						}else{
							html = "<li id='" + entry['id'] + "' title='"+entry['menuList']+"' >" + menuListText +"</li>";
						}
						_menuList.find("ul").append(html);
					});

				_menuList.find("li").hover(function(){
						$(this).addClass("h");
				},function(){
						$(this).removeClass("h");
				});
					return false;
				});

				if(_self.is(".buttonPro")){
					_self = _self.parent().parent();
				}
            _menuList.insertAfter(_self);
            _self.unbind("click").bind("click",function(event){
                getMenuListPosition(height);
                _menuList.slideToggle();
                event.stopPropagation();
            });
            fn();
             /**
             * flag=true:在div外面点击，div收缩
             * flag=false:在div内点击。
             * 给div绑定事件设置flag的值，
             * 还有_self也需要将其设置为false
              * huanghui@2012-3-12
             * */
            var flag= true;
            _menuList.mouseout(function(){
                flag=true ;
            });
            _self.mouseover(function(){
                flag=false;
            }).mouseout(function(){
                flag=true;
            });

            //给document绑定mouseup事件
            $(document).bind("mouseup",function(){
                var div = document.getElementById(o.listId);
                if(div.style.display!="none"&&flag){
                    div.style.display="none";
                }
            });

            /**
             * _menuList定位 ，给div进行定位
             * 问题：可能在页面滑动的时候，div定位不正确
             * huanghui@2012-3-12
             * */
            var height;
            setTimeout(function(){
              _menuList.css({
                    "left":-1000,
                    "top":-1000,
                    "z-index":9999,
                    "display":"block"
                });
                height = _menuList.height();
                _menuList.css("display","none");
            },500);
            $(window).bind("resize",function(){
                _menuList.slideUp();
            });
            function getMenuListPosition(height){
                var _selfTop = _self.offset().top ;
                var _selfLeft =  _self.offset().left;
                var top = _selfTop +_self.height();
                var _h = $(window).height()-top;
                if(_h<height && height<=_selfTop){    //下面放不下了，div向上的情况
                     top = _selfTop - height -7;
                    _menuList.css({'top':top+'px','left':_selfLeft+'px'})  ;
                }
                else if(_h<height && height>_selfTop){  //上面和下面都放不下了，div向下显示的情况
                    _selfLeft = _selfLeft-8;
                    _menuList.css({'top':top+'px','left':_selfLeft+'px'})  ;
                }
                else{                                //一般情况，div向下显示
                	if(_self.parent('#d_search').size()!=0){
	                	top = top - 10;
	                	_selfLeft =_selfLeft -10;
                	}
                     _menuList.css({'top':top+'px','left':_selfLeft+'px'})  ;
                }
            }
            if(o.dateShow){
	             /**
	             * 选择后，数据回选,并且div隐藏（dateShow==true）
	             * huanghui@2012-3-12
	             * */
	            _menuList.click(function(event){
	                if($(event.target).is("li")){
	                    var targetId = $(event.target).text();
	                    var but = $("#"+o.listId).prev('span').children('span').children('input') ;
	                    if(but.size()==0){
	                        but = $("#"+o.listId).prev('a')  ;
	                        but.text(targetId+"▼");
	                    }else{
	                       but.attr("value",targetId) ;
	                    }
					}
	            	
	            });
            }
            
            /**
             * ipad 上解决window绑定事件，
             * 如果div显示，点击其他document元素div隐藏
             * huanghui@2012-3-13
             * */
            if("ontouchstart" in window){
                window.document.body.addEventListener("touchstart",function(e){
                    var className = $(e.target).parent('ul').parent('div').attr("class");
                     if(className==null||className=='undefined'||className==''||!(className.match('ui-menuList'))){
                        var div = document.getElementById(o.listId);
                        if(div.style.display!="none"){
                            div.style.display="none";
                        }
                    }
                },false);
            }
		},
		/**
		* @description 销毁下拉菜单
		* @example
		* $("#link").menuList('destroy');
		*/
		destroyMenuList:function(){
			if(this.element.is(".buttonPro")){
				this.element.unbind("click").parent().parent().next(".ui-menuList").remove();
			}else{
				this.element.unbind("click").next(".ui-menuList").remove();
			}
            return 1;
		}
	});

$.extend($.ui.menuList, {
	version: "1.0"
});

})(jQuery);
//initialize
/*$(function(){
		 $(".menuList").menuList();
});*/

/*
 *作    者: 张勇辉 
 *版    本: 
 *完成时间: 
 *描    述: progressBar
 *关联文件: 
 */
(function($,undefined){
    /** 
	* @class 标准进度条插件
    * @name progressBar
    * @description 标准进度条插件
	* @version 1.0 
    */
	$.widget("ui.progressBar",
	/** @lends buttonPro.prototype */		 
	{
		options:{
        /**  
        * @name progressBar#width  
        * @param {string} progressBar progressBar对象 
        * @description 宽度 
		* @default {string} "100%"
		* @example
		* $("#txt").progressBar({width:"100px"});
        */
			width:"100%"
		},
		_create:function(){
			//插件实现代码 
			var o = this.options;
			var $this = this.element;
			var $plan = $("<b></b>");
			var $progressBar=$("<div class='ui-progressBar'><span></span></div>");
			//显示百分比文字
			$this.wrap($progressBar);
			$this.wrap($plan);
			$this.hide();
		},
		_init:function(){
			var $this = this.element,
				$progressBar = $this.parent().parent().parent(),
				o = this.options;
			$progressBar.width(o.width);
			if($this.val()<=100){
				$this.parent().animate({width:$this.val()+"%"},"fast");
			}
		}
});

$.extend($.ui.progressBar, {
	version: "1.0"
});

})(jQuery);
//initialize
$(function(){
	$(".progressBar").progressBar();	   
});// toolbar
(function($,undefined){
	$.widget("ui.toolbar",
	{
		options:{},
		_create:function(){
			var _self = this.element,
				o = this.options,
				_type = _self.attr("data-type") || "top";
			_self.addClass("ui-toolbar");
			if(_type == "bottom"){
				_self.addClass("ui-toolbarBottom");
			}else if(_type == "top"){
				_self.addClass("ui-toolbarTop");
			}
		},
		_init:function(){},
		show:function(){},
		hide:function(){},
		destroy:function(){
			this.element.removeClass("ui-toolbar ui-toolbarBottom ui-toolbarTop");
		}
		
	});
})(jQuery);
//initialize
$(function(){
		 $(".toolbar").toolbar();
});﻿
/*
 *作    者: 张勇辉 
 *版    本: 1.0 
 *完成时间: 2011-08-25 
 *描    述: inputText 
 *关联文件: jQuery.js|jquery-ui.js 
 */	
(function($,undefined){
	/** 
	* @class 状态提示插件 
    * @name inputText
    * @description 状态提示插件 
	* @requires jQuery.js|jquery-ui.js 
	* @version 1.0 
    */
	$.widget("ui.inputText",
	 /** @lends stateBox.prototype */	 
	{
		options:{
		},
		_create:function(){
			var _self = this.element,
			 	currentFocus = false;
			if(_self.is(".minSearch")){
				/*预留的控制域*/
			}else{
			_self.addClass("ui-inputText");
			_self.mouseover(function(){
				_self.addClass("ui-inputText-active");
			})
			.focus(function(){
				currentFocus = true;
				_self.addClass("ui-inputText-active");
			})
			.blur(function(){
				currentFocus = false;
				_self.removeClass("ui-inputText-active");
			})
			.mouseout(function(){
				if(!currentFocus){
				_self.removeClass("ui-inputText-active");
				}
			});
			}
		},
		_init:function(){
		},
		destroy:function(){
		}
	});
	
$.extend($.ui.inputText, {
	version: "1.0"
});

})(jQuery);
//initialize
$(function(){
	$("input:text,input:password").inputText();   
});
/*
 *作    者: 张勇辉 
 *版    本: 1.0 
 *完成时间: 2011-08-25 
 *描    述: inputSelect 
 *关联文件: jQuery.js|jquery-ui.js 
 */	
(function($,undefined){
	/** 
	* @class 下拉菜单 
    * @name inputSelect
    * @description 下拉菜单 
	* @requires jQuery.js|jquery-ui.js 
	* @version 1.0 
    */
	$.widget("ui.inputSelect",
	 /** @lends inputSelect.prototype */	 
	{
		options:{
		},
		_create:function(){
			var _self = this.element,
			 	currentFocus = false;
			_self.addClass("ui-inputSelect");
			_self.mouseover(function(){
				_self.addClass("ui-inputSelect-active");
			})
			.focus(function(){
				currentFocus = true;
				_self.addClass("ui-inputSelect-active");
			})
			.blur(function(){
				currentFocus = false;
				_self.removeClass("ui-inputSelect-active");
			})
			.mouseout(function(){
				if(!currentFocus){
				_self.removeClass("ui-inputSelect-active");
				}
			});
		},
		_init:function(){
		},
		destroy:function(){
		}
	});
	
$.extend($.ui.inputSelect, {
	version: "1.0"
});

})(jQuery);
//initialize
$(function(){
	$("select").inputSelect();   
});﻿
/*
 *作    者: 张勇辉 
 *版    本: 1.0 
 *完成时间: 2011-08-25 
 *描    述: inputTextarea 
 *关联文件: jQuery.js|jquery-ui.js 
 */	
(function($,undefined){
	/** 
	* @class 状态提示插件 
    * @name inputTextarea
    * @description 状态提示插件 
	* @requires jQuery.js|jquery-ui.js 
	* @version 1.0 
    */
	$.widget("ui.inputTextarea",
	 /** @lends stateBox.prototype */	 
	{
		options:{
		},
		_create:function(){
			var _self = this.element,
			 	currentFocus = false;
			_self.addClass("ui-inputTextarea");
			_self.mouseover(function(){
				_self.addClass("ui-inputTextarea-active");
			})
			.focus(function(){
				currentFocus = true;
				_self.addClass("ui-inputTextarea-active");
			})
			.blur(function(){
				currentFocus = false;
				_self.removeClass("ui-inputTextarea-active");
			})
			.mouseout(function(){
				if(!currentFocus){
				_self.removeClass("ui-inputTextarea-active");
				}
			});
		},
		_init:function(){
		},
		destroy:function(){
		}
	});
	
$.extend($.ui.inputTextarea, {
	version: "1.0"
});

})(jQuery);
//initialize
$(function(){
	$("textarea").inputTextarea();   
});
/*
 *作    者: 张文钦 万莎 
 *版    本: 1.0 
 *完成时间: 2011-10-14 
 *描    述: tabPro tabMin 
 *关联文件: jQuery.js|jquery-ui.js 
 *添加iframe切换时遮罩,@zhng,2012-5-3,artDialog依赖父窗口对象,切换iframe的url,阻止旧窗口销毁前操作旧窗口;@jc6v3.1#bug19
 */	
(function($,undefined){
    $.widget("ui.tab",{
        options:{},
        _create:function(){
            var _self = this.element,
				o = this.options,
                _type = _self.attr("data-tabType") || "min";
                //_type 取值为 min/pro
                /*选项卡内容处理*/
                _self.addClass((_type === 'min')?"ui-tabMin":"ui-tabPro");//由类型添加对应的类
                _self.find(">dt").attr("class","normal");
                _self.click(function(e){
					var _targetId = _self.attr('data-targetId');
                    var $target = $(e.target);
                    if($target.is('dt')){
                        if(_targetId === 'div'){//简洁选项卡//标准选项卡内容区为div替换
                            var $recentActiveTab = _self.find('>dt.active');
                                $recentActiveTab.attr('class','normal').attr('data-targetId');
                                $('#'+$recentActiveTab.attr('data-targetId')).css('display','none');
                                $target.attr('class','active');
                                $('#'+$target.attr('data-targetId')).css('display','block');
                        }else if(_type === 'pro' && _targetId != 'div'){//标准选项卡
					        var _url = $target.attr('data-tabUrl');
                            _self.find('>dt[class="active"]').attr('class','normal');
                            $target.attr('class','active');
                            o.injected = o.injected || false;
                            var $targetIframe = $("#"+_targetId);
                            var $module;
                            if ( !o.injected ) {
                              $module = $('<div class="tab-iframe-module"></div>');
                              $module.insertBefore($targetIframe);//往后+遮不住
                              o.injected = true;
                            } else {
                              $module = $targetIframe.prev("div.tab-iframe-module");
                            }
                            $module.css("display","block");
                            $targetIframe.attr("src",_url).bind("load",function(){
                              $module.css("display","none");
                            });
				        }
                    }
                });
        },
        _init:function(){
        	var _self = this.element,
        		_flag = _self.attr("data-flag") || '';
        	if(_flag == ''){
        		//默认的
        		_self.css("display","block").find(">dt:first").attr('class','active').click();
        	}else{//_flag 1 2 3
        		_self.css("display","block").find('>dt').eq(_flag-1).attr('class','active').click();
        	}   	
        },
		show:function(){},
		hide:function(){},
		destroy:function(){
			this.element.removeClass("ui-tabMin ui-tabPro");
		}
    });
})(jQuery);
//initialize
$(function(){
	$(".ui-tab").tab();
});
/*
 *作    者: 万莎 
 *版    本: 1.0
 *完成时间: 2011-10-24
 *描    述: minProgressBar
 *关联文件: 
 */
(function($,undefined){
    /** 
	* @class 微型进度条插件
    * @name minProgressBar
    * @description 微型进度条插件
	* @version 1.0 
    */
	$.widget("ui.minProgressBar",
	/** @lends buttonPro.prototype */		 
	{
		_create:function(){
			//插件实现代码 
			var $this = this.element,
				_color = $this.attr("data-color") || '';
			var $val = $("<div style='width:100px;text-align:center;line-height:18px;height:18px;'>"+$this.val()+"</div>");
			var $minProgressBar=$("<div class='ui-min-progressBar'><span></span></div>");
			var $plan;
			if(_color == "blue"){
				$plan = $("<b class='blueColor'></b>");
			}else if(_color == "red"){
				$plan = $("<b class='redColor'></b>");
			}else if(_color == "gray"){
				$plan = $("<b class='grayColor'></b>");
			}else if(_color == "purple"){
				$plan = $("<b class='purpleColor'></b>");
			}else if(_color == "yellow"){
				$plan = $("<b class='yellowColor'></b>");
			}else if(_color == "green"){
				$plan = $("<b class='greenColor'></b>");
			}
			$this.wrap($minProgressBar);
			$this.wrap($plan);
			$this.before($val);
			$this.hide();
		},
		_init:function(){
			var $this = this.element;
			if($this.val()<=100){
				$this.parent().css({width:$this.val()+"%"});
			}
		}
});

$.extend($.ui.minProgressBar, {
	version: "1.0"
});

})(jQuery);
//initialize
$(function(){
	$(".minProgressBar").minProgressBar();	   
});

/*
 *作    者: 万莎 
 *版    本: 1.0
 *完成时间: 2011-10-24
 *描    述: miniProgressBar
 *关联文件: 
 */
(function($,undefined){
    /** 
	* @class 迷你进度条插件
    * @name miniProgressBar
    * @description 迷你进度条插件
	* @version 1.0 
    */
	$.widget("ui.miniProgressBar",
	/** @lends buttonPro.prototype */		 
	{
		_create:function(){
			//插件实现代码 
			var $this = this.element;
			var $val = $("<div style='line-height:1px;margin-left:58px;margin-top: -4px;'>"+$this.val()+"%</div>");
			var $plan = $("<b></b>");
			var $miniProgressBar=$("<div class='ui-mini-progressBar'><span></span></div>");
			$this.after($val);
			$this.wrap($miniProgressBar);
			$this.wrap($plan);
			$this.hide();
		},
		_init:function(){
			var $this = this.element;
			if($this.val()<=100){
				$this.parent().animate({width:$this.val()+"%"},"fast");
			}
		}
});

$.extend($.ui.miniProgressBar, {
	version: "1.0"
});

})(jQuery);
//initialize
$(function(){
	$(".miniProgressBar").miniProgressBar();	   
});


// touchwipe

/*
 *作    者: 张勇辉 
 *版    本: 1.0 
 *完成时间: 2011-11-30 
 *描    述: touchwipe 
 *关联文件: jQuery.js  
 */	
(function($) { 
    /** 
	* @class touchWipe监听器
    * @name touchwipe
    * @description 监听touchmove的方向
	* @version 1.0 
	* @author 张勇辉 
	* @requires jQuery-1.5.2+
    */

   $.fn.touchwipe = function(settings) {
	   /** @lends touchwipe.prototype */	
     var config = {
			/**  
			* @name touchwipe#min_move_x  
			* @param {Num}  数字类型
			* @description 横向响应精度
			* @default {Num} 20
			* @example
			* $("#handle").touchwipe({
			*		min_move_x: 50
			*    });
			*/
    		min_move_x: 20,
			/**  
			* @name touchwipe#min_move_y  
			* @param {Num} 数字类型 
			* @description 纵向响应精度
			* @default {Num} 20
			* @example
			* $("#handle").touchwipe({
			*		min_move_y: 50
			*    });
			*/
    		min_move_y: 20,
			/**  
			* @name touchwipe#wipeLeft  
			* @param {Fn} 函数 
			* @description 向左滑动触发的动作 
			* @default {Fn} function(){}
			* @example
			* $("#handle").touchwipe({
			*		wipeLeft: function() {alert("向左滑动")}
			*    });
			*/
 			wipeLeft: function() { },
			/**  
			* @name touchwipe#wipeRight  
			* @param {Fn} 函数 
			* @description 向右滑动触发的动作 
			* @default {Fn} function(){}
			* @example
			* $("#handle").touchwipe({
			*		wipeRight: function() {alert("向右滑动")}
			*    });
			*/
 			wipeRight: function() { },
			/**  
			* @name touchwipe#wipeUp  
			* @param {Fn} 函数 
			* @description 向上滑动触发的动作 
			* @default {Fn} function(){}
			* @example
			* $("#handle").touchwipe({
			*		wipeUp: function() {alert("向上滑动")}
			*    });
			*/
 			wipeUp: function() { },
			/**  
			* @name touchwipe#wipeDown  
			* @param {Fn} 函数 
			* @description 向下滑动触发的动作 
			* @default {Fn} function(){}
			* @example
			* $("#handle").touchwipe({
			*		wipeDown: function() {alert("向下滑动")}
			*    });
			*/
 			wipeDown: function() { },
			/**  
			* @name touchwipe#wipe  
			* @param {Fn} 函数 
			* @description 点击事件（一次完整的点击操作） 
			* @default {Fn} function(){}
			* @example
			* $("#handle").touchwipe({
			*		wipe: function() {alert("点击")}
			*    });
			*/
			wipe:function(){},
			/**  
			* @name touchwipe#wipehold  
			* @param {Fn} 函数 
			* @description 按下并且保持将近一秒的时间触发(750毫秒) 
			* @default {Fn} function(){}
			* @example
			* $("#handle").touchwipe({
			*		wipehold: function() {alert("保持")}
			*    });
			*/
			wipehold:function(){},
			/**  
			* @name touchwipe#preventDefaultEvents  
			* @param {Boolean } 布尔 
			* @description 是否阻止当前元素的默认事件 
			* @default {Boolean} true
			* @example
			* $("#handle").touchwipe({
			*		preventDefaultEvents: true
			*    });
			*/
			preventDefaultEvents: true
	 };
     
     if (settings) $.extend(config, settings);
 
     this.each(function() {
    	 var startX;
    	 var startY;
		 var isMoving = false;
		 var isHold = false;
		 var timer;

    	 function cancelTouch() {
    		 this.removeEventListener('touchmove', onTouchMove);
    		 startX = null;
    		 isMoving = false;
			 clearTimeout(timer);
    	 }	
    	 
    	 function onTouchMove(e) {
    		 if(config.preventDefaultEvents) {
    			 e.preventDefault();
    		 }
    		 if(isMoving) {
	    		 var x = e.touches[0].pageX;
	    		 var y = e.touches[0].pageY;
	    		 var dx = startX - x;
	    		 var dy = startY - y;
	    		 if(Math.abs(dx) >= config.min_move_x) {
	    			cancelTouch();
	    			if(dx > 0) {
	    				config.wipeLeft();
	    			}
	    			else {
	    				config.wipeRight();
	    			}
	    		 }
	    		 else if(Math.abs(dy) >= config.min_move_y) {
		    			cancelTouch();
		    			if(dy > 0) {
		    				config.wipeUp();
		    			}
		    			else {
		    				config.wipeDown();
		    			}
		    		 }
    		 }
    	 }
		 		 
		 function onTouchEnd(){
			clearTimeout(timer);
			 if(!isHold && isMoving){
				 config.wipe();
			 }
			isHold = false;  
		  }
		 
		 function onTouchHold(){
			 isHold = true;
			 config.wipehold();
		 }
		 
    	 function onTouchStart(e)
    	 {
    		 if (e.touches.length == 1) {
    			 startX = e.touches[0].pageX;
    			 startY = e.touches[0].pageY;
    			 isMoving = true;
    			 this.addEventListener('touchmove', onTouchMove, false);
				 timer = setTimeout(onTouchHold,750);
    		 }
    	 }    	 
    	 if ('ontouchstart' in document.documentElement) {
    		 this.addEventListener('touchstart', onTouchStart, false);
			 this.addEventListener('touchend', onTouchEnd, false);
    	 }
     });
 
     return this;
   };
   $.extend($.fn.touchwipe, {
			version: "1.0",
			author:"张勇辉"
			});
 
 })(jQuery);
 
 
/*
 *作    者: 黄卉
 *版    本: 1.0 
 *完成时间: 2012-02-23
 *描    述: menuSelect
 *关联文件: jQuery.js|jquery-ui.js 
 */	
(function($,undefined){
    /** 
	* @class 下拉单选菜单插件
    * @name menuSelect
    * @description 下拉单选菜单插件
	* @version 1.0 
    */
	$.widget("ui.menuSelect",
	/** @lends menuSelect.prototype */
	{
		options:{
        /**  
        * @name menuSelect#json
        * @param {menuSelect} menuSelect menuSelect对象
        * @description JSON数据源
		* @default {menuSelect} ""
		* @example
		* $("#link").menuSelect({json:"json.js"});
        */
		json : "",
		/**  
        * @name menuSelect#json
        * @param {menuSelect} menuSelect menuSelect对象
        * @description JSON数据源
		* @default {menuSelect} ""
		* @example
		* $("#link").menuSelect({data:"[{'id':'id1','menuSelect':'data1'},{'id':'id2','menuSelect':'data2','DeptOrUser':'menuSelectUsersId'}]"});
		* data里面的各参数：
		* 	id：数据id（必选）；menuSelect：显示的数据（必选）；DeptOrUser：部门多选或人员多选a标签的id。（可选）
        */
        data:"",
        /**  
        * @name menuSelect#fn
        * @param {menuSelect} menuSelect menuSelect对象
        * @description 执行函数
		* @default {menuSelect} function(){}
		* @example
		* $("#link").menuSelect({
		* 	fn:function(){
		*		$("#aa").live("click",function(event){
		*			if($(event.target).is("li")){
		*				alert($(event.target).attr("id"));
		* 			}
		*		}
		* });
        */
		fn : function(){},
		/**
        * @name menuSelect#fn
        * @param {menuSelect} menuSelect menuSelect对象
        * @description 执行函数
		* @default {menuSelect} function(){}
		* @example
		* $("#link").menuSelect({
		* 	getMoreDepts:function(){
		*       getDepts();//调用部门多选的方法
		* });
        */
        getMoreDepts :function(){} ,
        /**
        * @name menuSelect#fn
        * @param {menuSelect} menuSelect menuSelect对象
        * @description 执行函数
		* @default {menuSelect} function(){}
		* @example
		* $("#link").menuSelect({
		* 	getMoreUsers:function(){
		*       getUsers();//调用人员多选的方法
		* });
        */
        getMoreUsers:function(){},
        /**  
        * @name menuSelect#listId
        * @param {menuSelect} menuSelect menuSelect对象
        * @description 下拉列表的ID，用于对下拉列表操作
		* @default {menuSelect} ""
		* @example
		* $("#link").menuSelect({listId:"listBox_1"});
        */
		listId :""
		},
		_create:function(){
			
		},
		_init:function(){
			var o = this.options,
				_self = this.element,
            	_menuSelect = $("<div />").addClass("ui-menuSelect").append("<ul class='ui-menuSelect-ul'/>").attr("id",o.listId);
            _menuSelect.find("ul").append("<li>菜单列表</li><li>菜单列表</li><li>菜单列表</li><li>菜单列表</li>"),
			fn = o.fn;
            //Get JSON
            if(o.json){
                $.getJSON(o.json,function(data){
                    _menuSelect.find("ul").empty();
                    var str="";
                    $.each(data,function(entryIndex,entry){
                        var html = "<li id='" + entry['id'] + "'>"
                                +"<input type='checkbox' id='"+ entry['id'] +"' name='menuSelectCheckbox' value='"+entry['menuSelect']+"'/>"
                                +entry['menuSelect'] +"<input type='hidden' name='menuSelect' value='"+entry['menuSelect']+"'/>";
                        if(entry['DeptOrUser']){
                            html += "<a href='#' id='"+entry['DeptOrUser']+"' class='ui-menuSelect-selectUrl'>选择</a>";
                            str+= entry['DeptOrUser']+",";
                        }
                        html+= "</li>";
                        _menuSelect.find("ul.ui-menuSelect-ul").append(html);
                    });
                    var arr =str.split(",");
                    $("#"+arr[0]).live("click",function(){
                         o.getMoreDepts();
                    });
                    //人员多选
                    $("#"+arr[1]).live("click",function(){
                          o.getMoreUsers();
                    });
                    _menuSelect.find("li.ui-menuSelect-li").hover(function(){
                           $(this).addClass("h");
                    },function(){
                           $(this).removeClass("h");
                    });
                    return false;
                });
            }
             //Get DATA
            if(o.data){
                _menuSelect.find("ul").empty();
                var str="";
                var arr= o.data.split("{'id':");
                var html="";
                for(var i=1;i<arr.length;i++){
                    var id = arr[i].substring(1,arr[i].indexOf("',"));
                    var menuSelect = arr[i].substring(arr[i].indexOf("menuSelect")+13,arr[i].lastIndexOf("'"));
                    var DeptOrUser =arr[i].substring(arr[i].indexOf("DeptOrUser")+13,arr[i].lastIndexOf("'"));
                    html += "<li id='" + id + "'>"
                              +"<input type='checkbox' id='"+ id+"' name='menuSelectCheckbox' value='"+menuSelect+"'/>" ;
                    if(arr[i].indexOf("DeptOrUser")!=-1){   //DeptOrUser
                        menuSelect = menuSelect.substring(0,arr[i].indexOf(",")+1);
                        html += menuSelect +"<input type='hidden' name='menuSelect' value='"+menuSelect+"'/>"+
                                "<a href='#' id='"+DeptOrUser+"' class='ui-menuSelect-selectUrl'>选择</a>";
                        str+=  DeptOrUser+",";
                    }else{
                        html += menuSelect +"<input type='hidden' name='menuSelect' value='"+menuSelect+"'/>";
                    }
                     html+="</li>";

                }
                _menuSelect.find("ul.ui-menuSelect-ul").append(html);
                var arr =str.split(",");
                $("#"+arr[0]).live("click",function(){
                     o.getMoreDepts();
                });
                //人员多选
                $("#"+arr[1]).live("click",function(){
                      o.getMoreUsers();
                });
            }

            if(_self.is(".buttonPro")){
                _self = _self.parent().parent();
            }
            _menuSelect.insertAfter(_self);
            _menuSelect.position({
                    of:_self,
                    my:"left top",
                    at:"left bottom"
                });
            _self.unbind("click").bind("click",function(event){
                _menuSelect.slideToggle(100);
                event.stopPropagation();
            });
            fn();

            $('#'+o.listId).click(function(){
                var boxs = $("#"+o.listId+" ul li>input[type='checkbox']");
                var ids ='';
                var names ='';
                for(var i=0; i<boxs.length; i++) {
                    if(boxs[i].checked==true){
                        ids+=boxs[i].id+',';
                        names+=boxs[i].value+',';
                    }
                }
                var but = $("#"+o.listId).prev().children().children("input.menuSelect");
                var butName = names.substring(0,names.length-1);
                var value = but.value;
                if(butName!=null&&butName!=""){
                    if(butName.length>10){
                        butName=butName.substring(0,10)+"..."  ;
                    }
                    $(but).attr("value",butName);
                }else{
                     $(but).attr("value","下拉单选菜单列表");
                }
            });
            /**
             * flag=true:在div外面点击，div收缩
             * flag=false:在div内点击。
             * 给div绑定事件设置flag的值，
             * 还有_self也需要将其设置为false
             * */
            var flag= true;
            $(".ui-menuSelect").mouseover(function(){
                flag= false;
            }).mouseout(function(){
                flag=true
            });
            _self.mouseover(function(){
                flag=false;
            });

            //给document绑定mousedown事件
            $(document).bind("mousedown",function(){
                var div =document.getElementById(o.listId);
                if(div.style.display!="none"&&flag){
                    div.style.display="none";
                }
            });
		},
		/**
		* @description 销毁下拉菜单
		* @example
		* $("#link").menuSelect('destroy');
		*/
		destroy:function(){
			if(_self.is(".buttonPro")){
				this.element.unbind("click").parent().parent().next(".ui-menuSelect").remove();
			}else{
				this.element.unbind("click").next(".ui-menuSelect").remove();
			}
		}
	});
	
$.extend($.ui.menuSelect, {
	version: "1.0"
});

})(jQuery);
//initialize
/*$(function(){
		 $(".menuSelect").menuSelect();
});*/



/*
 *作    者: 黄卉
 *版    本: 1.0
 *完成时间: 2012-02-22
 *描    述: menuSingleSelect
 *关联文件: jQuery.js|jquery-ui.js
 */
(function($,undefined){
    /**
	* @class 下拉单选菜单插件
    * @name menuSingleSelect
    * @description 下拉单选菜单插件
	* @version 1.0
    */
	$.widget("ui.menuSingleSelect",
	/** @lends menuSingleSelect.prototype */
	{
		options:{
        /**
        * @name menuSingleSelect#json
        * @param {menuSingleSelect} menuSingleSelect menuSingleSelect对象
        * @description JSON数据源
		* @default {menuSingleSelect} ""
		* @example
		* $("#link").menuSingleSelect({json:"json.js"});
        */
		json : "",
         /**
        * @name menuSingleSelect#data
        * @param {menuSingleSelect} menuSingleSelect menuSingleSelect对象
        * @description 变量数据源
		* @default {menuSingleSelect} ""
		* @example
		* $("#link").menuSelect({data:"[{'id':'id1','menuSingleSelect':'data1','menuSelect':[{'selectId':'id11','selectData':'data11','selectUrl':'deptId'}]},
        *                              {'id':'id2','menuSingleSelect':'data2'，'DeptOrUser':'userId'}"});
		* data里面的各参数：
		* 	id：数据id（必选）；menuSingleSelect：显示的数据（必选）；DeptOrUser：部门多选或人员多选a标签的id。（可选，存在为checkbox多选，不存在为radio单选）
        *    menuSelect：有第二级别的多选按钮（可选）
        *    menuSelect里面的参数：selectId（多选里面的id）、selectData（多选的显示数据）、  selectUrl（部门多选或人员多选a标签的id，可选）
        */
        data : "",
        /**
        * @name menuSingleSelect#fn
        * @param {menuSingleSelect} menuSingleSelect menuSingleSelect对象
        * @description 执行函数
		* @default {menuSingleSelect} function(){}
		* @example
		* $("#link").menuSingleSelect({
		* 	fn:function(){
		*		$("#aa").live("click",function(event){
		*			if($(event.target).is("li")){
		*				alert($(event.target).attr("id"));
		* 			}
		*		}
		* });
        */
		fn : function (){},
        /**
        * @name menuSelect#fn
        * @param {menuSelect} menuSelect menuSelect对象
        * @description 执行函数
		* @default {menuSelect} function(){}
		* @example
		* $("#link").menuSelect({
		* 	getMoreDepts:function(){
		*       getDepts();//调用部门多选的方法
		* });
        */
        getMoreUsers:function(){},
        /**
        * @name menuSelect#fn
        * @param {menuSelect} menuSelect menuSelect对象
        * @description 执行函数
		* @default {menuSelect} function(){}
		* @example
		* $("#link").menuSelect({
		* 	getMoreUsers:function(){
		*       getUsers();//调用人员多选的方法
		* });
        */
        getMoreDepts:function(){},
        /**
        * @name menuSingleSelect#listId
        * @param {menuSingleSelect} menuSingleSelect menuSingleSelect对象
        * @description 下拉列表的ID，用于对下拉列表操作
		* @default {menuSingleSelect} ""
		* @example
		* $("#link").menuSingleSelect({listId:"listBox_1"});
        */
		listId :"",
        /**
        * @name menuSingleSelect#ids
        * @param {menuSingleSelect} menuSingleSelect menuSingleSelect对象
        * @description 下拉列表中选中的数据id，用于对下拉列表取值和回选
		* @default {menuSingleSelect} ""
		* @example
		* $("#link").menuSingleSelect({ids:"id1,id2,id3"});
        */
        ids:"" ,
        /**
        * @name menuSingleSelect#names
        * @param {menuSingleSelect} menuSingleSelect menuSingleSelect对象
        * @description 下拉列表中选中的数据值，用于对下拉列表取值和回选
		* @default {menuSingleSelect} ""
		* @example
		* $("#link").menuSingleSelect({names:"names1,name2,name3"});
        */
        names:"" ,
        /**
        * @name menuSingleSelect#defaultClick
        * @param {menuSingleSelect} menuSingleSelect menuSingleSelect对象 true or false
        * @description true：下拉菜单在点击的时候才加载，并且显示下拉菜单
		* @default {menuSingleSelect} ""
		* @example
		* $("#link").menuSingleSelect({defaultClick:false});
        */
        defaultClick:true,
         /**
        * @name menuSingleSelect#defaultClick
        * @param {menuSingleSelect} menuSingleSelect menuSingleSelect对象 true or false
        * @description true：下拉菜单在点击的时候才加载，并且显示下拉菜单
		* @default {menuSingleSelect} ""
		* @example
		* $("#link").menuSingleSelect({showTitle:"点击选择范围"});
        */
        showTitle:"",
        firstClick:false
		},

		_create:function(){

		},
        /**
         * 初始化函数
         * */
		_init:function(){
			
			var o = this.options,
            _self = this.element;
            var  _menuSingleSelect = $("<div name='menuSingeSelectDiv' />").addClass("ui-menuSingleSelect").append("<ul class='ui-menuSingleSelect-ul'/>").attr("id",o.listId);
            fn = o.fn;
            //Get JSON
            if(o.json&&o.data==''){
                $.getJSON(o.json,function(data){
                    getJsonOrData(data);
                });
            }
            //Get DATA    截取字符串
            if(o.data&&o.json==''){
                var jsondata = eval(o.data);
                 getJsonOrData(jsondata);
            }

            function getJsonOrData(data){
                _menuSingleSelect.find("ul").empty();
                var usersId ="";
                var deptsId = "";
                var html ="";
                $.each(data,function(entryIndex,entry){
                     html +=  "<li id='li" + entry['id'] + "'>" ;
                    usersId= entry['DeptOrUser'];
                    if(usersId){  //人员多选
                        html+= "<input type='checkbox' id='"+ entry['id'] +"' name='menuOnlySelectCheckbox' value='"+entry['menuSingleSelect']+"'  level = '1'/>"
                            +entry['menuSingleSelect']
                            +"<a href='#' id='"+usersId+"' class='ui-menuSingleSelect-selectUrl' href='###' >选择</a>";
                            if(entry['isDept']=="yes"){
                            	deptsId = usersId;
                            }
                    }else{          //其他的都为单选
                    	if(entry['isCheckBox']=="yes"){
                    		 html+= "<input type='checkbox' id='"+ entry['id'] +"' name='menuOnlySelectCheckbox' value='"+entry['menuSingleSelect']+"' level = '1' />"
                            +entry['menuSingleSelect'];
                    	}else{
                        html+="<input type='radio' id='"+ entry['id'] +"' name='menuOnlySelectRadio"+o.listId+"' value='"+entry['menuSingleSelect']+"' level = '1'/>"
                            +entry['menuSingleSelect'] ;
                    	}
                    }
                    var arr = entry['menuSelect'];
                    if(arr){
                        html  += "<ul>";
                        for(var i=0;i<arr.length;i++){
                            html += "<li id='li"+arr[i]['selectId']+"' class='ui-menuSingleSelect-li'>"
                                    +"<input type='checkbox' name='radioCheckbox' id='"+arr[i]['selectId']+"' value='"+arr[i]['selectData']+"' level = '2'/>"
                                    + arr[i]['selectData'];
                            if(arr[i]['selectUrl']){
                                deptsId =  arr[i]['selectUrl'];
                                html += "<a href='#' id='"+deptsId+"' class='ui-menuSingleSelect-selectUrl' href='###'>选择</a>";
                            }
                            html += "</li>"  ;
                        }
                        html += "</ul>";
                    }
                    html += "</li>";
                });
                _menuSingleSelect.find("ul.ui-menuSingleSelect-ul").append(html);
                $("#"+usersId).live("click",function(){
                    o.getMoreUsers();
                });
                $("#"+deptsId).live("click",function(){
                    o.getMoreDepts();
                });
                return false;
            }

            if(_self.is(".buttonPro")||_self.is(".buttonLight")){
                _self = _self.parent().parent();
            }
            _menuSingleSelect.append("<input type='hidden' id='menuSingleSelect"+o.ids+"' name='menuSingleSelect' value='menuSingleSelect"+o.names+"'/>");
            _menuSingleSelect.insertAfter(_self);

            setTimeout(function(){
                getIdsNames();
            },0);
            function getIdsNames(){
                if((o.ids!='' && o.names!='')||o.firstClick){
                    var but = $("#"+o.listId).prev().children().children("input.menuSingleSelect");
                    if(o.names>10){
                        var  butName=o.names.substring(0,10)+"..."  ;
                        but.attr("value",butName);
                    }
                    var trueId = o.listId.substring(4,o.listId.length);
                    var arrIds = "";
                	arrIds = o.ids.split(",");
                    for(var i=0;i<arrIds.length;i++){
                        var _inputs = document.getElementById(arrIds[i]+trueId);
                        if(_inputs!=null){
                            _inputs.checked = true;
                        }
                    }
                    for(var j=0;j<arrIds.length;j++){
                        var _input = document.getElementById(arrIds[j]+trueId);
                        if(_input!=null){
	                         if(_input.type=='radio'){
	                            var $lis = $("#"+arrIds[j]+trueId).parent().parent().children().children('input');
	                            $lis.each(function(){
	                                if($(this).attr('id')!=(arrIds[j]+trueId)){
	                                    var $li_inputs = $(this).next('ul').children('li').children('input');
	                                    $li_inputs.each(function(){
	                                        if(!$(this).checked){
	                                           if($(this).attr("class")!='ui-menuSingleSelect-selectUrl'){
		                                               this.disabled = true;
	                                         	  }
	                                        }
	                                    });
	                                 }
	                            });
	                        }
	                        if(_input.type=='checkbox'){
	                            var $f_input = $("#"+arrIds[j]+trueId).parent('li').parent('ul').prev('input');
	                            if($f_input.size()!=0){
	                                $f_input[0].checked = "checked";
	                                var $f_inputId = $($f_input[0]).attr('id');
	                                var $ra_inputs = $("#"+$f_inputId).parent().parent().children().children("input[type='radio']");
	                                $ra_inputs.each(function(){
	                                    if(!this.checked){
	                                         var $boxs_inputs = $(this).next().children().children();
	                                         $boxs_inputs.each(function(){
	                                         	  if($(this).attr("class")!='ui-menuSingleSelect-selectUrl'){
		                                               this.disabled = true;
	                                         	  }
	                                         });
	                                    }
	                                });
	                            }
	
	                        }
                        }
                    }
                }
            }

            /**
             * 绑定下拉菜单按钮的click事件
             * **/
            $("#"+o.listId+" >ul>li").find("input").click(function(){
                var inputs = $("#"+o.listId+" >ul>li>input");
                var allInputs = $("#"+o.listId+" ul li input");
                var ids ='';
                var names ='';
                var allflag = true;
               //如果点击的按钮是单选
               if(this.type=="radio"){
               		var tempStr = radioSelect(this,ids,names,o.listId);
               		if(tempStr=="-"){
               				ids = this.id.substring(0,1)+",";
	           				names = this.value+",";
               			}else{
               				ids = tempStr.split("-")[0]+ this.id.substring(0,1)+",";
               				names = tempStr.split("-")[1];
               			}
               }else{
               		//如果点击的是第一层的多选
               		if(this.level=='1'){
               			var radioObj ;
	           			$("#"+o.listId+" >ul>li").find("input[type='radio']").each(function(){
	           				if(this.checked){
	           					radioObj = $(this);
	           				}
	           			})
	           			var tempStr = radioSelect(radioObj,"","",o.listId);
	           			if(tempStr!="-"){
               				ids = tempStr.split("-")[0] ;
               				names = tempStr.split("-")[1] ;
               			}
               			if(radioObj!=null&&radioObj!='undefind'&&radioObj.val()!=null&&radioObj.val()!='undefined'){
               				ids = ids + radioObj.attr("id").substring(0,1);
               			}
               		}else{
               			var radioObj = $(this).parent().parent().parent().find("input[type='radio']");
               			if(this.checked){
               				radioObj.attr("checked",this.checked);
               			}
               			var tempStr = radioSelect(radioObj,ids,names,o.listId);
               			if(tempStr=="-"){
               				ids = radioObj.attr("id").substring(0,1)+",";
	           				names = radioObj.val()+",";
               			}else{
               				ids = tempStr.split("-")[0];
               				names = tempStr.split("-")[1];
               			}
               			if(radioObj!=null&&radioObj!='undefind'&&radioObj.val()!=null&&radioObj.val()!='undefined'){
               				ids = ids + radioObj.attr("id").substring(0,1);
               			}
               		}
               }
                var _input =  $("#"+o.listId+" >input[type='hidden']") ;
                o.ids = "menuSingleSelect"+ids.substring(0,ids.length-1);
                o.names = "menuSingleSelect"+names.substring(0,names.length-1);
                 _input.attr('id', o.ids);
                _input.val(o.names) ;
                var but = $("#"+o.listId).prev().children().children("input.menuSingleSelect");
                 var butName = names.substring(0,names.length-1);
                if(but.size()!=0){
                    var value = but.value;
                    if(butName!=null&&butName!=""){
                        if(butName.length>10){
                            butName=butName.substring(0,10)+"..."  ;
                        }
                        $(but).attr("value",butName);
                    }else{
                         $(but).attr("value",o.showTitle);
                    }
                }else{
                    but = $("#"+o.listId).prev('a');
                    var butText = but.text();
                    if(butName!=null&&butName!=""){
                        if(butName.length>10){
                            butName=butName.substring(0,10)+"..."  ;
                        }
                        but.text(butName);
                    }else{
                        but.text(o.showTitle);
                    }

                }     
                if(allflag){
				 fn(o.listId.substring(4));
                }
            });

            /**
             * flag=true:在div外面点击，div收缩
             * flag=false:在div内点击。
             * 给div绑定事件设置flag的值，
             * 还有ui-buttonPro也需要将其设置为false
             * */
            var flag= true;
            _menuSingleSelect.mouseover(function(){
                flag= false;
            }).mouseout(function(){
                flag=true
            });
            _self.mouseover(function(){
                flag=false;
            }).mouseout(function(){
                flag=true ;
            });
            //给document绑定mousedown事件
            $(document).bind("click",function(){
            	 getButtonLightCss ();
                var div =document.getElementById(o.listId);
                if(div.style.display!="none"&&flag){
                    div.style.display="none";
                }

            });

             /**
             * menuSingleSelect定位
             * */
            var height;
            var targetDom = document.getElementById(_self.attr('id'));
            setTimeout(function(){
                height = _menuSingleSelect.height();
                 if(o.defaultClick){
                     var div = document.getElementById(o.listId);
                     div.style.display = "block";
                     o.defaultClick = false;
                }
            },0);
            if(_menuSingleSelect.css("display")=="none"){
                getPosition(targetDom);
            }
            $(window).bind("resize",function(){
                _menuSingleSelect.slideUp();
            }).bind("scroll",function(){
                _menuSingleSelect.slideUp();
            });
             _self.unbind("click").bind("click",function(event){
                 _menuSingleSelect.slideToggle(100);
                 var  $divs = $('.ui-menuSingleSelect');
                 for(var i =0 ;i<$divs.length;i++){
                     if($($divs[i]).attr('id')!=o.listId){
                         $divs[i].style.display="none";
                     }
                 }
                 var  $dis = _menuSingleSelect.css("display");
                 if($dis=="none"){
                     getButtonLightCss ();
                     getPosition(targetDom);
                 }
                 event.stopPropagation();
            });

            //递归计算标签距离左上角的距离
            function getTitleLeft(e){
                var i =  e.offsetLeft;
                if(e.offsetParent != null) i += getTitleLeft(e.offsetParent);
                return i;
            }
            //递归计算标签距离顶部的距离
            function getTitleTop(e){
                var i = e.offsetTop;
                if(e.offsetParent != null) i += getTitleTop(e.offsetParent);
                return i;
            }
            //定位
            function getPosition(ev){
            	  _menuSingleSelect.css({
                    "left":-1000,
                    "top":-1000,
                    "display":"block"
                });
                var elemWidth = ev.offsetWidth;   //li元素所在元素的宽度
                var elemHeight = ev.offsetHeight; //li元素所在元素的高度
                var elemLeft = getTitleLeft(ev);		  //li元素所在元素距离显示区左上角的距离
                var elemTop = getTitleTop(ev);		  //li元素所在元素距离显示区顶部的距离
                var width = $(window).width();        //浏览器可见宽度
                var height = $(window).height();      //浏览器的可见高度
                var  wid = _menuSingleSelect.width();   //下拉div的宽度  hei是下拉div的高度
                var hei = _menuSingleSelect.height();
                var x,y;
                if((elemLeft+wid)<=width && (elemTop+elemHeight+hei)<=height-10){     //左上角
                    x = elemLeft ;
                    y =elemTop + elemHeight ;
                }else if((elemLeft+wid)<=width && (elemTop+elemHeight+hei)>height-10){  //左下角
                    x = elemLeft ;
                    y =elemTop - hei -5 ;
                }else if((elemLeft+wid)>width && (elemTop+elemHeight+hei)<=height-10){  //右上角
                    x = width - wid  -10;
                   y =elemTop + elemHeight ;
                }else if((elemLeft+wid)>width && (elemTop+elemHeight+hei)>height-10){      //右下角
                    x = width -wid -10;
                    y =elemTop - hei -5;
                }
                _menuSingleSelect.css({ "left":x, "top":y});
            }

            /**
             * 鼠标点击当列表显示时按钮的样式
             * **/
            function getButtonLightCss(){
                 var div =document.getElementById(o.listId);
                 var $buttonLight = $(div).prev('.ui-buttonLight');
                 if($buttonLight.size!=0){
                     if( div.style.display =="none"){
                        $buttonLight.css({"background-position":"0% 0%"});
                    }else{
                        $('.ui-buttonLight').css({"background-position":"0% 0%"});
                        $buttonLight.css({"background-position":"right -120px"});
                    }
                 }

            }
           
            
           
		},
		/**
		* @description 销毁下拉菜单
		* @example
		* $("#link").menuSingleSelect('destroy');
		*/
		destroy:function(){
			if(this.element.is(".buttonPro")||this.element.is(".buttonLight")){
				this.element.unbind("click").parent().parent().next(".ui-menuSingleSelect").remove();
			}else{
				this.element.unbind("click").next(".ui-menuSingleSelect").remove();
			}
		}
		
	});


function radioSelect(obj,ids,names,listId){
               		//将其他单选框下的复选框置灰
               		$("#"+listId+" >ul>li").find("input").each(function(){
               					if(this.type!="radio"&&this.level!=1){
               						$(this).attr("disabled",true);
               					}
               		})
               		//寻找单选框下面的复选框
               		$(obj).parent().find("ul>li>input").each(function(){
               			$(this).attr("disabled",false);
               			if(this.checked){
               				ids = ids+this.id.substring(0,1)+",";
               				names = names+ this.value+",";
               			}
               		})
               		//寻找单选框同级的多选框
               		var $otherUsers = $("#"+listId+" >ul>li>input[type='checkbox']");
               		if($otherUsers.val()!=null&&$otherUsers.val()!='undefined'){
               			$otherUsers.each(function(){
               				if(this.checked){
		               			ids = ids+$(this).attr("id").substring(0,1)+",";
		               			names = names+$(this).val()+",";
               				}
               			})
               		}
               		return ids+"-"+names;
            } 

function reloadNameAndIds(obj,radioStr){
                    var id = obj.attr("id");
                    var trueId = id.substring(4,id.length);
                    var arrIds = "";
                	var tempIds = $("#"+id+" >input[type='hidden']").attr("id");
                	obj.find("input[type='checkbox']").attr("checked",false);
                    arrIds = tempIds.substring(16,tempIds.length).split(",");
                    for(var i=0;i<arrIds.length;i++){
                    	if($("#"+arrIds[i]+trueId).attr("checked")!=null&&$("#"+arrIds[i]+trueId).attr("checked")!='undefined'){
	                    	$("#"+arrIds[i]+trueId).attr("checked","checked");
                    	}
                    }
                    var radioObj ;
           			$("#"+id+" >ul>li").find("input[type='radio']").each(function(){
           				if(this.id.substring(0,3)==radioStr){
           					radioObj = this;
           					$(radioObj).attr("checked",true);
           				}
           			})
           			radioSelect(radioObj,"","",id);
		}

$.extend($.ui.menuSingleSelect, {
	version: "1.0"
});

})(jQuery);
//initialize
/*$(function(){
		 $(".menuSingleSelect").menuSingleSelect();
});*/

