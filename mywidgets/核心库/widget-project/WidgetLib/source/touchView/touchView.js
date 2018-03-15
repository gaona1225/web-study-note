/*!
* touchView插件
* 综合iscroll,3g.163/touch频道, 工作台数据客户端数据加载
*/
;(function ($, window, undefined) {
/* From Matteo Spinelli, http://cubiq.org*/
    var dummyStyle = document.createElement('div').style,
        hasTouch = 'ontouchstart' in window,
        has3d = 'WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix(),
        vendor = (function () {
            var vendors = 't,webkitT,MozT,msT,OT'.split(','),
                t,
                i,
                l;
            for (i = 0, l = vendors.length; i < l; i++) {
                t = vendors[i];
                if (t + 'ransform' in dummyStyle) {
                    //直接返回 跳出循环
                    return t.substr(0, t.length -1);
                }
            }            
            // 如果不在检测之列 则置为不支持
            return false;
        })(),
         cssVendor = vendor ? '-' + vendor.toLowerCase() + '-' : '',
        // 样式属性
         transform = prefixStyle('transform'),
         transitionDuration = prefixStyle('transitionDuration'),
         transitionDelay = prefixStyle('transitionDelay'),
        // 3d变换
         perspective = prefixStyle('perspective'),
         transformStyle = prefixStyle('transformStyle'),
         hasTransform = vendor !== false,
         hasTransitionEnd = prefixStyle('transition') in dummyStyle,
        // 事件名
         RESIZE_EV = 'onorientationchange' in window ? 'orientationchange' : 'resize',
         START_EV = hasTouch ? 'touchstart' : 'mousedown',
         MOVE_EV = hasTouch ? 'touchmove' : 'mousemove',
         END_EV = hasTouch ? 'touchend' : 'mouseup',
         CANCEL_EV = hasTouch ? 'touchcancel' : 'mouseup',
         TRNEND_EV = (function () {
            if ( vendor === false ) {
                return false;
            }
            // 映射
            var transitionEnd = {
                    ''          : 'transitionend',
                    'webkit'    : 'webkitTransitionEnd',
                    'Moz'       : 'transitionend',
                    'O'         : 'otransitionend',
                    'ms'        : 'MSTransitionEnd'
                };

            return transitionEnd[vendor];
        })(),
    // 方便统一取值
    translateZ = has3d ? ' translateZ(0)' : '';
    // 拼接函数
    function prefixStyle (style) {
        if ( vendor === '' ) {
            return style;
        }
        style = style.charAt(0).toUpperCase() + style.substr(1);
        return vendor + style;
    }
    /** 
    * @class touchView
    * @name touchView
    * @description 触控操作的多视图切换组件
    * @version 1.3
    * @requires jquery-1.5.2+, jquery.ui.core, jquery.ui.widget
    */
    $.widget('ui.touchView', {
        options: {
            /**  
            * @name touchView#enabled
            * @param {Boolean}  启用标识
            * @description
            * @default {Boolean} true
            */
            enabled: true,
            /**  
            * @name touchView#autoInit
            * @param {Boolean}  是否自动初始化标识 true为真
            * @description
            * @default {Boolean} true
            */
            autoInit: true,
            /**  
            * @name touchView#autoSize
            * @param {Boolean}  是否自动设置尺寸标识 true为真
            * @description
            * @default {Boolean} true
            */
            autoSize: true,
            /**  
            * @name touchView#bounce
            * @param {Boolean}  非loop下在首尾端滑动时反弹 true为真
            * @description
            * @default {Boolean} true
            */
            bounce: true,
            /**  
            * @name touchView#varyHeight
            * @param {Boolean}  是否根据滑片高度调整容器高 true为真
            * @description 设置为true后 设置slide的overflow:hidden
            * @default {Boolean} false
            */
            varyHeight: false,
            /**  
            * @name touchView#loop
            * @param {Boolean}  是否根据滑片高度调整容器高 true为真
            * @description 循环显示效果 在首尾复制尾页 当前第1页时 向左滑 显示真实最有一页 当前最有1页是 向右滑 实现第一页内容
            * @default {Boolean} true
            */
            loop: true,
            /**  
            * @name touchView#wrapperW
            * @param {Number}
            * @description 滑动容器宽
            * @default {Number} null
            */
            wrapperW: null,
            /**  
            * @name touchView#sliderW
            * @param {Number}
            * @description 计算maxScrollX最大可滑动距离用
            * @default {Number} null
            */
            sliderW: null,
            /**  
            * @name touchView#wrapperW
            * @param {Number}
            * @description 滑片的数目 不可配置
            * @default {Number} -1
            */
            pageNum: -1,
            /**  
            * @name touchView#threshold
            * @param {Number}
            * @description 滑动灵敏度控制 阀值 正数
            * @default {Number} 50
            */
            threshold: 50,
            /**  
            * @name touchView#onBeforeSlideStart
            * @param {Function}
            * @description 滑动前回调方法
            * @default {Function} function (e) { e.preventDefault(); }
            */
            onBeforeSlideStart: function (e) { e.preventDefault(); },
            /**  
            * @name touchView#onSlideStart
            * @param {Function}
            * @description 滑动开始时回调方法
            * @default {Function} null
            */
            onSlideStart: null,
            /**  
            * @name touchView#onBeforeSlideMove
            * @param {Function}
            * @description 滑动时回调方法
            * @default {Function} null
            */
            onBeforeSlideMove: null,
            /**  
            * @name touchView#onSliding
            * @param {Function}
            * @description 滑动时回调方法
            * @default {Function} null
            */
            onSliding: null,
            /**  
            * @name touchView#onTouchEnd
            * @param {Function}
            * @description 滑动时回调方法 滑动完毕 translateX更新完毕后执行的回调方法
            * @default {Function} null
            */
            onTouchEnd: null,
            /**  
            * @name touchView#onInit
            * @param {Function}
            * @description 初始化额外操作
            * @default {Function} null
            */
            onInit: null
        },
        _create: function () {
            var that = this,
                self = that.element,
                options = that.options,
                instanceOptions = {
                    // translateX
                    offsetX: 0,
                    // 上次页码
                    prePage: -1,
                    // 当前页码
                    currentPage: -1,
                    // x方向增量
                    deltaX: 0,
                    // 点击处坐标x值
                    pointX: -1,
                    // 点击处坐标y值
                    pointY: -1,
                    // 临时 translateX
                    newX: 0,
                    // 移动标识
                    // false, 'left', 'right'
                    moved: false,
                    // 滑片内层容器宽 数字
                    wrapperW: null,
                    // 滑片宽
                    sliderW: null,
                    // 最大滑动距离
                    // 负值
                    maxScrollX: null,
                    // 变形完毕后的状态值修正回调函数
                    endCallback: null,
                    handleEvent: function (e) {
                        var t = this;
                        switch (e.type) {
                            case START_EV:
                                if (!hasTouch && e.button !== 0) {
                                    return;
                                }
                                t._start(e);
                                break;
                            case MOVE_EV:
                                t._move(e);
                                break;
                            case END_EV:
                                // fall through
                            case CANCEL_EV:
                                t._end(e);
                                break;
                            case RESIZE_EV:
                                t._resize(e);
                                break;
                            case TRNEND_EV:
                                t._transitionEnd(e);
                                break;
                        }
                    }
                },
                i;
            // 滑片dom节点初始化 
            that.wrapper = self[0];
            // 导航节点保存 previousElementSibling
            that.navHolder = that.wrapper.previousElementSibling.children[0];
            // firstElementChild
            that.slider = that.wrapper.children[0];
            that.wrapper.style.overflow = 'hidden';
            // 实例属性扩展
            for (i in instanceOptions) {
                that[i] = instanceOptions[i];
            }
            // 配置参数修正更新
            options.threshold = Math.abs(options.threshold);
            options.pageNum = that.slider.children.length;
        },
        _init: function () {
            var that = this,
                options = that.options;
            // 自动初始化
            if (options.autoInit) {
                that.refresh();                
            }
            // 如果滑动项高度参差 则溢出隐藏
            if (options.varyHeight) {
                that.slider.style.overflow = 'hidden';
            }
            // 事件链开始点
            that._bind(RESIZE_EV, window);
            that._bind(START_EV);
        },
        // 设置滑动容器的位置及变更时长
        _pos: function(x, time) {
            var that = this,
                options = that.options;
            if (!options.enabled) {
                return;
            }
            time = time ? time : 0;
            that.slider.style[transitionDuration] = time + 's';
            that.slider.style[transform] = 'translate(' + x + 'px,0px)' + translateZ;
            if (options.onSliding) {
                options.onSliding.call(that, that.deltaX);
            }
        },
        // 初始化
        refresh: function () {
            var that = this,
                s,
                sc,
                // 取别名 缩短获取值时的寻址路径
                options = that.options,
                i = 0,
                len;
            // 第一页
            that.offsetX = that.prePage = that.currentPage = 0;
            that.wrapperW = options.wrapperW ?
                                options.wrapperW :
                                that.wrapper.clientWidth ?
                                    that.wrapper.clientWidth : screen.width;
            that.sliderW = options.sliderW ?
                                options.sliderW : that.wrapperW * options.pageNum;

            s = that.slider;
            sc = s.children;
            // 分配宽度
            that.wrapper.style.width = that.navHolder.style.width
                = that.navHolder.parentNode.style.width
                = that.wrapperW + 'px';
            sc[0].style[perspective] = sc[sc.length - 1].style[perspective] = '1000';
            if (options.autoSize) {
                s.style.width = that.wrapperW * options.pageNum + 'px';
                for ( len = sc.length; i < len; i++) {
                    sc[i].style.width = that.wrapperW + 'px';    
                }
            }                    
            // 最大滑动距离负值
            that.maxScrollX = that.wrapperW - that.sliderW;
            // 如果循环
            // 拷贝最后一个slide
            // 并在最前、最后插入
            // 页码+2
            // 同时设置滑片的宽
            if (options.loop) {
                var tmp;
                // 往s下的第一片前插入最后一片
                tmp = sc[sc.length -1].cloneNode(true);
                //tmp.setAttribute('data-sid', null);
                tmp.removeAttribute('data-sid');
                // tmp.id = null;
                tmp.style[perspective] = '1000';
                tmp.style.width = that.wrapperW + 'px';
                s.insertBefore(tmp, sc[0]);
                // 往s下的最后一片后插入第一片
                // s把原始第一片追加到最后
                // sc保持与dom联系
                // 原始第一片现在的坐标为1
                tmp = sc[1].cloneNode(true);
                //tmp.setAttribute('data-sid', null);
                tmp.removeAttribute('data-sid');
                // tmp.id = null;
                tmp.style[perspective] = '1000';
                tmp.style.width = that.wrapperW + 'px';
                s.appendChild(tmp);

                if (options.autoSize) {
                    s.style.width = (options.pageNum + 2) * that.wrapperW + 'px';
                }
                that.deltaX = 0;
                that.offsetX = - that.wrapperW;
                // 显示真实第一帧
                that._pos(that.offsetX);
            }
            if (options.varyHeight) {
                that.adjustHeight();
            }
            if (options.onInit) {
                options.onInit.call(that);
            }
        },
        /**
        *@param {Number} index 目标页游标
        *@param {Number} time 延迟秒数 设置显示容器的高
        *@param {Bollean} isTriggerEnd 是否触发onTouchEnd事件 true为真
        */
        slideToPage: function (index, time, isTriggerEnd) {
            var that = this,
                options = that.options;
            index = parseInt(index, 10);
            if (that.currentPage === index) {
                return;
            }
            that.prePage = that.currentPage;
            that.currentPage = index;
            that.offsetX = - (options.loop ? index + 1 : index) * that.wrapperW;
            that._pos(that.offsetX, time);
            if (isTriggerEnd && options.onTouchEnd) {
                options.onTouchEnd.call(that, null, that.currentPage, that.prePage);
            }
            if (options.varyHeight && time) {
                setTimeout(function () {
                    that.adjustHeight();
                }, 1000 * time);
            }
        },
        // 根据当前滑片的高度设置slider的高度
        adjustHeight: function () {
            var elem = this.slider.children[(this.options.loop ? 1 : 0) + this.currentPage];
            if (elem) {
                // getComputedStyle值 形如'200px'
                // 不支持ie
                this.slider.style.height = getComputedStyle(elem, null).height;
            }
        },
        _resize: function (e) {
            var that = this,
                s,
                sc,
                i,
                len,
                options = that.options;
            // 获取初始化参数
            that.wrapperW = options.wrapperW ?
                                options.wrapperW :
                                that.wrapper.clientWidth ?
                                    that.wrapper.clientWidth : screen.width;
            that.sliderW = options.sliderW ?
                                options.sliderW : that.wrapperW * options.pageNum;
            that.maxScrollX = that.wrapperW - that.sliderW;
            that.offsetX = -that.wrapperW * (options.loop ? that.currentPage + 1 : that.currentPage);
            // 重置参数配置
            // 在手动配置宽度时不适应
            s = that.slider;
            sc = s.children;
            len = sc.length;
            // 分配宽度
            that.wrapper.style.width = that.navHolder.style.width
                = that.navHolder.parentNode.style.width
                = that.wrapperW + 'px';
            if (options.autoSize) {
                s.style.width = that.wrapperW * len + 'px';
                for (i = 0; i < len; i++) {
                    sc[i].style.width = that.wrapperW  + 'px';
                }
            }
            that._pos(that.offsetX);
            if (options.adjustHeight) {
                that.adjustHeight();
            }
        },
        _start: function (e) {
            if (!hasTouch && e.button !== 0) {
                return;
            }
            var that = this,
                point = hasTouch ? e.touches[0] : e,
                options = that.options;
            if (!options.enabled) {
                return;
            }
            if (options.onBeforeSlideStart) {
                options.onBeforeSlideStart.call(that, e);
            }

            // 坐标
            that.pointX = point.pageX;
            that.pointY = point.pageY;

            if (options.onSlideStart) {
                options.onSlideStart.call(that, e);
            }

            // 初始化绑定
            that._bind(MOVE_EV);
            that._bind(END_EV);
            that._bind(CANCEL_EV);
        },
        // 滑动过渡
        _move: function (e) {
            var that = this,
                newX,
                deltaX,
                point = hasTouch ? e.touches[0] : e,
                pointX = point.pageX,
                pointY = point.pageY,
                options = that.options;
            deltaX = that.deltaX = pointX - that.pointX;

            newX = that.offsetX + that.deltaX;
            // 反弹在未循环时
            // 在首页 右滑 欲显示左侧没有的内容
            // 在尾页 左滑 欲显示右侧没有的内容
            if (!options.loop &&
                (
                    (deltaX > 0 && that.currentPage === 0) ||
                    (newX < that.maxScrollX && that.currentPage === options.pageNum - 1)
                )
            ) {
                newX = options.bounce ? newX + (deltaX / 2) :
                    newX >= 0 || that.maxScrollX >= 0  ? 0 : that.maxScrollX;
            }
            that._pos(newX);
        },
        // 更新最终状态
        _end: function (e) {
            // 不处理多点触碰
            // 多点触碰下 之前是处理第一个
            if (hasTouch && e.touches.length !== 0) {
                 return;
            }
            var that = this,
                point = hasTouch ? e.touches[0] : e,
                options = that.options,
                threshold = options.threshold;
            that._unbind(MOVE_EV);
            that._unbind(END_EV);
            that._unbind(CANCEL_EV);

            that._bind(TRNEND_EV);

            e.moved = false;
            that.prePage = that.currentPage;
            if (that.deltaX < -threshold) {
                that.deltaX = 0;
                if (++that.currentPage === options.pageNum) {
                    if (options.loop) { // 此时显示的是最后一页
                        that.currentPage = 0;
                        that.offsetX -= that.wrapperW; // 过渡显示 tmp 第一页
                        that.endCallback = function () {
                            // 显示页修正
                            that._unbind(TRNEND_EV);
                            that.offsetX = -that.wrapperW;
                            that._pos(that.offsetX);
                        };
                        that._pos(that.offsetX, 0.4);
                        e.moved = 'left';
                    } else {
                        that.currentPage--;
                        that._pos(that.offsetX, 0.4);
                    }
                } else {
                    // 当前显示的不是最后一页
                    // 往后翻
                    that.offsetX -= that.wrapperW;
                    that._pos(that.offsetX, 0.4);
                    // 内容向左移动
                    e.moved = 'left';
                }
            } else {
                if (that.deltaX > threshold) {
                    that.deltaX = 0;
                    if (--that.currentPage === -1) {
                        // 当前显示的是第一页
                        if (options.loop) {
                            that.currentPage = options.pageNum - 1;
                            that.offsetX += that.wrapperW;
                            that.endCallback = function () {
                                that._unbind(TRNEND_EV);
                                that.offsetX = -that.wrapperW * options.pageNum;
                                that._pos(that.offsetX);
                            };
                            that._pos(that.offsetX, 0.4);
                            e.moved = 'right';
                        } else {
                            that.currentPage++;
                            that._pos(that.offsetX, 0.4);
                        }
                    } else {
                        that.offsetX += that.wrapperW;
                        that._pos(that.offsetX, 0.4);
                        e.moved = 'right';
                    }
                } else {
                    that._pos(that.offsetX, 0.4);
                }
            }
            if (options.onTouchEnd) {
                options.onTouchEnd.call(that, e, that.currentPage, that.prePage);
            }
        },
        _transitionEnd: function (e) {
            var that = this,
                options = that.options;
            // 状态修正
            if (that.endCallback) {
                that.endCallback();
                that.endCallback = null;
            }
            if (options.varyHeight) {
                that.adjustHeight();
            }
            that._unbind(TRNEND_EV);
        },
        // jq桌面测试中的上下文对象和事件对象有问题
         _bind: function (type, el, bubble) {
            (el || this.slider).addEventListener(type, this, !!bubble);
        },
        _unbind: function (type, el, bubble) {
            (el || this.slider).removeEventListener(type, this, !!bubble);
        }
    });
    // 规避内存释放问题
    dummyStyle = null;
    $.extend($.ui.touchView, {
        version: '1.3'
    });
})(jQuery, window);
