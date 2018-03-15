//滚轮交互
$(function(){
	/*$('body').niceScroll({
		touchbehavior:false,
		cursorcolor:"#0000FF",
		cursoropacitymax:0.6,
		cursorwidth:8
	});*/
	
	/*part1 animate*/
	//滚轮触发动画
	var initTop = 0;
	$(window).scroll(function(e){
		var $contentElem = $('.content1-bg') ;
		var _scrT = parseInt($(window).scrollTop()) ;
		var _dir ;
		if(initTop>_scrT){
			_dir = 1 ;
		}else{
			_dir = -1 ;
		}
		initTop = _scrT ;
		console.log(_scrT) ;
		if(_scrT<=1000){
			$contentElem.each(function(i){
				var _top = parseInt($contentElem.eq(i).css('top')) ;
				if(i<1){
					$contentElem.eq(i).stop().animate({
						'top':(_top + parseInt(_dir*100) + 'px')
					},200) ;
				}else{
					$contentElem.eq(i).stop().animate({
						'top':(_top + parseInt(_dir*(i)*50) + 'px')
					},200*i) ;
				}			
			}) ;
		}else if(_scrT>=1400 && _scrT<2600){
			//part3 Anim call
			part3Anim(_dir,_scrT) ;
		}else if(_scrT>=2600 &&_scrT<3200){
			//part4 Anim call
			part4Anim(_dir) ;
		}else if(_scrT>=3200 && _scrT<4200){
			//part5 Anim call
			part5Anim(_dir) ;
		}else if(_scrT>=4200 && _scrT<5200){
			//part6 Anim call
			part6Anim(_dir) ;
		}else if(_scrT>=5200 && _scrT<=6000){
			//part7 Anim call
			part7Anim(_dir) ;			
		}
	}) ;
	//鼠标左右滑动触发动画
	//part1mouseAni() ;
	function part1mouseAni(){
		var $contentElem = $('.content1-bg') ;
		var _dir,_initX ;
		$contentElem.mouseover(function(e){
			_initX = event.clientX ;	
		}) ;
		$contentElem.mouseleave(function(e){
			$contentElem.each(function(i){
				$contentElem.eq(i).stop().animate({
					'margin-left':'-1000px'
				},200) ;	
			}) ;
			dir = 0 ;	
		}) ;
		$contentElem.mousemove(function(e){
			var _newX = event.clientX ;
			if(_initX<_newX){
				_dir = 1 ;
			}else if(_initX>_newX){
				_dir = -1 ;
			}
			$contentElem.each(function(i){
				var _left = parseInt($contentElem.eq(i).css('margin-left')) ;
				$contentElem.eq(i).stop().animate({
					'margin-left':(_left + parseInt(_dir*20) + 'px')
				},200) ;	
			}) ;
		}) ;
	}
		
	/*part2 animate*/
	part2Anim() ;
	var _count = 0 ;
	function part2Anim(){
		var $fadeElem = $('.content2-bg') ;
		var _len = $fadeElem.length ;
		var _setInt = setInterval(autoPlay,3000) ;
		function autoPlay(){
			for(var i=0; i<_len; i++){
				if(i == _count){
					$fadeElem.eq(i).fadeIn() ;
				}else{
					$fadeElem.eq(i).fadeOut() ;
				}
			}
			if(_count < _len - 1){
				_count ++ ;
			}else{
				_count = 0 ;
			}
		}	
		/*$('.part2').hover(function(){
			clearInterval(_setInt) ;
		},function(){
			_setInt = setInterval(autoPlay,1000) ;
		}) ;*/		
	}
	
	/*part3 animate*/
	function part3Anim(_dir,_scrT){
		if(_dir<0){
			_newRight = '-200px' ;
		}else{
			_newRight = '-1200px' ;
		}
		if(_scrT>=1400 && _scrT<2000){
			$('.soldier3-1').stop().animate({
				'right':_newRight
			},600) ;
			$('.soldier3-1').css('opacity','1').siblings('.soldier').css('opacity','0') ;
		}else if(_scrT>=2000 && _scrT<2200){
			$('.soldier3-2').css('opacity','1').siblings('.soldier').css('opacity','0') ;
		}else if(_scrT>=2200 && _scrT<2400){
			$('.soldier3-3').css('opacity','1').siblings('.soldier').css('opacity','0') ;
		}else if(_scrT>=2400 && _scrT<2600){
			$('.soldier3-4').css('opacity','1').siblings('.soldier').css('opacity','0') ;
		}
	}
	
	/*part4 animate*/
	function part4Anim(_dir){
		if(_dir<0){
			$('.missile img').stop().animate({
				'width':'346px' ,
				'height':'343px'
			},500) ;
			$('.missile').addClass('missileAnim') ;
			$('.missile').stop().animate({
				'top':'462px' ,
				'left':'1860px'
			},500,function(){
				$('.stone').stop().animate({
					'margin-left':'456px'
				},300) ;
			}) ;
		}else{
			$('.stone').stop().animate({
				'margin-left':'1250px'
			},300,function(){
				$('.missile').stop().animate({
					'top':'-400px' ,
					'left':'150px'
				},500) ;
				$('.missile img').stop().animate({
					'width':'130px' ,
					'height':'127px'
				},500) ;
			}) ;
		}
	}
	
	/*part5 animate*/
	function part5Anim(_dir){
		if(_dir<0){
			$('.home').stop().animate({
				'top':'158px' ,
				'height':'470px'
			},600) ;
		}else{
			$('.home').stop().animate({
				'top':'516px' ,
				'height':'116px'
			},600) ;
		}
	}
	
	/*part6 animate*/
	function part6Anim(_dir){
		if(_dir<0){
			$('.head').stop().animate({
				'top':'-920px'
			},1200) ;
		}else{
			$('.head').stop().animate({
				'top':'1000px'
			},1200) ;
		}
	}
	
	/*part7 animate*/
	function part7Anim(_dir){
		if(_dir<0){
			$('.gs1').stop().animate({
				'top':'80px',
				'left':'-420px'
			},600) ;
			$('.gs2').stop().animate({
				'top':'370px',
				'left':'480px'
			},600) ;
			$('.gs3').stop().animate({
				'top':'622px',
				'left':'-32px'
			},600) ;
		}else{
			$('.gs1').stop().animate({
				'top':'200px',
				'left':'-600px'
			},600) ;
			$('.gs2').stop().animate({
				'top':'450px',
				'left':'600px'
			},600) ;
			$('.gs3').stop().animate({
				'top':'-350px',
				'left':'900px'
			},600) ;
		}
	}
}) ;