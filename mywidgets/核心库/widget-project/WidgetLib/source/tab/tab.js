/*
 *作    者: 张文钦
 *作    者: 万莎
 *完成时间: 2011-10-18
 *描    述: tab
 *关联文件: jQuery.js|jquery-ui.js
 * modify huanghui@2012-12-7 加入tabMenu菜单选项卡
 */
(function($,undefined){
    /**
	* @class 选项卡插件
    * @name tab
    * @description 选项卡插件
	* @requires jQuery.js|jquery-ui.js
	* @version 1.3
    */
    $.widget("ui.tab",{
        options:{},
        _create:function(){
            var _self = this.element,
				o = this.options,
                _type = _self.attr("data-tabType") || "min";
                //_type 取值为 min/pro
                /*选项卡内容处理*/
                if ( _type === "minLeft" ) {
                    _self.addClass("ui-tabMin-rl");
                } else if(_type==='tabMenu'){
					_self.addClass("ui-tabMenu");
				}else {
                    _self.addClass((_type === 'min')?"ui-tabMin":"ui-tabPro");//由类型添加对应的类
                }
                _self.find(">dt").attr("class","normal");
                _self.click(function(e){
					var _targetId = _self.attr('data-targetId');
                    var $target = $(e.target);
                    if($target.is('dt')){
                        if(_targetId === 'div'){//简洁选项卡//标准选项卡内容区为div替换
                            var $recentActiveTab = _self.find('>dt.active');
                                $recentActiveTab.attr('class','normal').attr('data-targetId');
                                $('#'+$recentActiveTab.attr('data-targetId')).css('display','none');
                                $target.attr('class','active');
                                $('#'+$target.attr('data-targetId')).css('display','block');
                        }else if(_targetId != 'div' && _targetId !='brrowTab'){//标准选项卡
					        var _url = $target.attr('data-tabUrl');
                            _self.find('>dt[class="active"]').attr('class','normal');
                            $target.attr('class','active');
							o.injected = o.injected || false;
                            var $targetIframe = $("#"+_targetId);
                            var $module;
                            if ( !o.injected ) {
                              $module = $('<div class="tab-iframe-module"></div>');
                              $module.insertBefore($targetIframe);//往后+遮不住
                              o.injected = true;
                            } else {
                              $module = $targetIframe.prev("div.tab-iframe-module");
                            }
                            $module.css("display","block");
                            $targetIframe.attr("src",_url).bind("load",function(){
                              $module.css("display","none");
                            });
				        }
                    }
                });
        },
        _init: function(){
             //this.element.find(">dt:first").attr('class','active').click();
            var _self = this.element,
        		_flag = _self.attr("data-flag") || '';
        	if(_flag == ''){
        		//默认的 竖直时使用inline-block获取高度
        		_self/*.css("display","block")*/.find(">dt:first").attr('class','active').click();
        	}else{//_flag 1 2 3
        		_self/*.css("display","block")*/.find('>dt').eq(_flag-1).attr('class','active').click();
        	}
        },
		show: function(){
            var _self = this.element;
			_self.show();
            return _self;
        },
		hide: function(){
            var _self = this.element;
			_self.hide();
            return _self;
        },
        enable: function() {},
        disable: function() {},
		destroy: function(){
            var _self = this.element;
			_self.removeClass("ui-tabMin ui-tabPro ui-tabMin-rl");
            return _self;
		}
    });
$.extend($.ui.tab, {
	version: "1.3"
});
})(jQuery);
//initialize
$(function(){
	$(".ui-tab").tab();
});

