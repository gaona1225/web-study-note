// lazyImageTest - desc by gaona at 2012-12-27
$(function(){
	var initImg = ['/images/lazyImage/1.jpg','/images/lazyImage/2.png'] ;
	var defaultSrc = 'images/lazyImage/blank.gif' ;
	function _init(ctxSelector, isHungry) {
        var baseUrl = '.';
        var img = initImg ;
        var i, len;
        var domHtml = '';
        for (i = 0, len = img.length; i < len; i++) {
            domHtml += '<div class="test_item">' +
                            '<img data-original="' + baseUrl + img[i] + '" data-lazyImg="true" data-x="' +
                            ctxSelector + i + '"/>' +
                        '</div>';
        }
        $(ctxSelector).append(domHtml).lazyImage({
            placeHolder:defaultSrc ,
            isHungry: isHungry
        });
    }
	_init('#imgCon1', false);
    _init('#imgCon2', true);
	test('with lazyImage({isHungry:false,placeHolder:"/images/blank.gif"}) should set the placeHolder src of target img element', function(){
		var imgLen = initImg.length ;
		for(var i=0; i<imgLen; i++){
			same($('#imgCon1 .test_item').eq(i).find('img').attr('src'),defaultSrc,'with lazyImage({isHungry:false,placeHolder:"/images/blank.gif"}) should set the placeHolder src of target img element') ;
		}
	});
	$('#triggerLoad').click(function(){
		$('#imgCon1').lazyImage('load');
		test('with lazyImage(\'load\') should set src of target img element', function(){
			var imgLen = initImg.length ;
			for(var i=0; i<imgLen; i++){
				same($('#imgCon1 .test_item').eq(i).find('img').attr('data-lazyImg'),'loaded','with lazyImage(\'load\') should set src of target img element') ;
				same($('#imgCon1 .test_item').eq(i).find('img').attr('src'),'.'+initImg[i],'with lazyImage(\'load\') should set src of target img element') ;
			}
		});
	}) ;
	test('with lazyImage({isHungry:true}) should set src of target img element', function(){
		var imgLen = initImg.length ;
		for(var i=0; i<imgLen; i++){
			same($('#imgCon2 .test_item').eq(i).find('img').attr('src'),'.'+initImg[i],'with lazyImage({isHungry:true}) should set src of target img element') ;
		}
	});
}) ;