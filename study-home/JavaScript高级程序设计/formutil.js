var FormUtil = new Object() ;
//将焦点设置在第一个可见的表单字段上
FormUtil.focusOnFirst = function(){
	var _forms = document.forms ;
	if(_forms.length>0){
		var _elements = _forms[0].elements;
		for(var i=0;i<_elements.length;i++){
			var oFiled = _elements[i];
			if(oFiled.type != 'hidden' && oFiled.value == ''){
				oFiled.focus();
				return ;
			}
		}
	}
}

//自动选择文本
FormUtil.setTextboxes = function(){
	var colInputs = document.getElementsByTagName('input');
	var colTextareas = document.getElementsByTagName('textarea');
	for(var i=0;i<colInputs.length;i++){
		if(colInputs[i].type == 'text' || colInputs[i].type == 'password'){
			colInputs[i].onfocus = function(){
				this.select();
			}
		}
	}
	for(var i=0;i<colTextareas.length;i++){
		colTextareas[i].onfocus = function(){
			this.select();
		}
	}
}

//自动切换到下一个-需要定义element的maxlength
FormUtil.tabForward = function(oTextbox){
	var oForm = oTextbox.form ;
	if(oForm.elements[oForm.elements.length-1] != oTextbox && oTextbox.value.length == oTextbox.getAttribute('maxlength')){ //确定oTextbox不是最后一个元素并且输入的长度已经达到最大长度
		for(var i=0;i<oForm.elements.length;i++){
			if(oForm.elements[i] == oTextbox){
				for(var j=i+1;j<oForm.elements.length;i++){
					if(oForm.elements[j].type != 'hidden'){
						oForm.elements[j].focus();
						return ;
					}
				}
				return ;
			}
		}
	}
}


//提交表单
FormUtil.submitForm = function(btn,form){
	//TODO
	btn.disabled = true ;
	form.submit();
}