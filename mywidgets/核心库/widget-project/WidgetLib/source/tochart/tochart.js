/*
 *作    者: 高娜
 *版    本: 1.3
 *完成时间: 2012-12-12
 *描    述: tochart
 *关联文件: jQuery.js|jquery-ui.js
 */
(function($,container){
    /**
	* @class 表格转图表控件
    * @name tochart
    * @description 表格转图表控件
	* @version 1.3
    */
	$.widget('ui.tochart',
	/** @lends tochart.prototype */
	{		
		options:{
			/**  
			* @name tochart#type
			* @param {String}  字符串类型
			* @description 转换的图表形式，可选值有：'bar'-柱状图,'area'-区域图,'pie'-饼状图,'line'-线性图
			* @default {String} 'bar' 
			* @example
			* $('.exampleObj').tochart({
			*		type : 'bar'
			*  });
			*/
			type : 'bar' ,
			/**  
			* @name tochart#width
			* @param {Number}  数字类型
			* @description 转换的图表宽度,当未手动设置宽度或设置值为null,取表格的宽度。
			* @default {Number} null
			* @example
			* $('.exampleObj').tochart({
			*		width : null
			*  });
			*/
			width : null ,
			/**  
			* @name tochart#height
			* @param {Number}  数字类型
			* @description 转换的图表高度,当未手动设置高度或设置值为null,取表格的高度。
			* @default {Number} null
			* @example
			* $('.exampleObj').tochart({
			*		height : null
			*  });
			*/
			height : null ,
			/**  
			* @name tochart#appendTitle
			* @param {Boolean}  布尔类型
			* @description 转换的图表是否显示表格的标题
			* @default {Boolean} true
			* @example
			* $('.exampleObj').tochart({
			*		appendTitle : true
			*  });
			*/
			appendTitle : true ,
			/**  
			* @name tochart#title
			* @param {String}  字符串类型
			* @description 转换的图表显示的标题
			* @default {String} null 
			* @example
			* $('.exampleObj').tochart({
			*		title : null
			*  });
			*/
			title : null ,
			/**  
			* @name tochart#appendKey
			* @param {Boolean}  布尔类型
			* @description 转换的图表是否显示图例
			* @default {Boolean} true
			* @example
			* $('.exampleObj').tochart({
			*		appendKey : true
			*  });
			*/
			appendKey : true ,
			/**  
			* @name tochart#rowFilter
			* @param {String}  字符串类型
			* @description 转换的图表行过滤条件设置
			* @default {String} '*'
			* @example
			* $('.exampleObj').tochart({
			*		rowFilter : '*'
			*  });
			*/
			rowFilter : '*' ,
			/**  
			* @name tochart#colFilter
			* @param {String}  字符串类型
			* @description 转换的图表列过滤条件设置
			* @default {String} '*'
			* @example
			* $('.exampleObj').tochart({
			*		colFilter : '*'
			*  });
			*/
			colFilter : '*' ,
			/**  
			* @name tochart#colors
			* @param {Array}  数组类型
			* @description 转换的图表中显示是颜色块
			* @default {Array} ['#be1e2d','#666699','#92d5ea','#ee8310','#8d10ee','#5a3b16','#26a4ed','#f45a90','#e9e744'] 
			* @example
			* $('.exampleObj').tochart({
			*		colors : ['#be1e2d','#666699','#92d5ea','#ee8310','#8d10ee','#5a3b16','#26a4ed','#f45a90','#e9e744']
			*  });
			*/
			colors : ['#be1e2d','#666699','#92d5ea','#ee8310','#8d10ee','#5a3b16','#26a4ed','#f45a90','#e9e744'] ,
			/**  
			* @name tochart#textColors
			* @param {Array}  数组类型
			* @description 转换的饼图中提示数据文本颜色，只有饼图有。
			* @default {Array} [] 
			* @example
			* $('.exampleObj').tochart({
			*		textColors : []
			*  });
			*/
			textColors : [] ,
			/**  
			* @name tochart#parseDirection
			* @param {String}  字符串类型
			* @description 解析表格数据的方向，可选参数为'x','y'，被解析的字段必须放到th标签里面。
			* @default {String} 'x'
			* @example
			* $('.exampleObj').tochart({
			*		parseDirection : 'x'
			*  });
			*/
			parseDirection : 'x' ,
			/**  
			* @name tochart#pieMargin
			* @param {Number}  数字类型
			* @description 转换的饼图的外边距，只有饼状图有。
			* @default {Number} 20
			* @example
			* $('.exampleObj').tochart({
			*		pieMargin : 20
			*  });
			*/
			pieMargin : 20 ,
			/**  
			* @name tochart#pieLabelPos
			* @param {String}  字符串类型
			* @description 转换的饼图的提示数据在饼图的位置，可选参数'inside','outside',只有饼图有。
			* @default {String} 'inside'
			* @example
			* $('.exampleObj').tochart({
			*		pieLabelPos : 'inside'
			*  });
			*/
			pieLabelPos : 'inside' ,
			/**  
			* @name tochart#lineWeight
			* @param {Number}  数字类型
			* @description 转换的线性图和区域图的线的宽度，只有线性图和区域图有。
			* @default {Number} 4
			* @example
			* $('.exampleObj').tochart({
			*		lineWeight : 4
			*  });
			*/
			lineWeight : 4 ,
			/**  
			* @name tochart#barGroupMargin
			* @param {Number}  数字类型
			* @description 转换的柱状图中每组数据之间的间距，只有柱状图有。
			* @default {Number} 10
			* @example
			* $('.exampleObj').tochart({
			*		barGroupMargin : 10
			*  });
			*/
			barGroupMargin : 10 ,
			/**  
			* @name tochart#barMargin
			* @param {Number}  数字类型
			* @description 转换的柱状图中每组数据内柱子之间的间距，只有柱状图有。
			* @default {Number} 1
			* @example
			* $('.exampleObj').tochart({
			*		barMargin : 1
			*  });
			*/
			barMargin : 1 ,
			/**  
			* @name tochart#yLabelInterval
			* @param {Number}  数字类型
			* @description 转换的图表参考坐标的间距
			* @default {Number} 30
			* @example
			* $('.exampleObj').tochart({
			*		yLabelInterval : 30
			*  });
			*/
			yLabelInterval : 30 ,
			/**  
			* @name tochart#customFn
			* @param {Fn}  函数类型
			* @description 自定义函数
			* @default {Fn} function(){}
			* @example
			* $('.exampleObj').tochart({
			*		customFn : function(){alert("customFn")}
			*  });
			*/
			customFn : function(){}
		},
		_create:function(){},
		_init:function(){
			var _self = this.element ;
			var o = this.options ;
			o.width = (o.width == null) ? parseInt(_self.width()) : parseInt(o.width) ;
			o.height = (o.height == null) ? parseInt(_self.height()) : parseInt(o.height) ;
			if(_self.next('.visualize').length > 0){
				_self.next('.visualize').remove() ;
			}
			//从html表格中解析数据
			function scrapeTable(){
				var colors = o.colors ;
				var textColors = o.textColors ;
				var tableData = {
					dataGroups : function(){
						var dataGroups = [] ;
						if(o.parseDirection == 'x'){
							_self.find('tr:gt(0)').filter(o.rowFilter).each(function(i){
								dataGroups[i] = {} ;
								dataGroups[i].points = [] ;
								dataGroups[i].color = colors[i] ;
								if(textColors[i]){
									dataGroups[i].textColor = textColors[i] ;
								}
								$(this).find('td').filter(o.colFilter).each(function(){
									dataGroups[i].points.push(parseFloat($(this).text())) ;
								}) ;
							}) ;
						}else{
							var cols = _self.find('tr:eq(1) td').filter(o.colFilter).size() ;
							for(var i=0; i<cols; i++){
								dataGroups[i] = {} ;
								dataGroups[i].points = [] ;
								dataGroups[i].color = colors[i] ;
								if(textColors[i]){
									dataGroups[i].textColor = textColors[i] ;
								}
								_self.find('tr:gt(0)').filter(o.colFilter).each(function(){
									dataGroups[i].points.push($(this).find('td').eq(i).text()*1) ;
								}) ;
							}
						}
						return dataGroups ;
					} ,
					allData : function(){
						var allData = [] ;
						$(this.dataGroups()).each(function(){
							allData.push(this.points) ;
						}) ;
						return allData ;
					} ,
					dataSum : function(){
						var dataSum = 0 ;
						var allData = this.allData().join(',').split(',') ;
						$(allData).each(function(){
							dataSum += parseFloat(this) ;
						}) ;
						return dataSum ;
					} ,
					topValue : function(){
						var topValue = 0 ;
						var allData = this.allData().join(',').split(',') ;
						$(allData).each(function(){
							if(parseFloat(this,10)>topValue){
								topValue = parseFloat(this) ;
							}
						}) ;
						return topValue ;
					} ,
					bottomValue : function(){
						var bottomValue = 0 ;
						var allData = this.allData().join(',').split(',') ;
						$(allData).each(function(){
							if(this<bottomValue){
								bottomValue = parseFloat(this) ;
							}
						}) ;
						return bottomValue ;
					} ,
					memberTotals : function(){
						var memberTotals = [] ;
						var dataGroups = this.dataGroups() ;
						$(dataGroups).each(function(l){
							var count = 0 ;
							$(dataGroups[l].points).each(function(m){
								count += dataGroups[l].points[m] ;
							}) ;
							memberTotals.push(count) ;
						}) ;
						return memberTotals ;
					} ,
					yTotals : function(){
						var yTotals = [] ;
						var dataGroups = this.dataGroups() ;
						var loopLength = this.xLabels().length ;
						for(var i=0; i<loopLength; i++){
							yTotals[i] = [] ;
							var thisTotal = 0 ;
							$(dataGroups).each(function(l){
								yTotals[i].push(this.points[i]) ;
							}) ;
							yTotals[i].join(',').split(',') ;
							$(yTotals[i]).each(function(){
								thisTotal += parseFloat(this) ;
							}) ;
							yTotals[i] = thisTotal ;
						}
						return yTotals ;
					} ,
					topYtotal : function(){
						var topYtotal = 0 ;
						var yTotals = this.yTotals().join(',').split(',') ;
						$(yTotals).each(function(){
							if(parseFloat(this,10)>topYtotal){
								topYtotal = parseFloat(this) ;
							}
						}) ;
						return topYtotal ;
					} ,
					totalYRange : function(){
						return this.topValue() - this.bottomValue() ;
					} ,
					xLabels : function(){
						var xLabels = [] ;
						if(o.parseDirection == 'x'){
							_self.find('tr:eq(0) th').filter(o.colFilter).each(function(){
								xLabels.push($(this).html()) ;
							}) ;
						}else{
							_self.find('tr:gt(0) th').filter(o.rowFilter).each(function(){
								xLabels.push($(this).html()) ;
							}) ;
						}
						return xLabels ;
					} ,
					yLabels : function(){
						var yLabels = [] ;
						yLabels.push(bottomValue) ;
						var numLabels = Math.round(o.height/o.yLabelInterval) ;
						var loopInterval = Math.ceil(totalYRange / numLabels) || 1 ;
						while(yLabels[yLabels.length-1]<topValue - loopInterval){
							yLabels.push(yLabels[yLabels.length - 1] + loopInterval) ;
						}
						yLabels.push(topValue) ;
						return yLabels ;
					}
				} ;
				return tableData ;
			}
			
			//创建图表
			var createChart = {
				pie : function(){
					canvasContain.addClass('visualize-pie') ;
					if(o.pieLabelPos == 'outside'){
						canvasContain.addClass('visualize-pie-outside') ;
					}
					var centerx = Math.round(canvas.width()/2) ;
					var centery = Math.round(canvas.height()/2) ;
					var radius = centery - o.pieMargin ;
					var counter = 0.0 ;
					var toRad = function(integer){
						return (Math.PI/180)*integer ;
					} ;
					var labels = $('<ul class="visualize-labels"></ul>').insertAfter(canvas) ;
					//绘制饼图
					$.each(memberTotals,function(i){
						var fraction = (this <= 0 || isNaN(this))? 0 : this / dataSum ;
						ctx.beginPath() ;
						ctx.moveTo(centerx, centery) ;
						ctx.arc(centerx,centery,radius,counter * Math.PI * 2 - Math.PI * 0.5,(counter + fraction) * Math.PI * 2 - Math.PI * 0.5,false) ;
						ctx.lineTo(centerx, centery) ;
						ctx.closePath() ;
						ctx.fillStyle = dataGroups[i].color ;
						ctx.fill() ;
						// draw labels
						var sliceMiddle = (counter + fraction/2) ;
						var distance = o.pieLabelPos == 'inside' ? radius/1.5 : radius +  radius / 5 ;
						var labelx = Math.round(centerx + Math.sin(sliceMiddle * Math.PI * 2) * (distance)) ;
						var labely = Math.round(centery - Math.cos(sliceMiddle * Math.PI * 2) * (distance)) ;
						var leftRight = (labelx > centerx) ? 'right' : 'left' ;
						var topBottom = (labely > centery) ? 'bottom' : 'top' ;
						var labeltext = $('<span class="visualize-label">' + Math.round(fraction*100) + '%</span>').css(leftRight, 0).css(topBottom, 0);
						var label = $('<li class="visualize-label-pos"></li>').appendTo(labels).css({left: labelx, top: labely}).append(labeltext);	
						labeltext.css('font-size', radius / 8)
								 .css('margin-'+leftRight, -labeltext.width()/2)
								 .css('margin-'+topBottom, -labeltext.outerHeight()/2) ;							
						if(dataGroups[i].textColor){ 
							labeltext.css('color', dataGroups[i].textColor) ; 
						}	
						counter += fraction ;
					}) ;
				} ,
				line : function(area){			
					if(area){ 
						canvasContain.addClass('visualize-area') ; 
					}else{ 
						canvasContain.addClass('visualize-line') ; 
					}				
					//write X labels
					var xInterval = canvas.width() / (xLabels.length -1) ;
					var xlabelsUL = $('<ul class="visualize-labels-x"></ul>').width(canvas.width()).height(canvas.height()).insertBefore(canvas) ;
					$.each(xLabels, function(i){ 
						var thisLi = $('<li><span>'+this+'</span></li>').prepend('<span class="line" />').css('left', xInterval * i).appendTo(xlabelsUL) ;						
						var label = thisLi.find('span:not(.line)') ;
						var leftOffset = label.width()/-2 ;
						if(i==0){ 
							leftOffset = 0 ; 
						}else if(i==xLabels.length-1){ 
							leftOffset = -label.width() ; 
						}
						label.css('margin-left', leftOffset).addClass('label') ;
					});	
					//write Y labels
					var yScale = canvas.height() / totalYRange ;
					var liBottom = canvas.height() / (yLabels.length-1) ;
					var ylabelsUL = $('<ul class="visualize-labels-y"></ul>').width(canvas.width()).height(canvas.height()).insertBefore(canvas) ;						
					$.each(yLabels,function(i){  
						var thisLi = $('<li><span>'+this+'</span></li>').prepend('<span class="line" />').css('bottom',liBottom*i).prependTo(ylabelsUL) ;
						var label = thisLi.find('span:not(.line)') ;
						var topOffset = label.height()/-2 ;
						if(i==0){ 
							topOffset = -label.height() ; 
						}
						else if(i==yLabels.length-1){ 
							topOffset = 0 ; 
						}
						label.css('margin-top', topOffset).addClass('label') ;
					});	
					//start from the bottom left
					ctx.translate(0,zeroLoc) ;
					//iterate and draw
					$.each(dataGroups,function(h){
						ctx.beginPath() ;
						ctx.lineWidth = o.lineWeight ;
						ctx.lineJoin = 'round' ;
						var points = this.points ;
						var integer = 0 ;
						ctx.moveTo(0,-(points[0]*yScale)) ;
						$.each(points,function(){
							ctx.lineTo(integer,-(this*yScale)) ;
							integer += xInterval ;
						});
						ctx.strokeStyle = this.color ;
						ctx.stroke() ;
						if(area){
							ctx.lineTo(integer,0) ;
							ctx.lineTo(0,0) ;
							ctx.closePath() ;
							ctx.fillStyle = this.color ;
							ctx.globalAlpha = .3 ;
							ctx.fill() ;
							ctx.globalAlpha = 1.0 ;
						}else{
							ctx.closePath() ;
						}
					});
				},
				area : function(){
					createChart.line(true) ;
				},
				bar : function(){
					canvasContain.addClass('visualize-bar');
					//write X labels
					var xInterval = canvas.width() / (xLabels.length);
					var xlabelsUL = $('<ul class="visualize-labels-x"></ul>')
						.width(canvas.width())
						.height(canvas.height())
						.insertBefore(canvas);
					$.each(xLabels,function(i){ 
						var thisLi = $('<li><span class="label">'+this+'</span></li>').prepend('<span class="line" />').css('left', xInterval * i).width(xInterval).appendTo(xlabelsUL) ;
						var label = thisLi.find('span.label') ;
						label.addClass('label') ;
					});
					//write Y labels
					var yScale = canvas.height() / totalYRange ;
					var liBottom = canvas.height() / (yLabels.length-1) ;
					var ylabelsUL = $('<ul class="visualize-labels-y"></ul>').width(canvas.width()).height(canvas.height()).insertBefore(canvas);
					$.each(yLabels,function(i){  
						var thisLi = $('<li><span>'+this+'</span></li>').prepend('<span class="line" />').css('bottom',liBottom*i).prependTo(ylabelsUL);
						var label = thisLi.find('span:not(.line)');
						var topOffset = label.height()/-2 ;
						if(i == 0){ 
							topOffset = -label.height() ; 
						}else if(i== yLabels.length-1){ 
							topOffset = 0; 
						}
						label.css('margin-top', topOffset).addClass('label');						
					});
					//start from the bottom left
					ctx.translate(0,zeroLoc) ;
					//iterate and draw
					for(var h=0; h<dataGroups.length; h++){
						ctx.beginPath() ;
						var linewidth = (xInterval-o.barGroupMargin*2) / dataGroups.length ; //removed +1 
						var strokeWidth = linewidth - (o.barMargin*2) ;
						ctx.lineWidth = strokeWidth ;
						var points = dataGroups[h].points ;
						var integer = 0;
						for(var i=0; i<points.length; i++){
							var xVal = (integer-o.barGroupMargin)+(h*linewidth)+linewidth/2 ;
							xVal += o.barGroupMargin*2 ;									
							ctx.moveTo(xVal,0) ;
							ctx.lineTo(xVal,Math.round(-points[i]*yScale)) ;
							integer+=xInterval ;
						}
						ctx.strokeStyle = dataGroups[h].color ;
						ctx.stroke() ;
						ctx.closePath() ;
					}
				}
			} ;
			//create new canvas, set w&h attrs (not inline styles)
			var canvasNode = document.createElement("canvas") ; 
			canvasNode.setAttribute('height',o.height) ;
			canvasNode.setAttribute('width',o.width) ;
			var canvas = $(canvasNode) ;
			//get title for chart
			var title = o.title || _self.find('caption').text() ;
			//create canvas wrapper div, set inline w&h, append
			var canvasContain = (container || $('<div class="visualize" role="img" aria-label="Chart representing data from the table: '+ title +'" />')).height(o.height).width(o.width).append(canvas) ;
			//scrape table (this should be cleaned up into an obj)
			var tableData = scrapeTable() ;
			var dataGroups = tableData.dataGroups() ;
			var allData = tableData.allData() ;
			var dataSum = tableData.dataSum() ;
			var topValue = tableData.topValue() ;
			var bottomValue = tableData.bottomValue() ;
			var memberTotals = tableData.memberTotals() ;
			var totalYRange = tableData.totalYRange() ;
			var zeroLoc = o.height * (topValue/totalYRange) ;
			var xLabels = tableData.xLabels() ;
			var yLabels = tableData.yLabels() ;
			
			//title/key container
			if(o.appendTitle || o.appendKey){
				var infoContain = $('<div class="visualize-info"></div>').appendTo(canvasContain) ;
			}
			//append title
			if(o.appendTitle){
				$('<div class="visualize-title">'+ title +'</div>').appendTo(infoContain) ;
			}
			//append key
			if(o.appendKey){
				var newKey = $('<ul class="visualize-key"></ul>') ;
				var selector ;
				if(o.parseDirection == 'x'){
					selector = _self.find('tr:gt(0) th').filter(o.rowFilter);
				}else{
					selector = _self.find('tr:eq(0) th').filter(o.colFilter);
				}
				_self.find(selector).each(function(i){
					$('<li><span class="visualize-key-color" style="background: '+dataGroups[i].color+'"></span><span class="visualize-key-label">'+ $(this).text() +'</span></li>').appendTo(newKey) ;
				});
				newKey.appendTo(infoContain) ;
				//append new canvas to page		
				if(!container){
					canvasContain.insertAfter(_self);
				}
				if(typeof(G_vmlCanvasManager) != 'undefined'){ 
					G_vmlCanvasManager.initElement(canvas[0]); 
				}					
				//set up the drawing board	
				var ctx = canvas[0].getContext('2d') ;				
				//create chart
				createChart[o.type]() ;
				//clean up some doubled lines that sit on top of canvas borders (done via JS due to IE)
				$('.visualize-line li:first-child span.line, .visualize-line li:last-child span.line, .visualize-area li:first-child span.line, .visualize-area li:last-child span.line, .visualize-bar li:first-child span.line,.visualize-bar .visualize-labels-y li:last-child span.line').css('border','none') ;
				if(!container){
					//add event for updating
					canvasContain.bind('visualizeRefresh', function(){
						_self.visualize(o, $(this).empty()) ; 
					}) ;
				}
			};
			o.customFn() ;//自定义方法调用
		},
		/**
		* @description 清除表格转图表控件
		* @return {tochart} tochart对象
		* @example
		* $("#testExpObj").tochart('destroy');
		*/
		destroy : function(){
			var _self = this.element ;
			var o = this.options ;
			if(_self.next('.visualize').length > 0){
				_self.next('.visualize').remove() ;
			}
		}
	});

	if(!document.createElement("canvas").getContext){
		/*---不支持canvas浏览器处理开始---*/
		document.createElement("canvas").getContext||(function(){var s=Math,j=s.round,F=s.sin,G=s.cos,V=s.abs,W=s.sqrt,k=10,v=k/2;function X(){return this.context_||(this.context_=new H(this))}var L=Array.prototype.slice;function Y(b,a){var c=L.call(arguments,2);return function(){return b.apply(a,c.concat(L.call(arguments)))}}var M={init:function(b){if(/MSIE/.test(navigator.userAgent)&&!window.opera){var a=b||document;a.createElement("canvas");a.attachEvent("onreadystatechange",Y(this.init_,this,a))}},init_:function(b){b.namespaces.g_vml_||
		b.namespaces.add("g_vml_","urn:schemas-microsoft-com:vml","#default#VML");b.namespaces.g_o_||b.namespaces.add("g_o_","urn:schemas-microsoft-com:office:office","#default#VML");if(!b.styleSheets.ex_canvas_){var a=b.createStyleSheet();a.owningElement.id="ex_canvas_";a.cssText="canvas{display:inline-block;overflow:hidden;text-align:left;width:300px;height:150px}g_vml_\\:*{behavior:url(#default#VML)}g_o_\\:*{behavior:url(#default#VML)}"}var c=b.getElementsByTagName("canvas"),d=0;for(;d<c.length;d++)this.initElement(c[d])},
		initElement:function(b){if(!b.getContext){b.getContext=X;b.innerHTML="";b.attachEvent("onpropertychange",Z);b.attachEvent("onresize",$);var a=b.attributes;if(a.width&&a.width.specified)b.style.width=a.width.nodeValue+"px";else b.width=b.clientWidth;if(a.height&&a.height.specified)b.style.height=a.height.nodeValue+"px";else b.height=b.clientHeight}return b}};function Z(b){var a=b.srcElement;switch(b.propertyName){case "width":a.style.width=a.attributes.width.nodeValue+"px";a.getContext().clearRect();
		break;case "height":a.style.height=a.attributes.height.nodeValue+"px";a.getContext().clearRect();break}}function $(b){var a=b.srcElement;if(a.firstChild){a.firstChild.style.width=a.clientWidth+"px";a.firstChild.style.height=a.clientHeight+"px"}}M.init();var N=[],B=0;for(;B<16;B++){var C=0;for(;C<16;C++)N[B*16+C]=B.toString(16)+C.toString(16)}function I(){return[[1,0,0],[0,1,0],[0,0,1]]}function y(b,a){var c=I(),d=0;for(;d<3;d++){var f=0;for(;f<3;f++){var h=0,g=0;for(;g<3;g++)h+=b[d][g]*a[g][f];c[d][f]=
		h}}return c}function O(b,a){a.fillStyle=b.fillStyle;a.lineCap=b.lineCap;a.lineJoin=b.lineJoin;a.lineWidth=b.lineWidth;a.miterLimit=b.miterLimit;a.shadowBlur=b.shadowBlur;a.shadowColor=b.shadowColor;a.shadowOffsetX=b.shadowOffsetX;a.shadowOffsetY=b.shadowOffsetY;a.strokeStyle=b.strokeStyle;a.globalAlpha=b.globalAlpha;a.arcScaleX_=b.arcScaleX_;a.arcScaleY_=b.arcScaleY_;a.lineScale_=b.lineScale_}function P(b){var a,c=1;b=String(b);if(b.substring(0,3)=="rgb"){var d=b.indexOf("(",3),f=b.indexOf(")",d+
		1),h=b.substring(d+1,f).split(",");a="#";var g=0;for(;g<3;g++)a+=N[Number(h[g])];if(h.length==4&&b.substr(3,1)=="a")c=h[3]}else a=b;return{color:a,alpha:c}}function aa(b){switch(b){case "butt":return"flat";case "round":return"round";case "square":default:return"square"}}function H(b){this.m_=I();this.mStack_=[];this.aStack_=[];this.currentPath_=[];this.fillStyle=this.strokeStyle="#000";this.lineWidth=1;this.lineJoin="miter";this.lineCap="butt";this.miterLimit=k*1;this.globalAlpha=1;this.canvas=b;
		var a=b.ownerDocument.createElement("div");a.style.width=b.clientWidth+"px";a.style.height=b.clientHeight+"px";a.style.overflow="hidden";a.style.position="absolute";b.appendChild(a);this.element_=a;this.lineScale_=this.arcScaleY_=this.arcScaleX_=1}var i=H.prototype;i.clearRect=function(){this.element_.innerHTML=""};i.beginPath=function(){this.currentPath_=[]};i.moveTo=function(b,a){var c=this.getCoords_(b,a);this.currentPath_.push({type:"moveTo",x:c.x,y:c.y});this.currentX_=c.x;this.currentY_=c.y};
		i.lineTo=function(b,a){var c=this.getCoords_(b,a);this.currentPath_.push({type:"lineTo",x:c.x,y:c.y});this.currentX_=c.x;this.currentY_=c.y};i.bezierCurveTo=function(b,a,c,d,f,h){var g=this.getCoords_(f,h),l=this.getCoords_(b,a),e=this.getCoords_(c,d);Q(this,l,e,g)};function Q(b,a,c,d){b.currentPath_.push({type:"bezierCurveTo",cp1x:a.x,cp1y:a.y,cp2x:c.x,cp2y:c.y,x:d.x,y:d.y});b.currentX_=d.x;b.currentY_=d.y}i.quadraticCurveTo=function(b,a,c,d){var f=this.getCoords_(b,a),h=this.getCoords_(c,d),g={x:this.currentX_+
		0.6666666666666666*(f.x-this.currentX_),y:this.currentY_+0.6666666666666666*(f.y-this.currentY_)};Q(this,g,{x:g.x+(h.x-this.currentX_)/3,y:g.y+(h.y-this.currentY_)/3},h)};i.arc=function(b,a,c,d,f,h){c*=k;var g=h?"at":"wa",l=b+G(d)*c-v,e=a+F(d)*c-v,m=b+G(f)*c-v,r=a+F(f)*c-v;if(l==m&&!h)l+=0.125;var n=this.getCoords_(b,a),o=this.getCoords_(l,e),q=this.getCoords_(m,r);this.currentPath_.push({type:g,x:n.x,y:n.y,radius:c,xStart:o.x,yStart:o.y,xEnd:q.x,yEnd:q.y})};i.rect=function(b,a,c,d){this.moveTo(b,
		a);this.lineTo(b+c,a);this.lineTo(b+c,a+d);this.lineTo(b,a+d);this.closePath()};i.strokeRect=function(b,a,c,d){var f=this.currentPath_;this.beginPath();this.moveTo(b,a);this.lineTo(b+c,a);this.lineTo(b+c,a+d);this.lineTo(b,a+d);this.closePath();this.stroke();this.currentPath_=f};i.fillRect=function(b,a,c,d){var f=this.currentPath_;this.beginPath();this.moveTo(b,a);this.lineTo(b+c,a);this.lineTo(b+c,a+d);this.lineTo(b,a+d);this.closePath();this.fill();this.currentPath_=f};i.createLinearGradient=function(b,
		a,c,d){var f=new D("gradient");f.x0_=b;f.y0_=a;f.x1_=c;f.y1_=d;return f};i.createRadialGradient=function(b,a,c,d,f,h){var g=new D("gradientradial");g.x0_=b;g.y0_=a;g.r0_=c;g.x1_=d;g.y1_=f;g.r1_=h;return g};i.drawImage=function(b){var a,c,d,f,h,g,l,e,m=b.runtimeStyle.width,r=b.runtimeStyle.height;b.runtimeStyle.width="auto";b.runtimeStyle.height="auto";var n=b.width,o=b.height;b.runtimeStyle.width=m;b.runtimeStyle.height=r;if(arguments.length==3){a=arguments[1];c=arguments[2];h=g=0;l=d=n;e=f=o}else if(arguments.length==
		5){a=arguments[1];c=arguments[2];d=arguments[3];f=arguments[4];h=g=0;l=n;e=o}else if(arguments.length==9){h=arguments[1];g=arguments[2];l=arguments[3];e=arguments[4];a=arguments[5];c=arguments[6];d=arguments[7];f=arguments[8]}else throw Error("Invalid number of arguments");var q=this.getCoords_(a,c),t=[];t.push(" <g_vml_:group",' coordsize="',k*10,",",k*10,'"',' coordorigin="0,0"',' style="width:',10,"px;height:",10,"px;position:absolute;");if(this.m_[0][0]!=1||this.m_[0][1]){var E=[];E.push("M11=",
		this.m_[0][0],",","M12=",this.m_[1][0],",","M21=",this.m_[0][1],",","M22=",this.m_[1][1],",","Dx=",j(q.x/k),",","Dy=",j(q.y/k),"");var p=q,z=this.getCoords_(a+d,c),w=this.getCoords_(a,c+f),x=this.getCoords_(a+d,c+f);p.x=s.max(p.x,z.x,w.x,x.x);p.y=s.max(p.y,z.y,w.y,x.y);t.push("padding:0 ",j(p.x/k),"px ",j(p.y/k),"px 0;filter:progid:DXImageTransform.Microsoft.Matrix(",E.join(""),", sizingmethod='clip');")}else t.push("top:",j(q.y/k),"px;left:",j(q.x/k),"px;");t.push(' ">','<g_vml_:image src="',b.src,
		'"',' style="width:',k*d,"px;"," height:",k*f,'px;"',' cropleft="',h/n,'"',' croptop="',g/o,'"',' cropright="',(n-h-l)/n,'"',' cropbottom="',(o-g-e)/o,'"'," />","</g_vml_:group>");this.element_.insertAdjacentHTML("BeforeEnd",t.join(""))};i.stroke=function(b){var a=[],c=P(b?this.fillStyle:this.strokeStyle),d=c.color,f=c.alpha*this.globalAlpha;a.push("<g_vml_:shape",' filled="',!!b,'"',' style="position:absolute;width:',10,"px;height:",10,'px;"',' coordorigin="0 0" coordsize="',k*10," ",k*10,'"',' stroked="',
		!b,'"',' path="');var h={x:null,y:null},g={x:null,y:null},l=0;for(;l<this.currentPath_.length;l++){var e=this.currentPath_[l];switch(e.type){case "moveTo":a.push(" m ",j(e.x),",",j(e.y));break;case "lineTo":a.push(" l ",j(e.x),",",j(e.y));break;case "close":a.push(" x ");e=null;break;case "bezierCurveTo":a.push(" c ",j(e.cp1x),",",j(e.cp1y),",",j(e.cp2x),",",j(e.cp2y),",",j(e.x),",",j(e.y));break;case "at":case "wa":a.push(" ",e.type," ",j(e.x-this.arcScaleX_*e.radius),",",j(e.y-this.arcScaleY_*e.radius),
		" ",j(e.x+this.arcScaleX_*e.radius),",",j(e.y+this.arcScaleY_*e.radius)," ",j(e.xStart),",",j(e.yStart)," ",j(e.xEnd),",",j(e.yEnd));break}if(e){if(h.x==null||e.x<h.x)h.x=e.x;if(g.x==null||e.x>g.x)g.x=e.x;if(h.y==null||e.y<h.y)h.y=e.y;if(g.y==null||e.y>g.y)g.y=e.y}}a.push(' ">');if(b)if(typeof this.fillStyle=="object"){var m=this.fillStyle,r=0,n={x:0,y:0},o=0,q=1;if(m.type_=="gradient"){var t=m.x1_/this.arcScaleX_,E=m.y1_/this.arcScaleY_,p=this.getCoords_(m.x0_/this.arcScaleX_,m.y0_/this.arcScaleY_),
		z=this.getCoords_(t,E);r=Math.atan2(z.x-p.x,z.y-p.y)*180/Math.PI;if(r<0)r+=360;if(r<1.0E-6)r=0}else{var p=this.getCoords_(m.x0_,m.y0_),w=g.x-h.x,x=g.y-h.y;n={x:(p.x-h.x)/w,y:(p.y-h.y)/x};w/=this.arcScaleX_*k;x/=this.arcScaleY_*k;var R=s.max(w,x);o=2*m.r0_/R;q=2*m.r1_/R-o}var u=m.colors_;u.sort(function(ba,ca){return ba.offset-ca.offset});var J=u.length,da=u[0].color,ea=u[J-1].color,fa=u[0].alpha*this.globalAlpha,ga=u[J-1].alpha*this.globalAlpha,S=[],l=0;for(;l<J;l++){var T=u[l];S.push(T.offset*q+
		o+" "+T.color)}a.push('<g_vml_:fill type="',m.type_,'"',' method="none" focus="100%"',' color="',da,'"',' color2="',ea,'"',' colors="',S.join(","),'"',' opacity="',ga,'"',' g_o_:opacity2="',fa,'"',' angle="',r,'"',' focusposition="',n.x,",",n.y,'" />')}else a.push('<g_vml_:fill color="',d,'" opacity="',f,'" />');else{var K=this.lineScale_*this.lineWidth;if(K<1)f*=K;a.push("<g_vml_:stroke",' opacity="',f,'"',' joinstyle="',this.lineJoin,'"',' miterlimit="',this.miterLimit,'"',' endcap="',aa(this.lineCap),
		'"',' weight="',K,'px"',' color="',d,'" />')}a.push("</g_vml_:shape>");this.element_.insertAdjacentHTML("beforeEnd",a.join(""))};i.fill=function(){this.stroke(true)};i.closePath=function(){this.currentPath_.push({type:"close"})};i.getCoords_=function(b,a){var c=this.m_;return{x:k*(b*c[0][0]+a*c[1][0]+c[2][0])-v,y:k*(b*c[0][1]+a*c[1][1]+c[2][1])-v}};i.save=function(){var b={};O(this,b);this.aStack_.push(b);this.mStack_.push(this.m_);this.m_=y(I(),this.m_)};i.restore=function(){O(this.aStack_.pop(),
		this);this.m_=this.mStack_.pop()};function ha(b){var a=0;for(;a<3;a++){var c=0;for(;c<2;c++)if(!isFinite(b[a][c])||isNaN(b[a][c]))return false}return true}function A(b,a,c){if(!!ha(a)){b.m_=a;if(c)b.lineScale_=W(V(a[0][0]*a[1][1]-a[0][1]*a[1][0]))}}i.translate=function(b,a){A(this,y([[1,0,0],[0,1,0],[b,a,1]],this.m_),false)};i.rotate=function(b){var a=G(b),c=F(b);A(this,y([[a,c,0],[-c,a,0],[0,0,1]],this.m_),false)};i.scale=function(b,a){this.arcScaleX_*=b;this.arcScaleY_*=a;A(this,y([[b,0,0],[0,a,
		0],[0,0,1]],this.m_),true)};i.transform=function(b,a,c,d,f,h){A(this,y([[b,a,0],[c,d,0],[f,h,1]],this.m_),true)};i.setTransform=function(b,a,c,d,f,h){A(this,[[b,a,0],[c,d,0],[f,h,1]],true)};i.clip=function(){};i.arcTo=function(){};i.createPattern=function(){return new U};function D(b){this.type_=b;this.r1_=this.y1_=this.x1_=this.r0_=this.y0_=this.x0_=0;this.colors_=[]}D.prototype.addColorStop=function(b,a){a=P(a);this.colors_.push({offset:b,color:a.color,alpha:a.alpha})};function U(){}G_vmlCanvasManager=
		M;CanvasRenderingContext2D=H;CanvasGradient=D;CanvasPattern=U})();
		/*---不支持canvas浏览器处理结束---*/
	}
	$.extend($.fn.tochart, {
		version: "1.3"
	});
})(jQuery);