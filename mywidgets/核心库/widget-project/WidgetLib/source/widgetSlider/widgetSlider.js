 /*
 *作    者: 万莎 
 *版    本:  1.2
 *完成时间:  2011-10-17
 *描    述: widgetSlider
 *关联文件: 
 */
(function($,undefined){
    /** 
	* @class 滑块插件
    * @name widgetSlider
    * @description 滑块插件
	* @version 1.2 
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
	version: "1.2"
});

})(jQuery);
//initialize
$(function(){
	$(".widgetSlider").widgetSlider();	   
});