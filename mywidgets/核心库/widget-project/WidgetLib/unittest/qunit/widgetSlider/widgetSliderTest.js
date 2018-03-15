// widgetSliderTest - desc by gaona at 2012-07-30
$(function(){
	$(".widgetSlider").widgetSlider({width:360});
	test('every elem with the class widgetSlider should have to create some doms', function(){
		var tarLen = $('.widgetSlider').length ;
		for(var i=0; i<tarLen; i++){
			same($('.widgetSlider').eq(i).parents('div.ui-widget-slider').length,1,'there are should have the ui-widget-slider class') ;
			same($('.widgetSlider').eq(i).prevAll('div').length,1,'there are should have one siblings div tags before') ;
			same($('.widgetSlider').eq(i).prevAll('div').find('span').html(),'','there are one span tags and its text is empty') ;
			same($('.widgetSlider').eq(i).prevAll('b.handle').length,1,'there are should have one siblings b tags before and it has the handle class') ;
			same($('.widgetSlider').eq(i).prevAll('table').length,1,'there are should have one siblings table tags before') ;
			same($('.widgetSlider').eq(i).prevAll('table').find('td').length,parseInt($('.widgetSlider').eq(i).attr('value')),'there are should have ten siblings td tags') ;
		}
	});
	test('every elem with the class widgetSlider should have hide', function(){
		var tarLen = $('.widgetSlider').length ;
		for(var i=0; i<tarLen; i++){
			same($('.widgetSlider').eq(i).css('display'),'none','every elem widgetSlider() should have hide') ;
		}
	});
	$('#testBtn').click(function(){
		var _val = parseInt($('#th').val()) ;
		var _left = parseInt($('#test').prevAll('b.handle').position().left) ;
		var _width = parseInt($('#test').parents('div.ui-widget-slider').width()) - 16 ;
		var _value = parseInt((_left/_width)*100) ;
		if(!isNaN(_val)){
			var _isEqual =((_val == (_value))) || (_val == (_value + 1)) || (_val == (_value - 1)) ;
		}else{
			var _isEqual = true ;
		}
		test('the value of input#th equal left/width*100', function(){
			same(_isEqual,true,'the value of input#th equal left/width*100') ;
		}) ;
	}) ;
	test('controls input.widgetSlider', function(){
		$('#test').widgetSlider('disable');
		same($('#test').prevAll('b.handle').attr('aria-disabled'),'true','input.widgetSlider with widgetSlider("disable") should have the aria-disabled attr') ;
		equal($(".widgetSlider").siblings("div").data("events"),undefined,"click event has lifted the binding of the target element");
		$('#test').widgetSlider('enable');
		same($('#test').prevAll('b.handle').attr('aria-disabled'),'false','input.widgetSlider with widgetSlider("disable") should not have the aria-disabled attr') ;
		equal(!$(".widgetSlider").siblings("div").data("events")['click'],false,"click event has binded to the target element");
		$('#test').widgetSlider('hide');
		same($('#test').parents('div.ui-widget-slider').css('display'),'none','input.widgetSlider with widgetSlider("hide") should hide') ;
		$('#test').widgetSlider('show');
		same($('#test').parents('div.ui-widget-slider').css('display'),'block','input.widgetSlider with widgetSlider("show") should show') ;
	});
}) ;