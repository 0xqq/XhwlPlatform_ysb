<template>
	<div>
		<Bread :breadData="abc"></Bread>
			<div class="top_div">
				<span class="title">人行故障数据</span>
				<div class="top_right">
					<div class="boutton_div">
						<span class="chart_model" :class="{active: model=='chart', unactive: model == 'table'}" @click="choiseModel(0)">图表模式</span><!--  
					 --><span class="table_model" :class="{active: model=='table', unactive: model == 'chart'}" @click="choiseModel(1)">表格模式</span>
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
			<echarts-three1 :class="{hide: showSelf==1,chart2: showSelf=='0'}" :Text='noeText'
				 :Xvalue="Xvalue" :Legend="noeLegend" :Series="Series1">
			</echarts-three1>
			<echarts-three2 :class="{hide: showSelf==1,chart2: showSelf=='0'}" :Text='twoText'
				 :Xvalue="Xvalue" :Legend="twoLegend" :Series="Series2">
			</echarts-three2>
			<echarts-three3 :class="{hide: showSelf==1,chart2: showSelf=='0'}" :Text='threeText'
				 :Xvalue="Xvalue" :Legend="threeLegend" :Series="Series3">
			</echarts-three3>
			<echarts-two1 :class="{hide: showSelf==1,chart2: showSelf=='0'}" :Text='fourText'
				 :Xvalue="Xvalue" :Legend="fourLegend" :Series="Series4" :Unit="unit1" :PropsWith="width">
			</echarts-two1>
			<echarts-two2 :class="{hide: showSelf==1,chart2: showSelf=='0'}" :Text='fiveText'
				 :Xvalue="Xvalue" :Legend="fiveLegend" :Series="Series5" :Unit="unit2" :PropsWith="width">
			</echarts-two2>
			<echarts-two3 :class="{hide: showSelf==1,chart2: showSelf=='0'}" :Text='sixText'
				 :Xvalue="Xvalue" :Legend="sixLegend" :Series="Series6" :Unit="unit3" :PropsWith="width">
			</echarts-two3>	
			<div class="hide" :class="{table_big: showSelf=='1'}">
				<div class="table">
		            <table id="tableExcel" cellspacing="0" cellpadding="0">
		                <thead class="table_thead">
		                    <tr class="nav_table">
		                        <th class="left_none">城市</th>
		                        <th>服务器在线率</th>
		                        <th>服务器离线率</th>
		                        <th>门禁在线率</th>
		                        <th>门禁离线率</th>
		                        <th>访客工作站在线率</th>
		                        <th>访客工作站离线率</th>
		                        <th>控制器在线数</th>
		                        <th>控制器离线数</th>
		                        <th>访客机在线数</th>
		                        <th>访客机离线数</th>
		                        <th>通道闸在线数</th>
		                        <th>通道闸离线数</th>
		                        <th>读头在线数</th>
		                        <th>读头离线数</th>
		                        <th>发行器在线数</th>
		                        <th>发行器离线数</th>
		                        <th>摄像头在线数</th>
		                        <th>摄像头离线数</th>
		                    </tr>
		                </thead>
		                <tbody class="table_body">
		                    <tr v-for="(k,index) in conTents" :key="index" class="center_table">
		                        <td class="no_pading">{{k.plate}}</td>
		                        <td>{{k.amount}}</td>
		                        <td>{{k.Paidin}}</td>
		                        <td>{{k.treatment}}</td>
		                        <td>{{k.entrance}}</td>
		                        <td>{{k.appearance}}</td>
		                        <td>{{k.parking}}</td>
		                        <td>{{k.parking}}</td>
		                        <td>{{k.treatment}}</td>
		                        <td>{{k.treatment}}</td>
		                        <td>{{k.treatment}}</td>
		                        <td>{{k.treatment}}</td>
		                        <td>{{k.entrance}}</td>
		                        <td>{{k.appearance}}</td>
		                        <td>{{k.parking}}</td>
		                        <td>{{k.parking}}</td>
		                        <td>{{k.treatment}}</td>
		                        <td>{{k.treatment}}</td>
		                        <td>{{k.treatment}}</td>
		                    </tr>
		                </tbody>
		            </table>
		       </div>			
				<div class="page">
		            <span>每页显示</span>
		            <select class="select">
		                <option value="A">30</option>
		                <option value="B">20</option>
		                <option value="C">10</option>
		            </select>
		            <div class="pageDiv">
		                <img src="../../../../images/left_select.png" />
		                <span>1/1</span>
		                <img src="../../../../images/right_select.png" />
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
	import echartsTwo3 from '@/components/common/echarts1/2echarts_seven'
	import echartsThree1 from '@/components/common/echarts1/3echarts_six'
	import echartsThree2 from '@/components/common/echarts1/3echarts_nine'
	import echartsThree3 from '@/components/common/echarts1/3echarts_ten'
	export default {
  data () {
    return {
		abc:['数据应用','财务数据','出纳收支分析',"人行故障数据"],
		showSelf: 0,
		width:'99.8%',
		model: 'chart',
		Xvalue:['深圳', '北京', '上海', '广州', '佛山', '长春', '天津','长沙', '南京', '杭州', '厦门', '南宁', '武汉', '郑州','深圳', '北京', '上海', '广州', '佛山', '长春', '天津','长沙', '南京', '杭州', '厦门', '南宁', '武汉', '郑州','深圳', '北京', '上海', '广州', '佛山', '长春', '天津','长沙', '南京', '杭州', '厦门', '南宁', '武汉', '郑州','深圳', '北京', '上海', '广州', '佛山', '长春', '天津','长沙', '南京', '杭州', '厦门', '南宁'],
		//图表1数据-------------------------------------------------------------------------------------------------------
		noeText:"服务器故障分析",
		noeLegend:['在线率','离线率'],
		Series1:[{
            name:'离线率',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {}},
            itemStyle: {
	            normal: {
	                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0,color: 'rgba(220,67,39,0.9)' }, 
	                {offset: 0.8,color: 'rgba(255,143,61,0.5)'}])
	            }
	        },
            data:[20, 10, 30, 10, 20, 10, 20,20, 10, 30, 10, 20, 10, 20,20, 10, 30, 10, 20, 30, 20,20, 30, 30, 20, 20, 10, 20,20, 10, 30, 10, 20, 10, 20,20, 10, 30, 10, 20, 30, 20,20, 30, 30, 20, 30, 30, 20,20, 30, 30, 20, 20]
        },
        {   name:'在线率',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {}},
            itemStyle: {
	            normal: {
	                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0,color: 'rgba(27,105,208,0.9)'}, 
	                {offset: 0.8, color: 'rgba(27,105,208,0.5)'}])
	            }
	        },
            data:[20, 30, 10, 30, 20, 30, 20,20, 30, 10, 30, 20, 30, 20,20, 30, 10, 30, 20, 10, 20,20, 10, 10, 20, 20, 30, 20,20, 30, 10, 30, 20, 30, 20,20, 30, 10, 30, 20, 10, 20,20, 10, 10, 20, 10, 10, 20,20, 10, 10, 20, 20]
        }],
        //图表2数据-------------------------------------------------------------------------------------------------------
		twoText:"门禁故障分析",
		twoLegend:['在线率','离线率'],
		Series2:[{
            name:'离线率',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {}},
            itemStyle: {
	            normal: {
	                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0,color: 'rgba(220,67,39,0.9)' }, 
	                {offset: 0.8,color: 'rgba(255,143,61,0.5)'}])
	            }
	        },
            data:[20, 10, 30, 10, 20, 10, 20,20, 10, 30, 10, 20, 10, 20,20, 10, 30, 10, 20, 30, 20,20, 30, 30, 20, 20, 10, 20,20, 10, 30, 10, 20, 10, 20,20, 10, 30, 10, 20, 30, 20,20, 30, 30, 20, 30, 30, 20,20, 30, 30, 20, 20]
        },
        {   name:'在线率',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {}},
            itemStyle: {
	            normal: {
	                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0,color: 'rgba(27,105,208,0.9)'}, 
	                {offset: 0.8, color: 'rgba(27,105,208,0.5)'}])
	            }
	        },
            data:[20, 30, 10, 30, 20, 30, 20,20, 30, 10, 30, 20, 30, 20,20, 30, 10, 30, 20, 10, 20,20, 10, 10, 20, 20, 30, 20,20, 30, 10, 30, 20, 30, 20,20, 30, 10, 30, 20, 10, 20,20, 10, 10, 20, 10, 10, 20,20, 10, 10, 20, 20]
        }],
        //图表3数据-------------------------------------------------------------------------------------------------------
		threeText:"访客工作站故障分析",
		threeLegend:['在线率','离线率'],
		Series3:[{
            name:'离线率',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {}},
            itemStyle: {
	            normal: {
	                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0,color: 'rgba(220,67,39,0.9)' }, 
	                {offset: 0.8,color: 'rgba(255,143,61,0.5)'}])
	            }
	        },
            data:[20, 10, 30, 10, 20, 10, 20,20, 10, 30, 10, 20, 10, 20,20, 10, 30, 10, 20, 30, 20,20, 30, 30, 20, 20, 10, 20,20, 10, 30, 10, 20, 10, 20,20, 10, 30, 10, 20, 30, 20,20, 30, 30, 20, 30, 30, 20,20, 30, 30, 20, 20]
        },
        {   name:'在线率',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {}},
            itemStyle: {
	            normal: {
	                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0,color: 'rgba(27,105,208,0.9)'}, 
	                {offset: 0.8, color: 'rgba(27,105,208,0.5)'}])
	            }
	        },
            data:[20, 30, 10, 30, 20, 30, 20,20, 30, 10, 30, 20, 30, 20,20, 30, 10, 30, 20, 10, 20,20, 10, 10, 20, 20, 30, 20,20, 30, 10, 30, 20, 30, 20,20, 30, 10, 30, 20, 10, 20,20, 10, 10, 20, 10, 10, 20,20, 10, 10, 20, 20]
        }],
        //图表4数据--------------------------------------------------------------------------------------------
		fourText:"控制机故障分析",
		fourLegend:["在线数","离线数"],
		unit1:"人数",
		Series4:[{name: '在线数',
			type: 'bar',
			stack: 'one',
			barWidth: '45%',
			itemStyle: {
	            normal: {color: new echarts.graphic.LinearGradient( 0, 0, 0, 1, [{offset: 0,color: 'rgba(0,191,255,1)'}, 
	                {offset: 1,color: 'rgba(0,191,255,0.2)'}])}
	        },
			data: [150, 52, 200, 334, 390, 330, 220, 233, 150, 52, 200, 334, 390, 330, 220, 233, 150, 52, 200, 334, 390, 330, 220, 233, 150, 52, 200, 334, 390, 330, 220, 233, 150, 52, 200, 334, 390, 330, 220, 233, 150, 52, 200, 334, 390, 330, 220, 233, 200, 334, 390, 330, 220, 233]
		},
		{   name: '离线数',
			type: 'bar',
			stack: 'one',
			barWidth: '45%',
			itemStyle: {
	            normal: {color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0,color: 'rgba(211,201,39,0.9)'}, 
	                {offset: 0.8,color: 'rgba(236,255,25,0.5)'}])}
	        },
			data: [-56, -45, -43, -32, -76, -34, -67, -56, -56, -45, -43, -32, -76, -34, -67, -56, -56, -45, -43, -32, -76, -34, -67, -56, -56, -45, -43, -32, -76, -34, -67, -56, -56, -45, -43, -32, -76, -34, -67, -56, -56, -45, -43, -32, -76, -34, -67, -56, -43, -32, -76, -34, -67, -56]
		}],
		//图表5数据--------------------------------------------------------------------------------------------
		fiveText:"访客机故障分析",
		fiveLegend:["在线数","离线数"],
		unit2:"人数",
		Series5:[{name: '在线数',
			type: 'bar',
			stack: 'one',
			barWidth: '45%',
			itemStyle: {
	            normal: {color: new echarts.graphic.LinearGradient( 0, 0, 0, 1, [{offset: 0,color: 'rgba(0,191,255,1)'}, 
	                {offset: 1,color: 'rgba(0,191,255,0.2)'}])}
	        },
			data: [150, 52, 200, 334, 390, 330, 220, 233, 150, 52, 200, 334, 390, 330, 220, 233, 150, 52, 200, 334, 390, 330, 220, 233, 150, 52, 200, 334, 390, 330, 220, 233, 150, 52, 200, 334, 390, 330, 220, 233, 150, 52, 200, 334, 390, 330, 220, 233, 200, 334, 390, 330, 220, 233]
		},
		{   name: '离线数',
			type: 'bar',
			stack: 'one',
			barWidth: '45%',
			itemStyle: {
	            normal: {color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0,color: 'rgba(211,201,39,0.9)'}, 
	                {offset: 0.8,color: 'rgba(236,255,25,0.5)'}])}
	        },
			data: [-56, -45, -43, -32, -76, -34, -67, -56, -56, -45, -43, -32, -76, -34, -67, -56, -56, -45, -43, -32, -76, -34, -67, -56, -56, -45, -43, -32, -76, -34, -67, -56, -56, -45, -43, -32, -76, -34, -67, -56, -56, -45, -43, -32, -76, -34, -67, -56, -43, -32, -76, -34, -67, -56]
		}],
		//图表6数据--------------------------------------------------------------------------------------------
		sixText:"通道闸故障分析",
		sixLegend:["在线数","离线数"],
		unit3:"人数",
		Series6:[{name: '在线数',
			type: 'bar',
			stack: 'one',
			barWidth: '45%',
			itemStyle: {
	            normal: {color: new echarts.graphic.LinearGradient( 0, 0, 0, 1, [{offset: 0,color: 'rgba(0,191,255,1)'}, 
	                {offset: 1,color: 'rgba(0,191,255,0.2)'}])}
	        },
			data: [150, 52, 200, 334, 390, 330, 220, 233, 150, 52, 200, 334, 390, 330, 220, 233, 150, 52, 200, 334, 390, 330, 220, 233, 150, 52, 200, 334, 390, 330, 220, 233, 150, 52, 200, 334, 390, 330, 220, 233, 150, 52, 200, 334, 390, 330, 220, 233, 200, 334, 390, 330, 220, 233]
		},
		{   name: '离线数',
			type: 'bar',
			stack: 'one',
			barWidth: '45%',
			itemStyle: {
	            normal: {color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0,color: 'rgba(211,201,39,0.9)'}, 
	                {offset: 0.8,color: 'rgba(236,255,25,0.5)'}])}
	        },
			data: [-56, -45, -43, -32, -76, -34, -67, -56, -56, -45, -43, -32, -76, -34, -67, -56, -56, -45, -43, -32, -76, -34, -67, -56, -56, -45, -43, -32, -76, -34, -67, -56, -56, -45, -43, -32, -76, -34, -67, -56, -56, -45, -43, -32, -76, -34, -67, -56, -43, -32, -76, -34, -67, -56]
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
    computed:{
		...mapState(['contentSize','mnUrl']),       	
	},
    components: {
        Bread,
        echartsTwo1,
		echartsTwo2,
		echartsTwo3,
		echartsThree1,
		echartsThree2,
		echartsThree3
    },
	mounted(){
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
		getData(){
			this.$http({
				url:this.mnUrl+"/tmp/finance/overview",
				method:'get',
			}).then(function(res){
				
			
			},function(error){
			//失败回调的函数								
			console.log(error)
			})
		}    
    }
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin';
	/*可视区外框样式*/	
.Chart_div{
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
.chart2{
	color: white;
	width: 99.9%;
	height: 5.23rem;
	margin: 0 auto;
	margin-bottom: 0.05rem;
}
 /*顶部长条外框*/
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
	}
  	.top_right{
  		float: right;
  		width: 4.8rem;
  		height: 0.6rem;
  		.date-time {
			display: inline-block;
			width: 2.58rem;
			height: 0.6rem;
			color: #67bce9;
			outline: none;
			
			vertical-align: top; // margin-top:0.05rem;
			.el_picker{
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
.hide{
	display: none;
}
/*表格内容样式*/
.table_big{
	display: block;
	width: 100%;
	height: 7.25rem;	
    .table {
        width: 100%;
        height: 6.7rem;
        background-image: url(../../../../images/kaimen.png);
    	background-size: 100% 100%;
        overflow: hidden;
        scrollbar-base-color: #12253d; // 滚动条滑块按钮的颜色
        scrollbar-face-color: #184e7a; // 滚动条整体颜色
        scrollbar-track-color: #12253d;
        scrollbar-arrow-color: #12253d;
        table {
            width: 100%;
            height: 6.7rem;
            border: 0;
            .table_thead {
                display: inline-block;
                width: 100%;
                height: 0.4rem;
                overflow: hidden;
                background-color: #184e7a;
                .nav_table {
                    width: 100%;
                    height: 0.4rem;
                    text-align: center;
                    overflow: hidden;
                    background-image: url(../../../../images/kaimenNav.png);
                    background-size: 100% 100%;
                    display: flex;
                    align-items: center;
                    th {
                        flex: 1;
                        width: 0.6rem;
                        height:0.4rem;
                        line-height: 0.4rem;
                        border-left: 2px solid #698499;
                        display: inline-block;
                        font-size: 0.12rem;
                    }
                    .left_none {
                        border-left: none;
                        font-size: 0.12rem;
                    }
                }
            }
            .table_body {
                display: inline-block;
                width: 100%;
                height: 6.3rem;
                overflow: hidden;
                overflow-y: scroll;
                .center_table {
                    display: flex;
                    align-items: center; 
                    justify-content: space-around;
                    border-bottom: 2px solid #698499;
                    td {
                    	display: flex;
                        flex: 1;
                        height: auto;
                        justify-content: center;
                        align-items: center;
                        padding: 0.2rem 0;   
                        text-align: center;
                        display: inline-block;                     
                    }
                    .no_pading{
                    	padding: 0 0;
                    }
                }
            }
        }
    }	
}
.Hide{
	display: none !important;
}
/*换页部分*/
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