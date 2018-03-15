// JavaScript Document
window.addEventListener("load",function(){
	var _wrapHei = parseInt(document.documentElement.clientHeight,10) ;
	var _headerHei = parseInt(document.getElementsByClassName('header')[0].offsetHeight,10) ;
	var _searHei = document.getElementsByClassName('search')[0] ? parseInt(document.getElementsByClassName('search')[0].offsetHeight,10) : 0 ;
	var _newHei = parseInt(_wrapHei - _headerHei - _searHei) ;
	
	setHei() ;
	window.onresize = function(){
		setHei() ;
	}
	function setHei(){
		var _searchCon = document.getElementsByClassName('search_con')[0] ;
		var _questionWrap = document.getElementsByClassName('question_wrap')[0] ;
		var _answerWrap = document.getElementsByClassName('answer_wrap')[0] ;
		var _answerQueWrap = document.getElementsByClassName('answerque_wrap')[0] ;
		var _fullScreen = document.getElementsByClassName('full_screen')[0] ;
		var _questionTypeWrap = document.getElementsByClassName('question_type_wrap')[0]  ;
		var _yzmWrap = document.getElementsByClassName('yzm_wrap')[0]  ;
		if(_searchCon){
			_searchCon.style.height = _newHei + 'px' ;
		}
		if(_questionWrap){
			_questionWrap.style.height = _newHei + 'px' ;
		}
		if(_answerWrap){
			_answerWrap.style.height = _newHei + 'px' ;
		}
		if(_answerQueWrap){
			_answerQueWrap.style.height = _newHei - parseInt(document.getElementsByClassName('answer_input')[0].offsetHeight) + 'px' ;
		}
		if(_fullScreen){
			_fullScreen.style.height = _newHei - 2 + 'px' ;
		}
		if(_questionTypeWrap){
			_questionTypeWrap.style.height = _newHei + 'px' ;
		}
		if(_yzmWrap){
			_yzmWrap.style.height = _newHei + 'px' ;
		}
	}
	/*时间戳转换*/
	function getLocalTime(nS){
		return new Date(parseInt(nS) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " "); 
	} 
	
	
	/*问题页交互*/
	var _questionWrap,_url ;
	if(document.getElementsByClassName('question_wrap')[0]){
		_questionWrap = document.getElementsByClassName('question_wrap')[0] ;
		_url = 'answercon.html' ;
	}
	if(document.getElementsByClassName('answerque_wrap')[0]){
		_questionWrap = document.getElementsByClassName('answerque_wrap')[0] ;
		_url = 'evaluate.html' ;
	}
	if(_questionWrap){
		_questionWrap.onclick = function(e){
			var _target = e.target ;			
			var _isDl = (e.target.getAttribute('class') ? e.target.getAttribute('class').indexOf('answer_list') > -1 : '') || 
						(e.target.parentNode.getAttribute('class') ? e.target.parentNode.getAttribute('class').indexOf('answer_list') > -1 : '') || 
						(e.target.parentNode.parentNode.getAttribute('class') ? e.target.parentNode.parentNode.getAttribute('class').indexOf('answer_list') > -1 : '') || 
						(e.target.parentNode.parentNode.parentNode.getAttribute('class') ? e.target.parentNode.parentNode.parentNode.getAttribute('class').indexOf('answer_list') > -1 : '') ;
			if(_isDl){
				window.location = _url
			}
		}
	}	
		
},false)