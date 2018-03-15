//方法一
/*(function($){
	$.fn.hilight = function(options){
		var defaults = {
			foreground:'blue' ,	
			background:'yellow'
		} ;
		var opts = $.extend(defaults,options) ;
		$(this).css('color',opts.foreground) ;
	} ;
})(jQuery);*/

//方法二
/*(function($){
	$.fn.hilight = function(options){
		var opts = $.extend({},$.fn.hilight.defaults,options) ;
		$.fn.hilight.defaults = {
			foreground:'red',
			background:'yellow'
		} ;
		var defaults = {
			bgTest:'aa'
		} ;
		//alert($.fn.hilight.defaults.foreground) ;
		$(this).css('color',$.fn.hilight.defaults.foreground) ;
	} ;
})(jQuery);*/

//方法三
/*(function($){
	$.fn.hilight = function(){
		return this.each(function(){
			var $this = $(this) ;
			var markup = $this.html() ;
			markup = $.fn.hilight.format(markup) ;
			$this.html(markup) ;
		}) ;
	} ;
	$.fn.hilight.format = function(text){
		//return '<strong>' + text + '</strong>' ;
		return '<u>' + text + '</u>' ;
	} ;
})(jQuery) ;*/

//方法四
/*(function($){
	$.fn.hilight = function(options){
		debug(this) ;
	} ;
	function debug($obj){
		alert($obj.size()) ;
		if(window.console && window.console.log){
			window.console.log('hilight selection count:'+$obj.size()) ;
		}
	}
})(jQuery);*/
//完整篇
(function($){
	$.fn.hilight = function(options){
		debug(this) ;
		var opts = $.extend({},$.fn.hilight.defaults,options) ;
		return this.each(function(){
			var $this = $(this) ;
			var o = $.meta ? $.extend({},opts,$this.data()) : opts ;
			$this.css({
				backgroundColor:o.background ,
				color : o.foreground
			}) ;
			var markup = $this.html() ;
			markup = $.fn.hilight.format(markup) ;
			$this.html(markup) ;
		}) ;
	} ;
	function debug($obj){
		if(window.console && window.console.log){
			window.console.log('hilight selection counts:'+$obj.size()) ;
		}
	}
	$.fn.hilight.format = function(txt){
		return '<strong>' + txt + '</strong>' ;
	}
	$.fn.hilight.defaults = {
		foreground:'red',
		background:'yellow'
	} ;
})(jQuery);