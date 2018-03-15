// qrcodeTest - desc by gaona at 2012-12-28
$(function(){
	$('#qrcode').delegate('td>:button', 'click', function () {
		var self = $(this);
		var $tds = self.parents('tr').find('>td');
		var text = $.trim($tds.eq(0).find('>:text').val());
		var $container, render;
		if ('table' === self.val()) {
			$container = $tds.eq(2);
			render = 'table';
			setTimeout(function(){
				stop() ;
				test('with qrcode() and click the value of table button should create some dom and set some attr', function(){
					same(self.parents('td').next('td').find('table').length,1,'with qrcode() and click the value of table button should create table element') ;
				});
				test('with qrcode({width:256,background:\'#ffffff\'}) and click the value of table button should set the width/height css', function(){
					same(self.parents('td').next('td').find('table').width(),256,'with qrcode({width:256}) and click the value of table button should set the width css') ;
				});
				start() ;
			},300) ;
		} else if ('canvas' === self.val()) {
			$container = $tds.eq(3);
			render = 'canvas';
			if(!document.createElement("canvas").getContext){
				setTimeout(function(){
					stop() ;
					test('with qrcode() and click the value of canvas button should create some dom and set some attr', function(){
						same(self.parents('td').next('td').next('td').find('table').length,1,'with qrcode() and click the value of canvas button should create table element') ;
					});
					test('with qrcode({width:256,background:\'#ffffff\'}) and click the value of table button should set the width/height css', function(){
						same(self.parents('td').next('td').next('td').find('table').width(),256,'with qrcode({width:256}) and click the value of canvas button should set the width css') ;
					});
					start() ;
				},300) ;
			}else{
				setTimeout(function(){
					stop() ;
					test('with qrcode() and click the value of canvas button should create some dom and set some attr', function(){
						same(self.parents('td').next('td').next('td').find('canvas').length,1,'with qrcode() and click the value of canvas button should create canvas element') ;
					});
					test('with qrcode({width:256,background:\'#ffffff\'}) and click the value of table button should set the width/height css', function(){
						same(self.parents('td').next('td').next('td').find('canvas').width(),256,'with qrcode({width:256}) and click the value of canvas button should set the width css') ;
						same(self.parents('td').next('td').next('td').find('canvas').height(),256,'with qrcode({width:256}) and click the value of canvas button should set the height css') ;
					});
					start() ;
				},300) ;
			}
		}
		$container.empty();

		$container.qrcode({
			text: text,
			render: render
		});
	});
}) ;