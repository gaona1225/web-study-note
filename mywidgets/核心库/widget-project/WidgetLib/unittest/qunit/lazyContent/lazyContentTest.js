// lazyContentTest - desc by gaona at 2012-12-28
$(function(){
	var loadSrc = 'images/lazyContent/loading.gif' ;
	$('#navCon2').lazyContent({
		mode:'0' ,
		el:'#con2' ,
		dataElem:':button' ,
		dataType:'html' ,
		renderType:'hand' ,
		render:function(data) {
		  return data + (new Date).getTime() + 'abccba' ;
		},
		loading:loadSrc
	});
	$('#navCon2 input:button').click(function(){
		setTimeout(function(){
			stop() ;
			test('with formatImage(el:\'#con2\',dataElem:\':button\',loading:loadSrc) and click the button should create some dom and set some attr', function(){
				same($('#con2').find('img').length,1,'with formatImage(el:\'#con2\',dataElem:\':button\',loading:loadSrc) and click the button should create the img children element') ;
				same($('#con2').find('img').attr('alt'),'加载中...','with formatImage(el:\'#con2\',dataElem:\':button\',loading:loadSrc) and click the button should set alt atr and the value of it is 加载中...') ;
				same($('#con2').find('img').attr('data-placeHolder'),'loading','with formatImage(el:\'#con2\',dataElem:\':button\',loading:loadSrc) and click the button should set data-placeHolder atr and the value of it is loading') ;
				same($('#con2').find('img').attr('src'),loadSrc,'with formatImage(el:\'#con2\',dataElem:\':button\',loading:loadSrc) and click the button should set src atr and the value of it is same of loadSrc') ;
			});
			start() ;
		},300) ;
	}) ;
	$('#nav2>li').lazyContent({
		el:'.item_con',
		timeout:200,
		event:'customeName',
		loading:loadSrc
	 });
	 var psedoTimer = 0;
	 $('#loadAjax2').bind('click',function(){
		 var $targetLi = $('#nav2>li');
		 var len = $targetLi.length;
		 if(psedoTimer < len && psedoTimer >= 0){
		  	 $targetLi.eq(psedoTimer++).trigger('customeName');
			 setTimeout(function(){
				stop() ;
				test('with formatImage() and click the button should create some dom and set some attr', function(){
					same($('.item_con').eq(psedoTimer-1).find('img').length,1,'with formatImage() and click the button should create the img children element') ;
					same($('.item_con').eq(psedoTimer-1).find('img').attr('alt'),'加载中...','with formatImage() and click the button should set alt atr and the value of it is 加载中...') ;
					same($('.item_con').eq(psedoTimer-1).find('img').attr('data-placeHolder'),'loading','with formatImage() and click the button should set data-placeHolder atr and the value of it is loading') ;
					same($('.item_con').eq(psedoTimer-1).find('img').attr('src'),loadSrc,'with formatImage() and click the button should set src atr and the value of it is same of loadSrc') ;
				});
				start() ;
			},300) ;
		 }else{
		     psedoTimer = 0;
		 }
	 });
}) ;