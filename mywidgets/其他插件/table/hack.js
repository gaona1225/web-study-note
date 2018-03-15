// JavaScript Document hack.js
$(function(){
	if($.browser.msie && $.browser.version == 6){
		$('.table tbody td:first-child,.table tbody td:nth-child(2),.table tbody td:last-child').css('text-align','center').css('padding-left','0px') ;
	}
	$('.table tbody tr:odd').addClass('odd') ;
}) ;