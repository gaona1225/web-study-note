// dragUploadTest - desc by gaona at 2012-08-29
$(function(){
	var dis_w = 380 ;
	var dis_h = 300 ;
	$('#testDiv').attr('fileLen',0) ;
	$('#testDiv').dragUpload({
		display_width : dis_w ,
		display_height : dis_h ,
		upload_disable : ['exe','avi'] ,
		display_form : 1 ,
		dragDropDiv : function(){
			dragdrop() ;
		}
	});		
	
	test('with dragUpload() should set width and height style', function(){
		same($('#testDiv').width(),dis_w,'with dragUpload() should set width style') ;
		same($('#testDiv').height(),dis_h,'with dragUpload() should set height style') ;
	});	
	
	function dragdrop(){
		test('with dragUpload() and dragDropDiv should create some dom', function(){
			stop();
			setTimeout(function(){
				var i = parseInt($('#testDiv').attr('fileLen')) ;
				$('#testDiv').attr('fileLen',i+1) ;
				same($('#testDiv').find('dl').length - i,1,'with dragUpload() and dragDropDiv should create the dl children') ;
				same($('#testDiv').find('dt').length - i,1,'with dragUpload() and dragDropDiv should create the dt children') ;
				same($('#testDiv').find('div.imgDiv').length - i,1,'with dragUpload() and dragDropDiv should create the imgDiv class div children') ;
				same($('#testDiv').find('img.delBtn').length - i,1,'with dragUpload() and dragDropDiv should create the delBtn class img children') ;
				same($('#testDiv').find('dd').length - i,1,'with dragUpload() and dragDropDiv should create the dd children') ;
				start();
			},300) ;
		});
	}
	
	$('.delBtn').live('click',function(){
		var $this = $(this) ;
		test('with dragUpload() and dragDropDiv should create some dom', function(){
			stop();
			setTimeout(function(){
				var fileLen = parseInt($('#testDiv').attr('fileLen')) ;
				same(fileLen - $('#testDiv').find('dl').length,1,'with dragUpload() and click delete btn should remove the dl children') ;
				$('#testDiv').attr('fileLen',fileLen-1) ;
				start();
			},300) ;
		});
	}) ;
	
	$('.clearBtn').live('click',function(){
		test('with dragUpload() and dragDropDiv should create some dom', function(){
			stop();
			setTimeout(function(){
				same($('#testDiv').find('dl').length,0,'with dragUpload() and click clearup btn should remove all the dl children') ;
				start();
			},300) ;
		});
	}) ;
}) ;