// colorpickerTest - desc by gaona at 2012-08-27
$(function(){
	$('#color').colorpicker() ;
	test('with colorpicker() should create some dom', function(){		
		same($('#color').siblings('div#picker').length,1,'every tarElem with colorpicker() should have the picker id div siblings') ;
	});
	$('#color').click(function(){
		test('with click should create some dom', function(){
			stop();
			setTimeout(function(){
				same($('#color').siblings('div#picker').find('div.farbtastic').length,1,'every the picker id with click should create the farbtastic class div children') ;
				same($('#color').siblings('div#picker').find('div.farbtastic').find('div.color').length,1,'every the farbtastic class with click should create the color class div children') ;
				same($('#color').siblings('div#picker').find('div.farbtastic').find('div.wheel').length,1,'every the farbtastic class with click should create the wheel class div children') ;
				same($('#color').siblings('div#picker').find('div.farbtastic').find('div.overlay').length,1,'every the farbtastic class with click should create the overlay class div children') ;
				same($('#color').siblings('div#picker').find('div.farbtastic').find('div.h-marker').length,1,'every the farbtastic class with click should create the h-marker class div children') ;
				same($('#color').siblings('div#picker').find('div.farbtastic').find('div.sl-marker').length,1,'every the farbtastic class with click should create the sl-marker class div children') ;
				same($('#color').siblings('div#picker').css('display'),'block','every the picker id with click should show') ;
				start();
			},300) ;
		});
	}) ;
	$('#btn').click(function(){
		$('#tagText').val($('#color').colorpicker('getVal')) ;
		test('with click the getValBtn should get some value', function(){
			stop();
			setTimeout(function(){
				var tarVal = $('#color').val() ;
				var tagVal = $('#tagText').val() ;
				same(tarVal,tagVal,'with click the getValBtn should get some value') ;
				start();
			},300) ;
		});
	}) ;
	$('#desbtn').click(function(){
		$('#color').colorpicker('destroy') ;
		test('with colorpicker("destroy") should remove some dom', function(){
			stop();
			setTimeout(function(){
				same($('#color').siblings('div#picker').length,0,'every tarElem with colorpicker("destroy") should remove the picker id div siblings') ;
				start();
			},300) ;
		});
	}) ;
}) ;