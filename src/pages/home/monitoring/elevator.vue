<template>
<div class="device">
  <!--业务配置/设备监控阀值配置组件-->
  <Bread :breadData="abc"></Bread>
  <div class="content_left">
    <div class="device-nav">
      <div class="img-time">
        <div class="date-time">
          <div class="block">
            <span class="demonstration"></span>
            <el-date-picker v-model="value6" type="daterange" placeholder="请输入时间" class="el_picker">
            </el-date-picker>
          </div>
        </div>
        <div class="date-device">
          <div>
            <el-input placeholder="请输入搜索内容" v-model="input5" class="place">
              <el-select v-model="select" slot="prepend" placeholder="请选择" class="place">
                <el-option label="进场时间" value="1"></el-option>
                <el-option label="出场时间" value="2"></el-option>
                <!--<el-option label="误报" value="3"></el-option>-->
              </el-select>
              <el-button slot="append" icon="search"></el-button>
            </el-input>
          </div>
        </div>
        <input type="button" value="搜索" class="bttn">
        <img src="../../../images/inout.png" alt="" @click="derivedForm('tableExcel')">
      </div>
    </div>
    <el-table :data="tableData3" height="300" border style="width: 100%" id="tableExcel">
      <el-table-column prop="故障编号" label="故障编号">
      </el-table-column>
      <el-table-column prop="发生时间" label="发生时间">
      </el-table-column>
      <el-table-column prop="处理状态" label="处理状态">
      </el-table-column>
      <el-table-column prop="故障类型" label="故障类型">
      </el-table-column>
      <el-table-column prop="合同梯号" label="合同梯号">
      </el-table-column>
      <el-table-column prop="客户梯号" label="客户梯号">
      </el-table-column>
      <el-table-column prop="型号" label="型号">
      </el-table-column>
      <el-table-column prop="项目名称" label="项目名称">
      </el-table-column>
    </el-table>
    <div class="pager">
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage2" :page-sizes="[30,60,90]" :page-size="100" layout="sizes, prev, pager, next" :total="100">
        </el-pagination>
      </div>
    </div>
    <el-table :data="tableData4" height="300" border style="width: 100%" id="tableExcel">
      <el-table-column prop="故障编号" label="故障编号">
      </el-table-column>
      <el-table-column prop="发生时间" label="发生时间">
      </el-table-column>
      <el-table-column prop="处理状态" label="处理状态">
      </el-table-column>
      <el-table-column prop="故障类型" label="故障类型">
      </el-table-column>
      <el-table-column prop="合同梯号" label="合同梯号">
      </el-table-column>
      <el-table-column prop="客户梯号" label="客户梯号">
      </el-table-column>
      <el-table-column prop="型号" label="型号">
      </el-table-column>
      <el-table-column prop="详细信息" label="详细信息">
      </el-table-column>
    </el-table>
    <div class="pager">
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage3" :page-sizes="[30,60,90]" :page-size="100" layout="sizes, prev, pager, next" :total="100">
        </el-pagination>
      </div>
    </div>
  </div>
</div>
</div>
</template>

<script>
import Bread from '@/components/common/bread'
import elevatorObj from '@/httpData/elevator'
import { format } from '@/script/timeFormat.js'
import {
  mapState
} from 'vuex'
export default {
  data() {
    return {
      abc: ['物联监控', '设备物联监控', '电梯系统'],
      input5: '',
      select: null,
      currentPage2: 5,
      currentPage3: 5,
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
            0
            rtgwe
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
      tableData3: [],
      tableData4: [],
      vaLue2: [],
      options: [{
        value: '选项1',
        label: '进场时间'
      }, {
        value: '选项2',
        label: '出场时间'
      }],
      value: ''
    }
  },
  computed: {
    ...mapState(['mnUrl'])
  },
  components: {
    Bread
  },
  mounted() {
    this.getData();
    this.getMsg();
  },
  methods: {
    getData() {
      this.tableData3 = elevatorObj.alarm
      this.tableData3.forEach((item, index) => {
        var time1 = new Date().getTime() - (Math.random() + index + 1) * 86400000 // 发生时间
        item.发生时间 = format(time1, 'yyyy-MM-dd') + ' ' + item.发生时间.substr(-8) //日期随机+时间取定值
      })
    },
    getMsg() {
      this.tableData4 = elevatorObj.error;
      this.tableData4.forEach((item, index) => {
        var time1 = new Date().getTime() - (Math.random() + index + 1) * 86400000 // 发生时间
        item.发生时间 = format(time1, 'yyyy-MM-dd') + ' ' + item.发生时间.substr(-8) //日期随机+时间取定值
      })
    },
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
// 整个大框
.device {
    vertical-align: top;
    width: 100%;
    height: 100%; // display: inline-block;
    margin: 0 auto;
    position: relative;
    .pager {
        float: right;
        margin: 0.2rem 0;
    }
}

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
            padding-right: 0.1rem;
            float: right;
            .date-time {
                display: inline-block;
                width: 2.58rem;
                height: 0.4rem;
                color: #67bce9;
                outline: none;
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
}
</style>
