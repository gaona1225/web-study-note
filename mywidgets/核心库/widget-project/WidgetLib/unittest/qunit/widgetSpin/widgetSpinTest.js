// widgetSpinTest - desc by gaona at 2012-07-30
$(function(){
	$('#spin').spin({max:100,min: 0,interval:1});
	$('.widgetSpin').widgetSpin({width:'360px'});
	test('every elem with the class widgetSpin should have to create some doms', function(){
		var tarLen = $('.widgetSpin').length ;
		for(var i=0; i<tarLen; i++){
			same($('.widgetSpin').eq(i).parents('div.ui-widget-slider').length,1,'there are should have the ui-widget-slider class') ;
			same($('.widgetSpin').eq(i).parents('div.ui-widget-slider').prevAll('img').length,1,'there are should have the img') ;
			same($('.widgetSpin').eq(i).prevAll('div').length,1,'there are should have one siblings div tags before') ;
			same($('.widgetSpin').eq(i).prevAll('div').find('span').html(),'','there are one span tags and its text is empty') ;
			same($('.widgetSpin').eq(i).prevAll('b.handle').length,1,'there are should have one siblings b tags before and it has the handle class') ;
			same($('.widgetSpin').eq(i).prevAll('table').length,1,'there are should have one siblings table tags before') ;
			same($('.widgetSpin').eq(i).prevAll('table').find('td').length,parseInt($('.widgetSpin').eq(i).attr('value')),'there are should have ten siblings td tags') ;
		}
	});
	test('every elem with the class widgetSpin should have hide', function(){
		var tarLen = $('.widgetSpin').length ;
		for(var i=0; i<tarLen; i++){
			same($('.widgetSpin').eq(i).css('display'),'none','every elem widgetSpin() should have hide') ;
		}
	});
	$('#testBtn').click(function(){
		var _val = parseInt($('#spin').val()) ;
		var _left = parseInt($('#test').prevAll('b.handle').position().left) + 2 ;
		var _width = parseInt($('#test').parents('div.ui-widget-slider').width()) - 16 ;
		var _value = parseInt((_left/_width)*100) ;
		if(_val != 0){
			var _isEqual = (_val == _value) ;
		}else{
			var _isEqual = true ;
		}
		test('the value of input#th equal left/width*100', function(){
			same(_isEqual,true,'the value of input#spin equal left/width*100') ;
		}) ;
	}) ;
	test('controls input.widgetSpin', function(){
		$('#test').widgetSpin('hide');
		same($('#test').parents('div.ui-widget-slider').css('display'),'none','input.widgetSpin with widgetSpin("hide") should hide') ;
		$('#test').widgetSpin('show');
		same($('#test').parents('div.ui-widget-slider').css('display'),'block','input.widgetSpin with widgetSpin("show") should show') ;
	});
}) ;