// uploadannexTest - desc by gaona at 2012-08-29
$(function(){
	$('#testDiv').uploadannex({
		dragDropDiv:function(){
			dragdrop() ;
		}
	});
	$('#testDiv').attr('fileLen',0) ;
	test('with buttonActive() should create some dom', function(){
		same($('span.ui-buttonActive').length,1,'with buttonActive() should create some dom') ;
	});	
	$('.upload-input input').change(function(){
		test('with uploadannex() and change file should create some dom', function(){
			stop();
			setTimeout(function(){
				var i = parseInt($('#testDiv').attr('fileLen')) ;
				$('#testDiv').attr('fileLen',i+1) ;
				same($('#testDiv').find('div.upload-files-list').length - i,1,'with uploadannex() and change file should create the upload-files-list class div childrens') ;
				same($('#testDiv').find('p.upload-files-name').length - i,1,'with uploadannex() and change file should create the upload-files-name class p childrens') ;
				same($('#testDiv').find('p.upload-files-msg').length - i,1,'with uploadannex() and change file should create the upload-files-msg class p childrens') ;
				same($('#testDiv').find('span.upload-files-progress-num').length - i,1,'with uploadannex() and change file should create the upload-files-progress-num class span childrens') ;
				same($('#testDiv').find('a.upload-files-del').length - i,1,'with uploadannex() and change file should create the upload-files-del class a childrens') ;
				same($('#testDiv').find('p.upload-files-progress').length - i,1,'with uploadannex() and change file should create the upload-files-progress class p childrens') ;
				start();
			},300) ;
		});	
	}) ;
	
	function dragdrop(){
		test('with uploadannex() and dragDrop file should create some dom', function(){
			stop();
			setTimeout(function(){
				var i = parseInt($('#testDiv').attr('fileLen')) ;
				var isUp = $('#testDiv').siblings('p.upload-files-errorCon').html() ;
				if(isUp == ''){
					$('#testDiv').attr('fileLen',i+1) ;
					same($('#testDiv').find('div.upload-files-list').length - i,1,'with uploadannex() and dragDrop file should create the upload-files-list class div childrens') ;
					same($('#testDiv').find('p.upload-files-name').length - i,1,'with uploadannex() and dragDrop file should create the upload-files-name class p childrens') ;
					same($('#testDiv').find('p.upload-files-msg').length - i,1,'with uploadannex() and dragDrop file should create the upload-files-msg class p childrens') ;
					same($('#testDiv').find('span.upload-files-progress-num').length - i,1,'with uploadannex() and dragDrop file should create the upload-files-progress-num class span childrens') ;
					same($('#testDiv').find('a.upload-files-del').length - i,1,'with uploadannex() and dragDrop file should create the upload-files-del class a childrens') ;
					same($('#testDiv').find('p.upload-files-progress').length - i,1,'with uploadannex() and dragDrop file should create the upload-files-progress class p childrens') ;
				}else{
					same(true,true,'with uploadannex() and without dragDrop file should not create the dom') ;
				}
				start();
			},300) ;
		});
	}
	
	$('a.upload-files-del').live('click',function(){
		test('with uploadannex() and click delete btn should remove the dl children', function(){
			stop();
			setTimeout(function(){
				var fileLen = parseInt($('#testDiv').attr('fileLen')) ;
				same(fileLen - $('#testDiv').find('div.upload-files-list').length,1,'with uploadannex() and click delete btn should remove the class upload-files-list div children') ;
				$('#testDiv').attr('fileLen',fileLen-1) ;
				start();
			},300) ;
		});
	}) ;
	
	$('#setbtn').live('click',function(){
		var uploadlist = $('#testDiv').find('.upload-files-list') ;
		var len = uploadlist.length ;
		for(var i=0; i<len ; i++){
			uploadlist.eq(i).attr('id',i) ;
		}
		setProgress('0',80,false) ;
		test('with uploadannex() and click setVal btn should set the progress value', function(){
			stop();
			setTimeout(function(){
				var tarVal = parseInt($('#testDiv').find('#0').find('span.upload-files-progress-num').html()) ;
				same(tarVal == 80,true,'with uploadannex() and click setVal btn should set the progress value') ;
				start();
			},300) ;
		});
	}) ;
}) ;