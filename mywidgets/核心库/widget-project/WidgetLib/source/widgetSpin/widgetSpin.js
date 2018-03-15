/*
 *作    者: 万莎
 *完成时间: 2011-10-19
 *描    述: widgetSpin
 *关联文件: jQuery.js|jquery-ui.js
 */  
(function($){   
  $.fn.extend({   
    spin: function(opt){   
      return this.each(function(){   
        opt = $.extend({   
            imageBasePath: 'images/widgetSpin/',   
            spinBtnImage: 'widgetSpin.png',   
            spinUpImage: 'widgetSpin-up.png',   
            spinDownImage: 'widgetSpin-down.png',   
            interval: 1,   
            max: null,   
            min: null,   
            timeInterval: 500,   
            timeBlink: 200  
          }, opt || {});   
           
        var txt = $(this);   
          
        var spinBtnImage = opt.imageBasePath+opt.spinBtnImage;   
        var btnSpin = new Image();   
        btnSpin.src = spinBtnImage;   
        var spinUpImage = opt.imageBasePath+opt.spinUpImage;   
        var btnSpinUp = new Image();   
        btnSpinUp.src = spinUpImage;   
        var spinDownImage = opt.imageBasePath+opt.spinDownImage;   
        var btnSpinDown = new Image();   
        btnSpinDown.src = spinDownImage;   
           
        var btn = $(document.createElement('img'));   
        btn.attr('src', spinBtnImage);   
        btn.css({cursor: 'pointer', verticalAlign: 'bottom', padding: 0, margin: 0});   
        txt.after(btn);   
        txt.css({marginRight:0, paddingRight:0});   
          
        function spin(vector){   
          var val = txt.val();
          if(!isNaN(val)){   
            val = parseFloat(val) + (vector*opt.interval);   
            if(opt.min!=null && val<opt.min) val=opt.min;   
            if(opt.min!=null && val>opt.max) val=opt.max; 
		    var intAll = parseInt($(".ui-widget-slider").width())-16;
		    var setVal = parseInt(val * intAll / 100);
		    $(".ui-widget-slider div span").width(setVal);
		    $(".ui-widget-slider b.handle").css('left',setVal);
            if(val != txt.val()){   
              txt.val(val);   
              $( ".ui-widget-slider>input" ).val( val );
              txt.change();   
              src = (vector > 0 ? spinUpImage : spinDownImage);   
              btn.attr('src', src);   
              if(opt.timeBlink<opt.timeInterval)   
                setTimeout(function(){btn.attr('src', spinBtnImage);}, opt.timeBlink);   
            }   
          }   
        }   
           
        btn.mousedown(function(e){   
          var pos = e.pageY - btn.offset().top;   
          var vector = (btn.height()/2 > pos ? 1 : -1); 
          (function(){  
            spin(vector);   
            var tk = setTimeout(arguments.callee, opt.timeInterval);   
            $(document).one('mouseup', function(){   
              clearTimeout(tk); btn.attr('src', spinBtnImage);   
            });   
          })();   
          return false;   
        });   
      });   
    }   
  });   
})(jQuery);

(function($,undefined){
    /** 
	* @class 微调组件
    * @name widgetSpin
    * @description 微调组件
	* @version 1.2 
    */
	$.widget("ui.widgetSpin",
	{
		options:{
        /**  
        * @name widgetSpin#width  
        * @param {string} widgetSpin widgetSpin对象 
        * @description 宽度 
		* @default {string} "100%"
		* @example
		* $("#txt").widgetSpin({width:"100px"});
        */
			width:"100%"
		},
		_create:function(){
			//插件实现代码
			var o = this.options; 
			var _self = this.element;
			var $widgetSpin=$("<div class='ui-widget-slider'></div>");
			var $div = $("<div><span></span></div>");
			var $handle=$("<b class='handle'></b>");
			var _table="<table border='0' cellspacing='0' cellpadding='0'><tr>";
			for(var i=0;i<_self.val();i++){
				_table = _table + "<td></td>";	
			}
			_table = _table +  "</tr></table>";
			var $table=$(_table);
			_self.wrap($widgetSpin)
			.before($div)
			.before($handle)
			.before($table);
			_self.hide();
			$(".ui-widget-slider table").width($(".ui-widget-slider div").width()+2);
		},
		_init:function(){
			var $this = this.element,
				$widgetSpin = $this.parent(),
				o = this.options;
			$widgetSpin.width(o.width);
			if(o.width != "100%"){
				$widgetSpin.find('>table').width(parseInt(o.width)-16);
			}
		},
		/**
		* @description 显示微调组件
		* @return {widgetSpin} widgetSpin对象
		* @example
		* $("#logo").widgetSpin('show');
		*/
		show:function(){
			var _self = this.element;
			//不进行交叉处理
			_self.parent( "div.ui-widget-slider" ).show();//.prev( "img" ).show().prev( "input" ).show();
			return _self;
		},
		/**
		* @description 隐藏微调组件
		* @return {widgetSpin} widgetSpin对象
		* @example
		* $("#logo").widgetSpin('hide');
		*/
		hide:function(){
			var _self = this.element;
			//不进行交叉处理 此时只是隐藏自己
			_self.parent( "div.ui-widget-slider" ).hide();//.prev( "img" ).hide().prev( "input" ).hide();
			return _self;
		},
		/**
		* @description 禁用微调组件
		* @return {widgetSpin} widgetSpin对象
		* @example
		* $("#logo").widgetSpin('disable');
		*/
		disable:function(){//什么也没做
			return this.element;
		},
		/**
		* @description 启用微调组件
		* @return {widgetSpin} widgetSpin对象
		* @example
		* $("#logo").widgetSpin('enable');
		*/
		enable:function(){//什么也没做
			return this.element;
		},
		/**
		* @description 销毁微调组件
		* @return {widgetSpin} widgetSpin对象
		* @example
		* $("#logo").widgetSpin('destroy');
		*/
		destroy:function(){
			var $this = this.element;
			 $this.unwrap().show();
			 $this.siblings('div,b,table').remove();
		}
});

$.extend($.ui.widgetSpin, {
	version: "1.2"
});

})(jQuery);
//initialize
$(function(){
	//$(".widgetSpin").widgetSpin();	   
});
