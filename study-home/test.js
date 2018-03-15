var upsadvert = upsadvert || window.upsadvert || {};
(function(upsadvert){
	var CODE_NO_SUCCESS = 0, 
		CODE_NO_DEFAULT = 404,
		CODE_TYPE_JS = 'js',
		CODE_TYPE_HTML = 'html',	
		AD_TYPE_IMG = 'img',  
		AD_TYPE_CUSTOM = 'custom',
		AD_TYPE_FLASH = 'flash',
		AD_DATA_URL = "http://pups.baidu.com/",
		//AD_DATA_URL = "http://10.46.178.36:8800/",
		count = 0;
		  
	
   var _createScriptTag = function(scr, url, charset){
		scr.setAttribute('type', 'text/javascript');
		charset && scr.setAttribute('charset', charset);
		scr.setAttribute('src', url);
		document.getElementsByTagName('head')[0].appendChild(scr);
   };
  
  var _removeScriptTag = function(scr){
	   if (scr.clearAttributes) {
          scr.clearAttributes();		 
      } else {
		  for (var attr in scr) {
              if (scr.hasOwnProperty(attr)) {
				   //delete scr[attr];
              }
          }
      }
	  if(scr && scr.parentNode){
          scr.parentNode.removeChild(scr);
	  }	 
      scr = null;
  };
  
   var callbackReg =  new RegExp('(\\?|&)callback=([^&]*)');
   
   var _buildQuery = function(query) {
		if (typeof (query) == "object") {
			var builder = [];
			for (var p in query) {
				var value = query[p];
				if (value !== undefined && value !== null) {
					if (builder.length) builder.push("&");
					var valueString = encodeURIComponent(typeof(value) == "boolean" ? (value ? "1" : "0") : value.toString());
					builder.push(encodeURIComponent(p), "=", valueString);
				}
			}
			return builder.join("");
		}
		if (typeof (query) == "string") {
			return query;
		}
		return null;
    };
	//拼接请求的url
	var _appendQuery = function(url, query) {
		var query = _buildQuery(query);
		if (typeof (query) == "string") {
			var hasQuery = (/\?/g).test(url);
			url += (hasQuery ? "&" : "?") + _buildQuery(query);
		}
		return url;
	};
   /**
   * 提交一个请求
   * @Param string url 请求url
   * @Param object options 请求参数
   * @Param function callback jsonp回调函数
   http://pups.baidu.com/?callback=jsonpCallback&from=yx
   */
   var submitRequest = function(url,options,domElement,callback,timeoutCallback){
      options = options || {};
      
	  var getCallback = function(onTimeout){
      	   return function(){
      	   	  try{
      	   	  	if(onTimeout){
      	   	  		  timeoutCallback && timeoutCallback();
      	   	  	}else{
					 clearTimeout(timer);
      	   	  		 callback.apply(window, arguments);
      	   	  	}
				
				if(typeof(_tmpcallback) !=='undefined'){
					window[_tmpcallback] = null;
					delete window[_tmpcallback];
				}
      	   	  }catch(exception){		
							 	//ignore
      	   	  }finally{				  
      	   	    // _removeScriptTag(_script);
			  }
			}			
		};
	  
	 
      
	  if(callback){
		  var url = _appendQuery(url,options);
		  var _tmpcallback = "_upssad_jsonp_callback_" + new Date().getTime();
		  if(callbackReg.test(url)){//url中已经有了callback参数，替换掉
			 url = url.replace(callbackReg, '\x241' + 'callback' + '=' + _tmpcallback);			 
		  }else{
			 //var hasQuery = (/\?/g).test(url);
			// url += (hasQuery ? '&' : '?') + 'callback='+_tmpcallback   ; 
			 url = _appendQuery(url, "callback="+_tmpcallback);
		  }
		  window[_tmpcallback] = getCallback();
		}
		 var timeOut = 3000 ;//超时
	     var timer = setTimeout(getCallback(1) ,timeOut);
		
		 var _script = document.createElement("script");
		 _createScriptTag(_script,url);
		 
		 if(!callback){
			// _removeScriptTag(_script);
		 }	 
	 };
  
  var AdObject = function(productionId,domElement,data){
	  this.productionId = productionId ;
	  this.domElement = domElement ; 
	  this.data = data || {};
	  this.init = false;
  };
  
  AdObject.prototype = {
	  getErrNo : function(){
		  return this.data['errInfo']['no'];
	  },
	  getCodeType : function(){
  	 	   return this.data['dataList']['codeType'];
  	  },
  	  getCodeDefault : function(){
  	 	  return this.data['dataList']['codeDefault'];
  	  },
	  getAdWeight : function(){
		  return this.data['dataList']['adWidth'];
	  },
	  getAdHeight : function(){
		 return this.data['dataList']['adHeigh'];
	  },
	  getAdType : function(){
		 return this.data['dataList']['adType'];
	  },
	  getAdshowSuccUrl : function(){
		return this.data['dataList']['showUrl'] ;
	  },
	  getAdclickSuccUrl : function(){
		return this.data['dataList']['clickUrl'] ;
	  },
	  getAdMaterial : function(){
		return this.data['dataList']['adMaterial'] ;
	  },
	  getAdCustom : function(){
		return this.data['dataList']['adCustom'] ;
	  }
	}
	
  //创建默认广告
  var createDefaultAd =  function(adObject){
	  if(adObject.getCodeType() && adObject.getCodeDefault()){
		   if(adObject.getCodeType() == CODE_TYPE_JS){
				var script = document.createElement('script') ;
				script.type = 'text/javascript' ;
				script.text = adObject.getCodeDefault() ;
				adObject.domElement.appendChild(script);
		   }else if(adObject.getCodeType() == CODE_TYPE_HTML){
				//adObject.domElement.appendChild(adObject.getCodeDefault());
				adObject.domElement.innerHTML = adObject.getCodeDefault() ;
		   }else{
			   //do nothing
		   }
	  }
  };
  
  var onFlashLoadFinish = function(flash , loadCallback){
   var retryTimes= 90 ;
   var c = 0;
   
   var interval = setInterval(function(){
		if(c >= retryTimes){
		   clearInterval(interval); 
			return;
		}
		try{
			c ++ ;
			if(flash.IsPlaying()){
			    clearInterval(interval);   
				loadCallback && loadCallback(); 
			}
		}catch(ex){
			clearInterval(interval); 
		} 
   }, 30);
};
  
  
  //创建ups的广告
  var createUPSAd =  function(adObject){	 
    var iframe = createUPSAdIframe(adObject);
	var isNotIE = window.navigator.userAgent.indexOf('IE') == -1;
	var loadEvent = isNotIE ? 'onload' : 'onreadystatechange'  ;
	var loadFlag = false ;
	
	iframe[loadEvent] = function(){
		if(isNotIE || iframe.readyState == 'complete'){
				var ifrDoc = iframe.contentWindow.document;
				var ifrBody = iframe.contentWindow.document.body;
				ifrBody.style.cssText = 'margin:0;padding:0;';
				//图片类型的广告
				if(adObject.getAdType() == AD_TYPE_IMG){
					var _adImg = createUPSAdImg(adObject) ;
					ifrBody.innerHTML = _adImg;
					
					var _img = ifrBody.childNodes[0].childNodes[0] ;
					var _a = ifrBody.childNodes[0] ;
					loadFlag || (_img.onload = function(){
						loadFlag = true ;
						submitRequest(adObject.getAdshowSuccUrl(), {} ) ;
					})
					_a.onclick = function(){
						submitRequest(adObject.getAdclickSuccUrl(),{} ) ;
					}
				}else if(adObject.getAdType() == AD_TYPE_FLASH){
					var _adFlash = createUPSAdFlash(adObject) ;
					ifrBody.innerHTML = _adFlash;
					var _flash ;
					isNotIE ? _flash = ifrBody.childNodes[0].childNodes[4] : _flash = ifrBody.childNodes[0] ;
					var _a = ifrBody.childNodes[1] ;
					
					onFlashLoadFinish(_flash,function(){
						loadFlag || (function(){
							loadFlag = true ;
							submitRequest(adObject.getAdshowSuccUrl()+'&'+new Date().getTime(), {} ) ;
						})()
					});
					
					_a.onclick = function(){
						submitRequest(adObject.getAdclickSuccUrl()+'&'+new Date().getTime(),{} ) ;
					}
				}else if(adObject.getAdType() == AD_TYPE_CUSTOM){
					var _adCustom = createUPSAdCustom(adObject) ;
					if(adObject.getAdCustom()['adcustomType'] == CODE_TYPE_JS){
						ifrBody.appendChild(_adCustom) ;
				   }else if(adObject.getAdCustom()['adcustomType'] == CODE_TYPE_HTML){
						ifrBody.innerHTML = _adCustom;	
				   }					
				}
			}
    }
	
	if(adObject.domElement){
		adObject.domElement.appendChild(iframe);
	}
  }; //设置多属性
  var setUPSAtr = function(obj,params){
	  for(var i in params){
		  obj.setAttribute(i,params[i]) ;
	  }
  }
  
  //创建iframe
  var createUPSAdIframe = function(adObject){
	  var iframe = document.createElement('iframe');
	  var src= ((window.location ? window.location.protocol.toLowerCase() : document.location.protocol.toLowerCase()) == "https:" ? "https://passport.baidu.com/passApi/html/_blank.html" : "about:blank");
		setUPSAtr(iframe,{
			"id":"iframeID_" + adObject.productionId,
			"name":"iframeName_"+adObject.productionId,
			"scrolling":"no",
			"marginheight":"0",
			"marginwidth":"0",
			"allowtransparency":"0",
			"vspace":"0",
			"hspace":"0",
			"frameborder":"0",
			"src":src,
			"width":adObject.getAdWeight(),
			"height":adObject.getAdHeight(),
			"style":"border:none;margin:0;"
		}) ;	
		iframe.setAttribute("frameborder", "0", 0);
		return iframe ;
  };
  //创建图片广告
  var createUPSAdImg = function(adObject){
	  var imgBuilder = [] ;
	  imgBuilder.push("<a href='"+adObject.getAdMaterial()['adHref']+"' id='aAdvertId_"+adObject.productionId+"' target='_blank'>") ;
	  imgBuilder.push("<img id='imgId_"+ adObject.productionId+"' src='"+ adObject.getAdMaterial()['adSrc']+"' title='"+ adObject.getAdMaterial()['adAlt']+ "' alt='"+ adObject.getAdMaterial()['adAlt']+"' ");
	  imgBuilder.push("style='border:none;width:"+adObject.getAdWeight() +"px; height:"+adObject.getAdHeight()+"px' />");
	  imgBuilder.push("</a>") ;
	  return imgBuilder.join('') ;
  }; 
  //创建flash广告
  var createUPSAdFlash = function(adObject){
	var flashBuilder = [] ;
	flashBuilder.push("<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0' width='"+adObject.getAdWeight()+"' height='"+adObject.getAdHeight()+"' align='middle'>");
	flashBuilder.push("<param name='allowScriptAccess' value='never'>");
	flashBuilder.push("<param name='quality' value='high'>");
	flashBuilder.push("<param name='wmode' value='transparent'>");
	flashBuilder.push("<param name='movie' value='"+adObject.getAdMaterial()['adSrc']+"'>");
	flashBuilder.push("<embed wmode='transparent' name='aAdvertId_"+adObject.productionId+"' src='"+adObject.getAdMaterial()['adSrc']+"' quality='high' width='"+adObject.getAdWeight()+"' height='"+adObject.getAdHeight()+"' align='middle' allowscriptaccess='never' type='application/x-shockwave-flash' pluginspage='http://www.macromedia.com/go/getflashplayer'>");
	flashBuilder.push("</embed></object>");
	flashBuilder.push("<a href='"+adObject.getAdMaterial()['adHref']+"' id='aAdvertId_"+adObject.productionId+"' target='_blank' style='position:absolute;background:#fff;opacity:0;filter:alpha(opacity=0);width:"+adObject.getAdWeight()+"px;height:"+adObject.getAdHeight()+"px;left:0;top:0'></a>");
	return flashBuilder.join('') ;
  };
  //创建自定义广告
  var createUPSAdCustom =  function(adObject){
	  if(adObject.getAdCustom()['adcustomType'] && adObject.getAdCustom()['adcustomCode']){
		   if(adObject.getAdCustom()['adcustomType'] == CODE_TYPE_JS){
				var script = document.createElement('script') ;
				script.type = 'text/javascript' ;
				script.text = adObject.getAdCustom()['adcustomCode'] ;
				return script ;
		   }else if(adObject.getAdCustom()['adcustomType'] == CODE_TYPE_HTML){
				return adObject.getAdCustom()['adcustomCode'] ;
		   }
	  }
  };
  
    
  /**
  *
  *  callback : function(result){
  *  
   * }
  **/
  upsadvert.run = function(productionId,domElement,callback){
			function loadAdSuccess(data){
				if(!data){
					var resultObj = {
						"errno":"3",
						"msg":"系统问题"
					}
					callback && callback(resultObj) ;
					return;
				}				
				var adObj = new AdObject(productionId,domElement ,data);
				//var adObj = new AdObject(productionId,domElement ,mockData);
				if(adObj.getErrNo() == CODE_NO_SUCCESS){
					createUPSAd(adObj);
					resultObj = {
						"errno":"0",
						"msg":"成功"
					};
				}else if(adObj.getErrNo() == CODE_NO_DEFAULT){
					createDefaultAd(adObj);
					var defaultCode = adObj.getCodeDefault().replace(/(^\s*)|(\s*$)/g,"") ;
					if(defaultCode !=''){
						resultObj={
							"errno":"5",
							"msg":"自定义广告成功"
						};
					}else{
						resultObj={
							"errno":"1",
							"msg":"自定义代码为空"
						};
					}
				}else{
					resultObj={
						"errno":"2",
						"msg":"其他"
					};
				}
				callback && callback(resultObj) ;
			};
			
			function reloadAd(){
				setTimeout(function(){
			 	 		submitRequest( AD_DATA_URL , {from : productionId} ,domElement, loadAdSuccess , function(){
							 callback && callback({
								"errno":"3",
								"msg":"系统问题"
							});
						});	
			 	},300) ;
		    }
			submitRequest( AD_DATA_URL , {from : productionId} ,domElement, loadAdSuccess ,reloadAd);
			
			
 }
})(upsadvert)