// scrollBarTest - desc by gaona at 2012-08-27
$(function(){
	var scroWid = 7 ;
	$('.ui-scrollBar').scrollBar({scroll_width:scroWid});	
	test('with scrollBar() should create some dom', function(){
		var tarElem = $('.ui-scrollBar') ;
		var tarLen = tarElem.length ;
		for(var i=0; i<tarLen; i++){
			same(tarElem.eq(i).parents('div.ui-scrollBarDiv').length,1,'every tarElem with scrollBar() should have the ui-scrollBarDiv class div parent') ;
			same(tarElem.eq(i).siblings('div.ui-scroll').length,1,'every tarElem with scrollBar() should have the ui-scroll class div siblings') ;
			same(tarElem.eq(i).siblings('div.ui-scroll').find('div.ui-scrollSlide').length,1,'the ui-scroll class div with scrollBar() should have the ui-scrollSlide class div children') ;
		}
	});
	test('with scrollBar() should set date-dom="true"', function(){
		var tarElem = $('.ui-scrollBar') ;
		var tarLen = tarElem.length ;
		for(var i=0; i<tarLen; i++){
			same(tarElem.eq(i).attr('data-dom'),'true','every tarElem with scrollBar() should set date-dom="true"') ;
		}
	});
	test('with scrollBar({scroll_width:scroWid}) should set width style', function(){
		var tarElem = $('.ui-scrollBar') ;
		var tarLen = tarElem.length ;
		for(var i=0; i<tarLen; i++){
			var scrElem = tarElem.eq(i).siblings('div.ui-scroll').find('div.ui-scrollSlide') ;
			var tarWid = parseInt(scrElem.width()) + parseInt(scrElem.css('border-left-width')) + parseInt(scrElem.css('border-right-width')) ;
			same(tarWid,scroWid,'every div.ui-scrollSlide with scrollBar({scroll_width:scroWid}) should set width style') ;
		}
	});
	$('#clearBtn').click(function(){
		$('#testUL').scrollBar('destory') ;
		test('with scrollBar("destroy") should remove some dom', function(){
			stop();
			setTimeout(function(){
				same($('#testUL').parents('div.ui-scrollBarDiv').length,0,'every tarElem with scrollBar("destroy") should remove the class ui-scrollBarDiv div parent') ;
				same($('#testUL').siblings('div.ui-scroll').length,0,'every tarElem with scrollBar("destroy") should remove the ui-scroll class div siblings') ;
				same($('#testUL').attr('data-dom'),'false','every tarElem with scrollBar("destroy") should set date-dom="false"') ;
				start();
			},300) ;
		});
	}) ;
}) ;