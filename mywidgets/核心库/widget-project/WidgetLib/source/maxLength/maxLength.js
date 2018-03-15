/*
 *作    者: 黄卉
 *版    本: 1.0
 *完成时间: 2012-05-14
 *描    述: maxLength
 *关联文件: jQuery.js|jquery-ui.js
 */
(function($,undefined){
    /**
	* @class
    * @name maxLength
    * @description
	* @version 1.0
    */
	$.widget("ui.maxLength",
	/** @lends maxLength.prototype */
	{
		options:{
            /**
            * @name maxLength#maxLength
            * @param {maxLength} maxLength maxLength对象
            * @description 字数最大限制 ，默认为10
            * @default maxCharacters:10
            * @example
            * $("#id").maxLength({maxCharacters:10});
            */
            maxCharacters : 10 ,
            /**
            * @name maxLength#status
            * @param {maxLength} maxLength maxLength对象
            * @description 当超出最大值时，是否截取 ，默认为false
            * @default intercept:false
            * @example
            * $("#id").maxLength({intercept:false});
            */
            intercept :false ,
             /**
            * @name maxLength#status
            * @param {maxLength} maxLength maxLength对象
            * @description 是否显示提示信息，默认为true
            * @default status:true
            * @example
            * $("#id").maxLength({status:true});
            */
            status :true ,
            /**
            * @name maxLength#statusClass
            * @param {maxLength} maxLength maxLength对象
            * @description 提示信息的class名 ，默认为"ui-maxLength-statusClass"
            * @default statusClass:"ui-maxLength-statusClass"
            * @example
            * $("#id").maxLength({statusClass:"ui-maxLength-statusClass"});
            */
            statusClass :"ui-maxLength-statusClass" ,
            /**
            * @name maxLength#statusText
            * @param {maxLength} maxLength maxLength对象
            * @description 提示信息里面text值 ，默认为"您可以输入的字符个数为："
            * @default statusText:"您可以输入的字符个数为："
            * @example
            * $("#id").maxLength({statusText:"您可以输入的字符个数为："});
            */
            statusText :"您可以输入的字符个数为：" ,
            /**
            * @name maxLength#notificationClass
            * @param {maxLength} maxLength maxLength对象
            * @description 当超出最大值时，文本框的样式class名 ，默认为"ui-maxLength-notification"
            * @default notificationClass:"ui-maxLength-notification"
            * @example
            * $("#id").maxLength({notificationClass:"ui-maxLength-notification"});
            */
            notificationClass :"ui-maxLength-notification" ,
            /**
            * @name maxLength#showAlert
            * @param {maxLength} maxLength maxLength对象
            * @description 当超出最大值时，是否显示alert提示信息，默认为false
            * @default showAlert:false
            * @example
            * $("#id").maxLength({showAlert:false});
            */
            showAlert :false ,
            /**
            * @name maxLength#alertText
            * @param {maxLength} maxLength maxLength对象
            * @description 当超出最大值时，alert提示信息所提示的内容 ，默认为"您输入的字数太多了！"
            * @default alertText:"您输入的字数太多了！"
            * @example
            * $("#id").maxLength({alertText:"您输入的字数太多了！"});
            */
            alertText :"您输入的字数太多了！" ,
            /**
            * @name maxLength#slider
            * @param {maxLength} maxLength maxLength对象
            * @description 提示信息是否获得焦点时显示，失去焦点后隐藏，默认为false
            * @default slider:false
            * @example
            * $("#id").maxLength({slider:false});
            */
            slider :false ,
            /**
            * @name maxLength#events
            * @param {maxLength} maxLength maxLength对象
            * @description 事件绑定，默认为‘keyup’事件
            * @default events: ['keyup']
            * @example
            * $("#id").maxLength({events: ['keyup']});
            */
            events : ['keyup']

        },
		_create:function(){
		},
		_init:function(){
            var settings = this.options,item = $(this.element),charactersLength = item.val().length;
            // 更改提示信息的文本内容，即修改提醒字数
			function updateStatus(){
				var charactersLeft = settings.maxCharacters - charactersLength;
				if(charactersLeft < 0){
                    //加入intercept参数。
                    if(settings.intercept){
                          charactersLeft = 0;
                    }
				}
				item.next("div").html(settings.statusText+charactersLeft);
			}

            //验证字数
			function checkChars(){
				var valid = true;
				// 当内容过多时
				if(charactersLength >= settings.maxCharacters){
					valid = false;
					// 加入内容过多时的样式
					item.addClass(settings.notificationClass);
                    //加入intercept参数，是否截取
                    if(settings.intercept){
                        item.val(item.val().substr(0,settings.maxCharacters));
                     }else{
                        updateStatus();
                     }
					// 判断是否显示alert提示信息的内容
					showAlert();
                    //失去焦点时将其样式移除，获得焦点时，添加该样式
                    item.blur(function(){
                        if(item.hasClass(settings.notificationClass)){
                             item.removeClass(settings.notificationClass);
                        }
                    }).focus(function(){
                         item.addClass(settings.notificationClass);
                    });
				}else{
					// 移除内容过多时的样式
					if(item.hasClass(settings.notificationClass))
					{
						item.removeClass(settings.notificationClass);
					}
				}

				if(settings.status){
					updateStatus();
				}
			}

			// 显示alert提示信息的内容
			function showAlert(){
				if(settings.showAlert)
				{
					alert(settings.alertText);
				}
			}

			// 检查需要验证的元素，textarea和input
			function validateElement(){
				var ret = false;
                if(item.is('textarea')) {
					ret = true;
				}else if(item.is("input[type=text]")) {
					ret = true;
				}else if(item.is("input[type=password]")) {
					ret = true;
				}else if(item.attr('contentEditable')){
                     charactersLength = item.text().length ;
                     ret = true;
                 }

				return ret;
			}

			// Validate
			if(!validateElement()){
				return false;
			}

			// 事件绑定
			$.each(settings.events, function (i, n) {
				item.bind(n, function(e) {
                    if(item.is('textarea')||item.is('input')){
                         charactersLength = item.val().length;
                    } else{
                         charactersLength = item.text().length ;
                    }
					checkChars();
				});
			});

			// 初始化提示信息div
			if(settings.status){
				item.after($("<div/>").addClass(settings.statusClass).html('-'));
				updateStatus();
			}

			// 移除提示信息div
			if(!settings.status){
				var removeThisDiv = item.next("div."+settings.statusClass);

				if(removeThisDiv) {
					removeThisDiv.remove();
				}

			}

			// slider=true时，提示信息获得焦点时显示，失去焦点后隐藏
			if(settings.slider) {
				item.next().hide();
				item.focus(function(){
					item.next().slideDown('fast');
				});
				item.blur(function(){
					item.next().slideUp('fast');
				});
			}

		}
	});

    $.extend($.ui.maxLength, {
        version: "1.0",
        author:"黄卉"
    });

})(jQuery);
