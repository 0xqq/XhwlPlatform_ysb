<template>
	<div>
		<Homenav :navData="route"></Homenav>
		<div class="div_top">
			<span class="span_left">{{year}}年{{month}}月中海华庭财务数据概览</span>
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
			<div class="content_left">
				<ul class="content_ul">
					<li>
						<p>收费应收总额(元)</p>
						<span>{{data1}}</span>
					</li>
					<li>
						<p>收费实收总额(元)</p>
						<span>{{data2}}</span>
					</li>
					<li>
						<p>应收实收差额(万元)</p>
						<span>{{data3}}</span>
					</li>
				</ul>
				<div id="myChart1" class="chart1"></div>
			</div>
			<div class="content_right">
				<div class="right_data">
					<p>支出总额(万元)</p>
					<span>{{data4}}</span>
				</div>
				<span class="title_tu">{{title_tu}}</span>
				<div id="myChart2" class="chart2"></div>
			</div>
		</div>
		<div class="div_bottom">
			<span>{{year}}年{{month}}月{{day}}日中海华庭财务人员考勤</span>
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
import { mapState } from 'vuex';
import echarts from 'echarts'
import Homenav from '@/components/common/projectHomeNav'
export default {
	data() {
		return {
			title_tu: '备用金',
			isDispose: false,  //判断是否销毁
			mapStatus: null,  //图表返回函数状态
			isFirst: true,
			value: '',
			all_title: ["停车场收费", "月卡收费", "储值卡收费", "临停收费"],
			all_DataS: [122600, 102500, 8000, 12100],
			all_DataR: [119600, 100500, 8000, 11100],
			cat_title: ["停车场收费", "月卡收费", "储值卡收费", "临停收费"],
			cat_Sdata: [122600, 102500, 8000, 12100], //停车场应收
			cat_Rdata: [119600, 100500, 8000, 11100], //停车场实收
			other_title: ['装修押金', '代收费'],
			other_dataS: [2600, 2600],
			other_dataR: [2200, 2200],

			Data: [2600, 1000, 1600],
			title: ["发放", "核销", '归还'],
			R_title: ["发放", "核销", '归还'],   //备用金
			R_data: [2600, 1000, 1600],
			C_title: ['物品采购', '活动费用'],  //费用报销
			C_data: [9600, 7000],
			B_title: ['停车场月卡', '储值费用', '装修押金'],  //退款支出
			B_data: [2400, 600, 2000],
			route: 'P_financialData',//向子组件传跳转路由
			options: [{
				value: '选项1',
				label: '自然年'
			}, {
				value: '选项2',
				label: '自然日'
			}],
			value: '',
			month:'',
			year:'',
			day:'',
			data1:'',
			data2:'',
			data3:'',
			data4:'',
		}
	},
	computed: {
		...mapState(['contentSize']),
	},
	components: {
		Homenav,
	},
	mounted() {
		this.getTime();
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
		getTime(){
			var Time = new Date();
			this.year = Time.getFullYear();
			this.month = Time.getMonth()+1;
			this.day =  Time.getDate();
			if(Time.getDate()<=9){
				this.day = '0'+Time.getDate();
			}
		},
		getData() {
			this.$http({
				url:"http://xhmind.com:5051/tmp/finance/project",
				method: 'get',
			}).then(function(res) {
				if(res.body.status){
					var value_Data =res.body.content;
					this.data1 = value_Data['收费应收总金额'];
					this.data2 = value_Data['收费实收总金额'];
					this.data3 = value_Data['应收实收差额'];
					this.data4 = value_Data['支出总金额'];
				}
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
			var myChart2 = echarts.init(document.getElementById('myChart2'));
			var myChart1 = echarts.init(document.getElementById('myChart1'));
			// 绘制图表
			var option1 = {
				color: ['#00BFFF', '#00FFFF', '#ADD8E6'], //柱体颜色
				textStyle: {
					color: '#fff',
				},
				tooltip: {
					trigger: 'item',
					formatter: "{b}:{d}%"
				},
				grid: {
					show: false,
					left: '50%',
					top: "22%",
					right: '10%',
					bottom: 'auto',
					width: '45%',
					height: '50%',
				},
				//	        backgroundColor:['rgba(30,144,255,0.15)'],
				legend: {
					data: ['应收', '实收'],
					left: 'auto',
					top: '15%',
					right: '32%',
					bottom: 'auto',
					textStyle: {
						color: '#fff',
						fontSize: 14,
					},
				},
				xAxis: {
					data: this.all_title,
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
					name: '应收',
					type: 'bar',
					data: this.all_DataS,
					barWidth: '13',     //柱型宽度
					itemStyle: {      //柱型圆角
						normal: {
							barBorderRadius: 10
						},
					}
				},
				{
					name: '实收',
					type: 'bar',
					data: this.all_DataR,
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
					radius: '58%',
					center: ['23%', '50%'],
					label: {
						normal: {
							show: true,
							position: 'inside'
						}
					},
					data: [
						{ value: 2600, name: '停车场实收' },
						{ value: 2600, name: '其他实收' }
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
			var option2 = {
				color: ['#00BFFF', '#00FFFF', '#ADD8E6', '#708090'], //柱体颜色
				textStyle: {
					color: '#fff',
				},
				tooltip: {
					trigger: 'item',
					formatter: "{b}:{d}%"
				},
				grid: {
					show: false,
					left: '50%',
					top: "15%",
					right: '10%',
					bottom: 'auto',
					width: '320',
					height: '220',
				},
				//	        backgroundColor:['rgba(30,144,255,0.15)'],

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
				series: [
					{
						name: '',
						type: 'bar',
						data: this.Data,
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
						radius: '58%',
						center: ['23%', '45%'],
						label: {
							normal: {
								show: true,
								position: 'inside'
							}
						},
						data: [
							{ value: 5200, name: '备用金' },
							{ value: 16600, name: '费用报销' },
							{ value: 5000, name: '退款支出' }
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
			myChart1.on('click', function(params) {
				if (params.name == '停车场实收') {
					refThis.all_DataS.splice(0, 4, refThis.cat_Sdata[0], refThis.cat_Sdata[1], refThis.cat_Sdata[2], refThis.cat_Sdata[3]);
					refThis.all_DataR.splice(0, 4, refThis.cat_Rdata[0], refThis.cat_Rdata[1], refThis.cat_Rdata[2], refThis.cat_Rdata[3]);
					refThis.all_title.splice(0, 4, refThis.cat_title[0], refThis.cat_title[1], refThis.cat_title[2], refThis.cat_title[3]);
					//		 				refThis.title_tu = params.name ;
					myChart1.setOption(option1);
				} else {
					refThis.all_DataS.splice(0, 4, refThis.other_dataS[0], refThis.other_dataS[1]);
					refThis.all_DataR.splice(0, 4, refThis.other_dataR[0], refThis.other_dataR[1]);
					refThis.all_title.splice(0, 4, refThis.other_title[0], refThis.other_title[1]);
					//		 				refThis.title_tu = params.name;
					myChart1.setOption(option1);
				}
			});
			myChart2.on('click', function(params) {
				if (params.name == '退款支出') {
					refThis.Data.splice(0, 3, refThis.B_data[0], refThis.B_data[1], refThis.B_data[2]);
					refThis.title.splice(0, 3, refThis.B_title[0], refThis.B_title[1], refThis.B_title[2]);
					refThis.title_tu = params.name;
					myChart2.setOption(option2);
				} else if (params.name == '备用金') {
					refThis.Data.splice(0, 3, refThis.R_data[0], refThis.R_data[1], refThis.R_data[2]);
					refThis.title.splice(0, 3, refThis.R_title[0], refThis.R_title[1], refThis.R_title[2]);
					refThis.title_tu = params.name;
					myChart2.setOption(option2);
				} else {
					refThis.Data.splice(0, 3, refThis.C_data[0], refThis.C_data[1]);
					refThis.title.splice(0, 3, refThis.C_title[0], refThis.C_title[1]);
					refThis.title_tu = params.name;
					myChart2.setOption(option2);
				}
			});
			myChart1.setOption(option1);
			myChart2.setOption(option2);
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
	},
}

</script>

<style lang="scss" scoped>
/*顶部标题*/

.div_top {
	margin-top: 0.1rem;
	width: 100%;
	height: 0.58rem;
	background-image: url(../../../../images/projck_nav.png);
	background-size: cover;
	.span_left {
		display: inline-block;
		margin-left: 0.4rem;
		color: #FFF;
		font-size: 0.16rem;
		width: 3rem;
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
	display: flex;
	.content_left {
		margin-top: 0.08rem;
		flex: 1;
		height: 5.62rem;
		border-right: 0.01rem solid #70CCFC;
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
		.chart1 {
			width: 100%;
			height: 4.4rem;
		}
	}
	.content_right {
		margin-top: 0.08rem;
		flex: 1;
		height: 5.62rem;
		.right_data {
			width: 2.3rem;
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
		.chart2 {
			width: 100%;
			height: 4.2rem;
		}
	}
}

.title_tu {
	display: inline-block;
	width: 1rem;
	height: 0.3rem;
	color: #fff;
	position: absolute;
	right: 21%;
	margin-top: 1.2%;
}


/*底部样式*/

.div_bottom {
	width: 100%;
	height: 0.58rem;
	background-image: url(../../../../images/projck_nav.png);
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