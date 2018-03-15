
/*
 *作    者: 黄卉
 *版    本: 1.2
 *完成时间: 2012-02-22
 *描    述: menuSingleSelect
 *关联文件: jQuery.js|jquery-ui.js
 */
(function($,undefined){
    /**
	* @class 下拉单选菜单插件
    * @name menuSingleSelect
    * @description 下拉单选菜单插件
	* @version 1.2
    */
	$.widget("ui.menuSingleSelect",
	/** @lends menuSingleSelect.prototype */
	{
		options:{
        /**
        * @name menuSingleSelect#json
        * @param {menuSingleSelect} menuSingleSelect menuSingleSelect对象
        * @description JSON数据源
		* @default {menuSingleSelect} ""
		* @example
		* $("#link").menuSingleSelect({json:"json.js"});
        */
		json : "",
         /**
        * @name menuSingleSelect#data
        * @param {menuSingleSelect} menuSingleSelect menuSingleSelect对象
        * @description 变量数据源
		* @default {menuSingleSelect} ""
		* @example
		* $("#link").menuSelect({data:"[{'id':'id1','menuSingleSelect':'data1','menuSelect':[{'selectId':'id11','selectData':'data11','selectUrl':'deptId'}]},
        *                              {'id':'id2','menuSingleSelect':'data2'，'DeptOrUser':'userId'}"});
		* data里面的各参数：
		* 	id：数据id（必选）；menuSingleSelect：显示的数据（必选）；DeptOrUser：部门多选或人员多选a标签的id。（可选，存在为checkbox多选，不存在为radio单选）
        *    menuSelect：有第二级别的多选按钮（可选）
        *    menuSelect里面的参数：selectId（多选里面的id）、selectData（多选的显示数据）、  selectUrl（部门多选或人员多选a标签的id，可选）
        */
        data : "",
        /**
        * @name menuSingleSelect#titleJson
        * @param {menuSingleSelect} menuSingleSelect menuOnlySelect对象
        * @description titleJson数据源
		* @default {menuSingleSelect} ""
		* @example
		* $("#link").menuSingleSelect({titleJson:"titleJson.js"});
        */
        titleJson :"",
        /**
        * @name menuSingleSelect#fn
        * @param {menuSingleSelect} menuSingleSelect menuOnlySelect对象
        * @description 执行函数
		* @default {menuSingleSelect} function(){}
		* @example
		* $("#link").menuSingleSelect({
		* 	fn:function(){
		*		$("#aa").live("click",function(event){
		*			if($(event.target).is("li")){
		*				alert($(event.target).attr("id"));
		* 			}
		*		}
		* });
        */
		fn : function (){},
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
        getMoreUsers:function(){},
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
        getMoreDepts:function(){},
        /**
        * @name menuSingleSelect#listId
        * @param {menuSingleSelect} menuSingleSelect menuOnlySelect对象
        * @description 下拉列表的ID，用于对下拉列表操作
		* @default {menuSingleSelect} ""
		* @example
		* $("#link").menuSingleSelect({listId:"listBox_1"});
        */
		listId :"",
        /**
        * @name menuSingleSelect#ids
        * @param {menuSingleSelect} menuSingleSelect menuOnlySelect对象
        * @description 下拉列表中选中的数据id，用于对下拉列表取值和回选
		* @default {menuSingleSelect} ""
		* @example
		* $("#link").menuSingleSelect({ids:"id1,id2,id3"});
        */
        ids:"" ,
        /**
        * @name menuSingleSelect#listId
        * @param {menuSingleSelect} menuSingleSelect menuOnlySelect对象
        * @description 下拉列表中选中的数据值，用于对下拉列表取值和回选
		* @default {menuSingleSelect} ""
		* @example
		* $("#link").menuSingleSelect({names:"names1,name2,name3"});
        */
        names:"" ,
        /**
        * @name menuSingleSelect#defaultClick
        * @param {menuSingleSelect} menuSingleSelect menuSingleSelect对象 true or false
        * @description true：下拉菜单在点击的时候才加载，并且显示下拉菜单
		* @default {menuSingleSelect} ""
		* @example
		* $("#link").menuSingleSelect({defaultClick:false});
        */
        defaultClick:true ,
       /**
        * @name menuSingleSelect#defaultClick
        * @param {menuSingleSelect} menuSingleSelect menuSingleSelect对象
        * @description true：下拉菜单在点击的时候才加载，并且显示下拉菜单
		* @default {menuSingleSelect} ""
		* @example
		* $("#link").menuSingleSelect({showTitle:"点击选择范围"});
        */
        showTitle:"点击选择范围▼",
        firstClick:false
		},
		_create:function(){
		},
        /**
         * 初始化函数
         * */
		_init:function(){
			var o = this.options,
            _self = this.element;
			var _menuSingleSelect = $("<div name='menuSingeSelectDiv' />").addClass("ui-menuSingleSelect").append("<ul class='ui-menuSingleSelect-ul'/>").attr("id",o.listId);
            fn = o.fn;
            //Get JSON
            if(o.json&&o.data==''){
                $.getJSON(o.json,function(data){
                    getJsonOrData(data);
                });
            }

            //Get DATA    截取字符串
            if(o.data&&o.json==''){
                var jsondata = eval(o.data);
                 getJsonOrData(jsondata);
            }

            function getJsonOrData(data){
                _menuSingleSelect.find("ul").empty();
                var usersId ="";
                var deptsId = "";
                var html ="";
                $.each(data,function(entryIndex,entry){
                     html +=  "<li id='li" + entry['id'] + "'>" ;
                    usersId= entry['DeptOrUser'];
                    if(usersId){  //人员多选
                        html+= "<input type='checkbox' id='"+ entry['id'] +"' name='menuOnlySelectCheckbox' value='"+entry['menuSingleSelect']+"'/>"
                            +entry['menuSingleSelect']
                            +"<a href='#' id='"+usersId+"' class='ui-menuSingleSelect-selectUrl'>选择</a>";
						 if(entry['isDept']=="yes"){
                            	deptsId = usersId;
                            }
                    }else{          //其他的都为单选
						if(entry['isCheckBox']=="yes"){
                    		 html+= "<input type='checkbox' id='"+ entry['id'] +"' name='menuOnlySelectCheckbox' value='"+entry['menuSingleSelect']+"' level = '1' />"
                            +entry['menuSingleSelect'];
                    	}else{
							html+="<input type='radio' id='"+ entry['id'] +"' name='menuOnlySelectRadio' value='"+entry['menuSingleSelect']+"'/>"
								+entry['menuSingleSelect'] ;
						}
                    }
                    var arr = entry['menuSelect'];
                    if(arr){
                        html  += "<ul>";
                        for(var i=0;i<arr.length;i++){
                            html += "<li id='li"+arr[i]['selectId']+"' class='ui-menuSingleSelect-li'>"
                                    +"<input type='checkbox' name='radioCheckbox' id='"+arr[i]['selectId']+"' value='"+arr[i]['selectData']+"'/>"
                                    + arr[i]['selectData'];
                            if(arr[i]['selectUrl']){
                                deptsId =  arr[i]['selectUrl'];
                                html += "<a href='#' id='"+deptsId+"' class='ui-menuSingleSelect-selectUrl'>选择</a>";
                            }
                            html += "</li>"  ;
                        }
                        html += "</ul>";
                    }
                    html += "</li>";
                });
                _menuSingleSelect.find("ul.ui-menuSingleSelect-ul").append(html);
                $("#"+usersId).live("click",function(){
                    o.getMoreUsers();
                });
                $("#"+deptsId).live("click",function(){
                    o.getMoreDepts();
                });
                return false;
            }

            if(_self.is(".buttonPro")||_self.is(".buttonLight")){
                _self = _self.parent().parent();
            }
            _menuSingleSelect.append("<input type='hidden' id='menuSingleSelect"+o.ids+"' name='menuSingleSelect' value='menuSingleSelect"+o.names+"'/>");
            _menuSingleSelect.insertAfter(_self);

            setTimeout(function(){
                getIdsNames();
            },0);
            function getIdsNames(){
				if((o.ids!='' && o.names!='')||o.firstClick){
                    var but = $("#"+o.listId).prev().children().children("input.menuSingleSelect");
                    but.attr("value",o.names).attr("title",o.names);
                    if(o.names>10){
                        var  butName=o.names.substring(0,10)+"..."  ;
                        but.attr("value",butName);
                    }
					var trueId = o.listId.substring(4,o.listId.length);
                	var arrIds = o.ids.split(",");
                    for(var i=0;i<arrIds.length;i++){
                        var _inputs = document.getElementById(arrIds[i]+trueId);
                        if(_inputs!=null){
                            _inputs.checked = true;
                        }
                    }
                    for(var j=0;j<arrIds.length;j++){
                        var _input = document.getElementById(arrIds[j]+trueId);
						if(_input!=null){
                         if(_input.type=='radio'){
                            var $lis = $("#"+arrIds[j]+trueId).parent().parent().children().children('input');
                            $lis.each(function(){
                                if($(this).attr('id')!=(arrIds[j]+trueId)){
                                    var $li_inputs = $(this).next('ul').children('li').children('input');
                                    $li_inputs.each(function(){
                                        if(!$(this).checked){
											if($(this).attr("class")!='ui-menuSingleSelect-selectUrl'){
                                            	this.disabled = true;
											}
                                        }
                                    });
                                 }
                            });
                        }
                        if(_input.type=='checkbox'){
                            var $f_input = $("#"+arrIds[j]+trueId).parent('li').parent('ul').prev('input');
                            if($f_input.size()!=0){
                                $f_input[0].checked = "checked";
                                var $f_inputId = $($f_input[0]).attr('id');
                                var $ra_inputs = $("#"+$f_inputId).parent().parent().children().children("input[type='radio']");
                                $ra_inputs.each(function(){
                                    if(!this.checked){
                                         var $boxs_inputs = $(this).next().children().children();
                                         $boxs_inputs.each(function(){
											 	if($(this).attr("class")!='ui-menuSingleSelect-selectUrl'){
                                               		this.disabled = true;
												}
                                         });
                                    }
                                });
                            }
						}
                        }
                    }
                }
            }
            fn();

            /**
             * 绑定下拉菜单按钮的click事件
             * **/
			 $("#"+o.listId+" >ul>li").find("input").click(function(){
                var inputs = $("#"+o.listId+" >ul>li>input");
                var allInputs = $("#"+o.listId+" ul li input");
                var ids ='';
                var names ='';
                var allflag = true;
               //如果点击的按钮是单选
               if(this.type=="radio"){
               		var tempStr = radioSelect(this,ids,names,o.listId);
               		if(tempStr=="-"){
               				ids = this.id.substring(0,1)+",";
	           				names = this.value+",";
               			}else{
               				ids = tempStr.split("-")[0]+ this.id.substring(0,1)+",";
               				names = tempStr.split("-")[1];
               			}
               }else{
               		//如果点击的是第一层的多选
               		if(this.level=='1'){
               			var radioObj ;
	           			$("#"+o.listId+" >ul>li").find("input[type='radio']").each(function(){
	           				if(this.checked){
	           					radioObj = $(this);
	           				}
	           			})
	           			var tempStr = radioSelect(radioObj,"","",o.listId);
	           			if(tempStr!="-"){
               				ids = tempStr.split("-")[0] ;
               				names = tempStr.split("-")[1] ;
               			}
               			if(radioObj!=null&&radioObj!='undefind'&&radioObj.val()!=null&&radioObj.val()!='undefined'){
               				ids = ids + radioObj.attr("id").substring(0,1);
               			}
               		}else{
               			var radioObj = $(this).parent().parent().parent().find("input[type='radio']");
               			if(this.checked){
               				radioObj.attr("checked",this.checked);
               			}
               			var tempStr = radioSelect(radioObj,ids,names,o.listId);
               			if(tempStr=="-"){
               				ids = radioObj.attr("id").substring(0,1)+",";
	           				names = radioObj.val()+",";
               			}else{
               				ids = tempStr.split("-")[0];
               				names = tempStr.split("-")[1];
               			}
               			if(radioObj!=null&&radioObj!='undefind'&&radioObj.val()!=null&&radioObj.val()!='undefined'){
               				ids = ids + radioObj.attr("id").substring(0,1);
               			}
               		}
               }
                var _input =  $("#"+o.listId+" >input[type='hidden']") ;
                o.ids = "menuSingleSelect"+ids.substring(0,ids.length-1);
                o.names = "menuSingleSelect"+names.substring(0,names.length-1);
                 _input.attr('id', o.ids);
                _input.val(o.names) ;
                var but = $("#"+o.listId).prev().children().children("input.menuSingleSelect");
                var butName = names.substring(0,names.length-1);
                if(but.size()!=0){
                    var value = but.value;
                    if(butName!=null&&butName!=""){
                        if(butName.length>10){
                            butName=butName.substring(0,10)+"..."  ;
                        }
                        $(but).attr("value",butName);
                    }else{
                         $(but).attr("value",o.showTitle);
                    }
                }else{
                    but = $("#"+o.listId).prev('a');
                    var butText = but.text();
                    if(butName!=null&&butName!=""){
                        if(butName.length>10){
                            butName=butName.substring(0,10)+"..."  ;
                        }
                        but.text(butName);
                    }else{
                        but.text(o.showTitle);
                    }

                }     
                if(allflag){
				 fn(o.listId.substring(4));
                }
            });

            /**
             * flag=true:在div外面点击，div收缩
             * flag=false:在div内点击。
             * 给div绑定事件设置flag的值，
             * 还有ui-buttonPro也需要将其设置为false
             * */
            var flag= true;
            _menuSingleSelect.mouseover(function(){
                flag= false;
            }).mouseout(function(){
                flag=true
            });
            _self.mouseover(function(){
                flag=false;
            }).mouseout(function(){
                flag=true ;
            });
            //给document绑定mousedown事件
            $(document).bind("click",function(){
                getButtonLightCss ();
                var div =document.getElementById(o.listId);
                if(div==null ||div=='' ||div=='undefined'){
                	return ;
                }
                if(div.style.display!="none"&&flag){
                    div.style.display="none";
                }
            });

             /**
             * _menuSingleSelect定位
             * */
            var height;
            var targetDom = document.getElementById(_self.attr('id'));
            setTimeout(function(){
                height = _menuSingleSelect.height();
                 if(o.defaultClick){
                     var div = document.getElementById(o.listId);
                     div.style.display = "block";
                     o.defaultClick = false;
                }
            },0);
            if(_menuSingleSelect.css("display")=="none"){
                getPosition(targetDom);
            }
            $(window).bind("resize",function(){
                _menuSingleSelect.slideUp();
            }).bind("scroll",function(){
                _menuSingleSelect.slideUp();
            });
             _self.unbind("click").bind("click",function(event){
                 _menuSingleSelect.slideToggle(100);
                 var  $divs = $('.ui-menuSingleSelect');
                 for(var i =0 ;i<$divs.length;i++){
                     if($($divs[i]).attr('id')!=o.listId){
                         $divs[i].style.display="none";
                     }
                 }
                 var  $dis = _menuSingleSelect.css("display");
                 if($dis=="none"){
                     getButtonLightCss ();
                     getPosition(targetDom);
                 }
                 event.stopPropagation();
            });

            //递归计算标签距离左上角的距离
            function getTitleLeft(e){
                var i =  e.offsetLeft;
                if(e.offsetParent != null) i += getTitleLeft(e.offsetParent);
                return i;
            }
            //递归计算标签距离顶部的距离
            function getTitleTop(e){
                var i = e.offsetTop;
                if(e.offsetParent != null) i += getTitleTop(e.offsetParent);
                return i;
            }
            //定位
			function getPosition(ev){
            	  _menuSingleSelect.css({
                    "left":-1000,
                    "top":-1000,
                    "display":"block"
                });
                var elemWidth = ev.offsetWidth;   //li元素所在元素的宽度
                var elemHeight = ev.offsetHeight; //li元素所在元素的高度
                var elemLeft = getTitleLeft(ev);		  //li元素所在元素距离显示区左上角的距离
                var elemTop = getTitleTop(ev);		  //li元素所在元素距离显示区顶部的距离
                var width = $(window).width();        //浏览器可见宽度
                var height = $(window).height();      //浏览器的可见高度
                var  wid = _menuSingleSelect.width();   //下拉div的宽度  hei是下拉div的高度
                var hei = _menuSingleSelect.height();
                var x,y;
                if((elemLeft+wid)<=width && (elemTop+elemHeight+hei)<=height-10){     //左上角
                    x = elemLeft ;
                    y =elemTop + elemHeight ;
                }else if((elemLeft+wid)<=width && (elemTop+elemHeight+hei)>height-10){  //左下角
                    x = elemLeft ;
                    y =elemTop - hei -5 ;
                }else if((elemLeft+wid)>width && (elemTop+elemHeight+hei)<=height-10){  //右上角
                    x = width - wid  -10;
                   y =elemTop + elemHeight ;
                }else if((elemLeft+wid)>width && (elemTop+elemHeight+hei)>height-10){      //右下角
                    x = width -wid -10;
                    y =elemTop - hei -5;
                }
                _menuSingleSelect.css({ "left":x, "top":y});
            }


            /**
             * 鼠标点击当列表显示时按钮的样式
             * **/
            function getButtonLightCss(){
                 var div =document.getElementById(o.listId);
                 var $buttonLight = $(div).prev('.ui-buttonLight');
                 if($buttonLight.size!=0){
                     if( div.style.display =="none"){
                        $buttonLight.css({"background-position":"0% 0%"});
                    }else{
                        $('.ui-buttonLight').css({"background-position":"0% 0%"});
                        $buttonLight.css({"background-position":"right -120px"});
                    }
                 }

            }
		},
		/**
		* @description 销毁下拉菜单
		* @example
		* $("#link").menuSingleSelect('destroy');
		*/
		destroy:function(){
			if(this.element.is(".buttonPro")||this.element.is(".buttonLight")){
				this.element.unbind("click").parent().parent().next(".ui-menuSingleSelect").remove();
			}else{
				this.element.unbind("click").next(".ui-menuSingleSelect").remove();
			}
		}
	});
	
function radioSelect(obj,ids,names,listId){
			//将其他单选框下的复选框置灰
			$("#"+listId+" >ul>li").find("input").each(function(){
						if(this.type!="radio"&&this.level!=1){
							$(this).attr("disabled",true);
						}
			})
			//寻找单选框下面的复选框
			$(obj).parent().find("ul>li>input").each(function(){
				$(this).attr("disabled",false);
				if(this.checked){
					ids = ids+this.id.substring(0,1)+",";
					names = names+ this.value+",";
				}
			})
			//寻找单选框同级的多选框
			var $otherUsers = $("#"+listId+" >ul>li>input[type='checkbox']");
			if($otherUsers.val()!=null&&$otherUsers.val()!='undefined'){
				$otherUsers.each(function(){
					if(this.checked){
						ids = ids+$(this).attr("id").substring(0,1)+",";
						names = names+$(this).val()+",";
					}
				})
			}
			return ids+"-"+names;
	} 

function reloadNameAndIds(obj,radioStr){
			var id = obj.attr("id");
			var trueId = id.substring(4,id.length);
			var arrIds = "";
			var tempIds = $("#"+id+" >input[type='hidden']").attr("id");
			obj.find("input[type='checkbox']").attr("checked",false);
			arrIds = tempIds.substring(16,tempIds.length).split(",");
			for(var i=0;i<arrIds.length;i++){
				if($("#"+arrIds[i]+trueId).attr("checked")!=null&&$("#"+arrIds[i]+trueId).attr("checked")!='undefined'){
					$("#"+arrIds[i]+trueId).attr("checked","checked");
				}
			}
			var radioObj ;
			$("#"+id+" >ul>li").find("input[type='radio']").each(function(){
				if(this.id.substring(0,3)==radioStr){
					radioObj = this;
					$(radioObj).attr("checked",true);
				}
			})
			radioSelect(radioObj,"","",id);
}
		
$.extend($.ui.menuSingleSelect, {
	version: "1.2"
});

})(jQuery);
//initialize
/*$(function(){
		 $(".menuSingleSelect").menuSingleSelect();
});*/