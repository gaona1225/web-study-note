<%@ LANGUAGE = VBScript.Encode %>
<html>
	<head>
		<title>���Эͬ����ƽ̨</title>
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

    //�ж��Ƿ�����e��e��������
	function isMpad() { 
	    
	}
	
    </script>
	<body onload="javascript:CloseWindowNoAsk();">
	</body>
</html>
