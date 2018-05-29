<template>
	<div class="centrerAirconditioning">
		<Bread :breadData="abcd"></Bread>
		<div class="nav">
			<p>
				<span class="whiteColor">空调机房</span>
				<span class="whiteColor_mr">(12)</span>
				<span class="colorBlue1">冷冻供回水总管温度</span>
				<span class="colorGreen">16</span>
				<span class="colorBlue">℃/</span>
				<span class="colorGreen">18.3</span>
				<span class="colorBlue">℃</span>
			</p>
		</div>
		<div class="content">
			<div class="left">
				<div class="left_top">
					<div class="left_top_1">
						<span id="left_top_1">冷水机&nbsp;&nbsp;(3)</span>
						<div id="left_top_2">
							<span class="whitecolor">冷冻机1#</span>
							<div class="img"></div>
							<span class="stop">停止</span>
						</div>
						<div id="left_top_3">
							<span class="whitecolor">冷冻机2#</span>
							<div class="img2">
								<div class="text">
									<span>195.2</span>
									<span>A</span>
								</div>
								<div class="text">
									<span>195.2</span>
									<span>A</span>
								</div>
								<div class="text">
									<span>195.2</span>
									<span>A</span>
								</div>
							</div>
							<span class="stop">停止</span>
						</div>
						<div id="left_top_4">
							<span class="whitecolor">冷冻机3#</span>
							<div class="img"></div>
							<span class="stop">停止</span>
						</div>
					</div>
					<div class="left_top_2">
						<span id="left_top_ldb">冷冻泵&nbsp;&nbsp;(3)</span>
						<div id="left_top_6">
							<span class="whitecolor">冷冻泵1#</span>
							<div class="img_1"></div>
							<span class="stop_1">停止</span>
						</div>
						<div id="left_top_7">
							<span class="whitecolor">冷冻泵2#</span>
							<div class="img_2"></div>
							<span class="stop_2">停止</span>
						</div>
						<div id="left_top_8">
							<span class="whitecolor">冷冻泵3#</span>
							<div class="img_3"></div>
							<span class="stop_3">停止</span>
						</div>
					</div>
				</div>
				<div class="left_bottom">
					<div class="left_bottom_1">
						<span id="left_top_1">冷却泵&nbsp;&nbsp;(3)</span>
						<div id="left_top_2">
							<span class="whitecolor">冷却泵1#</span>
							<div class="img3"></div>
							<span class="stop">停止</span>
						</div>
						<div id="left_top_3">
							<span class="whitecolor">冷却泵2#</span>
							<div class="img4">
							</div>
							<span class="stop">停止</span>
						</div>
						<div id="left_top_4">
							<span class="whitecolor">冷却泵3#</span>
							<div class="img5"></div>
							<span class="stop">停止</span>
						</div>
					</div>
					<div class="left_bottom_2">
						<span id="left_top_ldb">冷却塔&nbsp;&nbsp;(3)</span>
						<div id="left_top_6">
							<span class="whitecolor">1#冷却塔</span>
							<div class="img7"></div>
							<span class="stop_11">停止</span>
						</div>
						<div id="left_top_7">
							<span class="whitecolor">2#冷却塔</span>
							<div class="img7"></div>
							<span class="stop_22">停止</span>
						</div>
						<div id="left_top_8">
							<span class="whitecolor">3#冷却塔</span>
							<div class="img8"></div>
							<span class="stop_33">停止</span>
						</div>
					</div>
				</div>
			</div>
			<div class="right">
				<p class="p1">
					<span class="span1">安全运行</span>
					<span class="span2">90天</span>
				</p>
				<p>
					<span class="span3">告警：</span>
					<span class="span4">0</span>
					<span class="span5">已完成：</span>
					<span class="span6">90</span>
				</p>
				<p class="p2">
					<span class="span7_1">总数：</span>
					<span class="span7_2">55</span>
				</p>
				<p>
					<span class="span7">运行：</span>
					<span class="span8">32</span>
					<span class="span9">停止：</span>
					<span class="span7_3">23</span>
				</p>
				<div class="battery_bg">
					<span class="span7_4">4383</span>
					<span class="span7_5">kwh</span>
				</div>

				<div class="shebei">
					<div class="facilities_one" id="myChart4">
					</div>
					<span>设备完好率</span>

				</div>
				<div class="renyuan">
					<div class="facilities_two" id="myChart5">
					</div>
					<span>设备巡查率</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Bread from '@/components/common/bread'
import echarts from "echarts"
export default {
	data() {
		return {
			abcd: ['物联监控', '设备物联监控', '中央空调系统'],
			gauge_value: ''
		}
	},
	components: {
		Bread
	},
	mounted() {
		this.drawLine();
	},
	methods: {
		drawLine() {
			var myChart4 = echarts.init(document.getElementById('myChart4'));
			var myChart5 = echarts.init(document.getElementById('myChart5'));
			var gauge_value = '';   //能力值取代码置于值于此处   

			var option4 = {
				backgroundColor: 'rgba(255,255,255,0)',
				title: {
					show: true,
					x: "center",
					y: "60%",
					text: ' ',        //幸运值取代码置于值于此处
					//subtext: '幸运指数',
					textStyle: {
						fontSize: 16,
						fontWeight: 'bolder',
						fontStyle: 'normal',
						color: "#00B0F0"
					}
				},
				tooltip: {
					show: true,
					formatter: "{a}{b}：{c}",
					backgroundColor: 'rgba(255,255,255,0)',
					borderColor: '#0080FF',
					borderWidth: '1px',
					textStyle: {
						color: 'black'
					}
				},
				series: [{
					name: '能力',
					type: 'gauge',
					// startAngle: 180,
					// endAngle: 0,
					splitNumber: 10,     //刻度数量
					min: 0,
					max: 100,
					radius: '70%',      //图表尺寸
					axisLine: {
						show: true,
						lineStyle: {
							width: 3,
							shadowBlur: 0,
							color: [
								[0.2, '#00B0F0'],
								[0.8, '#00B0F0'],
								[1, '#00B0F0']
							]
						}
					},
					axisTick: {
						show: true,
						lineStyle: {
							color: "#00B0F0",
							width: 1
						},
						length: -5,
						splitNumber: 2
					},
					splitLine: {
						show: true,
						length: -10,
						lineStyle: {
							color: '#00B0F0'
						}
					},
					// 改文字到指针的距离
					axisLabel: {
						distance: -14,
						textStyle: {
							color: "#00B0F0",
							fontSize: "12",
						},
						formatter: function(e) {
							switch (e + "") {
								case "0":
									return "0";
								case "10":
									return "10";
								case "20":
									return "20";
								case "30":
									return "30";
								case "40":
									return "40";
								case "50":
									return "50";
								case "60":
									return "60";
								case "70":
									return "70";
								case "80":
									return "80";
								case "90":
									return "90";
								default:
									return e;
							}
						}
					},
					pointer: {
						show: true,
					},
					detail: {           //指针评价
						show: true,
						offsetCenter: [0, 0],
						textStyle: {
							fontSize: 16,
							color: "#C7FBFC"
						},

					},
					title: {
						textStyle: {
							fontSize: 30,
							fontWeight: 'bolder',
							fontStyle: 'normal',
							color: "#C7FBFC"
						},
						offsetCenter: [0, 14]
					},
					data: [{
						name: " ",
						value: Math.floor(gauge_value)
					}]
				}]
			};
			var option5 = {
				backgroundColor: 'rgba(255,255,255,0)',
				title: {
					show: true,
					x: "center",
					y: "60%",
					text: ' ',        //幸运值取代码置于值于此处
					//subtext: '幸运指数',
					textStyle: {
						fontSize: 16,
						fontWeight: 'bolder',
						fontStyle: 'normal',
						color: "#00B0F0"
					}
				},
				tooltip: {
					show: true,
					formatter: "{a}{b}：{c}",
					backgroundColor: 'rgba(255,255,255,0)',
					borderColor: '#0080FF',
					borderWidth: '1px',
					textStyle: {
						color: 'black'
					}
				},
				series: [{
					name: '能力',
					type: 'gauge',
					// startAngle: 180,
					// endAngle: 0,
					splitNumber: 10,     //刻度数量
					min: 0,
					max: 100,
					radius: '70%',      //图表尺寸
					axisLine: {
						show: true,
						lineStyle: {
							width: 3,
							shadowBlur: 0,
							color: [
								[0.2, '#00B0F0'],
								[0.8, '#00B0F0'],
								[1, '#00B0F0']
							]
						}
					},
					axisTick: {
						show: true,
						lineStyle: {
							color: "#00B0F0",
							width: 1
						},
						length: -5,
						splitNumber: 2
					},
					splitLine: {
						show: true,
						length: -10,
						lineStyle: {
							color: '#00B0F0'
						}
					},
					// 改文字到指针的距离
					axisLabel: {
						distance: -14,
						textStyle: {
							color: "#00B0F0",
							fontSize: "12",
						},
						formatter: function(e) {
							switch (e + "") {
								case "0":
									return "0";
								case "10":
									return "10";
								case "20":
									return "20";
								case "30":
									return "30";
								case "40":
									return "40";
								case "50":
									return "50";
								case "60":
									return "60";
								case "70":
									return "70";
								case "80":
									return "80";
								case "90":
									return "90";
								default:
									return e;
							}
						}
					},
					pointer: {
						show: true,
					},
					detail: {           //指针评价
						show: true,
						offsetCenter: [0, 0],
						textStyle: {
							fontSize: 16,
							color: "#C7FBFC"
						},

					},
					title: {
						textStyle: {
							fontSize: 30,
							fontWeight: 'bolder',
							fontStyle: 'normal',
							color: "#C7FBFC"
						},
						offsetCenter: [0, 14]
					},
					data: [{
						name: " ",
						value: Math.floor(gauge_value)
					}]
				}]
			};
			myChart4.setOption(option4);
			myChart5.setOption(option5);
		}
	}
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';
$padding_top: 0.1rem;
* {
	margin: 0;
	padding: 0;
}

.centrerAirconditioning {
	width: 100%;
	height: 8.96rem;
}

.nav {
	width: 100%;
	height: 0.6rem;
	line-height: 0.6rem;
	background: url(../../../images/title_box.png);
	background-size: cover;
}

.whiteColor,
.whiteColor_mr {
	color: white;
	font-size: 0.18rem;
}

.whiteColor {
	margin-left: 0.18rem;
	margin-right: 0.12rem;
}

.colorBlue1,
.colorGreen,
.colorBlue {
	font-size: 0.16rem;
}

.colorBlue1 {
	margin-left: 0.36rem;
	color: #83DBFF;
}

.colorGreen {
	color: #02ea0a;
}

.colorBlue {
	color: #83DBFF;
}

.content {
	width: 100%;
}

.left {
	width: 80%;
}

.left_top,
.left_bottom {
	width: 99.5%;
	height: 3.72rem;
	background: url(../../../images/title_box.png);
	background-size: cover;
	position: relative;
}

.left_top {
	margin-top: 0.03rem;
	margin-bottom: 0.06rem;
}

.right {
	width: 20%;
	height: 7.5rem;
	margin-top: 0.03rem;
	background: url(../../../images/title_box.png);
	background-size: cover;
	position: relative;
}

.left_top_1 {
	width: 61%;
	height: 2.66rem;
	position: absolute;
	top: 50%;
	margin-top: -1.33rem;
	display: flex;
}

.left_top_2 {
	width: 39%;
	height: 2.66rem;
	position: absolute;
	top: 50%;
	margin-top: -1.33rem;
	display: flex;
	left: 61%;
	text-align: center;
}


/*标题定位*/

#left_top_1 {
	color: white;
	font-size: 0.16rem;
	position: absolute;
	top: -0.31rem;
	left: 0.19rem;
	font-weight: bold;
}

#left_top_ldb {
	color: white;
	font-size: 0.16rem;
	position: absolute;
	top: -0.31rem;
	left: 0.32rem;
	font-weight: bold;
}

#left_top_3,
#left_top_2,
#left_top_4 {
	flex: 1;
	height: 2.66rem;
	text-align: center;
	position: relative;
}

#left_top_6,
#left_top_7,
#left_top_8 {
	flex: 1;
	margin: 0 auto;
	position: relative;
}

#left_top_4 {
	border-right: 1px solid #557b9a;
}

.whitecolor {
	color: white;
	margin-top: 0.4rem;
	display: inline-block;
}

.img {
	width: 1.4rem;
	height: 1.04rem;
	background: url(../../../images/ldjStop.png);
	margin-top: 0.42rem;
	position: absolute;
	left: 50%;
	margin-left: -0.7rem;
	background-size: cover;
}

.img2 {
	width: 1.4rem;
	height: 1.04rem;
	background: url(../../../images/ldjStop.png);
	margin-top: 0.42rem;
	position: absolute;
	left: 50%;
	margin-left: -1rem;
	background-size: cover;
}

.img_1,
.img_2 {
	width: 0.84rem;
	height: 1.2rem;
	background: url(../../../images/ldbSop.png);
	background-size: cover;
	position: absolute;
	left: 50%;
	transform: translate(-50%);
	margin-top: 0.34rem;
}

.img_3 {
	width: 0.84rem;
	height: 1.2rem;
	position: absolute;
	background: url(../../../images/ldbSop.png);
	background-size: cover;
	left: 50%;
	transform: translate(-50%);
	margin-top: 0.34rem;
}

.img3 {
	width: 0.83rem;
	height: 1.2rem;
	background: url(../../../images/lqbStop.png);
	background-size: c;
	margin-top: 0.42rem;
	position: absolute;
	left: 50%;
	transform: translate(-50%);
	margin-top: 0.34rem;
	background-size: cover;
}

.img4 {
	width: 0.83rem;
	height: 1.2rem;
	background: url(../../../images/lqbStop.png);
	margin-top: 0.42rem;
	position: absolute;
	left: 50%;
	transform: translate(-50%);
	margin-top: 0.34rem;
	background-size: cover;
}

.img5 {
	width: 0.83rem;
	height: 1.2rem;
	background: url(../../../images/lqbStop.png);
	margin-top: 0.42rem;
	position: absolute;
	left: 50%;
	transform: translate(-50%);
	margin-top: 0.34rem;
	background-size: cover;
}

.img6 {
	width: 1.03rem;
	height: 1.14rem;
	position: absolute;
	background: url(../../../images/tStop.png);
	background-size: cover;
	left: 50%;
	transform: translate(-50%);
	margin-top: 0.34rem;
}

.img7 {
	width: 1.03rem;
	height: 1.14rem;
	position: absolute;
	background: url(../../../images/tStop.png);
	background-size: cover;
	left: 50%;
	transform: translate(-50%);
	margin-top: 0.44rem;
}

.img8 {
	width: 1.03rem;
	height: 1.14rem;
	position: absolute;
	background: url(../../../images/tStop.png);
	background-size: cover;
	left: 50%;
	transform: translate(-50%);
	margin-top: 0.44rem;
}

.stop {
	display: block;
	color: white;
	position: relative;
	top: 1.75rem;
}

.stop_1 {
	position: absolute;
	bottom: 0rem;
	left: 0.65rem;
	color: white;
}

.stop_2 {
	position: absolute;
	bottom: 0rem;
	left: 0.65rem;
	color: white;
}

.stop_3 {
	position: absolute;
	bottom: 0rem;
	left: 0.65rem;
	color: white;
}

.text {
	display:inline-block;
	color: white;
	width: 0.8rem;
	height: 0.2rem;
	margin-left: 1.4rem;
	margin-top:0.1rem;
}

.text span:nth-of-type(2n-1) {

	color: #83DBFF;
	

}

.text span:nth-of-type(2n) {
	color: white;
}

.left_bottom_1 {
	width: 49.9%;
	height: 2.66rem;
	position: absolute;
	top: 50%;
	margin-top: -1.33rem;
	display: flex;
}

.left_bottom_2 {
	width: 50.1%;
	height: 2.66rem;
	position: absolute;
	top: 50%;
	margin-top: -1.33rem;
	display: flex;
	left: 49.9%;
	text-align: center;
}

.stop_11 {
	position: absolute;
	bottom: 0.07rem;
	left: 0.85rem;
	color: white;
}

.stop_22 {
	position: absolute;
	bottom: 0.07rem;
	left: 0.85rem;
	color: white;
}

.stop_33 {
	position: absolute;
	bottom: 0.07rem;
	left: 0.85rem;
	color: white;
}

.p1 {
	margin-top: 0.18rem;
	margin-bottom: 0.33rem;
}

.span1 {
	color: white;
	font-size: 0.18rem;
	margin-left: 0.64rem;
}

.span2 {
	color: white;
	font-size: 0.22rem;
}


/*下面的仪表图margin-left: 0.24rem;*/

.span3 {
	color: white;
	font-size: 0.16rem;
	margin-left: 0.24rem;
}

.span4 {
	color: red;
	font-size: 0.16rem;
	margin-right: 1.1rem;
}

.span5 {
	color: white;
	font-size: 0.16rem;
}

.span6 {
	color: #83DBFF;
	font-size: 0.16rem;
}

.p2 {
	margin-top: 0.25rem;
	margin-bottom: 0.25rem;
}

.span7,
.span7_1,
.span7_2,
.span7_3,
.span8,
.span9 {
	color: white;
}

.span7_1 {
	margin-left: 0.24rem;
}

.span7 {
	margin-left: 0.24rem;
}

.span8 {
	margin-right: 1.1rem;
}

.battery_bg {
	background: url(../../../images/batteryIcon.png) no-repeat;
	width: 1.8rem;
	height: 0.97rem;
	background-size: cover;
	margin-left: 25%;
	margin-top: 0.33rem;
	text-align: center;
	line-height: 0.97rem;
}

.span7_4,
.span7_5 {
	color: #78caec;
}

.shebei,
.renyuan {
	text-align: center;
}
.facilities_one {
                width: 1.75rem;
                height: 1.53rem;
                background: #fff;
                margin: 12px auto;
            }
            .facilities_two {
                width: 1.75rem;
                height: 1.53rem;
                background: #fff;
                margin: 10px auto;
            }

.shebei {
	margin-top: 0.25rem;
	margin-bottom: 0.2rem;
}

.shebei_1,
.renyuan_1 {
	width: 1.74rem;
	height: 1.53rem;
	border: 1px solid #000;
	margin-left: 25%;
	margin-bottom: 0.15rem;
}
</style>	