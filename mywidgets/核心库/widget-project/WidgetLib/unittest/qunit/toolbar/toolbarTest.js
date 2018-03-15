// toolbarTest - desc by gaona at 2012-08-16
$(function(){
	$('.toolbar').toolbar().width('400px') ;
	test('every div with toolbar() should add the ui-toolbar class', function(){
		var tarElem = $('.toolbar') ;
		var tarLen = tarElem.length ;
		for(var i=0; i<tarLen; i++){
			same(tarElem.eq(i).hasClass('ui-toolbar'),true,'every div with toolbar() should have the ui-toolbar class') ;
		}
	});
	
	test('every div with data-type="top" should add the ui-toolbarTop class ',function(){
		same($('.toolbar[data-type="top"]').hasClass('ui-toolbarTop'),true,'every div with data-type="top" should add the ui-toolbarTop class') ;
	}) ;
	
	test('every div with data-type="bottom" should add the ui-toolbarBottom class ',function(){
		same($('.toolbar[data-type="bottom"]').hasClass('ui-toolbarBottom'),true,'every div with data-type="bottom" should add the ui-toolbarBottom class') ;
	}) ;
	
	test('every div with toolbar("destroy") should remove some class', function(){
		$('#testDiv').toolbar('destroy');
		same($('#testDiv').hasClass('ui-toolbar'),false,'every div with toolbar("destroy") should remove the ui-toolbar class');
		same($('#testDiv').hasClass('ui-toolbarTop'),false,'every div with toolbar("destroy") should remove the ui-toolbarTop class');
		same($('#testDiv').hasClass('ui-toolbarBottom'),false,'every div with toolbar("destroy") should remove the ui-toolbarBottom class');
	});
}) ;