

/*
 *作    者: 张勇辉
 *版    本: 1.2
 *完成时间: 2011-07-12
 *描    述: buttonActive
 *关联文件: jQuery.js|jquery-ui.js
 */
(function($,undefined){
    /**
	* @class 推荐按钮插件
    * @name buttonActive
    * @description 推荐按钮插件
	* @version 1.2
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
         * 加入 show()按钮显示、hide()按钮隐藏、disable()按钮禁用、enable()按钮启用方法
         * huanghui@2010-3-7
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
	version: "1.2"
});

})(jQuery);

$(function(){
	$(".buttonActive").buttonActive();
});