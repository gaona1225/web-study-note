var columnData = {
	0: false,
	1: false,
	2: false,
	3: false,
	4: false,
	5: false,
	6: false,
	7: false
};

window.onload = function(){
	 
	
	
	var browserWidth  = parseInt(document.documentElement.clientWidth,10),
		iframeHeight  = parseInt(document.documentElement.clientHeight,10) - 160 + "px",
		navMoveWidth  = browserWidth*0.2,
		$_contentBox = $("#content_box"),
		$_navUl = $("#nav_ul"),
		$_navUlLi = $_navUl[0].getElementsByTagName("li"),
		count = 0;
	$("#content").css("height",iframeHeight);
	
	var top = "none", bottom = "none";
	
	$_contentBox.bind("webkitTransitionEnd", function(){ $_contentBox[0].style.webkitTransition = "";} );
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
			
			var isAndroid = $.isAndroid(),
				isTouch = $.isTouch();
			var content_list = document.getElementsByClassName("content_list")[-count];
			var list_box = document.getElementsByClassName('list_box')[-count];
			var touch = isAndroid ? event.changedTouches[0] : event;
			
			console.log(content_list);
			console.log(list_box);
			console.log(y);
			if( content_list.scrollTop <= 0  && y > 0){
				content_list.style.marginTop = y+ 'px';
				if(y < 50 ){
					document.getElementById("arrow_td").style.display = "block";
				}
				if(y > 50 ){
					document.getElementById("arrow_td").style.display = "none";
					document.getElementById("arrow_tr").style.display = "block";
					top = 'top';
				}
			}
			
			if( content_list.scrollTop >= (list_box.clientHeight- content_list.clientHeight-2) &&  y  < 0){
				content_list.style.marginTop = y + 'px';
				if(y < -50 ){
					document.getElementById("arrow_br").style.display = "block";
					document.getElementById("arrow_bd").style.display = "none";
					bottom = "bottom";
				}
				if(y > -50 ){
					document.getElementById("arrow_bd").style.display = "block";
					document.getElementById("arrow_br").style.display = "none";
				}
			}
		},
		
		dragContentYend : function(event,position,y){
			var isAndroid = $.isAndroid(),
				isTouch = $.isTouch(); 
			var touch = isAndroid ? event.changedTouches[0] : event;
			var content_list = document.getElementsByClassName("content_list")[-count];
			var list_box = document.getElementsByClassName('list_box')[-count];
			
			
			if(y > 50 && top == 'top' ){
				document.getElementById("arrow_td").style.display = "none";
				document.getElementById("arrow_tr").style.display = "none";
				document.getElementById("arrow_tload").style.display = "block";
				content_list.style.webkitTransition = 'margin-top 0.2s linear';
				content_list.style.marginTop =  '50px';
				top == 'none';
				upLoad(0,1);
				
			}else if(0 < y   && y  < 50){
				
				document.getElementById("arrow_td").style.display = "none";
				document.getElementById("arrow_tr").style.display = "none";
				document.getElementById("arrow_tload").style.display = "none";
				content_list.style.webkitTransition = 'margin-top 0.2s linear';
				content_list.style.marginTop =  '0px';
			}else if(-50 < y   && y  < 0){
			
				document.getElementById("arrow_bd").style.display = "none";
				document.getElementById("arrow_br").style.display = "none";
				document.getElementById("arrow_bload").style.display = "none";
				content_list.style.webkitTransition = 'margin-top 0.2s linear';
				content_list.style.marginTop =  '0px';
			}else if(y  < -50 && bottom == "bottom"){
			 	bottom = "none";
				document.getElementById("arrow_bd").style.display = "none";
				document.getElementById("arrow_br").style.display = "none";
				document.getElementById("arrow_bload").style.display = "block";
				content_list.style.webkitTransition = 'margin-top 0.2s linear';
				content_list.style.marginTop =  '-50px';
			}
			
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
					
					firstLoad(-count);
					
					dom.style.webkitTransition = 'margin-left 0.3s linear';
					dom.style.marginLeft = count*browserWidth + "px";
					$_navUlLi[-count].classList.add("current");
					$_navUlLi[-count+1].classList.remove("current");
					if(count >= -3 && count != 0 ){
						$_navUl[0].style.webkitTransition = 'margin-left 0.3s linear';
						$_navUl[0].style.marginLeft = (count+1)*navMoveWidth +'px';
					}
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
					if(count< -7 ){
						dom.style.marginLeft =  -7*browserWidth+"px" ;
						count = -7;
					}else{
						
						firstLoad(-count);
						
						dom.style.marginLeft = count*browserWidth+"px";
						
						$_navUlLi[-count].classList.add("current");
						$_navUlLi[-count-1].classList.remove("current");
						if(count <= -4 && count > -7 ){
							$_navUl[0].style.webkitTransition = 'margin-left 0.3s linear';
							$_navUl[0].style.marginLeft = (count+3)*navMoveWidth +'px';
						}
					}
				}
			}
			
		}
		
		
			
	});
	
	
	$_navUl.bind("webkitTransitionEnd", function(){ $_navUl[0].style.webkitTransition = ""; });
	$_navUl.draggableX({
		direct : 'x',
		start: function(event,position){
			event.stopPropagation();
			position.left = position.endX;
		},
		drag: function(event,position){
			event.stopPropagation();
		},
		end: function(event,position,dom){
			var startX = position.left; //拖拽前的X值
			var endX = position.endX; //拖拽后的X值
			var length = endX - startX; //拖拽前 - 拖拽后  =  拖拽方向 和 拖拽距离
			var count = parseInt(endX / navMoveWidth ,10);
			 
			
			//right -->
			if(length>1){
				if(length<40){
					dom.style.webkitTransition = 'left 0.3s linear';
					dom.style.left = startX+"px";
				}else{
					dom.style.webkitTransition = 'left 0.3s linear';
					if(count>=0){
						dom.style.left =  "0px";
					}else{
						dom.style.left = count*navMoveWidth + "px";
					}
				}
			}
			//left <--
			if(length<-1){
				if(length>(-40)){
					dom.style.webkitTransition = 'left 0.3s linear';
					dom.style.left =  startX+"px";
				}
				else{
					dom.style.webkitTransition = 'left 0.3s linear';
					if(count<= -3 ){
						dom.style.left =   -3*navMoveWidth +"px" ;
					}else{
						dom.style.left = count*navMoveWidth+"px";
						 
					}
				}
			}
			 
		}
	});
	
	$("#sibar").bind("webkitTransitionEnd", function(){ $("#sibar")[0].style.webkitTransition = ""; });
	$("#sibar").dragRightBar(browserWidth);
	document.getElementById("tool_btn").addEventListener('click',function(){
		$("#sibar")[0].style.webkitTransition = 'left 0.3s linear';
		$("#sibar")[0].style.left = "10%";
	},false);
	
	
	
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
			firstLoad(index)
		}
	}
	
	$_navUlLi[0].addEventListener('click',function(){navUlLiTap.tap(0) },false);
	$_navUlLi[1].addEventListener('click',function(){navUlLiTap.tap(1) },false);
	$_navUlLi[2].addEventListener('click',function(){navUlLiTap.tap(2) },false);
	$_navUlLi[3].addEventListener('click',function(){navUlLiTap.tap(3) },false);
	$_navUlLi[4].addEventListener('click',function(){navUlLiTap.tap(4) },false);
	$_navUlLi[5].addEventListener('click',function(){navUlLiTap.tap(5) },false);
	$_navUlLi[6].addEventListener('click',function(){navUlLiTap.tap(6) },false);
	$_navUlLi[7].addEventListener('click',function(){navUlLiTap.tap(7) },false);
	


	firstLoad(0);
	
	
	

}




function upLoad(cid,pageNo){
	$.ajax({
		url : "http://10.6.210.229:8080/wiki/index?appId=1&cid="+ cid +"&pageNo=" + pageNo,
		success : function(result) {
			var page = result['page'];
			var pageDatas = result['page']['datas'];
			var content = "";
			if (pageDatas) {
				for ( var i = 0 ; i < pageDatas.length; i++) {
					content += '<section class="con_box"  >'
							+ '<a class="con_head" href="#"><img src="img/tx.png" /></a>'
							+ '<dl class="con_detail">'
							+ '<dt class="con_detail_t">'
							+ '<span class="con_detail_name">'+ pageDatas[i]['userName'] +'</span>'
							+ '<span class="con_detail_from">'+ pageDatas[i]['address'] +'</span>'
							+ '<span class="con_detail_time">'+ pageDatas[i]['createTime'] +'</span>'
							+ '</dt>'
							+ '<dd class="con_detail_arow"><a class="con_tool_arow" href="#"></a></dd>'
							+ '<dd class="con_detail_c">'+ pageDatas[i]['content'] +'</dd>'
							+ '<dd class="con_detail_d">'+ pageDatas[i]['isHasAdd'] +'</dd>'
							+ '</dl>'
							+ '</section>';
				}
			}
			
			var section = document.createElement("section");
			section.innerHTML = content;
			document.getElementsByClassName('list_box')[cid].appendChild(section) ;
			
		},
		type : 'json'
	});
	
};

function firstLoad(cid){
	
	$.ajax({
		url : "http://10.6.210.229:8080/wiki/index?appId=1&cid="+cid,
		success : function(result) {
			var page = result['page'];
			var pageDatas = result['page']['datas'];
			var content = "";
			if (pageDatas) {
				for ( var i = 0 ; i < pageDatas.length; i++) {
					content += '<section class="con_box"  >'
							+ '<a class="con_head" href="#"><img src="img/tx.png" /></a>'
							+ '<dl class="con_detail">'
							+ '<dt class="con_detail_t">'
							+ '<span class="con_detail_name">'+ pageDatas[i]['userName'] +'</span>'
							+ '<span class="con_detail_from">'+ pageDatas[i]['address'] +'</span>'
							+ '<span class="con_detail_time">'+ pageDatas[i]['createTime'] +'</span>'
							+ '</dt>'
							+ '<dd class="con_detail_arow"><a class="con_tool_arow" href="#"></a></dd>'
							+ '<dd class="con_detail_c">'+ pageDatas[i]['content'] +'</dd>'
							+ '<dd class="con_detail_d">'+ pageDatas[i]['isHasAdd'] +'</dd>'
							+ '</dl>'
							+ '</section>';
				}
			}
			
			document.getElementsByClassName('list_box')[cid].innerHTML = content;
		},
		type : 'json'
	});
}

