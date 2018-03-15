var webviewcontrol =
{
	webviewGoBackFunction : function (success, fail, resultType)
	{
		return Cordova.exec(success, fail, "org.apache.cordova.webviewcontrol", "webViewGoback", [resultType]);
	}	
};

