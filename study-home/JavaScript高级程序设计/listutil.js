var ListUtil = new Object();
//��ȡ����ѡ���select�����ж�ѡ
ListUtil.getSelectedIndexs = function(oListbox){
	var arrIndex = new Array() ;
	for(var i=0;i<oListbox.options.length;i++){
		if(oListbox.options[i].selected){
			arrIndex.push(i) ;
		}
	}
	return arrIndex;
}

//���ѡ��
ListUtil.add = function(oListbox,sName,sValue){
	var oOption = document.createElement('option');
	oOption.appendChild(document.createTextNode(sName));
	
	if(arguments.length == 3){ //ȷ���Ƿ���valueֵ
		oOption.setAttribute("value",sValue);
	}
	oListbox.appendChild(oOption);
}

//ɾ��ѡ��
ListUtil.remove = function(oListbox,iIndex){
	oListbox.remove(iIndex);
}

//ɾ���б�������е�ѡ��
ListUtil.clear = function(oListbox){
	for(var i=oListbox.options.length-1;i>=0;i--){ //ÿɾ��һ��ѡ���ÿ��ѡ���index���Ծͻ����ã�������ô�����������ʼɾ����
		ListUtil.remove(oListbox,i);
	}
}

//�ƶ�ѡ��
ListUtil.move = function(oListboxFrom,oListboxTo,iIndex){
	var oOption = oListboxFrom.options[iIndex];
	if(oOption != null){
		oListboxTo.appendChild(oOption);
	}
}

//��������ѡ��--�����ƶ�һ��λ��
ListUtil.shiftUp = function(oListbox,iIndex){
	if(iIndex>0){
		var oOption = oListbox.options[iIndex] ;
		var oPrevOption = oListbox.options[iIndex-1] ;
		oListbox.insertBefore(oOption,oPrevOption);
	}
}

//��������ѡ��--�����ƶ�һ��λ��
ListUtil.shiftDown = function(oListbox,iIndex){
	if(iIndex<oListbox.options.length-1){
		var oOption = oListbox.options[iIndex] ;
		var onextOption = oListbox.options[iIndex+1] ;
		oListbox.insertBefore(onextOption,oOption);
	}
}