/*
 *作    者: 高娜
 *版    本: 1.2
 *完成时间: 2012-06-19
 *描    述: autosave
 *关联文件: jQuery.js|jquery-ui.js
 */
(function($,undefined){
    /**
	* @class 表单自动保存
    * @name autosave
    * @description 表单自动保存插件
	* @version 1.2
    */
	$.widget('ui.autosave',
	/** @lends autosave.prototype */
	{		
		options:{
			/**  
			* @name autosave#saveTime
			* @param {Number}  数字类型
			* @description 自动保存的时间间隔
			* @default {Number} ''
			* @example
			* $('.exampleObj').autosave({
			*		saveTime : 5000
			*  });
			*/
			saveTime : 5000 
		},
		_create:function(){
		},
		_init:function(){
			var inputAry = this.element.find('input').filter(':text,:password,:hidden') ; 
			var textareaAry = this.element.find('textarea') ;
			var selectAry = this.element.find('select') ;
			var radioAry = this.element.find('input').filter(':radio,:checkbox') ;
			
			var opt = this.options ;
			getCookie() ;
			setInterval(setCookie,opt.saveTime) ;
			//存值处理,isRadioOrCheck判断是否是radio或是checkbox
			function sum(arr,isRadioOrCheck){
				var result = '' ;
				if(isRadioOrCheck){
					for(var i=0; i<arr.length; i++){
						result += arr.eq(i).attr('checked') + ',' ;
					}
				}else{
					for(var i=0; i<arr.length; i++){
						result += arr.eq(i).val() + ',' ;
					}
				}
				return result;
			}
			//取值处理,isRadioOrCheck判断是否是radio或是checkbox
			function getSum(arr,tarObj,isRadioOrCheck){
				if(isRadioOrCheck){
					for(var i=0; i<arr.length-1; i++){
						if(arr[i] == 'true'){
							tarObj.eq(i).attr('checked',arr[i]) ;
						}
					}
				}else{
					for(var i=0; i<arr.length-1; i++){
						tarObj.eq(i).val(arr[i]) ;
					}
				}
			}

			function setCookie(){
				var c_input_value = c_textarea_value = c_select_value = c_radio_value = '' ;
				
				if(inputAry.length>0){
					c_input_value = sum(inputAry,false) ;
				}
				if(textareaAry.length>0){
					c_textarea_value = sum(textareaAry,false) ;
				}
				if(selectAry.length>0){
					c_select_value = sum(selectAry,false) ;
				}
				if(radioAry.length>0){
					c_radio_value = sum(radioAry,true) ;
				}
				var cookie_val = c_input_value + '-' + c_textarea_value + '-' + c_select_value + '-' + c_radio_value ;
				document.cookie = cookie_val ;
			}
			function getCookie(){
				if(document.cookie.length>0){
					var cookieAry = document.cookie.split('-') ;
					var cookieLen = cookieAry.length ;
					var c_inputAry = cookieAry[0].split(',') ;
					var c_textareaAry = cookieAry[1].split(',') ;
					var c_selectAry = cookieAry[2].split(',') ;
					var c_radioAry = cookieAry[3].split(',') ;
					
					if(c_inputAry.length>1){
						getSum(c_inputAry,inputAry,false)
					}
					if(c_textareaAry.length>1){
						getSum(c_textareaAry,textareaAry,false)
					}	
					if(c_selectAry.length>1){
						getSum(c_selectAry,selectAry,false)
					}	
					if(c_radioAry.length>1){
						getSum(c_radioAry,radioAry,true)
					}				
				}
			}
		},
		/**
		* @description 清除表单自动保存缓存
		* @return {autosave} autosave对象
		* @example
		* $("#testExpObj").autosave('destroy');
		*/
		destroy : function(){
			document.cookie = '' ;
		}
	});

	$.extend($.ui.autosave, {
		version: "1.2"
	});

})(jQuery);