<template>
    <div class="device">
        <!--业务配置/设备监控阀值配置组件-->
        <Bread :breadData="abc"></Bread>
        <div class="content_left">
            <div class="device-nav">
                <div class="img-time">
                    <div class="date_time">
                        <div class="block">
                            <span class="demonstration"></span>
                            <el-date-picker v-model="value6" type="daterange" placeholder="输入日期范围" class="el_picker">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="date-device">
                        <div>
                            <el-input placeholder="请输入搜索内容" v-model="input5" class="place">
                                <el-select v-model="select" slot="prepend" placeholder="请选择" class="place">
                                    <el-option label="报修人" value="1"></el-option>
                                    <el-option label="跟进人" value="2"></el-option>
                                </el-select>
                                <el-button slot="append" icon="search"></el-button>
                            </el-input>
                        </div>
                    </div>
                    <input type="button" value="搜索" class="bttn">
                    <img src="../../../images/inout.png" alt="" @click="derivedForm('tableExcel')">
                </div>
            </div>
            <div class="table">
                <table id="tableExcel" cellspacing="0" cellpadding="0">
                    <thead class="table_thead">
                        <tr class="nav_table">
                            <th> 单号</th>
                            <th> 生成时间</th>
                            <th> 完成时间</th>
                            <th> 报修人</th>
                            <th class="left_none">
                                <select>
                                    <option value="volvo">全部状态</option>
                                    <option value="saab">进行中</option>
                                    <option value="opel">已完成</option>
                                    <option value="audi">未完成</option>
                                </select>
                            </th>
                            <th>跟进人</th>
                            <th> 操作</th>
                        </tr>
                    </thead>
                    <tbody class="table_body">
                        <tr v-for='(d, index) in  vaLue' :key="index" class="center_table">
                            <td>{{d.单号}}</td>
                            <td>{{d.生成时间}}</td>
                            <td>{{d.完成时间}}</td>
                            <td>{{d.报修人}}</td>
                            <td>{{d.全部状态}}</td>
                            <td>{{d.跟进人}} </td>
                            <td class="btn_center">
                                <button class="btn1">修改</button>
                                <button class="btn2">删除</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!--底部换页-->
            <div class="pager">
                <div class="block">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage2" :page-sizes="[30,60,90]" :page-size="100" layout="sizes, prev, pager, next" :total="100">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Bread from '@/components/common/bread'
import { mapState } from 'vuex'
export default {
    data() {
        return {
            abc: ['管理应用', '工程管理', '维修管理'],
            modifyvue: null,
            box_model: false,
            currentPage2: 5,
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
            vaLue: [],
            options: [{
                value: '选项1',
                label: '已完成'
            }, {
                value: '选项2',
                label: '进行中'
            }, {
                value: '选项3',
                label: '已关闭'
            }],
            value: '',
        }
    },
    computed: {
        ...mapState(['mnUrl'])
    },
    components: {
        Bread
    },
    mounted() {
        this.getData()
    },
    methods: {
        removeTode(keep) {
            // console.log(keep);
            this.value.splice(keep, 1);
            this.box_model = false;
        },
        show_model(index) {
            this.keepIndex = index;
            this.box_model = true;
        },
        cancal() {
            this.box_model = false;
        },
        getData() {
            const url = this.mnUrl + "/tmp/watching/engineer/repaire"
            this.$http.get(url).then(res => {
                // console.log(res)
                this.vaLue = res.body.content;
                // console.log(this.vaLue)
            }, function(error) {
                console.log(error)
            })
        },
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
        },
        derivedForm(tableExcel) {
            this.$func.method5(tableExcel)
        },
    }
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin';
// 整个大框
.el-select {
    width: 1.1rem;
}

.device {
    vertical-align: top;
    width: 100%;
    height: 8.96rem;
    margin: 0 auto;
    position: relative;

    .content_left {
        display: inline-block;
        width: 100%;
        .device-nav {
            display: inline-block;
            height: 0.6rem;
            width: 100%;
            background: url(../../../assets/kaimenNav.png)no-repeat;
            background-size: 100% 100%; // padding-bottom: 0.5rem;
            // margin-bottom: 0.08rem;
            //导航栏右边的日历搜索等框
            .img-time {
                display: inline-block;
                height: 0.6rem;
                width: auto; // float: right; // line-height: 0.1rem;
                // margin-right: 0.3rem;
                position: relative;
                margin-bottom: 0.1rem;
                float: right;
                .date_time {
                    display: inline-block;
                    /*width: 2.8rem;*/
                    height: 0.4rem;
                    color: #67bce9;
                    outline: none;
                    vertical-align: middle; // margin-top:0.05rem;
                    margin-right: 0.2rem;
                    .el_picker {
                        display: inline-block;
                        width: 2.58rem;
                        height: 0.4rem;
                        font-size: 0.14rem;
                    }
                }
                .search {
                    display: inline-block;
                    width: 0.2rem;
                    height: 0.2rem;
                    background: url(../../../assets/search.png)no-repeat;
                    background-size: 100% 100%;
                    margin-left: -0.3rem;
                    @include aa;
                } // 配置名称框
                .date-device {
                    display: inline-block;
                    height: 0.4rem;
                    width: 4.65rem;
                    background: transparent;
                    color: #67bce9;
                    vertical-align: middle;
                    .place {
                        font-size: 0.14rem;
                    }
                } // 搜索按钮
                .bttn {
                    margin: 0.16rem 0.15rem 0 0;
                    @include btn(0.8rem, 0.3rem);
                }
                img {
                    width: 0.21rem;
                    height: 0.21rem;
                    margin-right: 0.15rem;
                    @include aa;
                }
            }
            .inout_a {
                margin-right: 0.15rem;
                img {
                    width: 0.21rem;
                    height: 0.21rem;
                }
            }
        }

        .table {
            width: 100%;
            height: 7rem;
            background-image: url(../../../images/kaimen.png);
            background-size: 100% 100%;
            overflow: hidden;
            scrollbar-base-color: #12253d; // 滚动条滑块按钮的颜色
            scrollbar-face-color: #184e7a; // 滚动条整体颜色
            // scrollbar-highlight-color: #333;
            // 滚动条阴影
            // scrollbar-shadow-color: #ccc;
            // 滚动条轨道颜色·································································	··································································	
            scrollbar-track-color: #12253d;
            scrollbar-arrow-color: #12253d;
            table {
                width: 100%;
                height: 6.2rem;
                border: 0;
                .table_thead {
                    display: inline-block;
                    width: 100%;
                    height: 0.4rem;
                    overflow: hidden;
                    background-color: #184e7a;
                    .nav_table {
                        width: 100%;
                        height: 0.4rem;
                        text-align: center;
                        overflow: hidden;
                        background-image: url(../../../images/kaimenNav.png);
                        background-size: 100% 100%;
                        display: flex;
                        align-items: center;
                        th:last-child {
                            border-right: 2px solid #698499;
                        }
                        th {
                            flex: 1;
                            width: 0.6rem;
                            height: 0.4rem;
                            line-height: 0.4rem;
                            border-left: 2px solid #698499;
                            display: inline-block;
                        }
                        .left_none {
                            select {
                                text-align: center;
                                color: #83dbff;
                                outline: none;
                                height: 100%;
                                padding: 0.1rem 0.1rem;
                                @include aa;
                                option {
                                    background: #060e1d;
                                }
                            }
                        }
                    }
                }
                .table_body {
                    display: inline-block;
                    width: 100%;
                    height: 6.8rem;
                    overflow: hidden;
                    overflow-y: scroll;
                    .center_table {
                        display: flex;
                        align-items: center;
                        justify-content: space-around;
                        border-bottom: 2px solid #698499;
                        td {
                            flex: 1.8; // height: 0.4rem;
                            padding: 0.2rem 0;
                            line-height: 0.4rem;
                            text-align: center;
                            display: inline-block;
                            button {
                                background: transparent;
                            }
                            .btn2 {
                                color: red;
                            }
                        }
                    }
                }
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
    }
}

.pager {
    float: right;
    margin-top: 0.2rem;
}
</style>