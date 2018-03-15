// progressBarTest - desc by gaona at 2012-08-17
$(function(){
	$(".progressBar").progressBar({width:"300px"});
	$("#set").click(function(){
		var val = $("#setVal").val();
		$("#bar").val(val);
		$(".progressBar").progressBar();
	});
	
	test('with progressBar() should create some dom', function(){
		same($('#bar').parents('b').length,1,'every input with progressBar() should have b parent') ;
		same($('#bar').parents('span').length,1,'every input with progressBar() should have span parent') ;
		same($('#bar').parents('div.ui-progressBar').length,1,'every input with progressBar() should have the class ui-progressBar div parent') ;
	});
	
	$("#set").click(function(){
		test('with progressBar() should set the width style', function(){
			var inputVal = parseInt($('#setVal').val()) ;
			var parWid = $('div.ui-progressBar').width() ;
			stop();
			setTimeout(function(){
				if(!isNaN(inputVal)){
					var actWid = parseInt(inputVal/100*parWid) ;
				}
				if(isNaN(inputVal)||(inputVal<0)||(inputVal>100)){
					var sameVal = true ;
				}else if(inputVal<=50){
					var sameVal = ((parseInt($('#bar').parents('b').css('width'))+1)==actWid) ;
				}else{
					var sameVal = ((parseInt($('#bar').parents('b').css('width'))+2)==actWid) ;
				}
				same(sameVal,true,'with progressBar() should set the width style') ;
				start();
			}, 300) ;
		});
	}) ;
	
	test('with progressBar() should set display style', function(){
		same($('#bar').css('display'),'none','every input with progressBar() should set display none') ;
	});
	
	$('#testInput').progressBar('destroy') ;
	test('with progressBar("destroy") should remove some dom', function(){
		same($('#testInput').parents('b').length,0,'with progressBar("destroy") should remove b parent') ;
		same($('#testInput').parents('span').length,0,'with progressBar("destroy") should remove span parent') ;
		same($('#testInput').parents('div.ui-progressBar').length,0,'with progressBar("destroy") should remove the class ui-progressBar div parent') ;
		same($('#testInput').css('display'),'block','every input with progressBar() should set display block') ;
	});
}) ;