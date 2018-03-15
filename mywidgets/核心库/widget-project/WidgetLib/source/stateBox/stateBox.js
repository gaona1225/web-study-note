
/*
 *作    者: 张勇辉 
 *版    本: 1.2 
 *完成时间: 2011-07-26 
 *描    述: stateBox 
 *关联文件: jQuery.js|jquery-ui.js 
 */	
  /*
 *changelog：
 * 2011-11-23 修复跨框架访问的问题
 * 2012-8-23 删除_init方法中调用_stateBoxRemoveBox的多余window.top前缀
 *           具体应用stateBox时,应该由调用方设定stateBox隶属的window对象
 *           此设定放置到stateBox调用封装函数中去@common.js
 *           //配合common.js中修改处理纯IE7下运行时间错误问题
 */

(function($,undefined){
	/** 
	* @class 状态提示插件 
    * @name stateBox
    * @description 状态提示插件 
	* @requires jQuery.js|jquery-ui.js 
	* @version 1.2 
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
					_stateBoxRemoveBox();
				}
				if(o.state === "succeed"){
					_stateBox.addClass("ui-stateBox-succeed");
					_stateBoxRemoveBox();
				}else if(o.state === "alert"){
					_stateBox.addClass("ui-stateBox-alert");
					_stateBoxRemoveBox();
				}else if(o.state === "error"){
					_stateBox.addClass("ui-stateBox-error");
					_stateBoxRemoveBox();
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
	version: "1.2"
});

})(jQuery);
function _stateBoxRemoveBox(){
	setTimeout(function(){
		$(document).find(".ui-stateBox").fadeOut("fast").remove();
	},2800);
}