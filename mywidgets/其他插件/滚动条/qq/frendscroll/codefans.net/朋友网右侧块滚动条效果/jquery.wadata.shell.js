
/**
 * Copyright (c) 2007-2012 wadata, Inc. All Rights Reserved.
 * Author Daolin.Shen
 * Date 2012-04-09
 * Download by http://www.codefans.net
 * 依赖：jquery-1.6.4.js
 */
(function($){


	// the Object
	$.rhmShell = function(elm, options) {
		
		this.$elm = $(elm);
		this.opts = options;
		this.init();

	};


	//获取参数
	$.rhmShell.prototype = {

		init: function() {

			this.height = this.opts.height;
			this.width = this.opts.width;
			this.topHeight = this.opts.topHeight;
			this.bottomHeight = this.opts.bottomHeight;
			this.minWidth = this.opts.minWidth;
			this.minHeight = this.opts.minHeight;
			this.barBoxWidth = this.opts.barBoxWidth;
			this.barSpace = this.opts.barSpace;
			this.headAndLinkHeight = this.opts.headAndLinkHeight;
			this.leftWidth = this.opts.leftWidth;

			$(window).bind("resize",$.proxy(this.handleWindowResize, this))
			this.createShell();

		},


		createShell:function(){
		
			this.setScrollShowOrHidden();			
			this.setMainHeight();
			this.setChatScrollHeight();
			this.setChatScrollingHeight();
		},
		





		/*
		获得RHM壳的的高度
		*/
		getShellHeight:function(){
		
			return Math.min($(window).height(),this.minHeight);
			
		},

		setScrollShowOrHidden:function(){

			($(window).width() < this.minWidth) || ($(window).height() < this.minHeight)
			?$("#rhm").css("overflow","scroll"):$("#rhm").css("overflow","hidden")
		},

		/*
		获得中间DIV的高度
		*/
		getMiddleHeight:function(){
		
			return this.getShellHeight()-this.topHeight ;
		},

		/*
		设置mainDIV的高度
		*/
		setMainHeight:function(){
		
			$(".chartBodyUl").css("height",this.getMiddleHeight());
		
		},

		/*
		 设置chatScroll的高度
		 */
		setChatScrollHeight:function(){
			
			
		},

		/*
		 设置chatScrolling的高度
		 */
		setChatScrollingHeight:function(){

			var scrollingHeight = parseInt(this.getMiddleHeight()*2-parseInt($(".user").css("height"))+46);

			$(".chatScrolling").css("height",scrollingHeight);
			
		},


		/*
		自适应事件
		*/
		handleWindowResize:function(){
			this.createShell();
		}
		
	}


	/*
		jQuery Plug
	*/
	$.fn.rhmShell = function(options) {

		if(typeof options == 'undefined'){
			options = {};
		}

		var opts = $.extend({}, $.fn.rhmShell.defaults, options);
		/*
		return this.each(function() {
			new $.rhmShell(this, opts);
		});
		*/

		return new $.rhmShell(this, opts);

	};


	// default settings
	$.fn.rhmShell.defaults = {

		height:0,				//高
		width:0,				//宽
		topHeight:68,			//top的高
		minHeight:500,			//设置最小高度


	};



})(jQuery)



