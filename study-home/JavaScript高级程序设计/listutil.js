var ListUtil = new Object();
//获取所有选中项，select可以有多选
ListUtil.getSelectedIndexs = function(oListbox){
	var arrIndex = new Array() ;
	for(var i=0;i<oListbox.options.length;i++){
		if(oListbox.options[i].selected){
			arrIndex.push(i) ;
		}
	}
	return arrIndex;
}

//添加选项
ListUtil.add = function(oListbox,sName,sValue){
	var oOption = document.createElement('option');
	oOption.appendChild(document.createTextNode(sName));
	
	if(arguments.length == 3){ //确定是否传了value值
		oOption.setAttribute("value",sValue);
	}
	oListbox.appendChild(oOption);
}

//删除选项
ListUtil.remove = function(oListbox,iIndex){
	oListbox.remove(iIndex);
}

//删除列表框中所有的选项
ListUtil.clear = function(oListbox){
	for(var i=oListbox.options.length-1;i>=0;i--){ //每删除一个选项后，每个选项的index特性就会重置，所以最好从最大的索引开始删除。
		ListUtil.remove(oListbox,i);
	}
}

//移动选项
ListUtil.move = function(oListboxFrom,oListboxTo,iIndex){
	var oOption = oListboxFrom.options[iIndex];
	if(oOption != null){
		oListboxTo.appendChild(oOption);
	}
}

//重新排序选项--向上移动一个位置
ListUtil.shiftUp = function(oListbox,iIndex){
	if(iIndex>0){
		var oOption = oListbox.options[iIndex] ;
		var oPrevOption = oListbox.options[iIndex-1] ;
		oListbox.insertBefore(oOption,oPrevOption);
	}
}

//重新排序选项--向下移动一个位置
ListUtil.shiftDown = function(oListbox,iIndex){
	if(iIndex<oListbox.options.length-1){
		var oOption = oListbox.options[iIndex] ;
		var onextOption = oListbox.options[iIndex+1] ;
		oListbox.insertBefore(onextOption,oOption);
	}
}