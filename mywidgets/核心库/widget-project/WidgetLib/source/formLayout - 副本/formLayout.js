/*
 *作    者: 高娜 
 *版    本: 1.2 
 *完成时间: 2012-02-20 
 *描    述: formLayout
 *关联文件: jQuery.js  
 */
 
/*
 *	#example:
 *	$('.ui-formLayout').formLayout({
	});	
 *
*/
(function($){
	/** 
	* @class formLayout监听器
    * @name formLayout
    * @description 表单元素插件
	* @version 1.2 
	* @author 高娜 
	* @requires jQuery-1.5.2+
    */
	$.fn.formLayout = function(options){
		//$(this).html($(this).html()) ;
		var defaults = {
			/**  
			* @name formLayout#form_layout
			* @param {Number}  数字类型
			* @description 布局展示，表示排列的栏目数，默认值可为1、2、3..栏,和form_width只需要设置一个
			* @default {Number} 2
			* @example
			* $('.ui-formLayout').formLayout({
			*		form_layout : 2
			*  });
			*/
			form_layout : 2,
			/**  
			* @name formLayout#form_label_pos
			* @param {String}  字符串型
			* @description 字段名针对文本输入域显示的位置，参考值为top/left/right/bottom(上、左、右、下)
			* @default {String} 'top'
			* @example
			* $('.ui-formLayout').formLayout({
			*		form_label_pos : 'top'
			*  });
			*/
			form_label_pos : 'top',
			/**  
			* @name formLayout#form_label_textalign
			* @param {String}  字符串型
			* @description 字段名对齐方式，参考值left/right(居左/居右)
			* @default {String} 'left'
			* @example
			* $('.ui-formLayout').formLayout({
			*		form_label_textalign : 'left'
			*  });
			*/
			form_label_textalign : 'left',
			/**  
			* @name formLayout#form_label_dev
			* @param {Number}  数字类型
			* @description 偏差值，在计算的时候使用，在计算过程中需加上单位或是百分号
			* @default {Number} 20
			* @example
			* $('.ui-formLayout').formLayout({
			*		form_label_dev : 20
			*  });
			*/
			form_label_dev : 20,
			/**  
			* @name formLayout#form_width
			* @param {Number}  数字类型
			* @description form表单参考宽度
			* @default {Number} 600
			* @example
			* $('.ui-formLayout').formLayout({
			*		form_width : 600
			*  });
			*/
			form_width : 600,
			/**  
			* @name formLayout#form_title
			* @param {String}  字符串类型
			* @description form表单标题
			* @default {String} form标题
			* @example
			* $('.ui-formLayout').formLayout({
			*		form_title : 'form标题'
			*  });
			*/
			form_title : 'form标题',
			/**  
			* @name formLayout#form_wordcard
			* @param {String}  字符串类型
			* @description 
			* @default {String} 字段名后面的通配符，可选参数-、：、等
			* @example
			* $('.ui-formLayout').formLayout({
			*		form_wordcard : ':'
			*  });
			*/
			form_wordcard : '：',
			/**  
			* @name formLayout#form_colspan
			* @param {Number}  数字类型
			* @description 跨列的值
			* @default {Number} 1
			* @example
			* $('.ui-formLayout').formLayout({
			*		form_colspan : 1
			*  });
			*/
			form_colspan : 1,
			/**  
			* @name formLayout#form_elem_width
			* @param {Number}  数字类型
			* @description form表单输入区域宽度最大限制
			* @default {Number} 300
			* @example
			* $('.ui-formLayout').formLayout({
			*		form_elem_width : 300
			*  });
			*/
			form_elem_width : 300,
			/**  
			* @name formLayout#form_textarea_height
			* @param {Number}  数字类型
			* @description form表单文本域高度
			* @default {Number} 60
			* @example
			* $('.ui-formLayout').formLayout({
			*		form_textarea_height : 60
			*  });
			*/
			form_textarea_height : 60,
			/**  
			* @name formLayout#formDisable  
			* @param {Fn} 函数 
			* @description 禁用指定表单元素
			* @default {Fn} function(){}
			* @example
			* $('.ui-formLayout').formLayout({
			*		formDisable: function(){alert("formDisable")}
			*    });
			*/
 			formDisable : function(obj){
				if($(obj).attr('disabled')){
					$(obj).addClass('ui-formCambo-disabled') ;
				}
				var $type = $(obj).attr('tagName').toLowerCase() ;
				if($type=='div'){
					var $objInput = $(obj).find('input') ;
					for(var i=0; i<$objInput.length; i++){
						if(($objInput.eq(i).attr('disabled'))&&!($objInput.eq(i).attr('checked'))){
							$objInput.eq(i).next('label').find('span').eq(0).addClass('ui-formCambo-ico-disabled') ;
						}else if(($objInput.eq(i).attr('disabled'))&&($objInput.eq(i).attr('checked'))){
							$objInput.eq(i).next('label').find('span').eq(0).addClass('ui-formCambo-ico-checked-disabled') ;
						}
					}
				}
			}
		} ;
		var opts = $.extend(defaults,options) ;
		this.each(function(){
			var $this = $(this) ;
			$(this).css({
				width:opts.form_width
			}) ;
			$(this).find('textarea').height(opts.form_textarea_height) ;
			
			formCreate() ;
			//设置一栏布局的块状显示
			if(opts.form_layout == 1){
				$(this).find('.ui-formLayoutItem').css({
					'display':'block',
					'clear':'both'
				}) ;
			}
			//创建dom元素
			function formCreate(){
				var titleDom = '<div class="ui-formLayoutTit">' + opts.form_title + '</div><div class="ui-formLayoutCon"></div>' ;				
				$this.prepend(titleDom) ;
				$this.children('.ui-formLayoutInput').each(function(index, element){
					var $type = $(this).attr('tagName').toLowerCase() ;
					switch($type){
						case 'input' : createInput(this) ; break ;
						case 'textarea' : createInput(this) ; break ;
						case 'select' : createSelect(this) ; break ;
						case 'div' : createCambo(this) ; break ;
					}					
				});
				setElemWid() ;
			}
			
			//输入区域获取焦点
			$('.ui-formLayoutInput').live('focus',function(){
				$(this).addClass('ui-formLayoutInput-active') ;
			}).live('blur',function(){
				$(this).removeClass('ui-formLayoutInput-active') ;
			}) ;
			
			//创建input[type='text'],textarea的dom
			function createInput(obj){
				if($(obj).attr('must-fill')&&($(obj).attr('must-fill')=='true')){
					var itemDiv = '<div class="ui-formLayoutItem"><label class="ui-formLayoutLabel ui-formLayoutLabel-'+opts.form_label_pos+'"><span class="ui-formLayoutFill">*</span>'+$(obj).attr('form-elem-title') +opts.form_wordcard+'</label><div class="ui-formLayoutValue" ></div>' ;
				}else{
					var itemDiv = '<div class="ui-formLayoutItem"><label class="ui-formLayoutLabel ui-formLayoutLabel-'+opts.form_label_pos+'">'+$(obj).attr('form-elem-title') +opts.form_wordcard+'</label><div class="ui-formLayoutValue" ></div>' ;
				}
				var $itemDiv = $(itemDiv);
				$this.find('.ui-formLayoutCon').append($itemDiv);
				$itemDiv.find('.ui-formLayoutValue').append(obj);
				$this.find('.ui-formLayoutLabel').css('text-align',opts.form_label_textalign) ;
				opts.formDisable(obj) ;
			}
			
			//创建select的dom元素
			function createSelect(obj){
				if($(obj).attr('must-fill')){
					var itemDiv = '<div class="ui-formLayoutItem"><label class="ui-formLayoutLabel ui-formLayoutLabel-'+opts.form_label_pos+'"><span class="ui-formLayoutFill">*</span>'+$(obj).attr('form-elem-title') +opts.form_wordcard+'</label><div class="ui-formLayoutValue" ><span class="ui-formSelect"><span class="ui-formSelect-text"></span><span class="ui-formSelect-ico"></span></div>' ;
				}else{
					var itemDiv = '<div class="ui-formLayoutItem"><label class="ui-formLayoutLabel ui-formLayoutLabel-'+opts.form_label_pos+'">'+$(obj).attr('form-elem-title') +opts.form_wordcard+'</label><div class="ui-formLayoutValue"  user="testtest"><span class="ui-formSelect"><span class="ui-formSelect-text"></span><span class="ui-formSelect-ico"></span></div>' ;
				}
				var $itemDiv = $(itemDiv);
				$this.find('.ui-formLayoutCon').append($itemDiv);
				$itemDiv.find('.ui-formLayoutValue').append(obj);
				$this.find('.ui-formLayoutLabel').css('text-align',opts.form_label_textalign) ;
				$(obj).click(function(){
					$(this).siblings('.ui-formSelect').css('border','1px solid #7eadd9') ;
				}) ;
				$(obj).blur(function(){
					$(this).siblings('.ui-formSelect').css('border','1px solid #B5B8C8') ;
				}) ;
				$(obj).change(function(){
					$(this).siblings('.ui-formSelect').find('.ui-formSelect-text').html($(this).val()) ;
					$(this).siblings('.ui-formSelect').css('border','1px solid #B5B8C8') ;
				}) ;
				opts.formDisable(obj) ;
			}
			
			//创建checkbox、radio的dom			
			function createCambo(obj){
				if($(obj).attr('must-fill')){
					var itemDiv = '<div class="ui-formLayoutItem"><label class="ui-formLayoutLabel ui-formLayoutLabel-'+opts.form_label_pos+'"><span class="ui-formLayoutFill">*</span>'+$(obj).attr('form-elem-title') +opts.form_wordcard+'</label><div class="ui-formLayoutValue" ></div>' ;
				}else{
					var itemDiv = '<div class="ui-formLayoutItem"><label class="ui-formLayoutLabel ui-formLayoutLabel-'+opts.form_label_pos+'">'+$(obj).attr('form-elem-title') +opts.form_wordcard+'</label><div class="ui-formLayoutValue" ></div>' ;
				}
				var $itemDiv = $(itemDiv);
				$this.find('.ui-formLayoutCon').append($itemDiv);
				$itemDiv.find('.ui-formLayoutValue').append(obj);
				$this.find('.ui-formLayoutLabel').css('text-align',opts.form_label_textalign) ;
				var $camboObj = $(obj).find('input') ;
				for(var i=0; i<$camboObj.length; i++){
					var $camboType = $camboObj.eq(i).attr('type') ;
					var $camboLabelTxt = $(obj).find('label').eq(i).html() ;
					var $cambo = '<span class="ui-formCambo-ico-'+$camboType+'"></span><span class="ui-formCambo-text">'+$camboLabelTxt+'</span>' ;
					$(obj).find('label').eq(i).html($cambo) ;
				}
				opts.formDisable(obj) ;
			}
			
			//处理checkbox
			$('.ui-forminput-check[type=checkbox]').live('click',function(){
				$(this).next('label').find('span').eq(0).toggleClass('ui-formCambo-ico-checked') ;
			}) ;
			
			//处理radio
			$('.ui-forminput-check[type=radio]').live('click',function(){
				var $index = $(this).parent('.ui-formLayoutInput').find('.ui-forminput-check[type=radio]').index(this) ;
				var $radioElem = $(this).siblings('label') ;
				for(var i=0; i<$radioElem.length; i++){
					if(i == $index){
						$radioElem.eq(i).find('span').eq(0).addClass('ui-formCambo-ico-checked') ;
					}else{
						$radioElem.eq(i).find('span').eq(0).removeClass('ui-formCambo-ico-checked') ;
					}
				}
			}) ;
			
			//设置元素宽度
			function setElemWid(){
				var $InputElem = $this.find('.ui-formLayoutInput') ;
				var $widDev ;
				for(var i=0; i<$InputElem.length;i++){
					var $colspan = $InputElem.eq(i).attr('form-colspan') || opts.form_colspan ;
					var $labelElem = $this.find('.ui-formLayoutLabel') ;
					var $labelWid = 0 ;
					for(var j=0; j<$labelElem.length; j++){
						if($labelElem.eq(j).width()>$labelWid){
							$labelWid  = $labelElem.eq(j).width() ;
						}
					}
					$this.find('.ui-formLayoutLabel').width($labelWid) ;
						var $elemWid = $(this).attr('elem-width') || (($this.width() - opts.form_label_dev - $labelWid*opts.form_layout - 20*opts.form_layout)/opts.form_layout) ;
					if($InputElem.eq(i).attr('type') == 'select-one'){
						$widDev = 8 ;
					}else{
						$widDev = 0 ;
					}
					if($elemWid>opts.form_elem_width){
						if($colspan>=2){
							$InputElem.eq(i).width(opts.form_elem_width*$colspan+($colspan-1)*$labelWid+opts.form_label_dev+$widDev) ;
						}else{
							$InputElem.eq(i).width(opts.form_elem_width*$colspan+($colspan-1)*$labelWid+$widDev) ;
						}
					}else{
						if($colspan>=2){
							$InputElem.eq(i).width($elemWid*$colspan+($colspan-1)*$labelWid+opts.form_label_dev+$widDev) ;
						}else{
							$InputElem.eq(i).width($elemWid*$colspan+($colspan-1)*$labelWid+$widDev) ;
						}
					}
					
					if($InputElem.eq(i).siblings('.ui-formSelect').children('.ui-formSelect-text')){
						$this.find('.ui-formSelect').eq(i).width($InputElem.eq(i).width()+3)
					}
				}
			}
			
		}) ;
		return this ;
	} ;
	$.extend($.fn.formLayout,{
		version: '1.2',
		author:'高娜'
	});
})(jQuery) ;
//禁用某表单元素setEnable
function setDisable(obj){
	if(!obj.hasClass('ui-formCambo-disabled')){
		obj.addClass('ui-formCambo-disabled') ;
	}
	var $type = obj.attr('type') ;
	if(($type=='radio')||($type=='checkbox')){
		if((obj.attr('disabled'))&&!(obj.attr('checked'))){
			obj.next('label').find('span').eq(0).addClass('ui-formCambo-ico-disabled') ;
		}else if((obj.attr('disabled'))&&(obj.attr('checked'))){
			obj.next('label').find('span').eq(0).addClass('ui-formCambo-ico-checked-disabled') ;
		}
	}
}
//启用某表单元素
function setEnable(obj){
	if(obj.hasClass('ui-formCambo-disabled')){
		obj.removeClass('ui-formCambo-disabled') ;
	}
	var $type = obj.attr('type') ;
	if(($type=='radio')||($type=='checkbox')){
		if(obj.next('label').find('span').eq(0).hasClass('ui-formCambo-ico-disabled')){
			obj.next('label').find('span').eq(0).removeClass('ui-formCambo-ico-disabled') ;
		}else if(obj.next('label').find('span').eq(0).hasClass('ui-formCambo-ico-checked-disabled')){
			obj.next('label').find('span').eq(0).removeClass('ui-formCambo-ico-checked-disabled').addClass('ui-formCambo-ico-checked') ;
		}
	}
}
//影藏某表单元素及其字段
function setHide(obj){
	var $type = obj.attr('type') ;
	if(($type != 'checkbox')&&($type != 'radio')){
		obj.parents('.ui-formLayoutItem').css('display','none') ;
	}else{
		obj.css('display','none') ;
		obj.next('label').css('display','none') ;
	}
}
//显示某表单元素及其字段
function setShow(obj){
	var $type = obj.attr('type') ;
	if(($type != 'checkbox')&&($type != 'radio')){
		obj.parents('.ui-formLayoutItem').css('display','inline-block') ;
	}else{
		obj.css('display','inline-block') ;
		obj.next('label').css('display','inline-block') ;
	}
}