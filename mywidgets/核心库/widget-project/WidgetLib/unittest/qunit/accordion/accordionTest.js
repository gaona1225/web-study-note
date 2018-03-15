// accordionTest - desc by gaona at 2012-08-28
$(function(){
	$('.exampleObj').accordion();
	test('with accordion() should add some class', function(){
		var tarElem = $('.exampleObj') ;
		var tarLen = tarElem.length ;
		for(var i=0; i<tarLen; i++){
			same(tarElem.eq(i).hasClass('accor-wrap'),true,'every tarElem with accordion() should have the accor-wrap class') ;
			same(tarElem.eq(i).find('li').hasClass('accor-elem'),true,'every the children of tarElem with accordion() should have the accor-elem class') ;
		}
	});
}) ;