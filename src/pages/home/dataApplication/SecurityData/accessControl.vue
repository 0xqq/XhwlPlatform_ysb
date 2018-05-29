<template>
	<div class="parkOut">
		<Bread :breadData="abcd"></Bread>
		<div class="top_div">
				<span class="title">门禁出入行为数据</span>
				<div class="top_right">
					<div class="boutton_div">
						<span class="chart_model" :class="{active: model=='chart', unactive: model == 'table'}" @click="choiseModel(0)">图表模式</span><!--  
					 --><span class="table_model" :class="{active: model=='table', unactive: model == 'chart'}" @click="choiseModel(1)">表格模式</span>
					</div>
					<div class="date_time">
						<div class="block">
							<span class="demonstration"></span>
							<all-Picker class="picker"></all-Picker>
						</div>
					</div>
					<a class="inout_a" :class="{Hide: showSelf==0}" href="javascript:void(0);" @click="method55('tableExcel')"></a>
				</div>				
			</div>
		<!-- 图表-->
		<div :class="{hide: showSelf==1,chart2: showSelf=='0'}" class="big_echarts">
			<echarts-two1 :class="{hide: showSelf==1,chart2: showSelf=='0'}" :Text='noeText'
				 :Xvalue="Xvalue" :Legend="noeLegend" :Series="Series1" :Unit="unit1" :PropsWith="width">
			</echarts-two1>														
			<echarts-two2 :class="{hide: showSelf==1,chart2: showSelf=='0'}" :Text='twoText'
				 :Xvalue="Xvalue" :Legend="twoLegend" :Series="Series2" :Unit="unit2" :PropsWith="width">
			</echarts-two2>
			<echarts-two3 :class="{hide: showSelf==1,chart2: showSelf=='0'}" :Text='threeText'
				 :Xvalue="Xvalue" :Legend="threeLegend" :Series="Series3" :Unit="unit3" :PropsWith="width">
			</echarts-two3>
			<echarts-three1 :class="{hide: showSelf==1,chart2: showSelf=='0'}" :Text='fourText'
				 :Xvalue="Xvalue" :Legend="fourLegend" :Series="Series4">
			</echarts-three1>
		</div>
		<!--表格主体-->
		<div class="head_nav hide" :class="{table_big: showSelf=='1'}">
			<table cellpadding="0" cellspacing="0" id="tableExcel">
				<thead>
					<tr class="nav_table">
						<th class="border_left">时间</th>
						<th>业主入流量(人)</th>
						<th>业主出流量(人)</th>
						<th>访客入流量(人)</th>
						<th>访客出流量(人)</th>
						<th>滞留人员数(人)</th>
						<th>app开门(次)</th>
						<th>App开门占比</th>
						<th>指纹开门(次)</th>
						<th>指纹开门占比</th>
						<th>刷卡开门(次)</th>
						<th>刷卡开门占比</th>
						<th>管理卡开门(次)</th>
						<th>管理卡开门占比</th>
						<th>二维码开门(次)</th>
						<th>二维码开门占比</th>
					</tr>
				</thead>
				<tbody class="center_table">
					<tr>
						<td>1</td>
						<td>1</td>
						<td>1</td>
						<td>1</td>
						<td>1</td>
						<td>1</td>
						<td>1</td>
						<td>1</td>
						<td>1</td>
						<td>1</td>
						<td>1</td>
						<td>1</td>
						<td>1</td>
						<td>1</td>
						<td>1</td>
						<td>1</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="page">
			<span>每页显示</span>
			<select class="select">
				<option value="A">10</option>
				<option value="B">20</option>
				<option value="C">30</option>
			</select>
			<div class="pageDiv">
				<img src="../../../../images/left_select.png" />
				<span>1/1</span>
				<img src="../../../../images/right_select.png" />
			</div>
		</div>
	</div>
</template>
<script>
import Bread from '@/components/common/bread'
import allPicker from '@/components/common/allPicker'
import echartsTwo1 from '@/components/common/echarts1/2echarts_five'
import echartsTwo2 from '@/components/common/echarts1/2echarts_eight'
import echartsTwo3 from '@/components/common/echarts1/2echarts_seven'
import echartsThree1 from '@/components/common/echarts1/3echarts_six'
import { mapState, mapMutations } from 'vuex'
import echarts from 'echarts'
export default {
	data() {
		return {
			abcd: ['数据应用', '安防数据', '行为数据数据分析', '门禁出入行为数据'],
			model: 'chart',
			width:'99.8%',
			inputValue: null,
			showSelf: 0,
			model: 'chart',
			Xvalue:['深圳', '北京', '上海', '广州', '佛山', '长春', '天津','长沙', '南京', '杭州', '厦门', '南宁', '武汉', '郑州','深圳', '北京', '上海', '广州', '佛山', '长春', '天津','长沙', '南京', '杭州', '厦门', '南宁', '武汉', '郑州','深圳', '北京', '上海', '广州', '佛山', '长春', '天津','长沙', '南京', '杭州', '厦门', '南宁', '武汉', '郑州','深圳', '北京', '上海', '广州', '佛山', '长春', '天津','长沙', '南京', '杭州', '厦门', '南宁'],
			//图表1数据--------------------------------------------------------------------------------------------
			noeText:"业主出入流量分析",
			noeLegend:["业主入流量","业主出流量"],
			unit1:"人数",
			Series1:[{name: '业主入流量',
				type: 'bar',
				stack: 'one',
				barWidth: '45%',
				itemStyle: {
		            normal: {color: new echarts.graphic.LinearGradient( 0, 0, 0, 1, [{offset: 0,color: 'rgba(0,191,255,1)'}, 
		                {offset: 1,color: 'rgba(0,191,255,0.2)'}])}
		        },
				data: [150, 52, 200, 334, 390, 330, 220, 233, 150, 52, 200, 334, 390, 330, 220, 233, 150, 52, 200, 334, 390, 330, 220, 233, 150, 52, 200, 334, 390, 330, 220, 233, 150, 52, 200, 334, 390, 330, 220, 233, 150, 52, 200, 334, 390, 330, 220, 233, 200, 334, 390, 330, 220, 233]
			},
			{   name: '业主出流量',
				type: 'bar',
				stack: 'one',
				barWidth: '45%',
				itemStyle: {
		            normal: {color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0,color: 'rgba(211,201,39,0.9)'}, 
		                {offset: 0.8,color: 'rgba(236,255,25,0.5)'}])}
		        },
				data: [-56, -45, -43, -32, -76, -34, -67, -56, -56, -45, -43, -32, -76, -34, -67, -56, -56, -45, -43, -32, -76, -34, -67, -56, -56, -45, -43, -32, -76, -34, -67, -56, -56, -45, -43, -32, -76, -34, -67, -56, -56, -45, -43, -32, -76, -34, -67, -56, -43, -32, -76, -34, -67, -56]
			}],
			//图表2数据--------------------------------------------------------------------------------------------
			twoText:"访客出入流量分析",
			twoLegend:["访客入流量","访客出流量"],
			unit2:"人数",
			Series2:[{name: '访客入流量',
				type: 'bar',
				stack: 'one',
				barWidth: '45%',
				itemStyle: {
		            normal: {color: new echarts.graphic.LinearGradient( 0, 0, 0, 1, [{offset: 0,color: 'rgba(0,191,255,1)'}, 
		                {offset: 1,color: 'rgba(0,191,255,0.2)'}])}
		        },
				data: [150, 52, 200, 334, 390, 330, 220, 233, 150, 52, 200, 334, 390, 330, 220, 233, 150, 52, 200, 334, 390, 330, 220, 233, 150, 52, 200, 334, 390, 330, 220, 233, 150, 52, 200, 334, 390, 330, 220, 233, 150, 52, 200, 334, 390, 330, 220, 233, 200, 334, 390, 330, 220, 233]
			},
			{   name: '访客出流量',
				type: 'bar',
				stack: 'one',
				barWidth: '45%',
				itemStyle: {
		            normal: {color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0,color: 'rgba(211,201,39,0.9)'}, 
		                {offset: 0.8,color: 'rgba(236,255,25,0.5)'}])}
		        },
				data: [-56, -45, -43, -32, -76, -34, -67, -56, -56, -45, -43, -32, -76, -34, -67, -56, -56, -45, -43, -32, -76, -34, -67, -56, -56, -45, -43, -32, -76, -34, -67, -56, -56, -45, -43, -32, -76, -34, -67, -56, -56, -45, -43, -32, -76, -34, -67, -56, -43, -32, -76, -34, -67, -56]
			}],
			 //图表3数据------------------------------------------------------------------------------------------------------
	        threeText:"开门方式分析",
			threeLegend:['APP开门','指纹开门','刷卡开门'],
			unit3:"次",
			Series3:[{name:'APP开门',
		            type:'bar',
		            stack: '总量',
		            barWidth: '45%',
		            itemStyle: {
			            normal: {
			                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0,color: 'rgba(239,107,51,1)'}, 
			                { offset: 1,color: 'rgba(239,107,51,0.5)'}])
			            }
			        },
		            data:[150, 52, 200, 334, 390, 330, 220,233,364,64,352,46,98,75,150, 52, 200, 334, 390, 330, 220,233,364,64,352,46,98,75,150, 52, 200, 334, 390, 330, 220,233,364,64,352,46,98,75,150, 52, 200, 334, 390, 330, 220,233,364,64,352,46]
		        },
		    	{
		            name:'指纹开门',
		            type:'bar',
		            stack: '总量',
		            barWidth: '45%',
		            itemStyle: {
			            normal: {
			                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0,color: 'rgba(46,168,80,1)'}, 
			                {offset: 1,color: 'rgba(46,168,80,0.5)'}])
			            }
			        },
		            data:[120, 52, 200, 334, 390, 330, 220,233,264,64,252,46,98,75,120, 52, 200, 334, 390, 330, 220,233,264,64,352,46,98,75,120, 52, 200, 334, 390, 330, 220,233,264,64,252,46,98,75,120, 52, 200, 334, 390, 330, 220,233,264,64,352,46]
		        },
		    	{
		            name:'刷卡开门',
		            type:'bar',
		            stack: '总量',
		            barWidth: '45%',
		            itemStyle: {
			            normal: {
			                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0,color: 'rgba(51,152,219,1)'}, 
			                {offset: 1,color: 'rgba(51,152,219,0.5)'}])
			            }
			        },
		            data:[150, 52, 200, 334, 390, 330, 220,233,264,64,252,46,98,75,150, 52, 200, 334, 390, 330, 220,233,264,64,252,46,98,75,120, 52, 200, 334, 390, 330, 220,233,264,64,252,46,98,75,120, 52, 200, 334, 390, 330, 220,233,264,64,352,46]
		        }],
		    //图表4数据-------------------------------------------------------------------------------------------------------
			fourText:"开门方式分析",
			fourLegend:['APP开门占比','指纹开门占比','刷卡开门占比','管理卡开门占比','二维码开门占比'],
			Series4:[{
	            name:'APP开门占比',
	            type:'line',
	            stack: '总量',
	            areaStyle: {normal: {}},
	            itemStyle: {
		            normal: {
		                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0,color: 'rgba(220,67,39,0.9)' }, 
		                {offset: 0.8,color: 'rgba(255,143,61,0.5)'}])
		            }
		        },
	            data:[20, 10, 30, 10, 20, 10, 20,20, 10, 30, 10, 20, 10, 20,20, 10, 30, 10, 20, 10, 20,20, 10, 30, 10, 20, 10, 20,20, 10, 30, 10, 20, 10, 20,20, 10, 30, 10, 20, 10, 20,20, 10, 30, 10, 20, 10, 20,20, 10, 30, 10, 20]
	        },
	        {   name:'指纹开门占比',
	            type:'line',
	            stack: '总量',
	            areaStyle: {normal: {}},
	            itemStyle: {
		            normal: {
		                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0,color: 'rgba(33,212,54,0.9)'}, 
		                {offset: 0.8, color: 'rgba(61,255,157,0.5)'}])
		            }
		        },
	            data:[20, 10, 10, 20, 10, 10, 20,20, 10, 10, 20, 10, 10, 20,20, 10, 10, 20, 10, 10, 20,20, 10, 10, 20, 10, 10, 20,20, 10, 10, 20, 10, 10, 20,20, 10, 10, 20, 10, 10, 20,20, 10, 10, 20, 10, 10, 20,20, 10, 10, 20, 10]
	        },
	        {   name:'刷卡开门占比',
	            type:'line',
	            stack: '总量',
	            areaStyle: {normal: {}},
	            itemStyle: {
		            normal: {
		                color: new echarts.graphic.LinearGradient( 0, 0, 0, 1, [{offset: 0,color: 'rgba(27,105,208,0.9)'}, 
		                {offset: 0.8,color: 'rgba(46,166,226,0.5)'}])
		            }
		        },
	            data:[10,30, 10, 20, 20, 30, 10,10,30, 10, 20, 20, 30, 10,10,30, 10, 20, 20, 30, 10,10,30, 10, 20, 20, 30, 10,10,30, 10, 20, 20, 30, 10,10,30, 10, 20, 20, 30, 10,10,30, 10, 20, 20, 30, 10,10,30, 10, 20, 20]
	        },
	        {   name:'管理卡开门占比',
	            type:'line',
	            stack: '总量',
	            areaStyle: {normal: {}},
	            itemStyle: {
		            normal:{
		                color: new echarts.graphic.LinearGradient( 0, 0, 0, 1, [{ offset: 0,color: 'rgba(211,201,39,0.9)'}, 
		                {offset: 0.8,color: 'rgba(236,255,25,0.5)'}])
		            }
		        },
	            data:[20, 30, 30, 10, 30, 10, 20,20, 30, 30, 10, 30, 10, 20,20, 30, 30, 10, 30, 10, 20,20, 30, 30, 10, 30, 10, 20,20, 30, 30, 10, 30, 10, 20,20, 30, 30, 10, 30, 10, 20,20, 30, 30, 10, 30, 10, 20,20, 30, 30, 10, 30]
	        },
	        {   name:'二维码开门占比',
	            type:'line',
	            stack: '总量',
	            areaStyle: {normal: {}},
	            itemStyle: {
		            normal: {
		                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0,color: 'rgba(96,0,255,0.9)'}, 
		                { offset: 0.8, color: 'rgba(163,107,252,0.5)'}])
		            }
		        },
	            data:[30, 20, 20, 40, 20, 40, 30,30, 20, 20, 40, 20, 40, 30,30, 20, 20, 40, 20, 40, 30,30, 20, 20, 40, 20, 40, 30,30, 20, 20, 40, 20, 40, 30,30, 20, 20, 40, 20, 40, 30,30, 20, 20, 40, 20, 40, 30,30, 20, 20, 40, 20]
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
	    echartsThree1
	},
	mounted() {
		//初始化时获取数据
		 this.getData();
	},
	methods: {	
	    method55(tableExcel) {
	        this.$func.method5(tableExcel)
	    },
	  	choiseModel(num){
			if(num==0){
				this.showSelf=0;
				this.model = 'chart';
				this.$store.commit('CHANGE_SIZE');
			}else if(num==1){
				this.showSelf=1;
				this.model = 'table';
			}
		},
		getValue(value){
			this.inputValue = value;
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
		 }
	}
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin';
.chart2 {
	color: white;
	width: 99.9%;
	height: 5.23rem;
	margin: 0 auto;
	margin-bottom: 0.05rem;
}

.parkOut {
	vertical-align: top;
	width: 100%;
	height: 8.96rem;
	display: inline-block;
	.device-nav {
		display: inline-block;
		height: 0.6rem;
		width: 100%;
		background: url(../../../../assets/kaimenNav.png)no-repeat;
		background-size: 100% 100%; // padding-bottom: 0.5rem;
		margin-bottom: 0.08rem;
	}
}

.head_nav {
	width: 100%;
	height: 6.2rem;
	background-image: url(../../../../images/kaimen.png);
	background-size: cover;
}

.big_echarts {
	width: 100%;
	height: 7.55rem;
	overflow-y: auto;
	margin: 0 auto;
	scrollbar-base-color: #12253d; // 滚动条滑块按钮的颜色
	scrollbar-face-color: #184e7a; // 滚动条整体颜色
	scrollbar-track-color: #12253d;
	scrollbar-arrow-color: #12253d;
}

.top_div{
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
	  	margin-left: 0.4rem;
	}
  	.top_right{
  		float: right;
  		width: 4.8rem;
  		height: 0.6rem;
		 position: relative;;
  		.date_time {
			display: inline-block;
			width: 2.58rem;
			height: 0.6rem;
			color: #67bce9;
			outline: none;
			
			vertical-align: top; // margin-top:0.05rem;
			.picker{
				display: inline-block;
				width: 2.58rem;
				height: 0.33rem;
				font-size:0.14rem;
			}
		}
		/*按钮样式*/
		.boutton_div{
			line-height: 0.33rem;
			margin-top: 0.125rem;
			display: inline-block;
			.active{
				@include actBt(0.85rem, 0.33rem);
				}
			.unactive{
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

.table_big {
	display: block;
}

thead>.nav_table {
	width: 100%;
	th {
		width: 6.5%;
		height: 0.5rem;
		border-left: 2px solid #698499;
		font-size: 0.12rem;
		text-align: center;
		background-image: url(../../../../images/kaimenNav.png);
		background-size: cover;
	}
	.border_left {
		border-left: none;
		width: 4.3%;
	}
}

.center_table>tr {

	text-align: center;
	td {
		border-bottom: 2px solid #698499;
		height: 0.6rem;
		line-height: 0.6rem;
	}
}
.Hide{
	display: none !important;
}
.page {
	line-height: 0.6rem;
	width: auto;
	height: 0.6rem;
	background-image: url(../../../../images/kaimen.png);
	background-size: 100% 100%;
	float: right;
	margin-top: 0.2rem;
	margin-right: 0.25rem;
	padding-right: 0.1rem;
}

.page>span {
	color: #70ccfc;
	margin-left: 0.2rem;
}

.select {
	text-align: center;
	width: 0.61rem;
	height: 0.35rem;
	background: darkgray;
	background-image: url(../../../../images/kaimen.png);
	color: white;
	padding-left: 0.15rem;
}

.pageDiv {
	display: inline-block;
	margin-left: 0.15rem;
	span {
		color: #83dbff;
		margin: 0 0.15rem;
	}
	img {
		width: 0.1rem;
		height: 0.22rem;
		@include aa;
	}
}

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
</style>