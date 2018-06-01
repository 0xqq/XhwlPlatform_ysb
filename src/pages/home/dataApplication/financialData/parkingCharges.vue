<template>
    <div class="StopintheCharge">
        <Bread :breadData="abc"></Bread>
        <div class="device_nav">
            <div class="img-time">
                <div class="into-time">
                    <el-select v-model="value" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="date-time">
                    <div class="block">
                        <el-date-picker v-model="value3" type="datetimerange" placeholder="请输入日期时间范围" class="el_picker">
                        </el-date-picker>
                    </div>
                </div>
                <input type="text" class="device_case" value="" placeholder="请输入搜索内容">
                <span class="search"></span>
                <input type="button" value="搜索" class="bttn">
                <img src="../../../../images/inout.png" alt="" @click="derivedForm('tableExcel')">
            </div>
        </div>
        <el-table :data="tableData3" height="250" border style="width: 100%" id="tableExcel">
            <el-table-column prop="name" label="临停车牌">
            </el-table-column>
            <el-table-column prop="date" label="应收金额（元）">
            </el-table-column>
            <el-table-column prop="province" label="实收金额（元）">
            </el-table-column>
            <el-table-column prop="province" label="优惠明细">
            </el-table-column>
            <el-table-column prop="province" label="入场时间">
            </el-table-column>
            <el-table-column prop="province" label="出场时间">
            </el-table-column>
            <el-table-column prop="province" label="停车时间">
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
            abc: ['数据应用', '财务数据', '出支收纳查询', "停车场临停收费"],
            currentPage2: 5,
            tableData3: [{
                date: '2016-05-03',
                name: '王小虎',
                province: '上海',
            }, {
                date: '2016-05-02',
                name: '王小虎',
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
            options: [{
                value: '选项1',
                label: '入场时间'
            }, {
                value: '选项2',
                label: '出场时间'
            }],
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
            value: '',
            value3: '',

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
        height: 0.6rem;
        width: 100%;
        background: url(../../../../assets/kaimenNav.png)no-repeat;
        background-size: 100% 100%;
        padding-bottom: 0.5rem; // margin-bottom: 0.08rem;
        .img-time {
            display: inline-block;
            height: 0.6rem;
            width: auto;
            position: relative;
            margin-bottom: 0.05rem;
            float: right; // 入场时间
            .into-time {
                display: inline-block;
                width: 1.32rem;
                height: 0.36rem;
                color: #fff;
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
                margin-left: -0.15rem;
                margin-right: 0.5rem;
                .el_picker {
                    width: 3.50rem;
                    height: 0.36rem;
                    font-size: 0.14rem;
                }
            } // 搜索内容框
            .device_case {
                display: inline-block;
                width: 3.65rem;
                height: 0.36rem;
                border: 0.01rem solid #83dbff; // margin-top:0.1rem;
                background: transparent;
                color: #fff;
                margin-right: 0.15rem;
                margin-top: 0.05rem;
                border-radius: 0.04rem;
                padding-left: 0.05rem;
            }
            input::-ms-clear {
                display: none;
            }
            .search {
                display: inline-block;
                width: 0.15rem;
                height: 0.15rem;
                background: url(../../../../assets/search.png)no-repeat;
                background-size: 100% 100%;
                margin-left: -0.4rem;
                @include aa;
            } // 搜索按钮
            .bttn {
                margin-left: 0.1rem;
                margin-top: 0.14rem;
                margin-right: 0.15rem;
                @include btn(0.91rem, 0.35rem)
            }
            img {
                width: 0.21rem;
                height: 0.21rem;
                margin-right: 0.15rem;
                @include aa;
            }
        }
    }
    .all_table {
        width: 100%;
        height: 100%;
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
