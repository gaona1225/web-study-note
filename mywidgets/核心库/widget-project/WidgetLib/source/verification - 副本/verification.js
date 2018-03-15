/*
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
			verPromptTime : '输入有效的时间'
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
					case 'verMobile' : self.val(o.verPromptMobile).addClass('varPrompt') ; verifFun = verMobile; break ;
					case 'verString' : self.val(o.verPromptString).addClass('varPrompt') ; verifFun = verString; break ;
					case 'verNumber' : self.val(o.verPromptNumber).addClass('varPrompt') ; verifFun = verNumber; break ;
					case 'verPhone' : self.val(o.verPromptPhone).addClass('varPrompt') ; verifFun = verPhone; break ;
					case 'verEmail' : self.val(o.verPromptEmail).addClass('varPrompt') ; verifFun = verEmail; break ;
					case 'verUrl' : self.val(o.verPromptUrl).addClass('varPrompt') ; verifFun = verUrl; break ;
					case 'verIP' : self.val(o.verPromptIP).addClass('varPrompt') ; verifFun = verIP; break ;
					case 'verTime' : self.val(o.verPromptTime).addClass('varPrompt') ; verifFun = verTime; break ;
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
				if(!isHasFl){
					self.after('<div class="EditDiv"><input type="text" class="inputInter"/><span class="decPoint">.</span><input type="text" class="inputFloat" /></div>') ;
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
				if(!isHasFl){
					self.after('<div class="EditDiv"><span class="decPoint">0</span><input type="text" class="inputAreaCode"/><span class="decPoint">'+o.verSplit+'</span><input type="text" class="inputPhoneNumber"/><span class="decPoint">'+o.verSplit+'</span><input type="text" class="inputPhoneExt"/></div>') ;
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
				if(!isHasFl){
					self.after('<div class="EditDiv"><input type="text" class="inputEmailfront"/><span class="decPoint">@</span><input type="text" class="inputEmailback"/><span class="decPoint">.</span><input type="text" class="inputEmaillast"/></div>') ;
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
					documentFocus(selfEmailF,classArr,targetInputVal) ;
				}) ;
				selfEmailB.blur(function(){
					var classArr = new Array('inputEmailfront','inputEmailback','inputEmaillast') ;
					var targetInputVal = selfEmailF.val() + '@' + selfEmailB.val() + '.' + selfEmailL.val() ;
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
				if(!isHasFl){
					self.after('<div class="EditDiv"><input type="text" class="inputIP1"/><span class="decPoint">.</span><input type="text" class="inputIP2"/><span class="decPoint">.</span><input type="text" class="inputIP3"/><span class="decPoint">.</span><input type="text" class="inputIP4"/></div>') ;
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
				if(!isHasFl){
					self.after('<div class="EditDiv"><input type="text" class="inputYear"/><span class="decPoint">'+o.verSplit+'</span><input type="text" class="inputMonth"/><span class="decPoint">'+o.verSplit+'</span><input type="text" class="inputDay"/></div>') ;
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
						alert(promptMsg) ;
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
					documentFocus(selfTimeD,classArr,targetInputVal) ;
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
});