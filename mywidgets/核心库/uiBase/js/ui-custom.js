/**
 * 实现div的收缩功能
 * 黄卉
 * 2011-8-17
**/
function deploy(){
		$("#content").slideToggle();
}
/** tab
 * @author zhangwq
 */
/*function nTabs(tabObj,obj){
    var tabList=document.getElementById(tabObj).getElementsByTagName("dt");
    for(i=0;i<tabList.length;i++){
        if(tabList[i].id==obj.id){
            document.getElementById(tabObj+"_Title"+i).className="ui-custom-knowledge-readrank-dt-active";
            document.getElementById(tabObj+"_Content"+i).style.display="block";
        }else{
            document.getElementById(tabObj+"_Title"+i).className="ui-custom-knowledge-readrank-dt-normal";
            document.getElementById(tabObj+"_Content"+i).style.display="none";
        }
    }
} */

/*王杰 知识管理，浏览分类页面的页签调用的js*/
/*function tabPanel(tabObj,obj,src){	
	var tabList=document.getElementById(tabObj).getElementsByTagName("dt");
   	for(i=0;i<tabList.length;i++){
        if(tabList[i].id==obj.id){
            document.getElementById("tabPanel_"+i).className="ui-custom-knowledge-skan-knowledgeActive";
            $("#mainframe").attr("src",src);
        }else{
            document.getElementById("tabPanel_"+i).className="ui-custom-knowledge-skan-knowledgeNormal";
        }
    }
}*/


/**
* 叶浩 设置 处理问题 和 问题回答的页面自适应问题
*/
/*$(document).ready(function(){
	window.onresize=function(){pageLoad();};
	pageLoad();
});	*/

function pageLoad(){
	var width = window.top.document.compatMode == "BackCompat" ?window.top.document.body.clientWidth:window.top.document.documentElement.clientWidth;//窗体宽度
	$(".ui-custom-knowledge-handQuestionButton").css("width",width+"px");
	/*$(".ui-custom-knowledge-queslookat").css("width",width+"px");
	$(".ui-custom-knowledge-queslookat").css("width",width+"px");*/
	var leftWidth = width - 240 - 210;
	var leftWidth1 = width - 178 - 210;
	$(".ui-custom-knowledge-mainleft").css("width",leftWidth+"px");
	$(".ui-custom-knowledge-questionBody").css("width",(leftWidth*29/30)+"px");
	$(".ui-custom-knowledge-answerBody").css("width",(leftWidth*29/30)+"px");
	$(".ui-custom-knowledge-bestans").css("width",(leftWidth*29/30-27)+"px");
	$(".ui-custom-knowledge-answerQuestionBodyStrong").css("width",(leftWidth*29/30-2)+"px");	
	$(".ui-custom-knowledge-questionTable").css("width",(leftWidth*28/30)+"px");
	$(".ui-custom-knowledge-textarea").css("width",(leftWidth*28/30)+"px");
	$(".ui-custom-knowledge-handQuestion").css("width",(leftWidth*27/30)+"px");
	$(".ui-custom-knowledge-divhr").css("width",(leftWidth*28/30)+"px");
	$(".ui-custom-knowledge-viewDocument-left").css("width",leftWidth+"px");
	/*$(".ui-custom-knowledge-myInfo-right").css("width",leftWidth1-31+"px");*/
	
	
	/*---------------------------------知识管理分类浏览----------------------------------------*/
	/*$(".ui-custom-knowledge-question-logo-format").css("width",width-220+"px");
	$(".ui-custom-knowledge-skan").css("width",width-230+"px");
	$(".ui-custom-knowledge-skan-main").css("width",width-230+"px");
	$(".ui-custom-knowledge-skan-left").css("width",width-450+"px");
	$(".ui-custom-knowledge-classification-div-left").css("width",(leftWidth-30)/2+"px");
	$(".ui-custom-knowledge-classification-div-right").css("width",(leftWidth-30)/2+"px");
	$(".ui-custom-knowledge-skan-middle").css("width",width-470+"px");*/
	/*知识动态、热门问答、热门文档、热门词条页签*/
	/*$(".knowledge_tab").css("width",width-470+"px");
	$(".ui-custom-knowledge-skan-content").css("width",width-470+"px");*/
	/*热门问题上面的toolbar */
	/*$(".knowledge_front").css("width",width-480+"px");
	$(".knowledge_page").css("width",width-470+"px");*/
	/*---------------------------------知识管理分类浏览----------------------------------------*/
}

/**
 *  jhMenu 开始
*/
 /**
 * jh MenuBar 调用入口
 * @param data 传入 doc/menuBar.js中格式的json数组
 */
function jhMenuBar(data) {
    var temStr = "";
    var listMax = 0;
    $.each(data, function(i, data) {//一级菜单循环构建
        temStr += (i === 0) ? '<li><a href="###" class="ui-custom-jhMenuBar-currentItem" id="' + data["classId"] + '"><span>' + data["className"] + '</span>' : '<li><a href="###" id="' + data["classId"] + '"><span>' + data["className"] + '</span>';
        for (var i = 0; i < data["detailClasic"].length; i++) {
            if (listMax <= data["detailClasic"][i].secondList.length) {
                listMax = data["detailClasic"][i].secondList.length;
            }
        }
        listMax = (listMax>4)?4:listMax;
        var pWidth = listMax * 72 + 120;
        if (data["detailClasic"].length != 0) {
            temStr += '<img src="../uiBase/skins/default/images/ui-custom/ui-custom-menuBar-jhblank.gif" alt="" align="absmiddle" style=""/></a><div  class="ui-custom-jhMenuBar-moreClasic" style="display:none;">';
            $.each(data["detailClasic"], function(i, data2) {//二级菜单循环构建
                var secondMenu = data2["secondName"].length >= 6 ? data2["secondName"].substring(0, 4) + "..." : data2["secondName"];   //截取二级菜单的长度
                temStr += '<p class="' + ((i % 2) ? 'even' : 'odd') + '" style="width:' + pWidth + 'px"><span><a href="###" class="ui-custom-jhMenuBar-secondClasic" id="' + data2["secondId"] + '">[' + secondMenu + ']</a>';   //隔行变色
                $.each(data2["secondList"], function(i, data3) {//三级菜单循环构建
                	if(i<4){
                    data3["thirdName"] = data3["thirdName"].length >= 6 ? data3["thirdName"].substring(0, 4) + "..." : data3["thirdName"]; //截取三级菜单的长度
                    temStr += '<a href="###" id="' + data3["thirdId"] + '">' + data3["thirdName"] + '</a>';
					}
                })
                temStr += '</span><a href="###" class="ui-custom-jhMenuBar-moreInfo" id="more-' + data2["secondId"] + '">更多</a></p>';
            });
            temStr += '</div></li>';
        }
        temStr += '</a></li>';
    });
    var _jhMenu = $(".ui-custom-jhMenu").append('<ul class="ui-custom-jhMenuBar-firstClass">' + temStr + '</ul>');
    //鼠标移到标签上的动作
    $("ul.ui-custom-jhMenuBar-firstClass li>a,.ui-custom-jhMenuBar-moreClasic").hover(function() {
        jhtabShow(this.tagName == "A" ? this : $(this).prev("a")[0]);
    }, function() {
        jhtabHide(this.tagName == "A" ? this : $(this).prev("a")[0]);
    });
    //点击tab中的一项
    $("ul.ui-custom-jhMenuBar-firstClass li").live("click", function() {
        jhtabStatus(this);
    })
    /*注册点击事件*/
    /*一级菜单*/
    $("ul.ui-custom-jhMenuBar-firstClass li>a").die().live("click", function(e) {
        subRepsonse(this.id.split("-")[1], 0);
    });
    /*二级菜单及其子项*/
    $("ul.ui-custom-jhMenuBar-firstClass li div p a").die().live("click", function(e) {
        var _id = $(e.target).attr("id");
        var _ids = _id.split("-");
        if (_ids.length == 3) {
            /*点击更多*/
            subRepsonse(_ids[2], 1);
        } else if (_ids.length == 2) {
            if (_ids[0] == 1) {
                subRepsonse(_ids[1], 1);
            } else if (_ids[0] == 2) {
                subRepsonse(_ids[1], 2);
            }
        }
    });
    return false;
}
//点击某一项目设置为当前选中
function jhtabStatus(obj) {
    $("a.ui-custom-jhMenuBar-currentItem").removeClass("ui-custom-jhMenuBar-currentItem");
    $(obj).children("a").eq(0).addClass("ui-custom-jhMenuBar-currentItem");
}
//隐藏当前的tab以及子分类
function jhtabHide(obj) {
    $(obj).removeClass("hover");
    $(obj).next("div.ui-custom-jhMenuBar-moreClasic").hide();
}
//显示当前的tab以及子分类
function jhtabShow(obj) {
    $(obj).addClass("hover");
    $(obj).next("div.ui-custom-jhMenuBar-moreClasic").show();
}
/**
 * 使用jhMenuBar的页面定义subRepsonse(objId,cType)的具体实现
 * @param objId
 * @param cType 点击的类别：0-第一级别 (分类浏览);1-二级头、更多(职位知识、更多);2-二级子项(售前实施)
 */
function subRepsonse(objId, cType) {
    alert("objId:" + objId + "\n\r" + "cType:" + cType);
}
/**
 *  jhMenu 结束
*/
/**万莎
  *自适应高度
*/
function iFrameHeight(obj) { 
	 var frm = document.getElementById(obj); //将iframe1替换为你的ID名
     var subWeb = document.frames ? document.frames[obj].document : frm.contentDocument;
      if(frm != null && subWeb != null)
     {
          //frm.style.height="0px";//初始化一下,否则会保留大页面高度
          frm.style.height = subWeb.documentElement.scrollHeight+"px";
          subWeb.body.style.overflowX="auto";
          subWeb.body.style.overflowY="auto";

	}
}
/**
  * 黄卉
  *	iframe嵌套自适应高度问题
*/
 function reinitHeight(id){
     var iframe = document.getElementById(id);
     var bHeight = iframe.contentWindow.document.body.scrollHeight;
     var dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
     var height = Math.max(bHeight,dHeight);
     iframe.height = height;
 }
 
$(document).ready(function(){
	 /** 在webfx-columnlist-body列表里面 加入隔行变色效果  黄卉***/
    $("div.webfx-columnlist-body table tr").live({
        mouseover:function(){
            $(this).addClass("webfx-columnlist-body-tr");
        },
        mouseout:function(){
            $(this).removeClass("webfx-columnlist-body-tr");

        }
    });
    
     /**新角色管理中，加入隔行变色效果   huanghui@2012-3-9**/
	  $("table.ui-custom-rolePermission-setting tr").live({
	        mouseover:function(){
	            $(this).addClass('tableContent');
	        },
	        mouseout:function(){
	            $(this).removeClass('tableContent');
	        }
	   });
	   
   /*** 我的日记（自定义查询和最新批示）里面加入隔行变色效果  huanghui@2012-3-23 **/
	$("div.diaryInfo table tr.diaryInfoTR").hover(function(){
		var $this = $(this);
		if($this.hasClass('diaryInfoTRShow')){
			$this.removeClass('webfx-columnlist-body-tr');
		}else{
			$this.addClass('webfx-columnlist-body-tr');
		}
	},function(){
		 $(this).removeClass('webfx-columnlist-body-tr');
	});	
	
	/**huanghui@2012-5-7 解决列表表头第一个td不是checkbox时，左边存在蓝线的问题*/
    var $firstTd = $("div.webfx-columnlist>div.webfx-columnlist-head").find('td:first');
    if($firstTd.size()!=0){
	    if(!$firstTd.hasClass('firstTd')){
	    	$firstTd.css('borderLeftColor','white');
	    }
    }
});

/*** 流程里面的页面2个iframe嵌套3个页面，当最里面的业务页面动态添加或删除行的时候调用改方法，改变页面高度   黄卉 **/
function addOrDeleteHeight(num){
	//flowDealFrame  --flow-ins-task-waitDeal.jsp
	var flowDealFrame = $(window.parent.parent.document).find("#flowDealFrame");
	var ppH = flowDealFrame.height();
	//formIframe  --flow-base-handle.jsp
	var formIframe = $(window.parent.document).find("#formIframe");
	var pH = formIframe.height();
	flowDealFrame.height(ppH+num);
	formIframe.height(pH+num);
}

/**
 * @主要来源:http://www.cnblogs.com/leadzen/archive/2008/09/06/1285764.html
 * @整理人:张文钦
 * @时间:2011-10-20
 * 使用说明（现在系统主要需要兼容ie7-9,火狐,opera）:
 * if(btv.ie){
       //此时，该浏览器是ie内核浏览器,btv.ie表示当前当前版本值:{7.0,8.0,9.0}
   }else if(btv.ff){
      //此时,该浏览器是火狐浏览器
   }else if(btv.safari){
      //此时，该浏览器是苹果浏览器
   }else if(btv.chrome){
      //此时，该浏览器是谷歌浏览器
   }else if(btv.opera){
      //此时，该浏览器是opera浏览器
   }
 */
function btv(){
    var btv = {};
    var ua = navigator.userAgent.toLowerCase();
    var temp = null;
    (temp = ua.match(/msie ([\d.]+)/))? btv.ie = temp[1]:
    (temp = ua.match(/firefox\/([\d.]+)/))?btv.ff = temp[1]:
    (temp = ua.match(/chrome\/([\d.]+)/))?btv.chrome = temp[1]:
    (temp = ua.match(/version\/([\d.]+).*safari/))?btv.safari  = temp[1]:
    (temp = ua.match(/opera\/([\d.]+)/))?btv.opera  = temp[1]:-1;
    return btv;
};

/**  当浏览器为IE7的时候，分页的处理     黄卉   2011-11-8 **/
$(document).ready(function(){
	if(btv().ie == '7.0'){   //IE7浏览器下
		var _span1 = $("div.ui-page").siblings('span.ui-buttonPro');//找到ui-page的同级元素span
		if(_span1.size()==0){   //如果toolbar上面没有按钮的时候，分页的位置处理
			$("div.ui-page").css('margin-top','0px');
		}
		var _span2 = $("span.triangle").parent('span.buttonPro-con');//找到triangle的父元素
		if(_span2.size()!=0){    //toolbar上面的menuList按钮的位置
			$("span.buttonPro-con").css('margin-bottom','-8px');
		}
	}
	//modify huanghui@2012-04-18 上下分页在非IE的浏览器下，input输入框与按钮没有对齐
	if(!(btv().ie)){
		$("#button01").css({"margin-top":"0px","margin-bottom":"4px"});
		$("#button_02").css({"margin-top":"0px","margin-bottom":"4px"});
	}
});
 
 
 
/** stateBox提示框  调用方法  黄卉   2011-11-15**/
function stateBox(stateVal, contentVal){
	$(window.top.document.body).stateBox({
			state : stateVal,     //stateVal可以为"succeed"、"alert"、"error"之一，颜色不同，根据是什么类型的提示来写
			content : contentVal, //提示语的内容，比如说"保存成功"，这里一般为国际化的语句，尽量不自己写
			corner: true          
	});
}

/****** 该方法是为了解决art关闭的时候stateBox不消失的问题   黄卉  2011-11-14*********/
function closeBox(){
	var isTrue =  $(top.window.document.body).find(".ui-stateBox").is(".ui-stateBox");
	if(isTrue){
		 $(top.window.document.body).find(".ui-stateBox").remove();
	}
}


/***** 遮蔽层的调用方法      黄卉  2011-11-16 *********/
function overshadow(name){
	var row = '<div class="jcs_overshadow"  >'
	+'<div class="jcs_wariting_bg">'
	+'<div class="jcs_wariting">正在'+name+'中 ...</div>'		
	+'<div class="jcs_waiting_pic" ></div>'
	+'</div>'
	+'</div>';
	$(window.document.body).append(row);
	//$(window.parent.frames["left"].document.body).append(row);
}

/**
 * zhangwq@2012-1-5
 * 导航页面板响应事件 
 */
function activeNavMenu(){
	$('div.guideLogo').not('.noUseLogo').click(function(){
	var $d = $(this).find('>a>div.logoText');
	window.top.openTargetByUrl($d.attr('url'),$d.text(),$d.attr('modelid'));});
};
/**规章制度 引用接口      陈林  2012-01-05**/
function interfaceReference(){
	art.dialog.open("../bylaw/bylaw-manage-detail!interfaceReference.action",{
		title:"引用接口",
		window:"top",
		lock: true,
		width:'600px',
		height:'600px',
		closeFn:function(){
			var bylawIds = $("#bylawIds").val();
			var bylawValue = $("#bylawValue").val();
			$("#tbodys").empty();
			
			var bylawDetailIds = bylawIds.split(",");
			var bylawDetailNames = bylawValue.split(",");
			var row = "";
			for(var i = 0; i < bylawDetailIds.length; i++){
				row =  '<tr id="tr'+ bylawDetailIds[i] +'" style="width: 100%";">'
				          + '<td><input type="hidden" name="bylawDetailIds" value="'+ bylawDetailIds[i] +'"/><a href="javascript:queryBylaw(\''+ bylawDetailIds[i] +'\',\'\');">'+ bylawDetailNames[i] +'</a> <a href="javascript:deleteBylaw(\''+ bylawDetailIds[i] +'\');"> 删除</a></td>'
				          +	'</tr>';
				$("#tbodys").append(row);          
			}
		}
	});
}
/**规章制度 引用查询      陈林  2012-01-05**/
function interfaceReferenceQuery(bizId){
	$.ajax({
	 	url:"../bylaw/bylaw-manage-detail!interfaceReferenceQuery.action",
	 	type:"post",
	 	data:"bizId="+bizId,
	 	success:function(data){
	 		var jsonData = eval("(" + data + ")");
	 		var row = "";
			for(var term in jsonData){
			    row =  '<tr id="tr" style="width: 100%";">'
				           + '<td><input type="hidden" name="bylawDetailIds" value="'+ term +'"/><a  href="javascript:queryBylaw(\'\',\''+ term +'\');">'+ jsonData[term] +'</a></td>'
				          +	'</tr>';
				$("#tbodys").append(row);   
			}
	 	} 	
	 });	
}
/*** 查看引用制度信息  陈林  2012-01-06**/
function queryBylaw(bylawDetailId,bylawReferenceId){
	art.dialog.open("../bylaw/bylaw-query-detail!displayDetail.action?bylawReferenceId="+bylawReferenceId+"&bylawDetailId="+bylawDetailId,{
			title:"制度查看",
			window:"top",
			lock: true,
			width:'880px',
			height:'560px'
		});
}
/*** 删除一行引用的制度  陈林  2012-01-06**/
function deleteBylaw(id){
	art.dialog.confirm("确定删除？", function(){
		$("#tr"+id).remove();
	});
}

/**
  * huanghui @2012-1-6
  * 在FF8.0版本以下的浏览器下，
  * 对标准列表里面的td内容过多时，进行省略（...）显示 
  **/
$(document).ready(function(){
    if(btv().ff<='8.0'){
        var _div = $('div.webfx-columnlist-body');
        if(_div.size()!=0){
            var _td = $(_div).find('td');
            var i =0;
            $(_td).each(function(){
                i=i+1;
                var _tdWidth =  $(this).width();
                var _tdContent = $(this).html();
                var _hi = addSpan(_tdContent);
                if(_hi > _tdWidth){
	                _tdContent = _tdContent.replace(/^\s+|\s+$/g,'');//去掉左右空格
                     var j= _tdContent.length-1;
                     while(_hi > _tdWidth){
                         _tdContent = _tdContent.substring(0,j)+"...";
                         _hi=addSpan(_tdContent,j);
                         j=j-1;
                     }
                    $(this).html(_tdContent);
                }
                function addSpan(_tdContent,num){
                    var $addSpan =null;
                    if(num==null||num==''){
                        $('body').append('<span id="_addSpan'+i+'" >'+_tdContent+'</span>');
                        $addSpan =  $('#_addSpan'+i);
                    }else{
                        $('body').append('<span id="_addSpan'+i+num+'" >'+_tdContent+'</span>');
                        $addSpan =  $('#_addSpan'+i+num);
                    }
                    var _h =  $addSpan.width();
                    $addSpan.remove();
                    return  _h;
                }
            });

        }
    }
});

/**
 * div模拟title换行显示，兼容各浏览器
 * initSimulationTitle(titleJson):初始化调用方法，titleJson是json格式的字符串
 * getTitleLeft(e)：递归计算标签距离左上角的距离
 * getTitleTop(e)：递归计算标签距离顶部的距离
 * showSimulationTitle(ev):显示div，并计算div的位置,ev是当前的document元素
 * huanghui
 * 2012-3-5
 * **/
 //调用初始化方法
function initSimulationTitle(titleJson){
     if(titleJson!=0){
         var jsonarr = eval(titleJson);
         var html ="";
         $.each(jsonarr,function(entryIndex,entry){
             html= "<div class='divUp'><div><table height='100%' width='100%'>"
                + "<tr><td id = 'str1' colspan='2' class='tdHead' >"+entry['others']+"</td></tr>" ;
             if(entry['depts']){
                 var depts = entry['depts'].split(",");
                 html += "<tr><td id ='deptsId'  class='tdHead'>部门("+depts.length+"):</td>";
                 if(depts.length<=3){   //个数小于3
                      html += "<td class='td1'>"+ entry['depts']+"</td></tr>";
                 }else{         //个数大于3  并且为3的倍数（整除）
                     html += "<td class='td1'>"+ depts[0]+","+depts[1]+","+depts[2]+"</td></tr>";
                      for(var i = 1 ; i<depts.length/3 ;i++){
                         var str = "";
                         for(var j = 0; j<3;j++){
                             var index = i*3+j;
                             if(index>=depts.length){
                                 break;
                             }
                             if(index==depts.length-1){
                             	str += depts[index];
                             }else{
	                             str += depts[index]+',';
                             }
                         }
                         html += "<tr><td></td><td  class='td1'>"+ str+"</td></tr>";
                      }
                 }
             }
             if(entry['users']){
                 var users = entry['users'].split(",");
                 html += "<tr><td id ='usersId'  class='tdHead'>人员("+users.length+"):</td>";
                 if(users.length<=3){   //个数小于3
                      html += "<td class='td1'>"+ entry['users']+"</td></tr>";
                 }else{         //个数大于3  并且为3的倍数（整除）
                     html += "<td class='td1'>"+ users[0]+","+users[1]+","+users[2]+"</td></tr>";
                      for(var i = 1 ; i<users.length/3 ;i++){
                         var str = "";
                         for(var j = 0; j<3;j++){
                             var index = i*3+j;
                             if(index>=users.length){
                                 break;
                             }
                                if(index==users.length-1){
                             	str += users[index];
	                             }else{
	                             	  str += users[index]+',';
	                             }
                         }
                         html += "<tr><td></td><td  class='td1'>"+ str+"</td></tr>";
                      }
                 }
             }
             html +="</table></div></div>";

        });
    }
	$("#SimulationTitle").html(html);
}

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
//显示div，并计算div的位置
function showSimulationTitle(ev){
	$("#SimulationTitle").css({
        "position":"absolute",
        "left":-1000,
        "top":-1000,
        "z-index":10001,
        "display":"block"
    }) ;
	var elemWidth = ev.offsetWidth;   //li目标元素所在元素的宽度
	var elemHeight = ev.offsetHeight; //li目标元素所在元素的高度
	var elemLeft = getTitleLeft(ev);		  //li目标元素所在元素距离显示区左上角的距离
	var elemTop = getTitleTop(ev);		  //li目标元素所在元素距离显示区顶部的距离
	var width = document.body.clientWidth;     //浏览器窗口的宽度
	var height = document.body.clientHeight;    //浏览器窗口的高度
  	var targetDom = document.getElementById('SimulationTitle');//id=“SimulationTitle”的divdom对象
    var wid =targetDom.offsetWidth;   //id=“SimulationTitle”的div宽度
    var hei =targetDom.offsetHeight;   //id=“SimulationTitle”的div高度
    var x,y;
    if((elemLeft+wid)<=width && (elemTop+elemHeight+hei)<=height){     //左上角
        x = elemLeft ;
        y =elemTop + elemHeight ;
    }else if((elemLeft+wid)<=width && (elemTop+elemHeight+hei)>height){  //左下角
        x = elemLeft ;
        y =elemTop - hei ;
    }else if((elemLeft+wid)>width && (elemTop+elemHeight+hei)<=height){  //右上角
        x = width - wid  -10;
       y =elemTop + elemHeight ;
    }else if((elemLeft+wid)>width && (elemTop+elemHeight+hei)>height){      //右下角
        x = width -wid -15;
        y =elemTop - hei ;
    }
//    $("#SimulationTitle").css({"left":x,"top":y}) ;
    var  timer = setTimeout(hideTitle,4000);
    setTimeout(function(){
         $("#SimulationTitle").css({
            "left":x,
            "top":y
        }).die().live({
              mouseover:function(){
                            $("#SimulationTitle").show();
                            clearTimeout(timer);
                        },
              mouseout:function(){
                            $("#SimulationTitle").hide();
                        }
              });

    },100);
    
}


function hideSimulationTitle(){
	$("#SimulationTitle").css("display","block");
}
//隐藏div
function hideTitle(){
   $("#SimulationTitle").css("display","none");
}

/********************** end **************************************/ 