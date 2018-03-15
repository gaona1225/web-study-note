// buttonActiveTest - desc by gaona at 2012-07-25
$(function(){
	test('every button should have to create two span', function(){
		var btnLen = $('.buttonActive').length ;
		for(var i=0; i<btnLen; i++){
			same($('.buttonActive').eq(i).parents('span').length,2,'there are two span tags of every button') ;
			same($('.buttonActive').eq(i).parents('.ui-buttonActive').length,1,'there are one span tags should have the ui-buttonActive class') ;
		}
	});
	test('buttons with disabled should have the ui-buttonActive-d class', function(){
		ok($('.buttonActive:disabled').parents('.ui-buttonActive').hasClass('ui-buttonActive-d'),'buttons with disabled should have the ui-buttonActive-d class');
	});
	test('buttons with data-width="160"/data-width="standard" should have the width+padding+margin of button is 160/62', function(){
		var tarBtn1 = $('.buttonActive[data-width="160"]') ;
		var pdMgVal1 = parseInt(tarBtn1.css('margin-left')) + parseInt(tarBtn1.css('margin-right')) + parseInt(tarBtn1.css('padding-left')) + parseInt(tarBtn1.css('padding-right')) + parseInt(tarBtn1.css('border-left-width')) + parseInt(tarBtn1.css('border-right-width')) ;
		same(tarBtn1.width()+pdMgVal1,160,'buttons with data-width="160" should have the width+padding+margin of button is 160');
		var tarBtn2 = $('.buttonActive[data-width="standard"]') ;
		var pdMgVal2 = parseInt(tarBtn2.css('margin-left')) + parseInt(tarBtn2.css('margin-right')) + parseInt(tarBtn2.css('padding-left')) + parseInt(tarBtn2.css('padding-right')) + parseInt(tarBtn2.css('border-left-width')) + parseInt(tarBtn2.css('border-right-width')) ;
		same(tarBtn2.width()+pdMgVal2,62,'buttons with data-width="standard" should have the width+padding+margin of button is 62');
	});
	test('control buttons', function(){
		$('#testBtn').buttonActive('disable');
		same($('#testBtn').parents('.ui-buttonActive').hasClass('ui-buttonActive-d'),true,'buttons with buttonActive("disable") should have the ui-buttonActive-d class');
		same($('#testBtn').attr('disabled'),true,'buttons with buttonActive("disable") should have the disabled attr');
		$('#testBtn').buttonActive('enable');
		same($('#testBtn').parents('.ui-buttonActive').hasClass('ui-buttonActive-d'),false,'buttons with buttonActive("enable") should not have the ui-buttonActive-d class');
		same($('#testBtn').attr('disabled'),false,'buttons with buttonActive("enable") should not have the disabled attr');
		$('#testBtn').buttonActive('hide');
		same($('#testBtn').parents('.ui-buttonActive').css('display'),'none','buttons with buttonActive("hide") should hide');
		$('#testBtn').buttonActive('show');
		same($('#testBtn').parents('.ui-buttonActive').css('display'),'inline-block','buttons with buttonActive("hide") should show');
		$('#testBtn').buttonActive('destroy');
		same($('#testBtn').parents('span').length,0,'buttons with buttonActive("destroy") should remove parents');
	});
}) ;