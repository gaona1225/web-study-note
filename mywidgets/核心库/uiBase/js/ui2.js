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
	eddy.fn = eddy.fn || {};
/**
 * 作    者: 张勇辉 
 * 版    本: 1.0
 * 完成时间: 2011-10-12 
 * 描    述: fn.isHtml5
 * 关联文件: 
 */
/** 
* @class 判断浏览器是否支持Html5  
* @name isHtml5
* @description 判断浏览器是否支持Html5 
* @return {isHtml5} 布尔值
* @version 1.0 
*/
eddy.fn.isHtml5 = function(){
	var isHtml5 = typeof(Worker);
	if(isHtml5 == "undefined"){
		return false;
	}else{
		return true;
	}
};
//声明快捷方法
eddy.isHtml5 = eddy.fn.isHtml5;/**
 * 作    者: 张勇辉 
 * 版    本: 1.0
 * 完成时间: 2011-10-12 
 * 描    述: fn.randomInt
 * 关联文件: 
 */
 /** 
* @class 随机整数生成器 
* @name randomInt
* @description 生成一个指定范围的随机整数 
* @return {randomInt} 整数
* @version 1.0 
*/
eddy.fn.randomInt = function(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
};/**
 * 作    者: 张勇辉 
 * 版    本: 1.0
 * 完成时间: 2011-10-12 
 * 描    述: fn.isLocalStorage
 * 关联文件: 
 */
/** 
* @class 判断浏览器是否支持LocalStorage本地存储  
* @name isLocalStorage
* @description 判断浏览器是否支持LocalStorage本地存储 
* @return {isLocalStorage} 布尔值
* @version 1.0 
*/
eddy.fn.isLocalStorage = function() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
};

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
				/**
	             *  简化代码，将里面的“functions(){h()}”改为“h”
	             *  mouseup和mouseout作用相同 ，调用的mu和mo都是相同的代码，所以将mo函数去掉
	             *   huanghui@2012-3-14
	             * */
				_btnBody.hover(h,h2).mousedown(md).mouseup(mu).mouseout(mu).unbind("click").bind("click",function(e){
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
});

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
					_self.attr('data-destory',true) ;
					_self.focus(function(){
						this.blur();
					});
				
		},
		_init:function(){
			var _self = this.element,
				_btnBody = _self.parent().parent();
				_self.css("color","#ffffff");
	            function h(){
	                if(_self.is(":disabled")){
	                    _btnBody.addClass("ui-buttonActive-d");
	                }else{
	                    _btnBody.addClass("ui-buttonActive-h");
	                }
	            }
				function h2(){
	                if(_self.is(":disabled")){
	                        _btnBody.addClass("ui-buttonActive-d");
	                }else{
	                    _btnBody.removeClass("ui-buttonActive-h");
	                }
	            }
				function md(){
	                if(_self.is(":disabled")){
	                    _btnBody.addClass("ui-buttonActive-d");
	                }else{
	                    _btnBody.addClass("ui-buttonActive-a");
	                }
	            }
				function mu(){
	                if(_self.is(":disabled")){
	                    _btnBody.addClass("ui-buttonActive-d");
	                }else{
	                    _btnBody.removeClass("ui-buttonActive-a");
	                }
	            }
				 if(_self.is(":disabled")){
	                _btnBody.addClass("ui-buttonActive-d");
	            }else{
	                _btnBody.removeClass("ui-buttonActive-d");
	            }
	            if(_self.css("display") == "none"){
	                _btnBody.hide();
	            }else {
	                _btnBody.show();
	            }
	             /**
	             *  由于buttonActive中加入了disable方法，
	             *  则按钮的事件都需要重新处理，要判断是否为disabled，然后在加入或这移除某些样式
	             *  故加入h()、h2()、md()、mu()方法 以及两个if判断
	             *   huanghui@2012-3-14
	             * */
	            _btnBody.hover(h,h2).mousedown(md).mouseup(mu).mouseout(mu).unbind("click").bind("click",function(e){
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
			if(this.element.attr('data-destory') == 'true'){
				this.element.css("color","");/*加入这句话，销毁按钮样式的时候color属性没有去掉  huanghui@2010-3-12  */ 
				this.element.removeClass("standard").unwrap().unwrap();
				this.element.attr('data-destory','false') ;
				return this.element;
			}
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
				if(_self.is(":disabled")){
					_btnBody.addClass("ui-buttonLight-d");
				}else{
					_btnBody.removeClass("ui-buttonLight-d");
				}
				if(_self.is(":hidden")){
					_btnBody.hide();
				}else if(_self.is(":visible")){
					_btnBody.show();
				}
				 /**
	             *  简化代码，将里面的“functions(){h()}”改为“h”
	             *  mouseup和mouseout作用相同 ，调用的mu和mo都是相同的代码，所以将mo函数去掉
	             *   huanghui@2012-3-13
	             * */
	            _btnBody.hover(h,h2).mousedown(md).mouseup(mu).mouseout(mu).unbind("click").bind("click",function(e){
					if(_self.is(":disabled")){
                          }else if(e.target.tagName!="INPUT" && e.target.tagName!="BUTTON"){
                              _self[0].click();
					}
				});
				/**
	             *  ipad下处理，选中效果的添加
	             *  监听“touchstart” 和“touchend”事件
	             *    huanghui@2012-3-13
	             * */
	            if("ontouchstart" in window){
	                var domTarget = _btnBody.get(0);
	               domTarget.addEventListener("touchstart",h,false);
	                domTarget.addEventListener("touchend",function(){
	                    setTimeout(h2,500);
	                },false);
	            }
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
			//判断是否清除插件 
			if(options != 'destory'){
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
				//desc by gaona 2012-03-06 判断是否已经创建dom元素开始  
				if($this.attr('data-destory')!='true'){
					$this.wrap($widgetBox).after($btn).wrap($minSearchInput) ;
					$this.attr('data-destory',true) ;
				}else{
				}
				//desc by gaona 2012-03-06 判断是否已经创建dom元素结束  
				$this.focus(function(){
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
			}else{
				//desc by gaona 2012-03-06 添加销毁事件开始
				if($(this).attr('data-destory') == 'true'){
					$(this).parents('.c6ui-widget-minSearch').children('.minSearchBtn').remove() ;
					$(this).unwrap('.minSearchInput').unwrap() ;
				}
				$(this).attr('data-destory','false') ;
				//desc by gaona 2012-03-06 添加销毁事件结束
			}
		}; 
		$.extend($.fn.minSearch, {
			version: "1.0"
		});
})(jQuery); 
/**
 * 作    者: 张勇辉 
 * 版    本: 1.0 
 * 完成时间: 2011-07-14 
 * 描    述: widget Bubble
 * 关联文件: jQuery.js|jquery-ui.js  
 */
(function($){ 
	/** 
	* @class 气泡提示插件  
    * @name bubble
    * @description 气泡提示插件 
	* @requires jQuery.js|jquery-ui.js 
	* @version 1.0 
    */
$.fn.bubble = function(id,show,options){ 
	/** @lends bubble.prototype */	
		//各种属性、参数 
	var defaults = {
        /**  
        * @name stateBox#x  
        * @param {int} bubble bubble对象 
        * @description 组件的横向坐标 
		* @default {int} 100
		* @example
		* $(document).bubble({x:200});
        */
		x:100,
		 /**  
        * @name stateBox#y  
        * @param {int} bubble bubble对象 
        * @description 组件的纵向坐标 
		* @default {int} 100
		* @example
		* $(document).bubble({y:200});
        */
		y:100,
		 /**  
        * @name stateBox#hand  
        * @param {string} bubble bubble对象 
        * @description 组件指针方向 可选"leftTop" "leftBotton" "rightTop" "rightBottom" 
		* @default {string} 'leftTop'
		* @example
		* $(document).bubble({hand:'rightTop'});
        */
		hand:"leftTop",
		 /**  
        * @name stateBox#content  
        * @param {string} bubble bubble对象 
        * @description 显示的内容 
		* @default {string} "<img src='../uiBase/skins/base/eddy.png' />Eddy Zhang 友情提示:<br/>你没有定义con的参数，请检查你的参数设置。" 
		* @example
		* $(document).bubble({content:'这里是标题'});
        */
		content:"Eddy Zhang 友情提示:<br/>你没有定义content的参数，请检查你的参数设置。",
		 /**  
        * @name stateBox#onClick  
        * @param {fn} bubble bubble对象 
        * @description 显示的内容 
		* @default {fn} function(){$(this).detach();}
		* @example
		* $(document).bubble({onClick:function(){$(this).detach();}});
        */
		onClick:function(){
			$(this).detach();
			}
		}
			var options = $.extend(defaults, options); 
			this.each(function(){ 
			//插件实现代码
			if(show==true){ 
			var $bubbleBody = $("<div class='c6ui-bubble' id='"+id+"' style='left:"+ options.x +"px;top:"+ options.y +"px;'></div>");
			var $bubbleCon = $("<table border='0' cellspacing='0' cellpadding='0' class='c6ui-bubble-layout'><tr><td class='lt'></td><td class='t'></td><td class='rt'></td></tr><tr><td class='l'></td><td class='con'>"+ options.content +"</td><td class='r'></td></tr><tr><td class='lb'></td><td class='b'></td><td class='rb'></td></tr></table>");
			var $corner = $("<div class='corner "+ options.hand +"'></div>");
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
				function removeBox(){
					_stateBox.fadeOut("fast").remove();
				}
		},
		destroy:function(){
			
		}
	});
	
$.extend($.ui.stateBox, {
	version: "1.1"
});

})(jQuery);
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
            _menuList.mouseover(function(){
                flag= false;
            }).mouseout(function(){
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
            }).bind("scroll",function(){
                _menuList.slideUp();
            });   //当滚动条滑动的时候，下拉div消失
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
			var $progressBar=$("<div class='ui-progressBar'><span><b></b></span></div>");
			//显示百分比文字
			$this.wrap($progressBar);
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
		},
		//desc by gaona 2012-03-09 添加销毁事件 begin 
		/**
		* @description 销毁按钮
		* @return {progressBar} progressBar对象
		* @example
		* $("#logo").progressBar('destroy');
		*/
		destroy:function(){
			var targetLen = this.element.parents('.ui-progressBar').length ;
			if(targetLen>0){
				this.element.unwrap().unwrap().unwrap();
				this.element.css('display','block') ;
				return this.element;
			}
		}
		//desc by gaona 2012-03-09 添加销毁事件 end
});

$.extend($.ui.progressBar, {
	version: "1.0"
});

})(jQuery);
//initialize
$(function(){
	$(".progressBar").progressBar();	   
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
			//desc by gaona 2012-03-12 modfiy begin 
			var $plan = $('<b class="'+_color+'Color"></b>') ;
			//desc by gaona 2012-03-12 modfiy end
			$this.wrap($minProgressBar).wrap($plan).before($val).hide();
		},
		_init:function(){
			var $this = this.element;
			if($this.val()<=100){
				$this.parent().animate({width:$this.val()+"%"},"fast");
			}
		},
		//desc by gaona 2012-03-12 添加销毁事件 begin 
		/**
		* @description 销毁插件
		* @return {minProgressBar} minProgressBar对象
		* @example
		* $("#logo").minProgressBar('destroy');
		*/
		destroy:function(){
			var targetLen = this.element.parents('b').length ;
			if(targetLen>0){
				this.element.parents('b').children('div').remove() ;
				this.element.unwrap().unwrap().unwrap();
				this.element.css('display','block') ;
				return this.element;
			}			
		}
		//desc by gaona 2012-03-12 添加销毁事件 end
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
// toolbar
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
});
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
		/**
		* @description 显示单行文本框
		* @return {inputText} inputText对象
		* @example
		* $("#logo").inputText('show');
		*/
		show:function(){
			var _self = this.element;
			_self.show();
			return _self;
		},
		/**
		* @description 隐藏单行文本框
		* @return {inputText} inputText对象
		* @example
		* $("#logo").inputText('hide');
		*/
		hide:function(){
			var _self = this.element;
			_self.hide();
			return _self;
		},
		/**
		* @description 禁用单行文本框
		* @return {inputText} inputText对象
		* @example
		* $("#logo").inputText('disable');
		*/
		disable:function(){
			var _self = this.element;
			_self.attr("disabled",true);
			return _self;
		},
		/**
		* @description 启用单行文本框
		* @return {inputText} inputText对象
		* @example
		* $("#logo").inputText('enable');
		*/
		enable:function(){
			var _self = this.element;
			_self.attr("disabled",false);
			return _self;
		},
		/**
		* @description 销毁单行文本框
		* @return {inputText} inputText对象
		* @example
		* $("#logo").inputText('destroy');
		*/
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
		/**
		* @description 显示下拉选择框
		* @return {inputSelect} inputSelect对象
		* @example
		* $("#logo").inputSelect('show');
		*/
		show:function(){
			var _self = this.element;
			_self.show();
			return _self;
		},
		/**
		* @description 隐藏下拉选择框
		* @return {inputSelect} inputSelect对象
		* @example
		* $("#logo").inputSelect('hide');
		*/
		hide:function(){
			var _self = this.element;
			_self.hide();
			return _self;
		},
		/**
		* @description 禁用下拉选择框
		* @return {inputSelect} inputSelect对象
		* @example
		* $("#logo").inputSelect('disable');
		*/
		disable:function(){
			var _self = this.element;
			_self.attr("disabled",true);
			return _self;
		},
		/**
		* @description 启用下拉选择框
		* @return {inputSelect} inputSelect对象
		* @example
		* $("#logo").inputSelect('enable');
		*/
		enable:function(){
			var _self = this.element;
			_self.attr("disabled",false);
			return _self;
		},
		/**
		* @description 销毁下拉选择框
		* @return {inputSelect} inputSelect对象
		* @example
		* $("#logo").inputSelect('destroy');
		*/
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
		/**
		* @description 显示单行文本框
		* @return {inputTextarea} inputTextarea对象
		* @example
		* $("#logo").inputTextarea('show');
		*/
		show:function(){
			var _self = this.element;
			_self.show();
			return _self;
		},
		/**
		* @description 隐藏多行文本框
		* @return {inputTextarea} inputTextarea对象
		* @example
		* $("#logo").inputTextarea('hide');
		*/
		hide:function(){
			var _self = this.element;
			_self.hide();
			return _self;
		},
		/**
		* @description 禁用多行文本框
		* @return {inputTextarea} inputTextarea对象
		* @example
		* $("#logo").inputTextarea('disable');
		*/
		disable:function(){
			var _self = this.element;
			_self.attr("disabled",true);
			return _self;
		},
		/**
		* @description 启用多行文本框
		* @return {inputTextarea} inputTextarea对象
		* @example
		* $("#logo").inputTextarea('enable');
		*/
		enable:function(){
			var _self = this.element;
			_self.attr("disabled",false);
			return _self;
		},
		/**
		* @description 销毁多行文本框
		* @return {inputTextarea} inputTextarea对象
		* @example
		* $("#logo").inputTextarea('destroy');
		*/
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
	/**
	* @class 选项卡插件
    * @name tab
    * @description 选项卡插件
	* @requires jQuery.js|jquery-ui.js
	* @version 1.0
    */
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
		show:function(){
			 var _self = this.element;
			_self.show();
            return _self;
		},
		hide:function(){
			var _self = this.element;
			_self.hide();
            return _self;
		},
		enable: function() {},
        disable: function() {},
		destroy:function(){
			var _self = this.element;
			_self.removeClass("ui-tabMin ui-tabPro");
            return _self;
		}
    });
    $.extend($.ui.tab, {
		version: "1.0"
	});
})(jQuery);
//initialize
$(function(){
	$(".ui-tab").tab();
});

// touchwipe

/*
 *作    者: 张勇辉 
 *版    本: 2.0 
 *完成时间: 2011-11-30 
 *描    述: touchwipe 
 *关联文件: jQuery.js  
 */	
 /*
 *	#example:
 *	$("#test").touchwipe({
 *			min_move_x: 40, //横向灵敏度
 *			min_move_y: 40, //纵向灵敏度
 *			wipeLeft: function() {$("#val").append("左，");}, //左侧滑动事件
 *			wipeRight: function() { $("#val").append("右，");}, //右侧滑动事件
 *			wipeUp: function() { $("#val").append("上，");}, //向上滑动事件
 *			wipeDown: function() { $("#val").append("下，");}, //向下滑动事件
 *			wipe:function(){$("#val").append("点击，");}, //触摸事件
 *			wipehold:function(){$("#val").append("保持，");}, //触摸保持事件
 *			preventDefaultEvents: true //阻止默认事件
 *		});
 *
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
			version: "2.0",
			author:"张勇辉"
			});
 
 })(jQuery);
 /**
 * @作者 张文钦
 * @时间 2011-10-18
 * @描述 实时搜索
 * @关联 jquery-1.5.2.js
 * @版本 1.0
 */
(function($){
	/**
	* @class 实时搜索插件
    * @name rtSearch
    * @description 实时搜索插件
	* @requires jQuery.js|jquery-ui.js
	* @version 1.0
    */
    $.fn.rtSearch = function(options){
        /**参数、属性扩展*/
        var defaults = {
		   /**  
			* @name rtSearch#width  
			* @param {String} rtSearch rtSearch对象
			* @description 搜索框长度
			* @default {width} "100%"
			* @example
			* $('.rtSearch').rtSearch({width:'200px'});
			*/
            width:'100%',
            /**
             * @param timeout 
             */
            /**  
			* @name rtSearch#timeout  
			* @param {Number} rtSearch rtSearch对象
			* @description 执行自定义响应函数的间隙时间(单位:毫秒)
			* @default {timeout} 600
			* @example
			* $('.rtSearch').rtSearch({timeout:1000});
			*/
            timeout:600,
		   /**  
			* @name rtSearch#searchHandler  
			* @param {fn} rtSearch searchHandler对象 
			* @description 自定义实时搜索处理函数
			* @default {fn} function(){}
			* @example
			* $(".rtSearch").rtSearch({
			*	searchHandler : function(){
			*		alert("响应了实时搜索");
			*		}
			*    });
			*/
            searchHandler:function(){},
            /**  
			* @name rtSearch#onFocus  
			* @param {fn} rtSearch onFocus对象 
			* @description 输入框获得焦点时执行的方法
			* @default {fn} function(){}
			* @example
			* $(".rtSearch").rtSearch({
			*	onFocus : function(){
			*		alert("输入框获得焦点");
			*		}
			*    });
			*/
            onFocus:function(){},
            /**
             * 输入框失去焦点时之行的方法
             */
            /**  
			* @name rtSearch#onBlur
			* @param {fn} rtSearch onBlur对象 
			* @description 输入框失去焦点时执行的方法
			* @default {fn} function(){}
			* @example
			* $(".rtSearch").rtSearch({
			*	onBlur : function(){
			*		alert("输入框失去焦点");
			*		}
			*    });
			*/ 
            onBlur:function(){},
            /**  
			* @name rtSearch#search_mode
			* @param {number} 数字类型 
			* @description 搜索的方式默认值为2，可选值为0:严格搜索,1普通搜索,2自定义搜索方式
			* @default {number} 2
			* @example
			* $(".rtSearch").rtSearch({
			*	search_mode : 2
			* });
			*/
			search_mode : 2
        };
		//判断是否清除插件 2012-03-07 desc by gaona
		if(options != 'destory'){
			var opt = $.extend(defaults,options);
			var _focus = false;
			var _timeSignal = null;
			this.each(function(){
				var $this = $(this);
				var $widgetBox = $('<div class="jh-widgets-rtSearch" style="width:'+opt.width+'"></div>');
				var $searchIco = $('<span class="rt-search-ico"></span>');
				//add clear btn 2012-03-07 desc by gaona
				var $clearIco = $('<span class="rt-clear-ico"></span>');
				var $sHandler = opt.searchHandler;
				var $onFocus = opt.onFocus;
				var $onBlur = opt.onBlur;
				$this.css('width',parseInt(opt.width)-48) ;				
				//desc by gaona 2012-03-07 判断是否已经创建dom元素开始  
				if($this.attr('data-dom')!='true'){
					$this.wrap($widgetBox).before($searchIco).after($clearIco) ;
					$this.attr('data-dom','true') ;
				}else{
				}
				//desc by gaona 2012-03-07 判断是否已经创建dom元素结束  
				$this.focus(function(){
					 _focus = true;
					 if($onFocus != undefined){
						 $onFocus();
					 }
					 //执行实时搜索 2012-03-07 modfiy by gaona 
					 var searchMode = opt.search_mode ;
					 switch(searchMode){
						 case 0 :_timeSignal = setInterval(function(){searchStrict($.trim($this.val())) ;},opt.timeout) ; break ;
						 case 1 :_timeSignal = setInterval(function(){searchCommon($.trim($this.val())) ;},opt.timeout) ; break ;
						 case 2 :_timeSignal = setInterval(function(){$sHandler() ;},opt.timeout) ; break ;
					 }					 
				 })
				 .blur(function(){
					clearInterval(_timeSignal);
					_focus = false;
					if($onBlur != undefined){
						$onBlur();
					}
				 });
				 // 2012-03-07 desc by gaona begin
				 //清空输入框内容 
				 $this.parents('.jh-widgets-rtSearch').children('.rt-clear-ico').click(function(){
					$this.val('') ;	
				 }) ;
				 //清空输入框内容 
				 
				 //搜索方法--严格搜索
				 function searchStrict(keyword){
					 var $searchCon = $('#searchCon>p');
					/*清空*/
					$searchCon.find('span[class^="highlight"]').each(function(index){
						$(this).replaceWith($(this).text());
					});
					/*匹配高亮*/
					if(keyword != null && keyword != ''){
					   var _regexp = new RegExp('('+keyword+')','g');
					   var _text = $searchCon.text();
					   if(_regexp.test(_text)){
						   $searchCon.html(_text.replace(_regexp,'<span class="highlight">$1</span>'));
					   }
					}
				 }
				 //搜索方法--普通搜索
				 function searchCommon(keyword){
					 var $searchCon = $('#searchCon>p');
					/*清空*/
					$searchCon.find('span[class^="highlight"]').each(function(index){
						$(this).replaceWith($(this).text());
					});
					/*匹配高亮*/
					if(keyword != null && keyword != ''){
					   var _regexp = new RegExp('('+keyword+')','g');
					   var _text = $searchCon.text();
					   var strReg = "[\s,./，。、《》？<>?`~!@#$%^&*()_+|·~！@#￥%&*（）——+|]" ; //定义被忽略的特殊字符
					   var reg = new RegExp(strReg,"g") ;
					   var _comKeyword = keyword.replace(reg,"") ; 
					   var _comregexp = new RegExp('('+_comKeyword+')','g') ;
					   if(_regexp.test(_text)){
						   $searchCon.html(_text.replace(_regexp,'<span class="highlight">$1</span>'));
					   }else if(_comregexp.test(_text)){
						   $searchCon.html(_text.replace(_comregexp,'<span class="highlight">$1</span>'));
					   }
					}
				 }
				 //2012-03-07 desc by gaona end
			});
		}else{
			//desc by gaona 2012-03-07 添加销毁事件开始
			if($(this).attr('data-dom') == 'true'){
				$(this).parents('.jh-widgets-rtSearch').children('span').remove() ;
				$(this).unwrap() ;
			}
			$(this).attr('data-dom','false') ;
			//desc by gaona 2012-03-07 添加销毁事件结束
		}
    };
    $.extend($.fn.rtSearch, {version: "1.0"});
})(jQuery);
 /*
 *作    者: 万莎 
 *版    本:  1.0
 *完成时间:  2011-10-17
 *描    述: widgetSlider
 *关联文件: 
 */
(function($,undefined){
    /** 
	* @class 滑块插件
    * @name widgetSlider
    * @description 滑块插件
	* @version 1.0 
    */
	$.widget("ui.widgetSlider",
	{
		options:{
        /**  
        * @name widgetSlider#width  
        * @param {string} widgetSlider widgetSlider对象 
        * @description 宽度 
		* @default {string} "100%"
		* @example
		* $("#txt").widgetSlider({width:"100px"});
        */
			width:"100%"
		},
		_create:function(){
			//插件实现代码
			var o = this.options; 
			var _self = this.element,
				_size = parseInt(_self.attr("data-size"));
			var $widgetSlider=$("<div class='ui-widget-slider'></div>");
			var $div = $("<div><span></span></div>");
			var $handle=$("<b class='handle'></b>");
			var _table="<table border='0' cellspacing='0' cellpadding='0'><tr>";
			for(var i=0;i<_self.val();i++){
				_table = _table + "<td></td>";	
			}
			_table = _table +  "</tr></table>";
			var $table=$(_table);
			_self.wrap($widgetSlider)
			.before($div)
			.before($handle)
			.before($table);
			_self.hide();
			$(".ui-widget-slider table").width($(".ui-widget-slider div").width()+2);
			$(".ui-widget-slider b.handle").draggable({
				containment:"parent",
				axis:"x",
				drag: function() {
					var offset = $(this).position();//$(this).offset();{"left":"100px","top":"200px"}
					var getAll = $(".ui-widget-slider").width();
					var intOffset = parseInt(offset.left);
					var intAll = parseInt(getAll)-16;
					var setVal = parseInt(intOffset / intAll * 100);
					$("#th").val(setVal);
					_self.val( setVal );//更新同步滑块原生结构的值
					$(".ui-widget-slider div span").width(offset.left);
				}
			}).hover(function(){
				$(this).addClass("handleHover");
			}, function(){
				$(this).removeClass("handleHover");
			});
			$(".ui-widget-slider div").click(function(e){
				 var curX = parseInt($(".ui-widget-slider b.handle").position().left);
				 var clickX = parseInt(e.pageX) - _self.siblings('table').offset().left;
				 if(clickX > curX){
					 var getAll = $(".ui-widget-slider").width();
					 var intOffset = parseInt(curX+_size);
					 var intAll = parseInt(getAll)-16;
					 var setVal = parseInt(intOffset / intAll * 100);
					 if(curX + _size > intAll){
						 $("#th").val(100);
						 $(".ui-widget-slider div span").width($(".ui-widget-slider").width()-16+"px");
				 	 	 $(".ui-widget-slider b.handle").css('left',$(".ui-widget-slider").width()-16+"px");
					 }else{
						 $("#th").val(setVal);
						 $(".ui-widget-slider div span").width(curX + _size);
				 	 	 $(".ui-widget-slider b.handle").css('left',curX + _size);
					 }	 
				 }else if(clickX < curX){
					 var getAll = $(".ui-widget-slider").width();
					 var intOffset = parseInt(curX - _size);
					 var intAll = parseInt(getAll)-16;
					 var setVal = parseInt(intOffset / intAll * 100);
					 if(curX - _size < 0){
						 $("#th").val(0);
						 $(".ui-widget-slider div span").width(0);
						 $(".ui-widget-slider b.handle").css('left',0); 
					 }else{
						 $("#th").val(setVal);
						 $(".ui-widget-slider div span").width(curX - _size);
				 	 	 $(".ui-widget-slider b.handle").css('left',curX - _size); 
					 }
				 }
			});
		},
		_init:function(){
			var $this = this.element,
				$widgetSlider = $this.parent(),
				o = this.options;
			$widgetSlider.width(o.width);
			if(o.width != "100%"){
				$widgetSlider.find('>table').width(parseInt(o.width)-16);
			}
		},
		/**
		* @description 显示滑块插件
		* @return {widgetSlider} widgetSlider对象
		* @example
		* $("#logo").widgetSlider('show');
		*/
		show:function(){
			var _self = this.element;
			_self.parent("div.ui-widget-slider").show().prev("input.widget-textinput").show();
			return _self;
		},
		/**
		* @description 隐藏滑块插件
		* @return {widgetSlider} widgetSlider对象
		* @example
		* $("#logo").widgetSlider('hide');
		*/
		hide:function(){
			var _self = this.element;
			_self.parent("div.ui-widget-slider").hide().prev("input.widget-textinput").hide();
			return _self;
		},
		/**
		* @description 禁用滑块插件
		* @return {widgetSlider} widgetSlider对象
		* @example
		* $("#logo").widgetSlider('disable');
		*/
		disable:function(){
			var _self = this.element;
			//接触点击移动滑块
			_self.siblings( "div" ).unbind( "click" );
			//滑块的拖动响应的移除
			_self.siblings( "b" ).draggable( { disabled: true} );
			return _self;
		},
		/**
		* @description 启用滑块插件
		* @return {widgetSlider} widgetSlider对象
		* @example
		* $("#logo").widgetSlider('enable');
		*/
		enable:function(){
			var _self = this.element,_size = parseInt(_self.attr("data-size"));
			_self.siblings( "div" ).click( function( e ) {//此时直接复制_create中方法
				 var curX = parseInt($(".ui-widget-slider b.handle").position().left);
				 var clickX = parseInt(e.pageX) - _self.siblings('table').offset().left;
				 if(clickX > curX){
					 var getAll = $(".ui-widget-slider").width();
					 var intOffset = parseInt(curX+_size);
					 var intAll = parseInt(getAll)-16;
					 var setVal = parseInt(intOffset / intAll * 100);
					 if(curX + _size > intAll){
						 $("#th").val(100);
						 $(".ui-widget-slider div span").width($(".ui-widget-slider").width()-16+"px");
				 	 	 $(".ui-widget-slider b.handle").css('left',$(".ui-widget-slider").width()-16+"px");
					 }else{
						 $("#th").val(setVal);
						 $(".ui-widget-slider div span").width(curX + _size);
				 	 	 $(".ui-widget-slider b.handle").css('left',curX + _size);
					 }	 
				 }else if(clickX < curX){
					 var getAll = $(".ui-widget-slider").width();
					 var intOffset = parseInt(curX - _size);
					 var intAll = parseInt(getAll)-16;
					 var setVal = parseInt(intOffset / intAll * 100);
					 if(curX - _size < 0){
						 $("#th").val(0);
						 $(".ui-widget-slider div span").width(0);
						 $(".ui-widget-slider b.handle").css('left',0); 
					 }else{
						 $("#th").val(setVal);
						 $(".ui-widget-slider div span").width(curX - _size);
				 	 	 $(".ui-widget-slider b.handle").css('left',curX - _size); 
					 }
				 }	
			} );
			_self.siblings( "b" ).draggable( { disabled: false} );
			return _self;
		},
		/**
		* @description 销毁滑块插件
		* @return {widgetSlider} widgetSlider对象
		* @example
		* $("#logo").widgetSlider('destroy');
		*/
		destroy:function(){
			 var _self = this.element;
			_self.show().unbind( "click" ).unwrap().siblings( "div,b,table" ).remove();
			return _self;
		}
});

$.extend($.ui.widgetSlider, {
	version: "1.0"
});

})(jQuery);
//initialize
$(function(){
	$(".widgetSlider").widgetSlider();	   
});
﻿/*
 *作    者: 万莎
 *完成时间: 2011-10-19
 *描    述: widgetSpin
 *关联文件: jQuery.js|jquery-ui.js
 */  
(function($){   
  $.fn.extend({   
    spin: function(opt){   
      return this.each(function(){   
        opt = $.extend({   
            imageBasePath: 'images/widgetSpin/',   
            spinBtnImage: 'widgetSpin.png',   
            spinUpImage: 'widgetSpin-up.png',   
            spinDownImage: 'widgetSpin-down.png',   
            interval: 1,   
            max: null,   
            min: null,   
            timeInterval: 500,   
            timeBlink: 200  
          }, opt || {});   
           
        var txt = $(this);   
          
        var spinBtnImage = opt.imageBasePath+opt.spinBtnImage;   
        var btnSpin = new Image();   
        btnSpin.src = spinBtnImage;   
        var spinUpImage = opt.imageBasePath+opt.spinUpImage;   
        var btnSpinUp = new Image();   
        btnSpinUp.src = spinUpImage;   
        var spinDownImage = opt.imageBasePath+opt.spinDownImage;   
        var btnSpinDown = new Image();   
        btnSpinDown.src = spinDownImage;   
           
        var btn = $(document.createElement('img'));   
        btn.attr('src', spinBtnImage);   
        btn.css({cursor: 'pointer', verticalAlign: 'bottom', padding: 0, margin: 0});   
        txt.after(btn);   
        txt.css({marginRight:0, paddingRight:0});   
          
        function spin(vector){   
          var val = txt.val();
          if(!isNaN(val)){   
            val = parseFloat(val) + (vector*opt.interval);   
            if(opt.min!=null && val<opt.min) val=opt.min;   
            if(opt.min!=null && val>opt.max) val=opt.max; 
		    var intAll = parseInt($(".ui-widget-slider").width())-16;
		    var setVal = parseInt(val * intAll / 100);
		    $(".ui-widget-slider div span").width(setVal);
		    $(".ui-widget-slider b.handle").css('left',setVal);
            if(val != txt.val()){   
              txt.val(val);   
              $( ".ui-widget-slider>input" ).val( val );
              txt.change();   
              src = (vector > 0 ? spinUpImage : spinDownImage);   
              btn.attr('src', src);   
              if(opt.timeBlink<opt.timeInterval)   
                setTimeout(function(){btn.attr('src', spinBtnImage);}, opt.timeBlink);   
            }   
          }   
        }   
           
        btn.mousedown(function(e){   
          var pos = e.pageY - btn.offset().top;   
          var vector = (btn.height()/2 > pos ? 1 : -1); 
          (function(){  
            spin(vector);   
            var tk = setTimeout(arguments.callee, opt.timeInterval);   
            $(document).one('mouseup', function(){   
              clearTimeout(tk); btn.attr('src', spinBtnImage);   
            });   
          })();   
          return false;   
        });   
      });   
    }   
  });   
})(jQuery);

(function($,undefined){
    /** 
	* @class 微调组件
    * @name widgetSpin
    * @description 微调组件
	* @version 1.0 
    */
	$.widget("ui.widgetSpin",
	{
		options:{
        /**  
        * @name widgetSpin#width  
        * @param {string} widgetSpin widgetSpin对象 
        * @description 宽度 
		* @default {string} "100%"
		* @example
		* $("#txt").widgetSpin({width:"100px"});
        */
			width:"100%"
		},
		_create:function(){
			//插件实现代码
			var o = this.options; 
			var _self = this.element;
			var $widgetSpin=$("<div class='ui-widget-slider'></div>");
			var $div = $("<div><span></span></div>");
			var $handle=$("<b class='handle'></b>");
			var _table="<table border='0' cellspacing='0' cellpadding='0'><tr>";
			for(var i=0;i<_self.val();i++){
				_table = _table + "<td></td>";	
			}
			_table = _table +  "</tr></table>";
			var $table=$(_table);
			_self.wrap($widgetSpin)
			.before($div)
			.before($handle)
			.before($table);
			_self.hide();
			$(".ui-widget-slider table").width($(".ui-widget-slider div").width()+2);
		},
		_init:function(){
			var $this = this.element,
				$widgetSpin = $this.parent(),
				o = this.options;
			$widgetSpin.width(o.width);
			if(o.width != "100%"){
				$widgetSpin.find('>table').width(parseInt(o.width)-16);
			}
		},
		/**
		* @description 显示微调组件
		* @return {widgetSpin} widgetSpin对象
		* @example
		* $("#logo").widgetSpin('show');
		*/
		show:function(){
			var _self = this.element;
			//不进行交叉处理
			_self.parent( "div.ui-widget-slider" ).show();//.prev( "img" ).show().prev( "input" ).show();
			return _self;
		},
		/**
		* @description 隐藏微调组件
		* @return {widgetSpin} widgetSpin对象
		* @example
		* $("#logo").widgetSpin('hide');
		*/
		hide:function(){
			var _self = this.element;
			//不进行交叉处理 此时只是隐藏自己
			_self.parent( "div.ui-widget-slider" ).hide();//.prev( "img" ).hide().prev( "input" ).hide();
			return _self;
		},
		/**
		* @description 禁用微调组件
		* @return {widgetSpin} widgetSpin对象
		* @example
		* $("#logo").widgetSpin('disable');
		*/
		disable:function(){//什么也没做
			return this.element;
		},
		/**
		* @description 启用微调组件
		* @return {widgetSpin} widgetSpin对象
		* @example
		* $("#logo").widgetSpin('enable');
		*/
		enable:function(){//什么也没做
			return this.element;
		},
		/**
		* @description 销毁微调组件
		* @return {widgetSpin} widgetSpin对象
		* @example
		* $("#logo").widgetSpin('destroy');
		*/
		destroy:function(){
			var $this = this.element;
			 $this.unwrap().show();
			 $this.siblings('div,b,table').remove();
		}
});

$.extend($.ui.widgetSpin, {
	version: "1.0"
});

})(jQuery);
//initialize
$(function(){
	//$(".widgetSpin").widgetSpin();	   
});
/**
* advancedSearch
*/
function loc_adv_s(){
	var $jc_s = $("#jcsearchDiv");
	var _jcs_offset = $jc_s.offset();
	var $adv_s = $("#searchAdvanceCon");
	var $adv_a = $('#jcs_search_a');
	$adv_a.live('click',function(){
		if($adv_s.css('display') == 'none'){
			$("#searchAdvanceCon").css({
				"display":"block",
				"position":"absolute",
				"z-index":"1987"
			});
			setTimeout(function(){
				$adv_s.slideUp() ;
			},3000) ;
		}else{
			$("#searchAdvanceCon").hide();
		}
	});
}

$(function(){
	loc_adv_s();
	$("div#searchAdvanceCon div").live("click",function(e){
		var $newClass = $(this).find("span").attr("class");
		$("#searchTypeIco").attr("class",$newClass).css("float","left");
		$("#jcs_search_a span.jcs_common_s_mei").attr("id","jcs-common-search_"+$(this).index()).attr("searchType",$(this).index());
		$("#searchAdvanceCon").hide();
		$("#jcs_mei_s").focus();
	});
});
$(window).resize(function(){
	loc_adv_s();
});

(function($){ 
	$.fn.advancedSearch = function(options){  
		var defaults = {
			btnClick:function(){},
			onFocus:function(){},
			width:"100%"
		}
		//判断是否清除插件 2012-03-09 desc by gaona
		if(options != 'destory'){
			var options = $.extend(defaults, options); 
			this.each(function(){ 
				var $this = $(this);
				var $jcs_common_search_body = $("<div class='jcs_common_search_con'></div>");
				var $jcs_common_search_con = $("<a id='jcs_search_a'><span class='jcs_common_s_ico' id='searchTypeIco'></span><span class='jcs_common_s_mei' id='jcs-common-search_0'></span></a>")
				var $jcs_common_search_advanced = $("<input type='text' id='jcs_mei_s' style='width:"+options.width+";'/>")
				var $jcs_common_search_right =$("<span class='jcs_common_search'></span>")
				var $onClick = options.btnClick;
				var $onFocus = options.onFocus;
				var _focus = false;	
				//desc by gaona 2012-03-09 判断是否已经创建dom元素开始  
				if($this.attr('data-destory')!='true'){
					$this.wrap($jcs_common_search_body) ;
					$this.attr('data-dom','true') ;
				}else{
				}
				//desc by gaona 2012-03-09 判断是否已经创建dom元素结束
				$this.before($jcs_common_search_con).after($jcs_common_search_right)
					 .focus(function(){
						 $onFocus();
						 _focus = true;
						 document.onkeydown = function(e){
							 var ev = document.all ? window.event : e;
							 if(ev.keyCode==13) {
								 $onClick();
							 }
						 }
					})
			}); 
		}else{
			//desc by gaona 2012-03-09 添加销毁事件开始
			if($(this).attr('data-dom') == 'true'){
				$(this).parents('.jcs_common_search_con').children('a').remove() ;
				$(this).parents('.jcs_common_search_con').children('span').remove() ;
				$(this).unwrap() ;
			}
			$(this).attr('data-dom','false') ;
			//desc by gaona 2012-03-09 添加销毁事件结束
		}
 }; 
 $.extend($.fn.advancedSearch, {
	version: "1.0"
 });
})(jQuery); 
/*
 *作    者: 高娜 
 *版    本: 1.0 
 *完成时间: 2012-02-13 
 *描    述: dragupload
 *关联文件: jQuery.js  
 */
 
/*
 *	#example:
 *	$('.draguploadDiv').dragUpload({
 *		upload_disable : ['exe','avi'] ,
		display_form : 1
 *	});
 *
*/
(function($){
	/** 
	* @class dragupload监听器
    * @name dragupload
    * @description 基于html5的拖拽上传
	* @version 1.0 
	* @author 高娜 
	* @requires jQuery-1.5.2+
    */
	$.fn.dragUpload = function(options){
		var defaults = {
			/**  
			* @name dragUpload#display_width
			* @param {Number}  数字类型
			* @description 拖拽目的地宽度
			* @default {Number} 360
			* @example
			* $('.draguploadDiv').dragUpload({
			*		display_width : 360
			*  });
			*/
			display_width : 380,
			/**  
			* @name dragUpload#display_height
			* @param {Number}  数字类型
			* @description 拖拽目的地高度
			* @default {Number} 300
			* @example
			* $('.draguploadDiv').dragUpload({
			*		display_height : 300
			*  });
			*/
			display_height : 300,
			/**  
			* @name dragUpload#display_form
			* @param {Number}  数字类型
			* @description 上传文件展示形式 默认有0,1
			* @default {Number} 1
			* @example
			* $('.draguploadDiv').dragUpload({
			*		display_form : 1
			*  });
			*/
			display_form : 1,
			/**  
			* @name dragUpload#upload_able
			* @param {Array}  数组类型
			* @description 可上传文件格式(如果设置有值表示除设置的几种文件格式其他在备选数组中的文件格式均不可上传)
			* @default {Array} []
			* @example
			* $('.draguploadDiv').dragUpload({
			*		upload_able : []
			*  });
			*/
			upload_able : [],
			/**  
			* @name dragUpload#upload_disable
			* @param {Array}  数组类型
			* @description 不可上传文件格式(如果设置有值表示除设置的几种文件格式其他在备选数组中的文件格式均可上传)
			* @default {Array} []
			* @example
			* $('.draguploadDiv').dragUpload({
			*		upload_disable : []
			*  });
			*/
			upload_disable : [],
			/**  
			* @name dragUpload#filescontain
			* @param {Array}  数组类型
			* @description 备选的文件格式
			* @default {Array} [jpg,gif,png,doc,docx,xlsx,xls,txt,html,rar,zip,asp,ppt,pptx,avi]
			* @example
			* $('.draguploadDiv').dragUpload({
			*		filescontain :['jpg','gif','png','jpeg','doc','docx','xls','xlsx','txt','html','rar','zip','asp']
			*  });
			*/
			filescontain : ['jpg','gif','png','jpeg','doc','docx','xls','xlsx','txt','html','rar','zip','asp','ppt','pptx','avi','exe'],
			/**  
			* @name dragUpload#files_size
			* @param {Number}  数字类型
			* @description 上传文件大小，单位字节
			* @default {Number} 1024000
			* @example
			* $('.draguploadDiv').dragUpload({
			*		files_size : 1024000
			*  });
			*/
			files_size : 1024000,
			/**  
			* @name dragUpload#dragEnterDiv  
			* @param {Fn} 函数 
			* @description dragenter时操作
			* @default {Fn} function(){}
			* @example
			* $('.draguploadDiv').dragUpload({
			*		dragEnterDiv: function(){alert("dragenter")}
			*    });
			*/
 			 dragEnterDiv : function(){},
			/**  
			* @name dragUpload#dragOverDiv  
			* @param {Fn} 函数 
			* @description dragover时操作
			* @default {Fn} function(){}
			* @example
			* $('.draguploadDiv').dragUpload({
			*		dragOverDiv: function(){alert("dragover")}
			*    });
			*/
 			 dragOverDiv : function(){},
			/**  
			* @name dragUpload#dragDropDiv  
			* @param {Fn} 函数 
			* @description drop时操作
			* @default {Fn} function(){}
			* @example
			* $('.draguploadDiv').dragUpload({
			*		dragDropDiv: function(){alert("dragdrop")}
			*    });
			*/
 			 dragDropDiv : function(){},
			/**  
			* @name dragUpload#dragLeaveDiv  
			* @param {Fn} 函数 
			* @description dragleave时操作
			* @default {Fn} function(){}
			* @example
			* $('.draguploadDiv').dragUpload({
			*		dragLeaveDiv: function(){alert("dragleave")}
			*    });
			*/
 			dragLeaveDiv : function(){}
		} ;
		var opts = $.extend(defaults,options) ;
		this.each(function(){
			var $this = $(this) ;
				formNum = opts.display_form ;
				index = 0 ;
				thisElem = $('.draguploadDiv')[0] ;
				dragMsg = $('.draguploadMsg').html() ;
				$this.css({
					'width':opts.display_width ,
					'height':opts.display_height
				}) ;
			//判断浏览器是否支持
			if(window.FileReader){
				thisElem.addEventListener('dragenter', handleDragEnter, false);
				thisElem.addEventListener('dragover', handleDragOver, false);
				thisElem.addEventListener('drop', handleFileSelect, false);
				thisElem.addEventListener('dragleave', handleDragLeave, false);	
			}else{
				$('.draguploadDiv').html('很抱歉！您的浏览器不支持此次拖拽上传，请使用chrome,firefox等支持的浏览器') ;
			}
			
			//处理拖放文件列表
			function handleFileSelect(evt) {
				evt.stopPropagation(); //阻止默认的打开事件
				evt.preventDefault();
				showFiles(evt) ;
				opts.dragDropDiv() ;
			}
			
			// 处理插入拖出效果
			function handleDragEnter(evt){ 
				evt.stopPropagation();
				evt.preventDefault();
				//this.setAttribute('style', 'border-style:dashed;'); 
				opts.dragEnterDiv() ;
			}
			function handleDragLeave(evt){ 
				//this.setAttribute('style', ''); 
				opts.dragLeaveDiv() ;
			}
	
			// 处理文件拖入事件，防止浏览器默认事件带来的重定向
			function handleDragOver(evt){
				evt.stopPropagation();
				evt.preventDefault();
				opts.dragOverDiv() ;
			}
			
			//创建上传文件展示方式
			function showFiles(evt){
				switch(formNum){
					case 0 : displayList(evt) ; break ;
					case 1 : displayPicNav(evt) ; break ;
				}
			}
			
			//列表形式展示--display_form:0
			function displayList(evt){
				var files = evt.dataTransfer.files;//一个file类型的数组，就是你拖拽进来的文件
				var newHTML = '' ;
				for(var i=0,f; f=files[i]; i++){
					if(f.size<opts.files_size){
						var pos = f.name.lastIndexOf('.') ;
						fileFormat = f.name.substring(pos+1,f.name.length) ;
						//判断是否可上传
						if(isuploadfileType(fileFormat)){
							reader = new FileReader() ;
							newHTML = '<li><img src="images/dragUpload/page.png" class="picIco"/><span>'+f.name+'</span><img src="images/dragUpload/page_cross.gif" class="delBtn"/></li>' ;
							reader.readAsDataURL(f);//直接将图片的内容以FileReader的readAsDataURL方法读取入并显示
						}else{
							dragMsg += '<br/>'+fileFormat+'上传文件格式不正确，请重新选择' ;
							$('.draguploadMsg').html(dragMsg).css('color','#f60c32') ;
						}						
						newHTML = '<ul>' + newHTML + '</ul>' ;
						$('.draguploadDiv').append(newHTML) ;
					}else{
						dragMsg += '<br/>'+f.name+'文件大小超过了上传最大值，请重新选择' ;
						$('.draguploadMsg').html(dragMsg).css('color','#f60c32') ;
					}											
				}
			}
			//缩略图形式展示--display_form:1
			function displayPicNav(evt){
				var files = evt.dataTransfer.files;//一个file类型的数组，就是你拖拽进来的文件
				var newHTML = '' ;
				var defaultImg = 'images/dragUpload/defaultBig.jpg' ;
				for(var i=0,f; f=files[i]; i++){
					if(f.size<opts.files_size){
						var pos = f.name.lastIndexOf('.') ;
						fileFormat = f.name.substring(pos+1,f.name.length) ;
						//判断是否可上传
						if(isuploadfileType(fileFormat)){
							reader = new FileReader() ;
							isImg = isImage(fileFormat) ;
							if(isImg){
								reader.onload = (function (theFile) {
									return function (e) {
										//location.href = e.target.result ;
										newHTML = '<dl><dt><div class="imgDiv"><img src="'+ e.target.result +'"/></div><img src="images/dragUpload/closePop.png" class="delBtn"/></dt><dd>'+theFile.name+'</dd></dl>' ;
										$('.draguploadDiv').append(newHTML) ;
									};
								})(f) ;
							}else{
								newHTML = '<dl><dt><div class="imgDiv"><img src="images/dragUpload/defaultBig.jpg"/></div><img src="images/dragUpload/closePop.png" class="delBtn"/></dt><dd>'+f.name+'</dd></dl>' ;
								$('.draguploadDiv').append(newHTML) ;
							}
							reader.readAsDataURL(f);//直接将图片的内容以FileReader的readAsDataURL方法读取入并显示
						}else{
							dragMsg += '<br/>'+fileFormat+'上传文件格式不正确，请重新选择' ;
							$('.draguploadMsg').html(dragMsg).css('color','#f60c32') ;
						}
					}else{
						dragMsg += '<br/>'+f.name+'文件大小超过了上传最大值，请重新选择' ;
						$('.draguploadMsg').html(dragMsg).css('color','#f60c32') ;
					}					
				}
			}
			//判断是否是图片
			function isImage(type){
				switch(type){
					case 'jpeg':
					case 'png':
					case 'gif':
					case 'bmp':
					case 'jpg':
						return true;
					default:
						return false;
				}
			}
			//判断是否可上传的文件格式
			function isuploadfileType(uploadType){
				var ableLen = opts.upload_able.length ;
				    disableLen = opts.upload_disable.length
				if((ableLen == 0)&&(disableLen == 0)){
					return isInArr(uploadType,opts.filescontain) ;
				}else if((ableLen>0)&&(disableLen==0)){
					return isInArr(uploadType,opts.upload_able) ;
				}else if((ableLen==0)&&(disableLen>0)){
					return !(isInArr(uploadType,opts.upload_disable)) ;
				}else{
					console.log('仅需要设置只允许上传的或不允许上传的文件格式');
				}
			}
			//判断是否在数组中
			function isInArr(uploadfile,filesArr){
				for(var i=0; i<filesArr.length;i++){
					if(uploadfile == filesArr[i]){
						return true ;
					}
				}
			}
			//清空按钮
			$('.clearBtn').live('click',function(){
				$('.draguploadDiv').empty() ;
			}) ;
			//删除按钮
			$('.delBtn').live('click',function(){			
				switch(formNum){
					case 0 : $(this).parent('li').remove() ; break ;
					case 1 : $(this).parent().parent().remove() ; break ;
				}
			}) ;
		}) ;
		return this ;
	} ;
	$.extend($.fn.dragupload,{
		version: '1.0',
		author:'高娜'
	});
})(jQuery) ;
/*
 *作    者: 高娜 
 *版    本: 1.0 
 *完成时间: 2012-02-20 
 *描    述: formLayout
 *关联文件: jQuery.js  
 */
 
/*
 *	#example:
 *	$('.ui-formLayout').formLayout({
	});	
 *
*/
(function($){
	/** 
	* @class formLayout监听器
    * @name formLayout
    * @description 表单元素插件
	* @version 1.0 
	* @author 高娜 
	* @requires jQuery-1.5.2+
    */
	$.fn.formLayout = function(options){
		//$(this).html($(this).html()) ;
		var defaults = {
			/**  
			* @name formLayout#form_layout
			* @param {Number}  数字类型
			* @description 布局展示，表示排列的栏目数，默认值可为1、2、3..栏,和form_width只需要设置一个
			* @default {Number} 2
			* @example
			* $('.ui-formLayout').formLayout({
			*		form_layout : 2
			*  });
			*/
			form_layout : 2,
			/**  
			* @name formLayout#form_label_pos
			* @param {String}  字符串型
			* @description 字段名针对文本输入域显示的位置，参考值为top/left/right/bottom(上、左、右、下)
			* @default {String} 'top'
			* @example
			* $('.ui-formLayout').formLayout({
			*		form_label_pos : 'top'
			*  });
			*/
			form_label_pos : 'top',
			/**  
			* @name formLayout#form_label_textalign
			* @param {String}  字符串型
			* @description 字段名对齐方式，参考值left/right(居左/居右)
			* @default {String} 'left'
			* @example
			* $('.ui-formLayout').formLayout({
			*		form_label_textalign : 'left'
			*  });
			*/
			form_label_textalign : 'left',
			/**  
			* @name formLayout#form_label_dev
			* @param {Number}  数字类型
			* @description 偏差值，在计算的时候使用，在计算过程中需加上单位或是百分号
			* @default {Number} 20
			* @example
			* $('.ui-formLayout').formLayout({
			*		form_label_dev : 20
			*  });
			*/
			form_label_dev : 20,
			/**  
			* @name formLayout#form_width
			* @param {Number}  数字类型
			* @description form表单参考宽度
			* @default {Number} 600
			* @example
			* $('.ui-formLayout').formLayout({
			*		form_width : 600
			*  });
			*/
			form_width : 600,
			/**  
			* @name formLayout#form_title
			* @param {String}  字符串类型
			* @description form表单标题
			* @default {String} form标题
			* @example
			* $('.ui-formLayout').formLayout({
			*		form_title : 'form标题'
			*  });
			*/
			form_title : 'form标题',
			/**  
			* @name formLayout#form_wordcard
			* @param {String}  字符串类型
			* @description 
			* @default {String} 字段名后面的通配符，可选参数-、：、等
			* @example
			* $('.ui-formLayout').formLayout({
			*		form_wordcard : ':'
			*  });
			*/
			form_wordcard : '：',
			/**  
			* @name formLayout#form_colspan
			* @param {Number}  数字类型
			* @description 跨列的值
			* @default {Number} 1
			* @example
			* $('.ui-formLayout').formLayout({
			*		form_colspan : 1
			*  });
			*/
			form_colspan : 1,
			/**  
			* @name formLayout#form_elem_width
			* @param {Number}  数字类型
			* @description form表单输入区域宽度最大限制
			* @default {Number} 300
			* @example
			* $('.ui-formLayout').formLayout({
			*		form_elem_width : 300
			*  });
			*/
			form_elem_width : 300,
			/**  
			* @name formLayout#form_textarea_height
			* @param {Number}  数字类型
			* @description form表单文本域高度
			* @default {Number} 60
			* @example
			* $('.ui-formLayout').formLayout({
			*		form_textarea_height : 60
			*  });
			*/
			form_textarea_height : 60,
			/**  
			* @name formLayout#formDisable  
			* @param {Fn} 函数 
			* @description 禁用指定表单元素
			* @default {Fn} function(){}
			* @example
			* $('.ui-formLayout').formLayout({
			*		formDisable: function(){alert("formDisable")}
			*    });
			*/
 			formDisable : function(obj){
				if($(obj).attr('disabled')){
					$(obj).addClass('ui-formCambo-disabled') ;
				}
				var $type = $(obj).attr('tagName').toLowerCase() ;
				if($type=='div'){
					var $objInput = $(obj).find('input') ;
					for(var i=0; i<$objInput.length; i++){
						if(($objInput.eq(i).attr('disabled'))&&!($objInput.eq(i).attr('checked'))){
							$objInput.eq(i).next('label').find('span').eq(0).addClass('ui-formCambo-ico-disabled') ;
						}else if(($objInput.eq(i).attr('disabled'))&&($objInput.eq(i).attr('checked'))){
							$objInput.eq(i).next('label').find('span').eq(0).addClass('ui-formCambo-ico-checked-disabled') ;
						}
					}
				}
			}
		} ;
		var opts = $.extend(defaults,options) ;
		this.each(function(){
			var $this = $(this) ;
			$(this).css({
				width:opts.form_width
			}) ;
			$(this).find('textarea').height(opts.form_textarea_height) ;
			
			formCreate() ;
			//设置一栏布局的块状显示
			if(opts.form_layout == 1){
				$(this).find('.ui-formLayoutItem').css({
					'display':'block',
					'clear':'both'
				}) ;
			}
			//创建dom元素
			function formCreate(){
				var titleDom = '<div class="ui-formLayoutCon"></div>' ;				
				$this.prepend(titleDom) ;
				$this.children('.ui-formLayoutInput').each(function(index, element){
					createInput(this) ;			
				});
				setElemWid() ;
			}
			
			//输入区域获取焦点
			$('.ui-formLayoutInput').live('focus',function(){
				$(this).addClass('ui-formLayoutInput-active') ;
			}).live('blur',function(){
				$(this).removeClass('ui-formLayoutInput-active') ;
			}) ;
			
			//创建input[type='text'],textarea的dom
			function createInput(obj){
				if($(obj).attr('must-fill')&&($(obj).attr('must-fill')=='true')){
					var itemDiv = '<div class="ui-formLayoutItem"><label class="ui-formLayoutLabel ui-formLayoutLabel-'+opts.form_label_pos+'"><span class="ui-formLayoutFill">*</span>'+$(obj).attr('form-elem-title') +opts.form_wordcard+'</label><div class="ui-formLayoutValue" ></div>' ;
				}else{
					var itemDiv = '<div class="ui-formLayoutItem"><label class="ui-formLayoutLabel ui-formLayoutLabel-'+opts.form_label_pos+'">'+$(obj).attr('form-elem-title') +opts.form_wordcard+'</label><div class="ui-formLayoutValue" ></div>' ;
				}
				var $itemDiv = $(itemDiv);
				$this.find('.ui-formLayoutCon').append($itemDiv);
				$itemDiv.find('.ui-formLayoutValue').append(obj);
				$this.find('.ui-formLayoutLabel').css('text-align',opts.form_label_textalign) ;
				opts.formDisable(obj) ;
			}
			
			//设置元素宽度
			function setElemWid(){
				var $InputElem = $this.find('.ui-formLayoutInput') ;
				var $widDev ;
				for(var i=0; i<$InputElem.length;i++){
					var $colspan = $InputElem.eq(i).attr('form-colspan') || opts.form_colspan ;
					var $labelElem = $this.find('.ui-formLayoutLabel') ;
					var $labelWid = 0 ;
					for(var j=0; j<$labelElem.length; j++){
						if($labelElem.eq(j).width()>$labelWid){
							$labelWid  = $labelElem.eq(j).width() ;
						}
					}
					$this.find('.ui-formLayoutLabel').width($labelWid) ;
						var $elemWid = $(this).attr('elem-width') || (($this.width() - opts.form_label_dev - $labelWid*opts.form_layout - 20*opts.form_layout)/opts.form_layout) ;
					if($InputElem.eq(i).attr('type') == 'select-one'){
						$widDev = 8 ;
					}else{
						$widDev = 0 ;
					}
					if($elemWid>opts.form_elem_width){
						if($colspan>=2){
							$InputElem.eq(i).width(opts.form_elem_width*$colspan+($colspan-1)*$labelWid+opts.form_label_dev+$widDev) ;
						}else{
							$InputElem.eq(i).width(opts.form_elem_width*$colspan+($colspan-1)*$labelWid+$widDev) ;
						}
					}else{
						if($colspan>=2){
							$InputElem.eq(i).width($elemWid*$colspan+($colspan-1)*$labelWid+opts.form_label_dev+$widDev) ;
						}else{
							$InputElem.eq(i).width($elemWid*$colspan+($colspan-1)*$labelWid+$widDev) ;
						}
					}
					
					if($InputElem.eq(i).siblings('.ui-formSelect').children('.ui-formSelect-text')){
						$this.find('.ui-formSelect').eq(i).width($InputElem.eq(i).width()+3)
					}
				}
			}
			
		}) ;
		return this ;
	} ;
	$.extend($.fn.formLayout,{
		version: '1.0',
		author:'高娜'
	});
})(jQuery) ;
//禁用某表单元素setEnable
function setDisable(obj){
	if(!obj.hasClass('ui-formCambo-disabled')){
		obj.addClass('ui-formCambo-disabled') ;
	}
	var $type = obj.attr('type') ;
	if(($type=='radio')||($type=='checkbox')){
		if((obj.attr('disabled'))&&!(obj.attr('checked'))){
			obj.next('label').find('span').eq(0).addClass('ui-formCambo-ico-disabled') ;
		}else if((obj.attr('disabled'))&&(obj.attr('checked'))){
			obj.next('label').find('span').eq(0).addClass('ui-formCambo-ico-checked-disabled') ;
		}
	}
}
//启用某表单元素
function setEnable(obj){
	if(obj.hasClass('ui-formCambo-disabled')){
		obj.removeClass('ui-formCambo-disabled') ;
	}
	var $type = obj.attr('type') ;
	if(($type=='radio')||($type=='checkbox')){
		if(obj.next('label').find('span').eq(0).hasClass('ui-formCambo-ico-disabled')){
			obj.next('label').find('span').eq(0).removeClass('ui-formCambo-ico-disabled') ;
		}else if(obj.next('label').find('span').eq(0).hasClass('ui-formCambo-ico-checked-disabled')){
			obj.next('label').find('span').eq(0).removeClass('ui-formCambo-ico-checked-disabled').addClass('ui-formCambo-ico-checked') ;
		}
	}
}
//影藏某表单元素及其字段
function setHide(obj){
	var obj = document.getElementById(obj) ;
	var type = obj.getAttribute('type') ;
	if((type == 'checkbox')||(type == 'radio')){
		obj.style.display = 'none' ;
		obj.nextSibling.nodeValue= ' ' ;		
	}else{
		$(obj).parents('.ui-formLayoutItem').css('display','none') ;
	}
}
//显示某表单元素及其字段
function setShow(obj){
	var obj = document.getElementById(obj) ;
	var type = obj.getAttribute('type') ;
	if((type == 'checkbox')||(type == 'radio')){
		obj.style.display = 'inline-block' ;
		obj.nextSibling.nodeValue= obj.value ;		
	}else{
		$(obj).parents('.ui-formLayoutItem').css('display','inline-block') ;
	}
}
/*
 *作    者: 高娜 
 *版    本: 1.0 
 *完成时间: 2012-03-15 
 *描    述: scrollBar
 *关联文件: jQuery.js  
 */
 
/*
 *	#example:
 *	$('.ui-scrollBar').scrollBar({
	});	
 *
*/
(function($){
	/** 
	* @class scrollBar监听器
    * @name scrollBar
    * @description 仿移动设备滚动条
	* @version 1.0 
	* @author 高娜 
	* @requires jQuery-1.5.2+
    */
	$.fn.scrollBar = function(options){
		var defaults = {
			/**  
			* @name scrollBar#scroll_width
			* @param {Number}  数字类型
			* @description 滚动条宽度
			* @default {Number} 7
			* @example
			* $('.ui-scrollBar').scrollBar({
			*		scroll_width : 7
			*  });
			*/
			scroll_width : 7,
			/**  
			* @name scrollBar#scroll_speed
			* @param {Number}  数字类型
			* @description 滑块滑动的速度
			* @default {Number} 1000
			* @example
			* $('.ui-scrollBar').scrollBar({
			*		scroll_speed : 1000
			*  });
			*/
			scroll_speed : 400,
			/**  
			* @name scrollBar#scroll_times
			* @param {Number}  数字类型
			* @description 目标完成滚动的次数
			* @default {Number} 10
			* @example
			* $('.ui-scrollBar').scrollBar({
			*		scroll_times : 10
			*  });
			*/
			scroll_times : 5
		} ;
		if(options != 'destory'){
			$(document).bind("selectstart",function(){return false;}); //清除火狐以外浏览器选中文本效果 
			//实现滚动条插件
			var opts = $.extend(defaults,options) ;
			this.each(function(){
				var $this = $(this) ;
				var $availHei = window.screen.availHeight - 180 ;
				var $scrollDiv = $('<div class="ui-scrollBarDiv"></div>') ;
				var $scrollSlide = $('<div class="ui-scroll"><div class="ui-scrollSlide" id="aaa"></div></div>') ;
				if($this.attr('data-dom')!='true'){
					$this.wrap($scrollDiv).after($scrollSlide) ;
					$this.attr('data-dom',true) ;
				}else{
				}
				
				var $scrTop = 0 ; /*模拟滚动条的top值*/
				var $thisTop = 0 ;/*目标区域的top值*/
				var $thisPar = $this.parents('div') ; /*目标区域外层div*/
				var $thisElemHei = $this.height() ; /*目标区域高度*/
				$thisPar.height($availHei) ;
				var $browerFirefox = navigator.userAgent.indexOf('Firefox') ; //火狐触发滚轮效果需要添加DOMMouseScroll事件
				var $thisParHei = $thisPar.height() ;
				//滚动scroll_times次完成，需要每次滚动的高度
				var $scrollHei = Math.ceil(($thisElemHei - $thisParHei)/(opts.scroll_times+1)) ; 
				//模拟滚动条的高度
				var $scrollSliHei = Math.ceil($thisParHei/(1.2*(opts.scroll_times+1))) ;
				$('.ui-scrollBarDiv .ui-scroll .ui-scrollSlide').height($scrollSliHei) ;				
				$thisSlide = $thisPar.find('.ui-scrollSlide') ;		
				if($thisElemHei>$thisParHei){
					//滚轮方法调用
					if($browerFirefox < 0){
						$thisPar[0].onmousewheel = function(e){
							if($.browser.msie&&$.browser.version<=8){
							}else{
								e.preventDefault();
							}
							scrollBarWheel(e) ;
					   }
					}else{
						$thisPar[0].addEventListener('DOMMouseScroll',function(e){
							e.preventDefault();
							scrollBarWheel(e) ;
						},false) ;
					}
					
					//mouse事件触发调用
					$this.mousedown(function(e){
						e.preventDefault();
						scrollBarMouse(e) ;
					}) ;
					
					//touch事件触发调用 		
					if('ontouchstart' in document.documentElement){ //判断是否支持touchstart
						$this[0].addEventListener('touchstart',scrollBarTouch,false) ;
					}else{
					}
				}else{
					$thisSlide.css('display','none') ;
				}	
				
			    //滚轮触发滑动
				var wheelInt ;
				var wheelBea ; //设置无论滚动幅度大小只相当于滚动一次
				var availBot = $thisElemHei - $thisParHei ;
			    function scrollBarWheel(e){
					//临界值判断
					var marTop = parseInt($this.css('marginTop')) ;
					var botTop = (Math.abs(marTop) <= Math.abs(availBot)) ;	
					
					if((marTop<=0)&&botTop){		
						if(!wheelBea){
							//判断滚轮的方向
							if($browerFirefox < 0){
							  $scrTop -= $scrollSliHei*(event.wheelDelta/120) ;
							  $thisTop += $scrollHei*(event.wheelDelta/120) ;
							}else{
							  //火狐不支持wheelDelta
							  $scrTop += $scrollSliHei*(e.detail/3) ;
							  $thisTop -= $scrollHei*(e.detail/3) ;
							}	
							wheelBea = true;
							clearInterval(wheelInt);
							wheelInt = setTimeout(function () {
								wheelBea = false;
							},150);	
						}else{
						}	
					}else if(marTop>0){
						$scrTop = 0; //目标区域到达到上临界值。
						$thisTop = 0;
					}else if(!botTop){
						$scrTop = $thisParHei - 1.4*$scrollHei ;
						$thisTop = 0 - availBot ;
					}
				    $thisPar.find('.ui-scrollSlide').animate({
					  top:$scrTop
				    },opts.scroll_speed) ;
				    $this.animate({
					  marginTop:$thisTop
				    },opts.scroll_speed) ;
			    }
				
				//mouse方式触发滚动
				function scrollBarMouse(e){
					var sign = 1 ;
					var beginY = e.clientY ;
					//临界值判断
					var marTop = parseInt($this.css('marginTop')) ;
					var botTop = (Math.abs(marTop) <= Math.abs(availBot)) ;
					$this.mousemove(function(e){
						if(sign){
							var y =(e.clientY - beginY);
							var yabs = Math.abs(y) ;
							if((marTop<=0)&&botTop){		
								$scrTop -= $scrollSliHei*(y/yabs) ;
								$thisTop += $scrollHei*(y/yabs) ;
							}else if(marTop>0){
								$scrTop = 0; //目标区域到达到上临界值。
								$thisTop = 0;
							}else if(!botTop){
								$scrTop = $thisParHei - 1.4*$scrollHei ;
								$thisTop = 0 - availBot ;
							}
							sign = 0 ;
							
							$thisPar.find('.ui-scrollSlide').animate({
							  top:$scrTop
							},opts.scroll_speed) ;
							$this.animate({
							  marginTop:$thisTop
							},opts.scroll_speed) ;
						}
					}) ;
					$this.mouseup(function(e){
						sign = 0 ;
					}) ;
				}
				
				//touch方式触发滚动
				function scrollBarTouch(e){
					e.preventDefault();
					signTouch = 1 ;
					touchBeginY = parseInt(e.targetTouches[0].pageY) ;
					//临界值判断
					marTouchTop = parseInt($this.css('marginTop')) ;
					botTouchTop = (Math.abs(marTouchTop) <= Math.abs(availBot)) ;
					
					$this[0].addEventListener('touchmove',scrollBarTouchMove,false) ;
					$this[0].addEventListener('touchend',scrollBarTouchEnd,false) ;
				}
				
				function scrollBarTouchMove(e){
					if(signTouch){
						var touchNewY = e.targetTouches[0].pageY ;
						var y = touchNewY - touchBeginY ;
						var yabs = Math.abs(y) ;
						if((marTouchTop<=0)&&botTouchTop){		
							$scrTop -= $scrollSliHei*(y/yabs) ;
							$thisTop += $scrollHei*(y/yabs) ;
						}else if(marTouchTop>0){
							$scrTop = 0; //目标区域到达到上临界值。
							$thisTop = 0;
						}else if(!botTouchTop){
							$scrTop = $thisParHei - 1.4*$scrollHei ;
							$thisTop = 0 - availBot ;
						}
						signTouch = 0 ;
						$thisPar.find('.ui-scrollSlide').animate({
						  top:$scrTop
						},opts.scroll_speed) ;
						$this.animate({
						  marginTop:$thisTop
						},opts.scroll_speed) ;
					}
				}
				
				function scrollBarTouchEnd(e){
					signTouch = 0 ;
				}
			 	
				//改变窗口方法
				$(window).resize(function(){
					$this.scrollBar() ;
				});
			}) ;
			return this ;
		}else{
			//销毁滚动条插件 begin
			if($(this).attr('data-dom') == 'true'){
				$(this).nextUntil('.ui-scroll').remove() ;
				$(this).unwrap('.ui-scrollBarDiv') ;
			}
			$(this).attr('data-dom','false') ;
			//销毁滚动条插件 end
		}
	} ;
	$.extend($.fn.scrollBar,{
		version: '1.0',
		author:'高娜'
	});
})(jQuery) ;
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
                	$(but).attr("title",butName);
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
//            //id固定----如果页面有多个下拉控件的时候会有问题。
//            //部门多选
//            $("#menuSelectDepts").live("click",function(){
//                o.getMoreDepts();
//            });
//            //人员多选
//             $("#menuSelectUsers").live("click",function(){
//                 o.getMoreUsers();
//             });

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
        * @name menuSingleSelect#titleJson
        * @param {menuSingleSelect} menuSingleSelect menuOnlySelect对象
        * @description titleJson数据源
		* @default {menuSingleSelect} ""
		* @example
		* $("#link").menuSingleSelect({titleJson:"titleJson.js"});
        */
        titleJson :"",
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
                    but.attr("value",o.names).attr("title",o.names);
                    if(o.names>10){
                        var  butName=o.names.substring(0,10)+"..."  ;
                        but.attr("value",butName);
                    }
                   	var trueId = o.listId.substring(4,o.listId.length);
                	var arrIds = o.ids.split(",");
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