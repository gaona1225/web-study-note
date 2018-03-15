var TextUtil = new Object();
//限制textarea的字符数
TextUtil.isNotMax = function(oTextarea){
	return oTextarea.value.length != oTextarea.getAttribute('maxlength') ;
}

//阻止文本框中的字符
TextUtil.blockChars = function(oTextbox,event){
	event = EventUtil.formatEvent(event);
	var sInvalidChars = oTextbox.getAttribute('data-invalidchars');
	var sChar = String.fromCharCode(event.charCode);
	var bIsValidChar = sInvalidChars.indexOf(sChar) == -1 ;
	return bIsValidChar || event.ctrlKey ;
}

//检测黏贴的内容是否是阻止的字符
TextUtil.blurBlock = function(oTextbox){
	var sInvalidChars = oTextbox.getAttribute('data-invalidchars');
	var arrInvalidChars = sInvalidChars.split('') ;
	
	for(var i=0;i<arrInvalidChars.length;i++){
		if(oTextbox.value.indexOf(arrInvalidChars[i])>-1){
			alert('Character ' + arrInvalidChars[i] + ' not allowed.');
			oTextbox.focus();
			oTextbox.select();
			return ;
		}
	}
}

//允许文本框中的字符
TextUtil.allowChars = function(oTextbox,event){
	event = EventUtil.formatEvent(event);
	var sInvalidChars = oTextbox.getAttribute('data-validchars');
	var sChar = String.fromCharCode(event.charCode);
	var bIsValidChar = sInvalidChars.indexOf(sChar) > -1 ;
	return bIsValidChar || event.ctrlKey ;
}

//检测黏贴的内容是否是允许的字符
TextUtil.blurAllow = function(oTextbox){
	var sInvalidChars = oTextbox.getAttribute('data-validchars');
	var arrInvalidChars = oTextbox.value.split('') ;
	
	for(var i=0;i<arrInvalidChars.length;i++){
		if(oTextbox.value.indexOf(arrInvalidChars[i]) == -1){
			alert('Character ' + arrInvalidChars[i] + ' not allowed.');
			oTextbox.focus();
			oTextbox.select();
			return ;
		}
	}
}

//使用上下键操作数字文本
TextUtil.numericScroll = function(oTextbox,event){
	event = EventUtil.formatEvent(event);
	var iValue = oTextbox.value.length == 0 ? 0 : parseInt(oTextbox.value);
	var iMax = oTextbox.getAttribute('max');
	var iMin = oTextbox.getAttribute('min');
	
	if(event.keyCode == 38){
		if(iMax == null || iValue<parseInt(iMax)){
			oTextbox.value = iValue + 1 ;
		}
	}else if(event.keyCode == 40){
		if(iMin == null || iValue>parseInt(iMin)){
			oTextbox.value = iValue - 1 ;
		}
	}
}

//匹配
TextUtil.autosuggestMatch = function(sText,arrValues){
	var arrResult = new Array();
	if(sText != ''){
		for(var i=0;i<arrValues.length;i++){
			if(arrValues[i].indexOf(sText)==0){
				arrResult.push(arrValues[i]);
			}
		}
	}
	return arrResult ;
}

//匹配内部机制
TextUtil.autosuggest = function(oTextbox,arrValues,sListboxId){
	var oListbox = document.getElementById(sListboxId);
	ListUtil.clear(oListbox);
	
	var arrMatches = TextUtil.autosuggestMatch(oTextbox.value,arrValues);
	for(var i=0;i<arrMatches.length;i++){
		ListUtil.add(oListbox,arrMatches[i]);
	}
}

//设置匹配值
TextUtil.setText = function(oListbox,sTextboxId){
	var oTextbox = document.getElementById(sTextboxId);
	if(oListbox.selectedIndex>-1){
		oTextbox.value = oListbox.options[oListbox.selectedIndex].text;
	}
}