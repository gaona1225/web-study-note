<%@ LANGUAGE = VBScript.Encode %>
<html>
	<head>
		<title>金和协同管理平台</title>
	</head>
	<script language="javascript">
	function CloseWindowNoAsk() {
	    var platform = navigator.platform.toLowerCase();
	    
	    var ismac = /macintosh|mac68k|macppc|macintel/.test(platform);

	    if (!isipad() && navigator.platform.toLowerCase() != "win32" && !ismac) {
	        window.location = "JHSoft.MobileApp/Default.htm";
	    }
	    else {
            window.location = "Jhsoft.Web.login/PassWord.aspx";
	    }
	}

	function isipad() {
	    var ua = navigator.userAgent.toLowerCase();
	    var s;
	    s = ua.match(/iPad/i);

	    if (s == "ipad") {
	        return true;
	    }
	    else {
	        return false;
	    }
	    return false;
	}

    //判断是否来自e人e本的请求
	function isMpad() { 
	    
	}
	
    </script>
	<body onload="javascript:CloseWindowNoAsk();">
	</body>
</html>
