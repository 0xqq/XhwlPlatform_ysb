<template>
    <div class="electronicMap">
        <!--面包导航组件-->
        <Bread :breadData="abc"></Bread>
        <div class="content">
            <span class="newdevice1"></span>
            <span class="newdevice2"></span>
            <span class="newdevice3"></span>
            <span class="newdevice4"></span>
            <!--地图视口-->
            <div class="box_top">
                <div id="XSDFXPage" class="XSDFXPage"></div>
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
                        <li @click="show(fireControl,firecontrolImg)">
                            <span>消&nbsp;防</span>
                        </li>
                        <li @click="show(environment,huanjingImg)">
                            <span>环&nbsp;镜</span>
                        </li>
                        <li @click="show(boundary,boundaryImg)">
                            <span>周&nbsp;界</span>
                        </li>
                        <li @click="showAll()">
                            <span>全&nbsp;部</span>
                        </li>
                    </ul>
                </div>
            </div>
            <!--右边列表-->
            <div class="box_list">
                <div class="call_center">
                    <span>报警中心</span>
                    <span class="circle">18</span>
                    <span>今日报警数</span>
                    <span class="num">57</span>
                </div>
                <div class="bottom">
                    <div class="out">
                        <div class="head">
                            <span class="title">出入系统</span>
                            <span class="elert_num">2</span>
                            <span class="icon">》</span>
                            <span class="getmore">更多</span>
                        </div>
                        <div class="info_content">
                            <ul>
                                <li>
                                    <span class="info_time">[10:12:18]</span>
                                    <span class="info_type">[设备报警]</span>
                                    <span class="info_text">1#道闸故障</span>
                                </li>
                                <li>
                                    <span class="info_time">[12:42:30]</span>
                                    <span class="info_type">[异常报警]</span>
                                    <span class="info_text">1#道闸车辆追尾</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="yuntong">
                        <div class="head">
                            <span class="title">云瞳系统</span>
                            <span class="elert_num">3</span>
                            <span class="icon">》</span>
                            <span class="getmore">更多</span>
                        </div>
                        <div class="info_content">
                            <ul>
                                <li>
                                    <span class="info_time">[11:22:18]</span>
                                    <span class="info_type">[设备报警]</span>
                                    <span class="info_text">游泳池1#摄像头离线</span>
                                </li>
                                <li>
                                    <span class="info_time">[10:51:20]</span>
                                    <span class="info_type">[人员入侵]</span>
                                    <span class="info_text">东门1#摄像头可疑人员入侵</span>
                                </li>
                                <li>
                                    <span class="info_time">[09:14:11]</span>
                                    <span class="info_type">[人员入侵]</span>
                                    <span class="info_text">东门1#摄像头可疑人员徘徊</span>
                                </li>
                                <li>
                                    <span class="info_time">[07:24:18]</span>
                                    <span class="info_type">[视频遮挡]</span>
                                    <span class="info_text">会所1#摄像头被遮挡</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="work">
                        <div class="head">
                            <span class="title">工作人员</span>
                            <span class="elert_num">2</span>
                            <span class="icon">》</span>
                            <span class="getmore">更多</span>
                        </div>
                        <div class="info_content">
                            <ul>
                                <li>
                                    <span class="info_time">[10:12:18]</span>
                                    <span class="info_type">[人员报警]</span>
                                    <span class="info_text">巡更员：魏国强：11栋南墙水泥脱落</span>
                                </li>
                                <li>
                                    <span class="info_time">[08:12:23]</span>
                                    <span class="info_type">[脱岗报警]</span>
                                    <span class="info_text">1#岗巡更人员脱岗</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="electri">
                        <div class="head">
                            <span class="title">机房设备</span>
                            <span class="elert_num">2</span>
                            <span class="icon">》</span>
                            <span class="getmore">更多</span>
                        </div>
                        <div class="info_content">
                            <ul>
                                <li>
                                    <span class="info_time">[11:17:11]</span>
                                    <span class="info_type">[设备报警]</span>
                                    <span class="info_text">1#变压器温度过高</span>
                                </li>
                                <li>
                                    <span class="info_time">[08:12:18]</span>
                                    <span class="info_type">[能耗报警]</span>
                                    <span class="info_text">1#污水泵能耗过高</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="elevator">
                        <div class="head">
                            <span class="title">电梯系统</span>
                            <span class="elert_num">2</span>
                            <span class="icon">》</span>
                            <span class="getmore">更多</span>
                        </div>
                        <div class="info_content">
                            <ul>
                                <li>
                                    <span class="info_time">[06:12:11]</span>
                                    <span class="info_type">[设备报警]</span>
                                    <span class="info_text">1#电梯门敞开</span>
                                </li>
                                <li>
                                    <span class="info_time">[10:12:18]</span>
                                    <span class="info_type">[困人报警]</span>
                                    <span class="info_text">1#电梯有人被困，紧急救助</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="elevator">
                        <div class="head">
                            <span class="title">消防系统</span>
                            <span class="elert_num">2</span>
                            <span class="icon">》</span>
                            <span class="getmore">更多</span>
                        </div>
                        <div class="info_content">
                            <ul>
                                <li>
                                    <span class="info_time">[10:12:11]</span>
                                    <span class="info_type">[消防报警]</span>
                                    <span class="info_text">11栋7层冒浓烟</span>
                                </li>
                                <li>
                                    <span class="info_time">[09:12:18]</span>
                                    <span class="info_type">[设备报警]</span>
                                    <span class="info_text">1#消防管破损</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="elevator">
                        <div class="head">
                            <span class="title">环境监测</span>
                            <span class="elert_num">2</span>
                            <span class="icon">》</span>
                            <span class="getmore">更多</span>
                        </div>
                        <div class="info_content">
                            <ul>
                                <li>
                                    <span class="info_time">[10:12:11]</span>
                                    <span class="info_type">[设备报警]</span>
                                    <span class="info_text">1#空气质量监测设备离线</span>
                                </li>
                                <li>
                                    <span class="info_time">[09:12:18]</span>
                                    <span class="info_type">[环境指数报警]</span>
                                    <span class="info_text">1游泳池水PH值超标</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="elevator">
                        <div class="head">
                            <span class="title">周界防范</span>
                            <span class="elert_num">1</span>
                            <span class="icon">》</span>
                            <span class="getmore">更多</span>
                        </div>
                        <div class="info_content">
                            <ul>
                                <li>
                                    <span class="info_time">[10:12:11]</span>
                                    <span class="info_type">[设备报警]</span>
                                    <span class="info_text">1#电子围栏离线</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="call_center1">
                    <span>未处理</span>
                    <span class="circle1">18</span>
                    <span>已处理</span>
                    <span class="num1">39</span>
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
import fireControl from '../../../images/fireControl.png'
import boundary from '../../../images/boundary.png'
import environment from '../../../images/huanjing.png'
import { mapState } from 'vuex'
export default {
    data() {
        return {
            abc: ['物联监控', '园区电子地图', '电子地图'],
            inOutImg: inAndOut,
            vedioImg: vedio,
            watchImg: watch,
            equipmentImg: equipment,
            elevatorImg: elevator,
            firecontrolImg: fireControl,
            huanjingImg: environment,
            boundaryImg: boundary,
            inOut: [
                { "x": "114.059223", "y": "22.539379" },
                { "x": "114.058463", "y": "22.539782" },
                { "x": "114.058633", "y": "22.539811" },
                { "x": "114.057751", "y": "22.53922" },
                { "x": "114.05866", "y": "22.53954" },
                { "x": "114.058386", "y": "22.539532" },
                { "x": "114.059217", "y": "22.538407" },
                { "x": "114.05858", "y": "22.540045" },
                { "x": "114.057751", "y": "22.53922" }
            ],
            vedio: [
                { "x": "114.058049", "y": "22.53921" },
                { "x": "114.058665", "y": "22.539715" },
                { "x": "114.058373", "y": "22.539523" },
                { "x": "114.058606", "y": "22.539523" },
                { "x": "114.058597", "y": "22.540028" },
                { "x": "114.058539", "y": "22.54002" },
                { "x": "114.05848", "y": "22.539694" },
                { "x": "114.058368", "y": "22.53984" },
                { "x": "114.058049", "y": "22.53921" }
            ],
            watch: [
                { "x": "114.057847", "y": "22.539369" }
            ],
            equipment: [
                { "x": "114.057865", "y": "22.539415" }
            ],
            elevator: [
                { "x": "114.058571", "y": "22.539465" },
                { "x": "114.058975", "y": "22.539982" },
                { "x": "114.058018", "y": "22.539006" },
                { "x": "114.058018", "y": "22.539006" },
                { "x": "114.058018", "y": "22.539006" },
                { "x": "114.058018", "y": "22.539006" },
                { "x": "114.058391", "y": "22.538539" },
                { "x": "114.059285", "y": "22.538968" },
                { "x": "114.058791", "y": "22.538555" },
                { "x": "114.059339", "y": "22.539173" }
            ],
            all: [
                { "x": "114.059223", "y": "22.539379", "icon": "inAndOut" },
                { "x": "114.057751", "y": "22.53922", "icon": "inAndOut" },
                { "x": "114.059217", "y": "22.538407", "icon": "inAndOut" },
                { "x": "114.057751", "y": "22.53922", "icon": "inAndOut" },
                { "x": "114.05858", "y": "22.540045", "icon": "inAndOut" },
                { "x": "114.05866", "y": "22.53954", "icon": "inAndOut" },
                { "x": "114.058386", "y": "22.539532", "icon": "inAndOut" },
                { "x": "114.058463", "y": "22.539782", "icon": "inAndOut" },
                { "x": "114.058633", "y": "22.539811", "icon": "inAndOut" },
                { "x": "114.058539", "y": "22.54002", "icon": "vedio" },
                { "x": "114.05848", "y": "22.539694", "icon": "vedio" },
                { "x": "114.058368", "y": "22.53984", "icon": "vedio" },
                { "x": "114.058597", "y": "22.540028", "icon": "vedio" },
                { "x": "114.058665", "y": "22.539715", "icon": "vedio" },
                { "x": "114.058373", "y": "22.539523", "icon": "vedio" },
                { "x": "114.058049", "y": "22.53921", "icon": "vedio" },
                { "x": "114.058049", "y": "22.53921", "icon": "vedio" },
                { "x": "114.058606", "y": "22.539523", "icon": "vedio" },
                { "x": "114.057847", "y": "22.539369", "icon": "watch" },
                { "x": "114.057865", "y": "22.539415", "icon": "equipment" },
                { "x": "114.058391", "y": "22.538539", "icon": "elevator" },
                { "x": "114.058791", "y": "22.538555", "icon": "elevator" },
                { "x": "114.059285", "y": "22.538968", "icon": "elevator" },
                { "x": "114.059339", "y": "22.539173", "icon": "elevator" },
                { "x": "114.058018", "y": "22.539006", "icon": "elevator" },
                { "x": "114.058018", "y": "22.539006", "icon": "elevator" },
                { "x": "114.058018", "y": "22.539006", "icon": "elevator" },
                { "x": "114.058018", "y": "22.539006", "icon": "elevator" },
                { "x": "114.058571", "y": "22.539465", "icon": "elevator" },
                { "x": "114.058975", "y": "22.539982", "icon": "elevator" },
                { "x": "114.058472", "y": "22.538505", "icon": "fireControl" },
                { "x": "114.058773", "y": "22.538522", "icon": "fireControl" },
                { "x": "114.059258", "y": "22.538785", "icon": "fireControl" },
                { "x": "114.057901", "y": "22.539027", "icon": "fireControl" },
                { "x": "114.057946", "y": "22.539411", "icon": "fireControl" },
                { "x": "114.057879", "y": "22.540024", "icon": "fireControl" },
                { "x": "114.058341", "y": "22.540016", "icon": "fireControl" },
                { "x": "114.058705", "y": "22.540011", "icon": "fireControl" },
                { "x": "114.057924", "y": "22.538513", "icon": "fireControl" },
                { "x": "114.058598", "y": "22.539448", "icon": "fireControl" },
                { "x": "114.058557", "y": "22.539774", "icon": "fireControl" },
                { "x": "114.058485", "y": "22.539703", "icon": "fireControl" },
                { "x": "114.058633", "y": "22.540112", "icon": "fireControl" },
                { "x": "114.058449", "y": "22.538947", "icon": "fireControl" },
                { "x": "114.058934", "y": "22.53929", "icon": "fireControl" },
                { "x": "114.059289", "y": "22.538597", "icon": "fireControl" },
                { "x": "114.058162", "y": "22.539156", "icon": "fireControl" },
                { "x": "114.058404", "y": "22.53921", "icon": "environment" },
                { "x": "114.05884", "y": "22.539014", "icon": "environment" },
                { "x": "114.058153", "y": "22.539928", "icon": "environment" },
                { "x": "114.058386", "y": "22.538872", "icon": "environment" },
                { "x": "114.058153", "y": "22.540036", "icon": "environment" },
                { "x": "114.059442", "y": "22.539244", "icon": "boundary" },
                { "x": "114.059451", "y": "22.538735", "icon": "boundary" },
                { "x": "114.058889", "y": "22.538351", "icon": "boundary" },
                { "x": "114.058184", "y": "22.538355", "icon": "boundary" },
                { "x": "114.057686", "y": "22.538722", "icon": "boundary" },
                { "x": "114.05769", "y": "22.539365", "icon": "boundary" },
                { "x": "114.05809", "y": "22.539536", "icon": "boundary" },
                { "x": "114.05884", "y": "22.539552", "icon": "boundary" },
                { "x": "114.059428", "y": "22.539765", "icon": "boundary" },
                { "x": "114.059433", "y": "22.540082", "icon": "boundary" },
                { "x": "114.05893", "y": "22.539673", "icon": "boundary" },
                { "x": "114.058409", "y": "22.539678", "icon": "boundary" },
                { "x": "114.057726", "y": "22.539719", "icon": "boundary" },
                { "x": "114.057717", "y": "22.54002", "icon": "boundary" },
                { "x": "114.057996", "y": "22.540157", "icon": "boundary" },
                { "x": "114.058714", "y": "22.540182", "icon": "boundary" }
            ],
            fireControl:
            [
                { "x": "114.058472", "y": "22.538505" },
                { "x": "114.058773", "y": "22.538522" },
                { "x": "114.059258", "y": "22.538785" },
                { "x": "114.057901", "y": "22.539027" },
                { "x": "114.057946", "y": "22.539411" },
                { "x": "114.057879", "y": "22.540024" },
                { "x": "114.058341", "y": "22.540016" },
                { "x": "114.058705", "y": "22.540011" },
                { "x": "114.057924", "y": "22.538513" },
                { "x": "114.058598", "y": "22.539448" },
                { "x": "114.058557", "y": "22.539774" },
                { "x": "114.058485", "y": "22.539703" },
                { "x": "114.058633", "y": "22.540112" },
                { "x": "114.058449", "y": "22.538947" },
                { "x": "114.058934", "y": "22.53929" },
                { "x": "114.059289", "y": "22.538597" },
                { "x": "114.058162", "y": "22.539156" }
            ],
            environment: [
                { "x": "114.058404", "y": "22.53921" },
                { "x": "114.05884", "y": "22.539014" },
                { "x": "114.058153", "y": "22.539928" },
                { "x": "114.058386", "y": "22.538872" },
                { "x": "114.058153", "y": "22.540036" },
            ],
            boundary:
            [
                { "x": "114.059442", "y": "22.539244" },
                { "x": "114.059451", "y": "22.538735" },
                { "x": "114.058889", "y": "22.538351" },
                { "x": "114.058184", "y": "22.538355" },
                { "x": "114.057686", "y": "22.538722" },
                { "x": "114.05769", "y": "22.539365" },
                { "x": "114.05809", "y": "22.539536" },
                { "x": "114.05884", "y": "22.539552" },
                { "x": "114.059428", "y": "22.539765" },
                { "x": "114.059433", "y": "22.540082" },
                { "x": "114.05893", "y": "22.539673" },
                { "x": "114.058409", "y": "22.539678" },
                { "x": "114.057726", "y": "22.539719" },
                { "x": "114.057717", "y": "22.54002" },
                { "x": "114.057996", "y": "22.540157" },
                { "x": "114.058714", "y": "22.540182" }
            ]
        }
    },
    computed: {
        ...mapState(['mnUrl'])
    },
    components: {
        Bread,
    },
    mounted() {
        this.initMap();
        this.showAll();
        this.getData()
    },
    methods: {
        initMap() {
            // 创建Map实例及设置类型
            var map = new BMap.Map("XSDFXPage", { mapType: BMAP_PERSPECTIVE_MAP });
            // 设置中心点坐标
            var point = new BMap.Point(114.058167, 22.539506);
            // 设置地图显示的城市(必须)
            map.setCurrentCity("深圳市");
            // 设置地图级别:1-19越大越清晰
            map.centerAndZoom(point, 19);
            // 设置鼠标滚轮缩放
            map.enableScrollWheelZoom(true);
            return map
        },
        show(data, icon) {
            var _map = this.initMap();
            for (var i = 0; i <= data.length - 1; i++) {
                var myIcon = new BMap.Icon(icon, new BMap.Size(20, 20));
                var marker = new BMap.Marker(new BMap.Point(data[i].x, data[i].y), { icon: myIcon });
                _map.addOverlay(marker);
            }
        },
        showAll() {
            var _map = this.initMap();
            for (var i = 0; i <= this.all.length - 1; i++) {
                if (this.all[i].icon == "inAndOut") {
                    var myIcon = new BMap.Icon(inAndOut, new BMap.Size(20, 20));
                }
                else if (this.all[i].icon == "vedio") {
                    var myIcon = new BMap.Icon(vedio, new BMap.Size(20, 20));
                }
                else if (this.all[i].icon == "watch") {
                    var myIcon = new BMap.Icon(watch, new BMap.Size(20, 20));
                }
                else if (this.all[i].icon == "equipment") {
                    var myIcon = new BMap.Icon(equipment, new BMap.Size(20, 20));
                }
                else if (this.all[i].icon == "elevator") {
                    var myIcon = new BMap.Icon(elevator, new BMap.Size(20, 20));
                }
                else if (this.all[i].icon == "fireControl") {
                    var myIcon = new BMap.Icon(fireControl, new BMap.Size(20, 20));
                }
                else if (this.all[i].icon == "environment") {
                    var myIcon = new BMap.Icon(environment, new BMap.Size(20, 20));
                }
                else if (this.all[i].icon == "boundary") {
                    var myIcon = new BMap.Icon(boundary, new BMap.Size(20, 20));
                }
                var marker = new BMap.Marker(new BMap.Point(this.all[i].x, this.all[i].y), { icon: myIcon });
                _map.addOverlay(marker);
            }
        },
        getData() {
            const url = this.mnUrl + "/tmp/watching/park/point"
            this.$http.get(url).then(res => {
                //console.log(res.body.content);
            }, (err) => {
                console.log(err);
            })
        }

    },
    created() {

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
    width: 13.94rem;
    height: 7.06rem;
    position: relative;
    margin-left: 0.2rem;
    flex-basis: 0;
    background: url(../../../images/blue.png);
    background-size: cover;
    margin: 0 auto;
    margin-top: 0.4rem;
}
.box_top {
    width: 10rem;
    height: 6.3rem;
    background-size: cover;
    margin-top: 0.34rem;
    margin-left: 0.38rem;
    float: left;
}
.XSDFXPage {
    width: 100%;
    height: 6.2rem;
    font-family: "微软雅黑";
}
.icon_list {
    width: 100%;
    margin-top: 0.1rem;
    padding-left: 0.15rem;
    ul {
        li {
            width: 1.26rem;
            height: 0.5rem;
            float: left;
            margin-right: -0.2rem;
            @include aa;
            span {
                display: inline-block;
                width: 100%;
                height: 100%;
                font-size: 0.19rem;
            }
        }
        li:nth-child(1) {
            background: url('../../../images/inAndOut.png') no-repeat;
            background-size: 0.32rem;
            padding: 0.04rem 0rem 0rem 0.4rem;
        }
        li:nth-child(2) {
            background: url('../../../images/vedio.png') no-repeat;
            background-size: 0.32rem;
            padding: 0.04rem 0rem 0rem 0.4rem;
        }
        li:nth-child(3) {
            background: url('../../../images/watchman.png') no-repeat;
            background-size: 0.32rem;
            padding: 0.04rem 0rem 0rem 0.4rem;
        }
        li:nth-child(4) {
            background: url('../../../images/equipment.png') no-repeat;
            background-size: 0.32rem;
            padding: 0.04rem 0rem 0rem 0.4rem;
        }
        li:nth-child(5) {
            background: url('../../../images/elevator.png') no-repeat;
            background-size: 0.32rem;
            padding: 0.04rem 0rem 0rem 0.4rem;
        }
        li:nth-child(6) {
            background: url('../../../images/fireControl.png') no-repeat;
            background-size: 0.32rem;
            padding: 0.04rem 0rem 0rem 0.4rem;
        }
        li:nth-child(7) {
            background: url('../../../images/huanjing.png') no-repeat;
            background-size: 0.32rem;
            padding: 0.04rem 0rem 0rem 0.4rem;
        }
        li:nth-child(8) {
            background: url('../../../images/boundary.png') no-repeat;
            background-size: 0.32rem;
            padding: 0.04rem 0rem 0rem 0.4rem;
        }
        li:nth-child(9) {
            background: url('../../../images/all.png') no-repeat;
            background-size: 0.32rem;
            padding: 0.04rem 0rem 0rem 0.4rem;
        }
    }
}

.newdevice1,
.newdevice2,
.newdevice3,
.newdevice4 {
    display: inline-block;
    width: 0.4rem;
    height: 0.4rem;
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

.box_list {
    float: right;
    width: 3.45rem;
    height: 7.8rem;
    margin-top: 0.16rem;
    position: relative;
    .call_center {
        width: 3.45rem;
        height: 0.6rem;
        line-height: 0.6rem;
        background: url(../../../images/kaimenNav.png)no-repeat;
        margin-top: 0.2rem;
        padding-left: 0.2rem;
        position: relative;
        span {
            display: inline-block;
        }
        .circle {
            width: 0.28rem;
            height: 0.28rem;
            border: 1px solid red;
            text-align: center;
            line-height: 0.28rem;
            margin-right: 0.73rem;
            border-radius: 50%;
            color: red;
        }
        .num {
            font-size: 0.22rem;
            height: 0.5rem;
            width: 0.5rem;
            line-height: 0.5rem;
            text-align: center;
            position: absolute;
            top: 0.06rem;
        }
    }
}

.call_center1 {
    width: 3.45rem;
    height: 0.6rem;
    margin-top: 0.08rem;
    line-height: 0.6rem;
    background: url(../../../images/kaimenNav.png)no-repeat;
    padding-left: 0.2rem;
    position: relative;
    span {
        display: inline-block;
    }
}

.circle1 {
    width: 0.28rem;
    height: 0.28rem;
    border: 1px solid red;
    text-align: center;
    line-height: 0.28rem;
    margin-right: 1.2rem;
    border-radius: 50%;
    color: red;
}

.num1 {
    font-size: 0.22rem;
    height: 0.5rem;
    width: 0.5rem;
    line-height: 0.5rem;
    text-align: center;
    position: absolute;
    top: 0.05rem;
}

.bottom {
    width: 3.45rem;
    height: 5rem;
    background: url(../../../images/blue.png);
    background-size: cover;
    overflow-y: scroll;
}

.work,
.electri,
.yuntong,
.out,
.elevator {
    width: 100%;
    height: 1.5rem;
    box-sizing: border-box;
    padding-left: 0.2rem;
    padding-right: 0.2rem;
    margin-top: 0.1rem;
    overflow: hidden;
}

.head {
    width: 100%;
    height: 0.4rem;
    background: url(../../../images/kaimenNav.png)no-repeat;
    overflow: auto;
    background-size: cover;
    line-height: 0.4rem;
    padding-left: 0.15rem;
}
.getmore {
    margin-left: 1.1rem;
    float: right;
    margin-right: 0.1rem;
}
.icon {
    display: inline-block;
    float: right;
    margin-right: 0.1rem;
}

.info_content {
    padding-left: 0.15rem;
    width: 100%;
    height: 1.2rem;
    background: url(../../../images/kaimen.png);
    overflow: hidden;
}

.info_content>ul>li {
    list-style: none;
}

.info_content>ul>li>span {
    font-size: 0.14rem;
}

.elert_num {
    width: 0.22rem;
    height: 0.22rem;
    text-align: center;
    line-height: 0.20rem;
    display: inline-block;
    border-radius: 50%;
    background: red;
    color: white;
}

textarea {
    overflow: hidden;
}

input::-ms-clear {
    display: none;
}
</style>