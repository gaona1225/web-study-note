/*
 *作    者: 高娜
 *版    本: 1.2
 *完成时间: 2012-05-14
 *描    述: geolocation
 *关联文件: jQuery.js|jquery-ui.js
 */
(function($,undefined){
    /**
	* @class 获取地理位置
    * @name geolocation
    * @description 获取地理位置
	* @version 1.2
    */
	$.widget('ui.geolocation',
	/** @lends geolocation.prototype */
	{		
		options:{
			/**  
			* @name geolocation#nosupportMsg
			* @param {String}  字符串类型
			* @description 不支持地理定位的输出信息
			* @default {String} '您当前的浏览器不支持Geolocation,请升级浏览器'
			* @example
			* $('.showGeo').geolocation({
			*		nosupportMsg : '您当前的浏览器不支持Geolocation,请升级浏览器'
			*  });
			*/
			nosupportMsg : '您当前的浏览器不支持Geolocation,请升级浏览器' ,
			/**  
			* @name geolocation#isshowLat
			* @param {Boolean}  布尔类型
			* @description 是否显示纬度
			* @default {Boolean} true
			* @example
			* $('.showGeo').geolocation({
			*		isshowLat : true
			*  });
			*/
			isshowLat : true ,
			/**  
			* @name geolocation#isshowLon
			* @param {Boolean}  布尔类型
			* @description 是否显示经度
			* @default {Boolean} true
			* @example
			* $('.showGeo').geolocation({
			*		isshowLon : true
			*  });
			*/
			isshowLon : true ,
			/**  
			* @name geolocation#isshowAcc
			* @param {Boolean}  布尔类型
			* @description 是否显示准确度
			* @default {Boolean} true
			* @example
			* $('.showGeo').geolocation({
			*		isshowAcc : true
			*  });
			*/
			isshowAcc : true ,
			/**  
			* @name geolocation#isshowAlt
			* @param {Boolean}  布尔类型
			* @description 是否显示海拔高度
			* @default {Boolean} true
			* @example
			* $('.showGeo').geolocation({
			*		isshowAlt : true
			*  });
			*/
			isshowAlt : true ,
			/**  
			* @name geolocation#isshowAla
			* @param {Boolean}  布尔类型
			* @description 是否显示海拔高度的精确度
			* @default {Boolean} true
			* @example
			* $('.showGeo').geolocation({
			*		isshowAla : true
			*  });
			*/
			isshowAla : true ,
			/**  
			* @name geolocation#isshowHea
			* @param {Boolean}  布尔类型
			* @description 是否显示行进方向
			* @default {Boolean} true
			* @example
			* $('.showGeo').geolocation({
			*		isshowHea : true
			*  });
			*/
			isshowHea : true ,
			/**  
			* @name geolocation#isshowSpe
			* @param {Boolean}  布尔类型
			* @description 是否显示地面速度
			* @default {Boolean} true
			* @example
			* $('.showGeo').geolocation({
			*		isshowSpe : true
			*  });
			*/
			isshowSpe : true
		},
		_create:function(){
			var $this = this.element ;
			var domCreLen = $('.posMsg').length ;
			if(domCreLen <= 0){
				var posMsg = '<div class="posMsg"></div>' ;
				$this.append(posMsg) ;
			}			
		},
		_init:function(){
			var o = this.options ;
			var self = this.element.find('.posMsg') ;
			//判断值是否存在
			function isVal(strVal){
				if((strVal != null)&&(strVal != undefined)){
					return true ;
				}
			}
			function getElem(id){
				return typeof id === 'string' ? document.getElementById(id) : id ;
			}
			
			function show_it(lat,lon,acc,alt,ala,hea,spe){
				lat = (o.isshowLat && isVal(lat)) ? lat : '' ;
				lon = (o.isshowLon && isVal(lon)) ? lon : '' ;
				acc = (o.isshowAcc && isVal(acc)) ? acc : '' ;
				alt = (o.isshowAlt && isVal(alt)) ? alt : '' ;
				ala = (o.isshowAla && isVal(ala)) ? ala : '' ;
				hea = (o.isshowHea && isVal(hea)) ? hea : '' ;				
				spe = (o.isshowSpe && isVal(spe)) ? spe : '' ;
				var str = '您当前的位置：' + lat + lon + acc + alt + ala + hea + spe ;
				var addMsg ;
				self.html(str) ;
				self.attr({
					'data-lat' : lat ,
					'data-lon' : lon ,
					'data-acc' : acc ,
					'data-alt' : alt ,
					'data-ala' : ala ,
					'data-hea' : hea ,
					'data-spe' : spe 
				}).hide() ;
				try{
				   //地图上标示
					/*var map = new BMap.Map("container"); 
					map.centerAndZoom(new BMap.Point(lon,lat),11); */
					// 创建地理编码实例 
					var myGeo = new BMap.Geocoder(); 
					// 根据坐标得到地址描述 
					myGeo.getLocation(new BMap.Point(lon,lat),function(result){  
						if(result){      
							addMsg = result.address;						
						}   
						self.attr('data-addmsg',addMsg) ;
					}); 
				}catch(e){
				}
			}
			
			if(navigator.geolocation){
				navigator.geolocation.getCurrentPosition(function(position){  
					show_it(position.coords.latitude, position.coords.longitude, position.coords.accuracy, position.coords.altitude, position.coords.altitudeAcuracy, position.coords.heading, position.coords.speed);  
				},function(err) {
					var errMsg = err.code + ' ' + err.message;
					self.html(errMsg) ;
				});
			}else{
				self.html(o.options) ;
			}
		},
		/**
		* @description 获得地理位置信息-详细地址
		* @return {geolocation} geolocation对象
		* @example
		* $("#destoryBtn").geolocation('getAddress');
		*/
		getAddress : function(){
			getAddress = $('.posMsg').attr('data-addmsg') ? $('.posMsg').attr('data-addmsg') : '无法获取地址' ;
			return getAddress ;
		},
		/**
		* @description 获得地理位置信息-纬度
		* @return {geolocation} geolocation对象
		* @example
		* $("#destoryBtn").geolocation('getX');
		*/
		getX : function(){
			getX = $('.posMsg').attr('data-lat') ;
			return getX ;
		},
		/**
		* @description 获得地理位置信息-经度
		* @return {geolocation} geolocation对象
		* @example
		* $("#destoryBtn").geolocation('getY');
		*/
		getY : function(){
			getY = $('.posMsg').attr('data-lon') ;
			return getY ;
		},
		/**
		* @description 获得地理位置信息-准确度
		* @return {geolocation} geolocation对象
		* @example
		* $("#destoryBtn").geolocation('getA');
		*/
		getA : function(){
			getA = $('.posMsg').attr('data-acc') ;
			return getA ;
		},
		/**
		* @description 获得地理位置信息-海拔高度
		* @return {geolocation} geolocation对象
		* @example
		* $("#destoryBtn").geolocation('getAcc');
		*/
		getAcc : function(){
			getAcc = $('.posMsg').attr('data-alt') ;
			return getAcc ;
		},
		/**
		* @description 获得地理位置信息-海拔高度的精确度
		* @return {geolocation} geolocation对象
		* @example
		* $("#destoryBtn").geolocation('getAla');
		*/
		getAla : function(){
			getAla = $('.posMsg').attr('data-ala') ;
			return getAla ;
		},
		/**
		* @description 获得地理位置信息-行进方向
		* @return {geolocation} geolocation对象
		* @example
		* $("#destoryBtn").geolocation('getH');
		*/
		getH : function(){
			getH = $('.posMsg').attr('data-hea') ;
			return getH ;
		},
		/**
		* @description 获得地理位置信息-地面速度
		* @return {geolocation} geolocation对象
		* @example
		* $("#destoryBtn").geolocation('getS');
		*/
		getS : function(){
			getS = $('.posMsg').attr('data-spe') ;
			return getS ;
		},
		/**
		* @description 清除地理位置信息
		* @return {geolocation} geolocation对象
		* @example
		* $("#destoryBtn").geolocation('destroy');
		*/
		destroy : function(){
			this.element.find('.posMsg').remove() ;
		}
	});

	$.extend($.fn.geolocation, {
		version: "1.2"
	});

})(jQuery);