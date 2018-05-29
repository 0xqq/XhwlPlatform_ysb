<template>
	<div>								
		<div id="myChart7" class="chart"></div>								
	</div>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	import echarts from 'echarts'
	export default {
  data () {
    return {
		mapStatus:null,  //图表返回函数状态
       }
    },
    props:['Text',"Xvalue",'Legend',"Series","Unit","PropsWith"],
    computed:{
		...mapState(['contentSize']),       	
	},
	mounted(){
		//初始化时获取数据
		var series = this.Series;
		var chart = document.getElementById('myChart7');
		if(series[0].data.length<20){
			chart.style.width = this.PropsWith||'160%';
		}else if(series[0].data.length<40){
			chart.style.width = this.PropsWith||'200%';
		}else if(series[0].data.length<60){
			chart.style.width = this.PropsWith||'240%';
		}else{
			chart.style.width = this.PropsWith||'100%';
		}		
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
        var  myChart7 = echarts.init(document.getElementById('myChart7'))
        var toolTip = {
	            trigger: 'axis',
	            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	            	type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	        }
	    };
	    var toolBox = {
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
		   };
		var Grid = {
	        left: '3%',
	        right: '4%',
	        bottom: '8%',
	        top:"15%",
	        containLabel: true
	    }
		var Y = [{
	    		name:this.Unit,
	            type : 'value',
	            axisLine: {
	        		lineStyle: {
	        			color: '#fff',
	        		}
	        	},
	        	splitLine: {
					show: true,
					lineStyle: {
						color: 'rgba(255,255,255,0.2)',
					}
	            }
	       }];
	    var itemstyle = {        //颜色渐变
	            normal: {           
	                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
	                    offset: 0,
	                    color: 'rgba(0,191,255,0.9)'
	                }, {
	                    offset: 1,
	                    color: 'rgba(0,191,255,0.1)'
	                }]),
	                shadowColor: 'rgba(0, 0, 0, 0.1)',
	                shadowBlur: 10
	            }
	        };
	    var Color = ['#3398DB']
      // 绘制图表
		var option1 = {
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
	        color: Color,
		    tooltip : {
		        trigger: 'axis',
		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
		    legend: {
		        data:this.Legend,
		        textStyle:{
		        	color: '#fff',
		        	fontSize: 12,        	
		       	},
		    },
		    toolbox:toolBox, 
		    itemStyle: itemstyle,
		    grid: Grid,
		    xAxis : [
		        {
		            type : 'category',
		            data : this.Xvalue,
		            axisTick: {
		            	interval: '0',
		            },
		            nameTextStyle: {
		            	fontSize: 10,
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
		    yAxis : Y,
		    series : this.Series
	        };
    		myChart7.setOption(option1);    
			function MapStatus() {//销毁函数或者重绘函数作为返回值返出去		
				myChart7.resize();
				myChart7.setOption(option1);					
			}
			return MapStatus
   	    }     
    }
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin';
	/*可视区外框样式*/	
/*图表外框*/
.chart{
	width: 99.8%;
	height: 5.20rem;
	margin: 0 auto;
}
</style>