// rtSearchTest - desc by gaona at 2012-08-15
$(function(){
	$('.rtSearch').rtSearch({
		search_mode : 1 ,
		width:"300px" ,
		onFocus:function(){onFocus = true ;},
		onBlur:function(){onBlur = true ;}
	});
	test('every input with rtSearch() should create some dom elems', function(){
		var tarElem = $('.rtSearch') ;
		var tarLen = tarElem.length ;
		for(var i=0; i<tarLen; i++){
			same(tarElem.eq(i).parents('div.jh-widgets-rtSearch').length,1,'every input with rtSearch() should have the jh-widgets-rtSearch class div parent') ;
			same(tarElem.eq(i).prevAll('span.rt-search-ico').length,1,'every input with rtSearch() should have the rt-search-ico class span siblings') ;
			same(tarElem.eq(i).nextAll('span.rt-clear-ico').length,1,'every input with rtSearch() should have the rt-clear-ico class span siblings') ;
		}
	});
	
	test('every input with rtSearch() should add attr of data-dom', function(){
		var tarElem = $('.rtSearch') ;
		var tarLen = tarElem.length ;
		for(var i=0; i<tarLen; i++){
			same(tarElem.eq(i).attr('data-dom'),"true",'every input with rtSearch() should have add attr of data-dom with value is "true"') ;
		}
	});
	
	test('every input with rtSearch({width:widthvalue}) should have the same width style', function(){
		var tarElem = $('.rtSearch') ;
		var tarLen = tarElem.length ;
		for(var i=0; i<tarLen; i++){
			same(tarElem.eq(i).parents('div.jh-widgets-rtSearch').css('width'),'300px','every input with rtSearch({width:widthvalue}) should have the same width style') ;
		}
	});
	
	$('#searchInput').focus(function(){
		document.onkeyup = function(e){		
			setTimeout(function(){
				test('control the input width rtSearch()', function(){
					var tarVal = $('#searchInput').val() ;
					var highVal = $('#searchCon .highlight').html() ;
					var notSearch = true ;
					if(highVal != null){
						same(tarVal == highVal,true,'every input with rtSearch({search_mode:1}) should have the same value') ;
					}else{
						same(notSearch,true,'every input with rtSearch({search_mode:1}) should not have the highlight text') ;
					}
					
				});	
			},1000) ;
			
		}
	}) ;
	
	var onFocus = false ;
	var onBlur = false ;
	$('#testInput').focus(function(){		
		 test('control the input width rtSearch()', function(){
			stop();
			setTimeout(function(){
				same(onFocus,true,'every input with focus should call onFocus') ;
				onFocus = false ;
				start();
			}, 100) ;
		});
	}) ;
	$('#testInput').blur(function(){
		test('control the input width rtSearch()', function(){
			stop();
			setTimeout(function(){
				same(onBlur,true,'every input with blur should call onBlur') ;
				onBlur = false ;
				start();
			}, 100) ;
		});
	}) ;
	
	test('every input with rtSearch("destory") should remove some dom elems', function(){
		$('#destoryInput').rtSearch("destory") ;
		var tarElem = $('#destoryInput') ;
		same(tarElem.parents('div.jh-widgets-rtSearch').length,0,'every input with rtSearch("destory") should not have the jh-widgets-rtSearch class div parent') ;
		same(tarElem.siblings('span.rt-clear-ico').length,0,'every input with rtSearch("destory") should not have the rt-clear-ico class span siblings') ;
		same(tarElem.siblings('span.rt-search-ico').length,0,'every div parents class of the minSearchInput with rtSearch("destory") should not have the rt-search-ico class span siblings') ;
		same(tarElem.attr('data-dom'),"false",'every input with rtSearch("destory") should have add attr of data-dom with value is "false"') ;
	});
}) ;