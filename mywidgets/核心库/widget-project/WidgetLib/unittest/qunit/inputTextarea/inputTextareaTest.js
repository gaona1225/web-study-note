// inputTextareaTest - desc by gaona at 2012-07-27
$(function(){
	test('every textarea with type of text/password should create some dom attr', function(){
		var tarLen = $('.input_text_default').length ;
		for(var i=0; i<tarLen; i++){
			same($('.input_text_default').hasClass('ui-inputTextarea'),true,'textarea should have the ui-inputTextarea class') ;
		}
	});
	test('control textarea', function(){
		$('#test').focus() ;
		same($('#test').hasClass('ui-inputTextarea-active'),true,'textarea with focus should have the ui-inputTextarea-active class') ;
		$('#test').blur() ;
		same($('#test').hasClass('ui-inputTextarea-active'),false,'textarea with blur should not have the ui-inputTextarea-active class') ;
		$('#test').inputTextarea('disable');
		same($('#test').attr('disabled'),true,'textarea with inputTextarea("disabled") should have the disabled attr') ;
		$('#test').inputTextarea('enable');
		same($('#test').attr('disabled'),false,'textarea with inputTextarea("enable") should not have the disabled attr') ;
		$('#test').inputTextarea('hide');
		same($('#test').css('display'),'none','textarea with inputTextarea("hide") should hide') ;
		$('#test').inputTextarea('show');
		same($('#test').css('display'),'inline-block','textarea with inputTextarea("show") should show') ;
	});
}) ;