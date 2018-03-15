// txttruncateTest - desc by gaona at 2012-12-24
$(function(){
	var defaultTxt = $('.txttruncate').eq(0).html() ;
	$('.txttruncate').eq(0).txttruncate();
	test('with txttruncate() should add the attr[data-source] and the value is equal the defaultTxt', function(){
		same($('.txttruncate').eq(0).attr('data-source'),defaultTxt,'with txttruncate() should add the attr[data-source] and the value is equal the defaultTxt') ;
	});
	test('with txttruncate({dataPrompt:true}) should add the attr[title] and the value is equal the defaultTxt', function(){
		same($('.txttruncate').eq(0).attr('title'),defaultTxt,'with txttruncate({dataPrompt:true}) should add the attr[title] and the value is equal the defaultTxt') ;
	});
	test('with txttruncate({dataFormat:"..."}) should add the "..." in targetElement', function(){
		same($('.txttruncate').eq(0).html().indexOf('...')>-1,true,'with txttruncate({dataFormat:"..."}) should add the "..." in targetElement') ;
	});
	$('.txttruncate').eq(2).txttruncate({
		dataFormat : '<span style="color:red">我是自定义的html片段作为截取信息后缀</span>'
	});
	test('with txttruncate({dataFormat:"<span style="color:red">我是自定义的html片段作为截取信息后缀</span>"}) should add fragment of html in targetElement', function(){
		same($('.txttruncate').eq(2).html().indexOf('style')>-1,true,'with txttruncate({dataFormat:"<span style="color:red">我是自定义的html片段作为截取信息后缀</span>"}) should add fragment of html in targetElement') ;
	});
	$('.txttruncate').eq(1).txttruncate();
	test('targetElement with data-length="10" should txttruncate the html by data-length', function(){
		var str = $('.txttruncate').eq(1).html() ;
		var index = str.indexOf('...') ;
		var newStr = str.substring(0,index) ;
		var char_length = 0 ;
		for(var i=0; i<newStr.length;i++){
			var son_str = newStr.charAt(i) ;
			encodeURI(son_str).length > 2 ? char_length += 1 : char_length += 0.5 ;
		}
		var len = Math.ceil(char_length) ;
		same($('.txttruncate').eq(1).attr('data-length')==len,true,'targetElement with data-length="10" should txttruncate the html by data-length') ;
	});
	$('.txttruncate').eq(3).txttruncate();
	test('targetElement with data-width="100" should txttruncate the html by data-width', function(){
		var str = $('.txttruncate').eq(3).html() ;
		var index = str.indexOf('...') ;
		var newStr = str.substring(0,index) ;
		var txtWid = $('.txttruncate').eq(3).attr('data-width') ;
		var txtSize = parseInt($('.txttruncate').eq(3).css('font-size')) ;
		var txtLen = Math.floor(txtWid/txtSize) ;
		var char_length = 0 ;
		for(var i=0; i<newStr.length;i++){
			var son_str = newStr.charAt(i) ;
			encodeURI(son_str).length > 2 ? char_length += 1 : char_length += 0.5 ;
		}
		var len = Math.ceil(char_length) ;
		same(txtLen==len,true,'targetElement with data-width="100" should txttruncate the html by data-width') ;
	});
	$('.txttruncate').eq(4).txttruncate({
		dataFormat : '<span style="color:red">我是自定义的html片段作为截取信息后缀</span>'
	});		
	$('.txttruncate').eq(5).txttruncate();
	$('#setlengthBtn').click(function(){
		$('.txttruncate').eq(1).txttruncate('setlength','20') ;			
		test('with txttruncate(\'setlength\',\'20\') and click setlengthBtn btn should set the data-length attr', function(){
			stop();
			setTimeout(function(){
				same($('.txttruncate').eq(1).attr('data-length') == 20,true,'with txttruncate(\'setlength\',\'20\') and click setlengthBtn btn should set the data-length attr') ;
				start();
			},300) ;
		});
	}) ;
	$('#setformatBtn').click(function(){
		$('.txttruncate').eq(2).txttruncate('setformat','&&&') ;		
		test('with txttruncate(\'setformat\',\'&&&\') and click setformatBtn btn should update the dataFormat attr', function(){
			stop();
			setTimeout(function(){
				same($('.txttruncate').eq(2).html().indexOf('&amp;&amp;&amp;')>-1,true,'with txttruncate(\'setformat\',\'&&&\') and click setformatBtn btn should update the dataFormat attr') ;
				start();
			},300) ;
		});
	}) ;
	$('#setwidthBtn').click(function(){
		$('.txttruncate').eq(3).txttruncate('setwidth','200') ;
		test('with txttruncate(\'setwidth\',\'200\') and click setwidthBtn btn should update the data-width attr', function(){
			stop();
			setTimeout(function(){
				same($('.txttruncate').eq(3).attr('data-width') == 200,true,'with txttruncate(\'setwidth\',\'200\') and click setwidthBtn btn should set the data-width attr') ;
				start();
			},300) ;
		});
	}) ;
	$('#desBtn').click(function(){
		$('.txttruncate').eq(4).txttruncate('destroy') ;
		test('with txttruncate("destroy") and click desBtn btn should clear txttruncate()', function(){
			stop();
			setTimeout(function(){
				same($('.txttruncate').eq(4).html() == defaultTxt,true,'with txttruncate("destroy") and click desBtn btn should clear txttruncate()') ;
				start();
			},300) ;
		});
	}) ;
	$('#setcsswidBtn').click(function(){
		$('.txttruncate').eq(5).txttruncate('setcsswid','40%') ;
		test('with txttruncate(\'setcsswid\',\'40%\') and click setwidthBtn btn should update the data-width attr', function(){
			stop();
			setTimeout(function(){
				same($('.txttruncate').eq(5).attr('style').indexOf('40%') > -1,true,'with txttruncate(\'setcsswid\',\'40%\') and click setcsswidBtn btn should set the width style') ;
				start();
			},300) ;
		});
	}) ;
}) ;