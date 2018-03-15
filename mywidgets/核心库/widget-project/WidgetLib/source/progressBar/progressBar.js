

/*
 *作    者: 张勇辉 
 *版    本. 1.2 
 *完成时间: 
 *描    述: progressBar
 *关联文件: 
 */
(function($,undefined){
    /** 
	* @class 标准进度条插件
    * @name progressBar
    * @description 标准进度条插件
	* @version 1.2 
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

$.extend($.fn.progressBar, {
	version: "1.2"
});
})(jQuery);
//initialize
$(function(){
	$(".progressBar").progressBar();	   
});