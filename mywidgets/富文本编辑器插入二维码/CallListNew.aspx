<%@ Register TagPrefix="cc1" Namespace="JHSoft.UserControl" Assembly="JHSoft.UserControl" %>
<%@ Register TagPrefix="cc2" Namespace="JHSoft.NetCall" Assembly="JHSoft.NetCall" %>
<%@ Page Language="c#" CodeBehind="CallListNew.aspx.cs" AutoEventWireup="True" Inherits="JHSoft.Web.NetCall.CallListNew" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
    <title>
        <%=Strtitle%>
    </title>
    <style type="text/css">
        .PopupCss
        {
            position: absolute;
            width: 120px;
            height: 125px;
            border: 1px solid rgb(0, 0, 0);
            background-color: #ffffe1;
        }
        .callListSpan
        {
           width: 100px;
            cursor: pointer;     
            word-break: break-all;
            word-wrap: break-word;  
            white-space:pre-wrap;   
            display:-moz-inline-box; 
            display:inline-block;
            vertical-align:text-top;  
           
        }
        .callListDiv
        {
            border-bottom: solid 1px #c0c0c0;
            position: relative;
            padding: 5px 0px 0px 0px;
        }
        #MyIframe::-webkit-scrollbar
        {
            width: 8px;
            height: 8px;
        }
        #MyIframe::-webkit-scrollbar-track
        {
            -webkit-box-shadow: inset 0 0 6px rgba(60,60,60,0.2);
            -webkit-border-radius: 8px;
        }
        #MyIframe::-webkit-scrollbar-thumb
        {
            -webkit-border-radius: 8px;
            background-color: #CDCDCD;
        }
        .send {
	        background-image:url(../JHSoft.UI.Lib/skin/<%=base.currSkin%>/btn-send.png);
	        width:68px;
	        height:68px;
	        display:block;
	        }
        .send:hover{ background-position:0 -68px;}
        /*desc by gaona at 2013-02-17 定义连接样式 start*/
        a{
            color:#0089fe ;
        }
        /*desc by gaona at 2013-02-17 定义连接样式 end*/
        /*desc by gaona at 2013-02-20 发送按钮样式 start*/
        .sendBtnSpan
        {
            background:#fff ;
            border:1px solid #cbcbcb ;
            cursor:pointer ;
            display:inline-block ;
            padding:1px ;
        }
        .sendBtnNew
        {
            border:none ;
            color:#fff ;
            cursor:pointer ;
            font-family:'微软雅黑','宋体','黑体' ;
            font-size:14px ;
            height:24px ;
            line-height:24px ;
            width:73px ;
        }
        /*desc by gaona at 2013-02-17 发送按钮样式 end*/
    </style>

    <script language="javascript" type="text/javascript">
        var language = "<%=currCulture%>";
    </script>

    <script language="javascript" type="text/javascript" src="../Control/JhbaseMenu.js"></script>

    <script language="javascript" type="text/javascript" src="../Control/PhraseContextMenu.js"></script>
    
    <script language="javascript" src="js/minScrollbar/js/minScrollbar.js"></script>

    <link rel="stylesheet" href="js/minScrollbar/css/minScrollbar.css" />
    <style type="text/css">
        .annex
        {
            border: 0px solid #b6b6b6;
            height: 25px;
            padding: 0 6px;
            width: 35px;
        }
        .annex li
        {
            float: left;
            height: 25px;
            line-height: 25px;
            margin-right: 6px;
            width: 24px;
        }
        .annex .annexNum
        {
            background: url(images/annexNum.png) no-repeat center;
            color: #fff;
            display: inline-block;
            height: 18px;
            line-height: 18px;
            left: 16px;
            position: relative;
            text-align: center;
            top: -32px;
            width: 18px;
        }
        .annex li a
        {
            color: #1593e2;
            display: block;
            text-decoration: none;
        }
        /*附件详情显示区域*/.annexPop
        {
            border-left: 1px solid #b6b6b6;
            border-top: 1px solid #b6b6b6;
            border-right: 1px solid #b6b6b6;
            overflow: hidden;
            padding: 6px 6px 0 6px;
            position: absolute;
            visibility: hidden;
            width: 152px;
            z-index: 2;
        }
        .annexPop .annex
        {
            border: none;
            margin-top: 12px;
            padding: 0px;
        }
        .annexList li
        {
            height: 26px;
            line-height: 26px;
        }
        .annexList li a
        {
            display: block;
            overflow: hidden;
            text-overflow: ellipsis;
            -o-text-overflow: ellipsis;
            white-space: nowrap;
            width: 150px;
        }
        .annexList li a:link, .annexList li a:visited
        {
            color: #424242;
        }
        .annexList li a:click
        {
            background: #385e9e;
            color: #fff;
        }
        .annexList li a img
        {
            margin-right: 4px;
            vertical-align: middle;
        }
        #table_main
        {
            position: absolute;
            left: 100px;
            border-left: 1px solid #b6b6b6;
            border-bottom: 1px solid #b6b6b6;
            border-right: 1px solid #b6b6b6;
            border-top: 1px solid #b6b6b6;
        }
    </style>
    <script type="text/javascript">
        function main_click(obj) {
            var id = obj.id;
            $('#' + id).css('background', '#385e9e');
            $('#' + id).css('color', '#fff');

        }
     
    </script>

    <script language="javascript">
        $(function() {
            //如果附件个数为零则影藏右上角条数显示
            var _annexNum = $('.annexUl .annexNum').html();
            if (_annexNum == 0) {
                $('.annexNum').css('display', 'none');
            }

            //添加自定义滚动条
            $(".annexList").minScrollbar({
                hScroll: false,
                vScroll: true,
                width: '7px',
                viewWidth: '158px',
                viewHeight: '110px',
                bgColor: '#333'
            });

            //定位附件列表
            //var _left = $('.annexUl').position().left;
            // var _top = $('.annexUl').position().top;
            var _top = $('#table_main').position().top;
            var _left = $('#table_main').position().left;
            var _hei = $('.annexPop').height();
            var _newTop = parseInt(_top - _hei - 8);
            $('.annexPop').css('top', _newTop);
            $('.annexPop').css('left', _left);
            //如果已有上传的附件，鼠标移动到附件区域的时候弹出附件列表


            $('#table_main').hover(function() {
                var num = $('#spn_number').text();

                if (num != 0) {
                    $('.annexPop').css('visibility', 'visible');
                    $('#table_main').css('border-top', '0px solid #b6b6b6');
                }
            });

            //鼠标点击附件列表以外的区域收起列表
            $('body').click(function(e) {
                var _target = e.target;
                var _isannexPop = ($(_target).hasClass('annexPop')) || ($(_target).parents('div').hasClass('annexPop'));
                if (_isannexPop) {
                } else {
                    $('.annexPop').css('visibility', 'hidden');
                    $('#table_main').css('border-top', '1px solid #b6b6b6');
                }
            });
        });
    </script>

    <style type="text/css">
        div.panel, p.flip
        {
            margin: 0px;
            padding: 5px;
            text-align: center;
            background: #e5eecc;
            border: solid 1px #c3c3c3;
        }
        div.panel
        {
            height: 120px;
            display: none;
        }
    </style>

    <script type="text/javascript">
        //多语言，用于分离页面脚本
        var callpage_StrTitleDbClickChoice = "<%=StrTitleDbClickChoice%>";
        var callpage_StrDbClickImport = "<%=StrDbClickImport%>";
        var callpage_StrMailTitle2 = "<%=StrMailTitle2%>";
        var callpage_Xhnrbnwk1 = "<%=Xhnrbnwk1 %>";
        var callpage_Xhnrbncggzf2 = "<%=Xhnrbncggzf2 %>";
        var callpage_Remind1 = "<%=Remind1 %>";
        var callpage_Qxzfsdxbz4 = "<%=Qxzfsdxbz4 %>";
        var callpage_Remind2 = "<%=Remind2 %>";
        var callpage_Remind3 = "<%=Remind3 %>";
        var callpage_StrZs = "<%=StrZs%>";
        var callpage_UserCode ="<%=Session["UserCode"].ToString()%>";
        var callpage_Ydddxfsxzxzbnzfsdx5 = "<%=Ydddxfsxzxzbnzfsdx5 %>";
        var callpage_Xhfscg7 = "<%=Xhfscg7 %>";
        var callpage_Ndxhfsbcgqjcwlhshzs8 = "<%=Ndxhfsbcgqjcwlhshzs8 %>";
        var callpage_Qbzk14 = "<%=Qbzk14%>";
        var callpage_Myzdnyczdxxnkycsqbzkzhzcx12 = "<%=Myzdnyczdxxnkycsqbzkzhzcx12 %>";
        var callpage_Myzdnycxdxx11 ="<%=Myzdnycxdxx11 %>";
        var callpage_StrEnterNameSearch = "<%=StrEnterNameSearch%>";
        var callpage_Qbzd13 = "<%=Qbzd13%>";
        var callpage_StrSmsName = "<%=StrSmsName%>";
        var callpage_Jsr="<%=Jsr %>";
        var callpage_Zs="主送人";
        var callpage_Remind4 = "<%=Remind4%>";
        var callpage_Qsrnyczdxx10 = "<%=Qsrnyczdxx10 %>";
        
        
    </script>    

    <script src="CallListNew.js" type="text/javascript"></script>

    <script src="CallListXml.js" type="text/javascript"></script>

    <script language="javascript" type="text/javascript">
        /**
        * 我要通话,在视频会议中开即时会议
        * 2009-7-29 liuxr
        **/
        function ChekIWantCall(button) {
            openConfirmDialog({
                contents: callpage_Remind4,       //提示内容
                icon: "help",                        //图标样式，可用值alert,error,help,ok,info
                bottons: {                         //定制弹出窗口按钮
                    "<%=Qd %>": function () { }, //指定按钮名称及绑定的事件
                    "<%=Qx %>": function () { return false; }
                }
            });

            var selectedValue = ""; //人员ID
            var ev = jQuery("#MyIframe").contents().find("INPUT");
            var arrayuserid = new Array();
            var evlength = ev.length;
            for (var i = 0; i < evlength; i++) {
                if (ev[i].type == "checkbox" && ev[i].checked == true && ev[i].id.indexOf("User") != -1) {
                    var userid = ev[i].id.substring(4, ev[i].id.length);
                    arrayuserid.push(userid);
                }
            }

            if (arrayuserid.length == 0) {
                //请选择您要通话的人员!
                openAlertDialog("<%=Remind6 %>", "alert", function () {
                    return false;
                })
                return false;
            }
            document.getElementById("hidV2SelectUsers").value = arrayuserid.join(",");
            __doPostBack(button, '');
        }


        //zhaojp   20120516 add  计算已选接收人
        //点击人员列表的复选框时，设置主送时调用
        /*
        function sumselect() {
        var ev = jQuery("#MyIframe").find("INPUT");
        var evlength = ev.length;

        var zsr = document.getElementById("hidSelectedUsersIDs").value;
        
        var arrayzsr = zsr.split(',');

        var uernum = arrayzsr.length;
        if (arrayzsr == "")
        uernum -= 1;
     
        
        for (var i = 0; i < evlength; i++) {
        if (ev[i].type == "checkbox" && ev[i].checked == true && ev[i].id.indexOf("User") != -1) {
        var userid = ev[i].id.substring(4, ev[i].id.length);
        if ( arrayzsr.indexOf(userid)<0)
        uernum++;
        }
        }
        document.getElementById("spselect").innerHTML = "已选人员:" + uernum;
        }
        Array.prototype.indexOf = function(o) {

        for (var i = 0, len = this.length; i < len; i++) {

        if (this[i] == o)
        return i;

        }
        return -1;
        };

    
        */


        //zhaojp add end
    </script>
<script type="text/javascript" charset="utf-8" src="../Uediter-u/editor_config.js"></script>
<script type="text/javascript" charset="utf-8" src="../Uediter-u/_src/editor_api.js"></script>
<script type="text/javascript">
    function CreateUediter() {
        //移动设备
        if (!checkserAgent()) {
            /*--desc by gaona at 2013-02-26 自定义富文本编辑器及插入二维码图标 start--*/
           // var editor = new UE.ui.Editor();
            var editor = new UE.ui.Editor({
                toolbars:[['undo', 'redo', '|', 'insertunorderedlist', 'insertorderedlist', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', 'indent', '|', 'link', 'unlink', '|','insertqrcode','insertimage', 'scrawl', 'map', 'emotion', 'horizontal', '|', 'bold', 'italic', 'underline', 'forecolor', 'fontfamily', 'fontsize']],
                elementPathEnabled:false,
                initialFrameWidth:'100%',
                labelMap:{
				    'insertqrcode':'插入二维码'
			    }
            });
            /*--desc by gaona at 2013-02-26 自定义富文本编辑器及插入二维码图标 end--*/
            $("#MyIframeContent").height(400);
            editor.render('txtMessage');
        }
    }
    /*desc by gaona at 2013-02-20 “接收人”列表会根据显示区域的大小自动适配内容超出的内容用“…”代替 start*/
    $(function () {
        var _parentTdWid = $('#spselect').parents('td').width();
        var _siblingsWid = 600;
        var _receiveWid = parseInt(_parentTdWid) - parseInt(_siblingsWid);
        if (_receiveWid > 0) {
            $('#spselect').width(_receiveWid);
        } else {
            $('#spselect').width(0);
        }
        //$('#spselect')

    });
    /*desc by gaona at 2013-02-20 “接收人”列表会根据显示区域的大小自动适配内容超出的内容用“…”代替 start*/
</script>
</head>
<%--2011-03-28 沈繁荣 添加ONLOAD事件--%>
<body onkeydown="keyDown(event)" style="overflow: hidden; margin: 0px; padding: 0px;"
    onload="TransferOnLine();">
    <form  id="Form1" method="post" runat="server">
    <div style="background-color: #F6F6F6; height: 32px; border-bottom: solid 1px #C5C5C5">
        <ul style="padding: 0px; margin: 0px; list-style: none; height: 32px;">
            <li name="liQbzk" style="float: left; margin-top: 7px;">
                <!-- desc by gaona at 2013-02-17 选择操作工具条的“全部展开”按钮弱化为链接形式 start-->
                <!--<input class="c6ui-button" id="btnExpandAll" onclick="ExpandClose();" type="button"
                    style="margin-bottom: -6px;" value="<%=Qbzk14%>" />-->
                <a href="javascript:void(0);" id="btnExpandAll" style="margin-left:22px ;" onclick="ExpandClose();"><%=Qbzk14%></a>
                <!-- desc by gaona at 2013-02-17 选择操作工具条的“全部展开”按钮弱化为链接形式 start-->
            </li>
            <li name="liQbzk" style="float: left; margin-top: 8px; margin-left: 10px;">
                <input id="chkLink" style="font-size: 10pt;" type="checkbox" class="c6ui-check" checked="checked"
                    name="chkLink" />
            </li>
            <li name="liQbzk" style="float: left; margin-top: 8px;">
                <%=Glxj%></li>
            <li name="liQx" style="float: left; margin-top: 8px; margin-left: 10px;">
                <input id="chkQx" style="font-size: 10pt;" type="checkbox" class="c6ui-check" checked="checked"
                    name="chkQx" />
            </li>
            <li name="liQx" style="float: left; margin-top: 8px;">
                <%=strQx%></li>
            <li style="float: left; margin-top: 8px; margin-left: 10px;">
                <%=Sxtj15%></li>
            <li style="float: left; margin-top: 6px;">
                <cc1:SelectUserQuery ID="SelectUserQuery1" runat="server" Width="100px">
                </cc1:SelectUserQuery></li>
            <!-- desc by gaona at 2013-02-17 人员搜索功能控件精简搜索按钮，将搜索框和按钮集成在一个控件中。点击放大镜图标或者回车键都可以触发搜索。 start-->
            <!--<li style="float: left; margin-top: 5px; margin-left: 10px;">                
                <input id="txtSearch1" class="widget-textinput" type="text" size="16" style="height: 16px;
                    width: 120px; text-align: center; line-height: 16px" runat="server" /></li>
            <li style="float: left; margin-top: 3px;">
                <input class="c6ui-button" onclick="finduser()" type="button" style="margin-bottom: -6px;"
                    data-img="../JHsoft.UI.Lib/skin/default/images/base_btn/btn_icon_magnifier.png"
                    value="<%=Cz25 %>" /></li>-->
            <li style="float: left; margin-top: 3px; margin-left: 10px;">
               <input id="txtSearch" class="widget-textinput" type="text" size="16" style="height: 22px;width: 160px; text-align: center; line-height: 22px" runat="server" />
               <a href="javascript:void(0);" onclick="finduser()" style="position:relative;left:-26px;"><img alt="" src="../JHsoft.UI.Lib/skin/default/images/base_btn/btn_icon_magnifier.png" style="vertical-align:middle ;" /></a>
            </li>
            <!-- desc by gaona at 2013-02-17 人员搜索功能控件精简搜索按钮，将搜索框和按钮集成在一个控件中。点击放大镜图标或者回车键都可以触发搜索。 end-->
            <li style="float: right; margin-top: 8px; margin-right: 10px;"><b style="font-weight:normal;color:#646464"><font color="#ee0000">
                <%=Hs18%></font><%=Zx19%>
                <font style="margin-left:6px ;color:#0180f7;">
                    <%=Ls20%></font>
                <%=Jz21%>
            </b></li>
        </ul>
        <input class="textbox" id="HidSelectedValue" type="hidden" size="1" name="HidSelectedValue" />
        <input class="textbox" id="hidSelectedIndex" type="hidden" size="1" name="hidSelectedIndex" />
    </div>
    <div id="MyIframeContent" style="margin-top: 8px; background-repeat: no-repeat; margin-bottom: 8px;
        min-height: 400px; background-image: url(images/loading.gif); background-position: center center;">
        <div id="MyIframe" style="overflow: auto; background-color: #fff;">
            <div id="contentBody" oncontextmenu="" onclick="doClick(event);">
                <div id="CallList" style="width: 100%;">
                </div>
                <xml id="XmlDoc"></xml>
            </div>
        </div>
    </div>
    <!-- desc by gaona at 2013-02-20 寻呼改造样式调整。 start-->
    <!--<div style="background-color: #F6F6F6; min-height: 32px; border-top: solid 1px #C5C5C5">-->
    <div style="background-color: #F6F6F6; height: 34px;line-height:34px; border-top: solid 1px #C5C5C5">
    <!-- desc by gaona at 2013-02-20 寻呼改造样式调整。 start-->
        <table id="SlaveTable" width="100%">
            <tr>
<td>
    <div class="annexPop">
        <ul class="annexList ui-minScrollbar" id="ul_main" controlid="UploadFile1">
        </ul>
    </div>
    <table width="166px" id="table_main">
        <tr>
            <td>
                <ul class="annex">
                    <li>附件<span class="annexNum" id="spn_number">0</span></li>
                </ul>
            </td>
            <td>
                <cc2:UploadFile ID="UploadFile1" runat="server" ReferenceFilePath="../Control/">
                </cc2:UploadFile>
            </td>
        </tr>
    </table>
</td>
                <td>
                    &nbsp;
                    <input id="chkSms" type="checkbox" name="chkSms" runat="server" class="c6ui-check"
                        value="" /><%=Dx26 %>&nbsp;
                    <input class="widget-textinput" id="txtMobile" ondblclick="GetMobileNumFromAddress()"
                        onkeyup='this.value=this.value.replace(/[^0-9,]/g,"")' type="text" name="txtMobile"
                        runat="server" />&nbsp;&nbsp;
         <%--           <input class="c6ui-button" id="btnSelectMobileNum" onclick="GetMobileNumFromAddressButton();"
                        type="button" style="margin-bottom: -6px;" value="<%=Txldr %>" />--%>
                        
                    <input id="chkmail" type="checkbox" name="chkmail" runat="server" class="c6ui-check" /><%=Fyj %>
                    <input class="widget-textinput" id="txtmail" ondblclick="GetEmailFromAddress()" name="txtmail"
                        type="text" runat="server" />&nbsp;&nbsp;&nbsp;&nbsp;
                        
                       <%-- zhaojp 201208508 add --%>
                         <input id="chkSec" type="checkbox" name="chkSec" runat="server" class="c6ui-check" 
                        value="" /><asp:Label ID="Label1" title ="仅发送人与接收人可见。"  
                             runat="server" Text="保密"></asp:Label>&nbsp;
                         <input id="chkSecCopy" type="checkbox" name="chkSecCopy" runat="server" class="c6ui-check" 
                        value="" /><asp:Label ID="Label2" title ="单独密送给每位接收人。"  
                             runat="server" Text="密抄"></asp:Label>&nbsp;
                       <%-- zhaojp addd end--%>
                    
                    <!-- desc by gaona at 2013-02-20 设置主送。 start-->
                    <!--<input class="c6ui-button" onclick="OpenSelectPermiUsers();" style="margin-bottom: -6px;"
                        type="button" value="<%=Szzj28%>" />-->
                    <a href="javascript:void(0);" onclick="OpenSelectPermiUsers();"><%=Szzj28%></a>
                    <input style="display: none" onclick="OpenSelectDepts();" type="button" />
                  <!-- desc by gaona at 2013-02-20 设置主送。 end-->
                  <%--  zhaojp 20120516 --%>
                  <%--  <input class="c6ui-button" id="selusers" onclick="selectedall();" style="margin-bottom: -6px;"
                        type="button" value="<%=Ckyx %>" />--%>  
                        
                <%--    <span id ="spselect"   onclick="selectedall();" style="color:Blue;   "  onmouseover ="this.style.color='Red'" onmouseout ="this.style.color='Blue'" >
                    </span>
                     &nbsp;
                    <span id ="spzsr"   onclick="selectedall();" style="color:Blue; " onmouseover ="this.style.color='Red'" onmouseout ="this.style.color='Blue'" >
                    </span>--%>
                    <!-- desc by gaona at 2013-02-20 接收人。 start-->
                    <!--<span id ="spselect"   onclick="selectedall();stopBubble(event);" style="color:Blue; cursor :pointer ;   "  onmouseover ="this.style.color='Red'" onmouseout ="this.style.color='Blue'" >
                    </span>-->
                    <a href="javascript:void(0);" id ="spselect" onclick="selectedall();stopBubble(event);" style="margin-left:15px ;line-height:12px;margin-bottom:-2px ;display:inline-block;overflow:hidden ;text-overflow:ellipsis ;-o-text-overflow:ellipsis ;white-space:nowrap ;width:200px ;"></a>
                     <!-- desc by gaona at 2013-02-20 接收人。 end-->
                      
                        
                    <!--2009-9-8 13：55 liuxr 隐藏我要通话的按钮style="DISPLAY:none"-->
                    <span style="display: none;">
                        <input language="javascript" class="c6ui-button" id="btnIwantCall" onclick="return ChekIWantCall('btnIwantCall1');"
                            type="button" name="btnIwantCall" runat="server" />
                        <input style="display: none" type="button" value="SendVideo" id="btnIwantCall1" name="btnIwantCall1"
                            runat="server" onserverclick="btnIwantCall1_ServerClick" /></span>
                </td>
                <!-- desc by gaona at 2013-02-20 发送按钮。 start-->
                <td width="105px">
                    <span class="sendBtnSpan" onclick="MessageSend();"><input type="button" class="sendBtnNew" value="发送" /></span>
                </td>
                <!-- desc by gaona at 2013-02-20 发送按钮。 start-->
            </tr>
        </table>
    </div>
    <div>
    <table style="width:100%"><tr>
    <td  style="width:100%"><textarea id="txtMessage" onclick="CreateUediter();" ondblclick="PhraseContextMenu(this);" maxlength="8000"  onkeydown="MsgkeyDown(event)"  onpaste="setTimeout( setHeight,150)" 
             name="txtMessage" wrap="hard" style="height: 72px; width:100%;"
            runat="server" ></textarea></td>
    <td style="width:5%">
    
   <%-- <input onclick="MessageSend();" style="height:72px; width:100%" 
                        type="button" value="&nbsp;&nbsp;&nbsp;<%=Hj27%>&nbsp;&nbsp;&nbsp;" />
     <img alt="" src=""  id="SendMessage" onclick="MessageSend();return false;" title="发送寻呼" style="cursor:pointer"/>--%>
     <!-- desc by gaona at 2013-02-20 发送按钮。 start-->
     <!--<a href="#" onclick="MessageSend();return false;" class="send" title="发送寻呼"></a>-->
     <!-- desc by gaona at 2013-02-20 发送按钮。 start-->
    </td>
    </tr></table>
        
    </div>
    <input id="hidV2Users" type="hidden" name="hidV2Users" />
    <input id="hidV2SelectUsers" type="hidden" name="hidV2SelectUsers" />
   <%-- <div id="divusers" style="border-right: darkgray thin solid; border-top: darkgray thin solid;
        display: none; border-left: darkgray thin solid; width: 400px; height: 200px;
        border-bottom: darkgray thin solid; position: absolute; background-color: seashell;
        overflow-x: hidden; overflow-y: auto;">
    </div>--%>
    
  <%-- <div id="divusers" style="border: #7CBFDB 2px solid; padding: 3px;
      position: absolute; top: 30px; background-color: #F0F8FD;
        overflow-y:auto; overflow-x: hidden; max-height: 200px; height: auto !important; width :400px;
        height: 200px;"></div>--%>
     <div id="divusers" style="z-index:1;border: #7CBFDB 2px solid; padding: 3px;
      position: absolute; top: 60px; background-color: #F0F8FD; visibility :hidden ;
        overflow-y:auto; overflow-x: hidden; max-height: 200px; height:200px; width :400px;
        height: 200px;" onclick="stopBubble(event);">
    </div>
    <input id="hidSelectedUsers" style="display: none" name="hidSelectedUsers" />
    <input id="hidSelectedUsersIDs" style="display: none" name="hidSelectedUsersIDs" />
     <input id="hidselnum" type="hidden" name="hisselnum"  />
                     <input id="hidzsnum" type="hidden" name="hidzsnum" />
    </form>
    <div id="shortcutico" style="display:none;width:0px; height:0px;"></div>
</body>
</html>
