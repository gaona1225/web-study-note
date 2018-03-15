/**
 * 作    者: 张勇辉 
 * 版    本: 1.2
 * 完成时间: 2011-10-12 
 * 描    述: fn.isHtml5
 * 关联文件: 
 */
/** 
* @class 判断浏览器是否支持Html5  
* @name isHtml5
* @description 判断浏览器是否支持Html5 
* @return {isHtml5} 布尔值
* @version 1.2 
*/
eddy.fn.isHtml5 = function(){
	var isHtml5 = typeof(Worker);
	if(isHtml5 == "undefined"){
		return false;
	}else{
		return true;
	}
};
//声明快捷方法
eddy.isHtml5 = eddy.fn.isHtml5;