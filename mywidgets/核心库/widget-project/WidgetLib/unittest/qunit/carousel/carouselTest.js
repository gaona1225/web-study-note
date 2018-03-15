// carouselTest - desc by gaona at 2012-12-26
$(function(){
	$('#carousel').carousel({
		wrapWid:900,
		wrapHei:480,
		imgWid:350,
		imgHei:214,
		xPos:450,
		yPos:110,
		buttonLeft:$('#but1'),
		buttonRight:$('#but2'),		
		FPS:30,
		reflHeight:86,
		reflGap:2,
		yRadius:40,
		autoRotate: 'yes',
		autoRotateDelay: 2000,
		speed:0.2,
		mouseWheel:true,
		bringToFront:true
	});
	test('with carousel() should create some dom element and set some attr or css', function(){
		same($('div#carouselWrap').length,1,'with carousel() should create the carouselWrap id children div') ;
		same($('div#carousel').css('position'),'relative','with carousel() should set position of the carousel id div') ;
		same($('div#carouselWrap').css('position'),'absolute','with carousel() should set position of the carouselWrap id div') ;
	});
	test('with carousel({wrapWid:900,wrapHei:480,imgWid:350,imgHei:214}) should set some attr or css', function(){
		same($('div#carousel').width(),900,'with carousel({wrapWid:900}) should set the width of the carousel id div') ;
		same($('div#carousel').height(),480,'with carousel({wrapHei:480}) should set the height of the carousel id div') ;
		same($('div#carousel').find('img').width(),350,'with carousel({imgWid:350}) should set the width of img') ;
		same($('div#carousel').find('img').height(),214,'with carousel({imgHei:214}) should set the height of img') ;
	});
	$('#testBtn').click(function(){
		$('.carousel').carousel('destroy') ;
		test('with height() should update the height of the ui-minScrollbar-viewable class div', function(){
			same($('div#carouselWrap').length,0,'with carousel() should remove the carouselWrap id children div') ;
		});		
	}) ;
}) ;