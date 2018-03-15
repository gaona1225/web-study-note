
/*
 *作    者: 张勇辉
 *版    本: 1.2
 *完成时间: 2011-07-12
 *描    述: buttonPro
 *关联文件: jQuery.js|jquery-ui.js
 */
(function($,undefined){
    /**
	* @class 标准按钮插件
    * @name buttonPro
    * @description 标准按钮插件
	* @version 1.2
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
	version: "1.2"
});

})(jQuery);
//initialize
$(function(){
		 $(".buttonPro").buttonPro();
});