<template>
    <div class="StopintheCharge">
        <Bread :breadData="abc"></Bread>
        <div class="device_nav">
            <div class="img-time">
                <div class="date-time">
                    <div class="block">
                        <span class="demonstration"></span>
                        <el-date-picker v-model="value6" type="daterange" placeholder="输入日期范围" class="el_picker">
                        </el-date-picker>
                    </div>
                </div>
                <div class="date-device">
                    <div>
                        <el-input placeholder="请输入搜索内容" v-model="input5" class="place">
                            <el-select v-model="select" slot="prepend" placeholder="车位号" class="place">
                                <el-option label="月卡卡号" value="1"></el-option>
                                <el-option label="车主姓名" value="2"></el-option>
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
            <el-table-column prop="name" label="月卡卡号">
            </el-table-column>
            <el-table-column prop="date" label="车位号">
            </el-table-column>
            <el-table-column prop="province" label="车主姓名">
            </el-table-column>
            <el-table-column prop="name" label="月卡余额">
            </el-table-column>
            <el-table-column prop="date" label="缴费金额">
            </el-table-column>
            <el-table-column prop="province" label="缴费时间">
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
            abc: ['数据应用', '财务数据', '财务稽查查询', "停车场月卡收费"],
            currentPage2: 5,
            massageData: ['欠费业主姓名', '到期时间', '欠费金额'],
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
            value6: ''
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
            // console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
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
            .date-time {
                display: inline-block;
                width: 2.58rem;
                height: 0.4rem;
                color: #67bce9;
                outline: none;
                margin-right: 0.2rem;
                vertical-align: middle; // margin-top:0.05rem;
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

