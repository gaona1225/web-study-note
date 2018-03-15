/*
 * jCal calendar multi-day and multi-month datepicker plugin for jQuery
 *	version 0.3.6
 * Author: Jim Palmer
 * Released under MIT license.
 */
(function($) {
	$.fn.jCal = function (opt) {
		$.jCal(this, opt);
	};
	$.jCal = function (target, opt) {
		opt = $.extend({
			day:			new Date(),									// date to drive first cal
			days:			1,											// default number of days user can select
			showMonths:		1,											// how many side-by-side months to show
			monthSelect:	false,										// show selectable month and year ranges via animated comboboxen
			dCheck:			function (day) { return true; },			// handler for checking if single date is valid or not
			callback:		function (day, days) { return true; },		// callback function for click on date
			selectedBG:		'rgb(0, 143, 214)',							// default bgcolor for selected date cell
			defaultBG:		'rgb(255, 255, 255)',						// default bgcolor for unselected date cell
			dayOffset:		0,											// 0=week start with sunday, 1=week starts with monday
			forceWeek:		false,										// true=force selection at start of week, false=select days out from selected day
			dow:			['日', '一', '二', '三', '四', '五', '六'],		// days of week - change this to reflect your dayOffset
			ml:				['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
			_target:		target										// target DOM element - no need to set extend this variable
		}, opt);
		opt.day = new Date(opt.day.getFullYear(), opt.day.getMonth(), 1);
		if ( !$(opt._target).data('days') ) $(opt._target).data('days', opt.days);
		$(target).stop().empty();
		for (var sm=0; sm < opt.showMonths; sm++)
			$(target).append('<div class="jCalMo"></div>');
		opt.cID = 'c' + $('.jCalMo').length;
		$('.jCalMo', target).each(
			function (ind) {
				drawCalControl($(this), $.extend( {}, opt, { 'ind':ind, 
						'day':new Date( new Date( opt.day.getTime() ).setMonth( new Date( opt.day.getTime() ).getMonth() + ind ) ) }
					));
				drawCal($(this), $.extend( {}, opt, { 'ind':ind, 
						'day':new Date( new Date( opt.day.getTime() ).setMonth( new Date( opt.day.getTime() ).getMonth() + ind ) ) }
					));
			});
		if ( $(opt._target).data('day') && $(opt._target).data('days') ) 
			reSelectDates(target, $(opt._target).data('day'), $(opt._target).data('days'), opt);
	};
	function drawCalControl (target, opt) {
		$(target).append(
			'<div class="jCal">' + 
					( (opt.ind == 0) ? '<div class="left" />' : '' ) + 
					'<div class="month">' + 
						'<span class="monthYear">' + opt.day.getFullYear() + '</span>' +
						'<span class="monthName">' + opt.ml[opt.day.getMonth()] + '<input type = "hidden"  id ="monthName" value = "'+opt.day.getMonth()+'"></span>&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;' +
					'</div>' +
					( (opt.ind == ( opt.showMonths - 1 )) ? '<div class="right" />' : '' ) +
			'</div>');
		if ( opt.monthSelect )
			$(target).find('.jCal .monthName, .jCal .monthYear')
				.bind('mouseover', $.extend( {}, opt ),
					function (e) { 
						$(this).removeClass('monthYearHover').removeClass('monthNameHover');
						if ( $('.jCalMask', e.data._target).length == 0 ) $(this).addClass( $(this).attr('class') + 'Hover' );
					})
				.bind('mouseout', function () { 
						$(this).removeClass('monthYearHover').removeClass('monthNameHover'); 
					})
				.bind('click', $.extend( {}, opt ),
					function (e) {
						$('.jCalMo .monthSelector, .jCalMo .monthSelectorShadow').remove();
						var monthName = $(this).hasClass('monthName'),
							pad = Math.max( parseInt($(this).css('padding-left')), parseInt($(this).css('padding-left'))) || 2, 
							calcTop = ( ($(this).offset()).top - ( ( monthName ? e.data.day.getMonth() : 2 ) * ( $(this).height() + 0 ) ) );
						calcTop = calcTop > 0 ? calcTop : 0;
						var topDiff = ($(this).offset()).top - calcTop;
						$('<div class="monthSelectorShadow" style="' +
							'top:' + $(e.data._target).offset().top + 'px; ' +
							'left:' + $(e.data._target).offset().left + 'px; ' +
							'width:' + ( $(e.data._target).width() + ( parseInt($(e.data._target).css('paddingLeft')) || 0 ) + ( parseInt($(e.data._target).css('paddingRight')) || 0 ) ) + 'px; ' +
							'height:' + ( $(e.data._target).height() + ( parseInt($(e.data._target).css('paddingTop')) || 0 ) + ( parseInt($(e.data._target).css('paddingBottom')) || 0 ) ) + 'px;">' +
						'</div>')
							.css('opacity',0.01).appendTo( $(this).parent() );
						$('<div class="monthSelector" style="border:1px solid #E6E6E6; ' +
							'top:' + calcTop + 'px; ' +
							'left:' + ( ($(this).offset()).left ) + 'px; ' +
							'width:' + ( $(this).width() + ( pad * 2 ) -1) + 'px;">' +
						'</div>')
							.css('opacity',0.88).appendTo( $(this).parent() );
						for (var di = ( monthName ? 0 : -2 ), dd = ( monthName ? 12 : 3 ); di < dd; di++)
							$(this).clone().removeClass('monthYearHover').removeClass('monthNameHover').addClass('monthSelect')
								.attr( 'id', monthName ? (di + 1) + '_1_' + e.data.day.getFullYear() : (e.data.day.getMonth() + 1) + '_1_' + (e.data.day.getFullYear() + di) )
								.html( monthName ? e.data.ml[di] : ( e.data.day.getFullYear() + di ) )
								.css( 'top', ( $(this).height() * di ) ).appendTo( $(this).parent().find('.monthSelector') );
						var moSel = $(this).parent().find('.monthSelector').get(0), diffOff = $(moSel).height() - ( $(moSel).height() - topDiff );
						$(moSel)
							//.css('clip','rect(' + diffOff + 'px ' + ( $(this).width() + ( pad * 2 ) ) + 'px '+ diffOff + 'px 0px)')
							.animate({'opacity':.92//,
							// 	'clip':'rect(0px ' + ( $(this).width() + ( pad * 2 ) ) + 'px ' + $(moSel).height() + 'px 0px)'
							 		}, 'fast', function () {
									$(this).parent().find('.monthSelectorShadow').bind('mouseover click', function () { $(this).parent().find('.monthSelector').remove(); $(this).remove(); });
								})
							.parent().find('.monthSelectorShadow').animate({'opacity':.1}, 'fast');
						$('.jCalMo .monthSelect', e.data._target).bind('mouseover mouseout click', $.extend( {}, e.data ), 
							function (e) {
								if ( e.type == 'click' ){
									$(e.data._target).jCal( $.extend(e.data, {day:new Date($(this).attr('id').replace(/_/g, '/'))}) );
										/*---------------点击选择月份或者你年份-------------------*/
										var $con = $("div#calOne");
										var $jCal = $con.find("div.jCalMo");
										$con.css("height",$jCal.height());
										if(new Date().getMonth()!= e.data.day.getMonth()){ //不是当月
											$(".invday").addClass("day");
											$(".invday").removeClass("invday");
										}
										//outerInterface()
										/*
										 * @2012-4-5 如果不是当前年份，去掉invday当天的样式。
										 * @2012-4-5 去掉原来所有的选中样式
										 * added by huanghui@2012-4-1 当点击月份或者年份的时候，日历的样式进行相应的交互变化。 
										 * ***/
										if(new Date().getFullYear()!= e.data.day.getFullYear()){
											$(".invday").addClass("day");
											$(".invday").removeClass("invday");
										}	
										$(".day").removeClass("selectedDay").removeClass('selectedScheduleDay');
										$(".invday").removeClass('selectedCurDay').removeClass("selectedScheduleDay");
										var year = $($('span.monthYear')[0]).text();
										var mouth = $("#monthName").val();
										mouth = parseInt(mouth.toString())+1;	
										outerInterface(year,mouth);	
										//added end
										/*----------------------------------*/
								}
								else
									$(this).toggleClass('monthSelectHover');
							});
					});
					
		$(target).find('.jCal .left').bind('click', $.extend( {}, opt ),
			function (e) {
				if ($('.jCalMask', e.data._target).length > 0) return false;
				var mD = { w:0, h:0 };
				$('.jCalMo', e.data._target).each( function () { 
						mD.w += $(this).width() + parseInt($(this).css('padding-left')) + parseInt($(this).css('padding-right')); 
						var cH = $(this).height() + parseInt($(this).css('padding-top')) + parseInt($(this).css('padding-bottom')); 
						mD.h = ((cH > mD.h) ? cH : mD.h);
					} );
				$(e.data._target).prepend('<div class="jCalMo"></div>');
				e.data.day = new Date( $('div[id*=' + e.data.cID + 'd_]:first', e.data._target).attr('id').replace(e.data.cID + 'd_', '').replace(/_/g, '/') );
				e.data.day.setDate(1);
				e.data.day.setMonth( e.data.day.getMonth() - 1 );
				drawCalControl($('.jCalMo:first', e.data._target), e.data);
				drawCal($('.jCalMo:first', e.data._target), e.data);
				if (e.data.showMonths > 1) {
					$('.right', e.data._target).clone(true).appendTo( $('.jCalMo:eq(1) .jCal', e.data._target) );
					$('.left:last, .right:last', e.data._target).remove();
				}
				$(e.data._target).append('<div class="jCalSpace" style="width:'+mD.w+'px; height:'+mD.h+'px;"></div>');
				$('.jCalMo', e.data._target).wrapAll(
					'<div class="jCalMask" style="clip:rect(0px '+mD.w+'px '+mD.h+'px 0px); width:'+ ( mD.w + ( mD.w / e.data.showMonths ) ) +'px; height:'+mD.h+'px;">' + 
						'<div class="jCalMove"></div>' +
					'</div>');
				$('.jCalMove', e.data._target).css('margin-left', ( ( mD.w / e.data.showMonths ) * -1 ) + 'px').css('opacity', 0.5).animate({ marginLeft:'0px' }, 'fast',
					function () {
						$(this).children('.jCalMo:not(:last)').appendTo( $(e.data._target) );
						$('.jCalSpace, .jCalMask', e.data._target).empty().remove();
						if ( $(e.data._target).data('day') ) 
							reSelectDates(e.data._target, $(e.data._target).data('day'), $(e.data._target).data('days'), e.data);
							/*---------------点击向左翻月-------------------*/
							var $con = $("div#calOne");
							var $jCal = $con.find("div.jCalMo");
							$con.css("height",$jCal.height());
							if(new Date().getMonth()!= e.data.day.getMonth()){
									$(".invday").addClass("day");
									$(".invday").removeClass("invday");
								}
							//added by huanghui@2012-4-5 去掉原来的选中样式
							$(".day").removeClass("selectedDay").removeClass('selectedScheduleDay');
							$(".invday").removeClass('selectedCurDay').removeClass("selectedScheduleDay");
							//added by huanghui@2012-4-1 	点击向左翻月，样式修改	
							//outerInterface();			
							var year = $($('span.monthYear')[0]).text();
							var mouth = $("#monthName").val();
							mouth = parseInt(mouth.toString())+1;	
							outerInterface(year,mouth);
							//end
							
							/*----------------------------------*/
					});
			});

		$(target).find('.jCal .right').bind('click', $.extend( {}, opt ),
			function (e) {
				if ($('.jCalMask', e.data._target).length > 0) return false;
				var mD = { w:0, h:0 };
				$('.jCalMo', e.data._target).each( function () { 
						mD.w += $(this).width() + parseInt($(this).css('padding-left')) + parseInt($(this).css('padding-right')); 
						var cH = $(this).height() + parseInt($(this).css('padding-top')) + parseInt($(this).css('padding-bottom')); 
						mD.h = ((cH > mD.h) ? cH : mD.h);
					} );
				$(e.data._target).append('<div class="jCalMo"></div>');
				e.data.day = new Date( $('div[id^=' + e.data.cID + 'd_]:last', e.data._target).attr('id').replace(e.data.cID + 'd_', '').replace(/_/g, '/') );
				e.data.day.setDate(1);
				e.data.day.setMonth( e.data.day.getMonth() + 1 );
				drawCalControl($('.jCalMo:last', e.data._target), e.data);
				drawCal($('.jCalMo:last', e.data._target), e.data);
				if (e.data.showMonths > 1) {
					$('.left', e.data._target).clone(true).prependTo( $('.jCalMo:eq(1) .jCal', e.data._target) );
					$('.left:first, .right:first', e.data._target).remove();
				}
				$(e.data._target).append('<div class="jCalSpace" style="width:'+mD.w+'px; height:'+mD.h+'px;"></div>');
				$('.jCalMo', e.data._target).wrapAll(
					'<div class="jCalMask" style="clip:rect(0px '+mD.w+'px '+mD.h+'px 0px); width:'+ ( mD.w + ( mD.w / e.data.showMonths ) ) +'px; height:'+mD.h+'px;">' + 
						'<div class="jCalMove"></div>' +
					'</div>');
				$('.jCalMove', e.data._target).css('opacity', 0.5).animate({ marginLeft:( ( mD.w / e.data.showMonths ) * -1 ) + 'px' }, 'fast',
					function () {
						$(this).children('.jCalMo:not(:first)').appendTo( $(e.data._target) );
						$('.jCalSpace, .jCalMask', e.data._target).empty().remove();
						if ( $(e.data._target).data('day') ) 
							reSelectDates(e.data._target, $(e.data._target).data('day'), $(e.data._target).data('days'), e.data);
						$(this).children('.jCalMo:not(:first)').removeClass('');
						
							/*-----------------点击向右翻月-----------------*/
							var $con = $("div#calOne");
							var $jCal = $con.find("div.jCalMo");
							$con.css("height",$jCal.height());
							if(new Date().getMonth()!= e.data.day.getMonth()){
								$(".invday").addClass("day");
								$(".invday").removeClass("invday");
							}
							//added by huanghui@2012-4-5 去掉原来的选中样式
							$(".day").removeClass("selectedDay").removeClass('selectedScheduleDay');
							$(".invday").removeClass('selectedCurDay').removeClass("selectedScheduleDay");
							//added by huanghui@2012-4-1 点击向右翻月，样式修改
							//outerInterface();
							var year = $($('span.monthYear')[0]).text();
							var mouth = $("#monthName").val();
							mouth = parseInt(mouth.toString())+1;	
							outerInterface(year,mouth);
							//end
							/*----------------------------------*/
					});
			});
		$('.jCal', target).each(
			function () {
				var width = $(this).parent().width() - ( $('.left', this).width() || 0 ) - ( $('.right', this).width() || 0 );
				$('.month', this).css({'width': width}).find('.monthName, .monthYear').css('width', ((width / 2) - 20 ));
			});
		$(window).load(
			function () {
				$('.jCal', target).each(
					function () {
						var width = $(this).parent().width() - ( $('.left', this).width() || 0 ) - ( $('.right', this).width() || 0 );
						$('.month', this).css({'width': width}).find('.monthName, .monthYear').css('width', ((width / 2) - 20));
						/*----------------页面加载------------------*/
							//added by huanghui@2012-4-1 页面加载，样式加载
							//outerInterface()
							var date = new Date();
							var year = date.getFullYear();
							var month = (date.getMonth()+1);
							outerInterface(year,month);
							//added end
						/*----------------------------------*/
					});
			});
	};	
	function reSelectDates (target, day, days, opt) {
		var fDay = new Date(day.getTime());
		var sDay = new Date(day.getTime());
		for (var fC = false, di = 0, dC = days; di < dC; di++) {
			var dF = $(target).find('div[id*=d_' + (sDay.getMonth() + 1) + '_' + sDay.getDate() + '_' + sDay.getFullYear() + ']');
			if ( dF.length > 0 ) {
				dF.stop().addClass('selectedDay');
				fC = true;
			}
			sDay.setDate( sDay.getDate() + 1 );
		}
		if ( fC && typeof opt.callback == 'function' ) opt.callback( day, days );
	};
	function drawCal (target, opt) {
		for (var ds=0, length=opt.dow.length; ds < length; ds++)
			$(target).append('<div class="dow">' + opt.dow[ds] + '</div>');
		var fd = new Date( new Date( opt.day.getTime() ).setDate(1) );
		var ldlm = new Date( new Date( fd.getTime() ).setDate(0) );
		var ld = new Date( new Date( new Date( fd.getTime() ).setMonth( fd.getMonth() + 1 ) ).setDate(0) );
		var copt = {fd:fd.getDay(), lld:ldlm.getDate(), ld:ld.getDate()};
		var offsetDayStart = ( ( copt.fd < opt.dayOffset ) ? ( opt.dayOffset - 7 ) : 1 );
		var offsetDayEnd = ( ( ld.getDay() < opt.dayOffset ) ? ( 7 - ld.getDay() ) : ld.getDay() );
	
		for ( var d = offsetDayStart, dE = ( copt.fd + copt.ld + ( 7 - offsetDayEnd ) ); d < dE; d++)
			$(target).append(
				(( d <= ( copt.fd - opt.dayOffset ) ) ? 
					'<div id="' + opt.cID + 'd' + d + '" class="pday">' + ( copt.lld - ( ( copt.fd - opt.dayOffset ) - d ) ) + '</div>' 
					: ( ( d > ( ( copt.fd - opt.dayOffset ) + copt.ld ) ) ?
						'<div id="' + opt.cID + 'd' + d + '" class="aday">' + ( d - ( ( copt.fd - opt.dayOffset ) + copt.ld ) ) + '</div>' 
						: '<div id="' + opt.cID + 'd_' + (fd.getMonth() + 1) + '_' + ( d - ( copt.fd - opt.dayOffset ) ) + '_' + fd.getFullYear() + '" class="' +
							( ( opt.dCheck( new Date( (new Date( fd.getTime() )).setDate( d - ( copt.fd - opt.dayOffset ) ) ) ) ) ? 'day' : 'invday' ) +
							'">' + ( d - ( copt.fd - opt.dayOffset ) )  + '</div>'
					) 
				)
			);
			
		$(target).find('div[id^=' + opt.cID + 'd]:first, div[id^=' + opt.cID + 'd]:nth-child(7n+2)').before( '<br style="clear:both; font-size:0.1em;" />' );
		$(target).find('div[id^=' + opt.cID + 'd_]:not(.invday)').bind("mouseover mouseout click", $.extend( {}, opt ),
			function(e){
					if ($('.jCalMask', e.data._target).length > 0) return false;
					var osDate = new Date ( $(this).attr('id').replace(/c[0-9]{1,}d_([0-9]{1,2})_([0-9]{1,2})_([0-9]{4})/, '$1/$2/$3') );
					if (e.data.forceWeek) osDate.setDate( osDate.getDate() + (e.data.dayOffset - osDate.getDay()) );
					var sDate = new Date ( osDate.getTime() );
					if (e.type == 'click')
						$('div[id*=d_]', e.data._target).stop().removeClass('selectedDay').removeClass('overDay').css('backgroundColor', '');
					for (var di = 0, ds = $(e.data._target).data('days'); di < ds; di++) {
						var currDay = $(e.data._target).find('#' + e.data.cID + 'd_' + ( sDate.getMonth() + 1 ) + '_' + sDate.getDate() + '_' + sDate.getFullYear());
						if ( currDay.length == 0 || $(currDay).hasClass('invday') ) break;
						//modyfy huanghui $(currDay)为选中状态'selectedDay'或者'hasDiaryDay'时不是'overDay'状态
						var classNames = $(currDay).attr('className');
						if((classNames.indexOf('hasDiaryDay'))==-1 &&(classNames.indexOf('selectedDay'))==-1 &&(classNames.indexOf('schedule'))==-1){
							if ( e.type == 'mouseover' ){
								$(currDay).addClass('overDay');
							}
							else if ( e.type == 'mouseout' ){
								$(currDay).stop().removeClass('overDay').css('backgroundColor', '');
							}	
						}
						if ( e.type == 'click' )		$(currDay).stop().addClass('selectedDay');
						sDate.setDate( sDate.getDate() + 1 );
					}
					
					if (e.type == 'click') {
						e.data.day = osDate;
						e.data.callback( osDate, di );
						$(e.data._target).data('day', e.data.day).data('days', di);
					}
			});
	};
})(jQuery);
/*获取当前时间*/
function nowdatetime(){
	var _d = new Date();
	var Y = _d.getFullYear();
	var M = _d.getMonth() + 1;
	var D = _d.getDate();
	M = (M<10)?("0"+M):M;
	D = (D<10)?("0"+D):D;
	return Y+"-"+M+"-"+D;	
}
/*
在每个日期前面加一个标志位，标志位的具体含义如下：
  0：无日程   1: 有日程   2：无日记   3：有日记
*/
//@param：schedule日程时间数组
function schedule(sche){
		/*var schedule=new Array("12011-08-07 10:01:32","02011-07-06 11:20:28","12011-10-06 11:20:28","02011-09-06 11:20:28","12011-11-06 11:20:28");	*/						
		var cymd = nowdatetime();/*获取当前时间:2011-09-23*/ 
		for(var x in sche){
			var eNow = (sche[x]+"").substring(1,11);
			var flag = checkFlag(sche[x]);
			if(flag==1){
				var $target = $("#"+checkFormat(sche[x]));
				var cNames = $target.get(0).className;
				if(eNow==cymd){
					$target.removeClass("schedule");
					$target.addClass("invdaySchedule");
				}else{
					$target.removeClass('selectedDay')
					$target.addClass("schedule");
					if(cNames.indexOf('hasDiaryDay')!=-1 &&cNames.indexOf('selectedDay')!=-1 ){
						$target.addClass('selectedScheduleDay');
					}
				}
			}
		} 	
		//added by huanghui@2012-3-31 我的日记进入时今天应为选中状态
		/**
		 * 	$(".day").removeClass("selectedDay");
			$(".schedule").removeClass("selectedScheduleDay");
			$(".invdaySchedule").removeClass("selectedInvScheduleDay");
			$(".invday").addClass("selectedCurDay");
		 * */
		var $invaday = $('.invday');
		if($invaday.size()!=0){
			var _today = $invaday[0];
			var todayClassName = _today.className;
			var $sDay = $('.selectedDay');
			var $ssDay = $('selectedScheduleDay');
			if($sDay.size()===0 && $ssDay.size()==0){
				if(todayClassName.indexOf('hasDiaryDay')!=-1 ||todayClassName.indexOf('invdaySchedule')!=-1 ){
					$(_today).addClass('selectedInvScheduleDay');
				}else{
					$(_today).addClass('selectedCurDay');
				}
			}
		}
		//added end	
	}	
	
//@param：diary日记时间数组	
function diary(myDiary){	
		/*var diary=new Array("32011-08-07 10:01:32","32011-07-06 11:20:28","22011-10-06 11:20:28","32011-09-06 11:20:28","32011-11-06 11:20:28");*/
		for(var x in myDiary){
			var flag = checkFlag(myDiary[x]);
			if(flag==3){
				$("#"+checkFormat(myDiary[x])).removeClass("nomarl");
				$("#"+checkFormat(myDiary[x])).addClass("hasDiaryDay");
			}
		}
	}

//获取标志位	
function checkFlag(strDay){
		strDay = strDay+"";
		if(strDay != null && strDay != "" &&strDay !=undefined){
			return strDay.substring(0,1);
		}else{
			return null;			
		}
	}
//将时间拼成'c1d_8_12_2011'这种形式,去匹配每个日期的div	
function checkFormat(strDay){	
	strDay = strDay+"";	
	if(strDay != null && strDay != "" &&strDay !=undefined){
		var year =strDay.substring(1,5);
		var month =strDay.substring(6,8);
		if(month.substring(0,1)==0){
				month = month.substring(1,2);
		}	
	var day =strDay.substring(9,11);
	if(day.substring(0,1)==0){
			day = day.substring(1,2);
		}	
	return "c1d_" +month+"_"+day+"_"+year;
	}else{
		return null;
	}	
}	

/**
 * 点击“前一天”或者“后一天”时，左边日历控件进行相应的样式变化。
 * 1、getPreOrNextDate(diaryDate,dayFlag):通过时间“2012-04-08”以及dayFlay前一天后者后一天，来得到前一天后有一天的时间。
 * 2、changeToDate(diaryDate)：根据上一步时间“2012-04-09” 转化为'c1d_4_9_2012'这种形式,去匹配每个日期的div的id。
 * 3、 changeToSelected(day)：找到左边iframe里面的id=“c1d_4_9_2012”的div，进行样式控制。
 * 1和2有多个页面需要用到，放到ui-custom.js里面，3必须写在各自的页面。
 * added by huanghui@2012-4-24 
 **/
//得到前一天 或有一天 2012-04-09  2012-04-08
function getPreOrNextDate(diaryDate,dayFlag){
	//var diaryDate = "2011-01-01";
	var arrDate = diaryDate.split('-');
	var ayear = arrDate[0];
	var amonth = arrDate[1];
	var aday = arrDate[2];
	if(amonth.indexOf('0')===0){
		amonth = amonth.substring(1,2);
	}
	amonth = parseInt(amonth) -1 ;//月份是0-11
	if(aday.indexOf('0')===0){
		aday = aday.substring(1,2);
	}
	var uom = new Date(ayear,amonth,aday); 
	if(dayFlag === 'pre'){
		uom.setDate(uom.getDate()-1);//取得系统时间的前一天,重点在这里,负数是前几天,正数是后几天 
	}else if(dayFlag === 'next'){
		uom.setDate(uom.getDate()+1);//取得系统时间的后一天,重点在这里,负数是前几天,正数是后几天
	}
	var prem=uom.getMonth(); 
	prem++; 
	var lastm=prem>= 10?prem:("0"+prem) 
	var lastd=uom.getDate(); 
	var lastd=lastd >= 10?lastd:("0"+lastd) 
	uom = uom.getFullYear() + "-" + lastm + "-" + lastd;//得到最终结果  
	return uom;
}

//将'2012-04-09'时间改成拼成'c1d_4_9_2012'这种形式,去匹配每个日期的div的id 
function changeToDate(strDay){	
	strDay = strDay + "";	
	if(strDay != null && strDay != "" &&strDay !=undefined){
		var arrDay = strDay.split('-');
		var year = arrDay[0];
		var month = arrDay[1];
		var day = arrDay[2];
		if(month.indexOf("0")==0){
			month = month.substring(1,2);
		}
		if(day.indexOf("0")==0){
			day = day.substring(1,2);
		}	
		var divId = "c1d_"+month+"_"+day+"_"+year;
		return divId;
	}else{
		return null;
	}	
}
/**added by huanghui@2012-4-24  end**/