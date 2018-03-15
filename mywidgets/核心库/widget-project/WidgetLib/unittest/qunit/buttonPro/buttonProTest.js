// buttonProTest - desc by gaona at 2012-07-26
$(function(){
	test('every button should create some dom elems', function(){
		var btnLen = $('.buttonPro').length ;
		for(var i=0; i<btnLen; i++){
			same($('.buttonPro').eq(i).parents('span').length,2,'there are two span tags of every button') ;
			same($('.buttonPro').eq(i).parents('.ui-buttonPro').length,1,'there are one span tags should have the ui-buttonPro class') ;
			same($('.buttonPro').eq(i).parents('.buttonPro-con').length,1,'there are one span tags should have the buttonPro-con class') ;
			same($('.buttonPro').eq(i).siblings('div').length,1,'there are one div tags should have before button') ;
			same($('.buttonPro').eq(i).siblings('div').html(),'','there are one div tags and its text is empty') ;
			same($('.buttonPro').eq(i).siblings('div').hasClass('s')||$('.buttonPro').eq(i).siblings('div').hasClass('ico'),true,'there are one div tags should have before button') ;
		}
	});
	
	test('buttons with data-type="menu" should have <span class="triangle"></span>',function(){
		same($('.buttonPro[data-type="menu"]').siblings('span').length,1,'there are one span tags after the button') ;
		same($('.buttonPro[data-type="menu"]').siblings('span').hasClass('triangle'),true,'there are one span tags should have the triangle class') ;
		same($('.buttonPro[data-type="menu"]').siblings('span').html(),'','there are one span tags and its text is empty') ;
	}) ;
	
	test('buttons with data-width="160"/data-width="standard" and without data-img should have the width+padding+margin of button is 160/62',function(){
		var tarBtn1 = $('.buttonPro[data-width="160"]') ;
		var pdMgVal1 = 16 ;
		same(tarBtn1.width()+pdMgVal1,160,'buttons with data-width="160" and without data-img should have the width+padding+margin of button is 160');
		var tarBtn2 = $('.buttonPro[data-width="standard"]') ;
		var pdMgVal2 = 6 ;
		same(tarBtn2.width()+pdMgVal2,66,'buttons with data-width="standard" and without data-img should have the width of button is 66');
	}) ;
	
	test('buttons with data-img="testico.png" and data-width="standard" should have the width+padding+margin of button is 160 and someAttr of data-img',function(){
		var tarBtn = $('.buttonPro[data-width="standard"]&&[data-img="testico.png"]') ;
		var pdMgVal = 10 + tarBtn.siblings('.ico').width() ;
		same(tarBtn.siblings('div.ico').length,1,'buttons with data-img="testico.png" and data-width="standard" should have one div tags and its class is ico') ;
		same(tarBtn.siblings('div.s').length,0,'buttons with data-img="testico.png" and data-width="standard" should have one div tags and its not a s class') ;
		ok(tarBtn.siblings('div.ico').css('background-image'),'buttons with data-img="testico.png" and data-width="standard" should have one div tags and its have background-image') ;
		same(tarBtn.width()+pdMgVal,66,'buttons with data-img="testico.png" and data-width="standard" should have the width of button is 66') ;
	}) ;
	test('buttons with disabled should have the ui-buttonPro-d class', function(){
		same($('.buttonPro:disabled').parents('.ui-buttonPro').hasClass('ui-buttonPro-d'),true,'buttons with disabled should have the ui-buttonPro-d class');
	});
	test('control buttons', function(){
		$('#testBtn').buttonPro('disable');
		same($('#testBtn').parents('.ui-buttonPro').hasClass('ui-buttonPro-d'),true,'buttons with buttonPro("disable") should have the ui-buttonPro-d class');
		same($('#testBtn').attr('disabled'),true,'buttons with buttonPro("disable") should have the disabled attr');
		$('#testBtn').buttonPro('enable');
		same($('#testBtn').parents('.ui-buttonPro').hasClass('ui-buttonPro-d'),false,'buttons with buttonPro("enable") should not have the ui-buttonPro-d class');
		same($('#testBtn').attr('disabled'),false,'buttons with buttonPro("enable") should not have the disabled attr');
		$('#testBtn').buttonPro('hide');
		same($('#testBtn').parents('.ui-buttonPro').css('display'),'none','buttons with buttonPro("hide") should hide');
		$('#testBtn').buttonPro('show');
		same($('#testBtn').parents('.ui-buttonPro').css('display'),'inline-block','buttons with buttonPro("hide") should show');
		$('#testBtn').buttonPro('destroy');
		same($('#testBtn').parents('span').length,0,'buttons with buttonPro("destroy") should remove parents');
	});
}) ;