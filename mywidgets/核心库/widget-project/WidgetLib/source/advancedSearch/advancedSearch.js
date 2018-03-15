/**
* advancedSearch
*/
function loc_adv_s(){
	var $jc_s = $("#jcsearchDiv");
	var _jcs_offset = $jc_s.offset();
	var $adv_s = $("#searchAdvanceCon");
	var $adv_a = $('#jcs_search_a');
	$adv_a.live('click',function(){
		if($adv_s.css('display') == 'none'){
			$("#searchAdvanceCon").css({
				"display":"block",
				"position":"absolute",
				"z-index":"1987"
			});
			setTimeout(function(){
				$adv_s.slideUp() ;
			},3000) ;
		}else{
			$("#searchAdvanceCon").hide();
		}
	});
}

$(function(){
	loc_adv_s();
	$("div#searchAdvanceCon div").live("click",function(e){
		var $newClass = $(this).find("span").attr("class");
		$("#searchTypeIco").attr("class",$newClass).css("float","left");
		$("#jcs_search_a span.jcs_common_s_mei").attr("id","jcs-common-search_"+$(this).index()).attr("searchType",$(this).index());
		$("#searchAdvanceCon").hide();
		$("#jcs_mei_s").focus();
	});
});
$(window).resize(function(){
	loc_adv_s();
});

(function($){ 
	$.fn.advancedSearch = function(options){  
		var defaults = {
			btnClick:function(){},
			onFocus:function(){},
			width:"100%"
		}
		//判断是否清除插件 2012-03-09 desc by gaona
		if(options != 'destory'){
			var options = $.extend(defaults, options); 
			this.each(function(){ 
				var $this = $(this);
				var $jcs_common_search_body = $("<div class='jcs_common_search_con'></div>");
				var $jcs_common_search_con = $("<a id='jcs_search_a'><span class='jcs_common_s_ico' id='searchTypeIco'></span><span class='jcs_common_s_mei' id='jcs-common-search_0'></span></a>")
				var $jcs_common_search_advanced = $("<input type='text' id='jcs_mei_s' style='width:"+options.width+";'/>")
				var $jcs_common_search_right =$("<span class='jcs_common_search'></span>")
				var $onClick = options.btnClick;
				var $onFocus = options.onFocus;
				var _focus = false;	
				//desc by gaona 2012-03-09 判断是否已经创建dom元素开始  
				if($this.attr('data-destory')!='true'){
					$this.wrap($jcs_common_search_body) ;
					$this.attr('data-dom','true') ;
				}else{
				}
				//desc by gaona 2012-03-09 判断是否已经创建dom元素结束
				$this.before($jcs_common_search_con).after($jcs_common_search_right)
					 .focus(function(){
						 $onFocus();
						 _focus = true;
						 document.onkeydown = function(e){
							 var ev = document.all ? window.event : e;
							 if(ev.keyCode==13) {
								 $onClick();
							 }
						 }
					})
			}); 
		}else{
			//desc by gaona 2012-03-09 添加销毁事件开始
			if($(this).attr('data-dom') == 'true'){
				$(this).parents('.jcs_common_search_con').children('a').remove() ;
				$(this).parents('.jcs_common_search_con').children('span').remove() ;
				$(this).unwrap() ;
			}
			$(this).attr('data-dom','false') ;
			//desc by gaona 2012-03-09 添加销毁事件结束
		}
 }; 
 $.extend($.fn.advancedSearch, {
	version: "1.2"
 });
})(jQuery); 
 