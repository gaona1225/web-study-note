<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@page contentType="text/html;charset=utf-8"%>
<html>
<head>
    <title>日记模板设置-添加</title>
    <meta content="text/html;charset=utf-8" http-equiv="Content-Type"/>
	<%@ include file="/common/taglibs.jsp"%>
	<%@ include file="/common/metaTemp.jsp"%>
	<style>
		.field_td {width: 80px}
		.widget_td {width: 178px}
		.radio_td {width: 100px}
		.z-radio {
			diplay: inline-block;
			margin: 0 0 0 3px
		}
		.z-radio > label {
			diplay: inline-block;
			margin: 0 0 0 3px
		}
		.diary-button {}
		.diary-button .ui-buttonPro span{
			padding-right: 0
		}
		.diary-button .ui-buttonPro span .ico {
			margin-right: 0
		}
		.diary-button .ui-buttonPro span input {/*ff;ie9*/
			/*padding: 0;
				只在ff上异常
			*/
			padding: 3px\9
		}
		.saveOrCancel {
			padding: 10px 0;
		}
	</style>
	<link rel="stylesheet" href="${ctx}/uiBase/skins/default/ui-custom-affair-diary.css"/>
</head>
<body>
<div class="">	
<form method="post" name="form1" id="form1" action="">
	<div class="ui-common-form-biserial">
		<table width="100%" border="0" cellspacing="0" class="grid_biserial">
			<tbody>
				<tr>
					<!-- 模板名称 -->
					<td class="field_td">
						模板名称:
					</td>
					<td class="widget_td">
						<input type="text" class="input_text_default"/>
					</td>
					<!-- 适用部门 -->
					<td class="field_td">
						适用部门:
					</td>
					<td class="widget_td">
						<input type="text" class="input_text_default"/>
					</td>
					<td colspan="3">&nbsp;</td>
				</tr>
			</tbody><!--/固定字段-->
			<tbody>
				<tr>
					<!-- 模板元素名称 -->
					<td class="field_td">
						模板元素名称:
					</td>
					<td class="widget_td">
						<input type="text" class="input_text_default"/>
					</td>
					<!-- 排序号 -->
					<td class="field_td">
						排序号:
					</td>
					<td class="widget_td">
						<input type="text" class="input_text_default"/>
					</td>
					<!-- 是否必填 -->
					<td class="field_td">
						是否必填:
					</td>
					<td class="widget_td radio_td">
						<span class="z-radio">
							<input type="radio" name="required"/>
							<label>是</label>
						</span>
						<span class="z-radio">
							<input type="radio" name="required"/>
							<label>否</label>
						</span>
					</td>
					<td class="diary-button">
						<input type="button" class="buttonPro" data-width="25px" data-img="${ctx}/uiBase/skins/default/images/ui-custom/dairy/ui-custom-diary-tpl-del.png"/>
					</td>
				</tr>
			</tbody><!--/模板元素-->
			<tbody>
				<tr>
					<!-- 模板元素名称 -->
					<td class="field_td">
						模板元素名称:
					</td>
					<td class="widget_td">
						<input type="text" class="input_text_default"/>
					</td>
					<!-- 排序号 -->
					<td class="field_td">
						排序号:
					</td>
					<td class="widget_td">
						<input type="text" class="input_text_default"/>
					</td>
					<!-- 是否必填 -->
					<td class="field_td">
						是否必填:
					</td>
					<td class="widget_td radio_td">
						<span class="z-radio">
							<input type="radio" name="required"/>
							<label>是</label>
						</span>
						<span class="z-radio">
							<input type="radio" name="required"/>
							<label>否</label>
						</span>
					</td>
					<td class="diary-button">
						<input type="button" class="buttonPro" data-width="25px" onclick="addRow(this);"
						 data-img="${ctx}/uiBase/skins/default/images/ui-custom/dairy/ui-custom-diary-tpl-add.png"/>
					</td>
				</tr>
			</tbody><!--/模板元素-->
			<tbody>
				<tr>
					<!-- 备注 -->
					<td class="field_td">
						备注:
					</td>
					<td class="widget_td" colspan="3">
						<textarea class="textarea_426"></textarea>
					</td>
					<td colspan="3" class="diary-button" style="text-align:right;padding: 3px 15px 0 0;vertical-align:top">
					<!--  
					<input type="button" class="buttonPro" data-width="25px" data-img="${ctx}/uiBase/skins/default/images/ui-custom/dairy/ui-custom-diary-tpl-del.png"/>
					-->
					</td>
				</tr>
			</tbody><!--/固定字段-->
		</table>
	</div>
</form><!--/表单-->
<div class="saveOrCancel">
	<input type="button" class="buttonActive" data-width="standard" value="保存"/>
	<input type="button" class="buttonPro" data-width="standard" value="取消">
</div><!--/按钮区-->
</div>
<script>
	//添加模板元素字段
	function addRow( o ) {
		var tbody =
			'<tbody>'
				+'<tr>'
					+'<td class="field_td">'
						+'模板元素名称:'
					+'</td>'
					+'<td class="widget_td">'
						+'<input type="text" class="input_text_default"/>'
					+'</td>'
					+'<td class="field_td">'
						+'排序号:'
					+'</td>'
					+'<td class="widget_td">'
						+'<input type="text" class="input_text_default"/>'
					+'</td>'
					+'<td class="field_td">'
						+'是否必填:'
					+'</td>'
					+'<td class="widget_td radio_td">'
						+'<span class="z-radio">'
							+'<input type="radio" name="required"/>'
							+'<label>是</label>'
						+'</span>'
						+'<span class="z-radio">'
							+'<input type="radio" name="required"/>'
							+'<label>否</label>'
						+'</span>'
					+'</td>'
					+'<td class="diary-button">'
						+'<input type="button" class="buttonPro" data-width="25px" onclick="addRow(this);" data-img="${ctx}/uiBase/skins/default/images/ui-custom/dairy/ui-custom-diary-tpl-add.png"/>'
					+'</td>'
				+'</tr>'
			+'</tbody>';
			var $input = $(o);
			$input.prev().css("background-image","url(${ctx}/uiBase/skins/default/images/ui-custom/dairy/ui-custom-diary-tpl-del.png)");
			$input.attr("data-img","${ctx}/uiBase/skins/default/images/ui-custom/dairy/ui-custom-diary-tpl-del.png");
			var $curTbody = $input.parent().parent().parent().parent().parent();
			$input[0].onclick = function() {//TODO:使用jq attr onclick不能替换
			$input[0].onclick = null;
				$curTbody.empty().remove();					
			};
			$(tbody).insertAfter($curTbody.append());
			$(".buttonPro").buttonPro();
	};
	//删除模板元素字段
	function delRow( o ) {
		alert("del");
	};
</script>
<!-- 
//弹出框的尺寸
function tplArt() {
	var url="${ctx}/add_reduce/tpl_add.action";
	art.dialog.open(url,{
		title:"日记模板添加",
		width:"780px",
		height:"400px"				
	});	
}
 -->
</body>
</html>