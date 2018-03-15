// readModelTest - desc by gaona at 2013-01-05
$(function(){
	$('#divId2').readModel({
		height:300,
		width:300,
		model:'center',
		iframe:true
	});
	test('with readModel()', function(){
	}) ;
	$('#btn2').bind('click',function(){
		$('#divId2').readModel('show');	
		test('with readModel() and click the show btn should create some dom element and set some attr or css', function(){
			same($('#divId2').parents('body').find('span.ui-readModel-close').length,1,'with readModel() and click the show btn should create the ui-readModel-close class  element') ;
			same($('#divId2').parents('body').find('div.ui-readModel-bg').length,1,'with readModel() and click the show btn should create the ui-readModel-bg class div element') ;	
			same($('#divId2').parents('body').find('div.ui-readModel-clone').length,1,'with readModel() and click the show btn should create the ui-readModel-clone class div element') ;			
		});
		test('with readModel({width:300,height:300}) and click the show btn should set width/height of the targent div is 300/300', function(){
			same($('#divId2').parents('body').find('div.ui-readModel-clone').width(),300,'with readModel({width:300}) and click the show btn should set width of the targent div is 300') ;
			same($('#divId2').parents('body').find('div.ui-readModel-clone').height(),300,'with readModel({height:300}) and click the show btn should set height of the targent div is 300') ;
		}) ;
	});
}) ;