
/*
 *作    者: 张勇辉
 *版    本: 1.2
 *完成时间: 2011-07-26
 *描    述: buttonLight
 *关联文件: jQuery.js|jquery-ui.js
 */
(function($,undefined){
    /**
	* @class 轻量按钮插件
    * @name buttonLight
    * @description 轻量按钮插件
	* @version 1.2
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
	version: "1.2"
});

})(jQuery);
//initialize
$(function(){
		 $(".buttonLight").buttonLight();
});