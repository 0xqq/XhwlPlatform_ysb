<template>
<div class="device">
  <!--业务配置/设备监控阀值配置组件-->
  <Bread :breadData="abc"></Bread>
  <div class="device-nav">
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
            <el-select v-model="select" slot="prepend" placeholder="请选择" class="place">
              <!--<el-option label="餐厅名" value="1"></el-option>-->
              <!--<el-option label="订单号" value="2"></el-option>-->
              <!--<el-option label="用户电话" value="3"></el-option>-->
            </el-select>
            <el-button slot="append" icon="search"></el-button>
          </el-input>
        </div>
      </div>
      <input type="button" value="搜索" class="bttn">
      <img src="../../../images/inout.png" alt="" @click="derivedForm('tableExcel')">
    </div>
  </div>
  <!--顶部导航-->
  <el-table :data="tableData3" height="250" border style="width: 100%" id="tableExcel">
    <el-table-column prop="序号" label="序号">
    </el-table-column>
    <el-table-column prop="项目" label="项目">
    </el-table-column>
    <el-table-column prop="人员" label="人员">
    </el-table-column>
    <el-table-column prop="日期" label="日期">
    </el-table-column>
    <el-table-column prop="进度" label="进度">
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
import maintenanceObj from '@/httpData/mainTenancecare'
import { format, gapTime } from '@/script/timeFormat.js'
import {
  mapState
} from 'vuex'
export default {
  data() {
    return {
      abc: ['管理应用', '工程管理', '保养管理'],
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
      tableData3: [],
      currentPage2: 1
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
      console.log(keep);
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
      this.tableData3 = maintenanceObj.content
      this.tableData3.forEach((item, index) => {
        var time1 = new Date().getTime() - (Math.random() + index + 1) * 86400000 // 日期时间
        item.日期 = format(time1, 'yyyy-MM-dd') //日期随机+时间取定值
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
	height: 8.96rem; // display: inline-block;
	margin: 0 auto;
	position: relative;
	.device-nav {
		height: 0.6rem;
		width: 100%;
		background: url(../../../assets/kaimenNav.png)no-repeat;
		background-size: 100% 100%;
		padding-bottom: 0.5rem;
		margin-bottom: 0.08rem;
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
