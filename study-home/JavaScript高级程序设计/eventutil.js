var EventUtil = new Object();

EventUtil.addEventHandler = function(oTarget,sEventType,fnHandler){
	if(oTarget.addEventListener){
		oTarget.addEventListener(sEventType,fnHandler,false);
	}else if(oTarget.attachEvent){
		oTarget.attachEvent('on'+sEventType,fnHandler);
	}else{
		oTarget['on'+sEventType] = fnHandler ;
	}
}

EventUtil.removeEventHandler = function(oTarget,sEventType,fnHandler){
	if(oTarget.removeEventListener){
		oTarget.removeEventListener(sEventType,fnHandler,false);
	}else if(oTarget.detachEvent){
		oTarget.detachEvent('on'+sEventType,fnHandler);
	}else{
		oTarget['on'+sEventType] = null ;
	}
}

function fnHandler(event){
	EventUtil.removeEventHandler(clickBtn,'click',fnHandler);
}

EventUtil.formatEvent = function(event){
	if(document.all){
		event.charCode = (event.type == 'keypress') ? event.keyCode : 0
		event.eventPhase = 2 ; //值为2表示冒泡阶段
		event.isChar = (event.charCode>0) ; //当charCode不为0时为true
		event.pageX = event.ClientX + document.body.scrollLeft ;
		event.pageY = event.ClientY + document.body.scrollTop ;
		event.preventDefault = function(){
			this.returnvalue = false ;
		}
		
		if(event.type == 'mouseout'){
			event.relatedTarget = event.toElement ;
		}else if(event.type == 'mouseover'){
			event.relatedTarget = event.fromElement ;
		}
		
		event.stopPropagation = function(){
			this.cancelBubble = true ;
		}
		
		event.target = event.srcElement ;
		
		event.timestamp = (new Date()).getTime();
	}
	return event ;
}

EventUtil.getEvent = function(){
	if(window.event){
		return this.formatEvent(window.event) ;
	}else{
		return EventUtil.getEvent.caller.arguments[0];
	}
}