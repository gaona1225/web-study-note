// formatImageTest - desc by gaona at 2012-12-26
$(function(){
	$('#imgId1').formatImage({
		width:100,
		height:100,
		position:'bottom'	
	});	
	test('with formatImage() should create some dom element', function(){
		var imgTar = $('img.ui-formatImage') ;
		var len = $(imgTar).length ;
		for(var i=0; i<len; i++){
			same($(imgTar).eq(i).parents('div.ui-formatImage-view').length,1,'with formatImage() should create the ui-formatImage-view class div parents element') ;
		}
	});
	test('with formatImage({width:100,height:100,position:\'bottom\'}) should set some css', function(){
		same($('#imgId1').parents('div.ui-formatImage-view').width(),100,'with formatImage({width:100}) should set width of the ui-formatImage-view class div element') ;
		same($('#imgId1').parents('div.ui-formatImage-view').height(),100,'with formatImage({height:100}) should set height of the ui-formatImage-view class div element') ;
		same(Math.floor(parseFloat($('#imgId1').css('top'))),$('#imgId1').parents('div.ui-formatImage-view').height() - $('#imgId1').height(),'with formatImage({position:\'bottom\'}) should set top of the img element') ;
		same(Math.floor(parseFloat($('#imgId2').css('top'))),Math.floor(parseFloat(($('#imgId2').parents('div.ui-formatImage-view').height() - $('#imgId2').height())/2)),'with formatImage({position:\'bottom\'}) should set top of the img element') ;
	});
	test('with formatImage() and data-formatImage-width=\'200\' data-formatImage-height=\'200\' data-formatImage-position=\'top\' should set some css', function(){
		same($('#imgId3').parents('div.ui-formatImage-view').width(),200,'with formatImage() and data-formatImage-width=\'200\' should set width of the ui-formatImage-view class div element') ;
		same($('#imgId3').parents('div.ui-formatImage-view').height(),200,'with formatImage() and data-formatImage-height=\'200\' should set height of the ui-formatImage-view class div element') ;
		same(parseInt($('#imgId3').css('top')),0,'with formatImage() and data-formatImage-position=\'top\' should set top of the ui-formatImage-view class div element') ;
	});
	
	$('#destroyBtn').click(function(){
		$('#imgId3').formatImage('destroy') ;
		test('with formatImage(\'destroy\') and remove some dom and some attr', function(){
			same($('#imgId3').parents('div.ui-formatImage-view').length,0,'with formatImage(\'destroy\') should remove the ui-formatImage-view class div element') ;
			same($('#imgId3').hasClass('ui-formatImage'),false,'with formatImage(\'destroy\') should remove the ui-formatImage class') ;
			if($.browser && $.browser.version <=8){
				return ;
			}else{
				same($('#imgId3').attr('data-formatimage-width'),undefined,'with formatImage(\'destroy\') should remove the data-formatimage-width attr') ;
				same($('#imgId3').attr('data-formatimage-height'),undefined,'with formatImage(\'destroy\') should remove the data-formatimage-height attr') ;
				same($('#imgId3').attr('data-formatimage-position'),undefined,'with formatImage(\'destroy\') should remove the data-formatimage-position attr') ;
			}
		});
	}) ;
}) ;