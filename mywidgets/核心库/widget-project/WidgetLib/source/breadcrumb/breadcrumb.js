/*
 *作    者: 张文钦
 *版    本: 1.0
 *完成时间: 2012-8-16
 *描    述: breadcrumb
 *关联文件: jQuery.js|jquery-ui.js
 */
(function($){
	/**
     * @class 面包屑
     * @name breadcrumb
     * @description 面包屑
     * @version 1.0
     */
    $.fn.breadcrumb = function(option){
        var defaults = {
            /**
             * @name breadcrumb#bread
             * @param {Array} 数据项格式为{name:"level",url:"#"}的对象数组
             * @description 面包屑构成数据集数组
             * @default {breadcrumb} []
             * @example
             * $("#breadcrumb").breadcrumb([{name:"level",url:"#"}]);
             */
            bread:[{}]
        };
        option = $.extend({}, defaults, option || {});
        return this.each(function(){
            //只有1、2个数据、3或者3+数据
            var $this = $(this);
            var _datas = option.bread;
            var i= 0,len= _datas.length;
            if ( len === 0 ) {
                alert("参数传入错误!");
                return this;
            }
            var $dataContent = '<ul class="ui-breadcrumb">';
            var _data = _datas[i++];

            if ( len === 1 ) {
                $dataContent += '<li class="last-child"><span class="arrow"></span>'+_data.name+'</li></ul>';
                $this.html($dataContent);
                return this;
            } else if ( len === 2 ) {
                $dataContent += '<li><span class="arrow"></span><a href="'+_data.url+'">'+_data.name+'</a></li>'
                    + '<li class="last-child"><span class="arrow"></span>'+_data.name+'</li></ul>';
                $this.html($dataContent);
                return this;
            }
            $dataContent += '<li><a href="'+_data.url+'">'+_data.name+'</a></li>';
            for ( i;i<len-1;i++) {
                _data = _datas[i];
                $dataContent += '<li><span class="arrow"></span><a href="'+_data.url+'">'+_data.name+'</a></li>';
            }
            _data = _datas[len-1];
            $dataContent += '<li class="last-child"><span class="arrow"></span>'+_data.name+'</li></ul>';
            $this.html($dataContent);
        });
    }
    $.extend($.fn.breadcrumb, {
        version: "1.0"
    });
})(jQuery);