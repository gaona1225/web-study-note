/*
 *作    者: 张勇辉
 *版    本: 1.0
 *完成时间: 2011-07-12
 *描    述: menuList
 *关联文件: jQuery.js|jquery-ui.js
 */
(function($,undefined){
    /**
	* @class 下拉菜单插件
    * @name menuList
    * @description 下拉菜单插件
	* @version 1.0
    */
	$.widget("ui.menuList",
	/** @lends menuList.prototype */
	{
		options:{
        /**
        * @name menuList#json
        * @param {menuList} menuList menuList对象
        * @description JSON数据源
		* @default {menuList} ""
		* @example
		* $("#link").menuList({json:"json.js"});
        */
		json : "",
		/**
        * @name menuList#json
        * @param {menuList} menuList menuList对象
        * @description 数据回显标志，true显示数据回显
		* @default {menuList} ""
		* @example
		* $("#link").menuList({dateShow:true});
        */
        dateShow :false,
        /**
        * @name menuList#json
        * @param {menuList} menuList menuList对象
        * @description 字数限制，默认为5
		* @default {menuList} ""
		* @example
		* $("#link").menuList({numControl:5});
        */
        numControl :5,
        /**
        * @name menuList#fn
        * @param {menuList} menuList menuList对象
        * @description 执行函数
		* @default {menuList} function(){}
		* @example
		* $("#link").menuList({
		* 	fn:function(){
		*		$("#aa").live("click",function(event){
		*			if($(event.target).is("li")){
		*				alert($(event.target).attr("id"));
		* 			}
		*		}
		* });
        */
		fn : function(){},
        /**
        * @name menuList#listId
        * @param {menuList} menuList menuList对象
        * @description 下拉列表的ID，用于对下拉列表操作
		* @default {menuList} ""
		* @example
		* $("#link").menuList({listId:"listBox_1"});
        */
		listId :""
		},
		_create:function(){

		},
		_init:function(){
			var o = this.options,
				_self = this.element,
				_menuList = $("<div />").addClass("ui-menuList").append("<ul />").attr("id",o.listId);
				_menuList.find("ul").append("<li>菜单列表</li><li>菜单列表</li><li>菜单列表</li><li>菜单列表</li>"),
				fn = o.fn;
			/***
			 * @description json参数可以传入.json文件的地址，也可以传入json格式的字符串。
			 					*（不能直接串如json串，必须为字符串格式） *
			 * @modify huanghui
			 * @date2012-10-24
			 */
			if(typeof(o.json)=='object'){
				alert('json参数请传入json格式的字符串！');
				return ;
			}
			if(o.json.indexOf('[{')==0){
				var json = JSON.parse(o.json);
				exeJson(json);
			}else{
				$.getJSON(o.json,function(data){
					exeJson(data);
					return false;
				});
			}
			function exeJson(data){
				_menuList.find("ul").empty();
				$.each(data,function(entryIndex,entry){
					var menuListText = "";
					if(entry['menuList'].length>5){
						menuListText = entry['menuList'].substring(0,5)+"...";
					}else{
						menuListText = entry['menuList'];
					}
					var html = "";
					if(entry['menuList']=="管理角色组"){
						html = "<li id='" + entry['id'] + "' title='"+entry['menuList']+"' style='color:blue' >" + menuListText +"</li>";
					}else{
						html = "<li id='" + entry['id'] + "' title='"+entry['menuList']+"' >" + menuListText +"</li>";
					}
					_menuList.find("ul").append(html);
				});
			}
			_menuList.find("li").hover(function(){
					$(this).addClass("h");
			},function(){
					$(this).removeClass("h");
			});
			if(_self.is(".buttonPro")){
				_self = _self.parent().parent();
			}
            _menuList.insertAfter(_self);
            _self.unbind("click").bind("click",function(event){
                getMenuListPosition(height);
                _menuList.slideToggle();
                event.stopPropagation();
            });
            fn();
             /**
             * flag=true:在div外面点击，div收缩
             * flag=false:在div内点击。
             * 给div绑定事件设置flag的值，
             * 还有_self也需要将其设置为false
              * huanghui@2012-3-12
             * */
            var flag= true;
            _menuList.mouseout(function(){
                flag=true ;
            });
            _self.mouseover(function(){
                flag=false;
            }).mouseout(function(){
                flag=true;
            });

            //给document绑定mouseup事件
            $(document).bind("mouseup",function(){
                var div = document.getElementById(o.listId);
                if (div=='' ||div==null||div == 'undefined' ) {
                    return ;
                }
                if(div.style.display!="none"&&flag){
                    div.style.display="none";
                }
            });

            /**
             * _menuList定位 ，给div进行定位
             * 问题：可能在页面滑动的时候，div定位不正确
             * huanghui@2012-3-12
             * */
            var height;
            setTimeout(function(){
              _menuList.css({
                    "left":-1000,
                    "top":-1000,
                    "z-index":9999,
                    "display":"block"
                });
                height = _menuList.height();
                _menuList.css("display","none");
            },500);
            $(window).bind("resize",function(){
                _menuList.slideUp();
            }).bind("scroll",function(){
                _menuList.slideUp();
            });   //当滚动条滑动的时候，下拉div消失
            function getMenuListPosition(height){
                var _selfTop = _self.offset().top ;
                var _selfLeft =  _self.offset().left;
                var top = _selfTop +_self.height();
                var _h = $(window).height()-top;
                if(_h<height && height<=_selfTop){    //下面放不下了，div向上的情况
                     top = _selfTop - height -7;
                    _menuList.css({'top':top+'px','left':_selfLeft+'px'})  ;
                }
                else if(_h<height && height>_selfTop){  //上面和下面都放不下了，div向下显示的情况
                    _selfLeft = _selfLeft-8;
                    _menuList.css({'top':top+'px','left':_selfLeft+'px'})  ;
                }
                else{                                //一般情况，div向下显示
                	if(_self.parent('#d_search').size()!=0){
	                	top = top - 10;
	                	_selfLeft =_selfLeft -10;
                	}
                     _menuList.css({'top':top+'px','left':_selfLeft+'px'})  ;
                }
            }
            if(o.dateShow){
	             /**
	             * 选择后，数据回选,并且div隐藏（dateShow==true）
	             * huanghui@2012-3-12
	             * */
	            _menuList.click(function(event){
	                if($(event.target).is("li")){
	                    var targetId = $(event.target).text();
	                    var but = $("#"+o.listId).prev('span').children('span').children('input') ;
	                    if(but.size()==0){
	                        but = $("#"+o.listId).prev('a')  ;
	                        but.text(targetId+"▼");
	                    }else{
	                       but.attr("value",targetId) ;
	                    }
					}
	            	
	            });
            }
            /**
             * ipad 上解决window绑定事件，
             * 如果div显示，点击其他document元素div隐藏
             * huanghui@2012-3-13
             * */
            if("ontouchstart" in window){
                window.document.body.addEventListener("touchstart",function(e){
                    var className = $(e.target).parent('ul').parent('div').attr("class");
                     if(className==null||className=='undefined'||className==''||!(className.match('ui-menuList'))){
                        var div = document.getElementById(o.listId);
                        if(div.style.display!="none"){
                            div.style.display="none";
                        }
                    }
                },false);
            }
		},
		/**
		* @description 销毁下拉菜单
		* @example
		* $("#link").menuList('destroy');
		*/
		destroyMenuList:function(){
			if(this.element.is(".buttonPro")){
				this.element.unbind("click").parent().parent().next(".ui-menuList").remove();
			}else{
				this.element.unbind("click").next(".ui-menuList").remove();
			}
            return 1;
		}
	});

$.extend($.ui.menuList, {
	version: "1.2"
});

})(jQuery);
//initialize
/*$(function(){
		 $(".menuList").menuList();
});*/