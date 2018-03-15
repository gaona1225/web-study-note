$(function(){
	setPos() ;
	$(window).resize(function(){
		setPos() ;
	}) ;
	/*---定位方法开始---*/
	function setPos(){
		var _wid = parseInt($(document).width()) ;
		var _selfWid = parseInt($('.desktopCen').width()) ;
		var _left = (_wid - _selfWid)/2;
		if (_left == 0) {
            $('.desktopCen').css({
                'left': '42%'
            });
        } else {
            $('.desktopCen').css({
                'left': _left
            });
        }
	}
	/*---定位方法结束---*/
	var deplay = 200 ;
	/*---显示动画开始---*/
	$('.center5').fadeIn(deplay) ;
	var aniFun = [
		function(){
			$('a.center1').show('fast').animate({
				'margin-top' : 0 + 'px' ,
				height : 114+'px'
			},deplay,aniBF) ;	
		} ,
		function(){
			$('a.center2').show('fast').animate({
				width : 114+'px'
			},deplay,aniBF) ;	
		} ,
		function(){
			$('a.center3').show('fast').animate({
				height : 114+'px'
			},deplay,aniBF) ;	
		} ,
		function(){
			$('a.center4').show('fast').animate({
				width : 114+'px'
			},deplay,aniBF) ;	
		}  ,
		function(){
			$('.divSide1').show('fast').animate({
				'margin-left' : 0 + 'px' ,
				width : '50%'
			},deplay,aniBF) ;	
		} ,
		function(){
			$('.divSide1 h3').show('fast').animate({
				'margin-left' : 0 + 'px' ,
				width : '100%'
			},deplay,aniBF) ;	
		} ,
		function(){
			$('.divSide2').show('fast').animate({
				width : '50%'
			},deplay,aniBF) ;	
		} ,
		function(){
			$('.divSide2 h3').show('fast').animate({
				width : '100%'
			},deplay,aniBF) ;	
		} ,
		function(){
			$('.divSide5').fadeIn('fast') ;
			$(document).dequeue("myAnimation") ;
		} ,
		function(){
			$('.divSide6').fadeIn('fast') ;
			$(document).dequeue("myAnimation") ;
		} ,
		function(){
			$('.divSide3').show('fast').animate({
				'margin-right' : 0 + 'px' ,
				width : '50%'
			},deplay,aniBF) ;	
		} ,
		function(){
			$('.divSide3 h3').show('fast').animate({
				width : '100%'
			},deplay,aniBF) ;	
		} ,
		function(){
			$('.divSide4').show('fast').animate({
				'margin-left' : 0 + 'px' ,
				width : '50%'
			},deplay,aniBF) ;	
		} ,
		function(){
			$('.divSide4 h3').show('fast').animate({
				width : '100%'
			},deplay,aniBF) ;	
		}
	] ;
	var aniBF=function() {
		$(document).dequeue("myAnimation");
	}
	$(document).queue("myAnimation",aniFun);
	aniBF();
	/*---显示动画结束---*/
}) ;