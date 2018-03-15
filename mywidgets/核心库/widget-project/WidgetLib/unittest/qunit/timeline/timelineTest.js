// timelineTest - desc by gaona at 2012-12-27
$(function(){
	var navDateAry = ["2012.8.30", "2012.8.31", "2012.9.1", "2012.9.2"] ;
	var contentAry = ["2012.8.30-(1)", "2012.8.31(2)", "2012.9.1(3)", "2012.9.2(4)"] ;
	$("#timeline").timeline({
        navDate:navDateAry,
        content:contentAry,
		width:500,
		height:200
    });
	test('with timeline() should create some dom element', function(){
		same($('#timeline').find('div.ui-timeline-nav').length,1,'with timeline() should create the ui-timeline-nav class div children element') ;
		same($('#timeline').find('div.ui-timeline-nav').find('ul').length,1,'with timeline() should create ul children with the ui-timeline-nav class div') ;
	});
	test('with timeline({navDate:navDateAry}) should create some dom element and set some css or attr', function(){
		var liTar = $('#timeline').find('div.ui-timeline-nav').find('ul>li') ;
		var liLen = $(liTar).length ;
		same($(liTar).length,navDateAry.length,'with timeline({navDate:navDateAry}) should create the same length li with the length of navDate') ;
		for(var i=0; i<liLen;i++){
			same($(liTar).eq(i).find('span.content').length,1,'with timeline({navDate:navDateAry}) should create the content class span children') ;
			same($(liTar).eq(i).find('span.content').find('img').length,1,'with timeline({navDate:navDateAry}) should create img children element of the content class span') ;
			same($(liTar).eq(i).find('span.content').find('em').length,1,'with timeline({navDate:navDateAry}) should create em children element of the content class span') ;
			same($(liTar).eq(i).find('span.content').find('em').html(),'','with timeline({navDate:navDateAry}) should create blank em children element of the content class span') ;
			same($(liTar).eq(i).find('span.content').find('b').length,1,'with timeline({navDate:navDateAry}) should create b children element of the content class span') ;
			same($(liTar).eq(i).find('span.content').find('b').html(),navDateAry[i],'with timeline({navDate:navDateAry}) should create b children element of the content class span and the innerHTML of b tag is navDateAry[i]') ;
			same($(liTar).eq(i).attr('data-key'),navDateAry[i],'with timeline({navDate:navDateAry}) should add data-key attr and the value of it is navDateAry[i]') ;
		}
	});
	test('with timeline({content:contentAry}) should create some dom element and set some css or attr', function(){
		same($('#timeline').find('ul.ui-timeline-content').length,1,'with timeline({content:contentAry}) should create the ui-timeline-content class ul children element') ;
		var liTar = $('#timeline').find('ul.ui-timeline-content>li') ;
		var liLen = $(liTar).length ;
		same($(liTar).length,contentAry.length,'with timeline({content:contentAry}) should create the same length li with the length of contentAry') ;
		for(var i=0; i<liLen;i++){
			same($(liTar).eq(i).html(),contentAry[i],'with timeline({content:contentAry}) should create the innerHTML of li tag is contentAry[i]') ;
		}
	});
	test('with timeline({width:500,height:200}) should create some dom element and set some css or attr', function(){
		same($('#timeline').width(),500,'with timeline({width:500}) should set the width of the timeline id div element') ;
		same($('#timeline').height(),200,'with timeline({height:200}) should set the height of the timeline id div element') ;
	});
	
	var clickLi = $('#timeline').find('div.ui-timeline-nav').find('ul>li') ;
	var clickLen = $(clickLi).length ;
	$(clickLi).click(function(){		
		var $this = $(this) ;
		var index = $this.index() ;
		test('with timeline() and click target li should add class and change show content', function(){
			stop();
			setTimeout(function(){
				same($this.hasClass('selected'),true,'with timeline() and click target li it is should add the selected class') ;
				same($this.siblings('li').hasClass('selected'),false,'with timeline() and click target li the siblings of it should remove the selected class') ;
				same($('#timeline').find('ul.ui-timeline-content>li').eq(index).hasClass('current'),true,'with timeline() and click target li the eq index with the children li of the ui-timeline-content class ul should add the current class') ;
				for(var i=0; i<clickLen; i++){
					if(i != index){
						same($('#timeline').find('ul.ui-timeline-content>li').eq(i).hasClass('current'),false,'with timeline() and click target li the not eq index with the children li of the ui-timeline-content class ul should remove the current class') ;
					}
				}
				start();
			},300) ;
		});
	}) ;
	
	$('#btn').click(function(){
		$("#timeline").timeline('destroy') ;
		test('with timeline(\'destroy\') should clean up the dom element', function(){
			same($('#timeline').children().length,0,'with timeline(\'destroy\') should clean up the dom element') ;
		});
	}) ;
}) ;