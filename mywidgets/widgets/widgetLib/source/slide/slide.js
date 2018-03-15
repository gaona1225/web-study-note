/*
 *作    者: 高娜
 *版    本: 1.0
 *完成时间: 2013-12-30
 *描    述: slide
 *关联文件: jQuery.js|jquery-ui.js
 */
(function($,undefined){
    /**
	* @class 轮播组件
    * @name slide
    * @description 轮播组件
	* @version 1.3
    */
	$.widget('ui.slide',
	/** @lends slide.prototype */
	{		
		options:{
			/**  
			* @name slide#width
			* @param {Number} 数字类型
			* @description 包裹展示区域的宽度
			* @default {Number} 800
			* @example
			* $('.exampleObj').slide({
			*		width : 800
			*  });
			*/
			width : 800 ,
			/**  
			* @name slide#height
			* @param {Number} 数字类型
			* @description 包裹展示区域的高度
			* @default {Number} 176
			* @example
			* $('.exampleObj').slide({
			*		height : 176
			*  });
			*/
			height : 176 ,
			/**  
			* @name slide#effect
			* @param {String} 字符串类型
			* @description 轮播效果
			* @default {String} 'fade'(淡入淡出),'slide-y'(y方向上滑动),'slide-x'(x方向上滑动)
			* @example
			* $('.exampleObj').slide({
			*		effect : 'slide-x'
			*  });
			*/
			effect : 'slide-x' ,
			/**  
			* @name slide#speed
			* @param {Number} 数字类型
			* @description 手动切换动画延续时间
			* @default {Number} 200
			* @example
			* $('.exampleObj').slide({
			*		speed : 200
			*  });
			*/
			speed : 400 ,
			/**  
			* @name slide#autoSpeed
			* @param {Number} 数字类型
			* @description 自动切换动画延续时间
			* @default {Number} 1000
			* @example
			* $('.exampleObj').slide({
			*		autoSpeed : 1000
			*  });
			*/
			autoSpeed : 1000 ,
			/**  
			* @name slide#autoSlide
			* @param {Boolean} 布尔类型
			* @description 是否自动轮播
			* @default {Boolean} false
			* @example
			* $('.exampleObj').slide({
			*		autoSlide : false
			*  });
			*/
			autoSlide : true ,
			/**  
			* @name slide#showNum
			* @param {Boolean} 布尔类型
			* @description 是否显示切换焦点
			* @default {Boolean} false
			* @example
			* $('.exampleObj').slide({
			*		showNum : true
			*  });
			*/
			showNum : true ,
			/**  
			* @name slide#numPos
			* @param {String} 字符串类型
			* @description 切换焦点左下角显示还是右下角显示'left'/'right'(仅在切换焦点显示的情况下配置)
			* @default {String} 'left'
			* @example
			* $('.exampleObj').slide({
			*		numPos : 'left'
			*  });
			*/
			numPos : 'left' ,
			/**  
			* @name slide#showBtn
			* @param {Boolean} 布尔类型
			* @description 是否显示切换按钮
			* @default {Boolean} true
			* @example
			* $('.exampleObj').slide({
			*		showBtn : false
			*  });
			*/
			showBtn : true ,
			/**  
			* @name slide#fn  
			* @param {Fn} 函数 
			* @description 预留自定义方法
			* @default {Fn} function(){}
			* @example
			* $('.exampleObj').slide({
			*		fn : function(){}
			*    });
			*/
 			 fn : function(){} ,
			 /**  
			* @name slide#numClick  
			* @param {Fn} 函数 
			* @description 点击切换焦点预留自定义方法
			* @default {Fn} function(){}
			* @example
			* $('.exampleObj').slide({
			*		numClick : function(){}
			*    });
			*/
 			 numClick : function(){} ,
			 /**  
			* @name slide#btnPrevClick  
			* @param {Fn} 函数 
			* @description 点击向前切换按钮预留自定义方法
			* @default {Fn} function(){}
			* @example
			* $('.exampleObj').slide({
			*		btnPrevClick : function(){}
			*    });
			*/
 			 btnPrevClick : function(){} ,
			  /**  
			* @name slide#btnNextClick  
			* @param {Fn} 函数 
			* @description 点击向后切换按钮预留自定义方法
			* @default {Fn} function(){}
			* @example
			* $('.exampleObj').slide({
			*		btnNextClick : function(){}
			*    });
			*/
 			 btnNextClick : function(){}
		},
		_create:function(){
			var _self = this.element ;
			var op = this.options ;
			_self.wrap('<div class="slideWrap"><div class="slide"></div></div>') ;
			$('.slideWrap').width(op.width).height(op.height) ;
			var $btnHtml = '<a href="javascript:;" class="btn_prev"></a><a href="javascript:;" class="btn_next"></a>' ;
			$('.slide').append($btnHtml) ;
			var $numHtml = '<div class="num_con"><div class="num_inner num_'+op.numPos+'"><a href="javascript:;" class="num_on"></a><a href="javascript:;"></a><a href="javascript:;"></a><a href="javascript:;" ></a><a href="javascript:;"></a></div></div>' ;
			if(op.showNum){ //显示切换焦点
				$('.slideWrap').append($numHtml) ;
			}
			op.fn() ;
		},
		_init:function(){
			var _self = this.element ;
			var op = this.options ;			
			var isClick = true ;//限制用户在短时间内连续操作的标记。如果连续点击两次默认一次操作，不做多余触发。
			var dir ; //标记向前(-1)切换向(1)后切换
			var fadeCount = 0 ; //fadeCount是淡入淡出的标记
			var $slideElem = _self.find('.slideElem') ;
			var slideLen = $slideElem.length ;
			var slideWid = $slideElem.width() ;
			var slideHei = $slideElem.height() ;
			var setInt ; //设置计时器
			/*初始化元素坐标*/
			switch(op.effect){
				case 'fade' : initPos(0,0) ; break ;
				case 'slide-x' : initPos(slideWid,0) ; break ;
				case 'slide-y' : $('.btn_prev').addClass('btn_up');$('.btn_next').addClass('btn_down'); initPos(0,slideHei) ; break ;
			}
			function initPos(posX,posY){
				$slideElem.each(function(i){
					if(op.effect == 'fade'){
						$slideElem.not(':first').css('display','none') ;
					}
					$slideElem.eq(i).css({
						'left':posX*i + 'px' ,
						'top':posY*i + 'px' 
					}) ;
					$slideElem.eq(i).attr({
						'data-left':posX*i ,
						'data-top':posY*i
					}) ;
				}) ;
			}
			if(op.showBtn){
				$('.slideWrap').hover(function(){
					$('.btn_prev,.btn_next').fadeIn() ;
				},function(){
					$('.btn_prev,.btn_next').fadeOut() ;
				}) ;
			}else{				
				$('.btn_prev,.btn_next').css('visibility','hidden') ;				
			}
			$('.slideWrap').hover(function(){
				if(op.autoSlide){
					clearInterval(setInt) ;
				}
			},function(){
				if(op.autoSlide){
					setInt = setInterval(autoPlay,op.autoSpeed) ;
				}
			}) ;
			$('.btn_prev').click(function(){ //向前切换
				switch(op.effect){
					case 'fade' : slideFade(-1) ; break ;
					case 'slide-x' : slideX(-1) ; break ;
					case 'slide-y' : slideY(-1) ; break ;
					default : slideX(-1) ;
				}
				op.btnPrevClick() ;
			}) ;
			$('.btn_next').click(function(){
				switch(op.effect){
					case 'fade' : slideFade(1) ; break ;
					case 'slide-x' : slideX(1) ; break ;
					case 'slide-y' : slideY(1) ; break ;
					default : slideX(1) ;
				}
				op.btnNextClick() ;
			}) ;
			//自动切换
			if(op.autoSlide){
				setInt = setInterval(autoPlay,op.autoSpeed) ;
			}
			function autoPlay(){
				$('.btn_next').click() ;
			}
			//点击切换焦点切换
			$('.num_inner a').click(function(){
				var lastIndex = parseInt($('a.num_on').index()) ;
				var nowIndex = parseInt($(this).index()) ;
				if(lastIndex>nowIndex){
					for(var i= lastIndex-nowIndex - 1; i>=0;i--){
						$('.btn_prev').click() ;
					}
				}else if(lastIndex<nowIndex){
					for(var i = nowIndex-lastIndex - 1; i>=0;i--){
						$('.btn_next').click() ;
					}
				}	
				op.numClick() ;
			}) ;
			//淡入淡出切换方法体
			function slideFade(dir){
				if(dir>0){
					if(fadeCount == slideLen - 1){
						fadeCount = 0 ;
					}else{
						fadeCount += dir ;
					}
				}else{
					if(fadeCount == 0){
						fadeCount = slideLen - 1 ;
					}else{
						fadeCount += dir ;
					}
				}
				$slideElem.eq(fadeCount).fadeIn(op.speed).siblings('li').fadeOut(op.speed) ;
				$('.num_inner a').eq(fadeCount).addClass('num_on').siblings('a').removeClass('num_on') ;
			}
			//x轴方向滑动方法体
			function slideX(dir){
				var maxLeft = (slideLen-1) * slideWid ;
				for(var i = slideLen - 1; i>=0; i--){
					if(parseInt($slideElem.eq(i).attr('data-left')) == (-dir*maxLeft)){
						$slideElem.eq(i).css('left',dir*slideWid) ;
						$slideElem.eq(i).attr('data-left',dir*slideWid) ;
					}						
					var newLeft = parseInt($slideElem.eq(i).attr('data-left')) - dir*slideWid ;
					$slideElem.eq(i).attr('data-left',newLeft) ;
					$slideElem.eq(i).stop().animate({
						'left':newLeft
					},op.speed) ;
					setCur() ;
				}
			}
			//y轴方向滑动方法体
			function slideY(dir){
				var maxTop = (slideLen-1) * slideHei ;
				for(var i = slideLen - 1; i>=0; i--){
					if(parseInt($slideElem.eq(i).attr('data-top')) == (-dir*maxTop)){
						$slideElem.eq(i).css('top',dir*slideHei) ;
						$slideElem.eq(i).attr('data-top',dir*slideHei) ;
					}						
					var newTop = parseInt($slideElem.eq(i).attr('data-top')) - dir*slideHei ;
					$slideElem.eq(i).attr('data-top',newTop) ;
					$slideElem.eq(i).stop().animate({
						'top':newTop
					},op.speed) ;
					setCur() ;
				}
			}
			function setCur(){
				for(var i = slideLen-1; i>=0; i--){
					if(parseInt($slideElem.eq(i).attr('data-left')) == 0 && parseInt($slideElem.eq(i).attr('data-top')) == 0){
						$('.num_inner a').eq(i).addClass('num_on') ;
					}else{
						$('.num_inner a').eq(i).removeClass('num_on') ;
					}
				}
			}
		},
		/**
		* @description 清楚轮播组件
		* @return {slide} slide对象
		* @example
		* $("#testExpObj").slide('destroy');
		*/
		destroy : function(){
			var _self = this.element ;
			if(_self.parents('div.slideWrap').length>0){
				_self.unwrap().unwrap() ;
				_self.nextAll('.num_con').remove() ;
				$('.btn_prev,.btn_next').remove() ;
				_self.find('.slideElem').removeAttr('data-left').removeAttr('data-top').removeAttr('style') ;
			}
		}
	});
	$.extend($.fn.slide, {
		version: "1.0"
	});
})(jQuery);