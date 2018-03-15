/*
 *作    者: 黄卉
 *版    本: 1.3
 *完成时间: 2012-12-25
 *描    述: readModel阅读模式插件
 *关联文件: jQuery.js|jquery-ui.js 
 */
(function($,undefined){
    /**
	* @class 阅读模式插件
    * @name readModel
    * @description 阅读模式，类似视频网站的关灯效果
	* @version 1.3
    */
	$.widget("ui.readModel",
	/** @lends readModel.prototype */
	{
		 options:{
			 height:'',  //目标元素的高度
 			 width:'', //目标元素的宽度
			 model:'default', //阅读模式，在原来的位置default、在显示区域的中间位置center
			 iframe:false  //是否跨iframe显示
		 },
		/*
		 * @description 显示插件
		 * @example 显示插件，开灯
		 * $("#targetID").readModel('show');
		 **/
		 show:function(){
			var o = this.options,$target = this.element,top=0,left=0,that = this,
				$readBg = $('<div class="ui-readModel-bg"></div>'),
				$closeSpan = $('<span class="ui-readModel-close"></span>'),
				maxHeight = 0,maxWidth=0,closeLeft =0;
			$('html').css('overflow','hidden');
			maxHeight = Math.max(document.body.offsetHeight,o.height||$target.height());
			maxWidth = Math.max(document.body.offsetWidth,o.width||$target.width());
			$readBg.css({'height':maxHeight,'width':maxWidth});
			$target.attr('initStyle',$target.attr('style'));
			if(o.height!=''){$target.height(o.height);}			
			if(o.width!=''){$target.width(o.width);}
			else{$target.css('width',$target.width())}
			if(o.model=='center'){
				var winHeight = parseFloat($(window).height()),
					winWidth = parseFloat($(window).width()),
					tarHeight = parseFloat($target.height()),
					tarWidth = parseFloat($target.width()),
					scrollTop = document.body.scrollTop || document.documentElement.scrollTop,
					scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
				top = winHeight<tarHeight?scrollTop+15:winHeight/2 - tarHeight/2+scrollTop;
				left = winWidth<tarWidth?scrollLeft+15: winWidth/2-tarWidth/2+scrollLeft;
			}else if(o.model=='default'){
				top = $target.offset().top;
				left = $target.offset().left;
			}
			if($target.width()==maxWidth){
				closeLeft =0;
			}else{
				closeLeft = left+$target.width()-15;
			}
			$closeSpan.css({'top':top-15,'left':closeLeft})
				.bind('click',function(){that.hide();});
			if(o.iframe){
				if(window.top.document=='undefined'||window.top.document==null||window.top.document==''){
					$target.css({'position':'absolute','top':top,'left':left});
					$target.wrap($readBg).before($closeSpan);
				}else{
					var $targetClone = $target.clone(true);//clone方法在jqueryUI中remove的时候会触发插件的所有destroy方法
					$targetClone.addClass('ui-readModel-clone').css({'position':'absolute','top':top,'left':left});
					$(window.top.document.body).append($readBg);
					$readBg.append($targetClone).append($closeSpan);
				}				
			}else{
				$target.css({'position':'absolute','top':top,'left':left});
				$target.wrap($readBg).before($closeSpan);
			}			
		},
		/*
		 * @description 隐藏插件
		 * @example 隐藏插件，关灯
		 * $("#targetID").readModel('hide');
		 **/
		hide:function(){
			var o = this.options,$target = this.element,
				$readBg = $('div.ui-readModel-bg'),
				$closeSpan = $readBg.find('.ui-readModel-close');
			$target.attr('style',$target.attr('initStyle')).removeAttr('initStyle');
			$closeSpan.unbind('click');
			if(o.iframe){
				$readBg.hide();
				var $targetClone = $readBg.find('.ui-readModel-clone');
				if($targetClone.length!=0){
					$targetClone.remove();
					$target.unwrap($readBg);
					$closeSpan.remove();
				}else{
					$target.unwrap($readBg);
					$closeSpan.remove();	
				}
			}else{
				$target.unwrap($readBg);
				$closeSpan.remove();					
			}
			$('html').css('overflow','');
		},
		destroy:function(){
			//alert('destroy');
		}
	});

	$.extend($.ui.readModel, {
		version: "1.3",
		author:'黄卉',
		date:'2012-12-24'
	});

})(jQuery);

$(function(){
	$(".ui-readModel").readModel();		
	//$(".ui-readModel").readModel('destroy');
});