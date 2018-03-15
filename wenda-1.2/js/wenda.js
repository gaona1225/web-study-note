var browserWidth  = parseInt(document.documentElement.clientWidth,10) ,
	browserHeight  = parseInt(document.documentElement.clientHeight,10),
	iframeHeight = '400px',
	navMoveWidth  = browserWidth*0.2 ,
	$$ = {}, /*存放dom结构*/
	isAndroid = $.isAndroid(),
	isTouch = $.isTouch(),
	count = 0 ,
	columnData = {
		0: false,
		1: false,
		2: false,
		3: false,
		4: false,
		5: false,
		6: false,
		7: false
	},
	dragYstatus = {
		top : "none",
		bottom : "none"
	},
	nextPageNo = {
		0 : 1,
		1 : 1,
		2 : 1,
		3 : 1,
		4 : 1,
		5 : 1,
		6 : 1,
		7 : 1
	};
function getDates(time){
	var times = {}, allTime = new Date(parseInt(time)).toLocaleString().replace(/年|月/g,"-").replace(/日/g,'').replace(/:\d{1,2}$/,'');   
	times.allTime = allTime;
	var day = allTime.split(" ");
	times.day = day[0];
	times.time = day[1];
	return times;
}
function getTimes(infoTime,nowTime){   
	if(!infoTime){
		return;
	}
	if(!nowTime){
		nowTime = new Date().getTime();
	}
	var nowT = getDates(nowTime),infoT = getDates(infoTime);
	
	if(nowT.day == infoT.day){
		return '今日 '+infoT.time;
	}else{
		return infoT.day;
	}
}

window.onresize = function(){
	browserWidth  = parseInt(document.documentElement.clientWidth,10);
	if(browserWidth < 640){
		iframeHeight = browserHeight - 80 +'px';
	}else{
		iframeHeight = browserHeight - 159 +'px';
	}
	$("#content").css("height",iframeHeight);
}

window.onload = function(){
	if(browserWidth < 640){
		iframeHeight = browserHeight - 80 +'px';
	}else{
		iframeHeight = browserHeight - 159 +'px';
	}
	
	$("#content").css("height",iframeHeight);
	$$.contentBox = $("#content_box");
	$$.navUl = $("#nav_ul");
	$$.navUlLi = $$.navUl[0].getElementsByTagName("li"); 
	$$.sibar = $("#sibar");
	$$.tool_btn = document.getElementById("tool_btn");
	$$.arrow_td = document.getElementById("arrow_td");
	$$.arrow_tr = document.getElementById("arrow_tr");
	$$.arrow_tload = document.getElementById("arrow_tload");
	$$.arrow_br = document.getElementById("arrow_br");
	$$.arrow_bd = document.getElementById("arrow_bd");
	$$.arrow_bload = document.getElementById("arrow_bload");
	$$.content_lists = document.getElementsByClassName("content_list");
	$$.list_boxs = document.getElementsByClassName('list_box');
	
	firstLoad(0); //首次加载ajax数据
	
	/*主contentBox滑动*/
	$$.contentBox.dragMargin({
		start: function(event,position){
			event.stopPropagation();
			position.left = position.endX;
		},
		drag: function(event,position){
			event.stopPropagation();
		},
		
		dragContentY : function(event,position,y){
			event.stopPropagation();
			
			var content_list = $$.content_lists[-count],
				list_box = $$.list_boxs[-count];
			
			if( content_list.scrollTop <= 0  && y > 0){
				content_list.style.marginTop = y+ 'px';
				if(y < 50 ){
					$$.arrow_td.style.display = "block";
				}
				if(y > 50 ){
					$$.arrow_td.style.display = "none";
					$$.arrow_tr.style.display = "block";
					dragYstatus.top = 'top';
				}
			}else if( content_list.scrollTop >= (list_box.clientHeight- content_list.clientHeight-2) &&  y  < 0){
				content_list.style.marginTop = y + 'px';
				if(y < -50 ){
					$$.arrow_br.style.display = "block";
					$$.arrow_bd.style.display = "none";
					dragYstatus.bottom = "bottom";
				}
				if(y > -50 ){
					$$.arrow_bd.style.display = "block";
					$$.arrow_br.style.display = "none";
				}
			}
		},
		
		dragContentYend : function(event,position,y){
			var content_list = $$.content_lists[-count],
				list_box = $$.list_boxs[-count];
			
			if(y > 50 && dragYstatus.top == 'top' ){
				$$.arrow_td.style.display = "none";
				$$.arrow_tr.style.display = "none";
				$$.arrow_tload.style.display = "block";
				firstLoad(-count);
				content_list.style.webkitTransition = 'margin-top 0.2s linear';
				content_list.style.marginTop =  '50px';
				dragYstatus.top = 'none';
			
			}else if(0 < y   && y  < 50){
				
				$$.arrow_td.style.display = "none";
				$$.arrow_tr.style.display = "none";
				$$.arrow_tload.style.display = "none";
				content_list.style.webkitTransition = 'margin-top 0.2s linear';
				content_list.style.marginTop =  '0px';
			}else if(-50 < y   && y  < 0){
			
				$$.arrow_bd.style.display = "none";
				$$.arrow_br.style.display = "none";
				$$.arrow_bload.style.display = "none";
				content_list.style.webkitTransition = 'margin-top 0.2s linear';
				content_list.style.marginTop =  '0px';
			}else if(y  < -50 && dragYstatus.bottom == "bottom"){
			 	dragYstatus.bottom = "none";
				$$.arrow_bd.style.display = "none";
				$$.arrow_br.style.display = "none";
				$$.arrow_bload.style.display = "block";
				content_list.style.webkitTransition = 'margin-top 0.2s linear';
				content_list.style.marginTop =  '-50px';
				upLoad(-count,nextPageNo[-count]);
			}
		},
		
		end: function(event,position,dom){
			var startX = position.left,
				endX = position.endX,
				length = endX - startX;
			count = Math.floor(endX / browserWidth);
			
			//right -->
			if(length>0){
				if(length < 40 || (length > 40 && count == 0)){
					dom.style.webkitTransition = 'margin-left 0.3s linear';
					dom.style.marginLeft = startX+"px";
				}else{
					count += 1;
					if( !columnData[-count] ){
						firstLoad(-count);
					}
					dom.style.webkitTransition = 'margin-left 0.3s linear';
					dom.style.marginLeft = count*browserWidth + "px";
					$$.navUlLi[-count].classList.add("current");
					$$.navUlLi[-count+1].classList.remove("current");
					if(count >= -3 && count != 0 ){
						$$.navUl[0].style.webkitTransition = 'margin-left 0.3s linear';
						$$.navUl[0].style.marginLeft = (count+1)*navMoveWidth +'px';
					}
				}
			}
			//left <--
			if(length<0){
				if(length > -40){
					dom.style.webkitTransition = 'margin-left 0.3s linear';
					dom.style.marginLeft =  startX+"px";
					count +=1 ;
					
				}
				else{
					dom.style.webkitTransition = 'margin-left 0.3s linear';
					if(count< -7 ){
						dom.style.marginLeft =  -7*browserWidth+"px" ;
						count = -7;
					}else{
						
						if( !columnData[-count] ){
							firstLoad(-count);
						}
						dom.style.marginLeft = count*browserWidth+"px";
						$$.navUlLi[-count].classList.add("current");
						$$.navUlLi[-count-1].classList.remove("current");
						if(count <= -4 && count > -7 ){
							$$.navUl[0].style.webkitTransition = 'margin-left 0.3s linear';
							$$.navUl[0].style.marginLeft = (count+3)*navMoveWidth +'px';
						}
					}
				}
			}
			
		}
		
	});
	
	/*nav滑动*/
	$$.navUl.draggableX({
		direct : 'x',
		start: function(event,position){
			event.stopPropagation();
			position.left = position.endX;
		},
		drag: function(event,position){
			event.stopPropagation();
		},
		end: function(event,position,dom){
			var startX = position.left;
			var endX = position.endX;
			var length = endX - startX;
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
	/*nav点击事件的交互*/
	var navUlLiTap = {
		len : $$.navUlLi.length ,
		remove : function(){
			for(var i = 0; i<this.len ; i++ ){
				$$.navUlLi[i].classList.remove("current");
			}
		},
		tap : function(index){
			this.remove();
			count = -index;
			$$.navUlLi[index].classList.add("current");
			$$.contentBox[0].style.webkitTransition = 'margin-left 0.3s linear';
			$$.contentBox[0].style.marginLeft = -index*browserWidth+"px";
			if( !columnData[index] ){
				columnData[index] = true ;
				firstLoad(index);
			}
		}
	}
	$$.navUlLi[0].addEventListener('click',function(){navUlLiTap.tap(0) },false);
	$$.navUlLi[1].addEventListener('click',function(){navUlLiTap.tap(1) },false);
	$$.navUlLi[2].addEventListener('click',function(){navUlLiTap.tap(2) },false);
	$$.navUlLi[3].addEventListener('click',function(){navUlLiTap.tap(3) },false);
	$$.navUlLi[4].addEventListener('click',function(){navUlLiTap.tap(4) },false);
	$$.navUlLi[5].addEventListener('click',function(){navUlLiTap.tap(5) },false);
	$$.navUlLi[6].addEventListener('click',function(){navUlLiTap.tap(6) },false);
	$$.navUlLi[7].addEventListener('click',function(){navUlLiTap.tap(7) },false);
	
	
	/*右侧栏滑动交互*/
	$$.sibar.dragRightBar(browserWidth);
	$$.tool_btn.addEventListener('click',function(){
		$$.sibar[0].style.webkitTransition = 'left 0.3s linear';
		$$.sibar[0].style.left = "10%";
	},false);

}

window.addEventListener("webkitTransitionEnd", function(){ 
	event.target.style.webkitTransition = "";
},false);


function firstLoad(cid,pageNo){
	if(!pageNo){
		pageNo = 1;
	}
	$.ajax({
		url : "http://10.6.210.229:8080/wiki/index?appId=1&cid="+cid +"&pageNo="+pageNo,
		success : function(result) {
			columnData[cid] = true ;
			var nowTime = result['time'],
				showTime = "",
				page = result['page'],
				pageDatas = result['page']['datas'],
				content = "";
			
			if (pageDatas) {
				for ( var i = 0 ; i < pageDatas.length; i++) {
					showTime = getTimes(pageDatas[i]['createTime'],nowTime);
					content += '<section class="con_box"  >'
							+ '<a class="con_box_a" href="question.html?appId=1&cid='+ pageDatas[i]['categoryId'] +'&qid='+  pageDatas[i]['id'] +'&accessToken=a">'
							+ '<sapn class="con_head" ><img src="img/tx.png" /></sapn>'
							+ '<dl class="con_detail">'
							+ '<dt class="con_detail_t">'
							+ '<span class="con_detail_name">'+ pageDatas[i]['userName'] +'</span>'
							+ '<span class="con_detail_from">'+ pageDatas[i]['address'] +'</span>'
							+ '<span class="con_detail_time">'+ showTime +'</span>'
							+ '</dt>'
							+ '<dd class="con_detail_c">'+ pageDatas[i]['content'] +'</dd>'
							+ '<dd class="con_detail_d">'+ pageDatas[i]['answerNum'] +'个回答</dd>'
							+ '</dl>'
							+ '</a>'
							+ '</section>';
				}
			}
			nextPageNo[cid] = page["nextPage"];
			$$.list_boxs[cid].innerHTML = content;
			$$.arrow_tload.style.display = "none";
			var content_list = $$.content_lists[cid];
			//content_list.style.webkitTransition = 'margin-top 0.2s linear';
			content_list.style.marginTop =  '0px';
		},
		type : 'json'
	});
}

function upLoad(cid,pageNo){
	if(!pageNo){
		pageNo = 1;
	}
	
	$.ajax({
		url : "http://10.6.210.229:8080/wiki/index?appId=1&cid="+ cid +"&pageNo=" + pageNo,
		success : function(result) {
			var nowTime = result['time'],
				showTime = "",
				page = result['page'],
				pageDatas = result['page']['datas'],
				content = "";
			
			if(nextPageNo[cid] <= page["totalPage"] && page["totalPage"]!= page["nextPage"]  ){
				console.log('upLoad');
				nextPageNo[cid] =  page["nextPage"] ;
				if (pageDatas) {
					for ( var i = 0 ; i < pageDatas.length; i++) {
						showTime = getTimes(pageDatas[i]['createTime'],nowTime);
						content += '<section class="con_box"  >'
								+ '<a class="con_box_a" href="question.html?appId=1&cid='+ pageDatas[i]['categoryId'] +'&qid='+  pageDatas[i]['id'] +'&accessToken=a">'
								+ '<sapn class="con_head" ><img src="img/tx.png" /></sapn>'
								+ '<dl class="con_detail">'
								+ '<dt class="con_detail_t">'
								+ '<span class="con_detail_name">'+ pageDatas[i]['userName'] +'</span>'
								+ '<span class="con_detail_from">'+ pageDatas[i]['address'] +'</span>'
								+ '<span class="con_detail_time">'+ showTime +'</span>'
								+ '</dt>'
								+ '<dd class="con_detail_c">'+ pageDatas[i]['content'] +'</dd>'
								+ '<dd class="con_detail_d">'+ pageDatas[i]['answerNum'] +'个回答</dd>'
								+ '</dl>'
								+ '</a>'
								+ '</section>';
					}
				}
				var section = document.createElement("section");
				section.innerHTML = content;
				$$.list_boxs[cid].appendChild(section) ;
			}
			
			var content_list = $$.content_lists[cid];
			//content_list.style.webkitTransition = 'margin-top 0.2s linear';
			content_list.style.marginTop =  '0px';
			$$.arrow_bload.style.display = "none";
		},
		type : 'json'
	});
	
};

ajaxMyMsg() ;
loadNewMsg() ;

function ajaxMyMsg(){
	var uid = 111111 ;
	var accessToken = 'a' ;
	var source = 1 ;
	$.ajax({
		url : 'http://10.6.210.229:8080/wiki/getUser?accessToken=' + accessToken + '&source=' + source + '&uid=' + uid ,
		success : function(result) {
			var user = result['user'] ;
			//console.log(user['integral']) ;	
			var photo = '<img src="' + result['user']['logo'] + '" />' ;
			document.getElementById('sibarLogin').innerHTML = photo ;
			document.getElementById('sibarNun').innerHTML = '贡献值：' + result['user']['integral'] ;
		},
		type : 'json'
	});
}
function loadNewMsg(){
	var accessToken = 'a' ;
	$.ajax({
		url : 'http://10.6.210.229:8080/wiki/newMessage?accessToken=' + accessToken ,
		success : function(result) {					
			var newNum = result['num'] ;
			if(newNum>0){
				var span = document.createElement('span') ;
				span.innerHTML = newNum ;
				document.getElementById('myMsg').appendChild(span) ;
			}
		},
		type : 'json'
	});
}