<template>
<div class="back_ground">
    <div style="width:665;float:left;overflow:hidden">
        <!-- &nbsp;&nbsp;&nbsp;<br />
        &nbsp;&nbsp;&nbsp;&nbsp;
            添加预览控件（需要先在windows下注册） -->
       
        <table width="100%" style="margin: 12px 0 0 15px;">
            <tr><td colspan="2"> 
                <object classid="clsid:AC036352-03EB-4399-9DD0-602AB1D8B6B9" id="PreviewOcx"  width="650px" height="500" name="ocx" >
            </object></td></tr>
            <tr><td>
                <div style="text-align:left;background-color: #C0C0C0;width: 318px; margin-bottom: 4px">调用信息</div>
                <div><textarea id="TextInfo" cols="37" rows="12" wrap="physical"></textarea></div>
                </td>
                <td>
                <div style="text-align:left;background-color: #C0C0C0;width: 320px; margin-bottom: 4px">触发事件信息</div>
                <div><textarea id="MsgInfo" cols="37" rows="12" wrap="physical"></textarea></div>   
                </td>
            </tr>
        </table>
    </div>

    <div id="cameraList" style="width:300px;height:500px;margin-left:15px;margin-top:15px;float:left;overflow:auto;border: thin solid #808080；">
        <ul id="tree"/>
    </div>
</div>
</template>


<style lang="scss" scoped>
    @import 'src/style/mixin';

</style>

<script>
    import $ from 'jquery'
    export default {
        data() {
            return {
                abc: ['数据应用','出财务数据','出纳收支分析'], 
            }
        },
        mounted(){
            var refThis = this;
            console.log("进入钩子");
            // setTimeout(function(){
            //     console.log("3s运行");
            //     refThis.loginCMS();
            // },3000);
        },
        methods:{
            loginCMS(){
                console.log("登陆程序");
                var userName= 'admin';
                var pw='zhwy1234';
                var ipAdd= '202.105.104.105';
                var port= '79';
                console.log(userName);
                if(!this.validateInteger(port,"端口"))
                {
                    return;
                }
                if(!(parseInt(port)>=0 && parseInt(port)<=2147483647)){
                    return;
                }
                var OCXobj = document.getElementById("PreviewOcx");
                var ret=OCXobj.Login(ipAdd,port,userName,pw);
                switch(ret){
                    case 0:
                        this.initTree();
                        alert("登录成功！");
                        break;
                    case -1:
                        // clearTree();
                        alert("登录失败！");
                        break;
                    default:
                        break;
                }
                
            },
            validateInteger(value, label){
                if (value.length == 0 || isNaN(value)) {
                    alert(label + "必须是一个整数.");
                    return false;
                } else {
                    var re = /^[0-9]+[0-9]*]*$/;   //判断正整数 
                    if (!re.test(value)){
                        alert(label + "必须是一个整数.");
                        return false;
                    }
                     
                    var isNumber = false;
                    for (var count = 0; count<value.length; count++) {
                       var code = value.charCodeAt(count);
                       if ((48 > code && code >57)) {
                            alert(label + "必须是一个整数.");
                            return false;
                       }
                   }
                }
                return true;
            },
            initTree(){
                var OCXobj = document.getElementById("PreviewOcx");
                var trees = document.getElementById('tree');
                $("#tree").html("");
                //初始化中心节点
                var xmlStr = OCXobj.GetResourceInfo(1); //获取一级列表中海物业集团和空ul的xml字符串
                // var hehe = this.loadXml(xmlStr);
                // console.log(JSON.stringify(this.xmltojson(xmlStr)));
                // console.log(xmlStr);
                var orderdCellIds = this.initControlUnitNodes(xmlStr);   //把xml赋给dom树，产生中海物业集团和空ul
                //初始化区域节点
                if(orderdCellIds.length > 0){
                    xmlStr = OCXobj.GetResourceInfo(2);     //获取所有 
                    
                    // var hehe = this.loadXml(xmlstr1);
                    // console.log(JSON.stringify(this.xmltojson(hehe)));
                    var regionIds = this.initRegionNodes(xmlStr, orderdCellIds);     //把xml赋给dom树，产生广州云麓公馆和空ul
                    //初始化监控点节点
                    if(regionIds.length > 0){
                        xmlStr = OCXobj.GetResourceInfo(4);
                        // console.log(xmlStr);
                        // console.log(this.xmltojson(xmlStr));
                        this.initCameraNodes(xmlStr, regionIds);
                    }
                }
                // console.log(trees);
                $("#tree a").click(function(){
                    //找到主菜单项对应的子菜单项
                    $(this).next("ul").slideToggle();
                    // this.changeIcon($(this).parent("li"));
                });
            },
            initControlUnitNodes(xmlStr){
                var xmldom=this.getXmlDomFromStr(xmlStr);
                // console.log("ControlUnitNodes是："+ xmldom);
                //CtrlCell的jQuery对象数组
                var ctrlCells = new Array();
                var orderdCellIds = new Array();
                $(xmldom).find("SubUnitInfo").each(function() {
                    ctrlCells.push($(this));
                });
                if(ctrlCells.length > 0){
                    var rootUnit = ctrlCells[0];
                    
                    var curLevelCellIds = new Array();
                    var parentCellId = 0;
                    var curCellId = 0;
                    curLevelCellIds.push($(rootUnit).find("ParentUnitID").text());
                    //循环到ctrlCells中不再有任何元素
                    while(ctrlCells.length>0){
                        //本次for循环查找所用parentCellId
                        parentCellId = curLevelCellIds.pop();
                        
                        //循环查找父中心Id=parentCellId的CtrlCell
                        for(var i=0; i<ctrlCells.length; ){
                            if ($(ctrlCells[i]).find("ParentUnitID").text() == parentCellId) {
                                //子中心Id入栈，下次for循环查找时作为parentCellId
                                curCellId = $(ctrlCells[i]).find("UnitID").text();
                                curLevelCellIds.push(curCellId);
                                orderdCellIds.push(curCellId);
                                //添加子中心节点
                                if($("#tree").html()==""){
                                    $("#tree").html("<li class='control_unit_li'><a href='javascript:return 0'>" + $(ctrlCells[i]).find("UnitName").text() + "</a><ul id='ul_cell_" + curCellId + "'></ul></li>");
                                }else{
                                    var expr = "#ul_cell_"+parentCellId;
                                    $(expr).append("<li class='control_unit_li'><a href='javascript:return 0'>" + $(ctrlCells[i]).find("UnitName").text() + "</a><ul id='ul_cell_" + curCellId + "'></ul></li>");
                                }
                                //从CtrlCell数组中删除已添加的CtrlCell
                                ctrlCells.splice(i,1);
                            }else{
                                i++;
                            }
                        }
                    }
                }
                return orderdCellIds;
            },
            initRegionNodes(xmlStr, orderdCellIds){
                var xmldom=this.getXmlDomFromStr(xmlStr);
                //alert(xmlStr);
                //Region的jQuery对象数组
                // console.log("RegionNodes是："+ xmldom);
                var regionIds = new Array();
                var regionsOff = new Array();
                var expr;
                for(var i=0; i<orderdCellIds.length; i++){
                    var ctrlCellId = orderdCellIds[i];
                    //查找中心下所有的区域
                    $(xmldom).find("SubRegionInfo").each(function() {
                        //该中心下的区域
                    if ($(this).find("CtrlUnitID").text() == ctrlCellId) {
                            //该中心下的一级区域
                        if ($(this).find("ParentRegID").text() == 0) {
                                //将该中心下的一级区域直接挂到该中心下
                                expr = "#ul_cell_" + ctrlCellId;
                                $(expr).append("<li class='region_li'><a href='javascript:return 0'>" + $(this).find("RegionName").text() + "</a><ul id='ul_region_" + $(this).find("RegionID").text() + "'></ul></li>");
                                //记录一级区域Id
                                regionIds.push($(this).find("RegionID").text());
                            }else{
                                //该中心下的非一级区域入栈
                                regionsOff.push(this);
                            }
                        }
                    });

                    while(regionsOff.length > 0){
                        for(var j=0; j<regionsOff.length; ){
                            var regionNode = regionsOff[j];
                            expr = "#ul_region_" + $(regionNode).find("ParentRegID").text();
                            if($(expr).length > 0){
                                $(expr).append("<li class='region_li'><a href='javascript:return 0'>" + $(regionNode).find("RegionName").text() + "</a><ul id='ul_region_" + $(regionNode).find("RegionID").text() + "'></ul></li>");
                                regionsOff.splice(j,1);
                                regionIds.push($(regionNode).find("RegionID").text());
                            }else{
                                j++;
                            }
                        }
                    }
                }
                
                return regionIds;
            },
             // * 将监控点节点挂到各区域下
             // * @param {} xmlStr
             // * @param {} regionIds
            initCameraNodes(xmlStr, regionIds){
                var xmldom=this.getXmlDomFromStr(xmlStr);
                // console.log("CameraNodes是："+ xmldom);
                var expr;
                var cameras = $(xmldom).find("CameraInfo");
                for(var i=0; i<cameras.length; i++){
                    expr = "#ul_region_" + $(cameras[i]).find("RegionID").text();
                    $(expr).append("<li class='camera_li' ondblclick='hehehe(" + $(cameras[i]).find("CameraID").text() + ");'><a href='javascript:return 0'>" + $(cameras[i]).find("CameraName").text() + "</a></li>");
                } 
            },
            getXmlDomFromStr(xmlStr){
                var xmldom=null;
                if(navigator.userAgent.toLowerCase().indexOf("msie")!=-1){
                    xmldom=new ActiveXObject("Microsoft.XMLDOM");
                    xmldom.loadXML(xmlStr);
                }else{
                    xmldom=new DOMParser().parseFromString(xmlStr,"text/xml");
                }
                return xmldom;
            },
            setCameraIndexCode(cameraIndex) {
                document.getElementById("CamerIndexCode").value=cameraIndex;
            },
            setCameraId(cameraId) {
                document.getElementById("TextCameraId").value=cameraId;
            },
            startPreview(cameraId) {
                console.log("进入播放函数");
                var OCXobj = document.getElementById("PreviewOcx");
                var ret=OCXobj.StartTask_Preview_FreeWnd(cameraId);
                switch(ret){
                    case 0:
                        console.log("调用成功！");
                        break;
                    case -1:
                        console.log("调用失败！");
                        break;
                    default:
                        break;
                }
            },
            xmltojson(xmlObj,nodename,isarray){
               var obj=$(xmlObj);
               var itemobj={};
               var nodenames="";
               var getAllAttrs=function(node){//递归解析xml 转换成json对象
                  var _itemobj={};
                  var notNull=false;
                  var nodechilds=node.childNodes;
                  var childlenght=nodechilds.length;
                  var _attrs=node.attributes;
                  var firstnodeName="#text";
                  try{
                    firstnodeName=nodechilds[0].nodeName;
                  }catch(e){}
                  if((childlenght>0&&firstnodeName!="#text")||_attrs.length>0){
                     var _childs=nodechilds;
                     var _childslength=nodechilds.length;
                     var _fileName_="";
                     if(undefined!=_attrs){
                       var _attrslength=_attrs.length;
                       for(var i=0; i<_attrslength; i++){//解析xml节点属性
                        var attrname=_attrs[i].nodeName;
                        var attrvalue=_attrs[i].nodeValue;
                        _itemobj[attrname]=attrvalue;
                       }
                     }
                   for (var j = 0; j < _childslength; j++) {//解析xml子节点
                      var _node = _childs[j];
                      var _fildName = _node.nodeName;
                      if("#text"==_fildName){break;};
                      if(_itemobj[_fildName]!=undefined){//如果有重复的节点需要转为数组格式
                        if(!(_itemobj[_fildName] instanceof Array)){
                          var a=_itemobj[_fildName];
                          _itemobj[_fildName]=[a];//如果该节点出现大于一个的情况 把第一个的值存放到数组中
                        }
                      }
                      var _fildValue=getAllAttrs(_node);
                      try{
                        _itemobj[_fildName].push(_fildValue);
                      }catch(e){
                        _itemobj[_fildName]=_fildValue;
                        _itemobj["length"]=1;
                      }
                     }
                  }else{
                    _itemobj=(node.textContent==undefined)?node.text:node.textContent;
                  }
                  return _itemobj;
                };
               if(nodename){
                nodenames=nodename.split("/")
               }
               for(var i=0;i<nodenames.length;i++){
                 obj=obj.find(nodenames[i]);
               }
               $(obj).each(function(key,item){
                 if(itemobj[item.nodeName]!=undefined){
                   if(!(itemobj[item.nodeName] instanceof Array)){
                     var a=itemobj[item.nodeName];
                     itemobj[item.nodeName]=[a];
                   }
                   itemobj[item.nodeName].push(getAllAttrs(item));
                 }else{
                   if(nodenames.length>0){
                     itemobj[item.nodeName]=getAllAttrs(item);
                   }else{
                     itemobj[item.firstChild.nodeName]=getAllAttrs(item.firstChild);
                   }
                 }
               });
               if(nodenames.length>1){
                 itemobj=itemobj[nodenames[nodenames.length-1]];
               }
               if(isarray&&!(itemobj instanceof Array)&&itemobj!=undefined){
                 itemobj=[itemobj];
               }
              return itemobj;
            },
            loadXml(str) {
              if (str == null) {
               return null;
              }
              var doc = str;
              try{
               doc = createXMLDOM();
               doc.async = false;
               doc.loadXML(str);
              }catch(e){
               doc = $.parseXML(str);
              }
              return doc;
            },
 
        }
    }
</script>

