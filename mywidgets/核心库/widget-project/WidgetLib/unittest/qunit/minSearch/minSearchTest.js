// minSearchTest - desc by gaona at 2012-08-15
$(function(){
	$('.minSearch').minSearch({
		width:'200px' ,
		btnClick:function(){btnClick = true ;},
		onFocus:function(){onFocus = true ;},
		onBlur:function(){onBlur = true ;}
	});
	
	test('every input with minSearch() should create some dom elems', function(){
		var tarElem = $('.minSearch') ;
		var tarLen = tarElem.length ;
		for(var i=0; i<tarLen; i++){
			same(tarElem.eq(i).parents('div.minSearchInput').length,1,'every input with minSearch() should have the minSearchInput class div parent') ;
			same(tarElem.eq(i).parents('div.c6ui-widget-minSearch').length,1,'every input with minSearch() should have the c6ui-widget-minSearch class div parent') ;
			same(tarElem.eq(i).parents('div.minSearchInput').siblings('a.minSearchBtn').length,1,'every div parents class of the minSearchInput with minSearch() class should have the minSearchBtn class a siblings') ;
		}
	});
	
	test('every input with minSearch() should add attr of data-destory', function(){
		var tarElem = $('.minSearch') ;
		var tarLen = tarElem.length ;
		for(var i=0; i<tarLen; i++){
			same(tarElem.eq(i).attr('data-destory'),"true",'every input with minSearch() should have add attr of data-destory with value is "true"') ;
		}
	});
	
	test('every input with minSearch({width:widthvalue}) should have the same width style', function(){
		var tarElem = $('.minSearch') ;
		var tarLen = tarElem.length ;
		for(var i=0; i<tarLen; i++){
			same(tarElem.eq(i).parents('div.c6ui-widget-minSearch').css('width'),'200px','every input with minSearch({width:widthvalue}) should have the same width style') ;
		}
	});
	
	var btnClick = false ;
	var onFocus = false ;
	var onBlur = false ;
	$('#testInput').parents('div.minSearchInput').siblings('a.minSearchBtn').click(function(){		
		 test('control the input width minSearch()', function(){
			stop();
			setTimeout(function(){
				same(btnClick,true,'every input with click should call btnClick') ;
				btnClick = false ;
				start();
			}, 100) ;
		});
	}) ;
	$('#testInput').focus(function(){		
		 test('control the input width minSearch()', function(){
			stop();
			setTimeout(function(){
				same(onFocus,true,'every input with focus should call onFocus') ;
				onFocus = false ;
				start();
			}, 100) ;
		});
	}) ;
	$('#testInput').blur(function(){
		test('control the input width minSearch()', function(){
			stop();
			setTimeout(function(){
				same(onBlur,true,'every input with blur should call onBlur') ;
				onBlur = false ;
				start();
			}, 100) ;
		});
	}) ;
	
	test('every input with minSearch("destory") should remove some dom elems', function(){
		$('#destoryInput').minSearch("destory") ;
		var tarElem = $('#destoryInput') ;
		same(tarElem.parents('div.minSearchInput').length,0,'every input with minSearch("destory") should not have the minSearchInput class div parent') ;
		same(tarElem.parents('div.c6ui-widget-minSearch').length,0,'every input with minSearch("destory") should not have the c6ui-widget-minSearch class div parent') ;
		same(tarElem.parents('div.minSearchInput').siblings('a.minSearchBtn').length,0,'every div parents class of the minSearchInput with minSearch("destory") should not have the minSearchBtn class a siblings') ;
		same(tarElem.attr('data-destory'),"false",'every input with minSearch("destory") should have add attr of data-destory with value is "false"') ;
	});
}) ;