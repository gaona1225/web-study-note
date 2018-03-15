// menuListTest - desc by gaona at 2012-08-16
$(function(){
	$('.menuList').menuList({
		json:"json.json",
		listId:"aa",
		fn:function(){
			$("#aa").live("click",function(event){
				if($(event.target).is("li")){
					//alert("你点击ID是: "+$(event.target).attr("id"));
				}
			});
		}
	}) ;
	$('ul').css('padding-left','0px') ;
	test('every input with menuList() should create some dom', function(){
		var tarElem = $('.menuList') ;
		var tarLen = tarElem.length ;
		for(var i=0; i<tarLen; i++){
			same(tarElem.eq(i).siblings('div.ui-menuList').length,1,'every input with menuList() should have the ui-menuList class div siblings') ;
			same(tarElem.eq(i).siblings('div.ui-menuList').css('display'),'none','every the ui-menuList class div siblings should have display is none') ;
			same(tarElem.eq(i).siblings('div.ui-menuList').find('ul').length,1,'every the ui-menuList class div siblings should have ul children') ;
			same(tarElem.eq(i).siblings('div.ui-menuList').find('li').length>0,true,'every the ui-menuList class div siblings should have ul children') ;
		}
	});
	
	$('.menuList').click(function(){
		var $this = $(this) ;
		test('click every input make the ui-menuList class div siblings show', function(){
			same($this.siblings('div.ui-menuList').css('display'),'block','click every input next of its the ui-menuList class div siblings should have display is block') ;
		});
	}) ;
	
	document.onclick = function(){
		var tarElem = $('div.ui-menuList') ;
		var tarLen = tarElem.length ;
		test('click others blank make the ui-menuList class div siblings hide', function(){
			for(var i=0; i<tarLen; i++){
				same(tarElem.eq(i).css('display'),'none','every the ui-menuList class div siblings should have display is none') ;
			}
		});
	} ;
	
	test('every div with menuList("destroyMenuList") should remove some dom', function(){
		$('#testInput').menuList('destroyMenuList');
		same($('#testDiv').siblings('div.ui-menuList').length,0,'every div with menuList("destroyMenuList") should remove the ui-menuList class div siblings');
	});
}) ;