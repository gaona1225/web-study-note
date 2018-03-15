// JavaScript Document
$(function () {
	var chart = new Highcharts.Chart({
		chart: {
			renderTo: 'managechart',
			zoomType: 'xy',
			spacingTop:0,
			spacingLeft:1,
			spacingRight:0,
			spacingBottom:2
		},
		title: {
			text: 'manage chart', //主标题在这里设置
			style: {   //此处设置标题的样式
			color: '#2d2d2d',
			fontSize: '12px',
			fontFamily: '微软雅黑, 黑体'
			}
			
		},
		subtitle: {
			text: ''//副标题在这里设置
		},
		xAxis: [{
			categories: ['1-3季度', '4-6季度', '7-9季度', '10-12季度' ],
			tickLength:2,//x轴分隔符的长度
			labels:{
				step:1,  //x轴分类标签的步长
				staggerLines:1 //错开的级数，呈梯状
			}
			
		}],
		yAxis: [{ // Primary yAxis
			title:{
				text:''	
			},
			labels: {
				formatter: function() {
					return this.value+'千万';//格式化y轴坐标
				},
				style: {
					color: '#89A500',
					fontSize: '6px',
					fontFamily: '微软雅黑, 黑体',
					margin:0
				},
				y:3
			},
			offset:-4

			}, { // Secondary yAxis
			title: {
				text: 'rain height',
				style: {
					color: '#4572A7',
					fontSize: '6px',
					fontFamily: '微软雅黑, 黑体'
				},
				margin:4
			},
			labels: {
				formatter: function() {
					return this.value +'mm';
				},
				style: {
					color: '#4572A7',
					fontSize: '6px',
					fontFamily: '微软雅黑, 黑体'
				},
				y:3
			},
			opposite: true,
			offset:-6
			
		}],//yAxis option end
		tooltip: {//温度的tooltip触发
			formatter: function() {
				return ''+
					this.x +': '+ this.y +
					(this.series.name == 'Rainhh' ? ' mm' : '千万');
			},
			shadow:false
		},
		legend: {
			layout: 'vertical',//定义图例的排列方式
			align: 'left',
			verticalAlign: 'top',
			x: 25,
			y: 30,
			floating: true,
			backgroundColor: '#FFFFFF',
			style:{
				fontSize: '6px'
			},
			symbolWidth: 15,
			symbolPadding:3  //图例标题的符号部分
		},
		plotOptions:{//设不不同形式图表的线条样式
			 spline:{//定义曲线的线条样式
					lineWidth:2 ,//定义线条宽度
					marker:{
						lineWidth: 1,//定义线条上数据点的大小
						symbol:'diamond'  //可选项：'circle','diamond','square','triangle','triangle-down'
						
					},
					shadow:false
					
				},
				column:{
					pointWidth:20 , //定义柱形条的显示宽度
					shadow:false
					}
		},
		series: [{
			name: 'Rainhh',//定义图例的/数据节点的名字
			color: '#4572A7',//控制series的颜色
			type: 'column',//指定序列的显示类型
			yAxis: 1,//指定两侧的legend使用不同的数据，默认值就是0，表示左侧的legend所代表的series
			data: [45, 97, 245, 187]
		}, {
			yAxis: 0,
			name: 'benefit',
			color: '#89A54E',
			type: 'spline',
			data: [68, 167, 43, 145]
		}],
		credits:{
			enabled: false
		}
		
	});
	
	var chart2 = new Highcharts.Chart({
		chart: {
			renderTo: 'healthIndex',
			zoomType: 'xy',
			spacingTop:0,
			spacingLeft:1,
			spacingRight:0,
			spacingBottom:2
		},
		title: {
			text: 'manage chart', //主标题在这里设置
			style: {   //此处设置标题的样式
			color: '#2d2d2d',
			fontSize: '12px',
			fontFamily: '微软雅黑, 黑体'
			}
			
		},
		subtitle: {
			text: ''//副标题在这里设置
		},
		xAxis: [{
			categories: ['1-3季度', '4-6季度', '7-9季度', '10-12季度' ],
			tickLength:2,//x轴分隔符的长度
			labels:{
				step:1,  //x轴分类标签的步长
				staggerLines:1 //错开的级数，呈梯状
			}
			
		}],
		yAxis: [{ // Primary yAxis
			title:{
				text:''	
			},
			labels: {
				formatter: function() {
					return this.value+'千万';//格式化y轴坐标
				},
				style: {
					color: '#89A500',
					fontSize: '6px',
					fontFamily: '微软雅黑, 黑体',
					margin:0
				},
				y:3
			},
			offset:-4

			}, { // Secondary yAxis
			title: {
				text: 'rain height',
				style: {
					color: '#4572A7',
					fontSize: '6px',
					fontFamily: '微软雅黑, 黑体'
				},
				margin:4
			},
			labels: {
				formatter: function() {
					return this.value +'mm';
				},
				style: {
					color: '#4572A7',
					fontSize: '6px',
					fontFamily: '微软雅黑, 黑体'
				},
				y:3
			},
			opposite: true,
			offset:-6
			
		}],//yAxis option end
		tooltip: {//温度的tooltip触发
			formatter: function() {
				return ''+
					this.x +': '+ this.y +
					(this.series.name == 'Rainhh' ? ' mm' : '千万');
			},
			shadow:false
		},
		legend: {
			layout: 'vertical',//定义图例的排列方式
			align: 'left',
			verticalAlign: 'top',
			x: 25,
			y: 30,
			floating: true,
			backgroundColor: '#FFFFFF',
			style:{
				fontSize: '6px'
			},
			symbolWidth: 15,
			symbolPadding:3  //图例标题的符号部分
		},
		plotOptions:{
			column:{
				pointWidth:20 , //定义柱形条的显示宽度
				shadow:false
			}
		},
		series: [{
			name: 'Rainhh',//定义图例的/数据节点的名字
			color: '#4572A7',//控制series的颜色
			type: 'bar',//指定序列的显示类型
			yAxis: 1,//指定两侧的legend使用不同的数据，默认值就是0，表示左侧的legend所代表的series
			data: [45, 97, 245, 187]
		}],
		credits:{
			enabled: false
		}
		
	});
});