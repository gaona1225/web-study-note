/**判断页面是否锁定************/
function adjustLock(){
	if(window.name=='lock'){ //防止页面刷新
		jQuery(".locking").css("display","");
	}
};
//取得名称为name的cookie值 
function indexGetCookie(name) {
    var arg = name + "=";
            var alen = arg.length;
            var clen = document.cookie.length;
            var i = 0;
            while (i < clen) {
                var j = i + alen;
                if (document.cookie.substring(i, j) == arg)
 
                    return indexGetCookieVal(j);
                i = document.cookie.indexOf(" ", i) + 1;
            if (i == 0) break;
        }
        return null;
};
   //取得项名称为offset的cookie值 
function indexGetCookieVal(offset) {
    var endstr = document.cookie.indexOf(";", offset);
    if (endstr == -1)
        endstr = document.cookie.length;
    return unescape(document.cookie.substring(offset, endstr));
};
function openLocking(){
	jQuery(".locking").css("display","");
	$("#d_jcs").css("display","none");
	$(".jc6_jcs").css("display","none");
	$(".jc6ui-jcs").css("display","none");
	$("#unlock").show();
	$(".locking_txt").show();
	$("#unlocking").hide();
	//给锁定位赋值
	window.name='lock';
	//var imageSrc='${loginUser.userImg}';
	//alert(imageSrc);
	jQuery(".login_main .locking_sys .user_photo").css("background-image","url('${ctx}${loginUser.userImg}')");
};

//点击弹出相应的DIV层
function showLoginMethod(){
	jQuery(".locking_method").slideToggle("fast");
};
function showChoiceLanguage(){
	jQuery(".choice_language").slideToggle("fast");
};
//更换登录方式DIV选择单击事件
function getPwd(){
	jQuery(".change_login").html("密码登录");
	$(".locking_method").css("display","none");
};
function getEpass(){
	jQuery(".change_login").html("Epass登录");
	$(".locking_method").css("display","none");
};
//更换语言DIV选择单击事件
function getCnSimple(){
	jQuery(".change_language").html("简体中文");
	$(".choice_language").css("display","none");
};
function getCnTra(){
	jQuery(".change_language").html("繁体中文");
	$(".choice_language").css("display","none");
}
function getEn(){
	jQuery(".change_language").html("English");
	$(".choice_language").css("display","none");
};

function showUnLock(){
	jQuery(".locking_pic").html("解锁");
};
function outUnLock(){
	jQuery(".locking_pic").html("");
};

function goNext(){
	//alert("111");
	$("#lockingPwd").val('');
	$("#unlock").hide();
	$(".locking_txt").hide();
	$("#unlocking").show();
	//var div = $("<input id='lockingPwd' type='password' style='border:1px solid #999999;width:100px;' value='' />");
	//var addbtn = $("<div title='解锁' id='buttondiv' onclick='checkPwd();' onmouseover='javascript:unlockhover();' onmouseout='javascript:unlockleave();' style='width:42px; height:42px; position:absolute; top:8px; left:200px; font-size:12px; background:url(../images/finallogin/unlock-btn.png); background-position:0 0; cursor:pointer;'></div>");
	//var addbtn = $("<div id='buttondiv'><input type='button' class='buttonActive' data-width='standard' value='确定' onclick='checkPwd();' onmouseover='javascript:unlockhover();'/></div>");
	//var addbtn = $("<input id='buttondiv' type='button'lass='buttonAvtive' data-width="standard" value='确定'/>");
	//$(".locking_txt").html("解锁密码:<br/>");
	//$(".locking_txt").append(div);
	//$(".locking_txt").append(addbtn);
	//alert(window.name);
	document.getElementById('lockingPwd').focus();
	document.onkeydown=function(event){e = event ? event :(window.event ? window.event : null);if(e.keyCode==13){ checkPwd();}};
};
//锁定状态通过ajax获取密码
function checkPwd(){
	var userName="${loginUser.accounts }";
	var pwd = $("#lockingPwd").val();
	if(pwd != ""){
		$.ajax({
			url: "${ctx}/adm/login!login.action",
			type: "POST",
			data: "accounts="+userName+"&password="+pwd,
			success:function(obj) {
			    if(obj.success=='1'){//login successfully
			    	//隐藏锁定层
					$(".locking").css("display","none");
					window.name='';
					document.onkeydown=function(event){e = event ? event :(window.event ? window.event : null);if(e.keyCode==13){ return false;}};
					$(".jc6_jcs").css("display","");
					$("#d_jcs").css("display","");
					//$(".jc6ui-jcs").css("display","");
			    }else{
			    	//登录验证失败
			    	$(window.top.document.body).stateBox({
						state: "alert",     							
						content: obj.msg, //"密码错误,请重新输入!",
						corner: true
		  				});
			    }
			}
		});	
	}else{
		$(window.top.document.body).stateBox({
			state: "alert",     							
			content: "密码错误,请重新输入!",
			corner: true
		});
	}
	//恢复成以前的'您的系统正在锁定中'
	$(".locking_txt").html("您的系统正在锁定中");
	$(".locking_txt").children().eq(0).remove();
	$(".locking_txt").children().eq(1).remove();
};

function cancelUnlock(){
	$("#unlock").show();
	$(".locking_txt").show();
	$("#unlocking").hide();
};

//解锁btn样式hover
function unlockhover(){
	$("#buttondiv").css({
		'width':'42px', 
		'height':'42px', 
		'position':'absolute', 
		'top':'8px', 'left':'200px', 'font-size':'12px', 
		'background':'url(../images/finallogin/unlock-btn.png)', 
		'background-position':'0 -42px'
	});
};
function unlockleave(){
	$("#buttondiv").css({
		'width':'42px', 'height':'42px', 'position':'absolute', 
		'top':'8px', 'left':'200px', 'font-size':'12px', 
		'background':'url(../images/finallogin/unlock-btn.png)', 
		'background-position':'0 0'
	});
};
$(function(){
	$(".locking").css("display","none");
	$(".login_loading").css("display","none");
	$(".locking_method").css("display","none");
	$(".locking_choice_language").css("display","none");
	$("#unlocking").hide();
	adjustLock();
});