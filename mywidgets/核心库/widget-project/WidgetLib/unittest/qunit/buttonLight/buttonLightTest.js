// buttonLightTest - desc by gaona at 2012-07-27
$(function(){
	test('every button should create some dom elems', function(){
		var btnLen = $('.buttonLight').length ;
		for(var i=0; i<btnLen; i++){
			same($('.buttonLight').eq(i).parents('span').length,2,'there are two span tags of every button') ;
			same($('.buttonLight').eq(i).parents('.ui-buttonLight').length,1,'there are one span tags should have the ui-buttonLight class') ;
			same($('.buttonLight').eq(i).parents('.buttonLight-con').length,1,'there are one span tags should have the buttonLight-con class') ;
			same($('.buttonLight').eq(i).siblings('div').length,1,'there are one div tags should have before button') ;
			same($('.buttonLight').eq(i).siblings('div').html(),'','there are one div tags and its text is empty') ;
			same($('.buttonLight').eq(i).siblings('div').hasClass('s')||$('.buttonLight').eq(i).siblings('div').hasClass('ico'),true,'there are one div tags should have before button') ;
		}
	});
	
	test('buttons with data-type="menu" should have <span class="triangle"></span>',function(){
		same($('.buttonLight[data-type="menu"]').siblings('span').length,1,'there are one span tags after the button') ;
		same($('.buttonLight[data-type="menu"]').siblings('span').hasClass('triangle'),true,'there are one span tags should have the triangle class') ;
		same($('.buttonLight[data-type="menu"]').siblings('span').html(),'','there are one span tags and its text is empty') ;
	}) ;
	
	test('buttons with data-width="160"/data-width="standard" and without data-img should have the width+padding+margin of button is 160/62',function(){
		var tarBtn1 = $('.buttonLight[data-width="160"]') ;
		var pdMgVal1 = 16 ;
		same(tarBtn1.width()+pdMgVal1,160,'buttons with data-width="160" and without data-img should have the width+padding+margin of button is 160');
		var tarBtn2 = $('.buttonLight[data-width="standard"]') ;
		var pdMgVal2 = 6 ;
		same(tarBtn2.width()+pdMgVal2,66,'buttons with data-width="standard" and without data-img should have the width of button is 66');
	}) ;
	
	test('buttons with data-img="testico.png" and data-width="standard" should have the width+padding+margin of button is 160 and someAttr of data-img',function(){
		var tarBtn = $('.buttonLight[data-width="standard"]&&[data-img="testico.png"]') ;
		var pdMgVal = 10 + tarBtn.siblings('.ico').width() ;
		same(tarBtn.siblings('div.ico').length,1,'buttons with data-img="testico.png" and data-width="standard" should have one div tags and its class is ico') ;
		same(tarBtn.siblings('div.s').length,0,'buttons with data-img="testico.png" and data-width="standard" should have one div tags and its not a s class') ;
		ok(tarBtn.siblings('div.ico').css('background-image'),'buttons with data-img="testico.png" and data-width="standard" should have one div tags and its have background-image') ;
		same(tarBtn.width()+pdMgVal,66,'buttons with data-img="testico.png" and data-width="standard" should have the width of button is 66') ;
	}) ;
	
	test('buttons with disabled should have the ui-buttonLight-d class', function(){
		same($('.buttonLight:disabled').parents('.ui-buttonLight').hasClass('ui-buttonLight-d'),true,'buttons with disabled should have the ui-buttonLight-d class');
	});
	
	test('control buttons', function(){
		$('#testBtn').buttonLight('disable');
		same($('#testBtn').parents('.ui-buttonLight').hasClass('ui-buttonLight-d'),true,'buttons with buttonLight("disable") should have the ui-buttonLight-d class');
		same($('#testBtn').attr('disabled'),true,'buttons with buttonLight("disable") should have the disabled attr');
		$('#testBtn').buttonLight('enable');
		same($('#testBtn').parents('.ui-buttonLight').hasClass('ui-buttonLight-d'),false,'buttons with buttonLight("enable") should not have the ui-buttonLight-d class');
		same($('#testBtn').attr('disabled'),false,'buttons with buttonLight("enable") should not have the disabled attr');
		$('#testBtn').buttonLight('hide');
		same($('#testBtn').parents('.ui-buttonLight').css('display'),'none','buttons with buttonLight("hide") should hide');
		$('#testBtn').buttonLight('show');
		same($('#testBtn').parents('.ui-buttonLight').css('display'),'inline-block','buttons with buttonLight("hide") should show');
		$('#testBtn').buttonLight('destroy');
		same($('#testBtn').parents('span').length,0,'buttons with buttonLight("destroy") should remove parents');
	});
}) ;