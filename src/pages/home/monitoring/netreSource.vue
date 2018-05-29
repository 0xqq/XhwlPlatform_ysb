<template>
	<div class="device">
		<Bread :breadData="abc"></Bread>
		<div class="nav_btn">
			<button class="btn1">近24小时</button>
			<button>近7天</button>
			<button>自定义</button>
			<div class="daytime">
				<div class="block">
					<span class="demonstration"></span>
					<el-date-picker v-model="value6" type="daterange" placeholder="输入日期范围">
					</el-date-picker>
				</div>
			</div>
			<img src="../../../images/inout.png" alt="">
		</div>
		<div id="myChart">
		</div>

	</div>
</template>
<script>
import echarts from "echarts"
import Bread from '@/components/common/bread'
import { mapState} from 'vuex'
export default {
	data() {
		return {
			abc: ['物联监控', '机房物联监控','网络资源监控'],
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
			valueList: [],
			valueList2:[],
			time:[],
			newarr:[]

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
		drawLine() {
			var myChart = echarts.init(document.getElementById('myChart'));
			var option = {
				tooltip: {
					trigger: 'axis'
				},
				backgroundColor: ['rgba(30,111,171,.5)'],
				xAxis: [{
					name:'时间',
					data:this.time, 
					axisLine: {
						lineStyle: {
							color: '#fff',
						}
					}
				}],
				yAxis: [{
					name:'MB/S',
					splitLine: { show: false },
					axisLine: {
						lineStyle: {
							color: '#fff',
						}
					}
				}],
				series: [{
					name: '外网入宽带',
					type: 'line',
					showSymbol: false,
					data: this.valueList,
					markPoint: {
						data: [
							{ type: 'max', name: '最大值' },
							{ type: 'min', name: '最小值' }
						]
					},
					itemStyle: {
						normal: {
							color: '	#1E90FF',
							
						}
					}
				},
				{
					name: "外网出宽带",
					type: 'line',
					showSymbol: false,
					data: this.valueList2,
					markPoint: {
						data: [
							{ type: 'max', name: '最大值' },
							{ type: 'min', name: '最小值' }
						]
					},
					itemStyle: {
						normal: {
							color: '#40E0D0',
						}
					}
				}]
			};
			myChart.setOption(option);

		},
		getData(){
				const url = this.mnUrl + "/tmp/watching/device/net"
				this.$http.get(url).then(res => {
					var value9=res.body.content	
					console.log(value9);
				for(var i=0;i<value9.length;i++){
					 this.newarr.push(value9[i].时间)
					this.time.push(this.newarr[i].substring(12,19));
					this.valueList.push(value9[i]["网络流入流速（KB/s）"]);
					this.valueList2.push(value9[i]["网络流出流速（KB/s）"]);
				}
				this.drawLine()
				},(err)=>{
					console.log(err);
				})
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
	.nav_btn {
		height: 0.6rem;
		width: 80%;
		margin:0 auto;
		position: relative;
		margin-bottom: 0.2rem;
		background: url(../../../assets/kaimenNav.png)no-repeat;
		background-size: cover;
		padding-top: 0.1rem;
		padding-left: 0.17rem;
		button {
			@include unactBt(1.54rem,0.4rem);
		}
		.btn1 {
			@include actBt(1.54rem,0.4rem);
		}
		.daytime {
			display: inline-block;
			width: 2.29rem;
			height: 0.36rem;
			vertical-align: top;
			margin-left: 0.5rem;
			@include ct;
		}
		img{
			 width: 0.21rem;
			 height: 0.21rem;
			 float:right;
			 margin-right:0.3rem;
			 margin-top:0.1rem;
		}
	}
	#myChart {
		width: 80%;
		height: 6.79rem; // background:url(../../../images/blue.png)no-repeat;
		// background-size:contain;
		margin: 0 auto; // @include center;
		
	}
}
</style>
