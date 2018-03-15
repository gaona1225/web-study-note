var TextUtil = new Object();
//����textarea���ַ���
TextUtil.isNotMax = function(oTextarea){
	return oTextarea.value.length != oTextarea.getAttribute('maxlength') ;
}

//��ֹ�ı����е��ַ�
TextUtil.blockChars = function(oTextbox,event){
	event = EventUtil.formatEvent(event);
	var sInvalidChars = oTextbox.getAttribute('data-invalidchars');
	var sChar = String.fromCharCode(event.charCode);
	var bIsValidChar = sInvalidChars.indexOf(sChar) == -1 ;
	return bIsValidChar || event.ctrlKey ;
}

//�������������Ƿ�����ֹ���ַ�
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

//�����ı����е��ַ�
TextUtil.allowChars = function(oTextbox,event){
	event = EventUtil.formatEvent(event);
	var sInvalidChars = oTextbox.getAttribute('data-validchars');
	var sChar = String.fromCharCode(event.charCode);
	var bIsValidChar = sInvalidChars.indexOf(sChar) > -1 ;
	return bIsValidChar || event.ctrlKey ;
}

//�������������Ƿ���������ַ�
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

//ʹ�����¼����������ı�
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

//ƥ��
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

//ƥ���ڲ�����
TextUtil.autosuggest = function(oTextbox,arrValues,sListboxId){
	var oListbox = document.getElementById(sListboxId);
	ListUtil.clear(oListbox);
	
	var arrMatches = TextUtil.autosuggestMatch(oTextbox.value,arrValues);
	for(var i=0;i<arrMatches.length;i++){
		ListUtil.add(oListbox,arrMatches[i]);
	}
}

//����ƥ��ֵ
TextUtil.setText = function(oListbox,sTextboxId){
	var oTextbox = document.getElementById(sTextboxId);
	if(oListbox.selectedIndex>-1){
		oTextbox.value = oListbox.options[oListbox.selectedIndex].text;
	}
}