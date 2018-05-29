<template>
    <div class="device">
        <!--业务配置/设备监控阀值配置组件-->
        <Bread :breadData="abc"></Bread>
        <!--顶部导航-->
        <div class="device-nav">
            <p class="p_text">水泵房（6）</p>
        </div>
        <!--中间内容部分-->
        <div class="electric_tcenter">
            <div class="electric_left">
                <div class="electric_one">
                    <div class="electric_water" v-for="(key,index) in elecTrtc" :key="index">
                        <div class="electric_waterleft">
                            <h4>{{key.leftwarter}}</h4>
                            <p>{{key.leftpressure}}
                                <span>{{key.temperature}}</span>{{key.water}}
                                <span>{{key.waternum}}</span>{{key.water_m}}</p>
                        </div>
                        <div class="water_all">
                            <div class="electric_waterright">
                                <p class="leftwater_one">{{key.transformer}}</p>
                                <img :src="key.myurl" alt="">
                                <p>{{key.close}}</p>
                            </div>
                            <div class="electric_waterright">
                                <p>{{key.transformer1}}</p>
                                <img :src="key.myurl2" alt="">
                                <p>{{key.close1}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="device_nav">
                    <p class="p_text">排污泵_南北区（14）</p>
                </div>
                <div class="water_electric">
                    <p>污水泵（14）</p>
                    <div class="drain">
                        <div class="electric_waters" v-for="(k,index) in waTers" :key="index">
                            <p>{{k.drainage}}</p>
                            <img :src="k.myurl" alt="">
                            <p>{{k.stop}}</p>
                        </div>
                    </div>
                    <div class="drain">
                        <div class="electric_waters" v-for="(k,index) in Waters" :key="index">
                            <p>{{k.drainage}}</p>
                            <img :src="k.myurl" alt="">
                            <p>{{k.stop}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="electric_right">
                <div class="day_text">
                    <h4>安全运行天数
                        <span>30天</span>
                    </h4>
                    <p class="electric_p">告警：
                        <span class="span_one">0</span>

                        <p class="electric_p_2">已完成：
                            <span class="span_two">90</span>
                        </p>
                    </p>
                    <p class="electric_p_3">总数：
                        <span>55</span>
                    </p>
                    <p class="electric_p">运行：
                        <span class="span_one" style="color:#fff;">32</span>

                        <p class="electric_p_2">停止：
                            <span class="span_two" style="color:#fff;">23</span>
                        </p>
                    </p>
                </div>
                <div class="electric_right_img">
                    <span>4383kwh</span>
                </div>
                <div class="facilities_one" id="myChart4">
                </div>
                <p class="facilities_p">设施完好率</p>
                <div class="facilities_two" id="myChart5">

                </div>
                <p class="facilities_p">设备巡查率</p>

            </div>
        </div>
    </div>
</template>
<script>
import Bread from '@/components/common/bread'
import echarts from "echarts"
import moneybox1 from "../../../images/moneybox1.png"
import moneybox10 from "../../../images/moneybox10.png"
import moneybox11 from "../../../images/moneybox11.png"
import moneybox12 from "../../../images/moneybox12.png"
import moneybox13 from "../../../images/moneybox13.png"
import moneybox14 from "../../../images/moneybox14.png"
import moneybox15 from "../../../images/moneybox15.png"
import moneybox16 from "../../../images/moneybox16.png"
import moneybox17 from "../../../images/moneybox17.png"
export default {
    data() {
        return {
            abc: ['物联监控', '设备物联监控', '给排水系统'],
            gauge_value: '',
            elecTrtc: [{
                "leftwarter": "生活水泵（3）",
                "leftpressure": "生活水位",
                "temperature": "4.2",
                "transformer": "高区_1#",
                "transformer1": "高区_2#",
                "water": "m/生活压力",
                "waternum": "0.93",
                "water_m": "Mpa",
                "myurl": moneybox11,
                "myurl2": moneybox10,
                "close": "运行",
                "close1": "停止"
            }, {
                "leftwarter": "消防泵（2）",
                "leftpressure": "消防水位",
                "temperature": "3.53",
                "transformer": "消防泵1#",
                "transformer1": "消防泵2#",
                "water": "",
                "waternum": "",
                "water_m": "m",
                "myurl": moneybox12,
                "myurl2": moneybox12,
                "close": "停止",
                "close1": "停止"

            }, {
                "leftwarter": "喷淋泵（2）",
                "leftpressure": "",
                "temperature": "",
                "transformer": "喷淋泵1#",
                "transformer1": "喷淋泵2#",
                "water": "",
                "waternum": "",
                "water_m": "",
                "myurl": moneybox15,
                "myurl2": moneybox15,
                "close": "停止",
                "close1": "停止"
            },
            ],
            electrics: [{
                "leftwarters": "生活水泵（2）",
            }],
            waTers: [{
                "drainage": "北区排污泵_2351_1#",
                "myurl": moneybox16,
                "stop": "停止"
            }, {
                "drainage": "北区排污泵_2351_2#",
                "myurl": moneybox16,
                "stop": "停止"
            }, {
                "drainage": "北区排污泵_2351_3#",
                "myurl": moneybox16,
                "stop": "停止"
            }, {
                "drainage": "北区排污泵_2589_1#",
                "myurl": moneybox16,
                "stop": "停止"
            }, {
                "drainage": "北区排污泵_2589_2#",
                "myurl": moneybox16,
                "stop": "停止"
            }, {
                "drainage": "北区排污泵_2589_3#",
                "myurl": moneybox16,
                "stop": "停止"
            }, {
                "drainage": "南区排污泵_2108_1#",
                "myurl": moneybox16,
                "stop": "停止"
            }],
             Waters: [{
                "drainage": "南区排污泵_2108_2#",
                "myurl": moneybox16,
                "stop": "停止"
            }, {
                "drainage": "南区排污泵_2334_1#",
                "myurl": moneybox16,
                "stop": "停止"
            }, {
                "drainage": "南区排污泵_2334_2#",
                "myurl": moneybox16,
                "stop": "停止"
            }, {
                "drainage": "南区排污泵_2065_1#",
                "myurl": moneybox16,
                "stop": "停止"
            }, {
                "drainage": "南区排污泵_2065_2#",
                "myurl": moneybox16,
                "stop": "停止"
            }, {
                "drainage": "南区排污泵_2001_1#",
                "myurl": moneybox16,
                "stop": "停止"
            }, {
                "drainage": "南区排污泵_2001_2#",
                "myurl": moneybox16,
                "stop": "停止"
            }]

        }
    },
    computed: {
    },
    components: {
        Bread
    },
    mounted() {
        this.drawLine();
    },
    // 组件销毁前调用
    beforeDestory() { },
    methods: {
        drawLine() {
            var myChart4 = echarts.init(document.getElementById('myChart4'));
            var myChart5 = echarts.init(document.getElementById('myChart5'));
            var gauge_value = '';   //能力值取代码置于值于此处   

            var option4 = {
                backgroundColor: 'rgba(255,255,255,0)',
                title: {
                    show: true,
                    x: "center",
                    y: "60%",
                    text: ' ',        //幸运值取代码置于值于此处
                    //subtext: '幸运指数',
                    textStyle: {
                        fontSize: 16,
                        fontWeight: 'bolder',
                        fontStyle: 'normal',
                        color: "#00B0F0"
                    }
                },
                tooltip: {
                    show: true,
                    formatter: "{a}{b}：{c}",
                    backgroundColor: 'rgba(255,255,255,0)',
                    borderColor: '#0080FF',
                    borderWidth: '1px',
                    textStyle: {
                        color: 'black'
                    }
                },
                series: [{
                    name: '能力',
                    type: 'gauge',
                    // startAngle: 180,
                    // endAngle: 0,
                    splitNumber: 10,     //刻度数量
                    min: 0,
                    max: 100,
                    radius: '70%',      //图表尺寸
                    axisLine: {
                        show: true,
                        lineStyle: {
                            width: 3,
                            shadowBlur: 0,
                            color: [
                                [0.2, '#00B0F0'],
                                [0.8, '#00B0F0'],
                                [1, '#00B0F0']
                            ]
                        }
                    },
                    axisTick: {
                        show: true,
                        lineStyle: {
                            color: "#00B0F0",
                            width: 1
                        },
                        length: -5,
                        splitNumber: 2
                    },
                    splitLine: {
                        show: true,
                        length: -10,
                        lineStyle: {
                            color: '#00B0F0'
                        }
                    },
                    // 改文字到指针的距离
                    axisLabel: {
                        distance: -14,
                        textStyle: {
                            color: "#00B0F0",
                            fontSize: "12",
                        },
                        formatter: function(e) {
                            switch (e + "") {
                                case "0":
                                    return "0";
                                case "10":
                                    return "10";
                                case "20":
                                    return "20";
                                case "30":
                                    return "30";
                                case "40":
                                    return "40";
                                case "50":
                                    return "50";
                                case "60":
                                    return "60";
                                case "70":
                                    return "70";
                                case "80":
                                    return "80";
                                case "90":
                                    return "90";
                                default:
                                    return e;
                            }
                        }
                    },
                    pointer: {
                        show: true,
                    },
                    detail: {           //指针评价
                        show: true,
                        offsetCenter: [0, 0],
                        textStyle: {
                            fontSize: 16,
                            color: "#C7FBFC"
                        },

                    },
                    title: {
                        textStyle: {
                            fontSize: 30,
                            fontWeight: 'bolder',
                            fontStyle: 'normal',
                            color: "#C7FBFC"
                        },
                        offsetCenter: [0, 14]
                    },
                    data: [{
                        name: " ",
                        value: Math.floor(gauge_value)
                    }]
                }]
            };
            var option5 = {
                backgroundColor: 'rgba(255,255,255,0)',
                title: {
                    show: true,
                    x: "center",
                    y: "60%",
                    text: ' ',        //幸运值取代码置于值于此处
                    //subtext: '幸运指数',
                    textStyle: {
                        fontSize: 16,
                        fontWeight: 'bolder',
                        fontStyle: 'normal',
                        color: "#00B0F0"
                    }
                },
                tooltip: {
                    show: true,
                    formatter: "{a}{b}：{c}",
                    backgroundColor: 'rgba(255,255,255,0)',
                    borderColor: '#0080FF',
                    borderWidth: '1px',
                    textStyle: {
                        color: 'black'
                    }
                },
                series: [{
                    name: '能力',
                    type: 'gauge',
                    // startAngle: 180,
                    // endAngle: 0,
                    splitNumber: 10,     //刻度数量
                    min: 0,
                    max: 100,
                    radius: '70%',      //图表尺寸
                    axisLine: {
                        show: true,
                        lineStyle: {
                            width: 3,
                            shadowBlur: 0,
                            color: [
                                [0.2, '#00B0F0'],
                                [0.8, '#00B0F0'],
                                [1, '#00B0F0']
                            ]
                        }
                    },
                    axisTick: {
                        show: true,
                        lineStyle: {
                            color: "#00B0F0",
                            width: 1
                        },
                        length: -5,
                        splitNumber: 2
                    },
                    splitLine: {
                        show: true,
                        length: -10,
                        lineStyle: {
                            color: '#00B0F0'
                        }
                    },
                    // 改文字到指针的距离
                    axisLabel: {
                        distance: -14,
                        textStyle: {
                            color: "#00B0F0",
                            fontSize: "12",
                        },
                        formatter: function(e) {
                            switch (e + "") {
                                case "0":
                                    return "0";
                                case "10":
                                    return "10";
                                case "20":
                                    return "20";
                                case "30":
                                    return "30";
                                case "40":
                                    return "40";
                                case "50":
                                    return "50";
                                case "60":
                                    return "60";
                                case "70":
                                    return "70";
                                case "80":
                                    return "80";
                                case "90":
                                    return "90";
                                default:
                                    return e;
                            }
                        }
                    },
                    pointer: {
                        show: true,
                    },
                    detail: {           //指针评价
                        show: true,
                        offsetCenter: [0, 0],
                        textStyle: {
                            fontSize: 16,
                            color: "#C7FBFC"
                        },

                    },
                    title: {
                        textStyle: {
                            fontSize: 30,
                            fontWeight: 'bolder',
                            fontStyle: 'normal',
                            color: "#C7FBFC"
                        },
                        offsetCenter: [0, 14]
                    },
                    data: [{
                        name: " ",
                        value: Math.floor(gauge_value)
                    }]
                }]
            };
            myChart4.setOption(option4);
            myChart5.setOption(option5);
        }
    }
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin';
// element_ui样式
.el-select .el-input {
    width: 110px;
}

// 整个大框
.device {
    vertical-align: top;
    width: 100%;
    height: 8.96rem; // display: inline-block;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    .device-nav {
        height: 0.6rem;
        width: 80%;
        background: url(../../../assets/kaimenNav.png)no-repeat;
        background-size: cover;
        padding-bottom: 0.5rem;
        margin-bottom: 0.05rem;
        p {
            display: inline-block;
            line-height: 0.6rem;
        }
        .p_text {
            color: #fff;
            margin: 0 0.2rem;
        }
        .p_num {
            color: #83dbff;
            span {
                color: #02ea0b;
            }
        }
    }
    .electric_tcenter {
        width: 100%;
        height: 100%;
        margin: 0 auto;
        .electric_left {
            width: 80%;
            height: 100%;
            float: left;
            margin: 0 auto;
            overflow-y: auto;
            .electric_one {
                width: 100%;
                height: 3.29rem;
                background: url(../../../images/blue.png)no-repeat;
                background-size: cover;
                padding: 0.16rem 0.16rem 0 0.1rem;//修改最后 原0.2
                display: flex;
                .electric_water:nth-of-type(1) {
                    border-left: none;
                }
                .electric_water {
                    width: 100%;
                    height: 2.74rem;
                    border-left: 1px solid #475871;
                    flex: 1;
                    .electric_waterleft {
                        width: 100%;
                        height: auto;
                        display: inline-block;
                        box-sizing:border-box;
                        white-space: nowrap;
                        h4 {
                            display: inline-block;
                            // margin-right: 0.2rem;//修改
                            margin-left:0.1rem;
                        }
                        p {
                            
                            float:right;
                            display: inline-block;
                            color: #83dbff;
                            font-size:0.14rem;
                            span {
                                color: #01f60e;
                                font-size:0.14rem;
                            }
                        }
                    }
                    .water_all {
                        display: flex;
                        justify-content: space-around;
                        .electric_waterright {
                            text-align: center;
                            display: inline-block;
                            margin-top: 0.44rem;
                            margin-left: 0.5rem;
                            img {
                                margin-top: 0.27rem;
                                margin-bottom: 0.2rem;
                                width: 0.8rem;
                                height: 0.9rem;
                            }
                            .leftwater_one {
                                position: relative;
                            }
                        }
                    }
                }
            }
            .device_nav {
                height: 0.6rem;
                width: 100%;
                background: url(../../../assets/kaimenNav.png)no-repeat;
                background-size: cover;
                padding-bottom: 0.5rem;
                margin-bottom: 0.05rem;
                line-height: 0.6rem;
                margin-top: 0.05rem;
                padding-left: 0.2rem;
            }
            .water_electric {
                width: 100%;
                height: 5.67rem;
                background: url(../../../images/blue.png)no-repeat;
                background-size: cover;
                padding: 0.16rem 0.16rem 0 0.2rem;

                .drain {
                    display: flex;
                    flex-wrap: wrap;
                    border-bottom:1px solid #999;
                    padding-bottom: 0.1rem;
                    .electric_waters {
                        flex: 1;
                        margin-top: 0.3rem;
                        text-align: center;
                        p{
                            font-size:0.14rem;
                        }
                        // margin-right: 0.56rem;
                        img {
                            margin: 0.1rem 0;
                            width: 0.96rem;
                            height: 0.99rem;
                            
                        }
                    }
                }
            }
        }
        .electric_right {
            display: inline-block;
            width: 19%;
            height: 100%; // border: 1px solid skyblue;
            float: left;
            margin-left: 0.05rem;
            padding: 0.23rem 0.16rem 0.3rem 0.22rem;
            background: url(../../../images/answer-call.png)no-repeat;
            background-size: cover;
            position: relative;
            top: -0.68rem;

            .day_text {
                width: 100%;
                text-align: center;
                height: 2.2rem;
                h4 {
                    color: #fff; // margin-bottom: 0.37rem;
                    span {
                        color: #fff;
                        font-size: 0.18rem;
                    }
                }
                .electric_p {
                    display: inline-block;
                    color: #fff; // float: left;
                    margin-right: 0.6rem;
                    .span_one {
                        color: red;
                    }
                }
                .electric_p_2 {
                    display: inline-block;
                    color: #fff; // float: right;
                    margin-bottom: 0.34rem;
                    margin-top: 0.34rem;
                    .span_two {
                        color: skyblue;
                    }
                }

                .electric_p_3 {
                    color: #fff;
                    margin-left: -1.3rem;
                    span {
                        color: #fff;
                    }
                }
            }
            .electric_right_img {
                width: 100%;
                height: 1rem;
                margin-left: 0.34rem;
                margin-bottom: 0.3rem;
                background: url(../../../images/electric.png)no-repeat;
                background-size: contain;
                position: relative;
                span {
                    color: #83dbff;
                    position: absolute;
                    left: 0.5rem;
                    top: 0.4rem;
                }
            }
            .facilities_one {
                width: 1.75rem;
                height: 1.53rem;
                background: #fff;
                margin: 10px auto;
            }
            .facilities_two {
                width: 1.75rem;
                height: 1.53rem;
                background: #fff;
                margin: 10px auto;
            }
            .facilities_p {
                padding: 0;
                margin: 0;
                color: #fff;
                text-align: center;
            }
        }
    }
}
</style>