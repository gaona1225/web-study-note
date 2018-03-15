// ajaxloadTest - desc by gaona at 2012-08-17
$(function(){
	var con = '加载中,请稍后......' ;
	var gifsize = 'midSize' ;
	$('.exampleObj').ajaxload({
		content : con ,
		gifSize : gifsize
	});
	
	test('with ajaxload() should create some dom', function(){
		var tarElem = $('.exampleObj') ;
		var tarLen = tarElem.length ;
		for(var i=0; i<tarLen; i++){
			same(tarElem.eq(i).parents('div.ajaxCon').length,1,'every div with ajaxload() should have the ajaxCon class div parent') ;
			same(tarElem.eq(i).parents('div.ajaxMain').length,1,'every div with ajaxload() should have the ajaxMain class div parents') ;
			same(tarElem.eq(i).parents('div.ajaxCon').siblings('div.ajaxMask').length,1,'every the ajaxCon class div parent should have the ajaxMask class div siblings') ;
			same(tarElem.eq(i).parents('div.ajaxCon').siblings('div.ajaxMask').find('div.ajaxContent').length,1,'every the ajaxMask class div should have the ajaxContent class div children') ;
			same(tarElem.eq(i).parents('div.ajaxCon').siblings('div.ajaxMask').find('p.ajaxPic').length,1,'every the ajaxMask class div should have the ajaxPic class p children') ;
			same(tarElem.eq(i).parents('div.ajaxCon').siblings('div.ajaxMask').find('p.ajaxMsg').length,1,'every the ajaxMask class div should have the ajaxMsg class p children') ;
		} ;
	});
	
	test('with ajaxload() should set data-dom attr', function(){
		var tarElem = $('.exampleObj') ;
		var tarLen = tarElem.length ;
		for(var i=0; i<tarLen; i++){
			same(tarElem.eq(i).attr('data-dom'),'true','every div with ajaxload() should have attr of data-dom = "true"') ;
		} ;
	});
	
	test('with ajaxload({content:"加载中,请稍后......"}) should set same msg', function(){
		var tarElem = $('p.ajaxMsg') ;
		var tarLen = tarElem.length ;
		for(var i=0; i<tarLen; i++){
			same(tarElem.eq(i).html(),con,'with ajaxload({content:con}) should set same msg,con is "加载中,请稍后......"') ;
		} ;
	});
	
	test('with ajaxload({gifSize:"midSize"}) should have the midSize class', function(){
		var tarElem = $('p.ajaxPic') ;
		var tarLen = tarElem.length ;
		for(var i=0; i<tarLen; i++){
			same(tarElem.eq(i).hasClass(gifsize),true,'with ajaxload({gifSize:"midSize"}) should have the midSize class,gifsize is "midSize"') ;
		} ;
	});
	
	test('with ajaxload() should set top/left style', function(){
		var tarElem = $('.exampleObj') ;
		var tarLen = tarElem.length ;
		for(var i=0; i<tarLen; i++){
			same(parseInt(tarElem.eq(i).parents('div.ajaxMain').find('div.ajaxMask').css('left')) == parseInt(tarElem.eq(i).offset().left),true,'every div with ajaxload() the class ajaxMask div and the class exampleObj div should have same left coordinate') ;
			same(parseInt(tarElem.eq(i).parents('div.ajaxMain').find('div.ajaxMask').css('top')) == parseInt(tarElem.eq(i).offset().top),true,'every div with ajaxload() the class ajaxMask div and the class exampleObj div should have same top coordinate') ;
		} ;
	});
	
	$('#showDiv').click(function(){
		$('#testExpObj').ajaxload('show') ;
		test('with ajaxload("show") should show the class ajaxMask div', function(){
			same($('#testExpObj').parents('div.ajaxMain').find('div.ajaxMask').css('display'),'block','with ajaxload("show") should show the class ajaxMask div') ;
		});
	}) ;
	
	$('#hideDiv').click(function(){
		$('#testExpObj').ajaxload('hide') ;
		test('with ajaxload("hide") should hide the class ajaxMask div', function(){
			same($('#testExpObj').parents('div.ajaxMain').find('div.ajaxMask').css('display'),'none','with ajaxload("hide") should hide the class ajaxMask div') ;
		});
	}) ;
	
	$('#destoryDiv').click(function(){
		$('#testExpObj').ajaxload('destroy') ;
		test('with ajaxload("destroy") should remove some dom', function(){
			same($('#testExpObj').parents('div.ajaxMain').find('div.ajaxMask').length,0,'with ajaxload("destroy") should remove the class ajaxMask div') ;
			same($('#testExpObj').parents('div.ajaxCon').length,0,'with ajaxload("destroy") should remove the class ajaxCon div') ;
			same($('#testExpObj').parents('div.ajaxMain').length,0,'with ajaxload("destroy") should remove the class ajaxMain div') ;
		});
	}) ;
}) ;