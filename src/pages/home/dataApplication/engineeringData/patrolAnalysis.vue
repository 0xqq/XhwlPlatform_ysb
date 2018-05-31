<template>
	<div>
		<Bread :breadData="abcd"></Bread>
		<div class="top_div">
			<span class="title">巡查工作分析</span>
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
			<echarts-two1 :class="{hide: showSelf==1,chart2: showSelf=='0'}" :Text='noeText' :Xvalue="Xvalue" :Legend="noeLegend" :Series="Series1" :Unit="unit1">
			</echarts-two1>
			<echarts-two2 :class="{hide: showSelf==1,chart2: showSelf=='0'}" :Text='twoText' :Xvalue="Xvalue" :Legend="twoLegend" :Series="Series2" :Unit="unit2">
			</echarts-two2>
			<div class="hide" :class="{table_big: showSelf=='1'}">
				<el-table :data="tableData3"  border  id="tableExcel">
					<el-table-column prop="上报时间" label="上报时间">
					</el-table-column>
					<el-table-column prop="其他收费总计（元）" label="其他收费总计（元）">
					</el-table-column>
					<el-table-column prop="装修押金收费（元）" label="装修押金收费（元）">
					</el-table-column>
					<el-table-column prop="装修押金收费占比" label="装修押金收费占比">
					</el-table-column>
					<el-table-column prop="代收费（元）" label="代收费（元）">
					</el-table-column>
					<el-table-column prop="代收费占比" label="代收费占比">
					</el-table-column>
					<el-table-column prop="维修费" label="维修费">
					</el-table-column>
					<el-table-column prop="水电费" label="水电费">
					</el-table-column>
					<el-table-column prop="其他增值费" label="其他增值费">
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
import echartsTwo1 from '@/components/common/echarts1/2echarts_five'
import echartsTwo2 from '@/components/common/echarts1/2echarts_eight'
export default {
	data() {
		return {
			abcd: ['数据应用', '工程数据', '工程运营数据', "巡查工作分析"],
			showSelf: 0,
			currentPage2: 5,
			model: 'chart',
			Xvalue: ['深圳', '北京', '上海', '广州', '佛山', '长春', '天津', '长沙', '南京', '杭州', '厦门', '南宁', '武汉', '郑州', '深圳', '北京', '上海', '广州', '佛山', '长春', '天津', '长沙', '南京', '杭州', '厦门', '南宁', '武汉', '郑州', '深圳', '北京', '上海', '广州', '佛山', '长春', '天津', '长沙', '南京', '杭州', '厦门', '南宁', '武汉', '郑州', '深圳', '北京', '上海', '广州', '佛山', '长春', '天津', '长沙', '南京', '杭州', '厦门', '南宁'],
			//图表1数据---------------------------------------------------------------------------------------------------------
			noeText: "巡更工作分析",
			noeLegend: ["设施类别1完成项", "设施类别2完成项", "设施类别3完成项", "设施类别1计划项", "设施类别2计划项", "设施类别3计划项"],
			unit1: "",
			Series1: [{
				name: '设施类别1完成项',
				type: 'line',
				itemStyle: {
					normal: {
						color: '#F4A460'
					}
				},
				data: [122, 123, 127, 32, 125, 134, 127, 156, 126, 124, 123, 122, 78, 154, 122, 123, 89, 125, 125, 135, 78, 120, 126, 124, 122, 132, 124, 123, 122, 123, 127, 174, 125, 125, 127, 99, 126, 124, 122, 122, 124, 123, 122, 123, 107, 125, 125, 165, 127, 120, 146, 124, 162, 102]
			}, {
				name: '设施类别1计划项',
				type: 'bar',
				barWidth: '20%',
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(7,188,255,0.9)' },
						{ offset: 0.8, color: 'rgba(7,188,255,0.3)' }])
					}
				},
				data: [150, 152, 200, 334, 390, 330, 220, 233, 364, 164, 352, 146, 198, 175, 150, 152, 200, 334, 390, 330, 220, 233, 364, 164, 352, 146, 198, 175, 150, 152, 200, 334, 390, 330, 220, 233, 364, 164, 352, 146, 198, 175, 150, 152, 200, 334, 390, 330, 220, 233, 364, 164, 352, 146]
			},
			{
				name: '设施类别2完成项',
				type: 'line',
				itemStyle: {
					normal: {
						color: '#ADFF2F'
					}
				},
				data: [122, 123, 127, 125, 125, 125, 127, 120, 126, 124, 122, 122, 124, 123, 122, 123, 127, 125, 125, 135, 127, 120, 126, 124, 122, 132, 124, 123, 122, 123, 127, 125, 125, 125, 127, 120, 126, 124, 122, 122, 124, 123, 122, 123, 127, 125, 125, 135, 127, 120, 126, 124, 122, 132]
			}, {
				name: '设施类别2计划项',
				type: 'bar',
				barWidth: '20%',
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(37,241,223,0.9)' },
						{ offset: 0.8, color: 'rgba(37,241,223,0.3)' }])
					}
				},
				data: [150, 152, 200, 334, 390, 330, 220, 233, 364, 164, 352, 146, 198, 175, 150, 152, 200, 334, 390, 330, 220, 233, 364, 164, 352, 146, 198, 175, 150, 152, 200, 334, 390, 330, 220, 233, 364, 164, 352, 146, 198, 175, 150, 152, 200, 334, 390, 330, 220, 233, 364, 164, 352, 146]
			},
			{
				name: '设施类别3完成项',
				type: 'line',
				barWidth: '15%',
				itemStyle: {
					normal: {
						color: '#00FFFF'
					}
				},
				data: [102, 123, 127, 125, 125, 125, 127, 124, 126, 121, 122, 122, 124, 153, 122, 123, 127, 165, 123, 135, 127, 110, 126, 124, 142, 132, 124, 123, 122, 123, 127, 125, 125, 125, 127, 152, 126, 124, 72, 122, 124, 99, 122, 123, 127, 125, 105, 135, 127, 130, 126, 124, 162, 132]
			}, {
				name: '设施类别3计划项',
				type: 'bar',
				barWidth: '20%',
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(0,120,255,0.9)' },
						{ offset: 0.8, color: 'rgba(0,120,255,0.3)' }])
					}
				},
				data: [150, 152, 200, 334, 390, 330, 220, 233, 364, 164, 352, 146, 198, 175, 150, 152, 200, 334, 390, 330, 220, 233, 364, 164, 352, 146, 198, 175, 150, 152, 200, 334, 390, 330, 220, 233, 364, 164, 352, 146, 198, 175, 150, 152, 200, 334, 390, 330, 220, 233, 364, 164, 352, 146]
			}],
			//图表2数据---------------------------------------------------------------------------------------------------------
			twoText: "巡更工作分析",
			twoLegend: ["设施类别1巡更计划完成率", "设施类别2巡更计划完成率", "设施类别3巡更计划完成率"],
			unit2: "",
			Series2: [{
				name: '设施类别1巡更计划完成率',
				type: 'bar',
				barWidth: '20%',
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(7,188,255,0.9)' },
						{ offset: 0.8, color: 'rgba(7,188,255,0.3)' }])
					}
				},
				data: [150, 52, 200, 334, 390, 330, 220, 233, 364, 64, 352, 46, 98, 75, 150, 52, 200, 334, 390, 330, 220, 233, 364, 64, 352, 46, 98, 75, 150, 52, 200, 334, 390, 330, 220, 233, 364, 64, 352, 46, 98, 75, 150, 52, 200, 334, 390, 330, 220, 233, 364, 64, 352, 46]
			},
			{
				name: '设施类别2巡更计划完成率',
				type: 'bar',
				barWidth: '20%',
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(37,241,223,0.9)' },
						{ offset: 0.8, color: 'rgba(37,241,223,0.3)' }])
					}
				},
				data: [150, 52, 200, 334, 390, 330, 220, 233, 364, 64, 352, 46, 98, 75, 150, 52, 200, 334, 390, 330, 220, 233, 364, 64, 352, 46, 98, 75, 150, 52, 200, 334, 390, 330, 220, 233, 364, 64, 352, 46, 98, 75, 150, 52, 200, 334, 390, 330, 220, 233, 364, 64, 352, 46]
			},
			{
				name: '设施类别3巡更计划完成率',
				type: 'bar',
				barWidth: '20%',
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(0,120,255,0.9)' },
						{ offset: 0.8, color: 'rgba(0,120,255,0.3)' }])
					}
				},
				data: [150, 52, 200, 334, 390, 330, 220, 233, 364, 64, 352, 46, 98, 75, 150, 52, 200, 334, 390, 330, 220, 233, 364, 64, 352, 46, 98, 75, 150, 52, 200, 334, 390, 330, 220, 233, 364, 64, 352, 46, 98, 75, 150, 52, 200, 334, 390, 330, 220, 233, 364, 64, 352, 46]
			}],
			conTents: [
				{
					"plate": "2017-8-01",
					"amount": "9",
					"Paidin": "19%",
					"treatment": "8",
					"entrance": "12%",
					"appearance": "14",
					"parking": "12%"
				},
				{
					"plate": "2017-8-01",
					"amount": "9",
					"Paidin": "19%",
					"treatment": "8",
					"entrance": "12%",
					"appearance": "14",
					"parking": "12%"
				},
				{
					"plate": "2017-8-01",
					"amount": "9",
					"Paidin": "19%",
					"treatment": "8",
					"entrance": "12%",
					"appearance": "14",
					"parking": "12%"
				}, {
					"plate": "2017-8-01",
					"amount": "9",
					"Paidin": "19%",
					"treatment": "8",
					"entrance": "12%",
					"appearance": "14",
					"parking": "12%"
				}, {
					"plate": "2017-8-01",
					"amount": "9",
					"Paidin": "19%",
					"treatment": "8",
					"entrance": "12%",
					"appearance": "14",
					"parking": "12%"
				}, {
					"plate": "2017-8-01",
					"amount": "9",
					"Paidin": "19%",
					"treatment": "8",
					"entrance": "12%",
					"appearance": "14",
					"parking": "12%"
				},
				{
					"plate": "2017-8-01",
					"amount": "9",
					"Paidin": "19%",
					"treatment": "8",
					"entrance": "12%",
					"appearance": "14",
					"parking": "12%"
				},
				{
					"plate": "2017-8-01",
					"amount": "9",
					"Paidin": "19%",
					"treatment": "8",
					"entrance": "12%",
					"appearance": "14",
					"parking": "12%"
				},
				{
					"plate": "2017-8-01",
					"amount": "9",
					"Paidin": "19%",
					"treatment": "8",
					"entrance": "12%",
					"appearance": "14",
					"parking": "12%"
				},
				{
					"plate": "2017-8-01",
					"amount": "9",
					"Paidin": "19%",
					"treatment": "8",
					"entrance": "12%",
					"appearance": "14",
					"parking": "12%"
				}
			],
		}
	},
	computed: {
		...mapState(['contentSize', 'mnUrl']),
	},
	components: {
		Bread,
		echartsTwo1,
		echartsTwo2

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
.pager {
	float: right;
	margin-top: 0.2rem;
}
#tableExcel{
	height:7rem;
	width:100%;
}
</style>
