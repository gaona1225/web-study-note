/**
* https://github.com/jeromeetienne/jquery-qrcode.git
* https://github.com/imbcmdth
* 详细原始文件 请查看同级目录下REAMDE.md
* 文件依赖于:
* jQuery.js
* jQuery.ui.js
* qrcode.js
*/
;(function ($, undefined) {
    /** 
    * @class 二维码生成
    * @name qrcode
    * @description 二维码生成
    * @requires jQuery.js|jquery-ui.js 
    * @version 1.2 
    */
    $.widget('ui.qrcode', {
        options: {
            /**  
            * @name qrcode#render  
            * @param {string} render render对象 
            * @description 可选值'canvas', 'table'
            * @default {string} 'canvas'
            */
            render: 'canvas',
            /**  
            * @name qrcode#width  
            * @param {number} width width对象 
            * @description 二维码占据区域的宽
            * @default {string} 256
            */
            width: 256,
            /**  
            * @name qrcode#height  
            * @param {number} height height对象 
            * @description 二维码占据区域的高
            * @default {string} 256
            */
            height: 256,
            /**  
            * @name qrcode#typeNumber  
            * @param {number} typeNumber typeNumber对象 
            * @description 值为 < 1时 将自动计算 由qrcode.js提供 计算模块数用
            * @default {string} -1
            */
            typeNumber: -1,
            /**  
            * @name qrcode#correctLevel  
            * @param {string} correctLevel correctLevel对象 
            * @description 可选值QRErrorCorrectLevel.H
            * @default {string} QRErrorCorrectLevel.H
            */
            correctLevel: QRErrorCorrectLevel.H,
            /**  
            * @name qrcode#background  
            * @param {string} background background对象 
            * @description 二维码区域的背景色
            * @default {string} '#ffffff'
            */
            background: '#ffffff',
            /**  
            * @name qrcode#foreground  
            * @param {string} foreground foreground对象 
            * @description 二维码颜色
            * @default {string} '#000000'
            */
            foreground: '#000000'
        },
        /* utf.js - UTF-8 <=> UTF-16 convertion
         *
         * Copyright (C) 1999 Masanao Izumo <iz@onicos.co.jp>
         * Version: 1.0
         * LastModified: Dec 25 1999
         * This library is free.  You can redistribute it and/or modify it.
         */
        utf: {
            utf16to8: function (str) {
                var out, i, len, c;

                out = "";
                len = str.length;
                for(i = 0; i < len; i++) {
                    c = str.charCodeAt(i);
                    if ((c >= 0x0001) && (c <= 0x007F)) {
                        out += str.charAt(i);
                    } else if (c > 0x07FF) {
                        out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                        out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
                        out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
                    } else {
                        out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
                        out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
                    }
                }
                return out;
            },
            utf8to16: function (str) {
                var out, i, len, c;
                var char2, char3;

                out = "";
                len = str.length;
                i = 0;
                while(i < len) {
                    c = str.charCodeAt(i++);
                    switch(c >> 4) { 
                      case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
                        // 0xxxxxxx
                        out += str.charAt(i-1);
                        break;
                      case 12: case 13:
                        // 110x xxxx   10xx xxxx
                        char2 = str.charCodeAt(i++);
                        out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                        break;
                      case 14:
                        // 1110 xxxx  10xx xxxx  10xx xxxx
                        char2 = str.charCodeAt(i++);
                        char3 = str.charCodeAt(i++);
                        out += String.fromCharCode(((c & 0x0F) << 12) |
                                       ((char2 & 0x3F) << 6) |
                                       ((char3 & 0x3F) << 0));
                        break;
                    }
                }
                return out;
            }
        },
        _create: function () {},
        _init: function () {
            var self = this,
                qrcodeContainer = this.element,
                options = self.options,
                renderHtml;
            // 待编码信息转码 处理中文乱码问题
            options['text'] = self.utf['utf16to8'](options['text']);
            // 渲染生成显示结构         
            switch (options.render) {
                case 'table':
                    renderHtml = self._table(options);
                    break;
                case 'canvas':
                    renderHtml = self._canvas(options);
                    break;
                default:
                    renderHtml = 'render: ' + options.render + 'not supported yet.';
            }
            // 将结构更新到DOM中
            qrcodeContainer.append(renderHtml);
        },
        // table方式生成
        _table: function (options) {
            // create the qrcode itself
            var qrcode  = new QRCode(options.typeNumber, options.correctLevel);
            qrcode.addData(options.text);
            qrcode.make();
            
            // create table element
            var $table  = $('<table></table>')
                .css("width", options.width+"px")
                .css("height", options.height+"px")
                .css("border", "0px")
                .css("border-collapse", "collapse")
                .css('background-color', options.background);
          
            // compute tileS percentage
            var tileW   = options.width / qrcode.getModuleCount();
            var tileH   = options.height / qrcode.getModuleCount();

            // draw in the table
            for(var row = 0; row < qrcode.getModuleCount(); row++ ){
                var $row = $('<tr></tr>').css('height', tileH+"px").appendTo($table);
                
                for(var col = 0; col < qrcode.getModuleCount(); col++ ){
                    $('<td></td>')
                        .css('width', tileW+"px")
                        .css('background-color', qrcode.isDark(row, col) ? options.foreground : options.background)
                        .appendTo($row);
                }   
            }
            // return just built canvas
            return $table;
        },
        // canvas方式生成
        _canvas: function (options) {
            // create the qrcode itself
            var qrcode  = new QRCode(options.typeNumber, options.correctLevel);
            qrcode.addData(options.text);
            qrcode.make();

            // create canvas element
            var canvas  = document.createElement('canvas');
            canvas.width    = options.width;
            canvas.height   = options.height;
            var ctx     = canvas.getContext('2d');

            // compute tileW/tileH based on options.width/options.height
            var tileW   = options.width  / qrcode.getModuleCount();
            var tileH   = options.height / qrcode.getModuleCount();

            // draw in the canvas
            for( var row = 0; row < qrcode.getModuleCount(); row++ ){
                for( var col = 0; col < qrcode.getModuleCount(); col++ ){
                    ctx.fillStyle = qrcode.isDark(row, col) ? options.foreground : options.background;
                    var w = (Math.ceil((col+1)*tileW) - Math.floor(col*tileW));
                    var h = (Math.ceil((row+1)*tileW) - Math.floor(row*tileW));
                    ctx.fillRect(Math.round(col*tileW),Math.round(row*tileH), w, h);  
                }   
            }
            // return just built canvas
            return canvas;
        }
    });
    $.extend($.ui.qrcode, {
    version: '1.3'
  });
})(jQuery);