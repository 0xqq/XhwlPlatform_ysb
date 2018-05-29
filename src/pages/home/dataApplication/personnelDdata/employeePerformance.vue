<template>
    <div class="employeeEttendance">
        <Bread :breadData="abcd"></Bread>
        <div class="device-nav">
            <div class="img-time">
                <div class="date-device">
                    <div>
                        <el-input placeholder="请输入搜索内容" v-model="input5" class="place">
                            <el-select v-model="select" slot="prepend" placeholder="请选择" class="place">
                                <el-option label="工号" value="2"></el-option>
                                <el-option label="姓名" value="3"></el-option>
                            </el-select>
                            <el-button slot="append" icon="search"></el-button>
                        </el-input>
                    </div>
                </div>
                <input type="button" value="搜索" class="bttn">
                <a class="inout_a" href="javascript:void(0);"><img src="../../../../images/inout.png" @click="method55('tableExcel')"></a>

            </div>
        </div>
        <div class="table">
            <table id="tableExcel" cellspacing="0" cellpadding="0">
                <thead>
                    <tr class="nav_table">
                        <th class="left_none">
                            <select>
                                <option value="volvo">全部部门</option>
                                <option value="saab">财务部</option>
                                <option value="opel">安防部</option>
                                <option value="audi">工程部</option>
                                <option value="opel">客服部</option>
                                <option value="audi">环境部</option>
                                <option value="opel">人事部</option>
                            </select>
                        </th>
                        <th>工号</th>
                        <th>姓名</th>
                        <th>考勤评分</th>
                        <th>日常工作评分</th>
                        <th>专项工作评分</th>
                        <th>嘉奖分</th>
                        <th>总评分</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="center_table">
                        <td>人事部</td>
                        <td>10056</td>
                        <td>white</td>
                        <td>80</td>
                        <td>80</td>
                        <td>85</td>
                        <td>86</td>
                        <td>90</td>
                    </tr>
                </tbody>

            </table>
        </div>
        <!--底部每页显示-->
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
            abcd: ['数据应用', '人事数据', '考情数据查询', "员工绩效评分"],
            input5: '',
            select: '',
            currentPage2: 5,
        }
    },
    components: {
        Bread
    },
    methods: {
        method55(tableExcel) {
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
.employeeEttendance {
    .device-nav {
        height: 0.6rem;
        width: 100%;
        background: url(../../../../assets/kaimenNav.png)no-repeat;
        background-size: 100% 100%;
        padding-bottom: 0.5rem;
        margin-bottom: 0.08rem;
        .img-time {
            display: inline-block;
            height: 0.6rem;
            width: auto;
            position: relative;
            margin-bottom: 0.1rem;
            float: right;
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
            .inout_a {

                margin-right: 0.15rem;
                img {
                    width: 0.21rem;
                    height: 0.21rem;
                }
            }
        }
    }
    .table {
        width: 100%;
        height: 7rem;
        background-image: url(../../../../images/kaimen.png);
        background-size: 100% 100%;
        overflow-y: scroll;
        overflow: auto; // 三角箭头的颜色
        scrollbar-base-color: #12253d; // 滚动条滑块按钮的颜色
        scrollbar-face-color: #184e7a; // 滚动条整体颜色
        scrollbar-track-color: #12253d;
        scrollbar-arrow-color: #12253d;
        table {
            width: 100%;
            .nav_table {
                height: 0.4rem;
                background-image: url(../../../../images/kaimenNav.png);
                background-size: 100% 100%;
                display: flex;
                justify-content: space-around;
                th {
                    display: inline-block;
                    text-align: center;
                    flex: 1;
                    height: 0.4rem;
                    line-height: 0.4rem;
                    border-left: 2px solid #698499;
                }
                th:last-child{
                    border-right:2px solid #698499;
                }
                .left_none {
                    select {
                        padding: 0 0.3rem;
                        color: #83dbff;
                        outline: none;
                        @include aa;
                        option {
                            background: #000;
                        }
                    }
                }
            }
            .center_table {
                display: flex;
                height: 0.6rem;
                width: 100%;
                align-items: center;
                text-align: center;
                border-bottom: 2px solid #698499;
                td {
                    flex: 1;
                    display: inline-block;
                }
            }
        }
    } //底部换页框
    .page {
        line-height: 0.6rem;
        width: auto;
        height: 0.6rem;
        background-image: url(../../../../images/kaimen.png);
        background-size: 100% 100%;
        float: right;
        margin-top: 0.2rem;
        margin-right: 0.25rem;
        padding-right: 0.1rem;
    }

    .page>span {
        color: #70ccfc;
        margin-left: 0.2rem;
    }

    .select {
        padding-left: 0.15rem;
        width: 0.61rem;
        height: 0.35rem;
        background: darkgray;
        background-image: url(../../../../images/kaimen.png);
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
            width: 0.1rem;
            height: 0.22rem;
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
        // padding-right: 14px;
    }

    select::-ms-expand {
        display: none;
    }
    .pager {
        float: right;
        margin-top: 0.2rem;
    }
}
</style>

