// JavaScript Document
$(function(){
	var addcompElem = '<div class="diary-addcompElem"><div class="diary-addcompElemPic"><img src="default_head_picture.png" alt="头像"/></div><div class="diary-addcompElemClose"><img src="btn_Cancle.gif" alt="删除"/></div><div class="diary-addcompElemName">王芳</div><div class="diary-addcompElemTime"><input type="text" onFocus="WdatePicker()" value="2012-05-03" readonly /></div></div>' ;
	showAddPer() ;
	$('.addComp').click(function(){
		$('.diary-addcomp').show() ;
	}) ;
	$('.minComp').click(function(){
		var minPic = 'diary-addcomOpe-min.png' ;
		var maxPic = 'diary-addcomOpe-max.png' ;
		var isshow = $('.diary-addContent').css('display') ;
		var targetImg = $(this).find('img') ;
		if(isshow == 'block'){
			$('.diary-addContent').css('display','none') ;
			$(targetImg).attr('src',maxPic) ;
		}else{
			$('.diary-addContent').css('display','block') ;
			$(targetImg).attr('src',minPic) ;
		}
	}) ;
	$('.closeComp').click(function(){
		$('.diary-addcomp').hide() ;
	}) ;
	$('.diary-addcompElemClose img').live('click',function(){
		$(this).parents('.diary-addcompElem').remove() ;
		showAddPer() ;
	}) ;
	$('.addcomPer').click(function(){
		$('.personList').show() ;
	}) ;
	$('#compareBtn').click(function(){
		window.open('diarycomp.html') ;
	}) ;
	$('.cleanAllPer').click(function(){
		var person = $('.diary-addcompElem') ;
		var personLen = $(person).length ;
		for(var i=0; i<personLen; i++){
			$(person).eq(i).remove() ;
		}
		showAddPer() ;
	}) ;
	$('#okBtn').click(function(){
		$('.diary-addcompOpe').before(addcompElem) ;
		$('.personList').hide() ;
		showAddPer() ;
	}) ;
	$('#cancelBtn').click(function(){
		$('.personList').hide() ;
	}) ;
	function showAddPer(){
		var person = $('.diary-addcompElem') ;
		var personLen = $(person).length ;
		if(personLen<5){
			$('.addcomPerPic img').css('display','inline-block') ;
		}else{
			$('.addcomPerPic img').css('display','none') ;
		}
	}
	
	/*日记对比*/
	/*$('.diarycompCont').scrollBar({});	*/
	var addPerMsg = '<div class="diarycompElem"><div class="diarycompElemTit"><div class="diarycompElemTime"><img src="left.png"/><input type="text" onFocus="WdatePicker()" value="2012-05-03" readonly/><img src="right.png"/></div><div class="diarycompElemClose"><img src="close.gif" alt="关闭"/></div></div><div class="diarycompElemPer"><div class="diarycompElemPerPic"><img src="default_head_picture.png" alt="对比人员头像"/></div><div class="diarycompElemPerMsg"><a href="#">王芳</a><img src="diarycompchangePer.png" alt="切换人员"/></div></div><div class="diarycompElemMsg"><p class="pTitle">今日工作：</p><p class="pMsg">修改手机端视角与服务器不一致，新发寻呼和流程体系的不及时问题；</p><p class="pTitle paddTitle">明日计划：</p><p class="pMsg">与武汉同事讨论确定jcs3.1公文管理任务进度的制定</p></div><div class="diarycompElemOpe"><input type="button" class="buttonActive" value="批示"/></div></div>' ;
	var changePerList = '<div class="diarycompchangePer"><div class="diarycompElemTit"><p class="changePerListTit">所有人员</p><p class="changePerListAtt"><a href="#">只看关注</a></p></div><div class="diarycompElemPerList"><img src="personList.png" alt="人员列表"/></div><div class="diarycompElemOpe"><input type="button" class="buttonActive" value="确定" id="dcomokbtn"/><input type="button" class="buttonPro" value="取消" id="dcomcancelbtn"/></div></div>' ;
	showAddPerList() ;
	$('.diarycompElemClose img').live('click',function(){
		$(this).parents('.diarycompElem').remove() ;
		showAddPerList() ;
	}) ;
	$('.diarycompElemPerMsg img').live('click',function(){
		var targetObj = $(this).parents('.diarycompElem') ;
		$(targetObj).after(changePerList) ;
		$(targetObj).css('display','none') ;
		$('.buttonActive').buttonActive();
		$('.buttonPro').buttonPro();
		$('#dcomokbtn').click(function(){
			$('.diarycompchangePer').remove() ;
			$(targetObj).css('display','block') ;
			showAddPerList() ;
		}) ;
		$('#dcomcancelbtn').click(function(){
			$('.diarycompchangePer').remove() ;
			$(targetObj).css('display','block') ;
			showAddPerList() ;
		}) ;
	}) ;
	
	$('.diarycompElemAdd img').live('click',function(){
		var targetObj = $(this).parents('.diarycompElemAdd') ;
		$(targetObj).empty() ;
		$(targetObj).append('<img src="personList.png" alt="人员列表"/>') ;
		$(targetObj).next('.diarycompElemOpe').append('<input type="button" class="buttonActive" value="确定" id="dcomAddokbtn"/><input type="button" class="buttonPro" value="取消" id="dcomAddcancelbtn"/>') ; ;
		$('.buttonActive').buttonActive();
		$('.buttonPro').buttonPro();
		$('#dcomAddokbtn').click(function(){
			$(targetObj).empty() ;
			$(targetObj).next('.diarycompElemOpe').empty() ;
			$(targetObj).append('<img src="diary-addcomPer.png" alt="添加人员"/>') ;
			$('.diarycompElemAddPer').before(addPerMsg) ;
			$('.buttonActive').buttonActive();
			/*$('.diarycompCont').scrollBar({});	*/
			showAddPerList() ;
		}) ;
		$('#dcomAddcancelbtn').click(function(){
			$(targetObj).empty() ;
			$(targetObj).next('.diarycompElemOpe').empty() ;
			$(targetObj).append('<img src="diary-addcomPer.png" alt="添加人员"/>') ;
		}) ;
	}) ;
	
	function showAddPerList(){
		var person = $('.diarycompElem') ;
		var personLen = $(person).length ;
		if(personLen<5){
			$('.diarycompElemAddPer').css('display','inline-block') ;
		}else{
			$('.diarycompElemAddPer').css('display','none') ;
		}
	}
}) ;