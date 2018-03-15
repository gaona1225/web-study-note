// minScrollbarTest - desc by gaona at 2012-12-25
$(function(){
	test('with minScrollbar() should create some dom element and set some attr or css', function(){
		var len = $('.ui-minScrollbar').length ;
		var tarElem =  $('.ui-minScrollbar') ;
		for(var i=0; i<len; i++){
			same($(tarElem).eq(i).parents('div.ui-minScrollbar-viewable').length,1,'with minScrollbar() should create the ui-minScrollbar-viewable class div parents element') ;
			same($(tarElem).eq(i).next('div.ui-minScrollbar-horizontal').length,1,'with minScrollbar() should create the ui-minScrollbar-horizontal class div siblings element') ;
			same($(tarElem).eq(i).next('div.ui-minScrollbar-horizontal').find('div.ui-hScroll').length,1,'with minScrollbar() should create the ui-hScroll class div children element') ;
			same($(tarElem).eq(i).nextAll('div.ui-minScrollbar-vertical').length,1,'with minScrollbar() should create the ui-minScrollbar-vertical class div siblings element') ;
			same($(tarElem).eq(i).nextAll('div.ui-minScrollbar-vertical').find('div.ui-vScroll').length,1,'with minScrollbar() should create the ui-vScroll class div children element') ;
			ok($(tarElem).eq(i).attr('data-destroy'),'with minScrollbar() should create the data-destroy attr with target element') ;
		}
	});
	$("#divID,#divID2").minScrollbar({
		hScroll:true,
		vScroll:true,
		width:'20px',
		height:'20px',
		viewWidth:'200px',
		viewHeight:'300px',
		bgColor:'red'			
	});
	test('with minScrollbar({hScroll:true,vScroll:true,width:\'20px\',height:\'20px\',viewWidth:\'300px\',viewHeight:\'300px\',bgColor:\'red\'}) should set some message', function(){
		same($('#divID').next('div.ui-minScrollbar-horizontal').height(),20,'with minScrollbar({height:\'20px\'}) should set the height of the ui-minScrollbar-horizontal class div') ;
		same($('#divID').nextAll('div.ui-minScrollbar-vertical').width(),20,'with minScrollbar({width:\'20px\'}) should set the width of the ui-minScrollbar-vertical class div') ;
		same($('#divID').parents('div.ui-minScrollbar-viewable').height(),300,'with minScrollbar({viewHeight:\'300px\'}) should set the height of the ui-minScrollbar-viewable class div') ;
		same($('#divID').parents('div.ui-minScrollbar-viewable').width(),200,'with minScrollbar({viewHeight:\'300px\'}) should set the width of the ui-minScrollbar-viewable class div') ;
		same($('#divID').next('div.ui-minScrollbar-horizontal').css('display'),'block','with minScrollbar({hScroll:true}) should set the display of the ui-minScrollbar-horizontal class div') ;
		same($('#divID').nextAll('div.ui-minScrollbar-vertical').css('display'),'block','with minScrollbar({vScroll:true}) should set the display of the ui-minScrollbar-vertical class div') ;
	}) ;
	$('#btn1').click(function(){
		var $t = $('#divID').parent('.ui-minScrollbar-viewable');
		var h = parseFloat($t.height())+20;
		$t.height(h);	
		$('#divID').append('<div>123</div>');	
		test('with height() should update the height of the ui-minScrollbar-viewable class div', function(){
			same($('#divID').parents('div.ui-minScrollbar-viewable').height(),320,'with height() should add the height of the ui-minScrollbar-viewable class div') ;
		});		
	});
	$('#btn4').click(function(){
		var $t = $('#divID').parent('.ui-minScrollbar-viewable');
		var h = parseFloat($t.width())-20;
		$t.width(h);	
		test('with width() should update the width of the ui-minScrollbar-viewable class div', function(){
			same($('#divID').parents('div.ui-minScrollbar-viewable').width(),180,'with height() should add the height of the ui-minScrollbar-viewable class div') ;
		});				
	});
	$('#destroy').click(function(){
		$("#divID2").minScrollbar('destroy') ;
		test('with minScrollbar(\'destroy\') should remove some dom and update some attr', function(){
			same($('#divID2').parents('div.ui-minScrollbar-viewable').length,0,'with minScrollbar(\'destroy\') should remove the ui-minScrollbar-viewable class parents div') ;
			same($('#divID2').next('div.ui-minScrollbar-horizontal').length,0,'with minScrollbar(\'destroy\') should remove the div.ui-minScrollbar-horizontal class siblings div') ;
			same($('#divID2').nextAll('div.ui-minScrollbar-vertical').length,0,'with minScrollbar(\'destroy\') should remove the ui-minScrollbar-vertical class siblings div') ;
			same($('#divID2').hasClass('ui-minScrollbar'),false,'with minScrollbar(\'destroy\') should remove the ui-minScrollbar class') ;
			same($('#divID2').attr('data-destroy'),'false','with minScrollbar(\'destroy\') should update the data-destroy attr') ;
		});
	});
}) ;