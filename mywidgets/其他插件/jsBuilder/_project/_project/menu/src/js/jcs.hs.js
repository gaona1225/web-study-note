/**
 * modified zhangwq 2011-10-12
 * 应用-添加应用及时搜索高亮锚
 */
$(function(){
/**
 * (1)锚:span/a;a/a
 * (2)scrollTo
 * (3)scrollTop
 * (4)#重复搜索的问题 如果两次搜索的内容一致就不响应@添加自定义属性存储历史选择data-oldText
 * (5)#如果搜索关键字为空 则初始化
 */
/***********应用 菜单搜索注册开始***************************************/
var $sInput = $('#jcsUISearch');
var hash_href = '';/*已搜索标识*/
var scrollDomObj = document.getElementById('allApp');
function hsTop(hash_id){
	if(hash_id){
		scrollDomObj.scrollTop = 0;//需要重置-否则在已滚动到下方定位到上方隐藏菜单时出现问题
		var fx_top = parseInt(($('#'+hash_id).offset().top - $(scrollDomObj).offset().top),10)-10;
		fx_top = fx_top>0?fx_top:0;
		scrollDomObj.scrollTop = fx_top;
	}else {
		scrollDomObj.scrollTop = 0;
	} 	
}
function jcsHighLight(){
	var keyword = $.trim($sInput.val());
	var oldText = $sInput.attr('data-oldText');
	if(oldText != 'jh' && oldText === ('jh'+keyword) ){
		return;
	}
    var regexp = new RegExp("("+keyword+")");
    var firstFlag = 0;
    if(hash_href != ''){
    	var $matchCon = $("div#allApp").find(">div.all_menu_item");
	    var $matchObj = $matchCon.find(">div.jcs_all_menu_h1>h1,>div.jcs_all_menu_var>h2,>div.jcs_all_menu_var>ul>li>label");
    	$matchObj.find('>font').each(function(){
    		var $this = $(this);
    		$this.parent().html($this.parent().text());
    	});
    	hash_href = '';
    	//hsTop();//#重复搜索时不将滚动条重置-否则会执行两次-造成显示闪烁效果
    }
    if(keyword != ""){
    	$sInput.attr('data-oldText','jh'+keyword);
        $("div#allApp").find(">div.all_menu_item").each(function(){//#缓存
			var $this = $(this);
			if(!$this.is(":hidden")){
				$this.find(">div.jcs_all_menu_h1>h1,>div.jcs_all_menu_var>h2,>div.jcs_all_menu_var>ul>li>label").each(function(index){
					var $match = $(this);
					var _text = $match.text();
					if(regexp.test(_text)){
		                if(firstFlag == 0){
							hash_href = $match.siblings("a").attr("id");
		                	firstFlag = 1;
		                	$match.html(_text.replace(regexp,'<font class="one_menu_s">$1</font>'));
		                }else if(firstFlag == 1){
							$match.html(_text.replace(regexp,'<font class="rest_menu_s">$1</font>'));													                	
		                }
					}	
				});	
			}
		});
	}
	if(hash_href != ''){ 
		//window.location.hash = hash_href;
		hsTop(hash_href);
	}else{
		//#初始化
		$sInput.attr('data-oldText','jh');
		hsTop();
	} 
};
$sInput.minSearch({
    btnClick:function() {
    	jcsHighLight();    
    }
});
$sInput.bind('keydown',function(e){
	if(e.keyCode == 13){
		jcsHighLight();
	}
});
/***********应用 菜单搜索注册结束***************************************/
});