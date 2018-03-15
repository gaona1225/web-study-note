

/*
 *作    者: 万莎 
 *版    本: 1.2
 *完成时间: 2011-10-24
 *描    述: minProgressBar
 *关联文件: 
 */
(function($,undefined){
    /** 
	* @class 微型进度条插件
    * @name minProgressBar
    * @description 微型进度条插件
	* @version 1.2 
    */
	$.widget("ui.minProgressBar",
	/** @lends buttonPro.prototype */		 
	{
        options:{
            /**
            * @name minProgressBar#dataValue
            * @param {minProgressBar} minProgressBar minProgressBar对象
            * @description  设置进度条的百分值,默认为空
            * @default {minProgressBar} ""
            * @autor  huanghui@2012-5-21
            * $("#link").minProgressBar({dataValue:"80"});
            */
            dataValue:""
        },
		_create:function(){
			//插件实现代码 
			var $this = this.element,
				_color = $this.attr("data-color") || '';
			var $val = $("<div class='ui-min-progressBar-dataValue'>"+$this.val()+"</div>");
			var $minProgressBar=$("<div class='ui-min-progressBar'><span></span></div>");
			var $plan = $('<b class="'+_color+'Color"></b>') ;
			$this.wrap($minProgressBar).wrap($plan).before($val).hide();
		},
		_init:function(){
            //modify huanghui@2012-5-21 加入dataValue参数，给进度条动态赋值
			var $this = this.element,o= this.options;
            if(o.dataValue=='' ||o.dataValue==null ||o.dataValue=='undefined'){
                  if($this.val()<=100){
                    $this.parent().animate({width:$this.val()+"%"},"fast");
                }
            }else{
                if(o.dataValue>0 && o.dataValue<=100){
                    $('div.ui-min-progressBar-dataValue').text(o.dataValue);
                    $this.parent().animate({width:o.dataValue+"%"},"fast");
                }

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

$.extend($.fn.minProgressBar, {
	version: "1.2"
});

})(jQuery);
//initialize
$(function(){
	$(".minProgressBar").minProgressBar();	   
});