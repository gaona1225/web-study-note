/**
 * modified zhangwq 2011-10-12
 * 应用-添加应用及时搜索高亮锚
 */
$(function(){
/**
 * 锚:span/a;a/a
 */
/***********应用 菜单搜索注册开始***************************************/
var $sInput = $('#jcsUISearch');
var hash_href = '';/*已搜索标识*/
function jcsHighLight(){
	var keyword = $.trim($sInput.val());
    var regexp = new RegExp("("+keyword+")");
    var firstFlag = 0;
    var $matchCon = $("div#allApp").find(">div.all_menu_item");
    var $matchObj = $matchCon.find(">div.jcs_all_menu_h1>h1,>div.jcs_all_menu_var>h2,>div.jcs_all_menu_var>ul>li>label");
    if(hash_href != ''){
    	$matchObj.find('>font').each(function(){
    		var $this = $(this);
    		$this.parent().html($this.parent().text());
    	});		
    	hash_href = '';
    }
    if(keyword != ""){
        $matchCon.each(function(){
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
		window.location.hash = hash_href;
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