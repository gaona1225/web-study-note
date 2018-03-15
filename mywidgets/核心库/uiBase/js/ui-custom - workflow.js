/*---workflow---*/
$(function(){
	//setIframeHei() ;
	$('.popWin').live('click',function(){
		winPop(this) ;
	}) ;
	$('.delBtn').live('click',function(){
		window.confirm('您确定要删除此流程') ;
	}) ;
	$('.cooksaveBtn').live('click',function(){
		window.confirm('占时保存此流程');
	}) ;
	//搜索
	$(".minSearch").minSearch({
        width:"150px",
        btnClick:function(){},
        onFocus:function(){},
        onBlur:function(){}
     });
	 //选中组织架构高亮
	 $('.frameUL_list li').hover(function(){
	 	$(this).addClass('highlight') ;	
	 },function(){
	 	$(this).removeClass('highlight') ;
	 }) ;
	 
	$('.frameUL_list span img').live('click',function(){
		$(this).parents('li').remove() ;
	}) ;
	
	//设置组织架构高度
	setFrameHeight() ;
	$(window).resize(function(){
		setFrameHeight() ;
	});
	function setFrameHeight(){
		var aviHei = document.body.offsetHeight - $('.listTitle').height() - $('.toolbar').height() - 40 ;
		$('.frame_list').height(aviHei) ;
	}
}) ;
/*---自适应iframe高度---*/
/*function setIframeHei(){
	
}*/

/*弹窗设置*/
function winPop(obj){
	var	openSrc = $(obj).attr('userHref') ;
	var openWinName = '' ;
	var openWid = 730 ;
	var openHei = 600 ;
	var	openX = document.body.scrollWidth/4 ;
	var	openY = document.body.scrollHeight/4 ;
	var openPara = 'width=' + openWid + ',height=' + openHei + ',top=' + openY + ',left=' + openX + ',scrollbars=yes' ;
	window.open(openSrc,openWinName,openPara) ;
}