$(function(){		
		$('.mainMetro .metroBack').css('opacity','1');
		$('.mainMetro').quickFlip();
		
		for ( var i = 0; i < $.quickFlip.wrappers.length; i++ ) {
			var thisOne = $.quickFlip.wrappers[i];		
			$( thisOne.wrapper ).click(function(ev) {
				var $target = $(ev.target);
				if($target.parents('div.mainMetro').length>0){
					$target = $target.parents('div.mainMetro');
				}
				$target.quickFlipper();					
			});
		}		
}) ;