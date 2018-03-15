/**
 * 作    者: 张勇辉 
 * 版    本: 1.2
 * 完成时间: 2011-10-12 
 * 描    述: fn.isLocalStorage
 * 关联文件: 
 */
/** 
* @class 判断浏览器是否支持LocalStorage本地存储  
* @name isLocalStorage
* @description 判断浏览器是否支持LocalStorage本地存储 
* @return {isLocalStorage} 布尔值
* @version 1.2 
*/
eddy.fn.isLocalStorage = function() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
};