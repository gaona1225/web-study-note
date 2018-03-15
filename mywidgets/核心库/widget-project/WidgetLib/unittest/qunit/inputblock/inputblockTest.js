// inputblockTest - desc by gaona at 2012-08-01
$(function(){
	$('.inputblock-input').inputblock({
		list : ['111','222','333','444','555','666'] ,
		fnClick : function(){
			return ['张三','六六']  ;
		}
	});
	test('every input with inputblock() should create some dom elems', function(){
		var tarElem = $('.inputblock-input[id!=testInput3]') ;
		var tarLen = tarElem.length ;
		for(var i=0; i<tarLen; i++){
			same(tarElem.eq(i).parents('div.inputblock-add').length,1,'every input with inputblock() should have the inputblock-add class div parent') ;
			same(tarElem.eq(i).parents('div.inputblock-wrap').length,1,'every input with inputblock() should have the inputblock-wrap class div parent') ;
			same(tarElem.eq(i).parents('div.inputblock-wrap').find('div.inputblock-clear').length,1,'every input with inputblock() should have the inputblock-clear class div siblings') ;
		}
	});
	
	test('every input with inputblock() should have readonly attr', function(){		
		same($('.inputblock-input').attr('readonly'),true,'every input with inputblock() should have readonly attr') ;
	});
	
	test('the inputblock-elem class of p should create some dom elems', function(){
		var tarElem = $('p.inputblock-elem') ;
		var tarLen = tarElem.length ;
		for(var i=0; i<tarLen; i++){
			same(tarElem.eq(i).find('span').length,1,'the inputblock-elem class of p should have span tag children') ;
			same(tarElem.eq(i).find('a.inputblock-del').length,1,'the inputblock-elem class of p should have the inputblock-del class a tag children') ;
		}
	});
	
	var _initLen = $('#testInput').parents('div.inputblock-wrap').find('p.inputblock-elem').length ;
	var _tarObj = $('#testInput').parents('div.inputblock-wrap') ;
	var count = 0 ;
	_tarObj.click(function(e){
		count ++ ;
		var _target = e.target ;
		if(!$(_target).hasClass('inputblock-del')){
			test('add person', function(){
				stop();
				setTimeout(function(){
					same(_tarObj.find('p.inputblock-elem').length -_initLen ,2*count,'add two persons every times') ;
					start();
				}, 100) ;
			});
		}
	}) ;
	
	var _tarObj2 = $('#testInput2').parents('div.inputblock-wrap').find('a.inputblock-del') ;
	_tarObj2.click(function(){
		var _initLen2 = $('#testInput2').parents('div.inputblock-wrap').find('p.inputblock-elem').length ;
		test('add person', function(){
			stop();
			setTimeout(function(){
				var _pElemLen = _tarObj2.parents('div.inputblock-wrap').find('p.inputblock-elem').length ;
				same(_initLen2 - _pElemLen ,1,'delete one persons every times') ;
				start();
			}, 100) ;
		});
	}) ;
	
	test('control the inputblock-input class of input with inputblock("setVal",["黄黄","张张","菲菲"])', function(){
		$('#testInput3').inputblock('setVal',['黄黄','张张','菲菲']) ;
		var _pElemLen = $('#testInput3').parents('div.inputblock-wrap').find('p.inputblock-elem').length ;
		same(_pElemLen ,3,'inputblock("setVal",["黄黄","张张","菲菲"]) should set three persons into with the testInput3 id input') ;
	});
	
	test('control the inputblock-input class of input with inputblock("getVal")', function(){
		$('#testInput3').inputblock('getVal') ;
		var _pElemLen = $('#testInput3').parents('div.inputblock-wrap').find('p.inputblock-elem').length ;
		same(_pElemLen ,3,'inputblock("getVal") should get three persons into with the testInput3 id input') ;
	});
	
	test('control the inputblock-input class of input with inputblock("destroy")', function(){
		$('#testInput4').inputblock('destroy') ;
		same($('#testInput4').parents('div.inputblock-wrap').length,0,'inputblock("destroy") should remove the inputblock-wrap class of div') ;
		same($('#testInput4').parents('div.inputblock-add').length,0,'inputblock("destroy") should remove the inputblock-add class of div') ;
		same($('#testInput4').siblings('p.inputblock-elem').length,0,'inputblock("destroy") should remove the inputblock-add class of div') ;
	});
}) ;