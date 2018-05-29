<template>
    <div class="electronicMap">
        <!--面包导航组件-->
        <Bread :breadData="abc"></Bread>
        <div class="content">
            <!--地图视口-->
            <div class="box_top">
                <div id="XSDFXPage" class="XSDFXPage"></div>
                <span class="newdevice1"></span>
                <span class="newdevice2"></span>
                <span class="newdevice3"></span>
                <span class="newdevice4"></span>
                <div class="ipt">
                    <input type="checkbox" value="">显示电量
                    <input type="checkbox" value="" class="ipt2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;显示巡更进度
                </div>
                <!--图标位置-->
                <div class="icon_list">
                    <ul>
                        <li @click="show(inOut,inOutImg)">
                            <span>出&nbsp;入</span>
                        </li>
                        <li @click="show(vedio,vedioImg)">
                            <span>视&nbsp;频</span>
                        </li>
                        <li @click="show(watch,watchImg)">
                            <span>巡&nbsp;更</span>
                        </li>
                        <li @click="show(equipment,equipmentImg)">
                            <span>设&nbsp;备</span>
                        </li>
                        <li @click="show(elevator,elevatorImg)">
                            <span>电&nbsp;梯</span>
                        </li>
                        <li @click="showAll()">
                            <span>全&nbsp;部</span>
                        </li>
                        <li>
                            <span>消&nbsp;防</span>
                        </li>
                        <li>
                            <span>环&nbsp;镜</span>
                        </li>
                        <li>
                            <span>边&nbsp;界</span>
                        </li>
                    </ul>
                </div>
            </div>
            <!--右边列表-->
            <div class="box_list">
                <div class="call_center">
                    <span>报警中心</span>
                    <span>今日报警数<strong>57</strong></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Bread from '@/components/common/bread'
import inAndOut from "../../../images/inAndOut.png"
import vedio from '../../../images/vedio.png'
import watch from '../../../images/watchman.png'
import equipment from '../../../images/equipment.png'
import elevator from '../../../images/elevator.png'
import all from '../../../images/all.png'

export default {
    data() {
        return {
            abc: ['物联监控', '物联电子地图'],
            inOutImg:inAndOut,
            vedioImg:vedio,
            watchImg:watch,
            equipmentImg:equipment,
            elevatorImg:elevator,
            inOut:[
                {"x":"114.059223","y":"22.539379"},
                {"x":"114.057751","y":"22.53922"},
                {"x":"114.059217","y":"22.538407"},
                {"x":"114.057751","y":"22.53922"},
                {"x":"114.05858","y":"22.540045"},
                {"x":"114.05866","y":"22.53954"},
                {"x":"114.058386","y":"22.539532"},
                {"x":"114.058463","y":"22.539782"},
                {"x":"114.058633","y":"22.539811"}
            ],
            vedio:[
                {"x":"114.058539","y":"22.54002"},
                {"x":"114.05848","y":"22.539694"},
                {"x":"114.058368","y":"22.53984"},
                {"x":"114.058597","y":"22.540028"},
                {"x":"114.058665","y":"22.539715"},
                {"x":"114.058373","y":"22.539523"},
                {"x":"114.058049","y":"22.53921"},
                {"x":"114.058049","y":"22.53921"},
                {"x":"114.058606","y":"22.539523"}
            ],
            watch:[
                {"x":"114.057847","y":"22.539369"}
            ],
            equipment:[
                {"x":"114.057865","y":"22.539415"}
            ],
            elevator:[
                {"x":"114.058391","y":"22.538539"},
                {"x":"114.058791","y":"22.538555"},
                {"x":"114.059285","y":"22.538968"},
                {"x":"114.059339","y":"22.539173"},
                {"x":"114.058018","y":"22.539006"},
                {"x":"114.058018","y":"22.539006"},
                {"x":"114.058018","y":"22.539006"},
                {"x":"114.058018","y":"22.539006"},
                {"x":"114.058571","y":"22.539465"},
                {"x":"114.058975","y":"22.539982"}
            ],
            all:[
                {"x":"114.059223","y":"22.539379","icon":"inAndOut"},
                {"x":"114.057751","y":"22.53922","icon":"inAndOut"},
                {"x":"114.059217","y":"22.538407","icon":"inAndOut"},
                {"x":"114.057751","y":"22.53922","icon":"inAndOut"},
                {"x":"114.05858","y":"22.540045","icon":"inAndOut"},
                {"x":"114.05866","y":"22.53954","icon":"inAndOut"},
                {"x":"114.058386","y":"22.539532","icon":"inAndOut"},
                {"x":"114.058463","y":"22.539782","icon":"inAndOut"},
                {"x":"114.058633","y":"22.539811","icon":"inAndOut"},
                {"x":"114.058539","y":"22.54002","icon":"vedio"},
                {"x":"114.05848","y":"22.539694","icon":"vedio"},
                {"x":"114.058368","y":"22.53984","icon":"vedio"},
                {"x":"114.058597","y":"22.540028","icon":"vedio"},
                {"x":"114.058665","y":"22.539715","icon":"vedio"},
                {"x":"114.058373","y":"22.539523","icon":"vedio"},
                {"x":"114.058049","y":"22.53921","icon":"vedio"},
                {"x":"114.058049","y":"22.53921","icon":"vedio"},
                {"x":"114.058606","y":"22.539523","icon":"vedio"},
                {"x":"114.057847","y":"22.539369","icon":"watch"},
                {"x":"114.057865","y":"22.539415","icon":"equipment"},
                {"x":"114.058391","y":"22.538539","icon":"elevator"},
                {"x":"114.058791","y":"22.538555","icon":"elevator"},
                {"x":"114.059285","y":"22.538968","icon":"elevator"},
                {"x":"114.059339","y":"22.539173","icon":"elevator"},
                {"x":"114.058018","y":"22.539006","icon":"elevator"},
                {"x":"114.058018","y":"22.539006","icon":"elevator"},
                {"x":"114.058018","y":"22.539006","icon":"elevator"},
                {"x":"114.058018","y":"22.539006","icon":"elevator"},
                {"x":"114.058571","y":"22.539465","icon":"elevator"},
                {"x":"114.058975","y":"22.539982","icon":"elevator"}
            ]
        }
    },
    computed: {

    },
    components: {
        Bread,
    },
    mounted() {
        this.initMap();
        this.showAll();
    },
    methods: {
        initMap(){
            // 创建Map实例及设置类型
            var map = new BMap.Map("XSDFXPage", {mapType:BMAP_PERSPECTIVE_MAP});
            // 设置中心点坐标
            var point = new BMap.Point(114.058167,22.539506);
            // 设置地图显示的城市(必须)
            map.setCurrentCity("深圳市");
            // 设置地图级别:1-19越大越清晰
            map.centerAndZoom(point,18);
            // 设置鼠标滚轮缩放
            map.enableScrollWheelZoom(true);
            return map
        },
        show(data,icon){
            var _map = this.initMap();
            for(var i=0; i<=data.length-1; i++){
                var myIcon = new BMap.Icon(icon, new BMap.Size(20, 20));
                var marker = new BMap.Marker(new BMap.Point(data[i].x,data[i].y), {icon: myIcon});
                _map.addOverlay(marker);
            }
        },
        showAll(){
            var _map = this.initMap();
            for(var i=0; i<=this.all.length-1; i++){
                if(this.all[i].icon == "inAndOut"){
                    var myIcon = new BMap.Icon(inAndOut, new BMap.Size(20, 20));
                }
                else if(this.all[i].icon == "vedio"){
                    var myIcon = new BMap.Icon(vedio, new BMap.Size(20, 20));
                }
                else if(this.all[i].icon == "watch"){
                    var myIcon = new BMap.Icon(watch, new BMap.Size(20, 20));
                }
                else if(this.all[i].icon == "equipment"){
                    var myIcon = new BMap.Icon(equipment, new BMap.Size(20, 20));
                }
                else if(this.all[i].icon == "elevator"){
                    var myIcon = new BMap.Icon(elevator,new BMap.Size(20, 20));
                }
                var marker = new BMap.Marker(new BMap.Point(this.all[i].x,this.all[i].y), {icon: myIcon});
                _map.addOverlay(marker);
            }
        }
    },
    created(){

    }
}
</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';
    $padding_top: 0.1rem;
    span,
    button,
    select,
    input {
        color: #fff;
    }
    .electronicMap {
        vertical-align: top;
        width: 100%;
        height: 100%; 
    }
    .content {
        width: 13.65rem;
        height: 8.04rem;
        margin: 0 auto;
        margin-top:-0.3rem;
        position: relative;
        .box_top {
            width:14.42rem;
            height: 8.05rem;;
            background: rgba(123, 123, 231, .4);
            background-size: contain;
            margin-top: 0.42rem;
            margin-left: -0.4rem;
            display: flex;
            justify-content: center;
            align-items: center;;
            position: relative;
            padding-bottom:1.1rem;
            span {
                display: inline-block;
                width: 0.4rem;
                height: 0.4rem;
            }
            .ipt {
                width: 2.75rem;
                height: 0.47rem;
                position: absolute;
                right: 3.3rem;
                color: #fff;
                top: 0.4rem;
                input{
                    position:absolute;
                }
                input:nth-child(1){
                    margin-right:0.04rem;
                    right:2.7rem;
                    top:0.01rem;
                    margin-right:0.1rem;
                }
                .ipt2 {
                    margin-left: 0.15rem;
                    margin-top: 0.01rem;
                }
            }
            .newdevice1 {
                background: url(../../../images/newdevice1.png);
                background-size: 100% 100%;
                position: absolute;
                left: -0.14rem;
                top: -0.14rem;
            }
            .newdevice2 {
                background: url(../../../images/newdevice2.png);
                background-size: 100% 100%;
                position: absolute;
                right: -0.14rem;
                top: -0.14rem;
            }
            .newdevice3 {
                background: url(../../../images/newdevice3.png);
                background-size: 100% 100%;
                position: absolute;
                left: -0.14rem;
                bottom: -0.14rem;
            }
            .newdevice4 {
                background: url(../../../images/newdevice4.png);
                background-size: 100% 100%;
                position: absolute;
                right: -0.14rem;
                bottom: -0.14rem;
            }
            .icon_list{
                width:100%;
                position:absolute;
                bottom:0.1rem;
                left:0.30rem;
                ul{
                    li{
                        width:1.26rem;
                        height: 0.5rem;
                        float:left;
                        margin-right:-0.06rem;
                        @include aa;
                        span{
                            display:inline-block;
                            width: 100%;
                            height: 100%;
                            font-size:0.19rem;
                        }
                    }
                    li:nth-child(1){
                        background:url('../../../images/inAndOut.png') no-repeat;
                        background-size:0.32rem;
                        padding: 0.04rem 0rem 0rem 0.4rem;
                    }
                    li:nth-child(2){
                        background:url('../../../images/vedio.png') no-repeat;
                        background-size:0.32rem;
                        padding: 0.04rem 0rem 0rem 0.4rem;
                    }
                    li:nth-child(3){
                        background:url('../../../images/watchman.png') no-repeat;
                        background-size:0.32rem;
                        padding: 0.04rem 0rem 0rem 0.4rem;
                    }
                    li:nth-child(4){
                        background:url('../../../images/equipment.png') no-repeat;
                        background-size:0.32rem;
                        padding: 0.04rem 0rem 0rem 0.4rem;
                    }
                    li:nth-child(5){
                        background:url('../../../images/elevator.png') no-repeat;
                        background-size:0.32rem;
                        padding: 0.04rem 0rem 0rem 0.4rem;
                    }
                    li:nth-child(6){
                        background:url('../../../images/all.png') no-repeat;
                        background-size:0.32rem;
                        padding: 0.04rem 0rem 0rem 0.4rem;
                    }
                    li:nth-child(7){
                        background:url('../../../images/all.png') no-repeat;
                        background-size:0.32rem;
                        padding: 0.04rem 0rem 0rem 0.4rem;
                    }
                    li:nth-child(8){
                        background:url('../../../images/all.png') no-repeat;
                        background-size:0.32rem;
                        padding: 0.04rem 0rem 0rem 0.4rem;
                    }
                    li:nth-child(9){
                        background:url('../../../images/all.png') no-repeat;
                        background-size:0.32rem;
                        padding: 0.04rem 0rem 0rem 0.4rem;
                    }
                }
            }
        }
        .box_list{
            position: absolute;
            top:0rem;
            right:-0.2rem;
            .call_center{
                width: 3.3rem;
                height:0.67rem;
                line-height: 0.67rem;
                border:2px solid gray;
                span{
                    display:inline-block;
                    font-size:0.2rem;
                    strong{
                        font-size:0.25rem;
                    }
                }

            }
        }
    }
    

html,body,.XSDFXPage{
    width: 73%;
    height:100%;
    overflow: hidden;
    margin-left:-3.3rem;
    margin-top: 0.5rem;
    font-family: "微软雅黑";
}
</style>