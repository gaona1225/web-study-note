// JavaScript Document
window.onload = function(){
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
		var _searchRecordCon = document.getElementsByClassName('search_record_con')[0] ;
		var _questionWrap = document.getElementsByClassName('question_wrap')[0] ;
		var _answerWrap = document.getElementsByClassName('answer_wrap')[0] ;
		var _answerQueWrap = document.getElementsByClassName('answerque_wrap')[0] ;
		var _fullScreen = document.getElementsByClassName('full_screen')[0] ;
		var _questionTypeWrap = document.getElementsByClassName('question_type_wrap')[0]  ;
		var _yzmWrap = document.getElementsByClassName('yzm_wrap')[0]  ;
		if(_searchCon){
			_searchCon.style.height = _newHei + 'px' ;
		}
		if(_searchRecordCon){
			_searchRecordCon.style.height = _newHei - parseInt(document.getElementsByClassName('search_clear')[0].offsetHeight) + 'px' ;
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
	
	/*搜索交互*/
	var _inputSea = document.getElementById('input_text') ;
	var _inputClose = document.getElementsByClassName('input_close')[0] ;
	var _touchEnd = ('ontouchstart' in document.documentElement) ? 'blur' : 'keyup' ;
	var _searchResult = document.getElementsByClassName('search_result')[0] ;
	var _searchBtn = document.getElementsByClassName('search_btn')[0] ;
	if(_searchBtn){
		_searchBtn.onclick = function(){
			window.location = 'search.html' ;
		}
	}
	if(_inputSea){
		_inputSea.addEventListener(_touchEnd, touchEndFun, false) ;
	}
	function touchEndFun(){
		var _placeholder = _inputSea.getAttribute('placeholder') ;
		if(this.value != _placeholder && this.value != ''){
			_inputClose.style.visibility = 'visible' ;
			_searchResult.style.height = 'auto' ;
			//TODO 自动搜索
		}else{
			_inputClose.style.visibility = 'hidden' ;	
			_searchResult.style.height = '0px' ;		
			//TODO 自动搜索
		}
	}
	if(_searchResult){
		_searchResult.onclick = function(e){
			var _target = e.target ;
			this.style.visibility = 'hidden' ;
			//TODO
		}
	}
	if(_inputClose){
		_inputClose.onclick = function(){
			_inputSea.value = '' ;
			this.style.visibility = 'hidden' ;
			_searchResult.style.visibility = 'hidden' ;
		}
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
	
	/*全屏界面交互*/
	var _delBtn = document.getElementById('del_btn') ;
	var _popTool = document.getElementById('popTool') ;
	if(_delBtn){
		_delBtn.onclick = function(){
			document.getElementById('popBox').style.display = 'block' ;
			document.getElementById('popMask').style.display = 'block' ;
		}
	}
	if(_popTool){
		_popTool.onclick = function(){
			document.getElementById('popBox').style.display = 'none' ;
			document.getElementById('popMask').style.display = 'none' ;
		}
	}
	
	/*评价界面交互*/
	var _evaluateBtn = document.getElementById('evaluate') ;
	var _popTool = document.getElementById('popTool') ;
	if(_evaluateBtn){
		_evaluateBtn.onclick = function(){
			document.getElementById('popBox').style.display = 'block' ;
			document.getElementById('popMask').style.display = 'block' ;
		}
	}
	if(_popTool){
		_popTool.onclick = function(){
			document.getElementById('popBox').style.display = 'none' ;
			document.getElementById('popMask').style.display = 'none' ;
		}
	}
}