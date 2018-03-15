/**
 * 作    者: 张勇辉 
 * 版    本: 1.2
 * 完成时间: 2011-10-12 
 * 描    述: fn.randomInt
 * 关联文件: 
 */
 /** 
* @class 随机整数生成器 
* @name randomInt
* @description 生成一个指定范围的随机整数 
* @return {randomInt} 整数
* @version 1.2 
*/
eddy.fn.randomInt = function(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
};