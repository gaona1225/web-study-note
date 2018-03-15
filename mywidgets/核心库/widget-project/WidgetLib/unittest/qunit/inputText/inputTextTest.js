// inputTextTest - desc by gaona at 2012-07-27
$(function(){
	test('every input with type of text/password should create some dom attr', function(){
		var tarLen = $('.input_text_default').length ;
		for(var i=0; i<tarLen; i++){
			same($('.input_text_default').hasClass('ui-inputText'),true,'input should have the ui-inputText class') ;
		}
	});
	test('control input', function(){
		$('#test').focus() ;
		same($('#test').hasClass('ui-inputText-active'),true,'input with focus should have the ui-inputText-active class') ;
		$('#test').blur() ;
		same($('#test').hasClass('ui-inputText-active'),false,'input with blur should not have the ui-inputText-active class') ;
		$('#test').inputText('disable');
		same($('#test').attr('disabled'),true,'input with inputText("disabled") should have the disabled attr') ;
		$('#test').inputText('enable');
		same($('#test').attr('disabled'),false,'input with inputText("enable") should not have the disabled attr') ;
		$('#test').inputText('hide');
		same($('#test').css('display'),'none','input with inputText("hide") should hide') ;
		$('#test').inputText('show');
		same($('#test').css('display'),'inline-block','input with inputText("show") should show') ;
	});
}) ;