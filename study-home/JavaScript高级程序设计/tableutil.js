var TableUtil = new Object();
		
//排序
TableUtil.sortTable = function(tableId,iCol,sDataType){
	var oTable = document.getElementById(tableId);
	var oTBody = oTable.tBodies[0];
	var colDataRows = oTBody.rows;
	var aTRs = new Array;
	
	for(var i=0;i<colDataRows.length;i++){
		aTRs.push(colDataRows[i]);
	}
	if(oTable.sortCol == iCol){
		aTRs.reverse();
	}else{
		aTRs.sort(TableUtil.generateCompareTRs(iCol,sDataType));
	}
	
	var oFragment = document.createDocumentFragment();
	for(var i=0;i<aTRs.length;i++){
		oFragment.appendChild(aTRs[i]);
	}
	oTBody.appendChild(oFragment);
	oTable.sortCol = iCol ;
};


//比较函数生成器
TableUtil.generateCompareTRs = function(iCol,sDataType){
	return function(oTR1,oTR2){
		return TableUtil.compareTRs(oTR1,oTR2,iCol,sDataType);
	};
};

//对tr数组进行排序
TableUtil.compareTRs = function(oTR1,oTR2,iCol,sDataType){
   /* var sValue1 = oTR1.cells[iCol].firstChild.nodeValue ;
	var sValue2 = oTR2.cells[iCol].firstChild.nodeValue ;*/
	var vValue1,vValue2;
	if(oTR1.cells[iCol].getAttribute('value')){
		console.log(oTR1.cells[iCol].getAttribute('value'));
		vValue1 = TableUtil.convert(oTR1.cells[iCol].getAttribute('value'),sDataType) ;
		vValue2 = TableUtil.convert(oTR2.cells[iCol].getAttribute('value'),sDataType) ;
	}else{
		vValue1 = TableUtil.convert(oTR1.cells[iCol].firstChild.nodeValue,sDataType) ;
		vValue2 = TableUtil.convert(oTR2.cells[iCol].firstChild.nodeValue,sDataType) ;
	}
	
	if(vValue1 < vValue2){
		return -1 ;
	}else if(vValue1 > vValue2){
		return 1 ;
	}else{
		return 0 ;
	}
	
	//return sValue1.localeCompare(sValue2);
};

//创建转换函数
TableUtil.convert = function(sValue,sDataType){
	switch(sDataType){
		case 'int' : return parseInt(sValue) ;break;
		case 'float' : return parseFloat(sValue) ;break;
		case 'date' : return new Date(Date.parse(sValue)) ;break;
		default:return sValue.toString();break;
	}
};