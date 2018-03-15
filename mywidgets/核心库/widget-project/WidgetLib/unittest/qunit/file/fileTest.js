// fileTest - desc by gaona at 2012-07-30
$(function(){
	$(".file").file();
	test('every class is file with should create some dom attr', function(){
		var tarLen = $('.file').length ;
		for(var i=0; i<tarLen; i++){
			same($('.file').parents('span').length,1,'input type of file should have parents with one span tag') ;
			same($('.file').parents('span').hasClass('file-wrap'),true,'parents with span should have the file-wrap class') ;
			same($('.file').hasClass('file-ifile'),true,'input type of file should have the file-ifile class') ;
			same($('.file').siblings('input[type=text]').hasClass('file-text'),true,'input type of file should have a siblings with input[type=text] and it have the file-text class') ;
			same($('.file').siblings('input[type=button]').hasClass('file-button'),true,'input type of file should have a siblings with input[type=button] and it have the file-button class') ;
		}
	});
	test('set input.file width width:200,and height 30', function(){
		$('.file').file({width:200}) ;
		same($('.file').width(),200,'input.file should have width is 200') ;
		var widthDif = parseInt($('.file').siblings('.file-button').width()) + parseInt($('.file').siblings('.file-button').css('border-left-width')) + parseInt($('.file').siblings('.file-button').css('border-right-width')) + parseInt($('.file').siblings('.file-text').css('border-left-width')) + parseInt($('.file').siblings('.file-text').css('border-right-width')) ;
		same($('.file').siblings('.file-text').width(),200 - widthDif ,'input.file should have width+padding+margin+border is 200') ;
	});
	test('set input.file width width:200,and height 30', function(){
		$('.file').file({height:30}) ;
		same($('.file').height(),30,'input.file should have height is 30') ;
		var heightDif = parseInt($('.file').siblings('.file-text').css('border-top-width')) + parseInt($('.file').siblings('.file-text').css('border-bottom-width')) ;
		same($('.file').siblings('.file-text').height(),30 - heightDif ,'input.file should have height+padding+margin+border is 30') ;
	});
	test('input type of file has the same left/top with parents', function(){
		var tarLen = $('.file').length ;
		for(var i=0; i<tarLen; i++){
			same(parseInt($('.file').css('left')),parseInt($('.file').parents('.file-wrap').offset().left),'input type of file has the same left with parents') ;
			same(parseInt($('.file').css('top')),parseInt($('.file').parents('.file-wrap').offset().top),'input type of file has the same top with parents') ;
		}
	});
	$('.file').change(function(){
		var _this = $(this) ;
		test('function of input type is file', function(){
			same(_this.file('getVal'),_this.siblings('.file-text').val(),'input.file with file("getVal") should same of value with input.file-text') ;
		}) ;
	}) ;
	test('function of input type is file', function(){
		$('#test').file('destory') ;
		same($('#test').parents('span').length,0,'input#test with file("destory") should not have parents with one span tag') ;
		same($('#test').hasClass('file-ifile'),false,'input#test with file("destory") should not have the file-ifile class') ;
		same($('#test').parents('span').find('.file-text').length,0,'input#test with file("destory") should not have the file-text class with input') ;
		same($('#test').parents('span').find('.file-button').length,0,'input#test with file("destory") should not have the file-button class with input') ;
	}) ;
}) ;