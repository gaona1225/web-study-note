1.effect效果的名稱：
    /1.1推入推出
    /1.2淡入淡出
    /1.3百葉窗/重疊切換//hongru@cnblogs
    1.4accordion效果
    1.5css3旋轉對-webkit增強、不支持時使用普通淡入淡出效果
    1.6实现方式的重构 兼容乃大
2.問題記錄:
    2.1 在IE,HTMLEelement的dir屬性佔用會報錯："无效的过程调用或参数"
    2.2 rgba設置的透明度和opacity的表現不同，不會被繼承
    2.3 _that 定位為普通對象{} 報錯：createDocumentFragment：：未排查
    2.4 事件的響應方式
        1，传入图片信息、对应响应时数据、回调方法 统一动态生成结构
        2，已生成一定的html结构，构建slide时收集图片及对应数据信息，构建新的展示结构，统一添加事件（jcs系统中选择第二种）
        初始化时，获取数据集合option.eventParams
        点击时，根据当前显示图片下标执行对应的响应事件
    2.5 maxNum最大帧数 需要去除 没有作用  不提供配置
    2.6 container:'slide-container' 无多大作用 不提供配置
    2.7 paginationType:'click' 无多大作用 不提供配置
    2.8 help文档的copy修改和优化（调整说明格式）

3.其他：
参考：
3.1 http://nathansearles.com
3.2 http://www.cnblogs.com/hongru/archive/2010/10/31/1865555.html
资源:
图片，自智能社

------------------------------

4. 测试问题修改:
    /4.1 定制pagination的位置
    /4.2 定制pagination是否显示文字
    /4.3 快速点击pagination 白底问题
        --> 1. 通过:animated状态判断是否处理动画状态下 如果是 则不响应点击事件
        --> 2. 维护一个点击事件列表
    /4.4 参数设置说明vs 强制检查
        duration 动画时间  不要长于周期时间
        // if(duration < 2000) {
      //   duration = 2000;
      // }
    4.5 easing
    4.6 当前处于current状态下的li其实是没有点击的

