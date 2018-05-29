<template>
    <div class="Scenecondition">
        <!--面包导航组件-->
        <Bread :breadData="abc"></Bread>
        <div class="content">
            <div class="box_top">
                <span class="newdevice1"></span>
                <span class="newdevice2"></span>
                <span class="newdevice3"></span>
                <span class="newdevice4"></span>
                <div class="ipt">
                    <input type="checkbox" value="">&nbsp&nbsp显示电量
                    <input type="checkbox" value="" class="ipt2">&nbsp&nbsp显示巡更进度
                </div>
                <div class="video_left">
                    <video class="rel_video" autobuffer autoloop loop>
                        <source src="../../../images/sky.mp4">
                        <object type="video/ogg" data="/media/video.oga" width="338" height="221">
                            <param name="src" value="/media/video.oga">
                            <param name="autoplay" value="false">
                            <param name="autoStart" value="0">
                            <p>
                                <a href="/media/video.oga">Download this video file.</a>
                            </p>
                        </object>
                    </video>
                </div>
                <div class="video_right">
                    <div class="delete">×</div>
                    <video class="rel_video" autobuffer autoloop loop>
                        <source src="">
                        <object type="video/ogg" data="/media/video.oga" width="338" height="221">
                            <param name="src" value="/media/video.oga">
                            <param name="autoplay" value="false">
                            <param name="autoStart" value="0">
                            <p>
                                <a href="/media/video.oga">Download this video file.</a>
                            </p>
                        </object>
                    </video>
                </div>
                <div class="box_ul">
                    <ul>
                        <li>2017-08-18</li>
                        <li>王五</li>
                        <li>3栋楼梯间管道漏水</li>
                        <li>
                            <a href="javascript:void(0)"><img src="../../../images/phone.png" alt=""></a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="box_center">
                <button class="people_btn" @click="threeBtn(1)" :class="{click_btn: clickBtn==1}">人员</button>
                <button @click="threeBtn(2)" :class="{click_btn: clickBtn==2}">异常信息</button>
                <button @click="threeBtn(3)" :class="{click_btn: clickBtn==3}">紧急报警</button>
            </div>
            <div class="box_bottom">
                <div class="open1" v-show="clickBtn==1">
                    <!--底部导航-->
                    <ul class="content_divNav">
                        <li>序号</li>
                        <li>人员</li>
                        <li>电量</li>
                        <li>流量</li>
                        <li>巡更进度</li>
                        <li>操作1</li>
                    </ul>
                    <!--底部中间内容-->
                    <div class="content_div">
                        <ul class="ul_list" v-for='d in  value'>
                            <li>{{d.order}}</li>
                            <li>{{d.DoorEquipment}}</li>
                            <li>{{d.time}}</li>
                            <li>{{d.name}}</li>
                            <li>{{d.event}}</li>
                            <li class="aside">{{d.operate}}</li>

                        </ul>
                    </div>
                </div>
                <div class="open2" v-show="clickBtn==2">
                    <!--底部导航-->
                    <ul class="content_divNav">
                        <li>序号</li>
                        <li>人员</li>
                        <li>电量</li>
                        <li>流量</li>
                        <li>巡更进度</li>
                        <li>操作2</li>
                    </ul>
                    <!--底部中间内容-->
                    <div class="content_div">
                        <ul class="ul_list" v-for='d in  value'>
                            <li>{{d.order}}</li>
                            <li>{{d.DoorEquipment}}</li>
                            <li>{{d.time}}</li>
                            <li>{{d.name}}</li>
                            <li>{{d.event}}</li>
                            <li class="aside">{{d.operate}}</li>

                        </ul>
                    </div>
                </div>
                <div class="open3" v-show="clickBtn==3">
                    <!--底部导航-->
                    <ul class="content_divNav">
                        <li>序号</li>
                        <li>人员</li>
                        <li>电量</li>
                        <li>流量</li>
                        <li>巡更进度</li>
                        <li>操作3</li>
                    </ul>
                    <!--底部中间内容-->
                    <div class="content_div">
                        <ul class="ul_list" v-for='d in  value'>
                            <li>{{d.order}}</li>
                            <li>{{d.DoorEquipment}}</li>
                            <li>{{d.time}}</li>
                            <li>{{d.name}}</li>
                            <li>{{d.event}}</li>
                            <li class="aside">{{d.operate}}</li>

                        </ul>
                    </div>
                </div>
                <!--底部每页显示-->
                <div class="page">
                    <span>每页显示</span>
                    <select class="select">
                        <option value="A">10</option>
                        <option value="B">20</option>
                        <option value="C">30</option>
                    </select>
                    <div class="pageDiv">
                        <img src="../../../images/be.jpg" />
                        <span>1/1</span>
                        <img src="../../../images/show.jpg" />
                    </div>

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
            clickBtn: '1',	//判断右下角卡片选中哪个
            abc: ['物联监控', '人员指挥调度', '巡更人员', '现场情况查看'],
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
        Bread
    },
    mounted() {

    },
    methods: {
        threeBtn(num) {
            this.clickBtn = num;
        }
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

.Scenecondition {
    vertical-align: top;
    width: 100%;
    height: 100%; // display: inline-block;
    // border: 1px solid green;
}

.content {
    width: 13.65rem;
    height: 8.04rem; // background:skyblue;
    margin:0 auto;
    .box_top {
        width: 13.34rem;
        height: 4.54rem;
        background: rgba(123, 123, 231, .4);
        background-size: contain;
        margin-top: 0.32rem;
        margin-left: 0.05rem;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        .ipt {
            width: 3.15rem;
            height: 0.47rem;
            position: absolute;
            right: -0.25rem;
            color: #fff;
            top: 0.15rem;
            .ipt2 {
                margin-left: 0.4rem;
            }
        }
        span {
            display: inline-block;
            width: 0.4rem;
            height: 0.4rem;
        }
        .newdevice1 {
            background: url(../../../images/newdevice1.png);
            background-size: contain;
            position: absolute;
            left: -0.14rem;
            top: -0.14rem;
        }
        .newdevice2 {
            background: url(../../../images/newdevice2.png);
            background-size: contain;
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
            background-size: contain;
            position: absolute;
            right: -0.14rem;
            bottom: -0.14rem;
        }
        .video_left {
            .rel_video {
                width: 3.38rem;
                height: 2.21rem;
                object-fit: fill;
            }
        }
        .video_right {
            position: relative;
            .delete {
                width: 0.36rem;
                height: 0.36rem;
                border-radius: 50%;
                background: transparent;
                border: 0.02rem solid #00d2ff;
                color: #00d2ff;
                position: absolute;
                right: -0.15rem;
                top: -0.2rem;
                text-align: center;
                line-height: 0.3rem;
                font-size: 0.30rem;
                @include aa;
            }
            .delete:hover {
                color: red;
                border: 0.02rem solid red;
                @include aa;
            }
            .rel_video {
                width: 3.38rem;
                height: 2.23rem;
                object-fit: fill;
                margin-left: 0.05rem;
                background: url(../../../images/monit_open.png);
            }
        }
        .box_ul {
            width: 4.8rem;
            height: 0.9rem;
            background: url(../../../images/page.png)no-repeat;
            background-size: 100% 100%;
            position: absolute;
            bottom: 0.4rem;
            left: 4.4rem;
            padding-left: 0.2rem;
            ul {
                height: 0.5rem;
                li {
                    float: left;
                    color: #70ccfc;
                    line-height: 0.9rem;
                    margin-left: 0.3rem;
                }
            }
        }
    }
    .box_center {
        height: 0.89rem;
        width: 100%;
        line-height: 1.2rem;
        .people_btn {
            // background: #028fd8;
            // opacity: 1;
        }
        button {
            width: 1.54rem;
            height: 0.4rem;
            border-radius: 0.04rem;
            background: #0c6ba5;
            opacity: 1;
            outline: none;
            @include aa;
        }
        
    }
    .box_bottom {
        width: 13.5rem; // 底下那个序号表
        .content_div {
            background-image: url(../../../images/kaimen.png);
            width: 100%;
            height: 1.4rem;
        } // 序号表头部
        .content_divNav {
            flex: 1;
            display: flex;
            height: 0.4rem;
            width: 100%;
            background-image: url(../../../images/kaimenNav.png);
        }
        .content_divNav li {
            // float: left;
            text-align: center;
            flex: 1;
            height: 0.4rem;
            line-height: 0.4rem;
            color: white;
            border-right: 0.02rem solid #698499; // font-size:0.12rem;
        }
        /*表格主体内容*/
        .ul_list {
            float: left;
            flex: 1;
            display: flex;
            height: 0.35rem;
            width: 100%;
            .aside {
                color: red;
                @include aa;
            }
        }
        .ul_list li {
            flex: 1;
            text-align: center;
            line-height: 0.35rem;
            color: white;
            border-bottom: 0.02rem solid #698499;
            font-size: 0.14rem;
        }
    }
    /*底部换页框*/
    .page {
        line-height: 0.5rem;
        width: 2.7rem;
        height: 0.5rem;
        background-image: url(../../../images/page.png);
        background-position: center;
        float: right;
        margin-top: 0.2rem;
        margin-right: 0rem;
    }

    .page>span {
        color: #70ccfc;
        margin-left: 0.2rem;
    }

    .select {
        text-align: center;
        width: 0.61rem;
        height: 0.35rem;
        background: darkgray;
        background-image: url(../../../images/kaimen.png);
        color: white;
    }

    .pageDiv {
        display: inline-block;
        margin-left: 0.15rem;
    }
    .click_btn {
        box-shadow: 0 0.03rem 0 0 #fff;
       
    }
}
</style>