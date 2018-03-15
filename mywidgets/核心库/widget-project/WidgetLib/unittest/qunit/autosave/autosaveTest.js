// autosaveTest - desc by gaona at 2012-08-01
$(function(){
	$('.exampleObj').autosave();
	var childElem = $('.exampleObj').children('input[type="text"],input[type="password"],textarea,select') ;
	var childLen = childElem.length ;
	var childRadioOrCheck = $('.exampleObj').children('input[type="radio"],input[type="checkbox"]') ;
	var radioOrCheckLen = childRadioOrCheck.length ;
	var cookieMsg = document.cookie ;
	test('the children of tarElem with input[type="text"],input[type="password"],textarea,select should find in document.cookie', function(){
		if(cookieMsg.length > 0){
			for(var i=0; i<childLen; i++){
				var isFind = (cookieMsg.indexOf(childElem.eq(i).val())>-1) ;
				same(isFind,true,'the children of tarElem with input[type="text"],input[type="password"],textarea,select should find in document.cookie') ;
			}
		}
	}) ;
	
	test('the children of tarElem with input[type="radio"],input[type="checkbox"] should find in document.cookie', function(){
		if(cookieMsg.length > 0){
			for(var i=0; i<radioOrCheckLen; i++){
				var isFind = (cookieMsg.indexOf(childRadioOrCheck.eq(i).attr('checked'))>-1) ;
				same(isFind,true,'the children of tarElem with input[type="radio"],input[type="checkbox"] should find in document.cookie') ;
			}
		}
	}) ;
}) ;