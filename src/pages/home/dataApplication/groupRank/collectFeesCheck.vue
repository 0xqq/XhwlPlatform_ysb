<template>
	<div>
		<Bread :breadData="abc"></Bread>
		<div class="top_div">
			<span class="title">收费稽查</span>
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
				<img src="../../../../images/inout.png" class="inout_a" :class="{Hide: showSelf==0}" @click="method55('tableExcel')" />
			</div>
		<div class="Chart_div" :class="{hide: showSelf==1}">
			<echarts-two1 :class="{hide: showSelf==1,chart2: showSelf=='0'}" :Text='noeText'
				 :Xvalue="Xvalue" :Legend="noeLegend" :Series="Series1" :Unit="unit1" :PropsWith="width">
			</echarts-two1>
			<echarts-two2 :class="{hide: showSelf==1,chart2: showSelf=='0'}" :Text='twoText'
				 :Xvalue="Xvalue" :Legend="twoLegend" :Series="Series2" :Unit="unit2" :PropsWith="width">
			</echarts-two2>
		</div>

			<div class="hide" :class="{table_big: showSelf=='1'}">
				<el-table :data="tableData3" height="250" border style="width: 100%" id="tableExcel">
					<el-table-column prop="name" label="时间">
					</el-table-column>
					<el-table-column prop="date" label="停车场临停应收(元)">
					</el-table-column>
					<el-table-column prop="province" label="停车场临停实收(元)">
					</el-table-column>
					<el-table-column prop="province" label="停车场月卡应收(元)">
					</el-table-column>
					<el-table-column prop="province" label="停车场月卡实收(元)">
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
			abc: ['数据应用', '财务数据', '会计账目分析'],
			showSelf: 0,
			width:"99.8%",
			currentPage2: 5,
			model: 'chart',
			Xvalue: ['深圳', '北京', '上海', '广州', '佛山', '长春', '天津', '长沙', '南京', '杭州', '厦门', '南宁', '武汉', '郑州', '深圳', '北京', '上海', '广州', '佛山', '长春', '天津', '长沙', '南京', '杭州', '厦门', '南宁', '武汉', '郑州', '深圳', '北京', '上海', '广州', '佛山', '长春', '天津', '长沙', '南京', '杭州', '厦门', '南宁', '武汉', '郑州', '深圳', '北京', '上海', '广州', '佛山', '长春', '天津', '长沙', '南京', '杭州', '厦门', '南宁'],
			//图表1数据
			noeText: "停车场临停收费稽查",
			noeLegend: ["实收", "应收"],
			unit1: "元",
			Series1: [{
				name: "实收",
				type: 'bar',
				barWidth: '25%',
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(211,201,39,0.9)' },
						{ offset: 1, color: 'rgba(236,255,25,0.1)' }])
					}
				},
				data: [122, 123, 127, 125, 125, 125, 127, 120, 126, 124, 122, 122, 124, 123, 122, 123, 127, 125, 125, 135, 127, 120, 126, 124, 122, 132, 124, 123, 122, 123, 127, 125, 125, 125, 127, 120, 126, 124, 122, 122, 124, 123, 122, 123, 127, 125, 125, 135, 127, 120, 126, 124, 122, 132],
			}, {
				name: "应收",
				type: 'bar',
				barGap: '-165%',
				barWidth: '60%',
				z: -12,
				data: [150, 52, 200, 334, 390, 330, 220, 233, 364, 64, 352, 46, 98, 75, 150, 52, 200, 334, 390, 330, 220, 233, 364, 64, 352, 46, 98, 75, 150, 52, 200, 334, 390, 330, 220, 233, 364, 64, 352, 46, 98, 75, 150, 52, 200, 334, 390, 330, 220, 233, 364, 64, 352, 46],
			}],
			//图表2数据
			twoText: "停车场月卡收费稽查",
			twoLegend: ["实收", "应收"],
			unit2: "元",
			Series2: [{
				name: "实收",
				type: 'bar',
				barWidth: '25%',
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(211,201,39,0.9)' },
						{ offset: 1, color: 'rgba(236,255,25,0.1)' }])
					}
				},
				data: [122, 123, 127, 125, 125, 125, 127, 120, 126, 124, 122, 122, 124, 123, 122, 123, 127, 125, 125, 135, 127, 120, 126, 124, 122, 132, 124, 123, 122, 123, 127, 125, 125, 125, 127, 120, 126, 124, 122, 122, 124, 123, 122, 123, 127, 125, 125, 135, 127, 120, 126, 124, 122, 132],
			}, {
				name: "应收",
				type: 'bar',
				barGap: '-165%',
				barWidth: '60%',
				z: -12,
				data: [150, 52, 200, 334, 390, 330, 220, 233, 364, 64, 352, 46, 98, 75, 150, 52, 200, 334, 390, 330, 220, 233, 364, 64, 352, 46, 98, 75, 150, 52, 200, 334, 390, 330, 220, 233, 364, 64, 352, 46, 98, 75, 150, 52, 200, 334, 390, 330, 220, 233, 364, 64, 352, 46],
			}],
			tableData3: [
				{
					"name": "深圳",
					"date": "9",
					"province": "19%",
					"province": "8",
					"province": "12%",
				},
				{
					"plate": "深圳",
					"amount": "9",
					"Paidin": "19%",
					"treatment": "8",
					"entrance": "12%",
				},
				{
					"plate": "深圳",
					"amount": "9",
					"Paidin": "19%",
					"treatment": "8",
					"entrance": "12%",
				}, {
					"plate": "深圳",
					"amount": "9",
					"Paidin": "19%",
					"treatment": "8",
					"entrance": "12%",
				}, {
					"plate": "深圳",
					"amount": "9",
					"Paidin": "19%",
					"treatment": "8",
					"entrance": "12%",
				}, {
					"plate": "深圳",
					"amount": "9",
					"Paidin": "19%",
					"treatment": "8",
					"entrance": "12%",
				},
				{
					"plate": "深圳",
					"amount": "9",
					"Paidin": "19%",
					"treatment": "8",
					"entrance": "12%"
				},
				{
					"plate": "深圳",
					"amount": "9",
					"Paidin": "19%",
					"treatment": "8",
					"entrance": "12%",
				},
				{
					"plate": "深圳",
					"amount": "9",
					"Paidin": "19%",
					"treatment": "8",
					"entrance": "12%",
				},
				{
					"plate": "深圳",
					"amount": "9",
					"Paidin": "19%",
					"treatment": "8",
					"entrance": "12%",
				}
			]
		}
	},
	computed: {
		...mapState(['contentSize', 'mnUrl']),
	},
	components: {
		Bread,
		echartsTwo1,
		echartsTwo2,
	},
	mounted() {
		//初始化时获取数据
		this.getData();
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
		}
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
		display: flex;
		align-items: center;
		.date-time {
			display: inline-block;
			width: 2.58rem;
			height: 0.6rem;
			color: #67bce9;
			outline: none;
			margin: 0 0.05rem;
			.el_picker {
				display: inline-block;
				width: 2.58rem;
				height: 0.33rem;
				font-size: 0.14rem;
			}
		}
		.inout_a {
			width: 0.21rem;
			height: 0.21rem;
			cursor: pointer;
			margin-left: 0.05rem;
			z-index: 999;
			align-items: center;
		}
	}
}
/*顶部按钮样式*/

.boutton_div {
	line-height: 0.33rem;
	overflow: hidden;
	display: inline-block;
	.active {
		@include actBt(0.85rem, 0.33rem);
	}
	.unactive {
		@include unactBt(0.85rem, 0.33rem);
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

#tableExcel {
	min-height: 7rem;
}

.pager {
	float: right;
	margin-top: 0.2rem;
}
</style>
