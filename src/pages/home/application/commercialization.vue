<template>
    <div class="device">
        <!--业务配置/设备监控阀值配置组件-->
        <Bread :breadData="abc"></Bread>
        <!--顶部导航-->
        <div class="device-nav">
            <p class="p_text">低压配电房（16）</p>
            <p class="p_num"> 温湿度
                <span>34.7</span>℃ /
                <span>32.7</span>% RH</p>
        </div>
        <!--中间内容部分-->
        <div class="electric_tcenter">
            <div class="electric_left">
                <div class="electric_one">
                    <p>变压器 （4）</p>
                    <div class="boll_all">
                        <div class="bone_one">
                            <div class="bone_top">
                                1#变压器
                            </div>
                            <div class="bone_center">
                                <div class="num_left">
                                    <p>57.0℃</p>
                                    <p>62.0℃</p>
                                    <p>56.0℃</p>
                                </div>
                                <div class="num_img" id="myChart">
                                </div>
                                <div class="num_right">
                                    <p>249.8A</p>
                                    <p>359.4A</p>
                                    <p>344.5A</p>
                                    <p class="last_p">38.5KVA</p>
                                </div>
                            </div>
                            <div class="bone_bottom">
                                <p class="run">运行</p>
                                <!--<p class="run_num">38.5KVA</p>-->
                            </div>
                        </div>
                        <div class="bone_one">
                            <div class="bone_top">
                                2#变压器
                            </div>
                            <div class="bone_center">
                                <div class="num_left">
                                    <p>57.0℃</p>
                                    <p>62.0℃</p>
                                    <p>56.0℃</p>
                                </div>
                                <div class="num_img" id="myChart1"></div>
                                <div class="num_right">
                                    <p>249.8A</p>
                                    <p>359.4A</p>
                                    <p>344.5A</p>
                                    <p class="last_p">38.5KVA</p>
                                </div>
                            </div>
                            <div class="bone_bottom">
                                <p class="run">运行</p>
                                <!--<p class="run_num">38.5KVA</p>-->
                            </div>
                        </div>
                        <div class="bone_one">
                            <div class="bone_top">
                                3#变压器
                            </div>
                            <div class="bone_center">
                                <div class="num_left">
                                    <p>57.0℃</p>
                                    <p>62.0℃</p>
                                    <p>56.0℃</p>
                                </div>
                                <div class="num_img" id="myChart2"></div>
                                <div class="num_right">
                                    <p>249.8A</p>
                                    <p>359.4A</p>
                                    <p>344.5A</p>
                                    <p class="last_p">38.5KVA</p>
                                </div>
                            </div>
                            <div class="bone_bottom">
                                <p class="run">运行</p>
                                <!--<p class="run_num">38.5KVA</p>-->
                            </div>
                        </div>
                        <div class="bone_one bor_none">
                            <div class="bone_top">
                                4#变压器
                            </div>
                            <div class="bone_center">
                                <div class="num_left">
                                    <p>57.0℃</p>
                                    <p>62.0℃</p>
                                    <p>56.0℃</p>
                                </div>
                                <div class="num_img" id="myChart3"></div>
                                <div class="num_right">
                                    <p>249.8A</p>
                                    <p>359.4A</p>
                                    <p>344.5A</p>
                                    <p class="last_p">38.5KVA</p>
                                </div>
                            </div>
                            <div class="bone_bottom">
                                <p class="run">运行</p>
                                <!--<p class="run_num"></p>-->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="electric_two">
                    <p>低压进钱柜（4）</p>
                    <div class="boll_all">
                        <div class="bone_two" v-for="(key,index) in elecTric" :key="index">
                            <div class="bone_top">
                                {{key.transformer}}
                            </div>
                            <div class="bone_center">
                                <img :src="key.myurl" alt="">
                            </div>
                            <div class="bone_bottom">
                                <p class="run">{{key.close}}</p>
                                <!--<p class="run_num">38.5KVA</p>-->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="electric_three">
                    <p>低压馈钱柜（6）</p>
                    <div class="boll_all">
                        <div class="bone_three" v-for="(key,index) in moneyBox" :key="index">
                            <div class="bone_top">
                                {{key.transformer}}
                            </div>
                            <div class="bone_center">
                                <img :src="key.myurl" alt="">
                            </div>
                            <div class="bone_bottom">
                                <p class="run">{{key.close}}</p>
                                <!--<p class="run_num">38.5KVA</p>-->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="electric_two">
                    <p>低压市电切换柜（2）</p>
                    <div class="boll_all">
                        <div class="bone_two" v-for="(key,index) in dowmLine" :key="index">
                            <div class="bone_top">
                                {{key.transformer}}
                            </div>
                            <div class="bone_center">
                                <img :src="key.myurl" alt="">
                            </div>
                            <div class="bone_bottom">
                                <p class="run">{{key.close}}</p>
                                <!--<p class="run_num">38.5KVA</p>-->
                            </div>
                        </div>

                    </div>
                </div>
                <div class="electric_two">
                    <p>低压市电切换柜（2）</p>
                    <div class="boll_all">
                        <div class="bone_two" v-for="(key,index) in generaTion" :key="index">
                            <div class="bone_top">
                                {{key.transformer}}
                            </div>
                            <div class="bone_center">
                                <img :src="key.myurl" alt="">
                            </div>
                            <div class="bone_bottom">
                                <p class="run">{{key.close}}</p>
                                <!--<p class="run_num">38.5KVA</p>-->
                            </div>
                        </div>

                    </div>
                </div>
                <!--顶部导航-->
                <div class="electric_down">
                    <p>水泵房(06)</p>
                </div>
                <div class="electricleft_one">
                    <div class="electric_water" v-for="(key,index) in elecTrtcleft" :key="index">
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
                                <p>生活水泵_1#</p>
                                <img :src="key.myurl2" alt="">
                                <p>停止</p>
                            </div>
                        </div>
                    </div>
                </div>
                 <div class="electric_down">
                    <p>排污水-南北区(14)</p>
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
                        <div class="electric_waters" v-for="(k,index) in waTers" :key="index">
                            <p>{{k.drainage}}</p>
                            <img :src="k.myurl" alt="">
                            <p>{{k.stop}}</p>
                        </div>
                    </div>
                </div>
               <div class="end"></div>
            </div>
            <div class="electric_right">
                <div class="day_text" v-for="(safe,index) in worKing" :key="index">
                    <h4>{{safe.safes}}
                        <span>{{safe.day}}</span>
                    </h4>
                    <p class="electric_p">{{safe.report}}
                        <span class="span_one">{{safe.num}}</span>

                        <p class="electric_p_2">{{safe.complete}}
                            <span class="span_two">{{safe.sum}}</span>
                        </p>
                    </p>
                    <p class="electric_p_3">{{safe.tote}}
                        <span>{{safe.number}}</span>
                    </p>
                    <p class="electric_p">{{safe.run}}
                        <span class="span_one" style="color:#fff;">{{safe.move}}</span>

                        <p class="electric_p_2">{{safe.stop}}
                            <span class="span_two" style="color:#fff;">{{safe.amount}}</span>
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
                <p class="facilities_p">人员空间率</p>

            </div>
            <!--顶部导航-->

        </div>

    </div>
</template>
<script>
import Bread from '@/components/common/bread'
import echarts from "echarts"
import moneybox1 from "../../../images/moneybox1.png"
import moneybox2 from '../../../images/moneybox2.png'
import moneybox3 from '../../../images/moneybox3.png'
import moneybox4 from '../../../images/moneybox4.png'
import moneybox5 from '../../../images/moneybox5.png'
import moneybox6 from '../../../images/moneybox6.png'
import moneybox7 from '../../../images/moneybox7.png'
import moneybox8 from '../../../images/moneybox8.png'
import moneybox9 from '../../../images/moneybox9.png'
import moneybox19 from '../../../images/moneybox19.png'
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
            abc: ['物联监控', '实时监控', '能耗监控', '供配电'],
            gauge_value: '',
            elecTric: [{
                "transformer": "1#变压器",
                "myurl": moneybox1,
                "close": "合闸"
            },
            {
                "transformer": "2#变压器",
                "myurl": moneybox1,
                "close": "合闸"
            },
            {
                "transformer": "3#变压器",
                "myurl": moneybox2,
                "close": "中断"
            },
            {
                "transformer": "4#变压器",
                "myurl": moneybox2,
                "close": "中断"
            },

            ],
            moneyBox: [{
                "transformer": "1#进钱柜",
                "myurl": moneybox4,
                "close": "中断"

            }, {
                "transformer": "1#进钱柜",
                "myurl": moneybox5,
                "close": "分闸"

            }, {
                "transformer": "1#进钱柜",
                "myurl": moneybox6,
                "close": "合闸"

            }, {
                "transformer": "1#进钱柜",
                "myurl": moneybox6,
                "close": "合闸"

            }, {
                "transformer": "1#进钱柜",
                "myurl": moneybox6,
                "close": "合闸"

            }, {
                "transformer": "1#进钱柜",
                "myurl": moneybox4,
                "close": "中断"

            }],
            dowmLine: [{
                "transformer": "1#进钱柜",
                "myurl": moneybox7,
                "close": "中断"
            }, {
                "transformer": "2#进钱柜",
                "myurl": moneybox8,
                "close": "中断"
            }, {
                "transformer": "3#进钱柜",
                "myurl": moneybox9,
                "close": "中断"
            }],
            generaTion: [{
                "transformer": "3#进钱柜",
                "myurl": moneybox19,
                "close": "中断"
            }],
            worKing: [{
                "safes": "安全运行天数",
                "day": "0天",
                "report": "告警 :",
                "num": "0",
                "complete": "已完成 :",
                "sum": "0",
                "tote": "总数 :",
                "number": " 55",
                "run": "运行 :",
                "move": " 23",
                "stop": "停止 : ",
                "amount": " 32"
            }],
             elecTrtcleft: [{
                "leftwarter": "生活水泵（2）",
                "leftpressure": "生活压力",
                "temperature": "0",
                "transformer": "生活水泵_1#",
                "water": "Mpa/ 生活水位",
                "waternum": "4.19",
                "water_m": "m",
                "myurl": moneybox10,
                "myurl2": moneybox11,
                "close": "停止"
            }, {
                "leftwarter": "消防泵（2）",
                "leftpressure": "消防水位",
                "temperature": "3.7",
                "transformer": "消防泵1#",
                "water": "",
                "waternum": "",
                "water_m": "m",
                "myurl": moneybox12,
                "myurl2": moneybox13,
                "close": "停止"
            }, {
                "leftwarter": "喷淋泵（2）",
                "leftpressure": "",
                "temperature": "",
                "transformer": "消防泵2#",
                "water": "",
                "waternum": "",
                "water_m": "",
                "myurl": moneybox14,
                "myurl2": moneybox15,
                "close": "停止"
            },
            ],
              waTers: [{
                "drainage": "北区排水泵",
                "myurl": moneybox16,
                "stop": "停止"
            }, {
                "drainage": "北区排水泵",
                "myurl": moneybox16,
                "stop": "停止"
            }, {
                "drainage": "北区排水泵",
                "myurl": moneybox16,
                "stop": "停止"
            }, {
                "drainage": "北区排水泵",
                "myurl": moneybox17,
                "stop": "停止"
            }, {
                "drainage": "北区排水泵",
                "myurl": moneybox16,
                "stop": "停止"
            }, {
                "drainage": "北区排水泵",
                "myurl": moneybox16,
                "stop": "停止"
            }, {
                "drainage": "北区排水泵",
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
            var myChart = echarts.init(document.getElementById('myChart'));
            var myChart1 = echarts.init(document.getElementById('myChart1'));
            var myChart2 = echarts.init(document.getElementById('myChart2'));
            var myChart3 = echarts.init(document.getElementById('myChart3'));
            var myChart4 = echarts.init(document.getElementById('myChart4'));
            var myChart5 = echarts.init(document.getElementById('myChart5'));
            var gauge_value = '';   //能力值取代码置于值于此处
            var option = {
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
                            fontSize: 15,
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
            var option1 = {
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
            var option2 = {
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
            var option3 = {
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
            myChart.setOption(option);
            myChart1.setOption(option1);
            myChart2.setOption(option2);
            myChart3.setOption(option3);
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


// 公共的样式
.device-nav {
    float: left;
    display: inline-block;
    height: 0.6rem;
    width: 80%;
    background: url(../../../assets/kaimenNav.png)no-repeat;
    background-size: cover;
    padding-bottom: 0.5rem;
    margin-bottom: 0.08rem;
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
} // 整个大框
.device {
    vertical-align: top;
    width: 100%;
    height: 100%; // display: inline-block;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    .device-nav {
        float: left;
        display: inline-block;
        height: 0.6rem;
        width: 80%;
        background: url(../../../assets/kaimenNav.png)no-repeat;
        background-size: cover;
        padding-bottom: 0.5rem;
        margin-bottom: 0.08rem;
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
        display: inline-block;
        .electric_left {
            width: 80%;
            height: 100%;
            float: left;
            margin: 0 auto;
            overflow-y: auto;

            .electric_one {
                margin: 0 auto;
                display: inline-block;
                width: 100%;
                height: 3.29rem;
                background: url(../../../images/blue.png)no-repeat;
                background-size: 100% 100%;
                padding-top: 0.013rem;
                p {
                    color: #fff;
                    margin-top: 0.13rem;
                    margin-left: 0.18rem;
                }
                .boll_all {
                    width: 100%;
                    height: auto;
                    display: flex;
                    justify-content: space-around;

                    .bone_one {
                        flex: 1;
                        border-right: 1px solid #527ba0;
                        margin-left: 0.05rem;
                        .bone_top {
                            color: #fff;
                            text-align: center;
                            margin-top: 0.15rem;
                            margin-bottom: 0.18rem;
                        }
                        .bone_center {
                            margin: 0;
                            padding: 0;
                            display: inline-block;
                            width: 100%;
                            display: flex;
                            justify-content: center;
                            img {
                                width: 0.53rem;
                                height: 1.18rem;
                            }
                            .num_left {
                                display: inline-block;
                                vertical-align: top;
                                p {
                                    color: #83dbff;
                                    margin: 0;
                                    padding: 0;
                                    margin-top: 0.25rem;
                                    font-size: 0.14rem; // margin-right:0.02rem;
                                }
                            }
                            .num_img {
                                display: inline-block;
                                width: 1.75rem;
                                height: 1.63rem;
                                background: #fff;
                            }
                            .num_right {
                                display: inline-block;
                                width: 0.4rem;
                                height: auto;
                                vertical-align: top;
                                margin: 0 0.05rem;
                                p {
                                    margin: 0;
                                    padding: 0;
                                    margin-top: 0.25rem;
                                    color: #83dbff;
                                    font-size: 0.14rem;
                                }
                                .last_p {
                                    position: relative;
                                    left: -0.15rem;
                                    top: 0.35rem;
                                }
                            }
                        }
                        .bone_bottom {
                            width: 100%;
                            height: auto; //  text-align: center；
                            text-align: center;
                            p {
                                display: inline-block; // margin-left:0.3rem;
                            }
                            .run {}
                        }
                    }
                    .bor_none {
                        border: none;
                    }
                }
            }
            .electric_two {
                margin: 0 auto;
                display: inline-block;
                width: 100%;
                height: 3.29rem;
                background: url(../../../images/blue.png)no-repeat;
                background-size: 100% 100%;
                padding-top: 0.013rem;
                margin-top: 0.05rem;
                p {
                    color: #fff;
                    margin-top: 0.13rem;
                    margin-left: 0.18rem;
                }
                .boll_all {
                    width: 100%;
                    height: auto;
                    display: flex;
                    justify-content: space-around;
                    .bone_two:nth-of-type(1) {
                        border-left: none;
                    }
                    .bone_two {
                        flex: 1;
                        border-left: 1px solid #527ba0;
                        margin-left: 0.05rem;
                        text-align: center;
                        .bone_top {
                            color: #fff;
                            margin-top: 0.21rem;
                            margin-bottom: 0.18rem;
                        }
                        .bone_center {}
                        .bone_bottom {
                            margin-left: -0.2rem;
                        }
                    }
                    .bone_two:nth-last-of-type() {
                        border-right: none;
                    }
                    .bor_none {
                        border-right: none;
                    }
                }
            }
            .electric_three {
                margin: 0 auto;
                display: inline-block;
                width: 100%;
                height: 3.29rem;
                background: url(../../../images/blue.png)no-repeat;
                background-size: 100% 100%;
                padding-top: 0.013rem;
                margin-top: 0.05rem;
                p {
                    color: #fff;
                    margin-top: 0.13rem;
                    margin-left: 0.18rem;
                }
                .boll_all {
                    width: 100%;
                    height: auto;
                    display: flex;
                    justify-content: space-around;
                    .bone_three:nth-of-type(1) {
                        border-left: none;
                    }
                    .bone_three {
                        flex: 1;
                        border-left: 1px solid #527ba0;
                        margin-left: 0.05rem;
                        text-align: center;

                        .bone_top {
                            color: #fff;
                            text-align: center;
                            margin-top: 0.15rem;
                            margin-bottom: 0.18rem;
                        }
                        .bone_center {}
                        .bone_bottom {
                            margin-left: -0.2rem;
                        }
                    }
                    .bor_none {
                        border-right: none;
                    }
                }
            }
            .electric_down {
                width: 100%;
                height: 0.6rem;
                background: url(../../../images/kaimenNav.png);
                background-size: cover;
                margin-top: 0.05rem;
                margin-bottom: 0.05rem;
                line-height: 0.6rem;
                padding-left:0.2rem;
            }
               .electricleft_one {
                width: 100%;
                height: 3.29rem;
                background: url(../../../images/blue.png)no-repeat;
                background-size: cover;
                padding: 0.16rem 0.16rem 0 0.2rem;
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
                        display: inline-block;
                        h4 {
                            display: inline-block;
                            margin-right: 0.2rem;
                            margin-left:0.2rem;
                        }
                        p {
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
                        margin-top: 0.15rem;
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
              .water_electric {
                width: 100%;
                height: 4.67rem;
                background: url(../../../images/blue.png)no-repeat;
                background-size: cover;
                padding: 0.16rem 0.16rem 0 0.2rem;

                .drain {
                    display: flex;
                    flex-wrap: wrap;
                    .electric_waters {
                        flex: 1;
                        margin-top: 0.3rem;
                        margin-right: 0.56rem;
                        img {
                            margin: 0.1rem 0;
                            width: 0.96rem;
                            height: 0.99rem;
                            
                        }
                    }
                }
            }
            .end{
                height: 1rem;
                width: 100%;
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
                background: url(../../../images/electric.png)no-repeat;
                background-size: contain;
                margin-bottom: 0.4rem;
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