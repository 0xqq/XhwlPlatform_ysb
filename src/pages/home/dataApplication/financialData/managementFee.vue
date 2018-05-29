<template>
    <div class="StopintheCharge">
        <Bread :breadData="abc"></Bread>
        <div class="device_nav">
            <div class="img-time">
                <input type="text" class="device_case" value="" placeholder="请输入搜索内容">
                <span class="search"></span>
                <input type="button" value="搜索" class="bttn">
                <img src="../../../../images/inout.png" alt="" @click="derivedForm('tableExcel')">
            </div>
        </div>
        <el-table :data="tableData3" height="250" border style="width: 100%" id="tableExcel">
            <el-table-column prop="name" label="欠费业主姓名">
            </el-table-column>
            <el-table-column prop="date" label="到期时间">
            </el-table-column>
            <el-table-column prop="province" label="欠费金额">
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
            abc: ['数据应用', '财务数据', '出支收纳查询', "物业管理费欠费"],
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
    },
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
        padding-bottom: 0.5rem;
        .img-time {
            display: inline-block;
            height: 0.6rem;
            width: auto;
            position: relative;
            margin-bottom: 0.05rem;
            float: right; // 入场时间   
            // 搜索内容框
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
                margin-right: 0.15rem; // margin-bottom: 1.5rem;
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
    #tableExcel {
        min-height: 7rem;
    }
    .pager {
        float: right;
        margin-top: 0.2rem;
    }
}
</style>

