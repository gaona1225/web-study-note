var FormUtil = new Object() ;
//�����������ڵ�һ���ɼ��ı��ֶ���
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

//�Զ�ѡ���ı�
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

//�Զ��л�����һ��-��Ҫ����element��maxlength
FormUtil.tabForward = function(oTextbox){
	var oForm = oTextbox.form ;
	if(oForm.elements[oForm.elements.length-1] != oTextbox && oTextbox.value.length == oTextbox.getAttribute('maxlength')){ //ȷ��oTextbox�������һ��Ԫ�ز�������ĳ����Ѿ��ﵽ��󳤶�
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


//�ύ��
FormUtil.submitForm = function(btn,form){
	//TODO
	btn.disabled = true ;
	form.submit();
}