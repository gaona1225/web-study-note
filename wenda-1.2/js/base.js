// JavaScript Document change skin
loadSkin() ;
function loadSkin(){
	var skinObj = document.getElementById('skinCss') ;
	$.ajax({
		url : 'http://10.6.210.229:8080/wiki/css?appId=1' ,
		success : function(result) {
			if(skinObj){
				document.getElementById('skinCss').href = result['css'] ;
			}
		},
		type : 'json'
	});
}