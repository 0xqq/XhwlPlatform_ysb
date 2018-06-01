<template>
<div class="device">
  <!--业务配置/设备监控阀值配置组件-->
  <Bread :breadData="abc"></Bread>
  <div class="device-nav">
    <div class="img-time">
      <div class="into-time">
        <el-select v-model="value" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="date-time">
        <div class="block">
          <el-date-picker v-model="value3" type="datetimerange" placeholder="选择时间范围" class="el_picker">
          </el-date-picker>
        </div>
      </div>
      <input type="text" class="device_case" value="" placeholder="请输入搜索内容">
      <span class="search"></span>
      <input type="button" value="搜索" class="bttn">
      <a class="inout_a" href="javascript:void(0);" @click="method55('tableExcel')"><img src="../../../images/inout.png" alt=""></a>
    </div>
  </div>
  <div class="table">
    <table id="tableExcel" cellspacing="0" cellpadding="0">
      <thead class="table_thead">
        <tr class="nav_table">
          <th class="left_none"> 序号</th>
          <th> 车牌号</th>
          <th class="vehicle">
            <select>
								<option value="volvo">全部车辆</option>
								<option value="saab">特殊车辆</option>
								<option value="opel">政府车辆</option>
								<option value="audi">工作车辆</option>
								<option value="audi">事务性车辆</option>
								<option value="audi">特权车辆</option>
								<option value="audi">月卡车辆</option>
							</select>
          </th>
          <th> 入场时间</th>
          <th> 入场地点</th>
          <th> 出场时间</th>
          <th> 出场地点</th>
          <th> 停车时间</th>
          <th> 应收金额(元)</th>
          <th> 实收金额(元)</th>
          <th> 备注</th>
        </tr>
      </thead>
      <tbody class="table_body">
        <tr v-for="(d, index1) in val" :key="index1" class="center_table">
          <td>{{d.序号}}</td>
          <td>{{d.车牌号}}</td>
          <td>{{d.全部车辆}}</td>
          <td>{{d.入场时间}}</td>
          <td>{{d.入场地点}}</td>
          <td>{{d.出场时间}}</td>
          <td>{{d.出场地点}}</td>
          <td>{{d.停车时间}}</td>
          <td>{{d["应收金额（元）"]}}</td>
          <td>{{d["实收金额（元）"]}}</td>
          <td>备注</td>
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
import carRecord from '@/httpData/vehiCleaccess'
import { format, gapTime } from '@/script/timeFormat.js'
import {
  mapState
} from 'vuex'
export default {
  data() {
    return {
      abc: ['物联监控', '出入物联监控', '车行指挥调度', '车辆出入记录'],
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
      value4: '',
      options: [{
        value: '选项1',
        label: '入场时间'
      }, {
        value: '选项2',
        label: '出场时间'
      }],
      value: '',
      // value3: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value3: '',
      val: [],
      sum1: [],
      sum2: [],
      sum3: [],
      sum4: [],
      sum5: [],
      sum6: [],
      all: [],
      alL: [],
      all2: []
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
  },
  methods: {
    method55(tableExcel) {
      this.$func.method5(tableExcel)
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
    getData() {
      var content = carRecord.content
      content.forEach((item, index) => {
        var time1 = new Date().getTime() - (Math.random() + index + 2) * 86400000 // 入场时间
        var time2 = (Math.random() * 1 + 0) * 86400000  // 停车时间为0-2天
        var time3 = time1 + time2 // 出场时间
        item.入场时间 = format(time1, 'yyyy-MM-dd HH:mm:ss')
        item.出场时间 = format(time3, 'yyyy-MM-dd HH:mm:ss')
        item.停车时间 = gapTime(time2)
      })
      this.val = content
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
.left_1 {
	flex: 2!important;
}
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
		.img-time {
			display: inline-block;
			height: 0.6rem;
			width: auto;
			position: relative;
			margin-bottom: 0.1rem;
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
				background: url(../../../assets/search.png)no-repeat;
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
			height: 7rem;
			border: 0;
			overflow-y: scroll;
			.table_thead {
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
					justify-content: center;
					th:last-child{
						border-right:2px solid #698499;
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
					}
					.vehicle {
						select {
							width: auto;
							height: 100%;
							padding: 0 0.2rem;
							color: #83dbff;
							outline: none;
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
				height: 6.5rem;
				overflow: hidden;
				overflow-y: scroll;
				.center_table {
					display: flex;
					align-items: center;
					justify-content: center;
					border-bottom: 2px solid #698499;
					td {
						flex: 1.8;
						padding: 0.2rem 0;
						text-align: center;
						display: inline-block;
						display: flex;
						justify-content: center;
					}
				}
			}
		}
	}
}



//表格主体内容


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

#tableExcel {
	min-height: 7rem;
}

.pager {
	float: right;
	margin-top: 0.2rem;
}
</style>
