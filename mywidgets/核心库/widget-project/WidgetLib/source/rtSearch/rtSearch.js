/**
 * @作者 张文钦
 * @时间 2011-10-18
 * @描述 实时搜索
 * @关联 jquery-1.5.2.js
 * @版本 1.2
 */
(function($){
	/**
	* @class 实时搜索插件
    * @name rtSearch
    * @description 实时搜索插件
	* @requires jQuery.js|jquery-ui.js
	* @version 1.2
    */
    $.fn.rtSearch = function(options){
        /**参数、属性扩展*/
        var defaults = {
		   /**  
			* @name rtSearch#width  
			* @param {String} rtSearch rtSearch对象
			* @description 搜索框长度
			* @default {width} "100%"
			* @example
			* $('.rtSearch').rtSearch({width:'200px'});
			*/
            width:'100%',
            /**
             * @param timeout 
             */
            /**  
			* @name rtSearch#timeout  
			* @param {Number} rtSearch rtSearch对象
			* @description 执行自定义响应函数的间隙时间(单位:毫秒)
			* @default {timeout} 600
			* @example
			* $('.rtSearch').rtSearch({timeout:1000});
			*/
            timeout:600,
		   /**  
			* @name rtSearch#searchHandler  
			* @param {fn} rtSearch searchHandler对象 
			* @description 自定义实时搜索处理函数
			* @default {fn} function(){}
			* @example
			* $(".rtSearch").rtSearch({
			*	searchHandler : function(){
			*		alert("响应了实时搜索");
			*		}
			*    });
			*/
            searchHandler:function(){},
            /**  
			* @name rtSearch#onFocus  
			* @param {fn} rtSearch onFocus对象 
			* @description 输入框获得焦点时执行的方法
			* @default {fn} function(){}
			* @example
			* $(".rtSearch").rtSearch({
			*	onFocus : function(){
			*		alert("输入框获得焦点");
			*		}
			*    });
			*/
            onFocus:function(){},
            /**
             * 输入框失去焦点时之行的方法
             */
            /**  
			* @name rtSearch#onBlur
			* @param {fn} rtSearch onBlur对象 
			* @description 输入框失去焦点时执行的方法
			* @default {fn} function(){}
			* @example
			* $(".rtSearch").rtSearch({
			*	onBlur : function(){
			*		alert("输入框失去焦点");
			*		}
			*    });
			*/ 
            onBlur:function(){},
            /**  
			* @name rtSearch#search_mode
			* @param {number} 数字类型 
			* @description 搜索的方式默认值为2，可选值为0:严格搜索,1普通搜索,2自定义搜索方式
			* @default {number} 2
			* @example
			* $(".rtSearch").rtSearch({
			*	search_mode : 2
			* });
			*/
			search_mode : 2
        };
		//判断是否清除插件 2012-03-07 desc by gaona
		if(options != 'destory'){
			var opt = $.extend(defaults,options);
			var _focus = false;
			var _timeSignal = null;
			this.each(function(){
				var $this = $(this);
				var $widgetBox = $('<div class="jh-widgets-rtSearch" style="width:'+opt.width+'"></div>');
				var $searchIco = $('<span class="rt-search-ico"></span>');
				//add clear btn 2012-03-07 desc by gaona
				var $clearIco = $('<span class="rt-clear-ico"></span>');
				var $sHandler = opt.searchHandler;
				var $onFocus = opt.onFocus;
				var $onBlur = opt.onBlur;
				$this.css('width',parseInt(opt.width)-48) ;				
				//desc by gaona 2012-03-07 判断是否已经创建dom元素开始  
				if($this.attr('data-dom')!='true'){
					$this.wrap($widgetBox).before($searchIco).after($clearIco) ;
					$this.attr('data-dom','true') ;
				}else{
				}
				//desc by gaona 2012-03-07 判断是否已经创建dom元素结束  
				$this.focus(function(){
					 _focus = true;
					 if($onFocus != undefined){
						 $onFocus();
					 }
					 //执行实时搜索 2012-03-07 modfiy by gaona 
					 var searchMode = opt.search_mode ;
					 switch(searchMode){
						 case 0 :_timeSignal = setInterval(function(){searchStrict($.trim($this.val())) ;},opt.timeout) ; break ;
						 case 1 :_timeSignal = setInterval(function(){searchCommon($.trim($this.val())) ;},opt.timeout) ; break ;
						 case 2 :_timeSignal = setInterval(function(){$sHandler() ;},opt.timeout) ; break ;
					 }					 
				 })
				 .blur(function(){
					clearInterval(_timeSignal);
					_focus = false;
					if($onBlur != undefined){
						$onBlur();
					}
				 });
				 // 2012-03-07 desc by gaona begin
				 //清空输入框内容 
				 $this.parents('.jh-widgets-rtSearch').children('.rt-clear-ico').click(function(){
					$this.val('') ;	
				 }) ;
				 //清空输入框内容 
				 
				 //搜索方法--严格搜索
				 function searchStrict(keyword){
					 var $searchCon = $('#searchCon>p');
					/*清空*/
					$searchCon.find('span[class^="highlight"]').each(function(index){
						$(this).replaceWith($(this).text());
					});
					/*匹配高亮*/
					if(keyword != null && keyword != ''){
					   var _regexp = new RegExp('('+keyword+')','g');
					   var _text = $searchCon.text();
					   if(_regexp.test(_text)){
						   $searchCon.html(_text.replace(_regexp,'<span class="highlight">$1</span>'));
					   }
					}
				 }
				 //搜索方法--普通搜索
				 function searchCommon(keyword){
					 var $searchCon = $('#searchCon>p');
					/*清空*/
					$searchCon.find('span[class^="highlight"]').each(function(index){
						$(this).replaceWith($(this).text());
					});
					/*匹配高亮*/
					if(keyword != null && keyword != ''){
					   var _regexp = new RegExp('('+keyword+')','g');
					   var _text = $searchCon.text();
					   var strReg = "[\s,./，。、《》？<>?`~!@#$%^&*()_+|·~！@#￥%&*（）——+|]" ; //定义被忽略的特殊字符
					   var reg = new RegExp(strReg,"g") ;
					   var _comKeyword = keyword.replace(reg,"") ; 
					   var _comregexp = new RegExp('('+_comKeyword+')','g') ;
					   if(_regexp.test(_text)){
						   $searchCon.html(_text.replace(_regexp,'<span class="highlight">$1</span>'));
					   }else if(_comregexp.test(_text)){
						   $searchCon.html(_text.replace(_comregexp,'<span class="highlight">$1</span>'));
					   }
					}
				 }
				 //2012-03-07 desc by gaona end
			});
		}else{
			//desc by gaona 2012-03-07 添加销毁事件开始
			if($(this).attr('data-dom') == 'true'){
				$(this).parents('.jh-widgets-rtSearch').children('span').remove() ;
				$(this).unwrap() ;
			}
			$(this).attr('data-dom','false') ;
			//desc by gaona 2012-03-07 添加销毁事件结束
		}
    };
    $.extend($.fn.rtSearch, {version: "1.2"});
})(jQuery);