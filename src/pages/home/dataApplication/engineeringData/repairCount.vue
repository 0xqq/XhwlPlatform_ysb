<template>
	<div class="attendanceData">
		<Bread :breadData="abc"></Bread>
			<div class="top_div">
				<span class="title">维修服务统计</span>
				<div class="top_right">
					<div class="boutton_div">
						<span class="chart_model" :class="{active: model=='chart', unactive: model == 'table'}" @click="choiseModel(0)">图表模式</span><!--  
					 --><span class="table_model" :class="{active: model=='table', unactive: model == 'chart'}" @click="choiseModel(1)">表格模式</span>
					</div>
					<div class="date_time">
						<div class="block">
							<span class="demonstration"></span>
							<all-picker class="picker" @timeValue=""></all-picker>
						</div>
					</div>
					<a class="inout_a" :class="{Hide: showSelf==0}" href="javascript:void(0);" @click="method55('tableExcel')"></a>
				</div>				
			</div>
		<div class="Chart_div">
			<echarts-two1 :class="{hide: showSelf==1,chart2: showSelf=='0'}" :Text='noeText'
				 :Xvalue="Xvalue" :Legend="noeLegend" :Series="Series1" :Unit="unit1" :PropsWith="width">
			</echarts-two1>
			<echarts-four1 :class="{hide: showSelf==1,chart2: showSelf=='0'}" :Text='twoText'
				 :Xvalue="Xvalue" :Legend="twoLegend" :Series="Series2" :Unit1="unit_l" :Unit2="unit_r">
			</echarts-four1>																																																																					
			<div class="hide" :class="{table_big: showSelf=='1'}">
				<div class="fixed_table" >
					<table cellpadding="0" cellspacing="0">
						<thead>
		                    <tr class="fixed_nav">
		                        <th class="left_none" rowspan="2">时间</th>
								<th rowspan="2">工区维修服务完成率</th>
								<th rowspan="2">利润</th>
								<th colspan="3">入户有偿维修服务</th>
		                    </tr>
		                    <tr class="fixed_nav">
								<th class="border-top">成本</th>
								<th class="border-top">工单数</th>
		                    </tr>
		                </thead>
					</table>
				</div>
				<div class="table">
		            <table id="tableExcel" cellspacing="0" cellpadding="0">
		                <thead class="nav_table">
		                    <tr class="fixed_nav">
		                        <th class="left_none" rowspan="2">时间</th>
								<th rowspan="2">工区维修服务完成率</th>
								<th rowspan="2">利润</th>
								<th colspan="3">入户有偿维修服务</th>
		                    </tr>
		                    <tr class="fixed_nav">
								<th class="border-top">成本</th>
								<th class="border-top">工单数</th>
		                    </tr>
		                </thead>
		                <tbody class="center_table">
		                    <tr v-for="(k,index) in conTents" :key="index">
		                        <td  class="left_none">{{k.plate}}</td>
		                        <td>{{k.amount}}</td>
		                        <td>{{k.Paidin}}</td>
		                        <td>{{k.treatment}}</td>
		                        <td>{{k.entrance}}</td>
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
	import echartsTwo1 from '@/components/common/echarts1/2echarts_eight'
	import echartsFour1 from '@/components/common/echarts1/4echarts_four'
	export default {
    data () {
	    return {
			abc: ['数据分析', '工程数据', '维修服务统计'],
			model: 'chart',
			width:'99.8%',
			inputValue: null,
			showSelf: 0,
			model: 'chart',
			Xvalue:['深圳', '北京', '上海', '广州', '佛山', '长春', '天津','长沙', '南京', '杭州', '厦门', '南宁', '武汉', '郑州','深圳', '北京', '上海', '广州', '佛山', '长春', '天津','长沙', '南京', '杭州', '厦门', '南宁', '武汉', '郑州','深圳', '北京', '上海', '广州', '佛山', '长春', '天津','长沙', '南京', '杭州', '厦门', '南宁', '武汉', '郑州','深圳', '北京', '上海', '广州', '佛山', '长春', '天津','长沙', '南京', '杭州', '厦门', '南宁'],
			//图表1数据---------------------------------------------------------------------------------------------------------
			noeText:"公区维修服务完成率",
			noeLegend:"",
			unit1:"百分比",
			Series1: [{
	            name:'公区维修服务完成率',
	            type:'bar',
	            barWidth: '45%',
	            data:[150, 52, 200, 334, 390, 330, 220,233,364,64,352,46,98,75,150, 52, 200, 334, 390, 330, 220,233,364,64,352,46,98,75,150, 52, 200, 334, 390, 330, 220,233,364,64,352,46,98,75,150, 52, 200, 334, 390, 330, 220,233,364,64,352,46]
	        }],
	        //图表2数据---------------------------------------------------------------------------------------------------------
			twoText:"入户有偿维修服务统计",
			twoLegend:['利润','成本','工单数'],
			unit_l:"成本/利润",
			unit_r:"工单数",
			Series2: [{
			        name: '工单数',
			        type: 'bar',
			        barWidth: '45%',
			        itemStyle: {
			            normal: {
			                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0,color: 'rgba(0,191,255,0.9)'},
			                    {offset: 0.8,color: 'rgba(0,191,255,0.4)'}])}
			        	},
			        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 86.6, 62.2, 32.6, 20.0, 6.4, 3.3,2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 86.6, 62.2, 32.6, 20.0, 6.4, 3.3,2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 86.6, 62.2, 32.6, 20.0, 6.4, 3.3,2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 86.6, 62.2, 32.6, 20.0, 6.4, 3.3,2.0, 4.9, 7.0, 23.2, 25.6, 76.7]
			    }, {
			        name: '利润',
			        type: 'line',
			        yAxisIndex: 1,
			        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3,2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3,2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3,2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3, 175.6, 182.2, 48.7, 18.8, 48.7, 18.8]
			    }, {
			        name: '成本',
			        type: 'line',
			        yAxisIndex: 1,
			        data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2,2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2,2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2,2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2, 20.3, 23.4, 23.0, 16.5, 6.2, 20.3,]
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
		echartsTwo1,
		echartsFour1
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
	width: 99.5%;
	height: 5.23rem;
	margin: 0 auto;
	margin-bottom: 0.05rem;
}
.attendanceData{
		vertical-align: top;	
		width: 100%;
		height: 8.96rem;
		display: inline-block;
		position: relative;
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
  		height: 0.6rem;;
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
		/*顶部按钮样式*/
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
	height: 7rem;	
    .table {
        width: 100%;
        height: 6.2rem;
        background-image: url(../../../../images/kaimen.png);
        background-size: 100% 100%;
      	overflow-y: scroll;
        table {
            width: 100%;
            .nav_table {
                height: 0.4rem;
                background-image: url(../../../../images/kaimenNav.png);
                background-size: 100% 100%;
              	visibility:hidden;
                th {
                    width: 20%;
                    height: 0.4rem;
                    line-height: 0.4rem;
                    text-align: center;
                    border-left: 2px solid #698499;
                }
                .left_none {
                    border-left: none;
                }
                .border-top{
                	 border-top: 2px solid #698499;
                }
                
            }            
	        .center_table>tr{
            	width: 100%;
                align-items: center;
                text-align: center;
                td {
                	height:0.8rem;
                    width: 20%;
                    border-bottom: 2px solid #698499;
                }
                .left_none {
                    border-left: none;
                }
            }
        }
    }
    .table_big{
    	display: block;
    }
	.fixed_table>table{
		position: absolute;
		width: 100%;
		height: 0.4rem;
		 background-color: #184e7a;
        background-image: url(../../../../images/kaimenNav.png);
        background-size: 100% 100%;
		tr{
       		width: 100%;
       		th{
	        	width: 20%;
	            height: 0.4rem;
	            line-height: 0.4rem;
	            text-align: center;
	            border-left: 2px solid #698499;
	           
	            
	        }
	        .left_none {
	            border-left: none;
	        }
	        .border-top{
	        	 border-top: 2px solid #698499;
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