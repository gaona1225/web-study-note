// slideTest - desc by gaona at 2012-12-26
$(function(){
	$('#slides').slide({
		effect:"fade",
		paginationType:"hover",
		width:840,
		height:305,
		play:3000, //开启自动播放
		pause:1000,
		eventHandler:function (param) {
			alert("eventHandler:" + param);
		}
	});
	test('with slide() should create some dom element', function(){
		same($('#slides').find('ul.pagination').length,1,'with slide() should create the pagination class ul child element') ;
		var len = $('#slides').find('img').length ;
		same($('#slides').find('ul.pagination').find('li').length,len,'with slide() the pagination class ul should create the length of img(3) li child element') ;
	});
	test('with slide({width:840,height:305}) should create some css', function(){
		same($('#slides').find('.slide-container').width(),840,'with slide(width:840) should set the slide-container class div width') ;
		same($('#slides').find('.slide-container').height(),305,'with slide(height:305) should set the slide-container class div height') ;
	});
	$("#slides2").slide({
		effect:"h",
		pagination:false ,
		width:840,
		height:305,
		play:3000, //开启自动播放
		pause:1000,
		eventHandler:function (param) {
			alert("eventHandler:" + param);
		}
	});
	test('with slide({pagination:false}) should not create some css', function(){
		same($('#slides2').find('ul.pagination').length,0,'with slide() should not create the pagination class ul child element') ;
	});
	$("#slides3").slide({
		effect:"shutter",
		shutterDir:"h",
		shutterNum:4,
		width:840,
		height:305,
		index:0,
		dataAttributeName:"data-shutter",
		eventHandler:function (param) {
			alert("eventHandler:" + param);
		}
	});
}) ;