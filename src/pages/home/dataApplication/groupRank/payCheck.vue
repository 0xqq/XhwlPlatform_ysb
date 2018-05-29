<template>
	<div class="attendanceData">
		<Bread :breadData="abc"></Bread>
		<div class="top_div">
			<span class="title">支出稽查</span>
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
				<img src="../../../../images/inout.png" class="inout_a" :class="{Hide: showSelf==0}" @click="method55('tableExcel')" />
			</div>
		<div class="Chart_div" :class="{hide: showSelf==1}">									
			<echarts-two1 :class="{hide: showSelf==1,chart2: showSelf=='0'}" :Text='noeText'
				 :Xvalue="Xvalue" :Legend="noeLegend" :Series="Series1" :PropsWith="width">
			</echarts-two1>
			<echarts-two2 :class="{hide: showSelf==1,chart2: showSelf=='0'}" :Text='twoText'
				 :Xvalue="Xvalue" :Legend="twoLegend" :Series="Series2" :PropsWith="width">
			</echarts-two2>	 
		</div>
			
			<div class="hide" :class="{table_big: showSelf=='1'}">
				<div class="fixed_table">
					<table cellpadding="0" cellspacing="0">
						<thead>
							<tr>
								<th class="left_none" rowspan="2">时间</th>
								<th rowspan="2">备用金总计(元)</th>
								<th rowspan="2">报销费用支出(元)</th>
								<th colspan="3">备用金总计(元)</th>
							</tr>
							<tr>
								<th class="border-top">发放</th>
								<th class="border-top">核销</th>
								<th class="border-top">归还</th>

							</tr>
						</thead>
					</table>
				</div>
				<div class="table">
					<table id="tableExcel" cellspacing="0" cellpadding="0">
						<thead class="nav_table">
							<tr class="fixed_nav">
								<th class="left_none" rowspan="2">时间</th>
								<th rowspan="2">备用金总计(元)</th>
								<th rowspan="2">报销费用支出(元)</th>
								<th colspan="3">备用金总计(元)</th>
							</tr>
							<tr class="fixed_nav">
								<th>发放</th>
								<th>核销</th>
								<th>归还</th>
							</tr>
						</thead>
						<tbody class="center_table">
							<tr v-for="(k,index) in conTents" :key="index">
								<td>{{k.plate}}</td>
								<td>{{k.amount}}</td>
								<td>{{k.Paidin}}</td>
								<td>{{k.treatment}}</td>
								<td>{{k.entrance}}</td>
								<td>{{k.entrance}}</td>
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
import echartsTwo1 from '@/components/common/echarts1/2echarts_five'
import echartsTwo2 from '@/components/common/echarts1/2echarts_seven'
export default {
	data() {
		return {
			abc: ['数据应用', '财务数据', '会计账目分析',"支出稽查"],
			showSelf: 0,
			width:'99.8%',
			currentPage2: 5,
			model: 'chart',
			Xvalue: ['深圳', '北京', '上海', '广州', '佛山', '长春', '天津', '长沙', '南京', '杭州', '厦门', '南宁', '武汉', '郑州', '深圳', '北京', '上海', '广州', '佛山', '长春', '天津', '长沙', '南京', '杭州', '厦门', '南宁', '武汉', '郑州', '深圳', '北京', '上海', '广州', '佛山', '长春', '天津', '长沙', '南京', '杭州', '厦门', '南宁', '武汉', '郑州', '深圳', '北京', '上海', '广州', '佛山', '长春', '天津', '长沙', '南京', '杭州', '厦门', '南宁'],
			//图表2数据---------------------------------------------------------------------------------------------------------
			noeText: "备用金支出稽查",
			noeLegend: ['发放', '核销', '归还'],
			Series1: [{
				name: '发放',
				type: 'bar',
				stack: '总量',
				barWidth: '45%',
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(239,107,51,1)' },
						{ offset: 1, color: 'rgba(239,107,51,0.5)' }])
					}
				},
				data: [150, 52, 200, 334, 390, 330, 220, 233, 364, 64, 352, 46, 98, 75, 150, 52, 200, 334, 390, 330, 220, 233, 364, 64, 352, 46, 98, 75, 150, 52, 200, 334, 390, 330, 220, 233, 364, 64, 352, 46, 98, 75, 150, 52, 200, 334, 390, 330, 220, 233, 364, 64, 352, 46]
			},
			{
				name: '核销',
				type: 'bar',
				stack: '总量',
				barWidth: '45%',
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(46,168,80,1)' },
						{ offset: 1, color: 'rgba(46,168,80,0.5)' }])
					}
				},
				data: [120, 52, 200, 334, 390, 330, 220, 233, 264, 64, 252, 46, 98, 75, 120, 52, 200, 334, 390, 330, 220, 233, 264, 64, 352, 46, 98, 75, 120, 52, 200, 334, 390, 330, 220, 233, 264, 64, 252, 46, 98, 75, 120, 52, 200, 334, 390, 330, 220, 233, 264, 64, 352, 46]
			},
			{
				name: '归还',
				type: 'bar',
				stack: '总量',
				barWidth: '45%',
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(51,152,219,1)' },
						{ offset: 1, color: 'rgba(51,152,219,0.5)' }])
					}
				},
				data: [150, 52, 200, 334, 390, 330, 220, 233, 264, 64, 252, 46, 98, 75, 150, 52, 200, 334, 390, 330, 220, 233, 264, 64, 252, 46, 98, 75, 120, 52, 200, 334, 390, 330, 220, 233, 264, 64, 252, 46, 98, 75, 120, 52, 200, 334, 390, 330, 220, 233, 264, 64, 352, 46]
			}],
			//图表二数据-----------------------------------------------------------------------------------------------------------------
			twoText: "报销费用支出稽查",
			twoLegend: "",
			Series2: [{
				name: "报销费用支出",
				type: 'bar',
				barWidth: '45%%',
				data: [150, 52, 200, 334, 390, 330, 220, 233, 364, 64, 352, 46, 98, 75, 150, 52, 200, 334, 390, 330, 220, 233, 364, 64, 352, 46, 98, 75, 150, 52, 200, 334, 390, 330, 220, 233, 364, 64, 352, 46, 98, 75, 150, 52, 200, 334, 390, 330, 220, 233, 364, 64, 352, 46],
			}],
			conTents: [
                {
                    "plate": "2017-8-05",
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
			this.$http({
				url: this.mnUrl + "/tmp/finance/overview",
				method: 'get',
			}).then(function(res) {


			}, function(error) {
				//失败回调的函数								
				console.log(error)
			})
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

.attendanceData {
	vertical-align: top;
	width: 100%;
	height: 8.96rem;
	display: inline-block;
	position: relative;
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
			margin-left: 0.05rem;
			cursor: pointer;
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

.table_big {
	display: block;
	width: 100%;
	height: 7rem;
	.table {
		width: 100%;
		height: 7rem;
		background-image: url(../../../../images/kaimen.png);
		background-size: 100% 100%;
		overflow-y: scroll;
		table {
			width: 100%;
			.nav_table {
				height: 0.4rem;
				background-image: url(../../../../images/kaimenNav.png);
				background-size: 100% 100%;
				visibility: hidden;
				th {
					width: 16.6%;
					height: 0.4rem;
					line-height: 0.4rem;
					text-align: center;
					border-left: 2px solid #698499;
				}
				.left_none {
					border-left: none;
				}
			}

			.center_table>tr {
				width: 100%;
				align-items: center;
				text-align: center;
				td {
					height: 0.8rem;
					width: 16.6%;
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
		tr {
			width: 100%;
			th {
				width: 16.6%;
				height: 0.4rem;
				line-height: 0.4rem;
				text-align: center;
				border-left: 2px solid #698499;
			}
			.left_none {
				border-left: none;
			}
			.border-top {
				border-top: 2px solid #698499;
			}
		}
	}
}

.Hide {
	display: none !important;
}



/*换页部分*/

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
</style>