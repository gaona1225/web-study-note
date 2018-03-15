/*
 *作    者: 张文钦
 *版    本: 1.3
 *完成时间: 2012-10-19
 *描    述: lazyImage
 *关联文件: jQuery.js|jquery-ui.js
 */
(function($, undefined) {
  /**
    * @class 内容懒加载
    * @name lazyContent
    * @description 内容懒加载
    * @version 1.3
    */
  $.widget('ui.lazyImage', {
    /** @lends lazyImage.prototype */
    options: {
      /**
       * @name lazyImage#isCtx
       * @param {Boolean} true 表示只处理当前上下文下的符合条件的img
       * @description 是否只处理当前上下文下的符合条件的img
       * @default true
       * @example
       * $('#lazyContent').lazyContent();
       */
      isCtx: true,
      /**
       * @name lazyImage#isHungry
       * @param {Boolean} true 表示急切的在初始化时就绑定事件
       * @description 是否急切的在初始化时就绑定事件
       * @default true
       * @example
       * $('#lazyContent').lazyContent();
       */
      isHungry: true,
      /**
       * @name lazyImage#lazyAttr
       * @param {String} true 懒加载的属性标识
       * @description 懒加载的属性标识 需要在构建结构时添加
       * @default 'data-lazyImg'
       * @example
       * $('#lazyContent').lazyContent();
       * TODO: 初始化时确保值合法
       */
      lazyAttr: 'data-lazyImg',
      /**
       * @private
       * @name lazyImage#_$imgCon
       * @param {Object} 待加载图片的jQuery对象
       * @description 待加载图片的jQuery对象
       * @default null
       */
      _$imgCon: null,
      /**
       * @name lazyImage#placeHolder
       * @param {Object} 给待加载图片家的站位图片
       * @description 给待加载图片家的站位图片
       * @default '/images/blank.gif'
       */
      placeHolder: '/images/blank.gif'
    },
    _create: function() {
      var $context = this.element;
      var o = this.options;
      if (o.isCtx) {
        o._$imgCon = $('img[' + o.lazyAttr + '="true"]', $context);
      } else {
        o._$imgCon = $('img[' + o.lazyAttr + '="true"]');
      }
      //添加站位图片
      o._$imgCon.attr('src', o.placeHolder);
      // 获取坐标
      o._coordinate = function($el) {
        var coordinate = {
          width: $el.width(),
          height: $el.height()
        };
        if ('setInterval' in $el[0]) {
          //window is the logic suitable?
          coordinate.top = $el.scrollTop();
          coordinate.left = $el.scrollLeft();
        } else {
          var offset = $el.offset();
          coordinate.top = offset.top + $el.scrollTop();
          coordinate.left = offset.left + $el.scrollLeft();
        }
        return coordinate;
      };
      //判断是否相交 在可视区内
      o._isCut = function(cc, ic) {
        var cx = cc.left + cc.width;
        var cy = cc.top + cc.height;
        var ix = ic.left + ic.width;
        var iy = ic.top + ic.height;

        return cx > ic.left && cy > ic.top;
      };
      o._lazyImage = function() {
        var $window = $(window);
        var $toLoad = o._$imgCon.filter('[' + o.lazyAttr + '="true"]');
        var cc = o._coordinate($window);
        $toLoad.each(function(index, item) {
          var $img = $(this);
          var ic = o._coordinate($img);
          if (o._isCut(cc, ic)) {
            //没有做出错处理
            //1. 使用(new Image()).src = $img.attr('data-original');load 触发替换
            $img.attr('src', $img.attr('data-original'))
                .attr(o.lazyAttr, 'loaded');
          }
        });
      };
    },
    _init: function() {
      if (this.options.isHungry) {
        this.load();
      }
    },
    /**
     * @name lazyImage#load
     * @param {Function} 手动触发绑定加载图片事件
     * @description 手动触发绑定加载图片事件
     * @example
     * $('#lazyImage').lazyImage('load');
     */
    load: function() {
      var o = this.options;
      o._lazyImage();
      $(window).bind('scroll resize', $.proxy(o._lazyImage, o));
    },
    show: function() {},
    hide: function() {},
    enable: function() {},
    disable: function() {},
    destroy: function() {}
  });
  $.extend($.ui.lazyImage, {
    version: '1.3'
  });
})(jQuery);
