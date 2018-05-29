<template>
    <div class="device">
        <!--业务配置/设备监控阀值配置组件-->
        <Bread :breadData="abc"></Bread>

        <!--中间内容部分-->
        <div class="intelligent_center" id="intelligent_center">
            <!--顶部导航-->
            <div class="device_nav">
                <p class="p_text">停车场系统</p>
            </div>
            <div class="intelligent_one">
                <div class="intelligent_p">
                    <p>道闸</p>
                </div>
                <div class="intelligent_all">
                    <div class="offline" v-for="(key,index) in inTell">
                        <p>{{key.gate}} </p>
                        <img :src="key.myurl" alt="">
                        <p>{{key.offlines}}</p>
                    </div>
                </div>
            </div>
            <div class="intelligent_one">
                <div class="intelligent_p">
                    <p>控制机</p>
                </div>
                <div class="intelligent_all">
                    <div class="offline" v-for="(key,index) in conTrol">
                        <p>{{key.gate}} </p>
                        <img :src="key.myurl" alt="">
                        <p>{{key.offlines}}</p>
                    </div>
                </div>
            </div>
            <div class="intelligent_one">
                <div class="intelligent_p">
                    <p>车牌识别摄像头</p>
                </div>
                <div class="intelligent_all">
                    <div class="offline" v-for="(key,index) in plaTe">
                        <p>{{key.gate}} </p>
                        <img :src="key.myurl" alt="">
                        <p>{{key.offlines}}</p>
                    </div>
                </div>
               
            </div>
            <div class="ends"></div>
        </div>
    </div>
</template>
<script>
import Bread from '@/components/common/bread'
import intelligent1 from "../../../images/intelligent1.png"
import intelligent2 from "../../../images/intelligent2.png"
import intelligent3 from "../../../images/intelligent3.png"
import intelligent4 from "../../../images/intelligent4.png"
import intelligent5 from "../../../images/intelligent5.png"
import intelligent6 from "../../../images/intelligent6.png"
import intelligent7 from "../../../images/intelligent7.png"
import intelligent8 from "../../../images/intelligent8.png"
import $ from 'jquery'
// import NN from 'niceScroll'

export default {
    data() {
        return {
            abc: ['物联监控', '设备物联监控','设备监控','停车场系统'],
            inTell: [{
                "gate": "道闸1#",
                "myurl": intelligent1,
                "offlines": "离线"
            }, {
                "gate": "道闸1#",
                "myurl": intelligent2,
                "offlines": "离线"
            }, {
                "gate": "道闸1#",
                "myurl": intelligent1,
                "offlines": "离线"
            }, {
                "gate": "道闸1#",
                "myurl": intelligent2,
                "offlines": "离线"
            }],
            conTrol: [{
                "gate": "道闸1#",
                "myurl": intelligent5,
                "offlines": "离线"
            }, {
                "gate": "道闸1#",
                "myurl": intelligent6,
                "offlines": "离线"
            }, {
                "gate": "道闸1#",
                "myurl": intelligent5,
                "offlines": "离线"
            }, {
                "gate": "道闸1#",
                "myurl": intelligent6,
                "offlines": "离线"
            }],
            plaTe: [{
                "gate": "道闸1#",
                "myurl": intelligent7,
                "offlines": "离线"
            }, {
                "gate": "道闸1#",
                "myurl": intelligent8,
                "offlines": "离线"
            }, {
                "gate": "道闸1#",
                "myurl": intelligent7,
                "offlines": "离线"
            }, {
                "gate": "道闸1#",
                "myurl": intelligent8,
                "offlines": "离线"
            }],
            ferRy: [{
                "gate": "道闸1#",
                "myurl": intelligent3,
                "offlines": "离线"
            }, {
                "gate": "道闸1#",
                "myurl": intelligent4,
                "offlines": "离线"
            }, {
                "gate": "道闸1#",
                "myurl": intelligent3,
                "offlines": "离线"
            }, {
                "gate": "道闸1#",
                "myurl": intelligent4,
                "offlines": "离线"
            }, {
                "gate": "道闸1#",
                "myurl": intelligent3,
                "offlines": "离线"
            }, {
                "gate": "道闸1#",
                "myurl": intelligent3,
                "offlines": "离线"
            }, {
                "gate": "道闸1#",
                "myurl": intelligent3,
                "offlines": "离线"
            }, {
                "gate": "道闸1#",
                "myurl": intelligent3,
                "offlines": "离线"
            }, {
                "gate": "道闸1#",
                "myurl": intelligent3,
                "offlines": "离线"
            }, {
                "gate": "道闸1#",
                "myurl": intelligent3,
                "offlines": "离线"
            }, {
                "gate": "道闸1#",
                "myurl": intelligent3,
                "offlines": "离线"
            }, {
                "gate": "道闸1#",
                "myurl": intelligent3,
                "offlines": "离线"
            }, {
                "gate": "道闸1#",
                "myurl": intelligent3,
                "offlines": "离线"
            }, {
                "gate": "道闸1#",
                "myurl": intelligent3,
                "offlines": "离线"
            }, {
                "gate": "道闸1#",
                "myurl": intelligent3,
                "offlines": "离线"
            }, {
                "gate": "道闸1#",
                "myurl": intelligent3,
                "offlines": "离线"
            }, {
                "gate": "道闸1#",
                "myurl": intelligent3,
                "offlines": "离线"
            }, {
                "gate": "道闸1#",
                "myurl": intelligent3,
                "offlines": "离线"
            }, {
                "gate": "道闸1#",
                "myurl": intelligent3,
                "offlines": "离线"
            }, {
                "gate": "道闸1#",
                "myurl": intelligent3,
                "offlines": "离线"
            }, {
                "gate": "道闸1#",
                "myurl": intelligent3,
                "offlines": "离线"
            }, {
                "gate": "道闸1#",
                "myurl": intelligent3,
                "offlines": "离线"
            }]


        }
    },
    computed: {
    },
    components: {
        Bread
    },
    mounted() {
        // niceScroll();
        // $("#intelligent_center").NN.niceScroll();
    },
    // 组件销毁前调用
    beforeDestory() { },
    methods: {

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
    height: 100%; // display: inline-block;
    margin: 0 auto;
    position: relative;

    .intelligent_center {
        width: 100%;
        height: 100%;
        overflow: auto;
        .device_nav {
            height: 0.6rem;
            width: 100%;
            background: url(../../../assets/kaimenNav.png)no-repeat;
            background-size: cover;
            padding-bottom: 0.5rem;
            margin-bottom: 0.05rem;
            p {
                // display: inline-block;
                line-height: 0.6rem;
            }
            .p_text {
                color: #fff;
                margin: 0 0.2rem;
            }
        }
        .intelligent_one {
            background: url(../../../images/blue.png) no-repeat;
            background-size: cover;
            width: 100%;
            height: 2.9rem; // padding:0.15rem 0 0 0.20rem;
            margin-bottom: 0.05rem;
            .intelligent_p {
                // margin-bottom:0.25rem;
                padding: 0.15rem 0 0.25rem 0.20rem;
            }
            .intelligent_all {
                height: 2.35rem;
                width: 100%;
                display: flex;

                .offline {
                    width: 1.75rem;
                    height: 1.49rem;
                    text-align: center;
                    p {}
                    img {
                        width: 1.06rem;
                        height: 0.82rem;
                        margin: 0.3rem 0;
                    }
                }
            }
        }
        .intelligent_two {
            background: url(../../../images/blue.png) no-repeat;
            background-size: cover;
            width: 100%;
            height: 7.9rem; // padding:0.15rem 0 0 0.20rem;
            margin-bottom: 0.05rem;
            .intelligent_p {
                // margin-bottom:0.25rem;
                padding: 0.15rem 0 0.25rem 0.20rem;
            }
            .intelligent_all {
                height: 100%;
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                .offline {
                    width: 1.8rem;
                    height: 1.4rem;
                    text-align: center;
                    p {}
                    img {
                        width: 1.06rem;
                        height: 0.72rem;
                        margin: 0.3rem 0;
                    }
                }
            }
        }
        .ends {
            width: 100%;
            height: 1rem;
        }
    }
}
</style>