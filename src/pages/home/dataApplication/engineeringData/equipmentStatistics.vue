<template>
	<div>
		<Bread :breadData="abcd"></Bread>
		<div class="top_div">
			<span class="title">公区设备设施统计</span>
			<div class="top_right">
				<div class="boutton_div">
					<span class="chart_model" :class="{active: model=='chart', unactive: model == 'table'}" @click="choiseModel(0)">图表模式</span>
					<!--
								 -->
					<span class="table_model" :class="{active: model=='table', unactive: model == 'chart'}" @click="choiseModel(1)">表格模式</span>
				</div>
				<div class="date-time">
					<div class="block">
						<span class="demonstration"></span>
						<all-picker class="el_picker" @timeValue=""></all-picker>
					</div>
				</div>
				<a class="inout_a" :class="{Hide: showSelf==0}" href="javascript:void(0);" @click="method55('tableExcel')"></a>
			</div>
		</div>
		<div class="Chart_div">
			<echarts-two1 :class="{hide: showSelf==1,chart2: showSelf=='0'}" :Text='noeText' :Xvalue="Xvalue" :Legend="noeLegend" :Series="Series1" :Unit="unit1" :PropsWith="width">
			</echarts-two1>
			<div class="hide" :class="{table_big: showSelf=='1'}">
				<el-table :data="tableData3"   border  id="tableExcel">
					<el-table-column prop="时间" label="时间">
					</el-table-column>
					<el-table-column prop="休闲服务设施数" label="休闲服务设施数">
					</el-table-column>
					<el-table-column prop="公益性文体设施数" label="公益性文体设施数">
					</el-table-column>
					<el-table-column prop="水景及娱乐设施数" label="水景及娱乐设施数">
					</el-table-column>
				</el-table>
				<div class="pager">
					<div class="block">
						<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage2" :page-sizes="[30,60,90]" :page-size="100" layout="sizes, prev, pager, next" :total="100">
						</el-pagination>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import echarts from 'echarts'
import Bread from '@/components/common/bread'
import echartsTwo1 from '@/components/common/echarts1/2echarts_eight'
export default {
	data() {
		return {
			abcd: ['数据应用', '工程应用', '工程运营数据分析', "公区设备设施统计"],
			showSelf: 0,
			width: '99.8%',
			currentPage2: 5,
			value6: '',
			model: 'chart',
			Xvalue: ['深圳', '北京', '上海', '广州', '佛山', '长春', '天津', '长沙', '南京', '杭州', '厦门', '南宁', '武汉', '郑州', '深圳', '北京', '上海', '广州', '佛山', '长春'],
			//图表1数据---------------------------------------------------------------------------------------------------------
			noeText: "员工出勤率数据分析",
			noeLegend: ['水景及娱乐设施', '公益性文体设施', '休闲服务设施'],
			unit1: "万元",
			Series1: [{
				name: '水景及娱乐设施',
				type: 'bar',
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(7,188,255,0.9)' },
						{ offset: 0.8, color: 'rgba(7,188,255,0.3)' }])
					}
				},
				data: [122, 123, 127, 125, 125, 125, 127, 120, 216, 124, 122, 212, 124, 123, 122, 123, 127, 125, 125, 135]
			},
			{
				name: '公益性文体设施',
				type: 'bar',
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(37,241,223,0.9)' },
						{ offset: 0.8, color: 'rgba(37,241,223,0.3)' }])
					}
				},
				data: [122, 23, 127, 125, 15, 15, 127, 20, 216, 124, 22, 212, 124, 123, 122, 13, 127, 125, 15, 15]
			},
			{
				name: '休闲服务设施',
				type: 'bar',
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(0,120,255,0.9)' },
						{ offset: 0.8, color: 'rgba(0,120,255,0.3)' }])
					}
				},
				data: [122, 123, 127, 15, 125, 125, 127, 120, 216, 124, 22, 212, 124, 123, 122, 123, 127, 125, 125, 135]
			}],
			conTents: [
				{
					"time": "2017年3月份",
					"arder": 79,
					"commonwea": 56,
					"waterscape": 10,

				},
				{
					"time": "2017年4月份",
					"arder": 79,
					"commonwea": 56,
					"waterscape": 10,

				},
				{
					"time": "2017年5月份",
					"arder": 79,
					"commonwea": 56,
					"waterscape": 10,

				},
				{
					"time": "2017年6月份",
					"arder": 79,
					"commonwea": 56,
					"waterscape": 10,

				},

			],
		}
	},
	computed: {
		...mapState(['contentSize', 'mnUrl']),
	},
	components: {
		Bread,
		echartsTwo1,
	},
	mounted() {
		//初始化时获取数据
		this.getData();
	},
	created() {

	},
	methods: {
		method55(tableExcel) {
			this.$func.method5(tableExcel)
		},
		choiseModel(num) {
			if (num == 0) {
				this.showSelf = 0;
				this.model = 'chart';
				this.$store.commit('CHANGE_SIZE');
			} else if (num == 1) {
				this.showSelf = 1;
				this.model = 'table';
			}
		},
		getData() {
		},
		handleSizeChange(val) {
			// console.log(`每页 ${val} 条`);
		},
		handleCurrentChange(val) {
			// console.log(`当前页: ${val}`);
		},
	}
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';



/*可视区外框样式*/

.Chart_div {
	width: 100%;
	height: 7.55rem;
	overflow-y: auto;
	margin: 0 auto;
	scrollbar-base-color: #12253d; // 滚动条滑块按钮的颜色
	scrollbar-face-color: #184e7a; // 滚动条整体颜色
	scrollbar-track-color: #12253d;
	scrollbar-arrow-color: #12253d;
}




/*图表外框*/

.chart2 {
	color: white;
	width: 99.5%;
	height: 5.23rem;
	margin: 0 auto;
	margin-bottom: 0.05rem;
}




/*顶部长条外框*/

.top_div {
	width: 100%;
	height: 0.6rem;
	line-height: 0.6rem;
	margin: 0 auto;
	margin-bottom: 0.1rem;
	background-image: url(../../../../images/table_top.png);
	background-size: cover;
	background-position: center;
	.title {
		display: inline-block;
		width: 1.6rem;
		height: 0.51rem;
		color: #FFFFFF;
		line-height: 0.6rem;
		text-align: center;
	}
	.top_right {
		float: right;
		width: 4.8rem;
		height: 0.6rem;
		;
		.date-time {
			display: inline-block;
			width: 2.58rem;
			height: 0.6rem;
			color: #67bce9;
			outline: none;
			vertical-align: top; // margin-top:0.05rem;
			.el_picker {
				display: inline-block;
				width: 2.58rem;
				height: 0.33rem;
				font-size: 0.14rem;
			}
		}
		/*顶部按钮样式*/
		.boutton_div {
			line-height: 0.33rem;
			margin-top: 0.125rem;
			display: inline-block;
			.active {
				@include actBt(0.85rem, 0.33rem);
			}
			.unactive {
				@include unactBt(0.85rem, 0.33rem);
			}
		}
		.inout_a {
			display: inline-block;
			width: 0.21rem;
			height: 0.21rem;
			margin-left: 0.05rem;
			background-image: url(../../../../images/inout.png);
			background-size: 100% 100%;
			position: relative;
			top: 0.05rem;
		}
	}
}

.hide {
	display: none;
}




/*表格内容样式*/

.table_big {
	display: block;
	width: 100%;
	height: 7rem;
}

.Hide {
	display: none !important;
}

/*换页部分*/

#tableExcel {
	min-height: 7rem;
}

.pager {
	float: right;
	margin-top: 0.2rem;
}
</style>
