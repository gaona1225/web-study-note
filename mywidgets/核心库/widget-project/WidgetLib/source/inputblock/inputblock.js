/*
 *作    者: 高娜
 *版    本: 1.3
 *完成时间: 2012-07-11
 *描    述: inputblock
 *关联文件: jQuery.js|jquery-ui.js
 */
(function($,undefined){
    /**
	* @class 输入块控件
    * @name inputblock
    * @description 输入块插件
	* @version 1.3
    */
	$.widget('ui.inputblock',
	/** @lends inputblock.prototype */
	{		
		options:{
			/**  
			* @name inputblock#width
			* @param {Number}  数字类型
			* @description 包裹展示区域的宽度
			* @default {Number} 400
			* @example
			* $('.exampleObj').inputblock({
			*		width : 400
			*  });
			*/
			width : 400 ,
			/**  
			* @name inputblock#content
			* @param {String}  字符串类型
			* @description 选择区域提示信息
			* @default {String} 'add a person'
			* @example
			* $('.exampleObj').inputblock({
			*		content : 'add person'
			*  });
			*/
			content : 'add person' ,
			/**  
			* @name inputblock#list
			* @param {Array}  数组类型
			* @description 显示的列表
			* @default {Array} []
			* @example
			* $('.exampleObj').inputblock({
			*		list : []
			*  });
			*/
			list : [] ,
			/**  
			* @name inputblock#fn  
			* @param {Fn} 函数 
			* @description 预留自定义方法
			* @default {Fn} function(){}
			* @example
			* $('.exampleObj').uploadannex({
			*		fn : function(){}
			*    });
			*/
 			 fn : function(){} ,
			 /**  
			* @name inputblock#fnClick 
			* @param {Fn} 函数 
			* @description 点击事件预留方法,需要传递一个返回值，数组类型。
			* @default {Fn} function(){}
			* @example
			* $('.exampleObj').uploadannex({
			*		fnClick : function(){return ['张三','六六']  ;}
			*    });
			*/
 			 fnClick : function(){} ,
			 /**  
			* @name inputblock#fnDel  
			* @param {Fn} 函数 
			* @description 删除事件预留方法
			* @default {Fn} function(){}
			* @example
			* $('.exampleObj').uploadannex({
			*		fnDel : function(){}
			*    });
			*/
 			 fnDel : function(){} 
		},
		_create:function(){
			var _self = this.element ;
			var o = this.options ;
			var listLen = o.list.length ;
			var inputblockWrap = '<div class="inputblock-wrap"></div>' ;
			var inputWrap = '<div class="inputblock-add"></div>' ;
			var inputblockClear = '<div class="inputblock-clear"></div>' ;
			var inputblockElem = '' ;
			for(var i=0; i<listLen; i++){
				inputblockElem += '<p class="inputblock-elem"><span>'+o.list[i]+'</span><a href="#" title="delete" class="inputblock-del"></a></p>'
			}
			_self.val(o.content).attr({'readonly':true,'unselectable':'on'}).wrap(inputblockWrap).wrap(inputWrap).parents('.inputblock-add').before(inputblockElem).after(inputblockClear) ;
			_self.parents('.inputblock-wrap').width(o.width) ;
		},
		_init:function(){
			var _self = this.element ;
			var o = this.options ;
			var _tarObj = _self.parents('div.inputblock-wrap') ;
			for(var i=0; i<_tarObj.length ; i++){
				_tarObj.eq(i).click(function(e){
					var _this = $(this) ;
					var target = e.target ;
					if(!$(target).hasClass('inputblock-del')){
						var newElem = o.fnClick() ;
						var inputNewElem = '' ;
						for(var i=0; i<newElem.length; i++){
							inputNewElem += '<p class="inputblock-elem"><span>'+newElem[i]+'</span><a href="#" title="delete" class="inputblock-del"></a></p>'
						}
						_this.find('div.inputblock-add').before(inputNewElem) ;
					}
				}) ;
			}
			$('.inputblock-del').live('click',function(){
				$(this).parents('.inputblock-elem').remove() ;
				o.fnDel() ;
			}) ;
		},
		/**
		* @description 注入输入块,需要传入参数，参数为数组形式。
		* @return {inputblock} inputblock对象
		* @example
		* $("#testExpObj").inputblock('setVal',['黄黄','张张','菲菲']);
		*/
		setVal : function(newElem){
			this.element.parents('.inputblock-wrap').find('.inputblock-elem').remove() ;
			var len = newElem.length ;
			var inputblockElem = '' ;
			for(var i=0; i<len; i++){
				inputblockElem += '<p class="inputblock-elem"><span>'+newElem[i]+'</span><a href="#" title="delete" class="inputblock-del"></a></p>'
			}
			this.element.parents('.inputblock-add').before(inputblockElem) ;
		},
		/**
		* @description 获得输入块
		* @return {inputblock} inputblock对象
		* @example
		* $("#testExpObj").inputblock('getVal');
		*/
		getVal : function(){
			console.log('fdasfa') ;
			var spanElem = this.element.parents('.inputblock-wrap').find('.inputblock-elem span') ;
			var len = spanElem.length ;
			getAry = [] ;
			for(var i=0; i<len; i++){
				getAry[i] = spanElem.eq(i).html() ;
			}
			return getAry ;
		},
		/**
		* @description 清楚输入块控件
		* @return {inputblock} inputblock对象
		* @example
		* $("#testExpObj").inputblock('destroy');
		*/
		destroy : function(){
			if(this.element.parents('.inputblock-wrap').length > 0){
				 this.element.parents('.inputblock-wrap').find('.inputblock-elem').remove() ;
				 this.element.parents('.inputblock-wrap').find('.inputblock-clear').remove() ;
				 this.element.unwrap().unwrap().removeAttr('readonly') ;
			}
		}
	});

	$.extend($.fn.inputblock, {
		version: "1.3"
	});

})(jQuery);