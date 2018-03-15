// JavaScript Document help
$(function(){
	//隐藏帮助视图
	function helpHide(){
		$("#helpCon").hide() ;
		$("#help-content").attr("class","help-1");
		//showNotifications('image/notificationIcon.png','帮助','开启了桌面通知功能！',2000);
	}
	//显示帮助视图
	function helpShow(){
		$("#helpCon").show(300);
	}
	//处理帮助序列
	$("#help-content").click(function(){
		var $this = $(this);
		var $attr = $this.attr("class");
		var i = parseInt($attr.slice(5),10);
		if(i < 5){
			i++;
			$this.fadeOut(300,function(){
				$this.attr("class","help-" + i).fadeIn(300);
			});
		}else{
			helpHide();
		}
	});
	//跳过
	$("#help-skip").click(function(){
		helpHide();
	});
	//激活帮助视图
	$("#showHelp").click(function(){
		helpShow();
		//checkPermission();
	});
	
});

//网页通知（only Chrome）
window.Notifications = window.Notifications || window.webkitNotifications;

function showNotifications(icon,title,message,timer){
	//参数：图标路径(32*32),标题,详细信息,延时关闭(毫秒)
	var newNotification = Notifications.createNotification(icon,title,message);
	newNotification.ondisplay = function(){
		var temp = this;
		var fn = function() { temp.cancel(); };
		timer = timer || 3000;
		window.setTimeout(fn, timer);
	}
	newNotification.show();
}

function checkPermission(){
	//开启网页通知的权限
	var $info = $("<div class='notificationInfo'>点击'允许'可以通过桌面通知获取更多的实时帮助！</div>");
	if (window.Notifications) {
		var permissionLevel = window.Notifications.checkPermission();
		if(permissionLevel == 0){
			$(".notificationInfo").remove();
			//showNotifications('image/notificationIcon.png','帮助','"桌面通知"可以为您提供更多的实时帮助信息！！',10000);
		}else if(permissionLevel == 1){
			window.Notifications.requestPermission(checkPermission);
			$("body").append($info);
		}else{
			//世界清静了！！
		}
	}
}