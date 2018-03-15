window.onload = function(){
	var browserWidth  = parseInt(document.documentElement.clientWidth,10),
		iframeHeight  = parseInt(document.documentElement.clientHeight,10) - 160 + "px",
		navMoveWidth  = browserWidth*0.2,
		$_contentBox = $("#content_box"),
		$_navUl = $("#my_nav_ul"),
		$_navUlLi = $_navUl[0].getElementsByTagName("li");
	$("#content").css("height",iframeHeight);
	
	
	$_contentBox.bind("webkitTransitionEnd", function(){$("#content_box")[0].style.webkitTransition = "";} );

	$_contentBox.draggable({
		//direct : 'x',
		start: function(event,position){
			event.stopPropagation();
			position.left = position.endX;
			position.top = position.endY;
			
		},
		drag: function(event,position){
			event.stopPropagation();
			
		},
		end: function(event,position,dom){			
			
			var startX = parseInt(position.left,10), //拖拽前的X值
				endX = parseInt(position.endX,10), //拖拽后的X值
				length = parseInt(endX - startX ,10), //拖拽前 - 拖拽后  =  拖拽方向 和 拖拽距离
				count = parseInt(endX / browserWidth ,10);
				
			
			//right -->
			if(length>1){
				if(length<40){
					dom.style.webkitTransition = 'left 0.3s ease-in-out';
					dom.style.left = startX+"px";
				}else{
					dom.style.webkitTransition = 'left 0.3s ease-in-out';
					dom.style.left = count*browserWidth + "px";
					$_navUlLi[-count].classList.add("current");
					$_navUlLi[-count+1].classList.remove("current");
					if(count>=-3){
						$_navUl[0].style.webkitTransition = 'left 0.3s ease-in-out';
						$_navUl[0].style.left = count*navMoveWidth +'px';
					}
					
				}
			}
			//left <--
			if(length<-1){
				if(length>(-40)){
					dom.style.webkitTransition = 'left 0.3s ease-in-out';
					dom.style.left =  startX+"px";
				}
				else{
					dom.style.webkitTransition = 'left 0.3s ease-in-out';
					if(count<=(-7)){
						dom.style.left = (count*browserWidth+"px");
					
					}else{
						dom.style.left = (count-1)*browserWidth+"px";
						
						$_navUlLi[-count+1].classList.add("current");
						$_navUlLi[-count].classList.remove("current");
						if(count<=-4){
							$_navUl[0].style.webkitTransition = 'left 0.3s ease-in-out';
							$_navUl[0].style.left = (count+3)*navMoveWidth +'px';
						}
					}
				}
			}			 
		}	
	});
	
	$_navUl.bind("webkitTransitionEnd", function(){ $_navUl[0].style.webkitTransition = ""; });
	$_navUl.draggable({
		direct : 'x',
		start: function(event,position){
			event.stopPropagation();
			position.left = position.endX;
		},
		drag: function(event,position){
			event.stopPropagation();
		},
		end: function(event,position,dom){
			var startX = parseInt(position.left,10); //拖拽前的X值
			var endX = parseInt(position.endX,10); //拖拽后的X值
			var length = parseInt(endX - startX ,10); //拖拽前 - 拖拽后  =  拖拽方向 和 拖拽距离
			var count = parseInt(endX / navMoveWidth ,10);
			
			//right -->
			if(length>1){
				if(length<40){
					dom.style.webkitTransition = 'left 0.3s ease-in-out';
					dom.style.left = startX+"px";
				}else{
					dom.style.webkitTransition = 'left 0.3s ease-in-out';
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
					dom.style.webkitTransition = 'left 0.3s ease-in-out';
					dom.style.left =  startX+"px";
				}
				else{
					dom.style.webkitTransition = 'left 0.3s ease-in-out';
					if(count<= -3 ){
						dom.style.left =   -3*navMoveWidth +"px" ;
					}else{
						dom.style.left = (count-1)*browserWidth+"px";
						$_navUl[0].style.left = (count-1)*navMoveWidth +'px';
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
			$_navUlLi[index].classList.add("current");
			$_contentBox[0].style.webkitTransition = 'left 0.3s ease-in-out';
			$_contentBox[0].style.left = -index*browserWidth+"px";
		}
	}
	
	$_navUlLi[0].addEventListener('click',function(){navUlLiTap.tap(0) },false);
	$_navUlLi[1].addEventListener('click',function(){navUlLiTap.tap(1) },false);
	$_navUlLi[2].addEventListener('click',function(){navUlLiTap.tap(2) },false);
	
	
	/*我的消息删除交互*/
	var _delBtn = document.getElementById('del_btn') ;
	var _popTool = document.getElementById('popTool') ;
	if(_delBtn){
		_delBtn.onclick = function(){
			document.getElementById('popBox2').style.display = 'block' ;
			document.getElementById('popMask2').style.display = 'block' ;
		}
	}
	if(_popTool){
		_popTool.onclick = function(){
			document.getElementById('popBox2').style.display = 'none' ;
			document.getElementById('popMask2').style.display = 'none' ;
		}
	}
}


