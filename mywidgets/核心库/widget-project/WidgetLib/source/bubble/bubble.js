 
/**
 * 作    者: 张勇辉 
 * 版    本: 1.2 
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
	* @version 1.2 
    */
$.fn.bubble = function(id,show,options){ 
	/** @lends bubble.prototype */	
		//各种属性、参数 
	var defaults = {
        /**  
        * @name bubble#x  
        * @param {int} bubble bubble对象 
        * @description 组件的横向坐标 
		* @default {int} 100
		* @example
		* $(document).bubble({x:200});
        */
		x:100,
		 /**  
        * @name bubble#y  
        * @param {int} bubble bubble对象 
        * @description 组件的纵向坐标 
		* @default {int} 100
		* @example
		* $(document).bubble({y:200});
        */
		y:100,
		 /**  
        * @name bubble#hand  
        * @param {string} bubble bubble对象 
        * @description 组件指针方向 可选"leftTop" "leftBotton" "rightTop" "rightBottom" 
		* @default {string} 'leftTop'
		* @example
		* $(document).bubble({hand:'rightTop'});
        */
		hand:"leftTop",
		 /**  
        * @name bubble#content  
        * @param {string} bubble bubble对象 
        * @description 显示的内容 
		* @default {string} "<img src='../uiBase/skins/base/eddy.png' />Eddy Zhang 友情提示:<br/>你没有定义con的参数，请检查你的参数设置。" 
		* @example
		* $(document).bubble({content:'这里是标题'});
        */
		content:"Eddy Zhang 友情提示:<br/>你没有定义content的参数，请检查你的参数设置。",
		 /**  
        * @name bubble#onClick  
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

