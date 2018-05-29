<template>
	<div>
		<!--<Homenav :navData="route"></Homenav>-->
		<Bread :breadData="abc"></Bread>
		<div class="div_top">
			<span class="span_left">今日实时</span>
			<div class="div_right">
				<!--<span>时间筛选:</span>
				<div class="select">
					<el-select v-model="value" placeholder="自然月" class="small_select">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
				<div class="time_select">
					<el-date-picker v-model="value" type="daterange" placeholder="2017-09-15-2017-09-22"></el-date-picker>
				</div>-->
			</div>
		</div>
		<!--中间内容部分-->
		<div class="div_content">
			<ul class="content_ul">
				<li>
					<p>停车场月卡欠费人数(人)</p>
					<span>2</span>
				</li>
				<li>
					<p>停车场月卡欠费总金额(元)</p>
					<span>500</span>
				</li>
				<li>
					<p>停车场月卡催缴率</p>
					<span>99%</span>
				</li>
			</ul>
			<div class="content_left">
				<div class="letf_title">
					<span>客户满意度</span>
				</div>
				<dl class="left_ul">
					<dd>
						<p>网上填报(起)</p>
						<span>436</span>
					</dd>
					<dd>
						<p>线下抽样调研(起)</p>
						<span>100</span>
					</dd>
				</dl>
				<div id="myChart1" class="chart1"></div>
			</div>
			<div class="content_right">
				<div class="right_title">
					<span>投诉统计</span>
				</div>
				<dl class="right_ul">
					<dd>
						<p>投诉次数(次)</p>
						<span>17</span>
					</dd>
					<dd>
						<p>投诉未销项数</p>
						<span>1</span>
					</dd>
					<dd>
						<p>投诉销项率</p>
						<span>94%</span>
					</dd>
					<dd>
						<p>投诉回访率</p>
						<span>100%</span>
					</dd>
				</dl>
				<span class="title_tu">{{title_tu}}</span>
				<div id="myChart2" class="chart2"></div>
			</div>
		</div>
		<!--底部 部分-->
		<div class="div_bottom">
			<span>2017年10月中海华庭客服人员考勤</span>
		</div>
		<ul class="ul_bottom">
			<li>
				<p>迟到早退人员</p>
				<span>无</span>
			</li>
			<li>
				<p>缺勤人员</p>
				<span>无</span>
			</li>
			<li>
				<p>请假人员</p>
				<span>无</span>
			</li>
		</ul>
	</div>
</template>

<script>
import Bread from '@/components/common/bread'
import { mapState } from 'vuex';
import echarts from 'echarts'
import Homenav from '@/components/common/projectHomeNav'
export default {
	data() {
		return {
			abc: ['管理应用', '客服管理'],
			title_tu: '安环投诉',
			isDispose: false,  //判断是否销毁
			mapStatus: null,  //图表返回函数状态
			isFirst: true,
			value: '',
			Data: [5, 0],
			title: ['已处理', '未处理'],
			C_data: [3, 1],   //客服数据
			E_data: [8, 0],   //工程数据
			A_data: [5, 0],   //安环数据
			// route: 'P_custom',//向子组件传跳转路由
			options: [{
				value: '选项1',
				label: '自然年'
			}, {
				value: '选项2',
				label: '自然日'
			}],
			value: ''
		}
	},
	computed: {
		...mapState(['contentSize']),
	},
	components: {
		Bread
	},
	mounted() {
		this.getData();
	},
	destroyed() {
		//页面跳转时销毁
		this.isDispose = true;
		var _destroyMap = this.mapStatus;
		_destroyMap();
	},
	watch: {
		//页面变化时重绘
		contentSize: function(contentSize) {
			var _resizeMap = this.mapStatus;
			setTimeout(function() {
				_resizeMap();
			}, 400)
		}
	},
	methods: {
		getData() {
			this.$http({
				url: "../../../static/homepage.json",
				method: 'get',
			}).then(function(res) {
				if (this.isFirst) {
					//第一次获取数据进行实列化
					this.mapStatus = this.drawLine();
					this.isFirst = false;
				} else {
					// 否则进行重绘
					var _resizeMap = this.mapStatus;
					_resizeMap();
				}
			}, function(error) {
				//失败回调的函数								
				console.log(error);
			});
		},
		drawLine() {
			var refThis = this;
			var myChart1 = echarts.init(document.getElementById('myChart1'));
			var myChart2 = echarts.init(document.getElementById('myChart2'));
			// 绘制图表
			var option2 = {
				color: ['#00BFFF', '#00FFFF', '#ADD8E6'], //柱体颜色
				textStyle: {
					color: '#fff',
				},
				grid: {
					show: false,
					left: '66%',
					top: "20%",
					right: '10%',
					bottom: 'auto',
					width: '20%',
					height: '60%',
				},
				tooltip: {
					trigger: 'item',
					formatter: "{b} <br/>{d}%",
				},
				//		        legend: {
				//		        	type:'scroll',
				//	        		data: ['临停收费','月卡收费','储值卡收费'],
				//	        		left: 'auto',
				//					top: '15%',
				//					right: '32%',
				//					bottom: 'auto',
				//	        		textStyle:{ 
				//			        	color: '#fff',
				//			        	fontSize: 14,        	
				//			       		},
				//		    		},
				xAxis: {
					data: this.title,
					axisLine: {
						lineStyle: {
							color: '#fff',
						}
					},
					axisTick: {
						show: false,
					},
					nameTextStyle: {
						fontSize: 14,
					}
				},
				yAxis: {
					axisLine: {
						show: false,
						lineStyle: {
							color: '#fff',
						}
					},
					splitLine: {
						show: false,
					}
				},
				series: [{
					name: '',
					type: 'bar',
					data: this.Data,                       //数据接入koi
					barWidth: '13',     //柱型宽度
					itemStyle: {      //柱型圆角
						normal: {
							barBorderRadius: 10
						},
					}
				},
				{
					name: '数据',
					type: 'pie',
					radius: '72%',
					center: ['28%', '50%'],
					label: {
						normal: {
							show: true,
							position: 'inside'
						}
					},
					data: [
						{ value: 4, name: '客服投诉' },
						{ value: 8, name: '工程投诉' },
						{ value: 5, name: '安环投诉' }
					],
					itemStyle: {
						emphasis: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					}
				}]
			};
			var labelT = {
				normal: {
					color: '#45d3e4',
					label: {
						show: true,
						position: 'center',
						formatter: '{b}',
						textStyle: {
							baseline: 'bottom'
						}
					},
					labelLine: {
						show: false
					}
				}
			};
			var labelB = {
				normal: {
					color: 'rgba(255,255,255,0)',
					label: {
						show: true,
						position: 'center',
					},
					labelLine: {
						show: false
					}
				}
			};
			var labelquanl = {
				normal: {
					label: {
						formatter: function(params) {
							return 100 - params.value + '%'
						},
						textStyle: {
							baseline: 'top',
							color: "#fff",
							fontSize: 18,
						}
					}
				}
			};
			var radius = ["65%", "75%"];
			var option1 = {
				color: ['#45d3e4'],
				series: [{
					type: 'pie',
					center: ['75%', '50%'],
					radius: radius,
					x: '0%', // for funnel
					itemStyle: labelquanl,
					clockwise: false,
					data: [
						{ name: 'other', value: 3, itemStyle: labelB },
						{ name: '线下', value: 97, itemStyle: labelT }
					]
				},
				{
					type: 'pie',
					center: ['25%', '50%'],
					radius: radius,
					x: '0%', // for funnel
					itemStyle: labelquanl,
					clockwise: false,
					data: [
						{ name: 'other', value: 2, itemStyle: labelB },
						{ name: '线上', value: 98, itemStyle: labelT }
					]
				}
				]
			};
			myChart2.on('click', function(params) {
				if (params.name == '安环投诉') {
					refThis.Data.splice(0, 2, refThis.A_data[0], refThis.A_data[1]);
					refThis.title_tu = params.name;
					myChart2.setOption(option2);
				} else if (params.name == '客服投诉') {
					refThis.Data.splice(0, 2, refThis.C_data[0], refThis.C_data[1]);
					refThis.title_tu = params.name;
					myChart2.setOption(option2);
				} else {
					refThis.Data.splice(0, 2, refThis.E_data[0], refThis.E_data[1]);
					refThis.title_tu = params.name;
					myChart2.setOption(option2);
				}
			});
			myChart2.setOption(option2);
			myChart1.setOption(option1);
			function disposeMap() { //销毁函数作为返回值返出去
				if (refThis.isDispose) {
					myChart2.dispose();
					myChart1.dispose();

				} else {//重绘函数作为返回值返出去
					myChart2.resize();
					myChart1.resize();
				}
			}
			return disposeMap
		}
	}
}
</script>

<style lang="scss" scoped>
/*顶部标题*/

.div_top {
	margin-top: 0.1rem;
	width: 100%;
	height: 0.58rem;
	background-image: url(../../../images/projck_nav.png);
	background-size: cover;
	.span_left {
		display: inline-block;
		margin-left: 0.4rem;
		color: #FFF;
		font-size: 0.16rem;
		width: 1rem;
		height: 0.58rem;
		line-height: 0.58rem;
	}
}



/*右边时间选择样式*/

.div_right {
	float: right;
	display: inline-block;
	width: 5rem;
	height: 0.58rem;
	line-height: 0.58rem;
	span {
		color: #70CCFC;
		font-size: 0.16rem;
	}
	.select {
		display: inline-block;
		vertical-align: top;
		width: 1.62rem;
		height: 0.38rem;
		border-radius: 0.05rem;
		background: rgba(255, 255, 255, 0);
		color: #FFF;
		margin-bottom: 0.06rem;
	}
	.time_select {
		vertical-align: middle;
		display: inline-block;
		margin-bottom: 0.06rem;
		width: 2.22rem;
		height: 0.6rem;
		margin-left: 0.1rem;
		border-radius: 0.05rem;
	}
}



/*中间内容部分*/

.div_content {
	width: 100%;
	height: 5.78rem;
	font-size: 0;
	.content_ul {
		height: 1.2rem;
		width: 100%;
		display: flex;
		li {
			flex: 1;
			height: 1.2rem;
			text-align: center;
			p {
				color: #fff;
				margin-top: 0.2rem;
				margin-bottom: 0.1rem;
			}
			span {
				color: #44d3e3;
				font-size: 0.34rem;
			}
		}
	}
	.content_left {
		margin-top: 0.08rem;
		width: 49.5%;
		height: 4.42rem;
		border-right: 0.01rem solid #70CCFC;
		display: inline-block;
		.letf_title {
			height: 0.4rem;
			line-height: 0.4rem;
			padding-left: 0.2rem;
			width: 100%;
			background-image: url(../../../images/projack_snav.png);
			background-size: cover;
			span {
				color: #fff;
				font-size: 0.16rem;
			}
		}
		.left_ul {
			height: 1rem;
			display: flex;
			dd {
				flex: 1;
				text-align: center;
				p {
					color: #fff;
					margin-top: 0.2rem;
					margin-bottom: 0.1rem;
				}
				span {
					color: #44d3e3;
					font-size: 0.34rem;
				}
			}
		}
		.chart1 {
			width: 100%;
			height: 3rem;
		}
	}
	.content_right {
		margin-top: 0.08rem;
		width: 50%;
		height: 4.42rem;
		display: inline-block;
		vertical-align: top;
		.right_title {
			height: 0.4rem;
			line-height: 0.4rem;
			padding-left: 0.2rem;
			width: 100%;
			background-image: url(../../../images/projack_snav.png);
			background-size: cover;
			span {
				color: #fff;
				font-size: 0.16rem;
			}
		}
		.right_ul {
			height: 1rem;
			display: flex;
			dd {
				flex: 1;
				text-align: center;
				p {
					color: #fff;
					margin-top: 0.2rem;
					margin-bottom: 0.1rem;
				}
				span {
					color: #44d3e3;
					font-size: 0.34rem;
				}
			}
		}
		.chart2 {
			width: 100%;
			height: 3rem;
			overflow: hidden;
		}
	}
}

.title_tu {
	display: inline-block;
	width: 1rem;
	height: 0.3rem;
	color: #fff;
	position: absolute;
	right: 15%;
	margin-top: 1.2%;
}



/*底部样式*/

.div_bottom {
	width: 100%;
	height: 0.58rem;
	background-image: url(../../../images/projck_nav.png);
	background-size: cover;
	span {
		display: inline-block;
		margin-left: 0.4rem;
		color: #FFF;
		font-size: 0.16rem;
		width: 4rem;
		height: 0.58rem;
		line-height: 0.58rem;
	}
}

.ul_bottom {
	width: 100%;
	height: 1.28rem;
	display: flex;
	li {
		flex: 1;
		height: 1.28rem;
		overflow: auto;
		text-align: center;
		p {
			color: darkgray;
			font-size: 0.16rem;
			margin-top: 0.2rem;
		}
		span {
			color: #70CCFC;
			font-size: 0.16rem;
		}
	}
}
</style>