浮动层容器插件:
    1,显示隐藏触发方式:hover、click、focus、代码触发(如首页浮动容器不同时显示)控制接口开关
        自定义函数 click
        hover
    2,容器尺寸:自适应、自定义
    /3,加载方式：指定元素、iframe、ajax
    /4,定位：基于元素的定位、自定义位置（上下左右）
    /5,显示区域智能处理，出界自动调整功能
    6,允许鼠标跟随
FIXME：
1,自适应宽高不好使
    隐藏元素的宽高
     //处理绝对定义display隐藏元素的真实尺寸
    $d.css({display:"block",visibility:"hidden"});
    var _d = _dimession($d[0]);
    $d.css({display:"none",visibility:"visible"});
