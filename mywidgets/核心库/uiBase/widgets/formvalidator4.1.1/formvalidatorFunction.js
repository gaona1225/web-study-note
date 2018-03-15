(function($) {
	/**一般非空验证**/
	$.valid = function(id){
		$("#"+id).formValidator({onShow:"该输入项为必输项",onFocus:"该输入项为必输项",onCorrect:"输入正确"})
				.inputValidator({min:1,onError:"该输入项为必输项"});
	}
	/**日期验证**/
	$.validDate = function(id){
		$("#"+id).formValidator({onShow:"该输入项为必输项",onFocus:"该输入项为必输项",onCorrect:"输入正确"})
				.input({min:new Date(),type:"datetime",onErrorMin:"输入时间必须比当前时间大"})
	}
	/**控制字符长度验证**/
	$.validLength = function(id,num1,num2){
		$("#"+id).formValidator({onShow:"该输入项为必输项",onFocus:"该输入项为必输项",onCorrect:"输入正确"})
				.inputValidator({min:num1,max:num2,onErrorMax:"输入字符长度必须在"+num1+"~"+num2+"之间",onError:"该输入项为必输项"});
	}
	/**
	$.validWeight = function(id,reg,datatype,type,num1,num2){
	    //console.log(num1+num2);
		$("#"+id).formValidator({onShow:"该输入项为必输项",onFocus:"该输入项为必输项",onCorrect:"输入正确"})
			.regexValidator({regExp:reg,dataType:datatype,onError:"输入值必须在"+num1+"-"+num2+"之间，请确认"})
			.inputValidator({type:type,min:num1,max:num2,onError:"输入值必须在"+num1+"-"+num2+"之间，请确认",onErrorMin:"你输入的值必须大于"+num1,emptyerror:'权重不能为空'});
	}
	*/
	
	$.validWeight = function(id){
		$("#"+id).formValidator({onShow:"请输入权重",onCorrect:"输入正确"})
		.regexValidator({regExp:"decmal1",dataType:"enum",onError:"权重为0-100之间的正数，请确认"})
		.inputValidator({type:"value",min:0,max:100,onError:"权重为0-100之间的正数，请确认",onErrorMin:"你输入的值必须大于0",emptyerror:'权重不能为空'});
	}
})(jQuery);


/*当控件的位置改变，则需要重新定位提示信息*/
function reBuildTip(str){
	for(var i =0;i<str.length;i++){
		$("#"+str[i].id+"Tip").remove();
	}	
	formInitConfig();
	addValidClass();
	window.setTimeout(function(){
		for(var i =0;i<str.length;i++){
			if(str[i].param){
				str[i].param.unshift(str[i].id);
				str[i].fn(str[i].param.join(','));	
			}else{
				str[i].fn(str[i].id);
			}
		}	
	},700);
}