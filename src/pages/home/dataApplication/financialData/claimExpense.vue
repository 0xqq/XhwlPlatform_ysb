<template>
    <div class="StopintheCharge">
        <Bread :breadData="abc"></Bread>
        <div class="device_nav">
            <div class="img-time">
                <div class="calendar">
                    <select class="select">
                        <option value="A">2017年</option>
                        <option value="B">2018年</option>
                        <option value="C">2019年</option>
                    </select>
                    <select class="calendar_select">
                        <option value="1">1月</option>
                        <option value="2">2月</option>
                        <option value="3">3月</option>
                        <option value="4">4月</option>
                        <option value="5">5月</option>
                        <option value="6">6月</option>
                        <option value="7">7月</option>
                        <option value="8">8月</option>
                        <option value="9">9月</option>
                        <option value="10">10月</option>
                        <option value="11">11月</option>
                        <option value="12">12月</option>
                    </select>
                </div>
                <div class="date-device">
                    <div>
                        <el-input placeholder="请输入搜索内容" v-model="input5" class="place">
                            <el-select v-model="select" slot="prepend" placeholder="房产名称" class="place">
                                <el-option label="房产名称" value="1"></el-option>
                                <el-option label="客户名称" value="2"></el-option>
                            </el-select>

                            <el-button slot="append" icon="search"></el-button>
                        </el-input>
                    </div>
                </div>
                <input type="button" value="搜索" class="bttn">
                <img src="../../../../images/inout.png" alt="" @click="derivedForm('tableExcel')">
            </div>
        </div>
        <el-table :data="tableData3" height="250" border style="width: 100%" id="tableExcel">
            <el-table-column prop="name" label="房产名称">
            </el-table-column>
            <el-table-column prop="date" label="客户名称">
            </el-table-column>
            <el-table-column prop="province" label="物业费面积">
            </el-table-column>
            <el-table-column prop="province" label="本月费用">
            </el-table-column>
            <el-table-column prop="province" label="拖欠款">
            </el-table-column>
            <el-table-column prop="province" label="滞纳金">
            </el-table-column>
            <el-table-column prop="province" label="合计">
            </el-table-column>
        </el-table>
        <div class="pager">
            <div class="block">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage2" :page-sizes="[30,60,90]" :page-size="100" layout="sizes, prev, pager, next" :total="100">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>

import Bread from '@/components/common/bread'
export default {
    data() {
        return {
            abc: ['数据应用', '财务数据', '出支收纳查询', "物业管理费收费"],
            currentPage2: 5,
            tableData3: [{
                date: '2016-05-03',
                name: '王小虎',
                province: '上海',
            }, {
                date: '2016-05-02',
                name: '王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎',
                province: '上海',
            }, {
                date: '2016-05-04',
                name: '王小虎',
                province: '上海',
            }, {
                date: '2016-05-01',
                name: '王小虎',
                province: '上海',
            }, {
                date: '2016-05-08',
                name: '王小虎',
                province: '上海',
            }, {
                date: '2016-05-06',
                name: '王小虎',
                province: '上海',
            }, {
                date: '2016-05-07',
                name: '王小虎',
                province: '上海',
            }, {
                date: '2016-05-07',
                name: '王小虎',
                province: '上海',
            }, {
                date: '2016-05-07',
                name: '王小虎',
                province: '上海',
            }, {
                date: '2016-05-07',
                name: '王小虎',
                province: '上海',
            }, {
                date: '2016-05-07',
                name: '王小虎',
                province: '上海',
            }, {
                date: '2016-05-07',
                name: '王小虎',
                province: '上海',
            }],
            input5: '',
            select: '',
        }
    },
    computed: {
    },
    created() {
    },
    components: {
        Bread
    },
    mounted() {
    },
    methods: {
        derivedForm(tableExcel) {
            this.$func.method5(tableExcel)
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        }
    }
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin';
.StopintheCharge {
    .device_nav {
        display: inline-block;
        height: 0.6rem;
        width: 100%;
        background: url(../../../../assets/kaimenNav.png)no-repeat;
        background-size: 100% 100%; //导航栏右边的日历搜索等框
        .img-time {
            display: inline-block;
            height: 0.6rem;
            width: auto;
            position: relative;
            margin-bottom: 0.1rem;
            float: right;
            .calendar {
                display: inline-block;
                select {
                    width: 1rem;
                    height: 0.36rem;
                    padding: 0 0 0 0.25rem;
                    background: transparent;
                    border: 1px solid #83dbff;
                    border-radius: 0.03rem;
                    outline: none;
                    option {
                        background: #060e1d;
                    }
                }
                .calendar_select {
                    margin-left: -0.05rem; // display:inline-block;
                    // margin-left:-0.03rem;
                }
            }
            .search {
                display: inline-block;
                width: 0.2rem;
                height: 0.2rem;
                background: url(../../../../assets/search.png)no-repeat;
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
                margin-left: 0.3rem;
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
                margin-right: 0.15rem;
                width: 0.21rem;
                height: 0.21rem;
                @include aa;
            }
        }
    }
    #tableExcel {
        min-height: 7rem;
    }
    .pager {
        float: right;
        margin-top: 0.2rem;
    }
}
</style>

