(function($,undefined){
	$.widget("ui.check",{
		options:{		
		},
		_init:function(){
			var o=this.options,
			input=this.element,
			checked=input.attr("checked"),
			disabled=input.attr("disabled"),
			key=input.attr("type"),
			$onclick = $(input).attr("onclick")||function(){},
			div=$("<div></div>",{"class":"c6ui-"+key}),
			className=["c6ui-"+key,disabled?"-disabled":"-normal",checked&&(input.attr("data-type")?"-"+input.attr("data-type"):"-checked")||""];
			input.hide().after(div);
			//input.after(div);
			//div.attr("onclick",$onclick );
			div.addClass(className.join(""));
			if(!disabled){
				div.hover(
				function(){
					div.addClass(["c6ui-",key,"-active",input.attr("checked")&&(input.attr("data-type")?"-"+input.attr("data-type"):"-checked")||""].join(""));
				},
				function(){
					div.removeClass(["c6ui-",key,"-active",input.attr("checked")&&(input.attr("data-type")?"-"+input.attr("data-type"):"-checked")||""].join(""));
				});
				div.click(function(){
					if(input.is(":radio")){
						//input.attr("checked",true);
						input.click();
						if(input.attr("name")){
							$(":radio[name='"+input.attr("name")+"']").each(function(i,item){
								var div=$(item).next(),
								input=$(item),
								newclassName=["c6ui-"+key,input.attr("disabled")?"-disabled":"-normal",input.attr("checked")&&"-checked"||""];
								div.removeClass().addClass("c6ui-radio").addClass(newclassName.join(""));
							})
							//input.click();
						}
					}else{
						var checked=!input.attr("checked"),newclassName;
							//input.attr("checked",checked);
							newclassName=["c6ui-"+key,input.attr("disabled")?"-disabled":"-normal",checked&&(input.attr("data-type")?"-"+input.attr("data-type"):"-checked")||""];
							div.removeClass().addClass("c6ui-checkbox").addClass(newclassName.join(""));
							input.attr("checked",checked);
							input.click();
							input.attr("checked",checked);
					}
				})
				
			}
		},
		destroy:function(){ 
			$(this.element).next("div[class*='c6ui-']").remove();
		}
	})
})(jQuery);

$(function()
{
	$(":checkbox.c6ui-check,:radio.c6ui-check,span.c6ui-check :checkbox,span.c6ui-check :radio").check();
})
