/**
 * 对ztree的封装,同时去除了jquery.ztree-2.6.js,jquery.ztree-2.6.min.js中iconOpen,iconClose对isParent的限制
 * @author zhangwei
 */
var setting={checkable: false,checkStyle:"checkbox",isSelectFirst:true,showIcon:true,asyncSuccess:"zTreeOnAsyncSuccess",click:null,change:null,beforeAsync:null,isOpenAll:false,asyncParam: ["name", "id"]};
var zNodes =[];
var rootNodes=[];
var zTree;
//	checkable: true,
//	checkStyle:"radio",
//	checkRadioType:"all",
var ZTree = function(url,rootNodes,treeId){
	/**.
	 * modify by wengqk 
	 * 增加treeId自定义功能
	 * treeId: tree在页面的根节点的id，带 '#'
	 */
	this.treeId = treeId || "#treeDemo";
	
    setting = {
        checkable: setting.checkable,
        checkStyle:setting.checkStyle,
        showIcon : setting.showIcon,
        checkRadioType:"all",
		isSimpleData:false,
		treeNodeKey:"id",
		treeNodeParentKey:"pId",
		checkType:setting.checkType,
		async: true,
		asyncUrl: url,  //获取节点数据的URL地址
		asyncParam: setting.asyncParam,  //获取节点数据时，必须的数据名称，例如：id、name
		asyncParamOther: setting.asyncParamOther, //其它参数 ( key, value 键值对格式)
		addDiyDom: setting.addDiyDom,//添加自定义文本 add by chenjx
		isRelation:setting.isRelation,
		isOpenAll:setting.isOpenAll,
		isSelectFirst:setting.isSelectFirst,
		addHoverDom: setting.addHoverDom,
		removeHoverDom: setting.removeHoverDom,
		
		
		callback:{
			asyncSuccess: setting.asyncSuccess,
			asyncError: zTreeOnAsyncError,
			click:setting.click,
			beforeAsync:setting.beforeAsync,
			change:setting.change,
			beforeExpand: setting.beforeExpand,
			beforeCollapse: setting.beforeCollapse,
			dblclick:setting.dblclick
		}
	};
	if(rootNodes&&rootNodes.length>0){
	    for(var i=0;i<rootNodes.length;i++){
	        var n = rootNodes[i];
	        n.iconOpen=CTX+"/uiBase/widgets/ztree/img/home.png";
	        n.iconClose=CTX+"/uiBase/widgets/ztree/img/home.png";
	        n.isParent=true;
	    }
	}
    zTree = $(this.treeId).zTree(setting,rootNodes);
    //默认打开第一个
    if(setting.isOpenAll){
    	 zTree.expandAll(true);
    }else{
    	if(setting.isSelectFirst){
    		zTree.expandNode(zTree.getNodes()[0], true, false);
    		zTree.selectNode(zTree.getNodes()[0]);
    	}else{
    		zTree.expandNode(zTree.getNodes()[0], true, false);
    	}
    }
    
    
    this.getCheckedNodeIds=function(p){
        if(!p)p=",";
        var nodes = zTree.getCheckedNodes();
        var c= nodes.length;
        var ids="";
        if(c>0){
            $.each(nodes,function(i){
                ids=ids+this.id;
                if(c!=(i+1)){
                    ids=ids+p;
                }
            });
        }
        return ids;
    }
    
    this.getCheckedNodes=function(){
        var nodes = zTree.getCheckedNodes();
        return nodes;
    }
    
    this.refresh = function(id){
    zTree.updateNode(zTree.getNodeByParam("id", id), true);
    }
    
    this.reAsyncChildNodes = function(treeNode){
	zTree.reAsyncChildNodes(treeNode, "refresh");
    }
    this.refreshPidNode=function(id){
    	var treeNode=zTree.getNodeByParam("id", id);
    	zTree.reAsyncChildNodes(treeNode, "refresh");
    }
    
    this.getAllNodes = function(){
   		var nodes = zTree.getNodes();
        return nodes;
    }
    /*获得未选择的节点*/
     this.getUnCheckedNodes = function(){
   		var nodes = zTree.getCheckedNodes(false);
        return nodes;
    }
    /*更新节点的checked属性*/
    this.updateNode=function(theNode,flag){
    	var node=theNode;
    	node.checked=flag;
    	zTree.updateNode(node, true);
    	
    }
    
    this.updateNodeOtherAttr=function(theNode,flag){
    	var node=theNode;
    	zTree.updateNode(node,flag);
    	
    }
    
    /*查询当前节点下的所有节点*/
    this.children=function (nodeId){
    	//通过id获取节点
    	var pNode=zTree.getNodeByParam("id", nodeId);
    	var nodes = zTree.getNodesByParamFuzzy("name",null, pNode);
    	return nodes;
    }
    
    this.getChildrenNode = function(nodeId){
    	var pNode=zTree.getNodeByParam("id", nodeId);
    	var nodes = zTree.getNodesByParamFuzzy("id","", pNode);
    	return nodes;
    }
    
    //获得当前被选择的节点
    this.getSelectedNode=function (){
    	var nodes = zTree.getSelectedNode();
    	return nodes;
    }
    this.changeSettingForAsync = function(flag){
    	var xSetting = zTree.getSetting();
    	xSetting.closeAsync = flag;
    	zTree.updateSetting(xSetting);

    }
    
    
    this.getCheckedNode=function(){
    	var modules=new Array();
        var nodes = zTree.getCheckedNodes();
        var c= nodes.length;
        if(c>0){
            for(var i=0;i<c;i++){
            	modules[i] = nodes[i].id;
            }
        }
        return modules;
    }
    
    /**added by qingfeilee 2011-08-20 14:15 获取节点名称**/
    this.getCheckedNodeNames=function(p){
        if(!p)p=";";
        var nodes = zTree.getCheckedNodes();
        var c= nodes.length;
        var names="";
        if(c>0){
            $.each(nodes,function(i){
                names=names+this.name;
                if(c!=(i+1)){
                    names=names+p;
                }
            });
        }
        return names;
    }
    /**end added**/
    
    this.expandNode=function(id){
        if(id){
            zTree.expandNode(zTree.getNodeByParam("id", id), true, false);
        }
        
    }
    
    
    this.closeNode=function(id){
        if(id){
            zTree.expandNode(zTree.getNodeByParam("id", id), false, false);
        }
        
    }
    this.expandAll = function(isExpand){
         if('undefined'==isExpand){
             isExpand = true;
         }
         zTree.expandAll(isExpand);
    }
   
    /**added by jiazh 2011-08-22 09:41 根据节点名称查询 目前只能查找已打開的部份，后期可能会修改**/
    this.searchNode = function(deptName){
    	var node = zTree.getNodeByParam("name", deptName);
	    	zTree.expandNode(node, true, false);
	    	zTree.selectNode(node);
    }
    
     /**added by jiazh 2011-08-22 13:41 返回找到目前选中的节点，页面可以类似var node = tree.getSelectNode()来的到节点，
      * 通过node.id和node.name来得到节点的id和name**/
    this.getSelectNode = function(){
    	var node = zTree.getSelectedNode();
		return node;
    }
    
    this.selectNodeMakeLight = function(id){
    	var node = zTree.getNodeByParam("id", id);
    	zTree.selectNode(node);
    }
    
    this.getNodeById = function(id){
    	var node = zTree.getNodeByParam("id", id);
    	return node;
    }
    
    this.getNodeByProperty = function(key,value){
    	var nodes = zTree.getNodesByParam(key,value);
    	return nodes;
    }
    
   this.searchNodeByDate = function(targetName,data){
   		 zTree.cancalManyNode();
   		 var reg = RegExp(targetName,"gi");
   		 var ids = data.split(",");
 		 var xSetting = zTree.getSetting();
    	 xSetting.closeAsync = true;
    	 zTree.updateSetting(xSetting);
    	 for(var i =0,j = ids.length ;i < j;i++){
			var node = zTree.getNodeByParam("id", ids[i]); 
			if(node != null && reg.test(node.name)){
				 zTree.selectManyNode(node);
			}else{ 
				 zTree.expandNode(node, true, false);
			}
		 }
		 xSetting.closeAsync = false;
    	 zTree.updateSetting(xSetting);
    }
    this.searchNodeByAsync = function(url,param,targetName){
    		zTree.cancalManyNode();
			$.ajax({
				   type: "POST",
				   url: url,
				   data: param,
				   success: function(data){
				   var ids = data.split(",");
				   	var xSetting = zTree.getSetting();
    				xSetting.closeAsync = true;
    				zTree.updateSetting(xSetting);
    				if(ids.length>1){
				   	for(var i=ids.length-1;i>=0;i--){
				   	var node = zTree.getNodeByParam("id", ids[i]);
				   	if(node!=null&&node.name == targetName){
				   		zTree.selectManyNode(node);
				   	}else{
				  		zTree.expandNode(node, true, false);
				  		if(node!=null && node.name.indexOf(targetName)!=-1){
				  		zTree.selectManyNode(node);
				  		}
				   	}
				    }
    				}else{
    					zTree.expandNode(zTree.getNodes()[0], false, false);
    					zTree.selectNode(zTree.getNodes()[0]);
    				}
    				
				 	xSetting.closeAsync = false;
    				zTree.updateSetting(xSetting);
				   },
				  	error:function(){
				   	zTree.expandNode(zTree.getNodes()[0], false, false);
    				zTree.selectNode(zTree.getNodes()[0]);
				   }
				});
    }
    this.getCheckedNodeIdsAndNamesOnlyUser=function(p){
        if(!p)p=";";
        var nodes = zTree.getCheckedNodes();
        var c= nodes.length;
        var idAndName = new Array();
        var ids="";
        var names="";
        if(c>0){
            $.each(nodes,function(i){
                if("USER"==this.entityType){
                    ids=ids+this.id;
                    if(c!=(i+1)){
                        ids=ids+p;
                    }
                }
            });
            idAndName[0]=ids;
            $.each(nodes,function(i){
                if("USER"==this.entityType){
                    names=names+this.name;
                    if(c!=(i+1)){
                        names=names+p;
                    }
                }
            });
            idAndName[1]=names;
        }
        return idAndName;
    }
     return this;
    
}

	

zTreeOnAsyncSuccess = function(event, treeId, treeNode, msg) {
    //当设置节点属性为expand时则自动打开其子节点
	   if(treeNode){
	       var treeNodes = treeNode["nodes"];
	       if(treeNodes){
	           $.each(treeNodes,function(){
	              if(this.isParent&&this.isExpand){
	                  zTree.expandNode(this, true, false);
	              }
	           });
	       }
	       //默认选中根节点
	       zTree.selectNode(treeNode);
	   }
	   
}
zTreeOnAsyncError = function(event, treeId, treeNode, XMLHttpRequest, textStatus, errorThrown) {
		alert("提示信息:树构造失败!");
}



