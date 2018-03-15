// JavaScript Document
$(function(){	
	//初始化编辑器各元素高度
	/*var staticNum = 20 ;
	alert(document.body.scrollHeight) ;
	var devMainHei = document.body.scrollHeight - $('.dev_top').height() - $('.dev_top').height() - staticNum ;
	$('.dev_main').height(devMainHei) ;*/
	
	$('.dev_top').click(function(event){
		var target = event.target ;
		var targetID = $(target).attr('data-id') ;
		var flagParam = $('.editmain').attr('data-create') ;
		$('.editTit').html($(target).html()) ;
		$('.editcontent').hide() ;
		//读取xml
		$.get('dev.xml',function(data){
			var showId = $(data).find('userid') ;
			var userFun = $(data).find('userfun') ;
			var showDom = $(data).find('userdom') ;
			var editDom = $(data).find('editdom') ;
			var editFun = $(data).find('editfun') ;
			var xmlLen = showId.length ;
			for(var i=0; i<xmlLen; i++){
				if(showId.eq(i).html() == targetID){
					$('.dev_left').append(showDom.eq(i).html()) ;
					if(!flagParam){
						$('.editmain').append(editDom.eq(i).html()) ;
					}	
					$('.editmain').attr('data-create','true') ;	
					var targetFun = userFun.eq(i).html() ;
					var editFun = editFun.eq(i).html() ;
					eval(targetFun) ;
					eval(editFun) ;
				}
			}
		}) ;
	}) ;
	$('.showElem').live('click',function(event){
		var target = event.target ;
		var closeDom = '<div class="del"><a href="#" title="Remove" class="icon-close"></a></div>' ;
		$('.editcontent').show() ;
		var closeWid =  $(target).width() + 'px' ;
		var closeHei =  parseInt($(target).height())/2 + $(target).offset().top + 'px' ;
		var closeBtnLen = $(this).siblings('.del').length ;
		if(closeBtnLen>0){
			$(this).siblings('.del').remove() ;
		}
		$(this).after(closeDom) ;
		$('.del').css({
			'left':closeWid ,
			'top':closeHei
		}) ;
		$('.del').live('click',function(){
			$(this).remove() ;
			$(target).parents('.showElem').remove() ;
			$('.editcontent').hide() ;
		}) ;
	}) ;
}) ;