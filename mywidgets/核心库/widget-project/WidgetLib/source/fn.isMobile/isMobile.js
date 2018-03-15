/**
 * 作    者: 高娜 
 * 版    本: 1.3
 * 完成时间: 2012-07-16 
 * 描    述: fn.isMobile
 * 关联文件: 
 */
/** 
* @class 判断访问设备是否是手机  
* @name isMobile
* @description 判断访问设备是否是手机 
* @return {isMobile} 布尔值
* @version 1.3 
*/
ui.fn.isMobile = function(){
	var agent = window.navigator.userAgent.toLowerCase() ;
	//alert(agent) ;
	var flag = false ;
	var isPC = true ;
	var nmobile = ['windows nt','ipod','macintosh','ipad'] ;//排除条件关键字罗列
	var keyword = ['android','iphone','playbook','symbian','blackberry','windows phone','nokia'] ;//各类手机关键词罗列
	console.log('agent==='+agent) ;
	for(var i=0; i<nmobile.length; i++){
		if(agent.indexOf(nmobile[i])>-1){
			isPC = true ;
			flag = false ;
			break ;
		}else{
			isPC = false ;
		}
	}
	console.log(flag) ;
	if(!isPC){
		for(var i=0; i<keyword.length; i++){
			if(agent.indexOf(keyword[i])>-1){
				flag = true ;
				break ;
			}
		}
	}
	return flag ;
	console.log(flag) ;
};
//声明快捷方法
ui.isMobile = ui.fn.isMobile;