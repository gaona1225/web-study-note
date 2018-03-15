// miniProgressBarTest - desc by gaona at 2012-08-20
$(function(){
	var dVal = 80 ;
	$('#bar').miniProgressBar({dataValue:dVal});
	$('#testInput').miniProgressBar('destroy') ;
	test('with miniProgressBar() should create some dom', function(){
		same($('#bar').parents('b').length,1,'every input with miniProgressBar() should have b parent') ;
		same($('#bar').parents('span').length,1,'every input with miniProgressBar() should have span parent') ;
		same($('#bar').parents('div.ui-mini-progressBar').length,1,'every input with miniProgressBar() should have the class ui-mini-progressBar div parent') ;
		same($('#bar').parents('div.ui-mini-progressBar').siblings('div.ui-mini-progressBar-dataValue').length,1,'every input with miniProgressBar() should havethe class ui-mini-progressBar-dataValue div siblings') ;
	});
	
	test('with miniProgressBar() should set display style', function(){
		same($('#bar').css('display'),'none','every input with miniProgressBar() should set display none') ;
	});
	
	test('with miniProgressBar({dataValue:80}) ) should set same style', function(){
		same($('#bar').parents('div.ui-mini-progressBar').siblings('div.ui-mini-progressBar-dataValue').html(),dVal+'%','every input with miniProgressBar({dataValue:80}) should set the class ui-mini-progressBar-dataValue div html is dVal(dVal is "80")') ;
		var parWid = $('#bar').parents('span').width() ;
		stop();
		setTimeout(function(){
			var dVal = $('#bar').parents('div.ui-mini-progressBar').siblings('div.ui-mini-progressBar-dataValue').html().split('%')[0] ;
			if(!isNaN(dVal)){
				var actWid = parseInt(dVal/100*parWid) ;
			}
			if(isNaN(dVal)||(dVal<0)||(dVal>100)){
				var sameVal = true ;
			}else {
				var tarWid = parseInt($('#bar').parents('b').css('width')) ;
				var sameVal = (tarWid+1==actWid) || (tarWid+2==actWid) || (tarWid==actWid) ;
			}
			same(sameVal,true,'with miniProgressBar() should set the width style') ;
			start();
		}, 300) ;
	});
	
	test('with miniProgressBar("destroy") should remove some dom', function(){
		same($('#testInput').parents('div.ui-mini-progressBar').siblings('div.ui-mini-progressBar-dataValue').length,0,'with miniProgressBar("destroy") should remove the class ui-min-progressBar-dataValue div siblings') ;
		same($('#testInput').parents('b').length,0,'with miniProgressBar("destroy") should remove b parent') ;
		same($('#testInput').parents('span').length,0,'with miniProgressBar("destroy") should remove span parent') ;
		same($('#testInput').parents('div.ui-mini-progressBar').length,0,'with miniProgressBar("destroy") should remove the class ui-progressBar div parent') ;
		same($('#testInput').css('display'),'block','every input with miniProgressBar() should set display block') ;
	});
}) ;