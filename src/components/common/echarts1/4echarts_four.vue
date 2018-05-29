<template>
	<div>								
		<div id="myChart4" class="chart"></div>														
	</div>

</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	import echarts from 'echarts'
	export default {
    data () {
        return {
			
        }
    },
    props:['Text',"Xvalue",'Legend',"Series","Unit1","Unit2"],
    computed:{
		...mapState(['contentSize']),       	
	},
	mounted(){
		//初始化时获取数据
		this.mapStatus = this.drawLine()
	},
    watch:{
		//页面变化时重绘
		contentSize:function(contentSize){
			var _resizeMap = this.mapStatus;
			setTimeout(function(){
				_resizeMap();
			},500)				
		}
	},
    methods: {
	  	drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChart4 = echarts.init(document.getElementById('myChart4')) 
        // 绘制图表
		var option1 ={
	    	title:{
				show:true,
				text:this.Text,
				left: '2%',
				textStyle:{
					color: '#fff',
					fontSize: 12,
				}
			},
	    	backgroundColor:['rgba(30,144,255,0.15)'],
	        color: ['#ecff19', '#d14a61'],
		    tooltip : {
		        trigger: 'axis',
		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
		    legend: {
		        data: this.Legend,
		        top:0,
		        textStyle:{
		        	color:'#fff'
		        }
		    },
		    toolbox: {
		    	right:'2%',
		        iconStyle: {
		            normal: {
		                borderColor: '#fff'
		            },
		            emphasis: {
		                borderColor: '#b1e4ff'
		            }
		        },
		        feature: {
		        	magicType: {type: ['line', 'bar']},
		            saveAsImage: {
		                show: true
		            }
		        }
		    },
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '8%',
		        top:"15%",
		        containLabel: true	   
		    },
		    xAxis : [
		        {
		            type : 'category',
		            axisLine: {onZero: true},
		            data : this.Xvalue,
		            axisTick: {
		                alignWithLabel: true
		            },
		            axisLine: {
		        		lineStyle: {
		        			color: '#fff',
		        		}
		        	},
		        	axisLabel: {           //刻度标题倾斜角度
			            interval: 0,
			            rotate: -45
			        }
		        }
		    ],
		    yAxis:[{
			        type: 'value',
			        name: this.Unit2,
			        nameRotate: 90,
			        nameGap: 50,
			        nameLocation: "middle",
			        axisLine: {
			            lineStyle: {
			               color: '#fff'
			            }
			        },
			        splitLine: {
						show: true,
						lineStyle: {
							color: 'rgba(255,255,255,0.2)',
						}
		            },
			        axisLabel: {
			            formatter: '{value} '
			        },
			 	},{
			        type: 'value',
			        name: this.Unit1,
			        nameRotate: 90,
			        nameGap: 50,
			        nameLocation: "middle",
			        axisLine: {
			            lineStyle: {
			                color: '#fff'
			            }
			        },
			        splitLine: {
						show: false
		            }
			    }],
		    series : this.Series
	        };
		    myChart4.setOption(option1);
		    function MapStatus() { //重绘函数作为返回值返出去				
					myChart4.resize();
					myChart4.setOption(option1);
				}
			return MapStatus
	    }  
	}
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';

/*图表外框*/
.chart{
	width: 99.8%;
	height: 5.23rem;
	margin: 0 auto;
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