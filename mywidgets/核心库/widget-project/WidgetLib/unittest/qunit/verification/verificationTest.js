// buttonLightTest - desc by gaona at 2012-07-27
$(function(){
	test('class is verInput of input should create one div of parents dom', function(){
		var tarLen = $('.verInput').length ;
		for(var i=0; i<tarLen; i++){
			same($('.verInput').eq(i).parent('div').length,1,'there are one div tags of every class is verInput of input') ;
			same($('.verInput').eq(i).parent('div').hasClass('parDiv'),true,'parents div should have the parDiv class') ;
		}
	});
	
	var tarLen = $('.verInput').length ;
	for(var i=0; i<tarLen; i++){
		$('.verInput').eq(i).focus() ;
	}
	
	test('class is verInput[data-verif="verNumber"] of input with data-verif should create some dom',function(){
		var tarElem1 = $('.verInput[data-verif="verNumber"][data-range="10,100,percentage"]') ;
		var tarLen1 = tarElem1.length ;
		for(var i=0;i<tarLen1; i++){
			same(tarElem1.eq(i).parents('div.parDiv').text(),'%','there are "%" after target of input width [data-verif="verNumber" && data-range="10,100,percentage"') ;
		}
		
		var tarElem2 = $('.verInput[data-verif="verNumber"][data-range="10,100,float"]') ;
		var tarLen2 = tarElem1.length ;
		for(var i=0;i<tarLen1; i++){
			same(tarElem2.eq(i).siblings('div.EditDiv').length,1,'there are one div tags after the target of input with data-verif="verNumber" && data-range="10,100,float"') ;
			same(tarElem2.eq(i).siblings('div.EditDiv').find('input.inputInter').length,1,'EditDiv wrap class is inputInter of input with data-verif="verNumber" && data-range="10,100,float"') ;
			same(tarElem2.eq(i).siblings('div.EditDiv').find('input.inputFloat').length,1,'EditDiv wrap class is inputFloat of input with data-verif="verNumber" && data-range="10,100,float"') ;
			same(tarElem2.eq(i).siblings('div.EditDiv').find('span.decPoint').length,1,'EditDiv wrap class is decPoint of span with data-verif="verNumber" && data-range="10,100,float"') ;
			same(tarElem2.eq(i).siblings('div.EditDiv').find('span.decPoint').html(),'.','EditDiv wrap class is decPoint of span is empty with data-verif="verNumber" && data-range="10,100,float"') ;	
		}
	}) ;
	
	test('class is verInput[data-verif="verPhone"] of input with data-verif should create some dom',function(){
		var tarElem = $('.verInput[data-verif="verPhone"]') ;
		var tarLen = tarElem.length ;
		for(var i=0;i<tarLen; i++){
			same(tarElem.eq(i).siblings('div.EditDiv').length,1,'there are one div tags after the target of input with data-verif="verPhone"') ;
			same(tarElem.eq(i).siblings('div.EditDiv').find('input.inputAreaCode').length,1,'EditDiv wrap class is inputAreaCode of input with data-verif="verPhone"') ;
			same(tarElem.eq(i).siblings('div.EditDiv').find('input.inputPhoneNumber').length,1,'EditDiv wrap class is inputPhoneNumber of input with data-verif="verPhone"') ;
			same(tarElem.eq(i).siblings('div.EditDiv').find('input.inputPhoneExt').length,1,'EditDiv wrap class is inputPhoneExt of input with data-verif="verPhone"') ;
			same(tarElem.eq(i).siblings('div.EditDiv').find('span.decPoint').length,3,'EditDiv wrap three class is decPoint of span with data-verif="verPhone"') ;
			same(tarElem.eq(i).siblings('div.EditDiv').find('span.decPoint').eq(0).html(),'0','EditDiv wrap first class is decPoint of span text is "0" with data-verif="verPhone"') ;
			same(tarElem.eq(i).siblings('div.EditDiv').find('span.decPoint:gt(0)').html(),'-','EditDiv wrap second or third class is decPoint of span text is "-" with data-verif="verPhone"') ;
		}
	}) ;
	
	test('class is verInput[data-verif="verEmail"] of input with data-verif should create some dom',function(){
		var tarElem = $('.verInput[data-verif="verEmail"]') ;
		var tarLen = tarElem.length ;
		for(var i=0;i<tarLen; i++){
			same(tarElem.eq(i).siblings('div.EditDiv').length,1,'there are one div tags after the target of input with data-verif="verEmail"') ;
			same(tarElem.eq(i).siblings('div.EditDiv').find('input.inputEmailfront').length,1,'EditDiv wrap class is inputEmailfront of input with data-verif="verEmail"') ;
			same(tarElem.eq(i).siblings('div.EditDiv').find('input.inputEmailback').length,1,'EditDiv wrap class is inputEmailback of input with data-verif="verEmail"') ;
			same(tarElem.eq(i).siblings('div.EditDiv').find('input.inputEmaillast').length,1,'EditDiv wrap class is inputEmaillast of input with data-verif="verEmail"') ;
			same(tarElem.eq(i).siblings('div.EditDiv').find('span.decPoint').length,2,'EditDiv wrap two class is decPoint of span with data-verif="verEmail"') ;
			same(tarElem.eq(i).siblings('div.EditDiv').find('span.decPoint').eq(0).html(),'@','EditDiv wrap first class is decPoint of span text is "@" with data-verif="verEmail"') ;
			same(tarElem.eq(i).siblings('div.EditDiv').find('span.decPoint').eq(1).html(),'.','EditDiv wrap second class is decPoint of span text is "." with data-verif="verEmail"') ;
		}
	}) ;
	
	test('class is verInput[data-verif="verUrl"] of input with data-verif should create some dom',function(){
		var tarElem = $('.verInput[data-verif="verUrl"]') ;
		var tarLen = tarElem.length ;
		for(var i=0;i<tarLen; i++){
			same(tarElem.eq(i).siblings('div.EditDiv').length,1,'there are one div tags after the target of input with data-verif="verUrl"') ;
			same(tarElem.eq(i).siblings('div.EditDiv').find('input.inputUrl').length,1,'EditDiv wrap class is inputUrl of input with data-verif="verUrl"') ;
			same(tarElem.eq(i).siblings('div.EditDiv').find('span.decPoint').length,1,'EditDiv wrap one class is decPoint of span with data-verif="verUrl"') ;
			same(tarElem.eq(i).siblings('div.EditDiv').find('span.decPoint').eq(0).html(),'http://','EditDiv wrap first class is decPoint of span text is "@" with data-verif="verUrl"') ;
		}
	}) ;
	
	test('class is verInput[data-verif="verIP"] of input with data-verif should create some dom',function(){
		var tarElem = $('.verInput[data-verif="verIP"]') ;
		var tarLen = tarElem.length ;
		for(var i=0;i<tarLen; i++){
			same(tarElem.eq(i).siblings('div.EditDiv').length,1,'there are one div tags after the target of input with data-verif="verIP"') ;
			same(tarElem.eq(i).siblings('div.EditDiv').find('input.inputIP1').length,1,'EditDiv wrap class is inputIP1 of input with data-verif="verIP"') ;
			same(tarElem.eq(i).siblings('div.EditDiv').find('input.inputIP2').length,1,'EditDiv wrap class is inputIP2 of input with data-verif="verIP"') ;
			same(tarElem.eq(i).siblings('div.EditDiv').find('input.inputIP3').length,1,'EditDiv wrap class is inputIP3 of input with data-verif="verIP"') ;
			same(tarElem.eq(i).siblings('div.EditDiv').find('input.inputIP4').length,1,'EditDiv wrap class is inputIP4 of input with data-verif="verIP"') ;
			same(tarElem.eq(i).siblings('div.EditDiv').find('span.decPoint').length,3,'EditDiv wrap two class is decPoint of span with data-verif="verIP"') ;
			same(tarElem.eq(i).siblings('div.EditDiv').find('span.decPoint').eq(0).html(),'.','EditDiv wrap first class is decPoint of span text is "." with data-verif="verIP"') ;
			same(tarElem.eq(i).siblings('div.EditDiv').find('span.decPoint').eq(1).html(),'.','EditDiv wrap second class is decPoint of span text is "." with data-verif="verIP"') ;
			same(tarElem.eq(i).siblings('div.EditDiv').find('span.decPoint').eq(2).html(),'.','EditDiv wrap third class is decPoint of span text is "." with data-verif="verIP"') ;
		}
	}) ;
	
	test('class is verInput[data-verif="verTime"] of input with data-verif should create some dom',function(){
		var tarElem = $('.verInput[data-verif="verTime"]') ;
		var tarLen = tarElem.length ;
		for(var i=0;i<tarLen; i++){
			same(tarElem.eq(i).siblings('div.EditDiv').length,1,'there are one div tags after the target of input with data-verif="verTime"') ;
			same(tarElem.eq(i).siblings('div.EditDiv').find('input.inputYear').length,1,'EditDiv wrap class is inputYear of input with data-verif="verTime"') ;
			same(tarElem.eq(i).siblings('div.EditDiv').find('input.inputMonth').length,1,'EditDiv wrap class is inputMonth of input with data-verif="verTime"') ;
			same(tarElem.eq(i).siblings('div.EditDiv').find('input.inputDay').length,1,'EditDiv wrap class is inputDay of input with data-verif="verTime"') ;
			same(tarElem.eq(i).siblings('div.EditDiv').find('span.decPoint').length,2,'EditDiv wrap two class is decPoint of span with data-verif="verTime"') ;
			same(tarElem.eq(i).siblings('div.EditDiv').find('span.decPoint').eq(0).html(),'-','EditDiv wrap first class is decPoint of span text is "." with data-verif="verTime"') ;
			same(tarElem.eq(i).siblings('div.EditDiv').find('span.decPoint').eq(1).html(),'-','EditDiv wrap second class is decPoint of span text is "." with data-verif="verTime"') ;
		}
	}) ;
	
	test('class is verInput of input with focus should have show',function(){
		var tarLen = $('.verInput').length ;
		var isToggle ;
		for(var i=0; i<tarLen; i++){
			var editDiv = $('.verInput').eq(i).siblings('div.EditDiv').length ;
			if(editDiv>0){
				if($('.verInput').eq(i).css('display') == 'inline-block'){
					isToggle = ($('.verInput').eq(i).siblings('div.EditDiv').css('display') == 'none') ;
				}else if($('.verInput').eq(i).css('display') == 'none'){
					isToggle = ($('.verInput').eq(i).siblings('div.EditDiv').css('display') == 'inline') ;
				}
				ok(isToggle,true,'class is verInput of input show and div.EditDiv hide after class is verInput of input or class is verInput of input hide and div.EditDiv show after class is verInput of input') ;
			}
		}
	}) ;
	
	test('class is verInput of input with verification("vermobile")',function(){
		$('#testInput').verification('vermobile') ;
		same($('#testInput').attr('data-verif'),'verMobile','class is verInput of input with verification("vermobile") should have data-verif=verMobile');
	}) ;
}) ;