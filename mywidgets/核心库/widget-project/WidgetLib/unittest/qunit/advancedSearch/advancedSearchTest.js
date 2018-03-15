// advancedSearchTest - desc by gaona at 2012-08-16
$(function(){
	$('.advancedSearch').advancedSearch({
		width:'120px',
		onFocus:function(){onFocus = true ;}
	});
	test('every input with advancedSearch() should create some dom elems', function(){
		var tarElem = $('.advancedSearch') ;
		var tarLen = tarElem.length ;
		for(var i=0; i<tarLen; i++){
			same(tarElem.eq(i).parents('div.jcs_common_search_con').length,1,'every input with advancedSearch() should have the jcs_common_search_con class div parent') ;
			same(tarElem.eq(i).prevAll('a#jcs_search_a').length,1,'every input with advancedSearch() should have the jcs_search_a id a siblings') ;
			same(tarElem.eq(i).prevAll('a#jcs_search_a').find('span.jcs_common_s_ico').length,1,'every the id of jcs_search_a a with advancedSearch() should have the jcs_common_s_ico span children') ;
			same(tarElem.eq(i).prevAll('a#jcs_search_a').find('span.jcs_common_s_mei').length,1,'every the id of jcs_search_a a with advancedSearch() should have the jcs_common_s_mei span children') ;
			same(tarElem.eq(i).nextAll('span.jcs_common_search').length,1,'every input with advancedSearch() should have the jcs_common_search class span siblings') ;
		}
	});
	
	test('every input with advancedSearch() should add attr of data-dom', function(){
		var tarElem = $('.advancedSearch') ;
		var tarLen = tarElem.length ;
		for(var i=0; i<tarLen; i++){
			same(tarElem.eq(i).attr('data-dom'),"true",'every input with advancedSearch() should have add attr of data-dom with value is "true"') ;
		}
	});
	
	var onFocus = false ;
	$('#testInput').focus(function(){		
		 test('control the input width advancedSearch()', function(){
			stop();
			setTimeout(function(){
				same(onFocus,true,'every input with focus should call onFocus') ;
				onFocus = false ;
				start();
			}, 100) ;
		});
	}) ;
	
	$('#clearWid').click(function(){
		$('#testInput').advancedSearch("destory") ;
		test('every input with advancedSearch("destory") should remove some dom elems', function(){
			var tarElem = $('#testInput') ;
			same(tarElem.parents('div.jh-widgets-rtSearch').length,0,'every input with advancedSearch("destory") should not have the jh-widgets-rtSearch class div parent') ;
			same(tarElem.siblings('a#jcs_search_a').length,0,'every input with advancedSearch("destory") should not have the jcs_search_a id span siblings') ;
			same(tarElem.siblings('span.jcs_common_search').length,0,'every div parents class of the minSearchInput with advancedSearch("destory") should not have the jcs_common_search class span siblings') ;
			same(tarElem.attr('data-dom'),"false",'every input with advancedSearch("destory") should have add attr of data-dom with value is "false"') ;
		});
	}) ;
}) ;