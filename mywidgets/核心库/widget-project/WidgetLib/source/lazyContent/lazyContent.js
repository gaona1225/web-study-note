/*
 *作    者: 张文钦
 *版    本: 1.3
 *完成时间: 2012-10-19
 *描    述: lazyContent
 *关联文件: jQuery.js|jquery-ui.js
 */
(function($, undefined) {
  /**
    * @class 内容懒加载
    * @name lazyContent
    * @description 内容懒加载
    * @version 1.3
    */
  $.widget('ui.lazyContent', {
    // options如何覆写
    // $('selector').lazyContent({});//此时覆写options并进行初始化
    // $('selector').lazyContent('show');//调用方法接口
    /** @lends lazyContent.prototype */
    options: {
      /**
       * @name lazyContent#mode
       * @param {Enum} 1:多个平行区;0:多个导航 1个显示区容器
       * @description 导航和内容的显示类型
       * @default '1' 表示多个平行区 类似于工作台面板及内容
       * @example
       * $('#lazyContent').lazyContent();
       */
      mode: '1',
      /**
       * @name lazyContent#el
       * @param {String} css 选择器或者对应jQuery对象
       * @description 待加载所需参数存放的位置上下文
       * @default ""
       * @example
       * $('#lazyContent').lazyContent({el: '.item_con'});
       */
      el: '',
      /**
       * @name lazyContent#dataTmpl
       * @param {String} 存放返回数据的容器元素的结构
       * @description 存放返回数据的容器元素的结构
       * @default '<div />'
       * @example
       * $('#lazyContent').lazyContent({dataTmpl: '<div />'});
       */
      dataTmpl: '<div />',
      /**
       * @name lazyContent#dataTmpl
       * @param {String} css 选择器 存放请求数据的所需参数的元素
       * @description 存放请求数据的所需参数的元素
       * @default ''
       * @example
       * $('#lazyContent').lazyContent({dataElem: ''});
       */
      dataElem: '',
      /**
       * @name lazyContent#dataType
       * @param {String} $.get异步请求返回数据类型 默认值为'html'
       * @description $.get异步请求返回数据类型
       * @default 'html'
       * @example
       * $('#lazyContent').lazyContent({dataType: 'json'});
       */
      dataType: 'html',
      /**
       * @name lazyContent#dataType
       * @param {String} 是否自行渲染的标识 auto 插件利用默认方式进行 此时 dataType为默认值 hand 手动渲染
       * @description 是否自行渲染的标识
       * @default 'html'
       * @example
       * $('#lazyContent').lazyContent({dataType: 'json'});
       */
      renderType: 'auto',
      /**
       * @name lazyContent#dataType
       * @param {Function} 自定义渲染函数 注意:返回值应是html的合法字符串
       * @description 自定义渲染函数
       * @default function(data) {}
       * @example
       * $('#lazyContent').lazyContent({render: function(data) { return 'string';}});
       */
      render: function(data) {},
      /**
       * @name lazyContent#timeout
       * @param {Number} 延迟加载的毫秒数
       * @description 延迟加载的毫秒数
       * @default 350
       * @example
       * $('#lazyContent').lazyContent({timeout: 350});
       */
      timeout: 350,
      /**
       * @name lazyContent#loading
       * @param {String} 加载中图标的路径
       * @description 加载中图标的路径
       * @default '/javascripts/loading.gif'
       * @example
       * $('#lazyContent').lazyContent({loading: 'path/to/loading pic'});
       */
      loading: '/javascripts/loading.gif',
      /**
       * @name lazyContent#event
       * @param {String} 触发加载内容的事件
       * @description 触发加载内容的事件
       * @default 'click'
       * @example
       * $('#lazyContent').lazyContent({event: 'click'});
       */
      event: 'click'
    },
    _create: function() {
      // this widget第二个参数对象
      // this.element执行当前作用对象的jquery对象
      // var o = this.options;
      // var self = this.element;
    },
    _init: function() {
      var $context = this.element;
      var option = this.options;
      var $el = option.el;
      var dataHolder = option.dataElem;
      var mode = option.mode;
      var $dataHolder;
      var timeout = null;
      var loadFlag;
      (new Image()).src = option.loading;
      // http://www.cnblogs.com/rubylouvre/archive/2012/08/29/2657183.html
      var $loading = $('<img alt="加载中..." data-placeHolder="loading"/>')
                      .attr('src', option.loading);
      if (mode === '0') { // 多个导航 1个显示区域
        if (!($el instanceof jQuery)) {
          $el = $($el);
        }
        // 如果当前已是选中 则不再进行处理
        // 防止重复调用
        // $context.data('stats', 'completed'); // 只使用第一次绑定
        // 后面的覆盖前面的
        $context.unbind(option.event).delegate(dataHolder, option.event,
          function(event) {
            clearTimeout(timeout);
            $dataHolder = $(event.target).closest(dataHolder);
            //客户端数据的保存方式.TODO
            // 1. 直接通过属性的方式存储在dom节点上
            // 2. 使用jQuery data存储
            // 3.
            loadFlag = $dataHolder.attr('data-load');
            if (loadFlag) {
              $el.find('#' + $dataHolder.attr('data-item')).show()
                  .siblings().hide();
            } else {
              var url = $dataHolder.attr('data-url');
              var param = $dataHolder.attr('data-param');
              $loading.appendTo($el);
              timeout = setTimeout(function() {
                $.get(url, 'dataType=' + param, function(data) {
                  $el.find('img[data-placeHolder="loading"]').remove();
                  var id = 'item_' + (new Date()).getTime();
                  var renderHtml = data;
                  if (option.renderType === 'hand') {
                    renderHtml = option.render(data);
                  }
                  $(option.dataTmpl).html(renderHtml)
                    .attr('id', id).appendTo($el).show()
                    .siblings().hide();
                  $dataHolder.attr('data-item', id)
                              .attr('data-load', 'loaded');
                }, option.dataType);
              }, option.timeout);
            }
          }
        );
      } else {
        $context.unbind(option.event).bind(option.event, function(event) {
          loadFlag = $context.attr('data-load');
          if (loadFlag) {
            return;
          }
          clearTimeout(timeout);
          var url = $context.attr('data-url');
          var param = $context.attr('data-param');
          var $contextHolder = $context.find(option.el);
          $loading.appendTo($contextHolder);
          timeout = setTimeout(function() {
            $.get(url, 'dataType=' + param, function(data) {
              $contextHolder.find('img[data-placeHolder="loading"]').remove();
              var id = 'item_' + (new Date()).getTime();
              var renderHtml = data;
              if (option.renderType === 'hand') {
                renderHtml = option.render(data);
              }
              $(option.dataTmpl).html(renderHtml)
                .attr('id', id).appendTo($contextHolder).show()
                .siblings().hide();
              $context.attr('data-item', id)
                          .attr('data-load', 'loaded');
            }, option.dataType);
          }, option.timeout);
        });
      }
    },
    show: function() {
      //方法默认返回this
      // 调用 $('selector').lazyContent('show');
    },
    hide: function() {},
    enable: function() {},
    disable: function() {},
    destroy: function() {}
  });
  $.extend($.ui.lazyContent, {
    version: '1.3'
  });
})(jQuery);
