<template>
    <div class="device">
        <!--业务配置/设备监控阀值配置组件-->
        <Bread :breadData="abc"></Bread>
        <div class="device-nav">
            <button class="btn" @click="modifu('')">
                <span>+</span>
                新建信息发布</button>
            <div class="img-time">
                <div class="info">
                    <el-select v-model="value1" placeholder="发布时间">
                        <el-option v-for="item in options1" :key="item.value1" :label="item.label" :value="item.value1">
                        </el-option>
                    </el-select>
                </div>
                <div class="date_time">
                    <div class="block">
                        <span class="demonstration"></span>
                        <el-date-picker v-model="value6" type="daterange" placeholder="选择日期范围" class="el_picker">
                        </el-date-picker>
                    </div>
                </div>
                <div class="date-device">
                    <div>
                        <el-input placeholder="请输入搜索内容" v-model="input5" class="">
                            <el-select v-model="select" slot="prepend" placeholder="请选择" class="place">
                                <el-option label="发布人" value="1"></el-option>
                                <el-option label="审核人" value="2"></el-option>
                            </el-select>
                            <el-button slot="append" icon="search"></el-button>
                        </el-input>
                    </div>
                </div>
                <input type="button" value="搜索" class="bttn">
                <img src="../../../images/inout.png" alt="" @click="derivedForm('tableExcel')">
            </div>
        </div>
        <el-table :data="tableData3" height="250" border style="width: 100%" id="tableExcel">
            <el-table-column prop="发布时间" label="发布时间">
            </el-table-column>
            <el-table-column prop="发布人" label="发布人">
            </el-table-column>
            <el-table-column prop="全部类型" label="全部类型">
            </el-table-column>
            <el-table-column prop="发布内容简述" label="发布内容简述">
            </el-table-column>
            <el-table-column prop="审核人" label="审核人">
            </el-table-column>
            <el-table-column prop="审核时间" label="审核时间">
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
import { mapState, mapMutations } from 'vuex'
export default {
    data() {
        return {
            abc: ['物联监控', '信息发布中心', '信息发布'],
            tableData3: [],
            currentPage2: 5,
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
            options1: [
                {
                    value1: 'zhinan1',
                    label: '发布时间'
                },
                {
                    value1: 'zhinan2',
                    label: '审核时间'
                }
            ],
            value1: '',
            value6: '',
        }
    },
    computed: {
        ...mapState([
            'token', 'mnUrl'
        ])
    },
    components: {
        Bread
    },
    mounted() {
    },
    created() {
        this.getDate();
    },
    methods: {
        modifu(d) {
            this.modifyvue = d;
            this.$router.push({
                path: '/monit/msg/release/new',
                query: {
                    value: this.modifyvue
                }
            });
        },
        removeTode(keep) {
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
        getDate() {
            const url = this.mnUrl + "/tmp/watching/park/deploy_msg"
            this.$http.get(url).then(res => {
                this.tableData3 = res.body.content;
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
@import 'src/style/mixin'; // element_ui样式
.select1 {
    width: 1.1rem;
} // 整个大框
.device {
    vertical-align: top;
    width: 100%;
    height: 8.96rem; 
    margin: 0 auto;
    position: relative;
    .device-nav {
        height: 0.6rem;
        width: 100%;
        background: url(../../../assets/kaimenNav.png)no-repeat;
        background-size: 100% 100%;
        padding-bottom: 0.5rem;
        margin-bottom: 0.08rem;
        .btn {
            line-height: 0.3rem;
            margin: 0.13rem 0 0 0.15rem;
            @include btn(1.41rem, 0.36rem);
            span {
                display: inline-block;
                font-size: 0.24rem;
                color: #fff;
            }
        } //导航栏右边的日历搜索等框
        .img-time {
            display: inline-block;
            height: 0.6rem;
            width: auto;
            position: relative;
            margin-bottom: 0.1rem;
            float: right;
            .info {
                width: 1.3rem;
                height: 0.4rem;
                display: inline-block;
                vertical-align: middle;
            }
            .date_time {
                display: inline-block;
                width: 2.58rem;
                height: 0.4rem;
                color: #67bce9;
                outline: none;
                margin-right: 2rem;
                margin-left: -0.05rem;
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
                font-size: 0.14rem;
                .place {
                    font-size: 0.14rem;
                }
            } // 搜索按钮
            .bttn {
                margin: 0.16rem 0.15rem 0 0;
                @include btn(0.8rem, 0.3rem)
            }
            img {
                width: 0.21rem;
                height: 0.21rem;
                margin-right: 0.15rem;
                @include aa;
            }
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
</style>