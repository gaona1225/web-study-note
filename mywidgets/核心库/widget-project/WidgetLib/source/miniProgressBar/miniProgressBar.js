

/*
 *作    者: 万莎 
 *版    本: 1.2
 *完成时间: 2011-10-24
 *描    述: miniProgressBar
 *关联文件: 
 */
(function($,undefined){
    /** 
	* @class 微型进度条插件
    * @name minProgressBar
    * @description 微型进度条插件
	* @version 1.2 
    */
	$.widget("ui.miniProgressBar",
	/** @lends buttonPro.prototype */		 
	{
        options:{
          /**
            * @name miniProgressBar#dataValue
            * @param {miniProgressBar} miniProgressBar miniProgressBar对象
            * @description  设置进度条的百分值，默认为空
            * @default {miniProgressBar} ""
            * @autor  huanghui@2012-5-21
            * $("#link").miniProgressBar({dataValue:"80"});
            */
            dataValue:""
        },
		_create:function(){
			//插件实现代码 
			var $this = this.element;
			var $val = $("<div class='ui-mini-progressBar-dataValue'>"+$this.val()+"%</div>");
			var $plan = $("<b></b>");
			var $miniProgressBar=$("<div class='ui-mini-progressBar'><span></span></div>");
			$this.after($val);
			$this.wrap($miniProgressBar);
			$this.wrap($plan);
			$this.hide();
		},
		_init:function(){
            //modify huanghui@2012-5-21 加入dataValue参数，给进度条动态赋值
			var $this = this.element,o=this.options;
			if(o.dataValue=='' ||o.dataValue==null ||o.dataValue=='undefined'){
                if($this.val()<=100){
				    $this.parent().animate({width:$this.val()+"%"},"fast");
			    }
            }else{
                if(o.dataValue>0 &&o.dataValue<=100){
                     $this.val(o.dataValue);
                     $this.parents('div.ui-mini-progressBar').next('div').text(o.dataValue+"%");
                     $this.parent().animate({width:o.dataValue+"%"},"fast");
                }
            }

		}  ,
        /**
		* @description 销毁插件方法
		* @return {minProgressBar} minProgressBar对象
		* @autor  huanghui@2012-5-21
		* $("#logo").minProgressBar('destroy');
		*/
		destroy:function(){
			var targetLen = this.element.parents('b').length ;
			if(targetLen>0){
				this.element.parents('div.ui-mini-progressBar').next('div').remove() ;
                this.element.unwrap().unwrap().unwrap();
				this.element.css('display','block') ;
				return this.element;
			}
		}
});

$.extend($.fn.miniProgressBar, {
	version: "1.2"
});

})(jQuery);
//initialize
$(function(){
	$(".miniProgressBar").miniProgressBar();	   
});