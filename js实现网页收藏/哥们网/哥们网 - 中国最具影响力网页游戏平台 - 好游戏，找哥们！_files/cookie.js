function setCookie(name, value, time){
    var nameString = name + '=' + escape(value);
    var expiryString = "";
    if(time !== 0) {
        var expdate = new Date();
        if(time == null || isNaN(time)) time = 60*60*1000;
        expdate.setTime(expdate.getTime() +  time);
    	expiryString = ' ;expires = '+ expdate.toGMTString();
	}
	var path = " ;path =/";
	document.cookie = nameString + expiryString + path;
}

function getCookie(sName) {
	var aCookie = document.cookie.split('; ');
	for (var i=0; i < aCookie.length; i++) {
		var aCrumb = aCookie[i].split('=');
		if (sName == aCrumb[0])
		return unescape(aCrumb[1]);
	}
	return '';
}