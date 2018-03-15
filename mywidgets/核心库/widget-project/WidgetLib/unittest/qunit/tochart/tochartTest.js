// tochartTest - desc by gaona at 2012-12-25
$(function(){
	$('.tochart').eq(0).tochart({
		type : 'bar'
	}) ;
	test('with tochart() should create some dom element and set some attr or css', function(){
		var tarElem = $('.tochart').eq(0) ;
		same($(tarElem).next('div.visualize').length,1,'with tochart() should create the visualize class div siblings element') ;
		same($(tarElem).next('div.visualize').find('ul.visualize-labels-x').length,1,'with tochart() should create the visualize-labels-x class ul child element') ;
		same($(tarElem).next('div.visualize').find('ul.visualize-labels-y').length,1,'with tochart() should create the visualize-labels-y class ul child element') ;
		same($(tarElem).next('div.visualize').find('canvas').length,1,'with tochart() should create the canvas child element') ;
		same($(tarElem).next('div.visualize-bar').length,1,'with tochart() should create the visualize-bar class div siblings element') ;
		same($(tarElem).next('div.visualize').width(),$(tarElem).width(),'with tochart({width:null}) should the same width with tarElem') ;
		same($(tarElem).next('div.visualize').height(),$(tarElem).height(),'with tochart({height:null}) should the same width with tarElem') ;
	});
	$('.tochart').eq(1).tochart({
		type:'area' ,
		width : 480 ,
		height :300
	}) ;
	test('with tochart({width:480,height:300}) should set width/height of the visualize class div is 480/300', function(){
		same($('.tochart').eq(1).next('div.visualize').width(),480,'with tochart({width:480}) should set width of the visualize class div is 480') ;
		same($('.tochart').eq(1).next('div.visualize').height(),300,'with tochart({height:480}) should set height of the visualize class div is 300') ;
	}) ;
	$('.tochart').eq(2).tochart({
		type : 'line'
	}) ;
	$('.tochart').eq(3).tochart({
		type : 'pie' , 
		pieMargin : 10 , 
		title : '2009 Total Sales by Individual'
	}) ;
	$('#createbutton').click(function(){
		$('.tochart').eq(0).tochart({}) ;
		test('with tochart({}) and click createbutton btn should tochart again and should delete the old dom which is created', function(){
			same($('.tochart').eq(0).next('div.visualize').length,1,'with tochart({}) and click createbutton btn should tochart again and should delete the old dom which is created') ;
		});
	}) ;
	$('#updatebutton').click(function(){
		$('.tochart').eq(1).tochart({type:'line'}) ;
		test('with tochart({type:\'line\'}) and click updatebutton btn should tochart again and should delete the old dom which is created', function(){
			same($('.tochart').eq(1).next('div.visualize').length,1,'with tochart({type:\'line\'}) and click updatebutton btn should tochart again and should delete the old dom which is created') ;
			same($('.tochart').eq(1).next('div.visualize-area').length,0,'with tochart({type:\'line\'}) and click updatebutton btn should delete the visualize-area class of div siblings element') ;
			same($('.tochart').eq(1).next('div.visualize-line').length,1,'with tochart({type:\'line\'}) and click updatebutton btn should create the visualize-line class of div siblings element') ;
		});
	}) ;
	$('#destorybutton').click(function(){
		$('.tochart').eq(2).tochart('destroy') ;
		test('with tochart(\'destroy\') should remove some dom', function(){
			same($('.tochart').eq(2).next('div.visualize').length,0,'with tochart(\'destroy\') should remove the visualize class div') ;
		});
	}) ;
}) ;