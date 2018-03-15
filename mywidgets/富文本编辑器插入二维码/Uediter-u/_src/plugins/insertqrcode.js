///import core
///commands insert qrcode
///commandsName  insertqrcode
///commandsTitle  insert qrcode
///commandsDialog  dialogs\insertqrcode
///desc by gaona at 2013-02-28 insert qrcode

UE.commands['insertqrcode'] = {
	execCommand : function(cmd,url,titVal){
		var range = this.selection.getRange() ;
		var qrcode = this.document.createElement('img') ;
		range.collapse(true) ;
		domUtils.setAttributes(qrcode,{
			'src':url,
			'title':titVal,
			'style':'height:80px;width:80px;'
		}) ;
		range.insertNode(qrcode) ; 
	},
	queryCommandState:function(){
		//alert('aa') ;
   }
};