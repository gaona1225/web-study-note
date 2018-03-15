/*
 *作    者: 高娜
 *版    本: 1.3
 *完成时间: 2012-07-05
 *描    述: ratystar
 *关联文件: jQuery.js|jquery-ui.js
 */
(function($,undefined){
    /**
	* @class 星级评定
    * @name ratystar
    * @description 星级评定插件
	* @version 1.3
    */
	$.widget('ui.ratystar',
	/** @lends ratystar.prototype */
	{		
		options:{
			/**  
			* @name ratystar#total
			* @param {Number}  数字类型
			* @description 显示最多星星个数
			* @default {Number} 5
			* @example
			* $('.exampleObj').ratystar({
			*		total : 5
			*  });
			*/
			total : 5 ,
			/**  
			* @name ratystar#value
			* @param {Number}  数字类型
			* @description 每个星星表示的分值
			* @default {Number} 1
			* @example
			* $('.exampleObj').ratystar({
			*		value : 1
			*  });
			*/
			value : 1 ,
			/**  
			* @name ratystar#stardefault
			* @param {Number}  数字类型
			* @description 默认显示星级,这个需要和每个星星表示的分值相除，所以建议设置值和每个星星分值成整数倍。
			* @default {Number} 2
			* @example
			* $('.exampleObj').ratystar({
			*		stardefault : 2
			*  });
			*/
			stardefault : 2 ,
			/**  
			* @name ratystar#disable
			* @param {Boolean}  布尔类型
			* @description 是否禁用手动设置星级
			* @default {Boolean} false
			* @example
			* $('.exampleObj').ratystar({
			*		disable : false
			*  });
			*/
			disable : false
		},
		_create:function(){
			var _self = this.element ;
			var o = this.options ;
			var starul = '' ;
			var starli = '' ;
			for(var i=0 ; i<o.total ; i++){
				starli += '<li></li>' ;
			}
			starul = '<ul class="ratystar-starul" data-disable = '+ o.disable + '>' + starli + '</ul><div class="ratystar-clear"></div>' ;
			_self.append(starul) ;
		},
		_init:function(){
			var _self = this.element ;
			var o = this.options ;
			var tarLi = _self.find('.ratystar-starul li') ;
			var tarUl = _self.find('.ratystar-starul') ;
			var sourceLi = Math.round((o.stardefault - 1) / o.value) ;
			setStarL(sourceLi) ;
			tarLi.click(function(){
				if(tarUl.attr('data-disable') == 'false'){
					var index = $(this).index() ;
					tarLi.css('cursor','pointer') ;
					setStarL(index) ;
					setStarD(index) ;
					sourceLi = index ;
				}else{
					tarLi.css('cursor','default') ;
				}
			}) ;
			
			tarLi.hover(function(){
				if(tarUl.attr('data-disable') == 'false'){
					var index = $(this).index() ;
					tarLi.css('cursor','pointer') ;
					setStarL(index) ;
					setStarD(index) ;
				}else{
					tarLi.css('cursor','default') ;
				}
			},function(){
				if(tarUl.attr('data-disable') == 'false'){
					tarLi.css('cursor','pointer') ;
					setStarL(sourceLi) ;
					setStarD(sourceLi) ;
				}else{
					tarLi.css('cursor','default') ;
				}
			}) ;
			
			//点亮星星
			function setStarL(index){			
				for(var i=0 ; i<=index; i++){
					if(!tarLi.eq(i).hasClass('ratystar-starli-active')){
						tarLi.eq(i).addClass('ratystar-starli-active') ;
					}
				}
				tarUl.attr('data-starval',(index+1)*o.value) ;
			}
			
			//点灰星星
			function setStarD(index){
				for(var i = index + 1 ; i<o.total ; i++){
					if(tarLi.eq(i).hasClass('ratystar-starli-active')){
						tarLi.eq(i).removeClass('ratystar-starli-active') ;
					}
				}
				tarUl.attr('data-starval',(index+1)*o.value) ;
			}
		},
		/**
		* @description 禁用设置星级
		* @return {ratystar} ratystar对象
		* @example
		* $("#testExpObj").ratystar('disable');
		*/
		disable : function(){
			this.element.find('.ratystar-starul').attr('data-disable','true') ;
		},
		/**
		* @description 启用设置星级
		* @return {ratystar} ratystar对象
		* @example
		* $("#testExpObj").ratystar('enable');
		*/
		enable : function(){
			this.element.find('.ratystar-starul').attr('data-disable','false') ;
		},
		/**
		* @description 获取星级评定结果
		* @return {ratystar} ratystar对象
		* @example
		* $("#testExpObj").ratystar('getStar');
		*/
		getStar : function(){
			getStar = this.element.find('.ratystar-starul').attr('data-starval') ;
			return getStar ;
		},
		/**
		* @description 清除星级评定
		* @return {ratystar} ratystar对象
		* @example
		* $("#testExpObj").ratystar('destroy');
		*/
		destroy : function(){
		}
	});

	$.extend($.fn.ratystar, {
		version: "1.3"
	});

})(jQuery);