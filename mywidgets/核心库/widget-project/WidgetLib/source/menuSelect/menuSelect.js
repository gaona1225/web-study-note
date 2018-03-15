
/*
 *作    者: 黄卉
 *版    本: 1.2 
 *完成时间: 2012-02-23
 *描    述: menuSelect
 *关联文件: jQuery.js|jquery-ui.js 
 */	
(function($,undefined){
    /** 
	* @class 下拉单选菜单插件
    * @name menuSelect
    * @description 下拉单选菜单插件
	* @version 1.2 
    */
	$.widget("ui.menuSelect",
	/** @lends menuSelect.prototype */
	{
		options:{
        /**  
        * @name menuSelect#json
        * @param {menuSelect} menuSelect menuSelect对象
        * @description JSON数据源
		* @default {menuSelect} ""
		* @example
		* $("#link").menuSelect({json:"json.js"});
        */
		json : "",
        /**
        * @name menuSelect#json
        * @param {menuSelect} menuSelect menuSelect对象
        * @description JSON数据源
		* @default {menuSelect} ""
		* @example
		* $("#link").menuSelect({data:"[{'id':'id1','menuSelect':'data1'},{'id':'id2','menuSelect':'data2','DeptOrUser':'menuSelectUsersId'}]"});
		* data里面的各参数：
		* 	id：数据id（必选）；menuSelect：显示的数据（必选）；DeptOrUser：部门多选或人员多选a标签的id。（可选）
        */
        data:"",
        /**  
        * @name menuSelect#fn
        * @param {menuSelect} menuSelect menuSelect对象
        * @description 执行函数
		* @default {menuSelect} function(){}
		* @example
		* $("#link").menuSelect({
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
        * @name menuSelect#fn
        * @param {menuSelect} menuSelect menuSelect对象
        * @description 执行函数
		* @default {menuSelect} function(){}
		* @example
		* $("#link").menuSelect({
		* 	getMoreDepts:function(){
		*       getDepts();//调用部门多选的方法
		* });
        */
        getMoreDepts :function(){} ,
         /**
        * @name menuSelect#fn
        * @param {menuSelect} menuSelect menuSelect对象
        * @description 执行函数
		* @default {menuSelect} function(){}
		* @example
		* $("#link").menuSelect({
		* 	getMoreUsers:function(){
		*       getUsers();//调用人员多选的方法
		* });
        */
        getMoreUsers:function(){},
        /**  
        * @name menuSelect#listId
        * @param {menuSelect} menuSelect menuSelect对象
        * @description 下拉列表的ID，用于对下拉列表操作
		* @default {menuSelect} ""
		* @example
		* $("#link").menuSelect({listId:"listBox_1"});
        */
		listId :""
		},
		_create:function(){
			
		},
		_init:function(){
			var o = this.options,
				_self = this.element,
                _menuSelect = $("<div />").addClass("ui-menuSelect").append("<ul class='ui-menuSelect-ul'/>").attr("id",o.listId);
                _menuSelect.find("ul").append("<li>菜单列表</li><li>菜单列表</li><li>菜单列表</li><li>菜单列表</li>"),
			fn = o.fn;
            //Get JSON
            if(o.json){
                $.getJSON(o.json,function(data){
                    _menuSelect.find("ul").empty();
                    var str="";
                    $.each(data,function(entryIndex,entry){
                        var html = "<li id='" + entry['id'] + "'>"
                                +"<input type='checkbox' id='"+ entry['id'] +"' name='menuSelectCheckbox' value='"+entry['menuSelect']+"'/>"
                                +entry['menuSelect'] +"<input type='hidden' name='menuSelect' value='"+entry['menuSelect']+"'/>";

                        if(entry['DeptOrUser']){
                            html += "<a href='#' id='"+entry['DeptOrUser']+"' class='ui-menuSelect-selectUrl'>选择</a>";
                            str+= entry['DeptOrUser']+",";
                        }
                        html+= "</li>";
                        _menuSelect.find("ul.ui-menuSelect-ul").append(html);
                    });
                    var arr =str.split(",");
                    $("#"+arr[0]).live("click",function(){
                         o.getMoreDepts();
                    });
                    //人员多选
                    $("#"+arr[1]).live("click",function(){
                          o.getMoreUsers();
                    });
                    _menuSelect.find("li.ui-menuSelect-li").hover(function(){
                           $(this).addClass("h");
                    },function(){
                           $(this).removeClass("h");
                    });
                    return false;
                });
            }
             //Get DATA
            if(o.data){
                _menuSelect.find("ul").empty();
                var str="";
                var arr= o.data.split("{'id':");
                var html="";
                for(var i=1;i<arr.length;i++){
                    var id = arr[i].substring(1,arr[i].indexOf("',"));
                    var menuSelect = arr[i].substring(arr[i].indexOf("menuSelect")+13,arr[i].lastIndexOf("'"));
                    var DeptOrUser =arr[i].substring(arr[i].indexOf("DeptOrUser")+13,arr[i].lastIndexOf("'"));
                    html += "<li id='" + id + "'>"
                              +"<input type='checkbox' id='"+ id+"' name='menuSelectCheckbox' value='"+menuSelect+"'/>" ;
                    if(arr[i].indexOf("DeptOrUser")!=-1){   //DeptOrUser
                        menuSelect = menuSelect.substring(0,arr[i].indexOf(",")+1);
                        html += menuSelect +"<input type='hidden' name='menuSelect' value='"+menuSelect+"'/>"+
                                "<a href='#' id='"+DeptOrUser+"' class='ui-menuSelect-selectUrl'>选择</a>";
                        str +=  DeptOrUser+",";
                    }else{
                        html += menuSelect +"<input type='hidden' name='menuSelect' value='"+menuSelect+"'/>";
                    }
                     html += "</li>";
                }
                _menuSelect.find("ul.ui-menuSelect-ul").append(html);
                var arr =str.split(",");
                $("#"+arr[0]).live("click",function(){
                     o.getMoreDepts();
                });
                //人员多选
                $("#"+arr[1]).live("click",function(){
                      o.getMoreUsers();
                });
            }

            if(_self.is(".buttonPro")){
                _self = _self.parent().parent();
            }
            _menuSelect.insertAfter(_self);
            _menuSelect.position({
                    of:_self,
                    my:"left top",
                    at:"left bottom"
                });
            _self.unbind("click").bind("click",function(event){
                _menuSelect.slideToggle(100);
                event.stopPropagation();
            });
            fn();

            $('#'+o.listId).click(function(){
                var boxs = $("#"+o.listId+" ul li>input[type='checkbox']");
                var ids ='';
                var names ='';
                for(var i=0; i<boxs.length; i++) {
                    if(boxs[i].checked==true){
                        ids+=boxs[i].id+',';
                        names+=boxs[i].value+',';
                    }
                }
                var but = $("#"+o.listId).prev().children().children("input.menuSelect");
                var butName = names.substring(0,names.length-1);
                var value = but.value;
                if(butName!=null&&butName!=""){
                    $(but).attr("title",butName);
                    if(butName.length>10){
                        butName=butName.substring(0,10)+"..."  ;
                    }
                    $(but).attr("value",butName);
                }else{
                     $(but).attr("value","下拉单选菜单列表");
                }
            });
            /**
             * flag=true:在div外面点击，div收缩
             * flag=false:在div内点击。
             * 给div绑定事件设置flag的值，
             * 还有_self也需要将其设置为false
             * */
            var flag= true;
            $(".ui-menuSelect").mouseover(function(){
                flag= false;
            }).mouseout(function(){
                flag=true
            });
            _self.mouseover(function(){
                flag=false;
            });
//            //id固定----如果页面有多个下拉控件的时候会有问题。
//            //部门多选
//            $("#menuSelectDepts").live("click",function(){
//                o.getMoreDepts();
//            });
//            //人员多选
//             $("#menuSelectUsers").live("click",function(){
//                 o.getMoreUsers();
//             });


            //给document绑定mousedown事件
            $(document).bind("mousedown",function(){
                var div =document.getElementById(o.listId);
                if(div.style.display!="none"&&flag){
                    div.style.display="none";
                }
            });
		},
		/**
		* @description 销毁下拉菜单
		* @example
		* $("#link").menuSelect('destroy');
		*/
		destroy:function(){
			if(_self.is(".buttonPro")){
				this.element.unbind("click").parent().parent().next(".ui-menuSelect").remove();
			}else{
				this.element.unbind("click").next(".ui-menuSelect").remove();
			}
		}
	});
	
$.extend($.ui.menuSelect, {
	version: "1.2"
});

})(jQuery);
//initialize
/*$(function(){
		 $(".menuSelect").menuSelect();
});*/