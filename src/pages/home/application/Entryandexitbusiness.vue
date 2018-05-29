<template>
    <div class="device">
        <!--业务配置/设备监控阀值配置组件-->
        <Bread :breadData="abc"></Bread>
        <div class="device-nav">
            <div class="img_time">
                <div class="Starttime">
                    <el-select v-model="value" placeholder="入场时间" class="place">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>

                <div class="date-time">
                    <div class="block">
                        <el-date-picker v-model="value3" type="datetimerange" placeholder="选择时间范围" class="el_picker">
                        </el-date-picker>
                    </div>
                </div>
                <input type="text" class="device_case" value="请输入搜索内容">
                <span class="search"></span>
                <input type="button" value="搜索" class="bttn">
                <a class="inout_a" href="javascript:void(0);"><img src="../../../images/inout.png" alt=""></a>
            </div>
        </div>
        <!--顶部导航-->
        <ul class="content_divNav">
            <li class="serial1">序号</li>
            <li>车牌号</li>
            <li class="remove_li1">
                <el-select v-model="value" placeholder="全部车辆" class="place_bus">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </li>
            <li class="remove_li2">入场时间</li>
            <li>入场地点</li>
            <li>出场时间</li>
            <li>出场地点</li>
            <li>停车时间</li>
            <li>应收金额(元)</li>
            <li>实收金额(元)</li>
            <li>备注</li>
        </ul>
        <!--中间内容-->
        <div class="content_div">
            <ul class="ul_list" v-for='(d, index) in  startTime'>
                <li>{{d.order}}</li>
                <li>{{d.plate}}</li>
                <li>{{d.allplate}}</li>
                <li>{{d.time}}</li>
                <li>{{d.place}}</li>
                <li>{{d.outtiom}}</li>
                <li>{{d.outplace}}</li>
                <li>{{d.stopplate}}</li>
                <li>{{d.money}}</li>
                <li>{{d.amount}}</li>
                <li>{{d.remarks}}</li>
            </ul>
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
                <img src="../../../images/left_select.png" />
                <span>1/1</span>
                <img src="../../../images/right_select.png" />
            </div>
        </div>
        <!--点击删除出现的模态框-->
        <div class="box_model" v-if="box_model">
            <p>确 认 删 除</p>
            <button @click="removeTode(keepIndex)">确认</button>
            <button class="btn2" @click="cancal">取消</button>
        </div>
    </div>
</template>
<script>
import Bread from '@/components/common/bread'
export default {
    data() {
        return {
            abc: ['物联监控', '出入指挥调度', '人行指挥调度', '车辆出入记录'],
            modifyvue: null,
            box_model: false,
            keepIndex: null,
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
            value3: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
            value4: '',
            options: [{
                value: '选项1',
                label: '黄金糕'
            }, {
                value: '选项2',
                label: '双皮奶'
            }, {
                value: '选项3',
                label: '蚵仔煎'
            }, {
                value: '选项4',
                label: '龙须面'
            }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
            value: '',
            startTime: [
                {
                    'order': '1',
                    'plate': '湘-D9830',
                    'allplate': '特权车辆',
                    'time': '2017-09-10   14:00:11',
                    'place': '入口道闸1',
                    'outtiom': '2017-09-10  16:00:11',
                    'outplace': '入口道闸2',
                    'stopplate': '2小时5分钟0秒',
                    'money': '0',
                    'amount': '0',
                    'remarks': '0'
                }, {
                    'order': '1',
                    'plate': '湘-D9830',
                    'allplate': '特权车辆',
                    'time': '2017-09-10   14:00:11',
                    'place': '入口道闸1',
                    'outtiom': '2017-09-10  16:00:11',
                    'outplace': '入口道闸2',
                    'stopplate': '2小时5分钟0秒',
                    'money': '0',
                    'amount': '0',
                    'remarks': '0'
                }, {
                    'order': '1',
                    'plate': '湘-D9830',
                    'allplate': '特权车辆',
                    'time': '2017-09-10   14:00:11',
                    'place': '入口道闸1',
                    'outtiom': '2017-09-10  16:00:11',
                    'outplace': '入口道闸2',
                    'stopplate': '2小时5分钟0秒',
                    'money': '0',
                    'amount': '0',
                    'remarks': '0'
                }, {
                    'order': '1',
                    'plate': '湘-D9830',
                    'allplate': '特权车辆',
                    'time': '2017-09-10   14:00:11',
                    'place': '入口道闸1',
                    'outtiom': '2017-09-10  16:00:11',
                    'outplace': '入口道闸2',
                    'stopplate': '2小时5分钟0秒',
                    'money': '0',
                    'amount': '0',
                    'remarks': '0'
                },
                {
                    'order': '1',
                    'plate': '湘-D9830',
                    'allplate': '特权车辆',
                    'time': '2017-09-10   14:00:11',
                    'place': '入口道闸1',
                    'outtiom': '2017-09-10  16:00:11',
                    'outplace': '入口道闸2',
                    'stopplate': '2小时5分钟0秒',
                    'money': '0',
                    'amount': '0',
                    'remarks': '0'
                },
                {
                    'order': '1',
                    'plate': '湘-D9830',
                    'allplate': '特权车辆',
                    'time': '2017-09-10   14:00:11',
                    'place': '入口道闸1',
                    'outtiom': '2017-09-10  16:00:11',
                    'outplace': '入口道闸2',
                    'stopplate': '2小时5分钟0秒',
                    'money': '0',
                    'amount': '0',
                    'remarks': '0'
                },
                {
                    'order': '1',
                    'plate': '湘-D9830',
                    'allplate': '特权车辆',
                    'time': '2017-09-10   14:00:11',
                    'place': '入口道闸1',
                    'outtiom': '2017-09-10  16:00:11',
                    'outplace': '入口道闸2',
                    'stopplate': '2小时5分钟0秒',
                    'money': '0',
                    'amount': '0',
                    'remarks': '0'
                },
                {
                    'order': '1',
                    'plate': '湘-D9830',
                    'allplate': '特权车辆',
                    'time': '2017-09-10   14:00:11',
                    'place': '入口道闸1',
                    'outtiom': '2017-09-10  16:00:11',
                    'outplace': '入口道闸2',
                    'stopplate': '2小时5分钟0秒',
                    'money': '0',
                    'amount': '0',
                    'remarks': '0'
                },
                {
                    'order': '1',
                    'plate': '湘-D9830',
                    'allplate': '特权车辆',
                    'time': '2017-09-10   14:00:11',
                    'place': '入口道闸1',
                    'outtiom': '2017-09-10  16:00:11',
                    'outplace': '入口道闸2',
                    'stopplate': '2小时5分钟0秒',
                    'money': '0',
                    'amount': '0',
                    'remarks': '0'
                },
                {
                    'order': '1',
                    'plate': '湘-D9830',
                    'allplate': '特权车辆',
                    'time': '2017-09-10   14:00:11',
                    'place': '入口道闸1',
                    'outtiom': '2017-09-10  16:00:11',
                    'outplace': '入口道闸2',
                    'stopplate': '2小时5分钟0秒',
                    'money': '0',
                    'amount': '0',
                    'remarks': '0'
                },
                {
                    'order': '1',
                    'plate': '湘-D9830',
                    'allplate': '特权车辆',
                    'time': '2017-09-10   14:00:11',
                    'place': '入口道闸1',
                    'outtiom': '2017-09-10  16:00:11',
                    'outplace': '入口道闸2',
                    'stopplate': '2小时5分钟0秒',
                    'money': '0',
                    'amount': '0',
                    'remarks': '0'
                },
                {
                    'order': '1',
                    'plate': '湘-D9830',
                    'allplate': '特权车辆',
                    'time': '2017-09-10   14:00:11',
                    'place': '入口道闸1',
                    'outtiom': '2017-09-10  16:00:11',
                    'outplace': '入口道闸2',
                    'stopplate': '2小时5分钟0秒',
                    'money': '0',
                    'amount': '0',
                    'remarks': '0'
                },
                {
                    'order': '1',
                    'plate': '湘-D9830',
                    'allplate': '特权车辆',
                    'time': '2017-09-10   14:00:11',
                    'place': '入口道闸1',
                    'outtiom': '2017-09-10  16:00:11',
                    'outplace': '入口道闸2',
                    'stopplate': '2小时5分钟0秒',
                    'money': '0',
                    'amount': '0',
                    'remarks': '0'
                },
                {
                    'order': '1',
                    'plate': '湘-D9830',
                    'allplate': '特权车辆',
                    'time': '2017-09-10   14:00:11',
                    'place': '入口道闸1',
                    'outtiom': '2017-09-10  16:00:11',
                    'outplace': '入口道闸2',
                    'stopplate': '2小时5分钟0秒',
                    'money': '0',
                    'amount': '0',
                    'remarks': '0'
                },
                {
                    'order': '1',
                    'plate': '湘-D9830',
                    'allplate': '特权车辆',
                    'time': '2017-09-10   14:00:11',
                    'place': '入口道闸1',
                    'outtiom': '2017-09-10  16:00:11',
                    'outplace': '入口道闸2',
                    'stopplate': '2小时5分钟0秒',
                    'money': '0',
                    'amount': '0',
                    'remarks': '0'
                },
                {
                    'order': '1',
                    'plate': '湘-D9830',
                    'allplate': '特权车辆',
                    'time': '2017-09-10   14:00:11',
                    'place': '入口道闸1',
                    'outtiom': '2017-09-10  16:00:11',
                    'outplace': '入口道闸2',
                    'stopplate': '2小时5分钟0秒',
                    'money': '0',
                    'amount': '0',
                    'remarks': '0'
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
        removeTode(keep) {
            console.log(keep);
            this.value.splice(keep, 1);
            this.box_model = false;
        },
        show_model(index) {
            this.keepIndex = index;
            this.box_model = true;
        },
        cancal() {
            this.box_model = false;
        }
    }
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin';
// 整个大框
.device {
    vertical-align: top;
    width: 100%;
    height: 8.96rem; // display: inline-block;
    margin: 0 auto;
    position: relative;
    .device-nav {
        height: 0.6rem;
        width: 100%;
        background: url(../../../assets/kaimenNav.png)no-repeat;
        background-size: 100% 100%;
        padding-bottom: 0.5rem;
        margin-bottom: 0.08rem;

        .img_time {
            display: inline-block;
            height: 0.36rem;
            width: auto; // float: right; // line-height: 0.1rem;
            // margin-right: 0.3rem;
            position: relative;
            margin-bottom: 0.1rem;
            float: right; // 入场时间
            .Starttime {
                display: inline-block;
                height: 0.36rem;
                width: 2.25rem;
                margin-right: -0.25rem;
                vertical-align: middle;
                .place{
                     height: 0.36rem;
                width: 2rem;
                }
            }
            .into-time {
                width: 1.32rem;
                height: 0.36rem;
                color: #fff;
                border: 1px solid #83dbff;
                border-radius: 5px;
                padding-left: 2px;
                outline: none;
                margin-right: 0.1rem;
                vertical-align: middle;
                option {
                    background: transparent;
                }
            }
            .date-time {
                display: inline-block;
                width: 3.50rem;
                height: 0.36rem;
                color: #67bce9;
                outline: none;
                vertical-align: middle; // margin-top:0.05rem;
                margin-left: -0.05rem;
                margin-right: 0.5rem; // @include ct;
                .el_picker{
                    width: 3.50rem;
                height: 0.36rem;
                }
            } // 搜索内容框
            .device_case {
                display: inline-block;
                width: 3.65rem;
                height: 0.4rem;
                border: 0.01rem solid #83dbff; // margin-top:0.1rem;
                background: transparent;
                color: #fff;
                margin-left: -0.05rem;
                margin-top: 0.05rem;
                border-radius: 0.04rem;
            }
            input::-ms-clear {
                display: none;
            }
            .search {
                display: inline-block;
                width: 0.2rem;
                height: 0.2rem;
                background: url(../../../assets/search.png)no-repeat;
                background-size: cover;
                margin-left: -0.3rem;
                @include aa;
            } // 搜索按钮
            .bttn {
                margin:0.14rem 0.15rem 0 0.1rem;
               @include btn(0.9rem,0.35rem);           
            }
            .inout_a {
                img {
                    display: inline-block;
                    width: 0.21rem;
                    height: 0.21rem;
                    margin-right: 0.15rem;
                }
            }
        }
    } // 点击删除弹出的模态框
    .box_model {
        background: url(../../../images/box_model.png) no-repeat;
        width: 4.04rem;
        height: 1.97rem;
        @include center;
        p {
            color: #fff;
            font-size: 0.2rem;
            text-align: center;
            padding-top: 0.5rem;
        }
        button {
            margin-top: 0.3rem;
            margin-left: 0.75rem;
            @include btn(0.91rem,
            #028fd8)
        }
        .btn2 {
            background: gray;
        }
    }
}

.content_div {
    background-image: url(../../../images/kaimen.png);
    width: 100%;
    height: 6.20rem;
    overflow: auto; // 三角箭头的颜色
}

.content_divNav {
    // flex: 1;
    display: flex;
    height: 0.4rem;
    width: 100%;
    background-image: url(../../../images/kaimenNav.png);
    .serial1 {
        border-left: none;
    }
    .remove_li1 {
        border-left: none;
        .place_bus{
            width: 1.44rem;
            height: 0.4rem;
            font-size:0.16rem;
        }
    }
    .remove_li2 {
        border-left: none;
    }
}

.content_divNav li {
    float: left;
    text-align: center; // flex-shrink: auto;
    flex: 1;
    height: 0.4rem;
    line-height: 0.4rem;
    color: white;
    border-left: 2px solid #698499; // font-size:0.12rem;
    font-size: 0.18rem;
}

//表格主体内容
.ul_list {
    float: left;
    flex: 1;
    display: flex;
    height: auto;
    width: 100%;
    .btn_center {
        button {
            background: transparent;
            border: 0rem;
            @include aa;
            outline: none;
        }
        .btn1 {
            color: #fff;
            margin-left: 0.25rem;
        }
        .btn2 {
            color: red; // margin-left: 0.2rem;
            padding-left: 0.05rem;
        }
    }
}

.ul_list li {
    flex: 1;
    text-align: center;
    line-height: 0.5rem;
    height: auto;
    color: white;
    border-bottom: 2px solid #698499;
    font-size: 0.14rem;
}

//底部换页框
.page {
    line-height: 0.6rem;
    width: 2.7rem;
    height: 0.6rem;
    background-image: url(../../../images/page.png);
    background-position: center;
    float: right;
    margin-top: 0.2rem;
    margin-right: 0.25rem;
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
    span {
        color: #83dbff;
        margin: 0 0.15rem;
    }
    img {
        @include aa;
        
    }
}

select {
    /*Chrome和Firefox里面的边框是不一样的，所以复写了一下*/
    /*很关键：将默认的select选择框样式清除*/
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    background: transparent;
    /*在选择框的最右侧中间显示小箭头图片*/
    background: url("http://ourjs.github.io/static/2015/arrow.png") no-repeat scroll right center transparent;
    /*为下拉小箭头留出一点位置，避免被文字覆盖*/
    padding-right: 14px;
}

select::-ms-expand {
    display: none;
}
</style>