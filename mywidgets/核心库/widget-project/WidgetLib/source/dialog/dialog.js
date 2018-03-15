/*
 *作    者: 张文钦
 *版    本: 1.0
 *完成时间: 2012-8-29
 *描    述: dialog
 *关联文件: jQuery.js|jquery-ui.js
 */
(function($){
	"use strict";
	/**
	* @class 简单对话框
    * @name dialog
    * @description 简单对话框
	* @requires jQuery.js
	* @version 1.0
    */
    $.fn.dialog = function(option){
        var defaults = {
            /**
             * @name dialog#zIndex
             * @param {Number} 浮动容器的层高
             * @description 浮动容器的层高
             * @default 9
             * @example
             * $("#dialog").dialog({zIndex:10});
             */
            zIndex:9,
            /**
             * @name dialog#fixSize
             * @param {Boolean} 是否固定尺寸
             * @description 配置是否固定尺寸 开启式width和height才可配置 值为false自适应内容的宽高(FIXME:自适应宽高不好使)
             * @default true
             * @example
             * $("#dialog").dialog({fixSize:true});
             */
            fixSize:true,
            /**
             * @name dialog#width
             * @param {String} 控件的宽
             * @description 控件的宽
             * @default "300px"
             * @example
             * $("#dialog").dialog({width:"300px"});
             */
            width:"300px",
            /**
             * @name dialog#height
             * @param {String} 控件的高
             * @description 控件的高
             * @default "150px"
             * @example
             * $("#dialog").dialog({height:"150px"});
             */
            height:"150px",
            /**
             * @name dialog#event
             * @param {String} 控件显示隐藏的触发方式  可选值 hover click 自定义事件名
             * @description 控件显示隐藏的触发方式
             * @default "click"
             * @example
             * $("#dialog").dialog({event:"customEvent"});
             */
            event:"click",
            /**
             * @name dialog#type
             * @param {String} 加载内容的方式 (1)普通文本 html;(2)ajax 此时url为自定义的函数 返回加载后的内容;(3)iframe 此时 url为请求的连接
             * @description 加载内容的方式
             * @default "html"
             * @example
             * $("#dialog").dialog({type:"html"});
             */
            type:"html",
            /**
             * @name dialog#content
             * @param {String} 加载的内容 type:"html"时有效
             * @description 加载内容的方式
             * @default "<p>默认加载的内容</p>"
             * @example
             * $("#dialog").dialog({content:"<p>默认加载的内容</p>"});
             */
            content:"<p>默认加载的内容</p>",
            /**
             * @name dialog#url
             * @param {String} ajax iframe加载方式时的链接地址
             * @description ajax iframe加载方式时的链接地址
             * @default ""
             * @example
             * $("#dialog").dialog({url:""});
             */
            url:"",
            /**
             * @name dialog#dataType
             * @param {String} ajax的返回的数据类型 当前可选为text html
             * @description ajax的返回的数据类型
             * @default ""
             * @example
             * $("#dialog").dialog({dataType:"text"});
             */
            dataType:"text",
            /**
             * @name dialog#dataType
             * @param {Fn} ajax请求后的回调方法
             * @description ajax请求后的回调方法
             * @default function(){}
             * @example
             * $("#dialog").dialog({ajaxCallBack:function(){}});
             */
            ajaxCallBack:function(){},
            //0表示只需要加载一次 1表示隐藏时将对应的dialog删除
            /**
             * @name dialog#lifecycle
             * @param {Number} 对话框的生命周期 0 表示一次加载长期存活 1 表示每次显示时重新加载
             * @description 对话框的生命周期
             * @default 0
             * @example
             * $("#dialog").dialog({lifecycle:0});
             */
            lifecycle:0
        };
        option = $.extend({}, defaults, option || {});
        //==========工具函数
        /**
         * 依赖jquery版  TODO:方法需要简化合并
         * @param o  dom元素对象、不是文本节点
         */
        function _dimession(o) {
            //不传入参数时 返回当前window的尺寸对象
            if (!o || o.nodeType !== 1 || (o && typeof o === "object" && "setInterval" in o && o.window === window )) {
                //alert("调用错误，需要dom对象！");
                //return;
                //窗口 _ww 宽 _wh 高 _wl行滚动条滚动 _wt 竖滚动条滚动
                var $w = $(window);
                var _ww = $w.width();
                var _wh = $w.height();
                var _wl = $w.scrollLeft();
                var _wt = $w.scrollTop();   
                return {
                    ww:_ww,
                    wh:_wh,
                    wl:_wl,
                    wt:_wt
                };
            }
            //follow 依附的节点
            var $o = $(o);
            var _w = $o.width();
            var _h = $o.height();
            var _offset = $o.offset();
            var _ow = $o.outerWidth();  //含边框 边距 内外边距
            var _oh = $o.outerHeight();
            return {
                w:_w,
                h:_h,
                ow:_ow,
                oh:_oh,
                l:_offset.left,
                t:_offset.top
            };
        }
        /**
         *
         * @param o follow定位基准节点
         * @param d ui-dialog实例
         * @return {Object} 返回dialog/overlay的坐标
         */
        function coordinate(o,$d) {
            var _w = _dimession();
            //follow元素坐标尺寸信息
            var _b = _dimession(o);
            //浮动弹出元素坐标尺寸信息
            //处理绝对定义display隐藏元素的真实尺寸
            $d.css({display:"block",visibility:"hidden"});
            var _d = _dimession($d[0]);
            $d.css({display:"none",visibility:"visible"});
            //返回dialog/overlay的坐标
            var _returnJSON = {};
            //三角标示的尺寸 有一些偏差
            var _extra9 = 9;
            var _extra11 = 11;

            //防止在follow元素下方时，.ui-dialog的底边的高
            var _bottomMaxHeight = _b.t + _b.oh + _extra9 + _d.oh;
            //放置在follow元素上方时 浮动元素需要的高度
            var _topMin = _extra9 + _d.oh;
            //放置在follow元素左方时 浮动元素的坐标
            var _leftMinWidth = _d.ow + _extra11;
            //放置在follow元素右方时 浮动元素的坐标
            var _rightMaxWidth = _b.l + _b.ow + _extra11 + _d.ow;
            if (_bottomMaxHeight < _w.wh) {//下
                _returnJSON = {
                    w:_d.w + "px",
                    h:_d.h + "px",
                    top:_b.t + _b.oh + _extra9 + "px",
                    left:_b.l + _b.ow - _d.ow + "px",
                    className:"top",
                    triangleLeft:_d.ow - 30 + "px", //具体的额度再调整
                    triangleTop:"-10px"
                };
            } else if (_topMin < _b.t) { //FIXME:往上放不下时 会改变原有的offset 不做对应修正时会出错 上
                _returnJSON = {
                    w:_d.w + "px",
                    h:_d.h + "px",
                    top:_b.t - _d.oh - _extra9 + "px",
                    left:_b.l + _b.ow - _d.ow + "px",
                    className:"bottom",
                    triangleLeft:_d.w - 30 + "px", //具体的额度再调整
                    triangleTop:_d.oh - 2 + "px"//内容的高+padding值
                };
            } else if (_rightMaxWidth < _w.ww) { //右
                _returnJSON = {
                    w:_d.w + "px",
                    h:_d.h + "px",
                    top:_b.t + "px",
                    left:_b.l + _b.ow + _extra11 + "px",
                    className:"left",
                    triangleLeft:"-10px", //具体的额度再调整
                    triangleTop:"10px"
                };
            } else if (_leftMinWidth < _b.l) { //左
                _returnJSON = {
                    w:_d.w + "px",
                    h:_d.h + "px",
                    top:_b.t + _b.oh - _d.oh + "px",
                    left:_b.l - _leftMinWidth + "px",
                    className:"right",
                    triangleLeft:_d.ow - 2 + "px", //具体的额度再调整
                    triangleTop:_d.h - 30 + "px"
                };
            }
            //TODO:如果都放不下?
            return _returnJSON;
        }
        return this.each(function(){

            var _that = this;
            var $follow = $(_that);
            var _dialogId,$content,$triangle,$dialog;
            //初始化生成结构
            function _init(){
                //每次获取最新的标识
                _dialogId = $follow.attr("data-dialog");
                if (!_dialogId){
                    _dialogId = _that.id || _that.nodeName.toLowerCase();
                    _dialogId += "-" + (new Date()).getTime();
                    $content = $('<div class="content-container" />');
                    $triangle = $('<div class="ui-dailog-triangle"/>');
                    $dialog = $('<div class="ui-dailog" data-load="false" id='+_dialogId+' />');
                    $dialog.prepend($triangle).append($content);
                    //定义层高
                    $dialog.css("zIndex",option.zIndex);
                    if(option.fixSize){
                        $dialog.css({
                            width:option.width,
                            height:option.height
                        });
                    }
                    //加载数据
                    //没有做容错处理
                    //TODO:数据加载和内容显示部分需要在做处理
                    switch(option.type){
                        case "html":
                            $content.html(option.content);
                            break;
                        case "ajax":
                            $.get(option.url,function(data){
                                (option.ajaxCallBack)();
                                $content.html(data);
                            },option.dataType);
                            break;
                        case "iframe":
                            $('<iframe src="'+option.url+'" frameborder="0"></iframe>').appendTo($content);
                            break;
                    }
                    //生命周期为0时才需要添加
                    $follow.attr("data-dialog",_dialogId);
                } else {
                    $dialog = $("#"+_dialogId);
                    $triangle = $dialog.find(">div.ui-dailog-triangle");
                    $content = $dialog.find(">div.content-container");
                }
                //插入DOM
                $dialog.appendTo(document.body);
            }
            //显示
            function _show(){
                //获取元素位置
                //显示浮动窗口
                var _offset = $follow.offset();
                var _dialogJSON = coordinate(_that,$dialog);//follow的元素
                var _optCss = {
                    width:_dialogJSON.w,
                    height:_dialogJSON.h
                };
                $triangle.attr("class", "ui-dailog-triangle " + _dialogJSON.className).css({
                    top:_dialogJSON.triangleTop,
                    left:_dialogJSON.triangleLeft
                });
                $dialog.css({
                    left:_dialogJSON.left,
                    top:_dialogJSON.top,
                    width:0,
                    height:0,
                    display:"block"
                }).animate(_optCss, 600);
            }
            //隐藏或者删除
            function _hideOrRemove(_lc){
                var _hideCss = {
                    display:"none",
                    width:$dialog.width(),
                    height:$dialog.height()
                };
                $dialog.animate({
                    width:0,
                    height:0
                }, 600, function () {
                    if( _lc === 0){
                        $dialog.css(_hideCss);
                    }else if(_lc === 1){
                        $dialog.empty().remove();
                        $follow.removeAttr("data-dialog");
                    }

                });
            }
            //事件注册
            function _eventHandle(){
                _init();
                //绑定事件
                var _t = option.event;
                if(_t === "hover" || _t === "focus"){
                    var _hideTimer = null;
                    var _showTimer = null;
//                    var _signal = -1;
                    //使用信号量、延时的方式处理浮动容器的消失问题
					$follow.bind({
						"mouseover": function(){
							clearTimeout(_hideTimer);
							_hideTimer =null;//?
							clearTimeout(_showTimer);
							_showTimer = setTimeout(function(){
								_show();
							},500);
						},
						"mouseout": function(){
							_hideTimer = setTimeout(function(){
                                _hideOrRemove(option.lifecycle);
                            },500);
						}
					});
                    $dialog.hover(function(){
//                        _signal = 0;
                        clearTimeout(_hideTimer);
                        _hideTimer =null;
                    },function(){
//                        _signal = -1;
                        $follow.trigger("mouseout");
                    });
//                    $(document).bind("click",function(){
//                        if(!$dialog.is(":hidden")&&_signal == -1){
//                            $follow.trigger("mouseout");
//                        }
//                    });
                }else {//click或者自定义函数
                    $follow.bind(_t,function(e){
                        _init();
                        if($dialog.is(":hidden")){
                            _show();
                        }else{
                            _hideOrRemove(option.lifecycle);
                        }
                    });
                }
            }
            //绑定事件
            _eventHandle();
        });
    };
    $.extend($.fn.dialog, {
        version: "1.0"
    });
})(jQuery);