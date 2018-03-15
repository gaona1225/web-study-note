///import core
///import uicore
(function (){
    var utils = baidu.editor.utils,
        UIBase = baidu.editor.ui.UIBase,
        ColorPicker = baidu.editor.ui.ColorPicker = function (options){
            this.initOptions(options);
            this.noColorText = this.noColorText || '不设置颜色';
            this.initUIBase();
        };

    ColorPicker.prototype = {
        getHtmlTpl: function (){
            return genColorPicker(
                this.noColorText
                );
        },
        _onTableClick: function (evt){
            var tgt = evt.target || evt.srcElement;
            var color = tgt.getAttribute('data-color');
            if (color) {
                this.fireEvent('pickcolor', color);
            }
        },
        _onTableOver: function (evt){
            var tgt = evt.target || evt.srcElement;
            var color = tgt.getAttribute('data-color');
            if (color) {
                this.getDom('preview').style.backgroundColor = color;
            }
        },
        _onTableOut: function (){
            this.getDom('preview').style.backgroundColor = '';
        },
        _onPickNoColor: function (){
            this.fireEvent('picknocolor');
        }
    };
    utils.inherits(ColorPicker, UIBase);

    var COLORS = (
        'FFFFFF,FFFFCC,FFFF99,FFFF66,FFFF33,FFFF00,FFCCFF,FFCCCC,FFCC99,FFCC66,FFCC33,FFCC00,FF99FF,FF99CC,FF9999,FF9966,FF9933,FF9900,' +
        'CCFFFF,CCFFCC,CCFF99,CCFF66,CCFF33,CCFF00,CCCCFF,CCCCCC,CCCC99,CCCC66,CCCC33,CCCC00,CC99FF,CC99CC,CC9999,CC9966,CC9933,CC9900,' +
        '99FFFF,99FFCC,99FF99,99FF66,99FF33,99FF00,99CCFF,99CCCC,99CC99,99CC66,99CC33,99CC00,9999FF,9999CC,999999,999966,999933,999900,' +
        '66FFFF,66FFCC,66FF99,66FF66,66FF33,66FF00,66CCFF,66CCCC,66CC99,66CC66,66CC33,66CC00,6699FF,6699CC,669999,669966,669933,669900,' +
        '33FFFF,33FFCC,33FF99,33FF66,33FF33,33FF00,33CCFF,33CCCC,33CC99,33CC66,33CC33,33CC00,3399FF,3399CC,339999,339966,339933,339900,' +
        '00FFFF,00FFCC,00FF99,00FF66,00FF33,00FF00,00CCFF,00CCCC,00CC99,00CC66,00CC33,00CC00,0099FF,0099CC,009999,009966,009933,009900,' +
        'FF66FF,FF66CC,FF6699,FF6666,FF6633,FF6600,FF33FF,FF33CC,FF3399,FF3366,FF3333,FF3300,FF00FF,FF00CC,FF0099,FF0066,FF0033,FF0000,' +
        'CC66FF,CC66CC,CC6699,CC6666,CC6633,CC6600,CC33FF,CC33CC,CC3399,CC3366,CC3333,CC3300,CC00FF,CC00CC,CC0099,CC0066,CC0033,CC0000,' +
        '9966FF,9966CC,996699,996666,996633,996600,9933FF,9933CC,993399,993366,993333,993300,9900FF,9900CC,990099,990066,990033,990000,' +
        '6666FF,6666CC,666699,666666,666633,666600,6633FF,6633CC,663399,663366,663333,663300,6600FF,6600CC,660099,660066,660033,660000,' +
        '3366FF,3366CC,336699,336666,336633,336600,3333FF,3333CC,333399,333366,333333,333300,3300FF,3300CC,330099,330066,330033,330000,' +
        '0066FF,0066CC,006699,006666,006633,006600,0033FF,0033CC,003399,003366,003333,003300,0000FF,0000CC,000099,000066,000033,000000').split(',');
    function genColorPicker(noColorText){
        var html = '<div id="##" class="edui-colorpicker %%">' +
            '<div class="edui-colorpicker-topbar edui-clearfix">' +
             '<div unselectable="on" id="##_preview" class="edui-colorpicker-preview"></div>' +
             '<div unselectable="on" class="edui-colorpicker-nocolor" onclick="$$._onPickNoColor(event, this);">'+ noColorText +'</div>' +
            '</div>' +
            '<table  class="edui-box" style="border: solid #444; border-width: 1px 0 0 1px; border-collapse: separate;" onmouseover="$$._onTableOver(event, this);" onmouseout="$$._onTableOut(event, this);" onclick="return $$._onTableClick(event, this);" cellspacing="0" cellpadding="0">' +
            '<tr class="edui-colorpicker-tablefirstrow">';
        for (var i=0; i<COLORS.length; i++) {
            if (i && i%18 === 0) {
                html += '</tr><tr>';
            }
            html += '<td><a hidefocus title="'+COLORS[i]+'" onclick="return false;" href="javascript:" unselectable="on" class="edui-box edui-colorpicker-colorcell"' +
                        ' data-color="#'+ COLORS[i] +'"'+
                        ' style="background-color:#'+ COLORS[i] +';"' +
                    '></a></td>';
        }
        html += '</tr></table></div>';
        return html;
    }
})();
