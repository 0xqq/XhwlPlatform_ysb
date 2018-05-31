<template>
	<div class="attendanceData">
		<Bread :breadData="abc"></Bread>
		<div class="top_div">
			<span class="title">其他收费</span>
			<div class="top_right">
				<div class="boutton_div">
					<span class="chart_model" :class="{active: model=='chart', unactive: model == 'table'}" @click="choiseModel(0)">图表模式</span>
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
		<!-- 图表-->
		<div :class="{hide: showSelf==1,chart2: showSelf=='0'}" class="big_echarts">
			<echarts-two1 class="chart2" :Text='noeText' :Xvalue="Xvalue" :Legend="noeLegend" :Series="Series1" :Unit="unit1">
			</echarts-two1>
			<echarts-two2 :class="{hide: showSelf==1,chart2: showSelf=='0'}" :Text='twoText' :Xvalue="Xvalue" :Legend="twoLegend" :Series="Series2" :Unit="unit2">
			</echarts-two2>
			<echarts-two3 :class="{hide: showSelf==1,chart2: showSelf=='0'}" :Text='threeText' :Xvalue="Xvalue" :Legend="threeLegend" :Series="Series3" :Unit="unit3">
			</echarts-two3>
		</div>
		<div class="hide" :class="{table_big: showSelf=='1'}">
			<div class="fixed_table">
				<table cellpadding="0" cellspacing="0">
					<thead>
						<tr class="fixed_nav">
							<th class="left_none">时间</th>
							<th>部门</th>
							<th>出勤率</th>
							<th>总评分</th>
							<th>考勤评分</th>
							<th>日常工作评分</th>
							<th>专项工作评分</th>
							<th>服务质量评分</th>
							<th>嘉奖分</th>
						</tr>
					</thead>
				</table>
			</div>
			<div class="table" id="div_table">
				<table id="tableExcel" cellpadding="0" cellspacing="0">
					<thead>
						<tr class="nav_table">
							<th class="left_none">时间</th>
							<th>部门</th>
							<th>出勤率</th>
							<th>总评分</th>
							<th>考勤评分</th>
							<th>日常工作评分</th>
							<th>专项工作评分</th>
							<th>服务质量评分</th>
							<th>嘉奖分</th>
						</tr>
					</thead>
					<tbody class="center_table">
						<tr>
							<td rowspan="5" class="left_none">217年8月份</td>
							<td>财务部</td>
							<td>2</td>
							<td>3</td>
							<td>4</td>
							<td>5</td>
							<td>6</td>
							<td>7</td>
							<td>8</td>
						</tr>
						<tr>
							<td>安防部</td>
							<td>2</td>
							<td>3</td>
							<td>4</td>
							<td>5</td>
							<td>6</td>
							<td>7</td>
							<td>8</td>
						</tr>
						<tr>
							<td>工程部</td>
							<td>2</td>
							<td>3</td>
							<td>4</td>
							<td>5</td>
							<td>6</td>
							<td>7</td>
							<td>8</td>
						</tr>
						<tr>
							<td>客服部</td>
							<td>2</td>
							<td>3</td>
							<td>4</td>
							<td>5</td>
							<td>6</td>
							<td>7</td>
							<td>8</td>
						</tr>
						<tr>
							<td>人事部</td>
							<td>2</td>
							<td>3</td>
							<td>4</td>
							<td>5</td>
							<td>6</td>
							<td>7</td>
							<td>8</td>
						</tr>
					</tbody>
					<tbody class="center_table">
						<tr>
							<td rowspan="5" class="left_none">217年8月份</td>
							<td>财务部</td>
							<td>2</td>
							<td>3</td>
							<td>4</td>
							<td>5</td>
							<td>6</td>
							<td>7</td>
							<td>8</td>
						</tr>
						<tr>
							<td>安防部</td>
							<td>2</td>
							<td>3</td>
							<td>4</td>
							<td>5</td>
							<td>6</td>
							<td>7</td>
							<td>8</td>
						</tr>
						<tr>
							<td>工程部</td>
							<td>2</td>
							<td>3</td>
							<td>4</td>
							<td>5</td>
							<td>6</td>
							<td>7</td>
							<td>8</td>
						</tr>
						<tr>
							<td>客服部</td>
							<td>2</td>
							<td>3</td>
							<td>4</td>
							<td>5</td>
							<td>6</td>
							<td>7</td>
							<td>8</td>
						</tr>
						<tr>
							<td>人事部</td>
							<td>2</td>
							<td>3</td>
							<td>4</td>
							<td>5</td>
							<td>6</td>
							<td>7</td>
							<td>8</td>
						</tr>
					</tbody>
					<tbody class="center_table">
						<tr>
							<td rowspan="5" class="left_none">217年8月份</td>
							<td>财务部</td>
							<td>2</td>
							<td>3</td>
							<td>4</td>
							<td>5</td>
							<td>6</td>
							<td>7</td>
							<td>8</td>
						</tr>
						<tr>
							<td>安防部</td>
							<td>2</td>
							<td>3</td>
							<td>4</td>
							<td>5</td>
							<td>6</td>
							<td>7</td>
							<td>8</td>
						</tr>
						<tr>

							<td>工程部</td>
							<td>2</td>
							<td>3</td>
							<td>4</td>
							<td>5</td>
							<td>6</td>
							<td>7</td>
							<td>8</td>
						</tr>
						<tr>
							<td>客服部</td>
							<td>2</td>
							<td>3</td>
							<td>4</td>
							<td>5</td>
							<td>6</td>
							<td>7</td>
							<td>8</td>
						</tr>
						<tr>
							<td>人事部</td>
							<td>2</td>
							<td>3</td>
							<td>4</td>
							<td>5</td>
							<td>6</td>
							<td>7</td>
							<td>8</td>
						</tr>
					</tbody>
				</table>
			</div>
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
import allPicker from '@/components/common/allPicker'
import echartsTwo1 from '@/components/common/echarts1/2echarts_eight'
import echartsTwo2 from '@/components/common/echarts1/2echarts_five'
import echartsTwo3 from '@/components/common/echarts1/2echarts_seven'
export default {
	data() {
		return {
			abc: ['数据应用', '人事数据', '考勤数据数据分析'],
			model: 'chart',
			showSelf: 0,
			currentPage2: 5,
			Xvalue: ['深圳', '北京', '上海', '广州', '佛山', '长春', '天津', '长沙', '南京', '杭州', '厦门', '南宁', '武汉', '郑州', '深圳', '北京', '上海', '广州', '佛山', '长春', '深圳', '北京', '上海', '广州', '佛山', '长春', '天津', '长沙', '南京', '杭州', '厦门', '南宁', '武汉', '郑州', '深圳', '北京', '上海', '广州', '佛山', '长春'],
			//图表1数据---------------------------------------------------------------------------------------------------------
			noeText: "员工出勤率数据分析",
			noeLegend: ['财务', '安环', '工程', "客服", "人事"],
			unit1: "万元",
			Series1: [{
				name: '财务',
				type: 'bar',
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(7,188,255,0.9)' },
						{ offset: 0.8, color: 'rgba(7,188,255,0.3)' }])
					}
				},
				data: [122, 123, 127, 125, 125, 125, 127, 120, 216, 124, 122, 212, 124, 123, 122, 123, 127, 125, 125, 135, 122, 123, 127, 125, 125, 125, 127, 120, 216, 124, 122, 212, 124, 123, 122, 123, 127, 125, 125, 135]
			},
			{
				name: '安环',
				type: 'bar',
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(37,241,223,0.9)' },
						{ offset: 0.8, color: 'rgba(37,241,223,0.3)' }])
					}
				},
				data: [122, 23, 127, 125, 15, 15, 127, 20, 216, 124, 22, 212, 124, 123, 122, 13, 127, 125, 15, 15, 122, 23, 127, 125, 15, 15, 127, 20, 216, 124, 22, 212, 124, 123, 122, 13, 127, 125, 15, 15]
			},
			{
				name: '工程',
				type: 'bar',
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(0,120,255,0.9)' },
						{ offset: 0.8, color: 'rgba(0,120,255,0.3)' }])
					}
				},
				data: [122, 123, 127, 15, 125, 125, 127, 120, 216, 124, 22, 212, 124, 123, 122, 123, 127, 125, 125, 135, 122, 23, 127, 125, 15, 15, 127, 20, 216, 124, 22, 212, 124, 123, 122, 13, 127, 125, 15, 15]
			},
			{
				name: '客服',
				type: 'bar',
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(112,180,235,0.9)' },
						{ offset: 0.8, color: 'rgba(112,180,235,0.3)' }])
					}
				},
				data: [122, 123, 127, 125, 125, 125, 27, 20, 216, 124, 122, 22, 24, 123, 122, 123, 27, 125, 125, 135, 122, 23, 127, 125, 15, 15, 127, 20, 216, 124, 22, 212, 124, 123, 122, 13, 127, 125, 15, 15]
			},
			{
				name: '人事',
				type: 'bar',
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(210,223,2,0.9)' },
						{ offset: 0.8, color: 'rgba(210,223,2,0.3)' }])
					}
				},
				data: [122, 123, 127, 125, 125, 125, 27, 20, 216, 124, 122, 22, 24, 123, 122, 123, 27, 125, 125, 135, 122, 23, 127, 125, 15, 15, 127, 20, 216, 124, 22, 212, 124, 123, 122, 13, 127, 125, 15, 15]
			}],
			//图表2数据---------------------------------------------------------------------------------------------------------
			twoText: "员工绩效总评分分析",
			twoLegend: ['财务', '安环', '工程', "客服", "人事"],
			unit2: "万元",
			Series2: [{
				name: '财务',
				type: 'bar',
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(7,188,255,0.9)' },
						{ offset: 0.8, color: 'rgba(7,188,255,0.3)' }])
					}
				},
				data: [122, 123, 127, 125, 125, 125, 127, 120, 216, 124, 122, 212, 124, 123, 122, 123, 127, 125, 125, 135, 122, 123, 127, 125, 125, 125, 127, 120, 216, 124, 122, 212, 124, 123, 122, 123, 127, 125, 125, 135]
			},
			{
				name: '安环',
				type: 'bar',
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(37,241,223,0.9)' },
						{ offset: 0.8, color: 'rgba(37,241,223,0.3)' }])
					}
				},
				data: [122, 23, 127, 125, 15, 15, 127, 20, 216, 124, 22, 212, 124, 123, 122, 13, 127, 125, 15, 15, 122, 23, 127, 125, 15, 15, 127, 20, 216, 124, 22, 212, 124, 123, 122, 13, 127, 125, 15, 15]
			},
			{
				name: '工程',
				type: 'bar',
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(0,120,255,0.9)' },
						{ offset: 0.8, color: 'rgba(0,120,255,0.3)' }])
					}
				},
				data: [122, 123, 127, 15, 125, 125, 127, 120, 216, 124, 22, 212, 124, 123, 122, 123, 127, 125, 125, 135, 122, 23, 127, 125, 15, 15, 127, 20, 216, 124, 22, 212, 124, 123, 122, 13, 127, 125, 15, 15]
			},
			{
				name: '客服',
				type: 'bar',
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(112,180,235,0.9)' },
						{ offset: 0.8, color: 'rgba(112,180,235,0.3)' }])
					}
				},
				data: [122, 123, 127, 125, 125, 125, 27, 20, 216, 124, 122, 22, 24, 123, 122, 123, 27, 125, 125, 135, 122, 23, 127, 125, 15, 15, 127, 20, 216, 124, 22, 212, 124, 123, 122, 13, 127, 125, 15, 15]
			},
			{
				name: '人事',
				type: 'bar',
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(210,223,2,0.9)' },
						{ offset: 0.8, color: 'rgba(210,223,2,0.3)' }])
					}
				},
				data: [22, 123, 27, 25, 25, 25, 127, 20, 16, 24, 22, 12, 24, 23, 122, 23, 27, 25, 25, 35, 122, 23, 127, 125, 15, 15, 127, 20, 216, 124, 22, 212, 124, 123, 122, 13, 127, 125, 15, 15]
			}],
			//图表3数据---------------------------------------------------------------------------------------------------------
			threeText: "员工绩效考勤评分分析",
			threeLegend: ['财务', '安环', '工程', "客服", "人事"],
			unit3: "万元",
			Series3: [{
				name: '财务',
				type: 'bar',
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(7,188,255,0.9)' },
						{ offset: 0.8, color: 'rgba(7,188,255,0.3)' }])
					}
				},
				data: [122, 123, 127, 125, 125, 125, 127, 120, 216, 124, 122, 212, 124, 123, 122, 123, 127, 125, 125, 135, 122, 123, 127, 125, 125, 125, 127, 120, 216, 124, 122, 212, 124, 123, 122, 123, 127, 125, 125, 135]
			},
			{
				name: '安环',
				type: 'bar',
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(37,241,223,0.9)' },
						{ offset: 0.8, color: 'rgba(37,241,223,0.3)' }])
					}
				},
				data: [122, 23, 127, 125, 15, 15, 127, 20, 216, 124, 22, 212, 124, 123, 122, 13, 127, 125, 15, 15, 122, 23, 127, 125, 15, 15, 127, 20, 216, 124, 22, 212, 124, 123, 122, 13, 127, 125, 15, 15]
			},
			{
				name: '工程',
				type: 'bar',
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(0,120,255,0.9)' },
						{ offset: 0.8, color: 'rgba(0,120,255,0.3)' }])
					}
				},
				data: [122, 123, 127, 15, 125, 125, 127, 120, 216, 124, 22, 212, 124, 123, 122, 123, 127, 125, 125, 135, 122, 23, 127, 125, 15, 15, 127, 20, 216, 124, 22, 212, 124, 123, 122, 13, 127, 125, 15, 15]
			},
			{
				name: '客服',
				type: 'bar',
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(112,180,235,0.9)' },
						{ offset: 0.8, color: 'rgba(112,180,235,0.3)' }])
					}
				},
				data: [122, 123, 127, 125, 125, 125, 27, 20, 216, 124, 122, 22, 24, 123, 122, 123, 27, 125, 125, 135, 122, 23, 127, 125, 15, 15, 127, 20, 216, 124, 22, 212, 124, 123, 122, 13, 127, 125, 15, 15]
			},
			{
				name: '人事',
				type: 'bar',
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(210,223,2,0.9)' },
						{ offset: 0.8, color: 'rgba(210,223,2,0.3)' }])
					}
				},
				data: [22, 123, 27, 25, 25, 25, 127, 20, 16, 24, 22, 12, 24, 23, 122, 23, 27, 25, 25, 35, 122, 23, 127, 125, 15, 15, 127, 20, 216, 124, 22, 212, 124, 123, 122, 13, 127, 125, 15, 15]
			}],
		}
	},
	computed: {
		...mapState(['contentSize', 'mnUrl']),
	},
	components: {
		Bread,
		allPicker,
		echartsTwo1,
		echartsTwo2,
		echartsTwo3,
	},
	mounted() {
		//初始化时获取数据
		this.getData();

	},
	methods: {
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
		method55(tableExcel) {
			this.$func.method5(tableExcel)
		},
		getData() {
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
// .element_div{
// 	height:7rem;
// 	width: 100%;
// 	margin-top:0.2rem;
// }
.big_echarts {
	width: 100%;
	height: 7.55rem;
	overflow-y: auto;
	margin: 0 auto;
	scrollbar-base-color: #12253d; // 滚动条滑块按钮的颜色
	scrollbar-face-color: #184e7a; // 滚动条整体颜色
	scrollbar-track-color: #12253d;
	scrollbar-arrow-color: #12253d;
	.chart2 {
		color: white;
		width: 99.5%;
		height: 5.25rem;
		margin: 0 auto;
		margin-bottom: 0.05rem;
		overflow-x: auto;
	}
}

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

.attendanceData {
	vertical-align: top;
	width: 100%;
	height: 8.96rem;
	display: inline-block;
	position: relative;
}

.table {
	width: 100%;
	height: 7rem;
	background-image: url(../../../../images/kaimen.png);
	background-size: 100% 100%;
	overflow-y: scroll;
	margin-top: 0.05rem;
	table {
		width: 100%;
		.nav_table {
			height: 0.4rem;
			background-image: url(../../../../images/kaimenNav.png);
			background-size: 100% 100%;
			visibility: hidden;
			th {
				width: 11.1%;
				height: 0.4rem;
				line-height: 0.4rem;
				text-align: center;
				border-left: 2px solid #698499;
			}
			.left_none {

			}
		}

		.center_table>tr {
			width: 100%;
			align-items: center;
			text-align: center;
			td {
				height: 0.5rem;
				width: 11%;
				border-left: 2px solid #698499;
				border-bottom: 2px solid #698499;
			}
			.left_none {
				border-left: none;
			}
		}
	}
}

.table_big {
	display: block;
}

.fixed_table>table {
	position: absolute;
	width: 99.73%;
	height: 0.4rem;
	background-color: #184e7a;
	background-image: url(../../../../images/kaimenNav.png);
	background-size: 100% 100%;
	/*margin-top:0.05rem;*/
	tr {
		width: 100%;
		th {
			width: 11.1%;
			height: 0.4rem;
			line-height: 0.4rem;
			text-align: center;
			border-left: 2px solid #698499;
		}
		.left_none {}
	}
}

.Hide {
	display: none !important;
}

.pager {
	float: right;
	margin-top: 0.2rem;
}
</style>
