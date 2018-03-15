// minProgressBarTest - desc by gaona at 2012-08-17
$(function(){
	var dVal = '80' ;
	$('.minProgressBar').minProgressBar({dataValue:dVal});
	test('with minProgressBar() should create some dom', function(){
		same($('#bar').siblings('div.ui-min-progressBar-dataValue').length,1,'every input with minProgressBar() should havethe class ui-min-progressBar-dataValue div siblings') ;
		same($('#bar').parents('b').length,1,'every input with minProgressBar() should have b parent') ;
		same($('#bar').parents('span').length,1,'every input with minProgressBar() should have span parent') ;
		same($('#bar').parents('div.ui-min-progressBar').length,1,'every input with minProgressBar() should have the class ui-min-progressBar div parent') ;
	});
	
	test('with minProgressBar() should set display style', function(){
		same($('#bar').css('display'),'none','every input with minProgressBar() should set display none') ;
	});
	
	test('with minProgressBar({dataValue:80}) ) should set same style', function(){
		same($('#bar').siblings('div.ui-min-progressBar-dataValue').html(),dVal,'every input with minProgressBar({dataValue:80}) should set the class ui-min-progressBar-dataValue div html is dVal(dVal is "80")') ;
	});
	
	test('with data-color="purple" should add the purpleColor class', function(){
		same($('#bar[data-color="purple"]').parents('b').hasClass('purpleColor'),true,'with data-color="purple" should add the purpleColor class') ;
	});
	
	$('#testInput').minProgressBar('destroy') ;
	test('with minProgressBar("destroy") should remove some dom', function(){
		same($('#testInput').siblings('div.ui-min-progressBar-dataValue').length,0,'with minProgressBar("destroy") should remove the class ui-min-progressBar-dataValue div siblings') ;
		same($('#testInput').parents('b').length,0,'with minProgressBar("destroy") should remove b parent') ;
		same($('#testInput').parents('span').length,0,'with minProgressBar("destroy") should remove span parent') ;
		same($('#testInput').parents('div.ui-min-progressBar').length,0,'with minProgressBar("destroy") should remove the class ui-min-progressBar div parent') ;
		same($('#testInput').css('display'),'block','every input with minProgressBar() should set display block') ;
	});
}) ;