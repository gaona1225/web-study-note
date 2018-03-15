(function($,undefined){
	$.widget('ui.autoslide',
	{		
		options:{},
		_create:function(){},
		_init:function(){
			var _self = this.element ;
			var slideElem = _self.children('div.slideElem') ;
			var autoLen = slideElem.length ;
			slideElem.width(slideElem.parents('div.metroElem').width()) ;
			var autoElemWid = slideElem.width() ;
			var direcRig = true ;
			var count = 0 ;
			_self.width(autoElemWid * autoLen) ;
			setInterval(autoSlide,4000) ;
			function autoSlide(){
				var autoParLeft = parseInt(_self.css('margin-left')) ;
				if(direcRig){
					if(count < autoLen-1){
						_self.stop().animate({
							'margin-left' : autoParLeft - autoElemWid
						},300) ;
						count ++ ;
					}
				}else{
					if(count>0){
						_self.stop().animate({
							'margin-left' : autoParLeft + autoElemWid
						},300) ;
						count -- ;
					}
				}
				if(count == 0){
					direcRig = true ;
				}else if(count == autoLen-1){
					direcRig = false ;
				}
			}
		}
	});
})(jQuery);