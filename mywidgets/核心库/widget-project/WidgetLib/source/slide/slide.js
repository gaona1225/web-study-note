/*
 *
 * Slides, A Slideshow Plugin for jQuery
 * Intructions: http://slidesjs.com
 * By: Nathan Searles, http://nathansearles.com
 * Version: 1.1.9
 * Updated: September 5th, 2011
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(function($) {
  /**
   * @class 图片轮播展示
   * @name slide
   * @description 图片轮播展示插件
   * @version 1.1
   */
  $.fn.slide = function(option) {
    //默认配置
    var defaults = {
      /**
       * @name slide#maxNum
       * @param {Number} maxNum
       * @description 最多允许展示图片数目
       * @default {Number} 6
       * @example
       *
       */
      maxNum: 6,
      //最多允许6张图片
      /**
       * @name slide#width
       * @param {Number} width
       * @description 控件的宽
       * @default {Number} 438
       * @example
       *
       */
      width: undefined,
      /**
       * @name slide#height
       * @param {Number} height
       * @description 控件的高
       * @default {Number} 350
       * @example
       *
       */
      height: undefined,
      /**
       * @name slide#container
       * @param {String} container
       * @description 控件容器class值
       * @default {String} 'slide-container'
       * @example
       *
       */
      container: 'slide-container',
      /**
       * @name slide#hoverPause
       * @param {Boolean} hoverPause
       * @description 鼠标移入时是否停止周期轮播事件 true 表示 停止
       * @default {Boolean} false
       * @example
       *
       */
      hoverPause: false,
      //    preload: false, //  布尔型;控制预加载slideshow下的img的图片；
      //    preloadImage: '/img/loading.gif', // 字符串;设定预加载时的加载中标识...(默认值:/img/loading.gif)
      /**
       * @name slide#height
       * @param {Boolean} pagination
       * @description 手动选择显示的幻灯图片开关
       * @default {Boolean} true
       * @example
       *
       */
      pagination: true,
      /**
       * @deprecated
       * @name slide#paginationType
       * @param {String} paginationType
       * @description 手动触发方式;注意!暂时不提供配置
       * @default {String} 'click'
       * @example
       *
       */
      paginationType: 'click',
      /**
       * @name slide#paginationClass
       * @param {String} paginationClass
       * @description 手动选择入口的容器节点class值
       * @default {String} 'pagination'
       * @example
       *
       */
      paginationClass: 'pagination',
      // 设置pagination导航的位置 优先于样式类 .pagination-pos
      // 格式
      // {
      //   right: 25,
      //   bottom: 5
      // }
      paginationPos: null,
      // 是否显示pagination导航的文字 true表示 不显示 false 表示 显示
      paginationTextHidden: true,
      /**
       * @name slide#currentClass
       * @param {String} currentClass
       * @description 当前显示动画节点的class值
       * @default {String} 'current'
       * @example
       *
       */
      currentClass: 'current',
      /**
       * @name slide#duration
       * @param {Number} duration
       * @description 过渡动画持续时间
       * @default {Number} 600
       * @example
       *
       */
      duration: 600,
      /**
       * @name slide#start
       * @param {Number} start
       * @description 默认显示的图片序号
       * @default {Number} 1
       * @example
       *
       */
      index: 1,
      /**
       * @name slide#effect
       * @param {String} effect
       * @description 动画效果;1,fade,淡入淡出;2,slide:h 水平;v 垂直;可选值: "h"; "v"; "slide";
       * @default {String} 'h'
       * @example
       *
       */
      effect: 'h',
      /**
       * @name slide#shutterDir
       * @param {String} shutterDir
       * @description effect参数值为shutter时使用 可选值 h w
       * @default {String} 'h'
       * @example
       *
       */
      shutterDir: "h",
      /**
       * @name slide#shutterNum
       * @param {Number} shutterNum
       * @description 生成的百叶窗的数目
       * @default {Number} 3
       * @example
       *
       */
      shutterNum: 3,
      /**
       * @name slide#dataAttributeName
       * @param {String} dataAttributeName
       * @description 用来存储响应数据的参数
       * @default {String} 3000
       * @example
       *
       */
      dataAttributeName: "data-slideParamName",
      /**
       * @name slide#eventParams
       * @param {Array} eventParams
       * @description 构建时收集的每帧图片响应时预存的参数
       * @default {Array} []
       * @example
       *
       */
      eventParams: [],
      /**
       * @name slide#eventHandler
       * @param {Function} eventHandler
       * @description 构建时收集的每帧图片响应时响应实现
       * @default {Function} null 触发a标签上的默认调整动作
       * @example
       *
       */
      eventHandler: null,
      /**
       * @name slide#play
       * @param {Number} play
       * @description 自动播放周期(设定为大于0的数字将开启自动播放)
       * @default {Number} 3000
       * @example
       *
       */
      play: 2000,
      /**
       * @name slide#pause
       * @param {Number} pause
       * @description 控制手动播放时停止播放. 定为大于0的数字将开启停止播放功能,数值为停止的间隙
       * @default {Number} 1000
       * @example
       *
       */
      pause: 1000,
      //      hoverPause:false, // 布尔型 设置成ture 鼠标悬浮时会暂停动画
      //      bigTarget:false, // 布尔型 设置成true后点击一张图片将链接到下一张图片 注意img父节点a标签的点击事件
      /**
       * @name slide#animationStart
       * @param {fn} animationStart
       * @description 动画执行开始前调用的方法
       * @default {fn} function() {}
       * @example
       *
       */
      animationStart: function() {},
      /**
       * @name slide#animationComplete
       * @param {fn} animationComplete
       * @description 动画执行完毕后的回调方法
       * @default {fn} function() {}
       * @example
       *
       */
      animationComplete: function() {},
      /**
       * @name slide#animationComplete
       * @param {fn} animationComplete
       * @description 当幻灯片都加载好后调用的方法
       * @default {fn} function() {}
       * @example
       *
       */
      slideLoaded: function() {}
    };
    //加载默认配置和用户自定义配置
    option = $.extend({}, defaults, option || {});
    //淡入淡出 推入推出
    function _slide() {
      var $elem = $(this);
      var $container = $elem.find('.' + option.container);
      //将控件容器下的的幻灯片节点使用div.slide-control包裹
      //在html结构中限定
      //$slides.wrapAll(/*$control*/$('<div class="slide-control"/>'));
      var $control = $container.find(">div.slide-controller");
      var $slides = $control.children();
      var $imgs = $slides.find("img");

      //收集每帧图片对应的数据
      $.each($slides, function(index, item) {
        option.eventParams[index] = $(item).attr(option.dataAttributeName);
      });
      //绑定数据交互事件
      if (option.eventHandler && Object.prototype.toString.call(option.eventHandler) === '[object Function]') {
        $control.delegate("img", "click", function(event) {
          option.eventHandler(option.eventParams[current]);
          return false;
        });
      }
      //幻灯片数目
      var total = $slides.size();
      //如果获取准确的宽高
      //1.显式配置;2.在img上设置width,height属性;3,通过脚本判断获取(TODO:未完成)
      var width = option.width || $imgs.width() /*$slides.outerWidth()在某些情形下获取值不准确*/
      ;
      var height = option.height || $imgs.height() /*$slides.outerHeight()*/
      ;
      var start = option.index - 1;
      var next = 0;
      var prev = 0;
      var current = 0; //重置默认配置为0
      var loaded; //资源就绪
      var active; //锁,值为false值时才能开启一次动画
      var clicked; //手动选择的图片
      var position;
      var effect = option.effect;
      var direction; //正(左、上)、负向
      //            var imageParent;//预加载时使用
      var duration = option.duration;
      // 点击事件列表
      // 处理快速点击时动画叠加, 在动画过渡时期的白底问题
      var paginationListener = [];
      // if(duration < 2000) {
      //   duration = 2000;
      // }
      var pauseTimeout;
      var playInterval;
      if(total > option.maxNum) {
        alert("最多允许" + option.maxNum + "张图片!");
        return;
      }
      if((!option.width || !option.height) && (!$slides.find("img").attr("width") || !$slides.find("img").attr("height"))) {
        alert("控件宽高调用错误!");
        return;
      }
      //设定图片的宽、高;在自定义控件宽高时使用
      //此时不使用等比缩放、简单的将容器的宽、高赋值
      if(option.width && option.height) {
        $slides.find("img").attr("width", width).attr("height", height);
      }
      //设定容器的宽高
      //确定控件容器拥有样式: overflow: hidden; position: relative;
      //设定控制容器的样式
      $container.css({
        "overflow": "hidden",
        "position": "relative",
        "width": width + "px",
        "height": height + "px"
      });
      $control.css({
        "position": "relative",
        "top": -height + "px",
        //slide control
        "left": -width + "px",
        //slide control
        "width": total * width + "px",
        "height": total * height + "px"
      });
      //设定幻灯片的样式
      $slides.css({
        "position": "absolute",
        "display": "none",
        "top": height + "px",
        "left": width + "px",
        "z-index": 0
      });
      if(total < 2) { //只有一帧
        $container.fadeIn(duration, function() {
          loaded = true;
          option.slideLoaded();
        });
        return false;
      }
      if(start < 0) {
        start = 0;
      }
      if(start > total) {
        start = total - 1;
      }
      //根据配置的开始帧 设置 当前帧 下标
      if(option.index) {
        current = start;
      }

      //显示控件
      $container.css("display", "block");

      //此时只是简单的显示开始帧
      $control.children(":eq(" + start + ")").fadeIn(duration, function() {
        loaded = true;
        option.slideLoaded();
      });
      //生成手动操作入口
      if(option.pagination) {
        var ulCss = {
          "position": "absolute",
          // "right": "25px",
          // "bottom": "12px",
          "z-index": 6
        };
        var ul = '<ul class="' + option.paginationClass + ' pagination-pos ' + (!!option.paginationTextHidden ? 'pagination-text-hidden' : '' )+ '">';
        if (option.paginationPos) {
          var tmp, paginationPos = option.paginationPos;
          for (tmp in paginationPos) {
            if (paginationPos.hasOwnProperty(tmp)) {
              ulCss[tmp] = paginationPos[tmp];
            }
          }
          delete tmp;
        }
        for(var i = 0; i < total; i++) {
          ul += '<li><a href="javascript:;">' + (i + 1) + '</a></li>';
        }
        ul += '</ul>';
        $(ul).appendTo($container).css(ulCss);
        $elem.find('.' + option.paginationClass + ' li:eq(' + start + ')').addClass(option.currentClass);
        //绑定手动播放事件-->TODO:提供参数表示触发类型
        // switch(option.paginationType) {
        //   case "click":
        //     $elem.find("ul." + option.paginationClass + ">li>a").click(function() {
        //       console.log($control.is(':animated'));
        //       //强制中止动画
        //       // if(option.play) { // option.play
        //       //   _pause();
        //       // }
        //       if ($control.is(':animated')) {
        //         _pause();
        //       }
        //       //显示数字从1开始;计算下标由0开始
        //       clicked = parseInt($(this).text(), 10) - 1;
        //       if(current != clicked) {
        //         _animate('pagination', effect, clicked);
        //       }
        //       return false;
        //     });
        //     break;
        //   //控制上再滑动是不连贯-暂时屏蔽掉
        //   case "hover":
        //     console.log('pa: hover');
        //     break;
        //   default:
        //     break;
        // }
        $elem.find("ul." + option.paginationClass + ">li>a").click(function() {
          if(option.play) {
            _pause();
          }
          //显示数字从1开始;计算下标由0开始
          clicked = parseInt($(this).text(), 10) - 1;
          //  && !$control.is(':animated')
          // if(current != clicked) {
          //   _animate('pagination', effect, clicked);
          // }
          // 相邻事件不重复添加--> 放置到animation处理?
          if (current !== clicked) {
            if (paginationListener.length > 0) {
              if (clicked !== paginationListener[paginationListener.length - 1]) {
                paginationListener.push(clicked);
              }
            } else {
              paginationListener.push(clicked);
            }
          }
          if (!$control.is(':animated')) {
            if(paginationListener.length > 0) {
              _animate('pagination', effect, paginationListener.shift());
            }
          }
          return false;
        });
      }
      //开始图片播放
      if(option.play) {
        playInterval = setInterval(function() {
          _animate('next', effect);
        }, option.play);
        $elem.data("interval", playInterval);
      }

      // 悬浮暂停轮播事件
      if(option.hoverPause && option.play) {
        $control.bind({
          mouseover: function() {
            _stop();
          },
          mouseleave: function() {
            _pause();
          }
        });
      }
      // 检查导航点击事件列表
      // 如果有 则执行 否则 进入轮播状态
      function _checkListener() {
        if (paginationListener.length > 0) {
          if (option.play) {
            _pause();
          }
          _animate('pagination', effect, paginationListener.shift());
        }
      }
      function _animate(direction, effect, clicked) {
        if(!loaded || active) return;
        //动画开始前调用
        option.animationStart(current + 1);
        //根据动画方向 更新配置参数
        switch(direction) {
        case "next":
          prev = current;
          next = current + 1;
          next = (total === next) ? 0 : next;
          current = next;
          if(effect == "h") {
            position = width * 2;
            direction = -position;
          } else if(effect == "v") {
            position = height * 2;
            direction = -position;
          }
          break;
        case "prev":
          prev = current;
          next = current - 1;
          next = (next = -1) ? total - 1 : next;
          position = direction = 0;
          current = next;
          break;
        case "pagination":
          prev = $elem.find('.' + option.paginationClass + ' li.' + option.currentClass + ">a").text();
          prev = parseInt(prev, 10) - 1;
          next = clicked;
          if(prev < next) {
            if(effect == "h") {
              position = width * 2;
              direction = -position;
            } else if(effect == "v") {
              position = height * 2;
              direction = -position;
            }
          } else {
            position = direction = 0;
          }
          current = next;
          break;
          //其他
        }
        //动画效果
        switch(effect) {
        case "h":
          $control.children(":eq(" + next + ")").css({
            "left": position + "px",
            "display": "block"
          });
          $control.animate({
            "left": direction + "px"
          }, duration, function() {
            //重置动画控制对象参数
            $control.css({
              "left": -width + "px"
            });
            $control.children(':eq(' + next + ')').css({
              "left": width + "px",
              zIndex: 5
            });
            $control.children(':eq(' + prev + ')').css({
              "left": width + "px",
              display: 'none',
              zIndex: 0
            });
            //结束动画
            option.animationComplete(next + 1);
            active = false;
            _checkListener();
          });
          break;
        case "v":
          $control.children(":eq(" + next + ")").css({
            "top": position + "px",
            "display": "block"
          });
          $control.animate({
            "top": direction + "px"
          }, duration, function() {
            //重置动画控制对象参数
            $control.css({
              "top": -height + "px"
            });
            $control.children(':eq(' + next + ')').css({
              "top": height + "px",
              "z-index": 5
            });
            $control.children(':eq(' + prev + ')').css({
              "top": height + "px",
              "display": "none",
              "z-index": 0
            });
            //结束动画
            option.animationComplete(next + 1);
            active = false;
            _checkListener();
          });
          break;
        case "fade":
          $control.children(":eq(" + next + ")").css({
            "z-index": 5 //6?5?7?
          }).fadeIn(duration, function() {
            $control.children(":eq(" + prev + ")").css({
              "z-index": 0,
              "display": "none"
            });
            //重置z-index
            $control.children(":eq(" + next + ")").css({
              "z-index": 0
            });
            //结束动画
            option.animationComplete(next + 1);
            active = false;
            _checkListener();
          });
          break;
        case "zoom":
          $control.children(":eq(" + next + ")").css({
            width: 0,
            height: 0,
            left: 3 * width / 2,
            top: 3 * height / 2
          });
          $control.children(":eq(" + prev + ")").animate({
            width: 0,
            height: 0,
            left: 3 * width / 2,
            top: 3 * height / 2
          }, duration / 2, function() {
            $control.children(":eq(" + prev + ")").css({
              "z-index": 0,
              "display": "none",
              "width": width,
              "height": height,
              "top": height,
              "left": width

            });
            $control.children(":eq(" + next + ")").animate({
              width: width,
              height: height,
              left: width,
              top: height
            }, duration / 2);
            //重置z-index
            $control.children(":eq(" + next + ")").css({
              "z-index": 0,
              "display": "block",
              "opacity": "1"
            });
            //结束动画
            option.animationComplete(next + 1);
            active = false;
            _checkListener();
          });
          break;
        default:
          break;
        }
        // 更新手动操作样式
        if(option.pagination) { //可直接替换
          //删除
          $elem.find('.' + option.paginationClass + ' li.' + option.currentClass).removeClass(option.currentClass);
          // 添加
          $elem.find('.' + option.paginationClass + ' li:eq(' + next + ')').addClass(option.currentClass);
        }
      }

      /**
       * 清除自动播放周期
       */
      function _stop() {
        clearInterval($elem.data('interval'));
      }

      /**
       * 清除定时器;延时添加定时器
       */
      function _pause() {
        if(option.pause) {
          clearTimeout($elem.data('pause'));
          clearInterval($elem.data('interval'));
          pauseTimeout = setTimeout(function() {
            clearTimeout($elem.data('pause'));
            playInterval = setInterval(function() {
              _animate('next', effect);
            }, option.play);
            $elem.data("interval", playInterval);
          }, option.pause);
          $elem.data('pause', pauseTimeout);
        } else {
          //_stop();
        }
      }
    }
    //百叶窗
    //see http://www.cnblogs.com/hongru/archive/2010/10/31/1865555.html
    function _shutter() {
      var _that = this;
      var $wrapper = $(_that);
      var $container = $wrapper.find("." + option.container);
      var $imgParentA = $container.find("a");
      var $img = $imgParentA.find("img");
      //收集每帧图片对应的数据
      $.each($imgParentA, function(index, item) {
        option.eventParams[index] = $(item).attr(option.dataAttributeName);
      });
      //自动运行间隔
      _that.a = option.auto ? option.auto : 4;
      _that.index = option.index ? option.index : 0;
      //幻燈片個數
      _that.l = $imgParentA.length;
      //当前显示的图片序号(未&&z-index变量)
      _that.cur = 0;
      //百葉窗的葉子數//@
      _that.stN = option.shutterNum ? option.shutterNum : 5;
      //輪播的方向
      _that.direction = option.shutterDir ? option.shutterDir : 'h';
      _that.W = option.width ? option.width : $wrapper.width();
      _that.H = option.height ? option.height : $wrapper.height();

      _that.aw = 0;
      //_that.mask = [];
      //隱藏原始圖片輪播部份
      $container.width(this.W).height(this.H).find(">div.slide-controller").css("display", "none");
      //構建百葉窗結構
      var $shutterContainer = $("<div />");
      var $shutterA = $("<a />");
      $shutterA.attr("href", "javascript:;");

      var _shutterHTML = "";
      for(var x = 0; x < _that.stN; x++) {
        var _spanCssText = _that.direction === "h" ? "position:absolute;width:" + _that.W / _that.stN + "px;height:" + _that.H + "px;left:" + x * (_that.W / _that.stN) + "px;top:0" : "position:absolute;width:" + _that.W + "px;height:" + _that.H / _that.stN + "px;left:0" + "px;top:" + x * (_that.H / _that.stN) + "px";
        _shutterHTML += '<span style="' + _spanCssText + '">' + '</span>';
      }
      var _doubleUseCssText = {
        "position": "absolute",
        "width": _that.W + "px",
        "height": _that.H + "px",
        "left": 0,
        "top": 0
      };
      $shutterA.html(_shutterHTML).css(_doubleUseCssText);
      //$shutterContainer.css(_doubleUseCssText).css("background-color", "rgba(36, 72, 108,.5)").append($shutterA).appendTo($container);
	  $shutterContainer.css(_doubleUseCssText).css("background-color", "rgb(36, 72, 108)").append($shutterA).appendTo($container);
      //绑定数据交互事件
      $shutterA.bind("click", function() {
        option.eventHandler(option.eventParams[_that.cur]);
        return false;
      });
      //生成手动操作入口
      if(option.pagination) {
        var ulCss = {
          "position": "absolute",
          //"right": "25px",
          //"bottom": "12px",
          "z-index": 6
        };
        //var ul = '<ul class=' + option.paginationClass + '>';
		var ul = '<ul class="' + option.paginationClass + ' pagination-pos ' + (!!option.paginationTextHidden ? 'pagination-text-hidden' : '' )+ '">';
		if (option.paginationPos) {
          var tmp, paginationPos = option.paginationPos;
          for (tmp in paginationPos) {
            if (paginationPos.hasOwnProperty(tmp)) {
              ulCss[tmp] = paginationPos[tmp];
            }
          }
          delete tmp;
        }
        for(var i = 0; i < _that.l; i++) {
          ul += '<li><a href="javascript:;">' + (i + 1) + '</a></li>';
        }
        ul += '</ul>';
        $(ul).appendTo($shutterContainer).css(ulCss).delegate("li", "click", function(event) {
          var _t = event.target;
          while(_t.nodeType === 3) _t = _t.parentNode;
          var $target = $(_t);
          if($target.is("ul")) {
            return;
          } else {
            if($target.is("a")) {
              $target = $target.parent();
            }
          }
          if($target.is("." + option.paginationClass)) return;
          _that.pos($target.index());

        });
        $shutterContainer.find('.' + option.paginationClass + ' li:eq(' + _that.index + ')').addClass(option.currentClass);
      }
      //變換函數
      //大小週期
      _that.timer1 = false;
      _that.timer2 = [];
      _that.timer2.length = _that.stN;
      //小週期
      //传说中的变量提升
      _that.auto = function() {
        _that.timer1 = setInterval(function() {
          _that.move(1);
        }, _that.a * 1000);
      };
      _that.anim = function(index) {
        var tt = _that.direction == 'h' ? $shutterA.find("span:eq(" + (_that.stN - 1) + ")").width() : $shutterA.find("span:eq(" + (_that.stN - 1) + ")").height();
        if(tt <= 5) { //如果叶片过多 这个值有点小
          clearInterval(_that.timer2[index]);
          for(var z = 0; z < _that.stN; z++) {
            _that.direction == 'h' ? $shutterA.find("span:eq(" + z + ")").width(0) : $shutterA.find("span:eq(" + z + ")").height(0);
          }
          if(!_that.timer1) {
            _that.auto()
          }
        } else {
          for(var n = 0; n < _that.stN; n++) {
            _that.aw -= 1;
            _that.direction == 'h' ? $shutterA.find("span:eq(" + n + ")").width(_that.aw) : $shutterA.find("span:eq(" + n + ")").height(_that.aw);
          }
        }
      };
      _that.move = function(index) {
        var n = _that.cur + index;
        //下一张或上一张的序号（注意三元选择符的运用）
        var m = index == 1 ? n == _that.l ? 0 : n : n < 0 ? _that.l - 1 : n;
        //变换到上一张或下一张
        _that.pos(m);
      };
      _that.pos = function(index) {
        //                console.log("@pos:傳入的i:" + index );
        clearInterval(_that.timer1);
        clearInterval(_that.timer2[index]);

        _that.aw = _that.direction === "h" ? _that.W / _that.stN : _that.H / _that.stN;

        var _next = index + 1 >= _that.l ? 0 : index + 1;

        var _indexSrc = $img[index].src;
        var _nextSrc = $img[_next].src;

        $shutterContainer.css("background-image", "url(" + _nextSrc + ")");
        for(var y = 0; y < _that.stN; y++) {
          var _cssText = {
            "background-image": "url(" + _indexSrc + ")"
            //"background-repeat": " no-repeat "
          };
          if(_that.direction == "h") {
            _cssText["background-position"] = "-" + y * _that.W / _that.stN + "px 0";
            _cssText["width"] = _that.W / _that.stN + "px";
            _cssText["height"] = _that.H + "px";
            _cssText["left"] = y * (_that.W / _that.stN) + "px";
            _cssText["top"] = 0;
          } else {
            _cssText["background-position"] = "0 -" + y * _that.H / _that.stN + "px";
            _cssText["width"] = _that.W + "px";
            _cssText["height"] = _that.H / _that.stN + "px";
            _cssText["left"] = 0;
            _cssText["top"] = y * (_that.H / _that.stN) + "px";
          }
          $shutterA.find("span:eq(" + y + ")").css(_cssText);
        }

        _that.cur = index;
        _that.timer1 = false;
        //删除
        $shutterContainer.find('.' + option.paginationClass + ' li.' + option.currentClass).removeClass(option.currentClass);
        // 添加
        $shutterContainer.find('.' + option.paginationClass + ' li:eq(' + index + ')').addClass(option.currentClass);
        _that.timer2[index] = setInterval(function() {
          _that.anim(index);
        }, 10 * _that.stN);
      };
      _that.pos(_that.index);
    }
    return this.each(option.effect === "shutter" ? _shutter : _slide);
  };
  $.extend($.fn.slide, {
    version: "1.1"
  });
})(jQuery);
