/**
 * 声明JHSoft包 
 * @author: 张勇辉 
 */
/**
 * @fileOverview 金和软件插件集
 * @version 1.2
 * @author 张勇辉 
 */
var eddy,
    ui = eddy = ui || {version: "1.2"}; 
	eddy.fn = eddy.fn || {};
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
eddy.isHtml5 = eddy.fn.isHtml5;/**
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
};/**
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
};/**
 * @ zhng,2012-6-29
 * @ pc端浏览器版本判断，未使用特征检测的结果在userAgent重写后不正确
 * @ 依赖文件 version.js
 */
/**
 * 判断，是否IE浏览器及特定版本
 * @param arguments[0] 为空 为判断是否IE浏览器;传入数字7或者8或者9,或者传入数字字符"7"或者"8"或者"9"表示判断是否是IE7或者IE8或者IE9
 * @return boolean
 */
ui.fn.isIE = function() {
    var isIE = "ActiveXObject" in window;
    if ( arguments.length === 0 ) {
        return isIE;
    } else {//7,8,9
        return isIE && parseInt(arguments[0]) === ((navigator.userAgent.match(/msie ([\d.]+)/i))[1])>>0;
    }
};
ui.isIE = ui.fn.isIE;
/*
 * window.chrome特征检测
 * 判断，是否chrome浏览器
 * @return boolean
 */
ui.fn.isChrome = function() {
    return window.chrome && /chrome\/([\d.]+)/i.test( navigator.userAgent ) ;
};
ui.isChrome = ui.fn.isChrome;
/**
 * 判断，是否firefox浏览器
 * @return boolean
 */
ui.fn.isFx = function() {
    return /firefox\/([\d.]+)/i.test( navigator.userAgent );
};
ui.isFx = ui.fn.isFx;
/**
 * 判断，是否safari浏览器
 * @return boolean
 */
ui.fn.isSafari = function() {
    return /version\/([\d.]+).*safari/i.test( navigator.userAgent );
};
ui.isSafari = ui.fn.isSafari;
/**
 * 判断，是否opera浏览器
 * @return boolean
 */
ui.fn.isOpera = function() {
    return /opera\/([\d.]+)/i.test( navigator.userAgent );
};
ui.isOpera = ui.fn.isOpera;
/**
 * @ zhng,2012-7-3
 * 数据类型判定
 */
/**
 * 是否是函数
 * @param obj
 */
ui.fn.isFn = function( obj ) {
//    typeof fnName;
//    //fnName instanceof
//    fnName.constructor = Function;
    return !!obj && Object.prototype.toString.call( obj ) === "[object Function]";
};
ui.isFn = ui.fn.isFn;
/**
 * 是否未定义<注意undefined变量可重新赋值>
  * @param obj
 */
ui.fn.isUndefined = function( obj ) {
    return obj === undefined && !obj;
};
ui.isUndefined = ui.fn.isUndefined;
/**
 * 是否为null
  * @param obj
 */
ui.fn.isNull = function( obj ) {
    return obj === null && !obj;
};
ui.isNull = ui.fn.isNull;
/**
 * 是否为空字符串
  * @param obj
 */
ui.fn.isNotEmpty = function( obj ) {
    return /^\S+$/.test( obj );
};
ui.isNotEmpty = ui.fn.isNotEmpty;
/**
 * 是否数字(数字字符串验证不通过包括0)
 * @param obj
 */
ui.fn.isNum = function( obj ) {
    //前置与操作过滤掉了正则验证中对象为空字符串的情况
    ///^([+-]?)\d*\.?\d*$/ 通过.4
    /*/^\S+$/.test( obj ) &&*/
    return /^([+-]?)\d*\.?\d+$/.test( obj );
};
ui.isNum = ui.fn.isNum;
/**
 * 是否整数(包括0)
  * @param obj
 */
ui.fn.isInteger = function( obj ) {
    return /^([+-]?)([1-9]?)\d+$/.test( obj );
};
ui.isInteger = ui.fn.isInteger;
/**
 * 是否浮点数(包括0)
  * @param obj
 */
ui.fn.isDecimal = function( obj ) {
    //return /^(([+-]?)(([1-9]?)\d*.\d*|0.\d*[1-9]\d*))|0?.0+|0$/.test( obj );
    return /^([+-]?)(([1-9]?\d*\.\d*)|0)$/.test( obj );
};
ui.isDecimal = ui.fn.isDecimal;
/**
 * @ zhng,2012-7-2
 * @ 增加数据格式判定类
 * @ 依赖文件 version.js
 */
/**
 * 是否ip
 * @param obj
 */
ui.fn.isIp = function( obj ) {
    //不准确
    //点号分割的四组数字
    /*return /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g.test( ip )
        && RegExp.$1 < 256
        && RegExp.$2 < 256
        && RegExp.$3 < 256
        && RegExp.$4 < 256;*/
    return /((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))/.test( obj );
};
ui.isIp = ui.fn.isIp;
/**
 * 是否url
 * @param obj
 */
ui.fn.isUrl = function( obj ) {
    var urlRegex = "^((https|http|ftp|rtsp|mms)?://)"
        + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@
        + "(([0-9]{1,3}.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
        + "|" // 允许IP和DOMAIN（域名）
        + "([0-9a-z_!~*'()-]+.)*" // 域名- www.
        + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]." // 二级域名
        + "[a-z]{2,6})" // first level domain- .com or .museum
        + "(:[0-9]{1,4})?" // 端口- :80
        + "((/?)|"
        + "(/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+/?)$";
    return !!obj && !/^true|false$/.test( obj ) && new RegExp( urlRegex).test( obj );
};
ui.isUrl = ui.fn.isUrl;
/**
 * 使用捕获组、反向应用来判定年月和月日之间的间隔符一致
 * 匹配日期 2012-07-02;2012/07/02;2012.07.02
  * @param obj
 */
ui.fn.isDateTime = function( obj ) {
    return /^\d{4}(\-|\/|\.)\d{1,2}\1\d{1,2}$/.test( obj );
};
ui.isDateTime = ui.fn.isDateTime;
/**
 * 匹配电子邮件
 * @param obj
 */
ui.fn.isEmail = function( obj ) {
    return !!obj && /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test( obj );
};
ui.isEmail = ui.fn.isEmail;
/**
 * 是否电话号码（区号、分机号）027-86999999-8457;+23-012-81923663-564
 * <未>(027)86999999-8457
 * @param obj
 */
ui.fn.isTel = function( obj ) {
    return !!obj && /^(([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/.test( obj );
};
ui.isTel = ui.fn.isTel;
/**
 * 是否手机号码
 * 通过格式: +8613136366666;(86)13163366666;13163366666
 * @param obj
 */
ui.fn.isPhone = function( obj ) {
    return !!obj && /^((\+86)|(\(86\)))?((13[0-9]{9})|(15[012356789][0-9]{8})|(18[0256789][0-9]{8})|(147[0-9]{8}))$/.test( obj );
};
ui.isPhone  = ui.fn.isPhone;
/**
 * 是否6位邮政编码
  * @param obj
 */
ui.fn.isZipcode = function( obj ) {
    return !!obj && /^\d{6}$/.test( obj );
};
ui.isZipcode = ui.fn.isZipcode;
/**
 * 是否身份证号码
 * 简单验证15位身份证
 * 使用数据格式和校验码验证18位二代公民身份证
 * @param obj
 */
ui.fn.isIdCard = function( obj ) {
    /**
     *wiki:http://zh.wikipedia.org/wiki/中华人民共和国公民身份号码
     *1,将身份证号码从右至左标记为a1,a2,...,a18;即a1为校验码
     *2,计算权重系数: wi= 2^(i-1) mod 11;
     *3,计算s = ai * wi的累加和(其中i属于[2,18]);
     *4,a1 = (12-(s mod 11))mod11;<16进制>
     * ------------------------
     * 接收18位身份证号的左起17位
     * @param obj 接收18为身份证号的左起17位
     * @return ret 检验码 身份证最后一位数(16进制)
     */
    function checksum( obj ) {
        function s( reverseArr ) {
            function w( i ) {
                return Math.pow( 2, i-1 ) % 11;
            }
            var ret = 0,j;
            for ( j = 0; j < 17; j++ ) {
                ret += reverseArr[ j ] * w( j + 2 );
            }
            return ret;
        }
        var checksum = ( 12 - ( s( obj.split("").reverse() ) % 11 ) ) % 11;
        return (checksum === 10)?"X":checksum+"";
    }
    var ret = !!obj && /^[1-9]([0-9]{14}|([0-9]{16}([0-9X]{1})))$/.test( obj );
    if ( ret && obj.length === 18 ) {
        return ( checksum(obj.substring(0,17)) === obj.substr(17,1) );
    } else {
        return ret;
    }
};
ui.isIdCard = ui.fn.isIdCard;

/*
 *作    者: 张勇辉
 *版    本: 1.2
 *完成时间: 2011-07-12
 *描    述: buttonPro
 *关联文件: jQuery.js|jquery-ui.js
 */
(function($,undefined){
    /**
	* @class 标准按钮插件
    * @name buttonPro
    * @description 标准按钮插件
	* @version 1.2
    */
	$.widget("ui.buttonPro",
	/** @lends buttonPro.prototype */
	{
		options:{},
		_create:function(){
			var _self = this.element,//元素自身
				o = this.options,
				_img = _self.attr("data-img") || "s",//图片的路径
				_width = _self.attr("data-width") || "",
				_btnBody = $("<span />").addClass("ui-buttonPro").append("<span class='buttonPro-con'/>")	;
				_self.wrap(_btnBody)
				.before(function(){
						var _ico = $("<div />")	;
						if(_img!=="s"){
							_ico.addClass("ico").attr("style","background-image:url("+_img+")");
						}else{
							_ico.addClass("s");
						}
						return _ico;
				});//生成形态
				if(_self.is("[data-img]") && _self.is("[data-width]") && _self.attr("data-width")!="standard"){
						_self.width(_width-30);
					}else if(_self.is("[data-width]") && _self.attr("data-width")!="standard"){
						_self.width(_width-10);
					}else if(_self.is("[data-img]")&&_self.attr("data-width")=="standard"){
						_self.width(46);
					}else if(_self.attr("data-width")=="standard"){
						_self.width(66);
					}
				if(_self.is("[data-img]")){
					var ie7 = navigator.userAgent.toLowerCase().match(/msie ([\d.]+)/);
					if(ie7 != undefined && ie7[1] === '7.0'){
						_self.get(0).style.padding = '0';
					}	
				}
		},
		_init:function(){
			var o=this.options,
				_self = this.element,//元素自身
				_type=_self.attr("data-type")||"normal",//按钮类型
				_menu=$("<span class='triangle'/>"),
				_btnBody = _self.parent().parent();
			function h(){
				if(_self.is(":disabled")){
					_btnBody.addClass("ui-buttonPro-d");
					}else{
						_btnBody.addClass("ui-buttonPro-h");
					}
				}
			function h2(){
				if(_self.is(":disabled")){
						_btnBody.addClass("ui-buttonPro-d");
					}else{
						_btnBody.removeClass("ui-buttonPro-h");
					}
				}
			function md(){
				if(_self.is(":disabled")){
					_btnBody.addClass("ui-buttonPro-d");
					}else{
						_btnBody.addClass("ui-buttonPro-c");
					}
				}
			function mu(){
				if(_self.is(":disabled")){
						_btnBody.addClass("ui-buttonPro-d");
					}else{
						_btnBody.removeClass("ui-buttonPro-c");
					}
				}
            if(_self.is(":disabled")){
                _btnBody.addClass("ui-buttonPro-d");
            }else{
                _btnBody.removeClass("ui-buttonPro-d");
            }
            if(_type=="menu"){
                _btnBody.find("span.buttonPro-con").append(_menu);
            }
            if(_self.css("display") == "none"){
                _btnBody.hide();
            }else {
                _btnBody.show();
            }
            /**
             *  简化代码，将里面的“functions(){h()}”改为“h”
             *  mouseup和mouseout作用相同 ，调用的mu和mo都是相同的代码，所以将mo函数去掉
             *   huanghui@2012-3-14
             * */
			_btnBody.hover(h,h2).mousedown(md).mouseup(mu).mouseout(mu).unbind("click").bind("click",function(e){
							if(_self.is(":disabled")){
								}else if(e.target.tagName!="INPUT" && e.target.tagName!="BUTTON"){
										_self[0].click();
							}
						});
			return _btnBody;
		},
		/**
		* @description 显示按钮
		* @return {buttonPro} buttonPro对象
		* @example
		* $("#logo").buttonPro('show');
		*/
		show:function(){
			this.element.show().parent().parent().show();
			return this.element;
		},
		/**
		* @description 隐藏按钮
		* @return {buttonPro} buttonPro对象
		* @example
		* $("#logo").buttonPro('hide');
		*/
		hide:function(){
			this.element.parent().parent().hide();
			return this.element;
		},
		/**
		* @description 禁用按钮
		* @return {buttonPro} buttonPro对象
		* @example
		* $("#logo").buttonPro('disable');
		*/
		disable:function(){
			this.element.attr("disabled",true).parent().parent().addClass("ui-buttonPro-d");
			return this.element;
		},
		/**
		* @description 启用按钮
		* @return {buttonPro} buttonPro对象
		* @example
		* $("#logo").buttonPro('enable');
		*/
		enable:function(){
			this.element.attr("disabled",false).parent().parent().removeClass("ui-buttonPro-d");
			return this.element;
		},
		/**
		* @description 销毁按钮
		* @return {buttonPro} buttonPro对象
		* @example
		* $("#logo").buttonPro('destroy');
		*/
		destroy:function(){
			this.element.parent().parent().before(this.element);
			this.element.next(".ui-buttonPro").remove();
			return this;
		}
	});

$.extend($.ui.buttonPro, {
	version: "1.2"
});

})(jQuery);
//initialize
$(function(){
		 $(".buttonPro").buttonPro();
});

/*
 *作    者: 张勇辉
 *版    本: 1.2
 *完成时间: 2011-07-12
 *描    述: buttonActive
 *关联文件: jQuery.js|jquery-ui.js
 */
(function($,undefined){
    /**
	* @class 推荐按钮插件
    * @name buttonActive
    * @description 推荐按钮插件
	* @version 1.2
    */
	$.widget("ui.buttonActive",
	/** @lends buttonActive.prototype */
	{
		 options:{},
		 _create:function(){
				var o = this.options,
					_self = this.element,
					_btnBody = $("<span class='ui-buttonActive'><span></span></span>"),
					_width = _self.attr("data-width")||"";
					if(_width == "standard"){
						_self.addClass("standard");
					}else if(_width != ""){
						_self.width(_width)
					}
					_self.wrap(_btnBody);
					_self.attr('data-destory',true) ;
					_self.focus(function(){
						this.blur();
					});

		},
		_init:function(){
			var _self = this.element,
				_btnBody = _self.parent().parent();
				_self.css("color","#ffffff");
            function h(){
                if(_self.is(":disabled")){
                    _btnBody.addClass("ui-buttonActive-d");
                }else{
                    _btnBody.addClass("ui-buttonActive-h");
                }
            }
			function h2(){
                if(_self.is(":disabled")){
                        _btnBody.addClass("ui-buttonActive-d");
                }else{
                    _btnBody.removeClass("ui-buttonActive-h");
                }
            }
			function md(){
                if(_self.is(":disabled")){
                    _btnBody.addClass("ui-buttonActive-d");
                }else{
                    _btnBody.addClass("ui-buttonActive-a");
                }
            }
			function mu(){
                if(_self.is(":disabled")){
                    _btnBody.addClass("ui-buttonActive-d");
                }else{
                    _btnBody.removeClass("ui-buttonActive-a");
                }
            }
			 if(_self.is(":disabled")){
                _btnBody.addClass("ui-buttonActive-d");
            }else{
                _btnBody.removeClass("ui-buttonActive-d");
            }
            if(_self.css("display") == "none"){
                _btnBody.hide();
            }else {
                _btnBody.show();
            }
             /**
             *  由于buttonActive中加入了disable方法，
             *  则按钮的事件都需要重新处理，要判断是否为disabled，然后在加入或这移除某些样式
             *  故加入h()、h2()、md()、mu()方法 以及两个if判断
             *   huanghui@2012-3-14
             * */
            _btnBody.hover(h,h2).mousedown(md).mouseup(mu).mouseout(mu).unbind("click").bind("click",function(e){
                        if(e.target.tagName!="INPUT" && e.target.tagName!="BUTTON"){
                                _self[0].click();
                        }
                    });
            return _btnBody;
		},
        /**
         * 加入 show()按钮显示、hide()按钮隐藏、disable()按钮禁用、enable()按钮启用方法
         * huanghui@2010-3-7
         * */
        /**
        * @description 显示按钮
        * @return {buttonActive} buttonActive对象
        * @example
        * $("#logo").buttonActive('show');
        */
        show:function(){
            this.element.show().parent().parent().show();
        },
        /**
        * @description 隐藏按钮
        * @return {buttonActive} buttonActive对象
        * @example
        * $("#logo").buttonActive('hide');
        */
        hide:function(){
            this.element.parent().parent().hide();
        },
        /**
        * @description 禁用按钮
        * @return {buttonActive} buttonActive对象
        * @example
        * $("#logo").buttonActive('disable');
        */
        disable:function(){
            this.element.attr("disabled",true).parent().parent().addClass("ui-buttonActive-d");
        },
        /**
        * @description 启用按钮
        * @return {buttonActive} buttonActive对象
        * @example
        * $("#logo").buttonActive('enable');
        */
        enable:function(){
            this.element.attr("disabled",false).parent().parent().removeClass("ui-buttonActive-d");
        },


		/**
		* @description 销毁按钮
		* @return {buttonActive} buttonActive对象
		* @example
		* $("#logo").buttonActive('destroy');
		*/

		destroy:function(){
			if(this.element.attr('data-destory') == 'true'){
				this.element.css("color","");/*加入这句话，销毁按钮样式的时候color属性没有去掉  huanghui@2010-3-12  */ 
				this.element.removeClass("standard").unwrap().unwrap();
				this.element.attr('data-destory','false') ;
				return this.element;
			}
		}
	});

$.extend($.ui.buttonActive, {
	version: "1.2"
});

})(jQuery);

$(function(){
	$(".buttonActive").buttonActive();
});
/*
 *作    者: 张勇辉
 *版    本: 1.2
 *完成时间: 2011-07-26
 *描    述: buttonLight
 *关联文件: jQuery.js|jquery-ui.js
 */
(function($,undefined){
    /**
	* @class 轻量按钮插件
    * @name buttonLight
    * @description 轻量按钮插件
	* @version 1.2
    */
	$.widget("ui.buttonLight",
	/** @lends buttonLight.prototype */
	{
		options:{},
		_create:function(){
			var _self = this.element,//元素自身
				o = this.options,
				_img = _self.attr("data-img") || "s",//图片的路径
				_width = _self.attr("data-width") || "",
				_btnBody = $("<span />").addClass("ui-buttonLight").append("<span class='buttonLight-con'/>"),
				_type=_self.attr("data-type")||"normal",//按钮类型
				_menu = $("<span class='triangle'/>");
				_self.wrap(_btnBody)
				.before(function(){
						var _ico = $("<div />")	;
						if(_img!=="s"){
							_ico.addClass("ico").attr("style","background-image:url("+_img+")");
						}else{
							_ico.addClass("s");
						}
						return _ico;
				});//生成形态
				if(_self.is("[data-img]") && _self.is("[data-width]") && _self.attr("data-width")!="standard"){
						_self.width(_width-30);
					}else if(_self.is("[data-width]") && _self.attr("data-width")!="standard"){
						_self.width(_width-10);
					}else if(_self.is("[data-img]")&&_self.attr("data-width")=="standard"){
						_self.width(46);
					}else if(_self.attr("data-width")=="standard"){
						_self.width(66);
					}
				if(_type=="menu"){
                    _self.parent().append(_menu);
                }

		},
		_init:function(){
			var o=this.options,
				_self = this.element,//元素自身
				_type=_self.attr("data-type")||"normal",//按钮类型
				_menu=$("<span class='triangle'/>"),
                _btnBody = _self.parent().parent();
			function h(){
                if(_self.is(":disabled")){
                    _btnBody.addClass("ui-buttonLight-d");
                }else{
                    _btnBody.addClass("ui-buttonLight-h");
                }
            }
			function h2(){
                if(_self.is(":disabled")){
                        _btnBody.addClass("ui-buttonLight-d");
                }else{
                    _btnBody.removeClass("ui-buttonLight-h");
                }
            }
			function md(){
                if(_self.is(":disabled")){
                    _btnBody.addClass("ui-buttonLight-d");
                }else{
                    _btnBody.addClass("ui-buttonLight-c");
                }
            }
			function mu(){
                if(_self.is(":disabled")){
                        _btnBody.addClass("ui-buttonLight-d");
                }else{
                    _btnBody.removeClass("ui-buttonLight-c");
                }
            }
            if(_self.is(":disabled")){
                _btnBody.addClass("ui-buttonLight-d");
            }else{
                _btnBody.removeClass("ui-buttonLight-d");
            }
            if(_self.is(":hidden")){
                _btnBody.hide();
            }else if(_self.is(":visible")){
                _btnBody.show();
            }
            /**
             *  简化代码，将里面的“functions(){h()}”改为“h”
             *  mouseup和mouseout作用相同 ，调用的mu和mo都是相同的代码，所以将mo函数去掉
             *   huanghui@2012-3-13
             * */
            _btnBody.hover(h,h2).mousedown(md).mouseup(mu).mouseout(mu).unbind("click").bind("click",function(e){
							if(_self.is(":disabled")){
                            }else if(e.target.tagName!="INPUT" && e.target.tagName!="BUTTON"){
                                _self[0].click();
							}
						});
            /**
             *  ipad下处理，选中效果的添加
             *  监听“touchstart” 和“touchend”事件
             *    huanghui@2012-3-13
             * */
            if("ontouchstart" in window){
                var domTarget = _btnBody.get(0);
               domTarget.addEventListener("touchstart",h,false);
                domTarget.addEventListener("touchend",function(){
                    setTimeout(h2,500);
                },false);
            }
		},
		/**
		* @description 显示按钮
		* @return {buttonLight} buttonLight对象
		* @example
		* $("#logo").buttonLight('show');
		*/
		show:function(){
			this.element.show().parent().parent().show();
		},
		/**
		* @description 隐藏按钮
		* @return {buttonLight} buttonLight对象
		* @example
		* $("#logo").buttonLight('hide');
		*/
		hide:function(){
			this.element.parent().parent().hide();
		},
		/**
		* @description 禁用按钮
		* @return {buttonLight} buttonLight对象
		* @example
		* $("#logo").buttonLight('disable');
		*/
		disable:function(){
			this.element.attr("disabled",true).parent().parent().addClass("ui-buttonLight-d");
		},
		/**
		* @description 启用按钮
		* @return {buttonLight} buttonLight对象
		* @example
		* $("#logo").buttonLight('enable');
		*/
		enable:function(){
			this.element.attr("disabled",false).parent().parent().removeClass("ui-buttonLight-d");
		},
		/**
		* @description 销毁按钮
		* @return {buttonLight} buttonLight对象
		* @example
		* $("#logo").buttonLight('destroy');
		*/
		destroy:function(){
			this.element.parent().parent().before(this.element);
			this.element.next(".ui-buttonLight").remove();
		}
	});

$.extend($.ui.buttonLight, {
	version: "1.2"
});

})(jQuery);
//initialize
$(function(){
		 $(".buttonLight").buttonLight();
});
/*
 *作    者: 张勇辉 
 *版    本: 1.2 
 *完成时间: 2011-07-14 
 *描    述: minSearch
 *关联文件: jQuery.js|jquery-ui.js 
 */ 
 (function($){ 
	/** 
	* @class 简洁搜索框插件 
    * @name minSearch
    * @description 简洁搜索框插件 
	* @requires jQuery.js|jquery-ui.js 
	* @version 1.2 
    */
	$.fn.minSearch = function(options){ 
			//各种属性、参数 
			var defaults = {
				/**  
				* @name minSearch#btnClick  
				* @param {fn} minSearch minSearch对象 
				* @description 按钮点击时执行的函数
				* @default {fn} function(){}
				* @example
				* $("#search").minSearch({
				*	btnClick : function(){
				*		alert("点击了搜索按钮");
				*		}
				*    });
				*/
				btnClick:function(){},
				/**  
				* @name minSearch#onFocus  
				* @param {fn} minSearch minSearch对象 
				* @description 输入框获取焦点后执行的函数 
				* @default {fn} function(){}
				* @example
				* $("#search").minSearch({
				*	onFocus : function(){
				*		alert("获取焦点");
				*		}
				*    });
				*/
				onFocus:function(){},
				/**  
				* @name minSearch#onBlur  
				* @param {fn} minSearch minSearch对象 
				* @description 输入框获取焦点后执行的函数 
				* @default {fn} function(){}
				* @example
				* $("#search").minSearch({
				*	onBlur : function(){
				*		alert("焦点离开");
				*		}
				*    });
				*/
				onBlur:function(){},
				/**  
				* @name minSearch#width  
				* @param {fn} minSearch minSearch对象 
				* @description 宽度  
				* @default {string} "100%"
				* @example
				* $("#search").minSearch({
				*	width : '50px'
				*    });
				*/
				width:"100%"
			}
			//判断是否清除插件 
			if(options != 'destory'){
				var options = $.extend(defaults, options); 
				this.each(function(){ 
					//插件实现代码 
					var $this = $(this);
					var $widgetBox = $("<div class='c6ui-widget-minSearch' style='width:"+options.width+";'></div>");
					var $btn = $("<a href='javascript:void(0)' class='minSearchBtn'></a>");
					var $minSearchInput = $("<div class='minSearchInput'></div>");
					var $onClick = options.btnClick;
					var $onFocus = options.onFocus;
					var $onBlur = options.onBlur;
					var _focus = false;
					//desc by gaona 2012-03-06 判断是否已经创建dom元素开始  
					if($this.attr('data-destory')!='true'){
						$this.wrap($widgetBox).after($btn).wrap($minSearchInput) ;
						$this.attr('data-destory',true) ;
					}else{
					}
					//desc by gaona 2012-03-06 判断是否已经创建dom元素结束  
					$this.focus(function(){
						$onFocus();
						_focus = true;
							//By Eddy 2011-08-26 add 注册回车键代理点击事件 begin
							document.onkeydown = function(e){  
								var ev = document.all ? window.event : e;
								if(ev.keyCode==13) {
									   $onClick();
								 }
							}
							//By Eddy 2011-08-26 add 注册回车键代理点击事件 end
						})
					.blur(function(){
						$onBlur();
						document.onkeydown = function(e){}//By Eddy 2011-08-26 add 清空回车键代理点击事件 
						});/*.removeAttr("class")*//*保留选择器*/
					
					$btn.click($onClick);
				}); 
			}else{
				//desc by gaona 2012-03-06 添加销毁事件开始
				if($(this).attr('data-destory') == 'true'){
					$(this).parents('.c6ui-widget-minSearch').children('.minSearchBtn').remove() ;
					$(this).unwrap('.minSearchInput').unwrap() ;
				}
				$(this).attr('data-destory','false') ;
				//desc by gaona 2012-03-06 添加销毁事件结束
			}
		}; 
		$.extend($.fn.minSearch, {
			version: "1.2"
			});
})(jQuery); 
  
/**
 * 作    者: 张勇辉 
 * 版    本: 1.2 
 * 完成时间: 2011-07-14 
 * 描    述: widget Bubble
 * 关联文件: jQuery.js|jquery-ui.js  
 */
(function($){ 
	/** 
	* @class 气泡提示插件  
    * @name bubble
    * @description 气泡提示插件 
	* @requires jQuery.js|jquery-ui.js 
	* @version 1.2 
    */
$.fn.bubble = function(id,show,options){ 
	/** @lends bubble.prototype */	
		//各种属性、参数 
	var defaults = {
        /**  
        * @name bubble#x  
        * @param {int} bubble bubble对象 
        * @description 组件的横向坐标 
		* @default {int} 100
		* @example
		* $(document).bubble({x:200});
        */
		x:100,
		 /**  
        * @name bubble#y  
        * @param {int} bubble bubble对象 
        * @description 组件的纵向坐标 
		* @default {int} 100
		* @example
		* $(document).bubble({y:200});
        */
		y:100,
		 /**  
        * @name bubble#hand  
        * @param {string} bubble bubble对象 
        * @description 组件指针方向 可选"leftTop" "leftBotton" "rightTop" "rightBottom" 
		* @default {string} 'leftTop'
		* @example
		* $(document).bubble({hand:'rightTop'});
        */
		hand:"leftTop",
		 /**  
        * @name bubble#content  
        * @param {string} bubble bubble对象 
        * @description 显示的内容 
		* @default {string} "<img src='../uiBase/skins/base/eddy.png' />Eddy Zhang 友情提示:<br/>你没有定义con的参数，请检查你的参数设置。" 
		* @example
		* $(document).bubble({content:'这里是标题'});
        */
		content:"Eddy Zhang 友情提示:<br/>你没有定义content的参数，请检查你的参数设置。",
		 /**  
        * @name bubble#onClick  
        * @param {fn} bubble bubble对象 
        * @description 显示的内容 
		* @default {fn} function(){$(this).detach();}
		* @example
		* $(document).bubble({onClick:function(){$(this).detach();}});
        */
		onClick:function(){
			$(this).detach();
			}
		}
			var options = $.extend(defaults, options); 
			this.each(function(){ 
			//插件实现代码
			if(show==true){ 
			var $bubbleBody = $("<div class='c6ui-bubble' id='"+id+"' style='left:"+ options.x +"px;top:"+ options.y +"px;'></div>");
			var $bubbleCon = $("<table border='0' cellspacing='0' cellpadding='0' class='c6ui-bubble-layout'><tr><td class='lt'></td><td class='t'></td><td class='rt'></td></tr><tr><td class='l'></td><td class='con'>"+ options.content +"</td><td class='r'></td></tr><tr><td class='lb'></td><td class='b'></td><td class='rb'></td></tr></table>");
			var $corner = $("<div class='corner "+ options.hand +"'></div>");
			var $body = $("body");
				$bubbleBody.append($bubbleCon).append($corner).appendTo($body).show();
				$bubbleBody.click(options.onClick);

				}else{
					$("#"+id).detach();
				}
			}); 
		}; 

})(jQuery); 


/*
 *作    者: 张勇辉 
 *版    本: 1.2 
 *完成时间: 2011-07-26 
 *描    述: stateBox 
 *关联文件: jQuery.js|jquery-ui.js 
 */	
  /*
 *changelog：
 * 2011-11-23 修复跨框架访问的问题
 * 2012-8-23 删除_init方法中调用_stateBoxRemoveBox的多余window.top前缀
 *           具体应用stateBox时,应该由调用方设定stateBox隶属的window对象
 *           此设定放置到stateBox调用封装函数中去@common.js
 *           //配合common.js中修改处理纯IE7下运行时间错误问题
 */

(function($,undefined){
	/** 
	* @class 状态提示插件 
    * @name stateBox
    * @description 状态提示插件 
	* @requires jQuery.js|jquery-ui.js 
	* @version 1.2 
    */
	$.widget("ui.stateBox",
	 /** @lends stateBox.prototype */	 
	{
		options:{
        /**  
        * @name stateBox#state  
        * @param {string} stateBox stateBox对象 
        * @description 可选值"succeed""alert""error"
		* @default {string} "succeed"
		* @example
		* $(document).stateBox({state:"alert"});
        */
		state:"succeed",
		/**  
        * @name stateBox#content  
        * @param {string} stateBox stateBox对象 
        * @description 状态提示框中显示的信息
		* @default {string} "提交成功!"
		* @example
		* $(document).stateBox({content:"提交失败!"});
        */
		content:"提交成功！",
		/**  
        * @name stateBox#corner  
        * @param {string} stateBox stateBox对象 
        * @description 圆角模式（只对支持CSS3标准的浏览器有效）
		* @default {boolean} false
		* @example
		* $(document).stateBox({corner:true});
        */
		corner: false
		},
		_create:function(){
		},
		_init:function(){
			var o = this.options,
				_self = this.element,
				_stateBox = $("<div />").addClass("ui-stateBox").html(o.content);
				_self.append(_stateBox);
				_self.append("<sc"+"ript>_stateBoxRemoveBox();</scr"+"ipt>");
				if(o.corner){
					_stateBox.addClass("ui-corner-all");
					_stateBoxRemoveBox();
				}
				if(o.state === "succeed"){
					_stateBox.addClass("ui-stateBox-succeed");
					_stateBoxRemoveBox();
				}else if(o.state === "alert"){
					_stateBox.addClass("ui-stateBox-alert");
					_stateBoxRemoveBox();
				}else if(o.state === "error"){
					_stateBox.addClass("ui-stateBox-error");
					_stateBoxRemoveBox();
				}
				_stateBox.fadeIn("fast");
				function removeBox(){
					_stateBox.fadeOut("fast").remove();
				}
		},
		destroy:function(){
			
		}
	});
	
$.extend($.ui.stateBox, {
	version: "1.2"
});

})(jQuery);
function _stateBoxRemoveBox(){
	setTimeout(function(){
		$(document).find(".ui-stateBox").fadeOut("fast").remove();
	},2800);
}/*
 *作    者: 张勇辉
 *版    本: 1.0
 *完成时间: 2011-07-12
 *描    述: menuList
 *关联文件: jQuery.js|jquery-ui.js
 */
(function($,undefined){
    /**
	* @class 下拉菜单插件
    * @name menuList
    * @description 下拉菜单插件
	* @version 1.0
    */
	$.widget("ui.menuList",
	/** @lends menuList.prototype */
	{
		options:{
        /**
        * @name menuList#json
        * @param {menuList} menuList menuList对象
        * @description JSON数据源
		* @default {menuList} ""
		* @example
		* $("#link").menuList({json:"json.js"});
        */
		json : "",
		/**
        * @name menuList#json
        * @param {menuList} menuList menuList对象
        * @description 数据回显标志，true显示数据回显
		* @default {menuList} ""
		* @example
		* $("#link").menuList({dateShow:true});
        */
        dateShow :false,
        /**
        * @name menuList#json
        * @param {menuList} menuList menuList对象
        * @description 字数限制，默认为5
		* @default {menuList} ""
		* @example
		* $("#link").menuList({numControl:5});
        */
        numControl :5,
        /**
        * @name menuList#fn
        * @param {menuList} menuList menuList对象
        * @description 执行函数
		* @default {menuList} function(){}
		* @example
		* $("#link").menuList({
		* 	fn:function(){
		*		$("#aa").live("click",function(event){
		*			if($(event.target).is("li")){
		*				alert($(event.target).attr("id"));
		* 			}
		*		}
		* });
        */
		fn : function(){},
        /**
        * @name menuList#listId
        * @param {menuList} menuList menuList对象
        * @description 下拉列表的ID，用于对下拉列表操作
		* @default {menuList} ""
		* @example
		* $("#link").menuList({listId:"listBox_1"});
        */
		listId :""
		},
		_create:function(){

		},
		_init:function(){
			var o = this.options,
				_self = this.element,
				_menuList = $("<div />").addClass("ui-menuList").append("<ul />").attr("id",o.listId);
				_menuList.find("ul").append("<li>菜单列表</li><li>菜单列表</li><li>菜单列表</li><li>菜单列表</li>"),
				fn = o.fn;
			/***
			 * @description json参数可以传入.json文件的地址，也可以传入json格式的字符串。
			 					*（不能直接串如json串，必须为字符串格式） *
			 * @modify huanghui
			 * @date2012-10-24
			 */
			if(typeof(o.json)=='object'){
				alert('json参数请传入json格式的字符串！');
				return ;
			}
			if(o.json.indexOf('[{')==0){
				var json = JSON.parse(o.json);
				exeJson(json);
			}else{
				$.getJSON(o.json,function(data){
					exeJson(data);
					return false;
				});
			}
			function exeJson(data){
				_menuList.find("ul").empty();
				$.each(data,function(entryIndex,entry){
					var menuListText = "";
					if(entry['menuList'].length>5){
						menuListText = entry['menuList'].substring(0,5)+"...";
					}else{
						menuListText = entry['menuList'];
					}
					var html = "";
					if(entry['menuList']=="管理角色组"){
						html = "<li id='" + entry['id'] + "' title='"+entry['menuList']+"' style='color:blue' >" + menuListText +"</li>";
					}else{
						html = "<li id='" + entry['id'] + "' title='"+entry['menuList']+"' >" + menuListText +"</li>";
					}
					_menuList.find("ul").append(html);
				});
			}
			_menuList.find("li").hover(function(){
					$(this).addClass("h");
			},function(){
					$(this).removeClass("h");
			});
			if(_self.is(".buttonPro")){
				_self = _self.parent().parent();
			}
            _menuList.insertAfter(_self);
            _self.unbind("click").bind("click",function(event){
                getMenuListPosition(height);
                _menuList.slideToggle();
                event.stopPropagation();
            });
            fn();
             /**
             * flag=true:在div外面点击，div收缩
             * flag=false:在div内点击。
             * 给div绑定事件设置flag的值，
             * 还有_self也需要将其设置为false
              * huanghui@2012-3-12
             * */
            var flag= true;
            _menuList.mouseout(function(){
                flag=true ;
            });
            _self.mouseover(function(){
                flag=false;
            }).mouseout(function(){
                flag=true;
            });

            //给document绑定mouseup事件
            $(document).bind("mouseup",function(){
                var div = document.getElementById(o.listId);
                if (div=='' ||div==null||div == 'undefined' ) {
                    return ;
                }
                if(div.style.display!="none"&&flag){
                    div.style.display="none";
                }
            });

            /**
             * _menuList定位 ，给div进行定位
             * 问题：可能在页面滑动的时候，div定位不正确
             * huanghui@2012-3-12
             * */
            var height;
            setTimeout(function(){
              _menuList.css({
                    "left":-1000,
                    "top":-1000,
                    "z-index":9999,
                    "display":"block"
                });
                height = _menuList.height();
                _menuList.css("display","none");
            },500);
            $(window).bind("resize",function(){
                _menuList.slideUp();
            }).bind("scroll",function(){
                _menuList.slideUp();
            });   //当滚动条滑动的时候，下拉div消失
            function getMenuListPosition(height){
                var _selfTop = _self.offset().top ;
                var _selfLeft =  _self.offset().left;
                var top = _selfTop +_self.height();
                var _h = $(window).height()-top;
                if(_h<height && height<=_selfTop){    //下面放不下了，div向上的情况
                     top = _selfTop - height -7;
                    _menuList.css({'top':top+'px','left':_selfLeft+'px'})  ;
                }
                else if(_h<height && height>_selfTop){  //上面和下面都放不下了，div向下显示的情况
                    _selfLeft = _selfLeft-8;
                    _menuList.css({'top':top+'px','left':_selfLeft+'px'})  ;
                }
                else{                                //一般情况，div向下显示
                	if(_self.parent('#d_search').size()!=0){
	                	top = top - 10;
	                	_selfLeft =_selfLeft -10;
                	}
                     _menuList.css({'top':top+'px','left':_selfLeft+'px'})  ;
                }
            }
            if(o.dateShow){
	             /**
	             * 选择后，数据回选,并且div隐藏（dateShow==true）
	             * huanghui@2012-3-12
	             * */
	            _menuList.click(function(event){
	                if($(event.target).is("li")){
	                    var targetId = $(event.target).text();
	                    var but = $("#"+o.listId).prev('span').children('span').children('input') ;
	                    if(but.size()==0){
	                        but = $("#"+o.listId).prev('a')  ;
	                        but.text(targetId+"▼");
	                    }else{
	                       but.attr("value",targetId) ;
	                    }
					}
	            	
	            });
            }
            /**
             * ipad 上解决window绑定事件，
             * 如果div显示，点击其他document元素div隐藏
             * huanghui@2012-3-13
             * */
            if("ontouchstart" in window){
                window.document.body.addEventListener("touchstart",function(e){
                    var className = $(e.target).parent('ul').parent('div').attr("class");
                     if(className==null||className=='undefined'||className==''||!(className.match('ui-menuList'))){
                        var div = document.getElementById(o.listId);
                        if(div.style.display!="none"){
                            div.style.display="none";
                        }
                    }
                },false);
            }
		},
		/**
		* @description 销毁下拉菜单
		* @example
		* $("#link").menuList('destroy');
		*/
		destroyMenuList:function(){
			if(this.element.is(".buttonPro")){
				this.element.unbind("click").parent().parent().next(".ui-menuList").remove();
			}else{
				this.element.unbind("click").next(".ui-menuList").remove();
			}
            return 1;
		}
	});

$.extend($.ui.menuList, {
	version: "1.2"
});

})(jQuery);
//initialize
/*$(function(){
		 $(".menuList").menuList();
});*/

/*
 *作    者: 张勇辉 
 *版    本. 1.2 
 *完成时间: 
 *描    述: progressBar
 *关联文件: 
 */
(function($,undefined){
    /** 
	* @class 标准进度条插件
    * @name progressBar
    * @description 标准进度条插件
	* @version 1.2 
    */
	$.widget("ui.progressBar",
	/** @lends buttonPro.prototype */		 
	{
		options:{
        /**  
        * @name progressBar#width  
        * @param {string} progressBar progressBar对象 
        * @description 宽度 
		* @default {string} "100%"
		* @example
		* $("#txt").progressBar({width:"100px"});
        */
			width:"100%"
		},
		_create:function(){
			//插件实现代码 
			var o = this.options;
			var $this = this.element;
			var $progressBar=$("<div class='ui-progressBar'><span><b></b></span></div>");
			//显示百分比文字
			$this.wrap($progressBar);
			$this.hide();
		},
		_init:function(){
			var $this = this.element,
				$progressBar = $this.parent().parent().parent(),
				o = this.options;
			$progressBar.width(o.width);
			if($this.val()<=100){
				$this.parent().animate({width:$this.val()+"%"},"fast");
			}
		},
		//desc by gaona 2012-03-09 添加销毁事件 begin 
		/**
		* @description 销毁按钮
		* @return {progressBar} progressBar对象
		* @example
		* $("#logo").progressBar('destroy');
		*/
		destroy:function(){
			var targetLen = this.element.parents('.ui-progressBar').length ;
			if(targetLen>0){
				this.element.unwrap().unwrap().unwrap();
				this.element.css('display','block') ;
				return this.element;
			}
		}
		//desc by gaona 2012-03-09 添加销毁事件 end
});

$.extend($.fn.progressBar, {
	version: "1.2"
});
})(jQuery);
//initialize
$(function(){
	$(".progressBar").progressBar();	   
});

/*
 *作    者: 万莎 
 *版    本: 1.2
 *完成时间: 2011-10-24
 *描    述: minProgressBar
 *关联文件: 
 */
(function($,undefined){
    /** 
	* @class 微型进度条插件
    * @name minProgressBar
    * @description 微型进度条插件
	* @version 1.2 
    */
	$.widget("ui.minProgressBar",
	/** @lends buttonPro.prototype */		 
	{
        options:{
            /**
            * @name minProgressBar#dataValue
            * @param {minProgressBar} minProgressBar minProgressBar对象
            * @description  设置进度条的百分值,默认为空
            * @default {minProgressBar} ""
            * @autor  huanghui@2012-5-21
            * $("#link").minProgressBar({dataValue:"80"});
            */
            dataValue:""
        },
		_create:function(){
			//插件实现代码 
			var $this = this.element,
				_color = $this.attr("data-color") || '';
			var $val = $("<div class='ui-min-progressBar-dataValue'>"+$this.val()+"</div>");
			var $minProgressBar=$("<div class='ui-min-progressBar'><span></span></div>");
			var $plan = $('<b class="'+_color+'Color"></b>') ;
			$this.wrap($minProgressBar).wrap($plan).before($val).hide();
		},
		_init:function(){
            //modify huanghui@2012-5-21 加入dataValue参数，给进度条动态赋值
			var $this = this.element,o= this.options;
            if(o.dataValue=='' ||o.dataValue==null ||o.dataValue=='undefined'){
                  if($this.val()<=100){
                    $this.parent().animate({width:$this.val()+"%"},"fast");
                }
            }else{
                if(o.dataValue>0 && o.dataValue<=100){
                    $('div.ui-min-progressBar-dataValue').text(o.dataValue);
                    $this.parent().animate({width:o.dataValue+"%"},"fast");
                }

            }

		},
		//desc by gaona 2012-03-12 添加销毁事件 begin 
		/**
		* @description 销毁插件
		* @return {minProgressBar} minProgressBar对象
		* @example
		* $("#logo").minProgressBar('destroy');
		*/
		destroy:function(){
			var targetLen = this.element.parents('b').length ;
			if(targetLen>0){
				this.element.parents('b').children('div').remove() ;
				this.element.unwrap().unwrap().unwrap();
				this.element.css('display','block') ;
				return this.element;
			}			
		}
		//desc by gaona 2012-03-12 添加销毁事件 end
});

$.extend($.fn.minProgressBar, {
	version: "1.2"
});

})(jQuery);
//initialize
$(function(){
	$(".minProgressBar").minProgressBar();	   
});

/*
 *作    者: 万莎 
 *版    本: 1.2
 *完成时间: 2011-10-24
 *描    述: miniProgressBar
 *关联文件: 
 */
(function($,undefined){
    /** 
	* @class 微型进度条插件
    * @name minProgressBar
    * @description 微型进度条插件
	* @version 1.2 
    */
	$.widget("ui.miniProgressBar",
	/** @lends buttonPro.prototype */		 
	{
        options:{
          /**
            * @name miniProgressBar#dataValue
            * @param {miniProgressBar} miniProgressBar miniProgressBar对象
            * @description  设置进度条的百分值，默认为空
            * @default {miniProgressBar} ""
            * @autor  huanghui@2012-5-21
            * $("#link").miniProgressBar({dataValue:"80"});
            */
            dataValue:""
        },
		_create:function(){
			//插件实现代码 
			var $this = this.element;
			var $val = $("<div class='ui-mini-progressBar-dataValue'>"+$this.val()+"%</div>");
			var $plan = $("<b></b>");
			var $miniProgressBar=$("<div class='ui-mini-progressBar'><span></span></div>");
			$this.after($val);
			$this.wrap($miniProgressBar);
			$this.wrap($plan);
			$this.hide();
		},
		_init:function(){
            //modify huanghui@2012-5-21 加入dataValue参数，给进度条动态赋值
			var $this = this.element,o=this.options;
			if(o.dataValue=='' ||o.dataValue==null ||o.dataValue=='undefined'){
                if($this.val()<=100){
				    $this.parent().animate({width:$this.val()+"%"},"fast");
			    }
            }else{
                if(o.dataValue>0 &&o.dataValue<=100){
                     $this.val(o.dataValue);
                     $this.parents('div.ui-mini-progressBar').next('div').text(o.dataValue+"%");
                     $this.parent().animate({width:o.dataValue+"%"},"fast");
                }
            }

		}  ,
        /**
		* @description 销毁插件方法
		* @return {minProgressBar} minProgressBar对象
		* @autor  huanghui@2012-5-21
		* $("#logo").minProgressBar('destroy');
		*/
		destroy:function(){
			var targetLen = this.element.parents('b').length ;
			if(targetLen>0){
				this.element.parents('div.ui-mini-progressBar').next('div').remove() ;
                this.element.unwrap().unwrap().unwrap();
				this.element.css('display','block') ;
				return this.element;
			}
		}
});

$.extend($.fn.miniProgressBar, {
	version: "1.2"
});

})(jQuery);
//initialize
$(function(){
	$(".miniProgressBar").miniProgressBar();	   
});// toolbar
(function($,undefined){
	$.widget("ui.toolbar",
	{
		options:{},
		_create:function(){
			var _self = this.element,
				o = this.options,
				_type = _self.attr("data-type") || "top";
			_self.addClass("ui-toolbar");
			if(_type == "bottom"){
				_self.addClass("ui-toolbarBottom");
			}else if(_type == "top"){
				_self.addClass("ui-toolbarTop");
			}
		},
		_init:function(){},
		show:function(){},
		hide:function(){},
		destroy:function(){
			this.element.removeClass("ui-toolbar ui-toolbarBottom ui-toolbarTop");
		}
		
	});
	$.extend($.ui.toolbar, {
		version: "1.2"
	});
})(jQuery);
//initialize
$(function(){
		 $(".toolbar").toolbar();
});
/*
 *作    者: 张勇辉 
 *版    本: 1.3 
 *完成时间: 2011-08-25 
 *描    述: inputText 
 *关联文件: jQuery.js|jquery-ui.js 
 *修改记录：huanghui 2012-10-10 v1.3版本，加入css3样式圆角和边框阴影、修改禁用启用方法
 */	
(function($,undefined){
	/** 
	* @class 表单单行文本框
    * @name stateBox
    * @description 单行文本框插件 
	* @requires jQuery.js|jquery-ui.js 
	* @version 1.3 
    */
	$.widget("ui.inputText",
	 /** @lends stateBox.prototype */	 
	{
		options:{
		},
		_create:function(){
			var _self = this.element,
			 	currentFocus = false;
			if(_self.is(".minSearch")){
				/*预留的控制域*/
			}else{
				_self.addClass("ui-inputText");
				_self.mouseover(function(){
					_self.addClass("ui-inputText-active");
				})
				.focus(function(){
					currentFocus = true;
					_self.addClass("ui-inputText-active");
				})
				.blur(function(){
					currentFocus = false;
					_self.removeClass("ui-inputText-active");
				})
				.mouseout(function(){
					if(!currentFocus){
					_self.removeClass("ui-inputText-active");
					}
				});
			}
		},
		_init:function(){
		},
		/**
		* @description 显示单行文本框
		* @return {inputText} inputText对象
		* @example
		* $("#logo").inputText('show');
		*/
		show:function(){
			var _self = this.element;
			_self.show();
			return _self;
		},
		/**
		* @description 隐藏单行文本框
		* @return {inputText} inputText对象
		* @example
		* $("#logo").inputText('hide');
		*/
		hide:function(){
			var _self = this.element;
			_self.hide();
			return _self;
		},
		/**
		* @description 禁用单行文本框
		* @return {inputText} inputText对象
		* @example
		* $("#logo").inputText('disable');
		*/
		disable:function(){
			var _self = this.element;
			_self.attr("disabled",true).css("borderColor","#ddd");
			return _self;
		},
		/**
		* @description 启用单行文本框
		* @return {inputText} inputText对象
		* @example
		* $("#logo").inputText('enable');
		*/
		enable:function(){
			var _self = this.element;
			_self.attr("disabled",false).css("borderColor","");
			return _self;
		},
		/**
		* @description 销毁单行文本框
		* @return {inputText} inputText对象
		* @example
		* $("#logo").inputText('destroy');
		*/
		destroy:function(){}
	});
	
$.extend($.ui.inputText, {
	version: "1.3"
});

})(jQuery);
//initialize
$(function(){
	$("input:text,input:password").inputText();   
});
/*
 *作    者: 张勇辉 
 *版    本: 1.3 
 *完成时间: 2011-08-25 
 *描    述: inputSelect 
 *关联文件: jQuery.js|jquery-ui.js 
 *修改记录：huanghui 2012-10-10 v1.3版本，加入css3样式圆角和边框阴影、修改禁用启用方法 
 */	
(function($,undefined){
	/** 
	* @class 下拉菜单 
    * @name inputSelect
    * @description 下拉菜单 
	* @requires jQuery.js|jquery-ui.js 
	* @version 1.3
    */
	$.widget("ui.inputSelect",
	 /** @lends inputSelect.prototype */	 
	{
		options:{
		},
		_create:function(){
			var _self = this.element,
			 	currentFocus = false;
			_self.addClass("ui-inputSelect");
			_self.mouseover(function(){
				_self.addClass("ui-inputSelect-active");
			})
			.focus(function(){
				currentFocus = true;
				_self.addClass("ui-inputSelect-active");
			})
			.blur(function(){
				currentFocus = false;
				_self.removeClass("ui-inputSelect-active");
			})
			.mouseout(function(){
				if(!currentFocus){
				_self.removeClass("ui-inputSelect-active");
				}
			});
		},
		_init:function(){
		},
		/**
		* @description 显示下拉选择框
		* @return {inputSelect} inputSelect对象
		* @example
		* $("#logo").inputSelect('show');
		*/
		show:function(){
			var _self = this.element;
			_self.show();
			return _self;
		},
		/**
		* @description 隐藏下拉选择框
		* @return {inputSelect} inputSelect对象
		* @example
		* $("#logo").inputSelect('hide');
		*/
		hide:function(){
			var _self = this.element;
			_self.hide();
			return _self;
		},
		/**
		* @description 禁用下拉选择框
		* @return {inputSelect} inputSelect对象
		* @example
		* $("#logo").inputSelect('disable');
		*/
		disable:function(){
			var _self = this.element;
			_self.attr("disabled",true).css("borderColor","#ddd");
			return _self;
		},
		/**
		* @description 启用下拉选择框
		* @return {inputSelect} inputSelect对象
		* @example
		* $("#logo").inputSelect('enable');
		*/
		enable:function(){
			var _self = this.element;
			_self.attr("disabled",false).css("borderColor","");
			return _self;
		},
		/**
		* @description 销毁下拉选择框
		* @return {inputSelect} inputSelect对象
		* @example
		* $("#logo").inputSelect('destroy');
		*/
		destroy:function(){}
	});
	
$.extend($.ui.inputSelect, {
	version: "1.3"
});

})(jQuery);
//initialize
$(function(){
	$("select").inputSelect();   
});
/*
 *作    者: 张勇辉 
 *版    本: 1.3 
 *完成时间: 2011-08-25 
 *描    述: inputText 
 *关联文件: jQuery.js|jquery-ui.js
 *修改记录：huanghui 2012-10-10 v1.3版本，加入css3样式圆角和边框阴影、修改禁用启用方法 
 */	
(function($,undefined){
	/** 
	* @class 表单多行输入框插件 
    * @name stateBox
    * @description 表单多行输入框插件 
	* @requires jQuery.js|jquery-ui.js 
	* @version 1.3
    */
	$.widget("ui.inputTextarea",
	 /** @lends stateBox.prototype */	 
	{
		options:{
		},
		_create:function(){
			var _self = this.element,
			 	currentFocus = false;
			_self.addClass("ui-inputTextarea");
			_self.mouseover(function(){
				_self.addClass("ui-inputTextarea-active");
			})
			.focus(function(){
				currentFocus = true;
				_self.addClass("ui-inputTextarea-active");
			})
			.blur(function(){
				currentFocus = false;
				_self.removeClass("ui-inputTextarea-active");
			})
			.mouseout(function(){
				if(!currentFocus){
				_self.removeClass("ui-inputTextarea-active");
				}
			});
		},
		_init:function(){
		},
		/**
		* @description 显示单行文本框
		* @return {inputTextarea} inputTextarea对象
		* @example
		* $("#logo").inputTextarea('show');
		*/
		show:function(){
			var _self = this.element;
			_self.show();
			return _self;
		},
		/**
		* @description 隐藏多行文本框
		* @return {inputTextarea} inputTextarea对象
		* @example
		* $("#logo").inputTextarea('hide');
		*/
		hide:function(){
			var _self = this.element;
			_self.hide();
			return _self;
		},
		/**
		* @description 禁用多行文本框
		* @return {inputTextarea} inputTextarea对象
		* @example
		* $("#logo").inputTextarea('disable');
		*/
		disable:function(){
			var _self = this.element;
			_self.attr("disabled",true).css("borderColor","#ddd");
			return _self;
		},
		/**
		* @description 启用多行文本框
		* @return {inputTextarea} inputTextarea对象
		* @example
		* $("#logo").inputTextarea('enable');
		*/
		enable:function(){
			var _self = this.element;
			_self.attr("disabled",false).css("borderColor","");
			return _self;
		},
		/**
		* @description 销毁多行文本框
		* @return {inputTextarea} inputTextarea对象
		* @example
		* $("#logo").inputTextarea('destroy');
		*/
		destroy:function(){}
	});
	
$.extend($.ui.inputTextarea, {
	version: "1.3"
});

})(jQuery);
//initialize
$(function(){
	$("textarea").inputTextarea();   
});/*
 *作    者: 张文钦
 *作    者: 万莎
 *完成时间: 2011-10-18
 *描    述: tab
 *关联文件: jQuery.js|jquery-ui.js
 * modify huanghui@2012-12-7 加入tabMenu菜单选项卡
 */
(function($,undefined){
    /**
	* @class 选项卡插件
    * @name tab
    * @description 选项卡插件
	* @requires jQuery.js|jquery-ui.js
	* @version 1.3
    */
    $.widget("ui.tab",{
        options:{},
        _create:function(){
            var _self = this.element,
				o = this.options,
                _type = _self.attr("data-tabType") || "min";
                //_type 取值为 min/pro
                /*选项卡内容处理*/
                if ( _type === "minLeft" ) {
                    _self.addClass("ui-tabMin-rl");
                } else if(_type==='tabMenu'){
					_self.addClass("ui-tabMenu");
				}else {
                    _self.addClass((_type === 'min')?"ui-tabMin":"ui-tabPro");//由类型添加对应的类
                }
                _self.find(">dt").attr("class","normal");
                _self.click(function(e){
					var _targetId = _self.attr('data-targetId');
                    var $target = $(e.target);
                    if($target.is('dt')){
                        if(_targetId === 'div'){//简洁选项卡//标准选项卡内容区为div替换
                            var $recentActiveTab = _self.find('>dt.active');
                                $recentActiveTab.attr('class','normal').attr('data-targetId');
                                $('#'+$recentActiveTab.attr('data-targetId')).css('display','none');
                                $target.attr('class','active');
                                $('#'+$target.attr('data-targetId')).css('display','block');
                        }else if(_targetId != 'div' && _targetId !='brrowTab'){//标准选项卡
					        var _url = $target.attr('data-tabUrl');
                            _self.find('>dt[class="active"]').attr('class','normal');
                            $target.attr('class','active');
							o.injected = o.injected || false;
                            var $targetIframe = $("#"+_targetId);
                            var $module;
                            if ( !o.injected ) {
                              $module = $('<div class="tab-iframe-module"></div>');
                              $module.insertBefore($targetIframe);//往后+遮不住
                              o.injected = true;
                            } else {
                              $module = $targetIframe.prev("div.tab-iframe-module");
                            }
                            $module.css("display","block");
                            $targetIframe.attr("src",_url).bind("load",function(){
                              $module.css("display","none");
                            });
				        }
                    }
                });
        },
        _init: function(){
             //this.element.find(">dt:first").attr('class','active').click();
            var _self = this.element,
        		_flag = _self.attr("data-flag") || '';
        	if(_flag == ''){
        		//默认的 竖直时使用inline-block获取高度
        		_self/*.css("display","block")*/.find(">dt:first").attr('class','active').click();
        	}else{//_flag 1 2 3
        		_self/*.css("display","block")*/.find('>dt').eq(_flag-1).attr('class','active').click();
        	}
        },
		show: function(){
            var _self = this.element;
			_self.show();
            return _self;
        },
		hide: function(){
            var _self = this.element;
			_self.hide();
            return _self;
        },
        enable: function() {},
        disable: function() {},
		destroy: function(){
            var _self = this.element;
			_self.removeClass("ui-tabMin ui-tabPro ui-tabMin-rl");
            return _self;
		}
    });
$.extend($.ui.tab, {
	version: "1.3"
});
})(jQuery);
//initialize
$(function(){
	$(".ui-tab").tab();
});

﻿
/*
 *作    者: 张勇辉 
 *版    本: 1.2 
 *完成时间: 2011-11-30 
 *描    述: touchwipe 
 *关联文件: jQuery.js  
 */
 	
/*
 *	#example:
 *	$("#test").touchwipe({
 *			min_move_x: 40, //横向灵敏度
 *			min_move_y: 40, //纵向灵敏度
 *			wipeLeft: function() {$("#val").append("左，");}, //左侧滑动事件
 *			wipeRight: function() { $("#val").append("右，");}, //右侧滑动事件
 *			wipeUp: function() { $("#val").append("上，");}, //向上滑动事件
 *			wipeDown: function() { $("#val").append("下，");}, //向下滑动事件
 *			wipe:function(){$("#val").append("点击，");}, //触摸事件
 *			wipehold:function(){$("#val").append("保持，");}, //触摸保持事件
 *			preventDefaultEvents: true //阻止默认事件
 *		});
 *
 */
 
(function($) { 
    /** 
	* @class touchWipe监听器
    * @name touchwipe
    * @description 监听touchmove的方向
	* @version 1.2 
	* @author 张勇辉 
	* @requires jQuery-1.5.2+
    */

   $.fn.touchwipe = function(settings) {
	   /** @lends touchwipe.prototype */	
     var config = {
			/**  
			* @name touchwipe#min_move_x  
			* @param {Num}  数字类型
			* @description 横向响应精度
			* @default {Num} 20
			* @example
			* $("#handle").touchwipe({
			*		min_move_x: 50
			*    });
			*/
    		min_move_x: 20,
			/**  
			* @name touchwipe#min_move_y  
			* @param {Num} 数字类型 
			* @description 纵向响应精度
			* @default {Num} 20
			* @example
			* $("#handle").touchwipe({
			*		min_move_y: 50
			*    });
			*/
    		min_move_y: 20,
			/**  
			* @name touchwipe#wipeLeft  
			* @param {Fn} 函数 
			* @description 向左滑动触发的动作 
			* @default {Fn} function(){}
			* @example
			* $("#handle").touchwipe({
			*		wipeLeft: function() {alert("向左滑动")}
			*    });
			*/
 			wipeLeft: function() { },
			/**  
			* @name touchwipe#wipeRight  
			* @param {Fn} 函数 
			* @description 向右滑动触发的动作 
			* @default {Fn} function(){}
			* @example
			* $("#handle").touchwipe({
			*		wipeRight: function() {alert("向右滑动")}
			*    });
			*/
 			wipeRight: function() { },
			/**  
			* @name touchwipe#wipeUp  
			* @param {Fn} 函数 
			* @description 向上滑动触发的动作 
			* @default {Fn} function(){}
			* @example
			* $("#handle").touchwipe({
			*		wipeUp: function() {alert("向上滑动")}
			*    });
			*/
 			wipeUp: function() { },
			/**  
			* @name touchwipe#wipeDown  
			* @param {Fn} 函数 
			* @description 向下滑动触发的动作 
			* @default {Fn} function(){}
			* @example
			* $("#handle").touchwipe({
			*		wipeDown: function() {alert("向下滑动")}
			*    });
			*/
 			wipeDown: function() { },
			/**  
			* @name touchwipe#wipe  
			* @param {Fn} 函数 
			* @description 点击事件（一次完整的点击操作） 
			* @default {Fn} function(){}
			* @example
			* $("#handle").touchwipe({
			*		wipe: function() {alert("点击")}
			*    });
			*/
			wipe:function(){},
			/**  
			* @name touchwipe#wipehold  
			* @param {Fn} 函数 
			* @description 按下并且保持将近一秒的时间触发(750毫秒) 
			* @default {Fn} function(){}
			* @example
			* $("#handle").touchwipe({
			*		wipehold: function() {alert("保持")}
			*    });
			*/
			wipehold:function(){},
			/**  
			* @name touchwipe#preventDefaultEvents  
			* @param {Boolean } 布尔 
			* @description 是否阻止当前元素的默认事件 
			* @default {Boolean} true
			* @example
			* $("#handle").touchwipe({
			*		preventDefaultEvents: true
			*    });
			*/
			preventDefaultEvents: true
	 };
     
     if (settings) $.extend(config, settings);
 
     this.each(function() {
    	 var startX;
    	 var startY;
		 var isMoving = false;
		 var isHold = false;
		 var timer;

    	 function cancelTouch() {
    		 this.removeEventListener('touchmove', onTouchMove);
    		 startX = null;
    		 isMoving = false;
			 clearTimeout(timer);
    	 }	
    	 
    	 function onTouchMove(e) {
    		 if(config.preventDefaultEvents) {
    			 e.preventDefault();
    		 }
    		 if(isMoving) {
	    		 var x = e.touches[0].pageX;
	    		 var y = e.touches[0].pageY;
	    		 var dx = startX - x;
	    		 var dy = startY - y;
	    		 if(Math.abs(dx) >= config.min_move_x) {
	    			cancelTouch();
	    			if(dx > 0) {
	    				config.wipeLeft();
	    			}
	    			else {
	    				config.wipeRight();
	    			}
	    		 }
	    		 else if(Math.abs(dy) >= config.min_move_y) {
		    			cancelTouch();
		    			if(dy > 0) {
		    				config.wipeUp();
		    			}
		    			else {
		    				config.wipeDown();
		    			}
		    		 }
    		 }
    	 }
		 		 
		 function onTouchEnd(){
			clearTimeout(timer);
			 if(!isHold && isMoving){
				 config.wipe();
			 }
			isHold = false;  
		  }
		 
		 function onTouchHold(){
			 isHold = true;
			 config.wipehold();
		 }
		 
    	 function onTouchStart(e)
    	 {
    		 if (e.touches.length == 1) {
    			 startX = e.touches[0].pageX;
    			 startY = e.touches[0].pageY;
    			 isMoving = true;
    			 this.addEventListener('touchmove', onTouchMove, false);
				 timer = setTimeout(onTouchHold,750);
    		 }
    	 }    	 
    	 if ('ontouchstart' in document.documentElement) {
    		 this.addEventListener('touchstart', onTouchStart, false);
			 this.addEventListener('touchend', onTouchEnd, false);
    	 }
     });
 
     return this;
   };
   $.extend($.fn.touchwipe, {
			version: "1.2",
			author:"张勇辉"
			});
 
 })(jQuery);
/**
 * @作者 张文钦
 * @时间 2011-10-18
 * @描述 实时搜索
 * @关联 jquery-1.5.2.js
 * @版本 1.2
 */
(function($){
	/**
	* @class 实时搜索插件
    * @name rtSearch
    * @description 实时搜索插件
	* @requires jQuery.js|jquery-ui.js
	* @version 1.2
    */
    $.fn.rtSearch = function(options){
        /**参数、属性扩展*/
        var defaults = {
		   /**  
			* @name rtSearch#width  
			* @param {String} rtSearch rtSearch对象
			* @description 搜索框长度
			* @default {width} "100%"
			* @example
			* $('.rtSearch').rtSearch({width:'200px'});
			*/
            width:'100%',
            /**
             * @param timeout 
             */
            /**  
			* @name rtSearch#timeout  
			* @param {Number} rtSearch rtSearch对象
			* @description 执行自定义响应函数的间隙时间(单位:毫秒)
			* @default {timeout} 600
			* @example
			* $('.rtSearch').rtSearch({timeout:1000});
			*/
            timeout:600,
		   /**  
			* @name rtSearch#searchHandler  
			* @param {fn} rtSearch searchHandler对象 
			* @description 自定义实时搜索处理函数
			* @default {fn} function(){}
			* @example
			* $(".rtSearch").rtSearch({
			*	searchHandler : function(){
			*		alert("响应了实时搜索");
			*		}
			*    });
			*/
            searchHandler:function(){},
            /**  
			* @name rtSearch#onFocus  
			* @param {fn} rtSearch onFocus对象 
			* @description 输入框获得焦点时执行的方法
			* @default {fn} function(){}
			* @example
			* $(".rtSearch").rtSearch({
			*	onFocus : function(){
			*		alert("输入框获得焦点");
			*		}
			*    });
			*/
            onFocus:function(){},
            /**
             * 输入框失去焦点时之行的方法
             */
            /**  
			* @name rtSearch#onBlur
			* @param {fn} rtSearch onBlur对象 
			* @description 输入框失去焦点时执行的方法
			* @default {fn} function(){}
			* @example
			* $(".rtSearch").rtSearch({
			*	onBlur : function(){
			*		alert("输入框失去焦点");
			*		}
			*    });
			*/ 
            onBlur:function(){},
            /**  
			* @name rtSearch#search_mode
			* @param {number} 数字类型 
			* @description 搜索的方式默认值为2，可选值为0:严格搜索,1普通搜索,2自定义搜索方式
			* @default {number} 2
			* @example
			* $(".rtSearch").rtSearch({
			*	search_mode : 2
			* });
			*/
			search_mode : 2
        };
		//判断是否清除插件 2012-03-07 desc by gaona
		if(options != 'destory'){
			var opt = $.extend(defaults,options);
			var _focus = false;
			var _timeSignal = null;
			this.each(function(){
				var $this = $(this);
				var $widgetBox = $('<div class="jh-widgets-rtSearch" style="width:'+opt.width+'"></div>');
				var $searchIco = $('<span class="rt-search-ico"></span>');
				//add clear btn 2012-03-07 desc by gaona
				var $clearIco = $('<span class="rt-clear-ico"></span>');
				var $sHandler = opt.searchHandler;
				var $onFocus = opt.onFocus;
				var $onBlur = opt.onBlur;
				$this.css('width',parseInt(opt.width)-48) ;				
				//desc by gaona 2012-03-07 判断是否已经创建dom元素开始  
				if($this.attr('data-dom')!='true'){
					$this.wrap($widgetBox).before($searchIco).after($clearIco) ;
					$this.attr('data-dom','true') ;
				}else{
				}
				//desc by gaona 2012-03-07 判断是否已经创建dom元素结束  
				$this.focus(function(){
					 _focus = true;
					 if($onFocus != undefined){
						 $onFocus();
					 }
					 //执行实时搜索 2012-03-07 modfiy by gaona 
					 var searchMode = opt.search_mode ;
					 switch(searchMode){
						 case 0 :_timeSignal = setInterval(function(){searchStrict($.trim($this.val())) ;},opt.timeout) ; break ;
						 case 1 :_timeSignal = setInterval(function(){searchCommon($.trim($this.val())) ;},opt.timeout) ; break ;
						 case 2 :_timeSignal = setInterval(function(){$sHandler() ;},opt.timeout) ; break ;
					 }					 
				 })
				 .blur(function(){
					clearInterval(_timeSignal);
					_focus = false;
					if($onBlur != undefined){
						$onBlur();
					}
				 });
				 // 2012-03-07 desc by gaona begin
				 //清空输入框内容 
				 $this.parents('.jh-widgets-rtSearch').children('.rt-clear-ico').click(function(){
					$this.val('') ;	
				 }) ;
				 //清空输入框内容 
				 
				 //搜索方法--严格搜索
				 function searchStrict(keyword){
					 var $searchCon = $('#searchCon>p');
					/*清空*/
					$searchCon.find('span[class^="highlight"]').each(function(index){
						$(this).replaceWith($(this).text());
					});
					/*匹配高亮*/
					if(keyword != null && keyword != ''){
					   var _regexp = new RegExp('('+keyword+')','g');
					   var _text = $searchCon.text();
					   if(_regexp.test(_text)){
						   $searchCon.html(_text.replace(_regexp,'<span class="highlight">$1</span>'));
					   }
					}
				 }
				 //搜索方法--普通搜索
				 function searchCommon(keyword){
					 var $searchCon = $('#searchCon>p');
					/*清空*/
					$searchCon.find('span[class^="highlight"]').each(function(index){
						$(this).replaceWith($(this).text());
					});
					/*匹配高亮*/
					if(keyword != null && keyword != ''){
					   var _regexp = new RegExp('('+keyword+')','g');
					   var _text = $searchCon.text();
					   var strReg = "[\s,./，。、《》？<>?`~!@#$%^&*()_+|·~！@#￥%&*（）——+|]" ; //定义被忽略的特殊字符
					   var reg = new RegExp(strReg,"g") ;
					   var _comKeyword = keyword.replace(reg,"") ; 
					   var _comregexp = new RegExp('('+_comKeyword+')','g') ;
					   if(_regexp.test(_text)){
						   $searchCon.html(_text.replace(_regexp,'<span class="highlight">$1</span>'));
					   }else if(_comregexp.test(_text)){
						   $searchCon.html(_text.replace(_comregexp,'<span class="highlight">$1</span>'));
					   }
					}
				 }
				 //2012-03-07 desc by gaona end
			});
		}else{
			//desc by gaona 2012-03-07 添加销毁事件开始
			if($(this).attr('data-dom') == 'true'){
				$(this).parents('.jh-widgets-rtSearch').children('span').remove() ;
				$(this).unwrap() ;
			}
			$(this).attr('data-dom','false') ;
			//desc by gaona 2012-03-07 添加销毁事件结束
		}
    };
    $.extend($.fn.rtSearch, {version: "1.2"});
})(jQuery); /*
 *作    者: 万莎 
 *版    本:  1.2
 *完成时间:  2011-10-17
 *描    述: widgetSlider
 *关联文件: 
 */
(function($,undefined){
    /** 
	* @class 滑块插件
    * @name widgetSlider
    * @description 滑块插件
	* @version 1.2 
    */
	$.widget("ui.widgetSlider",
	{
		options:{
        /**  
        * @name widgetSlider#width  
        * @param {string} widgetSlider widgetSlider对象 
        * @description 宽度 
		* @default {string} "100%"
		* @example
		* $("#txt").widgetSlider({width:"100px"});
        */
			width:"100%"
		},
		_create:function(){
			//插件实现代码
			var o = this.options; 
			var _self = this.element,
				_size = parseInt(_self.attr("data-size"));
			var $widgetSlider=$("<div class='ui-widget-slider'></div>");
			var $div = $("<div><span></span></div>");
			var $handle=$("<b class='handle'></b>");
			var _table="<table border='0' cellspacing='0' cellpadding='0'><tr>";
			for(var i=0;i<_self.val();i++){
				_table = _table + "<td></td>";	
			}
			_table = _table +  "</tr></table>";
			var $table=$(_table);
			_self.wrap($widgetSlider)
			.before($div)
			.before($handle)
			.before($table);
			_self.hide();
			$(".ui-widget-slider table").width($(".ui-widget-slider div").width()+2);
			$(".ui-widget-slider b.handle").draggable({
				containment:"parent",
				axis:"x",
				drag: function() {
					var offset = $(this).position();//$(this).offset();{"left":"100px","top":"200px"}
					var getAll = $(".ui-widget-slider").width();
					var intOffset = parseInt(offset.left);
					var intAll = parseInt(getAll)-16;
					var setVal = parseInt(intOffset / intAll * 100);
					$("#th").val(setVal);
					_self.val( setVal );//更新同步滑块原生结构的值
					$(".ui-widget-slider div span").width(offset.left);
				}
			}).hover(function(){
				$(this).addClass("handleHover");
			}, function(){
				$(this).removeClass("handleHover");
			});
			$(".ui-widget-slider div").click(function(e){
				 var curX = parseInt($(".ui-widget-slider b.handle").position().left);
				 var clickX = parseInt(e.pageX) - _self.siblings('table').offset().left;
				 if(clickX > curX){
					 var getAll = $(".ui-widget-slider").width();
					 var intOffset = parseInt(curX+_size);
					 var intAll = parseInt(getAll)-16;
					 var setVal = parseInt(intOffset / intAll * 100);
					 if(curX + _size > intAll){
						 $("#th").val(100);
						 $(".ui-widget-slider div span").width($(".ui-widget-slider").width()-16+"px");
				 	 	 $(".ui-widget-slider b.handle").css('left',$(".ui-widget-slider").width()-16+"px");
					 }else{
						 $("#th").val(setVal);
						 $(".ui-widget-slider div span").width(curX + _size);
				 	 	 $(".ui-widget-slider b.handle").css('left',curX + _size);
					 }	 
				 }else if(clickX < curX){
					 var getAll = $(".ui-widget-slider").width();
					 var intOffset = parseInt(curX - _size);
					 var intAll = parseInt(getAll)-16;
					 var setVal = parseInt(intOffset / intAll * 100);
					 if(curX - _size < 0){
						 $("#th").val(0);
						 $(".ui-widget-slider div span").width(0);
						 $(".ui-widget-slider b.handle").css('left',0); 
					 }else{
						 $("#th").val(setVal);
						 $(".ui-widget-slider div span").width(curX - _size);
				 	 	 $(".ui-widget-slider b.handle").css('left',curX - _size); 
					 }
				 }
			});
		},
		_init:function(){
			var $this = this.element,
				$widgetSlider = $this.parent(),
				o = this.options;
			$widgetSlider.width(o.width);
			if(o.width != "100%"){
				$widgetSlider.find('>table').width(parseInt(o.width)-16);
			}
		},
		/**
		* @description 显示滑块插件
		* @return {widgetSlider} widgetSlider对象
		* @example
		* $("#logo").widgetSlider('show');
		*/
		show:function(){
			var _self = this.element;
			_self.parent("div.ui-widget-slider").show().prev("input.widget-textinput").show();
			return _self;
		},
		/**
		* @description 隐藏滑块插件
		* @return {widgetSlider} widgetSlider对象
		* @example
		* $("#logo").widgetSlider('hide');
		*/
		hide:function(){
			var _self = this.element;
			_self.parent("div.ui-widget-slider").hide().prev("input.widget-textinput").hide();
			return _self;
		},
		/**
		* @description 禁用滑块插件
		* @return {widgetSlider} widgetSlider对象
		* @example
		* $("#logo").widgetSlider('disable');
		*/
		disable:function(){
			var _self = this.element;
			//接触点击移动滑块
			_self.siblings( "div" ).unbind( "click" );
			//滑块的拖动响应的移除
			_self.siblings( "b" ).draggable( { disabled: true} );
			return _self;
		},
		/**
		* @description 启用滑块插件
		* @return {widgetSlider} widgetSlider对象
		* @example
		* $("#logo").widgetSlider('enable');
		*/
		enable:function(){
			var _self = this.element,_size = parseInt(_self.attr("data-size"));
			_self.siblings( "div" ).click( function( e ) {//此时直接复制_create中方法
				 var curX = parseInt($(".ui-widget-slider b.handle").position().left);
				 var clickX = parseInt(e.pageX) - _self.siblings('table').offset().left;
				 if(clickX > curX){
					 var getAll = $(".ui-widget-slider").width();
					 var intOffset = parseInt(curX+_size);
					 var intAll = parseInt(getAll)-16;
					 var setVal = parseInt(intOffset / intAll * 100);
					 if(curX + _size > intAll){
						 $("#th").val(100);
						 $(".ui-widget-slider div span").width($(".ui-widget-slider").width()-16+"px");
				 	 	 $(".ui-widget-slider b.handle").css('left',$(".ui-widget-slider").width()-16+"px");
					 }else{
						 $("#th").val(setVal);
						 $(".ui-widget-slider div span").width(curX + _size);
				 	 	 $(".ui-widget-slider b.handle").css('left',curX + _size);
					 }	 
				 }else if(clickX < curX){
					 var getAll = $(".ui-widget-slider").width();
					 var intOffset = parseInt(curX - _size);
					 var intAll = parseInt(getAll)-16;
					 var setVal = parseInt(intOffset / intAll * 100);
					 if(curX - _size < 0){
						 $("#th").val(0);
						 $(".ui-widget-slider div span").width(0);
						 $(".ui-widget-slider b.handle").css('left',0); 
					 }else{
						 $("#th").val(setVal);
						 $(".ui-widget-slider div span").width(curX - _size);
				 	 	 $(".ui-widget-slider b.handle").css('left',curX - _size); 
					 }
				 }	
			} );
			_self.siblings( "b" ).draggable( { disabled: false} );
			return _self;
		},
		/**
		* @description 销毁滑块插件
		* @return {widgetSlider} widgetSlider对象
		* @example
		* $("#logo").widgetSlider('destroy');
		*/
		destroy:function(){
			 var _self = this.element;
			_self.show().unbind( "click" ).unwrap().siblings( "div,b,table" ).remove();
			return _self;
		}
});

$.extend($.ui.widgetSlider, {
	version: "1.2"
});

})(jQuery);
//initialize
$(function(){
	$(".widgetSlider").widgetSlider();	   
});/*
 *作    者: 万莎
 *完成时间: 2011-10-19
 *描    述: widgetSpin
 *关联文件: jQuery.js|jquery-ui.js
 */  
(function($){   
  $.fn.extend({   
    spin: function(opt){   
      return this.each(function(){   
        opt = $.extend({   
            imageBasePath: 'images/widgetSpin/',   
            spinBtnImage: 'widgetSpin.png',   
            spinUpImage: 'widgetSpin-up.png',   
            spinDownImage: 'widgetSpin-down.png',   
            interval: 1,   
            max: null,   
            min: null,   
            timeInterval: 500,   
            timeBlink: 200  
          }, opt || {});   
           
        var txt = $(this);   
          
        var spinBtnImage = opt.imageBasePath+opt.spinBtnImage;   
        var btnSpin = new Image();   
        btnSpin.src = spinBtnImage;   
        var spinUpImage = opt.imageBasePath+opt.spinUpImage;   
        var btnSpinUp = new Image();   
        btnSpinUp.src = spinUpImage;   
        var spinDownImage = opt.imageBasePath+opt.spinDownImage;   
        var btnSpinDown = new Image();   
        btnSpinDown.src = spinDownImage;   
           
        var btn = $(document.createElement('img'));   
        btn.attr('src', spinBtnImage);   
        btn.css({cursor: 'pointer', verticalAlign: 'bottom', padding: 0, margin: 0});   
        txt.after(btn);   
        txt.css({marginRight:0, paddingRight:0});   
          
        function spin(vector){   
          var val = txt.val();
          if(!isNaN(val)){   
            val = parseFloat(val) + (vector*opt.interval);   
            if(opt.min!=null && val<opt.min) val=opt.min;   
            if(opt.min!=null && val>opt.max) val=opt.max; 
		    var intAll = parseInt($(".ui-widget-slider").width())-16;
		    var setVal = parseInt(val * intAll / 100);
		    $(".ui-widget-slider div span").width(setVal);
		    $(".ui-widget-slider b.handle").css('left',setVal);
            if(val != txt.val()){   
              txt.val(val);   
              $( ".ui-widget-slider>input" ).val( val );
              txt.change();   
              src = (vector > 0 ? spinUpImage : spinDownImage);   
              btn.attr('src', src);   
              if(opt.timeBlink<opt.timeInterval)   
                setTimeout(function(){btn.attr('src', spinBtnImage);}, opt.timeBlink);   
            }   
          }   
        }   
           
        btn.mousedown(function(e){   
          var pos = e.pageY - btn.offset().top;   
          var vector = (btn.height()/2 > pos ? 1 : -1); 
          (function(){  
            spin(vector);   
            var tk = setTimeout(arguments.callee, opt.timeInterval);   
            $(document).one('mouseup', function(){   
              clearTimeout(tk); btn.attr('src', spinBtnImage);   
            });   
          })();   
          return false;   
        });   
      });   
    }   
  });   
})(jQuery);

(function($,undefined){
    /** 
	* @class 微调组件
    * @name widgetSpin
    * @description 微调组件
	* @version 1.2 
    */
	$.widget("ui.widgetSpin",
	{
		options:{
        /**  
        * @name widgetSpin#width  
        * @param {string} widgetSpin widgetSpin对象 
        * @description 宽度 
		* @default {string} "100%"
		* @example
		* $("#txt").widgetSpin({width:"100px"});
        */
			width:"100%"
		},
		_create:function(){
			//插件实现代码
			var o = this.options; 
			var _self = this.element;
			var $widgetSpin=$("<div class='ui-widget-slider'></div>");
			var $div = $("<div><span></span></div>");
			var $handle=$("<b class='handle'></b>");
			var _table="<table border='0' cellspacing='0' cellpadding='0'><tr>";
			for(var i=0;i<_self.val();i++){
				_table = _table + "<td></td>";	
			}
			_table = _table +  "</tr></table>";
			var $table=$(_table);
			_self.wrap($widgetSpin)
			.before($div)
			.before($handle)
			.before($table);
			_self.hide();
			$(".ui-widget-slider table").width($(".ui-widget-slider div").width()+2);
		},
		_init:function(){
			var $this = this.element,
				$widgetSpin = $this.parent(),
				o = this.options;
			$widgetSpin.width(o.width);
			if(o.width != "100%"){
				$widgetSpin.find('>table').width(parseInt(o.width)-16);
			}
		},
		/**
		* @description 显示微调组件
		* @return {widgetSpin} widgetSpin对象
		* @example
		* $("#logo").widgetSpin('show');
		*/
		show:function(){
			var _self = this.element;
			//不进行交叉处理
			_self.parent( "div.ui-widget-slider" ).show();//.prev( "img" ).show().prev( "input" ).show();
			return _self;
		},
		/**
		* @description 隐藏微调组件
		* @return {widgetSpin} widgetSpin对象
		* @example
		* $("#logo").widgetSpin('hide');
		*/
		hide:function(){
			var _self = this.element;
			//不进行交叉处理 此时只是隐藏自己
			_self.parent( "div.ui-widget-slider" ).hide();//.prev( "img" ).hide().prev( "input" ).hide();
			return _self;
		},
		/**
		* @description 禁用微调组件
		* @return {widgetSpin} widgetSpin对象
		* @example
		* $("#logo").widgetSpin('disable');
		*/
		disable:function(){//什么也没做
			return this.element;
		},
		/**
		* @description 启用微调组件
		* @return {widgetSpin} widgetSpin对象
		* @example
		* $("#logo").widgetSpin('enable');
		*/
		enable:function(){//什么也没做
			return this.element;
		},
		/**
		* @description 销毁微调组件
		* @return {widgetSpin} widgetSpin对象
		* @example
		* $("#logo").widgetSpin('destroy');
		*/
		destroy:function(){
			var $this = this.element;
			 $this.unwrap().show();
			 $this.siblings('div,b,table').remove();
		}
});

$.extend($.ui.widgetSpin, {
	version: "1.2"
});

})(jQuery);
//initialize
$(function(){
	//$(".widgetSpin").widgetSpin();	   
});
/**
* advancedSearch
*/
function loc_adv_s(){
	var $jc_s = $("#jcsearchDiv");
	var _jcs_offset = $jc_s.offset();
	var $adv_s = $("#searchAdvanceCon");
	var $adv_a = $('#jcs_search_a');
	$adv_a.live('click',function(){
		if($adv_s.css('display') == 'none'){
			$("#searchAdvanceCon").css({
				"display":"block",
				"position":"absolute",
				"z-index":"1987"
			});
			setTimeout(function(){
				$adv_s.slideUp() ;
			},3000) ;
		}else{
			$("#searchAdvanceCon").hide();
		}
	});
}

$(function(){
	loc_adv_s();
	$("div#searchAdvanceCon div").live("click",function(e){
		var $newClass = $(this).find("span").attr("class");
		$("#searchTypeIco").attr("class",$newClass).css("float","left");
		$("#jcs_search_a span.jcs_common_s_mei").attr("id","jcs-common-search_"+$(this).index()).attr("searchType",$(this).index());
		$("#searchAdvanceCon").hide();
		$("#jcs_mei_s").focus();
	});
});
$(window).resize(function(){
	loc_adv_s();
});

(function($){ 
	$.fn.advancedSearch = function(options){  
		var defaults = {
			btnClick:function(){},
			onFocus:function(){},
			width:"100%"
		}
		//判断是否清除插件 2012-03-09 desc by gaona
		if(options != 'destory'){
			var options = $.extend(defaults, options); 
			this.each(function(){ 
				var $this = $(this);
				var $jcs_common_search_body = $("<div class='jcs_common_search_con'></div>");
				var $jcs_common_search_con = $("<a id='jcs_search_a'><span class='jcs_common_s_ico' id='searchTypeIco'></span><span class='jcs_common_s_mei' id='jcs-common-search_0'></span></a>")
				var $jcs_common_search_advanced = $("<input type='text' id='jcs_mei_s' style='width:"+options.width+";'/>")
				var $jcs_common_search_right =$("<span class='jcs_common_search'></span>")
				var $onClick = options.btnClick;
				var $onFocus = options.onFocus;
				var _focus = false;	
				//desc by gaona 2012-03-09 判断是否已经创建dom元素开始  
				if($this.attr('data-destory')!='true'){
					$this.wrap($jcs_common_search_body) ;
					$this.attr('data-dom','true') ;
				}else{
				}
				//desc by gaona 2012-03-09 判断是否已经创建dom元素结束
				$this.before($jcs_common_search_con).after($jcs_common_search_right)
					 .focus(function(){
						 $onFocus();
						 _focus = true;
						 document.onkeydown = function(e){
							 var ev = document.all ? window.event : e;
							 if(ev.keyCode==13) {
								 $onClick();
							 }
						 }
					})
			}); 
		}else{
			//desc by gaona 2012-03-09 添加销毁事件开始
			if($(this).attr('data-dom') == 'true'){
				$(this).parents('.jcs_common_search_con').children('a').remove() ;
				$(this).parents('.jcs_common_search_con').children('span').remove() ;
				$(this).unwrap() ;
			}
			$(this).attr('data-dom','false') ;
			//desc by gaona 2012-03-09 添加销毁事件结束
		}
 }; 
 $.extend($.fn.advancedSearch, {
	version: "1.2"
 });
})(jQuery); 
 /*
 *作    者: 高娜 
 *版    本: 1.2 
 *完成时间: 2012-02-13 
 *描    述: dragUpload
 *关联文件: jQuery.js  
 */
 
/*
 *	#example:
 *	$('.draguploadDiv').dragUpload({
 *		upload_disable : ['exe','avi'] ,
		display_form : 1
 *	});
 *
*/
(function($){
	/** 
	* @class dragUpload监听器
    * @name dragUpload
    * @description 基于html5的拖拽上传
	* @version 1.2 
	* @author 高娜 
	* @requires jQuery-1.5.2+
    */
	$.fn.dragUpload = function(options){
		/** @lends dragUpload.prototype */
		var defaults = {
			/**  
			* @name dragUpload#display_width
			* @param {Number}  数字类型
			* @description 拖拽目的地宽度
			* @default {Number} 360
			* @example
			* $('.draguploadDiv').dragUpload({
			*		display_width : 360
			*  });
			*/
			display_width : 380,
			/**  
			* @name dragUpload#display_height
			* @param {Number}  数字类型
			* @description 拖拽目的地高度
			* @default {Number} 300
			* @example
			* $('.draguploadDiv').dragUpload({
			*		display_height : 300
			*  });
			*/
			display_height : 300,
			/**  
			* @name dragUpload#display_form
			* @param {Number}  数字类型
			* @description 上传文件展示形式 默认有0,1
			* @default {Number} 1
			* @example
			* $('.draguploadDiv').dragUpload({
			*		display_form : 1
			*  });
			*/
			display_form : 1,
			/**  
			* @name dragUpload#upload_able
			* @param {Array}  数组类型
			* @description 可上传文件格式(如果设置有值表示除设置的几种文件格式其他在备选数组中的文件格式均不可上传)
			* @default {Array} []
			* @example
			* $('.draguploadDiv').dragUpload({
			*		upload_able : []
			*  });
			*/
			upload_able : [],
			/**  
			* @name dragUpload#upload_disable
			* @param {Array}  数组类型
			* @description 不可上传文件格式(如果设置有值表示除设置的几种文件格式其他在备选数组中的文件格式均可上传)
			* @default {Array} []
			* @example
			* $('.draguploadDiv').dragUpload({
			*		upload_disable : []
			*  });
			*/
			upload_disable : [],
			/**  
			* @name dragUpload#filescontain
			* @param {Array}  数组类型
			* @description 备选的文件格式
			* @default {Array} [jpg,gif,png,doc,docx,xlsx,xls,txt,html,rar,zip,asp,ppt,pptx,avi]
			* @example
			* $('.draguploadDiv').dragUpload({
			*		filescontain :['jpg','gif','png','jpeg','doc','docx','xls','xlsx','txt','html','rar','zip','asp']
			*  });
			*/
			filescontain : ['jpg','gif','png','jpeg','doc','docx','xls','xlsx','txt','html','rar','zip','asp','ppt','pptx','avi','exe'],
			/**  
			* @name dragUpload#files_size
			* @param {Number}  数字类型
			* @description 上传文件大小，单位字节
			* @default {Number} 1024000
			* @example
			* $('.draguploadDiv').dragUpload({
			*		files_size : 1024000
			*  });
			*/
			files_size : 1024000,
			/**  
			* @name dragUpload#dragEnterDiv  
			* @param {Fn} 函数 
			* @description dragenter时操作
			* @default {Fn} function(){}
			* @example
			* $('.draguploadDiv').dragUpload({
			*		dragEnterDiv: function(){alert("dragenter")}
			*    });
			*/
 			 dragEnterDiv : function(){},
			/**  
			* @name dragUpload#dragOverDiv  
			* @param {Fn} 函数 
			* @description dragover时操作
			* @default {Fn} function(){}
			* @example
			* $('.draguploadDiv').dragUpload({
			*		dragOverDiv: function(){alert("dragover")}
			*    });
			*/
 			 dragOverDiv : function(){},
			/**  
			* @name dragUpload#dragDropDiv  
			* @param {Fn} 函数 
			* @description drop时操作
			* @default {Fn} function(){}
			* @example
			* $('.draguploadDiv').dragUpload({
			*		dragDropDiv: function(){alert("dragdrop")}
			*    });
			*/
 			 dragDropDiv : function(){},
			/**  
			* @name dragUpload#dragLeaveDiv  
			* @param {Fn} 函数 
			* @description dragleave时操作
			* @default {Fn} function(){}
			* @example
			* $('.draguploadDiv').dragUpload({
			*		dragLeaveDiv: function(){alert("dragleave")}
			*    });
			*/
 			dragLeaveDiv : function(){}
		} ;
		var opts = $.extend(defaults,options) ;
		this.each(function(){
			var $this = $(this) ;
			var	formNum = opts.display_form ;
			var	index = 0 ;
			var	thisElem = $this[0] ;
			var	dragMsg = $('.draguploadMsg').html() ;
				$this.css({
					'width':opts.display_width ,
					'height':opts.display_height
				}) ;
			//判断浏览器是否支持
			if(window.FileReader){
				thisElem.addEventListener('dragenter', handleDragEnter, false);
				thisElem.addEventListener('dragover', handleDragOver, false);
				thisElem.addEventListener('drop', handleFileSelect, false);
				thisElem.addEventListener('dragleave', handleDragLeave, false);	
			}else{
				$this.html('很抱歉！您的浏览器不支持此次拖拽上传，请使用chrome,firefox等支持的浏览器') ;
			}
			
			//处理拖放文件列表
			function handleFileSelect(evt) {
				evt.stopPropagation(); //阻止默认的打开事件
				evt.preventDefault();
				showFiles(evt) ;
				opts.dragDropDiv() ;
			}
			
			// 处理插入拖出效果
			function handleDragEnter(evt){ 
				evt.stopPropagation();
				evt.preventDefault();
				//this.setAttribute('style', 'border-style:dashed;'); 
				opts.dragEnterDiv() ;
			}
			function handleDragLeave(evt){ 
				//this.setAttribute('style', ''); 
				opts.dragLeaveDiv() ;
			}
	
			// 处理文件拖入事件，防止浏览器默认事件带来的重定向
			function handleDragOver(evt){
				evt.stopPropagation();
				evt.preventDefault();
				opts.dragOverDiv() ;
			}
			
			//创建上传文件展示方式
			function showFiles(evt){
				switch(formNum){
					case 0 : displayList(evt) ; break ;
					case 1 : displayPicNav(evt) ; break ;
				}
			}
			
			//列表形式展示--display_form:0
			function displayList(evt){
				var files = evt.dataTransfer.files;//一个file类型的数组，就是你拖拽进来的文件
				var newHTML = '' ;
				for(var i=0,f; f=files[i]; i++){
					if(f.size<opts.files_size){
						var pos = f.name.lastIndexOf('.') ;
						fileFormat = f.name.substring(pos+1,f.name.length) ;
						//判断是否可上传
						if(isuploadfileType(fileFormat)){
							reader = new FileReader() ;
							newHTML = '<li><img src="images/dragUpload/page.png" class="picIco"/><span>'+f.name+'</span><img src="images/dragUpload/page_cross.gif" class="delBtn"/></li>' ;
							reader.readAsDataURL(f);//直接将图片的内容以FileReader的readAsDataURL方法读取入并显示
						}else{
							dragMsg += '<br/>'+fileFormat+'上传文件格式不正确，请重新选择' ;
							$this.html(dragMsg).css('color','#f60c32') ;
						}						
						newHTML = '<ul>' + newHTML + '</ul>' ;
						$this.append(newHTML) ;
					}else{
						dragMsg += '<br/>'+f.name+'文件大小超过了上传最大值，请重新选择' ;
						$this.html(dragMsg).css('color','#f60c32') ;
					}											
				}
			}
			//缩略图形式展示--display_form:1
			function displayPicNav(evt){
				var files = evt.dataTransfer.files;//一个file类型的数组，就是你拖拽进来的文件
				var newHTML = '' ;
				var defaultImg = 'images/dragUpload/defaultBig.jpg' ;
				for(var i=0,f; f=files[i]; i++){
					if(f.size<opts.files_size){
						var pos = f.name.lastIndexOf('.') ;
						fileFormat = f.name.substring(pos+1,f.name.length) ;
						//判断是否可上传
						if(isuploadfileType(fileFormat)){
							reader = new FileReader() ;
							isImg = isImage(fileFormat) ;
							if(isImg){
								reader.onload = (function (theFile) {
									return function (e) {
										//location.href = e.target.result ;
										newHTML = '<dl><dt><div class="imgDiv"><img src="'+ e.target.result +'"/></div><img src="images/dragUpload/closePop.png" class="delBtn"/></dt><dd>'+theFile.name+'</dd></dl>' ;
										$this.append(newHTML) ;
									};
								})(f) ;
							}else{
								newHTML = '<dl><dt><div class="imgDiv"><img src="images/dragUpload/defaultBig.jpg"/></div><img src="images/dragUpload/closePop.png" class="delBtn"/></dt><dd>'+f.name+'</dd></dl>' ;
								$this.append(newHTML) ;
							}
							reader.readAsDataURL(f);//直接将图片的内容以FileReader的readAsDataURL方法读取入并显示
						}else{
							dragMsg += '<br/>'+fileFormat+'上传文件格式不正确，请重新选择' ;
							$this.html(dragMsg).css('color','#f60c32') ;
						}
					}else{
						dragMsg += '<br/>'+f.name+'文件大小超过了上传最大值，请重新选择' ;
						$this.html(dragMsg).css('color','#f60c32') ;
					}					
				}
			}
			//判断是否是图片
			function isImage(type){
				switch(type){
					case 'jpeg':
					case 'png':
					case 'gif':
					case 'bmp':
					case 'jpg':
						return true;
					default:
						return false;
				}
			}
			//判断是否可上传的文件格式
			function isuploadfileType(uploadType){
				var ableLen = opts.upload_able.length ;
				    disableLen = opts.upload_disable.length
				if((ableLen == 0)&&(disableLen == 0)){
					return isInArr(uploadType,opts.filescontain) ;
				}else if((ableLen>0)&&(disableLen==0)){
					return isInArr(uploadType,opts.upload_able) ;
				}else if((ableLen==0)&&(disableLen>0)){
					return !(isInArr(uploadType,opts.upload_disable)) ;
				}else{
					console.log('仅需要设置只允许上传的或不允许上传的文件格式');
				}
			}
			//判断是否在数组中
			function isInArr(uploadfile,filesArr){
				for(var i=0; i<filesArr.length;i++){
					if(uploadfile == filesArr[i]){
						return true ;
					}
				}
			}
			//清空按钮
			$('.clearBtn').live('click',function(){
				$('.draguploadDiv').empty() ;
			}) ;
			//删除按钮
			$('.delBtn').live('click',function(){			
				switch(formNum){
					case 0 : $(this).parent('li').remove() ; break ;
					case 1 : $(this).parent().parent().remove() ; break ;
				}
			}) ;
		}) ;
		return this ;
	} ;
	$.extend($.fn.dragupload,{
		version: '1.2',
		author:'高娜'
	});
})(jQuery) ;/*
 *作    者: 高娜 
 *版    本: 1.2 
 *完成时间: 2012-02-20 
 *描    述: formLayout
 *关联文件: jQuery.js  
 */
 
/*
 *	#example:
 *	$('.ui-formLayout').formLayout({
	});	
 *
*/
(function($){
	/** 
	* @class formLayout监听器
    * @name formLayout
    * @description 表单元素插件
	* @version 1.2 
	* @author 高娜 
	* @requires jQuery-1.5.2+
    */
	$.fn.formLayout = function(options){
		//$(this).html($(this).html()) ;
		var defaults = {
			/**  
			* @name formLayout#form_layout
			* @param {Number}  数字类型
			* @description 布局展示，表示排列的栏目数，默认值可为1、2、3..栏,和form_width只需要设置一个
			* @default {Number} 2
			* @example
			* $('.ui-formLayout').formLayout({
			*		form_layout : 2
			*  });
			*/
			form_layout : 2,
			/**  
			* @name formLayout#form_label_pos
			* @param {String}  字符串型
			* @description 字段名针对文本输入域显示的位置，参考值为top/left/right/bottom(上、左、右、下)
			* @default {String} 'top'
			* @example
			* $('.ui-formLayout').formLayout({
			*		form_label_pos : 'top'
			*  });
			*/
			form_label_pos : 'top',
			/**  
			* @name formLayout#form_label_textalign
			* @param {String}  字符串型
			* @description 字段名对齐方式，参考值left/right(居左/居右)
			* @default {String} 'left'
			* @example
			* $('.ui-formLayout').formLayout({
			*		form_label_textalign : 'left'
			*  });
			*/
			form_label_textalign : 'left',
			/**  
			* @name formLayout#form_label_dev
			* @param {Number}  数字类型
			* @description 偏差值，在计算的时候使用，在计算过程中需加上单位或是百分号
			* @default {Number} 20
			* @example
			* $('.ui-formLayout').formLayout({
			*		form_label_dev : 20
			*  });
			*/
			form_label_dev : 20,
			/**  
			* @name formLayout#form_width
			* @param {Number}  数字类型
			* @description form表单参考宽度
			* @default {Number} 600
			* @example
			* $('.ui-formLayout').formLayout({
			*		form_width : 600
			*  });
			*/
			form_width : 600,
			/**  
			* @name formLayout#form_title
			* @param {String}  字符串类型
			* @description form表单标题
			* @default {String} form标题
			* @example
			* $('.ui-formLayout').formLayout({
			*		form_title : 'form标题'
			*  });
			*/
			form_title : 'form标题',
			/**  
			* @name formLayout#form_wordcard
			* @param {String}  字符串类型
			* @description 
			* @default {String} 字段名后面的通配符，可选参数-、：、等
			* @example
			* $('.ui-formLayout').formLayout({
			*		form_wordcard : ':'
			*  });
			*/
			form_wordcard : '：',
			/**  
			* @name formLayout#form_colspan
			* @param {Number}  数字类型
			* @description 跨列的值
			* @default {Number} 1
			* @example
			* $('.ui-formLayout').formLayout({
			*		form_colspan : 1
			*  });
			*/
			form_colspan : 1,
			/**  
			* @name formLayout#form_elem_width
			* @param {Number}  数字类型
			* @description form表单输入区域宽度最大限制
			* @default {Number} 300
			* @example
			* $('.ui-formLayout').formLayout({
			*		form_elem_width : 300
			*  });
			*/
			form_elem_width : 300,
			/**  
			* @name formLayout#form_textarea_height
			* @param {Number}  数字类型
			* @description form表单文本域高度
			* @default {Number} 60
			* @example
			* $('.ui-formLayout').formLayout({
			*		form_textarea_height : 60
			*  });
			*/
			form_textarea_height : 60,
			/**  
			* @name formLayout#formDisable  
			* @param {Fn} 函数 
			* @description 禁用指定表单元素
			* @default {Fn} function(){}
			* @example
			* $('.ui-formLayout').formLayout({
			*		formDisable: function(){alert("formDisable")}
			*    });
			*/
 			formDisable : function(obj){
				if($(obj).attr('disabled')){
					$(obj).addClass('ui-formCambo-disabled') ;
				}
				var $type = $(obj).attr('tagName').toLowerCase() ;
				if($type=='div'){
					var $objInput = $(obj).find('input') ;
					for(var i=0; i<$objInput.length; i++){
						if(($objInput.eq(i).attr('disabled'))&&!($objInput.eq(i).attr('checked'))){
							$objInput.eq(i).next('label').find('span').eq(0).addClass('ui-formCambo-ico-disabled') ;
						}else if(($objInput.eq(i).attr('disabled'))&&($objInput.eq(i).attr('checked'))){
							$objInput.eq(i).next('label').find('span').eq(0).addClass('ui-formCambo-ico-checked-disabled') ;
						}
					}
				}
			}
		} ;
		var opts = $.extend(defaults,options) ;
		this.each(function(){
			var $this = $(this) ;
			$(this).css({
				width:opts.form_width
			}) ;
			$(this).find('textarea').height(opts.form_textarea_height) ;
			
			formCreate() ;
			//设置一栏布局的块状显示
			if(opts.form_layout == 1){
				$(this).find('.ui-formLayoutItem').css({
					'display':'block',
					'clear':'both'
				}) ;
			}
			//创建dom元素
			function formCreate(){
				var titleDom = '<div class="ui-formLayoutCon"></div>' ;				
				$this.prepend(titleDom) ;
				$this.children('.ui-formLayoutInput').each(function(index, element){
					createInput(this) ;			
				});
				setElemWid() ;
			}
			
			//输入区域获取焦点
			$('.ui-formLayoutInput').live('focus',function(){
				$(this).addClass('ui-formLayoutInput-active') ;
			}).live('blur',function(){
				$(this).removeClass('ui-formLayoutInput-active') ;
			}) ;
			
			//创建input[type='text'],textarea的dom
			function createInput(obj){
				if($(obj).attr('must-fill')&&($(obj).attr('must-fill')=='true')){
					var itemDiv = '<div class="ui-formLayoutItem"><label class="ui-formLayoutLabel ui-formLayoutLabel-'+opts.form_label_pos+'"><span class="ui-formLayoutFill">*</span>'+$(obj).attr('form-elem-title') +opts.form_wordcard+'</label><div class="ui-formLayoutValue" ></div>' ;
				}else{
					var itemDiv = '<div class="ui-formLayoutItem"><label class="ui-formLayoutLabel ui-formLayoutLabel-'+opts.form_label_pos+'">'+$(obj).attr('form-elem-title') +opts.form_wordcard+'</label><div class="ui-formLayoutValue" ></div>' ;
				}
				var $itemDiv = $(itemDiv);
				$this.find('.ui-formLayoutCon').append($itemDiv);
				$itemDiv.find('.ui-formLayoutValue').append(obj);
				$this.find('.ui-formLayoutLabel').css('text-align',opts.form_label_textalign) ;
				opts.formDisable(obj) ;
			}
			
			//设置元素宽度
			function setElemWid(){
				var $InputElem = $this.find('.ui-formLayoutInput') ;
				var $widDev ;
				for(var i=0; i<$InputElem.length;i++){
					var $colspan = $InputElem.eq(i).attr('form-colspan') || opts.form_colspan ;
					var $labelElem = $this.find('.ui-formLayoutLabel') ;
					var $labelWid = 0 ;
					for(var j=0; j<$labelElem.length; j++){
						if($labelElem.eq(j).width()>$labelWid){
							$labelWid  = $labelElem.eq(j).width() ;
						}
					}
					$this.find('.ui-formLayoutLabel').width($labelWid) ;
						var $elemWid = $(this).attr('elem-width') || (($this.width() - opts.form_label_dev - $labelWid*opts.form_layout - 20*opts.form_layout)/opts.form_layout) ;
					if($InputElem.eq(i).attr('type') == 'select-one'){
						$widDev = 8 ;
					}else{
						$widDev = 0 ;
					}
					if($elemWid>opts.form_elem_width){
						if($colspan>=2){
							$InputElem.eq(i).width(opts.form_elem_width*$colspan+($colspan-1)*$labelWid+opts.form_label_dev+$widDev) ;
						}else{
							$InputElem.eq(i).width(opts.form_elem_width*$colspan+($colspan-1)*$labelWid+$widDev) ;
						}
					}else{
						if($colspan>=2){
							$InputElem.eq(i).width($elemWid*$colspan+($colspan-1)*$labelWid+opts.form_label_dev+$widDev) ;
						}else{
							$InputElem.eq(i).width($elemWid*$colspan+($colspan-1)*$labelWid+$widDev) ;
						}
					}
					
					if($InputElem.eq(i).siblings('.ui-formSelect').children('.ui-formSelect-text')){
						$this.find('.ui-formSelect').eq(i).width($InputElem.eq(i).width()+3)
					}
				}
			}
			
		}) ;
		return this ;
	} ;
	$.extend($.fn.formLayout,{
		version: '1.2',
		author:'高娜'
	});
})(jQuery) ;
//禁用某表单元素setEnable
function setDisable(obj){
	if(!obj.hasClass('ui-formCambo-disabled')){
		obj.addClass('ui-formCambo-disabled') ;
	}
	var $type = obj.attr('type') ;
	if(($type=='radio')||($type=='checkbox')){
		if((obj.attr('disabled'))&&!(obj.attr('checked'))){
			obj.next('label').find('span').eq(0).addClass('ui-formCambo-ico-disabled') ;
		}else if((obj.attr('disabled'))&&(obj.attr('checked'))){
			obj.next('label').find('span').eq(0).addClass('ui-formCambo-ico-checked-disabled') ;
		}
	}
}
//启用某表单元素
function setEnable(obj){
	if(obj.hasClass('ui-formCambo-disabled')){
		obj.removeClass('ui-formCambo-disabled') ;
	}
	var $type = obj.attr('type') ;
	if(($type=='radio')||($type=='checkbox')){
		if(obj.next('label').find('span').eq(0).hasClass('ui-formCambo-ico-disabled')){
			obj.next('label').find('span').eq(0).removeClass('ui-formCambo-ico-disabled') ;
		}else if(obj.next('label').find('span').eq(0).hasClass('ui-formCambo-ico-checked-disabled')){
			obj.next('label').find('span').eq(0).removeClass('ui-formCambo-ico-checked-disabled').addClass('ui-formCambo-ico-checked') ;
		}
	}
}
//影藏某表单元素及其字段
function setHide(obj){
	var obj = document.getElementById(obj) ;
	var type = obj.getAttribute('type') ;
	if((type == 'checkbox')||(type == 'radio')){
		obj.style.display = 'none' ;
		obj.nextSibling.nodeValue= ' ' ;		
	}else{
		$(obj).parents('.ui-formLayoutItem').css('display','none') ;
	}
}
//显示某表单元素及其字段
function setShow(obj){
	var obj = document.getElementById(obj) ;
	var type = obj.getAttribute('type') ;
	if((type == 'checkbox')||(type == 'radio')){
		obj.style.display = 'inline-block' ;
		obj.nextSibling.nodeValue= obj.value ;		
	}else{
		$(obj).parents('.ui-formLayoutItem').css('display','inline-block') ;
	}
}/*
 *作    者: 高娜 
 *版    本: 1.2 
 *完成时间: 2012-03-15 
 *描    述: scrollBar
 *关联文件: jQuery.js  
 */
 
/*
 *	#example:
 *	$('.ui-scrollBar').scrollBar({
	});	
 *
*/
(function($){
	/** 
	* @class scrollBar监听器
    * @name scrollBar
    * @description 仿移动设备滚动条
	* @version 1.2 
	* @author 高娜 
	* @requires jQuery-1.5.2+
    */
	$.fn.scrollBar = function(options){
		var defaults = {
			/**  
			* @name scrollBar#scroll_width
			* @param {Number}  数字类型
			* @description 滚动条宽度
			* @default {Number} 7
			* @example
			* $('.ui-scrollBar').scrollBar({
			*		scroll_width : 7
			*  });
			*/
			scroll_width : 7,
			/**  
			* @name scrollBar#scroll_speed
			* @param {Number}  数字类型
			* @description 滑块滑动的速度
			* @default {Number} 1000
			* @example
			* $('.ui-scrollBar').scrollBar({
			*		scroll_speed : 1000
			*  });
			*/
			scroll_speed : 400,
			/**  
			* @name scrollBar#scroll_times
			* @param {Number}  数字类型
			* @description 目标完成滚动的次数
			* @default {Number} 10
			* @example
			* $('.ui-scrollBar').scrollBar({
			*		scroll_times : 10
			*  });
			*/
			scroll_times : 5
		} ;
		if(options != 'destory'){
			$(document).bind("selectstart",function(){return false;}); //清除火狐以外浏览器选中文本效果 
			//实现滚动条插件
			var opts = $.extend(defaults,options) ;
			this.each(function(){
				var $this = $(this) ;
				var $availHei = window.screen.availHeight - 180 ;
				var $scrollDiv = $('<div class="ui-scrollBarDiv"></div>') ;
				var $scrollSlide = $('<div class="ui-scroll"><div class="ui-scrollSlide" id="aaa"></div></div>') ;
				if($this.attr('data-dom')!='true'){
					$this.wrap($scrollDiv).after($scrollSlide) ;
					$this.attr('data-dom',true) ;
				}else{
				}
				
				var $scrTop = 0 ; /*模拟滚动条的top值*/
				var $thisTop = 0 ;/*目标区域的top值*/
				var $thisPar = $this.parents('div') ; /*目标区域外层div*/
				var $thisElemHei = $this.height() ; /*目标区域高度*/
				$thisPar.height($availHei) ;
				var $browerFirefox = navigator.userAgent.indexOf('Firefox') ; //火狐触发滚轮效果需要添加DOMMouseScroll事件
				var $thisParHei = $thisPar.height() ;
				//滚动scroll_times次完成，需要每次滚动的高度
				var $scrollHei = Math.ceil(($thisElemHei - $thisParHei)/(opts.scroll_times+1)) ; 
				//模拟滚动条的高度
				var $scrollSliHei = Math.ceil($thisParHei/(1.2*(opts.scroll_times+1))) ;
				$('.ui-scrollBarDiv .ui-scroll .ui-scrollSlide').height($scrollSliHei) ;				
				$thisSlide = $thisPar.find('.ui-scrollSlide') ;		
				if($thisElemHei>$thisParHei){
					//滚轮方法调用
					if($browerFirefox < 0){
						$thisPar[0].onmousewheel = function(e){
							if($.browser.msie&&$.browser.version<=8){
							}else{
								e.preventDefault();
							}
							scrollBarWheel(e) ;
					   }
					}else{
						$thisPar[0].addEventListener('DOMMouseScroll',function(e){
							e.preventDefault();
							scrollBarWheel(e) ;
						},false) ;
					}
					
					//mouse事件触发调用
					$this.mousedown(function(e){
						e.preventDefault();
						scrollBarMouse(e) ;
					}) ;
					
					//touch事件触发调用 		
					if('ontouchstart' in document.documentElement){ //判断是否支持touchstart
						$this[0].addEventListener('touchstart',scrollBarTouch,false) ;
					}else{
					}
				}else{
					$thisSlide.css('display','none') ;
				}	
				
			    //滚轮触发滑动
				var wheelInt ;
				var wheelBea ; //设置无论滚动幅度大小只相当于滚动一次
				var availBot = $thisElemHei - $thisParHei ;
			    function scrollBarWheel(e){
					//临界值判断
					var marTop = parseInt($this.css('marginTop')) ;
					var botTop = (Math.abs(marTop) <= Math.abs(availBot)) ;	
					
					if((marTop<=0)&&botTop){		
						if(!wheelBea){
							//判断滚轮的方向
							if($browerFirefox < 0){
							  $scrTop -= $scrollSliHei*(event.wheelDelta/120) ;
							  $thisTop += $scrollHei*(event.wheelDelta/120) ;
							}else{
							  //火狐不支持wheelDelta
							  $scrTop += $scrollSliHei*(e.detail/3) ;
							  $thisTop -= $scrollHei*(e.detail/3) ;
							}	
							wheelBea = true;
							clearInterval(wheelInt);
							wheelInt = setTimeout(function () {
								wheelBea = false;
							},150);	
						}else{
						}	
					}else if(marTop>0){
						$scrTop = 0; //目标区域到达到上临界值。
						$thisTop = 0;
					}else if(!botTop){
						$scrTop = $thisParHei - 1.4*$scrollHei ;
						$thisTop = 0 - availBot ;
					}
				    $thisPar.find('.ui-scrollSlide').animate({
					  top:$scrTop
				    },opts.scroll_speed) ;
				    $this.animate({
					  marginTop:$thisTop
				    },opts.scroll_speed) ;
			    }
				
				//mouse方式触发滚动
				function scrollBarMouse(e){
					var sign = 1 ;
					var beginY = e.clientY ;
					//临界值判断
					var marTop = parseInt($this.css('marginTop')) ;
					var botTop = (Math.abs(marTop) <= Math.abs(availBot)) ;
					$this.mousemove(function(e){
						if(sign){
							var y =(e.clientY - beginY);
							var yabs = Math.abs(y) ;
							if((marTop<=0)&&botTop){		
								$scrTop -= $scrollSliHei*(y/yabs) ;
								$thisTop += $scrollHei*(y/yabs) ;
							}else if(marTop>0){
								$scrTop = 0; //目标区域到达到上临界值。
								$thisTop = 0;
							}else if(!botTop){
								$scrTop = $thisParHei - 1.4*$scrollHei ;
								$thisTop = 0 - availBot ;
							}
							sign = 0 ;
							
							$thisPar.find('.ui-scrollSlide').animate({
							  top:$scrTop
							},opts.scroll_speed) ;
							$this.animate({
							  marginTop:$thisTop
							},opts.scroll_speed) ;
						}
					}) ;
					$this.mouseup(function(e){
						sign = 0 ;
					}) ;
				}
				
				//touch方式触发滚动
				function scrollBarTouch(e){
					e.preventDefault();
					signTouch = 1 ;
					touchBeginY = parseInt(e.targetTouches[0].pageY) ;
					//临界值判断
					marTouchTop = parseInt($this.css('marginTop')) ;
					botTouchTop = (Math.abs(marTouchTop) <= Math.abs(availBot)) ;
					
					$this[0].addEventListener('touchmove',scrollBarTouchMove,false) ;
					$this[0].addEventListener('touchend',scrollBarTouchEnd,false) ;
				}
				
				function scrollBarTouchMove(e){
					if(signTouch){
						var touchNewY = e.targetTouches[0].pageY ;
						var y = touchNewY - touchBeginY ;
						var yabs = Math.abs(y) ;
						if((marTouchTop<=0)&&botTouchTop){		
							$scrTop -= $scrollSliHei*(y/yabs) ;
							$thisTop += $scrollHei*(y/yabs) ;
						}else if(marTouchTop>0){
							$scrTop = 0; //目标区域到达到上临界值。
							$thisTop = 0;
						}else if(!botTouchTop){
							$scrTop = $thisParHei - 1.4*$scrollHei ;
							$thisTop = 0 - availBot ;
						}
						signTouch = 0 ;
						$thisPar.find('.ui-scrollSlide').animate({
						  top:$scrTop
						},opts.scroll_speed) ;
						$this.animate({
						  marginTop:$thisTop
						},opts.scroll_speed) ;
					}
				}
				
				function scrollBarTouchEnd(e){
					signTouch = 0 ;
				}
			 	
				//改变窗口方法
				$(window).resize(function(){
					$this.scrollBar() ;
				});
			}) ;
			return this ;
		}else{
			//销毁滚动条插件 begin
			if($(this).attr('data-dom') == 'true'){
				$(this).parents('.ui-scrollBarDiv').find('.ui-scroll').remove() ;
				$(this).unwrap('.ui-scrollBarDiv') ;
				$(this).unbind('mousedown') ;
			}
			$(this).attr('data-dom','false') ;
			//销毁滚动条插件 end
		}
	} ;
	$.extend($.fn.scrollBar,{
		version: '1.2',
		author:'高娜'
	});
})(jQuery) ;
/*
 *作    者: 黄卉
 *版    本: 1.2 
 *完成时间: 2012-02-23
 *描    述: menuSelect
 *关联文件: jQuery.js|jquery-ui.js 
 */	
(function($,undefined){
    /** 
	* @class 下拉单选菜单插件
    * @name menuSelect
    * @description 下拉单选菜单插件
	* @version 1.2 
    */
	$.widget("ui.menuSelect",
	/** @lends menuSelect.prototype */
	{
		options:{
        /**  
        * @name menuSelect#json
        * @param {menuSelect} menuSelect menuSelect对象
        * @description JSON数据源
		* @default {menuSelect} ""
		* @example
		* $("#link").menuSelect({json:"json.js"});
        */
		json : "",
        /**
        * @name menuSelect#json
        * @param {menuSelect} menuSelect menuSelect对象
        * @description JSON数据源
		* @default {menuSelect} ""
		* @example
		* $("#link").menuSelect({data:"[{'id':'id1','menuSelect':'data1'},{'id':'id2','menuSelect':'data2','DeptOrUser':'menuSelectUsersId'}]"});
		* data里面的各参数：
		* 	id：数据id（必选）；menuSelect：显示的数据（必选）；DeptOrUser：部门多选或人员多选a标签的id。（可选）
        */
        data:"",
        /**  
        * @name menuSelect#fn
        * @param {menuSelect} menuSelect menuSelect对象
        * @description 执行函数
		* @default {menuSelect} function(){}
		* @example
		* $("#link").menuSelect({
		* 	fn:function(){
		*		$("#aa").live("click",function(event){
		*			if($(event.target).is("li")){
		*				alert($(event.target).attr("id"));
		* 			}
		*		}
		* });
        */
		fn : function(){},
        /**
        * @name menuSelect#fn
        * @param {menuSelect} menuSelect menuSelect对象
        * @description 执行函数
		* @default {menuSelect} function(){}
		* @example
		* $("#link").menuSelect({
		* 	getMoreDepts:function(){
		*       getDepts();//调用部门多选的方法
		* });
        */
        getMoreDepts :function(){} ,
         /**
        * @name menuSelect#fn
        * @param {menuSelect} menuSelect menuSelect对象
        * @description 执行函数
		* @default {menuSelect} function(){}
		* @example
		* $("#link").menuSelect({
		* 	getMoreUsers:function(){
		*       getUsers();//调用人员多选的方法
		* });
        */
        getMoreUsers:function(){},
        /**  
        * @name menuSelect#listId
        * @param {menuSelect} menuSelect menuSelect对象
        * @description 下拉列表的ID，用于对下拉列表操作
		* @default {menuSelect} ""
		* @example
		* $("#link").menuSelect({listId:"listBox_1"});
        */
		listId :""
		},
		_create:function(){
			
		},
		_init:function(){
			var o = this.options,
				_self = this.element,
                _menuSelect = $("<div />").addClass("ui-menuSelect").append("<ul class='ui-menuSelect-ul'/>").attr("id",o.listId);
                _menuSelect.find("ul").append("<li>菜单列表</li><li>菜单列表</li><li>菜单列表</li><li>菜单列表</li>"),
			fn = o.fn;
            //Get JSON
            if(o.json){
                $.getJSON(o.json,function(data){
                    _menuSelect.find("ul").empty();
                    var str="";
                    $.each(data,function(entryIndex,entry){
                        var html = "<li id='" + entry['id'] + "'>"
                                +"<input type='checkbox' id='"+ entry['id'] +"' name='menuSelectCheckbox' value='"+entry['menuSelect']+"'/>"
                                +entry['menuSelect'] +"<input type='hidden' name='menuSelect' value='"+entry['menuSelect']+"'/>";

                        if(entry['DeptOrUser']){
                            html += "<a href='#' id='"+entry['DeptOrUser']+"' class='ui-menuSelect-selectUrl'>选择</a>";
                            str+= entry['DeptOrUser']+",";
                        }
                        html+= "</li>";
                        _menuSelect.find("ul.ui-menuSelect-ul").append(html);
                    });
                    var arr =str.split(",");
                    $("#"+arr[0]).live("click",function(){
                         o.getMoreDepts();
                    });
                    //人员多选
                    $("#"+arr[1]).live("click",function(){
                          o.getMoreUsers();
                    });
                    _menuSelect.find("li.ui-menuSelect-li").hover(function(){
                           $(this).addClass("h");
                    },function(){
                           $(this).removeClass("h");
                    });
                    return false;
                });
            }
             //Get DATA
            if(o.data){
                _menuSelect.find("ul").empty();
                var str="";
                var arr= o.data.split("{'id':");
                var html="";
                for(var i=1;i<arr.length;i++){
                    var id = arr[i].substring(1,arr[i].indexOf("',"));
                    var menuSelect = arr[i].substring(arr[i].indexOf("menuSelect")+13,arr[i].lastIndexOf("'"));
                    var DeptOrUser =arr[i].substring(arr[i].indexOf("DeptOrUser")+13,arr[i].lastIndexOf("'"));
                    html += "<li id='" + id + "'>"
                              +"<input type='checkbox' id='"+ id+"' name='menuSelectCheckbox' value='"+menuSelect+"'/>" ;
                    if(arr[i].indexOf("DeptOrUser")!=-1){   //DeptOrUser
                        menuSelect = menuSelect.substring(0,arr[i].indexOf(",")+1);
                        html += menuSelect +"<input type='hidden' name='menuSelect' value='"+menuSelect+"'/>"+
                                "<a href='#' id='"+DeptOrUser+"' class='ui-menuSelect-selectUrl'>选择</a>";
                        str +=  DeptOrUser+",";
                    }else{
                        html += menuSelect +"<input type='hidden' name='menuSelect' value='"+menuSelect+"'/>";
                    }
                     html += "</li>";
                }
                _menuSelect.find("ul.ui-menuSelect-ul").append(html);
                var arr =str.split(",");
                $("#"+arr[0]).live("click",function(){
                     o.getMoreDepts();
                });
                //人员多选
                $("#"+arr[1]).live("click",function(){
                      o.getMoreUsers();
                });
            }

            if(_self.is(".buttonPro")){
                _self = _self.parent().parent();
            }
            _menuSelect.insertAfter(_self);
            _menuSelect.position({
                    of:_self,
                    my:"left top",
                    at:"left bottom"
                });
            _self.unbind("click").bind("click",function(event){
                _menuSelect.slideToggle(100);
                event.stopPropagation();
            });
            fn();

            $('#'+o.listId).click(function(){
                var boxs = $("#"+o.listId+" ul li>input[type='checkbox']");
                var ids ='';
                var names ='';
                for(var i=0; i<boxs.length; i++) {
                    if(boxs[i].checked==true){
                        ids+=boxs[i].id+',';
                        names+=boxs[i].value+',';
                    }
                }
                var but = $("#"+o.listId).prev().children().children("input.menuSelect");
                var butName = names.substring(0,names.length-1);
                var value = but.value;
                if(butName!=null&&butName!=""){
                    $(but).attr("title",butName);
                    if(butName.length>10){
                        butName=butName.substring(0,10)+"..."  ;
                    }
                    $(but).attr("value",butName);
                }else{
                     $(but).attr("value","下拉单选菜单列表");
                }
            });
            /**
             * flag=true:在div外面点击，div收缩
             * flag=false:在div内点击。
             * 给div绑定事件设置flag的值，
             * 还有_self也需要将其设置为false
             * */
            var flag= true;
            $(".ui-menuSelect").mouseover(function(){
                flag= false;
            }).mouseout(function(){
                flag=true
            });
            _self.mouseover(function(){
                flag=false;
            });
//            //id固定----如果页面有多个下拉控件的时候会有问题。
//            //部门多选
//            $("#menuSelectDepts").live("click",function(){
//                o.getMoreDepts();
//            });
//            //人员多选
//             $("#menuSelectUsers").live("click",function(){
//                 o.getMoreUsers();
//             });


            //给document绑定mousedown事件
            $(document).bind("mousedown",function(){
                var div =document.getElementById(o.listId);
                if(div.style.display!="none"&&flag){
                    div.style.display="none";
                }
            });
		},
		/**
		* @description 销毁下拉菜单
		* @example
		* $("#link").menuSelect('destroy');
		*/
		destroy:function(){
			if(_self.is(".buttonPro")){
				this.element.unbind("click").parent().parent().next(".ui-menuSelect").remove();
			}else{
				this.element.unbind("click").next(".ui-menuSelect").remove();
			}
		}
	});
	
$.extend($.ui.menuSelect, {
	version: "1.2"
});

})(jQuery);
//initialize
/*$(function(){
		 $(".menuSelect").menuSelect();
});*/
/*
 *作    者: 黄卉
 *版    本: 1.2
 *完成时间: 2012-02-22
 *描    述: menuSingleSelect
 *关联文件: jQuery.js|jquery-ui.js
 */
(function($,undefined){
    /**
	* @class 下拉单选菜单插件
    * @name menuSingleSelect
    * @description 下拉单选菜单插件
	* @version 1.2
    */
	$.widget("ui.menuSingleSelect",
	/** @lends menuSingleSelect.prototype */
	{
		options:{
        /**
        * @name menuSingleSelect#json
        * @param {menuSingleSelect} menuSingleSelect menuSingleSelect对象
        * @description JSON数据源
		* @default {menuSingleSelect} ""
		* @example
		* $("#link").menuSingleSelect({json:"json.js"});
        */
		json : "",
         /**
        * @name menuSingleSelect#data
        * @param {menuSingleSelect} menuSingleSelect menuSingleSelect对象
        * @description 变量数据源
		* @default {menuSingleSelect} ""
		* @example
		* $("#link").menuSelect({data:"[{'id':'id1','menuSingleSelect':'data1','menuSelect':[{'selectId':'id11','selectData':'data11','selectUrl':'deptId'}]},
        *                              {'id':'id2','menuSingleSelect':'data2'，'DeptOrUser':'userId'}"});
		* data里面的各参数：
		* 	id：数据id（必选）；menuSingleSelect：显示的数据（必选）；DeptOrUser：部门多选或人员多选a标签的id。（可选，存在为checkbox多选，不存在为radio单选）
        *    menuSelect：有第二级别的多选按钮（可选）
        *    menuSelect里面的参数：selectId（多选里面的id）、selectData（多选的显示数据）、  selectUrl（部门多选或人员多选a标签的id，可选）
        */
        data : "",
        /**
        * @name menuSingleSelect#titleJson
        * @param {menuSingleSelect} menuSingleSelect menuOnlySelect对象
        * @description titleJson数据源
		* @default {menuSingleSelect} ""
		* @example
		* $("#link").menuSingleSelect({titleJson:"titleJson.js"});
        */
        titleJson :"",
        /**
        * @name menuSingleSelect#fn
        * @param {menuSingleSelect} menuSingleSelect menuOnlySelect对象
        * @description 执行函数
		* @default {menuSingleSelect} function(){}
		* @example
		* $("#link").menuSingleSelect({
		* 	fn:function(){
		*		$("#aa").live("click",function(event){
		*			if($(event.target).is("li")){
		*				alert($(event.target).attr("id"));
		* 			}
		*		}
		* });
        */
		fn : function (){},
        /**
        * @name menuSelect#fn
        * @param {menuSelect} menuSelect menuSelect对象
        * @description 执行函数
		* @default {menuSelect} function(){}
		* @example
		* $("#link").menuSelect({
		* 	getMoreDepts:function(){
		*       getDepts();//调用部门多选的方法
		* });
        */
        getMoreUsers:function(){},
        /**
        * @name menuSelect#fn
        * @param {menuSelect} menuSelect menuSelect对象
        * @description 执行函数
		* @default {menuSelect} function(){}
		* @example
		* $("#link").menuSelect({
		* 	getMoreUsers:function(){
		*       getUsers();//调用人员多选的方法
		* });
        */
        getMoreDepts:function(){},
        /**
        * @name menuSingleSelect#listId
        * @param {menuSingleSelect} menuSingleSelect menuOnlySelect对象
        * @description 下拉列表的ID，用于对下拉列表操作
		* @default {menuSingleSelect} ""
		* @example
		* $("#link").menuSingleSelect({listId:"listBox_1"});
        */
		listId :"",
        /**
        * @name menuSingleSelect#ids
        * @param {menuSingleSelect} menuSingleSelect menuOnlySelect对象
        * @description 下拉列表中选中的数据id，用于对下拉列表取值和回选
		* @default {menuSingleSelect} ""
		* @example
		* $("#link").menuSingleSelect({ids:"id1,id2,id3"});
        */
        ids:"" ,
        /**
        * @name menuSingleSelect#listId
        * @param {menuSingleSelect} menuSingleSelect menuOnlySelect对象
        * @description 下拉列表中选中的数据值，用于对下拉列表取值和回选
		* @default {menuSingleSelect} ""
		* @example
		* $("#link").menuSingleSelect({names:"names1,name2,name3"});
        */
        names:"" ,
        /**
        * @name menuSingleSelect#defaultClick
        * @param {menuSingleSelect} menuSingleSelect menuSingleSelect对象 true or false
        * @description true：下拉菜单在点击的时候才加载，并且显示下拉菜单
		* @default {menuSingleSelect} ""
		* @example
		* $("#link").menuSingleSelect({defaultClick:false});
        */
        defaultClick:true ,
       /**
        * @name menuSingleSelect#defaultClick
        * @param {menuSingleSelect} menuSingleSelect menuSingleSelect对象
        * @description true：下拉菜单在点击的时候才加载，并且显示下拉菜单
		* @default {menuSingleSelect} ""
		* @example
		* $("#link").menuSingleSelect({showTitle:"点击选择范围"});
        */
        showTitle:"点击选择范围▼",
        firstClick:false
		},
		_create:function(){
		},
        /**
         * 初始化函数
         * */
		_init:function(){
			var o = this.options,
            _self = this.element;
			var _menuSingleSelect = $("<div name='menuSingeSelectDiv' />").addClass("ui-menuSingleSelect").append("<ul class='ui-menuSingleSelect-ul'/>").attr("id",o.listId);
            fn = o.fn;
            //Get JSON
            if(o.json&&o.data==''){
                $.getJSON(o.json,function(data){
                    getJsonOrData(data);
                });
            }

            //Get DATA    截取字符串
            if(o.data&&o.json==''){
                var jsondata = eval(o.data);
                 getJsonOrData(jsondata);
            }

            function getJsonOrData(data){
                _menuSingleSelect.find("ul").empty();
                var usersId ="";
                var deptsId = "";
                var html ="";
                $.each(data,function(entryIndex,entry){
                     html +=  "<li id='li" + entry['id'] + "'>" ;
                    usersId= entry['DeptOrUser'];
                    if(usersId){  //人员多选
                        html+= "<input type='checkbox' id='"+ entry['id'] +"' name='menuOnlySelectCheckbox' value='"+entry['menuSingleSelect']+"'/>"
                            +entry['menuSingleSelect']
                            +"<a href='#' id='"+usersId+"' class='ui-menuSingleSelect-selectUrl'>选择</a>";
						 if(entry['isDept']=="yes"){
                            	deptsId = usersId;
                            }
                    }else{          //其他的都为单选
						if(entry['isCheckBox']=="yes"){
                    		 html+= "<input type='checkbox' id='"+ entry['id'] +"' name='menuOnlySelectCheckbox' value='"+entry['menuSingleSelect']+"' level = '1' />"
                            +entry['menuSingleSelect'];
                    	}else{
							html+="<input type='radio' id='"+ entry['id'] +"' name='menuOnlySelectRadio' value='"+entry['menuSingleSelect']+"'/>"
								+entry['menuSingleSelect'] ;
						}
                    }
                    var arr = entry['menuSelect'];
                    if(arr){
                        html  += "<ul>";
                        for(var i=0;i<arr.length;i++){
                            html += "<li id='li"+arr[i]['selectId']+"' class='ui-menuSingleSelect-li'>"
                                    +"<input type='checkbox' name='radioCheckbox' id='"+arr[i]['selectId']+"' value='"+arr[i]['selectData']+"'/>"
                                    + arr[i]['selectData'];
                            if(arr[i]['selectUrl']){
                                deptsId =  arr[i]['selectUrl'];
                                html += "<a href='#' id='"+deptsId+"' class='ui-menuSingleSelect-selectUrl'>选择</a>";
                            }
                            html += "</li>"  ;
                        }
                        html += "</ul>";
                    }
                    html += "</li>";
                });
                _menuSingleSelect.find("ul.ui-menuSingleSelect-ul").append(html);
                $("#"+usersId).live("click",function(){
                    o.getMoreUsers();
                });
                $("#"+deptsId).live("click",function(){
                    o.getMoreDepts();
                });
                return false;
            }

            if(_self.is(".buttonPro")||_self.is(".buttonLight")){
                _self = _self.parent().parent();
            }
            _menuSingleSelect.append("<input type='hidden' id='menuSingleSelect"+o.ids+"' name='menuSingleSelect' value='menuSingleSelect"+o.names+"'/>");
            _menuSingleSelect.insertAfter(_self);

            setTimeout(function(){
                getIdsNames();
            },0);
            function getIdsNames(){
				if((o.ids!='' && o.names!='')||o.firstClick){
                    var but = $("#"+o.listId).prev().children().children("input.menuSingleSelect");
                    but.attr("value",o.names).attr("title",o.names);
                    if(o.names>10){
                        var  butName=o.names.substring(0,10)+"..."  ;
                        but.attr("value",butName);
                    }
					var trueId = o.listId.substring(4,o.listId.length);
                	var arrIds = o.ids.split(",");
                    for(var i=0;i<arrIds.length;i++){
                        var _inputs = document.getElementById(arrIds[i]+trueId);
                        if(_inputs!=null){
                            _inputs.checked = true;
                        }
                    }
                    for(var j=0;j<arrIds.length;j++){
                        var _input = document.getElementById(arrIds[j]+trueId);
						if(_input!=null){
                         if(_input.type=='radio'){
                            var $lis = $("#"+arrIds[j]+trueId).parent().parent().children().children('input');
                            $lis.each(function(){
                                if($(this).attr('id')!=(arrIds[j]+trueId)){
                                    var $li_inputs = $(this).next('ul').children('li').children('input');
                                    $li_inputs.each(function(){
                                        if(!$(this).checked){
											if($(this).attr("class")!='ui-menuSingleSelect-selectUrl'){
                                            	this.disabled = true;
											}
                                        }
                                    });
                                 }
                            });
                        }
                        if(_input.type=='checkbox'){
                            var $f_input = $("#"+arrIds[j]+trueId).parent('li').parent('ul').prev('input');
                            if($f_input.size()!=0){
                                $f_input[0].checked = "checked";
                                var $f_inputId = $($f_input[0]).attr('id');
                                var $ra_inputs = $("#"+$f_inputId).parent().parent().children().children("input[type='radio']");
                                $ra_inputs.each(function(){
                                    if(!this.checked){
                                         var $boxs_inputs = $(this).next().children().children();
                                         $boxs_inputs.each(function(){
											 	if($(this).attr("class")!='ui-menuSingleSelect-selectUrl'){
                                               		this.disabled = true;
												}
                                         });
                                    }
                                });
                            }
						}
                        }
                    }
                }
            }
            fn();

            /**
             * 绑定下拉菜单按钮的click事件
             * **/
			 $("#"+o.listId+" >ul>li").find("input").click(function(){
                var inputs = $("#"+o.listId+" >ul>li>input");
                var allInputs = $("#"+o.listId+" ul li input");
                var ids ='';
                var names ='';
                var allflag = true;
               //如果点击的按钮是单选
               if(this.type=="radio"){
               		var tempStr = radioSelect(this,ids,names,o.listId);
               		if(tempStr=="-"){
               				ids = this.id.substring(0,1)+",";
	           				names = this.value+",";
               			}else{
               				ids = tempStr.split("-")[0]+ this.id.substring(0,1)+",";
               				names = tempStr.split("-")[1];
               			}
               }else{
               		//如果点击的是第一层的多选
               		if(this.level=='1'){
               			var radioObj ;
	           			$("#"+o.listId+" >ul>li").find("input[type='radio']").each(function(){
	           				if(this.checked){
	           					radioObj = $(this);
	           				}
	           			})
	           			var tempStr = radioSelect(radioObj,"","",o.listId);
	           			if(tempStr!="-"){
               				ids = tempStr.split("-")[0] ;
               				names = tempStr.split("-")[1] ;
               			}
               			if(radioObj!=null&&radioObj!='undefind'&&radioObj.val()!=null&&radioObj.val()!='undefined'){
               				ids = ids + radioObj.attr("id").substring(0,1);
               			}
               		}else{
               			var radioObj = $(this).parent().parent().parent().find("input[type='radio']");
               			if(this.checked){
               				radioObj.attr("checked",this.checked);
               			}
               			var tempStr = radioSelect(radioObj,ids,names,o.listId);
               			if(tempStr=="-"){
               				ids = radioObj.attr("id").substring(0,1)+",";
	           				names = radioObj.val()+",";
               			}else{
               				ids = tempStr.split("-")[0];
               				names = tempStr.split("-")[1];
               			}
               			if(radioObj!=null&&radioObj!='undefind'&&radioObj.val()!=null&&radioObj.val()!='undefined'){
               				ids = ids + radioObj.attr("id").substring(0,1);
               			}
               		}
               }
                var _input =  $("#"+o.listId+" >input[type='hidden']") ;
                o.ids = "menuSingleSelect"+ids.substring(0,ids.length-1);
                o.names = "menuSingleSelect"+names.substring(0,names.length-1);
                 _input.attr('id', o.ids);
                _input.val(o.names) ;
                var but = $("#"+o.listId).prev().children().children("input.menuSingleSelect");
                var butName = names.substring(0,names.length-1);
                if(but.size()!=0){
                    var value = but.value;
                    if(butName!=null&&butName!=""){
                        if(butName.length>10){
                            butName=butName.substring(0,10)+"..."  ;
                        }
                        $(but).attr("value",butName);
                    }else{
                         $(but).attr("value",o.showTitle);
                    }
                }else{
                    but = $("#"+o.listId).prev('a');
                    var butText = but.text();
                    if(butName!=null&&butName!=""){
                        if(butName.length>10){
                            butName=butName.substring(0,10)+"..."  ;
                        }
                        but.text(butName);
                    }else{
                        but.text(o.showTitle);
                    }

                }     
                if(allflag){
				 fn(o.listId.substring(4));
                }
            });

            /**
             * flag=true:在div外面点击，div收缩
             * flag=false:在div内点击。
             * 给div绑定事件设置flag的值，
             * 还有ui-buttonPro也需要将其设置为false
             * */
            var flag= true;
            _menuSingleSelect.mouseover(function(){
                flag= false;
            }).mouseout(function(){
                flag=true
            });
            _self.mouseover(function(){
                flag=false;
            }).mouseout(function(){
                flag=true ;
            });
            //给document绑定mousedown事件
            $(document).bind("click",function(){
                getButtonLightCss ();
                var div =document.getElementById(o.listId);
                if(div==null ||div=='' ||div=='undefined'){
                	return ;
                }
                if(div.style.display!="none"&&flag){
                    div.style.display="none";
                }
            });

             /**
             * _menuSingleSelect定位
             * */
            var height;
            var targetDom = document.getElementById(_self.attr('id'));
            setTimeout(function(){
                height = _menuSingleSelect.height();
                 if(o.defaultClick){
                     var div = document.getElementById(o.listId);
                     div.style.display = "block";
                     o.defaultClick = false;
                }
            },0);
            if(_menuSingleSelect.css("display")=="none"){
                getPosition(targetDom);
            }
            $(window).bind("resize",function(){
                _menuSingleSelect.slideUp();
            }).bind("scroll",function(){
                _menuSingleSelect.slideUp();
            });
             _self.unbind("click").bind("click",function(event){
                 _menuSingleSelect.slideToggle(100);
                 var  $divs = $('.ui-menuSingleSelect');
                 for(var i =0 ;i<$divs.length;i++){
                     if($($divs[i]).attr('id')!=o.listId){
                         $divs[i].style.display="none";
                     }
                 }
                 var  $dis = _menuSingleSelect.css("display");
                 if($dis=="none"){
                     getButtonLightCss ();
                     getPosition(targetDom);
                 }
                 event.stopPropagation();
            });

            //递归计算标签距离左上角的距离
            function getTitleLeft(e){
                var i =  e.offsetLeft;
                if(e.offsetParent != null) i += getTitleLeft(e.offsetParent);
                return i;
            }
            //递归计算标签距离顶部的距离
            function getTitleTop(e){
                var i = e.offsetTop;
                if(e.offsetParent != null) i += getTitleTop(e.offsetParent);
                return i;
            }
            //定位
			function getPosition(ev){
            	  _menuSingleSelect.css({
                    "left":-1000,
                    "top":-1000,
                    "display":"block"
                });
                var elemWidth = ev.offsetWidth;   //li元素所在元素的宽度
                var elemHeight = ev.offsetHeight; //li元素所在元素的高度
                var elemLeft = getTitleLeft(ev);		  //li元素所在元素距离显示区左上角的距离
                var elemTop = getTitleTop(ev);		  //li元素所在元素距离显示区顶部的距离
                var width = $(window).width();        //浏览器可见宽度
                var height = $(window).height();      //浏览器的可见高度
                var  wid = _menuSingleSelect.width();   //下拉div的宽度  hei是下拉div的高度
                var hei = _menuSingleSelect.height();
                var x,y;
                if((elemLeft+wid)<=width && (elemTop+elemHeight+hei)<=height-10){     //左上角
                    x = elemLeft ;
                    y =elemTop + elemHeight ;
                }else if((elemLeft+wid)<=width && (elemTop+elemHeight+hei)>height-10){  //左下角
                    x = elemLeft ;
                    y =elemTop - hei -5 ;
                }else if((elemLeft+wid)>width && (elemTop+elemHeight+hei)<=height-10){  //右上角
                    x = width - wid  -10;
                   y =elemTop + elemHeight ;
                }else if((elemLeft+wid)>width && (elemTop+elemHeight+hei)>height-10){      //右下角
                    x = width -wid -10;
                    y =elemTop - hei -5;
                }
                _menuSingleSelect.css({ "left":x, "top":y});
            }


            /**
             * 鼠标点击当列表显示时按钮的样式
             * **/
            function getButtonLightCss(){
                 var div =document.getElementById(o.listId);
                 var $buttonLight = $(div).prev('.ui-buttonLight');
                 if($buttonLight.size!=0){
                     if( div.style.display =="none"){
                        $buttonLight.css({"background-position":"0% 0%"});
                    }else{
                        $('.ui-buttonLight').css({"background-position":"0% 0%"});
                        $buttonLight.css({"background-position":"right -120px"});
                    }
                 }

            }
		},
		/**
		* @description 销毁下拉菜单
		* @example
		* $("#link").menuSingleSelect('destroy');
		*/
		destroy:function(){
			if(this.element.is(".buttonPro")||this.element.is(".buttonLight")){
				this.element.unbind("click").parent().parent().next(".ui-menuSingleSelect").remove();
			}else{
				this.element.unbind("click").next(".ui-menuSingleSelect").remove();
			}
		}
	});
	
function radioSelect(obj,ids,names,listId){
			//将其他单选框下的复选框置灰
			$("#"+listId+" >ul>li").find("input").each(function(){
						if(this.type!="radio"&&this.level!=1){
							$(this).attr("disabled",true);
						}
			})
			//寻找单选框下面的复选框
			$(obj).parent().find("ul>li>input").each(function(){
				$(this).attr("disabled",false);
				if(this.checked){
					ids = ids+this.id.substring(0,1)+",";
					names = names+ this.value+",";
				}
			})
			//寻找单选框同级的多选框
			var $otherUsers = $("#"+listId+" >ul>li>input[type='checkbox']");
			if($otherUsers.val()!=null&&$otherUsers.val()!='undefined'){
				$otherUsers.each(function(){
					if(this.checked){
						ids = ids+$(this).attr("id").substring(0,1)+",";
						names = names+$(this).val()+",";
					}
				})
			}
			return ids+"-"+names;
	} 

function reloadNameAndIds(obj,radioStr){
			var id = obj.attr("id");
			var trueId = id.substring(4,id.length);
			var arrIds = "";
			var tempIds = $("#"+id+" >input[type='hidden']").attr("id");
			obj.find("input[type='checkbox']").attr("checked",false);
			arrIds = tempIds.substring(16,tempIds.length).split(",");
			for(var i=0;i<arrIds.length;i++){
				if($("#"+arrIds[i]+trueId).attr("checked")!=null&&$("#"+arrIds[i]+trueId).attr("checked")!='undefined'){
					$("#"+arrIds[i]+trueId).attr("checked","checked");
				}
			}
			var radioObj ;
			$("#"+id+" >ul>li").find("input[type='radio']").each(function(){
				if(this.id.substring(0,3)==radioStr){
					radioObj = this;
					$(radioObj).attr("checked",true);
				}
			})
			radioSelect(radioObj,"","",id);
}
		
$.extend($.ui.menuSingleSelect, {
	version: "1.2"
});

})(jQuery);
//initialize
/*$(function(){
		 $(".menuSingleSelect").menuSingleSelect();
});*//*
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
/*
	Masked Input plugin for jQuery
	Copyright (c) 2007-2011 Josh Bush (digitalbush.com)
	Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license) 
	Version: 1.3
*/
(function($) {
	var pasteEventName = ($.browser.msie ? 'paste' : 'input') + ".mask";
	var iPhone = (window.orientation != undefined);

	$.mask = {
		//Predefined character definitions
		definitions: {
			'9': "[0-9]",
			'a': "[A-Za-z]",
			'*': "[A-Za-z0-9]"
		},
		dataName:"rawMaskFn"
	};

	$.fn.extend({
		//Helper Function for Caret positioning
		caret: function(begin, end) {
			if (this.length == 0) return;
			if (typeof begin == 'number') {
				end = (typeof end == 'number') ? end : begin;
				return this.each(function() {
					if (this.setSelectionRange) {
						this.setSelectionRange(begin, end);
					} else if (this.createTextRange) {
						var range = this.createTextRange();
						range.collapse(true);
						range.moveEnd('character', end);
						range.moveStart('character', begin);
						range.select();
					}
				});
			} else {
				if (this[0].setSelectionRange) {
					begin = this[0].selectionStart;
					end = this[0].selectionEnd;
				} else if (document.selection && document.selection.createRange) {
					var range = document.selection.createRange();
					begin = 0 - range.duplicate().moveStart('character', -100000);
					end = begin + range.text.length;
				}
				return { begin: begin, end: end };
			}
		},
		unmask: function() { return this.trigger("unmask"); },
		mask: function(mask, settings) {
			if (!mask && this.length > 0) {
				var input = $(this[0]);
				return input.data($.mask.dataName)();
			}
			settings = $.extend({
				placeholder: "_",
				completed: null
			}, settings);

			var defs = $.mask.definitions;
			var tests = [];
			var partialPosition = mask.length;
			var firstNonMaskPos = null;
			var len = mask.length;

			$.each(mask.split(""), function(i, c) {
				if (c == '?') {
					len--;
					partialPosition = i;
				} else if (defs[c]) {
					tests.push(new RegExp(defs[c]));
					if(firstNonMaskPos==null)
						firstNonMaskPos =  tests.length - 1;
				} else {
					tests.push(null);
				}
			});

			return this.trigger("unmask").each(function() {
				var input = $(this);
				var buffer = $.map(mask.split(""), function(c, i) { if (c != '?') return defs[c] ? settings.placeholder : c });
				var focusText = input.val();

				function seekNext(pos) {
					while (++pos <= len && !tests[pos]);
					return pos;
				};
				function seekPrev(pos) {
					while (--pos >= 0 && !tests[pos]);
					return pos;
				};

				function shiftL(begin,end) {
					if(begin<0)
					   return;
					for (var i = begin,j = seekNext(end); i < len; i++) {
						if (tests[i]) {
							if (j < len && tests[i].test(buffer[j])) {
								buffer[i] = buffer[j];
								buffer[j] = settings.placeholder;
							} else
								break;
							j = seekNext(j);
						}
					}
					writeBuffer();
					input.caret(Math.max(firstNonMaskPos, begin));
				};

				function shiftR(pos) {
					for (var i = pos, c = settings.placeholder; i < len; i++) {
						if (tests[i]) {
							var j = seekNext(i);
							var t = buffer[i];
							buffer[i] = c;
							if (j < len && tests[j].test(t))
								c = t;
							else
								break;
						}
					}
				};

				function keydownEvent(e) {
					var k=e.which;

					//backspace, delete, and escape get special treatment
					if(k == 8 || k == 46 || (iPhone && k == 127)){
						var pos = input.caret(),
							begin = pos.begin,
							end = pos.end;
						
						if(end-begin==0){
							begin=k!=46?seekPrev(begin):(end=seekNext(begin-1));
							end=k==46?seekNext(end):end;
						}
						clearBuffer(begin, end);
						shiftL(begin,end-1);

						return false;
					} else if (k == 27) {//escape
						input.val(focusText);
						input.caret(0, checkVal());
						return false;
					}
				};

				function keypressEvent(e) {
					var k = e.which,
						pos = input.caret();
					if (e.ctrlKey || e.altKey || e.metaKey || k<32) {//Ignore
						return true;
					} else if (k) {
						if(pos.end-pos.begin!=0){
							clearBuffer(pos.begin, pos.end);
							shiftL(pos.begin, pos.end-1);
						}

						var p = seekNext(pos.begin - 1);
						if (p < len) {
							var c = String.fromCharCode(k);
							if (tests[p].test(c)) {
								shiftR(p);
								buffer[p] = c;
								writeBuffer();
								var next = seekNext(p);
								input.caret(next);
								if (settings.completed && next >= len)
									settings.completed.call(input);
							}
						}
						return false;
					}
				};

				function clearBuffer(start, end) {
					for (var i = start; i < end && i < len; i++) {
						if (tests[i])
							buffer[i] = settings.placeholder;
					}
				};

				function writeBuffer() { return input.val(buffer.join('')).val(); };

				function checkVal(allow) {
					//try to place characters where they belong
					var test = input.val();
					var lastMatch = -1;
					for (var i = 0, pos = 0; i < len; i++) {
						if (tests[i]) {
							buffer[i] = settings.placeholder;
							while (pos++ < test.length) {
								var c = test.charAt(pos - 1);
								if (tests[i].test(c)) {
									buffer[i] = c;
									lastMatch = i;
									break;
								}
							}
							if (pos > test.length)
								break;
						} else if (buffer[i] == test.charAt(pos) && i!=partialPosition) {
							pos++;
							lastMatch = i;
						}
					}
					if (!allow && lastMatch + 1 < partialPosition) {
						input.val("");
						clearBuffer(0, len);
					} else if (allow || lastMatch + 1 >= partialPosition) {
						writeBuffer();
						if (!allow) input.val(input.val().substring(0, lastMatch + 1));
					}
					return (partialPosition ? i : firstNonMaskPos);
				};

				input.data($.mask.dataName,function(){
					return $.map(buffer, function(c, i) {
						return tests[i]&&c!=settings.placeholder ? c : null;
					}).join('');
				})

				if (!input.attr("readonly"))
					input
					.one("unmask", function() {
						input
							.unbind(".mask")
							.removeData($.mask.dataName);
					})
					.bind("focus.mask", function() {
						focusText = input.val();
						var pos = checkVal();
						writeBuffer();
						var moveCaret=function(){
							if (pos == mask.length)
								input.caret(0, pos);
							else
								input.caret(pos);
						};
						($.browser.msie ? moveCaret:function(){setTimeout(moveCaret,0)})();
					})
					.bind("blur.mask", function() {
						checkVal();
						if (input.val() != focusText)
							input.change();
					})
					.bind("keydown.mask", keydownEvent)
					.bind("keypress.mask", keypressEvent)
					.bind(pasteEventName, function() {
						setTimeout(function() { input.caret(checkVal(true)); }, 0);
					});

				checkVal(); //Perform initial check for existing values
			});
		}
	});
})(jQuery);
/*
 * Metadata - jQuery plugin for parsing metadata from elements
 *
 * Copyright (c) 2006 John Resig, Yehuda Katz, J�örn Zaefferer, Paul McLanahan
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Revision: $Id: jquery.metadata.js 4187 2007-12-16 17:15:27Z joern.zaefferer $
 *
 */

/**
 * Sets the type of metadata to use. Metadata is encoded in JSON, and each property
 * in the JSON will become a property of the element itself.
 *
 * There are three supported types of metadata storage:
 *
 *   attr:  Inside an attribute. The name parameter indicates *which* attribute.
 *          
 *   class: Inside the class attribute, wrapped in curly braces: { }
 *   
 *   elem:  Inside a child element (e.g. a script tag). The
 *          name parameter indicates *which* element.
 *          
 * The metadata for an element is loaded the first time the element is accessed via jQuery.
 *
 * As a result, you can define the metadata type, use $(expr) to load the metadata into the elements
 * matched by expr, then redefine the metadata type and run another $(expr) for other elements.
 * 
 * @name $.metadata.setType
 *
 * @example <p id="one" class="some_class {item_id: 1, item_label: 'Label'}">This is a p</p>
 * @before $.metadata.setType("class")
 * @after $("#one").metadata().item_id == 1; $("#one").metadata().item_label == "Label"
 * @desc Reads metadata from the class attribute
 * 
 * @example <p id="one" class="some_class" data="{item_id: 1, item_label: 'Label'}">This is a p</p>
 * @before $.metadata.setType("attr", "data")
 * @after $("#one").metadata().item_id == 1; $("#one").metadata().item_label == "Label"
 * @desc Reads metadata from a "data" attribute
 * 
 * @example <p id="one" class="some_class"><script>{item_id: 1, item_label: 'Label'}</script>This is a p</p>
 * @before $.metadata.setType("elem", "script")
 * @after $("#one").metadata().item_id == 1; $("#one").metadata().item_label == "Label"
 * @desc Reads metadata from a nested script element
 * 
 * @param String type The encoding type
 * @param String name The name of the attribute to be used to get metadata (optional)
 * @cat Plugins/Metadata
 * @descr Sets the type of encoding to be used when loading metadata for the first time
 * @type undefined
 * @see metadata()
 */

(function($) {

$.extend({
	metadata : {
		defaults : {
			type: 'class',
			name: 'metadata',
			cre: /({.*})/,
			single: 'metadata'
		},
		setType: function( type, name ){
			this.defaults.type = type;
			this.defaults.name = name;
		},
		get: function( elem, opts ){
			var settings = $.extend({},this.defaults,opts);
			// check for empty string in single property
			if ( !settings.single.length ) settings.single = 'metadata';
			
			var data = $.data(elem, settings.single);
			// returned cached data if it already exists
			if ( data ) return data;
			
			data = "{}";
			
			if ( settings.type == "class" ) {
				var m = settings.cre.exec( elem.className );
				if ( m )
					data = m[1];
			} else if ( settings.type == "elem" ) {
				if( !elem.getElementsByTagName )
					return undefined;
				var e = elem.getElementsByTagName(settings.name);
				if ( e.length )
					data = $.trim(e[0].innerHTML);
			} else if ( elem.getAttribute != undefined ) {
				var attr = elem.getAttribute( settings.name );
				if ( attr )
					data = attr;
			}
			
			if ( data.indexOf( '{' ) <0 )
			data = "{" + data + "}";
			
			data = eval("(" + data + ")");
			
			$.data( elem, settings.single, data );
			return data;
		}
	}
});

/**
 * Returns the metadata object for the first member of the jQuery object.
 *
 * @name metadata
 * @descr Returns element's metadata object
 * @param Object opts An object contianing settings to override the defaults
 * @type jQuery
 * @cat Plugins/Metadata
 */
$.fn.metadata = function( opts ){
	return $.metadata.get( this[0], opts );
};

})(jQuery);/*
 *作    者: 高娜
 *版    本: 1.2
 *完成时间: 2012-05-14
 *描    述: verification
 *关联文件: jQuery.js|jquery-ui.js
 */
(function($,undefined){
    /**
	* @class 输入区域掩码功能
    * @name verification
    * @description 输入区域掩码插件
	* @version 1.2
    */
	$.widget('ui.verification',
	/** @lends verification.prototype */
	{		
		options:{
			/**  
			* @name verification#verSplit
			* @param {String}  字符串类型
			* @description 输入区域分割符,可设置为'-','/'等
			* @default {String} '-'
			* @example
			* $('.verInput').verification({
			*		verSplit : '-'
			*  });
			*/
			verSplit : '-' ,			
			/**  
			* @name verification#verPromptMobile
			* @param {String}  字符串类型
			* @description 手机号码输入区域提示信息
			* @default {String} '请输入11位数字'
			* @example
			* $('.verInput').verification({
			*		verPromptMobile : '请输入11位数字'
			*  });
			*/
			verPromptMobile : '请输入11位数字' ,
			/**  
			* @name verification#verPromptString
			* @param {String}  字符串类型
			* @description 字母输入区域提示信息
			* @default {String} '请输入a-z或是A-Z'
			* @example
			* $('.verInput').verification({
			*		verPromptString : '请输入a-z或是A-Z'
			*  });
			*/
			verPromptString : '请输入a-z或是A-Z',
			/**  
			* @name verification#verPromptNumber
			* @param {String}  字符串类型
			* @description 数字输入区域提示信息
			* @default {String} '请输入0-9'
			* @example
			* $('.verInput').verification({
			*		verPromptNumber : '请输入0-9'
			*  });
			*/
			verPromptNumber : '请输入有效数字',
			/**  
			* @name verification#verFloatDigit
			* @param {Number}  数字类型
			* @description 小数默认可输入的位数
			* @default {Number} 2
			* @example
			* $('.verInput').verification({
			*		verFloatDigit : 2
			*  });
			*/
			verFloatDigit : 2 ,
			/**  
			* @name verification#verPromptPhone
			* @param {String}  字符串类型
			* @description 座机输入区域提示信息
			* @default {String} '输入固定电话'
			* @example
			* $('.verInput').verification({
			*		verPromptPhone : '输入固定电话'
			*  });
			*/
			verPromptPhone : '输入固定电话',
			/**  
			* @name verification#verPromptEmail
			* @param {String}  字符串类型
			* @description Email输入区域提示信息
			* @default {String} '输入有效的email地址'
			* @example
			* $('.verInput').verification({
			*		verPromptEmail : '输入有效的email地址'
			*  });
			*/
			verPromptEmail : '输入有效的email地址',
			/**  
			* @name verification#verPromptUrl
			* @param {String}  字符串类型
			* @description url输入区域提示信息
			* @default {String} '输入有效的链接地址'
			* @example
			* $('.verInput').verification({
			*		verPromptUrl : '输入有效的链接地址'
			*  });
			*/
			verPromptUrl : '输入有效的链接地址',
			/**  
			* @name verification#verPromptIP
			* @param {String}  字符串类型
			* @description IP输入区域提示信息
			* @default {String} '输入有效的IP地址'
			* @example
			* $('.verInput').verification({
			*		verPromptIP : '输入有效的IP地址'
			*  });
			*/
			verPromptIP : '输入有效的IP地址',
			/**  
			* @name verification#verPromptTime
			* @param {String}  字符串类型
			* @description 时间输入区域提示信息
			* @default {String} '输入有效的时间'
			* @example
			* $('.verInput').verification({
			*		verPromptTime : '输入有效的时间'
			*  });
			*/
			verPromptTime : '输入有效的时间',
			/**  
			* @name verification#verPromptAttendance
			* @param {String}  字符串类型
			* @description 考勤输入区域提示信息
			* @default {String} '输入有效的考勤'
			* @example
			* $('.verInput').verification({
			*		verPromptAttendance : '输入有效的考勤'
			*  });
			*/
			verPromptAttendance : '输入有效的考勤'
		},
		_create:function(){
			var self = this.element ;
			var parDiv = '<div class="parDiv"></div>' ;
			self.wrap(parDiv) ;
		},
		_init:function(){
			var o = this.options ;
			var self = this.element ;
			var veifType = self.attr('data-verif') ;			
			var verifFun ;
			if(veifType){
				switch(veifType){
					case 'verMobile' : (self.val() == '') ? self.val(o.verPromptMobile).addClass('varPrompt').attr('data-val',o.verPromptMobile) : self.addClass('varPrompt').attr('data-val',self.val()) ; verifFun = verMobile; break ;
					case 'verString' : (self.val() == '') ? self.val(o.verPromptString).addClass('varPrompt').attr('data-val',o.verPromptString) : self.addClass('varPrompt').attr('data-val',self.val()) ; verifFun = verString; break ;
					case 'verNumber' : (self.val() == '') ? self.val(o.verPromptNumber).addClass('varPrompt').attr('data-val',o.verPromptNumber) : self.addClass('varPrompt').attr('data-val',self.val()) ; verifFun = verNumber; break ;
					case 'verPhone' : (self.val() == '') ? self.val(o.verPromptPhone).addClass('varPrompt').attr('data-val',o.verPromptPhone) : self.addClass('varPrompt').attr('data-val',self.val()) ; verifFun = verPhone; break ;
					case 'verEmail' : (self.val() == '') ? self.val(o.verPromptEmail).addClass('varPrompt').attr('data-val',o.verPromptEmail) : self.addClass('varPrompt').attr('data-val',self.val()) ; verifFun = verEmail; break ;
					case 'verUrl' : (self.val() == '') ? self.val(o.verPromptUrl).addClass('varPrompt').attr('data-val',o.verPromptUrl) : self.addClass('varPrompt').attr('data-val',self.val()) ; verifFun = verUrl; break ;
					case 'verIP' : (self.val() == '') ? self.val(o.verPromptIP).addClass('varPrompt').attr('data-val',o.verPromptIP) : self.addClass('varPrompt').attr('data-val',self.val()) ; verifFun = verIP; break ;
					case 'verTime' : (self.val() == '') ? self.val(o.verPromptTime).addClass('varPrompt').attr('data-val',o.verPromptTime) : self.addClass('varPrompt').attr('data-val',self.val()) ; verifFun = verTime; break ;
					case 'verAttendance' : (self.val() == '') ? self.val(o.verPromptAttendance).addClass('varPrompt').attr('data-val',o.verPromptAttendance) : self.addClass('varPrompt').attr('data-val',self.val()) ; verifFun = verAttendance; break ;
				}
			}else{
				return false ;
			} ;
			self.focus(function(){
				self.removeClass('varPrompt').removeClass('inputPrompt') ;
				verifFun() ;
			}) ;
			
			//判断是否是数字
			function isNumber(letter){
				if(((letter<=57)&&(letter>=48))||((letter<=105)&&(letter>=96))){
					return true ;
				}else{
					return false ;
				}
			}
			
			//判断是否是字母
			function isLetter(letter){
				if((letter<=90)&&(letter>=65)){
					return true ;
				}else{
					return false ;
				}
			}
			
			//判断是否在数组中
			function isInArr(targetElem,sourceArr){
				for(var i=0; i<sourceArr.length;i++){
					if(targetElem == sourceArr[i]){
						return true ;
					}
				}
			}
			
			//判断是否是通用按键
			var commonKeyArr = new Array('8','9','13','16','17','18','19','20','27','32','33','34','35','36','37','38','39','40','45','46','91','92','93','112','113','114','115','116','117','118','119','120','121','122','123','144','145') ; //键盘键值-删除:8,tab:9,enter:13,shift:16,ctrl:17,alt:18,pause:19,capslock:20,esc:27,空格:32,pageup:33,pagedown:34,end:35,Home:36,左键:37,上键:38,右键:39,下键:40,insert:45,delete:46,空格左边窗口键:91,空格右边窗口键:92,黏贴:93,F1-F12:112-123,NumLock:144,ScrollLock:145
			function isCommonKey(letter){
				var isCom = isInArr(letter,commonKeyArr) ;
				if(isCom){
					return true ;
				}else{
					return false ;
				}
			}
			
			//判断是否是闰年
			function isLeapYear(pYear){
				if(!isNaN(parseInt(pYear))){
					if((pYear%4==0) && (pYear%100!=0)||(pYear%100==0) && (pYear%400==0)){
						return true ;
					}else{
						return false ;
					}
				}
			}
			
			//生成气泡提示
			function createBubble(obj,bubconmsg){
				$(obj).bubble("temBub",true,{
					x:$(obj).offset().left + 10 ,
					y:$(obj).offset().top + 4 ,
					content:bubconmsg,
					hand:"leftTop"
				}) ;	
				setTimeout(function(){$('#temBub').detach() ;},500) ;
			}
			
			//键盘触发数字方法
			function keydownNumber(objkey,maxLengthkey,focusObjkey,frontFocuskey){
				objkey.keydown(function(e){
					var inputLetter = e.which ;
					if(!isCommonKey(inputLetter)){
						var lenTim = objkey.val().length ;
						if(maxLengthkey != 'placeholderKey'){
							if(lenTim<maxLengthkey){
								if(isNumber(inputLetter)){
								}else{
									return false ;
								}
							}else{
								if(focusObjkey != 'placeholderKey'){
									focusObjkey.focus() ;
								}
								return false ;
							}
						}else{
							if(isNumber(inputLetter)){
							}else{
								return false ;
							}
						}
					}
					if(focusObjkey != 'placeholderKey'){
						if(inputLetter == 9){
							focusObjkey.focus(function(){
								focusObjkey.attr('data-focus',true)
							}) ;
						}
					}
					if(frontFocuskey != 'placeholderKey'){
						if(inputLetter == 8){
							var objkeyLen = objkey.val().length	;
							if(objkeyLen == 0){
								frontFocuskey.focus() ;
							}
						}
					}
				}) ;
			}
			
			//判断获得焦点的对象
			function documentFocus(objFocus,classArr,documentFocusVal){
				var isDocument = true ;
				$(document).focus(function(e){
					isDocument = false ;
					var target = e.target ;						
					var isHasNull ;
					var classObj ;				
					if(!isInArr($(target).attr('class').split(' ')[0],classArr)){
						for(var i=0; i<classArr.length ; i++){
							classObj = eval('$(".'+classArr[i]+'")') ;
							if(classObj.val() == ''){
								isHasNull = true ;
							}
						}
						if(isHasNull){
							self.val(documentFocusVal).show().addClass('inputPrompt') ;
						}else{
							self.val(documentFocusVal).show() ;
						}
						objFocus.parent('.EditDiv').hide() ;
					}
				}) ;
				if(isDocument == true){
					$(document).click(function(e){
						var target = e.target ;						
						var isHasNull ;
						var classObj ;				
						if(!isInArr($(target).attr('class').split(' ')[0],classArr)){
							for(var i=0; i<classArr.length ; i++){
								classObj = eval('$(".'+classArr[i]+'")') ;
								if(classObj.val() == ''){
									isHasNull = true ;
								}
							}
							if(isHasNull){
								self.val(documentFocusVal).show().addClass('inputPrompt') ;
							}else{
								self.val(documentFocusVal).show() ;
							}
							objFocus.parent('.EditDiv').hide() ;
						}
					}) ;
				}
			}
			
			/*手机验证*/
			function verMobile(){
				if(self.val() == o.verPromptMobile){
					self.val('') ;
				}
				var mobileLen = 11 ;
				keydownNumber(self,mobileLen,'placeholderKey','placeholderKey') ;
				self.blur(function(){
					if(self.val().length<mobileLen){
						createBubble(self,'请输入11位的手机号码') ;
						self.addClass('inputPrompt') ;
					}
				}) ;
			}
			
			/*字符串验证*/
			function verString(){
				if(self.val() == o.verPromptString){
					self.val('').removeClass('varPrompt') ;
				}
				self.keydown(function(e){
					var inputLetter = e.which ;
					if(isLetter(inputLetter)||isCommonKey(inputLetter)){
					}else{
						return false ;
					}
				}) ;
				self.blur(function(){
					if(self.val() == ''){
						createBubble(self,'不能为空') ;
						self.addClass('inputPrompt') ;
					}
				}) ;
			}
			
			/*数字验证*/
			function verNumber(){		
				if(self.val() == o.verPromptNumber){
					self.val('') ;
				}else if(self.parent('.parDiv').find('.EditDiv').css('display') == 'none'){
					self.hide() ;
					self.parent('.parDiv').find('.EditDiv').show() ;
				}
				var range = self.attr('data-range') ;
				if(range){
					var numRange = range.split(',') ;
					var minRanage = numRange[0] ;
					var maxRanage = numRange[1] ;
					var maxLen = maxRanage.length ;
					if(numRange[2]){
						var numberType = numRange[2] ;
					}else{
						var numberType = 'integer' ;
					}
					switch(numberType){
						case 'integer' : intNumber(minRanage,maxRanage,numberType,maxLen) ; break ;
						case 'percentage' : 
							var isPer = self.attr('data-isPer') ; 
							if(!isPer){
								self.after('%');
								self.attr('data-isPer','false') ;
							} ;  
							intNumber(minRanage,maxRanage,numberType,maxLen) ; break ;
						case 'float' : floNumber(minRanage,maxRanage,numberType,maxLen) ; break ;
					}	
				}else{ //没有大小值限制
					self.show() ;
					keydownNumber(self,'placeholderKey','placeholderKey','placeholderKey') ;
					self.blur(function(){
						if(self.val() == ''){
							createBubble(self,'不能为空') ;
							self.addClass('inputPrompt') ;
						}
					}) ;
				}
			}
			/*数字验证-输入整数或是百分数形式*/
			function intNumber(minRanage,maxRanage,numberType,maxLen){
				keydownNumber(self,maxLen,'placeholderKey','placeholderKey') ;
				self.blur(function(){
					var tarVal = parseInt(self.val()) ;
					if(tarVal<parseInt(minRanage)){
						var bubconmsg = '输入数字范围为'+minRanage+'-'+maxRanage+',输入内容小于'+minRanage+',默认为'+minRanage ;
						createBubble(self,bubconmsg) ;
						self.val(minRanage) ;
					}else if(tarVal>parseInt(maxRanage)){
						var bubconmsg = '输入数字范围为'+minRanage+'-'+maxRanage+',输入内容大于'+maxRanage+',默认为'+maxRanage ;
						createBubble(self,bubconmsg) ;
						self.val(maxRanage)  ;
					}else if(self.val() == ''){
						createBubble(self,'不能为空') ;
						self.addClass('inputPrompt') ;
					}
				}) ;
			}
			/*数字验证-输入小数数形式*/
			function floNumber(minRanage,maxRanage,numberType,maxLen){	
				var isHasFl = self.attr('data-isHasFl') ; 
				if(self.attr('data-val')!=o.verPromptNumber){
					var tarVal = self.val().split('.') ;
				}else{
					defVal = '.' ;
					var tarVal = defVal.split('.') ;
				}
				if(!isHasFl){
					self.after('<div class="EditDiv"><input type="text" class="inputInter" value="'+tarVal[0]+'"/><span class="decPoint">.</span><input type="text" class="inputFloat" value="'+tarVal[1]+'" /></div>') ;
					self.attr('data-isHasFl','false') ;
				} ;	
				var selfFloInt = self.parent('.parDiv').find('.EditDiv').children('input.inputInter') ;	
				var selfFloFlo = self.parent('.parDiv').find('.EditDiv').children('input.inputFloat') ;
				self.hide() ;
				selfFloInt.focus() ;			
				keydownNumber(selfFloInt,maxLen,selfFloFlo,'placeholderKey') ;
				keydownNumber(selfFloFlo,o.verFloatDigit,'placeholderKey',selfFloInt) ;
				
				selfFloInt.blur(function(){
					var tarVal = parseInt(selfFloInt.val()) ;
					if(tarVal<parseInt(minRanage)){
						var bubconmsg = '输入数字范围为'+minRanage+'-'+maxRanage+',输入内容小于'+minRanage+',默认为'+minRanage ;
						createBubble(selfFloFlo,bubconmsg) ;
						selfFloInt.val(minRanage) ;
						self.val(minRanage+'.00') ;
					}else if(tarVal>=parseInt(maxRanage)){
						var bubconmsg = '输入数字范围为'+minRanage+'-'+maxRanage+',输入内容大于'+maxRanage+',默认为'+maxRanage ;
						createBubble(selfFloFlo,bubconmsg) ;
						selfFloInt.val(maxRanage)  ;
						selfFloFlo.val('00') ;
					}
					var classArr = new Array('inputInter','inputFloat') ;
					var targetInputVal = selfFloInt.val() + '.' + selfFloFlo.val() ;
					selfFloInt.parents('.EditDiv').prev('input.verInput').val(targetInputVal) ;
					documentFocus(selfFloInt,classArr,targetInputVal) ;
				}) ;
				selfFloFlo.blur(function(){
					selfFloFlo.attr('data-focus',false)
					var floVal =  selfFloFlo.val() ;
					if(floVal.length == 1){
						 selfFloFlo.val(floVal + '0')
					}else if(floVal.length == 0){
						 selfFloFlo.val(floVal + '00')
					}
					if(selfFloInt.val() == ''){
						createBubble(selfFloFlo,'不能为空') ;
						selfFloInt.addClass('inputPrompt') ;
					}					
					var classArr = new Array('inputInter','inputFloat') ;
					var targetInputVal = selfFloInt.val() + '.' + selfFloFlo.val() ;
					selfFloFlo.parents('.EditDiv').prev('input.verInput').val(targetInputVal) ;
					documentFocus(selfFloFlo,classArr,targetInputVal) ;
				}) ;
			}
			
			/*座机验证*/
			function verPhone(){
				if(self.val() == o.verPromptPhone){
					self.val('') ;
				}else if(self.parent('.parDiv').find('.EditDiv').css('display') == 'none'){
					self.hide() ;
					self.parent('.parDiv').find('.EditDiv').show() ;
				}
				var isHasFl = self.attr('data-isHasFl') ; 
				var areaCodeLen = 3 ;
				var phoneLen = 8 ;
				var phoneExtLen = 3 ;
				if(self.attr('data-val')!=o.verPromptPhone){
					var tarVal = self.val().split(o.verSplit) ;
				}else{
					defVal = o.verSplit + o.verSplit + o.verSplit ;
					var tarVal = defVal.split(o.verSplit) ;
				}
				if(!isHasFl){
					self.after('<div class="EditDiv"><span class="decPoint">0</span><input type="text" class="inputAreaCode" value="'+tarVal[0]+'"/><span class="decPoint">'+o.verSplit+'</span><input type="text" class="inputPhoneNumber" value="'+tarVal[1]+'"/><span class="decPoint">'+o.verSplit+'</span><input type="text" class="inputPhoneExt" value="'+tarVal[2]+'"/></div>') ;
					self.attr('data-isHasFl','false') ;
				} ;
				var selfAreaCode = self.hide().nextAll('.EditDiv').children('input.inputAreaCode') ;
				var selfPhone = self.hide().nextAll('.EditDiv').children('input.inputPhoneNumber') ;
				var selfExt = self.hide().nextAll('.EditDiv').children('input.inputPhoneExt') ;
				self.hide() ;
				selfAreaCode.focus() ;
				keydownNumber(selfAreaCode,areaCodeLen,selfPhone,'placeholderKey') ;
				selfAreaCode.blur(function(){
					var areaCodeVal = selfAreaCode.val() ;
					if(areaCodeVal == ''){
						createBubble(selfAreaCode,'不能为空') ;
						selfAreaCode.addClass('inputPrompt') ;
					}else if(parseInt(areaCodeVal)<10){
						createBubble(selfAreaCode,'输入数字范围为10-999输入内容小于10,默认为10') ;
						selfAreaCode.val('10') ;
					}
					var classArr = new Array('inputAreaCode','inputPhoneNumber','inputPhoneExt') ;
					var targetInputVal = '0' + selfAreaCode.val() + o.verSplit + selfPhone.val() + o.verSplit + selfExt.val() ;
					selfAreaCode.parents('.EditDiv').prev('input.verInput').val(targetInputVal) ;
					documentFocus(selfAreaCode,classArr,targetInputVal) ;
				}) ;
				keydownNumber(selfPhone,phoneLen,selfExt,selfAreaCode) ;
				selfPhone.blur(function(){
					var pnoneVal = selfPhone.val() ;
					if(pnoneVal == ''){
						createBubble(selfAreaCode,'不能为空') ;
						selfPhone.addClass('inputPrompt') ;
					} ;
					var classArr = new Array('inputAreaCode','inputPhoneNumber','inputPhoneExt') ;
					var targetInputVal = '0' + selfAreaCode.val() + o.verSplit + selfPhone.val() + o.verSplit + selfExt.val() ;
					selfPhone.parents('.EditDiv').prev('input.verInput').val(targetInputVal) ;
					documentFocus(selfPhone,classArr,targetInputVal) ;
				}) ;
				keydownNumber(selfExt,'placeholderKey','placeholderKey',selfPhone) ;
				selfExt.blur(function(){
					var extVal = selfExt.val() ;
					if(extVal.length <1){
						var targetInputVal = '0' + selfAreaCode.val() + o.verSplit + selfPhone.val() ;
					}else{
						var targetInputVal = '0' + selfAreaCode.val() + o.verSplit + selfPhone.val() + o.verSplit + selfExt.val() ;
					}	
					var classArr = new Array('inputAreaCode','inputPhoneNumber','inputPhoneExt') ;
					var targetInputVal = '0' + selfAreaCode.val() + o.verSplit + selfPhone.val() + o.verSplit + selfExt.val() ;
					selfExt.parents('.EditDiv').prev('input.verInput').val(targetInputVal) ;
					documentFocus(selfExt,classArr,targetInputVal) ;
				}) ;
			}
		
			/*Email验证*/
			function verEmail(){
				if(self.val() == o.verPromptEmail){
					self.val('') ;
				}else if(self.parent('.parDiv').find('.EditDiv').css('display') == 'none'){
					self.hide() ;
					self.parent('.parDiv').find('.EditDiv').show() ;
				}
				var isHasFl = self.attr('data-isHasFl') ; 
				if(self.attr('data-val')!=o.verPromptEmail){
					var tarVal0 = self.val().split('@')[0] ;
					var tarVal1 = self.val().split('@')[1].split('.')[0] ;
					var tarVal2 = self.val().split('@')[1].split('.')[1] ;
				}else{
					defVal = '@.' ;
					var tarVal0 = defVal.split('@')[0] ;
					var tarVal1 = defVal.split('@')[1].split('.')[0] ;
					var tarVal2 = defVal.split('@')[1].split('.')[1] ;
				}
				if(!isHasFl){
					self.after('<div class="EditDiv"><input type="text" class="inputEmailfront" value="'+tarVal0+'"/><span class="decPoint">@</span><input type="text" class="inputEmailback" value="'+tarVal1+'"/><span class="decPoint">.</span><input type="text" class="inputEmaillast" value="'+tarVal2+'"/></div>') ;
					self.attr('data-isHasFl','false') ;
				} ;
				var selfEmailF = self.parent('.parDiv').find('.EditDiv').children('input.inputEmailfront') ;
				var selfEmailB = self.parent('.parDiv').find('.EditDiv').children('input.inputEmailback') ;
				var selfEmailL = self.parent('.parDiv').find('.EditDiv').children('input.inputEmaillast') ;
				self.hide() ;
				selfEmailF.focus() ;
				selfEmailF.blur(function(){
					var classArr = new Array('inputEmailfront','inputEmailback','inputEmaillast') ;
					var targetInputVal = selfEmailF.val() + '@' + selfEmailB.val() + '.' + selfEmailL.val() ;
					selfEmailF.parents('.EditDiv').prev('input.verInput').val(targetInputVal) ;
					documentFocus(selfEmailF,classArr,targetInputVal) ;
				}) ;
				selfEmailB.blur(function(){
					var classArr = new Array('inputEmailfront','inputEmailback','inputEmaillast') ;
					var targetInputVal = selfEmailF.val() + '@' + selfEmailB.val() + '.' + selfEmailL.val() ;
					selfEmailB.parents('.EditDiv').prev('input.verInput').val(targetInputVal) ;
					documentFocus(selfEmailB,classArr,targetInputVal) ;
				}) ;
				selfEmailL.blur(function(){
					var emailVal = selfEmailL.val() ;
					if(emailVal == ''){
						createBubble(selfEmailL,'不能为空') ;
						selfEmailL.addClass('inputPrompt') ;
					}
					var classArr = new Array('inputEmailfront','inputEmailback','inputEmaillast') ;
					var targetInputVal = selfEmailF.val() + '@' + selfEmailB.val() + '.' + selfEmailL.val() ;
					selfEmailL.parents('.EditDiv').prev('input.verInput').val(targetInputVal) ;
					documentFocus(selfEmailL,classArr,targetInputVal) ;
				}) ;
			}
			
			/*url验证*/
			function verUrl(){
				if(self.val() == o.verPromptUrl){
					self.val('') ;
				}else if(self.parent('.parDiv').find('.EditDiv').css('display') == 'none'){
					self.hide() ;
					self.parent('.parDiv').find('.EditDiv').show() ;
				}
				var isHasFl = self.attr('data-isHasFl') ; 
				if(!isHasFl){
					self.after('<div class="EditDiv"><span class="decPoint">http://</span><input type="text" class="inputUrl"/></div>') ;
					self.attr('data-isHasFl','false') ;
				} ;
				var selfInputUrl = self.parent('.parDiv').find('.EditDiv').children('input.inputUrl') ;
				self.hide() ;
				selfInputUrl.focus() ;
				selfInputUrl.blur(function(){
					var urlVal = selfInputUrl.val() ;
					if(urlVal == ''){
						createBubble(selfInputUrl,'不能为空') ;
						selfInputUrl.addClass('inputPrompt') ;
					}
					var classArr = new Array('inputUrl') ;
					var targetInputVal = 'http://' + urlVal ;
					selfInputUrl.parents('.EditDiv').prev('input.verInput').val(targetInputVal) ;
					documentFocus(selfInputUrl,classArr,targetInputVal) ;
				}) ;
			}
		
			/*ip地址验证*/
			function verIP(){
				if(self.val() == o.verPromptIP){
					self.val('') ;
				}else if(self.parent('.parDiv').find('.EditDiv').css('display') == 'none'){
					self.hide() ;
					self.parent('.parDiv').find('.EditDiv').show() ;
				}
				var isHasFl = self.attr('data-isHasFl') ; 
				var ipLen = 3 ;
				if(self.attr('data-val')!=o.verPromptIP){
					var tarVal = self.val().split('.') ;
				}else{
					defVal = '...' ;
					var tarVal = defVal.split('.') ;
				}
				if(!isHasFl){
					self.after('<div class="EditDiv"><input type="text" class="inputIP1" value="'+tarVal[0]+'"/><span class="decPoint">.</span><input type="text" class="inputIP2" value="'+tarVal[1]+'"/><span class="decPoint">.</span><input type="text" class="inputIP3" value="'+tarVal[2]+'"/><span class="decPoint">.</span><input type="text" class="inputIP4" value="'+tarVal[3]+'"/></div>') ;
					self.attr('data-isHasFl','false') ;
				} ;
				var selfIP1 = self.parent('.parDiv').find('.EditDiv').children('input.inputIP1') ;
				var selfIP2 = self.parent('.parDiv').find('.EditDiv').children('input.inputIP2') ;
				var selfIP3 = self.parent('.parDiv').find('.EditDiv').children('input.inputIP3') ;
				var selfIP4 = self.parent('.parDiv').find('.EditDiv').children('input.inputIP4') ;
				self.hide() ;
				selfIP1.focus() ;
				keydownNumber(selfIP1,ipLen,selfIP2,'placeholderKey') ;
				selfIP1.blur(function(){
					var ip1Val = selfIP1.val() ;
					if(ip1Val == ''){
						createBubble(selfIP1,'不能为空') ;
						selfIP1.val('1') ;
					}else if(parseInt(ip1Val)<1){
						createBubble(selfIP1,'必须输入1-223之间的数,输入数值小于1,默认为1') ;
						selfIP1.val('1') ;
					}else if(parseInt(ip1Val)>223){
						createBubble(selfIP1,'必须输入1-223之间的数,输入数值大于223,默认为223') ;
						selfIP1.val('223') ;
					}
					var classArr = new Array('inputIP1','inputIP2','inputIP3','inputIP4') ;
					var targetInputVal = selfIP1.val() + '.' + selfIP2.val() + '.' + selfIP3.val() + '.' + selfIP4.val() ;
					selfIP1.parents('.EditDiv').prev('input.verInput').val(targetInputVal) ;
					documentFocus(selfIP1,classArr,targetInputVal) ;
				}) ;
				keydownNumber(selfIP2,ipLen,selfIP3,selfIP1) ;
				selfIP2.blur(function(){
					var ip2Val = selfIP2.val() ;
					if(ip2Val == ''){
						createBubble(selfIP1,'不能为空') ;
						selfIP2.val('0') ;
					}else if(parseInt(ip2Val)>255){
						createBubble(selfIP1,'必须输入0-255之间的数,输入数值大于255,默认为255') ;
						selfIP2.val('255') ;
					}
					var classArr = new Array('inputIP1','inputIP2','inputIP3','inputIP4') ;
					var targetInputVal = selfIP1.val() + '.' + selfIP2.val() + '.' + selfIP3.val() + '.' + selfIP4.val() ;
					selfIP2.parents('.EditDiv').prev('input.verInput').val(targetInputVal) ;
					documentFocus(selfIP2,classArr,targetInputVal) ;
				}) ;
				keydownNumber(selfIP3,ipLen,selfIP4,selfIP2) ;
				selfIP3.blur(function(){
					var ip3Val = selfIP3.val() ;
					if(ip3Val == ''){
						createBubble(selfIP1,'不能为空') ;
						selfIP3.val('0') ;
					}else if(parseInt(ip3Val)>255){
						createBubble(selfIP1,'必须输入0-255之间的数,输入数值大于255,默认为255') ;
						selfIP3.val('255') ;
					}
					var classArr = new Array('inputIP1','inputIP2','inputIP3','inputIP4') ;
					var targetInputVal = selfIP1.val() + '.' + selfIP2.val() + '.' + selfIP3.val() + '.' + selfIP4.val() ;
					selfIP3.parents('.EditDiv').prev('input.verInput').val(targetInputVal) ;
					documentFocus(selfIP3,classArr,targetInputVal) ;
				}) ;
				keydownNumber(selfIP4,ipLen,'placeholderKey',selfIP3) ;
				selfIP4.blur(function(){
					var ip4Val = selfIP4.val() ;
					if(ip4Val == ''){
						createBubble(selfIP1,'不能为空') ;
						selfIP4.val('0') ;
					}else if(parseInt(ip4Val)>255){
						createBubble(selfIP1,'必须输入0-255之间的数,输入数值大于255,默认为255') ;
						selfIP4.val('255') ;
					}
					var classArr = new Array('inputIP1','inputIP2','inputIP3','inputIP4') ;
					var targetInputVal = selfIP1.val() + '.' + selfIP2.val() + '.' + selfIP3.val() + '.' + selfIP4.val() ;
					selfIP4.parents('.EditDiv').prev('input.verInput').val(targetInputVal) ;
					documentFocus(selfIP4,classArr,targetInputVal) ;
				}) ;
			}
		
			/*时间验证*/
			function verTime(){
				if(self.val() == o.verPromptTime){
					self.val('') ;
				}else if(self.parent('.parDiv').find('.EditDiv').css('display') == 'none'){
					self.hide() ;
					self.parent('.parDiv').find('.EditDiv').show() ;
				}
				var isHasFl = self.attr('data-isHasFl') ; 
				var yearLen = 4 ;
				var monthLen = 2 ;
				var DayLen = 2 ;
				if(self.attr('data-val')!=o.verPromptTime){
					var tarVal = self.val().split(o.verSplit) ;
				}else{
					defVal = o.verSplit + o.verSplit + o.verSplit ;
					var tarVal = defVal.split(o.verSplit) ;
				}
				if(!isHasFl){
					self.after('<div class="EditDiv"><input type="text" class="inputYear" value="'+tarVal[0]+'"/><span class="decPoint">'+o.verSplit+'</span><input type="text" class="inputMonth" value="'+tarVal[1]+'"/><span class="decPoint">'+o.verSplit+'</span><input type="text" class="inputDay" value="'+tarVal[2]+'"/></div>') ;
					self.attr('data-isHasFl','false') ;
				} ;
				var selfTimeY = self.parent('.parDiv').find('.EditDiv').children('input.inputYear') ;
				var selfTimeM = self.parent('.parDiv').find('.EditDiv').children('input.inputMonth') ;
				var selfTimeD = self.parent('.parDiv').find('.EditDiv').children('input.inputDay') ;
				self.hide() ;
				selfTimeY.focus() ;
				keydownNumber(selfTimeY,yearLen,selfTimeM,'placeholderKey') ;
				selfTimeY.blur(function(){
					var yearVal = selfTimeY.val() ;
					if(yearVal == ''){
						createBubble(selfTimeY,'不能为空') ;
						selfTimeY.val('1000') ;
					}else if(parseInt(yearVal)<1000){
						createBubble(selfTimeY,'必须输入1000-9999之间的数,输入数值小于1000,默认为1000') ;
						selfTimeY.val('1000') ;
					}else if(parseInt(yearVal)>9999){
						createBubble(selfTimeY,'必须输入1000-9999之间的数,输入数值大于9999,默认为9999') ;
						selfTimeY.val('9999') ;
					}
					var classArr = new Array('inputYear','inputMonth','inputDay') ;
					var targetInputVal = selfTimeY.val() + o.verSplit + selfTimeM.val() + o.verSplit + selfTimeD.val() ;
					selfTimeY.parents('.EditDiv').prev('input.verInput').val(targetInputVal) ;
					documentFocus(selfTimeY,classArr,targetInputVal) ;
				}) ;
				keydownNumber(selfTimeM,monthLen,selfTimeD,selfTimeY) ;
				selfTimeM.blur(function(){
					var monthVal = selfTimeM.val() ;
					var monthValLen = monthVal.length ;
					if(monthVal == ''){
						createBubble(selfTimeM,'不能为空') ;
						selfTimeM.val('01') ;
					}else if(parseInt(monthVal)<1){
						createBubble(selfTimeM,'必须输入01-12之间的数,输入数值小于01,默认为01') ;
						selfTimeM.val('01') ;
					}else if(parseInt(monthVal)>12){
						createBubble(selfTimeM,'必须输入01-12之间的数,输入数值大于12,默认为12') ;
						selfTimeM.val('12') ;
					}else if(monthValLen == 1){
						selfTimeM.val('0'+monthVal) ;
					}
					var classArr = new Array('inputYear','inputMonth','inputDay') ;
					var targetInputVal = selfTimeY.val() + o.verSplit + selfTimeM.val() + o.verSplit + selfTimeD.val() ;
					selfTimeM.parents('.EditDiv').prev('input.verInput').val(targetInputVal) ;
					documentFocus(selfTimeM,classArr,targetInputVal) ;
				}) ;
				keydownNumber(selfTimeD,monthLen,'placeholderKey',selfTimeM) ;
				selfTimeD.blur(function(){
					var yearVal = selfTimeY.val() ;
					var monthVal = selfTimeM.val() ;
					var bigMonth = new Array(1,01,3,03,5,05,7,07,8,08,10,12) ;
					var smallMonth = new Array(4,04,6,06,9,09,11) ;
					var otherMonth = new Array(2,02) ;
					var maxDay ;
					var promptMsg ;
					
					if(isLeapYear(yearVal)&&isInArr(monthVal,otherMonth)){
						maxDay = 29 ;
					}else if(!isLeapYear(yearVal)&&isInArr(monthVal,otherMonth)){
						maxDay = 28 ;
					}else if(isInArr(monthVal,bigMonth)){
						maxDay = 31 ;
					}else if(isInArr(monthVal,smallMonth)){
						maxDay = 30 ;
					}
					promptMsg = '必须输入01-'+maxDay+'之间的数' ;					
					var dayVal = selfTimeD.val() ;
					var dayValLen = dayVal.length ;
					if(dayVal == ''){
						createBubble(selfTimeM,'不能为空') ;
						selfTimeD.val('01') ;
					}else if(dayVal<1){
						var bubconmsg = promptMsg + ',输入数值小于01,默认为01' ;
						createBubble(selfTimeM,bubconmsg) ;
						selfTimeD.val('01') ;
					}else if(dayVal>maxDay){
						var bubconmsg = promptMsg + ',输入数值大于'+maxDay+'12,默认为'+maxDay ;
						createBubble(selfTimeM,bubconmsg) ;
						selfTimeD.val(maxDay) ;
					}else if(dayValLen == 1){
						selfTimeD.val('0'+dayVal) ;
					}
					var classArr = new Array('inputYear','inputMonth','inputDay') ;
					var targetInputVal = selfTimeY.val() + o.verSplit + selfTimeM.val() + o.verSplit + selfTimeD.val() ;
					selfTimeD.parents('.EditDiv').prev('input.verInput').val(targetInputVal) ;
					documentFocus(selfTimeD,classArr,targetInputVal) ;
				}) ;
			}
			/*考勤验证*/
			function verAttendance(){
				if(self.val() == o.verPromptAttendance){
					self.val('') ;
				}else if(self.parent('.parDiv').find('.EditDiv').css('display') == 'none'){
					self.hide() ;
					self.parent('.parDiv').find('.EditDiv').show() ;
				}
				var isHasFl = self.attr('data-isHasFl') ; 
				var attLen = 3 ;
				if(self.attr('data-val')!=o.verPromptAttendance){
					var tarVal = self.val().split('.') ;
				}else{
					defVal = ' . . . ' ;
					var tarVal = defVal.split('.') ;
				}
				if(!isHasFl){
					self.after('<div class="EditDiv"><input type="text" class="inputAtt1" value="'+tarVal[0]+'"/><span class="decPoint">.</span><input type="text" class="inputAtt2" value="'+tarVal[1]+'"/><span class="decPoint">.</span><input type="text" class="inputAtt3" value="'+tarVal[2]+'"/><span class="decPoint">.</span><input type="text" class="inputAtt4" value="'+tarVal[3]+'"/></div>') ;
					self.attr('data-isHasFl','false') ;
				} ;
				var selfAtt1 = self.parent('.parDiv').find('.EditDiv').children('input.inputAtt1') ;
				var selfAtt2 = self.parent('.parDiv').find('.EditDiv').children('input.inputAtt2') ;
				var selfAtt3 = self.parent('.parDiv').find('.EditDiv').children('input.inputAtt3') ;
				var selfAtt4 = self.parent('.parDiv').find('.EditDiv').children('input.inputAtt4') ;
				self.hide() ;
				selfAtt1.focus() ;
				keydownNumber(selfAtt1,attLen,selfAtt2,'placeholderKey') ;
				selfAtt1.blur(function(){
					var att1Val = selfAtt1.val() ;
					if(att1Val == ''){
						createBubble(selfAtt1,'不能为空') ;
						selfAtt1.val('1').attr('data-val','1') ;
					}else if(parseInt(att1Val)<1){
						createBubble(selfAtt1,'必须输入1-223之间的数,输入数值小于1,默认为1') ;
						selfAtt1.val('1').attr('data-val','1') ;
					}else if(parseInt(att1Val)>223){
						createBubble(selfAtt1,'必须输入1-223之间的数,输入数值大于223,默认为223') ;
						selfAtt1.val('223').attr('data-val','233') ;
					}
					var classArr = new Array('inputAtt1','inputAtt2','inputAtt3','inputAtt4') ;
					var targetInputVal = selfAtt1.val() + '.' + selfAtt2.val() + '.' + selfAtt3.val() + '.' + selfAtt4.val() ;
					selfAtt1.parents('.EditDiv').prev('input.verInput').val(targetInputVal) ;
					documentFocus(selfAtt1,classArr,targetInputVal) ;
				}) ;
				keydownNumber(selfAtt2,attLen,selfAtt3,selfAtt1) ;
				selfAtt2.blur(function(){
					var att2Val = selfAtt2.val() ;
					if(att2Val == ''){
					}else if(parseInt(att2Val)>255){
						createBubble(selfAtt1,'必须输入0-255之间的数,输入数值大于255,默认为255') ;
						selfAtt2.val('255') ;
					}
					var classArr = new Array('inputAtt1','inputAtt2','inputAtt3','inputAtt4') ;
					var targetInputVal = selfAtt1.val() + '.' + selfAtt2.val() + '.' + selfAtt3.val() + '.' + selfAtt4.val() ;
					selfAtt2.parents('.EditDiv').prev('input.verInput').val(targetInputVal) ;
					documentFocus(selfAtt2,classArr,targetInputVal) ;
				}) ;
				keydownNumber(selfAtt3,attLen,selfAtt4,selfAtt2) ;
				selfAtt3.blur(function(){
					var att3Val = selfAtt3.val() ;
					if(att3Val == ''){
					}else if(parseInt(att3Val)>255){
						createBubble(selfAtt1,'必须输入0-255之间的数,输入数值大于255,默认为255') ;
						selfAtt3.val('255') ;
					}
					var classArr = new Array('inputAtt1','inputAtt2','inputAtt3','inputAtt4') ;
					var targetInputVal = selfAtt1.val() + '.' + selfAtt2.val() + '.' + selfAtt3.val() + '.' + selfAtt4.val() ;
					selfAtt3.parents('.EditDiv').prev('input.verInput').val(targetInputVal) ;
					documentFocus(selfAtt3,classArr,targetInputVal) ;
				}) ;
				keydownNumber(selfAtt4,attLen,'placeholderKey',selfAtt3) ;
				selfAtt3.focus(function(){
					var att2Val = selfAtt2.val() ;
					if(att2Val == ''){
						selfAtt2.val('0') ;
					}
				}) ;
				selfAtt4.focus(function(){
					var att2Val = selfAtt2.val() ;
					if(att2Val == ''){
						selfAtt2.val('0') ;
					}
					var att3Val = selfAtt3.val() ;
					if(att3Val == ''){
						selfAtt3.val('0') ;
					}
				}) ;
				selfAtt4.blur(function(){
					var att4Val = selfAtt4.val() ;
					if(att4Val == ''){
					}else if(parseInt(att4Val)>255){
						createBubble(selfAtt1,'必须输入0-255之间的数,输入数值大于255,默认为255') ;
						selfAtt4.val('255') ;
					}
					var classArr = new Array('inputAtt1','inputAtt2','inputAtt3','inputAtt4') ;
					var targetInputVal = selfAtt1.val() + '.' + selfAtt2.val() + '.' + selfAtt3.val() + '.' + selfAtt4.val() ;
					selfAtt4.parents('.EditDiv').prev('input.verInput').val(targetInputVal) ;
					documentFocus(selfAtt4,classArr,targetInputVal) ;
				}) ;
			}
		},
		verify : function(verifAttr){
			var attrVerif = this.el ;
			if(attrVerif == verifAttr){
			}else{
				this.element.attr('data-verif',verifAttr) ;
			}
			this.element.verification() ;
		},	
		/**
		* @description 修改验证规则为手机号码验证
		* @return {verification} verification对象
		* @example
		* $("#changeVer").verification('vermobile');
		*/		
		vermobile : function(){
		   this.verify("verMobile");
		},
		/**
		* @description 修改验证规则为字符串验证
		* @return {verification} verification对象
		* @example
		* $("#changeVer").verification('verstring');
		*/
		verstring : function(){
		   this.verify("verString");
		},
		/**
		* @description 修改验证规则为数字验证
		* @return {verification} verification对象
		* @example
		* $("#changeVer").verification('vernumber');
		*/
		vernumber : function(){
		   this.verify("verNumber");
		},
		/**
		* @description 修改验证规则为座机验证
		* @return {verification} verification对象
		* @example
		* $("#changeVer").verification('verphone');
		*/
		verphone : function(){
		   this.verify("verPhone");
		},
		/**
		* @description 修改验证规则为Email验证
		* @return {verification} verification对象
		* @example
		* $("#changeVer").verification('veremail');
		*/
		veremail : function(){
		   this.verify("verEmail");
		},
		/**
		* @description 修改验证规则为url验证
		* @return {verification} verification对象
		* @example
		* $("#changeVer").verification('verurl');
		*/
		verurl : function(){
		   this.verify("verUrl");
		},
		/**
		* @description 修改验证规则为IP地址验证
		* @return {verification} verification对象
		* @example
		* $("#changeVer").verification('verip');
		*/
		verip : function(){
		   this.verify("verIP");
		},
		/**
		* @description 修改验证规则为时间验证
		* @return {verification} verification对象
		* @example
		* $("#changeVer").verification('vertime');
		*/
		vertime : function(){
		   this.verify("verTime");
		},
		/**
		* @description 修改验证规则为考勤验证
		* @return {verification} verification对象
		* @example
		* $("#changeVer").verification('verattendance');
		*/
		verattendance : function(){
		   this.verify("verAttendance");
		},
		/**
		* @description 销毁验证
		* @return {verification} verification对象
		* @example
		* $("#changeVer").verification('destroy');
		*/
		destroy : function(){
			this.element.removeAttr('data-verif') ;
			if(this.element.parent('.parDiv').find('.EditDiv').length>0){
				this.element.parent('.parDiv').find('.EditDiv').remove() ;
			}
			if(this.element.parent('.parDiv').length>0){
				this.element.unwrap('.parDiv') ;
			}
		}
	});

	$.extend($.fn.verification, {
		version: "1.2"
	});

})(jQuery);

$(function(){
	$('.verInput').verification({
		//verSplit : '-'
	});
});/*
 *作    者: 高娜
 *版    本: 1.2
 *完成时间: 2012-05-14
 *描    述: geolocation
 *关联文件: jQuery.js|jquery-ui.js
 */
(function($,undefined){
    /**
	* @class 获取地理位置
    * @name geolocation
    * @description 获取地理位置
	* @version 1.2
    */
	$.widget('ui.geolocation',
	/** @lends geolocation.prototype */
	{		
		options:{
			/**  
			* @name geolocation#nosupportMsg
			* @param {String}  字符串类型
			* @description 不支持地理定位的输出信息
			* @default {String} '您当前的浏览器不支持Geolocation,请升级浏览器'
			* @example
			* $('.showGeo').geolocation({
			*		nosupportMsg : '您当前的浏览器不支持Geolocation,请升级浏览器'
			*  });
			*/
			nosupportMsg : '您当前的浏览器不支持Geolocation,请升级浏览器' ,
			/**  
			* @name geolocation#isshowLat
			* @param {Boolean}  布尔类型
			* @description 是否显示纬度
			* @default {Boolean} true
			* @example
			* $('.showGeo').geolocation({
			*		isshowLat : true
			*  });
			*/
			isshowLat : true ,
			/**  
			* @name geolocation#isshowLon
			* @param {Boolean}  布尔类型
			* @description 是否显示经度
			* @default {Boolean} true
			* @example
			* $('.showGeo').geolocation({
			*		isshowLon : true
			*  });
			*/
			isshowLon : true ,
			/**  
			* @name geolocation#isshowAcc
			* @param {Boolean}  布尔类型
			* @description 是否显示准确度
			* @default {Boolean} true
			* @example
			* $('.showGeo').geolocation({
			*		isshowAcc : true
			*  });
			*/
			isshowAcc : true ,
			/**  
			* @name geolocation#isshowAlt
			* @param {Boolean}  布尔类型
			* @description 是否显示海拔高度
			* @default {Boolean} true
			* @example
			* $('.showGeo').geolocation({
			*		isshowAlt : true
			*  });
			*/
			isshowAlt : true ,
			/**  
			* @name geolocation#isshowAla
			* @param {Boolean}  布尔类型
			* @description 是否显示海拔高度的精确度
			* @default {Boolean} true
			* @example
			* $('.showGeo').geolocation({
			*		isshowAla : true
			*  });
			*/
			isshowAla : true ,
			/**  
			* @name geolocation#isshowHea
			* @param {Boolean}  布尔类型
			* @description 是否显示行进方向
			* @default {Boolean} true
			* @example
			* $('.showGeo').geolocation({
			*		isshowHea : true
			*  });
			*/
			isshowHea : true ,
			/**  
			* @name geolocation#isshowSpe
			* @param {Boolean}  布尔类型
			* @description 是否显示地面速度
			* @default {Boolean} true
			* @example
			* $('.showGeo').geolocation({
			*		isshowSpe : true
			*  });
			*/
			isshowSpe : true
		},
		_create:function(){
			var $this = this.element ;
			var domCreLen = $('.posMsg').length ;
			if(domCreLen <= 0){
				var posMsg = '<div class="posMsg"></div>' ;
				$this.append(posMsg) ;
			}			
		},
		_init:function(){
			var o = this.options ;
			var self = this.element.find('.posMsg') ;
			//判断值是否存在
			function isVal(strVal){
				if((strVal != null)&&(strVal != undefined)){
					return true ;
				}
			}
			function getElem(id){
				return typeof id === 'string' ? document.getElementById(id) : id ;
			}
			
			function show_it(lat,lon,acc,alt,ala,hea,spe){
				lat = (o.isshowLat && isVal(lat)) ? lat : '' ;
				lon = (o.isshowLon && isVal(lon)) ? lon : '' ;
				acc = (o.isshowAcc && isVal(acc)) ? acc : '' ;
				alt = (o.isshowAlt && isVal(alt)) ? alt : '' ;
				ala = (o.isshowAla && isVal(ala)) ? ala : '' ;
				hea = (o.isshowHea && isVal(hea)) ? hea : '' ;				
				spe = (o.isshowSpe && isVal(spe)) ? spe : '' ;
				var str = '您当前的位置：' + lat + lon + acc + alt + ala + hea + spe ;
				var addMsg ;
				self.html(str) ;
				self.attr({
					'data-lat' : lat ,
					'data-lon' : lon ,
					'data-acc' : acc ,
					'data-alt' : alt ,
					'data-ala' : ala ,
					'data-hea' : hea ,
					'data-spe' : spe 
				}).hide() ;
				try{
				   //地图上标示
					/*var map = new BMap.Map("container"); 
					map.centerAndZoom(new BMap.Point(lon,lat),11); */
					// 创建地理编码实例 
					var myGeo = new BMap.Geocoder(); 
					// 根据坐标得到地址描述 
					myGeo.getLocation(new BMap.Point(lon,lat),function(result){  
						if(result){      
							addMsg = result.address;						
						}   
						self.attr('data-addmsg',addMsg) ;
					}); 
				}catch(e){
				}
			}
			
			if(navigator.geolocation){
				navigator.geolocation.getCurrentPosition(function(position){  
					show_it(position.coords.latitude, position.coords.longitude, position.coords.accuracy, position.coords.altitude, position.coords.altitudeAcuracy, position.coords.heading, position.coords.speed);  
				},function(err) {
					var errMsg = err.code + ' ' + err.message;
					self.html(errMsg) ;
				});
			}else{
				self.html(o.options) ;
			}
		},
		/**
		* @description 获得地理位置信息-详细地址
		* @return {geolocation} geolocation对象
		* @example
		* $("#destoryBtn").geolocation('getAddress');
		*/
		getAddress : function(){
			getAddress = $('.posMsg').attr('data-addmsg') ? $('.posMsg').attr('data-addmsg') : '无法获取地址' ;
			return getAddress ;
		},
		/**
		* @description 获得地理位置信息-纬度
		* @return {geolocation} geolocation对象
		* @example
		* $("#destoryBtn").geolocation('getX');
		*/
		getX : function(){
			getX = $('.posMsg').attr('data-lat') ;
			return getX ;
		},
		/**
		* @description 获得地理位置信息-经度
		* @return {geolocation} geolocation对象
		* @example
		* $("#destoryBtn").geolocation('getY');
		*/
		getY : function(){
			getY = $('.posMsg').attr('data-lon') ;
			return getY ;
		},
		/**
		* @description 获得地理位置信息-准确度
		* @return {geolocation} geolocation对象
		* @example
		* $("#destoryBtn").geolocation('getA');
		*/
		getA : function(){
			getA = $('.posMsg').attr('data-acc') ;
			return getA ;
		},
		/**
		* @description 获得地理位置信息-海拔高度
		* @return {geolocation} geolocation对象
		* @example
		* $("#destoryBtn").geolocation('getAcc');
		*/
		getAcc : function(){
			getAcc = $('.posMsg').attr('data-alt') ;
			return getAcc ;
		},
		/**
		* @description 获得地理位置信息-海拔高度的精确度
		* @return {geolocation} geolocation对象
		* @example
		* $("#destoryBtn").geolocation('getAla');
		*/
		getAla : function(){
			getAla = $('.posMsg').attr('data-ala') ;
			return getAla ;
		},
		/**
		* @description 获得地理位置信息-行进方向
		* @return {geolocation} geolocation对象
		* @example
		* $("#destoryBtn").geolocation('getH');
		*/
		getH : function(){
			getH = $('.posMsg').attr('data-hea') ;
			return getH ;
		},
		/**
		* @description 获得地理位置信息-地面速度
		* @return {geolocation} geolocation对象
		* @example
		* $("#destoryBtn").geolocation('getS');
		*/
		getS : function(){
			getS = $('.posMsg').attr('data-spe') ;
			return getS ;
		},
		/**
		* @description 清除地理位置信息
		* @return {geolocation} geolocation对象
		* @example
		* $("#destoryBtn").geolocation('destroy');
		*/
		destroy : function(){
			this.element.find('.posMsg').remove() ;
		}
	});

	$.extend($.fn.geolocation, {
		version: "1.2"
	});

})(jQuery);/*
 *作    者: 高娜
 *版    本: 1.2
 *完成时间: 2012-06-11
 *描    述: ajaxload
 *关联文件: jQuery.js|jquery-ui.js
 */
(function($,undefined){
    /**
	* @class 加载等待提示功能
    * @name ajaxload
    * @description 加载等待提示插件
	* @version 1.2
    */
	$.widget('ui.ajaxload',
	/** @lends ajaxload.prototype */
	{		
		options:{
			/**  
			* @name ajaxload#content
			* @param {String}  字符串类型
			* @description 提示信息文字描述
			* @default {String} ''
			* @example
			* $('.exampleObj').ajaxload({
			*		content : '加载中,请稍后......'
			*  });
			*/
			content : '加载中,请稍后......' ,
			/**  
			* @name ajaxload#gifSize
			* @param {String}  字符串类型
			* @description 加载图片类型，可选参数有大中小三种bigSize(48*48),midSize(24*24),smallSize(16*16)
			* @default {String} ''
			* @example
			* $('.exampleObj').ajaxload({
			*		gifSize : 'midSize'
			*  });
			*/
			gifSize : 'midSize' 
		},
		_create:function(){
			var o = this.options ;
			var self = this.element ;
			var ajaxMask = '<div class="ajaxMask"><div class="ajaxContent"><p class="ajaxPic '+o.gifSize+'"></p><p class="ajaxMsg">'+o.content+'</p></div></div>' ;
			var ajaxMain = '<div class="ajaxMain"></div>' ;
			var ajaxCon = '<div class="ajaxCon"></div>' ;
			var maskWid = self.width() ;
			var maskHei = self.height() ;
			var maskL = self.offset().left ;
			var maskT = self.offset().top ;
			if(self.attr('data-dom')!='true'){
				self.wrap(ajaxMain).after(ajaxMask).wrap(ajaxCon) ;
				self.attr('data-dom',true) ;
			}
			var selfPar = self.parents('.ajaxMain') ;
			var ajaxContentL = (maskWid - (selfPar.find('.ajaxMsg').width() + selfPar.find('.ajaxPic').width()))/2 ;
			var ajaxContentT = (maskHei - selfPar.find('.ajaxPic').height())/2 ;
			//设置提示信息行高
			selfPar.find('.ajaxMsg').css('line-height',selfPar.find('.ajaxPic').height() + 'px') ;
			//设置遮罩层宽高定位
			selfPar.find('.ajaxMask').css({
				height : maskHei,
				width : maskWid ,
				top : maskT ,
				left : maskL
			}) ;
			//设置加载gif图和提示信息定位
			selfPar.find('.ajaxContent').css({
				top : ajaxContentT ,
				left : ajaxContentL
			}) ;
		},
		_init:function(){
		},
		/**
		* @description 显示加载提示
		* @return {ajaxload} ajaxload对象
		* @example
		* $("#testExpObj").ajaxload('show');
		*/
		show : function(){
			this.element.parents('.ajaxMain').find('.ajaxMask').css('display','block') ;
			return this.element ;
		},
		/**
		* @description 影藏加载提示
		* @return {ajaxload} ajaxload对象
		* @example
		* $("#testExpObj").ajaxload('hide');
		*/
		hide : function(){
			this.element.parents('.ajaxMain').find('.ajaxMask').css('display','none') ;			
			return this.element ;
		},
		/**
		* @description 销毁加载提示
		* @return {ajaxload} ajaxload对象
		* @example
		* $("#testExpObj").ajaxload('destroy');
		*/
		destroy : function(){
			if(this.element.attr('data-dom') == 'true'){
				this.element.parents('.ajaxMain').find('.ajaxMask').remove() ;
				this.element.unwrap().unwrap() ;
			}
			this.element.attr('data-dom','false') ;
			return this.element ;
		}
	});

	$.extend($.fn.ajaxload, {
		version: "1.2"
	});

})(jQuery);/*
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
			var isCookie = this.element.attr('data-isCookie') ;
			if(isCookie != 'false'){
				getCookie() ;
			}
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
			
		}
	});

	$.extend($.fn.autosave, {
		version: "1.2"
	});

})(jQuery);/*
 *作    者: 高娜
 *版    本: 1.3
 *完成时间: 2012-07-02
 *描    述: colorpicker
 *关联文件: jQuery.js|jquery-ui.js
 */
(function($,undefined){
    /**
	* @class 颜色选择器
    * @name colorpicker
    * @description 颜色选择器插件
	* @version 1.3
    */
	$.widget('ui.colorpicker',
	/** @lends colorpicker.prototype */
	{		
		options:{},
		_create:function(){
			var _self = this.element ;
			var pickerDiv = '<div id="picker"></div>' ;
			var selfTop = _self.offset().top + _self.height() + 2 ;
        	var selfLeft = _self.offset().left ;
			if($('#picker').length<1){
				_self.parent().append(pickerDiv) ;
			}			
			$('#picker').css({
				'position' : "absolute" ,
				'left' : selfLeft ,
				'top' : selfTop ,
				'z-index' : 100
			}) ;
		},
		_init:function(){
			this.element.click(function(){
				$('#picker').farbtastic('#color');
				if($('#picker').css('display') == 'none'){
					$('#picker').css('display','block') ;
				}		
			}) ;
			$(document).click(function(event){
				var target = event.target ;
				var inputLen = $(target).nextAll('#picker').length ;
				var parLen = $(target).parents('#picker').length ;
				if((parLen < 1) && (inputLen < 1)){
					$('#picker').css('display','none') ;
				}
			}) ;
			
			//取色器代码
			/**
			 * Farbtastic Color Picker 1.2
			 * © 2008 Steven Wittens
			 *
			 * This program is free software; you can redistribute it and/or modify
			 * it under the terms of the GNU General Public License as published by
			 * the Free Software Foundation; either version 2 of the License, or
			 * (at your option) any later version.
			 *
			 * This program is distributed in the hope that it will be useful,
			 * but WITHOUT ANY WARRANTY; without even the implied warranty of
			 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
			 * GNU General Public License for more details.
			 *
			 * You should have received a copy of the GNU General Public License
			 * along with this program; if not, write to the Free Software
			 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
			 */
			
			jQuery.fn.farbtastic = function (callback) {
			  $.farbtastic(this, callback);
			  return this;
			};
			
			jQuery.farbtastic = function (container, callback) {
			  var container = $(container).get(0);
			  return container.farbtastic || (container.farbtastic = new jQuery._farbtastic(container, callback));
			}
			
			jQuery._farbtastic = function (container, callback) {
			  // Store farbtastic object
			  var fb = this;
			
			  // Insert markup
			  $(container).html('<div class="farbtastic"><div class="color"></div><div class="wheel"></div><div class="overlay"></div><div class="h-marker marker"></div><div class="sl-marker marker"></div></div>');
			  var e = $('.farbtastic', container);
			  fb.wheel = $('.wheel', container).get(0);
			  // Dimensions
			  fb.radius = 84;
			  fb.square = 100;
			  fb.width = 194;
			
			  // Fix background PNGs in IE6
			  if (navigator.appVersion.match(/MSIE [0-6]\./)) {
				$('*', e).each(function () {
				  if (this.currentStyle.backgroundImage != 'none') {
					var image = this.currentStyle.backgroundImage;
					image = this.currentStyle.backgroundImage.substring(5, image.length - 2);
					$(this).css({
					  'backgroundImage': 'none',
					  'filter': "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=crop, src='" + image + "')"
					});
				  }
				});
			  }
			
			  /**
			   * Link to the given element(s) or callback.
			   */
			  fb.linkTo = function (callback) {
				// Unbind previous nodes
				if (typeof fb.callback == 'object') {
				  $(fb.callback).unbind('keyup', fb.updateValue);
				}
			
				// Reset color
				fb.color = null;
			
				// Bind callback or elements
				if (typeof callback == 'function') {
				  fb.callback = callback;
				}
				else if (typeof callback == 'object' || typeof callback == 'string') {
				  fb.callback = $(callback);
				  fb.callback.bind('keyup', fb.updateValue);
				  if (fb.callback.get(0).value) {
					fb.setColor(fb.callback.get(0).value);
				  }
				}
				return this;
			  }
			  fb.updateValue = function (event) {
				if (this.value && this.value != fb.color) {
				  fb.setColor(this.value);
				}
			  }
			
			  /**
			   * Change color with HTML syntax #123456
			   */
			  fb.setColor = function (color) {
				var unpack = fb.unpack(color);
				if (fb.color != color && unpack) {
				  fb.color = color;
				  fb.rgb = unpack;
				  fb.hsl = fb.RGBToHSL(fb.rgb);
				  fb.updateDisplay();
				}
				return this;
			  }
			
			  /**
			   * Change color with HSL triplet [0..1, 0..1, 0..1]
			   */
			  fb.setHSL = function (hsl) {
				fb.hsl = hsl;
				fb.rgb = fb.HSLToRGB(hsl);
				fb.color = fb.pack(fb.rgb);
				fb.updateDisplay();
				return this;
			  }
			
			  /////////////////////////////////////////////////////
			
			  /**
			   * Retrieve the coordinates of the given event relative to the center
			   * of the widget.
			   */
			  fb.widgetCoords = function (event) {
				var x, y;
				var el = event.target || event.srcElement;
				var reference = fb.wheel;
			
				if (typeof event.offsetX != 'undefined') {
				  // Use offset coordinates and find common offsetParent
				  var pos = { x: event.offsetX, y: event.offsetY };
			
				  // Send the coordinates upwards through the offsetParent chain.
				  var e = el;
				  while (e) {
					e.mouseX = pos.x;
					e.mouseY = pos.y;
					pos.x += e.offsetLeft;
					pos.y += e.offsetTop;
					e = e.offsetParent;
				  }
			
				  // Look for the coordinates starting from the wheel widget.
				  var e = reference;
				  var offset = { x: 0, y: 0 }
				  while (e) {
					if (typeof e.mouseX != 'undefined') {
					  x = e.mouseX - offset.x;
					  y = e.mouseY - offset.y;
					  break;
					}
					offset.x += e.offsetLeft;
					offset.y += e.offsetTop;
					e = e.offsetParent;
				  }
			
				  // Reset stored coordinates
				  e = el;
				  while (e) {
					e.mouseX = undefined;
					e.mouseY = undefined;
					e = e.offsetParent;
				  }
				}
				else {
				  // Use absolute coordinates
				  var pos = fb.absolutePosition(reference);
				  x = (event.pageX || 0*(event.clientX + $('html').get(0).scrollLeft)) - pos.x;
				  y = (event.pageY || 0*(event.clientY + $('html').get(0).scrollTop)) - pos.y;
				}
				// Subtract distance to middle
				return { x: x - fb.width / 2, y: y - fb.width / 2 };
			  }
			
			  /**
			   * Mousedown handler
			   */
			  fb.mousedown = function (event) {
				// Capture mouse
				if (!document.dragging) {
				  $(document).bind('mousemove', fb.mousemove).bind('mouseup', fb.mouseup);
				  document.dragging = true;
				}
			
				// Check which area is being dragged
				var pos = fb.widgetCoords(event);
				fb.circleDrag = Math.max(Math.abs(pos.x), Math.abs(pos.y)) * 2 > fb.square;
			
				// Process
				fb.mousemove(event);
				return false;
			  }
			
			  /**
			   * Mousemove handler
			   */
			  fb.mousemove = function (event) {
				// Get coordinates relative to color picker center
				var pos = fb.widgetCoords(event);
			
				// Set new HSL parameters
				if (fb.circleDrag) {
				  var hue = Math.atan2(pos.x, -pos.y) / 6.28;
				  if (hue < 0) hue += 1;
				  fb.setHSL([hue, fb.hsl[1], fb.hsl[2]]);
				}
				else {
				  var sat = Math.max(0, Math.min(1, -(pos.x / fb.square) + .5));
				  var lum = Math.max(0, Math.min(1, -(pos.y / fb.square) + .5));
				  fb.setHSL([fb.hsl[0], sat, lum]);
				}
				return false;
			  }
			
			  /**
			   * Mouseup handler
			   */
			  fb.mouseup = function () {
				// Uncapture mouse
				$(document).unbind('mousemove', fb.mousemove);
				$(document).unbind('mouseup', fb.mouseup);
				document.dragging = false;
			  }
			
			  /**
			   * Update the markers and styles
			   */
			  fb.updateDisplay = function () {
				// Markers
				var angle = fb.hsl[0] * 6.28;
				$('.h-marker', e).css({
				  left: Math.round(Math.sin(angle) * fb.radius + fb.width / 2) + 'px',
				  top: Math.round(-Math.cos(angle) * fb.radius + fb.width / 2) + 'px'
				});
			
				$('.sl-marker', e).css({
				  left: Math.round(fb.square * (.5 - fb.hsl[1]) + fb.width / 2) + 'px',
				  top: Math.round(fb.square * (.5 - fb.hsl[2]) + fb.width / 2) + 'px'
				});
			
				// Saturation/Luminance gradient
				$('.color', e).css('backgroundColor', fb.pack(fb.HSLToRGB([fb.hsl[0], 1, 0.5])));
			
				// Linked elements or callback
				if (typeof fb.callback == 'object') {
				  // Set background/foreground color
				  $(fb.callback).css({
					backgroundColor: fb.color,
					color: fb.hsl[2] > 0.5 ? '#000' : '#fff'
				  });
			
				  // Change linked value
				  $(fb.callback).each(function() {
					if (this.value && this.value != fb.color) {
					  this.value = fb.color;
					}
				  });
				}
				else if (typeof fb.callback == 'function') {
				  fb.callback.call(fb, fb.color);
				}
			  }
			
			  /**
			   * Get absolute position of element
			   */
			  fb.absolutePosition = function (el) {
				var r = { x: el.offsetLeft, y: el.offsetTop };
				// Resolve relative to offsetParent
				if (el.offsetParent) {
				  var tmp = fb.absolutePosition(el.offsetParent);
				  r.x += tmp.x;
				  r.y += tmp.y;
				}
				return r;
			  };
			
			  /* Various color utility functions */
			  fb.pack = function (rgb) {
				var r = Math.round(rgb[0] * 255);
				var g = Math.round(rgb[1] * 255);
				var b = Math.round(rgb[2] * 255);
				return '#' + (r < 16 ? '0' : '') + r.toString(16) +
					   (g < 16 ? '0' : '') + g.toString(16) +
					   (b < 16 ? '0' : '') + b.toString(16);
			  }
			
			  fb.unpack = function (color) {
				if (color.length == 7) {
				  return [parseInt('0x' + color.substring(1, 3)) / 255,
					parseInt('0x' + color.substring(3, 5)) / 255,
					parseInt('0x' + color.substring(5, 7)) / 255];
				}
				else if (color.length == 4) {
				  return [parseInt('0x' + color.substring(1, 2)) / 15,
					parseInt('0x' + color.substring(2, 3)) / 15,
					parseInt('0x' + color.substring(3, 4)) / 15];
				}
			  }
			
			  fb.HSLToRGB = function (hsl) {
				var m1, m2, r, g, b;
				var h = hsl[0], s = hsl[1], l = hsl[2];
				m2 = (l <= 0.5) ? l * (s + 1) : l + s - l*s;
				m1 = l * 2 - m2;
				return [this.hueToRGB(m1, m2, h+0.33333),
					this.hueToRGB(m1, m2, h),
					this.hueToRGB(m1, m2, h-0.33333)];
			  }
			
			  fb.hueToRGB = function (m1, m2, h) {
				h = (h < 0) ? h + 1 : ((h > 1) ? h - 1 : h);
				if (h * 6 < 1) return m1 + (m2 - m1) * h * 6;
				if (h * 2 < 1) return m2;
				if (h * 3 < 2) return m1 + (m2 - m1) * (0.66666 - h) * 6;
				return m1;
			  }
			
			  fb.RGBToHSL = function (rgb) {
				var min, max, delta, h, s, l;
				var r = rgb[0], g = rgb[1], b = rgb[2];
				min = Math.min(r, Math.min(g, b));
				max = Math.max(r, Math.max(g, b));
				delta = max - min;
				l = (min + max) / 2;
				s = 0;
				if (l > 0 && l < 1) {
				  s = delta / (l < 0.5 ? (2 * l) : (2 - 2 * l));
				}
				h = 0;
				if (delta > 0) {
				  if (max == r && max != g) h += (g - b) / delta;
				  if (max == g && max != b) h += (2 + (b - r) / delta);
				  if (max == b && max != r) h += (4 + (r - g) / delta);
				  h /= 6;
				}
				return [h, s, l];
			  }
			
			  // Install mousedown handler (the others are set on the document on-demand)
			  $('*', e).mousedown(fb.mousedown);
			
				// Init color
			  fb.setColor('#000000');
			
			  // Set linked elements/callback
			  if (callback) {
				fb.linkTo(callback);
			  }
			}
		},
		/**
		* @description 获取颜色值
		* @return {colorpicker} colorpicker对象
		* @example
		* $("#testExpObj").colorpicker('getVal');
		*/
		getVal : function(){
			getVal = this.element.val() ;
			return getVal ;
		},
		/**
		* @description 销毁取色控件
		* @return {colorpicker} colorpicker对象
		* @example
		* $("#testExpObj").colorpicker('destroy');
		*/
		destroy : function(){
			$('#picker').remove() ;
		}
	});

	$.extend($.fn.colorpicker, {
		version: "1.3"
	});

})(jQuery);/*
 *作    者: 高娜
 *版    本: 1.3
 *完成时间: 2012-07-05
 *描    述: ratystar
 *关联文件: jQuery.js|jquery-ui.js
 */
(function($,undefined){
    /**
	* @class 星级评定
    * @name ratystar
    * @description 星级评定插件
	* @version 1.3
    */
	$.widget('ui.ratystar',
	/** @lends ratystar.prototype */
	{		
		options:{
			/**  
			* @name ratystar#total
			* @param {Number}  数字类型
			* @description 显示最多星星个数
			* @default {Number} 5
			* @example
			* $('.exampleObj').ratystar({
			*		total : 5
			*  });
			*/
			total : 5 ,
			/**  
			* @name ratystar#value
			* @param {Number}  数字类型
			* @description 每个星星表示的分值
			* @default {Number} 1
			* @example
			* $('.exampleObj').ratystar({
			*		value : 1
			*  });
			*/
			value : 1 ,
			/**  
			* @name ratystar#stardefault
			* @param {Number}  数字类型
			* @description 默认显示星级,这个需要和每个星星表示的分值相除，所以建议设置值和每个星星分值成整数倍。
			* @default {Number} 2
			* @example
			* $('.exampleObj').ratystar({
			*		stardefault : 2
			*  });
			*/
			stardefault : 2 ,
			/**  
			* @name ratystar#disable
			* @param {Boolean}  布尔类型
			* @description 是否禁用手动设置星级
			* @default {Boolean} false
			* @example
			* $('.exampleObj').ratystar({
			*		disable : false
			*  });
			*/
			disable : false
		},
		_create:function(){
			var _self = this.element ;
			var o = this.options ;
			var starul = '' ;
			var starli = '' ;
			for(var i=0 ; i<o.total ; i++){
				starli += '<li></li>' ;
			}
			starul = '<ul class="ratystar-starul" data-disable = '+ o.disable + '>' + starli + '</ul><div class="ratystar-clear"></div>' ;
			_self.append(starul) ;
		},
		_init:function(){
			var _self = this.element ;
			var o = this.options ;
			var tarLi = _self.find('.ratystar-starul li') ;
			var tarUl = _self.find('.ratystar-starul') ;
			var sourceLi = Math.round((o.stardefault - 1) / o.value) ;
			setStarL(sourceLi) ;
			tarLi.click(function(){
				if(tarUl.attr('data-disable') == 'false'){
					var index = $(this).index() ;
					tarLi.css('cursor','pointer') ;
					setStarL(index) ;
					setStarD(index) ;
					sourceLi = index ;
				}else{
					tarLi.css('cursor','default') ;
				}
			}) ;
			
			tarLi.hover(function(){
				if(tarUl.attr('data-disable') == 'false'){
					var index = $(this).index() ;
					tarLi.css('cursor','pointer') ;
					setStarL(index) ;
					setStarD(index) ;
				}else{
					tarLi.css('cursor','default') ;
				}
			},function(){
				if(tarUl.attr('data-disable') == 'false'){
					tarLi.css('cursor','pointer') ;
					setStarL(sourceLi) ;
					setStarD(sourceLi) ;
				}else{
					tarLi.css('cursor','default') ;
				}
			}) ;
			
			//点亮星星
			function setStarL(index){			
				for(var i=0 ; i<=index; i++){
					if(!tarLi.eq(i).hasClass('ratystar-starli-active')){
						tarLi.eq(i).addClass('ratystar-starli-active') ;
					}
				}
				tarUl.attr('data-starval',(index+1)*o.value) ;
			}
			
			//点灰星星
			function setStarD(index){
				for(var i = index + 1 ; i<o.total ; i++){
					if(tarLi.eq(i).hasClass('ratystar-starli-active')){
						tarLi.eq(i).removeClass('ratystar-starli-active') ;
					}
				}
				tarUl.attr('data-starval',(index+1)*o.value) ;
			}
		},
		/**
		* @description 禁用设置星级
		* @return {ratystar} ratystar对象
		* @example
		* $("#testExpObj").ratystar('disable');
		*/
		disable : function(){
			this.element.find('.ratystar-starul').attr('data-disable','true') ;
		},
		/**
		* @description 启用设置星级
		* @return {ratystar} ratystar对象
		* @example
		* $("#testExpObj").ratystar('enable');
		*/
		enable : function(){
			this.element.find('.ratystar-starul').attr('data-disable','false') ;
		},
		/**
		* @description 获取星级评定结果
		* @return {ratystar} ratystar对象
		* @example
		* $("#testExpObj").ratystar('getStar');
		*/
		getStar : function(){
			getStar = this.element.find('.ratystar-starul').attr('data-starval') ;
			return getStar ;
		},
		/**
		* @description 清除星级评定
		* @return {ratystar} ratystar对象
		* @example
		* $("#testExpObj").ratystar('destroy');
		*/
		destroy : function(){
		}
	});

	$.extend($.fn.ratystar, {
		version: "1.3"
	});

})(jQuery);/*
 *作    者: 高娜
 *版    本: 1.3
 *完成时间: 2012-07-09
 *描    述: uploadannex
 *关联文件: jQuery.js|jquery-ui.js
 */
(function($,undefined){
    /**
	* @class 上传附件
    * @name uploadannex
    * @description 上传附件插件
	* @version 1.3
    */
	$.widget('ui.uploadannex',
	/** @lends uploadannex.prototype */
	{		
		options:{
			/**  
			* @name uploadannex#height
			* @param {Number}  数字类型
			* @description 上传文件列表区域高度
			* @default {Number} 180
			* @example
			* $('.exampleObj').uploadannex({
			*		height : 180
			*  });
			*/
			height : 180 ,
			/**  
			* @name uploadannex#able
			* @param {Array}  数组类型
			* @description 可上传文件格式(如果设置有值表示除设置的几种文件格式其他在备选数组中的文件格式均不可上传)
			* @default {Array} []
			* @example
			* $('.exampleObj').uploadannex({
			*		able : []
			*  });
			*/
			able : ['jpg','gif','png','jpeg','doc','docx','xls','xlsx','txt','html','rar','zip','asp','ppt','pptx','avi','exe','swf','fla','js','xml','htm','jsp','mp3','mp4','css'],
			/**  
			* @name uploadannex#disable
			* @param {Array}  数组类型
			* @description 不可上传文件格式(如果设置有值表示除设置的几种文件格式其他在备选数组中的文件格式均可上传)
			* @default {Array} []
			* @example
			* $('.exampleObj').uploadannex({
			*		disable : []
			*  });
			*/
			disable : [],
			/**  
			* @name uploadannex#contain
			* @param {Array}  数组类型
			* @description 备选的文件格式
			* @default {Array} [jpg,gif,png,doc,docx,xlsx,xls,txt,html,rar,zip,asp,ppt,pptx,avi]
			* @example
			* $('.exampleObj').uploadannex({
			*		contain :['jpg','gif','png','jpeg','doc','docx','xls','xlsx','txt','html','rar','zip','asp']
			*  });
			*/
			contain : [] ,
			 /**  
			* @name uploadannex#fnFile 
			* @param {Fn} 函数 
			* @description 通过浏览按钮上传自定义方法
			* @default {Fn} function(){}
			* @example
			* $('.exampleObj').uploadannex({
			*		fnFile: function(){alert("fnFile")}
			*    });
			*/
 			 fnFile : function(){} ,
			 /**  
			* @name uploadannex#fn  
			* @param {Fn} 函数 
			* @description 自定义方法
			* @default {Fn} function(){}
			* @example
			* $('.exampleObj').uploadannex({
			*		fn: function(){alert("fn")}
			*    });
			*/
 			 fn : function(){} ,
			 /**  
			* @name uploadannex#fnDel
			* @param {Fn} 函数 
			* @description 删除附件自定义方法
			* @default {Fn} function(){}
			* @example
			* $('.exampleObj').uploadannex({
			*		fnDel: function(){alert("fn")}
			*    });
			*/
 			 fnDel : function(){} ,
			 /**  
			* @name uploadannex#dragEnterDiv  
			* @param {Fn} 函数 
			* @description dragenter时操作
			* @default {Fn} function(){}
			* @example
			* $('.exampleObj').uploadannex({
			*		dragEnterDiv: function(){alert("dragenter")}
			*    });
			*/
 			 dragEnterDiv : function(){},
			/**  
			* @name uploadannex#dragOverDiv  
			* @param {Fn} 函数 
			* @description dragover时操作
			* @default {Fn} function(){}
			* @example
			* $('.exampleObj').uploadannex({
			*		dragOverDiv: function(){alert("dragover")}
			*    });
			*/
 			 dragOverDiv : function(){},
			/**  
			* @name uploadannex#dragDropDiv  
			* @param {Fn} 函数 
			* @description drop时操作
			* @default {Fn} function(){}
			* @example
			* $('.exampleObj').uploadannex({
			*		dragDropDiv: function(){alert("dragdrop")}
			*    });
			*/
 			 dragDropDiv : function(){},
			/**  
			* @name uploadannex#dragLeaveDiv  
			* @param {Fn} 函数 
			* @description dragleave时操作
			* @default {Fn} function(){}
			* @example
			* $('.exampleObj').uploadannex({
			*		dragLeaveDiv: function(){alert("dragleave")}
			*    });
			*/
 			dragLeaveDiv : function(){}
		},
		_create:function(){
			var _self = this.element ;
			var o = this.options ;
			var uploadContent = '' ;
			if(window.FileReader && !$.browser.opera){
				uploadContent = '浏览并选择文件，或者将文件拖放到该区域来上传文件。' ;
			}else{
				uploadContent = '浏览并选择文件。' ;
			}
			_self.prevAll('.upload-content').html(uploadContent) ;
			_self.height(o.height) ;
		},
		_init:function(){
			var _self = this.element ;
			var o = this.options ;
			var errorContent = '<p class="upload-files-errorCon"><p>' ;
			_self.after(errorContent) ;
			//通过浏览方式上传
			$('.upload-input input').change(function(){
				var fAllname = $(this).val() ;
				showFiles(fAllname) ;
				o.fn() ;
				o.fnFile() ;
			}) ;
			
			//通过拖拽方式上传
			if(window.FileReader){
				_self[0].addEventListener('dragenter', handleDragEnter, false);
				_self[0].addEventListener('dragover', handleDragOver, false);
				_self[0].addEventListener('drop', handleFileSelect, false);
				_self[0].addEventListener('dragleave', handleDragLeave, false);	
			}
			
			//处理拖放文件列表
			function handleFileSelect(evt) {
				evt.stopPropagation(); //阻止默认的打开事件
				evt.preventDefault();
				displayList(evt) ;
				o.fn() ;
				o.dragDropDiv() ;
			}
			
			// 处理插入拖出效果
			function handleDragEnter(evt){ 
				evt.stopPropagation();
				evt.preventDefault();
				o.dragEnterDiv() ;
			}
			function handleDragLeave(evt){
				o.dragLeaveDiv() ;
			}
	
			// 处理文件拖入事件，防止浏览器默认事件带来的重定向
			function handleDragOver(evt){
				evt.stopPropagation();
				evt.preventDefault();
				o.dragOverDiv() ;
			}
			
			//拖拽形式展示
			function displayList(evt){
				var files = evt.dataTransfer.files;//一个file类型的数组，就是你拖拽进来的文件
				for(var i=0,f; f=files[i]; i++){
					var pos = f.name.lastIndexOf('.') ;
					var fileFormat = f.name.substring(pos+1,f.name.length) ;
					var i = $('.upload-files-list').length ;
					var uid = 'uploadID' + i ;
					if(isuploadfileType(fileFormat)&&(!ishasupload(f.name))){
						reader = new FileReader() ;
						var uploadfiles = '<div class="upload-files-list" id="'+uid+'"><p class="upload-files-name"><a href="#">'+f.name+'</a></p><p class="upload-files-msg"><span class="upload-files-progress-num">5%</span><a href="#" class="upload-files-del"></a></p><p class="upload-files-progress"></p></div>' ;
						reader.readAsDataURL(f);//直接将图片的内容以FileReader的readAsDataURL方法读取入并显示
						_self.append(uploadfiles) ;
					}else if(ishasupload(f.name)){
						var errormsg = f.name +'已上传，请重新选择' ;
						_self.nextAll('.upload-files-errorCon').html(errormsg) ;
					}else{
						var errormsg = '您上传的'+fileFormat+'不是合法的格式，请重新选择' ;
						_self.nextAll('.upload-files-errorCon').html(errormsg) ;
					}
				}
			}
			
			//显示上传文件
			function showFiles(fAllname){
				var pos = fAllname.lastIndexOf('.') ;
				fformat = fAllname.substring(pos+1,fAllname.length) ;
				var posName = fAllname.lastIndexOf('\\') ;
				fname = fAllname.substring(posName+1,fAllname.length) ;
				var i = $('.upload-files-list').length ;
				if(isuploadfileType(fformat)&&(!ishasupload(fname))){
					var uploadfiles = '<div class="upload-files-list"><p class="upload-files-name"><a href="#">'+fname+'</a></p><p class="upload-files-msg"><span class="upload-files-progress-num">5%</span><a href="#" class="upload-files-del"></a></p><p class="upload-files-progress"></p></div>' ;
					_self.append(uploadfiles) ;
				}else if(ishasupload(fAllname)){
					var errormsg = f.name +'已上传，请重新选择' ;
					_self.nextAll('.upload-files-errorCon').html(errormsg) ;
				}else{
					var errormsg = '您上传的'+fformat+'不是合法的格式，请重新选择' ;
					_self.nextAll('.upload-files-errorCon').html(errormsg) ;
				}
			}
			
			//删除附件
			$('.upload-files-del').live('click',function(){
				$(this).parents('.upload-files').attr('data-id',$(this).parents('.upload-files-list').attr('id')) ;
				$(this).parents('.upload-files-list').remove() ;
				o.fnDel() ;
			}) ;
			
			//判断是否已上传文件
			function ishasupload(name){
				var isuploadfile = _self.find('.upload-files-name').find('a') ;
				var len = isuploadfile.length ;
				for(var i = 0; i<len ; i++){
					if(name == isuploadfile.eq(i).html()){
						return true ;
					}
				}
			}
			
			//判断是否可上传的文件格式
			function isuploadfileType(uploadType){
				var ableLen = o.able.length ;
				    disableLen = o.disable.length
				if((ableLen == 0)&&(disableLen == 0)){
					return isInArr(uploadType,o.contain) ;
				}else if((ableLen>0)&&(disableLen==0)){
					return isInArr(uploadType,o.able) ;
				}else if((ableLen==0)&&(disableLen>0)){
					return !(isInArr(uploadType,o.disable)) ;
				}else{
					console.log('仅需要设置只允许上传的或不允许上传的文件格式');
				}
			}
			
			//判断是否在数组中
			function isInArr(uploadfile,filesArr){
				for(var i=0; i<filesArr.length;i++){
					if(uploadfile == filesArr[i]){
						return true ;
					}
				}
			}
		},
		/**
		* @description 清除上传附件
		* @return {ratystar} uploadannex对象
		* @example
		* $("#testExpObj").uploadannex('destroy');
		*/
		destroy : function(){
		}
	});

	$.extend($.fn.uploadannex, {
		version: "1.3"
	});

})(jQuery);
//设置进度值
function setProgress(id,value,isError){ //isError是一个布尔值，上传是否出错。
	var id = '#' + id ;
	var progress = $(id).find('.upload-files-progress') ;
	var progressNum = $(id).find('.upload-files-progress-num') ;
	var valueStr = value + '%' ;
	var hasdoing = progress.hasClass('upload-files-progress-doing') ;
	var hassuccess = progress.hasClass('upload-files-progress-success') ;
	var haserror = progress.hasClass('upload-files-progress-error') ;
	if(isError){
		if(!haserror){
			progressNum.addClass('.upload-files-num-error').html('续传') ;
			progress.addClass('upload-files-progress-error').width(valueStr) ;
		}
		if(hasdoing){
			progress.removeClass('upload-files-progress-doing') ;
		}
		if(hassuccess){
			progressNum.removeClass('upload-files-num-success') ;
			progress.removeClass('upload-files-progress-success') ;
		}
	}else if(parseInt(value) == 100){
		if(!hassuccess){
			progressNum.addClass('.upload-files-num-success').html('完成') ;
			progress.addClass('upload-files-progress-success').width(valueStr) ;
		}
		if(hasdoing){
			progress.removeClass('upload-files-progress-doing') ;
		}
		if(haserror){
			progressNum.removeClass('upload-files-num-error') ;
			progress.removeClass('upload-files-progress-error') ;
		}
	}else{
		if(!hasdoing){
			progressNum.html(valueStr) ;
			progress.addClass('upload-files-progress-doing').width(valueStr) ;
		}
		if(hassuccess){
			progressNum.removeClass('upload-files-num-success') ;
			progress.removeClass('upload-files-progress-success') ;
		}
		if(haserror){
			progressNum.removeClass('upload-files-num-error') ;
			progress.removeClass('upload-files-progress-error') ;
		}
	}
}/*
 *作    者: 高娜
 *版    本: 1.3
 *完成时间: 2012-07-11
 *描    述: inputblock
 *关联文件: jQuery.js|jquery-ui.js
 */
(function($,undefined){
    /**
	* @class 输入块控件
    * @name inputblock
    * @description 输入块插件
	* @version 1.3
    */
	$.widget('ui.inputblock',
	/** @lends inputblock.prototype */
	{		
		options:{
			/**  
			* @name inputblock#width
			* @param {Number}  数字类型
			* @description 包裹展示区域的宽度
			* @default {Number} 400
			* @example
			* $('.exampleObj').inputblock({
			*		width : 400
			*  });
			*/
			width : 400 ,
			/**  
			* @name inputblock#content
			* @param {String}  字符串类型
			* @description 选择区域提示信息
			* @default {String} 'add a person'
			* @example
			* $('.exampleObj').inputblock({
			*		content : 'add person'
			*  });
			*/
			content : 'add person' ,
			/**  
			* @name inputblock#list
			* @param {Array}  数组类型
			* @description 显示的列表
			* @default {Array} []
			* @example
			* $('.exampleObj').inputblock({
			*		list : []
			*  });
			*/
			list : [] ,
			/**  
			* @name inputblock#fn  
			* @param {Fn} 函数 
			* @description 预留自定义方法
			* @default {Fn} function(){}
			* @example
			* $('.exampleObj').uploadannex({
			*		fn : function(){}
			*    });
			*/
 			 fn : function(){} ,
			 /**  
			* @name inputblock#fnClick 
			* @param {Fn} 函数 
			* @description 点击事件预留方法,需要传递一个返回值，数组类型。
			* @default {Fn} function(){}
			* @example
			* $('.exampleObj').uploadannex({
			*		fnClick : function(){return ['张三','六六']  ;}
			*    });
			*/
 			 fnClick : function(){} ,
			 /**  
			* @name inputblock#fnDel  
			* @param {Fn} 函数 
			* @description 删除事件预留方法
			* @default {Fn} function(){}
			* @example
			* $('.exampleObj').uploadannex({
			*		fnDel : function(){}
			*    });
			*/
 			 fnDel : function(){} 
		},
		_create:function(){
			var _self = this.element ;
			var o = this.options ;
			var listLen = o.list.length ;
			var inputblockWrap = '<div class="inputblock-wrap"></div>' ;
			var inputWrap = '<div class="inputblock-add"></div>' ;
			var inputblockClear = '<div class="inputblock-clear"></div>' ;
			var inputblockElem = '' ;
			for(var i=0; i<listLen; i++){
				inputblockElem += '<p class="inputblock-elem"><span>'+o.list[i]+'</span><a href="#" title="delete" class="inputblock-del"></a></p>'
			}
			_self.val(o.content).attr({'readonly':true,'unselectable':'on'}).wrap(inputblockWrap).wrap(inputWrap).parents('.inputblock-add').before(inputblockElem).after(inputblockClear) ;
			_self.parents('.inputblock-wrap').width(o.width) ;
		},
		_init:function(){
			var _self = this.element ;
			var o = this.options ;
			var _tarObj = _self.parents('div.inputblock-wrap') ;
			for(var i=0; i<_tarObj.length ; i++){
				_tarObj.eq(i).click(function(e){
					var _this = $(this) ;
					var target = e.target ;
					if(!$(target).hasClass('inputblock-del')){
						var newElem = o.fnClick() ;
						var inputNewElem = '' ;
						for(var i=0; i<newElem.length; i++){
							inputNewElem += '<p class="inputblock-elem"><span>'+newElem[i]+'</span><a href="#" title="delete" class="inputblock-del"></a></p>'
						}
						_this.find('div.inputblock-add').before(inputNewElem) ;
					}
				}) ;
			}
			$('.inputblock-del').live('click',function(){
				$(this).parents('.inputblock-elem').remove() ;
				o.fnDel() ;
			}) ;
		},
		/**
		* @description 注入输入块,需要传入参数，参数为数组形式。
		* @return {inputblock} inputblock对象
		* @example
		* $("#testExpObj").inputblock('setVal',['黄黄','张张','菲菲']);
		*/
		setVal : function(newElem){
			this.element.parents('.inputblock-wrap').find('.inputblock-elem').remove() ;
			var len = newElem.length ;
			var inputblockElem = '' ;
			for(var i=0; i<len; i++){
				inputblockElem += '<p class="inputblock-elem"><span>'+newElem[i]+'</span><a href="#" title="delete" class="inputblock-del"></a></p>'
			}
			this.element.parents('.inputblock-add').before(inputblockElem) ;
		},
		/**
		* @description 获得输入块
		* @return {inputblock} inputblock对象
		* @example
		* $("#testExpObj").inputblock('getVal');
		*/
		getVal : function(){
			console.log('fdasfa') ;
			var spanElem = this.element.parents('.inputblock-wrap').find('.inputblock-elem span') ;
			var len = spanElem.length ;
			getAry = [] ;
			for(var i=0; i<len; i++){
				getAry[i] = spanElem.eq(i).html() ;
			}
			return getAry ;
		},
		/**
		* @description 清楚输入块控件
		* @return {inputblock} inputblock对象
		* @example
		* $("#testExpObj").inputblock('destroy');
		*/
		destroy : function(){
			if(this.element.parents('.inputblock-wrap').length > 0){
				 this.element.parents('.inputblock-wrap').find('.inputblock-elem').remove() ;
				 this.element.parents('.inputblock-wrap').find('.inputblock-clear').remove() ;
				 this.element.unwrap().unwrap().removeAttr('readonly') ;
			}
		}
	});

	$.extend($.fn.inputblock, {
		version: "1.3"
	});

})(jQuery);/*
 *
 * Slides, A Slideshow Plugin for jQuery
 * Intructions: http://slidesjs.com
 * By: Nathan Searles, http://nathansearles.com
 * Version: 1.1.9
 * Updated: September 5th, 2011
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(function($) {
  /**
   * @class 图片轮播展示
   * @name slide
   * @description 图片轮播展示插件
   * @version 1.1
   */
  $.fn.slide = function(option) {
    //默认配置
    var defaults = {
      /**
       * @name slide#maxNum
       * @param {Number} maxNum
       * @description 最多允许展示图片数目
       * @default {Number} 6
       * @example
       *
       */
      maxNum: 6,
      //最多允许6张图片
      /**
       * @name slide#width
       * @param {Number} width
       * @description 控件的宽
       * @default {Number} 438
       * @example
       *
       */
      width: undefined,
      /**
       * @name slide#height
       * @param {Number} height
       * @description 控件的高
       * @default {Number} 350
       * @example
       *
       */
      height: undefined,
      /**
       * @name slide#container
       * @param {String} container
       * @description 控件容器class值
       * @default {String} 'slide-container'
       * @example
       *
       */
      container: 'slide-container',
      /**
       * @name slide#hoverPause
       * @param {Boolean} hoverPause
       * @description 鼠标移入时是否停止周期轮播事件 true 表示 停止
       * @default {Boolean} false
       * @example
       *
       */
      hoverPause: false,
      //    preload: false, //  布尔型;控制预加载slideshow下的img的图片；
      //    preloadImage: '/img/loading.gif', // 字符串;设定预加载时的加载中标识...(默认值:/img/loading.gif)
      /**
       * @name slide#height
       * @param {Boolean} pagination
       * @description 手动选择显示的幻灯图片开关
       * @default {Boolean} true
       * @example
       *
       */
      pagination: true,
      /**
       * @deprecated
       * @name slide#paginationType
       * @param {String} paginationType
       * @description 手动触发方式;注意!暂时不提供配置
       * @default {String} 'click'
       * @example
       *
       */
      paginationType: 'click',
      /**
       * @name slide#paginationClass
       * @param {String} paginationClass
       * @description 手动选择入口的容器节点class值
       * @default {String} 'pagination'
       * @example
       *
       */
      paginationClass: 'pagination',
      // 设置pagination导航的位置 优先于样式类 .pagination-pos
      // 格式
      // {
      //   right: 25,
      //   bottom: 5
      // }
      paginationPos: null,
      // 是否显示pagination导航的文字 true表示 不显示 false 表示 显示
      paginationTextHidden: true,
      /**
       * @name slide#currentClass
       * @param {String} currentClass
       * @description 当前显示动画节点的class值
       * @default {String} 'current'
       * @example
       *
       */
      currentClass: 'current',
      /**
       * @name slide#duration
       * @param {Number} duration
       * @description 过渡动画持续时间
       * @default {Number} 600
       * @example
       *
       */
      duration: 600,
      /**
       * @name slide#start
       * @param {Number} start
       * @description 默认显示的图片序号
       * @default {Number} 1
       * @example
       *
       */
      index: 1,
      /**
       * @name slide#effect
       * @param {String} effect
       * @description 动画效果;1,fade,淡入淡出;2,slide:h 水平;v 垂直;可选值: "h"; "v"; "slide";
       * @default {String} 'h'
       * @example
       *
       */
      effect: 'h',
      /**
       * @name slide#shutterDir
       * @param {String} shutterDir
       * @description effect参数值为shutter时使用 可选值 h w
       * @default {String} 'h'
       * @example
       *
       */
      shutterDir: "h",
      /**
       * @name slide#shutterNum
       * @param {Number} shutterNum
       * @description 生成的百叶窗的数目
       * @default {Number} 3
       * @example
       *
       */
      shutterNum: 3,
      /**
       * @name slide#dataAttributeName
       * @param {String} dataAttributeName
       * @description 用来存储响应数据的参数
       * @default {String} 3000
       * @example
       *
       */
      dataAttributeName: "data-slideParamName",
      /**
       * @name slide#eventParams
       * @param {Array} eventParams
       * @description 构建时收集的每帧图片响应时预存的参数
       * @default {Array} []
       * @example
       *
       */
      eventParams: [],
      /**
       * @name slide#eventHandler
       * @param {Function} eventHandler
       * @description 构建时收集的每帧图片响应时响应实现
       * @default {Function} null 触发a标签上的默认调整动作
       * @example
       *
       */
      eventHandler: null,
      /**
       * @name slide#play
       * @param {Number} play
       * @description 自动播放周期(设定为大于0的数字将开启自动播放)
       * @default {Number} 3000
       * @example
       *
       */
      play: 2000,
      /**
       * @name slide#pause
       * @param {Number} pause
       * @description 控制手动播放时停止播放. 定为大于0的数字将开启停止播放功能,数值为停止的间隙
       * @default {Number} 1000
       * @example
       *
       */
      pause: 1000,
      //      hoverPause:false, // 布尔型 设置成ture 鼠标悬浮时会暂停动画
      //      bigTarget:false, // 布尔型 设置成true后点击一张图片将链接到下一张图片 注意img父节点a标签的点击事件
      /**
       * @name slide#animationStart
       * @param {fn} animationStart
       * @description 动画执行开始前调用的方法
       * @default {fn} function() {}
       * @example
       *
       */
      animationStart: function() {},
      /**
       * @name slide#animationComplete
       * @param {fn} animationComplete
       * @description 动画执行完毕后的回调方法
       * @default {fn} function() {}
       * @example
       *
       */
      animationComplete: function() {},
      /**
       * @name slide#animationComplete
       * @param {fn} animationComplete
       * @description 当幻灯片都加载好后调用的方法
       * @default {fn} function() {}
       * @example
       *
       */
      slideLoaded: function() {}
    };
    //加载默认配置和用户自定义配置
    option = $.extend({}, defaults, option || {});
    //淡入淡出 推入推出
    function _slide() {
      var $elem = $(this);
      var $container = $elem.find('.' + option.container);
      //将控件容器下的的幻灯片节点使用div.slide-control包裹
      //在html结构中限定
      //$slides.wrapAll(/*$control*/$('<div class="slide-control"/>'));
      var $control = $container.find(">div.slide-controller");
      var $slides = $control.children();
      var $imgs = $slides.find("img");

      //收集每帧图片对应的数据
      $.each($slides, function(index, item) {
        option.eventParams[index] = $(item).attr(option.dataAttributeName);
      });
      //绑定数据交互事件
      if (option.eventHandler && Object.prototype.toString.call(option.eventHandler) === '[object Function]') {
        $control.delegate("img", "click", function(event) {
          option.eventHandler(option.eventParams[current]);
          return false;
        });
      }
      //幻灯片数目
      var total = $slides.size();
      //如果获取准确的宽高
      //1.显式配置;2.在img上设置width,height属性;3,通过脚本判断获取(TODO:未完成)
      var width = option.width || $imgs.width() /*$slides.outerWidth()在某些情形下获取值不准确*/
      ;
      var height = option.height || $imgs.height() /*$slides.outerHeight()*/
      ;
      var start = option.index - 1;
      var next = 0;
      var prev = 0;
      var current = 0; //重置默认配置为0
      var loaded; //资源就绪
      var active; //锁,值为false值时才能开启一次动画
      var clicked; //手动选择的图片
      var position;
      var effect = option.effect;
      var direction; //正(左、上)、负向
      //            var imageParent;//预加载时使用
      var duration = option.duration;
      // 点击事件列表
      // 处理快速点击时动画叠加, 在动画过渡时期的白底问题
      var paginationListener = [];
      // if(duration < 2000) {
      //   duration = 2000;
      // }
      var pauseTimeout;
      var playInterval;
      if(total > option.maxNum) {
        alert("最多允许" + option.maxNum + "张图片!");
        return;
      }
      if((!option.width || !option.height) && (!$slides.find("img").attr("width") || !$slides.find("img").attr("height"))) {
        alert("控件宽高调用错误!");
        return;
      }
      //设定图片的宽、高;在自定义控件宽高时使用
      //此时不使用等比缩放、简单的将容器的宽、高赋值
      if(option.width && option.height) {
        $slides.find("img").attr("width", width).attr("height", height);
      }
      //设定容器的宽高
      //确定控件容器拥有样式: overflow: hidden; position: relative;
      //设定控制容器的样式
      $container.css({
        "overflow": "hidden",
        "position": "relative",
        "width": width + "px",
        "height": height + "px"
      });
      $control.css({
        "position": "relative",
        "top": -height + "px",
        //slide control
        "left": -width + "px",
        //slide control
        "width": total * width + "px",
        "height": total * height + "px"
      });
      //设定幻灯片的样式
      $slides.css({
        "position": "absolute",
        "display": "none",
        "top": height + "px",
        "left": width + "px",
        "z-index": 0
      });
      if(total < 2) { //只有一帧
        $container.fadeIn(duration, function() {
          loaded = true;
          option.slideLoaded();
        });
        return false;
      }
      if(start < 0) {
        start = 0;
      }
      if(start > total) {
        start = total - 1;
      }
      //根据配置的开始帧 设置 当前帧 下标
      if(option.index) {
        current = start;
      }

      //显示控件
      $container.css("display", "block");

      //此时只是简单的显示开始帧
      $control.children(":eq(" + start + ")").fadeIn(duration, function() {
        loaded = true;
        option.slideLoaded();
      });
      //生成手动操作入口
      if(option.pagination) {
        var ulCss = {
          "position": "absolute",
          // "right": "25px",
          // "bottom": "12px",
          "z-index": 6
        };
        var ul = '<ul class="' + option.paginationClass + ' pagination-pos ' + (!!option.paginationTextHidden ? 'pagination-text-hidden' : '' )+ '">';
        if (option.paginationPos) {
          var tmp, paginationPos = option.paginationPos;
          for (tmp in paginationPos) {
            if (paginationPos.hasOwnProperty(tmp)) {
              ulCss[tmp] = paginationPos[tmp];
            }
          }
          delete tmp;
        }
        for(var i = 0; i < total; i++) {
          ul += '<li><a href="javascript:;">' + (i + 1) + '</a></li>';
        }
        ul += '</ul>';
        $(ul).appendTo($container).css(ulCss);
        $elem.find('.' + option.paginationClass + ' li:eq(' + start + ')').addClass(option.currentClass);
        //绑定手动播放事件-->TODO:提供参数表示触发类型
        // switch(option.paginationType) {
        //   case "click":
        //     $elem.find("ul." + option.paginationClass + ">li>a").click(function() {
        //       console.log($control.is(':animated'));
        //       //强制中止动画
        //       // if(option.play) { // option.play
        //       //   _pause();
        //       // }
        //       if ($control.is(':animated')) {
        //         _pause();
        //       }
        //       //显示数字从1开始;计算下标由0开始
        //       clicked = parseInt($(this).text(), 10) - 1;
        //       if(current != clicked) {
        //         _animate('pagination', effect, clicked);
        //       }
        //       return false;
        //     });
        //     break;
        //   //控制上再滑动是不连贯-暂时屏蔽掉
        //   case "hover":
        //     console.log('pa: hover');
        //     break;
        //   default:
        //     break;
        // }
        $elem.find("ul." + option.paginationClass + ">li>a").click(function() {
          if(option.play) {
            _pause();
          }
          //显示数字从1开始;计算下标由0开始
          clicked = parseInt($(this).text(), 10) - 1;
          //  && !$control.is(':animated')
          // if(current != clicked) {
          //   _animate('pagination', effect, clicked);
          // }
          // 相邻事件不重复添加--> 放置到animation处理?
          if (current !== clicked) {
            if (paginationListener.length > 0) {
              if (clicked !== paginationListener[paginationListener.length - 1]) {
                paginationListener.push(clicked);
              }
            } else {
              paginationListener.push(clicked);
            }
          }
          if (!$control.is(':animated')) {
            if(paginationListener.length > 0) {
              _animate('pagination', effect, paginationListener.shift());
            }
          }
          return false;
        });
      }
      //开始图片播放
      if(option.play) {
        playInterval = setInterval(function() {
          _animate('next', effect);
        }, option.play);
        $elem.data("interval", playInterval);
      }

      // 悬浮暂停轮播事件
      if(option.hoverPause && option.play) {
        $control.bind({
          mouseover: function() {
            _stop();
          },
          mouseleave: function() {
            _pause();
          }
        });
      }
      // 检查导航点击事件列表
      // 如果有 则执行 否则 进入轮播状态
      function _checkListener() {
        if (paginationListener.length > 0) {
          if (option.play) {
            _pause();
          }
          _animate('pagination', effect, paginationListener.shift());
        }
      }
      function _animate(direction, effect, clicked) {
        if(!loaded || active) return;
        //动画开始前调用
        option.animationStart(current + 1);
        //根据动画方向 更新配置参数
        switch(direction) {
        case "next":
          prev = current;
          next = current + 1;
          next = (total === next) ? 0 : next;
          current = next;
          if(effect == "h") {
            position = width * 2;
            direction = -position;
          } else if(effect == "v") {
            position = height * 2;
            direction = -position;
          }
          break;
        case "prev":
          prev = current;
          next = current - 1;
          next = (next = -1) ? total - 1 : next;
          position = direction = 0;
          current = next;
          break;
        case "pagination":
          prev = $elem.find('.' + option.paginationClass + ' li.' + option.currentClass + ">a").text();
          prev = parseInt(prev, 10) - 1;
          next = clicked;
          if(prev < next) {
            if(effect == "h") {
              position = width * 2;
              direction = -position;
            } else if(effect == "v") {
              position = height * 2;
              direction = -position;
            }
          } else {
            position = direction = 0;
          }
          current = next;
          break;
          //其他
        }
        //动画效果
        switch(effect) {
        case "h":
          $control.children(":eq(" + next + ")").css({
            "left": position + "px",
            "display": "block"
          });
          $control.animate({
            "left": direction + "px"
          }, duration, function() {
            //重置动画控制对象参数
            $control.css({
              "left": -width + "px"
            });
            $control.children(':eq(' + next + ')').css({
              "left": width + "px",
              zIndex: 5
            });
            $control.children(':eq(' + prev + ')').css({
              "left": width + "px",
              display: 'none',
              zIndex: 0
            });
            //结束动画
            option.animationComplete(next + 1);
            active = false;
            _checkListener();
          });
          break;
        case "v":
          $control.children(":eq(" + next + ")").css({
            "top": position + "px",
            "display": "block"
          });
          $control.animate({
            "top": direction + "px"
          }, duration, function() {
            //重置动画控制对象参数
            $control.css({
              "top": -height + "px"
            });
            $control.children(':eq(' + next + ')').css({
              "top": height + "px",
              "z-index": 5
            });
            $control.children(':eq(' + prev + ')').css({
              "top": height + "px",
              "display": "none",
              "z-index": 0
            });
            //结束动画
            option.animationComplete(next + 1);
            active = false;
            _checkListener();
          });
          break;
        case "fade":
          $control.children(":eq(" + next + ")").css({
            "z-index": 5 //6?5?7?
          }).fadeIn(duration, function() {
            $control.children(":eq(" + prev + ")").css({
              "z-index": 0,
              "display": "none"
            });
            //重置z-index
            $control.children(":eq(" + next + ")").css({
              "z-index": 0
            });
            //结束动画
            option.animationComplete(next + 1);
            active = false;
            _checkListener();
          });
          break;
        case "zoom":
          $control.children(":eq(" + next + ")").css({
            width: 0,
            height: 0,
            left: 3 * width / 2,
            top: 3 * height / 2
          });
          $control.children(":eq(" + prev + ")").animate({
            width: 0,
            height: 0,
            left: 3 * width / 2,
            top: 3 * height / 2
          }, duration / 2, function() {
            $control.children(":eq(" + prev + ")").css({
              "z-index": 0,
              "display": "none",
              "width": width,
              "height": height,
              "top": height,
              "left": width

            });
            $control.children(":eq(" + next + ")").animate({
              width: width,
              height: height,
              left: width,
              top: height
            }, duration / 2);
            //重置z-index
            $control.children(":eq(" + next + ")").css({
              "z-index": 0,
              "display": "block",
              "opacity": "1"
            });
            //结束动画
            option.animationComplete(next + 1);
            active = false;
            _checkListener();
          });
          break;
        default:
          break;
        }
        // 更新手动操作样式
        if(option.pagination) { //可直接替换
          //删除
          $elem.find('.' + option.paginationClass + ' li.' + option.currentClass).removeClass(option.currentClass);
          // 添加
          $elem.find('.' + option.paginationClass + ' li:eq(' + next + ')').addClass(option.currentClass);
        }
      }

      /**
       * 清除自动播放周期
       */
      function _stop() {
        clearInterval($elem.data('interval'));
      }

      /**
       * 清除定时器;延时添加定时器
       */
      function _pause() {
        if(option.pause) {
          clearTimeout($elem.data('pause'));
          clearInterval($elem.data('interval'));
          pauseTimeout = setTimeout(function() {
            clearTimeout($elem.data('pause'));
            playInterval = setInterval(function() {
              _animate('next', effect);
            }, option.play);
            $elem.data("interval", playInterval);
          }, option.pause);
          $elem.data('pause', pauseTimeout);
        } else {
          //_stop();
        }
      }
    }
    //百叶窗
    //see http://www.cnblogs.com/hongru/archive/2010/10/31/1865555.html
    function _shutter() {
      var _that = this;
      var $wrapper = $(_that);
      var $container = $wrapper.find("." + option.container);
      var $imgParentA = $container.find("a");
      var $img = $imgParentA.find("img");
      //收集每帧图片对应的数据
      $.each($imgParentA, function(index, item) {
        option.eventParams[index] = $(item).attr(option.dataAttributeName);
      });
      //自动运行间隔
      _that.a = option.auto ? option.auto : 4;
      _that.index = option.index ? option.index : 0;
      //幻燈片個數
      _that.l = $imgParentA.length;
      //当前显示的图片序号(未&&z-index变量)
      _that.cur = 0;
      //百葉窗的葉子數//@
      _that.stN = option.shutterNum ? option.shutterNum : 5;
      //輪播的方向
      _that.direction = option.shutterDir ? option.shutterDir : 'h';
      _that.W = option.width ? option.width : $wrapper.width();
      _that.H = option.height ? option.height : $wrapper.height();

      _that.aw = 0;
      //_that.mask = [];
      //隱藏原始圖片輪播部份
      $container.width(this.W).height(this.H).find(">div.slide-controller").css("display", "none");
      //構建百葉窗結構
      var $shutterContainer = $("<div />");
      var $shutterA = $("<a />");
      $shutterA.attr("href", "javascript:;");

      var _shutterHTML = "";
      for(var x = 0; x < _that.stN; x++) {
        var _spanCssText = _that.direction === "h" ? "position:absolute;width:" + _that.W / _that.stN + "px;height:" + _that.H + "px;left:" + x * (_that.W / _that.stN) + "px;top:0" : "position:absolute;width:" + _that.W + "px;height:" + _that.H / _that.stN + "px;left:0" + "px;top:" + x * (_that.H / _that.stN) + "px";
        _shutterHTML += '<span style="' + _spanCssText + '">' + '</span>';
      }
      var _doubleUseCssText = {
        "position": "absolute",
        "width": _that.W + "px",
        "height": _that.H + "px",
        "left": 0,
        "top": 0
      };
      $shutterA.html(_shutterHTML).css(_doubleUseCssText);
      //$shutterContainer.css(_doubleUseCssText).css("background-color", "rgba(36, 72, 108,.5)").append($shutterA).appendTo($container);
	  $shutterContainer.css(_doubleUseCssText).css("background-color", "rgb(36, 72, 108)").append($shutterA).appendTo($container);
      //绑定数据交互事件
      $shutterA.bind("click", function() {
        option.eventHandler(option.eventParams[_that.cur]);
        return false;
      });
      //生成手动操作入口
      if(option.pagination) {
        var ulCss = {
          "position": "absolute",
          //"right": "25px",
          //"bottom": "12px",
          "z-index": 6
        };
        //var ul = '<ul class=' + option.paginationClass + '>';
		var ul = '<ul class="' + option.paginationClass + ' pagination-pos ' + (!!option.paginationTextHidden ? 'pagination-text-hidden' : '' )+ '">';
		if (option.paginationPos) {
          var tmp, paginationPos = option.paginationPos;
          for (tmp in paginationPos) {
            if (paginationPos.hasOwnProperty(tmp)) {
              ulCss[tmp] = paginationPos[tmp];
            }
          }
          delete tmp;
        }
        for(var i = 0; i < _that.l; i++) {
          ul += '<li><a href="javascript:;">' + (i + 1) + '</a></li>';
        }
        ul += '</ul>';
        $(ul).appendTo($shutterContainer).css(ulCss).delegate("li", "click", function(event) {
          var _t = event.target;
          while(_t.nodeType === 3) _t = _t.parentNode;
          var $target = $(_t);
          if($target.is("ul")) {
            return;
          } else {
            if($target.is("a")) {
              $target = $target.parent();
            }
          }
          if($target.is("." + option.paginationClass)) return;
          _that.pos($target.index());

        });
        $shutterContainer.find('.' + option.paginationClass + ' li:eq(' + _that.index + ')').addClass(option.currentClass);
      }
      //變換函數
      //大小週期
      _that.timer1 = false;
      _that.timer2 = [];
      _that.timer2.length = _that.stN;
      //小週期
      //传说中的变量提升
      _that.auto = function() {
        _that.timer1 = setInterval(function() {
          _that.move(1);
        }, _that.a * 1000);
      };
      _that.anim = function(index) {
        var tt = _that.direction == 'h' ? $shutterA.find("span:eq(" + (_that.stN - 1) + ")").width() : $shutterA.find("span:eq(" + (_that.stN - 1) + ")").height();
        if(tt <= 5) { //如果叶片过多 这个值有点小
          clearInterval(_that.timer2[index]);
          for(var z = 0; z < _that.stN; z++) {
            _that.direction == 'h' ? $shutterA.find("span:eq(" + z + ")").width(0) : $shutterA.find("span:eq(" + z + ")").height(0);
          }
          if(!_that.timer1) {
            _that.auto()
          }
        } else {
          for(var n = 0; n < _that.stN; n++) {
            _that.aw -= 1;
            _that.direction == 'h' ? $shutterA.find("span:eq(" + n + ")").width(_that.aw) : $shutterA.find("span:eq(" + n + ")").height(_that.aw);
          }
        }
      };
      _that.move = function(index) {
        var n = _that.cur + index;
        //下一张或上一张的序号（注意三元选择符的运用）
        var m = index == 1 ? n == _that.l ? 0 : n : n < 0 ? _that.l - 1 : n;
        //变换到上一张或下一张
        _that.pos(m);
      };
      _that.pos = function(index) {
        //                console.log("@pos:傳入的i:" + index );
        clearInterval(_that.timer1);
        clearInterval(_that.timer2[index]);

        _that.aw = _that.direction === "h" ? _that.W / _that.stN : _that.H / _that.stN;

        var _next = index + 1 >= _that.l ? 0 : index + 1;

        var _indexSrc = $img[index].src;
        var _nextSrc = $img[_next].src;

        $shutterContainer.css("background-image", "url(" + _nextSrc + ")");
        for(var y = 0; y < _that.stN; y++) {
          var _cssText = {
            "background-image": "url(" + _indexSrc + ")"
            //"background-repeat": " no-repeat "
          };
          if(_that.direction == "h") {
            _cssText["background-position"] = "-" + y * _that.W / _that.stN + "px 0";
            _cssText["width"] = _that.W / _that.stN + "px";
            _cssText["height"] = _that.H + "px";
            _cssText["left"] = y * (_that.W / _that.stN) + "px";
            _cssText["top"] = 0;
          } else {
            _cssText["background-position"] = "0 -" + y * _that.H / _that.stN + "px";
            _cssText["width"] = _that.W + "px";
            _cssText["height"] = _that.H / _that.stN + "px";
            _cssText["left"] = 0;
            _cssText["top"] = y * (_that.H / _that.stN) + "px";
          }
          $shutterA.find("span:eq(" + y + ")").css(_cssText);
        }

        _that.cur = index;
        _that.timer1 = false;
        //删除
        $shutterContainer.find('.' + option.paginationClass + ' li.' + option.currentClass).removeClass(option.currentClass);
        // 添加
        $shutterContainer.find('.' + option.paginationClass + ' li:eq(' + index + ')').addClass(option.currentClass);
        _that.timer2[index] = setInterval(function() {
          _that.anim(index);
        }, 10 * _that.stN);
      };
      _that.pos(_that.index);
    }
    return this.each(option.effect === "shutter" ? _shutter : _slide);
  };
  $.extend($.fn.slide, {
    version: "1.1"
  });
})(jQuery);
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
ui.isMobile = ui.fn.isMobile;/*
 *作    者: 高娜
 *版    本:1.3
 *完成时间: 2012-07-18
 *描    述: file
 *关联文件: jQuery.js|jquery-ui.js
 */
(function($,undefined){
    /**
	* @class 文件上传控件
    * @name file
    * @description 文件上传控件
	* @version   1.3
    */
	$.widget('ui.file',
	/** @lends file.prototype */
	{		
		options:{
			/**  
			* @name file#width
			* @param {Number}  数字类型
			* @description 文件上传控件的宽度
			* @default {Number} 200
			* @example
			* $('.exampleObj').file({
			*		width : 200
			*  });
			*/
			width : 200 ,
			/**  
			* @name file#height
			* @param {Number}  数字类型
			* @description 文件上传控件的高度
			* @default {Number} 200
			* @example
			* $('.exampleObj').file({
			*		height : 30
			*  });
			*/
			height : 30 
		},
		_create:function(){
			var _self = this.element ;
			var o=this.options ;
			var _span = '<span class="file-wrap"></span>' ;
			var _textInput = '<input class="file-text" type="text" readonly /><input class="file-button" type="button" value="浏览" />' ;           
			_self.wrap(_span).after(_textInput) ;
			_self.addClass("file-ifile").width(o.width).height(o.height) ;
			var _parent = _self.parents('.file-wrap') ;
			var text_width=o.width - _parent.find('.file-button').width() -3 ;
			var _left = _parent.offset().left;
			var _top = _parent.offset().top;
			_parent.find('.file-text').width(text_width).height(o.height - 2).css('line-height',o.height - 2+'px') ;
			_self.css({'top':_top,'left':_left}) ;
		},
		
		_init:function(){
			 var _self = this.element ;
			 _self.change(function(){
			 	var _value = _self.val().substring(_self.val().lastIndexOf('\\')+1,_self.val().length) ; 
			 	_self.parents('.file-wrap').find('.file-text').val(_value) ;
			 }) ;
		} ,
		/**
		* @description 获得文件路径控件
		* @return {inputblock} inputblock对象
		* @example
		* $("#testExpObj").file('getVal');
		*/
       getVal : function(){
		   getVal = this.element.parents(".file-wrap").find('.file-text').val();
		   return getVal ;
       },
		/**
		* @description 清除文件上传控件
		* @return {inputblock} inputblock对象
		* @example
		* $("#testExpObj").file('destroy');
		*/
		destroy : function(){
			if(this.element.parents('.file-wrap').length >0){
				this.element.parents('.file-wrap').find('.file-text').remove() ;
			 	this.element.parents('.file-wrap').find('.file-button').remove() ;
			 	this.element.removeClass().unwrap('.file-wrap');
			}
		}
	});

	$.extend($.ui.file, {
		version: "1.3"
	});

})(jQuery);

/*
 *作    者: 高娜
 *版    本: 1.3
 *完成时间: 2012-07-19
 *描    述: accordion
 *关联文件: jQuery.js|jquery-ui.js
 */
(function($,undefined){
    /**
	* @class 手风琴控件
    * @name accordion
    * @description 手风琴控件
	* @version 1.3
    */
	$.widget('ui.accordion',
	/** @lends accordion.prototype */
	{		
		options : {
			/**  
			* @name accordion#wrapWidth
			* @param {Number}  数字类型
			* @description 包裹展示区域的宽度-针对x方向手风琴设置,建议根据显示图片个数设置,这个值与显示图片宽度的差值大于显示图片数量的十倍
			* @default {Number} 480
			* @example
			* $('.exampleObj').accordion({
			*		wrapWidth : 480
			*  });
			*/
			wrapWidth : 480 ,
			/**  
			* @name accordion#wrapHeight
			* @param {Number}  数字类型
			* @description 包裹展示区域的高度-针对y方向手风琴设置,建议根据显示图片个数设置,这个值与显示图片高度的差值大于显示图片数量的十倍
			* @default {Number} 480
			* @example
			* $('.exampleObj').accordion({
			*		wrapHeight : 480
			*  });
			*/
			wrapHeight : 480 ,
			/**  
			* @name accordion#imgWidth
			* @param {Number}  数字类型
			* @description 图片的宽度
			* @default {Number} 400
			* @example
			* $('.exampleObj').accordion({
			*		imgWidth : 400
			*  });
			*/
			imgWidth : 400 ,
			/**  
			* @name accordion#imgHeight
			* @param {Number}  数字类型
			* @description 图片的高度
			* @default {Number} 300
			* @example
			* $('.exampleObj').accordion({
			*		imgHeight : 300
			*  });
			*/
			imgHeight : 300 ,
			/**  
			* @name accordion#direction
			* @param {String}  字符串类型
			* @description 手风琴效果方向，可选值有x/y
			* @default {String} 'x'
			* @example
			* $('.exampleObj').accordion({
			*		direction : 'x'
			*  });
			*/
			direction : 'x' ,
			/**  
			* @name accordion#autoplay
			* @param {Boolean}  布尔值类型
			* @description 是否自动播放
			* @default {Boolean} true
			* @example
			* $('.exampleObj').accordion({
			*		autoplay : true
			*  });
			*/
			autoplay : true ,
			/**  
			* @name accordion#delay
			* @param {Number}  数字类型
			* @description 自动切换动画的时间间隔
			* @default {Number} 3000
			* @example
			* $('.exampleObj').accordion({
			*		delay : 3000
			*  });
			*/
			delay : 3000 ,
			/**  
			* @name accordion#radius
			* @param {Number}  数字类型
			* @description 圆角值-该样式需要浏览器支持css3，如果不支持默认为没有圆角效果。
			* @default {Number} 8
			* @example
			* $('.exampleObj').accordion({
			*		radius : 8
			*  });
			*/
			radius : 8 ,
			/**  
			* @name accordion#fn
			* @param {Function}  函数类型
			* @description 预留自定义函数
			* @default {Function} fn
			* @example
			* $('.exampleObj').accordion({
			*		fn : function(){}
			*  });
			*/
			fn : function(){}
		},
		_create : function(){
		},
		_init : function(){
			var _self = this.element ;
			var o = this.options ;
			var liElem = _self.find('li') ;
			var len = liElem.length ;
			_self.addClass('accor-wrap').css('border-radius',o.radius + 'px').find('li').addClass('accor-elem').css('border-radius',o.radius + 'px').find('img').css('border-radius',o.radius + 'px').width(o.imgWidth).height(o.imgHeight) ;
			if(o.direction == 'x'){
				accrX() ;
			}else if(o.direction == 'y'){
				accrY() ;
			}
			o.fn() ;
			
			function accrX(){
				var minWid = parseInt((o.wrapWidth - o.imgWidth + 1)/(len - 1));
				var inter = null ;
				var nextIndex = 0 ;
				_self.width(o.wrapWidth).height(o.imgHeight) ;	
				liElem.addClass('accor-border-left') ;
				liElem.eq(len-1).addClass('accor-current') ;
				liElem.each(function(i){
					var _left = parseInt(minWid) * i;
					$(this).css({
						left : _left 
					});
					$(this).hover(function(){
						liElem.each(function(j){
							liElem.eq(i).addClass('accor-current').siblings('li').removeClass('accor-current') ;
							if(j<=i){
							 	$(this).stop().animate({left:j*parseInt(minWid)},500);
							}else{
							 	$(this).stop().animate({left:parseInt(o.wrapWidth - minWid*(len - j))},500) ;
							}
						}) ;
						if(inter != null || inter != 'undefined'){
							clearInterval(inter);
						}
					},function(){
						nextIndex = i ;
						if(o.autoplay){
							inter = setInterval(autoScroll,o.delay);
							if(++nextIndex >= len){
								nextIndex = 0 ;
							}
						}
					}) ;
				}) ;
				if(o.autoplay){
					inter = setInterval(autoScroll,o.delay);
				}
				function autoScroll(){
					liElem.each(function(j){
						liElem.eq(nextIndex).addClass('accor-current').siblings('li').removeClass('accor-current') ;
						if(j<=nextIndex){ 
						 	$(this).stop().animate({left:j*parseInt(minWid)},500);
						}else{
						 	$(this).stop().animate({left:parseInt(o.wrapWidth - minWid*(len - j))},500) ;
						}  
					});
					if(++nextIndex >= len){
						nextIndex = 0 ;
					}
				}
			}			
			
			function accrY(){
				var minHei = parseInt((o.wrapHeight - o.imgHeight + 1)/(len - 1));
				var inter = null ;
				var nextIndex = 0 ;
				_self.width(o.imgWidth).height(o.wrapHeight) ;	
				liElem.addClass('accor-border-top') ;
				liElem.eq(len-1).addClass('accor-current') ;
				liElem.each(function(i){
					var _top = parseInt(minHei) * i;
					$(this).css({
						top : _top 
					});
					$(this).hover(function(){
						liElem.each(function(j){
							liElem.eq(i).addClass('accor-current').siblings('li').removeClass('accor-current') ;
							if(j<=i){
							 	$(this).stop().animate({top:j*parseInt(minHei)},500);
							}else{
							 	$(this).stop().animate({top:parseInt(o.wrapHeight - minHei*(len - j))},500) ;
							}
						}) ;
						if(inter != null || inter != 'undefined'){
							clearInterval(inter);
						}
					},function(){
						nextIndex = i ;
						if(o.autoplay){
							inter = setInterval(autoScroll,o.delay);
							if(++nextIndex >= len){
								nextIndex = 0 ;
							}
						}
					}) ;
				}) ;
				if(o.autoplay){
					inter = setInterval(autoScroll,o.delay);
				}
				function autoScroll(){
					liElem.each(function(j){
						liElem.eq(nextIndex).addClass('accor-current').siblings('li').removeClass('accor-current') ;
						if(j<=nextIndex){ 
						 	$(this).stop().animate({top:j*parseInt(minHei)},500);
						}else{
						 	$(this).stop().animate({top:parseInt(o.wrapHeight - minHei*(len - j))},500) ;
						}  
					});
					if(++nextIndex >= len){
						nextIndex = 0 ;
					}
				}
			}
		} ,
		/**
		* @description 清除手风琴控件
		* @return {accordion} accordion对象
		* @example
		* $("#testExpObj").accordion('destroy');
		*/
		destroy : function(){
			
		}
	});

	$.extend($.fn.accordion, {
		version: "1.3"
	});

})(jQuery);/*
 *作    者: 张文钦
 *版    本: 1.0
 *完成时间: 2012-8-16
 *描    述: breadcrumb
 *关联文件: jQuery.js|jquery-ui.js
 */
(function($){
	/**
     * @class 面包屑
     * @name breadcrumb
     * @description 面包屑
     * @version 1.0
     */
    $.fn.breadcrumb = function(option){
        var defaults = {
            /**
             * @name breadcrumb#bread
             * @param {Array} 数据项格式为{name:"level",url:"#"}的对象数组
             * @description 面包屑构成数据集数组
             * @default {breadcrumb} []
             * @example
             * $("#breadcrumb").breadcrumb([{name:"level",url:"#"}]);
             */
            bread:[{}]
        };
        option = $.extend({}, defaults, option || {});
        return this.each(function(){
            //只有1、2个数据、3或者3+数据
            var $this = $(this);
            var _datas = option.bread;
            var i= 0,len= _datas.length;
            if ( len === 0 ) {
                alert("参数传入错误!");
                return this;
            }
            var $dataContent = '<ul class="ui-breadcrumb">';
            var _data = _datas[i++];

            if ( len === 1 ) {
                $dataContent += '<li class="last-child"><span class="arrow"></span>'+_data.name+'</li></ul>';
                $this.html($dataContent);
                return this;
            } else if ( len === 2 ) {
                $dataContent += '<li><span class="arrow"></span><a href="'+_data.url+'">'+_data.name+'</a></li>'
                    + '<li class="last-child"><span class="arrow"></span>'+_data.name+'</li></ul>';
                $this.html($dataContent);
                return this;
            }
            $dataContent += '<li><a href="'+_data.url+'">'+_data.name+'</a></li>';
            for ( i;i<len-1;i++) {
                _data = _datas[i];
                $dataContent += '<li><span class="arrow"></span><a href="'+_data.url+'">'+_data.name+'</a></li>';
            }
            _data = _datas[len-1];
            $dataContent += '<li class="last-child"><span class="arrow"></span>'+_data.name+'</li></ul>';
            $this.html($dataContent);
        });
    }
    $.extend($.fn.breadcrumb, {
        version: "1.0"
    });
})(jQuery);/*
 *作    者: 张文钦
 *版    本: 1.0
 *完成时间: 2012-8-31
 *描    述: timeline
 *关联文件: jQuery.js|jquery-ui.js
 */
(function ($) {
	"use strict";
	/**
	* @class 简单时间轴+对应信息展示
    * @name timeline
    * @description 时间轴+对应信息展示
	* @requires jQuery.js
	* @version 1.0
    */
    $.fn.timeline = function (option) {
        var defaults = {
            /**
             * @name timeline#timeBuilder
             * @param {String} 时间轴时间点生成方式 "auto" 自动生成 此时根据navStartDate和navDateOffset来生成 "hand" 手动配置 此时使用navDate
             * @description 时间轴时间点生成方式
             * @default "hand"
             * @example
             * $("#timeline").timeline({timeBuilder:"hand"});
             */
            timeBuilder:"hand",
            /**
             * @name timeline#navDate
             * @param {Array} 自定义显示的时间点 时间数组 格式 "2012.9.1"
             * @description 自定义显示的时间点
             * @default ["2012.8.30", "2012.8.31", "2012.9.1", "2012.9.2"]
             * @example
             * $("#timeline").timeline({navDate:["2012.8.30", "2012.8.31", "2012.9.1", "2012.9.2"]});
             */
            navDate:[],
            /**
             * @name timeline#navStartDate
             * @param {String} 定义开始结束日期 生成时序时间点
             * @description  定义开始结束日期 生成时序时间点
             * @default null
             * @example
             * $("#timeline").timeline({ navStartDate:"2012.8.12",navDateOffset:10});
             */
            navStartDate:null,
            /**
             * @name timeline#navDateOffset
             * @param {Number} 游标 表示开始时间后加多少天做时间轴点 >=0的整数  总的时间点为 navDateOffset+1
             * @description  游标 表示开始时间后加多少天做时间轴点
             * @default 0
             * @example
             * $("#timeline").timeline({ navStartDate:"2012.8.12",navDateOffset:10});
             */
            navDateOffset:null,
            /**
             * @name timeline#content
             * @param {Array} 时间轴对应的静态数据信息 如果配置了content则优先于url使用
             * @description  时间轴对应的静态数据信息 如果配置了content则优先于url使用
             * @default ["2012.8.30-(1)", "2012.8.31(2)", "2012.9.1(3)", "2012.9.2(4)"]
             * @example
             * $("#timeline").timeline({ content:["2012.8.30-(1)", "2012.8.31(2)", "2012.9.1(3)", "2012.9.2(4)"]});
             */
            content:[],
            /**
             * @name timeline#url
             * @param {String} ajax获取时间轴信息的链接 返回对应数目的信息 
             *                    返回值为形如{"2012.9.19":"手工数据2012.9.19"}的json数据,其中键key为对应的事件点 对应的键值为具体的html字符串
             * @description  ajax获取时间轴信息的链接 返回对应数目的信息 返回类型为json
             * @default null
             * @example
             * $("#timeline").timeline({ url:"http://192.168.24.67:8080/spring/timeline?navData="+["2012.9.16", "2012.9.17", "2012.9.18", "2012.9.19"].join(",")});
             */
            url:null,
            //数据类型;1.html已拼接好的html结构;2.json/xml;纯数据 此时根据自定义的内容构建函数处理 构建每个日期下的内容
            //dataType:"json",
            //获取到数据
            //contentBuilder:function(){},
            //初始激活时间
            /**
             * @name timeline#initActive
             * @param {String} 初始时激活的时间点
             * @description  初始时激活的时间点
             * @default null
             * @example
             * $("#timeline").timeline({ initActive:"2012.9.19"});
             */
            initActive:null,
            /**
             * @name timeline#width
             * @param {Number} 配置区域的宽
             * @description  配置区域的宽
             * @default 400
             * @example
             * $("#timeline").timeline({ width:400});
             */
            width:400,
            /**
             * @name timeline#height
             * @param {Number} 配置区域的高 时间轴部分的高位91 内容的高为此高度-91的值
             * @description  配置区域的高 时间轴部分的高位91 内容的高为此高度-91的值
             * @default 191
             * @example
             * $("#timeline").timeline({ height:191});
             */
            height:191,
			/**
             * @name timeline#basePath
             * @param {Number} 定位到图片images所在目录的路径
             * @description  定位到图片images所在目录的路径
             * @default 191
             * @example
             * $("#timeline").timeline({ basePath:"./"});
             */
			basePath:"."
        };
		if(option != 'destroy'){
			option = $.extend({}, defaults, option || {});
			return this.each(function () {
				var $this = $(this);
				var $nav = $('<div class="ui-timeline-nav" />');
				var $navContent = $("<ul />");
				var $content = $('<ul class="ui-timeline-content" />');
				//生成时间点
				var _nav = [];
				if (option.timeBuilder === "auto") {
					_nav = _buildTime(option.navStartDate, option.navDateOffset);
				} else {
					_nav = option.navDate;
				}
				//生成时间轴内容
				var _lis = "";
				var _basePath = option.basePath;
				for (var i = 0, len = _nav.length; i < len; i++) {
					_lis += _point(_nav[i],_basePath);
				}
				$navContent.html(_lis);
				$nav.html($navContent);
				$this.prepend($nav);
				//获取时间轴对应的数据信息
				var _content = option.content, _contentLength = _content.length;
				if (_contentLength !== 0) {
					if (_contentLength !== _nav.length) {
						alert("时间点和数据不对应!");
						return;
					}
					var _divContent = "", j;
					for (j = 0; j < _contentLength; j++) {
						_divContent += "<li data-key=\""+_nav[j]+"\">" + _content[j] + "</li>";
					}
					$content.html(_divContent);
					$this.append($content);
				} else {
					  //FIXME:测试defer后修改实现方式
					  $.getJSON(option.url, function (data) {
						  var _content = "";
						  var _initActive = option.initActive;
						  for ( var o in data ) {
							if ( data.hasOwnProperty( o ) ) {
								if ( o == _initActive ){
								  _content +="<li data-key=\""+o+"\" class=\"current\">" + o + "<br/>" + data[o] + "</li>";
								} else {
								  _content +="<li data-key=\""+o+"\">" + o + "<br/>" + data[o] + "</li>";
								}
							}                        
						  }                   
						  $content.html(_content);
						  $this.append($content);
					  });
				}
				//设定显示的宽和高
				var _h = option.height;
				_h = _h < 91 ? 100 : _h;
				$this.width(option.width).height(_h);
				_h -= 91;
				$content.height(_h);
				//绑定事件
				$nav.delegate("ul", "click", function (e) {
					var _t = e.target;
					while (_t.nodeType === 3) _t = _t.parentNode; //排除文本节点
					var $target = $(_t);
					if ($target.is("ul")) return;
					if (!$target.is("li")) { //not返回值是jq对象的筛选集，不是boolean
						if ($target.is("span")) {
							$target = $target.parent();
						} else {
							$target = $target.parent().parent();
						}
					}
					//当前已选中，则不切换
					if ($target.is(".selected")) return;
					$target.attr("class", "selected").siblings(".selected").removeClass();
					$content.find("li[data-key=\""+$target.attr("data-key")+"\"]").attr("class", "current").siblings(".current").removeClass();
					return false;
				});
				//触发事件
				//配置激活的日期
				if(!option.initActive){
				  $nav.find("li:first").trigger("click");
				} else {
				  $nav.find("li[data-key=\""+option.initActive+"\"]").trigger("click");
				}
				//时间点内容生成
				function _point(timeData,_basePath) {
					return '<li data-key="'+timeData+'">'
						+ '<span class="content">'
						+ '<img src="'+_basePath+'/images/timeline/ui-timeline-bg-3.png"/>'
						+ '<em></em>'
						+ '<b>' + timeData + '</b>'
						+ '</span>'
						+ '<span class="tag"></span>'
						+ '</li>';
				}
				/**
				 *
				 * @param start "2012.8.3"
				 * @param offset{Number}   天数
				 * @private
				 */
				function _buildTime(start, offset) {
					function _ts(_sTime) {
						return _sTime.getFullYear() + "." + (_sTime.getMonth() + 1) + "." + _sTime.getDate();
					}
					var _sTime = new Date(start);
					offset = offset && offset > 0 ? offset : 0;
					var ret = [ _ts(_sTime)];
					for (var i = 1, len = offset; i <= len; i++) {
						_sTime.setDate(_sTime.getDate() + 1);
						ret[ret.length] = _ts(_sTime);
					}
					return ret;
				}
				/**
				 * 路径工具函数 在引用图片资源时用到
				 * 脚本合并到ui.js时,此函数用不到
				 * @private
				 */
				function _path(){
				  var scripts = document.getElementsByTagName("script");
				  var i,len,_path;
				  for(i=0,len=scripts.length;i<len;i++){
					  var _s = scripts[i].src||"",index;
					  if ((index = _s.indexOf("timeline.js")) != -1){
						  _path = _s.substring(0,index-1);
						  break;
					  }
				  }
				  return _path;
				}
			});
		}else{
			var isCreate = $(this).find('div.ui-timeline-nav').length>0 ;
			if(isCreate){
				$(this).empty() ;
			}
		}
    };
    $.extend($.fn.timeline, {
        version: "1.3"
    });
})(jQuery);/*
 *作    者: 张文钦
 *版    本: 1.0
 *完成时间: 2012-8-29
 *描    述: dialog
 *关联文件: jQuery.js|jquery-ui.js
 */
(function($){
	"use strict";
	/**
	* @class 简单对话框
    * @name dialog
    * @description 简单对话框
	* @requires jQuery.js
	* @version 1.0
    */
    $.fn.dialog = function(option){
        var defaults = {
            /**
             * @name dialog#zIndex
             * @param {Number} 浮动容器的层高
             * @description 浮动容器的层高
             * @default 9
             * @example
             * $("#dialog").dialog({zIndex:10});
             */
            zIndex:9,
            /**
             * @name dialog#fixSize
             * @param {Boolean} 是否固定尺寸
             * @description 配置是否固定尺寸 开启式width和height才可配置 值为false自适应内容的宽高(FIXME:自适应宽高不好使)
             * @default true
             * @example
             * $("#dialog").dialog({fixSize:true});
             */
            fixSize:true,
            /**
             * @name dialog#width
             * @param {String} 控件的宽
             * @description 控件的宽
             * @default "300px"
             * @example
             * $("#dialog").dialog({width:"300px"});
             */
            width:"300px",
            /**
             * @name dialog#height
             * @param {String} 控件的高
             * @description 控件的高
             * @default "150px"
             * @example
             * $("#dialog").dialog({height:"150px"});
             */
            height:"150px",
            /**
             * @name dialog#event
             * @param {String} 控件显示隐藏的触发方式  可选值 hover click 自定义事件名
             * @description 控件显示隐藏的触发方式
             * @default "click"
             * @example
             * $("#dialog").dialog({event:"customEvent"});
             */
            event:"click",
            /**
             * @name dialog#type
             * @param {String} 加载内容的方式 (1)普通文本 html;(2)ajax 此时url为自定义的函数 返回加载后的内容;(3)iframe 此时 url为请求的连接
             * @description 加载内容的方式
             * @default "html"
             * @example
             * $("#dialog").dialog({type:"html"});
             */
            type:"html",
            /**
             * @name dialog#content
             * @param {String} 加载的内容 type:"html"时有效
             * @description 加载内容的方式
             * @default "<p>默认加载的内容</p>"
             * @example
             * $("#dialog").dialog({content:"<p>默认加载的内容</p>"});
             */
            content:"<p>默认加载的内容</p>",
            /**
             * @name dialog#url
             * @param {String} ajax iframe加载方式时的链接地址
             * @description ajax iframe加载方式时的链接地址
             * @default ""
             * @example
             * $("#dialog").dialog({url:""});
             */
            url:"",
            /**
             * @name dialog#dataType
             * @param {String} ajax的返回的数据类型 当前可选为text html
             * @description ajax的返回的数据类型
             * @default ""
             * @example
             * $("#dialog").dialog({dataType:"text"});
             */
            dataType:"text",
            /**
             * @name dialog#dataType
             * @param {Fn} ajax请求后的回调方法
             * @description ajax请求后的回调方法
             * @default function(){}
             * @example
             * $("#dialog").dialog({ajaxCallBack:function(){}});
             */
            ajaxCallBack:function(){},
            //0表示只需要加载一次 1表示隐藏时将对应的dialog删除
            /**
             * @name dialog#lifecycle
             * @param {Number} 对话框的生命周期 0 表示一次加载长期存活 1 表示每次显示时重新加载
             * @description 对话框的生命周期
             * @default 0
             * @example
             * $("#dialog").dialog({lifecycle:0});
             */
            lifecycle:0
        };
        option = $.extend({}, defaults, option || {});
        //==========工具函数
        /**
         * 依赖jquery版  TODO:方法需要简化合并
         * @param o  dom元素对象、不是文本节点
         */
        function _dimession(o) {
            //不传入参数时 返回当前window的尺寸对象
            if (!o || o.nodeType !== 1 || (o && typeof o === "object" && "setInterval" in o && o.window === window )) {
                //alert("调用错误，需要dom对象！");
                //return;
                //窗口 _ww 宽 _wh 高 _wl行滚动条滚动 _wt 竖滚动条滚动
                var $w = $(window);
                var _ww = $w.width();
                var _wh = $w.height();
                var _wl = $w.scrollLeft();
                var _wt = $w.scrollTop();   
                return {
                    ww:_ww,
                    wh:_wh,
                    wl:_wl,
                    wt:_wt
                };
            }
            //follow 依附的节点
            var $o = $(o);
            var _w = $o.width();
            var _h = $o.height();
            var _offset = $o.offset();
            var _ow = $o.outerWidth();  //含边框 边距 内外边距
            var _oh = $o.outerHeight();
            return {
                w:_w,
                h:_h,
                ow:_ow,
                oh:_oh,
                l:_offset.left,
                t:_offset.top
            };
        }
        /**
         *
         * @param o follow定位基准节点
         * @param d ui-dialog实例
         * @return {Object} 返回dialog/overlay的坐标
         */
        function coordinate(o,$d) {
            var _w = _dimession();
            //follow元素坐标尺寸信息
            var _b = _dimession(o);
            //浮动弹出元素坐标尺寸信息
            //处理绝对定义display隐藏元素的真实尺寸
            $d.css({display:"block",visibility:"hidden"});
            var _d = _dimession($d[0]);
            $d.css({display:"none",visibility:"visible"});
            //返回dialog/overlay的坐标
            var _returnJSON = {};
            //三角标示的尺寸 有一些偏差
            var _extra9 = 9;
            var _extra11 = 11;

            //防止在follow元素下方时，.ui-dialog的底边的高
            var _bottomMaxHeight = _b.t + _b.oh + _extra9 + _d.oh;
            //放置在follow元素上方时 浮动元素需要的高度
            var _topMin = _extra9 + _d.oh;
            //放置在follow元素左方时 浮动元素的坐标
            var _leftMinWidth = _d.ow + _extra11;
            //放置在follow元素右方时 浮动元素的坐标
            var _rightMaxWidth = _b.l + _b.ow + _extra11 + _d.ow;
            if (_bottomMaxHeight < _w.wh) {//下
                _returnJSON = {
                    w:_d.w + "px",
                    h:_d.h + "px",
                    top:_b.t + _b.oh + _extra9 + "px",
                    left:_b.l + _b.ow - _d.ow + "px",
                    className:"top",
                    triangleLeft:_d.ow - 30 + "px", //具体的额度再调整
                    triangleTop:"-10px"
                };
            } else if (_topMin < _b.t) { //FIXME:往上放不下时 会改变原有的offset 不做对应修正时会出错 上
                _returnJSON = {
                    w:_d.w + "px",
                    h:_d.h + "px",
                    top:_b.t - _d.oh - _extra9 + "px",
                    left:_b.l + _b.ow - _d.ow + "px",
                    className:"bottom",
                    triangleLeft:_d.w - 30 + "px", //具体的额度再调整
                    triangleTop:_d.oh - 2 + "px"//内容的高+padding值
                };
            } else if (_rightMaxWidth < _w.ww) { //右
                _returnJSON = {
                    w:_d.w + "px",
                    h:_d.h + "px",
                    top:_b.t + "px",
                    left:_b.l + _b.ow + _extra11 + "px",
                    className:"left",
                    triangleLeft:"-10px", //具体的额度再调整
                    triangleTop:"10px"
                };
            } else if (_leftMinWidth < _b.l) { //左
                _returnJSON = {
                    w:_d.w + "px",
                    h:_d.h + "px",
                    top:_b.t + _b.oh - _d.oh + "px",
                    left:_b.l - _leftMinWidth + "px",
                    className:"right",
                    triangleLeft:_d.ow - 2 + "px", //具体的额度再调整
                    triangleTop:_d.h - 30 + "px"
                };
            }
            //TODO:如果都放不下?
            return _returnJSON;
        }
        return this.each(function(){

            var _that = this;
            var $follow = $(_that);
            var _dialogId,$content,$triangle,$dialog;
            //初始化生成结构
            function _init(){
                //每次获取最新的标识
                _dialogId = $follow.attr("data-dialog");
                if (!_dialogId){
                    _dialogId = _that.id || _that.nodeName.toLowerCase();
                    _dialogId += "-" + (new Date()).getTime();
                    $content = $('<div class="content-container" />');
                    $triangle = $('<div class="ui-dailog-triangle"/>');
                    $dialog = $('<div class="ui-dailog" data-load="false" id='+_dialogId+' />');
                    $dialog.prepend($triangle).append($content);
                    //定义层高
                    $dialog.css("zIndex",option.zIndex);
                    if(option.fixSize){
                        $dialog.css({
                            width:option.width,
                            height:option.height
                        });
                    }
                    //加载数据
                    //没有做容错处理
                    //TODO:数据加载和内容显示部分需要在做处理
                    switch(option.type){
                        case "html":
                            $content.html(option.content);
                            break;
                        case "ajax":
                            $.get(option.url,function(data){
                                (option.ajaxCallBack)();
                                $content.html(data);
                            },option.dataType);
                            break;
                        case "iframe":
                            $('<iframe src="'+option.url+'" frameborder="0"></iframe>').appendTo($content);
                            break;
                    }
                    //生命周期为0时才需要添加
                    $follow.attr("data-dialog",_dialogId);
                } else {
                    $dialog = $("#"+_dialogId);
                    $triangle = $dialog.find(">div.ui-dailog-triangle");
                    $content = $dialog.find(">div.content-container");
                }
                //插入DOM
                $dialog.appendTo(document.body);
            }
            //显示
            function _show(){
                //获取元素位置
                //显示浮动窗口
                var _offset = $follow.offset();
                var _dialogJSON = coordinate(_that,$dialog);//follow的元素
                var _optCss = {
                    width:_dialogJSON.w,
                    height:_dialogJSON.h
                };
                $triangle.attr("class", "ui-dailog-triangle " + _dialogJSON.className).css({
                    top:_dialogJSON.triangleTop,
                    left:_dialogJSON.triangleLeft
                });
                $dialog.css({
                    left:_dialogJSON.left,
                    top:_dialogJSON.top,
                    width:0,
                    height:0,
                    display:"block"
                }).animate(_optCss, 600);
            }
            //隐藏或者删除
            function _hideOrRemove(_lc){
                var _hideCss = {
                    display:"none",
                    width:$dialog.width(),
                    height:$dialog.height()
                };
                $dialog.animate({
                    width:0,
                    height:0
                }, 600, function () {
                    if( _lc === 0){
                        $dialog.css(_hideCss);
                    }else if(_lc === 1){
                        $dialog.empty().remove();
                        $follow.removeAttr("data-dialog");
                    }

                });
            }
            //事件注册
            function _eventHandle(){
                _init();
                //绑定事件
                var _t = option.event;
                if(_t === "hover" || _t === "focus"){
                    var _hideTimer = null;
                    var _showTimer = null;
//                    var _signal = -1;
                    //使用信号量、延时的方式处理浮动容器的消失问题
					$follow.bind({
						"mouseover": function(){
							clearTimeout(_hideTimer);
							_hideTimer =null;//?
							clearTimeout(_showTimer);
							_showTimer = setTimeout(function(){
								_show();
							},500);
						},
						"mouseout": function(){
							_hideTimer = setTimeout(function(){
                                _hideOrRemove(option.lifecycle);
                            },500);
						}
					});
                    $dialog.hover(function(){
//                        _signal = 0;
                        clearTimeout(_hideTimer);
                        _hideTimer =null;
                    },function(){
//                        _signal = -1;
                        $follow.trigger("mouseout");
                    });
//                    $(document).bind("click",function(){
//                        if(!$dialog.is(":hidden")&&_signal == -1){
//                            $follow.trigger("mouseout");
//                        }
//                    });
                }else {//click或者自定义函数
                    $follow.bind(_t,function(e){
                        _init();
                        if($dialog.is(":hidden")){
                            _show();
                        }else{
                            _hideOrRemove(option.lifecycle);
                        }
                    });
                }
            }
            //绑定事件
            _eventHandle();
        });
    };
    $.extend($.fn.dialog, {
        version: "1.0"
    });
})(jQuery);/*
 *作    者: 高娜
 *版    本: 1.3
 *完成时间: 2012-10-11
 *描    述: onscroll
 *关联文件: jQuery.js|jquery-ui.js
 */
(function($,undefined){
    /**
	* @class 滚动控制
    * @name onscroll
    * @description 滚动控制目标元素插件
	* @version 1.3
    */
	$.widget('ui.onscroll',
	/** @lends onscroll.prototype */
	{		
		options:{
			/**  
			* @name onscroll#scrollDir
			* @param {String}  字符串类型
			* @description 判断目标区域是否可如何滚动条滚动条可进入可视区域内，当值为y时表示只需要滚动y轴方向滚动条，当值为x时表示值需要滚动x轴方向滚动条，当值为xy时表示需要同时滚动x、y两个方向滚动条。
			* @default {String} 'x','y','xy'
			* @example
			* $('#scroll1').onscroll({
			*		scrollDir : 'y'
			*  });
			*/
			scrollDir : 'y' ,
			/**  
			* @name onscroll#inTar 
			* @param {Fn} 函数 
			* @description 进入目标区域内自定义方法
			* @default {Fn} function(){}
			* @example
			* $('#scroll1').onscroll({
			*		inTar: function(){alert("inTar")}
			*    });
			*/
 			 inTar : function(){} ,
			 /**  
			* @name onscroll#outTar 
			* @param {Fn} 函数 
			* @description 出目标区域内自定义方法
			* @default {Fn} function(){}
			* @example
			* $('#scroll1').onscroll({
			*		outTar: function(){alert("outTar")}
			*    });
			*/
 			 outTar : function(){} 
		},
		_create:function(){},
		_init:function(){
			var _self = this.element ;
			var o = this.options ;
			var innerTar = false ;
			var outerTar = false ;
			if(o.scrollDir == 'y'){
				var tarTop = parseInt(_self.offset().top) ;
				var tarBtm = parseInt(tarTop + _self.height()) ;
				$(document).scroll(function(){
					var bodyTop = parseInt($(document).scrollTop()) ;
					if((bodyTop >= tarTop)&&(bodyTop<=tarBtm)&&(!outerTar)){
						o.inTar() ;
						innerTar = true ;
						outerTar = true ;
					}else if(((bodyTop < tarTop)||(bodyTop > tarBtm))&&innerTar){
						o.outTar() ;
						innerTar = false ;
						outerTar = false ;
					}
				}) ;
			}else if(o.scrollDir == 'x'){
				var tarLeft = parseInt(_self.offset().left) ;
				var tarRight = parseInt(tarLeft + _self.width()) ;
				$(document).scroll(function(){
					var bodyLeft = parseInt($(document).scrollLeft()) ;
					if((bodyLeft >= tarLeft)&&(bodyLeft<=tarRight)&&(!outerTar)){
						o.inTar() ;
						innerTar = true ;
						outerTar = true ;
					}else if(((bodyLeft < tarLeft)||(bodyLeft > tarRight))&&innerTar){
						o.outTar() ;
						innerTar = false ;
						outerTar = false ;
					}
				}) ;
			}else if(o.scrollDir == 'xy'){
				var tarTop = parseInt(_self.offset().top) ;
				var tarBtm = parseInt(tarTop + _self.height()) ;
				var tarLeft = parseInt(_self.offset().left) ;
				var tarRight = parseInt(tarLeft + _self.width()) ;
				$(document).scroll(function(){
					var bodyTop = parseInt($(document).scrollTop()) ;
					var bodyLeft = parseInt($(document).scrollLeft()) ;
					if((bodyLeft >= tarLeft)&&(bodyLeft<=tarRight)&&(bodyTop >= tarTop)&&(bodyTop<=tarBtm)&&(!outerTar)){
						o.inTar() ;
						innerTar = true ;
						outerTar = true ;
					}else if(((bodyLeft < tarLeft)||(bodyLeft > tarRight)||(bodyTop < tarTop)||(bodyTop > tarBtm))&&innerTar){
						o.outTar() ;
						innerTar = false ;
						outerTar = false ;
					}
				}) ;
			}
		}
	});

	$.extend($.fn.onscroll, {
		version: "1.3"
	});

})(jQuery);/*
 *作    者: 高娜
 *版    本: 1.3
 *完成时间: 2012-10-16
 *描    述: carousel
 *关联文件: jQuery.js|jquery-ui.js
 */
(function($,undefined){
    /**
	* @class 图片旋转木马展示
    * @name carousel
    * @description 图片旋转木马效果
	* @version 1.3
    */
	$.widget('ui.carousel',
	/** @lends carousel.prototype */
	{		
		options:{
			/**  
			* @name carousel#wrapWid
			* @param {Number}  数字类型
			* @description 旋转图片展示区域外层宽度(设置宽度需要同时兼顾图片大小、目标相对于容器中心的环绕圆周位置)
			* @default {Number} 900
			* @example
			* $('.exampleObj').carousel({
			*		wrapWid : 900
			*  });
			*/
			wrapWid : 900 ,
			/**  
			* @name carousel#wrapHei
			* @param {Number}  数字类型
			* @description 旋转图片展示区域外层高度
			* @default {Number} 480
			* @example
			* $('.exampleObj').carousel({
			*		wrapHei : 480
			*  });
			*/
			wrapHei : 480 ,
			/**  
			* @name carousel#imgWid
			* @param {Number}  数字类型
			* @description 旋转图片的宽度（每个旋转图片的宽度一致）
			* @default {Number} 350
			* @example
			* $('.exampleObj').carousel({
			*		imgWid : 350
			*  });
			*/
			imgWid : 350 ,
			/**  
			* @name carousel#imgHei
			* @param {Number}  数字类型
			* @description 旋转图片的高度（每个旋转图片的高度一致）
			* @default {Number} 214
			* @example
			* $('.exampleObj').carousel({
			*		imgHei : 214
			*  });
			*/
			imgHei : 214 ,
			/**  
			* @name carousel#reflHeight
			* @param {Number}  数字类型
			* @description 设置图片的倒影高度
			* @default {Number} 0
			* @example
			* $('.exampleObj').carousel({
			*		reflHeight : 0
			*  });
			*/
			reflHeight : 0 ,
			/**  
			* @name carousel#reflOpacity
			* @param {Number}  数字类型
			* @description 指定倒影的透明度
			* @default {Number} 0.5
			* @example
			* $('.exampleObj').carousel({
			*		reflOpacity : 0.5
			*  });
			*/
			reflOpacity : 0.5,
			/**  
			* @name carousel#reflGap
			* @param {Number}  数字类型
			* @description 图片和倒影之间的垂直间隔
			* @default {Number} 0
			* @example
			* $('.exampleObj').carousel({
			*		reflGap : 0
			*  });
			*/
			reflGap : 0,
			/**  
			* @name carousel#minScale
			* @param {Number}  数字类型
			* @description 应用到最远项的最小刻度，正面项的刻度是1
			* @default {Number} 0.5
			* @example
			* $('.exampleObj').carousel({
			*		minScale : 0.5
			*  });
			*/
			minScale : 0.5,
			/**  
			* @name carousel#xPos
			* @param {Number}  数字类型
			* @description 相对于容器中心的环绕圆周水平位置
			* @default {Number} 0
			* @example
			* $('.exampleObj').carousel({
			*		xPos : 0
			*  });
			*/
			xPos : 0,
			/**  
			* @name carousel#yPos
			* @param {Number}  数字类型
			* @description 相对于容器中心的环绕圆周垂直位置
			* @default {Number} 0
			* @example
			* $('.exampleObj').carousel({
			*		yPos : 0
			*  });
			*/
			yPos : 0,
			/**  
			* @name carousel#xRadius
			* @param {Number}  数字类型
			* @description 水平图片环绕的半径
			* @default {Number} 0
			* @example
			* $('.exampleObj').carousel({
			*		xRadius : 0
			*  });
			*/
			xRadius : 0,
			/**  
			* @name carousel#yRadius
			* @param {Number}  数字类型
			* @description 垂直图片环绕的半径,你可以修改这个值来调整环绕的倾斜程度。
			* @default {Number} 0
			* @example
			* $('.exampleObj').carousel({
			*		yRadius : 0
			*  });
			*/
			yRadius : 0,
			/**  
			* @name carousel#altBox
			* @param {String}  字符串类型
			* @description 当鼠标悬浮在某个图片上时，显示img元素的alt属性值的标签元素
			* @default {String} null
			* @example
			* $('.exampleObj').carousel({
			*		altBox : null
			*  });
			*/
			altBox : null,
			/**  
			* @name carousel#titleBox
			* @param {String}  字符串类型
			* @description 当鼠标悬浮在某个图片上时，显示img元素的title属性值的标签元素
			* @default {String} null
			* @example
			* $('.exampleObj').carousel({
			*		titleBox : null
			*  });
			*/
			titleBox : null,
			/**  
			* @name carousel#buttonLeft
			* @param {Object}  对象类型
			* @description 向左旋转按钮对象(如果需要按钮控制，必须指定到相应的目标对象,否则失去点击按钮触发旋转功能)
			* @default {Object} null
			* @example
			* $('.exampleObj').carousel({
			*		buttonLeft : null
			*  });
			*/
			buttonLeft : null,
			/**  
			* @name carousel#buttonRight
			* @param {Object}  对象类型
			* @description 向右旋转按钮对象(如果需要按钮控制，必须指定到相应的目标对象,否则失去点击按钮触发旋转功能)
			* @default {Object} null
			* @example
			* $('.exampleObj').carousel({
			*		buttonRight : null
			*  });
			*/
			buttonRight : null,
			/**  
			* @name carousel#autoRotate
			* @param {String}  字符串类型
			* @description 设置自动旋转方向，设置为'left'，则自动向左转动。设置为'right'，则自动向右转动，设置为'no'（默认），则不自动转动。
			* @default {String} 'no'
			* @example
			* $('.exampleObj').carousel({
			*		autoRotate : 'no'
			*  });
			*/
			autoRotate : 'no',
			/**  
			* @name carousel#autoRotateDelay
			* @param {Number}  数字类型
			* @description 自动转动的间隔时间
			* @default {Number} 1500
			* @example
			* $('.exampleObj').carousel({
			*		autoRotateDelay : 1500
			*  });
			*/
			autoRotateDelay : 1500,
			/**  
			* @name carousel#speed
			* @param {Number}  数字类型
			* @description 调整转动速度，设置为0不转动，设置为1则没有转动效果，立即切换到最终效果。
			* @default {Number} 0.2
			* @example
			* $('.exampleObj').carousel({
			*		speed : 0.2
			*  });
			*/
			speed : 0.2,
			/**  
			* @name carousel#mouseWheel
			* @param {Boolean}  布尔类型
			* @description 是否启动滚轮操作控制旋转
			* @default {Boolean} false
			* @example
			* $('.exampleObj').carousel({
			*		mouseWheel : false
			*  });
			*/
			mouseWheel : false,
			/**  
			* @name carousel#bringToFront
			* @param {Boolean}  布尔类型
			* @description 是否启用点击某张图片，该图片转动到图片正面
			* @default {Boolean} false
			* @example
			* $('.exampleObj').carousel({
			*		bringToFront : false
			*  });
			*/
			bringToFront : false,
			 /**  
			* @name carousel#imgClick 
			* @param {Fn} 函数 
			* @description 点击滚动图片时触发自定义点击事件
			* @default {Fn} function(){}
			* @example
			* $('.exampleObj').carousel({
			*		imgClick: function(){alert("click")}
			*    });
			*/
 			 imgClick : function(){} 
		},
		_create:function(){
			var _self = this.element ;
			var o = this.options ;
			_self.width(o.wrapWid+'px').height(o.wrapHei+'px') ;
			_self.find('img').width(o.imgWid+'px').height(o.imgHei+'px') ;
			_self.data(_self,new Controller(_self,$(_self.find('img'),_self),o)) ;			
		},
		_init:function(){
			var _self = this.element ;
			var o = this.options ;
			_self.find('img').click(function(){
				o.imgClick() ;
			}) ;
		},
		/**
		* @description 清除图片旋转木马效果
		* @return {carousel} carousel对象
		* @example
		* $("#testExpObj").carousel('destroy');
		*/
		destroy : function(){
			var _self = this.element ;
			var o = this.options ;
			if(_self.find('#carouselWrap')){
				var _html = $('#carouselWrap').html() ;
				_self.html(_html) ;
				if(_self.find('canvas')){
					$('canvas').remove() ;
				}
				var _imgList  = _self.find('img') ;
				var len = _imgList.length ;
				for(var i=0; i<len; i++){
					_imgList.attr('style','').width(o.imgWid).height(o.imgHei) ;
				}
			}
		}
	});
	// START Reflection object.
	// Creates a reflection for underneath an image.
	// IE uses an image with IE specific filter properties, other browsers use the Canvas tag.	
	// The position and size of the reflection gets updated by updateAll() in Controller.
	function Reflection(img, reflHeight, opacity){
		var	reflection, cntx, imageWidth = img.width, imageHeight = img.width, gradient, parent ;	
		parent = $(img.parentNode) ;
		this.element = reflection = parent.append("<canvas class='reflection' style='position:absolute'/>").find(':last')[0] ;
        if (!reflection.getContext && $.browser.msie){
			this.element = reflection = parent.append("<img class='reflection' style='position:absolute'/>").find(':last')[0] ;					
			reflection.src = img.src ;			
			reflection.style.filter = "flipv progid:DXImageTransform.Microsoft.Alpha(opacity=" + (opacity * 100) + ", style=1, finishOpacity=0, startx=0, starty=0, finishx=0, finishy=" + (reflHeight / imageHeight * 100) + ")" ;				
        }else{		
			cntx = reflection.getContext("2d") ;
			try{
				$(reflection).attr({width: imageWidth, height: reflHeight}) ;
				cntx.save() ;
				cntx.translate(0, imageHeight-1) ;
				cntx.scale(1, -1) ;				
				cntx.drawImage(img, 0, 0, imageWidth, imageHeight) ;				
				cntx.restore() ;
				cntx.globalCompositeOperation = "destination-out" ;
				gradient = cntx.createLinearGradient(0, 0, 0, reflHeight) ;
				gradient.addColorStop(0,"rgba(255, 255, 255," + (1 - opacity) + ")") ;
				gradient.addColorStop(1,"rgba(255, 255, 255, 1.0)") ;
				cntx.fillStyle = gradient ;
				cntx.fillRect(0, 0, imageWidth, reflHeight) ;				
			}catch(e){			
				return ;
			}		
		}
		// Store a copy of the alt and title attrs into the reflection
		$(reflection).attr({'alt': $(img).attr('alt'),title: $(img).attr('title')}) ;				
	}	//END Reflection object

	// START Item object.
	// A wrapper object for items within the carousel.
	var	Item = function(imgIn,options){
		this.orgWidth = imgIn.width ;			
		this.orgHeight = imgIn.height ;		
		this.image = imgIn ;
		this.reflection = null ;					
		this.alt = imgIn.alt ;
		this.title = imgIn.title ;
		this.imageOK = false ;		
		this.options = options ;
		this.imageOK = true ;
		if(this.options.reflHeight > 0){													
			this.reflection = new Reflection(this.image, this.options.reflHeight, this.options.reflOpacity) ;					
		}
		$(this.image).css('position','absolute') ;	// Bizarre. This seems to reset image width to 0 on webkit!					
	};// END Item object
	
	// Controller object.
	// This handles moving all the items, dealing with mouse clicks etc.
	var Controller = function(container, images, options){
		var	items = [], funcSin = Math.sin, funcCos = Math.cos, ctx=this ;
		this.controlTimer = 0 ;
		this.stopped = false ;
		//this.imagesLoaded = 0;
		this.container = container ;
		this.xRadius = options.xRadius ;
		this.yRadius = options.yRadius ;
		this.showFrontTextTimer = 0 ;
		this.autoRotateTimer = 0 ;
		
		if(options.xRadius === 0){
			this.xRadius = ($(container).width()/2.3) ;
		}
		if(options.yRadius === 0){
			this.yRadius = ($(container).height()/6) ;
		}
		
		this.xCentre = options.xPos ;
		this.yCentre = options.yPos ;
		this.frontIndex = 0 ;	// Index of the item at the front
		
		// Start with the first item at the front.
		this.rotation = this.destRotation = Math.PI/2 ;
		this.timeDelay = 1000/options.FPS ;
		
		// Turn on the infoBox
		if(options.altBox !== null){
			$(options.altBox).css('display','block') ;
			$(options.titleBox).css('display','block') ;
		}
		// Turn on relative position for container to allow absolutely positioned elements
		// within it to work.
		$(container).css({position:'relative',overflow:'hidden'}) ;
		
		$(options.buttonLeft).css('display','inline') ;
		$(options.buttonRight).css('display','inline') ;
		
		// Setup the buttons.
		$(options.buttonLeft).bind('mouseup',this,function(event){
			event.data.rotate(-1) ;
			return false ;
		}) ;
		$(options.buttonRight).bind('mouseup',this,function(event){
			event.data.rotate(1) ;
			return false ;
		}) ;
		if('ontouchstart' in document.documentElement){
			$(container).bind('touchstart',this,function(event){		
				clearInterval(event.data.autoRotateTimer) ;// Stop auto rotation if mouse over.
				var text = $(event.target).attr('alt') ;
				if(text !== undefined && text !== null){
					clearTimeout(event.data.showFrontTextTimer) ;
					$(options.altBox).html($(event.target).attr('alt')) ;
					$(options.titleBox).html($(event.target).attr('title')) ;
					if(options.bringToFront && event.type == 'click'){
						var idx = $(event.target).data('itemIndex') ;
						var frontIndex = event.data.frontIndex ;
						var diff = (idx - frontIndex)%images.length ;
						if(Math.abs(diff) > images.length/2){
							diff += (diff > 0 ? -images.length : images.length) ;
						}
						event.data.rotate(-diff) ;
					}
				}
			}) ;
			$(container).bind('touchend',this,function(event){
				var	context = event.data ;				
				clearTimeout(context.showFrontTextTimer) ;				
				context.showFrontTextTimer = setTimeout(function(){
					context.showFrontText() ;
				},1000);
				context.autoRotate();	// Start auto rotation.
			});
		}else{
			if(options.mouseWheel){
				$(container).bind('mousewheel',this,function(event,delta){
					event.data.rotate(delta) ;
					return false ;
				}) ;
			}
			$(container).bind('mouseover click',this,function(event){
				clearInterval(event.data.autoRotateTimer) ;// Stop auto rotation if mouse over.
				var text = $(event.target).attr('alt') ;
				if(text !== undefined && text !== null){
					clearTimeout(event.data.showFrontTextTimer) ;
					$(options.altBox).html($(event.target).attr('alt')) ;
					$(options.titleBox).html($(event.target).attr('title')) ;
					if(options.bringToFront && event.type == 'click'){
						var idx = $(event.target).data('itemIndex') ;
						var frontIndex = event.data.frontIndex ;
						var diff = (idx - frontIndex)%images.length ;
						if(Math.abs(diff) > images.length/2){
							diff += (diff > 0 ? -images.length : images.length) ;
						}
						event.data.rotate(-diff) ;
					}				
				}
			}) ;
			$(container).bind('mouseout',this,function(event){
				var	context = event.data ;				
				clearTimeout(context.showFrontTextTimer) ;				
				context.showFrontTextTimer = setTimeout(function(){
					context.showFrontText() ;
				},1000);
				context.autoRotate();	// Start auto rotation.
			});
		}
		$(container).bind('mousedown',this,function(event){				
			event.data.container.focus() ;
			return false ;
		});
		container.onselectstart = function(){ 
			return false ; 
		} ;	
		this.innerWrapper = $(container).wrapInner('<div style="position:absolute;width:100%;height:100%;" id="carouselWrap"/>').children()[0] ;
		
		// Shows the text from the front most item.
		this.showFrontText = function(){
			if(this.frontIndex < 0){
				this.frontIndex = images.length - 1;
			}	
			if(items[this.frontIndex] === undefined){return ;}	// Images might not have loaded yet.
			$(options.titleBox).html($(items[this.frontIndex].image).attr('title')) ;
			$(options.altBox).html($(items[this.frontIndex].image).attr('alt')) ;				
		};
		this.go = function(){	
			if(this.controlTimer !== 0){
				return ;
			}
			var	context = this ;
			this.controlTimer = setTimeout(function(){
				context.updateAll() ;
			},this.timeDelay) ;					
		};
		
		this.stop = function(){
			clearTimeout(this.controlTimer) ;
			this.controlTimer = 0 ;				
		};
		
		// Starts the rotation of the carousel. Direction is the number (+-) of carousel items to rotate by.
		this.rotate = function(direction){
			this.frontIndex -= direction ;
			this.frontIndex %= items.length ;			 			
			this.destRotation += (Math.PI / items.length) * (2*direction) ;
			this.showFrontText();
			this.go();			
		};
		this.autoRotate = function(){
			if(options.autoRotate !== 'no'){
				var	dir = (options.autoRotate === 'right') ? 1 : -1 ;
				this.autoRotateTimer = setInterval(function(){
					ctx.rotate(dir) ; 
				},options.autoRotateDelay) ;
			}
		};
		
		// This is the main loop function that moves everything.
		this.updateAll = function(){	
			var	minScale = options.minScale ;	// This is the smallest scale applied to the furthest item.
			var smallRange = (1-minScale) * 0.5 ;
			var	w,h,x,y,scale,item,sinVal ;
						
			var	change = (this.destRotation - this.rotation) ;				
			var	absChange = Math.abs(change) ;
	
			this.rotation += change * options.speed ;
			if (absChange < 0.001){ 
				this.rotation = this.destRotation ; 
			}			
			var	itemsLen = items.length ;
			var	spacing = (Math.PI / itemsLen) * 2 ; 
			//var wrapStyle = null;
			var	radians = this.rotation ;
			var	isMSIE = $.browser.msie ;
		
			// Turn off display. 
			this.innerWrapper.style.display = 'none' ;				
			var	style ;
			var	px = 'px', reflHeight ;	
			var context = this ;
			for(var i = 0; i<itemsLen ;i++){
				item = items[i] ;								
				sinVal = funcSin(radians) ;				
				scale = ((sinVal+1) * smallRange) + minScale ;				
				x = this.xCentre + (((funcCos(radians) * this.xRadius) - (item.orgWidth*0.5)) * scale) ;
				y = this.yCentre + (((sinVal * this.yRadius)) * scale) ;		
				if(item.imageOK){
					var	img = item.image ;
					w = img.width = item.orgWidth * scale ;					
					h = img.height = item.orgHeight * scale ;
					img.style.left = x + px ;
					img.style.top = y + px ;
					img.style.zIndex = "" + (scale * 100)>>0 ;	// >>0 = Math.foor(). Firefox doesn't like fractional decimals in z-index.
					if(item.reflection !== null){																										
						reflHeight = options.reflHeight * scale ;						
						style = item.reflection.element.style ;
						style.left = x + px ;
						style.top = y + h + options.reflGap * scale + px ;
						style.width = w + px ;								
						if(isMSIE){				
							style.filter.finishy = (reflHeight / h * 100) ;				
						}else{				
							style.height = reflHeight + px ;															
						}																													
					}					
				}
				radians += spacing ;
			}
			// Turn display back on.					
			this.innerWrapper.style.display = 'block' ;
			// If we have a preceptable change in rotation then loop again next frame.
			if(absChange >= 0.001){				
				this.controlTimer = setTimeout(function(){
					context.updateAll() ;
				},this.timeDelay) ;		
			}else{
				// Otherwise just stop completely.				
				this.stop() ;
			}
		}; // END updateAll
		// Create an Item object for each image	
		//func = function(){return;ctx.updateAll();} ;

		// Check if images have loaded. We need valid widths and heights for the reflections.
		this.checkImagesLoaded = function(){
			var	i ;
			for(i=0;i<images.length;i++){
				if((images[i].width === undefined) || ( (images[i].complete !== undefined) && (!images[i].complete))){
					return ;					
				}				
			}
			for(i=0;i<images.length;i++){	
				 items.push(new Item(images[i], options)) ;	
				 $(images[i]).data('itemIndex',i) ;
			}
			// If all images have valid widths and heights, we can stop checking.			
			clearInterval(this.tt) ;
			this.showFrontText() ;
			this.autoRotate() ;	
			this.updateAll() ;			
		};

		this.tt = setInterval(function(){
			ctx.checkImagesLoaded() ;
		},50);
	} ;
	
	//mousewheel widget start
	var types = ['DOMMouseScroll', 'mousewheel'] ;
	$.event.special.mousewheel = {
		setup : function(){
			if(this.addEventListener){
				for(var i=types.length; i;){
					this.addEventListener(types[--i], handler, false) ;
				}
			}else{
				this.onmousewheel = handler ;
			}
		},		
		teardown : function(){
			if (this.removeEventListener){
				for(var i=types.length; i;){
					this.removeEventListener(types[--i], handler, false) ;
				}
			}else{
				this.onmousewheel = null ;
			}
		}
	};	
	$.fn.extend({
		mousewheel : function(fn){
			return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel") ;
		},		
		unmousewheel: function(fn){
			return this.unbind("mousewheel", fn) ;
		}
	});	
	function handler(event){
		var args = [].slice.call( arguments, 1 ), delta = 0, returnValue = true ;		
		event = $.event.fix(event || window.event) ;
		event.type = "mousewheel" ;
		
		if (event.wheelDelta){delta = event.wheelDelta/120 ;}
		if (event.detail){delta = -event.detail/3 ;}		
		// Add events and delta to the front of the arguments
		args.unshift(event, delta) ;	
		return $.event.handle.apply(this, args);
	}
	//mousewheel widget end

	$.extend($.fn.carousel, {
		version: "1.3"
	});
	
})(jQuery);/*
 *作    者: 张文钦
 *版    本: 1.3
 *完成时间: 2012-10-19
 *描    述: lazyImage
 *关联文件: jQuery.js|jquery-ui.js
 */
(function($, undefined) {
  /**
    * @class 内容懒加载
    * @name lazyContent
    * @description 内容懒加载
    * @version 1.3
    */
  $.widget('ui.lazyImage', {
    /** @lends lazyImage.prototype */
    options: {
      /**
       * @name lazyImage#isCtx
       * @param {Boolean} true 表示只处理当前上下文下的符合条件的img
       * @description 是否只处理当前上下文下的符合条件的img
       * @default true
       * @example
       * $('#lazyContent').lazyContent();
       */
      isCtx: true,
      /**
       * @name lazyImage#isHungry
       * @param {Boolean} true 表示急切的在初始化时就绑定事件
       * @description 是否急切的在初始化时就绑定事件
       * @default true
       * @example
       * $('#lazyContent').lazyContent();
       */
      isHungry: true,
      /**
       * @name lazyImage#lazyAttr
       * @param {String} true 懒加载的属性标识
       * @description 懒加载的属性标识 需要在构建结构时添加
       * @default 'data-lazyImg'
       * @example
       * $('#lazyContent').lazyContent();
       * TODO: 初始化时确保值合法
       */
      lazyAttr: 'data-lazyImg',
      /**
       * @private
       * @name lazyImage#_$imgCon
       * @param {Object} 待加载图片的jQuery对象
       * @description 待加载图片的jQuery对象
       * @default null
       */
      _$imgCon: null,
      /**
       * @name lazyImage#placeHolder
       * @param {Object} 给待加载图片家的站位图片
       * @description 给待加载图片家的站位图片
       * @default '/images/blank.gif'
       */
      placeHolder: '/images/blank.gif'
    },
    _create: function() {
      var $context = this.element;
      var o = this.options;
      if (o.isCtx) {
        o._$imgCon = $('img[' + o.lazyAttr + '="true"]', $context);
      } else {
        o._$imgCon = $('img[' + o.lazyAttr + '="true"]');
      }
      //添加站位图片
      o._$imgCon.attr('src', o.placeHolder);
      // 获取坐标
      o._coordinate = function($el) {
        var coordinate = {
          width: $el.width(),
          height: $el.height()
        };
        if ('setInterval' in $el[0]) {
          //window is the logic suitable?
          coordinate.top = $el.scrollTop();
          coordinate.left = $el.scrollLeft();
        } else {
          var offset = $el.offset();
          coordinate.top = offset.top + $el.scrollTop();
          coordinate.left = offset.left + $el.scrollLeft();
        }
        return coordinate;
      };
      //判断是否相交 在可视区内
      o._isCut = function(cc, ic) {
        var cx = cc.left + cc.width;
        var cy = cc.top + cc.height;
        var ix = ic.left + ic.width;
        var iy = ic.top + ic.height;

        return cx > ic.left && cy > ic.top;
      };
      o._lazyImage = function() {
        var $window = $(window);
        var $toLoad = o._$imgCon.filter('[' + o.lazyAttr + '="true"]');
        var cc = o._coordinate($window);
        $toLoad.each(function(index, item) {
          var $img = $(this);
          var ic = o._coordinate($img);
          if (o._isCut(cc, ic)) {
            //没有做出错处理
            //1. 使用(new Image()).src = $img.attr('data-original');load 触发替换
            $img.attr('src', $img.attr('data-original'))
                .attr(o.lazyAttr, 'loaded');
          }
        });
      };
    },
    _init: function() {
      if (this.options.isHungry) {
        this.load();
      }
    },
    /**
     * @name lazyImage#load
     * @param {Function} 手动触发绑定加载图片事件
     * @description 手动触发绑定加载图片事件
     * @example
     * $('#lazyImage').lazyImage('load');
     */
    load: function() {
      var o = this.options;
      o._lazyImage();
      $(window).bind('scroll resize', $.proxy(o._lazyImage, o));
    },
    show: function() {},
    hide: function() {},
    enable: function() {},
    disable: function() {},
    destroy: function() {}
  });
  $.extend($.ui.lazyImage, {
    version: '1.3'
  });
})(jQuery);
/*
 *作    者: 张文钦
 *版    本: 1.3
 *完成时间: 2012-10-19
 *描    述: lazyContent
 *关联文件: jQuery.js|jquery-ui.js
 */
(function($, undefined) {
  /**
    * @class 内容懒加载
    * @name lazyContent
    * @description 内容懒加载
    * @version 1.3
    */
  $.widget('ui.lazyContent', {
    // options如何覆写
    // $('selector').lazyContent({});//此时覆写options并进行初始化
    // $('selector').lazyContent('show');//调用方法接口
    /** @lends lazyContent.prototype */
    options: {
      /**
       * @name lazyContent#mode
       * @param {Enum} 1:多个平行区;0:多个导航 1个显示区容器
       * @description 导航和内容的显示类型
       * @default '1' 表示多个平行区 类似于工作台面板及内容
       * @example
       * $('#lazyContent').lazyContent();
       */
      mode: '1',
      /**
       * @name lazyContent#el
       * @param {String} css 选择器或者对应jQuery对象
       * @description 待加载所需参数存放的位置上下文
       * @default ""
       * @example
       * $('#lazyContent').lazyContent({el: '.item_con'});
       */
      el: '',
      /**
       * @name lazyContent#dataTmpl
       * @param {String} 存放返回数据的容器元素的结构
       * @description 存放返回数据的容器元素的结构
       * @default '<div />'
       * @example
       * $('#lazyContent').lazyContent({dataTmpl: '<div />'});
       */
      dataTmpl: '<div />',
      /**
       * @name lazyContent#dataTmpl
       * @param {String} css 选择器 存放请求数据的所需参数的元素
       * @description 存放请求数据的所需参数的元素
       * @default ''
       * @example
       * $('#lazyContent').lazyContent({dataElem: ''});
       */
      dataElem: '',
      /**
       * @name lazyContent#dataType
       * @param {String} $.get异步请求返回数据类型 默认值为'html'
       * @description $.get异步请求返回数据类型
       * @default 'html'
       * @example
       * $('#lazyContent').lazyContent({dataType: 'json'});
       */
      dataType: 'html',
      /**
       * @name lazyContent#dataType
       * @param {String} 是否自行渲染的标识 auto 插件利用默认方式进行 此时 dataType为默认值 hand 手动渲染
       * @description 是否自行渲染的标识
       * @default 'html'
       * @example
       * $('#lazyContent').lazyContent({dataType: 'json'});
       */
      renderType: 'auto',
      /**
       * @name lazyContent#dataType
       * @param {Function} 自定义渲染函数 注意:返回值应是html的合法字符串
       * @description 自定义渲染函数
       * @default function(data) {}
       * @example
       * $('#lazyContent').lazyContent({render: function(data) { return 'string';}});
       */
      render: function(data) {},
      /**
       * @name lazyContent#timeout
       * @param {Number} 延迟加载的毫秒数
       * @description 延迟加载的毫秒数
       * @default 350
       * @example
       * $('#lazyContent').lazyContent({timeout: 350});
       */
      timeout: 350,
      /**
       * @name lazyContent#loading
       * @param {String} 加载中图标的路径
       * @description 加载中图标的路径
       * @default '/javascripts/loading.gif'
       * @example
       * $('#lazyContent').lazyContent({loading: 'path/to/loading pic'});
       */
      loading: '/javascripts/loading.gif',
      /**
       * @name lazyContent#event
       * @param {String} 触发加载内容的事件
       * @description 触发加载内容的事件
       * @default 'click'
       * @example
       * $('#lazyContent').lazyContent({event: 'click'});
       */
      event: 'click'
    },
    _create: function() {
      // this widget第二个参数对象
      // this.element执行当前作用对象的jquery对象
      // var o = this.options;
      // var self = this.element;
    },
    _init: function() {
      var $context = this.element;
      var option = this.options;
      var $el = option.el;
      var dataHolder = option.dataElem;
      var mode = option.mode;
      var $dataHolder;
      var timeout = null;
      var loadFlag;
      (new Image()).src = option.loading;
      // http://www.cnblogs.com/rubylouvre/archive/2012/08/29/2657183.html
      var $loading = $('<img alt="加载中..." data-placeHolder="loading"/>')
                      .attr('src', option.loading);
      if (mode === '0') { // 多个导航 1个显示区域
        if (!($el instanceof jQuery)) {
          $el = $($el);
        }
        // 如果当前已是选中 则不再进行处理
        // 防止重复调用
        // $context.data('stats', 'completed'); // 只使用第一次绑定
        // 后面的覆盖前面的
        $context.unbind(option.event).delegate(dataHolder, option.event,
          function(event) {
            clearTimeout(timeout);
            $dataHolder = $(event.target).closest(dataHolder);
            //客户端数据的保存方式.TODO
            // 1. 直接通过属性的方式存储在dom节点上
            // 2. 使用jQuery data存储
            // 3.
            loadFlag = $dataHolder.attr('data-load');
            if (loadFlag) {
              $el.find('#' + $dataHolder.attr('data-item')).show()
                  .siblings().hide();
            } else {
              var url = $dataHolder.attr('data-url');
              var param = $dataHolder.attr('data-param');
              $loading.appendTo($el);
              timeout = setTimeout(function() {
                $.get(url, 'dataType=' + param, function(data) {
                  $el.find('img[data-placeHolder="loading"]').remove();
                  var id = 'item_' + (new Date()).getTime();
                  var renderHtml = data;
                  if (option.renderType === 'hand') {
                    renderHtml = option.render(data);
                  }
                  $(option.dataTmpl).html(renderHtml)
                    .attr('id', id).appendTo($el).show()
                    .siblings().hide();
                  $dataHolder.attr('data-item', id)
                              .attr('data-load', 'loaded');
                }, option.dataType);
              }, option.timeout);
            }
          }
        );
      } else {
        $context.unbind(option.event).bind(option.event, function(event) {
          loadFlag = $context.attr('data-load');
          if (loadFlag) {
            return;
          }
          clearTimeout(timeout);
          var url = $context.attr('data-url');
          var param = $context.attr('data-param');
          var $contextHolder = $context.find(option.el);
          $loading.appendTo($contextHolder);
          timeout = setTimeout(function() {
            $.get(url, 'dataType=' + param, function(data) {
              $contextHolder.find('img[data-placeHolder="loading"]').remove();
              var id = 'item_' + (new Date()).getTime();
              var renderHtml = data;
              if (option.renderType === 'hand') {
                renderHtml = option.render(data);
              }
              $(option.dataTmpl).html(renderHtml)
                .attr('id', id).appendTo($contextHolder).show()
                .siblings().hide();
              $context.attr('data-item', id)
                          .attr('data-load', 'loaded');
            }, option.dataType);
          }, option.timeout);
        });
      }
    },
    show: function() {
      //方法默认返回this
      // 调用 $('selector').lazyContent('show');
    },
    hide: function() {},
    enable: function() {},
    disable: function() {},
    destroy: function() {}
  });
  $.extend($.ui.lazyContent, {
    version: '1.3'
  });
})(jQuery);
/*
 *作    者: 黄卉
 *版    本: 1.3
 *完成时间: 2012-10-10
 *描    述: minScrollbar
 *关联文件: jQuery.js|jquery-ui.js
 * @modify 2012-11-15 添加功能移动时鼠标移开仍然可以移动滚动条 
 */
(function($,undefined){
    /**
	* @class 自定义滚动条插件
    * @name minScrollbar
    * @description 自定义滚动条插件
	* @version 1.3
    */
	$.widget("ui.minScrollbar",
	/** @lends minScrollbar.prototype */
	{
		 options:{
			 hScroll: true,     //x横向horizontal滚动默认为true  ， false 禁用横向滚动
			 vScroll: true,     //y垂直vertical滚动默认为true ， false 禁用垂直滚动
			 height:'10px',   //当hScroll为true时，滚动条的高度 5-20
 			 width:'10px',   //当vScroll为true时，滚动条的宽度 5-20
			 bgColor:'#000' ,  //滚动条的背景色
			 viewHeight:'200px',  //可视区域的高度值，默认为200px
			 viewWidth:'200px'  //可视区域的宽度值，默认为200px
		 },
		 _create:function(){
			 var o = this.options;
			 if(!o.hScroll && !o.vScroll){
				return false;
			 }
			 var $target = this.element,
				$view = $("<div class='ui-minScrollbar-viewable'/>"),
				$vScrollbar = $("<div class='ui-minScrollbar-vertical'><div class='ui-vScroll'></div></div>"),
				$hScrollbar = $("<div class='ui-minScrollbar-horizontal'><div class='ui-hScroll'></div></div>"),
			    hasTouch = ('ontouchstart' in window),
				maxScrollX,maxScrollY;//计算最大滚动条区域
			$target.attr('data-destroy','true');
			$target.wrap($view).addClass('ui-minScrollbar');
			$view.css({'height':o.viewHeight,'width':o.viewWidth});	
			if(o.hScroll){
				$target.parent().append($hScrollbar);
				var $hScroll = $hScrollbar.find('div.ui-hScroll'),
					vW = parseFloat(o.viewWidth),//可是区域的高度
					tW = $target.width(), //内容高度
					scorllW = Math.round(vW*vW/tW);  //*竖直滚动条的长度*/	
				if(hasTouch){
					maxScrollX = tW-vH;
					nX = (vW-scorllW-2)/maxScrollX;
				}else{
					maxScrollX = vW-scorllW-2;
					nX = (tW-vW)/maxScrollX;
				}	
				$hScroll.attr({'maxScrollX':maxScrollX,'nX':nX}).css('cursor','pointer');
			}
			if(o.vScroll){
				$target.parent().append($vScrollbar);
				var $vScroll = $vScrollbar.find('div.ui-vScroll'),
					vH = parseFloat(o.viewHeight),//可是区域的高度
					tH = $target.height(), //内容高度
					scorllH = Math.round(vH*vH/tH); //*垂直滚动条的长度*/
				if(hasTouch){
					maxScrollY = tH-vH;
					nY = (vH-scorllH-2)/maxScrollY;
				}else{
					maxScrollY = vH-scorllH-2;
					nY = (tH-vH)/maxScrollY;
				}
				$vScroll.attr({'maxScrollY':maxScrollY,'nY':nY}).css('cursor','pointer');
			}
			this._eventListener($target,$hScroll,$vScroll,o);
			
			//计时器，当$view的高度发生变化时
			var timer = setInterval(function(){timerFn();},300);	
			
			//计时器执行的方法。
			function timerFn(){
				var $hScrollbar = $target.parent().find('div.ui-minScrollbar-horizontal');
				var $vScrollbar = $target.parent().find('div.ui-minScrollbar-vertical');
				if($hScrollbar.length==0 && $vScrollbar.length==0){//滚动条不存在时，清空计时器
					clearTimeout(timer);
				}else{
					if($hScrollbar.length!=0){modifyHScroll();}
					if($vScrollbar.length!=0){modifyVScroll();}	
				} 
			}
			
			//定时器修改水平方向滚动条
			function modifyHScroll(){
				if(o.hScroll){
					//判断可视区域和滚动内容width是否变化
					var newVW =$target.parent().width(),newTW = $target.width();
					if(newVW==vW &&newTW==tW){return;}
					else{vW = newVW;tW =newTW ;}
					//重新计算滚动条width
					scorllW = (vW*vW/tW);
					//修改n值，即滚动条与滚动区域的比例值，滚动条滚动1一个单位值时div需要滚动条多远
					if(hasTouch){
						maxScrollX = tW-vW;
						nX = (vW-scorllW-2)/maxScrollX; 
					}else{
						maxScrollX = vW-scorllW-2;
						nX = (tW-vW)/maxScrollX;
					}
					$hScroll.attr({'maxScrollX':maxScrollX,'nX':nX});
					//当$view的高度大于target的高度时，隐藏滚动条。
					if(scorllW<vW){$hScroll.css('display','block');}
					else{$hScroll.css('display','none');}	
					//target在最右边时，需要向右移动。
					var tLeft = parseFloat($target.css('left'));
					var _tw = tW + tLeft;
					if(_tw<vW &&scorllW<vW){
						var newLeft = tLeft + (vW-_tw);
						$target.css('left',newLeft+'px');
					}
					//scroll在最右边时，需要向左边移动
					var sLeft = parseFloat($hScroll.css('left'));
					var _sw = scorllW + sLeft;
					if(_sw>vW){
						var newScrollLeft = sLeft - (_sw-vW+2);
						$hScroll.css('left',newScrollLeft+'px');
					}
					//修改滚动条的高度值
					$hScroll.width(scorllW).parent().width(vW);
				}
			}
			//定时器修改垂直方向滚动条
			function modifyVScroll(){
				if(o.vScroll){
					//判断可视区域和滚动内容height是否变化
					var newVH =$target.parent().height(),newTH = $target.height();
					if(newVH==vH &&newTH ==tH){return;}
					else{vH = newVH;tH = newTH;}
					scorllH = (vH*vH/tH);
					//修改n值，即滚动条与滚动区域的比例值，滚动条滚动1一个单位值时div需要滚动条多远
					if(hasTouch){
						maxScrollY = tH-vH;
						nY = (vH-scorllH-2)/maxScrollY;
					}else{
						maxScrollY = vH-scorllH-2;
						nY = (tH-vH)/maxScrollY;
					}
					$vScroll.attr({'maxScrollY':maxScrollY,'nY':nY});
					//当$view的高度大于target的高度时，隐藏滚动条。
					if(scorllH<vH){$vScroll.css('display','block');}
					else{$vScroll.css('display','none');}	
					//target在最下面时，需要向下移动。
					var tTop = parseFloat($target.css('top'));
					var _th = tH + tTop;
					if(_th<vH && scorllH<vH){
						var newTop = tTop + (vH-_th);
						$target.css('top',newTop+'px');
					}
					//scroll在最下面时，需要向上移动
					var sTop = parseFloat($vScroll.css('top'));
					var _sh = scorllH + sTop;
					if(_sh>vH){
						var newScrollTop = sTop - (_sh-vH+2);
						$vScroll.css('top',newScrollTop+'px');
					}
					//修改滚动条的高度值
					$vScroll.height(scorllH);
				}
			}
			//当添加了‘data-xy’属性时，执行该方法
			var xy =($target.attr("data-xy")||'').toLocaleUpperCase();	
			if(o.hScroll){if(xy =='Y'){$hScroll.css('display','none');o.hScroll =false;}}
			if(o.vScroll){if(xy=='X'){$vScroll.css('display','none');o.vScroll =false;}}
			 					
		},
		/**
		 * @description this.options中各参数变化时，调用这个方法，修改滚动条的各参数
		 * 内部方法（在_creat和_setOption中都调用了）
		 **/
		_init:function(){
			var o = this.options,$target = this.element,$view = $target.parent(),
				$hScroll = $view.find('div.ui-minScrollbar-horizontal>div.ui-hScroll'),
				$vScroll = $view.find('div.ui-minScrollbar-vertical>div.ui-vScroll'),
				vendor = (/webkit/i).test(navigator.appVersion) ? 'webkit' :
						(/firefox/i).test(navigator.userAgent) ? 'Moz' :
						'opera' in window ? 'O' : '';
			if(!o.hScroll && !o.vScroll){
				return false;
			}
			//修改可是区域的高度和宽度
			$view.css({'height':o.viewHeight,'width':o.viewWidth});	
			//修改水平滚动条的参数（滚动条是否可用及其颜色和长度）
			if(o.hScroll){
				$hScroll.css('display','block');
				var vW = parseFloat($view.width()),//可是区域的高度
					tW = $target.width(); //内容高度
				var scorllW = Math.round(vW*vW/tW);///水平滚动条的长度
				if(scorllW<vW){
					var h = parseFloat(o.height);
					if(h<=5){o.height ='7px';}else if(h>=30){o.height = '30px';}
					var newhScrollH = parseFloat(o.height);
					if(vendor=='Moz'){newhScrollH -= 2;}
					//修改具体参数
					$hScroll.width(scorllW)
						.css({'height':newhScrollH+'px','background-color':o.bgColor})
						.parent().css({'height':o.height});	
				}else if(scorllW>=vW){
					$hScroll.css('display','none');
				}
			}else{
				$hScroll.css('display','none');
			}
			//修改竖直滚动条的参数
			if(o.vScroll){
				$vScroll.css('display','block');
				var vH = parseFloat($view.height()),//可是区域的高度
					tH = $target.height(); //内容高度
				var scorllH = Math.round(vH*vH/tH);///竖直滚动条的长度
				if(scorllH<vH){
					var w = parseFloat(o.width);
					if(w<=5){o.width ='7px';}else if(w>=30){o.width = '30px';}
					var newvScrollW = parseFloat(o.width);
					if(vendor=='Moz'){newvScrollW -= 2;}
					//修改具体参数
					$vScroll.height(scorllH)
						.css({'width':newvScrollW+'px','background-color':o.bgColor})
						.parent().css({'width':o.width});
				}else if(scorllH>=vH){
					$vScroll.css('display','none');	
				}
			}else{
				$vScroll.css('display','none');	
			}
				
		},
		_eventListener:function($target,$hScroll,$vScroll,o){
			// Events   浏览器事件
			var	hasTouch = ('ontouchstart' in window),
				vendor = (/webkit/i).test(navigator.appVersion) ? 'webkit' :
					(/firefox/i).test(navigator.userAgent) ? 'Moz' :
					'opera' in window ? 'O' : '',
				START_EV = hasTouch ? 'touchstart' : 'mousedown',
				MOVE_EV = hasTouch ? 'touchmove' : 'mousemove',
				END_EV = hasTouch ? 'touchend' : 'mouseup',
				CANCEL_EV = hasTouch ? 'touchcancel' : 'mouseout',
				WHEEL_EV = vendor == 'Moz' ? 'DOMMouseScroll' : 'mousewheel';
			//页面选中状态
	 
			
			if(hasTouch){
				//func($target[0],START_EV,_start(e));	
				/*$target.bind(START_EV,function(e){console.log('000---'+e);_start(e);})
						.bind(MOVE_EV,function(e){console.log('_move');_move(e);})
						.bind(END_EV,function(e){_end(e);})
						.bind(CANCEL_EV,function(e){_end(e);});*/
				//用bind绑定时，得不到e.touches（IOS6），故用原生事件绑定
				$target[0].ontouchstart = function(e){_start(e);return false;};	
				$target[0].ontouchmove = function(e){_move(e);return false;};	
				$target[0].ontouchend = function(e){_end(e);return false;};	
				$target[0].ontouchcancel = function(e){_end(e);return false;};		
			}else{
				$target.bind(WHEEL_EV,function(e){_wheel(e);});
				$hScroll.bind(START_EV,function(e){_start(e);})
						.bind(END_EV,function(e){_end(e);});
				$vScroll.bind(START_EV,function(e){_start(e);})
						.bind(END_EV,function(e){_end(e);});
				$(window.document).bind(MOVE_EV,function(e){_move(e); })
						.bind(END_EV,function(e){_end(e);});						
				/**
				 * 兼容：chrome、safari、360安全、360极速、IE9、IE8、IE7
				 * 不兼容：Opera、FireFox
				 */
				$($target.parent()).bind('selectstart',function(){return false;});
			}
			//用于滚动条滚动条	
			var moveFlag = false,startX=0,startY=0,moveTarget ='';
			//开始移动方法
			function _start(e){
				moveFlag = true;
				moveTarget = $(e.target).attr('class');
				var point = hasTouch ? e.touches[0] : e;
				startX = point.clientX;startY = point.clientY;
			}
			//移动时的方法
			function _move(e){
				if(hasTouch){
					e.preventDefault();	//阻止touchmove的默认行为
				}
				if(!moveFlag){//没有移动的时候，ipad上变透明
					return false;	
				}else{
					var point = hasTouch ? e.touches[0] : e,
						endX = point.clientX ,endY= point.clientY,
						newX = endX-startX ,newY = endY -startY;
					startX = endX;startY = endY;
					if(newX==0 && newY==0){//没有移动距离
						return false;
					}
					_pos(newX,newY);
				}
				
			}
			//结束移动时的方法
			function _end(e){
				moveFlag=false;
				moveTarget = '';
			}
			
			//wheel 滚动鼠标滚轮，滚轮只控制竖直方向的滚动条
			function _wheel(e){
				moveTarget = 'ui-vScroll';
				if(o.vScroll){
					if($vScroll.css('display')=='none'){return;}
				}
				var wheelDeltaX, wheelDeltaY;
				if ('wheelDeltaX' in e) {//chrome
					wheelDeltaX = -e.wheelDeltaX / 12;
					wheelDeltaY = -e.wheelDeltaY / 12;
				} else if ('wheelDelta' in e &&vendor!= 'Moz') {//IE
					wheelDeltaX = wheelDeltaY = -e.wheelDelta/ 12;
				} else if('detail' in e &&vendor== 'Moz'){ //ff
					wheelDeltaX = wheelDeltaY = e.detail * 3;
				}
				_pos(wheelDeltaX,wheelDeltaY);
			}
			/** description:重新定位
			 *  param moveX,moveY 移动了的距离
			 *  return 滚动条和内容区域的top值和left值（注意n值）
			 **/
			function _pos(moveX,moveY){
				var tx=0,ty=0;
				if(hasTouch){
					if(o.hScroll){tx = parseFloat($target.css('left'));}
					if(o.vScroll){ty= parseFloat($target.css('top'));}
				}else{
					if(o.hScroll){tx = parseFloat($hScroll.css('left'));}
					if(o.vScroll){ty= parseFloat($vScroll.css('top'));}	
				}
				var x = tx + moveX,y = ty + moveY;
				if(hasTouch){//pad
					if(o.hScroll){
						var maxScrollX = $hScroll.attr('maxScrollX');
						var nX = $hScroll.attr('nX');
						if (x > 0) x = 0;
						else if (x < -maxScrollX) x = -maxScrollX;
						x = o.hScroll ? x : 0;
						$target.css('left',x+'px');
						$hScroll.css('left',-x*nX+'px');
					}
					if(o.vScroll){
						var maxScrollY = $vScroll.attr('maxScrollY');
						var nY = $vScroll.attr('nY');
						if (y > 0) y = 0;
						else if (y < -maxScrollY) y = -maxScrollY;
						y = o.vScroll ? y : 0;
						$target.css('top',y+'px');
						$vScroll.css('top',-y*nY+'px');
					}
				}else{//pc
					if(moveTarget=='ui-hScroll'){
						var maxScrollX = parseFloat($hScroll.attr('maxScrollX'));
						var nX = $hScroll.attr('nX');
						if (x < 0) x = 0;
						else if (x > maxScrollX) x = maxScrollX;
						x = o.hScroll ? x : 0;
						$target.css('left',-x*nX+'px');
						$hScroll.css('left',x+'px');
					}else if (moveTarget=='ui-vScroll'){
						var maxScrollY = parseFloat($vScroll.attr('maxScrollY'));
						var nY = $vScroll.attr('nY');
						if (y < 0){ y = 0;}
						else if (y > maxScrollY){y = maxScrollY;}
						y = o.vScroll ? y : 0;
						$target.css('top',-y*nY+'px');
						$vScroll.css('top',y+'px');
					}
					
				}
			}
			
			
		},
		/**
		 * @description 当this.options改变时，jquery-ui自动调用该方法，然后调用_init()方法
		 * */
		_setOption:function(key, value) {
			this.options[key] = value;  
		},
		/**
		* @description 销毁滚动条
		* @return {minScrollbar} minScrollbar对象
		* @example 想移除事件，在移除dom元素
		* $("#logo").minScrollbar('destroy');
		*/
		destroy:function(){
			if(this.element.attr('data-destroy')=='true'){
				if('ontouchstart' in window){
					//这里touch事件（IOS6下）不能进行bind绑定，所以这里将其事件置空。
					var $target = this.element;
					$target[0].ontouchstart = null;	
					$target[0].ontouchmove = null;	
					$target[0].ontouchend =null;	
					$target[0].ontouchcancel = null;	
				}else{
					//$(window.document).unbind('mouseup').unbind('mousemove');
					this.element.attr('data-destroy','false')
					.removeClass('ui-minScrollbar').unbind()
					.nextAll().unbind()
					.remove('div.ui-minScrollbar-horizontal,div.ui-minScrollbar-vertical')
					.end().parent().unbind()
					.end().unwrap('div.ui-minScrollbar-viewable');	
				}			
					
			}
			//return this.element; return导致不能一次销毁多个滚动条插件
		}
	});

	$.extend($.ui.minScrollbar, {
		version: "1.3",
		author:'黄卉',
		date:'2012-10-10'
	});

})(jQuery);

$(function(){
	$(".ui-minScrollbar").minScrollbar();
	//$(".ui-minScrollbar").minScrollbar('destroy');
});/*
 *作    者: 高娜
 *版    本: 1.3
 *完成时间: 2012-12-04
 *描    述: txttruncate
 *关联文件: jQuery.js|jquery-ui.js
 */
(function($,undefined){
    /**
	* @class 文本截断
    * @name txttruncate
    * @description 文本截断
	* @version 1.3
    */
	$.widget('ui.txttruncate',
	/** @lends txttruncate.prototype */
	{		
		options:{
			/**  
			* @name txttruncate#dataPrompt
			* @param {Boolean}  布尔类型
			* @description 是否以提示信息的方式显示完整的未截取的字符串。
			* @default {Boolean} true
			* @example
			* $('.exampleObj').txttruncate({
			*		dataPrompt : true
			*  });
			*/
			dataPrompt : true ,
			/**  
			* @name txttruncate#dataFormat
			* @param {String}  字符串类型
			* @description 显示多余内容的替代后缀，可以是html片段,注意定义html片段时需要考虑标签的正确嵌套关系
			* @default {String} '...'
			* @example
			* $('.exampleObj').txttruncate({
			*		dataFormat : '...'
			*  });
			*/
			dataFormat : '...' ,
			/**  
			* @name txttruncate#customFn
			* @param {Fn}  函数类型
			* @description 自定义函数
			* @default {Fn} function(){}
			* @example
			* $('.exampleObj').txttruncate({
			*		customFn : function(){alert("customFn")}
			*  });
			*/
			customFn : function(){}
		},
		_create:function(){},
		_init:function(){		
			var _self = this.element ;
			var o = this.options ;
			var txtWid = _self.attr('data-width') ;
			var txtLen = _self.attr('data-length') ;
			var txtHtml = _self.html() ;
			var txtSize = parseInt(_self.css('font-size')) ;
			var format = o.dataFormat ;
			var isWid = (txtWid != undefined) ;
			var isLen = (txtLen != undefined) ;
			if(isLen){ //设置了显示文本的长度没有设置显示区域的宽度或是同时设置了显示文本的长度和显示区域的宽度。
			}else if(!isLen && isWid){//设置了显示区域宽度
				txtLen = Math.floor(txtWid/txtSize) ;
			}else{//没有设置显示文本的长度和显示区域宽度、显示区域宽度根据上下文自适应
				txtWid = _self.width() ;
				txtLen = Math.floor(txtWid/txtSize) ;
				$(window).resize(function(){
					txtWid = _self.width() ;
					txtLen = Math.floor(txtWid/txtSize) ;
				}) ;
			}
			if(truncateByte(txtHtml,txtLen) != txtHtml){
				var newTxt = truncateByte(txtHtml,txtLen) + format ;
			}else{
				var newTxt = truncateByte(txtHtml,txtLen) ;
			}
			_self.html(newTxt).attr('data-source',txtHtml) ;	
			$(window).resize(function(){
				if(truncateByte(txtHtml,txtLen) != txtHtml){
					var newTxt = truncateByte(txtHtml,txtLen) + format ;
				}else{
					var newTxt = truncateByte(txtHtml,txtLen) ;
				}
				_self.html(newTxt).attr('data-source',txtHtml) ;		
			}) ;
			if(o.dataPrompt){
				_self.attr('title',txtHtml) ;
			}
			o.customFn() ;
			//截取方法-按设置文本长度截取
			function truncateByte(str,n){//str待截取的字符串，n设定的截取长度，相当于2n个字节
				var char_length = 0 ;
				for(var i=0; i<str.length;i++){
					var son_str = str.charAt(i) ;
					encodeURI(son_str).length > 2 ? char_length += 1 : char_length += 0.5 ;
					if(char_length > n){
						var sub_len = char_length == n ? i+1 : i ;
						return str.substr(0,sub_len) ;
					}
				}
				return str ;
			}
		},
		/**
		* @description 设置修改替代后缀
		* @return {txttruncate} txttruncate对象
		* @example
		* $("#testExpObj").txttruncate('setformat');
		*/
		setformat : function(forms){
			var _self = this.element ;
			var o = this.options ;
			if(_self.attr('data-source')){
				_self.html(_self.attr('data-source')) ;
			}
			_self.txttruncate({
				dataFormat:forms
			}) ;
		},
		/**
		* @description 设置修改data-length的值
		* @return {txttruncate} txttruncate对象
		* @example
		* $("#testExpObj").txttruncate('setlength');
		*/
		setlength : function(len){
			var _self = this.element ;
			var o = this.options ;
			if(_self.attr('data-source')){
				_self.html(_self.attr('data-source')) ;
			}
			_self.attr('data-length',len) ;
			_self.txttruncate() ;
		},
		/**
		* @description 设置修改data-width的值
		* @return {txttruncate} txttruncate对象
		* @example
		* $("#testExpObj").txttruncate('setwidth');
		*/
		setwidth : function(wid){
			var _self = this.element ;
			var o = this.options ;
			if(_self.attr('data-source')){
				_self.html(_self.attr('data-source')) ;
			}
			_self.attr('data-width',wid) ;
			_self.txttruncate() ;
		},
		/**
		* @description 设置修改区域样式宽度
		* @return {txttruncate} txttruncate对象
		* @examplesetauto
		* $("#testExpObj").txttruncate('setcsswid');
		*/
		setcsswid : function(str){
			var _self = this.element ;
			var o = this.options ;
			if(_self.attr('data-source')){
				_self.html(_self.attr('data-source')) ;
			}
			_self.removeAttr('data-length').removeAttr('data-width') ;
			_self.css('width',str).txttruncate() ;
		},
		/**
		* @description 清除文本截断控件
		* @return {txttruncate} txttruncate对象
		* @example
		* $("#testExpObj").txttruncate('destroy');
		*/
		destroy : function(){
			var _self = this.element ;
			var o = this.options ;
			if(_self.attr('data-source')){
				_self.html(_self.attr('data-source')) ;
			}
		}
	});

	$.extend($.fn.txttruncate, {
		version: "1.3"
	});
	
})(jQuery);/*
 *作    者: 高娜
 *版    本: 1.3
 *完成时间: 2012-12-12
 *描    述: tochart
 *关联文件: jQuery.js|jquery-ui.js
 */
(function($,container){
    /**
	* @class 表格转图表控件
    * @name tochart
    * @description 表格转图表控件
	* @version 1.3
    */
	$.widget('ui.tochart',
	/** @lends tochart.prototype */
	{		
		options:{
			/**  
			* @name tochart#type
			* @param {String}  字符串类型
			* @description 转换的图表形式，可选值有：'bar'-柱状图,'area'-区域图,'pie'-饼状图,'line'-线性图
			* @default {String} 'bar' 
			* @example
			* $('.exampleObj').tochart({
			*		type : 'bar'
			*  });
			*/
			type : 'bar' ,
			/**  
			* @name tochart#width
			* @param {Number}  数字类型
			* @description 转换的图表宽度,当未手动设置宽度或设置值为null,取表格的宽度。
			* @default {Number} null
			* @example
			* $('.exampleObj').tochart({
			*		width : null
			*  });
			*/
			width : null ,
			/**  
			* @name tochart#height
			* @param {Number}  数字类型
			* @description 转换的图表高度,当未手动设置高度或设置值为null,取表格的高度。
			* @default {Number} null
			* @example
			* $('.exampleObj').tochart({
			*		height : null
			*  });
			*/
			height : null ,
			/**  
			* @name tochart#appendTitle
			* @param {Boolean}  布尔类型
			* @description 转换的图表是否显示表格的标题
			* @default {Boolean} true
			* @example
			* $('.exampleObj').tochart({
			*		appendTitle : true
			*  });
			*/
			appendTitle : true ,
			/**  
			* @name tochart#title
			* @param {String}  字符串类型
			* @description 转换的图表显示的标题
			* @default {String} null 
			* @example
			* $('.exampleObj').tochart({
			*		title : null
			*  });
			*/
			title : null ,
			/**  
			* @name tochart#appendKey
			* @param {Boolean}  布尔类型
			* @description 转换的图表是否显示图例
			* @default {Boolean} true
			* @example
			* $('.exampleObj').tochart({
			*		appendKey : true
			*  });
			*/
			appendKey : true ,
			/**  
			* @name tochart#rowFilter
			* @param {String}  字符串类型
			* @description 转换的图表行过滤条件设置
			* @default {String} '*'
			* @example
			* $('.exampleObj').tochart({
			*		rowFilter : '*'
			*  });
			*/
			rowFilter : '*' ,
			/**  
			* @name tochart#colFilter
			* @param {String}  字符串类型
			* @description 转换的图表列过滤条件设置
			* @default {String} '*'
			* @example
			* $('.exampleObj').tochart({
			*		colFilter : '*'
			*  });
			*/
			colFilter : '*' ,
			/**  
			* @name tochart#colors
			* @param {Array}  数组类型
			* @description 转换的图表中显示是颜色块
			* @default {Array} ['#be1e2d','#666699','#92d5ea','#ee8310','#8d10ee','#5a3b16','#26a4ed','#f45a90','#e9e744'] 
			* @example
			* $('.exampleObj').tochart({
			*		colors : ['#be1e2d','#666699','#92d5ea','#ee8310','#8d10ee','#5a3b16','#26a4ed','#f45a90','#e9e744']
			*  });
			*/
			colors : ['#be1e2d','#666699','#92d5ea','#ee8310','#8d10ee','#5a3b16','#26a4ed','#f45a90','#e9e744'] ,
			/**  
			* @name tochart#textColors
			* @param {Array}  数组类型
			* @description 转换的饼图中提示数据文本颜色，只有饼图有。
			* @default {Array} [] 
			* @example
			* $('.exampleObj').tochart({
			*		textColors : []
			*  });
			*/
			textColors : [] ,
			/**  
			* @name tochart#parseDirection
			* @param {String}  字符串类型
			* @description 解析表格数据的方向，可选参数为'x','y'，被解析的字段必须放到th标签里面。
			* @default {String} 'x'
			* @example
			* $('.exampleObj').tochart({
			*		parseDirection : 'x'
			*  });
			*/
			parseDirection : 'x' ,
			/**  
			* @name tochart#pieMargin
			* @param {Number}  数字类型
			* @description 转换的饼图的外边距，只有饼状图有。
			* @default {Number} 20
			* @example
			* $('.exampleObj').tochart({
			*		pieMargin : 20
			*  });
			*/
			pieMargin : 20 ,
			/**  
			* @name tochart#pieLabelPos
			* @param {String}  字符串类型
			* @description 转换的饼图的提示数据在饼图的位置，可选参数'inside','outside',只有饼图有。
			* @default {String} 'inside'
			* @example
			* $('.exampleObj').tochart({
			*		pieLabelPos : 'inside'
			*  });
			*/
			pieLabelPos : 'inside' ,
			/**  
			* @name tochart#lineWeight
			* @param {Number}  数字类型
			* @description 转换的线性图和区域图的线的宽度，只有线性图和区域图有。
			* @default {Number} 4
			* @example
			* $('.exampleObj').tochart({
			*		lineWeight : 4
			*  });
			*/
			lineWeight : 4 ,
			/**  
			* @name tochart#barGroupMargin
			* @param {Number}  数字类型
			* @description 转换的柱状图中每组数据之间的间距，只有柱状图有。
			* @default {Number} 10
			* @example
			* $('.exampleObj').tochart({
			*		barGroupMargin : 10
			*  });
			*/
			barGroupMargin : 10 ,
			/**  
			* @name tochart#barMargin
			* @param {Number}  数字类型
			* @description 转换的柱状图中每组数据内柱子之间的间距，只有柱状图有。
			* @default {Number} 1
			* @example
			* $('.exampleObj').tochart({
			*		barMargin : 1
			*  });
			*/
			barMargin : 1 ,
			/**  
			* @name tochart#yLabelInterval
			* @param {Number}  数字类型
			* @description 转换的图表参考坐标的间距
			* @default {Number} 30
			* @example
			* $('.exampleObj').tochart({
			*		yLabelInterval : 30
			*  });
			*/
			yLabelInterval : 30 ,
			/**  
			* @name tochart#customFn
			* @param {Fn}  函数类型
			* @description 自定义函数
			* @default {Fn} function(){}
			* @example
			* $('.exampleObj').tochart({
			*		customFn : function(){alert("customFn")}
			*  });
			*/
			customFn : function(){}
		},
		_create:function(){},
		_init:function(){
			var _self = this.element ;
			var o = this.options ;
			o.width = (o.width == null) ? parseInt(_self.width()) : parseInt(o.width) ;
			o.height = (o.height == null) ? parseInt(_self.height()) : parseInt(o.height) ;
			if(_self.next('.visualize').length > 0){
				_self.next('.visualize').remove() ;
			}
			//从html表格中解析数据
			function scrapeTable(){
				var colors = o.colors ;
				var textColors = o.textColors ;
				var tableData = {
					dataGroups : function(){
						var dataGroups = [] ;
						if(o.parseDirection == 'x'){
							_self.find('tr:gt(0)').filter(o.rowFilter).each(function(i){
								dataGroups[i] = {} ;
								dataGroups[i].points = [] ;
								dataGroups[i].color = colors[i] ;
								if(textColors[i]){
									dataGroups[i].textColor = textColors[i] ;
								}
								$(this).find('td').filter(o.colFilter).each(function(){
									dataGroups[i].points.push(parseFloat($(this).text())) ;
								}) ;
							}) ;
						}else{
							var cols = _self.find('tr:eq(1) td').filter(o.colFilter).size() ;
							for(var i=0; i<cols; i++){
								dataGroups[i] = {} ;
								dataGroups[i].points = [] ;
								dataGroups[i].color = colors[i] ;
								if(textColors[i]){
									dataGroups[i].textColor = textColors[i] ;
								}
								_self.find('tr:gt(0)').filter(o.colFilter).each(function(){
									dataGroups[i].points.push($(this).find('td').eq(i).text()*1) ;
								}) ;
							}
						}
						return dataGroups ;
					} ,
					allData : function(){
						var allData = [] ;
						$(this.dataGroups()).each(function(){
							allData.push(this.points) ;
						}) ;
						return allData ;
					} ,
					dataSum : function(){
						var dataSum = 0 ;
						var allData = this.allData().join(',').split(',') ;
						$(allData).each(function(){
							dataSum += parseFloat(this) ;
						}) ;
						return dataSum ;
					} ,
					topValue : function(){
						var topValue = 0 ;
						var allData = this.allData().join(',').split(',') ;
						$(allData).each(function(){
							if(parseFloat(this,10)>topValue){
								topValue = parseFloat(this) ;
							}
						}) ;
						return topValue ;
					} ,
					bottomValue : function(){
						var bottomValue = 0 ;
						var allData = this.allData().join(',').split(',') ;
						$(allData).each(function(){
							if(this<bottomValue){
								bottomValue = parseFloat(this) ;
							}
						}) ;
						return bottomValue ;
					} ,
					memberTotals : function(){
						var memberTotals = [] ;
						var dataGroups = this.dataGroups() ;
						$(dataGroups).each(function(l){
							var count = 0 ;
							$(dataGroups[l].points).each(function(m){
								count += dataGroups[l].points[m] ;
							}) ;
							memberTotals.push(count) ;
						}) ;
						return memberTotals ;
					} ,
					yTotals : function(){
						var yTotals = [] ;
						var dataGroups = this.dataGroups() ;
						var loopLength = this.xLabels().length ;
						for(var i=0; i<loopLength; i++){
							yTotals[i] = [] ;
							var thisTotal = 0 ;
							$(dataGroups).each(function(l){
								yTotals[i].push(this.points[i]) ;
							}) ;
							yTotals[i].join(',').split(',') ;
							$(yTotals[i]).each(function(){
								thisTotal += parseFloat(this) ;
							}) ;
							yTotals[i] = thisTotal ;
						}
						return yTotals ;
					} ,
					topYtotal : function(){
						var topYtotal = 0 ;
						var yTotals = this.yTotals().join(',').split(',') ;
						$(yTotals).each(function(){
							if(parseFloat(this,10)>topYtotal){
								topYtotal = parseFloat(this) ;
							}
						}) ;
						return topYtotal ;
					} ,
					totalYRange : function(){
						return this.topValue() - this.bottomValue() ;
					} ,
					xLabels : function(){
						var xLabels = [] ;
						if(o.parseDirection == 'x'){
							_self.find('tr:eq(0) th').filter(o.colFilter).each(function(){
								xLabels.push($(this).html()) ;
							}) ;
						}else{
							_self.find('tr:gt(0) th').filter(o.rowFilter).each(function(){
								xLabels.push($(this).html()) ;
							}) ;
						}
						return xLabels ;
					} ,
					yLabels : function(){
						var yLabels = [] ;
						yLabels.push(bottomValue) ;
						var numLabels = Math.round(o.height/o.yLabelInterval) ;
						var loopInterval = Math.ceil(totalYRange / numLabels) || 1 ;
						while(yLabels[yLabels.length-1]<topValue - loopInterval){
							yLabels.push(yLabels[yLabels.length - 1] + loopInterval) ;
						}
						yLabels.push(topValue) ;
						return yLabels ;
					}
				} ;
				return tableData ;
			}
			
			//创建图表
			var createChart = {
				pie : function(){
					canvasContain.addClass('visualize-pie') ;
					if(o.pieLabelPos == 'outside'){
						canvasContain.addClass('visualize-pie-outside') ;
					}
					var centerx = Math.round(canvas.width()/2) ;
					var centery = Math.round(canvas.height()/2) ;
					var radius = centery - o.pieMargin ;
					var counter = 0.0 ;
					var toRad = function(integer){
						return (Math.PI/180)*integer ;
					} ;
					var labels = $('<ul class="visualize-labels"></ul>').insertAfter(canvas) ;
					//绘制饼图
					$.each(memberTotals,function(i){
						var fraction = (this <= 0 || isNaN(this))? 0 : this / dataSum ;
						ctx.beginPath() ;
						ctx.moveTo(centerx, centery) ;
						ctx.arc(centerx,centery,radius,counter * Math.PI * 2 - Math.PI * 0.5,(counter + fraction) * Math.PI * 2 - Math.PI * 0.5,false) ;
						ctx.lineTo(centerx, centery) ;
						ctx.closePath() ;
						ctx.fillStyle = dataGroups[i].color ;
						ctx.fill() ;
						// draw labels
						var sliceMiddle = (counter + fraction/2) ;
						var distance = o.pieLabelPos == 'inside' ? radius/1.5 : radius +  radius / 5 ;
						var labelx = Math.round(centerx + Math.sin(sliceMiddle * Math.PI * 2) * (distance)) ;
						var labely = Math.round(centery - Math.cos(sliceMiddle * Math.PI * 2) * (distance)) ;
						var leftRight = (labelx > centerx) ? 'right' : 'left' ;
						var topBottom = (labely > centery) ? 'bottom' : 'top' ;
						var labeltext = $('<span class="visualize-label">' + Math.round(fraction*100) + '%</span>').css(leftRight, 0).css(topBottom, 0);
						var label = $('<li class="visualize-label-pos"></li>').appendTo(labels).css({left: labelx, top: labely}).append(labeltext);	
						labeltext.css('font-size', radius / 8)
								 .css('margin-'+leftRight, -labeltext.width()/2)
								 .css('margin-'+topBottom, -labeltext.outerHeight()/2) ;							
						if(dataGroups[i].textColor){ 
							labeltext.css('color', dataGroups[i].textColor) ; 
						}	
						counter += fraction ;
					}) ;
				} ,
				line : function(area){			
					if(area){ 
						canvasContain.addClass('visualize-area') ; 
					}else{ 
						canvasContain.addClass('visualize-line') ; 
					}				
					//write X labels
					var xInterval = canvas.width() / (xLabels.length -1) ;
					var xlabelsUL = $('<ul class="visualize-labels-x"></ul>').width(canvas.width()).height(canvas.height()).insertBefore(canvas) ;
					$.each(xLabels, function(i){ 
						var thisLi = $('<li><span>'+this+'</span></li>').prepend('<span class="line" />').css('left', xInterval * i).appendTo(xlabelsUL) ;						
						var label = thisLi.find('span:not(.line)') ;
						var leftOffset = label.width()/-2 ;
						if(i==0){ 
							leftOffset = 0 ; 
						}else if(i==xLabels.length-1){ 
							leftOffset = -label.width() ; 
						}
						label.css('margin-left', leftOffset).addClass('label') ;
					});	
					//write Y labels
					var yScale = canvas.height() / totalYRange ;
					var liBottom = canvas.height() / (yLabels.length-1) ;
					var ylabelsUL = $('<ul class="visualize-labels-y"></ul>').width(canvas.width()).height(canvas.height()).insertBefore(canvas) ;						
					$.each(yLabels,function(i){  
						var thisLi = $('<li><span>'+this+'</span></li>').prepend('<span class="line" />').css('bottom',liBottom*i).prependTo(ylabelsUL) ;
						var label = thisLi.find('span:not(.line)') ;
						var topOffset = label.height()/-2 ;
						if(i==0){ 
							topOffset = -label.height() ; 
						}
						else if(i==yLabels.length-1){ 
							topOffset = 0 ; 
						}
						label.css('margin-top', topOffset).addClass('label') ;
					});	
					//start from the bottom left
					ctx.translate(0,zeroLoc) ;
					//iterate and draw
					$.each(dataGroups,function(h){
						ctx.beginPath() ;
						ctx.lineWidth = o.lineWeight ;
						ctx.lineJoin = 'round' ;
						var points = this.points ;
						var integer = 0 ;
						ctx.moveTo(0,-(points[0]*yScale)) ;
						$.each(points,function(){
							ctx.lineTo(integer,-(this*yScale)) ;
							integer += xInterval ;
						});
						ctx.strokeStyle = this.color ;
						ctx.stroke() ;
						if(area){
							ctx.lineTo(integer,0) ;
							ctx.lineTo(0,0) ;
							ctx.closePath() ;
							ctx.fillStyle = this.color ;
							ctx.globalAlpha = .3 ;
							ctx.fill() ;
							ctx.globalAlpha = 1.0 ;
						}else{
							ctx.closePath() ;
						}
					});
				},
				area : function(){
					createChart.line(true) ;
				},
				bar : function(){
					canvasContain.addClass('visualize-bar');
					//write X labels
					var xInterval = canvas.width() / (xLabels.length);
					var xlabelsUL = $('<ul class="visualize-labels-x"></ul>')
						.width(canvas.width())
						.height(canvas.height())
						.insertBefore(canvas);
					$.each(xLabels,function(i){ 
						var thisLi = $('<li><span class="label">'+this+'</span></li>').prepend('<span class="line" />').css('left', xInterval * i).width(xInterval).appendTo(xlabelsUL) ;
						var label = thisLi.find('span.label') ;
						label.addClass('label') ;
					});
					//write Y labels
					var yScale = canvas.height() / totalYRange ;
					var liBottom = canvas.height() / (yLabels.length-1) ;
					var ylabelsUL = $('<ul class="visualize-labels-y"></ul>').width(canvas.width()).height(canvas.height()).insertBefore(canvas);
					$.each(yLabels,function(i){  
						var thisLi = $('<li><span>'+this+'</span></li>').prepend('<span class="line" />').css('bottom',liBottom*i).prependTo(ylabelsUL);
						var label = thisLi.find('span:not(.line)');
						var topOffset = label.height()/-2 ;
						if(i == 0){ 
							topOffset = -label.height() ; 
						}else if(i== yLabels.length-1){ 
							topOffset = 0; 
						}
						label.css('margin-top', topOffset).addClass('label');						
					});
					//start from the bottom left
					ctx.translate(0,zeroLoc) ;
					//iterate and draw
					for(var h=0; h<dataGroups.length; h++){
						ctx.beginPath() ;
						var linewidth = (xInterval-o.barGroupMargin*2) / dataGroups.length ; //removed +1 
						var strokeWidth = linewidth - (o.barMargin*2) ;
						ctx.lineWidth = strokeWidth ;
						var points = dataGroups[h].points ;
						var integer = 0;
						for(var i=0; i<points.length; i++){
							var xVal = (integer-o.barGroupMargin)+(h*linewidth)+linewidth/2 ;
							xVal += o.barGroupMargin*2 ;									
							ctx.moveTo(xVal,0) ;
							ctx.lineTo(xVal,Math.round(-points[i]*yScale)) ;
							integer+=xInterval ;
						}
						ctx.strokeStyle = dataGroups[h].color ;
						ctx.stroke() ;
						ctx.closePath() ;
					}
				}
			} ;
			//create new canvas, set w&h attrs (not inline styles)
			var canvasNode = document.createElement("canvas") ; 
			canvasNode.setAttribute('height',o.height) ;
			canvasNode.setAttribute('width',o.width) ;
			var canvas = $(canvasNode) ;
			//get title for chart
			var title = o.title || _self.find('caption').text() ;
			//create canvas wrapper div, set inline w&h, append
			var canvasContain = (container || $('<div class="visualize" role="img" aria-label="Chart representing data from the table: '+ title +'" />')).height(o.height).width(o.width).append(canvas) ;
			//scrape table (this should be cleaned up into an obj)
			var tableData = scrapeTable() ;
			var dataGroups = tableData.dataGroups() ;
			var allData = tableData.allData() ;
			var dataSum = tableData.dataSum() ;
			var topValue = tableData.topValue() ;
			var bottomValue = tableData.bottomValue() ;
			var memberTotals = tableData.memberTotals() ;
			var totalYRange = tableData.totalYRange() ;
			var zeroLoc = o.height * (topValue/totalYRange) ;
			var xLabels = tableData.xLabels() ;
			var yLabels = tableData.yLabels() ;
			
			//title/key container
			if(o.appendTitle || o.appendKey){
				var infoContain = $('<div class="visualize-info"></div>').appendTo(canvasContain) ;
			}
			//append title
			if(o.appendTitle){
				$('<div class="visualize-title">'+ title +'</div>').appendTo(infoContain) ;
			}
			//append key
			if(o.appendKey){
				var newKey = $('<ul class="visualize-key"></ul>') ;
				var selector ;
				if(o.parseDirection == 'x'){
					selector = _self.find('tr:gt(0) th').filter(o.rowFilter);
				}else{
					selector = _self.find('tr:eq(0) th').filter(o.colFilter);
				}
				_self.find(selector).each(function(i){
					$('<li><span class="visualize-key-color" style="background: '+dataGroups[i].color+'"></span><span class="visualize-key-label">'+ $(this).text() +'</span></li>').appendTo(newKey) ;
				});
				newKey.appendTo(infoContain) ;
				//append new canvas to page		
				if(!container){
					canvasContain.insertAfter(_self);
				}
				if(typeof(G_vmlCanvasManager) != 'undefined'){ 
					G_vmlCanvasManager.initElement(canvas[0]); 
				}					
				//set up the drawing board	
				var ctx = canvas[0].getContext('2d') ;				
				//create chart
				createChart[o.type]() ;
				//clean up some doubled lines that sit on top of canvas borders (done via JS due to IE)
				$('.visualize-line li:first-child span.line, .visualize-line li:last-child span.line, .visualize-area li:first-child span.line, .visualize-area li:last-child span.line, .visualize-bar li:first-child span.line,.visualize-bar .visualize-labels-y li:last-child span.line').css('border','none') ;
				if(!container){
					//add event for updating
					canvasContain.bind('visualizeRefresh', function(){
						_self.visualize(o, $(this).empty()) ; 
					}) ;
				}
			};
			o.customFn() ;//自定义方法调用
		},
		/**
		* @description 清除表格转图表控件
		* @return {tochart} tochart对象
		* @example
		* $("#testExpObj").tochart('destroy');
		*/
		destroy : function(){
			var _self = this.element ;
			var o = this.options ;
			if(_self.next('.visualize').length > 0){
				_self.next('.visualize').remove() ;
			}
		}
	});

	if(!document.createElement("canvas").getContext){
		/*---不支持canvas浏览器处理开始---*/
		document.createElement("canvas").getContext||(function(){var s=Math,j=s.round,F=s.sin,G=s.cos,V=s.abs,W=s.sqrt,k=10,v=k/2;function X(){return this.context_||(this.context_=new H(this))}var L=Array.prototype.slice;function Y(b,a){var c=L.call(arguments,2);return function(){return b.apply(a,c.concat(L.call(arguments)))}}var M={init:function(b){if(/MSIE/.test(navigator.userAgent)&&!window.opera){var a=b||document;a.createElement("canvas");a.attachEvent("onreadystatechange",Y(this.init_,this,a))}},init_:function(b){b.namespaces.g_vml_||
		b.namespaces.add("g_vml_","urn:schemas-microsoft-com:vml","#default#VML");b.namespaces.g_o_||b.namespaces.add("g_o_","urn:schemas-microsoft-com:office:office","#default#VML");if(!b.styleSheets.ex_canvas_){var a=b.createStyleSheet();a.owningElement.id="ex_canvas_";a.cssText="canvas{display:inline-block;overflow:hidden;text-align:left;width:300px;height:150px}g_vml_\\:*{behavior:url(#default#VML)}g_o_\\:*{behavior:url(#default#VML)}"}var c=b.getElementsByTagName("canvas"),d=0;for(;d<c.length;d++)this.initElement(c[d])},
		initElement:function(b){if(!b.getContext){b.getContext=X;b.innerHTML="";b.attachEvent("onpropertychange",Z);b.attachEvent("onresize",$);var a=b.attributes;if(a.width&&a.width.specified)b.style.width=a.width.nodeValue+"px";else b.width=b.clientWidth;if(a.height&&a.height.specified)b.style.height=a.height.nodeValue+"px";else b.height=b.clientHeight}return b}};function Z(b){var a=b.srcElement;switch(b.propertyName){case "width":a.style.width=a.attributes.width.nodeValue+"px";a.getContext().clearRect();
		break;case "height":a.style.height=a.attributes.height.nodeValue+"px";a.getContext().clearRect();break}}function $(b){var a=b.srcElement;if(a.firstChild){a.firstChild.style.width=a.clientWidth+"px";a.firstChild.style.height=a.clientHeight+"px"}}M.init();var N=[],B=0;for(;B<16;B++){var C=0;for(;C<16;C++)N[B*16+C]=B.toString(16)+C.toString(16)}function I(){return[[1,0,0],[0,1,0],[0,0,1]]}function y(b,a){var c=I(),d=0;for(;d<3;d++){var f=0;for(;f<3;f++){var h=0,g=0;for(;g<3;g++)h+=b[d][g]*a[g][f];c[d][f]=
		h}}return c}function O(b,a){a.fillStyle=b.fillStyle;a.lineCap=b.lineCap;a.lineJoin=b.lineJoin;a.lineWidth=b.lineWidth;a.miterLimit=b.miterLimit;a.shadowBlur=b.shadowBlur;a.shadowColor=b.shadowColor;a.shadowOffsetX=b.shadowOffsetX;a.shadowOffsetY=b.shadowOffsetY;a.strokeStyle=b.strokeStyle;a.globalAlpha=b.globalAlpha;a.arcScaleX_=b.arcScaleX_;a.arcScaleY_=b.arcScaleY_;a.lineScale_=b.lineScale_}function P(b){var a,c=1;b=String(b);if(b.substring(0,3)=="rgb"){var d=b.indexOf("(",3),f=b.indexOf(")",d+
		1),h=b.substring(d+1,f).split(",");a="#";var g=0;for(;g<3;g++)a+=N[Number(h[g])];if(h.length==4&&b.substr(3,1)=="a")c=h[3]}else a=b;return{color:a,alpha:c}}function aa(b){switch(b){case "butt":return"flat";case "round":return"round";case "square":default:return"square"}}function H(b){this.m_=I();this.mStack_=[];this.aStack_=[];this.currentPath_=[];this.fillStyle=this.strokeStyle="#000";this.lineWidth=1;this.lineJoin="miter";this.lineCap="butt";this.miterLimit=k*1;this.globalAlpha=1;this.canvas=b;
		var a=b.ownerDocument.createElement("div");a.style.width=b.clientWidth+"px";a.style.height=b.clientHeight+"px";a.style.overflow="hidden";a.style.position="absolute";b.appendChild(a);this.element_=a;this.lineScale_=this.arcScaleY_=this.arcScaleX_=1}var i=H.prototype;i.clearRect=function(){this.element_.innerHTML=""};i.beginPath=function(){this.currentPath_=[]};i.moveTo=function(b,a){var c=this.getCoords_(b,a);this.currentPath_.push({type:"moveTo",x:c.x,y:c.y});this.currentX_=c.x;this.currentY_=c.y};
		i.lineTo=function(b,a){var c=this.getCoords_(b,a);this.currentPath_.push({type:"lineTo",x:c.x,y:c.y});this.currentX_=c.x;this.currentY_=c.y};i.bezierCurveTo=function(b,a,c,d,f,h){var g=this.getCoords_(f,h),l=this.getCoords_(b,a),e=this.getCoords_(c,d);Q(this,l,e,g)};function Q(b,a,c,d){b.currentPath_.push({type:"bezierCurveTo",cp1x:a.x,cp1y:a.y,cp2x:c.x,cp2y:c.y,x:d.x,y:d.y});b.currentX_=d.x;b.currentY_=d.y}i.quadraticCurveTo=function(b,a,c,d){var f=this.getCoords_(b,a),h=this.getCoords_(c,d),g={x:this.currentX_+
		0.6666666666666666*(f.x-this.currentX_),y:this.currentY_+0.6666666666666666*(f.y-this.currentY_)};Q(this,g,{x:g.x+(h.x-this.currentX_)/3,y:g.y+(h.y-this.currentY_)/3},h)};i.arc=function(b,a,c,d,f,h){c*=k;var g=h?"at":"wa",l=b+G(d)*c-v,e=a+F(d)*c-v,m=b+G(f)*c-v,r=a+F(f)*c-v;if(l==m&&!h)l+=0.125;var n=this.getCoords_(b,a),o=this.getCoords_(l,e),q=this.getCoords_(m,r);this.currentPath_.push({type:g,x:n.x,y:n.y,radius:c,xStart:o.x,yStart:o.y,xEnd:q.x,yEnd:q.y})};i.rect=function(b,a,c,d){this.moveTo(b,
		a);this.lineTo(b+c,a);this.lineTo(b+c,a+d);this.lineTo(b,a+d);this.closePath()};i.strokeRect=function(b,a,c,d){var f=this.currentPath_;this.beginPath();this.moveTo(b,a);this.lineTo(b+c,a);this.lineTo(b+c,a+d);this.lineTo(b,a+d);this.closePath();this.stroke();this.currentPath_=f};i.fillRect=function(b,a,c,d){var f=this.currentPath_;this.beginPath();this.moveTo(b,a);this.lineTo(b+c,a);this.lineTo(b+c,a+d);this.lineTo(b,a+d);this.closePath();this.fill();this.currentPath_=f};i.createLinearGradient=function(b,
		a,c,d){var f=new D("gradient");f.x0_=b;f.y0_=a;f.x1_=c;f.y1_=d;return f};i.createRadialGradient=function(b,a,c,d,f,h){var g=new D("gradientradial");g.x0_=b;g.y0_=a;g.r0_=c;g.x1_=d;g.y1_=f;g.r1_=h;return g};i.drawImage=function(b){var a,c,d,f,h,g,l,e,m=b.runtimeStyle.width,r=b.runtimeStyle.height;b.runtimeStyle.width="auto";b.runtimeStyle.height="auto";var n=b.width,o=b.height;b.runtimeStyle.width=m;b.runtimeStyle.height=r;if(arguments.length==3){a=arguments[1];c=arguments[2];h=g=0;l=d=n;e=f=o}else if(arguments.length==
		5){a=arguments[1];c=arguments[2];d=arguments[3];f=arguments[4];h=g=0;l=n;e=o}else if(arguments.length==9){h=arguments[1];g=arguments[2];l=arguments[3];e=arguments[4];a=arguments[5];c=arguments[6];d=arguments[7];f=arguments[8]}else throw Error("Invalid number of arguments");var q=this.getCoords_(a,c),t=[];t.push(" <g_vml_:group",' coordsize="',k*10,",",k*10,'"',' coordorigin="0,0"',' style="width:',10,"px;height:",10,"px;position:absolute;");if(this.m_[0][0]!=1||this.m_[0][1]){var E=[];E.push("M11=",
		this.m_[0][0],",","M12=",this.m_[1][0],",","M21=",this.m_[0][1],",","M22=",this.m_[1][1],",","Dx=",j(q.x/k),",","Dy=",j(q.y/k),"");var p=q,z=this.getCoords_(a+d,c),w=this.getCoords_(a,c+f),x=this.getCoords_(a+d,c+f);p.x=s.max(p.x,z.x,w.x,x.x);p.y=s.max(p.y,z.y,w.y,x.y);t.push("padding:0 ",j(p.x/k),"px ",j(p.y/k),"px 0;filter:progid:DXImageTransform.Microsoft.Matrix(",E.join(""),", sizingmethod='clip');")}else t.push("top:",j(q.y/k),"px;left:",j(q.x/k),"px;");t.push(' ">','<g_vml_:image src="',b.src,
		'"',' style="width:',k*d,"px;"," height:",k*f,'px;"',' cropleft="',h/n,'"',' croptop="',g/o,'"',' cropright="',(n-h-l)/n,'"',' cropbottom="',(o-g-e)/o,'"'," />","</g_vml_:group>");this.element_.insertAdjacentHTML("BeforeEnd",t.join(""))};i.stroke=function(b){var a=[],c=P(b?this.fillStyle:this.strokeStyle),d=c.color,f=c.alpha*this.globalAlpha;a.push("<g_vml_:shape",' filled="',!!b,'"',' style="position:absolute;width:',10,"px;height:",10,'px;"',' coordorigin="0 0" coordsize="',k*10," ",k*10,'"',' stroked="',
		!b,'"',' path="');var h={x:null,y:null},g={x:null,y:null},l=0;for(;l<this.currentPath_.length;l++){var e=this.currentPath_[l];switch(e.type){case "moveTo":a.push(" m ",j(e.x),",",j(e.y));break;case "lineTo":a.push(" l ",j(e.x),",",j(e.y));break;case "close":a.push(" x ");e=null;break;case "bezierCurveTo":a.push(" c ",j(e.cp1x),",",j(e.cp1y),",",j(e.cp2x),",",j(e.cp2y),",",j(e.x),",",j(e.y));break;case "at":case "wa":a.push(" ",e.type," ",j(e.x-this.arcScaleX_*e.radius),",",j(e.y-this.arcScaleY_*e.radius),
		" ",j(e.x+this.arcScaleX_*e.radius),",",j(e.y+this.arcScaleY_*e.radius)," ",j(e.xStart),",",j(e.yStart)," ",j(e.xEnd),",",j(e.yEnd));break}if(e){if(h.x==null||e.x<h.x)h.x=e.x;if(g.x==null||e.x>g.x)g.x=e.x;if(h.y==null||e.y<h.y)h.y=e.y;if(g.y==null||e.y>g.y)g.y=e.y}}a.push(' ">');if(b)if(typeof this.fillStyle=="object"){var m=this.fillStyle,r=0,n={x:0,y:0},o=0,q=1;if(m.type_=="gradient"){var t=m.x1_/this.arcScaleX_,E=m.y1_/this.arcScaleY_,p=this.getCoords_(m.x0_/this.arcScaleX_,m.y0_/this.arcScaleY_),
		z=this.getCoords_(t,E);r=Math.atan2(z.x-p.x,z.y-p.y)*180/Math.PI;if(r<0)r+=360;if(r<1.0E-6)r=0}else{var p=this.getCoords_(m.x0_,m.y0_),w=g.x-h.x,x=g.y-h.y;n={x:(p.x-h.x)/w,y:(p.y-h.y)/x};w/=this.arcScaleX_*k;x/=this.arcScaleY_*k;var R=s.max(w,x);o=2*m.r0_/R;q=2*m.r1_/R-o}var u=m.colors_;u.sort(function(ba,ca){return ba.offset-ca.offset});var J=u.length,da=u[0].color,ea=u[J-1].color,fa=u[0].alpha*this.globalAlpha,ga=u[J-1].alpha*this.globalAlpha,S=[],l=0;for(;l<J;l++){var T=u[l];S.push(T.offset*q+
		o+" "+T.color)}a.push('<g_vml_:fill type="',m.type_,'"',' method="none" focus="100%"',' color="',da,'"',' color2="',ea,'"',' colors="',S.join(","),'"',' opacity="',ga,'"',' g_o_:opacity2="',fa,'"',' angle="',r,'"',' focusposition="',n.x,",",n.y,'" />')}else a.push('<g_vml_:fill color="',d,'" opacity="',f,'" />');else{var K=this.lineScale_*this.lineWidth;if(K<1)f*=K;a.push("<g_vml_:stroke",' opacity="',f,'"',' joinstyle="',this.lineJoin,'"',' miterlimit="',this.miterLimit,'"',' endcap="',aa(this.lineCap),
		'"',' weight="',K,'px"',' color="',d,'" />')}a.push("</g_vml_:shape>");this.element_.insertAdjacentHTML("beforeEnd",a.join(""))};i.fill=function(){this.stroke(true)};i.closePath=function(){this.currentPath_.push({type:"close"})};i.getCoords_=function(b,a){var c=this.m_;return{x:k*(b*c[0][0]+a*c[1][0]+c[2][0])-v,y:k*(b*c[0][1]+a*c[1][1]+c[2][1])-v}};i.save=function(){var b={};O(this,b);this.aStack_.push(b);this.mStack_.push(this.m_);this.m_=y(I(),this.m_)};i.restore=function(){O(this.aStack_.pop(),
		this);this.m_=this.mStack_.pop()};function ha(b){var a=0;for(;a<3;a++){var c=0;for(;c<2;c++)if(!isFinite(b[a][c])||isNaN(b[a][c]))return false}return true}function A(b,a,c){if(!!ha(a)){b.m_=a;if(c)b.lineScale_=W(V(a[0][0]*a[1][1]-a[0][1]*a[1][0]))}}i.translate=function(b,a){A(this,y([[1,0,0],[0,1,0],[b,a,1]],this.m_),false)};i.rotate=function(b){var a=G(b),c=F(b);A(this,y([[a,c,0],[-c,a,0],[0,0,1]],this.m_),false)};i.scale=function(b,a){this.arcScaleX_*=b;this.arcScaleY_*=a;A(this,y([[b,0,0],[0,a,
		0],[0,0,1]],this.m_),true)};i.transform=function(b,a,c,d,f,h){A(this,y([[b,a,0],[c,d,0],[f,h,1]],this.m_),true)};i.setTransform=function(b,a,c,d,f,h){A(this,[[b,a,0],[c,d,0],[f,h,1]],true)};i.clip=function(){};i.arcTo=function(){};i.createPattern=function(){return new U};function D(b){this.type_=b;this.r1_=this.y1_=this.x1_=this.r0_=this.y0_=this.x0_=0;this.colors_=[]}D.prototype.addColorStop=function(b,a){a=P(a);this.colors_.push({offset:b,color:a.color,alpha:a.alpha})};function U(){}G_vmlCanvasManager=
		M;CanvasRenderingContext2D=H;CanvasGradient=D;CanvasPattern=U})();
		/*---不支持canvas浏览器处理结束---*/
	}
	$.extend($.fn.tochart, {
		version: "1.3"
	});
})(jQuery);/*
 *作    者: 黄卉
 *版    本: 1.3
 *完成时间: 2012-12-3
 *描    述: formatImage 图片尺寸格式化
 *关联文件: jQuery.js|jquery-ui.js 
 */
(function($,undefined){
    /**
	* @class  图片尺寸格式化
    * @name formatImage
    * @description  图片尺寸格式化插件
	* @version 1.3
    */
	$.widget("ui.formatImage",
	/** @lends formatImage.prototype */
	{
		options:{
			width: '150px' ,    //实际显示的宽度，默认值为150px
			height:'100px',     //实际显示的高度，默认值为100px			
			position :'center'  // 从什么地方开始剪切图片，'top'左上角，'center'中间，'bottom'右下角，默认值为‘center’
		},
		_create:function(){
			var o = this.options,$img = this.element,
				$view=$('<div class="ui-formatImage-view"></div>'),
				dataW = parseFloat($img.attr("data-formatImage-width")||0),//获取样式中的预定义
				dataH = parseFloat($img.attr("data-formatImage-height")||0),
				viewW = (dataW!=0)?dataW:parseFloat(o.width),
				viewH = (dataH!=0)?dataH:parseFloat(o.height); 
			$view.css({'width':viewW,'height':viewH});
			$img.attr({'initWidth':$img.width()||$img[0].naturalWidth,
					'initHeight':$img.height()}||$img[0].naturalHeight)//初始化的高度宽度，用于插件销毁
				.wrap($view);	
					 					
		},
		/**
		 * @description this.options中各参数变化时，调用这个方法，修改滚动条的各参数
		 * 内部方法（在_creat和_setOption中都调用了）
		 **/
		_init:function(){
			var $img = this.element,
				src = $img[0].getAttribute('src'),
				that = this;
			$img[0].setAttribute('src','');
			$img[0].onload = null;
			$img[0].onload = function(){
				that.imgOnload();
			}
			$img[0].setAttribute('src',src);	
		},
		
		/**
		 * @description 当this.options改变时，jquery-ui自动调用该方法，然后调用_init()方法
		 * */
		_setOption:function(key, value) {
			this.options[key] = value;  
		},
		imgOnload:function(){
			var o = this.options,$img = this.element,
				$view = $img.parent('div.ui-formatImage-view'),
				imgW = parseFloat($img[0].naturalWidth||$img.width()),imgH = parseFloat($img[0].naturalHeight||$img.height()),//取图片自然高度和宽度
				viewW = (o.width=='150px')?parseFloat($view.width()):o.width,
				viewH = (o.height=='100px')?parseFloat($view.height()):o.height;
			$view.css({'width':viewW,'height':viewH});
			if(imgW==0||imgH==0){return;}
			var x = viewW/imgW,
				y = viewH/imgH,
				multiple = x>y?x:y,
				targetW = imgW*multiple,targetH = imgH*multiple,
				left = viewW-targetW,
				top = viewH-targetH;
			$img.css({'width':targetW,'height':targetH});
			var posi = (o.position=='center')?$img.attr('data-formatImage-position'):o.position;
			switch(posi){
				case 'top':
					$img.css({'left':0,'top':0});
					break;
				case 'bottom':
					$img.css({'left':left,'top':top});	
					break;
				default:
					$img.css({'left':left/2,'top':top/2});	
					break;	
			}
			return $img;
		},
		/**
		* @description 销毁滚动条
		* @return {formatImage} formatImage对象
		* @example 想移除事件，在移除dom元素
		* $("#logo").formatImage('destroy');
		*/
		destroy:function(){
			var $img = this.element;
			$img[0].onload = null;
			$img.removeAttr('left').removeAttr('top')
				.removeAttr('data-formatimage-width')
				.removeAttr('data-formatimage-height')
				.removeAttr('data-formatimage-position')
				.removeClass('ui-formatImage')
				.unwrap('div.ui-formatImage-view');
			var width = $img.attr('initWidth'),
				height = $img.attr('initHeight');
			if(width!=$img[0].naturalWidth){
				$img.width(width);
			}
			if(height!=$img[0].naturalHeight){
				$img.height(height);
			}
			$img.removeAttr('initWidth').removeAttr('initHeight');
		}
	});

	$.extend($.ui.formatImage, {
		version : "1.3",
		author : "黄卉",
		date:"2012-12-19"
	});

})(jQuery);

$(function(){
	$(".ui-formatImage").formatImage();//初始化方法
	//$(".ui-formatImage").formatImage('destroy');销毁方法
});/*
 *作    者: 黄卉
 *版    本: 1.3
 *完成时间: 2012-12-25
 *描    述: readModel阅读模式插件
 *关联文件: jQuery.js|jquery-ui.js 
 */
(function($,undefined){
    /**
	* @class 阅读模式插件
    * @name readModel
    * @description 阅读模式，类似视频网站的关灯效果
	* @version 1.3
    */
	$.widget("ui.readModel",
	/** @lends readModel.prototype */
	{
		 options:{
			 height:'',  //目标元素的高度
 			 width:'', //目标元素的宽度
			 model:'default', //阅读模式，在原来的位置default、在显示区域的中间位置center
			 iframe:false  //是否跨iframe显示
		 },
		/*
		 * @description 显示插件
		 * @example 显示插件，开灯
		 * $("#targetID").readModel('show');
		 **/
		 show:function(){
			var o = this.options,$target = this.element,top=0,left=0,that = this,
				$readBg = $('<div class="ui-readModel-bg"></div>'),
				$closeSpan = $('<span class="ui-readModel-close"></span>'),
				maxHeight = 0,maxWidth=0,closeLeft =0;
			$('html').css('overflow','hidden');
			maxHeight = Math.max(document.body.offsetHeight,o.height||$target.height());
			maxWidth = Math.max(document.body.offsetWidth,o.width||$target.width());
			$readBg.css({'height':maxHeight,'width':maxWidth});
			$target.attr('initStyle',$target.attr('style'));
			if(o.height!=''){$target.height(o.height);}			
			if(o.width!=''){$target.width(o.width);}
			else{$target.css('width',$target.width())}
			if(o.model=='center'){
				var winHeight = parseFloat($(window).height()),
					winWidth = parseFloat($(window).width()),
					tarHeight = parseFloat($target.height()),
					tarWidth = parseFloat($target.width()),
					scrollTop = document.body.scrollTop || document.documentElement.scrollTop,
					scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
				top = winHeight<tarHeight?scrollTop+15:winHeight/2 - tarHeight/2+scrollTop;
				left = winWidth<tarWidth?scrollLeft+15: winWidth/2-tarWidth/2+scrollLeft;
			}else if(o.model=='default'){
				top = $target.offset().top;
				left = $target.offset().left;
			}
			if($target.width()==maxWidth){
				closeLeft =0;
			}else{
				closeLeft = left+$target.width()-15;
			}
			$closeSpan.css({'top':top-15,'left':closeLeft})
				.bind('click',function(){that.hide();});
			if(o.iframe){
				if(window.top.document=='undefined'||window.top.document==null||window.top.document==''){
					$target.css({'position':'absolute','top':top,'left':left});
					$target.wrap($readBg).before($closeSpan);
				}else{
					var $targetClone = $target.clone(true);//clone方法在jqueryUI中remove的时候会触发插件的所有destroy方法
					$targetClone.addClass('ui-readModel-clone').css({'position':'absolute','top':top,'left':left});
					$(window.top.document.body).append($readBg);
					$readBg.append($targetClone).append($closeSpan);
				}				
			}else{
				$target.css({'position':'absolute','top':top,'left':left});
				$target.wrap($readBg).before($closeSpan);
			}			
		},
		/*
		 * @description 隐藏插件
		 * @example 隐藏插件，关灯
		 * $("#targetID").readModel('hide');
		 **/
		hide:function(){
			var o = this.options,$target = this.element,
				$readBg = $('div.ui-readModel-bg'),
				$closeSpan = $readBg.find('.ui-readModel-close');
			$target.attr('style',$target.attr('initStyle')).removeAttr('initStyle');
			$closeSpan.unbind('click');
			if(o.iframe){
				$readBg.hide();
				var $targetClone = $readBg.find('.ui-readModel-clone');
				if($targetClone.length!=0){
					$targetClone.remove();
					$target.unwrap($readBg);
					$closeSpan.remove();
				}else{
					$target.unwrap($readBg);
					$closeSpan.remove();	
				}
			}else{
				$target.unwrap($readBg);
				$closeSpan.remove();					
			}
			$('html').css('overflow','');
		},
		destroy:function(){
			//alert('destroy');
		}
	});

	$.extend($.ui.readModel, {
		version: "1.3",
		author:'黄卉',
		date:'2012-12-24'
	});

})(jQuery);

$(function(){
	$(".ui-readModel").readModel();		
	//$(".ui-readModel").readModel('destroy');
});