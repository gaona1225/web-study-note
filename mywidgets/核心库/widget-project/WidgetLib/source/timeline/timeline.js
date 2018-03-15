/*
 *作    者: 张文钦
 *版    本: 1.0
 *完成时间: 2012-8-31
 *描    述: timeline
 *关联文件: jQuery.js|jquery-ui.js
 */
(function ($) {
	"use strict";
	/**
	* @class 简单时间轴+对应信息展示
    * @name timeline
    * @description 时间轴+对应信息展示
	* @requires jQuery.js
	* @version 1.0
    */
    $.fn.timeline = function (option) {
        var defaults = {
            /**
             * @name timeline#timeBuilder
             * @param {String} 时间轴时间点生成方式 "auto" 自动生成 此时根据navStartDate和navDateOffset来生成 "hand" 手动配置 此时使用navDate
             * @description 时间轴时间点生成方式
             * @default "hand"
             * @example
             * $("#timeline").timeline({timeBuilder:"hand"});
             */
            timeBuilder:"hand",
            /**
             * @name timeline#navDate
             * @param {Array} 自定义显示的时间点 时间数组 格式 "2012.9.1"
             * @description 自定义显示的时间点
             * @default ["2012.8.30", "2012.8.31", "2012.9.1", "2012.9.2"]
             * @example
             * $("#timeline").timeline({navDate:["2012.8.30", "2012.8.31", "2012.9.1", "2012.9.2"]});
             */
            navDate:[],
            /**
             * @name timeline#navStartDate
             * @param {String} 定义开始结束日期 生成时序时间点
             * @description  定义开始结束日期 生成时序时间点
             * @default null
             * @example
             * $("#timeline").timeline({ navStartDate:"2012.8.12",navDateOffset:10});
             */
            navStartDate:null,
            /**
             * @name timeline#navDateOffset
             * @param {Number} 游标 表示开始时间后加多少天做时间轴点 >=0的整数  总的时间点为 navDateOffset+1
             * @description  游标 表示开始时间后加多少天做时间轴点
             * @default 0
             * @example
             * $("#timeline").timeline({ navStartDate:"2012.8.12",navDateOffset:10});
             */
            navDateOffset:null,
            /**
             * @name timeline#content
             * @param {Array} 时间轴对应的静态数据信息 如果配置了content则优先于url使用
             * @description  时间轴对应的静态数据信息 如果配置了content则优先于url使用
             * @default ["2012.8.30-(1)", "2012.8.31(2)", "2012.9.1(3)", "2012.9.2(4)"]
             * @example
             * $("#timeline").timeline({ content:["2012.8.30-(1)", "2012.8.31(2)", "2012.9.1(3)", "2012.9.2(4)"]});
             */
            content:[],
            /**
             * @name timeline#url
             * @param {String} ajax获取时间轴信息的链接 返回对应数目的信息 
             *                    返回值为形如{"2012.9.19":"手工数据2012.9.19"}的json数据,其中键key为对应的事件点 对应的键值为具体的html字符串
             * @description  ajax获取时间轴信息的链接 返回对应数目的信息 返回类型为json
             * @default null
             * @example
             * $("#timeline").timeline({ url:"http://192.168.24.67:8080/spring/timeline?navData="+["2012.9.16", "2012.9.17", "2012.9.18", "2012.9.19"].join(",")});
             */
            url:null,
            //数据类型;1.html已拼接好的html结构;2.json/xml;纯数据 此时根据自定义的内容构建函数处理 构建每个日期下的内容
            //dataType:"json",
            //获取到数据
            //contentBuilder:function(){},
            //初始激活时间
            /**
             * @name timeline#initActive
             * @param {String} 初始时激活的时间点
             * @description  初始时激活的时间点
             * @default null
             * @example
             * $("#timeline").timeline({ initActive:"2012.9.19"});
             */
            initActive:null,
            /**
             * @name timeline#width
             * @param {Number} 配置区域的宽
             * @description  配置区域的宽
             * @default 400
             * @example
             * $("#timeline").timeline({ width:400});
             */
            width:400,
            /**
             * @name timeline#height
             * @param {Number} 配置区域的高 时间轴部分的高位91 内容的高为此高度-91的值
             * @description  配置区域的高 时间轴部分的高位91 内容的高为此高度-91的值
             * @default 191
             * @example
             * $("#timeline").timeline({ height:191});
             */
            height:191,
			/**
             * @name timeline#basePath
             * @param {Number} 定位到图片images所在目录的路径
             * @description  定位到图片images所在目录的路径
             * @default 191
             * @example
             * $("#timeline").timeline({ basePath:"./"});
             */
			basePath:"."
        };
		if(option != 'destroy'){
			option = $.extend({}, defaults, option || {});
			return this.each(function () {
				var $this = $(this);
				var $nav = $('<div class="ui-timeline-nav" />');
				var $navContent = $("<ul />");
				var $content = $('<ul class="ui-timeline-content" />');
				//生成时间点
				var _nav = [];
				if (option.timeBuilder === "auto") {
					_nav = _buildTime(option.navStartDate, option.navDateOffset);
				} else {
					_nav = option.navDate;
				}
				//生成时间轴内容
				var _lis = "";
				var _basePath = option.basePath;
				for (var i = 0, len = _nav.length; i < len; i++) {
					_lis += _point(_nav[i],_basePath);
				}
				$navContent.html(_lis);
				$nav.html($navContent);
				$this.prepend($nav);
				//获取时间轴对应的数据信息
				var _content = option.content, _contentLength = _content.length;
				if (_contentLength !== 0) {
					if (_contentLength !== _nav.length) {
						alert("时间点和数据不对应!");
						return;
					}
					var _divContent = "", j;
					for (j = 0; j < _contentLength; j++) {
						_divContent += "<li data-key=\""+_nav[j]+"\">" + _content[j] + "</li>";
					}
					$content.html(_divContent);
					$this.append($content);
				} else {
					  //FIXME:测试defer后修改实现方式
					  $.getJSON(option.url, function (data) {
						  var _content = "";
						  var _initActive = option.initActive;
						  for ( var o in data ) {
							if ( data.hasOwnProperty( o ) ) {
								if ( o == _initActive ){
								  _content +="<li data-key=\""+o+"\" class=\"current\">" + o + "<br/>" + data[o] + "</li>";
								} else {
								  _content +="<li data-key=\""+o+"\">" + o + "<br/>" + data[o] + "</li>";
								}
							}                        
						  }                   
						  $content.html(_content);
						  $this.append($content);
					  });
				}
				//设定显示的宽和高
				var _h = option.height;
				_h = _h < 91 ? 100 : _h;
				$this.width(option.width).height(_h);
				_h -= 91;
				$content.height(_h);
				//绑定事件
				$nav.delegate("ul", "click", function (e) {
					var _t = e.target;
					while (_t.nodeType === 3) _t = _t.parentNode; //排除文本节点
					var $target = $(_t);
					if ($target.is("ul")) return;
					if (!$target.is("li")) { //not返回值是jq对象的筛选集，不是boolean
						if ($target.is("span")) {
							$target = $target.parent();
						} else {
							$target = $target.parent().parent();
						}
					}
					//当前已选中，则不切换
					if ($target.is(".selected")) return;
					$target.attr("class", "selected").siblings(".selected").removeClass();
					$content.find("li[data-key=\""+$target.attr("data-key")+"\"]").attr("class", "current").siblings(".current").removeClass();
					return false;
				});
				//触发事件
				//配置激活的日期
				if(!option.initActive){
				  $nav.find("li:first").trigger("click");
				} else {
				  $nav.find("li[data-key=\""+option.initActive+"\"]").trigger("click");
				}
				//时间点内容生成
				function _point(timeData,_basePath) {
					return '<li data-key="'+timeData+'">'
						+ '<span class="content">'
						+ '<img src="'+_basePath+'/images/timeline/ui-timeline-bg-3.png"/>'
						+ '<em></em>'
						+ '<b>' + timeData + '</b>'
						+ '</span>'
						+ '<span class="tag"></span>'
						+ '</li>';
				}
				/**
				 *
				 * @param start "2012.8.3"
				 * @param offset{Number}   天数
				 * @private
				 */
				function _buildTime(start, offset) {
					function _ts(_sTime) {
						return _sTime.getFullYear() + "." + (_sTime.getMonth() + 1) + "." + _sTime.getDate();
					}
					var _sTime = new Date(start);
					offset = offset && offset > 0 ? offset : 0;
					var ret = [ _ts(_sTime)];
					for (var i = 1, len = offset; i <= len; i++) {
						_sTime.setDate(_sTime.getDate() + 1);
						ret[ret.length] = _ts(_sTime);
					}
					return ret;
				}
				/**
				 * 路径工具函数 在引用图片资源时用到
				 * 脚本合并到ui.js时,此函数用不到
				 * @private
				 */
				function _path(){
				  var scripts = document.getElementsByTagName("script");
				  var i,len,_path;
				  for(i=0,len=scripts.length;i<len;i++){
					  var _s = scripts[i].src||"",index;
					  if ((index = _s.indexOf("timeline.js")) != -1){
						  _path = _s.substring(0,index-1);
						  break;
					  }
				  }
				  return _path;
				}
			});
		}else{
			var isCreate = $(this).find('div.ui-timeline-nav').length>0 ;
			if(isCreate){
				$(this).empty() ;
			}
		}
    };
    $.extend($.fn.timeline, {
        version: "1.3"
    });
})(jQuery);