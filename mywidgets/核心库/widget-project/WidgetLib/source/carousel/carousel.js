/*
 *作    者: 高娜
 *版    本: 1.3
 *完成时间: 2012-10-16
 *描    述: carousel
 *关联文件: jQuery.js|jquery-ui.js
 */
(function($,undefined){
    /**
	* @class 图片旋转木马展示
    * @name carousel
    * @description 图片旋转木马效果
	* @version 1.3
    */
	$.widget('ui.carousel',
	/** @lends carousel.prototype */
	{		
		options:{
			/**  
			* @name carousel#wrapWid
			* @param {Number}  数字类型
			* @description 旋转图片展示区域外层宽度(设置宽度需要同时兼顾图片大小、目标相对于容器中心的环绕圆周位置)
			* @default {Number} 900
			* @example
			* $('.exampleObj').carousel({
			*		wrapWid : 900
			*  });
			*/
			wrapWid : 900 ,
			/**  
			* @name carousel#wrapHei
			* @param {Number}  数字类型
			* @description 旋转图片展示区域外层高度
			* @default {Number} 480
			* @example
			* $('.exampleObj').carousel({
			*		wrapHei : 480
			*  });
			*/
			wrapHei : 480 ,
			/**  
			* @name carousel#imgWid
			* @param {Number}  数字类型
			* @description 旋转图片的宽度（每个旋转图片的宽度一致）
			* @default {Number} 350
			* @example
			* $('.exampleObj').carousel({
			*		imgWid : 350
			*  });
			*/
			imgWid : 350 ,
			/**  
			* @name carousel#imgHei
			* @param {Number}  数字类型
			* @description 旋转图片的高度（每个旋转图片的高度一致）
			* @default {Number} 214
			* @example
			* $('.exampleObj').carousel({
			*		imgHei : 214
			*  });
			*/
			imgHei : 214 ,
			/**  
			* @name carousel#reflHeight
			* @param {Number}  数字类型
			* @description 设置图片的倒影高度
			* @default {Number} 0
			* @example
			* $('.exampleObj').carousel({
			*		reflHeight : 0
			*  });
			*/
			reflHeight : 0 ,
			/**  
			* @name carousel#reflOpacity
			* @param {Number}  数字类型
			* @description 指定倒影的透明度
			* @default {Number} 0.5
			* @example
			* $('.exampleObj').carousel({
			*		reflOpacity : 0.5
			*  });
			*/
			reflOpacity : 0.5,
			/**  
			* @name carousel#reflGap
			* @param {Number}  数字类型
			* @description 图片和倒影之间的垂直间隔
			* @default {Number} 0
			* @example
			* $('.exampleObj').carousel({
			*		reflGap : 0
			*  });
			*/
			reflGap : 0,
			/**  
			* @name carousel#minScale
			* @param {Number}  数字类型
			* @description 应用到最远项的最小刻度，正面项的刻度是1
			* @default {Number} 0.5
			* @example
			* $('.exampleObj').carousel({
			*		minScale : 0.5
			*  });
			*/
			minScale : 0.5,
			/**  
			* @name carousel#xPos
			* @param {Number}  数字类型
			* @description 相对于容器中心的环绕圆周水平位置
			* @default {Number} 0
			* @example
			* $('.exampleObj').carousel({
			*		xPos : 0
			*  });
			*/
			xPos : 0,
			/**  
			* @name carousel#yPos
			* @param {Number}  数字类型
			* @description 相对于容器中心的环绕圆周垂直位置
			* @default {Number} 0
			* @example
			* $('.exampleObj').carousel({
			*		yPos : 0
			*  });
			*/
			yPos : 0,
			/**  
			* @name carousel#xRadius
			* @param {Number}  数字类型
			* @description 水平图片环绕的半径
			* @default {Number} 0
			* @example
			* $('.exampleObj').carousel({
			*		xRadius : 0
			*  });
			*/
			xRadius : 0,
			/**  
			* @name carousel#yRadius
			* @param {Number}  数字类型
			* @description 垂直图片环绕的半径,你可以修改这个值来调整环绕的倾斜程度。
			* @default {Number} 0
			* @example
			* $('.exampleObj').carousel({
			*		yRadius : 0
			*  });
			*/
			yRadius : 0,
			/**  
			* @name carousel#altBox
			* @param {String}  字符串类型
			* @description 当鼠标悬浮在某个图片上时，显示img元素的alt属性值的标签元素
			* @default {String} null
			* @example
			* $('.exampleObj').carousel({
			*		altBox : null
			*  });
			*/
			altBox : null,
			/**  
			* @name carousel#titleBox
			* @param {String}  字符串类型
			* @description 当鼠标悬浮在某个图片上时，显示img元素的title属性值的标签元素
			* @default {String} null
			* @example
			* $('.exampleObj').carousel({
			*		titleBox : null
			*  });
			*/
			titleBox : null,
			/**  
			* @name carousel#buttonLeft
			* @param {Object}  对象类型
			* @description 向左旋转按钮对象(如果需要按钮控制，必须指定到相应的目标对象,否则失去点击按钮触发旋转功能)
			* @default {Object} null
			* @example
			* $('.exampleObj').carousel({
			*		buttonLeft : null
			*  });
			*/
			buttonLeft : null,
			/**  
			* @name carousel#buttonRight
			* @param {Object}  对象类型
			* @description 向右旋转按钮对象(如果需要按钮控制，必须指定到相应的目标对象,否则失去点击按钮触发旋转功能)
			* @default {Object} null
			* @example
			* $('.exampleObj').carousel({
			*		buttonRight : null
			*  });
			*/
			buttonRight : null,
			/**  
			* @name carousel#autoRotate
			* @param {String}  字符串类型
			* @description 设置自动旋转方向，设置为'left'，则自动向左转动。设置为'right'，则自动向右转动，设置为'no'（默认），则不自动转动。
			* @default {String} 'no'
			* @example
			* $('.exampleObj').carousel({
			*		autoRotate : 'no'
			*  });
			*/
			autoRotate : 'no',
			/**  
			* @name carousel#autoRotateDelay
			* @param {Number}  数字类型
			* @description 自动转动的间隔时间
			* @default {Number} 1500
			* @example
			* $('.exampleObj').carousel({
			*		autoRotateDelay : 1500
			*  });
			*/
			autoRotateDelay : 1500,
			/**  
			* @name carousel#speed
			* @param {Number}  数字类型
			* @description 调整转动速度，设置为0不转动，设置为1则没有转动效果，立即切换到最终效果。
			* @default {Number} 0.2
			* @example
			* $('.exampleObj').carousel({
			*		speed : 0.2
			*  });
			*/
			speed : 0.2,
			/**  
			* @name carousel#mouseWheel
			* @param {Boolean}  布尔类型
			* @description 是否启动滚轮操作控制旋转
			* @default {Boolean} false
			* @example
			* $('.exampleObj').carousel({
			*		mouseWheel : false
			*  });
			*/
			mouseWheel : false,
			/**  
			* @name carousel#bringToFront
			* @param {Boolean}  布尔类型
			* @description 是否启用点击某张图片，该图片转动到图片正面
			* @default {Boolean} false
			* @example
			* $('.exampleObj').carousel({
			*		bringToFront : false
			*  });
			*/
			bringToFront : false,
			 /**  
			* @name carousel#imgClick 
			* @param {Fn} 函数 
			* @description 点击滚动图片时触发自定义点击事件
			* @default {Fn} function(){}
			* @example
			* $('.exampleObj').carousel({
			*		imgClick: function(){alert("click")}
			*    });
			*/
 			 imgClick : function(){} 
		},
		_create:function(){
			var _self = this.element ;
			var o = this.options ;
			_self.width(o.wrapWid+'px').height(o.wrapHei+'px') ;
			_self.find('img').width(o.imgWid+'px').height(o.imgHei+'px') ;
			_self.data(_self,new Controller(_self,$(_self.find('img'),_self),o)) ;			
		},
		_init:function(){
			var _self = this.element ;
			var o = this.options ;
			_self.find('img').click(function(){
				o.imgClick() ;
			}) ;
		},
		/**
		* @description 清除图片旋转木马效果
		* @return {carousel} carousel对象
		* @example
		* $("#testExpObj").carousel('destroy');
		*/
		destroy : function(){
			var _self = this.element ;
			var o = this.options ;
			if(_self.find('#carouselWrap')){
				var _html = $('#carouselWrap').html() ;
				_self.html(_html) ;
				if(_self.find('canvas')){
					$('canvas').remove() ;
				}
				var _imgList  = _self.find('img') ;
				var len = _imgList.length ;
				for(var i=0; i<len; i++){
					_imgList.attr('style','').width(o.imgWid).height(o.imgHei) ;
				}
			}
		}
	});
	// START Reflection object.
	// Creates a reflection for underneath an image.
	// IE uses an image with IE specific filter properties, other browsers use the Canvas tag.	
	// The position and size of the reflection gets updated by updateAll() in Controller.
	function Reflection(img, reflHeight, opacity){
		var	reflection, cntx, imageWidth = img.width, imageHeight = img.width, gradient, parent ;	
		parent = $(img.parentNode) ;
		this.element = reflection = parent.append("<canvas class='reflection' style='position:absolute'/>").find(':last')[0] ;
        if (!reflection.getContext && $.browser.msie){
			this.element = reflection = parent.append("<img class='reflection' style='position:absolute'/>").find(':last')[0] ;					
			reflection.src = img.src ;			
			reflection.style.filter = "flipv progid:DXImageTransform.Microsoft.Alpha(opacity=" + (opacity * 100) + ", style=1, finishOpacity=0, startx=0, starty=0, finishx=0, finishy=" + (reflHeight / imageHeight * 100) + ")" ;				
        }else{		
			cntx = reflection.getContext("2d") ;
			try{
				$(reflection).attr({width: imageWidth, height: reflHeight}) ;
				cntx.save() ;
				cntx.translate(0, imageHeight-1) ;
				cntx.scale(1, -1) ;				
				cntx.drawImage(img, 0, 0, imageWidth, imageHeight) ;				
				cntx.restore() ;
				cntx.globalCompositeOperation = "destination-out" ;
				gradient = cntx.createLinearGradient(0, 0, 0, reflHeight) ;
				gradient.addColorStop(0,"rgba(255, 255, 255," + (1 - opacity) + ")") ;
				gradient.addColorStop(1,"rgba(255, 255, 255, 1.0)") ;
				cntx.fillStyle = gradient ;
				cntx.fillRect(0, 0, imageWidth, reflHeight) ;				
			}catch(e){			
				return ;
			}		
		}
		// Store a copy of the alt and title attrs into the reflection
		$(reflection).attr({'alt': $(img).attr('alt'),title: $(img).attr('title')}) ;				
	}	//END Reflection object

	// START Item object.
	// A wrapper object for items within the carousel.
	var	Item = function(imgIn,options){
		this.orgWidth = imgIn.width ;			
		this.orgHeight = imgIn.height ;		
		this.image = imgIn ;
		this.reflection = null ;					
		this.alt = imgIn.alt ;
		this.title = imgIn.title ;
		this.imageOK = false ;		
		this.options = options ;
		this.imageOK = true ;
		if(this.options.reflHeight > 0){													
			this.reflection = new Reflection(this.image, this.options.reflHeight, this.options.reflOpacity) ;					
		}
		$(this.image).css('position','absolute') ;	// Bizarre. This seems to reset image width to 0 on webkit!					
	};// END Item object
	
	// Controller object.
	// This handles moving all the items, dealing with mouse clicks etc.
	var Controller = function(container, images, options){
		var	items = [], funcSin = Math.sin, funcCos = Math.cos, ctx=this ;
		this.controlTimer = 0 ;
		this.stopped = false ;
		//this.imagesLoaded = 0;
		this.container = container ;
		this.xRadius = options.xRadius ;
		this.yRadius = options.yRadius ;
		this.showFrontTextTimer = 0 ;
		this.autoRotateTimer = 0 ;
		
		if(options.xRadius === 0){
			this.xRadius = ($(container).width()/2.3) ;
		}
		if(options.yRadius === 0){
			this.yRadius = ($(container).height()/6) ;
		}
		
		this.xCentre = options.xPos ;
		this.yCentre = options.yPos ;
		this.frontIndex = 0 ;	// Index of the item at the front
		
		// Start with the first item at the front.
		this.rotation = this.destRotation = Math.PI/2 ;
		this.timeDelay = 1000/options.FPS ;
		
		// Turn on the infoBox
		if(options.altBox !== null){
			$(options.altBox).css('display','block') ;
			$(options.titleBox).css('display','block') ;
		}
		// Turn on relative position for container to allow absolutely positioned elements
		// within it to work.
		$(container).css({position:'relative',overflow:'hidden'}) ;
		
		$(options.buttonLeft).css('display','inline') ;
		$(options.buttonRight).css('display','inline') ;
		
		// Setup the buttons.
		$(options.buttonLeft).bind('mouseup',this,function(event){
			event.data.rotate(-1) ;
			return false ;
		}) ;
		$(options.buttonRight).bind('mouseup',this,function(event){
			event.data.rotate(1) ;
			return false ;
		}) ;
		if('ontouchstart' in document.documentElement){
			$(container).bind('touchstart',this,function(event){		
				clearInterval(event.data.autoRotateTimer) ;// Stop auto rotation if mouse over.
				var text = $(event.target).attr('alt') ;
				if(text !== undefined && text !== null){
					clearTimeout(event.data.showFrontTextTimer) ;
					$(options.altBox).html($(event.target).attr('alt')) ;
					$(options.titleBox).html($(event.target).attr('title')) ;
					if(options.bringToFront && event.type == 'click'){
						var idx = $(event.target).data('itemIndex') ;
						var frontIndex = event.data.frontIndex ;
						var diff = (idx - frontIndex)%images.length ;
						if(Math.abs(diff) > images.length/2){
							diff += (diff > 0 ? -images.length : images.length) ;
						}
						event.data.rotate(-diff) ;
					}
				}
			}) ;
			$(container).bind('touchend',this,function(event){
				var	context = event.data ;				
				clearTimeout(context.showFrontTextTimer) ;				
				context.showFrontTextTimer = setTimeout(function(){
					context.showFrontText() ;
				},1000);
				context.autoRotate();	// Start auto rotation.
			});
		}else{
			if(options.mouseWheel){
				$(container).bind('mousewheel',this,function(event,delta){
					event.data.rotate(delta) ;
					return false ;
				}) ;
			}
			$(container).bind('mouseover click',this,function(event){
				clearInterval(event.data.autoRotateTimer) ;// Stop auto rotation if mouse over.
				var text = $(event.target).attr('alt') ;
				if(text !== undefined && text !== null){
					clearTimeout(event.data.showFrontTextTimer) ;
					$(options.altBox).html($(event.target).attr('alt')) ;
					$(options.titleBox).html($(event.target).attr('title')) ;
					if(options.bringToFront && event.type == 'click'){
						var idx = $(event.target).data('itemIndex') ;
						var frontIndex = event.data.frontIndex ;
						var diff = (idx - frontIndex)%images.length ;
						if(Math.abs(diff) > images.length/2){
							diff += (diff > 0 ? -images.length : images.length) ;
						}
						event.data.rotate(-diff) ;
					}				
				}
			}) ;
			$(container).bind('mouseout',this,function(event){
				var	context = event.data ;				
				clearTimeout(context.showFrontTextTimer) ;				
				context.showFrontTextTimer = setTimeout(function(){
					context.showFrontText() ;
				},1000);
				context.autoRotate();	// Start auto rotation.
			});
		}
		$(container).bind('mousedown',this,function(event){				
			event.data.container.focus() ;
			return false ;
		});
		container.onselectstart = function(){ 
			return false ; 
		} ;	
		this.innerWrapper = $(container).wrapInner('<div style="position:absolute;width:100%;height:100%;" id="carouselWrap"/>').children()[0] ;
		
		// Shows the text from the front most item.
		this.showFrontText = function(){
			if(this.frontIndex < 0){
				this.frontIndex = images.length - 1;
			}	
			if(items[this.frontIndex] === undefined){return ;}	// Images might not have loaded yet.
			$(options.titleBox).html($(items[this.frontIndex].image).attr('title')) ;
			$(options.altBox).html($(items[this.frontIndex].image).attr('alt')) ;				
		};
		this.go = function(){	
			if(this.controlTimer !== 0){
				return ;
			}
			var	context = this ;
			this.controlTimer = setTimeout(function(){
				context.updateAll() ;
			},this.timeDelay) ;					
		};
		
		this.stop = function(){
			clearTimeout(this.controlTimer) ;
			this.controlTimer = 0 ;				
		};
		
		// Starts the rotation of the carousel. Direction is the number (+-) of carousel items to rotate by.
		this.rotate = function(direction){
			this.frontIndex -= direction ;
			this.frontIndex %= items.length ;			 			
			this.destRotation += (Math.PI / items.length) * (2*direction) ;
			this.showFrontText();
			this.go();			
		};
		this.autoRotate = function(){
			if(options.autoRotate !== 'no'){
				var	dir = (options.autoRotate === 'right') ? 1 : -1 ;
				this.autoRotateTimer = setInterval(function(){
					ctx.rotate(dir) ; 
				},options.autoRotateDelay) ;
			}
		};
		
		// This is the main loop function that moves everything.
		this.updateAll = function(){	
			var	minScale = options.minScale ;	// This is the smallest scale applied to the furthest item.
			var smallRange = (1-minScale) * 0.5 ;
			var	w,h,x,y,scale,item,sinVal ;
						
			var	change = (this.destRotation - this.rotation) ;				
			var	absChange = Math.abs(change) ;
	
			this.rotation += change * options.speed ;
			if (absChange < 0.001){ 
				this.rotation = this.destRotation ; 
			}			
			var	itemsLen = items.length ;
			var	spacing = (Math.PI / itemsLen) * 2 ; 
			//var wrapStyle = null;
			var	radians = this.rotation ;
			var	isMSIE = $.browser.msie ;
		
			// Turn off display. 
			this.innerWrapper.style.display = 'none' ;				
			var	style ;
			var	px = 'px', reflHeight ;	
			var context = this ;
			for(var i = 0; i<itemsLen ;i++){
				item = items[i] ;								
				sinVal = funcSin(radians) ;				
				scale = ((sinVal+1) * smallRange) + minScale ;				
				x = this.xCentre + (((funcCos(radians) * this.xRadius) - (item.orgWidth*0.5)) * scale) ;
				y = this.yCentre + (((sinVal * this.yRadius)) * scale) ;		
				if(item.imageOK){
					var	img = item.image ;
					w = img.width = item.orgWidth * scale ;					
					h = img.height = item.orgHeight * scale ;
					img.style.left = x + px ;
					img.style.top = y + px ;
					img.style.zIndex = "" + (scale * 100)>>0 ;	// >>0 = Math.foor(). Firefox doesn't like fractional decimals in z-index.
					if(item.reflection !== null){																										
						reflHeight = options.reflHeight * scale ;						
						style = item.reflection.element.style ;
						style.left = x + px ;
						style.top = y + h + options.reflGap * scale + px ;
						style.width = w + px ;								
						if(isMSIE){				
							style.filter.finishy = (reflHeight / h * 100) ;				
						}else{				
							style.height = reflHeight + px ;															
						}																													
					}					
				}
				radians += spacing ;
			}
			// Turn display back on.					
			this.innerWrapper.style.display = 'block' ;
			// If we have a preceptable change in rotation then loop again next frame.
			if(absChange >= 0.001){				
				this.controlTimer = setTimeout(function(){
					context.updateAll() ;
				},this.timeDelay) ;		
			}else{
				// Otherwise just stop completely.				
				this.stop() ;
			}
		}; // END updateAll
		// Create an Item object for each image	
		//func = function(){return;ctx.updateAll();} ;

		// Check if images have loaded. We need valid widths and heights for the reflections.
		this.checkImagesLoaded = function(){
			var	i ;
			for(i=0;i<images.length;i++){
				if((images[i].width === undefined) || ( (images[i].complete !== undefined) && (!images[i].complete))){
					return ;					
				}				
			}
			for(i=0;i<images.length;i++){	
				 items.push(new Item(images[i], options)) ;	
				 $(images[i]).data('itemIndex',i) ;
			}
			// If all images have valid widths and heights, we can stop checking.			
			clearInterval(this.tt) ;
			this.showFrontText() ;
			this.autoRotate() ;	
			this.updateAll() ;			
		};

		this.tt = setInterval(function(){
			ctx.checkImagesLoaded() ;
		},50);
	} ;
	
	//mousewheel widget start
	var types = ['DOMMouseScroll', 'mousewheel'] ;
	$.event.special.mousewheel = {
		setup : function(){
			if(this.addEventListener){
				for(var i=types.length; i;){
					this.addEventListener(types[--i], handler, false) ;
				}
			}else{
				this.onmousewheel = handler ;
			}
		},		
		teardown : function(){
			if (this.removeEventListener){
				for(var i=types.length; i;){
					this.removeEventListener(types[--i], handler, false) ;
				}
			}else{
				this.onmousewheel = null ;
			}
		}
	};	
	$.fn.extend({
		mousewheel : function(fn){
			return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel") ;
		},		
		unmousewheel: function(fn){
			return this.unbind("mousewheel", fn) ;
		}
	});	
	function handler(event){
		var args = [].slice.call( arguments, 1 ), delta = 0, returnValue = true ;		
		event = $.event.fix(event || window.event) ;
		event.type = "mousewheel" ;
		
		if (event.wheelDelta){delta = event.wheelDelta/120 ;}
		if (event.detail){delta = -event.detail/3 ;}		
		// Add events and delta to the front of the arguments
		args.unshift(event, delta) ;	
		return $.event.handle.apply(this, args);
	}
	//mousewheel widget end

	$.extend($.fn.carousel, {
		version: "1.3"
	});
	
})(jQuery);