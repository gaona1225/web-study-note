$(function(){
	//选择布局模板
	$('#choiceLayout').change(function(){
		var ly12 = '<div class="divLay-header">header</div><div class="divLay-content"><div class="divLay-left">left</div><div class="divLay-right">right</div></div>' ;
		var ly121 = '<div class="divLay-header">header</div><div class="divLay-content"><div class="divLay-left">left</div><div class="divLay-right">right</div></div><div class="divLay-footer">footer</div>' ;
		var ly13 = '<div class="divLay-header">header</div><div class="divLay-content"><div class="divLay-left-3">left</div><div class="divLay-middle-3">middle</div><div class="divLay-right-3">right</div></div>' ;
		var ly131 = '<div class="divLay-header">header</div><div class="divLay-content"><div class="divLay-left-3">left</div><div class="divLay-middle-3">middle</div><div class="divLay-right-3">right</div></div><div class="divLay-footer">footer</div>' ;		
		var selectVal = $(this).val() ;
		$('.divLayout').empty().append(eval('ly'+selectVal)) ;
	}) ;
	//设置div属性
	$('.divLayout div').live('click',function(event){
		target = event.target ;
		var inputElem = $('.attr-div').find('input:text') ;
		var inputLen = $(inputElem).length ;
		for(var i=0; i<inputLen;i++){
			var cssAtt = $(inputElem).eq(i).parent('td').attr('data-flag') ;
			$(inputElem).eq(i).val($(target).css(cssAtt)) ;
		}
		$('.attr-div').css('display','block') ;
		$('#setAtt,#closeAtt').click(function(){
			for(var i=0; i<inputLen;i++){
				var cssAtt = $(inputElem).eq(i).parent('td').attr('data-flag') ;
				$(target).css(cssAtt,$(inputElem).eq(i).val()) ;
			}
			$('.attr-div').css('display','none') ;
		}) ;
	}) ;
	//获取布局代码
	$('#setHTML').live('click',function(){
		//var fileHref = $('link').eq(1).attr('href') ;
		if($.browser.msie){
			var fso = new ActiveXObject("Scripting.FileSystemObject") ;
			var f1 = fso.OpenTextFile('d:\\mhtml5.txt') ; 
			alert(f1.ReadAll()) ;
		}else{
		}		
		var showcss = '<pre>' + $('style').html() + '</pre>' ;
		$('.showHTML').css('display','block') ;
		var showhtml = '<body><div class="divLayout">' + $('.divLayout').html() + '</div></body>' ;
		$('.showCSS').html(showcss) ;
		$('.showDiv').text(showhtml) ;
	}) ;  
	$('#closeHTML').click(function(){
		$('.showHTML').css('display','none') ;
	}) ;
}) ;