// ratystarTest - desc by gaona at 2012-08-28
$(function(){
	var tot = 5 ;
	$('.exampleObj').ratystar({total:tot});
	test('with ratystar() should create some dom', function(){
		var tarElem = $('.exampleObj') ;
		var tarLen = tarElem.length ;
		for(var i=0; i<tarLen; i++){
			same(tarElem.eq(i).find('ul.ratystar-starul').length,1,'every tarElem with ratystar() should have the ratystar-starul class ul children') ;
			same(tarElem.eq(i).find('div.ratystar-clear').length,1,'every tarElem with ratystar() should have the ratystar-clear class div children') ;
			same(tarElem.eq(i).find('ul.ratystar-starul').find('li').length>0,true,'the ratystar-starul class ul with ratystar() should have some li childrens') ;
		}
	});
	test('with ratystar({total:5}) should create the same li', function(){
		var tarElem = $('.exampleObj') ;
		var tarLen = tarElem.length ;
		for(var i=0; i<tarLen; i++){
			same(tarElem.eq(i).find('ul.ratystar-starul').find('li').length,tot,'the ratystar-starul class ul with ratystar() should have 5 li childrens') ;
		}
	});
	$('.exampleObj').find('ul.ratystar-starul').find('li').click(function(){
		var tarElm = $(this).parents('ul.ratystar-starul') ;
		test('with click the li should the same num the ratystar-starli-active class li with data-starval attr', function(){
			stop();
			setTimeout(function(){
				var len = parseInt(tarElm.attr('data-starval')) ;
				same(tarElm.find('li.ratystar-starli-active').length,len,'the ratystar-starul class ul with ratystar() should have data-starval the ratystar-starli-active li childrens') ;
				start();
			},300) ;
		});
	}) ;
	$('#disablebtn').click(function(){
		$('#testDiv').ratystar('disable') ;
		test('with ratystar("disable") should create set data-disable="true"', function(){
			stop();
			setTimeout(function(){
				same($('#testDiv').find('ul.ratystar-starul').attr('data-disable'),'true','with ratystar("disable") should create set data-disable="true"') ;
				start();
			},300) ;
		});
	}) ;
	$('#enablebtn').click(function(){
		$('#testDiv').ratystar('enable') ;
		test('with ratystar("enable") should create set data-disable="false"', function(){
			stop();
			setTimeout(function(){
				same($('#testDiv').find('ul.ratystar-starul').attr('data-disable'),'false','with ratystar("enable") should create set data-disable="false"') ;
				start();
			},300) ;
		});
	}) ;
	$('#getbtn').click(function(){
		$('#showvalue').val($('#testDiv').ratystar('getStar')) ;
		test('the ratystar-starul class ul with ratystar("getStar") should have tarVal the ratystar-starli-active li childrens', function(){
			stop();
			setTimeout(function(){
				var outerVal = parseInt($('#showvalue').val()) ;
				same($('#testDiv').find('ul.ratystar-starul').find('li.ratystar-starli-active').length,outerVal,'the ratystar-starul class ul with ratystar("getStar") should have tarVal the ratystar-starli-active li childrens') ;
				start();
			},300) ;
		});
	}) ;
}) ;