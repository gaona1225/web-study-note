// barcodeTest - desc by gaona at 2012-12-28
$(function(){
	var $codeNum = $('#codeNum');
	var $type = $('#type'); // select
	var $barWidth = $('#barWidth');
	var $barHeight = $('#barHeight'); 
	var $moduleSize = $('#moduleSize'); 
	var $showHRI = $('#showHRI'); // select
	var $bgColor = $('#bgColor');
	var $color = $('#color');
	var $fontSize = $('#fontSize');
	var $posX = $('#posX');
	var $posY = $('#posY');
	var $output = $('#output'); // select

	var $result = $('#result');
	var option = {};
	$('#generate').click(function () {
		// 清空已有
		$result.empty();
		if ($type.val() === '-1') {
			alert('请选择编码类型');
			$type.focus();
			return;
		}
		if ($showHRI.val() === '-1') {
			alert('请选择是否显示编码的数字');
			$showHRI.focus();
			return;   
		}
		// 获取最新参数
		option = {
			barWidth: $barWidth.val(),
			barHeight: $barHeight.val(),
			moduleSize: $moduleSize.val(),
			showHRI: $showHRI.val() === 'true',
			bgColor: $bgColor.val(),
			color: $color.val(),
			fontSize: $fontSize.val(),
			posX: $posX.val(),
			posY: $posY.val(),
			output: $output.val()
		};
		$result.barcode(
			$codeNum.val(),
			$type.val(),
			option
		);
		setTimeout(function(){
			stop() ;
			test('with barcode() and click the generate id button should create some dom and set some attr', function(){
				var len = 0 ;
				if($showHRI.val()){
					len = $('#result').find('div').length - 1 ;
				}else{
					len = $('#result').find('div').length ;
				}
				for(var i=0; i<len; i++){
					same($('#result').find('div').eq(i).height(),parseInt($barHeight.val()),'with barcode(barHeight:$barHeight.val()) and click the generate id button should set the height css') ;
				}
			});
			start() ;
		},300) ;
	});
}) ;