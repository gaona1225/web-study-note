(function(Pandora){
	var isAndroid = Pandora.isAndroid(),
		isTouch = Pandora.isTouch();

	var _touchstart = (isTouch ? 'touchstart' : 'mousedown'), 
	_touchmove = (isTouch ? 'touchmove' : 'mousemove'), 
	_touchend = (isTouch ? 'touchend' : 'mouseup');
	
	Pandora.fn.dragMargin = function(option) {
		option = option || {};
		var t = this[0];
		
		if(!t) {
			return;
		}
		
		var isdrag = false,
		direction = "none",
		position = {
			distX : 0,
			distY : 0,
			startX : 0,
			startY : 0,
			endX : 0,
			endY : 0
		},
		dragstart = function(event) {
			isdrag = true;
			var touch = isAndroid ? event.changedTouches[0] : event;
			position.startX = touch.pageX;
			position.startY = touch.pageY;
			if(t.style.marginTop) {
				position.endY = parseInt(t.style.marginTop);
			}
			
			if(t.style.marginLeft) {
				position.endX = parseInt(t.style.marginLeft);
			}
			
			option.start(event, position,t);

		}, 
		drag = function(event) {
			
			if(!isdrag) {
				return;
			}
			var touch = isAndroid ? event.targetTouches[0] : event;
				position.distX = touch.pageX - position.startX + position.endX, 
				position.distY = touch.pageY - position.startY + position.endY;
			
			
			if(direction === "x"){
				event.preventDefault();
				t.style.marginLeft = position.distX + 'px';
				option.drag(event, position,t);
			
			}else if(direction === "y"){
				
				option.dragContentY(event, position,position.distY);
				
			}else if(direction === "none"){
				var ex = Math.abs(touch.pageX - position.startX),
					ey = Math.abs(touch.pageY - position.startY);
				if((ex > 8 || ey > 8) && ex > ey ){
					direction = "x";
				}else if((ex > 8 || ey > 8) && ex < ey){
					direction = "y";
				}
			}
			
		},
		dragend = function(event) {
			if(direction == "x") {
				if(t.style.marginLeft) {
					position.endX = parseInt(t.style.marginLeft);
				}
				option.end(event, position,t);
				
			}
			if(direction == "y") {
				if(t.style.marginTop) {
					position.endY = parseInt(t.style.marginTop);
				}
				option.dragContentYend(event, position,position.distY);
				
			}
			direction = "none";
			isdrag = false;
			
			
		};
		
		t.addEventListener(_touchstart, dragstart, true);
		t.addEventListener(_touchmove, drag, true);
		t.addEventListener(_touchend, dragend, true);
	}
	
	Pandora.fn.draggableX = function(option) {
		option = option || {};
		var t = this[0];
		
		if(!t) {
			return;
		}
		
		var isdrag = false,
		position = {
			startX : 0,
			startY : 0,
			endX : 0,
			endY : 0
		},
		dragstart = function(event) {
			isdrag = true;
			var touch = isTouch ? event.changedTouches[0] : event;
			position.startX = touch.pageX;
			
			if(t.style.left) {
				position.endX = parseInt(t.style.left);
			}
			
			option.start(event, position,t);

		}, 
		drag = function(event) {
			
			if(!isdrag) {
				return;
			}
			var touch = isTouch ? event.targetTouches[0] : event ,
				x = touch.pageX - position.startX + position.endX; 
			
				event.preventDefault();
				t.style.left = x + 'px';
				option.drag(event, position,t);
		
		},
		dragend = function(event) {
			isdrag = false;
			if(t.style.left) {
				position.endX = parseInt(t.style.left);
			}
			
			option.end(event, position,t);
		};
		
		t.addEventListener(_touchstart, dragstart, true);
		t.addEventListener(_touchmove, drag, true);
		t.addEventListener(_touchend, dragend, true);
	}
	
	
	Pandora.fn.dragRightBar = function(browserWidth) {
		var t = this[0];
		
		if(!t) {
			return;
		}
		
		var isdrag = false, 
		moveRight = "none",
		position = {
			startX : 0,
			startY : 0,
			endX : 0,
			endY : 0
		},
		dragstart = function(event) {
			isdrag = true;
			var touch = isTouch ? event.changedTouches[0] : event;
			position.startX = touch.pageX;
			
			if(t.style.left) {
				position.endX = parseInt(t.style.left);
			}
			

		},
		drag = function(event) {
			if(!isdrag) {
				return;
			}
			event.preventDefault();
			var touch = isTouch ? event.targetTouches[0] : event ,
				x = touch.pageX - position.startX + browserWidth*0.1,
				ex = touch.pageX - position.startX; 
			if( ex > 0 ){
				t.style.left = x + 'px';
				moveRight = "right";
			}else{
				moveRight = "none";
			}
		
		},
		dragend = function(event) {
			isdrag = false;
			if(moveRight == "right"){
				moveRight = "none";
				t.style.webkitTransition = 'left 0.3s linear';
				t.style.left = browserWidth+"px";
			}
		};
		
		t.addEventListener(_touchstart, dragstart, true);
		t.addEventListener(_touchmove, drag, true);
		t.addEventListener(_touchend, dragend, true);
	}
	
})($);
