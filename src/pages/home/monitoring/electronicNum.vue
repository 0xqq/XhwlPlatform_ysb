<template>
    <div class="electronicNum">
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
                    <input type="checkbox" value="">&nbsp&nbsp显示电量
                    <input type="checkbox" value="" class="ipt2">&nbsp&nbsp显示巡更进度
                </div>
                <!--各类数值-->
                <div class="num_list">
                    <ul>
                        <li>
                            <span>社区总户数 (户)</span>
                            <span>2000</span>
                        </li>
                        <li>
                            <span>月卡车数量 (辆)</span>
                            <span>400</span>
                        </li>
                        <li>
                            <span>停车场车位数 (个)</span>
                            <span>1000</span>
                        </li>
                        <li>
                            <span>停车场入流量 (次)</span>
                            <span>3000</span>
                        </li>
                        <li>
                            <span>访客入流量 (次)</span>
                            <span>200</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import Bread from '@/components/common/bread'

export default {
    data() {
        return {
            abc: ['物联监控', '物联电子地图'],
            input5: '',
            select: '',
            pickerOptions2: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
            value6: '',
            value: [
                {
                    'order': 'KM001',
                    'DoorEquipment': '东大门岗亭1',
                    'time': '2017-08-15 14:00:11',
                    'name': '张三',
                    'event': 'KM001',
                    'operate': '对讲'
                },
                {
                    'order': 'KM001',
                    'DoorEquipment': '东大门岗亭1',
                    'time': '2017-08-15 14:00:11',
                    'name': '张三',
                    'event': 'KM001',
                    'operate': '对讲'
                },
                {
                    'order': 'KM001',
                    'DoorEquipment': '东大门岗亭1',
                    'time': '2017-08-15 14:00:11',
                    'name': '张三',
                    'event': 'KM001',
                    'operate': '对讲'
                },
                {
                    'order': 'KM001',
                    'DoorEquipment': '东大门岗亭1',
                    'time': '2017-08-15 14:00:11',
                    'name': '张三',
                    'event': 'KM001',
                    'operate': '对讲'
                },
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
    },
    methods: {
        initMap(){
            var map = new BMap.Map("XSDFXPage", {mapType:BMAP_PERSPECTIVE_MAP});
            // 设置中心点坐标
            var point = new BMap.Point(114.058167,22.540106);
            // 设置地图显示的城市(必须)
            map.setCurrentCity("深圳市");
            // 设置地图级别:1-19越大越清晰
            map.centerAndZoom(point,18);
            // 设置鼠标滚轮缩放
            map.enableScrollWheelZoom(true);
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
    .electronicNum {
        vertical-align: top;
        width: 100%;
        height: 100%; 
    }
    .content {
        width: 13.65rem;
        height: 8.04rem;
        margin: 0 auto;
        margin-top:-0.3rem;
        .box_top {
            width:14.42rem;
            height: 8.05rem;
            background: rgba(123, 123, 231, .4);
            background-size: contain;
            margin-top: 0.42rem;
            margin-left: -0.4rem;
            display: flex;
            justify-content: center;
            align-items: center;;
            position: relative;
            padding:0.3rem 0.3rem 1.8rem 0.3rem;
            span {
                display: inline-block;
                width: 0.4rem;
                height: 0.4rem;
            }
            .ipt {
                width: 2.75rem;
                height: 0.47rem;
                position: absolute;
                right: 2.2rem;
                color: #fff;
                top: 0.45rem;
                .ipt2 {
                    margin-left: 0.4rem;
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
            .num_list{
                width: 100%;
                position:absolute;
                bottom:0.45rem;
                left:0.65rem;
                ul{
                  display: flex;
                    li{
                        flex:1;
                        float:left;
                        margin-right:0.55rem;
                        span:nth-child(1){
                            display:inline-block;
                            width: 100%;
                            height: 100%;
                            font-size:0.2rem;
                            margin-top: -0.2rem;
                            margin-left:0.05rem;
                        }
                        span:nth-child(2){
                            display:inline-block;
                            width: 100%;
                            height: 100%;
                            font-size:0.39rem;
                            margin-top: -0.2rem;
                            margin-left:0.25rem;
                        }
                    }
                }
            }
        }
    }

    html,body,.XSDFXPage{
    width: 100%;
    height:110%;
    overflow: hidden;
    margin-top: 0.5rem;
    font-family: "微软雅黑";
    }
</style>