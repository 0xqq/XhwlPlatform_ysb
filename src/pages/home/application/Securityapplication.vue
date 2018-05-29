<template>
    <div class="warningMessage">
        <!--业务配置/设备监控阀值配置组件-->
        <Bread :breadData="abc"></Bread>
        <div class="nav_btn">
            <button class="nav_btn1" @click="mwssageBtn(1)" :class="{'bord_click':clickBtn==1}">人员</button>
            <button class="nav_btn2" @click="mwssageBtn(2)" :class="{'bord_click':clickBtn==2}">异常信息</button>
            <button class="nav_btn2" @click="mwssageBtn(3)" :class="{'bord_click':clickBtn==3}">紧急报警</button>
        </div>
        <div class="warning_all" v-show="clickBtn==1">
            <!--顶部导航-->
            <ul class="content_divNav">
                <li class="serial1">序号</li>
                <li>人员</li>
                <li>电量</li>
                <li>流量</li>
                <li>巡更进度</li>
                <li>操作</li>
            </ul>
            <!--中间内容-->
            <div class="content_div">
                <ul class="ul_list" v-for='(d, index) in  value'>
                    <li>{{d.order}}</li>
                    <li>{{d.DoorEquipment}}</li>
                    <li>{{d.time}}</li>
                    <li>{{d.name}}</li>
                    <li>{{d.mode}}</li>
                    <li class="intercom">对讲</li>
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
        </div>
        <div class="warning_all" v-show="clickBtn==2">
            <!--顶部导航-->
            <ul class="content_divNav">
                <li class="serial1">序号2</li>
                <li>人员</li>
                <li>电量</li>
                <li>流量</li>
                <li>巡更进度</li>
                <li>操作</li>
            </ul>
            <!--中间内容-->
            <div class="content_div">
                <ul class="ul_list" v-for='(d, index) in  value'>
                    <li>{{d.order}}</li>
                    <li>{{d.DoorEquipment}}</li>
                    <li>{{d.time}}</li>
                    <li>{{d.name}}</li>
                    <li>{{d.mode}}</li>
                    <li>对讲</li>

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
        </div>
        <div class="warning_all" v-show="clickBtn==3">
            <!--顶部导航-->
            <ul class="content_divNav">
                <li class="serial1">序号3</li>
                <li>人员</li>
                <li>电量</li>
                <li>流量</li>
                <li>巡更进度</li>
                <li>操作</li>
            </ul>
            <!--中间内容-->
            <div class="content_div">
                <ul class="ul_list" v-for='(d, index) in  value'>
                    <li>{{d.order}}</li>
                    <li>{{d.DoorEquipment}}</li>
                    <li>{{d.time}}</li>
                    <li>{{d.name}}</li>
                    <li>{{d.mode}}</li>
                    <li>{{d.report}}</li>

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
    </div>
</template>
<script>
import Bread from '@/components/common/bread'
export default {
    data() {
        return {
            abc: ['业务配置', '增值业务', '报警信息推送'],
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
            value6: '',
            clickBtn: '1',
            value: [
                {
                    'order': 'KM001',
                    'DoorEquipment': '东大门岗亭1',
                    'time': '2017-08-15 ',
                    'name': '张三',
                    'mode': '支付宝',
                    'report': '报警',
                },
                {
                    'order': 'KM002',
                    'DoorEquipment': '东大门岗亭2',
                    'time': '2017-08-15 ',
                    'name': '张三',
                    'modify': '修改',
                    'delete': '删除'
                },
                {
                    'order': 'KM003',
                    'DoorEquipment': '东大门岗亭3',
                    'time': '2017-08-15 ',
                    'name': '张三',
                    'modify': '修改',
                    'delete': '删除'
                },
                {
                    'order': 'KM004',
                    'DoorEquipment': '东大门岗亭4',
                    'time': '2017-08-15',
                    'name': '张三',
                    'modify': '修改',
                    'delete': '删除'
                },
                {
                    'order': 'KM005',
                    'DoorEquipment': '东大门岗亭5',
                    'time': '2017-08-15 ',
                    'name': '张三',
                    'modify': '修改',
                    'delete': '删除'
                }
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
        mwssageBtn(num) {
            this.clickBtn = num;
        }
    }
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin';
// 整个大框
.warningMessage {
    vertical-align: top;
    width: 100%;
    height: 5.71rem; // display: inline-block;
    margin: 0 auto;
    position: relative;
    .nav_btn {
        margin-bottom: 0.12rem;
        button {
            width: 1.26rem;
            height: 0.43rem;
            border-radius: 0.04rem;
            outline: none;
            color: #31669c;
            background: linear-gradient(#0d2753, #000a17, #041328);
            @include aa;
        }
    }
}

.content_div {
    background-image: url(../../../images/kaimen.png);
    width: 100%;
    height: 5.71rem;
    overflow: auto; // 三角箭头的颜色
    // scrollbar-base-color: #12253d; // 滚动条滑块按钮的颜色
    // scrollbar-face-color: #184e7a; // 滚动条整体颜色
    // scrollbar-highlight-color: #333;
    // 滚动条阴影
    // scrollbar-shadow-color: #ccc;
    // 滚动条轨道颜色·································································	··································································	
    // scrollbar-track-color: #12253d;
    // scrollbar-arrow-color: #12253d; // 点击删除弹出的模态框
}

.content_div {
    background-image: url(../../../images/kaimen.png);
    width: 100%;
    height: 5.71rem;
    overflow: auto; // 三角箭头的颜色
    scrollbar-base-color: #12253d; // 滚动条滑块按钮的颜色
    scrollbar-face-color: #184e7a; // 滚动条整体颜色
    // scrollbar-highlight-color: #333;
    // 滚动条阴影
    // scrollbar-shadow-color: #ccc;
    // 滚动条轨道颜色···································································································································	
    scrollbar-track-color: #12253d;
    scrollbar-arrow-color: #12253d;
}

.content_divNav {
    display: flex;
    height: 0.4rem;
    width: 100%;
    background-image: url(../../../images/kaimenNav.png);
    .serial1 {
        border-left: none;
    }
    li {
        float: left;
        text-align: center; // flex-shrink: auto;
        flex: 1;
        height: 0.4rem;
        line-height: 0.4rem;
        color: white;
        border-left: 2px solid #698499; // font-size:0.12rem;
        font-size: 0.16rem;
    }
}


/*表格主体内容*/

.ul_list {
    float: left;
    flex: 1;
    display: flex;
    height: auto;
    width: 100%;
    .intercom{
        color:#83dbff;
        @include aa;
    }

    li {
        flex: 1;
        text-align: center; // line-height: 1.166rem;
        line-height: 1rem;
        color: white;
        border-bottom: 2px solid #698499;
        font-size: 0.14rem;
    }
}

// 底部换页框
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

.box_model {
    background: url(../../../images/box_model.png) no-repeat;
    width: 4.04rem;
    height: 1.97rem;
    margin: 150px 0;
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
        @include btn(0.91rem, #028fd8)
    }
    .btn2 {
        background: gray;
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

.bord_click {
    color: #68ffff!important;
    background: linear-gradient(#2477c2, #022749, #072f55)!important;
}
</style>