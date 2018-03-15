// maxLengthTest - desc by gaona at 2012-07-31
$(function(){
	$('#input_1').maxLength({maxCharacters:5});
	$('#textarea_2').maxLength({maxCharacters:25});
	$('#input_3').maxLength({maxCharacters:10});
	test('$(obj).maxLength() should create one div elems', function(){
		same($('#input_1').nextAll('div').length,1,'$(obj).maxLength() should create one div elems') ;
		same($('#input_1').nextAll('div.ui-maxLength-statusClass').length,1,'$(obj).maxLength() should create one div elems with the ui-maxLength-statusClass class') ;
	});
	
	var maxHtml = $('#textarea_2').nextAll('.ui-maxLength-statusClass').html() ;
	var regExp = new RegExp(/[：:](\d*)$/g) ;
	regExp.test(maxHtml) ;
	var maxCha = RegExp.$1 ;
	$('#testBtn').click(function(){
		var tarVal =  $('#textarea_2').val() ;
		var beLeftHtml = $('#textarea_2').nextAll('.ui-maxLength-statusClass').html() ;
		var regExp2 = new RegExp(/[：:](\d*)$/g) ;
		regExp2.test(beLeftHtml) ;
		var beLeftCha = RegExp.$1 ;
		test('the length of textarea value with leaveCaracters is equal the maxCharacters', function(){
			equal(tarVal.length + parseInt(beLeftCha),parseInt(maxCha),'fsadfas') ;
		}) ;
	}) ;
	test('control input when the length of $("#input_3") value equal maxLength', function(){
		same($('#input_3').hasClass('ui-maxLength-notification'),false,'$("#input_3") lost focus should not have the class ui-maxLength-notification') ;
	});
	$('#input_3').keyup(function(){
		test('keyup input when the length of $("#input_3") value equal maxLength', function(){
			same($('#input_3').hasClass('ui-maxLength-notification'),true,'$("#input_3") keyup should have the class ui-maxLength-notification when the length of $("#input_3") value equal maxLength') ;
		});
	}) ;
}) ;