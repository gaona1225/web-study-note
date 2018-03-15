
/*
 *作    者: 张勇辉 
 *版    本: 1.2 
 *完成时间: 2011-07-14 
 *描    述: minSearch
 *关联文件: jQuery.js|jquery-ui.js 
 */ 
 (function($){ 
	/** 
	* @class 简洁搜索框插件 
    * @name minSearch
    * @description 简洁搜索框插件 
	* @requires jQuery.js|jquery-ui.js 
	* @version 1.2 
    */
	$.fn.minSearch = function(options){ 
			//各种属性、参数 
			var defaults = {
				/**  
				* @name minSearch#btnClick  
				* @param {fn} minSearch minSearch对象 
				* @description 按钮点击时执行的函数
				* @default {fn} function(){}
				* @example
				* $("#search").minSearch({
				*	btnClick : function(){
				*		alert("点击了搜索按钮");
				*		}
				*    });
				*/
				btnClick:function(){},
				/**  
				* @name minSearch#onFocus  
				* @param {fn} minSearch minSearch对象 
				* @description 输入框获取焦点后执行的函数 
				* @default {fn} function(){}
				* @example
				* $("#search").minSearch({
				*	onFocus : function(){
				*		alert("获取焦点");
				*		}
				*    });
				*/
				onFocus:function(){},
				/**  
				* @name minSearch#onBlur  
				* @param {fn} minSearch minSearch对象 
				* @description 输入框获取焦点后执行的函数 
				* @default {fn} function(){}
				* @example
				* $("#search").minSearch({
				*	onBlur : function(){
				*		alert("焦点离开");
				*		}
				*    });
				*/
				onBlur:function(){},
				/**  
				* @name minSearch#width  
				* @param {fn} minSearch minSearch对象 
				* @description 宽度  
				* @default {string} "100%"
				* @example
				* $("#search").minSearch({
				*	width : '50px'
				*    });
				*/
				width:"100%"
			}
			//判断是否清除插件 
			if(options != 'destory'){
				var options = $.extend(defaults, options); 
				this.each(function(){ 
					//插件实现代码 
					var $this = $(this);
					var $widgetBox = $("<div class='c6ui-widget-minSearch' style='width:"+options.width+";'></div>");
					var $btn = $("<a href='javascript:void(0)' class='minSearchBtn'></a>");
					var $minSearchInput = $("<div class='minSearchInput'></div>");
					var $onClick = options.btnClick;
					var $onFocus = options.onFocus;
					var $onBlur = options.onBlur;
					var _focus = false;
					//desc by gaona 2012-03-06 判断是否已经创建dom元素开始  
					if($this.attr('data-destory')!='true'){
						$this.wrap($widgetBox).after($btn).wrap($minSearchInput) ;
						$this.attr('data-destory',true) ;
					}else{
					}
					//desc by gaona 2012-03-06 判断是否已经创建dom元素结束  
					$this.focus(function(){
						$onFocus();
						_focus = true;
							//By Eddy 2011-08-26 add 注册回车键代理点击事件 begin
							document.onkeydown = function(e){  
								var ev = document.all ? window.event : e;
								if(ev.keyCode==13) {
									   $onClick();
								 }
							}
							//By Eddy 2011-08-26 add 注册回车键代理点击事件 end
						})
					.blur(function(){
						$onBlur();
						document.onkeydown = function(e){}//By Eddy 2011-08-26 add 清空回车键代理点击事件 
						});/*.removeAttr("class")*//*保留选择器*/
					
					$btn.click($onClick);
				}); 
			}else{
				//desc by gaona 2012-03-06 添加销毁事件开始
				if($(this).attr('data-destory') == 'true'){
					$(this).parents('.c6ui-widget-minSearch').children('.minSearchBtn').remove() ;
					$(this).unwrap('.minSearchInput').unwrap() ;
				}
				$(this).attr('data-destory','false') ;
				//desc by gaona 2012-03-06 添加销毁事件结束
			}
		}; 
		$.extend($.fn.minSearch, {
			version: "1.2"
			});
})(jQuery); 
 