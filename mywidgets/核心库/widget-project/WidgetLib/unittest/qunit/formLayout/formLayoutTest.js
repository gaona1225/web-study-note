// formLayoutTest - desc by gaona at 2012-08-28
$(function(){
	$('.ui-formLayout').formLayout({
		form_label_pos:'left' ,
		form_layout:3
	});	
	test('with formLayout() should create some dom', function(){
		same($('.ui-formLayout').find('div.ui-formLayoutCon').length,1,'every tarElem with formLayout() should have the ui-formLayoutCon class div children') ;
		same($('#testInput').parents('div.ui-formLayoutValue').length,1,'the testInput id input with formLayout() should have the ui-formLayoutValue class div parents') ;
		same($('#testInput').parents('div.ui-formLayoutItem').length,1,'the testInput id input with formLayout() should have the ui-formLayoutItem class div parents') ;
		same($('#testInput').parents('div.ui-formLayoutItem').find('label.ui-formLayoutLabel').length,1,'the ui-formLayoutItem class div with formLayout() should have the ui-formLayoutLabel class label children') ;
	});	
	
	test('with formLayout() should create same html', function(){
		var labelVal = $('#testInput').attr('form-elem-title')+'：' ;
		var tarElem = $('#testInput').parents('div.ui-formLayoutItem').find('label.ui-formLayoutLabel') ;
		if(tarElem.find('span').length>0){
			var html = tarElem.html() ;
			var tarHtml = html.substring(html.indexOf('</span>')+7) ;
		}else{
			var tarHtml = tarElem.html() ;
		}
		same(tarHtml==labelVal,true,'with formLayout() should create same html') ;
	});	
	
	test('with must-fill="true" should create span dom', function(){
		same($('#testInput[must-fill="true"]').parents('div.ui-formLayoutItem').find('label.ui-formLayoutLabel').find('span').length,1,'with must-fill="true" should create span dom') ;
	});
	
	test('with formLayout({form_label_pos:"left"}) should add ui-formLayoutLabel-left class', function(){
		same($('#testInput').parents('div.ui-formLayoutItem').find('label.ui-formLayoutLabel').hasClass('ui-formLayoutLabel-left'),true,'with formLayout({form_label_pos:"left"}) should add ui-formLayoutLabel-left class') ;
	});
	
	test('with disabled should add the ui-formCambo-disabled class', function(){
		same($('#testInput[disabled]').hasClass('ui-formCambo-disabled'),true,'with disabled should add the ui-formCambo-disabled class') ;
	});
	
	$('#testHide').click(function(){
		setHide('testRemoveInput') ;
		test('with setHide("testRemoveInput") should hide tarElem', function(){
			stop();
			setTimeout(function(){
				same($('#testRemoveInput').parents('div.ui-formLayoutItem').css('display'),'none','with setHide("testRemoveInput") should hide tarElem') ;
				start();
			},300) ;
		});
	}) ;
	
	$('#testShow').click(function(){
		setShow('testRemoveInput') ;
		test('with setShow("testRemoveInput") should hide tarElem', function(){
			stop();
			setTimeout(function(){
				same($('#testRemoveInput').parents('div.ui-formLayoutItem').css('display'),'block','with setShow("testRemoveInput") should show tarElem') ;
				start();
			},300) ;
		});
	}) ;
}) ;