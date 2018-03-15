// bubbleTest - desc by gaona at 2012-08-16
$(function(){
	var xLeft = '100' ;
	var yLeft = '100' ;
	var con = '这里是需要显示的信息' ;
	var dec = 'rightTop' ;
	$(document).bubble("bubble",true,{
		x:xLeft,
		y:yLeft,
		content:con,
		hand:dec
	});
	test('with bubble() should create some dom', function(){
		same($('div.c6ui-bubble').length,1,'with bubble() should have the c6ui-bubble class div elem') ;
		same($('table.c6ui-bubble-layout').length,1,'with bubble() should have the c6ui-bubble-layout class table elem') ;
		same($('div.corner').length,1,'with bubble() should have the corner class div elem') ;
		same($('table.c6ui-bubble-layout').find('tr').length,3,'the c6ui-bubble-layout class table should have 3 tr children') ;
		var tarElem = $('table.c6ui-bubble-layout').find('tr') ;
		var tarLen = tarElem.length ;
		for(var i=0; i<tarLen; i++){
			same(tarElem.eq(i).find('td').length,3,'the children tr of the c6ui-bubble-layout class table should have 3 td children') ;
		} ;
	});
	
	test('with bubble({x:100,y:100}) should set left/top style', function(){
		same($('div.c6ui-bubble').css('left'),xLeft+'px','with bubble({x:100,y:100}) should set left is 100px') ;
		same($('div.c6ui-bubble').css('top'),yLeft+'px','with bubble({x:100,y:100}) should set top is 100px') ;
	});
	
	test('with bubble({content:"这里是需要显示的信息"}) should set text', function(){
		same($('table.c6ui-bubble-layout').find('td.con').html(),con,'with bubble({content:"这里是需要显示的信息"}) should set text') ;
	});
	
	test('with bubble({hand:"rightTop"}) should add the rightTop class', function(){
		same($('div.corner').hasClass(dec),true,'with bubble({hand:"rightTop"}) should add the rightTop class') ;
	});
}) ;