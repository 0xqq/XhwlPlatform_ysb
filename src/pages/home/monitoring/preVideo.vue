<template>
<div class="back_ground">
     <!--面包导航组件-->
    <Bread :breadData="abc"></Bread>
    <div class="pre_video">
        <div>{{}}</div>
        <div class="flex_video">
            <object classid="clsid:AC036352-03EB-4399-9DD0-602AB1D8B6B9" class="video_obj" id="PreviewOcx"  name="ocx" >
                </object>
        </div>
        <transition name="el-zoom-in-center">
            <div id="cameraList" class="video_tree" v-show="treeFlag">
                <span class="load_span" v-if="loadFlag">登陆中，请稍候...</span>
                <ul id="tree" class="list_tree"></ul>
            </div>
        </transition>
        <button type="" class="hide_tree" @click="hideTree" v-show="treeFlag"></button>
    </div>
    <button type="" class="show_tree" @click="showTree" v-show="!treeFlag">
        <div>
            <span>配</span>
        </div>
        <div>
            <span>置</span>
        </div>
        <div>
            <span>监</span>
        </div>
        <div>
            <span>控</span>
        </div>
        <div>
            <span>点</span>
        </div>
    </button>
</div>
</template>
<!-- <script src="../../script/playView.js" type="text/javascript"></script> -->

<style lang="scss" scoped>
    @import 'src/style/mixin';
    .back_ground{
        width: 100%;
        height: 100%;
        position:relative;
    }
    .pre_video{
        width: 100%;
        height: 8rem;
        margin: 0 auto;
        overflow:hidden;
        position: relative;
        // border:2px solid green;
        overflow-x: hidden;
        display: flex;
        .hide_tree{
            width: 0.3rem;
            height: 0.3rem;
            background-color: transparent;
            background-image: url(../../../images/arrows.png);
            background-size: 100% 100%;
            position: absolute;
            right: 0;
            top: 50%;
            margin-top: -0.3rem;
            transform: translateY(-50%);
            @include aa;
            &:hover{
                background-image: url(../../../images/actArrows.png);
                background-size: 100% 100%;
            }
        }
    }
    .flex_video{
        flex: 7.5;
        // border:2px solid red;
        .video_obj{
            width: 100%;
            height: 100%;
        }
    }
    .video_tree{
        background-color: rgba(163,219,255,0.3);
        flex: 2;
        overflow:auto;
        position: relative;
        // border: thin solid #808080;
        .list_tree{

            float: right;
            width: 2.9rem;
            height: 100%;
        }
    }
    .load_span{
        @include cl2;
    }
    .control_unit_li{
        padding-left: 100px;
    }
    .show_tree{
        background-color: rgba(163,219,255,0.3);
        height: 1.5rem;
        width: 0.6rem;
        border-radius: 0.3rem 0.3rem;
        position: absolute;
        top: 50%;
        right: -0.35rem;
        transform: translate(50%, -50%);
        @include aa;
        &:hover{
            div{
                span{
                    color: #83dbff;
                }
            }
        }
        div{
            text-align: left;
            height: 0.2rem;
            margin-left: 0.05rem;
            span{
                font-size: 0.14rem;
            }
        }
    }

</style>

<script>
    import $ from 'jquery'
    import Bread from '@/components/common/bread'
    export default {
        data () {
            return {
                abc: ['物联监控','视频物联监控','实时预览'],
                treeFlag: false,
                loading: true,
                loadFlag: true,
            }
        },
        mounted(){
            var refThis = this;
            console.log("进入钩子");
            setTimeout(function(){
                console.log("3s运行");
                refThis.loginCMS();
                refThis.SetlocalParam();    //设置拍照和录像参数
            },1000);
        },
        components: {
            Bread
        },
        methods:{
            // getPicture(){
            //     var c=document.getElementById("myCanvas");
            //     var ctx=c.getContext("2d");
            //     var img=document.getElementById("pre_video");
            //     ctx.drawImage(img,0,0);
            // },
            showTree(){
                this.treeFlag = true;
            },
            hideTree(){
                this.treeFlag = false;
            },
            loginCMS(){
                console.log("登陆程序");
                var userName= 'yanfa';
                var pw='yf1234567';
                var ipAdd= '202.105.104.109';
                var port= '80';
                // console.log(userName);
                if(!(parseInt(port)>=0 && parseInt(port)<=2147483647)){
                    return;
                }
                var OCXobj = document.getElementById("PreviewOcx");
                var ret=OCXobj.Login(ipAdd,port,userName,pw);
                switch(ret){
                    case 0:
                        this.initTree();
                        this.loading = false;
                        break;
                    case -1:
                        // clearTree();
                        this.loading = false;
                        alert("登录失败！");
                        break;
                    default:
                        break;
                }

            },
            initTree(){
                var OCXobj = document.getElementById("PreviewOcx");
                var trees = document.getElementById('tree');
                $("#tree").html("");
                //初始化中心节点
                var xmlStr = OCXobj.GetResourceInfo(1); //获取一级列表中海物业集团和空ul的xml字符串
                var orderdCellIds = this.initControlUnitNodes(xmlStr);   //把xml赋给dom树，产生中海物业集团和空ul
                //初始化区域节点
                if(orderdCellIds.length > 0){
                    xmlStr = OCXobj.GetResourceInfo(2);     //获取所有
                    var regionIds = this.initRegionNodes(xmlStr, orderdCellIds);     //把xml赋给dom树，产生广州云麓公馆和空ul
                    //初始化监控点节点
                    if(regionIds.length > 0){
                        xmlStr = OCXobj.GetResourceInfo(4);
                        this.initCameraNodes(xmlStr, regionIds);
                    }
                }
                $("#tree a").click(function(){
                    //找到主菜单项对应的子菜单项
                    $(this).next("ul").slideToggle();
                    // this.changeIcon($(this).parent("li"));
                });
                this.loadFlag = false;
                // OCXobj.SetWndNum(4);
                // OCXobj.StartTask_Preview("1437");
                // OCXobj.StartTask_Preview_InWnd("1684",1);
                OCXobj.StartTask_Preview_InWnd("1586",0);
                OCXobj.StartTask_Preview_InWnd("656",1);
                OCXobj.StartTask_Preview_InWnd("806",2);
                OCXobj.StartTask_Preview_InWnd("1283",3);
            },
            initControlUnitNodes(xmlStr){
                var xmldom=this.getXmlDomFromStr(xmlStr);
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
            SetlocalParam(){
                var PicType = '0';
                var PicPath = "C:"+ "\\"+ "CapPic";
                var PicCapType = '0';
                var PicSpanTime = '500';
                var PicCounts = '3';
                var RecordType = '0';
                var MaxRecordTimes = '7200';
                var RecordTimes = '3600';
                var RecordPath = 'C:\\Record';
                var RecordSize = '512000000';

                if(PicPath=="" || RecordPath==""){
                    // alert("保存路径不能为空！");
                    return;
                }

                var OCXobj = document.getElementById("PreviewOcx");

                //设置图片保存路径和格式
                if (PicCapType == 1) {
                    if (PicCounts == "") {
                        // alert("设置张数不能为空！");
                        return;
                    }
                    var iRet = OCXobj.SetCaptureParam(PicType, PicPath, PicCapType, 0, PicCounts);
                    switch (iRet) {
                        case -1:
                            // alert("SetCaptureParam接口调用失败！错误码：" + OCXobj.GetLastError());
                            break;
                        case 0:
                            // alert("SetCaptureParam接口调用成功！");
                            break;
                        default:
                            break;
                    }
                }
                else if (PicCapType == 0) {
                    if (PicCounts == "" || PicSpanTime == "") {
                        // alert("设置张数和抓拍时间间隔不能为空！");
                        return;
                    }
                    var iRet = OCXobj.SetCaptureParam(PicType, PicPath, PicCapType, PicSpanTime, PicCounts);
                    switch (iRet) {
                        case -1:
                            // alert("SetCaptureParam接口调用失败！错误码：" + OCXobj.GetLastError());
                            break;
                        case 0:
                            // alert("SetCaptureParam接口调用成功！");
                            break;
                        default:
                            break;
                    }
                }
                //设置保存图片磁盘空间最小值
                //OCXobj.SetPicDiskMinSize(minSpace4Pic);               //0813 zdy
                //showMethodInvokedInfo("SetPicDiskMinSize接口调用成功！"); //0813 zdy
                   //设置录像保存路径和文件大小
                    if (RecordType == 0) {
                        if (MaxRecordTimes == "" || RecordTimes == "") {
                        // alert("设置分包时间和最大录像时间不能为空");
                        return;
                    }
                    var iRet = OCXobj.SetRecordParam(RecordPath, 10, RecordTimes, RecordType);
                        switch(iRet) {
                            case -1:
                                // alert("SetRecordParam接口调用失败！错误码：" + OCXobj.GetLastError());
                                break;
                            case 0:
                                // alert("SetRecordParam接口调用成功！");
                                break;
                            default:
                                break;
                        }
                    }
                    else if (RecordType == 1) {
                        if (MaxRecordTimes == "") {
                            // alert("设置最大录像时间不能为空");
                            return;
                        }
                        var iRet = OCXobj.SetRecordParam(RecordPath, RecordSize, 10, RecordType);
                        switch (iRet) {
                            case -1:
                                // alert("SetRecordParam接口调用失败！错误码：" + OCXobj.GetLastError());
                                break;
                            case 0:
                                // alert("SetRecordParam接口调用成功！");
                                break;
                            default:
                                break;
                        }
                    }
            }
        }
    }
</script>
