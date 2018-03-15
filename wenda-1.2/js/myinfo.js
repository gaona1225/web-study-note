window.onload = function(){
	var browserWidth  = parseInt(document.documentElement.clientWidth,10),
		iframeHeight  = parseInt(document.documentElement.clientHeight,10) - 160 + "px",
		navMoveWidth  = browserWidth*0.2,
		$_contentBox = $("#content_box"),
		$_navUl = $("#my_nav_ul"),
		$_navUlLi = $_navUl[0].getElementsByTagName("li");
	$("#content").css("height",iframeHeight);
	
	var top = "none", bottom = "none";
	
	$_contentBox.bind("webkitTransitionEnd", function(){$("#content_box")[0].style.webkitTransition = "";} );
	$_contentBox.dragMargin({
		start: function(event,position){
			event.stopPropagation();
			position.left = position.endX;
		},
		drag: function(event,position){
			event.stopPropagation();
		},
		
		dragContentY : function(event,position,y){
			event.stopPropagation();
			
		},
		
		dragContentYend : function(event,position,y){
					
		},
		
		end: function(event,position,dom){
			var startX = position.left, //拖拽前的X值
				endX = position.endX, //拖拽后的X值
				length = endX - startX; //拖拽前 - 拖拽后  =  拖拽方向 和 拖拽距离
			
			count = Math.floor(endX / browserWidth);
			 
			//right -->
			if(length>0){
				if(length < 40 || (length > 40 && count == 0)){
					dom.style.webkitTransition = 'margin-left 0.3s linear';
					dom.style.marginLeft = startX+"px";
				}else{
					count = count+1;
					
					dom.style.webkitTransition = 'margin-left 0.3s linear';
					dom.style.marginLeft = count*browserWidth + "px";
					$_navUlLi[-count].classList.add("current");
					$_navUlLi[-count+1].classList.remove("current");					
				}
			}
			//left <--
			if(length<0){
				if(length > -40){
					dom.style.webkitTransition = 'margin-left 0.3s linear';
					dom.style.marginLeft =  startX+"px";
					count = count +1 ;
				}
				else{
					dom.style.webkitTransition = 'margin-left 0.3s linear';
					if(count< -2 ){
						dom.style.marginLeft =  -2*browserWidth+"px" ;
						count = -2;
					}else{
						dom.style.marginLeft = count*browserWidth+"px";
						
						$_navUlLi[-count].classList.add("current");
						$_navUlLi[-count-1].classList.remove("current");
					}
				}
			}
		}	
	});
		
	var navUlLiTap = {
		len : $_navUlLi.length ,
		remove : function(){
			for(var i = 0; i<this.len ; i++ ){
				$_navUlLi[i].classList.remove("current");
			}
		},
		tap : function(index){
			this.remove();
			count = -index;
			$_navUlLi[index].classList.add("current");
			$_contentBox[0].style.webkitTransition = 'margin-left 0.3s linear';
			$_contentBox[0].style.marginLeft = -index*browserWidth+"px";
		}
	}
	
	$_navUlLi[0].addEventListener('click',function(){navUlLiTap.tap(0) },false);
	$_navUlLi[1].addEventListener('click',function(){navUlLiTap.tap(1) },false);
	$_navUlLi[2].addEventListener('click',function(){navUlLiTap.tap(2) },false);
	
	
	var url=location.search; 
	function getSearch(url){
		var request = {}, str='',strs=[], strsSplit=[]; 
		if(url.indexOf("?")!=-1){ 
			str = url.substr(1);
			strs = str.split("&"); 
			for(var i = 0, strsLen = strs.length; i<strsLen; i++){ 
				strsSplit = strs[i].split("=");
				request[ strsSplit[0]] = strsSplit[1]; 
			}
		}
		return request;
	}
	var req = getSearch(url),qid = req['qid'] ,pics = [];
	var tabNum = req['tabNum'] ;
	if(tabNum){
		$_navUlLi[tabNum].click() ;
	}
}