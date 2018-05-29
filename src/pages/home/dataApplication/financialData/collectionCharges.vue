<template>
    <div class="StopintheCharge">
        <Bread :breadData="abc"></Bread>
        <div class="device_nav">
            <div class="img-time">
                <div class="date-device">
                    <div>
                        <el-input placeholder="请输入搜索内容" v-model="input5" class="place">
                            <el-select v-model="select" slot="prepend" placeholder="交款人" class="place">
                                <el-option label="交款人" value="1"></el-option>
                                <el-option label="收款人" value="2"></el-option>
                            </el-select>
                            <el-button slot="append" icon="search"></el-button>
                        </el-input>
                    </div>
                </div>
                <input type="button" value="搜索" class="bttn">
                <img src="../../../../images/inout.png" alt="" @click="derivedForm('tableExcel')">
            </div>
        </div>
        <div class="table" id='table-cont'>
            <table id="tableExcel" cellspacing="0" cellpadding="0">
                <thead class="table_thead">
                    <tr class="nav_table">
                        <th class="left_none">
                            <select>
                                <option value="volvo">全部款项</option>
                                <option value="saab">维修费</option>
                                <option value="opel">水电费</option>
                                <option value="audi">其他增值服务费</option>
                            </select>
                        </th>
                        <th> 时间</th>
                        <th> 交款人</th>
                        <th> 收款人</th>
                        <th> 应收金额</th>
                        <th> 实收金额</th>
                        <th> 经办人</th>
                    </tr>
                </thead>
                <tbody class="table_body">
                    <tr v-for="(k,index) in conTents" :key="index" class="center_table">
                        <td>{{k.plate}}</td>
                        <td>{{k.amount}}</td>
                        <td>{{k.Paidin}}</td>
                        <td>{{k.treatment}}</td>
                        <td>{{k.amount}}</td>
                        <td>{{k.Paidin}}</td>
                        <td>{{k.Paidin}}</td>
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
            abc: ['数据应用', '财务数据', '出支收纳查询', "代收费收费"],
            conTents: [
                {
                    "plate": "6567",
                    "amount": "粤-BN8888",
                    "Paidin": "2000",
                    "treatment": "2017-08-09 12:23:22",
                },
                {
                    "plate": "粤-BN8888",
                    "amount": "9",
                    "Paidin": "9",
                    "treatment": "三免",
                }, {
                    "plate": "粤-BN8888",
                    "amount": "9",
                    "Paidin": "9",
                    "treatment": "三免",
                }, {
                    "plate": "粤-BN8888",
                    "amount": "9",
                    "Paidin": "9",
                    "treatment": "三免",
                },
                {
                    "plate": "粤-BN8888",
                    "amount": "9",
                    "Paidin": "9",
                    "treatment": "三免",
                },
                {
                    "plate": "粤-BN8888",
                    "amount": "9",
                    "Paidin": "9",
                    "treatment": "三免",
                },
                {
                    "plate": "粤-BN8888",
                    "amount": "9",
                    "Paidin": "9",
                    "treatment": "三免",
                },
                {
                    "plate": "粤-BN8888",
                    "amount": "9",
                    "Paidin": "9",
                    "treatment": "三免",
                },
                {
                    "plate": "粤-BN8888",
                    "amount": "9",
                    "Paidin": "9",
                    "treatment": "三免",
                },
                {
                    "plate": "粤-BN8888",
                    "amount": "9",
                    "Paidin": "9",
                    "treatment": "三免",
                },
                {
                    "plate": "粤-BN8888",
                    "amount": "9",
                    "Paidin": "9",
                    "treatment": "三免",
                },
                {
                    "plate": "粤-BN8888",
                    "amount": "9",
                    "Paidin": "9",
                    "treatment": "三免",

                }
            ],
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
                vertical-align: middle;
                display: inline-block;
                height: 0.4rem;
                width: 4.65rem;
                background: transparent;
                color: #67bce9;
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
    .table {
        width: 100%;
        height: 7rem;
        background-image: url(../../../../images/kaimen.png);
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
                    background-image: url(../../../../images/kaimenNav.png);
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
                            margin-left: 0.4rem;
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
                        flex: 1;
                        height: 0.4rem;
                        padding: 0.2rem 0;
                        line-height: 0.4rem;
                        text-align: center;
                        display: inline-block;
                    }
                }
            }
        }
    } //底部换页框
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

