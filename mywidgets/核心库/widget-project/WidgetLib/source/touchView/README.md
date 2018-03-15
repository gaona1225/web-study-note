## 滑动组件
### 综合iscroll-4.2.5,3g.163/touch频道, 工作台数据客户端数据加载的综合体
### 兼容:
* transform translateX支持
* 事件序列、事件回调嵌套
* firstElementChild previousElementSibling
### TODO:
/* threshold 50
* 客户响应和数据加载
/* 语法检测 精简
* 不支持 transitionend事件时 在临界值下会出问题
	 ie9 
	 显示第一页时 translateX值不对 为 -that.sliderW endCallback没有被执行
/* UI命名空间修正
* 版本号码
* jq桌面测试中的上下文对象和事件对象有问题
/* 多组滑块同时处理的小问题 slideIndex 维护 navHolder
/* 初始化项目的定制? onInit
/* 越界处理 slideToPage? 假定是合法的
direction lock 上下滑动 左右滑动
jquery touch事件的touches
jquery widget 实例 类属性
wrapperW, sliderW