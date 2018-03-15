// tabTest - desc by gaona at 2012-08-24
$(function(){
	test('with tab() and data-tabType=min should add the ui-tabMin class', function(){
		same($('.ui-tab[data-tabType="min"]').hasClass('ui-tabMin'),true,'with tab() and data-tabType=min should add the ui-tabMin class') ;
	});
	test('with tab() and data-tabType=pro should add the ui-tabPro class', function(){
		same($('.ui-tab[data-tabType="pro"]').hasClass('ui-tabPro'),true,'with tab() and data-tabType=min should add the ui-tabPro class') ;
	});
	$('.ui-tab dt').click(function(){
		var $this = $(this) ;
		var $sib = $(this).siblings('dt') ;
		var sibLen = $sib.length ;
		test('with tab() and click should add the active class', function(){
			stop();
			setTimeout(function(){				
				same($this.hasClass('active'),true,'with tab() and click should add the active class') ;
				same($this.hasClass('normal'),false,'with tab() and click should remove the normal class') ;
				var tarId = $this.attr('data-targetId') ;
				same($('#'+tarId).css('display'),'block','the same with data-targetId should show') ;
				for(var i=0; i<sibLen; i++){
					same($sib.eq(i).hasClass('active'),false,'with tab() and click should remove the active class') ;
					same($sib.eq(i).hasClass('normal'),true,'with tab() and click should add the normal class') ;
					var sibId = $sib.eq(i).attr('data-targetId') ;
					same($('#'+sibId).css('display'),'none','the same with data-targetId should hide') ;
				}
				start();
			}, 300) ;
		});
	}) ;
}) ;