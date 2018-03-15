// inputSelectTest - desc by gaona at 2012-07-27
$(function(){
	test('every select with type of text/password should create some dom attr', function(){
		var tarLen = $('select').length ;
		for(var i=0; i<tarLen; i++){
			same($('select').hasClass('ui-inputSelect'),true,'select should have the ui-inputSelect class') ;
		}
	});
	test('control select', function(){
		$('#test').focus() ;
		same($('#test').hasClass('ui-inputSelect-active'),true,'select with focus should have the ui-inputSelect-active class') ;
		$('#test').blur() ;
		same($('#test').hasClass('ui-inputSelect-active'),false,'select with blur should not have the ui-inputSelect-active class') ;
		$('#test').inputSelect('disable');
		same($('#test').attr('disabled'),true,'select with inputSelect("disabled") should have the disabled attr') ;
		$('#test').inputSelect('enable');
		same($('#test').attr('disabled'),false,'select with inputSelect("enable") should not have the disabled attr') ;
		$('#test').inputSelect('hide');
		same($('#test').css('display'),'none','select with inputSelect("hide") should hide') ;
		$('#test').inputSelect('show');
		same($('#test').css('display'),'inline-block','select with inputSelect("show") should show') ;
	});
}) ;